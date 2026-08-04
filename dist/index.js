export { API_ROUTES } from './chunk-MJ66VNCW.js';
export { DATETIME_FORMATS, DATE_FORMATS, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, TIME_FORMATS, VOTING_METHOD_SETTINGS, applyResidentRestriction, applyResidentRestrictionToItem, buildGoogleCalendarUrl, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDate as formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getInitials, getMessageableUsers, getRoleBadge, isFeatureAvailable, isManagerialRole, normalizePaginatedResponse, parseApiError, parseData, resolveVotingMethods } from './chunk-DNO7JGTP.js';
export { addressSchema, isUuid, oibSchema, optionalOibSchema, phoneSchema, toUuid } from './chunk-J6GNMTLC.js';
export { addressSearchResultSchema, buildMapUrl, compareHouseNumbers, existingBuildingRefSchema, structuredAddressInputSchema } from './chunk-5IXETHTU.js';
export { formatAddress, normalizeHouseNumber, parseHouseNumber } from './chunk-KOHKXE5X.js';
export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, ENTITY_LINK_TYPE_META, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, OWNERSHIP_DERIVED_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, STANDARD_UNIT_PRICE_CENTS, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, auditLogKeys, blogKeys, boardKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, dsarKeys, enterpriseRequestKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, featureFlagKeys, fundsKeys, garageKeys, incomeKeys, isEntityLinkAllowed, layoutKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, platformFeatureKeys, platformSubscriptionKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitSearchKeys, userKeys, widgetKeys } from './chunk-WXVLBTNI.js';
export { ARCHIVE_TYPES, AUDIT_DENIAL_TARGET_TYPE, ApprovalStatusSchema, BOARD_CARD_LIMITS, BOARD_COLUMN_LIMITS, BOARD_LIMITS, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, DOCUMENT_LIMITS, DOCUMENT_SOURCE_TYPES, EMAIL_LIMITS, ENTITY_LINK_TYPES, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, LINKABLE_ENTITY_TYPES, NOTICE_LIMITS, ORGANIZATION_LIMITS, OrgInvitationStatus, POLL_LIMITS, POLL_TYPES, PrioritySchema, RECURRENCE_TYPES, REP_RECENT_ACTIVITY_TYPES, TRANSACTION_CATEGORY_LIMITS, UNIT_KINDS, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, auditLogResponseSchema, baseEntitySchema, boardCardChecklistItemSchema, boardCardEventSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingOwnerAssignmentSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardColumnSchema, createBoardSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createDocumentSchema, createDsarEventSchema, createDsarRequestSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createEventSchema, createExpenseSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createNoticeSchema, createOrgBroadcastSchema, createOrganizationSchema, createOwnerSchema, createPlatformSubscriptionSchema, createPollSchema, createTransactionCategorySchema, createUnitSchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, dsarErasureSchema, dsarEventResponseSchema, dsarRequestResponseSchema, emailAttachmentSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, emailUnreadCountResponseSchema, enterpriseRequestResponseSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, featureFlagsResponseSchema, finalizePollSchema, forgotPasswordSchema, getAuditLogsQuerySchema, getDsarRequestsQuerySchema, getEnterpriseRequestsQuerySchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getNotificationDataSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getPlatformSubscriptionsQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, inviteOwnerSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, messageResponseSchema, messagesListResponseSchema, moneyStringSchema, moveBoardCardSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationDataSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgBroadcastResponseSchema, orgInvitationResponseSchema, ownerResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginatedUnitsResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, platformFeatureFlagSchema, platformFeatureFlagsResponseSchema, platformSubscriptionResponseSchema, pollEligibleVoterSchema, pollEligibleVotersResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, publicOrgInvitationSchema, recordDsarRectificationSchema, recordOfflineVotesSchema, recurrenceTypeSchema, registerSchema, reorderBoardColumnsSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, revenueMetricsResponseSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, setDsarRestrictionSchema, signedMoneyStringSchema, strongPasswordSchema, timeSchema, unitKindSchema, unitSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardColumnSchema, updateBoardSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateDocumentSchema, updateDsarRequestSchema, updateEnterpriseRequestSchema, updateEventSchema, updateExpenseSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgBuildingContractSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePlatformFeatureRequestSchema, updatePlatformSubscriptionSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUnitSchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './chunk-L5XGG5GV.js';
export { addMoney, formatMoney, fromCents, normalizeMoney, subtractMoney, sumMoney, toCents } from './chunk-ZD7YLRHX.js';
export { optionalIbanSchema } from './chunk-7YKQN43X.js';
export { AI_CHAT_LIMITS } from './chunk-BYX5R6MR.js';
export { APPROVE_PERMISSIONS, ApprovalStatus, BUILDING_ROLE_RANK, BoardVisibility, BuildingOtpExpiry, BuildingRole, BuildingStatus, BuildingType, CO_OWNER_VISIBLE_SYSTEM_TYPES, CommonStatus, DSAR_CLOSED_STATUSES, DSAR_MAX_EXTENSION_DAYS, DSAR_RETENTION_YEARS, DSAR_SLA_DAYS, DevicePlatform, DsarRequestStatus, DsarRequestType, EnterpriseRequestStatus, EntityLinkType, FailureLocationType, FailureStatus, FailureType, FailureUnitType, FileCategory, Frequency, FundsSource, IdentityVerificationMethod, JoinRequestStatus, LinkableEntityType, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_ROLE_RANK, OrgQuotaResourceType, OrgRole, OrgStatus, OrgType, PLATFORM_FEATURES, PLATFORM_FEATURE_META, PLATFORM_ROLE_RANK, POLL_CANNOT_VOTE_REASON_KEY, Permission, PlatformFeature, PlatformRole, PollCannotVoteReason, PollStatus, PollType, PollVoteStatus, PricuvaRefMode, Priority, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, RESIDENT_VISIBLE_SYSTEM_TYPES, SCOPED_DOMAINS, SCOPED_PERMISSIONS, TransactionCategory, TransactionSource, TransactionType, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, VotingStrength, WASTE_SUBTYPE_NOTIFICATION_MAP, canAssignOrgRole, canAssignPlatformRole, canAssignRole, deriveVotingStrength, domainPermissions, methodToTier } from './chunk-3X6RUA7A.js';
export { BACKEND_ERROR_CODES, isBackendErrorCode } from './chunk-CKDX3O7O.js';
export { colors, radii, themes } from './chunk-D5D2CS5B.js';
import './chunk-4LSFAAZW.js';
export { createPaginatedResponse } from './chunk-K2CKX6IH.js';

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

export { ApartmentsTestIds, AppShellTestIds, BoardTestIds, BuildingEmailTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map