export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, adminKeys, apartmentKeys, blogKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys } from './constants/index.cjs';
export { ApartmentRole, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, FundsSource, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, OrgQuotaResourceType, OrgStatus, OrgType, PollStatus, PricuvaRefMode, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, TransactionSource, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, WASTE_SUBTYPE_NOTIFICATION_MAP } from './enums/index.cjs';
export { B as BuildingType, P as PollType } from './poll-type.enum-Cz_42Pj9.cjs';
export { A as APPROVE_PERMISSIONS, f as BUILDING_ROLE_RANK, B as BuildingRole, j as ORG_ROLE_RANK, O as OrgRole, k as PLATFORM_ROLE_RANK, P as Permission, a as PlatformRole, c as SCOPED_DOMAINS, e as SCOPED_PERMISSIONS, b as ScopedAction, S as ScopedDomain, g as canAssignOrgRole, h as canAssignPlatformRole, i as canAssignRole, d as domainPermissions } from './role.enum-B_7lBNq-.cjs';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-D4pAcU1b.cjs';
export { BACKEND_ERROR_CODES, BackendErrorCode, isBackendErrorCode } from './errors/index.cjs';
export { ARCHIVE_TYPES, AddOrgMemberSchema, Apartment, ApartmentUser, ApiError, ApiErrorResponse, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, ArchiveType, ArchivedItem, AssignOrgBuildingSchema, AssignOrgMemberBuildingSchema, AssignOwnerInput, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BuildingDetailResponse, BuildingEntitySchema, BuildingFundsLedgerResponse, BuildingFundsLedgerRow, BuildingQuotaConfig, BuildingQuotaEntry, BuildingQuotaList, BuildingResponse, BuildingTypeOption, BuildingUserEntitySchema, BusinessPartnerResponse, CHAT_LIMITS, CamtImportResponse, CommentResponse, CommonStatusSchema, CommonStatusSchemaType, ConversationType, CopyFaqsSchema, CopyTransactionCategoriesSchema, CreateBuildingSchema, CreateBusinessPartnerInput, CreateConversationSchema, CreateEmailThreadRequestPayload, CreateEventSchema, CreateFailureReportSchema, CreateFaqSchema, CreateMaintenanceLogSchema, CreateNoticeSchema, CreateOrganizationSchema, CreateOwnerInput, CreatePollSchema, CreateTransactionCategorySchema, CursorQuerySchema, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, EmailDirection, EmailMessage, EmailThread, EmailThreadDetail, EventColorOption, EventResponse, EventTypeOption, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureReportEventSchema, FailureReportResponse, FailureStatusSchema, FailureStatusSchemaType, FaqResponse, FinalizePollSchema, ForgotPasswordSchema, Garage, GarageRole, GarageUser, GetOrgBuildingsQuerySchema, GetOrgMembersQuerySchema, GetTransactionCategoriesQuerySchema, InviteOrgMemberSchema, JoinBuildingWithOtpSchema, ListArchivedResponse, LoginSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceFinancedByOption, MaintenanceLogEventSchema, MaintenanceLogResponse, MaintenanceStatusSchema, MaintenanceStatusSchemaType, MessageResponse, NOTICE_LIMITS, NoticeEventSchema, NoticeResponse, NotificationPreferenceCategory, NotificationPreferenceItem, NotificationResponse, ORGANIZATION_LIMITS, OrgQuotaConfig, OrgQuotaEntry, OrgQuotaList, OwnerResponse, POLL_LIMITS, POLL_TYPES, PaginatedApartmentsResponse, PaginatedBuildingsResponse, PaginatedEmailThreadsResponse, PaginatedEventsResponse, PaginatedFailureReportsResponse, PaginatedMaintenanceLogsResponse, PaginatedNoticesResponse, PaginatedPollsResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollResponse, PollResults, PollTypeOption, PollVotersResponse, PrioritySchema, PrioritySchemaType, RegisterSchema, ReorderFaqsSchema, ReplyEmailThreadRequestPayload, ResetPasswordSchema, SearchUsersQuerySchema, SendMessageSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, TimeSchema, UpdateBuildingSchema, UpdateBusinessPartnerInput, UpdateConversationSchema, UpdateEventSchema, UpdateFailureReportRequestPayload, UpdateFailureReportSchema, UpdateFaqSchema, UpdateMaintenanceLogRequestPayload, UpdateMaintenanceLogSchema, UpdateNoticeRequestPayload, UpdateNoticeSchema, UpdateOrgMemberRoleSchema, UpdateOrganizationSchema, UpdateOwnerInput, UpdatePasswordSchema, UpdatePollRequestPayload, UpdatePollSchema, UpdateTransactionCategorySchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, VotePollSchema, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, commentResponseSchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createEmailThreadRequestSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgQuotaConfigSchema, orgQuotaEntrySchema, orgQuotaListSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, registerSchema, reorderFaqsSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateBusinessPartnerSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './schemas/index.cjs';
export { ColorToken, ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName, ThemeTokens, colors, radii, themes } from './tokens/index.cjs';
export { BaseEntity, Building, BuildingEntity, BuildingFund, BuildingMember, BuildingOTPResponse, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurringTemplate, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.cjs';
export { B as BuildingContextFromOrg, d as BuildingContextFromRole, e as BuildingPermissionContext, D as DateRangeParams, P as PaginatedResponse, b as PaginationParams, a as PermissionContext, c as createPaginatedResponse } from './permission-context-DiFftP1O.cjs';
export { API_ROUTES, API_VERSION } from './urls/index.cjs';
export { ActionFlags, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ParsedApiError, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, StatusVariant, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatCurrencyByLocale, formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, parseApiError, parseData, priorityVariant } from './utils/index.cjs';
export { UuidString, addressSchema, ibanSchema, isUuid, oibSchema, optionalIbanSchema, optionalOibSchema, phoneSchema, toUuid, unsafeUuid, uuidStringSchema } from './validation/index.cjs';
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
