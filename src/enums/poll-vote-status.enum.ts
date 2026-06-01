export const PollVoteStatus = {
  ACCEPTED: 'accepted',
  PENDING_SIGNATURE_REVIEW: 'pending_signature_review',
  REJECTED: 'rejected',
} as const;

export type PollVoteStatus = (typeof PollVoteStatus)[keyof typeof PollVoteStatus];
