import { z } from 'zod';

/**
 * Statutory default-interest (zatezna kamata) rate table.
 *
 * Croatian law (Zakon o obveznim odnosima, čl. 29) sets the rate every
 * half-year from the ECB main-refinancing rate in force before the
 * period: + 3 percentage points for consumer / non-commercial
 * relationships (co-owners), + 8 pp between undertakings. Flatie keeps
 * the table platform-wide; a building never overrides it.
 *
 * `rate*` are annual percentages (5.4 = 5,40 %), not fractions.
 */
const isoDateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD.');

export const interestRateSchema = z
  .object({
    validFrom: isoDateSchema.describe('First day the rate applies (1 Jan / 1 Jul).'),
    rateConsumer: z.number().min(0).max(100).describe('Annual %, ECB + 3 pp.'),
    rateCommercial: z.number().min(0).max(100).describe('Annual %, ECB + 8 pp.'),
    source: z.string().nullable().describe('e.g. "NN 68/26"'),
  })
  .meta({ id: 'InterestRate' });

export const createInterestRateSchema = z
  .object({
    validFrom: isoDateSchema,
    rateConsumer: z.number().min(0).max(100),
    rateCommercial: z.number().min(0).max(100),
    source: z.string().trim().max(120).nullable().optional(),
  })
  .meta({ id: 'CreateInterestRate' });

export const interestRatesResponseSchema = z
  .object({
    rows: z.array(interestRateSchema).describe('Ordered by validFrom descending.'),
  })
  .meta({ id: 'InterestRatesResponse' });

export type InterestRate = z.infer<typeof interestRateSchema>;
export type CreateInterestRateSchema = z.infer<typeof createInterestRateSchema>;
export type InterestRatesResponse = z.infer<typeof interestRatesResponseSchema>;
