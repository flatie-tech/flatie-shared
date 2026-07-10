import { z } from 'zod';

/**
 * Income-transaction request contracts — the manual income ledger
 * representatives maintain when the building is in `manual` funds
 * mode (`POST/PUT /buildings/:buildingId/income`).
 *
 * The two-decimal refine mirrors the backend `decimal(10,2)` column,
 * so both clients reject amounts the API would reject.
 */

const incomeAmountSchema = z.coerce
  .number()
  .min(0, 'amount must be >= 0')
  .refine((v) => /^-?\d+(\.\d{1,2})?$/.test(v.toString()), {
    message: 'amount must have at most 2 decimal places',
  })
  .describe('Income amount in EUR, at most two decimal places.');

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
