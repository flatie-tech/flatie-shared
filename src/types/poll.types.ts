import type { z } from 'zod';
import type { PollType } from '../enums/poll-type.enum';
import type { CommonStatus } from '../enums/status.enum';
import type { votePollSchema } from '../schemas/entities/poll.schema';
import type { BuildingUserEntity } from './base-entity.types';

/**
 * Poll entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * decimal-string weights) — deliberately diverges from `pollResponseSchema`
 * (wire shape: ISO strings, results/vote-status envelopes, permission flags).
 */
export interface Poll extends BuildingUserEntity {
  question: string;
  options: string[];
  pollType: PollType;
  status: CommonStatus;
  deadline?: Date | string | null;
  requiredConsensusPercentage?: string | null;
  totalVotes: number;
  totalWeight: string;
  winningOptionIndex?: number | null;
  isResultsFinalized: boolean;
  finalizedAt?: Date | string | null;
  finalizedBy?: string | null;
}

/**
 * Poll option result
 */
export interface PollOptionResult {
  optionIndex: number;
  option: string;
  voteCount: number;
  totalWeight: string;
  percentage: number;
}

/**
 * Poll vote
 */
export interface PollVote {
  id: string;
  pollId: string;
  userId: string;
  selectedOptionIndex: number;
  voteWeight: string;
  createdAt: Date | string;
}

/**
 * Create poll request.
 *
 * Kept hand-written: the JSON payload a client sends (deadline as ISO
 * string). Diverges from `createPollSchema` (multipart request), whose
 * parsed output has a coerced `Date` deadline plus scoping/consensus fields.
 */
export interface CreatePollRequest {
  question: string;
  options: string[];
  pollType: PollType;
  deadline?: string;
  requiredConsensusPercentage?: number;
}

/**
 * Vote request — derived from `votePollSchema` so the request type and the
 * Zod validator can never drift apart. Same exported name and shape as the
 * previously hand-written interface.
 */
export type VoteRequest = z.infer<typeof votePollSchema>;
