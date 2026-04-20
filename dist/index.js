export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminKeys, buildingKeys, documentKeys, eventKeys, failureReportKeys, fundsKeys, maintenanceLogKeys, noticeKeys, permissionKeys, pollKeys, queryKeys, recentKeys, userKeys } from './chunk-BKMSEUZD.js';
export { ApprovalStatusSchema, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureReportEventSchema, failureStatusOptions, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceStatusOptions, multipartArray, multipartBoolean, noticeEventSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './chunk-4SJASW7F.js';
import './chunk-4LSFAAZW.js';
export { API_ROUTES, API_VERSION } from './chunk-YJMNVOAW.js';
export { MANAGERIAL_BUILDING_ROLES, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatText, getContextUserId, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, priorityVariant } from './chunk-5HNVZNT6.js';
export { APPROVE_PERMISSIONS, ApartmentRole, ApprovalStatus, BUILDING_ROLE_RANK, BuildingRole, BuildingStatus, BuildingType, CommonStatus, DevicePlatform, FailureLocationType, FailureStatus, FailureType, FailureUnitType, FileCategory, Frequency, MaintenanceLogFinancedBy, MaintenanceStatus, MaintenanceType, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_ROLE_RANK, OrgRole, OrgStatus, OrgType, PLATFORM_ROLE_RANK, Permission, PlatformRole, PollStatus, PollType, Priority, Role, SCOPED_DOMAINS, SCOPED_PERMISSIONS, TransactionCategory, TransactionType, UNIMPLEMENTED_NOTIFICATION_TYPES, WASTE_SUBTYPE_NOTIFICATION_MAP, canAssignOrgRole, canAssignPlatformRole, canAssignRole, domainPermissions } from './chunk-P25WSM2I.js';
export { createPaginatedResponse } from './chunk-W3SU22LA.js';

// src/test-ids/apartments.ts
var ApartmentsTestIds = {
  screen: "apartments-screen",
  searchInput: "apartments-search-input"
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

// src/test-ids/polls.ts
var PollsTestIds = {
  screen: "polls-screen",
  searchInput: "polls-search-input",
  addButton: "polls-add-button"
};

// src/test-ids/settings.ts
var SettingsTestIds = {
  screen: "settings-screen",
  logoutButton: "settings-logout-button"
};

export { ApartmentsTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, PollsTestIds, SettingsTestIds };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map