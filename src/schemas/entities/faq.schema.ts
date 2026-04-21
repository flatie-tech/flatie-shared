import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for FAQs
 */
export const FAQ_LIMITS = {
  QUESTION_MIN: 1,
  QUESTION_MAX: 500,
  ANSWER_MIN: 1,
  ANSWER_MAX: 2000,
} as const;

/**
 * Create FAQ request schema
 */
export const createFaqSchema = z.object({
  question: z
    .string()
    .min(FAQ_LIMITS.QUESTION_MIN, 'Question is required')
    .max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`)
    .describe('FAQ question displayed to residents, 1–500 chars.'),
  answer: z
    .string()
    .min(FAQ_LIMITS.ANSWER_MIN, 'Answer is required')
    .max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`)
    .describe('FAQ answer body, up to 2000 chars.'),
});

/**
 * Update FAQ request schema (all fields optional)
 */
export const updateFaqSchema = z.object({
  question: z
    .string()
    .min(FAQ_LIMITS.QUESTION_MIN)
    .max(FAQ_LIMITS.QUESTION_MAX)
    .optional()
    .describe('Revised question, 1–500 chars.'),
  answer: z
    .string()
    .min(FAQ_LIMITS.ANSWER_MIN)
    .max(FAQ_LIMITS.ANSWER_MAX)
    .optional()
    .describe('Revised answer, up to 2000 chars.'),
});

/**
 * Reorder FAQs request schema
 */
export const reorderFaqsSchema = z.object({
  orderedIds: z
    .array(uuidSchema)
    .min(1, 'At least one FAQ ID is required')
    .describe(
      'Full list of FAQ UUIDs in their new display order. Must include every FAQ in the target building.',
    ),
});

/**
 * Copy FAQs from another building request schema
 */
export const copyFaqsSchema = z.object({
  sourceBuildingId: uuidSchema.describe(
    'UUID of the building whose FAQs should be copied into the target building.',
  ),
});

// Inferred types
export type CreateFaqSchema = z.infer<typeof createFaqSchema>;
export type UpdateFaqSchema = z.infer<typeof updateFaqSchema>;
export type ReorderFaqsSchema = z.infer<typeof reorderFaqsSchema>;
export type CopyFaqsSchema = z.infer<typeof copyFaqsSchema>;
