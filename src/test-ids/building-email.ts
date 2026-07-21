export const BuildingEmailTestIds = {
  screen: 'building-email-screen',
  composeButton: 'building-email-compose-button',
  /** Suffix with the thread id at call sites: `${threadItem}-${id}`. */
  threadItem: 'building-email-thread-item',
  replyInput: 'building-email-reply-input',
  sendButton: 'building-email-send-button',
  archiveButton: 'building-email-archive-button',
  /** Suffix with the attachment id: `${attachment}-${id}`. */
  attachment: 'building-email-attachment',
  searchInput: 'building-email-search-input',
  tabActive: 'building-email-tab-active',
  tabArchived: 'building-email-tab-archived',
} as const;
