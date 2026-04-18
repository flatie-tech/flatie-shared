import { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { multipartArray } from '../multipart.schema';

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
 * Create poll request schema — matches flatie-backend's
 * `POST /buildings/:buildingId/polls` multipart/form-data payload.
 * buildingId comes from the URL, not the body.
 */
export const createPollSchema = z
  .object({
    question: z
      .string()
      .min(POLL_LIMITS.QUESTION_MIN, 'Question must be at least 5 characters')
      .max(
        POLL_LIMITS.QUESTION_MAX,
        `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`,
      ),
    options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).pipe(
      z.array(z.string().min(1).max(POLL_LIMITS.OPTION_MAX)),
    ),
    pollType: pollTypeSchema,
    deadline: z.coerce.date().optional(),
    requiredConsensusPercentage: z.coerce
      .number()
      .min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN)
      .max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX)
      .optional(),
    scopedUnitIds: multipartArray(uuidSchema).optional(),
    scopedUserIds: multipartArray(uuidSchema).optional(),
    fileIds: multipartArray(uuidSchema).optional().default([]),
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
 * Update poll request schema — all fields optional; the extra
 * `status` discriminant (`active` / `inactive` / `ended`) and the
 * `removeChildFileIds` list matches the legacy `UpdatePollDto`.
 */
export const updatePollSchema = z.object({
  question: z.string().min(1).max(POLL_LIMITS.QUESTION_MAX).optional(),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).optional(),
  pollType: pollTypeSchema.optional(),
  deadline: z.coerce.date().optional(),
  requiredConsensusPercentage: z.coerce
    .number()
    .min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN)
    .max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX)
    .optional(),
  status: z.enum(['active', 'inactive', 'ended']).optional(),
  scopedUnitIds: multipartArray(uuidSchema).optional(),
  scopedUserIds: multipartArray(uuidSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional(),
});

/**
 * Vote on poll request schema
 *
 * Backend stores poll options as a JSON array and votes reference the
 * 0-based index, not the option's row id — that's what the controller
 * expects on the wire.
 */
export const votePollSchema = z.object({
  selectedOptionIndex: z.number().int().min(0),
});

/**
 * Finalize poll request schema
 *
 * A boolean toggle — `true` seals the poll, `false` is a no-op the
 * controller still accepts to match the existing API shape.
 */
export const finalizePollSchema = z.object({
  finalize: z.boolean(),
});

// Inferred types
export type CreatePollSchema = z.infer<typeof createPollSchema>;
export type UpdatePollSchema = z.infer<typeof updatePollSchema>;
export type VotePollSchema = z.infer<typeof votePollSchema>;
export type FinalizePollSchema = z.infer<typeof finalizePollSchema>;
