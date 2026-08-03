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
  /** Floating inbox launcher button (web widget). */
  fab: 'building-email-fab',
  /** Unread badge rendered on the FAB. */
  fabUnreadBadge: 'building-email-fab-unread-badge',
  /** Corner-panel widget container. */
  widgetPanel: 'building-email-widget-panel',
  /** Back button shown in thread view on mobile / in the widget. */
  mobileBackButton: 'building-email-mobile-back-button',
  /** Toggle that expands collapsed quoted history inside a message. */
  quoteToggle: 'building-email-quote-toggle',
  /** Sanitized HTML body container of an inbound message. */
  htmlBody: 'building-email-html-body',
  /** Unread-count chip on a thread list row. */
  unreadBadge: 'building-email-unread-badge',
  /** Direction (inbound/outbound) icon on a thread list row. */
  directionIcon: 'building-email-direction-icon',
} as const;
