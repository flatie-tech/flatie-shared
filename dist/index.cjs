'use strict';

var chunkUBKEB3Y5_cjs = require('./chunk-UBKEB3Y5.cjs');
var chunkIYK3SBQT_cjs = require('./chunk-IYK3SBQT.cjs');
var chunkI5URKSQA_cjs = require('./chunk-I5URKSQA.cjs');
var chunk4RIQODWQ_cjs = require('./chunk-4RIQODWQ.cjs');
var chunkZUJ6MF3D_cjs = require('./chunk-ZUJ6MF3D.cjs');
var chunkGNXYTICM_cjs = require('./chunk-GNXYTICM.cjs');
var chunkMPI5UGBJ_cjs = require('./chunk-MPI5UGBJ.cjs');
var chunkSHM36YL5_cjs = require('./chunk-SHM36YL5.cjs');
var chunk5I5KPCET_cjs = require('./chunk-5I5KPCET.cjs');
var chunkPQVZX35D_cjs = require('./chunk-PQVZX35D.cjs');
var chunkN53GQVG7_cjs = require('./chunk-N53GQVG7.cjs');
var chunkUF3JI7WZ_cjs = require('./chunk-UF3JI7WZ.cjs');
var chunkOB3XVR2T_cjs = require('./chunk-OB3XVR2T.cjs');
require('./chunk-TCHOIK53.cjs');
var chunkQKHLAIRE_cjs = require('./chunk-QKHLAIRE.cjs');

// src/test-ids/apartments.ts
var ApartmentsTestIds = {
  screen: "apartments-screen",
  searchInput: "apartments-search-input"
};

// src/test-ids/app-shell.ts
var AppShellTestIds = {
  // Account dropdown trigger in the dashboard header (avatar button)
  accountDropdown: "account-dropdown",
  // Sign-out menu item inside the account dropdown
  signOutButton: "sign-out-button"
};

// src/test-ids/auth.ts
var LoginTestIds = {
  emailInput: "login-email-input",
  passwordInput: "login-password-input",
  passwordToggle: "login-password-toggle",
  googleButton: "login-google-button",
  submitButton: "login-submit-button",
  forgotPasswordLink: "login-forgot-password-link",
  rememberMe: "login-remember-me-checkbox",
  registerLink: "login-register-link"
};

// src/test-ids/board.ts
var BoardTestIds = {
  screen: "board-screen",
  searchInput: "board-search-input",
  addCardButton: "board-add-card-button",
  addColumnButton: "board-add-column-button",
  boardSwitcher: "board-switcher",
  column: "board-column",
  card: "board-card"
};

// src/test-ids/building-email.ts
var BuildingEmailTestIds = {
  screen: "building-email-screen",
  composeButton: "building-email-compose-button",
  /** Suffix with the thread id at call sites: `${threadItem}-${id}`. */
  threadItem: "building-email-thread-item",
  replyInput: "building-email-reply-input",
  sendButton: "building-email-send-button",
  archiveButton: "building-email-archive-button",
  /** Suffix with the attachment id: `${attachment}-${id}`. */
  attachment: "building-email-attachment",
  searchInput: "building-email-search-input",
  tabActive: "building-email-tab-active",
  tabArchived: "building-email-tab-archived",
  /** Floating inbox launcher button (web widget). */
  fab: "building-email-fab",
  /** Unread badge rendered on the FAB. */
  fabUnreadBadge: "building-email-fab-unread-badge",
  /** Corner-panel widget container. */
  widgetPanel: "building-email-widget-panel",
  /** Back button shown in thread view on mobile / in the widget. */
  mobileBackButton: "building-email-mobile-back-button",
  /** Toggle that expands collapsed quoted history inside a message. */
  quoteToggle: "building-email-quote-toggle",
  /** Sanitized HTML body container of an inbound message. */
  htmlBody: "building-email-html-body",
  /** Unread-count chip on a thread list row. */
  unreadBadge: "building-email-unread-badge",
  /** Direction (inbound/outbound) icon on a thread list row. */
  directionIcon: "building-email-direction-icon"
};

// src/test-ids/building-info.ts
var BuildingInfoTestIds = {
  screen: "building-info-screen"
};

// src/test-ids/building-overview.ts
var BuildingOverviewTestIds = {
  screen: "overview-screen",
  buildingInfoBanner: "overview-building-info-banner",
  noticesWidget: "overview-notices-widget",
  noticesViewAll: "overview-notices-view-all",
  pollsWidget: "overview-polls-widget",
  pollsViewAll: "overview-polls-view-all",
  recentItemsWidget: "overview-recent-items-widget",
  recentItemsViewAll: "overview-recent-items-view-all"
};

// src/test-ids/calendar.ts
var CalendarTestIds = {
  screen: "calendar-screen",
  searchInput: "calendar-search-input",
  addButton: "calendar-add-button"
};

// src/test-ids/documents.ts
var DocumentsTestIds = {
  screen: "documents-screen",
  searchInput: "documents-search-input",
  addButton: "documents-add-button",
  /** Suffix with the document id at call sites: `${card}-${id}`. */
  card: "document-card",
  viewModal: "document-view-modal",
  createModal: "document-create-modal",
  editButton: "document-edit-button",
  deleteButton: "document-delete-button",
  deleteConfirm: "document-delete-confirm",
  /** Per child-file download/open control. */
  downloadButton: "document-download-button",
  privateToggle: "document-private-toggle",
  typeFilter: "documents-type-filter",
  viewToggle: "documents-view-toggle"
};

// src/test-ids/failure-reports.ts
var FailureReportsTestIds = {
  screen: "failure-reports-screen",
  searchInput: "failure-reports-search-input",
  addButton: "failure-reports-add-button",
  card: "failure-report-card",
  viewModal: "failure-report-view-modal",
  createModal: "failure-report-create-modal",
  editButton: "failure-report-edit-button",
  deleteButton: "failure-report-delete-button",
  deleteConfirm: "failure-report-delete-confirm",
  statusFilter: "failure-reports-status-filter",
  viewToggle: "failure-reports-view-toggle",
  /** Suffix with the report id at call sites: `${approveButton}-${id}`.
   * Values match the literals mobile already uses in FailureReportCard. */
  approveButton: "approve-failure-report",
  declineButton: "decline-failure-report"
};

// src/test-ids/funds.ts
var FundsTestIds = {
  screen: "funds-screen",
  /** Tabs: overview / income / expenses. */
  incomeTab: "funds-income-tab",
  expensesTab: "funds-expenses-tab",
  /** Add income / add expense entry points. */
  addIncomeButton: "funds-add-income-button",
  addExpenseButton: "funds-add-expense-button",
  /** Suffix transaction rows with the id at call sites: `${transactionCard}-${id}`. */
  transactionCard: "funds-transaction-card",
  transactionForm: "funds-transaction-form",
  editTransactionButton: "funds-edit-transaction-button",
  deleteTransactionButton: "funds-delete-transaction-button",
  deleteTransactionConfirm: "funds-delete-transaction-confirm",
  amountInput: "funds-amount-input",
  /** Balance / CAMT import affordances. */
  updateBalanceButton: "funds-update-balance-button",
  camtImportButton: "funds-camt-import-button"
};

// src/test-ids/notice-board.ts
var NoticeBoardTestIds = {
  screen: "notices-screen",
  searchInput: "notices-search-input",
  addButton: "notices-add-button",
  card: "notice-card",
  viewModal: "notice-view-modal",
  createModal: "notice-create-modal",
  editButton: "notice-edit-button",
  deleteButton: "notice-delete-button",
  deleteConfirm: "notice-delete-confirm",
  pinButton: "notice-pin-button",
  pendingToggle: "notices-pending-toggle",
  /** Suffix with the notice id at call sites: `${approveButton}-${id}` */
  approveButton: "approve-notice",
  declineButton: "decline-notice"
};

// src/test-ids/onboarding.ts
var OnboardingTestIds = {
  // The three top-level tabs on /onboarding for users without buildings
  tabFind: "onboarding-tab-find",
  tabJoin: "onboarding-tab-join",
  tabCreate: "onboarding-tab-create"
};

// src/test-ids/polls.ts
var PollsTestIds = {
  screen: "polls-screen",
  searchInput: "polls-search-input",
  addButton: "polls-add-button",
  // Consensus poll: identity-verified vote button (Certilia OIDC)
  identityVerifiedVoteButton: "poll-identity-verified-vote-button",
  /** Suffix list-item ids with the poll id at call sites: `${card}-${id}`. */
  card: "poll-card",
  viewModal: "poll-view-modal",
  createModal: "poll-create-modal",
  editButton: "poll-edit-button",
  deleteButton: "poll-delete-button",
  deleteConfirm: "poll-delete-confirm",
  voteButton: "poll-vote-button",
  /** Opens the voters roster (POLL_FINALIZE-gated). */
  votersButton: "poll-voters-button",
  statusFilter: "polls-status-filter",
  /** Card/table view toggle on the management board (web). */
  viewToggle: "polls-view-toggle"
};

// src/test-ids/settings.ts
var SettingsTestIds = {
  screen: "settings-screen",
  logoutButton: "settings-logout-button"
};

Object.defineProperty(exports, "API_ROUTES", {
  enumerable: true,
  get: function () { return chunkUBKEB3Y5_cjs.API_ROUTES; }
});
Object.defineProperty(exports, "DATETIME_FORMATS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.DATETIME_FORMATS; }
});
Object.defineProperty(exports, "DATE_FORMATS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.DATE_FORMATS; }
});
Object.defineProperty(exports, "LOCALE_MAP", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.LOCALE_MAP; }
});
Object.defineProperty(exports, "MANAGERIAL_BUILDING_ROLES", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.MANAGERIAL_BUILDING_ROLES; }
});
Object.defineProperty(exports, "ParseError", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.ParseError; }
});
Object.defineProperty(exports, "ROLE_BADGE_COLORS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.ROLE_BADGE_COLORS; }
});
Object.defineProperty(exports, "ROLE_DESCRIPTION_KEYS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.ROLE_DESCRIPTION_KEYS; }
});
Object.defineProperty(exports, "ROLE_TRANSLATION_KEYS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.ROLE_TRANSLATION_KEYS; }
});
Object.defineProperty(exports, "TIME_FORMATS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.TIME_FORMATS; }
});
Object.defineProperty(exports, "VOTING_METHOD_SETTINGS", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.VOTING_METHOD_SETTINGS; }
});
Object.defineProperty(exports, "applyResidentRestriction", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.applyResidentRestriction; }
});
Object.defineProperty(exports, "applyResidentRestrictionToItem", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.applyResidentRestrictionToItem; }
});
Object.defineProperty(exports, "buildGoogleCalendarUrl", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.buildGoogleCalendarUrl; }
});
Object.defineProperty(exports, "canDo", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.canDo; }
});
Object.defineProperty(exports, "canDoOnResource", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.canDoOnResource; }
});
Object.defineProperty(exports, "canMessageUser", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.canMessageUser; }
});
Object.defineProperty(exports, "computeActionFlags", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.computeActionFlags; }
});
Object.defineProperty(exports, "createPermissionChecker", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.createPermissionChecker; }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.debounce; }
});
Object.defineProperty(exports, "formatCurrency", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatCurrency; }
});
Object.defineProperty(exports, "formatCurrencyByLocale", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatCurrencyByLocale; }
});
Object.defineProperty(exports, "formatCurrencyEUR", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatCurrencyEUR; }
});
Object.defineProperty(exports, "formatDateByLocale", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatDate; }
});
Object.defineProperty(exports, "formatDateTime", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatDateTime; }
});
Object.defineProperty(exports, "formatText", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.formatText; }
});
Object.defineProperty(exports, "getContextUserId", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.getContextUserId; }
});
Object.defineProperty(exports, "getDateLocale", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.getDateLocale; }
});
Object.defineProperty(exports, "getInitials", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.getInitials; }
});
Object.defineProperty(exports, "getMessageableUsers", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.getMessageableUsers; }
});
Object.defineProperty(exports, "getRoleBadge", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.getRoleBadge; }
});
Object.defineProperty(exports, "isFeatureAvailable", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.isFeatureAvailable; }
});
Object.defineProperty(exports, "isManagerialRole", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.isManagerialRole; }
});
Object.defineProperty(exports, "normalizePaginatedResponse", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.normalizePaginatedResponse; }
});
Object.defineProperty(exports, "parseApiError", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.parseApiError; }
});
Object.defineProperty(exports, "parseData", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.parseData; }
});
Object.defineProperty(exports, "resolveVotingMethods", {
  enumerable: true,
  get: function () { return chunkIYK3SBQT_cjs.resolveVotingMethods; }
});
Object.defineProperty(exports, "addressSchema", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.addressSchema; }
});
Object.defineProperty(exports, "isUuid", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.isUuid; }
});
Object.defineProperty(exports, "oibSchema", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.oibSchema; }
});
Object.defineProperty(exports, "optionalOibSchema", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.optionalOibSchema; }
});
Object.defineProperty(exports, "phoneSchema", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.phoneSchema; }
});
Object.defineProperty(exports, "toUuid", {
  enumerable: true,
  get: function () { return chunkI5URKSQA_cjs.toUuid; }
});
Object.defineProperty(exports, "addressSearchResultSchema", {
  enumerable: true,
  get: function () { return chunk4RIQODWQ_cjs.addressSearchResultSchema; }
});
Object.defineProperty(exports, "buildMapUrl", {
  enumerable: true,
  get: function () { return chunk4RIQODWQ_cjs.buildMapUrl; }
});
Object.defineProperty(exports, "compareHouseNumbers", {
  enumerable: true,
  get: function () { return chunk4RIQODWQ_cjs.compareHouseNumbers; }
});
Object.defineProperty(exports, "existingBuildingRefSchema", {
  enumerable: true,
  get: function () { return chunk4RIQODWQ_cjs.existingBuildingRefSchema; }
});
Object.defineProperty(exports, "structuredAddressInputSchema", {
  enumerable: true,
  get: function () { return chunk4RIQODWQ_cjs.structuredAddressInputSchema; }
});
Object.defineProperty(exports, "formatAddress", {
  enumerable: true,
  get: function () { return chunkZUJ6MF3D_cjs.formatAddress; }
});
Object.defineProperty(exports, "normalizeHouseNumber", {
  enumerable: true,
  get: function () { return chunkZUJ6MF3D_cjs.normalizeHouseNumber; }
});
Object.defineProperty(exports, "parseHouseNumber", {
  enumerable: true,
  get: function () { return chunkZUJ6MF3D_cjs.parseHouseNumber; }
});
Object.defineProperty(exports, "ADMIN_ORG_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ADMIN_ORG_PERMISSIONS; }
});
Object.defineProperty(exports, "ADMIN_PLATFORM_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ADMIN_PLATFORM_PERMISSIONS; }
});
Object.defineProperty(exports, "ALLOWED_ENTITY_LINKS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ALLOWED_ENTITY_LINKS; }
});
Object.defineProperty(exports, "ALL_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ALL_PERMISSIONS; }
});
Object.defineProperty(exports, "ALWAYS_ON_NOTIFICATION_TYPES", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ALWAYS_ON_NOTIFICATION_TYPES; }
});
Object.defineProperty(exports, "BUILDING_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.BUILDING_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "CHAT_CONVERSATIONS_POLL_MS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.CHAT_CONVERSATIONS_POLL_MS; }
});
Object.defineProperty(exports, "DEFAULT_PAGINATION_LIMIT", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.DEFAULT_PAGINATION_LIMIT; }
});
Object.defineProperty(exports, "ENTITY_LINK_TYPE_META", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ENTITY_LINK_TYPE_META; }
});
Object.defineProperty(exports, "MANAGERIAL_NOTIFICATION_TYPES", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.MANAGERIAL_NOTIFICATION_TYPES; }
});
Object.defineProperty(exports, "MAX_PAGINATION_LIMIT", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.MAX_PAGINATION_LIMIT; }
});
Object.defineProperty(exports, "NOTIFICATION_TOPICS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.NOTIFICATION_TOPICS; }
});
Object.defineProperty(exports, "ORG_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ORG_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "ORG_SCOPED_NOTIFICATION_TYPES", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ORG_SCOPED_NOTIFICATION_TYPES; }
});
Object.defineProperty(exports, "OWNERSHIP_DERIVED_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.OWNERSHIP_DERIVED_PERMISSIONS; }
});
Object.defineProperty(exports, "PLATFORM_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.PLATFORM_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "RELATED_TO_LINKABLE_TYPES", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.RELATED_TO_LINKABLE_TYPES; }
});
Object.defineProperty(exports, "SELECTABLE_CHANNELS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.SELECTABLE_CHANNELS; }
});
Object.defineProperty(exports, "STANDARD_UNIT_PRICE_CENTS", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.STANDARD_UNIT_PRICE_CENTS; }
});
Object.defineProperty(exports, "adminBuildingKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.adminBuildingKeys; }
});
Object.defineProperty(exports, "adminKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.adminKeys; }
});
Object.defineProperty(exports, "aiUsageKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.aiUsageKeys; }
});
Object.defineProperty(exports, "apartmentKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.apartmentKeys; }
});
Object.defineProperty(exports, "auditLogKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.auditLogKeys; }
});
Object.defineProperty(exports, "blogKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.blogKeys; }
});
Object.defineProperty(exports, "boardKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.boardKeys; }
});
Object.defineProperty(exports, "buildLeadTimeWrites", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.buildLeadTimeWrites; }
});
Object.defineProperty(exports, "buildTopicStates", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.buildTopicStates; }
});
Object.defineProperty(exports, "buildTopicWrites", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.buildTopicWrites; }
});
Object.defineProperty(exports, "buildingEmailKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.buildingEmailKeys; }
});
Object.defineProperty(exports, "buildingKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.buildingKeys; }
});
Object.defineProperty(exports, "businessPartnerKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.businessPartnerKeys; }
});
Object.defineProperty(exports, "chatKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.chatKeys; }
});
Object.defineProperty(exports, "dashboardSummaryKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.dashboardSummaryKeys; }
});
Object.defineProperty(exports, "documentKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.documentKeys; }
});
Object.defineProperty(exports, "dsarKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.dsarKeys; }
});
Object.defineProperty(exports, "dunningKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.dunningKeys; }
});
Object.defineProperty(exports, "enterpriseRequestKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.enterpriseRequestKeys; }
});
Object.defineProperty(exports, "entityLinkKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.entityLinkKeys; }
});
Object.defineProperty(exports, "eventKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.eventKeys; }
});
Object.defineProperty(exports, "failureReportKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.failureReportKeys; }
});
Object.defineProperty(exports, "faqKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.faqKeys; }
});
Object.defineProperty(exports, "featureFlagKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.featureFlagKeys; }
});
Object.defineProperty(exports, "fundsKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.fundsKeys; }
});
Object.defineProperty(exports, "garageKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.garageKeys; }
});
Object.defineProperty(exports, "getLeadTime", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.getLeadTime; }
});
Object.defineProperty(exports, "getNotificationTopic", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.getNotificationTopic; }
});
Object.defineProperty(exports, "getUngroupedNotificationTypes", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.getUngroupedNotificationTypes; }
});
Object.defineProperty(exports, "incomeKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.incomeKeys; }
});
Object.defineProperty(exports, "interestRateKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.interestRateKeys; }
});
Object.defineProperty(exports, "isEntityLinkAllowed", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.isEntityLinkAllowed; }
});
Object.defineProperty(exports, "layoutKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.layoutKeys; }
});
Object.defineProperty(exports, "managementInvoiceKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.managementInvoiceKeys; }
});
Object.defineProperty(exports, "noticeKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.noticeKeys; }
});
Object.defineProperty(exports, "notificationKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.notificationKeys; }
});
Object.defineProperty(exports, "organizationKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.organizationKeys; }
});
Object.defineProperty(exports, "ownerKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.ownerKeys; }
});
Object.defineProperty(exports, "permissionKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.permissionKeys; }
});
Object.defineProperty(exports, "platformBuildingKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.platformBuildingKeys; }
});
Object.defineProperty(exports, "platformFeatureKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.platformFeatureKeys; }
});
Object.defineProperty(exports, "platformSubscriptionKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.platformSubscriptionKeys; }
});
Object.defineProperty(exports, "pollKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.pollKeys; }
});
Object.defineProperty(exports, "pricuvaKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.pricuvaKeys; }
});
Object.defineProperty(exports, "queryKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.queryKeys; }
});
Object.defineProperty(exports, "recentKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.recentKeys; }
});
Object.defineProperty(exports, "recurringTemplateKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.recurringTemplateKeys; }
});
Object.defineProperty(exports, "spotlightKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.spotlightKeys; }
});
Object.defineProperty(exports, "storageUnitKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.storageUnitKeys; }
});
Object.defineProperty(exports, "toggleChannel", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.toggleChannel; }
});
Object.defineProperty(exports, "transactionCategoryKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.transactionCategoryKeys; }
});
Object.defineProperty(exports, "unitSearchKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.unitSearchKeys; }
});
Object.defineProperty(exports, "userKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.userKeys; }
});
Object.defineProperty(exports, "widgetKeys", {
  enumerable: true,
  get: function () { return chunkGNXYTICM_cjs.widgetKeys; }
});
Object.defineProperty(exports, "ARCHIVE_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ARCHIVE_TYPES; }
});
Object.defineProperty(exports, "AUDIT_DENIAL_TARGET_TYPE", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.AUDIT_DENIAL_TARGET_TYPE; }
});
Object.defineProperty(exports, "ApprovalStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ApprovalStatusSchema; }
});
Object.defineProperty(exports, "BOARD_CARD_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BOARD_CARD_LIMITS; }
});
Object.defineProperty(exports, "BOARD_COLUMN_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BOARD_COLUMN_LIMITS; }
});
Object.defineProperty(exports, "BOARD_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BOARD_LIMITS; }
});
Object.defineProperty(exports, "BUG_REPORT_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BUG_REPORT_LIMITS; }
});
Object.defineProperty(exports, "BUG_REPORT_STATUSES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BUG_REPORT_STATUSES; }
});
Object.defineProperty(exports, "BUILDING_ARCHIVE_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BUILDING_ARCHIVE_TYPES; }
});
Object.defineProperty(exports, "BUILDING_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BUILDING_LIMITS; }
});
Object.defineProperty(exports, "BUILDING_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.BUILDING_TYPES; }
});
Object.defineProperty(exports, "CHAT_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.CHAT_LIMITS; }
});
Object.defineProperty(exports, "CommonStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.CommonStatusSchema; }
});
Object.defineProperty(exports, "ConversationType", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ConversationType; }
});
Object.defineProperty(exports, "DOCUMENT_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.DOCUMENT_LIMITS; }
});
Object.defineProperty(exports, "DOCUMENT_SOURCE_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.DOCUMENT_SOURCE_TYPES; }
});
Object.defineProperty(exports, "DunningHoldReason", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.DunningHoldReason; }
});
Object.defineProperty(exports, "EMAIL_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.EMAIL_LIMITS; }
});
Object.defineProperty(exports, "ENTITY_LINK_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ENTITY_LINK_TYPES; }
});
Object.defineProperty(exports, "EVENT_COLORS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.EVENT_COLORS; }
});
Object.defineProperty(exports, "EVENT_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.EVENT_TYPES; }
});
Object.defineProperty(exports, "EVENT_TYPE_COLOR_MAP", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.EVENT_TYPE_COLOR_MAP; }
});
Object.defineProperty(exports, "FAILURE_REPORT_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.FAILURE_REPORT_LIMITS; }
});
Object.defineProperty(exports, "FAQ_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.FAQ_LIMITS; }
});
Object.defineProperty(exports, "FailureStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.FailureStatusSchema; }
});
Object.defineProperty(exports, "InvoiceBlocker", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.InvoiceBlocker; }
});
Object.defineProperty(exports, "LINKABLE_ENTITY_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.LINKABLE_ENTITY_TYPES; }
});
Object.defineProperty(exports, "MyPricuvaStatus", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.MyPricuvaStatus; }
});
Object.defineProperty(exports, "NOTICE_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.NOTICE_LIMITS; }
});
Object.defineProperty(exports, "ORGANIZATION_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ORGANIZATION_LIMITS; }
});
Object.defineProperty(exports, "OrgInvitationStatus", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.OrgInvitationStatus; }
});
Object.defineProperty(exports, "OrgUplatniceBlocker", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.OrgUplatniceBlocker; }
});
Object.defineProperty(exports, "OrgUplatniceSendStatus", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.OrgUplatniceSendStatus; }
});
Object.defineProperty(exports, "POLL_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.POLL_LIMITS; }
});
Object.defineProperty(exports, "POLL_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.POLL_TYPES; }
});
Object.defineProperty(exports, "PricuvaDeliveryChannel", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.PricuvaDeliveryChannel; }
});
Object.defineProperty(exports, "PricuvaDeliveryStatus", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.PricuvaDeliveryStatus; }
});
Object.defineProperty(exports, "PrioritySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.PrioritySchema; }
});
Object.defineProperty(exports, "RECURRENCE_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.RECURRENCE_TYPES; }
});
Object.defineProperty(exports, "REP_RECENT_ACTIVITY_TYPES", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.REP_RECENT_ACTIVITY_TYPES; }
});
Object.defineProperty(exports, "TRANSACTION_CATEGORY_LIMITS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.TRANSACTION_CATEGORY_LIMITS; }
});
Object.defineProperty(exports, "UNIT_KINDS", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.UNIT_KINDS; }
});
Object.defineProperty(exports, "addOrgMemberSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.addOrgMemberSchema; }
});
Object.defineProperty(exports, "aiChatMessageSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.aiChatMessageSchema; }
});
Object.defineProperty(exports, "aiChatRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.aiChatRequestSchema; }
});
Object.defineProperty(exports, "aiUsageResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.aiUsageResponseSchema; }
});
Object.defineProperty(exports, "apiErrorResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.apiErrorResponseSchema; }
});
Object.defineProperty(exports, "apiErrorSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.apiErrorSchema; }
});
Object.defineProperty(exports, "approvalStatusOptions", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.approvalStatusOptions; }
});
Object.defineProperty(exports, "approveFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.approveFailureReportSchema; }
});
Object.defineProperty(exports, "approveNoticeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.approveNoticeSchema; }
});
Object.defineProperty(exports, "archiveTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.archiveTypeSchema; }
});
Object.defineProperty(exports, "archivedItemSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.archivedItemSchema; }
});
Object.defineProperty(exports, "assignOrgBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.assignOrgBuildingSchema; }
});
Object.defineProperty(exports, "assignOrgMemberBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.assignOrgMemberBuildingSchema; }
});
Object.defineProperty(exports, "assignOwnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.assignOwnerSchema; }
});
Object.defineProperty(exports, "auditLogResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.auditLogResponseSchema; }
});
Object.defineProperty(exports, "baseEntitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.baseEntitySchema; }
});
Object.defineProperty(exports, "boardCardChecklistItemSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.boardCardChecklistItemSchema; }
});
Object.defineProperty(exports, "boardCardEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.boardCardEventSchema; }
});
Object.defineProperty(exports, "booleanish", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.booleanish; }
});
Object.defineProperty(exports, "bugReportResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.bugReportResponseSchema; }
});
Object.defineProperty(exports, "bugReportStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.bugReportStatusSchema; }
});
Object.defineProperty(exports, "buildingArchiveTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingArchiveTypeSchema; }
});
Object.defineProperty(exports, "buildingDetailResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingDetailResponseSchema; }
});
Object.defineProperty(exports, "buildingEntitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingEntitySchema; }
});
Object.defineProperty(exports, "buildingFundsLedgerResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingFundsLedgerResponseSchema; }
});
Object.defineProperty(exports, "buildingFundsLedgerRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingFundsLedgerRowSchema; }
});
Object.defineProperty(exports, "buildingManagementInvoicesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingManagementInvoicesResponseSchema; }
});
Object.defineProperty(exports, "buildingOwnerAssignmentSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingOwnerAssignmentSchema; }
});
Object.defineProperty(exports, "buildingResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingResponseSchema; }
});
Object.defineProperty(exports, "buildingSettingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingSettingsResponseSchema; }
});
Object.defineProperty(exports, "buildingTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingTypeSchema; }
});
Object.defineProperty(exports, "buildingUserEntitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.buildingUserEntitySchema; }
});
Object.defineProperty(exports, "businessPartnerResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.businessPartnerResponseSchema; }
});
Object.defineProperty(exports, "camtImportResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.camtImportResponseSchema; }
});
Object.defineProperty(exports, "cancelManagementInvoiceSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.cancelManagementInvoiceSchema; }
});
Object.defineProperty(exports, "certiliaUserinfoSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.certiliaUserinfoSchema; }
});
Object.defineProperty(exports, "chatMessageResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.chatMessageResponseSchema; }
});
Object.defineProperty(exports, "commentResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.commentResponseSchema; }
});
Object.defineProperty(exports, "commonStatusOptions", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.commonStatusOptions; }
});
Object.defineProperty(exports, "conversationLastMessageSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.conversationLastMessageSchema; }
});
Object.defineProperty(exports, "conversationParticipantSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.conversationParticipantSchema; }
});
Object.defineProperty(exports, "conversationResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.conversationResponseSchema; }
});
Object.defineProperty(exports, "conversationsListResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.conversationsListResponseSchema; }
});
Object.defineProperty(exports, "copyFaqsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.copyFaqsSchema; }
});
Object.defineProperty(exports, "copyTransactionCategoriesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.copyTransactionCategoriesSchema; }
});
Object.defineProperty(exports, "createBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBoardCardSchema; }
});
Object.defineProperty(exports, "createBoardColumnSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBoardColumnSchema; }
});
Object.defineProperty(exports, "createBoardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBoardSchema; }
});
Object.defineProperty(exports, "createBugReportSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBugReportSchema; }
});
Object.defineProperty(exports, "createBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBuildingSchema; }
});
Object.defineProperty(exports, "createBusinessPartnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createBusinessPartnerSchema; }
});
Object.defineProperty(exports, "createConversationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createConversationSchema; }
});
Object.defineProperty(exports, "createDocumentSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createDocumentSchema; }
});
Object.defineProperty(exports, "createDsarEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createDsarEventSchema; }
});
Object.defineProperty(exports, "createDsarRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createDsarRequestSchema; }
});
Object.defineProperty(exports, "createEmailThreadRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createEmailThreadRequestSchema; }
});
Object.defineProperty(exports, "createEntityLinkRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createEntityLinkRequestSchema; }
});
Object.defineProperty(exports, "createEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createEventSchema; }
});
Object.defineProperty(exports, "createExpenseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createExpenseSchema; }
});
Object.defineProperty(exports, "createFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createFailureReportSchema; }
});
Object.defineProperty(exports, "createFaqSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createFaqSchema; }
});
Object.defineProperty(exports, "createIncomeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createIncomeSchema; }
});
Object.defineProperty(exports, "createInterestRateSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createInterestRateSchema; }
});
Object.defineProperty(exports, "createNoticeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createNoticeSchema; }
});
Object.defineProperty(exports, "createOrgBroadcastSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createOrgBroadcastSchema; }
});
Object.defineProperty(exports, "createOrganizationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createOrganizationSchema; }
});
Object.defineProperty(exports, "createOwnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createOwnerSchema; }
});
Object.defineProperty(exports, "createPlatformSubscriptionSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createPlatformSubscriptionSchema; }
});
Object.defineProperty(exports, "createPollSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createPollSchema; }
});
Object.defineProperty(exports, "createTransactionCategorySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createTransactionCategorySchema; }
});
Object.defineProperty(exports, "createUnitSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.createUnitSchema; }
});
Object.defineProperty(exports, "cursorQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.cursorQuerySchema; }
});
Object.defineProperty(exports, "dateRangeParamsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dateRangeParamsSchema; }
});
Object.defineProperty(exports, "dateRangeWithValidationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dateRangeWithValidationSchema; }
});
Object.defineProperty(exports, "dateTimeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dateTimeSchema; }
});
Object.defineProperty(exports, "deleteEntityLinkQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.deleteEntityLinkQuerySchema; }
});
Object.defineProperty(exports, "deleteEntityLinkRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.deleteEntityLinkRequestSchema; }
});
Object.defineProperty(exports, "documentFileSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.documentFileSchema; }
});
Object.defineProperty(exports, "documentLinkedRecordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.documentLinkedRecordSchema; }
});
Object.defineProperty(exports, "documentResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.documentResponseSchema; }
});
Object.defineProperty(exports, "dsarErasureSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dsarErasureSchema; }
});
Object.defineProperty(exports, "dsarEventResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dsarEventResponseSchema; }
});
Object.defineProperty(exports, "dsarRequestResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dsarRequestResponseSchema; }
});
Object.defineProperty(exports, "dunningCandidateSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCandidateSchema; }
});
Object.defineProperty(exports, "dunningCandidatesQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCandidatesQuerySchema; }
});
Object.defineProperty(exports, "dunningCandidatesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCandidatesResponseSchema; }
});
Object.defineProperty(exports, "dunningCaseDetailResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCaseDetailResponseSchema; }
});
Object.defineProperty(exports, "dunningCaseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCaseSchema; }
});
Object.defineProperty(exports, "dunningCaseStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCaseStatusSchema; }
});
Object.defineProperty(exports, "dunningCasesQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCasesQuerySchema; }
});
Object.defineProperty(exports, "dunningCasesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningCasesResponseSchema; }
});
Object.defineProperty(exports, "dunningLevelSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningLevelSchema; }
});
Object.defineProperty(exports, "dunningNoticeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningNoticeSchema; }
});
Object.defineProperty(exports, "dunningNoticesQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningNoticesQuerySchema; }
});
Object.defineProperty(exports, "dunningNoticesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningNoticesResponseSchema; }
});
Object.defineProperty(exports, "dunningSettingsSnapshotSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningSettingsSnapshotSchema; }
});
Object.defineProperty(exports, "dunningSummarySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.dunningSummarySchema; }
});
Object.defineProperty(exports, "emailAttachmentSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailAttachmentSchema; }
});
Object.defineProperty(exports, "emailMessageSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailMessageSchema; }
});
Object.defineProperty(exports, "emailSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailSchema; }
});
Object.defineProperty(exports, "emailThreadDetailSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailThreadDetailSchema; }
});
Object.defineProperty(exports, "emailThreadSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailThreadSchema; }
});
Object.defineProperty(exports, "emailUnreadCountResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.emailUnreadCountResponseSchema; }
});
Object.defineProperty(exports, "enterpriseRequestResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.enterpriseRequestResponseSchema; }
});
Object.defineProperty(exports, "entityLinkCountsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinkCountsResponseSchema; }
});
Object.defineProperty(exports, "entityLinkEndpointSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinkEndpointSchema; }
});
Object.defineProperty(exports, "entityLinkMetadataSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinkMetadataSchema; }
});
Object.defineProperty(exports, "entityLinkReferenceSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinkReferenceSchema; }
});
Object.defineProperty(exports, "entityLinkTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinkTypeSchema; }
});
Object.defineProperty(exports, "entityLinksResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.entityLinksResponseSchema; }
});
Object.defineProperty(exports, "eventColorSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.eventColorSchema; }
});
Object.defineProperty(exports, "eventResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.eventResponseSchema; }
});
Object.defineProperty(exports, "eventTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.eventTypeSchema; }
});
Object.defineProperty(exports, "failureReportEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.failureReportEventSchema; }
});
Object.defineProperty(exports, "failureReportEventWithDateOrderSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.failureReportEventWithDateOrderSchema; }
});
Object.defineProperty(exports, "failureReportResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.failureReportResponseSchema; }
});
Object.defineProperty(exports, "failureStatusOptions", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.failureStatusOptions; }
});
Object.defineProperty(exports, "faqResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.faqResponseSchema; }
});
Object.defineProperty(exports, "featureFlagsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.featureFlagsResponseSchema; }
});
Object.defineProperty(exports, "feeModelSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.feeModelSchema; }
});
Object.defineProperty(exports, "finalizePollSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.finalizePollSchema; }
});
Object.defineProperty(exports, "forgotPasswordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.forgotPasswordSchema; }
});
Object.defineProperty(exports, "getAuditLogsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getAuditLogsQuerySchema; }
});
Object.defineProperty(exports, "getDsarRequestsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getDsarRequestsQuerySchema; }
});
Object.defineProperty(exports, "getEnterpriseRequestsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getEnterpriseRequestsQuerySchema; }
});
Object.defineProperty(exports, "getEntityLinkCountsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getEntityLinkCountsQuerySchema; }
});
Object.defineProperty(exports, "getEntityLinksQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getEntityLinksQuerySchema; }
});
Object.defineProperty(exports, "getNotificationDataSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getNotificationDataSchema; }
});
Object.defineProperty(exports, "getOrgBuildingsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getOrgBuildingsQuerySchema; }
});
Object.defineProperty(exports, "getOrgMembersQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getOrgMembersQuerySchema; }
});
Object.defineProperty(exports, "getPlatformSubscriptionsQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getPlatformSubscriptionsQuerySchema; }
});
Object.defineProperty(exports, "getRepBuildingsParamsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getRepBuildingsParamsSchema; }
});
Object.defineProperty(exports, "getRepUsersParamsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getRepUsersParamsSchema; }
});
Object.defineProperty(exports, "getTransactionCategoriesQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.getTransactionCategoriesQuerySchema; }
});
Object.defineProperty(exports, "idCardVerificationStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.idCardVerificationStatusSchema; }
});
Object.defineProperty(exports, "interestRateSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.interestRateSchema; }
});
Object.defineProperty(exports, "interestRatesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.interestRatesResponseSchema; }
});
Object.defineProperty(exports, "inviteOrgMemberSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.inviteOrgMemberSchema; }
});
Object.defineProperty(exports, "inviteOwnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.inviteOwnerSchema; }
});
Object.defineProperty(exports, "issueDunningNoticesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.issueDunningNoticesResponseSchema; }
});
Object.defineProperty(exports, "issueDunningNoticesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.issueDunningNoticesSchema; }
});
Object.defineProperty(exports, "issueManagementInvoicesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.issueManagementInvoicesResponseSchema; }
});
Object.defineProperty(exports, "issueManagementInvoicesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.issueManagementInvoicesSchema; }
});
Object.defineProperty(exports, "joinBuildingWithOtpSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.joinBuildingWithOtpSchema; }
});
Object.defineProperty(exports, "linkableEntityTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.linkableEntityTypeSchema; }
});
Object.defineProperty(exports, "listArchivedResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.listArchivedResponseSchema; }
});
Object.defineProperty(exports, "listBugReportsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.listBugReportsResponseSchema; }
});
Object.defineProperty(exports, "loginSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.loginSchema; }
});
Object.defineProperty(exports, "managementInvoiceListQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoiceListQuerySchema; }
});
Object.defineProperty(exports, "managementInvoiceListResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoiceListResponseSchema; }
});
Object.defineProperty(exports, "managementInvoicePreviewRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoicePreviewRowSchema; }
});
Object.defineProperty(exports, "managementInvoiceSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoiceSchema; }
});
Object.defineProperty(exports, "managementInvoiceStatusSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoiceStatusSchema; }
});
Object.defineProperty(exports, "managementInvoiceSummarySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.managementInvoiceSummarySchema; }
});
Object.defineProperty(exports, "mapPricuvaRefResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.mapPricuvaRefResponseSchema; }
});
Object.defineProperty(exports, "mapPricuvaRefSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.mapPricuvaRefSchema; }
});
Object.defineProperty(exports, "markManagementInvoicePaidSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.markManagementInvoicePaidSchema; }
});
Object.defineProperty(exports, "messageResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.messageResponseSchema; }
});
Object.defineProperty(exports, "messagesListResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.messagesListResponseSchema; }
});
Object.defineProperty(exports, "moneyStringSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.moneyStringSchema; }
});
Object.defineProperty(exports, "moveBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.moveBoardCardSchema; }
});
Object.defineProperty(exports, "multipartArray", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.multipartArray; }
});
Object.defineProperty(exports, "multipartBoolean", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.multipartBoolean; }
});
Object.defineProperty(exports, "myPricuvaOwnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.myPricuvaOwnerSchema; }
});
Object.defineProperty(exports, "myPricuvaResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.myPricuvaResponseSchema; }
});
Object.defineProperty(exports, "myPricuvaSlipQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.myPricuvaSlipQuerySchema; }
});
Object.defineProperty(exports, "noticeEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.noticeEventSchema; }
});
Object.defineProperty(exports, "noticeEventWithDateOrderSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.noticeEventWithDateOrderSchema; }
});
Object.defineProperty(exports, "noticeResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.noticeResponseSchema; }
});
Object.defineProperty(exports, "notificationDataSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.notificationDataSchema; }
});
Object.defineProperty(exports, "notificationPreferenceCategorySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.notificationPreferenceCategorySchema; }
});
Object.defineProperty(exports, "notificationPreferenceItemSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.notificationPreferenceItemSchema; }
});
Object.defineProperty(exports, "notificationResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.notificationResponseSchema; }
});
Object.defineProperty(exports, "optionalDateTimeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.optionalDateTimeSchema; }
});
Object.defineProperty(exports, "orgAiImportAddressCandidateSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportAddressCandidateSchema; }
});
Object.defineProperty(exports, "orgAiImportBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportBuildingSchema; }
});
Object.defineProperty(exports, "orgAiImportCommitResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportCommitResponseSchema; }
});
Object.defineProperty(exports, "orgAiImportCommitSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportCommitSchema; }
});
Object.defineProperty(exports, "orgAiImportExtractResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportExtractResponseSchema; }
});
Object.defineProperty(exports, "orgAiImportSkippedRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgAiImportSkippedRowSchema; }
});
Object.defineProperty(exports, "orgBroadcastResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgBroadcastResponseSchema; }
});
Object.defineProperty(exports, "orgBuildingFundsRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgBuildingFundsRowSchema; }
});
Object.defineProperty(exports, "orgFundsOverviewResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgFundsOverviewResponseSchema; }
});
Object.defineProperty(exports, "orgInvitationResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgInvitationResponseSchema; }
});
Object.defineProperty(exports, "orgStatementImportResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgStatementImportResponseSchema; }
});
Object.defineProperty(exports, "orgStatementImportResultSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgStatementImportResultSchema; }
});
Object.defineProperty(exports, "orgUplatniceBuildingRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgUplatniceBuildingRowSchema; }
});
Object.defineProperty(exports, "orgUplatniceOverviewResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgUplatniceOverviewResponseSchema; }
});
Object.defineProperty(exports, "orgUplatniceQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgUplatniceQuerySchema; }
});
Object.defineProperty(exports, "orgUplatniceSendResultSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.orgUplatniceSendResultSchema; }
});
Object.defineProperty(exports, "organizationInvoicingIdentitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.organizationInvoicingIdentitySchema; }
});
Object.defineProperty(exports, "ownerAccountChargeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerAccountChargeSchema; }
});
Object.defineProperty(exports, "ownerAccountPaymentSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerAccountPaymentSchema; }
});
Object.defineProperty(exports, "ownerAccountQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerAccountQuerySchema; }
});
Object.defineProperty(exports, "ownerAccountResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerAccountResponseSchema; }
});
Object.defineProperty(exports, "ownerAccountUnitSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerAccountUnitSchema; }
});
Object.defineProperty(exports, "ownerResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.ownerResponseSchema; }
});
Object.defineProperty(exports, "paginatedBuildingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedBuildingsResponseSchema; }
});
Object.defineProperty(exports, "paginatedDocumentsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedDocumentsResponseSchema; }
});
Object.defineProperty(exports, "paginatedEmailThreadsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedEmailThreadsResponseSchema; }
});
Object.defineProperty(exports, "paginatedEventsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedEventsResponseSchema; }
});
Object.defineProperty(exports, "paginatedFailureReportsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedFailureReportsResponseSchema; }
});
Object.defineProperty(exports, "paginatedNoticesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedNoticesResponseSchema; }
});
Object.defineProperty(exports, "paginatedPollsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedPollsResponseSchema; }
});
Object.defineProperty(exports, "paginatedRepBuildingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedRepBuildingsResponseSchema; }
});
Object.defineProperty(exports, "paginatedRepUsersResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedRepUsersResponseSchema; }
});
Object.defineProperty(exports, "paginatedResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedResponseSchema; }
});
Object.defineProperty(exports, "paginatedUnitsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginatedUnitsResponseSchema; }
});
Object.defineProperty(exports, "paginationParamsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paginationParamsSchema; }
});
Object.defineProperty(exports, "passwordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.passwordSchema; }
});
Object.defineProperty(exports, "paymentSlipSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.paymentSlipSchema; }
});
Object.defineProperty(exports, "permissionFieldsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.permissionFieldsSchema; }
});
Object.defineProperty(exports, "permissionsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.permissionsResponseSchema; }
});
Object.defineProperty(exports, "platformFeatureFlagSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.platformFeatureFlagSchema; }
});
Object.defineProperty(exports, "platformFeatureFlagsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.platformFeatureFlagsResponseSchema; }
});
Object.defineProperty(exports, "platformSubscriptionResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.platformSubscriptionResponseSchema; }
});
Object.defineProperty(exports, "pollEligibleVoterSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollEligibleVoterSchema; }
});
Object.defineProperty(exports, "pollEligibleVotersResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollEligibleVotersResponseSchema; }
});
Object.defineProperty(exports, "pollResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollResponseSchema; }
});
Object.defineProperty(exports, "pollResultsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollResultsSchema; }
});
Object.defineProperty(exports, "pollTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollTypeSchema; }
});
Object.defineProperty(exports, "pollVotersResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pollVotersResponseSchema; }
});
Object.defineProperty(exports, "postPricuvaChargesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.postPricuvaChargesResponseSchema; }
});
Object.defineProperty(exports, "previewManagementInvoicesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.previewManagementInvoicesResponseSchema; }
});
Object.defineProperty(exports, "previewManagementInvoicesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.previewManagementInvoicesSchema; }
});
Object.defineProperty(exports, "pricuvaDeliveriesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pricuvaDeliveriesResponseSchema; }
});
Object.defineProperty(exports, "pricuvaDeliveryRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pricuvaDeliveryRowSchema; }
});
Object.defineProperty(exports, "pricuvaOpeningBalanceRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pricuvaOpeningBalanceRowSchema; }
});
Object.defineProperty(exports, "pricuvaOpeningBalancesResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.pricuvaOpeningBalancesResponseSchema; }
});
Object.defineProperty(exports, "priorityOptions", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.priorityOptions; }
});
Object.defineProperty(exports, "publicOrgInvitationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.publicOrgInvitationSchema; }
});
Object.defineProperty(exports, "recordDsarRectificationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.recordDsarRectificationSchema; }
});
Object.defineProperty(exports, "recordOfflineVotesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.recordOfflineVotesSchema; }
});
Object.defineProperty(exports, "recurrenceTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.recurrenceTypeSchema; }
});
Object.defineProperty(exports, "registerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.registerSchema; }
});
Object.defineProperty(exports, "rejectIdCardVerificationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.rejectIdCardVerificationSchema; }
});
Object.defineProperty(exports, "reorderBoardColumnsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.reorderBoardColumnsSchema; }
});
Object.defineProperty(exports, "reorderFaqsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.reorderFaqsSchema; }
});
Object.defineProperty(exports, "repBuildingActivitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repBuildingActivitySchema; }
});
Object.defineProperty(exports, "repBuildingItemSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repBuildingItemSchema; }
});
Object.defineProperty(exports, "repDashboardSummaryResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repDashboardSummaryResponseSchema; }
});
Object.defineProperty(exports, "repRecentActivitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repRecentActivitySchema; }
});
Object.defineProperty(exports, "repRecentActivityTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repRecentActivityTypeSchema; }
});
Object.defineProperty(exports, "repUserBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repUserBuildingSchema; }
});
Object.defineProperty(exports, "repUserItemSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.repUserItemSchema; }
});
Object.defineProperty(exports, "replyEmailThreadRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.replyEmailThreadRequestSchema; }
});
Object.defineProperty(exports, "resetPasswordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.resetPasswordSchema; }
});
Object.defineProperty(exports, "revenueMetricsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.revenueMetricsResponseSchema; }
});
Object.defineProperty(exports, "roleTypeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.roleTypeSchema; }
});
Object.defineProperty(exports, "searchUsersQuerySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.searchUsersQuerySchema; }
});
Object.defineProperty(exports, "sendMessageSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.sendMessageSchema; }
});
Object.defineProperty(exports, "sendOrgUplatniceResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.sendOrgUplatniceResponseSchema; }
});
Object.defineProperty(exports, "sendOrgUplatniceSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.sendOrgUplatniceSchema; }
});
Object.defineProperty(exports, "setDsarRestrictionSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.setDsarRestrictionSchema; }
});
Object.defineProperty(exports, "signedMoneyStringSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.signedMoneyStringSchema; }
});
Object.defineProperty(exports, "strongPasswordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.strongPasswordSchema; }
});
Object.defineProperty(exports, "submitIdCardVerificationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.submitIdCardVerificationSchema; }
});
Object.defineProperty(exports, "timeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.timeSchema; }
});
Object.defineProperty(exports, "unitKindSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.unitKindSchema; }
});
Object.defineProperty(exports, "unitSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.unitSchema; }
});
Object.defineProperty(exports, "unmatchedPricuvaRefRowSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.unmatchedPricuvaRefRowSchema; }
});
Object.defineProperty(exports, "unmatchedPricuvaRefsResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.unmatchedPricuvaRefsResponseSchema; }
});
Object.defineProperty(exports, "unreadCountResponseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.unreadCountResponseSchema; }
});
Object.defineProperty(exports, "updateBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBoardCardSchema; }
});
Object.defineProperty(exports, "updateBoardColumnSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBoardColumnSchema; }
});
Object.defineProperty(exports, "updateBoardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBoardSchema; }
});
Object.defineProperty(exports, "updateBugReportSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBugReportSchema; }
});
Object.defineProperty(exports, "updateBuildingSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBuildingSchema; }
});
Object.defineProperty(exports, "updateBuildingSettingsSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBuildingSettingsSchema; }
});
Object.defineProperty(exports, "updateBusinessPartnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateBusinessPartnerSchema; }
});
Object.defineProperty(exports, "updateConversationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateConversationSchema; }
});
Object.defineProperty(exports, "updateDocumentSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateDocumentSchema; }
});
Object.defineProperty(exports, "updateDsarRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateDsarRequestSchema; }
});
Object.defineProperty(exports, "updateDunningCaseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateDunningCaseSchema; }
});
Object.defineProperty(exports, "updateEnterpriseRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateEnterpriseRequestSchema; }
});
Object.defineProperty(exports, "updateEventSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateEventSchema; }
});
Object.defineProperty(exports, "updateExpenseSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateExpenseSchema; }
});
Object.defineProperty(exports, "updateFailureReportRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateFailureReportRequestSchema; }
});
Object.defineProperty(exports, "updateFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateFailureReportSchema; }
});
Object.defineProperty(exports, "updateFaqSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateFaqSchema; }
});
Object.defineProperty(exports, "updateIncomeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateIncomeSchema; }
});
Object.defineProperty(exports, "updateNoticeRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateNoticeRequestSchema; }
});
Object.defineProperty(exports, "updateNoticeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateNoticeSchema; }
});
Object.defineProperty(exports, "updateOrgBuildingContractSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateOrgBuildingContractSchema; }
});
Object.defineProperty(exports, "updateOrgMemberRoleSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateOrgMemberRoleSchema; }
});
Object.defineProperty(exports, "updateOrganizationSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateOrganizationSchema; }
});
Object.defineProperty(exports, "updateOwnerSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateOwnerSchema; }
});
Object.defineProperty(exports, "updatePasswordSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updatePasswordSchema; }
});
Object.defineProperty(exports, "updatePlatformFeatureRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updatePlatformFeatureRequestSchema; }
});
Object.defineProperty(exports, "updatePlatformSubscriptionSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updatePlatformSubscriptionSchema; }
});
Object.defineProperty(exports, "updatePollRequestSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updatePollRequestSchema; }
});
Object.defineProperty(exports, "updatePollSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updatePollSchema; }
});
Object.defineProperty(exports, "updateTransactionCategorySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateTransactionCategorySchema; }
});
Object.defineProperty(exports, "updateUnitSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateUnitSchema; }
});
Object.defineProperty(exports, "updateUserBuildingRoleSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.updateUserBuildingRoleSchema; }
});
Object.defineProperty(exports, "upsertPricuvaOpeningBalancesSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.upsertPricuvaOpeningBalancesSchema; }
});
Object.defineProperty(exports, "userEntitySchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.userEntitySchema; }
});
Object.defineProperty(exports, "uuidSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.uuidSchema; }
});
Object.defineProperty(exports, "verifyOtpSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.verifyOtpSchema; }
});
Object.defineProperty(exports, "voidDunningNoticeSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.voidDunningNoticeSchema; }
});
Object.defineProperty(exports, "votePollSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.votePollSchema; }
});
Object.defineProperty(exports, "voteWithIdCardSchema", {
  enumerable: true,
  get: function () { return chunkMPI5UGBJ_cjs.voteWithIdCardSchema; }
});
Object.defineProperty(exports, "addMoney", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.addMoney; }
});
Object.defineProperty(exports, "formatMoney", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.formatMoney; }
});
Object.defineProperty(exports, "fromCents", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.fromCents; }
});
Object.defineProperty(exports, "normalizeMoney", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.normalizeMoney; }
});
Object.defineProperty(exports, "subtractMoney", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.subtractMoney; }
});
Object.defineProperty(exports, "sumMoney", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.sumMoney; }
});
Object.defineProperty(exports, "toCents", {
  enumerable: true,
  get: function () { return chunkSHM36YL5_cjs.toCents; }
});
Object.defineProperty(exports, "optionalIbanSchema", {
  enumerable: true,
  get: function () { return chunk5I5KPCET_cjs.optionalIbanSchema; }
});
Object.defineProperty(exports, "AI_CHAT_LIMITS", {
  enumerable: true,
  get: function () { return chunkPQVZX35D_cjs.AI_CHAT_LIMITS; }
});
Object.defineProperty(exports, "ZUOZ_ADJACENT_CONSENT_CATEGORIES", {
  enumerable: true,
  get: function () { return chunkPQVZX35D_cjs.ZUOZ_ADJACENT_CONSENT_CATEGORIES; }
});
Object.defineProperty(exports, "isZuozAdjacentConsentCategory", {
  enumerable: true,
  get: function () { return chunkPQVZX35D_cjs.isZuozAdjacentConsentCategory; }
});
Object.defineProperty(exports, "APPROVE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.APPROVE_PERMISSIONS; }
});
Object.defineProperty(exports, "ApprovalStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.ApprovalStatus; }
});
Object.defineProperty(exports, "BUILDING_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BUILDING_ROLE_RANK; }
});
Object.defineProperty(exports, "BoardVisibility", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BoardVisibility; }
});
Object.defineProperty(exports, "BuildingOtpExpiry", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BuildingOtpExpiry; }
});
Object.defineProperty(exports, "BuildingRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BuildingRole; }
});
Object.defineProperty(exports, "BuildingStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BuildingStatus; }
});
Object.defineProperty(exports, "BuildingType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.BuildingType; }
});
Object.defineProperty(exports, "CO_OWNER_VISIBLE_SYSTEM_TYPES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.CO_OWNER_VISIBLE_SYSTEM_TYPES; }
});
Object.defineProperty(exports, "CommonStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.CommonStatus; }
});
Object.defineProperty(exports, "DSAR_CLOSED_STATUSES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DSAR_CLOSED_STATUSES; }
});
Object.defineProperty(exports, "DSAR_MAX_EXTENSION_DAYS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DSAR_MAX_EXTENSION_DAYS; }
});
Object.defineProperty(exports, "DSAR_RETENTION_YEARS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DSAR_RETENTION_YEARS; }
});
Object.defineProperty(exports, "DSAR_SLA_DAYS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DSAR_SLA_DAYS; }
});
Object.defineProperty(exports, "DUNNING_CLOSED_STATUSES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DUNNING_CLOSED_STATUSES; }
});
Object.defineProperty(exports, "DevicePlatform", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DevicePlatform; }
});
Object.defineProperty(exports, "DsarRequestStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DsarRequestStatus; }
});
Object.defineProperty(exports, "DsarRequestType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DsarRequestType; }
});
Object.defineProperty(exports, "DunningCaseStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DunningCaseStatus; }
});
Object.defineProperty(exports, "DunningLevel", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.DunningLevel; }
});
Object.defineProperty(exports, "EnterpriseRequestStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.EnterpriseRequestStatus; }
});
Object.defineProperty(exports, "EntityLinkType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.EntityLinkType; }
});
Object.defineProperty(exports, "FailureFundingSource", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FailureFundingSource; }
});
Object.defineProperty(exports, "FailureLocationType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FailureLocationType; }
});
Object.defineProperty(exports, "FailureStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FailureStatus; }
});
Object.defineProperty(exports, "FailureType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FailureType; }
});
Object.defineProperty(exports, "FailureUnitType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FailureUnitType; }
});
Object.defineProperty(exports, "FeeModel", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FeeModel; }
});
Object.defineProperty(exports, "FileCategory", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FileCategory; }
});
Object.defineProperty(exports, "Frequency", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.Frequency; }
});
Object.defineProperty(exports, "FundsSource", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.FundsSource; }
});
Object.defineProperty(exports, "IdentityVerificationMethod", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.IdentityVerificationMethod; }
});
Object.defineProperty(exports, "JoinRequestStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.JoinRequestStatus; }
});
Object.defineProperty(exports, "LinkableEntityType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.LinkableEntityType; }
});
Object.defineProperty(exports, "ManagementInvoiceStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.ManagementInvoiceStatus; }
});
Object.defineProperty(exports, "NOTIFICATION_TYPE_CATEGORY", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.NOTIFICATION_TYPE_CATEGORY; }
});
Object.defineProperty(exports, "NotificationCategory", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.NotificationCategory; }
});
Object.defineProperty(exports, "NotificationChannel", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.NotificationChannel; }
});
Object.defineProperty(exports, "NotificationDeliveryStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.NotificationDeliveryStatus; }
});
Object.defineProperty(exports, "NotificationType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.NotificationType; }
});
Object.defineProperty(exports, "ORG_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.ORG_ROLE_RANK; }
});
Object.defineProperty(exports, "OrgRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.OrgRole; }
});
Object.defineProperty(exports, "OrgStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.OrgStatus; }
});
Object.defineProperty(exports, "OrgType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.OrgType; }
});
Object.defineProperty(exports, "PLATFORM_FEATURES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PLATFORM_FEATURES; }
});
Object.defineProperty(exports, "PLATFORM_FEATURE_META", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PLATFORM_FEATURE_META; }
});
Object.defineProperty(exports, "PLATFORM_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PLATFORM_ROLE_RANK; }
});
Object.defineProperty(exports, "POLL_CANNOT_VOTE_REASON_KEY", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.POLL_CANNOT_VOTE_REASON_KEY; }
});
Object.defineProperty(exports, "Permission", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.Permission; }
});
Object.defineProperty(exports, "PlatformFeature", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PlatformFeature; }
});
Object.defineProperty(exports, "PlatformRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PlatformRole; }
});
Object.defineProperty(exports, "PollCannotVoteReason", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PollCannotVoteReason; }
});
Object.defineProperty(exports, "PollStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PollStatus; }
});
Object.defineProperty(exports, "PollType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PollType; }
});
Object.defineProperty(exports, "PollVoteStatus", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PollVoteStatus; }
});
Object.defineProperty(exports, "PricuvaRefMode", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.PricuvaRefMode; }
});
Object.defineProperty(exports, "Priority", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.Priority; }
});
Object.defineProperty(exports, "RESIDENT_VISIBLE_SYSTEM_TYPES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.RESIDENT_VISIBLE_SYSTEM_TYPES; }
});
Object.defineProperty(exports, "SCOPED_DOMAINS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.SCOPED_DOMAINS; }
});
Object.defineProperty(exports, "SCOPED_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.SCOPED_PERMISSIONS; }
});
Object.defineProperty(exports, "TransactionCategory", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.TransactionCategory; }
});
Object.defineProperty(exports, "TransactionSource", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.TransactionSource; }
});
Object.defineProperty(exports, "TransactionType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.TransactionType; }
});
Object.defineProperty(exports, "UNIMPLEMENTED_NOTIFICATION_TYPES", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.UNIMPLEMENTED_NOTIFICATION_TYPES; }
});
Object.defineProperty(exports, "UnitType", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.UnitType; }
});
Object.defineProperty(exports, "VerificationTier", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.VerificationTier; }
});
Object.defineProperty(exports, "VotingStrength", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.VotingStrength; }
});
Object.defineProperty(exports, "WASTE_SUBTYPE_NOTIFICATION_MAP", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.WASTE_SUBTYPE_NOTIFICATION_MAP; }
});
Object.defineProperty(exports, "canAssignOrgRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.canAssignOrgRole; }
});
Object.defineProperty(exports, "canAssignPlatformRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.canAssignPlatformRole; }
});
Object.defineProperty(exports, "canAssignRole", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.canAssignRole; }
});
Object.defineProperty(exports, "deriveVotingStrength", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.deriveVotingStrength; }
});
Object.defineProperty(exports, "domainPermissions", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.domainPermissions; }
});
Object.defineProperty(exports, "getBuildingFeatureDefault", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.getBuildingFeatureDefault; }
});
Object.defineProperty(exports, "methodToTier", {
  enumerable: true,
  get: function () { return chunkN53GQVG7_cjs.methodToTier; }
});
Object.defineProperty(exports, "BACKEND_ERROR_CODES", {
  enumerable: true,
  get: function () { return chunkUF3JI7WZ_cjs.BACKEND_ERROR_CODES; }
});
Object.defineProperty(exports, "isBackendErrorCode", {
  enumerable: true,
  get: function () { return chunkUF3JI7WZ_cjs.isBackendErrorCode; }
});
Object.defineProperty(exports, "colors", {
  enumerable: true,
  get: function () { return chunkOB3XVR2T_cjs.colors; }
});
Object.defineProperty(exports, "radii", {
  enumerable: true,
  get: function () { return chunkOB3XVR2T_cjs.radii; }
});
Object.defineProperty(exports, "themes", {
  enumerable: true,
  get: function () { return chunkOB3XVR2T_cjs.themes; }
});
Object.defineProperty(exports, "createPaginatedResponse", {
  enumerable: true,
  get: function () { return chunkQKHLAIRE_cjs.createPaginatedResponse; }
});
exports.ApartmentsTestIds = ApartmentsTestIds;
exports.AppShellTestIds = AppShellTestIds;
exports.BoardTestIds = BoardTestIds;
exports.BuildingEmailTestIds = BuildingEmailTestIds;
exports.BuildingInfoTestIds = BuildingInfoTestIds;
exports.BuildingOverviewTestIds = BuildingOverviewTestIds;
exports.CalendarTestIds = CalendarTestIds;
exports.DocumentsTestIds = DocumentsTestIds;
exports.FailureReportsTestIds = FailureReportsTestIds;
exports.FundsTestIds = FundsTestIds;
exports.LoginTestIds = LoginTestIds;
exports.NoticeBoardTestIds = NoticeBoardTestIds;
exports.OnboardingTestIds = OnboardingTestIds;
exports.PollsTestIds = PollsTestIds;
exports.SettingsTestIds = SettingsTestIds;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map