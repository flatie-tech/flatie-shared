import { z } from 'zod';
import { moneyStringSchema } from '../money.schema';

/**
 * Expense-transaction request contracts — the manual expense ledger
 * (`POST/PUT /buildings/:buildingId/expenses`). Mirrors the income schema;
 * `amount` is the canonical money string (`decimal(10,2)`).
 *
 * CAMT-imported debit rows also land in `expense_transactions`; these request
 * schemas cover the manual create/update path both clients share.
 */

const expenseAmountSchema = moneyStringSchema.describe(
  'Expense amount in EUR as a two-decimal string (e.g. "120.00").',
);

/** Body of `POST /buildings/:buildingId/expenses`. */
export const createExpenseSchema = z
  .object({
    categoryId: z
      .string()
      .uuid()
      .describe('Expense transaction-category to file this entry under.'),
    amount: expenseAmountSchema,
    description: z.string().trim().max(500).optional(),
    period: z
      .string()
      .max(50)
      .optional()
      .describe('Free-form billing period label (e.g. "2026-06").'),
  })
  .strict();

/** Body of `PUT /buildings/:buildingId/expenses/:id` — partial patch. */
export const updateExpenseSchema = z
  .object({
    categoryId: z.string().uuid().optional(),
    amount: expenseAmountSchema.optional(),
    description: z.string().max(500).optional(),
    period: z.string().max(50).optional(),
  })
  .strict();

export type CreateExpenseSchema = z.infer<typeof createExpenseSchema>;
export type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;
