import { z } from 'zod';

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
    .max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`),
  answer: z
    .string()
    .min(FAQ_LIMITS.ANSWER_MIN, 'Answer is required')
    .max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`),
});

/**
 * Update FAQ request schema (all fields optional)
 */
export const updateFaqSchema = z.object({
  question: z.string().min(FAQ_LIMITS.QUESTION_MIN).max(FAQ_LIMITS.QUESTION_MAX).optional(),
  answer: z.string().min(FAQ_LIMITS.ANSWER_MIN).max(FAQ_LIMITS.ANSWER_MAX).optional(),
});

// Inferred types
export type CreateFaqSchema = z.infer<typeof createFaqSchema>;
export type UpdateFaqSchema = z.infer<typeof updateFaqSchema>;
