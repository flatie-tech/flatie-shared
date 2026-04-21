import { z } from 'zod';
import { TransactionType } from '../../enums/status.enum';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for transaction categories
 */
export const TRANSACTION_CATEGORY_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  SEARCH_MAX: 200,
} as const;

/**
 * Create transaction category request schema
 */
export const createTransactionCategorySchema = z.object({
  name: z
    .string()
    .min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN, 'Name is required')
    .max(
      TRANSACTION_CATEGORY_LIMITS.NAME_MAX,
      `Name must be at most ${TRANSACTION_CATEGORY_LIMITS.NAME_MAX} characters`,
    )
    .describe('Human-readable category name (e.g. "Cleaning", "Water utility"), 1–100 chars.'),
  type: z
    .enum([TransactionType.INCOME, TransactionType.EXPENSE])
    .describe(
      '`INCOME` for categories that receive money into the fund; `EXPENSE` for categories that spend from it.',
    ),
});

/**
 * Update transaction category request schema (name only)
 */
export const updateTransactionCategorySchema = z.object({
  name: z
    .string()
    .min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN)
    .max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX)
    .optional()
    .describe('Revised category name, 1–100 chars.'),
});

/**
 * Get transaction categories query schema
 */
export const getTransactionCategoriesQuerySchema = z.object({
  type: z
    .enum([TransactionType.INCOME, TransactionType.EXPENSE])
    .optional()
    .describe(
      'Filter results by category type. Omit to return both income and expense categories.',
    ),
  search: z
    .string()
    .max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX)
    .optional()
    .describe('Case-insensitive substring matched against the category name.'),
});

/**
 * Copy categories (between buildings) request schema
 */
export const copyTransactionCategoriesSchema = z.object({
  sourceBuildingId: uuidSchema.describe(
    'UUID of the building whose categories should be copied into the target building.',
  ),
});

// Inferred types
export type CreateTransactionCategorySchema = z.infer<typeof createTransactionCategorySchema>;
export type UpdateTransactionCategorySchema = z.infer<typeof updateTransactionCategorySchema>;
export type GetTransactionCategoriesQuerySchema = z.infer<
  typeof getTransactionCategoriesQuerySchema
>;
export type CopyTransactionCategoriesSchema = z.infer<typeof copyTransactionCategoriesSchema>;
