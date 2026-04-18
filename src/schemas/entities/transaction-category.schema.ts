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
    ),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]),
});

/**
 * Update transaction category request schema (name only)
 */
export const updateTransactionCategorySchema = z.object({
  name: z
    .string()
    .min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN)
    .max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX)
    .optional(),
});

/**
 * Get transaction categories query schema
 */
export const getTransactionCategoriesQuerySchema = z.object({
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).optional(),
  search: z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional(),
});

/**
 * Copy categories (between buildings) request schema
 */
export const copyTransactionCategoriesSchema = z.object({
  sourceBuildingId: uuidSchema,
});

// Inferred types
export type CreateTransactionCategorySchema = z.infer<typeof createTransactionCategorySchema>;
export type UpdateTransactionCategorySchema = z.infer<typeof updateTransactionCategorySchema>;
export type GetTransactionCategoriesQuerySchema = z.infer<
  typeof getTransactionCategoriesQuerySchema
>;
export type CopyTransactionCategoriesSchema = z.infer<typeof copyTransactionCategoriesSchema>;
