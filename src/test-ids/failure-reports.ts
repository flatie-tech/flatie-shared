export const FailureReportsTestIds = {
  screen: 'failure-reports-screen',
  searchInput: 'failure-reports-search-input',
  addButton: 'failure-reports-add-button',
  card: 'failure-report-card',
  viewModal: 'failure-report-view-modal',
  createModal: 'failure-report-create-modal',
  editButton: 'failure-report-edit-button',
  deleteButton: 'failure-report-delete-button',
  deleteConfirm: 'failure-report-delete-confirm',
  statusFilter: 'failure-reports-status-filter',
  viewToggle: 'failure-reports-view-toggle',
  /** Suffix with the report id at call sites: `${approveButton}-${id}`.
   * Values match the literals mobile already uses in FailureReportCard. */
  approveButton: 'approve-failure-report',
  declineButton: 'decline-failure-report',
} as const;
