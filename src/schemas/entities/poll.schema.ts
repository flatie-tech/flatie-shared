import { z } from 'zod';
import { PollType } from '../../enums/poll-type.enum';
import { uuidSchema } from '../base.schema';
import { multipartArray } from '../multipart.schema';

/**
 * Poll type options
 */
export const POLL_TYPES = [PollType.CONSENSUS, PollType.COMMUNITY] as const;
export type PollTypeOption = (typeof POLL_TYPES)[number];

/**
 * Poll type enum schema
 */
export const pollTypeSchema = z
  .enum(POLL_TYPES)
  .describe(
    '`community` polls pass by simple majority of votes cast; `consensus` polls require an ownership-weighted approval threshold.',
  );

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
      )
      .describe('Poll question presented to voters, 5–250 chars.'),
    options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX))
      .pipe(z.array(z.string().min(1).max(POLL_LIMITS.OPTION_MAX)))
      .describe(
        'Answer options in display order. Community polls: 2–4 options. Consensus polls: exactly 1 option (voters approve or abstain).',
      ),
    pollType: pollTypeSchema,
    deadline: z.coerce
      .date()
      .optional()
      .describe(
        'Cutoff date/time after which votes are rejected. Accepts an ISO-8601 string or Date. Omit for open-ended consensus polls.',
      ),
    requiredConsensusPercentage: z.coerce
      .number()
      .min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN)
      .max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX)
      .optional()
      .describe(
        'Ownership-weighted approval threshold (10–100) required for consensus polls to pass. Ignored for community polls.',
      ),
    consensusCategory: z
      .string()
      .max(100)
      .optional()
      .describe(
        'Classification of the consensus decision (e.g. "fundUsage", "houseRules"); used to group and filter related polls.',
      ),
    legalBasis: z
      .string()
      .max(100)
      .optional()
      .describe(
        'Reference to the legal article or statute that authorises the vote; shown alongside consensus results for audit.',
      ),
    scopedUnitIds: multipartArray(uuidSchema)
      .optional()
      .describe(
        'UUIDs of units whose owners/tenants are eligible to vote. Omit for building-wide polls.',
      ),
    scopedUserIds: multipartArray(uuidSchema)
      .optional()
      .describe('UUIDs of users explicitly added to the eligible-voter list. Omit when not used.'),
    fileIds: multipartArray(uuidSchema)
      .optional()
      .default([])
      .describe('UUIDs of previously-uploaded supporting documents (proposals, receipts, specs).'),
  })
  .refine(
    (data) => {
      if (data.pollType === PollType.COMMUNITY) {
        return (
          data.options.length >= POLL_LIMITS.COMMUNITY_OPTIONS_MIN &&
          data.options.length <= POLL_LIMITS.COMMUNITY_OPTIONS_MAX
        );
      }
      if (data.pollType === PollType.CONSENSUS) {
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
      if (data.pollType === PollType.CONSENSUS) {
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
  question: z
    .string()
    .min(1)
    .max(POLL_LIMITS.QUESTION_MAX)
    .optional()
    .describe('Revised poll question, up to 250 chars.'),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX))
    .optional()
    .describe('Replacement option list. Must still respect the community/consensus option counts.'),
  pollType: pollTypeSchema.optional(),
  deadline: z.coerce
    .date()
    .optional()
    .describe('Revised deadline. Accepts an ISO-8601 string or Date.'),
  requiredConsensusPercentage: z.coerce
    .number()
    .min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN)
    .max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX)
    .optional()
    .describe('Revised ownership-weighted approval threshold (10–100) for consensus polls.'),
  consensusCategory: z
    .string()
    .max(100)
    .optional()
    .describe('Revised classification of the consensus decision (e.g. "fundUsage", "houseRules").'),
  legalBasis: z
    .string()
    .max(100)
    .optional()
    .describe('Revised reference to the legal article or statute that authorises the vote.'),
  status: z
    .enum(['active', 'inactive', 'ended'])
    .optional()
    .describe(
      'Lifecycle override: `active` accepts votes, `inactive` pauses the poll, `ended` seals it.',
    ),
  scopedUnitIds: multipartArray(uuidSchema)
    .optional()
    .describe('Replacement list of scoped unit UUIDs. Empty array clears scoping.'),
  scopedUserIds: multipartArray(uuidSchema)
    .optional()
    .describe('Replacement list of scoped user UUIDs. Empty array clears explicit-user scoping.'),
  fileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of newly-uploaded supporting documents to attach.'),
  removeChildFileIds: multipartArray(uuidSchema)
    .optional()
    .describe('UUIDs of previously-attached files to detach from the poll.'),
});

/**
 * Vote on poll request schema
 *
 * Backend stores poll options as a JSON array and votes reference the
 * 0-based index, not the option's row id — that's what the controller
 * expects on the wire.
 */
export const votePollSchema = z.object({
  selectedOptionIndex: z
    .number()
    .int()
    .min(0)
    .describe('Zero-based index into the poll’s `options` array identifying the chosen option.'),
});

/**
 * Finalize poll request schema
 *
 * A boolean toggle — `true` seals the poll, `false` is a no-op the
 * controller still accepts to match the existing API shape.
 */
export const finalizePollSchema = z.object({
  finalize: z
    .boolean()
    .describe(
      'True to seal the poll and freeze its results; false is accepted as a no-op for legacy compatibility.',
    ),
});

// Inferred types
export type CreatePollSchema = z.infer<typeof createPollSchema>;
export type UpdatePollSchema = z.infer<typeof updatePollSchema>;
export type VotePollSchema = z.infer<typeof votePollSchema>;
export type FinalizePollSchema = z.infer<typeof finalizePollSchema>;
