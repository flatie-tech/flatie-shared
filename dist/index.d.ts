export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminKeys, buildingKeys, documentKeys, eventKeys, failureReportKeys, fundsKeys, maintenanceLogKeys, noticeKeys, permissionKeys, pollKeys, queryKeys, recentKeys, userKeys } from './constants/index.js';
export { ApartmentRole, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, OrgStatus, OrgType, PollStatus, UNIMPLEMENTED_NOTIFICATION_TYPES, WASTE_SUBTYPE_NOTIFICATION_MAP } from './enums/index.js';
export { B as BuildingType, P as PollType } from './poll-type.enum-Cz_42Pj9.js';
export { A as APPROVE_PERMISSIONS, f as BUILDING_ROLE_RANK, B as BuildingRole, j as ORG_ROLE_RANK, O as OrgRole, k as PLATFORM_ROLE_RANK, P as Permission, a as PlatformRole, R as Role, c as SCOPED_DOMAINS, e as SCOPED_PERMISSIONS, b as ScopedAction, S as ScopedDomain, g as canAssignOrgRole, h as canAssignPlatformRole, i as canAssignRole, d as domainPermissions } from './role.enum-Cr_Ex5DH.js';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-D4pAcU1b.js';
export { Apartment, ApartmentUser, ApiError, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BuildingEntitySchema, BuildingTypeOption, BuildingUserEntitySchema, CHAT_LIMITS, CommonStatusSchema, CommonStatusSchemaType, ConversationType, CreateBuildingSchema, CreateConversationSchema, CreateEventSchema, CreateFailureReportSchema, CreateFaqSchema, CreateMaintenanceLogSchema, CreateNoticeSchema, CreateOrganizationSchema, CreatePollSchema, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, EventColorOption, EventTypeOption, FAQ_LIMITS, FailureStatusSchema, FailureStatusSchemaType, FinalizePollSchema, ForgotPasswordSchema, Garage, GarageRole, GarageUser, JoinBuildingWithOtpSchema, LoginSchema, MAINTENANCE_FINANCED_BY, MaintenanceFinancedByOption, MaintenanceStatusSchema, MaintenanceStatusSchemaType, NOTICE_LIMITS, NoticeEventSchema, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PaginatedApartmentsResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollTypeOption, PrioritySchema, PrioritySchemaType, RegisterSchema, ResetPasswordSchema, SendMessageSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TimeSchema, UpdateBuildingSchema, UpdateConversationSchema, UpdateEventSchema, UpdateFailureReportSchema, UpdateFaqSchema, UpdateMaintenanceLogSchema, UpdateNoticeSchema, UpdateOrganizationSchema, UpdatePasswordSchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, VotePollSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commonStatusOptions, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureStatusOptions, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceStatusOptions, noticeEventSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, resetPasswordSchema, roleTypeSchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogSchema, updateNoticeSchema, updateOrganizationSchema, updatePasswordSchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './schemas/index.js';
export { BaseEntity, Building, BuildingEntity, BuildingFund, BuildingMember, BuildingOTPResponse, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurringTemplate, Session, Transaction, UpdateEventRequest, UpdateFailureReportRequest, UpdateFundRequest, UpdateMaintenanceLogRequest, UpdateNoticeRequest, UpdateRecurringTemplateRequest, UpdateTransactionRequest, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.js';
export { B as BuildingContextFromOrg, d as BuildingContextFromRole, e as BuildingPermissionContext, D as DateRangeParams, P as PaginatedResponse, b as PaginationParams, a as PermissionContext, c as createPaginatedResponse } from './permission-context-DP8ApK8H.js';
export { API_ROUTES, API_VERSION } from './urls/index.js';
export { ActionFlags, MANAGERIAL_BUILDING_ROLES, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, StatusVariant, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatText, getContextUserId, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, priorityVariant } from './utils/index.js';
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
