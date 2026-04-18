export { adminKeys, buildingKeys, documentKeys, eventKeys, failureReportKeys, fundsKeys, maintenanceLogKeys, noticeKeys, permissionKeys, pollKeys, queryKeys, recentKeys, userKeys } from './constants/index.js';
export { ApprovalStatus, BUILDING_ROLE_RANK, BuildingRole, BuildingType, CommonStatus, FailureStatus, FailureType, FileCategory, Frequency, MaintenanceStatus, MaintenanceType, ORG_ROLE_RANK, OrgRole, PLATFORM_ROLE_RANK, PlatformRole, PollType, Priority, Role, TransactionCategory, TransactionType, canAssignOrgRole, canAssignPlatformRole, canAssignRole } from './enums/index.js';
export { P as Permission, S as SCOPED_DOMAINS, a as ScopedAction, b as ScopedDomain, d as domainPermissions } from './permission.enum-CIZ7gCeI.js';
export { Apartment, ApartmentRole, ApartmentUser, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BuildingEntitySchema, BuildingTypeOption, BuildingUserEntitySchema, CommonStatusSchema, CommonStatusSchemaType, CreateBuildingSchema, CreateEventSchema, CreateFailureReportSchema, CreateMaintenanceLogSchema, CreateNoticeSchema, CreatePollSchema, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, EventColorOption, EventTypeOption, FailureStatusSchema, FailureStatusSchemaType, FinalizePollSchema, ForgotPasswordSchema, Garage, GarageRole, GarageUser, JoinBuildingWithOtpSchema, LoginSchema, MAINTENANCE_FINANCED_BY, MaintenanceFinancedByOption, MaintenanceStatusSchema, MaintenanceStatusSchemaType, NOTICE_LIMITS, NoticeEventSchema, POLL_LIMITS, POLL_TYPES, PaginatedApartmentsResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollTypeOption, PrioritySchema, PrioritySchemaType, RegisterSchema, ResetPasswordSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TimeSchema, UpdateBuildingSchema, UpdateEventSchema, UpdateFailureReportSchema, UpdateMaintenanceLogSchema, UpdateNoticeSchema, UpdatePasswordSchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, VotePollSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commonStatusOptions, createBuildingSchema, createEventSchema, createFailureReportSchema, createMaintenanceLogSchema, createNoticeSchema, createPollSchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureStatusOptions, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceStatusOptions, noticeEventSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, resetPasswordSchema, roleTypeSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateEventSchema, updateFailureReportSchema, updateMaintenanceLogSchema, updateNoticeSchema, updatePasswordSchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './schemas/index.js';
export { BaseEntity, Building, BuildingEntity, BuildingFund, BuildingMember, BuildingOTPResponse, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurringTemplate, Session, Transaction, UpdateEventRequest, UpdateFailureReportRequest, UpdateFundRequest, UpdateMaintenanceLogRequest, UpdateNoticeRequest, UpdateRecurringTemplateRequest, UpdateTransactionRequest, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.js';
export { D as DateRangeParams, P as PaginatedResponse, a as PaginationParams, c as createPaginatedResponse } from './pagination.types-CKR9lS7u.js';
export { API_ROUTES, API_VERSION } from './urls/index.js';
export { calculatePaginationMeta, debounce, extractPaginatedItems, formatCurrency, formatText, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, normalizePaginatedResponse } from './utils/index.js';
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
