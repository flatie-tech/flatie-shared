export { DATETIME_FORMATS, DATE_FORMATS, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, TIME_FORMATS, buildGoogleCalendarUrl, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatAddress, formatCurrency, formatCurrencyByLocale, formatDate as formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isManagerialRole, isValidHouseNumber, normalizeHouseNumber, normalizePaginatedResponse, parseApiError, parseData, parseHouseNumber, priorityVariant } from './chunk-VDB5P42I.js';
export { addressSchema, isUuid, oibSchema, optionalOibSchema, phoneSchema, toUuid, unsafeUuid, uuidStringSchema } from './chunk-2NQCGKVC.js';
export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, blogKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys } from './chunk-R7KIYQG5.js';
export { ARCHIVE_TYPES, ApprovalStatusSchema, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, RECURRENCE_TYPES, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createEmailThreadRequestSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, messagesListResponseSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgQuotaConfigSchema, orgQuotaEntrySchema, orgQuotaListSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, recurrenceTypeSchema, registerSchema, reorderFaqsSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, unreadCountResponseSchema, updateBuildingSchema, updateBusinessPartnerSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './chunk-HBUJS3HF.js';
export { ibanSchema, optionalIbanSchema } from './chunk-WK7VOCOE.js';
export { AI_CHAT_LIMITS } from './chunk-BYX5R6MR.js';
export { APPROVE_PERMISSIONS, ApartmentRole, ApprovalStatus, BUILDING_ROLE_RANK, BuildingOtpExpiry, BuildingRole, BuildingStatus, BuildingType, CommonStatus, DevicePlatform, FailureLocationType, FailureStatus, FailureType, FailureUnitType, FileCategory, Frequency, FundsSource, IdentityVerificationMethod, JoinRequestStatus, MaintenanceLogFinancedBy, MaintenanceStatus, MaintenanceType, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, ORG_ROLE_RANK, OrgQuotaResourceType, OrgRole, OrgStatus, OrgType, PLATFORM_ROLE_RANK, POLL_CANNOT_VOTE_REASON_KEY, Permission, PlatformRole, PollCannotVoteReason, PollStatus, PollType, PollVoteStatus, PricuvaRefMode, Priority, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, SCOPED_DOMAINS, SCOPED_PERMISSIONS, TransactionCategory, TransactionSource, TransactionType, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, WASTE_SUBTYPE_NOTIFICATION_MAP, canAssignOrgRole, canAssignPlatformRole, canAssignRole, domainPermissions, methodToTier } from './chunk-OXXILOAR.js';
export { BACKEND_ERROR_CODES, isBackendErrorCode } from './chunk-7MJOTQYT.js';
export { colors, radii, themes } from './chunk-JLMQ24CD.js';
import './chunk-4LSFAAZW.js';
export { createPaginatedResponse } from './chunk-E4FOXN63.js';
export { API_ROUTES, API_VERSION } from './chunk-SO2I3R5U.js';

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

export { ApartmentsTestIds, AppShellTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map