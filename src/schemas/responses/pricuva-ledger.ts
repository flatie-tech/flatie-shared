import { z } from 'zod';

/**
 * Expected-vs-paid pričuva ledger for a building over a single month.
 *
 * The server computes one row per co-owner that holds any share of an
 * apartment, garage, or storage unit in the building. For each row:
 *
 * - `expected` = building.monthlyFeePerSqm × Σ over units owned by
 *   this user of (unit.area × ownershipPercentage / 100).
 * - `paid` = Σ over the apartments this user co-owns of (that
 *   apartment's matched income in the selected period × the user's
 *   ownership share of that apartment).
 * - `diff` = paid − expected. Negative = the user owes, positive =
 *   the user over-paid (credit).
 *
 * Garage and storage areas feed `expected` but not `paid`: only
 * apartment payments carry the HR01 poziv-na-broj that links bank
 * entries to a unit.
 *
 * `monthlyFeePerSqm` is null when the building hasn't configured a
 * rate yet. In that case `rows` is empty — the server can't compute
 * expected amounts without it.
 */
export const pricuvaLedgerRowSchema = z
  .object({
    userId: z.string().uuid(),
    userName: z.string().describe('Display name of the co-owner this row attributes to.'),
    ownedApartmentArea: z.number().describe('Σ apartment.area × ownershipPercentage / 100, in m².'),
    ownedGarageArea: z.number().describe('Σ garage.area × ownershipPercentage / 100, in m².'),
    ownedStorageArea: z
      .number()
      .describe('Σ storage_unit.area × ownershipPercentage / 100, in m².'),
    totalOwnedArea: z.number().describe('Sum of the three area fields, for convenience.'),
    expected: z.number().describe('Rate × totalOwnedArea, in EUR.'),
    paid: z
      .number()
      .describe(
        'Attributed apartment income for the period, in EUR. Does not include garage/storage.',
      ),
    diff: z.number().describe('paid − expected, in EUR.'),
  })
  .meta({ id: 'PricuvaLedgerRow' });

export const pricuvaLedgerResponseSchema = z
  .object({
    buildingId: z.string().uuid(),
    period: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .describe('Reporting month, `YYYY-MM`.'),
    monthlyFeePerSqm: z
      .number()
      .nullable()
      .describe('Rate in EUR per m² used for this report; null when the building has none set.'),
    rows: z
      .array(pricuvaLedgerRowSchema)
      .describe('One entry per co-owner with any owned area on the building.'),
  })
  .meta({ id: 'PricuvaLedgerResponse' });

export type PricuvaLedgerRow = z.infer<typeof pricuvaLedgerRowSchema>;
export type PricuvaLedgerResponse = z.infer<typeof pricuvaLedgerResponseSchema>;
