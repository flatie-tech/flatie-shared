/**
 * Machine-readable reason the calling user cannot vote on a poll. Returned
 * alongside `canVote: false` so the client can show a specific "why" (a locked
 * icon + tooltip) instead of a generic "not eligible" message.
 *
 * Ordering note (backend emits the first matching reason): most-final first, so
 * a voter sees the least-actionable blocker last.
 */
export const PollCannotVoteReason = {
  /** Already cast a ballot on this poll. */
  ALREADY_VOTED: 'ALREADY_VOTED',
  /** Poll is completed/cancelled or its deadline has passed. */
  POLL_ENDED: 'POLL_ENDED',
  /** Poll has not been approved by a representative yet. */
  NOT_APPROVED: 'NOT_APPROVED',
  /** Caller's role does not include `poll:vote`. */
  NO_VOTE_PERMISSION: 'NO_VOTE_PERMISSION',
  /** Caller reaches the building only via org/platform admin access — no co-owner membership here. */
  NON_VOTER_CONTEXT: 'NON_VOTER_CONTEXT',
  /** Not in the poll's scoped-user list, or zero ownership surface on a building-wide consensus poll. */
  NOT_ELIGIBLE_SCOPE: 'NOT_ELIGIBLE_SCOPE',
  /** Consensus poll needs the user's OIB on file first (resolved in-flow via a dialog). */
  NEEDS_OIB: 'NEEDS_OIB',
  /** Building requires a higher verification tier than the caller can currently reach. */
  NEEDS_IDENTITY: 'NEEDS_IDENTITY',
} as const;

export type PollCannotVoteReason = (typeof PollCannotVoteReason)[keyof typeof PollCannotVoteReason];

/**
 * Reason → i18n key suffix. Web reads `Polls.cannotVoteReason.<suffix>` (next-intl),
 * mobile reads `polls.cannotVoteReason.<suffix>` (i18next). Owning the suffixes here
 * guarantees both apps use identical key names, and a new reason is a type error
 * until this map handles it.
 */
export const POLL_CANNOT_VOTE_REASON_KEY: Record<PollCannotVoteReason, string> = {
  ALREADY_VOTED: 'alreadyVoted',
  POLL_ENDED: 'pollEnded',
  NOT_APPROVED: 'notApproved',
  NO_VOTE_PERMISSION: 'noVotePermission',
  NON_VOTER_CONTEXT: 'nonVoterContext',
  NOT_ELIGIBLE_SCOPE: 'notEligibleScope',
  NEEDS_OIB: 'needsOib',
  NEEDS_IDENTITY: 'needsIdentity',
};
