export const PollVoteStatus = {
  ACCEPTED: 'ACCEPTED',
  PENDING_SIGNATURE_REVIEW: 'PENDING_SIGNATURE_REVIEW',
  REJECTED: 'REJECTED',
} as const;

export type PollVoteStatus = (typeof PollVoteStatus)[keyof typeof PollVoteStatus];
