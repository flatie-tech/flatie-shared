'use strict';

var chunkK4ZWWDHM_cjs = require('./chunk-K4ZWWDHM.cjs');
var chunk7VPRRIJI_cjs = require('./chunk-7VPRRIJI.cjs');
var chunkIHUEEK2O_cjs = require('./chunk-IHUEEK2O.cjs');
var chunkBQDXLZYG_cjs = require('./chunk-BQDXLZYG.cjs');
var chunk4CZ7F75B_cjs = require('./chunk-4CZ7F75B.cjs');
var chunkLUIWGWFA_cjs = require('./chunk-LUIWGWFA.cjs');
var chunkR2IK4PYV_cjs = require('./chunk-R2IK4PYV.cjs');
var chunkX3TW7GWG_cjs = require('./chunk-X3TW7GWG.cjs');
var chunkXXNOAOHF_cjs = require('./chunk-XXNOAOHF.cjs');
var chunkNQLL5CZO_cjs = require('./chunk-NQLL5CZO.cjs');
var chunkD2MJJ7NU_cjs = require('./chunk-D2MJJ7NU.cjs');
var chunkAKVKGQ3H_cjs = require('./chunk-AKVKGQ3H.cjs');
var chunkL6DDUCLQ_cjs = require('./chunk-L6DDUCLQ.cjs');
require('./chunk-TCHOIK53.cjs');
var chunkOOJKTZT4_cjs = require('./chunk-OOJKTZT4.cjs');

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
  tabArchived: "building-email-tab-archived"
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

// src/test-ids/maintenance-logs.ts
var MaintenanceLogsTestIds = {
  screen: "maintenance-logs-screen",
  searchInput: "maintenance-logs-search-input",
  addButton: "maintenance-logs-add-button",
  card: "maintenance-log-card",
  viewModal: "maintenance-log-view-modal",
  createModal: "maintenance-log-create-modal",
  editButton: "maintenance-log-edit-button",
  deleteButton: "maintenance-log-delete-button",
  deleteConfirm: "maintenance-log-delete-confirm",
  /** Financed-by filter chip group (building_funds / insurance / co_owner). */
  financedByFilter: "maintenance-logs-financed-by-filter",
  /** Card/table view toggle on the management board. */
  viewToggle: "maintenance-logs-view-toggle"
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
  get: function () { return chunkK4ZWWDHM_cjs.API_ROUTES; }
});
Object.defineProperty(exports, "API_VERSION", {
  enumerable: true,
  get: function () { return chunkK4ZWWDHM_cjs.API_VERSION; }
});
Object.defineProperty(exports, "DATETIME_FORMATS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.DATETIME_FORMATS; }
});
Object.defineProperty(exports, "DATE_FORMATS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.DATE_FORMATS; }
});
Object.defineProperty(exports, "LOCALE_MAP", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.LOCALE_MAP; }
});
Object.defineProperty(exports, "MANAGERIAL_BUILDING_ROLES", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.MANAGERIAL_BUILDING_ROLES; }
});
Object.defineProperty(exports, "ParseError", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.ParseError; }
});
Object.defineProperty(exports, "ROLE_BADGE_COLORS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.ROLE_BADGE_COLORS; }
});
Object.defineProperty(exports, "ROLE_DESCRIPTION_KEYS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.ROLE_DESCRIPTION_KEYS; }
});
Object.defineProperty(exports, "ROLE_TRANSLATION_KEYS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.ROLE_TRANSLATION_KEYS; }
});
Object.defineProperty(exports, "TIME_FORMATS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.TIME_FORMATS; }
});
Object.defineProperty(exports, "VOTING_METHOD_SETTINGS", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.VOTING_METHOD_SETTINGS; }
});
Object.defineProperty(exports, "applyResidentRestriction", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.applyResidentRestriction; }
});
Object.defineProperty(exports, "applyResidentRestrictionToItem", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.applyResidentRestrictionToItem; }
});
Object.defineProperty(exports, "buildGoogleCalendarUrl", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.buildGoogleCalendarUrl; }
});
Object.defineProperty(exports, "calculatePaginationMeta", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.calculatePaginationMeta; }
});
Object.defineProperty(exports, "canDo", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.canDo; }
});
Object.defineProperty(exports, "canDoOnResource", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.canDoOnResource; }
});
Object.defineProperty(exports, "canMessageUser", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.canMessageUser; }
});
Object.defineProperty(exports, "computeActionFlags", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.computeActionFlags; }
});
Object.defineProperty(exports, "createPermissionChecker", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.createPermissionChecker; }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.debounce; }
});
Object.defineProperty(exports, "extractPaginatedItems", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.extractPaginatedItems; }
});
Object.defineProperty(exports, "failureStatusVariant", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.failureStatusVariant; }
});
Object.defineProperty(exports, "formatCurrency", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatCurrency; }
});
Object.defineProperty(exports, "formatCurrencyByLocale", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatCurrencyByLocale; }
});
Object.defineProperty(exports, "formatCurrencyEUR", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatCurrencyEUR; }
});
Object.defineProperty(exports, "formatDateByLocale", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatDate; }
});
Object.defineProperty(exports, "formatDateTime", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatDateTime; }
});
Object.defineProperty(exports, "formatText", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.formatText; }
});
Object.defineProperty(exports, "getContextUserId", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getContextUserId; }
});
Object.defineProperty(exports, "getDateLocale", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getDateLocale; }
});
Object.defineProperty(exports, "getDateRange", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getDateRange; }
});
Object.defineProperty(exports, "getInitials", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getInitials; }
});
Object.defineProperty(exports, "getMessageableUsers", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getMessageableUsers; }
});
Object.defineProperty(exports, "getRoleBadge", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.getRoleBadge; }
});
Object.defineProperty(exports, "isLastEnabledVotingMethod", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.isLastEnabledVotingMethod; }
});
Object.defineProperty(exports, "isManagerialRole", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.isManagerialRole; }
});
Object.defineProperty(exports, "normalizePaginatedResponse", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.normalizePaginatedResponse; }
});
Object.defineProperty(exports, "parseApiError", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.parseApiError; }
});
Object.defineProperty(exports, "parseData", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.parseData; }
});
Object.defineProperty(exports, "priorityVariant", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.priorityVariant; }
});
Object.defineProperty(exports, "resolveVotingMethods", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.resolveVotingMethods; }
});
Object.defineProperty(exports, "violatesVotingMethodLock", {
  enumerable: true,
  get: function () { return chunk7VPRRIJI_cjs.violatesVotingMethodLock; }
});
Object.defineProperty(exports, "addressSchema", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.addressSchema; }
});
Object.defineProperty(exports, "isUuid", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.isUuid; }
});
Object.defineProperty(exports, "oibSchema", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.oibSchema; }
});
Object.defineProperty(exports, "optionalOibSchema", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.optionalOibSchema; }
});
Object.defineProperty(exports, "phoneSchema", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.phoneSchema; }
});
Object.defineProperty(exports, "toUuid", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.toUuid; }
});
Object.defineProperty(exports, "unsafeUuid", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.unsafeUuid; }
});
Object.defineProperty(exports, "uuidStringSchema", {
  enumerable: true,
  get: function () { return chunkIHUEEK2O_cjs.uuidStringSchema; }
});
Object.defineProperty(exports, "addressSearchResultSchema", {
  enumerable: true,
  get: function () { return chunkBQDXLZYG_cjs.addressSearchResultSchema; }
});
Object.defineProperty(exports, "buildMapUrl", {
  enumerable: true,
  get: function () { return chunkBQDXLZYG_cjs.buildMapUrl; }
});
Object.defineProperty(exports, "compareHouseNumbers", {
  enumerable: true,
  get: function () { return chunkBQDXLZYG_cjs.compareHouseNumbers; }
});
Object.defineProperty(exports, "existingBuildingRefSchema", {
  enumerable: true,
  get: function () { return chunkBQDXLZYG_cjs.existingBuildingRefSchema; }
});
Object.defineProperty(exports, "structuredAddressInputSchema", {
  enumerable: true,
  get: function () { return chunkBQDXLZYG_cjs.structuredAddressInputSchema; }
});
Object.defineProperty(exports, "formatAddress", {
  enumerable: true,
  get: function () { return chunk4CZ7F75B_cjs.formatAddress; }
});
Object.defineProperty(exports, "isValidHouseNumber", {
  enumerable: true,
  get: function () { return chunk4CZ7F75B_cjs.isValidHouseNumber; }
});
Object.defineProperty(exports, "normalizeHouseNumber", {
  enumerable: true,
  get: function () { return chunk4CZ7F75B_cjs.normalizeHouseNumber; }
});
Object.defineProperty(exports, "parseHouseNumber", {
  enumerable: true,
  get: function () { return chunk4CZ7F75B_cjs.parseHouseNumber; }
});
Object.defineProperty(exports, "ADMIN_ORG_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ADMIN_ORG_PERMISSIONS; }
});
Object.defineProperty(exports, "ADMIN_PLATFORM_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ADMIN_PLATFORM_PERMISSIONS; }
});
Object.defineProperty(exports, "ALLOWED_ENTITY_LINKS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ALLOWED_ENTITY_LINKS; }
});
Object.defineProperty(exports, "ALL_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ALL_PERMISSIONS; }
});
Object.defineProperty(exports, "BUILDING_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.BUILDING_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "CHAT_CONVERSATIONS_POLL_MS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.CHAT_CONVERSATIONS_POLL_MS; }
});
Object.defineProperty(exports, "DEFAULT_PAGINATION_LIMIT", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.DEFAULT_PAGINATION_LIMIT; }
});
Object.defineProperty(exports, "ENTITY_LINK_TYPE_META", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ENTITY_LINK_TYPE_META; }
});
Object.defineProperty(exports, "MAX_PAGINATION_LIMIT", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.MAX_PAGINATION_LIMIT; }
});
Object.defineProperty(exports, "ORG_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ORG_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "PLATFORM_ROLE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.PLATFORM_ROLE_PERMISSIONS; }
});
Object.defineProperty(exports, "RELATED_TO_LINKABLE_TYPES", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.RELATED_TO_LINKABLE_TYPES; }
});
Object.defineProperty(exports, "adminBuildingKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.adminBuildingKeys; }
});
Object.defineProperty(exports, "adminKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.adminKeys; }
});
Object.defineProperty(exports, "aiUsageKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.aiUsageKeys; }
});
Object.defineProperty(exports, "apartmentKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.apartmentKeys; }
});
Object.defineProperty(exports, "blogKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.blogKeys; }
});
Object.defineProperty(exports, "boardKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.boardKeys; }
});
Object.defineProperty(exports, "buildingEmailKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.buildingEmailKeys; }
});
Object.defineProperty(exports, "buildingKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.buildingKeys; }
});
Object.defineProperty(exports, "businessPartnerKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.businessPartnerKeys; }
});
Object.defineProperty(exports, "chatKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.chatKeys; }
});
Object.defineProperty(exports, "dashboardSummaryKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.dashboardSummaryKeys; }
});
Object.defineProperty(exports, "documentKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.documentKeys; }
});
Object.defineProperty(exports, "entityLinkKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.entityLinkKeys; }
});
Object.defineProperty(exports, "eventKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.eventKeys; }
});
Object.defineProperty(exports, "failureReportKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.failureReportKeys; }
});
Object.defineProperty(exports, "faqKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.faqKeys; }
});
Object.defineProperty(exports, "fundsKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.fundsKeys; }
});
Object.defineProperty(exports, "garageKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.garageKeys; }
});
Object.defineProperty(exports, "incomeKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.incomeKeys; }
});
Object.defineProperty(exports, "isEntityLinkAllowed", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.isEntityLinkAllowed; }
});
Object.defineProperty(exports, "layoutKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.layoutKeys; }
});
Object.defineProperty(exports, "maintenanceLogKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.maintenanceLogKeys; }
});
Object.defineProperty(exports, "noticeKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.noticeKeys; }
});
Object.defineProperty(exports, "notificationKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.notificationKeys; }
});
Object.defineProperty(exports, "organizationKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.organizationKeys; }
});
Object.defineProperty(exports, "ownerKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.ownerKeys; }
});
Object.defineProperty(exports, "permissionKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.permissionKeys; }
});
Object.defineProperty(exports, "platformBuildingKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.platformBuildingKeys; }
});
Object.defineProperty(exports, "pollKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.pollKeys; }
});
Object.defineProperty(exports, "queryKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.queryKeys; }
});
Object.defineProperty(exports, "recentKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.recentKeys; }
});
Object.defineProperty(exports, "recurringTemplateKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.recurringTemplateKeys; }
});
Object.defineProperty(exports, "spotlightKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.spotlightKeys; }
});
Object.defineProperty(exports, "storageUnitKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.storageUnitKeys; }
});
Object.defineProperty(exports, "transactionCategoryKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.transactionCategoryKeys; }
});
Object.defineProperty(exports, "unitReminderKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.unitReminderKeys; }
});
Object.defineProperty(exports, "unitSearchKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.unitSearchKeys; }
});
Object.defineProperty(exports, "userKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.userKeys; }
});
Object.defineProperty(exports, "widgetKeys", {
  enumerable: true,
  get: function () { return chunkLUIWGWFA_cjs.widgetKeys; }
});
Object.defineProperty(exports, "ARCHIVE_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.ARCHIVE_TYPES; }
});
Object.defineProperty(exports, "ApprovalStatusSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.ApprovalStatusSchema; }
});
Object.defineProperty(exports, "BOARD_CARD_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.BOARD_CARD_LIMITS; }
});
Object.defineProperty(exports, "BOARD_COLUMN_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.BOARD_COLUMN_LIMITS; }
});
Object.defineProperty(exports, "BOARD_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.BOARD_LIMITS; }
});
Object.defineProperty(exports, "BUILDING_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.BUILDING_LIMITS; }
});
Object.defineProperty(exports, "BUILDING_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.BUILDING_TYPES; }
});
Object.defineProperty(exports, "CHAT_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.CHAT_LIMITS; }
});
Object.defineProperty(exports, "CommonStatusSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.CommonStatusSchema; }
});
Object.defineProperty(exports, "DOCUMENT_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.DOCUMENT_LIMITS; }
});
Object.defineProperty(exports, "EMAIL_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.EMAIL_LIMITS; }
});
Object.defineProperty(exports, "ENTITY_LINK_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.ENTITY_LINK_TYPES; }
});
Object.defineProperty(exports, "EVENT_COLORS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.EVENT_COLORS; }
});
Object.defineProperty(exports, "EVENT_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.EVENT_TYPES; }
});
Object.defineProperty(exports, "EVENT_TYPE_COLOR_MAP", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.EVENT_TYPE_COLOR_MAP; }
});
Object.defineProperty(exports, "FAILURE_REPORT_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.FAILURE_REPORT_LIMITS; }
});
Object.defineProperty(exports, "FAQ_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.FAQ_LIMITS; }
});
Object.defineProperty(exports, "FailureStatusSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.FailureStatusSchema; }
});
Object.defineProperty(exports, "LINKABLE_ENTITY_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.LINKABLE_ENTITY_TYPES; }
});
Object.defineProperty(exports, "MAINTENANCE_FINANCED_BY", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.MAINTENANCE_FINANCED_BY; }
});
Object.defineProperty(exports, "MAINTENANCE_LOG_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.MAINTENANCE_LOG_LIMITS; }
});
Object.defineProperty(exports, "MaintenanceStatusSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.MaintenanceStatusSchema; }
});
Object.defineProperty(exports, "NOTICE_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.NOTICE_LIMITS; }
});
Object.defineProperty(exports, "ORGANIZATION_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.ORGANIZATION_LIMITS; }
});
Object.defineProperty(exports, "POLL_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.POLL_LIMITS; }
});
Object.defineProperty(exports, "POLL_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.POLL_TYPES; }
});
Object.defineProperty(exports, "PrioritySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.PrioritySchema; }
});
Object.defineProperty(exports, "RECURRENCE_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.RECURRENCE_TYPES; }
});
Object.defineProperty(exports, "REP_RECENT_ACTIVITY_TYPES", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.REP_RECENT_ACTIVITY_TYPES; }
});
Object.defineProperty(exports, "TRANSACTION_CATEGORY_LIMITS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.TRANSACTION_CATEGORY_LIMITS; }
});
Object.defineProperty(exports, "UNIT_KINDS", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.UNIT_KINDS; }
});
Object.defineProperty(exports, "addOrgMemberSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.addOrgMemberSchema; }
});
Object.defineProperty(exports, "aiChatMessageSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.aiChatMessageSchema; }
});
Object.defineProperty(exports, "aiChatRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.aiChatRequestSchema; }
});
Object.defineProperty(exports, "aiUsageResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.aiUsageResponseSchema; }
});
Object.defineProperty(exports, "apiErrorResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.apiErrorResponseSchema; }
});
Object.defineProperty(exports, "apiErrorSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.apiErrorSchema; }
});
Object.defineProperty(exports, "approvalStatusOptions", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.approvalStatusOptions; }
});
Object.defineProperty(exports, "approveFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.approveFailureReportSchema; }
});
Object.defineProperty(exports, "approveNoticeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.approveNoticeSchema; }
});
Object.defineProperty(exports, "archiveTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.archiveTypeSchema; }
});
Object.defineProperty(exports, "archivedItemSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.archivedItemSchema; }
});
Object.defineProperty(exports, "assignOrgBuildingSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.assignOrgBuildingSchema; }
});
Object.defineProperty(exports, "assignOrgMemberBuildingSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.assignOrgMemberBuildingSchema; }
});
Object.defineProperty(exports, "assignOwnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.assignOwnerSchema; }
});
Object.defineProperty(exports, "baseEntitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.baseEntitySchema; }
});
Object.defineProperty(exports, "boardCardChecklistItemSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.boardCardChecklistItemSchema; }
});
Object.defineProperty(exports, "boardCardEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.boardCardEventSchema; }
});
Object.defineProperty(exports, "buildingDetailResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingDetailResponseSchema; }
});
Object.defineProperty(exports, "buildingEntitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingEntitySchema; }
});
Object.defineProperty(exports, "buildingFundsLedgerResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingFundsLedgerResponseSchema; }
});
Object.defineProperty(exports, "buildingFundsLedgerRowSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingFundsLedgerRowSchema; }
});
Object.defineProperty(exports, "buildingOwnerAssignmentSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingOwnerAssignmentSchema; }
});
Object.defineProperty(exports, "buildingQuotaConfigSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingQuotaConfigSchema; }
});
Object.defineProperty(exports, "buildingQuotaEntrySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingQuotaEntrySchema; }
});
Object.defineProperty(exports, "buildingQuotaListSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingQuotaListSchema; }
});
Object.defineProperty(exports, "buildingResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingResponseSchema; }
});
Object.defineProperty(exports, "buildingSettingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingSettingsResponseSchema; }
});
Object.defineProperty(exports, "buildingTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingTypeSchema; }
});
Object.defineProperty(exports, "buildingUserEntitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.buildingUserEntitySchema; }
});
Object.defineProperty(exports, "businessPartnerResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.businessPartnerResponseSchema; }
});
Object.defineProperty(exports, "camtImportResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.camtImportResponseSchema; }
});
Object.defineProperty(exports, "certiliaUserinfoSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.certiliaUserinfoSchema; }
});
Object.defineProperty(exports, "chatMessageResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.chatMessageResponseSchema; }
});
Object.defineProperty(exports, "commentResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.commentResponseSchema; }
});
Object.defineProperty(exports, "commonStatusOptions", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.commonStatusOptions; }
});
Object.defineProperty(exports, "conversationLastMessageSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.conversationLastMessageSchema; }
});
Object.defineProperty(exports, "conversationParticipantSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.conversationParticipantSchema; }
});
Object.defineProperty(exports, "conversationResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.conversationResponseSchema; }
});
Object.defineProperty(exports, "conversationsListResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.conversationsListResponseSchema; }
});
Object.defineProperty(exports, "copyFaqsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.copyFaqsSchema; }
});
Object.defineProperty(exports, "copyTransactionCategoriesSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.copyTransactionCategoriesSchema; }
});
Object.defineProperty(exports, "createBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createBoardCardSchema; }
});
Object.defineProperty(exports, "createBoardColumnSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createBoardColumnSchema; }
});
Object.defineProperty(exports, "createBoardSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createBoardSchema; }
});
Object.defineProperty(exports, "createBuildingSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createBuildingSchema; }
});
Object.defineProperty(exports, "createBusinessPartnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createBusinessPartnerSchema; }
});
Object.defineProperty(exports, "createConversationSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createConversationSchema; }
});
Object.defineProperty(exports, "createDocumentSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createDocumentSchema; }
});
Object.defineProperty(exports, "createEmailThreadRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createEmailThreadRequestSchema; }
});
Object.defineProperty(exports, "createEntityLinkRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createEntityLinkRequestSchema; }
});
Object.defineProperty(exports, "createEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createEventSchema; }
});
Object.defineProperty(exports, "createExpenseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createExpenseSchema; }
});
Object.defineProperty(exports, "createFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createFailureReportSchema; }
});
Object.defineProperty(exports, "createFaqSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createFaqSchema; }
});
Object.defineProperty(exports, "createIncomeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createIncomeSchema; }
});
Object.defineProperty(exports, "createMaintenanceLogSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createMaintenanceLogSchema; }
});
Object.defineProperty(exports, "createNoticeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createNoticeSchema; }
});
Object.defineProperty(exports, "createOrganizationSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createOrganizationSchema; }
});
Object.defineProperty(exports, "createOwnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createOwnerSchema; }
});
Object.defineProperty(exports, "createPollSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createPollSchema; }
});
Object.defineProperty(exports, "createTransactionCategorySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createTransactionCategorySchema; }
});
Object.defineProperty(exports, "createUnitSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.createUnitSchema; }
});
Object.defineProperty(exports, "cursorQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.cursorQuerySchema; }
});
Object.defineProperty(exports, "dateRangeParamsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.dateRangeParamsSchema; }
});
Object.defineProperty(exports, "dateRangeWithValidationSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.dateRangeWithValidationSchema; }
});
Object.defineProperty(exports, "dateTimeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.dateTimeSchema; }
});
Object.defineProperty(exports, "deleteEntityLinkQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.deleteEntityLinkQuerySchema; }
});
Object.defineProperty(exports, "deleteEntityLinkRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.deleteEntityLinkRequestSchema; }
});
Object.defineProperty(exports, "documentFileSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.documentFileSchema; }
});
Object.defineProperty(exports, "documentLinkedRecordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.documentLinkedRecordSchema; }
});
Object.defineProperty(exports, "documentResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.documentResponseSchema; }
});
Object.defineProperty(exports, "emailAttachmentSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.emailAttachmentSchema; }
});
Object.defineProperty(exports, "emailMessageSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.emailMessageSchema; }
});
Object.defineProperty(exports, "emailSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.emailSchema; }
});
Object.defineProperty(exports, "emailThreadDetailSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.emailThreadDetailSchema; }
});
Object.defineProperty(exports, "emailThreadSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.emailThreadSchema; }
});
Object.defineProperty(exports, "entityLinkCountsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinkCountsResponseSchema; }
});
Object.defineProperty(exports, "entityLinkEndpointSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinkEndpointSchema; }
});
Object.defineProperty(exports, "entityLinkMetadataSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinkMetadataSchema; }
});
Object.defineProperty(exports, "entityLinkReferenceSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinkReferenceSchema; }
});
Object.defineProperty(exports, "entityLinkTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinkTypeSchema; }
});
Object.defineProperty(exports, "entityLinksResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.entityLinksResponseSchema; }
});
Object.defineProperty(exports, "eventColorSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.eventColorSchema; }
});
Object.defineProperty(exports, "eventResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.eventResponseSchema; }
});
Object.defineProperty(exports, "eventTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.eventTypeSchema; }
});
Object.defineProperty(exports, "failureReportEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.failureReportEventSchema; }
});
Object.defineProperty(exports, "failureReportResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.failureReportResponseSchema; }
});
Object.defineProperty(exports, "failureStatusOptions", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.failureStatusOptions; }
});
Object.defineProperty(exports, "faqResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.faqResponseSchema; }
});
Object.defineProperty(exports, "finalizePollSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.finalizePollSchema; }
});
Object.defineProperty(exports, "forgotPasswordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.forgotPasswordSchema; }
});
Object.defineProperty(exports, "getEntityLinkCountsQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getEntityLinkCountsQuerySchema; }
});
Object.defineProperty(exports, "getEntityLinksQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getEntityLinksQuerySchema; }
});
Object.defineProperty(exports, "getOrgBuildingsQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getOrgBuildingsQuerySchema; }
});
Object.defineProperty(exports, "getOrgMembersQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getOrgMembersQuerySchema; }
});
Object.defineProperty(exports, "getRepBuildingsParamsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getRepBuildingsParamsSchema; }
});
Object.defineProperty(exports, "getRepUsersParamsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getRepUsersParamsSchema; }
});
Object.defineProperty(exports, "getTransactionCategoriesQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.getTransactionCategoriesQuerySchema; }
});
Object.defineProperty(exports, "inviteOrgMemberSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.inviteOrgMemberSchema; }
});
Object.defineProperty(exports, "inviteOwnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.inviteOwnerSchema; }
});
Object.defineProperty(exports, "joinBuildingWithOtpSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.joinBuildingWithOtpSchema; }
});
Object.defineProperty(exports, "linkableEntityTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.linkableEntityTypeSchema; }
});
Object.defineProperty(exports, "listArchivedResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.listArchivedResponseSchema; }
});
Object.defineProperty(exports, "loginSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.loginSchema; }
});
Object.defineProperty(exports, "maintenanceFinancedBySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.maintenanceFinancedBySchema; }
});
Object.defineProperty(exports, "maintenanceLogEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.maintenanceLogEventSchema; }
});
Object.defineProperty(exports, "maintenanceLogResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.maintenanceLogResponseSchema; }
});
Object.defineProperty(exports, "maintenanceStatusOptions", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.maintenanceStatusOptions; }
});
Object.defineProperty(exports, "messageResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.messageResponseSchema; }
});
Object.defineProperty(exports, "messagesListResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.messagesListResponseSchema; }
});
Object.defineProperty(exports, "moneyStringSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.moneyStringSchema; }
});
Object.defineProperty(exports, "moveBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.moveBoardCardSchema; }
});
Object.defineProperty(exports, "multipartArray", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.multipartArray; }
});
Object.defineProperty(exports, "multipartBoolean", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.multipartBoolean; }
});
Object.defineProperty(exports, "noticeEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.noticeEventSchema; }
});
Object.defineProperty(exports, "noticeResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.noticeResponseSchema; }
});
Object.defineProperty(exports, "notificationPreferenceCategorySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.notificationPreferenceCategorySchema; }
});
Object.defineProperty(exports, "notificationPreferenceItemSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.notificationPreferenceItemSchema; }
});
Object.defineProperty(exports, "notificationResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.notificationResponseSchema; }
});
Object.defineProperty(exports, "optionalDateTimeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.optionalDateTimeSchema; }
});
Object.defineProperty(exports, "ownerResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.ownerResponseSchema; }
});
Object.defineProperty(exports, "paginatedBuildingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedBuildingsResponseSchema; }
});
Object.defineProperty(exports, "paginatedDocumentsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedDocumentsResponseSchema; }
});
Object.defineProperty(exports, "paginatedEmailThreadsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedEmailThreadsResponseSchema; }
});
Object.defineProperty(exports, "paginatedEventsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedEventsResponseSchema; }
});
Object.defineProperty(exports, "paginatedFailureReportsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedFailureReportsResponseSchema; }
});
Object.defineProperty(exports, "paginatedMaintenanceLogsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedMaintenanceLogsResponseSchema; }
});
Object.defineProperty(exports, "paginatedNoticesResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedNoticesResponseSchema; }
});
Object.defineProperty(exports, "paginatedPollsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedPollsResponseSchema; }
});
Object.defineProperty(exports, "paginatedRepBuildingsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedRepBuildingsResponseSchema; }
});
Object.defineProperty(exports, "paginatedRepUsersResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedRepUsersResponseSchema; }
});
Object.defineProperty(exports, "paginatedResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedResponseSchema; }
});
Object.defineProperty(exports, "paginatedUnitsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginatedUnitsResponseSchema; }
});
Object.defineProperty(exports, "paginationParamsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.paginationParamsSchema; }
});
Object.defineProperty(exports, "passwordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.passwordSchema; }
});
Object.defineProperty(exports, "permissionFieldsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.permissionFieldsSchema; }
});
Object.defineProperty(exports, "permissionsResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.permissionsResponseSchema; }
});
Object.defineProperty(exports, "pollEligibleVoterSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollEligibleVoterSchema; }
});
Object.defineProperty(exports, "pollEligibleVotersResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollEligibleVotersResponseSchema; }
});
Object.defineProperty(exports, "pollResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollResponseSchema; }
});
Object.defineProperty(exports, "pollResultsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollResultsSchema; }
});
Object.defineProperty(exports, "pollTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollTypeSchema; }
});
Object.defineProperty(exports, "pollVotersResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.pollVotersResponseSchema; }
});
Object.defineProperty(exports, "priorityOptions", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.priorityOptions; }
});
Object.defineProperty(exports, "recordOfflineVotesSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.recordOfflineVotesSchema; }
});
Object.defineProperty(exports, "recurrenceTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.recurrenceTypeSchema; }
});
Object.defineProperty(exports, "registerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.registerSchema; }
});
Object.defineProperty(exports, "reorderBoardColumnsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.reorderBoardColumnsSchema; }
});
Object.defineProperty(exports, "reorderFaqsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.reorderFaqsSchema; }
});
Object.defineProperty(exports, "repBuildingActivitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repBuildingActivitySchema; }
});
Object.defineProperty(exports, "repBuildingItemSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repBuildingItemSchema; }
});
Object.defineProperty(exports, "repDashboardSummaryResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repDashboardSummaryResponseSchema; }
});
Object.defineProperty(exports, "repRecentActivitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repRecentActivitySchema; }
});
Object.defineProperty(exports, "repRecentActivityTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repRecentActivityTypeSchema; }
});
Object.defineProperty(exports, "repUserBuildingSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repUserBuildingSchema; }
});
Object.defineProperty(exports, "repUserItemSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.repUserItemSchema; }
});
Object.defineProperty(exports, "replyEmailThreadRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.replyEmailThreadRequestSchema; }
});
Object.defineProperty(exports, "resetPasswordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.resetPasswordSchema; }
});
Object.defineProperty(exports, "roleTypeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.roleTypeSchema; }
});
Object.defineProperty(exports, "searchUsersQuerySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.searchUsersQuerySchema; }
});
Object.defineProperty(exports, "sendMessageSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.sendMessageSchema; }
});
Object.defineProperty(exports, "signedMoneyStringSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.signedMoneyStringSchema; }
});
Object.defineProperty(exports, "strongPasswordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.strongPasswordSchema; }
});
Object.defineProperty(exports, "timeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.timeSchema; }
});
Object.defineProperty(exports, "unitKindSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.unitKindSchema; }
});
Object.defineProperty(exports, "unitRoleSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.unitRoleSchema; }
});
Object.defineProperty(exports, "unitSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.unitSchema; }
});
Object.defineProperty(exports, "unitUserSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.unitUserSchema; }
});
Object.defineProperty(exports, "unreadCountResponseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.unreadCountResponseSchema; }
});
Object.defineProperty(exports, "updateBoardCardSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBoardCardSchema; }
});
Object.defineProperty(exports, "updateBoardColumnSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBoardColumnSchema; }
});
Object.defineProperty(exports, "updateBoardSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBoardSchema; }
});
Object.defineProperty(exports, "updateBuildingSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBuildingSchema; }
});
Object.defineProperty(exports, "updateBuildingSettingsSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBuildingSettingsSchema; }
});
Object.defineProperty(exports, "updateBusinessPartnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateBusinessPartnerSchema; }
});
Object.defineProperty(exports, "updateConversationSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateConversationSchema; }
});
Object.defineProperty(exports, "updateDocumentSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateDocumentSchema; }
});
Object.defineProperty(exports, "updateEventSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateEventSchema; }
});
Object.defineProperty(exports, "updateExpenseSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateExpenseSchema; }
});
Object.defineProperty(exports, "updateFailureReportRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateFailureReportRequestSchema; }
});
Object.defineProperty(exports, "updateFailureReportSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateFailureReportSchema; }
});
Object.defineProperty(exports, "updateFaqSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateFaqSchema; }
});
Object.defineProperty(exports, "updateIncomeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateIncomeSchema; }
});
Object.defineProperty(exports, "updateMaintenanceLogRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateMaintenanceLogRequestSchema; }
});
Object.defineProperty(exports, "updateMaintenanceLogSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateMaintenanceLogSchema; }
});
Object.defineProperty(exports, "updateNoticeRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateNoticeRequestSchema; }
});
Object.defineProperty(exports, "updateNoticeSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateNoticeSchema; }
});
Object.defineProperty(exports, "updateOrgMemberRoleSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateOrgMemberRoleSchema; }
});
Object.defineProperty(exports, "updateOrganizationSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateOrganizationSchema; }
});
Object.defineProperty(exports, "updateOwnerSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateOwnerSchema; }
});
Object.defineProperty(exports, "updatePasswordSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updatePasswordSchema; }
});
Object.defineProperty(exports, "updatePollRequestSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updatePollRequestSchema; }
});
Object.defineProperty(exports, "updatePollSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updatePollSchema; }
});
Object.defineProperty(exports, "updateTransactionCategorySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateTransactionCategorySchema; }
});
Object.defineProperty(exports, "updateUnitSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateUnitSchema; }
});
Object.defineProperty(exports, "updateUserBuildingRoleSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.updateUserBuildingRoleSchema; }
});
Object.defineProperty(exports, "userEntitySchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.userEntitySchema; }
});
Object.defineProperty(exports, "uuidSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.uuidSchema; }
});
Object.defineProperty(exports, "verifyOtpSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.verifyOtpSchema; }
});
Object.defineProperty(exports, "votePollSchema", {
  enumerable: true,
  get: function () { return chunkR2IK4PYV_cjs.votePollSchema; }
});
Object.defineProperty(exports, "addMoney", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.addMoney; }
});
Object.defineProperty(exports, "formatMoney", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.formatMoney; }
});
Object.defineProperty(exports, "fromCents", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.fromCents; }
});
Object.defineProperty(exports, "moneyEquals", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.moneyEquals; }
});
Object.defineProperty(exports, "normalizeMoney", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.normalizeMoney; }
});
Object.defineProperty(exports, "subtractMoney", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.subtractMoney; }
});
Object.defineProperty(exports, "sumMoney", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.sumMoney; }
});
Object.defineProperty(exports, "toCents", {
  enumerable: true,
  get: function () { return chunkX3TW7GWG_cjs.toCents; }
});
Object.defineProperty(exports, "ibanSchema", {
  enumerable: true,
  get: function () { return chunkXXNOAOHF_cjs.ibanSchema; }
});
Object.defineProperty(exports, "optionalIbanSchema", {
  enumerable: true,
  get: function () { return chunkXXNOAOHF_cjs.optionalIbanSchema; }
});
Object.defineProperty(exports, "AI_CHAT_LIMITS", {
  enumerable: true,
  get: function () { return chunkNQLL5CZO_cjs.AI_CHAT_LIMITS; }
});
Object.defineProperty(exports, "APPROVE_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.APPROVE_PERMISSIONS; }
});
Object.defineProperty(exports, "ApartmentRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.ApartmentRole; }
});
Object.defineProperty(exports, "ApprovalStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.ApprovalStatus; }
});
Object.defineProperty(exports, "BUILDING_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BUILDING_ROLE_RANK; }
});
Object.defineProperty(exports, "BoardVisibility", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BoardVisibility; }
});
Object.defineProperty(exports, "BuildingOtpExpiry", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BuildingOtpExpiry; }
});
Object.defineProperty(exports, "BuildingRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BuildingRole; }
});
Object.defineProperty(exports, "BuildingStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BuildingStatus; }
});
Object.defineProperty(exports, "BuildingType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.BuildingType; }
});
Object.defineProperty(exports, "CO_OWNER_VISIBLE_SYSTEM_TYPES", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.CO_OWNER_VISIBLE_SYSTEM_TYPES; }
});
Object.defineProperty(exports, "CommonStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.CommonStatus; }
});
Object.defineProperty(exports, "DevicePlatform", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.DevicePlatform; }
});
Object.defineProperty(exports, "EntityLinkType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.EntityLinkType; }
});
Object.defineProperty(exports, "FailureLocationType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FailureLocationType; }
});
Object.defineProperty(exports, "FailureStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FailureStatus; }
});
Object.defineProperty(exports, "FailureType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FailureType; }
});
Object.defineProperty(exports, "FailureUnitType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FailureUnitType; }
});
Object.defineProperty(exports, "FileCategory", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FileCategory; }
});
Object.defineProperty(exports, "Frequency", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.Frequency; }
});
Object.defineProperty(exports, "FundsSource", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.FundsSource; }
});
Object.defineProperty(exports, "IdentityVerificationMethod", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.IdentityVerificationMethod; }
});
Object.defineProperty(exports, "JoinRequestStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.JoinRequestStatus; }
});
Object.defineProperty(exports, "LinkableEntityType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.LinkableEntityType; }
});
Object.defineProperty(exports, "MaintenanceLogFinancedBy", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.MaintenanceLogFinancedBy; }
});
Object.defineProperty(exports, "MaintenanceStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.MaintenanceStatus; }
});
Object.defineProperty(exports, "MaintenanceType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.MaintenanceType; }
});
Object.defineProperty(exports, "NOTIFICATION_TYPE_CATEGORY", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.NOTIFICATION_TYPE_CATEGORY; }
});
Object.defineProperty(exports, "NotificationCategory", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.NotificationCategory; }
});
Object.defineProperty(exports, "NotificationChannel", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.NotificationChannel; }
});
Object.defineProperty(exports, "NotificationDeliveryStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.NotificationDeliveryStatus; }
});
Object.defineProperty(exports, "NotificationType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.NotificationType; }
});
Object.defineProperty(exports, "ORG_QUOTA_DEFAULT_DAILY_LIMITS", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.ORG_QUOTA_DEFAULT_DAILY_LIMITS; }
});
Object.defineProperty(exports, "ORG_QUOTA_RESOURCE_TYPES", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.ORG_QUOTA_RESOURCE_TYPES; }
});
Object.defineProperty(exports, "ORG_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.ORG_ROLE_RANK; }
});
Object.defineProperty(exports, "OrgQuotaResourceType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.OrgQuotaResourceType; }
});
Object.defineProperty(exports, "OrgRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.OrgRole; }
});
Object.defineProperty(exports, "OrgStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.OrgStatus; }
});
Object.defineProperty(exports, "OrgType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.OrgType; }
});
Object.defineProperty(exports, "PLATFORM_ROLE_RANK", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PLATFORM_ROLE_RANK; }
});
Object.defineProperty(exports, "POLL_CANNOT_VOTE_REASON_KEY", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.POLL_CANNOT_VOTE_REASON_KEY; }
});
Object.defineProperty(exports, "Permission", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.Permission; }
});
Object.defineProperty(exports, "PlatformRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PlatformRole; }
});
Object.defineProperty(exports, "PollCannotVoteReason", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PollCannotVoteReason; }
});
Object.defineProperty(exports, "PollStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PollStatus; }
});
Object.defineProperty(exports, "PollType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PollType; }
});
Object.defineProperty(exports, "PollVoteStatus", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PollVoteStatus; }
});
Object.defineProperty(exports, "PricuvaRefMode", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.PricuvaRefMode; }
});
Object.defineProperty(exports, "Priority", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.Priority; }
});
Object.defineProperty(exports, "QUOTA_DEFAULT_DAILY_LIMITS", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.QUOTA_DEFAULT_DAILY_LIMITS; }
});
Object.defineProperty(exports, "QUOTA_RESOURCE_TYPES", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.QUOTA_RESOURCE_TYPES; }
});
Object.defineProperty(exports, "QuotaResourceType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.QuotaResourceType; }
});
Object.defineProperty(exports, "SCOPED_DOMAINS", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.SCOPED_DOMAINS; }
});
Object.defineProperty(exports, "SCOPED_PERMISSIONS", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.SCOPED_PERMISSIONS; }
});
Object.defineProperty(exports, "TransactionCategory", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.TransactionCategory; }
});
Object.defineProperty(exports, "TransactionSource", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.TransactionSource; }
});
Object.defineProperty(exports, "TransactionType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.TransactionType; }
});
Object.defineProperty(exports, "UNIMPLEMENTED_NOTIFICATION_TYPES", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.UNIMPLEMENTED_NOTIFICATION_TYPES; }
});
Object.defineProperty(exports, "UnitType", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.UnitType; }
});
Object.defineProperty(exports, "VerificationTier", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.VerificationTier; }
});
Object.defineProperty(exports, "WASTE_SUBTYPE_NOTIFICATION_MAP", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.WASTE_SUBTYPE_NOTIFICATION_MAP; }
});
Object.defineProperty(exports, "canAssignOrgRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.canAssignOrgRole; }
});
Object.defineProperty(exports, "canAssignPlatformRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.canAssignPlatformRole; }
});
Object.defineProperty(exports, "canAssignRole", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.canAssignRole; }
});
Object.defineProperty(exports, "domainPermissions", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.domainPermissions; }
});
Object.defineProperty(exports, "methodToTier", {
  enumerable: true,
  get: function () { return chunkD2MJJ7NU_cjs.methodToTier; }
});
Object.defineProperty(exports, "BACKEND_ERROR_CODES", {
  enumerable: true,
  get: function () { return chunkAKVKGQ3H_cjs.BACKEND_ERROR_CODES; }
});
Object.defineProperty(exports, "isBackendErrorCode", {
  enumerable: true,
  get: function () { return chunkAKVKGQ3H_cjs.isBackendErrorCode; }
});
Object.defineProperty(exports, "colors", {
  enumerable: true,
  get: function () { return chunkL6DDUCLQ_cjs.colors; }
});
Object.defineProperty(exports, "radii", {
  enumerable: true,
  get: function () { return chunkL6DDUCLQ_cjs.radii; }
});
Object.defineProperty(exports, "themes", {
  enumerable: true,
  get: function () { return chunkL6DDUCLQ_cjs.themes; }
});
Object.defineProperty(exports, "createPaginatedResponse", {
  enumerable: true,
  get: function () { return chunkOOJKTZT4_cjs.createPaginatedResponse; }
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
exports.MaintenanceLogsTestIds = MaintenanceLogsTestIds;
exports.NoticeBoardTestIds = NoticeBoardTestIds;
exports.OnboardingTestIds = OnboardingTestIds;
exports.PollsTestIds = PollsTestIds;
exports.SettingsTestIds = SettingsTestIds;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map