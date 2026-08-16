import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Pričuva arrears tracking — the contracts around
 * `buildings.pricuvaTrackingFrom` (see updateBuildingSchema).
 *
 * The model is a standard accounting cut-over: the building picks the
 * month Flatie becomes authoritative, pre-history enters as one
 * opening balance per owner (debt or credit carried over from the
 * previous manager), and each closed month gets an immutable posted
 * charge per owner. Cumulative arrears are then
 * `opening + Σ charges − Σ matched payments`, exposed on the
 * building-funds ledger rows.
 *
 * The EUR fields here are `z.number()`, NOT the package's
 * `signedMoneyStringSchema` — a deliberate exemption from the
 * "money is a two-decimal string" rule in `money.schema.ts`. These are
 * derived/aggregate figures, not stored `decimal` columns: the backend
 * sums them in Postgres `numeric` and hands the result over as
 * `Number(row.amount)`, and on the write side it re-serialises with
 * `.toFixed(2)` before the INSERT. Switching the contract to a string
 * would break both halves at runtime (`.toFixed` on a string) and
 * silently turn client-side arithmetic into concatenation. Migrating
 * them is a coordinated backend + web + mobile change, not a
 * package-local one — see `responses/building-funds-ledger.ts`, which
 * carries the same exemption for the same reason.
 */

/** One owner's opening balance at the tracking cut-over. */
export const pricuvaOpeningBalanceRowSchema = z
  .object({
    ownerId: uuidSchema.describe('Owner record the balance belongs to (building-scoped).'),
    ownerName: z.string().describe('Owner full name, for display.'),
    amount: z
      .number()
      .describe(
        'EUR carried over from before tracking started. Positive = debt owed, negative = prepaid credit.',
      ),
    note: z
      .string()
      .nullable()
      .describe(
        'Free-text provenance, e.g. "prijenos od prethodnog upravitelja, stanje 30.6.2026.".',
      ),
    updatedAt: z.string().nullable().describe('ISO timestamp of the last edit; null if unknown.'),
  })
  .meta({ id: 'PricuvaOpeningBalanceRow' });

export const pricuvaOpeningBalancesResponseSchema = z
  .object({
    buildingId: uuidSchema,
    rows: z
      .array(pricuvaOpeningBalanceRowSchema)
      .describe('One row per owner that has a recorded opening balance.'),
  })
  .meta({ id: 'PricuvaOpeningBalancesResponse' });

/**
 * Bulk upsert of opening balances. Amount 0 removes the owner's row —
 * "no opening balance" and "zero opening balance" are the same state.
 */
export const upsertPricuvaOpeningBalancesSchema = z
  .object({
    balances: z
      .array(
        z.object({
          ownerId: uuidSchema.describe('Owner record the balance belongs to.'),
          amount: z
            .number()
            .min(-1_000_000)
            .max(1_000_000)
            .describe('EUR; positive = debt, negative = credit, 0 = remove the row.'),
          note: z
            .string()
            .trim()
            .max(500)
            .optional()
            .nullable()
            .describe('Provenance note shown alongside the balance.'),
        }),
      )
      .min(1)
      .max(500)
      .describe('Balances to upsert; owners not listed are left untouched.'),
  })
  // Registers the OpenAPI component the backend's
  // `$ref: '#/components/schemas/UpsertPricuvaOpeningBalances'` resolves
  // against — the controller passes this schema to `@ZodBody` unwrapped.
  .meta({ id: 'UpsertPricuvaOpeningBalances' });

export type UpsertPricuvaOpeningBalancesSchema = z.infer<typeof upsertPricuvaOpeningBalancesSchema>;

/** Result of a manual "post due charges now" run for one building. */
export const postPricuvaChargesResponseSchema = z
  .object({
    postedPeriods: z
      .array(z.string().regex(/^\d{4}-\d{2}$/))
      .describe('Closed months that received charges in this run (already-posted months skip).'),
    chargesPosted: z.number().int().describe('Total charge rows written across those periods.'),
  })
  .meta({ id: 'PostPricuvaChargesResponse' });

export type PricuvaOpeningBalanceRow = z.infer<typeof pricuvaOpeningBalanceRowSchema>;
export type PricuvaOpeningBalancesResponse = z.infer<typeof pricuvaOpeningBalancesResponseSchema>;
export type PostPricuvaChargesResponse = z.infer<typeof postPricuvaChargesResponseSchema>;
