import { z } from 'zod';
import { pollTypeSchema } from '../entities/poll.schema';
import { paginatedResponseSchema } from '../pagination.schema';

const pollStatusSchema = z.enum(['active', 'completed', 'cancelled']);

const pollDocumentReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  documentUrl: z.string(),
  fileType: z.enum(['image', 'document']),
  uploadedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
});

const pollMaintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  contractor: z.string(),
  cost: z.number(),
  createdAt: z.string(),
});

const pollScopedUnitSchema = z.looseObject({
  unitType: z.string(),
  unitId: z.string(),
  label: z.string(),
  floor: z.string().optional(),
});

const pollScopedUserSchema = z.looseObject({
  userId: z.string(),
  name: z.string(),
});

/**
 * Per-user poll response — shape returned from poll list / detail
 * endpoints where the current user may have voted but the poll is
 * not yet finalised.
 */
export const pollResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deadline: z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional(),
  totalVotes: z.number(),
  totalWeight: z.number(),
  winningOptionIndex: z.number().optional(),
  isResultsFinalized: z.boolean(),
  finalizedAt: z.string().optional(),
  finalizedBy: z.string().optional(),
  hasVoted: z.boolean().optional(),
  userVote: z.number().optional(),
  files: z.array(pollDocumentReferenceSchema).optional(),
});

const pollOptionResultSchema = z.looseObject({
  optionIndex: z.number(),
  optionText: z.string(),
  voteCount: z.number(),
  totalWeight: z.number(),
  percentage: z.number(),
  weightPercentage: z.number(),
});

/**
 * Poll results response — fuller shape with per-option breakdown,
 * consensus flags and permissions, returned from the results endpoint.
 */
export const pollResultsSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
  deadline: z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional(),
  totalVotes: z.number(),
  totalWeight: z.number(),
  totalEligibleVoters: z.number(),
  winningOptionIndex: z.number().optional(),
  isResultsFinalized: z.boolean(),
  finalizedAt: z.string().optional(),
  finalizedBy: z.string().optional(),
  optionResults: z.array(pollOptionResultSchema),
  consensusReached: z.boolean().optional(),
  currentConsensusPercentage: z.number().optional(),
  approved: z.boolean(),
  canApprove: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canVote: z.boolean(),
  hasUserVoted: z.boolean(),
  userVotedOptionIndex: z.number().nullable().optional(),
  scopedUnits: z.array(pollScopedUnitSchema).optional(),
  eligibleTotalWeight: z.number().optional(),
  scopedUsers: z.array(pollScopedUserSchema).optional(),
  maintenanceLogs: z.array(pollMaintenanceLogReferenceSchema).optional(),
  files: z.array(pollDocumentReferenceSchema).optional(),
});

const pollVoterSchema = z.looseObject({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  selectedOptionIndex: z.number(),
  selectedOptionText: z.string(),
  voteWeight: z.number(),
  votedAt: z.string(),
});

/**
 * Poll voters response — voter list returned from the voters endpoint.
 */
export const pollVotersResponseSchema = z.looseObject({
  pollId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  totalVotes: z.number(),
  voters: z.array(pollVoterSchema),
});

export const paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);

export type PollResponse = z.infer<typeof pollResponseSchema>;
export type PollResults = z.infer<typeof pollResultsSchema>;
export type PollVotersResponse = z.infer<typeof pollVotersResponseSchema>;
export type PaginatedPollsResponse = z.infer<typeof paginatedPollsResponseSchema>;
