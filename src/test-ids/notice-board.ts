export const NoticeBoardTestIds = {
  screen: 'notices-screen',
  searchInput: 'notices-search-input',
  addButton: 'notices-add-button',
  card: 'notice-card',
  viewModal: 'notice-view-modal',
  createModal: 'notice-create-modal',
  editButton: 'notice-edit-button',
  deleteButton: 'notice-delete-button',
  deleteConfirm: 'notice-delete-confirm',
  pinButton: 'notice-pin-button',
  pendingToggle: 'notices-pending-toggle',
  /** Suffix with the notice id at call sites: `${approveButton}-${id}` */
  approveButton: 'approve-notice',
  declineButton: 'decline-notice',
} as const;
