// Auth schemas

// API error envelope
export type { ApiError } from './api-error.schema';
export { apiErrorSchema } from './api-error.schema';
// Typed error envelope — apiErrorSchema + optional `code` from BACKEND_ERROR_CODES.
// Referenced by the backend's @ApiTypedErrorResponse decorator as `ApiErrorResponse`.
export type { ApiErrorResponse } from './api-error-response.schema';
export { apiErrorResponseSchema } from './api-error-response.schema';
export type {
  ForgotPasswordSchema,
  LoginSchema,
  RegisterSchema,
  ResetPasswordSchema,
  UpdatePasswordSchema,
  VerifyOtpSchema,
} from './auth.schema';
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
export type {
  BaseEntitySchema,
  BuildingEntitySchema,
  BuildingUserEntitySchema,
  DateTimeSchema,
  PermissionFieldsSchema,
  UserEntitySchema,
  UuidSchema,
} from './base.schema';
export {
  baseEntitySchema,
  buildingEntitySchema,
  buildingUserEntitySchema,
  dateTimeSchema,
  optionalDateTimeSchema,
  permissionFieldsSchema,
  userEntitySchema,
  uuidSchema,
} from './base.schema';
// Certilia OIDC userinfo
export type { CertiliaUserinfo } from './certilia.schema';
export { certiliaUserinfoSchema } from './certilia.schema';
// Date range schemas
export type { DateRangeParamsSchema, DateRangeWithValidationSchema } from './date-range.schema';
export { dateRangeParamsSchema, dateRangeWithValidationSchema } from './date-range.schema';

// Entity schemas
export * from './entities';
// Multipart/form-data helpers (Zod preprocessors)
export { multipartArray, multipartBoolean } from './multipart.schema';
// Pagination schemas
export type { PaginatedResponseSchema, PaginationParamsSchema } from './pagination.schema';
export { paginatedResponseSchema, paginationParamsSchema } from './pagination.schema';
// Permission schemas
export type { PermissionsResponseSchema } from './permissions.schema';
export { permissionsResponseSchema, roleTypeSchema } from './permissions.schema';

// Request schemas (PATCH/PUT payloads: id + optional body fields)
export type {
  AiChatMessagePayload,
  AiChatRequestPayload,
  CreateEmailThreadRequestPayload,
  ReplyEmailThreadRequestPayload,
  UpdateFailureReportRequestPayload,
  UpdateMaintenanceLogRequestPayload,
  UpdateNoticeRequestPayload,
  UpdatePollRequestPayload,
} from './requests';
export {
  aiChatMessageSchema,
  aiChatRequestSchema,
  createEmailThreadRequestSchema,
  replyEmailThreadRequestSchema,
  updateFailureReportRequestSchema,
  updateMaintenanceLogRequestSchema,
  updateNoticeRequestSchema,
  updatePollRequestSchema,
} from './requests';

// Response schemas
export type {
  AiUsageResponse,
  ArchivedItem,
  ArchiveType,
  BuildingDetailResponse,
  BuildingFundsLedgerResponse,
  BuildingFundsLedgerRow,
  BuildingResponse,
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
  EmailDirection,
  EmailMessage,
  EmailThread,
  EmailThreadDetail,
  EventResponse,
  FailureReportResponse,
  FaqResponse,
  ListArchivedResponse,
  MaintenanceLogResponse,
  MessageResponse,
  MessagesListResponse,
  NoticeResponse,
  NotificationPreferenceCategory,
  NotificationPreferenceItem,
  NotificationResponse,
  PaginatedBuildingsResponse,
  PaginatedDocumentsResponse,
  PaginatedEmailThreadsResponse,
  PaginatedEventsResponse,
  PaginatedFailureReportsResponse,
  PaginatedMaintenanceLogsResponse,
  PaginatedNoticesResponse,
  PaginatedPollsResponse,
  PollResponse,
  PollResults,
  PollVotersResponse,
  UnreadCountResponse,
} from './responses';
export {
  ARCHIVE_TYPES,
  aiUsageResponseSchema,
  archivedItemSchema,
  archiveTypeSchema,
  buildingDetailResponseSchema,
  buildingFundsLedgerResponseSchema,
  buildingFundsLedgerRowSchema,
  buildingResponseSchema,
  camtImportResponseSchema,
  chatMessageResponseSchema,
  commentResponseSchema,
  conversationLastMessageSchema,
  conversationParticipantSchema,
  conversationResponseSchema,
  conversationsListResponseSchema,
  documentFileSchema,
  documentLinkedRecordSchema,
  documentResponseSchema,
  emailMessageSchema,
  emailThreadDetailSchema,
  emailThreadSchema,
  eventResponseSchema,
  failureReportResponseSchema,
  faqResponseSchema,
  listArchivedResponseSchema,
  maintenanceLogResponseSchema,
  messageResponseSchema,
  messagesListResponseSchema,
  noticeResponseSchema,
  notificationPreferenceCategorySchema,
  notificationPreferenceItemSchema,
  notificationResponseSchema,
  paginatedBuildingsResponseSchema,
  paginatedDocumentsResponseSchema,
  paginatedEmailThreadsResponseSchema,
  paginatedEventsResponseSchema,
  paginatedFailureReportsResponseSchema,
  paginatedMaintenanceLogsResponseSchema,
  paginatedNoticesResponseSchema,
  paginatedPollsResponseSchema,
  pollResponseSchema,
  pollResultsSchema,
  pollVotersResponseSchema,
  unreadCountResponseSchema,
} from './responses';

// Status schemas
export type {
  ApprovalStatusSchemaType,
  CommonStatusSchemaType,
  FailureStatusSchemaType,
  MaintenanceStatusSchemaType,
  PrioritySchemaType,
} from './status.schema';
export {
  ApprovalStatusSchema,
  approvalStatusOptions,
  CommonStatusSchema,
  commonStatusOptions,
  FailureStatusSchema,
  failureStatusOptions,
  MaintenanceStatusSchema,
  maintenanceStatusOptions,
  PrioritySchema,
  priorityOptions,
} from './status.schema';
