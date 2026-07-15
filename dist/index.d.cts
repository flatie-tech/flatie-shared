export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, AI_CHAT_LIMITS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, EntityLinkRule, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, blogKeys, boardKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, incomeKeys, isEntityLinkAllowed, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys } from './constants/index.cjs';
export { A as ApartmentRole } from './apartment-role.enum-CNJsuYgq.cjs';
export { BoardCardStatus, BoardVisibility, BuildingOtpExpiry, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, FundsSource, IdentityVerificationMethod, JoinRequestStatus, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, OrgQuotaResourceType, OrgStatus, OrgType, POLL_CANNOT_VOTE_REASON_KEY, PollCannotVoteReason, PollStatus, PollVoteStatus, PricuvaRefMode, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, TransactionSource, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, WASTE_SUBTYPE_NOTIFICATION_MAP, methodToTier } from './enums/index.cjs';
export { B as BuildingType, P as PollType } from './poll-type.enum-CGV5tBqR.cjs';
export { E as EntityLinkType, L as LinkableEntityType } from './entity-link.enum-BYEzMg8A.cjs';
export { A as APPROVE_PERMISSIONS, B as BUILDING_ROLE_RANK, e as BuildingRole, O as ORG_ROLE_RANK, i as OrgRole, j as PLATFORM_ROLE_RANK, P as Permission, k as PlatformRole, S as SCOPED_DOMAINS, a as SCOPED_PERMISSIONS, b as ScopedAction, c as ScopedDomain, f as canAssignOrgRole, g as canAssignPlatformRole, h as canAssignRole, d as domainPermissions } from './role.enum-MLM2GI6q.cjs';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-BYlt7_Fs.cjs';
export { BACKEND_ERROR_CODES, BackendErrorCode, isBackendErrorCode } from './errors/index.cjs';
export { ARCHIVE_TYPES, AddOrgMemberSchema, AiChatMessagePayload, AiChatRequestPayload, AiUsageResponse, Apartment, ApartmentUser, ApiError, ApiErrorResponse, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, ArchiveType, ArchivedItem, AssignOrgBuildingSchema, AssignOrgMemberBuildingSchema, AssignOwnerInput, BOARD_CARD_LIMITS, BOARD_LIMITS, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BoardCardChecklistItemSchema, BuildingDetailResponse, BuildingEntitySchema, BuildingFundsLedgerResponse, BuildingFundsLedgerRow, BuildingQuotaConfig, BuildingQuotaEntry, BuildingQuotaList, BuildingResponse, BuildingSettingsResponse, BuildingTypeOption, BuildingUserEntitySchema, BusinessPartnerResponse, CHAT_LIMITS, CamtImportResponse, CertiliaUserinfo, ChatMessageResponse, CommentResponse, CommonStatusSchema, CommonStatusSchemaType, ConversationLastMessage, ConversationParticipant, ConversationResponse, ConversationType, ConversationsListResponse, CopyFaqsSchema, CopyTransactionCategoriesSchema, CreateBoardCardSchema, CreateBoardSchema, CreateBuildingSchema, CreateBusinessPartnerInput, CreateConversationSchema, CreateEmailThreadRequestPayload, CreateEntityLinkRequest, CreateEventSchema, CreateFailureReportSchema, CreateFaqSchema, CreateIncomeSchema, CreateMaintenanceLogSchema, CreateNoticeSchema, CreateOrganizationSchema, CreateOwnerInput, CreatePollSchema, CreateTransactionCategorySchema, CursorQuerySchema, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, DeleteEntityLinkQuery, DeleteEntityLinkRequest, DocumentFile, DocumentLinkedRecord, DocumentResponse, ENTITY_LINK_TYPES, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, EmailDirection, EmailMessage, EmailThread, EmailThreadDetail, EntityLinkCountsResponse, EntityLinkEndpoint, EntityLinkMetadata, EntityLinkReference, EntityLinksResponse, EventColorOption, EventResponse, EventTypeOption, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureReportEventSchema, FailureReportResponse, FailureStatusSchema, FailureStatusSchemaType, FaqResponse, FinalizePollSchema, ForgotPasswordSchema, Garage, GarageRole, GarageUser, GetEntityLinkCountsQuery, GetEntityLinksQuery, GetOrgBuildingsQuerySchema, GetOrgMembersQuerySchema, GetRepBuildingsParams, GetRepUsersParams, GetTransactionCategoriesQuerySchema, InviteOrgMemberSchema, JoinBuildingWithOtpSchema, LINKABLE_ENTITY_TYPES, ListArchivedResponse, LoginSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceFinancedByOption, MaintenanceLogEventSchema, MaintenanceLogResponse, MaintenanceStatusSchema, MaintenanceStatusSchemaType, MessageResponse, MessagesListResponse, MoveBoardCardSchema, NOTICE_LIMITS, NoticeEventSchema, NoticeResponse, NotificationPreferenceCategory, NotificationPreferenceItem, NotificationResponse, ORGANIZATION_LIMITS, OrgQuotaConfig, OrgQuotaEntry, OrgQuotaList, OwnerResponse, POLL_LIMITS, POLL_TYPES, PaginatedApartmentsResponse, PaginatedBuildingsResponse, PaginatedDocumentsResponse, PaginatedEmailThreadsResponse, PaginatedEventsResponse, PaginatedFailureReportsResponse, PaginatedMaintenanceLogsResponse, PaginatedNoticesResponse, PaginatedPollsResponse, PaginatedRepBuildingsResponse, PaginatedRepUsersResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollResponse, PollResults, PollTypeOption, PollVotersResponse, PrioritySchema, PrioritySchemaType, RECURRENCE_TYPES, REP_RECENT_ACTIVITY_TYPES, RecurrenceTypeOption, RegisterSchema, ReorderFaqsSchema, RepBuildingActivity, RepBuildingItem, RepDashboardSummaryResponse, RepRecentActivity, RepRecentActivityType, RepUserBuilding, RepUserItem, ReplyEmailThreadRequestPayload, ResetPasswordSchema, SearchUsersQuerySchema, SendMessageSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, TimeSchema, UnreadCountResponse, UpdateBoardCardSchema, UpdateBoardSchema, UpdateBuildingSchema, UpdateBuildingSettingsSchema, UpdateBusinessPartnerInput, UpdateConversationSchema, UpdateEventSchema, UpdateFailureReportRequestPayload, UpdateFailureReportSchema, UpdateFaqSchema, UpdateIncomeSchema, UpdateMaintenanceLogRequestPayload, UpdateMaintenanceLogSchema, UpdateNoticeRequestPayload, UpdateNoticeSchema, UpdateOrgMemberRoleSchema, UpdateOrganizationSchema, UpdateOwnerInput, UpdatePasswordSchema, UpdatePollRequestPayload, UpdatePollSchema, UpdateTransactionCategorySchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, VotePollSchema, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, boardCardChecklistItemSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, messagesListResponseSchema, moveBoardCardSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgQuotaConfigSchema, orgQuotaEntrySchema, orgQuotaListSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, recurrenceTypeSchema, registerSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema } from './schemas/index.cjs';
export { ColorToken, ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName, ThemeTokens, colors, radii, themes } from './tokens/index.cjs';
export { BaseEntity, Building, BuildingContextFromOrg, BuildingContextFromRole, BuildingEntity, BuildingFund, BuildingMember, BuildingMembership, BuildingOTPResponse, BuildingPermissionContext, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionContext, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurrenceType, RecurringTemplate, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.cjs';
export { C as CursorPaginatedResponse, D as DateRangeParams, P as PaginatedResponse, a as PaginationParams, c as createPaginatedResponse } from './pagination.types-BdLhL-Jg.cjs';
export { API_ROUTES, API_VERSION } from './urls/index.cjs';
export { ActionFlags, AddressParts, DATETIME_FORMATS, DATE_FORMATS, DisplayableRole, GoogleCalendarEventInput, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, MessageableUserShape, ParseError, ParsedApiError, ParsedHouseNumber, PermissionChecker, PermissionSubject, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, RoleBadgeColor, StatusVariant, TIME_FORMATS, VOTING_METHOD_SETTINGS, VotingMethodSetting, VotingMethodState, buildGoogleCalendarUrl, calculatePaginationMeta, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatAddress, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, getInitials, getMessageableUsers, getRoleBadge, hasAllPermissions, hasAnyPermission, hasPermission, isLastEnabledVotingMethod, isManagerialRole, isValidHouseNumber, normalizeHouseNumber, normalizePaginatedResponse, parseApiError, parseData, parseHouseNumber, priorityVariant, resolveVotingMethods, violatesVotingMethodLock } from './utils/index.cjs';
export { UuidString, addressSchema, ibanSchema, isUuid, oibSchema, optionalIbanSchema, optionalOibSchema, phoneSchema, toUuid, unsafeUuid, uuidStringSchema } from './validation/index.cjs';
import 'zod';

declare const ApartmentsTestIds: {
    readonly screen: "apartments-screen";
    readonly searchInput: "apartments-search-input";
};

declare const AppShellTestIds: {
    readonly accountDropdown: "account-dropdown";
    readonly signOutButton: "sign-out-button";
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

declare const OnboardingTestIds: {
    readonly tabFind: "onboarding-tab-find";
    readonly tabJoin: "onboarding-tab-join";
    readonly tabCreate: "onboarding-tab-create";
};

declare const PollsTestIds: {
    readonly screen: "polls-screen";
    readonly searchInput: "polls-search-input";
    readonly addButton: "polls-add-button";
    readonly identityVerifiedVoteButton: "poll-identity-verified-vote-button";
};

declare const SettingsTestIds: {
    readonly screen: "settings-screen";
    readonly logoutButton: "settings-logout-button";
};

export { ApartmentsTestIds, AppShellTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
