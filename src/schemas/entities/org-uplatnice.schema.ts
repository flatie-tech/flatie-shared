import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Org-wide pričuva uplatnice — the upravitelj bills every co-owner in the
 * portfolio for a month from ONE screen instead of visiting each building.
 *
 * Money in this family is `z.number()` EUR (same documented exemption as
 * the pričuva/dunning schemas — the values are derived, never stored).
 */

/** Why a building cannot be billed right now. Mirrors the generator's preconditions. */
export const OrgUplatniceBlocker = {
  /** `monthlyFeePerSqm` not set — every slip would price at 0. */
  NO_FEE_RATE: 'no_fee_rate',
  NO_IBAN: 'no_iban',
  NO_OIB: 'no_oib',
  /** `billingBuildingCode` missing — first HR01 reference segment. */
  NO_BILLING_CODE: 'no_billing_code',
  /** Configured, but no unit/owner carries a payment reference yet. */
  NO_PAYERS: 'no_payers',
} as const;
export type OrgUplatniceBlocker = (typeof OrgUplatniceBlocker)[keyof typeof OrgUplatniceBlocker];

export const orgUplatniceBuildingRowSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    blocker: z.enum(OrgUplatniceBlocker).nullable(),
    /** Slips the generator would produce for this period. 0 when blocked. */
    payersCount: z.number().int(),
    /** Σ slip amounts, EUR. */
    expectedTotal: z.number(),
    /** Distinct payers with a `sent` e-mail row for the period. */
    emailedCount: z.number().int(),
    /** Distinct payers with a `download` row for the period. */
    generatedCount: z.number().int(),
    failedCount: z.number().int(),
    /** Payers with no delivery row for the period by either channel. */
    unbilledCount: z.number().int(),
    lastEmailedAt: z.string().nullable(),
    lastGeneratedAt: z.string().nullable(),
  })
  .meta({ id: 'OrgUplatniceBuildingRow' });
export type OrgUplatniceBuildingRow = z.infer<typeof orgUplatniceBuildingRowSchema>;

export const orgUplatniceOverviewResponseSchema = z
  .object({
    orgId: uuidSchema,
    period: z.string().regex(/^\d{4}-\d{2}$/),
    rows: z.array(orgUplatniceBuildingRowSchema),
    readyCount: z.number().int().describe('Buildings with no blocker.'),
    payersTotal: z.number().int(),
    expectedTotal: z.number(),
    emailedTotal: z.number().int(),
    unbilledTotal: z.number().int(),
  })
  .meta({ id: 'OrgUplatniceOverviewResponse' });
export type OrgUplatniceOverviewResponse = z.infer<typeof orgUplatniceOverviewResponseSchema>;

export const orgUplatniceQuerySchema = z.object({
  period: z
    .string()
    .regex(/^\d{4}-\d{2}$/)
    .optional()
    .describe('YYYY-MM; defaults to the current month.'),
  /** Comma-separated building ids for the ZIP variant; omitted = every ready building. */
  buildingIds: z.string().optional(),
});
export type OrgUplatniceQuery = z.infer<typeof orgUplatniceQuerySchema>;

export const sendOrgUplatniceSchema = z.object({
  period: z.string().regex(/^\d{4}-\d{2}$/),
  /** Omitted = every ready, visible building. */
  buildingIds: z.array(uuidSchema).max(500).optional(),
});
export type SendOrgUplatnice = z.infer<typeof sendOrgUplatniceSchema>;

export const OrgUplatniceSendStatus = {
  DONE: 'done',
  SKIPPED: 'skipped',
} as const;
export type OrgUplatniceSendStatus =
  (typeof OrgUplatniceSendStatus)[keyof typeof OrgUplatniceSendStatus];

export const orgUplatniceSendResultSchema = z
  .object({
    buildingId: uuidSchema,
    buildingName: z.string(),
    status: z.enum(OrgUplatniceSendStatus),
    /** Blocker code or a free-text failure when `skipped`. */
    reason: z.string().nullable(),
    total: z.number().int(),
    sent: z.number().int(),
    skipped: z.number().int(),
    failed: z.number().int(),
  })
  .meta({ id: 'OrgUplatniceSendResult' });
export type OrgUplatniceSendResult = z.infer<typeof orgUplatniceSendResultSchema>;

export const sendOrgUplatniceResponseSchema = z
  .object({
    period: z.string(),
    results: z.array(orgUplatniceSendResultSchema),
    buildingsDone: z.number().int(),
    buildingsSkipped: z.number().int(),
    sent: z.number().int(),
    skipped: z.number().int(),
    failed: z.number().int(),
  })
  .meta({ id: 'SendOrgUplatniceResponse' });
export type SendOrgUplatniceResponse = z.infer<typeof sendOrgUplatniceResponseSchema>;
