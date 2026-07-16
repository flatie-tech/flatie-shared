export { DATETIME_FORMATS, DATE_FORMATS, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, TIME_FORMATS, VOTING_METHOD_SETTINGS, applyResidentRestriction, applyResidentRestrictionToItem, buildGoogleCalendarUrl, calculatePaginationMeta, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatAddress, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDate as formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, getInitials, getMessageableUsers, getRoleBadge, isLastEnabledVotingMethod, isManagerialRole, isValidHouseNumber, normalizeHouseNumber, normalizePaginatedResponse, parseApiError, parseData, parseHouseNumber, priorityVariant, resolveVotingMethods, violatesVotingMethodLock } from './chunk-JMXOGZOM.js';
export { addressSchema, isUuid, oibSchema, optionalOibSchema, phoneSchema, toUuid, unsafeUuid, uuidStringSchema } from './chunk-2NQCGKVC.js';
export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, ENTITY_LINK_TYPE_META, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, blogKeys, boardKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, incomeKeys, isEntityLinkAllowed, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys } from './chunk-Y6I7WWPE.js';
export { ARCHIVE_TYPES, ApprovalStatusSchema, BOARD_CARD_LIMITS, BOARD_COLUMN_LIMITS, BOARD_LIMITS, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, ENTITY_LINK_TYPES, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, LINKABLE_ENTITY_TYPES, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, RECURRENCE_TYPES, REP_RECENT_ACTIVITY_TYPES, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, boardCardChecklistItemSchema, boardCardEventSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardColumnSchema, createBoardSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, messagesListResponseSchema, moveBoardCardSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgQuotaConfigSchema, orgQuotaEntrySchema, orgQuotaListSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, recurrenceTypeSchema, registerSchema, reorderBoardColumnsSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardColumnSchema, updateBoardSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './chunk-V2VTAKLM.js';
export { ibanSchema, optionalIbanSchema } from './chunk-WK7VOCOE.js';
export { AI_CHAT_LIMITS } from './chunk-BYX5R6MR.js';
export { APPROVE_PERMISSIONS, ApartmentRole, ApprovalStatus, BUILDING_ROLE_RANK, BoardVisibility, BuildingOtpExpiry, BuildingRole, BuildingStatus, BuildingType, CO_OWNER_VISIBLE_SYSTEM_TYPES, CommonStatus, DevicePlatform, EntityLinkType, FailureLocationType, FailureStatus, FailureType, FailureUnitType, FileCategory, Frequency, FundsSource, IdentityVerificationMethod, JoinRequestStatus, LinkableEntityType, MaintenanceLogFinancedBy, MaintenanceStatus, MaintenanceType, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, ORG_ROLE_RANK, OrgQuotaResourceType, OrgRole, OrgStatus, OrgType, PLATFORM_ROLE_RANK, POLL_CANNOT_VOTE_REASON_KEY, Permission, PlatformRole, PollCannotVoteReason, PollStatus, PollType, PollVoteStatus, PricuvaRefMode, Priority, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, SCOPED_DOMAINS, SCOPED_PERMISSIONS, TransactionCategory, TransactionSource, TransactionType, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, WASTE_SUBTYPE_NOTIFICATION_MAP, canAssignOrgRole, canAssignPlatformRole, canAssignRole, domainPermissions, methodToTier } from './chunk-2NSIS4GL.js';
export { BACKEND_ERROR_CODES, isBackendErrorCode } from './chunk-5MNLJ5SX.js';
export { colors, radii, themes } from './chunk-JLMQ24CD.js';
import './chunk-4LSFAAZW.js';
export { createPaginatedResponse } from './chunk-E4FOXN63.js';
export { API_ROUTES, API_VERSION } from './chunk-TGSAV5BJ.js';

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
  addButton: "documents-add-button"
};

// src/test-ids/failure-reports.ts
var FailureReportsTestIds = {
  screen: "failure-reports-screen",
  searchInput: "failure-reports-search-input",
  addButton: "failure-reports-add-button"
};

// src/test-ids/funds.ts
var FundsTestIds = {
  screen: "funds-screen"
};

// src/test-ids/maintenance-logs.ts
var MaintenanceLogsTestIds = {
  screen: "maintenance-logs-screen",
  searchInput: "maintenance-logs-search-input",
  addButton: "maintenance-logs-add-button"
};

// src/test-ids/notice-board.ts
var NoticeBoardTestIds = {
  screen: "notices-screen",
  searchInput: "notices-search-input",
  addButton: "notices-add-button"
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
  identityVerifiedVoteButton: "poll-identity-verified-vote-button"
};

// src/test-ids/settings.ts
var SettingsTestIds = {
  screen: "settings-screen",
  logoutButton: "settings-logout-button"
};

export { ApartmentsTestIds, AppShellTestIds, BoardTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map