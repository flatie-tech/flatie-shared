export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, adminKeys, apartmentKeys, blogKeys, buildingKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitSearchKeys, userKeys, widgetKeys } from './constants/index.js';
export { ApartmentRole, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, OrgStatus, OrgType, PollStatus, UNIMPLEMENTED_NOTIFICATION_TYPES, WASTE_SUBTYPE_NOTIFICATION_MAP } from './enums/index.js';
export { B as BuildingType, P as PollType } from './poll-type.enum-Cz_42Pj9.js';
export { A as APPROVE_PERMISSIONS, f as BUILDING_ROLE_RANK, B as BuildingRole, j as ORG_ROLE_RANK, O as OrgRole, k as PLATFORM_ROLE_RANK, P as Permission, a as PlatformRole, R as Role, c as SCOPED_DOMAINS, e as SCOPED_PERMISSIONS, b as ScopedAction, S as ScopedDomain, g as canAssignOrgRole, h as canAssignPlatformRole, i as canAssignRole, d as domainPermissions } from './role.enum-Cr_Ex5DH.js';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-D4pAcU1b.js';
export { BACKEND_ERROR_CODES, BackendErrorCode, isBackendErrorCode } from './errors/index.js';
export { AddOrgMemberSchema, Apartment, ApartmentUser, ApiError, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, AssignOrgBuildingSchema, AssignOrgMemberBuildingSchema, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BuildingEntitySchema, BuildingTypeOption, BuildingUserEntitySchema, CHAT_LIMITS, CommentResponse, CommonStatusSchema, CommonStatusSchemaType, ConversationType, CopyFaqsSchema, CopyTransactionCategoriesSchema, CreateBuildingSchema, CreateConversationSchema, CreateEventSchema, CreateFailureReportSchema, CreateFaqSchema, CreateMaintenanceLogSchema, CreateNoticeSchema, CreateOrganizationSchema, CreatePollSchema, CreateTransactionCategorySchema, CursorQuerySchema, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, EventColorOption, EventTypeOption, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureReportEventSchema, FailureReportResponse, FailureStatusSchema, FailureStatusSchemaType, FaqResponse, FinalizePollSchema, ForgotPasswordSchema, Garage, GarageRole, GarageUser, GetOrgBuildingsQuerySchema, GetOrgMembersQuerySchema, GetTransactionCategoriesQuerySchema, InviteOrgMemberSchema, JoinBuildingWithOtpSchema, LoginSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceFinancedByOption, MaintenanceLogEventSchema, MaintenanceLogResponse, MaintenanceStatusSchema, MaintenanceStatusSchemaType, NOTICE_LIMITS, NoticeEventSchema, NoticeResponse, NotificationPreferenceCategory, NotificationPreferenceItem, NotificationResponse, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PaginatedApartmentsResponse, PaginatedFailureReportsResponse, PaginatedMaintenanceLogsResponse, PaginatedNoticesResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollTypeOption, PrioritySchema, PrioritySchemaType, RegisterSchema, ReorderFaqsSchema, ResetPasswordSchema, SearchUsersQuerySchema, SendMessageSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, TimeSchema, UpdateBuildingSchema, UpdateConversationSchema, UpdateEventSchema, UpdateFailureReportSchema, UpdateFaqSchema, UpdateMaintenanceLogSchema, UpdateNoticeSchema, UpdateOrgMemberRoleSchema, UpdateOrganizationSchema, UpdatePasswordSchema, UpdatePollSchema, UpdateTransactionCategorySchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, VotePollSchema, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commentResponseSchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './schemas/index.js';
export { ColorToken, ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName, ThemeTokens, colors, radii, themes } from './tokens/index.js';
export { BaseEntity, Building, BuildingEntity, BuildingFund, BuildingMember, BuildingOTPResponse, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurringTemplate, Session, Transaction, UpdateEventRequest, UpdateFailureReportRequest, UpdateFundRequest, UpdateMaintenanceLogRequest, UpdateNoticeRequest, UpdateRecurringTemplateRequest, UpdateTransactionRequest, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.js';
export { B as BuildingContextFromOrg, d as BuildingContextFromRole, e as BuildingPermissionContext, D as DateRangeParams, P as PaginatedResponse, b as PaginationParams, a as PermissionContext, c as createPaginatedResponse } from './permission-context-DP8ApK8H.js';
export { API_ROUTES, API_VERSION } from './urls/index.js';
export { ActionFlags, MANAGERIAL_BUILDING_ROLES, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, StatusVariant, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatText, getContextUserId, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, priorityVariant } from './utils/index.js';
export { addressSchema, oibSchema, optionalOibSchema, phoneSchema } from './validation/index.js';
import 'zod';

declare const ApartmentsTestIds: {
    readonly screen: "apartments-screen";
    readonly searchInput: "apartments-search-input";
};

declare const LoginTestIds: {
    readonly emailInput: "login-email-input";
    readonly passwordInput: "login-password-input";
    readonly passwordToggle: "login-password-toggle";
    readonly googleButton: "login-google-button";
    readonly submitButton: "login-submit-button";
    readonly forgotPasswordLink: "login-forgot-password-link";
    readonly rememberMe: "login-remember-me-checkbox";
    readonly registerLink: "login-register-link";
};

declare const BuildingInfoTestIds: {
    readonly screen: "building-info-screen";
};

declare const BuildingOverviewTestIds: {
    readonly screen: "overview-screen";
    readonly buildingInfoBanner: "overview-building-info-banner";
    readonly noticesWidget: "overview-notices-widget";
    readonly noticesViewAll: "overview-notices-view-all";
    readonly pollsWidget: "overview-polls-widget";
    readonly pollsViewAll: "overview-polls-view-all";
    readonly recentItemsWidget: "overview-recent-items-widget";
    readonly recentItemsViewAll: "overview-recent-items-view-all";
};

declare const CalendarTestIds: {
    readonly screen: "calendar-screen";
    readonly searchInput: "calendar-search-input";
    readonly addButton: "calendar-add-button";
};

declare const DocumentsTestIds: {
    readonly screen: "documents-screen";
    readonly searchInput: "documents-search-input";
    readonly addButton: "documents-add-button";
};

declare const FailureReportsTestIds: {
    readonly screen: "failure-reports-screen";
    readonly searchInput: "failure-reports-search-input";
    readonly addButton: "failure-reports-add-button";
};

declare const FundsTestIds: {
    readonly screen: "funds-screen";
};

declare const MaintenanceLogsTestIds: {
    readonly screen: "maintenance-logs-screen";
    readonly searchInput: "maintenance-logs-search-input";
    readonly addButton: "maintenance-logs-add-button";
};

declare const NoticeBoardTestIds: {
    readonly screen: "notices-screen";
    readonly searchInput: "notices-search-input";
    readonly addButton: "notices-add-button";
};

declare const PollsTestIds: {
    readonly screen: "polls-screen";
    readonly searchInput: "polls-search-input";
    readonly addButton: "polls-add-button";
};

declare const SettingsTestIds: {
    readonly screen: "settings-screen";
    readonly logoutButton: "settings-logout-button";
};

export { ApartmentsTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, PollsTestIds, SettingsTestIds };
