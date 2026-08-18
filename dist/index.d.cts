export { AddressDisplayProps, AddressSearchResult, AddressValue, MapUrlInput, addressSearchResultSchema, buildMapUrl, compareHouseNumbers, existingBuildingRefSchema, structuredAddressInputSchema } from './address/index.cjs';
export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, AI_CHAT_LIMITS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, ALWAYS_ON_NOTIFICATION_TYPES, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, ENTITY_LINK_TYPE_META, EntityLinkRule, EntityLinkTypeMeta, LeadTime, MANAGERIAL_NOTIFICATION_TYPES, MAX_PAGINATION_LIMIT, NOTIFICATION_TOPICS, NotificationTopic, ORG_ROLE_PERMISSIONS, ORG_SCOPED_NOTIFICATION_TYPES, OWNERSHIP_DERIVED_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, PreferenceWrite, RELATED_TO_LINKABLE_TYPES, SELECTABLE_CHANNELS, STANDARD_UNIT_PRICE_CENTS, SelectableChannel, TopicState, ZUOZ_ADJACENT_CONSENT_CATEGORIES, ZuozAdjacentConsentCategory, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, auditLogKeys, blogKeys, boardKeys, buildLeadTimeWrites, buildTopicStates, buildTopicWrites, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, dsarKeys, dunningKeys, enterpriseRequestKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, featureFlagKeys, fundsKeys, garageKeys, getLeadTime, getNotificationTopic, getUngroupedNotificationTypes, incomeKeys, interestRateKeys, isEntityLinkAllowed, isZuozAdjacentConsentCategory, layoutKeys, managementInvoiceKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, platformFeatureKeys, platformSubscriptionKeys, pollKeys, pricuvaKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, toggleChannel, transactionCategoryKeys, unitSearchKeys, userKeys, widgetKeys } from './constants/index.cjs';
export { BoardVisibility, BuildingOtpExpiry, BuildingStatus, DSAR_CLOSED_STATUSES, DSAR_MAX_EXTENSION_DAYS, DSAR_RETENTION_YEARS, DSAR_SLA_DAYS, DUNNING_CLOSED_STATUSES, DsarRequestStatus, DsarRequestType, DunningCaseStatus, DunningLevel, EnterpriseRequestStatus, FailureFundingSource, FailureLocationType, FailureUnitType, FeeModel, FundsSource, IdentityVerificationMethod, JoinRequestStatus, ManagementInvoiceStatus, OrgStatus, OrgType, POLL_CANNOT_VOTE_REASON_KEY, PollCannotVoteReason, PollStatus, PollVoteStatus, PricuvaRefMode, TransactionSource, UnitType, VerificationTier, VotingStrength, deriveVotingStrength, methodToTier } from './enums/index.cjs';
export { A as ApprovalStatus, B as BuildingType, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, P as PollType, d as Priority, T as TransactionCategory, e as TransactionType } from './status.enum-POCdxmgc.cjs';
export { E as EntityLinkType, L as LinkableEntityType } from './entity-link.enum-D2At-V8D.cjs';
export { C as CO_OWNER_VISIBLE_SYSTEM_TYPES, D as DevicePlatform, a as NOTIFICATION_TYPE_CATEGORY, b as NotificationCategory, c as NotificationChannel, d as NotificationDeliveryStatus, N as NotificationType, R as RESIDENT_VISIBLE_SYSTEM_TYPES, U as UNIMPLEMENTED_NOTIFICATION_TYPES, W as WASTE_SUBTYPE_NOTIFICATION_MAP } from './notification.enum-PAMm0M-t.cjs';
export { A as APPROVE_PERMISSIONS, B as BUILDING_ROLE_RANK, e as BuildingRole, O as ORG_ROLE_RANK, i as OrgRole, j as PLATFORM_ROLE_RANK, P as Permission, k as PlatformRole, S as SCOPED_DOMAINS, a as SCOPED_PERMISSIONS, b as ScopedAction, c as ScopedDomain, f as canAssignOrgRole, g as canAssignPlatformRole, h as canAssignRole, d as domainPermissions } from './role.enum-CNU5i4rc.cjs';
export { B as BuildingFeatureSettingKey, b as PLATFORM_FEATURES, a as PLATFORM_FEATURE_META, c as PlatformFeature, P as PlatformFeatureMeta, g as getBuildingFeatureDefault } from './platform-feature.enum-6TI7valI.cjs';
export { BACKEND_ERROR_CODES, BackendErrorCode, isBackendErrorCode } from './errors/index.cjs';
export { ARCHIVE_TYPES, AUDIT_DENIAL_TARGET_TYPE, AddOrgMemberSchema, AiUsageResponse, ApiError, ApiErrorResponse, ApprovalStatusSchema, ApproveFailureReportSchema, ApproveNoticeSchema, ArchiveType, ArchivedItem, AssignOrgBuildingSchema, AssignOrgMemberBuildingSchema, AssignOwnerInput, AuditLogResponse, BOARD_CARD_LIMITS, BOARD_COLUMN_LIMITS, BOARD_LIMITS, BUG_REPORT_LIMITS, BUG_REPORT_STATUSES, BUILDING_ARCHIVE_TYPES, BUILDING_LIMITS, BUILDING_TYPES, BugReportResponse, BugReportStatus, BuildingArchiveType, BuildingDetailResponse, BuildingFundsLedgerResponse, BuildingFundsLedgerRow, BuildingManagementInvoicesResponse, BuildingOwnerAssignment, BuildingResponse, BuildingSettingsResponse, BusinessPartnerResponse, CHAT_LIMITS, CamtImportResponse, CancelManagementInvoiceSchema, ChatMessageResponse, CommentResponse, CommonStatusSchema, ConversationLastMessage, ConversationParticipant, ConversationResponse, ConversationType, ConversationsListResponse, CopyFaqsSchema, CopyTransactionCategoriesSchema, CreateBoardCardSchema, CreateBoardColumnSchema, CreateBoardSchema, CreateBugReportSchema, CreateBuildingSchema, CreateBusinessPartnerInput, CreateConversationSchema, CreateDocumentSchema, CreateDsarEventSchema, CreateDsarRequestSchema, CreateEmailThreadRequestPayload, CreateEntityLinkRequest, CreateFailureReportSchema, CreateFaqSchema, CreateIncomeSchema, CreateInterestRateSchema, CreateNoticeSchema, CreateOrgBroadcastSchema, CreateOrganizationSchema, CreateOwnerInput, CreatePlatformSubscriptionSchema, CreateTransactionCategorySchema, CreateUnitInput, CursorQuerySchema, DOCUMENT_LIMITS, DOCUMENT_SOURCE_TYPES, DeleteEntityLinkQuery, DocumentFile, DocumentLinkedRecord, DocumentResponse, DsarErasureSchema, DsarEventResponse, DsarRequestResponse, DunningCandidate, DunningCandidatesResponse, DunningCase, DunningCaseDetailResponse, DunningCasesQuery, DunningCasesResponse, DunningHoldReason, DunningNotice, DunningNoticesQuery, DunningNoticesResponse, DunningSettingsSnapshot, DunningSummary, EMAIL_LIMITS, ENTITY_LINK_TYPES, EmailAttachment, EmailMessage, EmailThread, EmailThreadDetail, EmailUnreadCountResponse, EnterpriseRequestResponse, EntityLinkCountsResponse, EntityLinkMetadata, EntityLinkReference, EntityLinksResponse, EventResponse, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureReportEventSchema, FailureReportResponse, FailureStatusSchema, FaqResponse, FeatureFlagsResponse, GetAuditLogsQuerySchema, GetDsarRequestsQuerySchema, GetEnterpriseRequestsQuerySchema, GetEntityLinkCountsQuery, GetEntityLinksQuery, GetOrgBuildingsQuerySchema, GetOrgMembersQuerySchema, GetPlatformSubscriptionsQuerySchema, GetTransactionCategoriesQuerySchema, IdCardVerificationStatus, InterestRate, InterestRatesResponse, InviteOrgMemberSchema, InviteOwnerInput, InvoiceBlocker, IssueDunningNoticesResponse, IssueDunningNoticesSchema, IssueManagementInvoicesResponse, IssueManagementInvoicesSchema, JoinBuildingWithOtpSchema, LINKABLE_ENTITY_TYPES, ListArchivedResponse, ListBugReportsResponse, ManagementInvoice, ManagementInvoiceListQuery, ManagementInvoicePreviewRow, ManagementInvoiceSummary, MapPricuvaRefResponse, MapPricuvaRefSchema, MarkManagementInvoicePaidSchema, MessageResponse, MessagesListResponse, MoveBoardCardSchema, MyPricuvaOwner, MyPricuvaResponse, MyPricuvaSlipQuery, MyPricuvaStatus, NOTICE_LIMITS, NoticeEventSchema, NoticeResponse, ORGANIZATION_LIMITS, OrgAiImportBuilding, OrgAiImportCommitResponse, OrgAiImportCommitSchema, OrgAiImportExtractResponse, OrgBroadcastResponse, OrgBuildingFundsRow, OrgFundsOverviewResponse, OrgInvitationResponse, OrgInvitationStatus, OrgStatementImportResponse, OrgStatementImportResult, OwnerAccountCharge, OwnerAccountPayment, OwnerAccountResponse, OwnerAccountUnit, OwnerResponse, PaginatedBuildingsResponse, PaginatedDocumentsResponse, PaginatedEmailThreadsResponse, PaginatedEventsResponse, PaginatedFailureReportsResponse, PaginatedNoticesResponse, PaginatedPollsResponse, PaginatedUnitsResponse, PaymentSlip, PermissionsResponseSchema, PlatformFeatureFlag, PlatformFeatureFlagsResponse, PlatformSubscriptionResponse, PollEligibleVoter, PollEligibleVotersResponse, PollResponse, PollResults, PollVotersResponse, PostPricuvaChargesResponse, PreviewManagementInvoicesResponse, PreviewManagementInvoicesSchema, PricuvaDeliveriesResponse, PricuvaDeliveryChannel, PricuvaDeliveryRow, PricuvaDeliveryStatus, PricuvaOpeningBalanceRow, PricuvaOpeningBalancesResponse, PrioritySchema, PublicOrgInvitation, REP_RECENT_ACTIVITY_TYPES, RecordDsarRectificationSchema, RejectIdCardVerificationSchema, ReorderBoardColumnsSchema, ReorderFaqsSchema, RepBuildingActivity, RepBuildingItem, RepDashboardSummaryResponse, RepRecentActivity, RepUserBuilding, ReplyEmailThreadRequestPayload, RevenueMetricsResponse, SearchUsersQuerySchema, SendMessageSchema, SetDsarRestrictionSchema, SubmitIdCardVerificationSchema, TRANSACTION_CATEGORY_LIMITS, UNIT_KINDS, Unit, UnitKind, UnmatchedPricuvaRefsResponse, UnreadCountResponse, UpdateBoardCardSchema, UpdateBoardColumnSchema, UpdateBoardSchema, UpdateBugReportSchema, UpdateBuildingSchema, UpdateBuildingSettingsSchema, UpdateBusinessPartnerInput, UpdateConversationSchema, UpdateDocumentSchema, UpdateDsarRequestSchema, UpdateDunningCaseSchema, UpdateEnterpriseRequestSchema, UpdateExpenseSchema, UpdateFailureReportSchema, UpdateFaqSchema, UpdateIncomeSchema, UpdateNoticeSchema, UpdateOrgBuildingContractSchema, UpdateOrgMemberRoleSchema, UpdateOrganizationSchema, UpdateOwnerInput, UpdatePlatformFeatureRequestPayload, UpdatePlatformSubscriptionSchema, UpdateTransactionCategorySchema, UpdateUnitInput, UpdateUserBuildingRoleSchema, UpsertPricuvaOpeningBalancesSchema, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, auditLogResponseSchema, baseEntitySchema, boardCardChecklistItemSchema, boardCardEventSchema, booleanish, bugReportResponseSchema, bugReportStatusSchema, buildingArchiveTypeSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingManagementInvoicesResponseSchema, buildingOwnerAssignmentSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, cancelManagementInvoiceSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardColumnSchema, createBoardSchema, createBugReportSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createDocumentSchema, createDsarEventSchema, createDsarRequestSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createExpenseSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createInterestRateSchema, createNoticeSchema, createOrgBroadcastSchema, createOrganizationSchema, createOwnerSchema, createPlatformSubscriptionSchema, createTransactionCategorySchema, createUnitSchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, dsarErasureSchema, dsarEventResponseSchema, dsarRequestResponseSchema, dunningCandidateSchema, dunningCandidatesQuerySchema, dunningCandidatesResponseSchema, dunningCaseDetailResponseSchema, dunningCaseSchema, dunningCaseStatusSchema, dunningCasesQuerySchema, dunningCasesResponseSchema, dunningLevelSchema, dunningNoticeSchema, dunningNoticesQuerySchema, dunningNoticesResponseSchema, dunningSettingsSnapshotSchema, dunningSummarySchema, emailAttachmentSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, emailUnreadCountResponseSchema, enterpriseRequestResponseSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventResponseSchema, failureReportEventSchema, failureReportEventWithDateOrderSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, featureFlagsResponseSchema, feeModelSchema, forgotPasswordSchema, getAuditLogsQuerySchema, getDsarRequestsQuerySchema, getEnterpriseRequestsQuerySchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getPlatformSubscriptionsQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, idCardVerificationStatusSchema, interestRateSchema, interestRatesResponseSchema, inviteOrgMemberSchema, inviteOwnerSchema, issueDunningNoticesResponseSchema, issueDunningNoticesSchema, issueManagementInvoicesResponseSchema, issueManagementInvoicesSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, listBugReportsResponseSchema, loginSchema, managementInvoiceListQuerySchema, managementInvoiceListResponseSchema, managementInvoicePreviewRowSchema, managementInvoiceSchema, managementInvoiceStatusSchema, managementInvoiceSummarySchema, mapPricuvaRefResponseSchema, mapPricuvaRefSchema, markManagementInvoicePaidSchema, messageResponseSchema, messagesListResponseSchema, moneyStringSchema, moveBoardCardSchema, multipartArray, multipartBoolean, myPricuvaOwnerSchema, myPricuvaResponseSchema, myPricuvaSlipQuerySchema, noticeEventSchema, noticeEventWithDateOrderSchema, noticeResponseSchema, optionalDateTimeSchema, orgAiImportAddressCandidateSchema, orgAiImportBuildingSchema, orgAiImportCommitResponseSchema, orgAiImportCommitSchema, orgAiImportExtractResponseSchema, orgAiImportSkippedRowSchema, orgBroadcastResponseSchema, orgBuildingFundsRowSchema, orgFundsOverviewResponseSchema, orgInvitationResponseSchema, orgStatementImportResponseSchema, orgStatementImportResultSchema, organizationInvoicingIdentitySchema, ownerAccountChargeSchema, ownerAccountPaymentSchema, ownerAccountQuerySchema, ownerAccountResponseSchema, ownerAccountUnitSchema, ownerResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginatedUnitsResponseSchema, paginationParamsSchema, passwordSchema, paymentSlipSchema, permissionFieldsSchema, permissionsResponseSchema, platformFeatureFlagSchema, platformFeatureFlagsResponseSchema, platformSubscriptionResponseSchema, pollEligibleVoterSchema, pollEligibleVotersResponseSchema, pollResponseSchema, pollResultsSchema, pollVotersResponseSchema, postPricuvaChargesResponseSchema, previewManagementInvoicesResponseSchema, previewManagementInvoicesSchema, pricuvaDeliveriesResponseSchema, pricuvaDeliveryRowSchema, pricuvaOpeningBalanceRowSchema, pricuvaOpeningBalancesResponseSchema, priorityOptions, publicOrgInvitationSchema, recordDsarRectificationSchema, registerSchema, rejectIdCardVerificationSchema, reorderBoardColumnsSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, revenueMetricsResponseSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, setDsarRestrictionSchema, signedMoneyStringSchema, strongPasswordSchema, submitIdCardVerificationSchema, unitKindSchema, unitSchema, unmatchedPricuvaRefRowSchema, unmatchedPricuvaRefsResponseSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardColumnSchema, updateBoardSchema, updateBugReportSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateDocumentSchema, updateDsarRequestSchema, updateDunningCaseSchema, updateEnterpriseRequestSchema, updateExpenseSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgBuildingContractSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePlatformFeatureRequestSchema, updatePlatformSubscriptionSchema, updatePollRequestSchema, updateTransactionCategorySchema, updateUnitSchema, updateUserBuildingRoleSchema, upsertPricuvaOpeningBalancesSchema, userEntitySchema, uuidSchema, verifyOtpSchema, voidDunningNoticeSchema } from './schemas/index.cjs';
export { C as CreatePollSchema, b as EVENT_COLORS, e as EVENT_TYPES, d as EVENT_TYPE_COLOR_MAP, E as EventColorOption, a as EventTypeOption, F as FinalizePollSchema, P as POLL_LIMITS, m as POLL_TYPES, h as RECURRENCE_TYPES, i as RecordOfflineVotesSchema, R as RecurrenceTypeOption, U as UpdatePollSchema, V as VotePollSchema, j as VoteWithIdCardSchema, c as createEventSchema, k as createPollSchema, f as eventColorSchema, g as eventTypeSchema, l as finalizePollSchema, p as pollTypeSchema, n as recordOfflineVotesSchema, r as recurrenceTypeSchema, t as timeSchema, u as updateEventSchema, o as updatePollSchema, v as votePollSchema, q as voteWithIdCardSchema } from './poll.schema-CaGhYa4I.cjs';
export { N as NotificationPreferenceCategory, a as NotificationPreferenceItem, b as NotificationResponse, g as getNotificationDataSchema, n as notificationDataSchema, c as notificationPreferenceCategorySchema, d as notificationPreferenceItemSchema, e as notificationResponseSchema } from './notifications-BepkLB5r.cjs';
export { ColorToken, ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName, ThemeTokens, colors, radii, themes } from './tokens/index.cjs';
export { BaseEntity, Building, BuildingContextFromOrg, BuildingContextFromPlatformAdmin, BuildingContextFromRole, BuildingEntity, BuildingFund, BuildingMember, BuildingMembership, BuildingOTPResponse, BuildingPermissionContext, BuildingUser, BuildingUserEntity, CreateEventRequest, CreateFailureReportRequest, CreateNoticeRequest, CreatePollRequest, Event, EventColor, EventType, FailureReport, FinancialGraphData, FinancialSummary, Notice, PermissionContext, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, RecurrenceType, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest } from './types/index.cjs';
export { C as CursorPaginatedResponse, P as PaginatedResponse, c as createPaginatedResponse } from './pagination.types-D3A3752L.cjs';
export { API_ROUTES } from './urls/index.cjs';
export { ActionFlags, DATETIME_FORMATS, DATE_FORMATS, DisplayableRole, FeatureAvailabilityInput, GoogleCalendarEventInput, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, MessageableUserShape, ParseError, ParsedApiError, PermissionChecker, PermissionSubject, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, RestrictableActionFlags, RoleBadgeColor, StatusVariant, TIME_FORMATS, VOTING_METHOD_SETTINGS, VotingMethodSetting, VotingMethodState, addMoney, applyResidentRestriction, applyResidentRestrictionToItem, buildGoogleCalendarUrl, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDateByLocale, formatDateTime, formatMoney, formatText, fromCents, getContextUserId, getDateLocale, getInitials, getMessageableUsers, getRoleBadge, isFeatureAvailable, isManagerialRole, normalizeMoney, normalizePaginatedResponse, parseApiError, parseData, resolveVotingMethods, subtractMoney, sumMoney, toCents } from './utils/index.cjs';
export { UuidString, addressSchema, isUuid, oibSchema, optionalIbanSchema, optionalOibSchema, phoneSchema, toUuid } from './validation/index.cjs';
export { A as AddressParts, P as ParsedHouseNumber, f as formatAddress, n as normalizeHouseNumber, p as parseHouseNumber } from './house-number-HwVJ833w.cjs';
import 'zod';
import 'zod/v4/core';

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

declare const BuildingEmailTestIds: {
    readonly screen: "building-email-screen";
    readonly composeButton: "building-email-compose-button";
    /** Suffix with the thread id at call sites: `${threadItem}-${id}`. */
    readonly threadItem: "building-email-thread-item";
    readonly replyInput: "building-email-reply-input";
    readonly sendButton: "building-email-send-button";
    readonly archiveButton: "building-email-archive-button";
    /** Suffix with the attachment id: `${attachment}-${id}`. */
    readonly attachment: "building-email-attachment";
    readonly searchInput: "building-email-search-input";
    readonly tabActive: "building-email-tab-active";
    readonly tabArchived: "building-email-tab-archived";
    /** Floating inbox launcher button (web widget). */
    readonly fab: "building-email-fab";
    /** Unread badge rendered on the FAB. */
    readonly fabUnreadBadge: "building-email-fab-unread-badge";
    /** Corner-panel widget container. */
    readonly widgetPanel: "building-email-widget-panel";
    /** Back button shown in thread view on mobile / in the widget. */
    readonly mobileBackButton: "building-email-mobile-back-button";
    /** Toggle that expands collapsed quoted history inside a message. */
    readonly quoteToggle: "building-email-quote-toggle";
    /** Sanitized HTML body container of an inbound message. */
    readonly htmlBody: "building-email-html-body";
    /** Unread-count chip on a thread list row. */
    readonly unreadBadge: "building-email-unread-badge";
    /** Direction (inbound/outbound) icon on a thread list row. */
    readonly directionIcon: "building-email-direction-icon";
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
    /** Tabs: overview / income / expenses. */
    readonly incomeTab: "funds-income-tab";
    readonly expensesTab: "funds-expenses-tab";
    /** Add income / add expense entry points. */
    readonly addIncomeButton: "funds-add-income-button";
    readonly addExpenseButton: "funds-add-expense-button";
    /** Suffix transaction rows with the id at call sites: `${transactionCard}-${id}`. */
    readonly transactionCard: "funds-transaction-card";
    readonly transactionForm: "funds-transaction-form";
    readonly editTransactionButton: "funds-edit-transaction-button";
    readonly deleteTransactionButton: "funds-delete-transaction-button";
    readonly deleteTransactionConfirm: "funds-delete-transaction-confirm";
    readonly amountInput: "funds-amount-input";
    /** Balance / CAMT import affordances. */
    readonly updateBalanceButton: "funds-update-balance-button";
    readonly camtImportButton: "funds-camt-import-button";
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

export { ApartmentsTestIds, AppShellTestIds, BoardTestIds, BuildingEmailTestIds, BuildingInfoTestIds, BuildingOverviewTestIds, CalendarTestIds, DocumentsTestIds, FailureReportsTestIds, FundsTestIds, LoginTestIds, NoticeBoardTestIds, OnboardingTestIds, PollsTestIds, SettingsTestIds };
