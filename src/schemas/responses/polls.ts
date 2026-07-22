import { z } from 'zod';
import { PollCannotVoteReason } from '../../enums/poll-cannot-vote-reason.enum';
import { pollTypeSchema } from '../entities/poll.schema';
import { paginatedResponseSchema } from '../pagination.schema';
import type { Strict } from './_strict';

const pollStatusSchema = z
  .enum(['active', 'completed', 'cancelled'])
  .describe(
    'Poll lifecycle: `active` while accepting votes, `completed` once finalised, `cancelled` when archived before completion.',
  );

const pollDocumentReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    title: z.string().describe('Document title displayed in the file list.'),
    description: z
      .string()
      .nullable()
      .optional()
      .describe('Optional short description; null when none was provided.'),
    documentUrl: z.string().describe('Absolute URL to download or preview the file.'),
    fileType: z
      .enum(['image', 'document'])
      .describe('Coarse file category used to pick the viewer (image preview vs document reader).'),
    uploadedBy: z
      .string()
      .describe('Display name or UUID of the uploader, depending on the endpoint.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the file was attached to the poll.'),
    updatedAt: z
      .string()
      .nullable()
      .optional()
      .describe('ISO-8601 timestamp of the last file update; null when never updated.'),
  })
  .describe('Supporting document attached to a poll (proposal, receipt, spec, etc.).');

const pollMaintenanceLogReferenceSchema = z
  .looseObject({
    id: z.string().uuid(),
    title: z.string().describe('Linked maintenance-log title.'),
    contractor: z.string().describe('Contractor who performed the underlying work.'),
    cost: z.number().describe('Total cost of the underlying work.'),
    createdAt: z.string().describe('ISO-8601 timestamp when the maintenance log was created.'),
  })
  .describe('Maintenance log linked to this poll (e.g. a quote being voted on).');

const pollScopedUnitSchema = z
  .looseObject({
    unitType: z
      .string()
      .describe('Kind of unit eligible to vote (`apartment`, `garage`, `storage_unit`).'),
    unitId: z.string().describe('UUID of the scoped unit.'),
    label: z.string().describe('Human-readable unit label (e.g. "Apartment 4B").'),
    floor: z
      .string()
      .optional()
      .describe('Floor label where the unit is located; absent when not recorded.'),
  })
  .describe('Unit whose owners/tenants are eligible to participate in a scoped poll.');

const pollScopedOwnerSchema = z
  .looseObject({
    ownerId: z.string().describe('UUID of the explicitly-eligible owner record.'),
    fullName: z.string().describe('Display name of the scoped owner.'),
    userId: z
      .string()
      .nullable()
      .optional()
      .describe('UUID of the linked user account; null for placeholder owners without an account.'),
  })
  .describe('Owner record explicitly added to the poll’s eligible-voter list.');

/**
 * Per-user poll response — shape returned from poll list / detail
 * endpoints where the current user may have voted but the poll is
 * not yet finalised.
 */
export const pollResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building this poll belongs to.'),
  question: z.string().describe('Poll question displayed to voters.'),
  options: z
    .array(z.string())
    .describe(
      'Answer options in display order. Community polls: 2–4 options. Consensus polls: always a single option (voters approve or abstain).',
    ),
  createdBy: z
    .string()
    .describe('UUID of the user who created the poll; preserved even after user deletion.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the poll was created.'),
  updatedAt: z.string().describe('ISO-8601 timestamp of the last poll mutation.'),
  deadline: z
    .string()
    .optional()
    .describe(
      'ISO-8601 datetime after which votes are rejected. Absent for open-ended consensus polls.',
    ),
  pollType: pollTypeSchema.describe(
    '`COMMUNITY` polls pass by simple majority; `CONSENSUS` polls require an ownership-weighted threshold.',
  ),
  status: pollStatusSchema,
  requiredConsensusPercentage: z
    .number()
    .optional()
    .describe(
      'Ownership-weighted approval threshold (10–100) required for consensus polls; absent for community polls.',
    ),
  totalVotes: z.number().describe('Number of distinct voters who have voted so far.'),
  totalWeight: z
    .number()
    .describe(
      'Sum of vote weights cast so far. Equal to `totalVotes` for community polls; varies by ownership for consensus polls.',
    ),
  winningOptionIndex: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Zero-based index of the winning option once the poll is finalised; null while still active or if no option won.',
    ),
  isResultsFinalized: z
    .boolean()
    .describe('True once results have been sealed and no further votes are accepted.'),
  finalizedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp when the poll was finalised; null while active.'),
  finalizedBy: z
    .string()
    .nullable()
    .optional()
    .describe('UUID of the user who finalised the poll; null while active.'),
  hasVoted: z
    .boolean()
    .optional()
    .describe('True when the calling user has already cast a vote on this poll.'),
  userVote: z
    .number()
    .optional()
    .describe(
      'Zero-based index of the option the calling user voted for; absent when the user has not voted.',
    ),
  files: z
    .array(pollDocumentReferenceSchema)
    .optional()
    .describe('Supporting documents uploaded with the poll; absent when none.'),
});

const pollOptionResultSchema = z
  .looseObject({
    optionIndex: z.number().describe('Zero-based index into the poll `options` array.'),
    optionText: z.string().describe('Text of the option (denormalised for convenience).'),
    voteCount: z.number().describe('Number of distinct voters that chose this option.'),
    totalWeight: z
      .number()
      .describe('Sum of vote weights for this option (ownership-weighted for consensus polls).'),
    percentage: z
      .number()
      .describe('Share of `totalVotes` that chose this option, in percent (0–100).'),
    weightPercentage: z
      .number()
      .describe('Share of `totalWeight` that chose this option, in percent (0–100).'),
  })
  .describe('Per-option tally produced after finalising a poll.');

/**
 * Poll results response — fuller shape with per-option breakdown,
 * consensus flags and permissions, returned from the results endpoint.
 */
export const pollResultsSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe('UUID of the building this poll belongs to.'),
  question: z.string().describe('Poll question displayed to voters.'),
  options: z.array(z.string()).describe('Answer options in display order.'),
  createdBy: z.string().describe('UUID of the user who created the poll.'),
  createdAt: z.string().describe('ISO-8601 timestamp when the poll was created.'),
  deadline: z
    .string()
    .optional()
    .describe('ISO-8601 datetime after which votes are rejected. Absent for open-ended polls.'),
  pollType: pollTypeSchema.describe('`COMMUNITY` for majority polls, `CONSENSUS` for weighted.'),
  status: pollStatusSchema,
  requiredConsensusPercentage: z
    .number()
    .optional()
    .describe('Consensus approval threshold in percent (10–100) for consensus polls.'),
  totalVotes: z.number().describe('Number of distinct voters who have voted so far.'),
  totalWeight: z
    .number()
    .describe('Sum of vote weights cast so far (ownership-weighted for consensus polls).'),
  totalEligibleVoters: z
    .number()
    .describe('Number of distinct users eligible to vote on this poll (based on scope).'),
  winningOptionIndex: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Zero-based index of the winning option once finalised; null while active or if no option won.',
    ),
  isResultsFinalized: z
    .boolean()
    .describe('True once results are sealed and no further votes are accepted.'),
  finalizedAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp when the poll was finalised; null while active.'),
  finalizedBy: z
    .string()
    .nullable()
    .optional()
    .describe('UUID of the user who finalised the poll; null while active.'),
  optionResults: z.array(pollOptionResultSchema).describe('Per-option vote tallies.'),
  consensusReached: z
    .boolean()
    .optional()
    .describe(
      'True when the ownership-weighted approval threshold has been reached. Only present for consensus polls.',
    ),
  currentConsensusPercentage: z
    .number()
    .optional()
    .describe('Current cumulative weight in favour, in percent. Only present for consensus polls.'),
  approved: z
    .boolean()
    .describe('True when a representative has approved the poll for public visibility.'),
  canApprove: z.boolean().describe('True when the calling user may approve or reject the poll.'),
  canEdit: z.boolean().describe('True when the calling user may edit this poll.'),
  canDelete: z.boolean().describe('True when the calling user may delete this poll.'),
  isOwner: z.boolean().describe('True when the calling user is the creator of this poll.'),
  canVote: z
    .boolean()
    .describe(
      'True when the calling user is eligible to vote and has not yet voted (and the poll is still active).',
    ),
  cannotVoteReason: z
    .enum(Object.values(PollCannotVoteReason) as [PollCannotVoteReason, ...PollCannotVoteReason[]])
    .optional()
    .describe('Machine-readable reason the caller cannot vote (present when canVote is false).'),
  hasUserVoted: z.boolean().describe('True when the calling user has already voted on this poll.'),
  userVotedOptionIndex: z
    .number()
    .nullable()
    .optional()
    .describe(
      'Zero-based index of the option the calling user voted for; null when they have not voted.',
    ),
  scopedUnits: z
    .array(pollScopedUnitSchema)
    .optional()
    .describe('Units scoped into eligibility; absent when the poll is building-wide.'),
  eligibleTotalWeight: z
    .number()
    .optional()
    .describe(
      'Cached sum of eligible voters’ ownership percentages captured at poll creation. Used to normalise `totalWeight` against the full eligible weight.',
    ),
  scopedOwners: z
    .array(pollScopedOwnerSchema)
    .optional()
    .describe('Owners scoped into eligibility by explicit selection; absent when not used.'),
  maintenanceLogs: z
    .array(pollMaintenanceLogReferenceSchema)
    .optional()
    .describe('Maintenance logs linked to the poll (for context); absent when none.'),
  files: z
    .array(pollDocumentReferenceSchema)
    .optional()
    .describe('Supporting documents uploaded with the poll; absent when none.'),
});

const pollVoterSchema = z
  .looseObject({
    userId: z
      .string()
      .nullable()
      .describe(
        'UUID of the voting user; null for paper votes recorded for owners without accounts.',
      ),
    ownerId: z
      .string()
      .nullable()
      .optional()
      .describe('UUID of the owner record the vote is attributed to; null for non-owner voters.'),
    name: z.string().describe('Voter display name (owner full name for owner-attributed votes).'),
    email: z.string().nullable().optional().describe('Voter contact email; null when unknown.'),
    selectedOptionIndex: z.number().describe('Zero-based index of the option the voter chose.'),
    selectedOptionText: z.string().describe('Text of the chosen option (denormalised).'),
    voteWeight: z
      .number()
      .describe(
        'Weight contributed by this vote. 1.00 for community polls; the voter’s derived building ownership share (5-decimal precision) for consensus polls.',
      ),
    votedAt: z.string().describe('ISO-8601 timestamp when the vote was recorded.'),
    isOffline: z
      .boolean()
      .optional()
      .describe('True when the vote was recorded by a representative from a paper signature.'),
    hasAccount: z
      .boolean()
      .optional()
      .describe('True when the voter has a registered user account.'),
  })
  .describe('Individual voter entry returned by the poll voters endpoint.');

/**
 * Eligible-voter roster entry — one row per owner in the poll's
 * electorate, with the derived ownership weight and unit holdings.
 * Powers the offline-votes modal and signature-sheet preview.
 */
export const pollEligibleVoterSchema = z
  .looseObject({
    ownerId: z.string().uuid().describe('UUID of the owner record.'),
    userId: z
      .string()
      .nullable()
      .describe('UUID of the linked user account; null for placeholder owners.'),
    fullName: z.string().describe('Owner full name (person, joint couple, or legal entity).'),
    email: z.string().nullable().describe('Owner contact email; null when not recorded.'),
    oib: z.string().nullable().describe('Croatian OIB of the owner; null when not recorded.'),
    weightPct: z
      .string()
      .describe(
        'Derived ownership weight in percent as an exact decimal string (5-decimal precision), e.g. "12.20000".',
      ),
    holdings: z
      .array(
        z.looseObject({
          unitType: z
            .string()
            .describe('Kind of unit held (`apartment`, `garage`, `storage_unit`).'),
          unitId: z.string().describe('UUID of the unit.'),
          label: z.string().describe('Human-readable unit label (e.g. "ST 3448").'),
          floor: z.string().nullable().optional().describe('Floor label; null when not recorded.'),
          areaM2: z
            .string()
            .nullable()
            .describe('Unit area in m² as a decimal string; null when not recorded.'),
          unitSharePct: z
            .string()
            .describe('Owner’s share of this unit in percent as a decimal string.'),
        }),
      )
      .describe('Units this owner currently holds, with per-unit shares.'),
    voteStatus: z
      .enum(['not_voted', 'accepted', 'pending_signature_review', 'rejected'])
      .optional()
      .describe('The owner’s vote state on the poll in question, when requested per-poll.'),
  })
  .describe('Aggregated per-owner roster row for a poll’s electorate.');

/**
 * Eligible-voters response — the poll's electorate with derived
 * weights, plus data-quality warnings from the roster derivation.
 */
export const pollEligibleVotersResponseSchema = z.looseObject({
  pollId: z.string().uuid().describe('UUID of the poll this electorate belongs to.'),
  voters: z.array(pollEligibleVoterSchema).describe('One entry per eligible owner.'),
  totalWeightPct: z
    .string()
    .describe('Sum of eligible owners’ derived weights as an exact decimal string.'),
  warnings: z
    .looseObject({
      unitsWithoutArea: z
        .array(z.string())
        .describe('Labels of units with no recorded area (excluded from weight math).'),
      unitsWithoutOwners: z
        .array(z.string())
        .describe('Labels of units with no active owner (weight unassigned).'),
    })
    .describe('Data-quality warnings surfaced by the roster derivation.'),
});

/**
 * Poll voters response — voter list returned from the voters endpoint.
 */
export const pollVotersResponseSchema = z.looseObject({
  pollId: z.string().uuid().describe('UUID of the poll these voters belong to.'),
  question: z.string().describe('Poll question, repeated for convenience.'),
  options: z.array(z.string()).describe('Poll options in display order.'),
  totalVotes: z.number().describe('Total number of distinct voters represented in `voters`.'),
  voters: z.array(pollVoterSchema).describe('Individual voter entries with their chosen option.'),
});

export const paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);

export type PollResponse = Strict<z.infer<typeof pollResponseSchema>>;
export type PollResults = Strict<z.infer<typeof pollResultsSchema>>;
export type PollVotersResponse = Strict<z.infer<typeof pollVotersResponseSchema>>;
export type PaginatedPollsResponse = Strict<z.infer<typeof paginatedPollsResponseSchema>>;
export type PollEligibleVoter = Strict<z.infer<typeof pollEligibleVoterSchema>>;
export type PollEligibleVotersResponse = Strict<z.infer<typeof pollEligibleVotersResponseSchema>>;
