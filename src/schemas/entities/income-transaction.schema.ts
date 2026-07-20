import { z } from 'zod';
import { moneyStringSchema } from '../money.schema';

/**
 * Income-transaction request contracts — the manual income ledger
 * representatives maintain when the building is in `manual` funds
 * mode (`POST/PUT /buildings/:buildingId/income`).
 *
 * `amount` is the canonical money string (accepts string or number in, always
 * outputs `"N.NN"`); the ≤2-decimal + range rules mirror the `decimal(10,2)`
 * column so both clients reject amounts the API would reject.
 */

const incomeAmountSchema = moneyStringSchema.describe(
  'Income amount in EUR as a two-decimal string (e.g. "250.50").',
);

/** Body of `POST /buildings/:buildingId/income`. */
export const createIncomeSchema = z
  .object({
    categoryId: z
      .string()
      .uuid()
      .optional()
      .describe('Income transaction-category to file this entry under.'),
    amount: incomeAmountSchema,
    description: z.string().max(500).optional(),
    period: z
      .string()
      .max(50)
      .optional()
      .describe('Free-form billing period label (e.g. "2026-06").'),
  })
  .strict();

/** Body of `PUT /buildings/:buildingId/income/:id` — partial patch. */
export const updateIncomeSchema = z
  .object({
    categoryId: z.string().uuid().optional(),
    amount: incomeAmountSchema.optional(),
    description: z.string().max(500).optional(),
    period: z.string().max(50).optional(),
  })
  .strict();

export type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
export type UpdateIncomeSchema = z.infer<typeof updateIncomeSchema>;
