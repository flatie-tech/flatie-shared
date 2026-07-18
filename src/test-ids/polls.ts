export const PollsTestIds = {
  screen: 'polls-screen',
  searchInput: 'polls-search-input',
  addButton: 'polls-add-button',
  // Consensus poll: identity-verified vote button (Certilia OIDC)
  identityVerifiedVoteButton: 'poll-identity-verified-vote-button',
  /** Suffix list-item ids with the poll id at call sites: `${card}-${id}`. */
  card: 'poll-card',
  viewModal: 'poll-view-modal',
  createModal: 'poll-create-modal',
  editButton: 'poll-edit-button',
  deleteButton: 'poll-delete-button',
  deleteConfirm: 'poll-delete-confirm',
  voteButton: 'poll-vote-button',
  /** Opens the voters roster (POLL_FINALIZE-gated). */
  votersButton: 'poll-voters-button',
  statusFilter: 'polls-status-filter',
  /** Card/table view toggle on the management board (web). */
  viewToggle: 'polls-view-toggle',
} as const;
