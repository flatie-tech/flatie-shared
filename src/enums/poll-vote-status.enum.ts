/**
 * Lifecycle of a single poll vote row.
 *
 * Most votes (Certilia online + rep-recorded offline) are inserted as
 * `ACCEPTED` straight away and immediately fold into the poll totals.
 *
 * Printed-signature votes go through a review queue: the co-owner
 * uploads a signed PDF, the row lands as `PENDING_SIGNATURE_REVIEW`,
 * and a building representative either approves it (status flips to
 * `ACCEPTED` and the totals are updated then) or rejects it (status
 * `REJECTED`, voter notified with the reason, may re-upload).
 */
export const PollVoteStatus = {
  ACCEPTED: 'accepted',
  PENDING_SIGNATURE_REVIEW: 'pending_signature_review',
  REJECTED: 'rejected',
} as const;

export type PollVoteStatus = (typeof PollVoteStatus)[keyof typeof PollVoteStatus];
