import type { PollType } from '../enums/poll-type.enum';
import type { CommonStatus } from '../enums/status.enum';
import type { BuildingUserEntity, PermissionFields } from './base-entity.types';

/**
 * Poll entity
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
 * Poll with results for API responses
 */
export interface PollWithResults extends Poll, PermissionFields {
  results?: PollOptionResult[];
  userVote?: PollVote | null;
  creator?: {
    id: string;
    name: string;
    image?: string | null;
  };
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
 * Create poll request
 */
export interface CreatePollRequest {
  question: string;
  options: string[];
  pollType: PollType;
  deadline?: string;
  requiredConsensusPercentage?: number;
}

/**
 * Vote request
 */
export interface VoteRequest {
  selectedOptionIndex: number;
}
