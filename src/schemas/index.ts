// Auth schemas

// API error envelope
export type { ApiError } from './api-error.schema';
export { apiErrorSchema } from './api-error.schema';
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

// Response schemas
export type {
  BuildingDetailResponse,
  BuildingResponse,
  CommentResponse,
  EventResponse,
  FailureReportResponse,
  FaqResponse,
  MaintenanceLogResponse,
  NoticeResponse,
  NotificationPreferenceCategory,
  NotificationPreferenceItem,
  NotificationResponse,
  PaginatedBuildingsResponse,
  PaginatedEventsResponse,
  PaginatedFailureReportsResponse,
  PaginatedMaintenanceLogsResponse,
  PaginatedNoticesResponse,
  PaginatedPollsResponse,
  PollResponse,
  PollResults,
  PollVotersResponse,
} from './responses';
export {
  buildingDetailResponseSchema,
  buildingResponseSchema,
  commentResponseSchema,
  eventResponseSchema,
  failureReportResponseSchema,
  faqResponseSchema,
  maintenanceLogResponseSchema,
  noticeResponseSchema,
  notificationPreferenceCategorySchema,
  notificationPreferenceItemSchema,
  notificationResponseSchema,
  paginatedBuildingsResponseSchema,
  paginatedEventsResponseSchema,
  paginatedFailureReportsResponseSchema,
  paginatedMaintenanceLogsResponseSchema,
  paginatedNoticesResponseSchema,
  paginatedPollsResponseSchema,
  pollResponseSchema,
  pollResultsSchema,
  pollVotersResponseSchema,
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
