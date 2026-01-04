import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Poll type options
 */
export const POLL_TYPES = ['CONSENSUS', 'COMMUNITY'] as const;
export type PollTypeOption = (typeof POLL_TYPES)[number];

/**
 * Poll type enum schema
 */
export const pollTypeSchema = z.enum(POLL_TYPES);

/**
 * Validation constants for polls
 */
export const POLL_LIMITS = {
  QUESTION_MIN: 5,
  QUESTION_MAX: 250,
  OPTION_MAX: 100,
  COMMUNITY_OPTIONS_MIN: 2,
  COMMUNITY_OPTIONS_MAX: 4,
  CONSENSUS_OPTIONS: 1,
  CONSENSUS_PERCENTAGE_MIN: 10,
  CONSENSUS_PERCENTAGE_MAX: 100,
} as const;

/**
 * Create poll request schema
 */
export const createPollSchema = z
  .object({
    buildingId: uuidSchema,
    question: z
      .string()
      .min(POLL_LIMITS.QUESTION_MIN, 'Question must be at least 5 characters')
      .max(
        POLL_LIMITS.QUESTION_MAX,
        `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`,
      ),
    options: z
      .array(z.string().max(POLL_LIMITS.OPTION_MAX, 'Option must be at most 100 characters'))
      .min(1, 'At least one option is required'),
    pollType: pollTypeSchema,
    deadline: z.coerce.date({ required_error: 'Deadline is required' }),
    requiredConsensusPercentage: z.coerce
      .number()
      .min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN)
      .max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX)
      .optional(),
    fileIds: z.array(uuidSchema).optional().default([]),
  })
  .refine(
    (data) => {
      if (data.pollType === 'COMMUNITY') {
        return (
          data.options.length >= POLL_LIMITS.COMMUNITY_OPTIONS_MIN &&
          data.options.length <= POLL_LIMITS.COMMUNITY_OPTIONS_MAX
        );
      }
      if (data.pollType === 'CONSENSUS') {
        return data.options.length === POLL_LIMITS.CONSENSUS_OPTIONS;
      }
      return true;
    },
    {
      message: 'Invalid number of options for poll type',
      path: ['options'],
    },
  )
  .refine(
    (data) => {
      if (data.pollType === 'CONSENSUS') {
        return (
          data.requiredConsensusPercentage !== undefined &&
          data.requiredConsensusPercentage >= POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN &&
          data.requiredConsensusPercentage <= POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX
        );
      }
      return true;
    },
    {
      message: 'Consensus percentage must be between 10 and 100 for consensus polls',
      path: ['requiredConsensusPercentage'],
    },
  );

/**
 * Vote on poll request schema
 */
export const votePollSchema = z.object({
  optionId: uuidSchema,
});

/**
 * Finalize poll request schema
 */
export const finalizePollSchema = z.object({
  result: z.string().optional(),
});

// Inferred types
export type CreatePollSchema = z.infer<typeof createPollSchema>;
export type VotePollSchema = z.infer<typeof votePollSchema>;
export type FinalizePollSchema = z.infer<typeof finalizePollSchema>;
