import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Pričuva bill delivery register — who was billed for which period, how
 * the slip left the system, and whether it actually reached them.
 *
 * Before this, nothing was recorded. `invoice-email.service.ts` already
 * computed a per-payer outcome (`sent` / `skipped` / `failed`, with a
 * reason) and returned it to the caller for display, then discarded it;
 * the ZIP path left no trace at all. An org could not answer "did we
 * bill this unit for 2026-03, and when" — which is the question that
 * matters once arrears go to collection.
 *
 * ── The two channels are NOT equivalent evidence ──────────────────────
 * `email` is a per-payer delivery attempt with a provider result behind
 * it. `download` is one bulk act by a representative: the ZIP was
 * generated, and what happened to the paper afterwards is outside the
 * system. Collapsing both into a single "sent" flag would produce a
 * register that overstates what can be proven, so the channel is kept on
 * every row and `download` rows are never counted as delivered.
 *
 * ── Keyed on the payment reference, not the owner ─────────────────────
 * `paymentRefCode` (unique per building, `uq_units_building_payment_ref_code`)
 * is what is printed on the HUB3 slip AND what comes back on the bank
 * statement, so it is the one value that ties a bill to its payment.
 * Owner-mode buildings bill per co-owner rather than per ref-coded unit,
 * so it is nullable and `ownerId` carries the identity there.
 */

/** How the slip left the system. */
export const PricuvaDeliveryChannel = {
  /** Emailed to the payer — a real delivery attempt with a provider result. */
  EMAIL: 'email',
  /** Included in a generated ZIP — proves the slip was produced, not received. */
  DOWNLOAD: 'download',
} as const;
export type PricuvaDeliveryChannel =
  (typeof PricuvaDeliveryChannel)[keyof typeof PricuvaDeliveryChannel];

/**
 * Outcome for one slip.
 *
 * `generated` is the only status a `download` row can carry — it says the
 * PDF was produced and handed to the representative, nothing more.
 */
export const PricuvaDeliveryStatus = {
  /** Accepted by the mail provider for delivery. */
  SENT: 'sent',
  /** Not attempted — no payer email, suppression list, no mail provider. */
  SKIPPED: 'skipped',
  /** Attempted and rejected. `reason` carries the provider's message. */
  FAILED: 'failed',
  /** Produced into a ZIP for the representative to distribute. */
  GENERATED: 'generated',
} as const;
export type PricuvaDeliveryStatus =
  (typeof PricuvaDeliveryStatus)[keyof typeof PricuvaDeliveryStatus];

/** One recorded delivery attempt for one slip. */
export const pricuvaDeliveryRowSchema = z
  .object({
    id: uuidSchema,
    period: z.string().regex(/^\d{4}-\d{2}$/, 'Period must be YYYY-MM.'),
    channel: z.enum([PricuvaDeliveryChannel.EMAIL, PricuvaDeliveryChannel.DOWNLOAD]),
    status: z.enum([
      PricuvaDeliveryStatus.SENT,
      PricuvaDeliveryStatus.SKIPPED,
      PricuvaDeliveryStatus.FAILED,
      PricuvaDeliveryStatus.GENERATED,
    ]),
    paymentRefCode: z
      .string()
      .nullable()
      .describe('The slip reference. Null in owner-mode buildings, which bill per co-owner.'),
    unitLabel: z.string().nullable().describe('Unit the ref belongs to, for display.'),
    ownerId: uuidSchema.nullable(),
    ownerName: z.string().nullable(),
    recipientEmail: z
      .string()
      .nullable()
      .describe('Address the mail was addressed to. Null for download rows.'),
    reason: z
      .string()
      .nullable()
      .describe('Why a slip was skipped or failed — the provider message, verbatim.'),
    amount: z
      .number()
      .describe('Slip amount in EUR. See pricuva.schema.ts on the number exemption.'),
    /** Groups every row produced by one send run or one ZIP generation. */
    batchId: uuidSchema,
    createdAt: z.string(),
  })
  .meta({ id: 'PricuvaDeliveryRow' });

export type PricuvaDeliveryRow = z.infer<typeof pricuvaDeliveryRowSchema>;

/**
 * The register for one building.
 *
 * `neverBilled` is the point of the whole feature: ref-coded units with
 * no delivery row for the period at all. A unit is in arrears for two
 * very different reasons — it was billed and did not pay, or nobody ever
 * billed it — and only the register can tell them apart.
 */
export const pricuvaDeliveriesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    period: z.string(),
    rows: z.array(pricuvaDeliveryRowSchema),
    emailedCount: z.number().int().describe('Distinct payers with a `sent` email row.'),
    generatedCount: z.number().int().describe('Distinct payers with a `download` row.'),
    failedCount: z.number().int(),
    neverBilled: z
      .array(
        z.object({
          paymentRefCode: z.string().nullable(),
          unitLabel: z.string().nullable(),
          ownerId: uuidSchema.nullable(),
          ownerName: z.string().nullable(),
        }),
      )
      .describe('Billable payers with no delivery row for this period, by either channel.'),
  })
  .meta({ id: 'PricuvaDeliveriesResponse' });

export type PricuvaDeliveriesResponse = z.infer<typeof pricuvaDeliveriesResponseSchema>;

/**
 * Per-building funds rollup for the org-wide statement-import screen.
 *
 * The import page previously showed nothing until after a file was
 * uploaded, so there was no way to see which buildings were behind, or
 * which were even importable. Everything here is derived — no new stored
 * state — and the two flags exist because a statement import is a no-op
 * on a manual-entry building.
 */
export const orgBuildingFundsRowSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    buildingSlug: z.string().nullable(),
    /** MANUAL buildings cannot be imported into; the row explains why it is inert. */
    fundsSource: z.enum(['manual', 'camt']),
    currentBalance: z.number().describe('Fund balance in EUR.'),
    monthlyPricuva: z
      .number()
      .describe('Total pričuva charged across the building for the current period, EUR.'),
    totalOwed: z
      .number()
      .describe('Sum of positive owner balances — arrears only, credits excluded.'),
    ownersInArrears: z.number().int(),
    ownersTotal: z.number().int(),
    unmatchedRefsCount: z
      .number()
      .int()
      .describe('Payments received that matched no owner, so they reduced nobody’s arrears.'),
    lastStatementImportAt: z
      .string()
      .nullable()
      .describe('When a statement was last imported. Null = never.'),
    /** Null when the building is not under pričuva tracking. */
    pricuvaTrackingFrom: z.string().nullable(),
  })
  .meta({ id: 'OrgBuildingFundsRow' });

export type OrgBuildingFundsRow = z.infer<typeof orgBuildingFundsRowSchema>;

export const orgFundsOverviewResponseSchema = z
  .object({
    orgId: uuidSchema,
    buildings: z.array(orgBuildingFundsRowSchema),
    totalBalance: z.number().describe('Σ currentBalance across the org, EUR.'),
    totalOwed: z.number().describe('Σ totalOwed across the org, EUR.'),
    buildingsInCamtMode: z.number().int(),
  })
  .meta({ id: 'OrgFundsOverviewResponse' });

export type OrgFundsOverviewResponse = z.infer<typeof orgFundsOverviewResponseSchema>;
