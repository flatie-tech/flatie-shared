// Auth schemas

// API error envelope
export type { ApiError } from './api-error.schema';
export { apiErrorSchema } from './api-error.schema';
// Typed error envelope — apiErrorSchema + optional `code` from BACKEND_ERROR_CODES.
// Referenced by the backend's @ApiTypedErrorResponse decorator as `ApiErrorResponse`.
export type { ApiErrorResponse } from './api-error-response.schema';
export { apiErrorResponseSchema } from './api-error-response.schema';
export {
  emailSchema,
  forgotPasswordSchema,
  loginSchema,
  passwordSchema,
  registerSchema,
  resetPasswordSchema,
  strongPasswordSchema,
  updatePasswordSchema,
  verifyOtpSchema,
} from './auth.schema';
// Base schemas
export {
  baseEntitySchema,
  booleanish,
  buildingEntitySchema,
  buildingUserEntitySchema,
  dateTimeSchema,
  optionalDateTimeSchema,
  permissionFieldsSchema,
  userEntitySchema,
  uuidSchema,
} from './base.schema';
// Certilia OIDC userinfo
export { certiliaUserinfoSchema } from './certilia.schema';
// Date range schemas
export { dateRangeParamsSchema, dateRangeWithValidationSchema } from './date-range.schema';

// Entity schemas
export * from './entities';
// Canonical monetary field schemas (money is a two-decimal string)
export { moneyStringSchema, signedMoneyStringSchema } from './money.schema';
// Multipart/form-data helpers (Zod preprocessors)
export { multipartArray, multipartBoolean } from './multipart.schema';
// Pagination schemas
export { paginatedResponseSchema, paginationParamsSchema } from './pagination.schema';
// Permission schemas
export type { PermissionsResponseSchema } from './permissions.schema';
export { permissionsResponseSchema, roleTypeSchema } from './permissions.schema';
// Representative list query-param contracts
export { getRepBuildingsParamsSchema, getRepUsersParamsSchema } from './rep-list-params.schema';

// Request schemas (PATCH/PUT payloads: id + optional body fields)
export type {
  CreateEmailThreadRequestPayload,
  ReplyEmailThreadRequestPayload,
  UpdatePlatformFeatureRequestPayload,
} from './requests';
export {
  aiChatMessageSchema,
  aiChatRequestSchema,
  createEmailThreadRequestSchema,
  EMAIL_LIMITS,
  replyEmailThreadRequestSchema,
  updateFailureReportRequestSchema,
  updateNoticeRequestSchema,
  updatePlatformFeatureRequestSchema,
  updatePollRequestSchema,
} from './requests';

// Response schemas
export type {
  AiUsageResponse,
  ArchivedItem,
  ArchiveType,
  BuildingArchiveType,
  BuildingDetailResponse,
  BuildingFundsLedgerResponse,
  BuildingFundsLedgerRow,
  BuildingResponse,
  BuildingSettingsResponse,
  CamtImportResponse,
  ChatMessageResponse,
  CommentResponse,
  ConversationLastMessage,
  ConversationParticipant,
  ConversationResponse,
  ConversationsListResponse,
  DocumentFile,
  DocumentLinkedRecord,
  DocumentResponse,
  EmailAttachment,
  EmailMessage,
  EmailThread,
  EmailThreadDetail,
  EmailUnreadCountResponse,
  EntityLinkCountsResponse,
  EntityLinkMetadata,
  EntityLinkReference,
  EntityLinksResponse,
  EventResponse,
  FailureReportResponse,
  FaqResponse,
  FeatureFlagsResponse,
  ListArchivedResponse,
  MapPricuvaRefResponse,
  MapPricuvaRefSchema,
  MessageResponse,
  MessagesListResponse,
  NoticeResponse,
  NotificationPreferenceCategory,
  NotificationPreferenceItem,
  NotificationResponse,
  OrgStatementImportResponse,
  OrgStatementImportResult,
  PaginatedBuildingsResponse,
  PaginatedDocumentsResponse,
  PaginatedEmailThreadsResponse,
  PaginatedEventsResponse,
  PaginatedFailureReportsResponse,
  PaginatedNoticesResponse,
  PaginatedPollsResponse,
  PlatformFeatureFlag,
  PlatformFeatureFlagsResponse,
  PollEligibleVoter,
  PollEligibleVotersResponse,
  PollResponse,
  PollResults,
  PollVotersResponse,
  RepBuildingActivity,
  RepBuildingItem,
  RepDashboardSummaryResponse,
  RepRecentActivity,
  RepUserBuilding,
  UnmatchedPricuvaRefsResponse,
  UnreadCountResponse,
} from './responses';
export {
  ARCHIVE_TYPES,
  aiUsageResponseSchema,
  archivedItemSchema,
  archiveTypeSchema,
  BUILDING_ARCHIVE_TYPES,
  buildingArchiveTypeSchema,
  buildingDetailResponseSchema,
  buildingFundsLedgerResponseSchema,
  buildingFundsLedgerRowSchema,
  buildingResponseSchema,
  buildingSettingsResponseSchema,
  camtImportResponseSchema,
  chatMessageResponseSchema,
  commentResponseSchema,
  conversationLastMessageSchema,
  conversationParticipantSchema,
  conversationResponseSchema,
  conversationsListResponseSchema,
  DOCUMENT_SOURCE_TYPES,
  documentFileSchema,
  documentLinkedRecordSchema,
  documentResponseSchema,
  emailAttachmentSchema,
  emailMessageSchema,
  emailThreadDetailSchema,
  emailThreadSchema,
  emailUnreadCountResponseSchema,
  entityLinkCountsResponseSchema,
  entityLinkMetadataSchema,
  entityLinkReferenceSchema,
  entityLinksResponseSchema,
  eventResponseSchema,
  failureReportResponseSchema,
  faqResponseSchema,
  featureFlagsResponseSchema,
  getNotificationDataSchema,
  listArchivedResponseSchema,
  mapPricuvaRefResponseSchema,
  mapPricuvaRefSchema,
  messageResponseSchema,
  messagesListResponseSchema,
  noticeResponseSchema,
  notificationDataSchema,
  notificationPreferenceCategorySchema,
  notificationPreferenceItemSchema,
  notificationResponseSchema,
  orgStatementImportResponseSchema,
  orgStatementImportResultSchema,
  paginatedBuildingsResponseSchema,
  paginatedDocumentsResponseSchema,
  paginatedEmailThreadsResponseSchema,
  paginatedEventsResponseSchema,
  paginatedFailureReportsResponseSchema,
  paginatedNoticesResponseSchema,
  paginatedPollsResponseSchema,
  paginatedRepBuildingsResponseSchema,
  paginatedRepUsersResponseSchema,
  platformFeatureFlagSchema,
  platformFeatureFlagsResponseSchema,
  pollEligibleVoterSchema,
  pollEligibleVotersResponseSchema,
  pollResponseSchema,
  pollResultsSchema,
  pollVotersResponseSchema,
  REP_RECENT_ACTIVITY_TYPES,
  repBuildingActivitySchema,
  repBuildingItemSchema,
  repDashboardSummaryResponseSchema,
  repRecentActivitySchema,
  repRecentActivityTypeSchema,
  repUserBuildingSchema,
  repUserItemSchema,
  unmatchedPricuvaRefRowSchema,
  unmatchedPricuvaRefsResponseSchema,
  unreadCountResponseSchema,
} from './responses';

// Status schemas
export {
  ApprovalStatusSchema,
  approvalStatusOptions,
  CommonStatusSchema,
  commonStatusOptions,
  FailureStatusSchema,
  failureStatusOptions,
  PrioritySchema,
  priorityOptions,
} from './status.schema';
