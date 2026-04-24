import { z } from 'zod';

/**
 * Expected-vs-paid building-funds ledger for a building over a single
 * month (also known as pričuva in the Croatian domain).
 *
 * The server computes one row per co-owner that holds any share of an
 * apartment, garage, or storage unit in the building. For each row:
 *
 * - Residential area is the sum of each residential unit's area
 *   weighted by the user's ownership share; commercial area is the
 *   same for commercial-typed units.
 * - `expected` = Σ over the user's units of
 *     area × ownershipShare × kindTypeCoef × rate[type]
 *   where `kindTypeCoef` picks the multiplier matching the unit's
 *   kind (apartment/garage/storage) and type (residential/commercial).
 *   Either rate can be null if the building has no units of that
 *   type — matching area is then priced at 0 and contributes nothing.
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
 * Both rates are null when neither has been configured. In that case
 * `rows` is empty — the server can't compute expected amounts.
 */
export const buildingFundsLedgerRowSchema = z
  .object({
    ownerId: z.string().uuid().describe('ID of the owner record this row attributes to.'),
    ownerName: z.string().describe('Full name of the owner this row attributes to.'),
    linkedUserId: z
      .string()
      .uuid()
      .nullable()
      .optional()
      .describe('Registered user ID linked to this owner, when one exists.'),
    ownedApartmentArea: z.number().describe('Σ apartment.area × ownershipPercentage / 100, in m².'),
    ownedGarageArea: z.number().describe('Σ garage.area × ownershipPercentage / 100, in m².'),
    ownedStorageArea: z
      .number()
      .describe('Σ storage_unit.area × ownershipPercentage / 100, in m².'),
    totalOwnedArea: z.number().describe('Sum of the three area fields, for convenience.'),
    residentialArea: z
      .number()
      .describe('Σ owned-share-weighted area of RESIDENTIAL-typed units, in m².'),
    commercialArea: z
      .number()
      .describe('Σ owned-share-weighted area of COMMERCIAL-typed units, in m².'),
    expected: z
      .number()
      .describe('Σ area × kindTypeCoef × rate[type] across the user’s units, in EUR.'),
    paid: z
      .number()
      .describe(
        'Attributed apartment income for the period, in EUR. Does not include garage/storage.',
      ),
    diff: z.number().describe('paid − expected, in EUR.'),
  })
  .meta({ id: 'BuildingFundsLedgerRow' });

export const buildingFundsLedgerResponseSchema = z
  .object({
    buildingId: z.string().uuid(),
    period: z
      .string()
      .regex(/^\d{4}-\d{2}$/)
      .describe('Reporting month, `YYYY-MM`.'),
    monthlyFeePerSqm: z
      .number()
      .nullable()
      .describe(
        'Residential rate in EUR per m² used for this report; null when the building has none set.',
      ),
    monthlyFeeCommercialPerSqm: z
      .number()
      .nullable()
      .describe(
        'Commercial rate in EUR per m² used for this report; null when the building has no commercial rate.',
      ),
    rows: z
      .array(buildingFundsLedgerRowSchema)
      .describe('One entry per co-owner with any owned area on the building.'),
  })
  .meta({ id: 'BuildingFundsLedgerResponse' });

export type BuildingFundsLedgerRow = z.infer<typeof buildingFundsLedgerRowSchema>;
export type BuildingFundsLedgerResponse = z.infer<typeof buildingFundsLedgerResponseSchema>;
