export const DocumentsTestIds = {
  screen: 'documents-screen',
  searchInput: 'documents-search-input',
  addButton: 'documents-add-button',
  /** Suffix with the document id at call sites: `${card}-${id}`. */
  card: 'document-card',
  viewModal: 'document-view-modal',
  createModal: 'document-create-modal',
  editButton: 'document-edit-button',
  deleteButton: 'document-delete-button',
  deleteConfirm: 'document-delete-confirm',
  /** Per child-file download/open control. */
  downloadButton: 'document-download-button',
  privateToggle: 'document-private-toggle',
  typeFilter: 'documents-type-filter',
  viewToggle: 'documents-view-toggle',
} as const;
