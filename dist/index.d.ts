export { AddressDisplayProps, AddressSearchResult, AddressValue, MapUrlInput, StructuredAddressInput, addressSearchResultSchema, buildMapUrl, compareHouseNumbers, structuredAddressInputSchema } from './address/index.js';
export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, AI_CHAT_LIMITS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, ENTITY_LINK_TYPE_META, EntityLinkRule, EntityLinkTypeMeta, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, blogKeys, boardKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, incomeKeys, isEntityLinkAllowed, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys } from './constants/index.js';
export { A as ApartmentRole } from './apartment-role.enum-CNJsuYgq.js';
export { BoardVisibility, BuildingOtpExpiry, BuildingStatus, CO_OWNER_VISIBLE_SYSTEM_TYPES, DevicePlatform, FailureLocationType, FailureUnitType, FundsSource, IdentityVerificationMethod, JoinRequestStatus, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, OrgQuotaResourceType, OrgStatus, OrgType, POLL_CANNOT_VOTE_REASON_KEY, PollCannotVoteReason, PollStatus, PollVoteStatus, PricuvaRefMode, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, TransactionSource, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, WASTE_SUBTYPE_NOTIFICATION_MAP, methodToTier } from './enums/index.js';
export { B as BuildingType, P as PollType } from './poll-type.enum-CGV5tBqR.js';
export { E as EntityLinkType, L as LinkableEntityType } from './entity-link.enum-BYEzMg8A.js';
export { A as APPROVE_PERMISSIONS, B as BUILDING_ROLE_RANK, e as BuildingRole, O as ORG_ROLE_RANK, i as OrgRole, j as PLATFORM_ROLE_RANK, P as Permission, k as PlatformRole, S as SCOPED_DOMAINS, a as SCOPED_PERMISSIONS, b as ScopedAction, c as ScopedDomain, f as canAssignOrgRole, g as canAssignPlatformRole, h as canAssignRole, d as domainPermissions } from './role.enum-MLM2GI6q.js';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-BYlt7_Fs.js';
export { BACKEND_ERROR_CODES, BackendErrorCode, isBackendErrorCode } from './errors/index.js';
export { ARCHIVE_TYPES, AddOrgMemberSchema, AiChatMessagePayload, AiChatRequestPayload, AiUsageResponse, Apartment, ApartmentUser, ApiError, ApiErrorResponse, ApprovalStatusSchema, ApprovalStatusSchemaType, ApproveFailureReportSchema, ApproveNoticeSchema, ArchiveType, ArchivedItem, AssignOrgBuildingSchema, AssignOrgMemberBuildingSchema, AssignOwnerInput, BOARD_CARD_LIMITS, BOARD_COLUMN_LIMITS, BOARD_LIMITS, BUILDING_LIMITS, BUILDING_TYPES, BaseEntitySchema, BoardCardChecklistItemSchema, BoardCardEventSchema, BuildingDetailResponse, BuildingEntitySchema, BuildingFundsLedgerResponse, BuildingFundsLedgerRow, BuildingQuotaConfig, BuildingQuotaEntry, BuildingQuotaList, BuildingResponse, BuildingSettingsResponse, BuildingTypeOption, BuildingUserEntitySchema, BusinessPartnerResponse, CHAT_LIMITS, CamtImportResponse, CertiliaUserinfo, ChatMessageResponse, CommentResponse, CommonStatusSchema, CommonStatusSchemaType, ConversationLastMessage, ConversationParticipant, ConversationResponse, ConversationType, ConversationsListResponse, CopyFaqsSchema, CopyTransactionCategoriesSchema, CreateBoardCardSchema, CreateBoardColumnSchema, CreateBoardSchema, CreateBuildingSchema, CreateBusinessPartnerInput, CreateConversationSchema, CreateDocumentSchema, CreateEmailThreadRequestPayload, CreateEntityLinkRequest, CreateFailureReportSchema, CreateFaqSchema, CreateIncomeSchema, CreateNoticeSchema, CreateOrganizationSchema, CreateOwnerInput, CreateTransactionCategorySchema, CursorQuerySchema, DOCUMENT_LIMITS, DateRangeParamsSchema, DateRangeWithValidationSchema, DateTimeSchema, DeleteEntityLinkQuery, DeleteEntityLinkRequest, DocumentFile, DocumentLinkedRecord, DocumentResponse, ENTITY_LINK_TYPES, EmailDirection, EmailMessage, EmailThread, EmailThreadDetail, EntityLinkCountsResponse, EntityLinkEndpoint, EntityLinkMetadata, EntityLinkReference, EntityLinksResponse, EventResponse, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureReportEventSchema, FailureReportResponse, FailureStatusSchema, FailureStatusSchemaType, FaqResponse, ForgotPasswordSchema, Garage, GarageRole, GarageUser, GetEntityLinkCountsQuery, GetEntityLinksQuery, GetOrgBuildingsQuerySchema, GetOrgMembersQuerySchema, GetRepBuildingsParams, GetRepUsersParams, GetTransactionCategoriesQuerySchema, InviteOrgMemberSchema, JoinBuildingWithOtpSchema, LINKABLE_ENTITY_TYPES, ListArchivedResponse, LoginSchema, MaintenanceLogResponse, MaintenanceStatusSchema, MaintenanceStatusSchemaType, MessageResponse, MessagesListResponse, MoveBoardCardSchema, NOTICE_LIMITS, NoticeEventSchema, NoticeResponse, NotificationPreferenceCategory, NotificationPreferenceItem, NotificationResponse, ORGANIZATION_LIMITS, OwnerResponse, PaginatedApartmentsResponse, PaginatedBuildingsResponse, PaginatedDocumentsResponse, PaginatedEmailThreadsResponse, PaginatedEventsResponse, PaginatedFailureReportsResponse, PaginatedMaintenanceLogsResponse, PaginatedNoticesResponse, PaginatedPollsResponse, PaginatedRepBuildingsResponse, PaginatedRepUsersResponse, PaginatedResponseSchema, PaginationParamsSchema, PermissionFieldsSchema, PermissionsResponseSchema, PollResponse, PollResults, PollVotersResponse, PrioritySchema, PrioritySchemaType, REP_RECENT_ACTIVITY_TYPES, RegisterSchema, ReorderBoardColumnsSchema, ReorderFaqsSchema, RepBuildingActivity, RepBuildingItem, RepDashboardSummaryResponse, RepRecentActivity, RepRecentActivityType, RepUserBuilding, RepUserItem, ReplyEmailThreadRequestPayload, ResetPasswordSchema, SearchUsersQuerySchema, SendMessageSchema, StorageUnit, StorageUnitRole, StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, UnreadCountResponse, UpdateBoardCardSchema, UpdateBoardColumnSchema, UpdateBoardSchema, UpdateBuildingSchema, UpdateBuildingSettingsSchema, UpdateBusinessPartnerInput, UpdateConversationSchema, UpdateDocumentSchema, UpdateFailureReportRequestPayload, UpdateFailureReportSchema, UpdateFaqSchema, UpdateIncomeSchema, UpdateMaintenanceLogRequestPayload, UpdateNoticeRequestPayload, UpdateNoticeSchema, UpdateOrgMemberRoleSchema, UpdateOrganizationSchema, UpdateOwnerInput, UpdatePasswordSchema, UpdatePollRequestPayload, UpdateTransactionCategorySchema, UpdateUserBuildingRoleSchema, UserEntitySchema, UuidSchema, VerifyOtpSchema, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, boardCardChecklistItemSchema, boardCardEventSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardColumnSchema, createBoardSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createDocumentSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventResponseSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, messagesListResponseSchema, moveBoardCardSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollVotersResponseSchema, priorityOptions, registerSchema, reorderBoardColumnsSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardColumnSchema, updateBoardSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateDocumentSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateMaintenanceLogRequestSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema } from './schemas/index.js';
export { C as CreateEventSchema, i as CreateMaintenanceLogSchema, s as CreatePollSchema, b as EVENT_COLORS, e as EVENT_TYPES, d as EVENT_TYPE_COLOR_MAP, E as EventColorOption, a as EventTypeOption, F as FinalizePollSchema, m as MAINTENANCE_FINANCED_BY, n as MAINTENANCE_LOG_LIMITS, M as MaintenanceFinancedByOption, j as MaintenanceLogEventSchema, y as POLL_LIMITS, z as POLL_TYPES, P as PollTypeOption, h as RECURRENCE_TYPES, R as RecurrenceTypeOption, T as TimeSchema, U as UpdateEventSchema, k as UpdateMaintenanceLogSchema, v as UpdatePollSchema, V as VotePollSchema, c as createEventSchema, l as createMaintenanceLogSchema, w as createPollSchema, f as eventColorSchema, g as eventTypeSchema, x as finalizePollSchema, o as maintenanceFinancedBySchema, p as maintenanceLogEventSchema, A as pollTypeSchema, r as recurrenceTypeSchema, t as timeSchema, u as updateEventSchema, q as updateMaintenanceLogSchema, B as updatePollSchema, D as votePollSchema } from './poll.schema-zs1Cgibd.js';
export { ColorToken, ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName, ThemeTokens, colors, radii, themes } from './tokens/index.js';
export { BaseEntity, Building, BuildingContextFromOrg, BuildingContextFromPlatformAdmin, BuildingContextFromRole, BuildingEntity, BuildingFund, BuildingMember, BuildingMembership, BuildingOTPResponse, BuildingPermissionContext, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateTransactionRequest, Event, EventColor, EventType, FailureReport, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, Notice, PermissionContext, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, RecurrenceType, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.js';
export { C as CursorPaginatedResponse, D as DateRangeParams, P as PaginatedResponse, a as PaginationParams, c as createPaginatedResponse } from './pagination.types-BdLhL-Jg.js';
export { API_ROUTES, API_VERSION } from './urls/index.js';
export { ActionFlags, DATETIME_FORMATS, DATE_FORMATS, DisplayableRole, GoogleCalendarEventInput, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, MessageableUserShape, ParseError, ParsedApiError, PermissionChecker, PermissionSubject, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, RestrictableActionFlags, RoleBadgeColor, StatusVariant, TIME_FORMATS, VOTING_METHOD_SETTINGS, VotingMethodSetting, VotingMethodState, applyResidentRestriction, applyResidentRestrictionToItem, buildGoogleCalendarUrl, calculatePaginationMeta, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, getInitials, getMessageableUsers, getRoleBadge, isLastEnabledVotingMethod, isManagerialRole, normalizePaginatedResponse, parseApiError, parseData, priorityVariant, resolveVotingMethods, violatesVotingMethodLock } from './utils/index.js';
export { UuidString, addressSchema, ibanSchema, isUuid, oibSchema, optionalIbanSchema, optionalOibSchema, phoneSchema, toUuid, unsafeUuid, uuidStringSchema } from './validation/index.js';
export { A as AddressParts, P as ParsedHouseNumber, f as formatAddress, i as isValidHouseNumber, n as normalizeHouseNumber, p as parseHouseNumber } from './house-number-Di2u5fvq.js';
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

declare const BoardTestIds: {
    readonly screen: "board-screen";
    readonly searchInput: "board-search-input";
    readonly addCardButton: "board-add-card-button";
    readonly addColumnButton: "board-add-column-button";
    readonly boardSwitcher: "board-switcher";
    readonly column: "board-column";
    readonly card: "board-card";
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
    /** Suffix with the document id at call sites: `${card}-${id}`. */
    readonly card: "document-card";
    readonly viewModal: "document-view-modal";
    readonly createModal: "document-create-modal";
    readonly editButton: "document-edit-button";
    readonly deleteButton: "document-delete-button";
    readonly deleteConfirm: "document-delete-confirm";
    /** Per child-file download/open control. */
    readonly downloadButton: "document-download-button";
    readonly privateToggle: "document-private-toggle";
    readonly typeFilter: "documents-type-filter";
    readonly viewToggle: "documents-view-toggle";
};

declare const FailureReportsTestIds: {
    readonly screen: "failure-reports-screen";
    readonly searchInput: "failure-reports-search-input";
    readonly addButton: "failure-reports-add-button";
    readonly card: "failure-report-card";
    readonly viewModal: "failure-report-view-modal";
    readonly createModal: "failure-report-create-modal";
    readonly editButton: "failure-report-edit-button";
    readonly deleteButton: "failure-report-delete-button";
    readonly deleteConfirm: "failure-report-delete-confirm";
    readonly statusFilter: "failure-reports-status-filter";
    readonly viewToggle: "failure-reports-view-toggle";
    /** Suffix with the report id at call sites: `${approveButton}-${id}`.
     * Values match the literals mobile already uses in FailureReportCard. */
    readonly approveButton: "approve-failure-report";
    readonly declineButton: "decline-failure-report";
};

declare const FundsTestIds: {
    readonly screen: "funds-screen";
};

declare const MaintenanceLogsTestIds: {
    readonly screen: "maintenance-logs-screen";
    readonly searchInput: "maintenance-logs-search-input";
    readonly addButton: "maintenance-logs-add-button";
    readonly card: "maintenance-log-card";
    readonly viewModal: "maintenance-log-view-modal";
    readonly createModal: "maintenance-log-create-modal";
    readonly editButton: "maintenance-log-edit-button";
    readonly deleteButton: "maintenance-log-delete-button";
    readonly deleteConfirm: "maintenance-log-delete-confirm";
    /** Financed-by filter chip group (building_funds / insurance / co_owner). */
    readonly financedByFilter: "maintenance-logs-financed-by-filter";
    /** Card/table view toggle on the management board. */
    readonly viewToggle: "maintenance-logs-view-toggle";
};

declare const NoticeBoardTestIds: {
    readonly screen: "notices-screen";
    readonly searchInput: "notices-search-input";
    readonly addButton: "notices-add-button";
    readonly card: "notice-card";
    readonly viewModal: "notice-view-modal";
    readonly createModal: "notice-create-modal";
    readonly editButton: "notice-edit-button";
    readonly deleteButton: "notice-delete-button";
    readonly deleteConfirm: "notice-delete-confirm";
    readonly pinButton: "notice-pin-button";
    readonly pendingToggle: "notices-pending-toggle";
    /** Suffix with the notice id at call sites: `${approveButton}-${id}` */
    readonly approveButton: "approve-notice";
    readonly declineButton: "decline-notice";
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
    /** Suffix list-item ids with the poll id at call sites: `${card}-${id}`. */
    readonly card: "poll-card";
    readonly viewModal: "poll-view-modal";
    readonly createModal: "poll-create-modal";
    readonly editButton: "poll-edit-button";
    readonly deleteButton: "poll-delete-button";
    readonly deleteConfirm: "poll-delete-confirm";
    readonly voteButton: "poll-vote-button";
    /** Opens the voters roster (POLL_FINALIZE-gated). */
    readonly votersButton: "poll-voters-button";
    readonly statusFilter: "polls-status-filter";
    /** Card/table view toggle on the management board (web). */
    readonly viewToggle: "polls-view-toggle";
};

declare const SettingsTestIds: {
    readonly screen: "settings-screen";
    readonly logoutButton: "settings-logout-button";
};

export { ApartmentsTestIds, AppShellTestIds, BoardTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, MaintenanceLogsTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
