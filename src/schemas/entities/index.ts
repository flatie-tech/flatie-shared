// Unit schemas (unified apartment/garage/storage_unit)

// Board (Kanban) + column + card schemas
export type {
  CreateBoardCardSchema,
  CreateBoardColumnSchema,
  CreateBoardSchema,
  MoveBoardCardSchema,
  ReorderBoardColumnsSchema,
  UpdateBoardCardSchema,
  UpdateBoardColumnSchema,
  UpdateBoardSchema,
} from './board-card.schema';
export {
  BOARD_CARD_LIMITS,
  BOARD_COLUMN_LIMITS,
  BOARD_LIMITS,
  boardCardChecklistItemSchema,
  boardCardEventSchema,
  createBoardCardSchema,
  createBoardColumnSchema,
  createBoardSchema,
  moveBoardCardSchema,
  reorderBoardColumnsSchema,
  updateBoardCardSchema,
  updateBoardColumnSchema,
  updateBoardSchema,
} from './board-card.schema';
// Chat schemas
export type {
  ConversationType,
  CreateConversationSchema,
  CursorQuerySchema,
  SendMessageSchema,
  UpdateConversationSchema,
} from './chat.schema';
export {
  CHAT_LIMITS,
  createConversationSchema,
  cursorQuerySchema,
  sendMessageSchema,
  updateConversationSchema,
} from './chat.schema';
// FAQ schemas
export type {
  CopyFaqsSchema,
  CreateFaqSchema,
  ReorderFaqsSchema,
  UpdateFaqSchema,
} from './faq.schema';
export {
  copyFaqsSchema,
  createFaqSchema,
  FAQ_LIMITS,
  reorderFaqsSchema,
  updateFaqSchema,
} from './faq.schema';
// Organization schemas
export type {
  AddOrgMemberSchema,
  AssignOrgBuildingSchema,
  AssignOrgMemberBuildingSchema,
  CreateOrganizationSchema,
  CreateOrgBroadcastSchema,
  GetOrgBuildingsQuerySchema,
  GetOrgMembersQuerySchema,
  InviteOrgMemberSchema,
  OrgBroadcastResponse,
  OrgInvitationResponse,
  PublicOrgInvitation,
  SearchUsersQuerySchema,
  UpdateOrganizationSchema,
  UpdateOrgBuildingContractSchema,
  UpdateOrgMemberRoleSchema,
} from './organization.schema';
export {
  addOrgMemberSchema,
  assignOrgBuildingSchema,
  assignOrgMemberBuildingSchema,
  createOrganizationSchema,
  createOrgBroadcastSchema,
  getOrgBuildingsQuerySchema,
  getOrgMembersQuerySchema,
  inviteOrgMemberSchema,
  ORGANIZATION_LIMITS,
  OrgInvitationStatus,
  orgBroadcastResponseSchema,
  orgInvitationResponseSchema,
  publicOrgInvitationSchema,
  searchUsersQuerySchema,
  updateOrganizationSchema,
  updateOrgBuildingContractSchema,
  updateOrgMemberRoleSchema,
} from './organization.schema';
export type {
  CreateUnitInput,
  PaginatedUnitsResponse,
  Unit,
  UnitKind,
  UpdateUnitInput,
} from './unit.schema';
export {
  createUnitSchema,
  paginatedUnitsResponseSchema,
  UNIT_KINDS,
  unitKindSchema,
  unitSchema,
  updateUnitSchema,
} from './unit.schema';

// Building schemas

// Platform audit-log viewer (read contract)
export {
  AUDIT_DENIAL_TARGET_TYPE,
  type AuditLogResponse,
  auditLogResponseSchema,
  type GetAuditLogsQuerySchema,
  getAuditLogsQuerySchema,
} from './audit-log.schema';
export type {
  CreateBuildingSchema,
  JoinBuildingWithOtpSchema,
  UpdateBuildingSchema,
  UpdateUserBuildingRoleSchema,
} from './building.schema';
export {
  BUILDING_LIMITS,
  BUILDING_TYPES,
  buildingTypeSchema,
  createBuildingSchema,
  joinBuildingWithOtpSchema,
  updateBuildingSchema,
  updateUserBuildingRoleSchema,
} from './building.schema';
// Building quota schemas
export {
  buildingQuotaConfigSchema,
  buildingQuotaEntrySchema,
  buildingQuotaListSchema,
} from './building-quota.schema';
// Building settings schemas
export type { UpdateBuildingSettingsSchema } from './building-settings.schema';
export { updateBuildingSettingsSchema } from './building-settings.schema';
// Business partner schemas
export type {
  BusinessPartnerResponse,
  CreateBusinessPartnerInput,
  UpdateBusinessPartnerInput,
} from './business-partner.schema';
export {
  businessPartnerResponseSchema,
  createBusinessPartnerSchema,
  updateBusinessPartnerSchema,
} from './business-partner.schema';
// Document (building file library) request schemas
export type { CreateDocumentSchema, UpdateDocumentSchema } from './document.schema';
export {
  createDocumentSchema,
  DOCUMENT_LIMITS,
  updateDocumentSchema,
} from './document.schema';
// GDPR DSAR console
export {
  type CreateDsarEventSchema,
  type CreateDsarRequestSchema,
  createDsarEventSchema,
  createDsarRequestSchema,
  type DsarErasureSchema,
  type DsarEventResponse,
  type DsarRequestResponse,
  dsarErasureSchema,
  dsarEventResponseSchema,
  dsarRequestResponseSchema,
  type GetDsarRequestsQuerySchema,
  getDsarRequestsQuerySchema,
  type RecordDsarRectificationSchema,
  recordDsarRectificationSchema,
  type SetDsarRestrictionSchema,
  setDsarRestrictionSchema,
  type UpdateDsarRequestSchema,
  updateDsarRequestSchema,
} from './dsar.schema';
// Entity-link schemas (generic links API)
export type {
  CreateEntityLinkRequest,
  DeleteEntityLinkQuery,
  GetEntityLinkCountsQuery,
  GetEntityLinksQuery,
} from './entity-link.schema';
export {
  createEntityLinkRequestSchema,
  deleteEntityLinkQuerySchema,
  deleteEntityLinkRequestSchema,
  ENTITY_LINK_TYPES,
  entityLinkEndpointSchema,
  entityLinkTypeSchema,
  getEntityLinkCountsQuerySchema,
  getEntityLinksQuerySchema,
  LINKABLE_ENTITY_TYPES,
  linkableEntityTypeSchema,
} from './entity-link.schema';
export type { EventColorOption, EventTypeOption, RecurrenceTypeOption } from './event.schema';
// Event schemas
export {
  createEventSchema,
  EVENT_COLORS,
  EVENT_TYPE_COLOR_MAP,
  EVENT_TYPES,
  eventColorSchema,
  eventTypeSchema,
  RECURRENCE_TYPES,
  recurrenceTypeSchema,
  timeSchema,
  updateEventSchema,
} from './event.schema';
// Income-transaction schemas (manual funds mode income ledger)
export type { UpdateExpenseSchema } from './expense-transaction.schema';
export { createExpenseSchema, updateExpenseSchema } from './expense-transaction.schema';
export type {
  ApproveFailureReportSchema,
  CreateFailureReportSchema,
  FailureReportEventSchema,
  UpdateFailureReportSchema,
} from './failure-report.schema';
// Failure report schemas
export {
  approveFailureReportSchema,
  createFailureReportSchema,
  FAILURE_REPORT_LIMITS,
  failureReportEventSchema,
  updateFailureReportSchema,
} from './failure-report.schema';
// ID card verification schemas
export type {
  IdCardVerificationStatus,
  RejectIdCardVerificationSchema,
  SubmitIdCardVerificationSchema,
} from './id-card-verification.schema';
export {
  idCardVerificationStatusSchema,
  rejectIdCardVerificationSchema,
  submitIdCardVerificationSchema,
} from './id-card-verification.schema';
export type { CreateIncomeSchema, UpdateIncomeSchema } from './income-transaction.schema';
export { createIncomeSchema, updateIncomeSchema } from './income-transaction.schema';
export type {
  ApproveNoticeSchema,
  CreateNoticeSchema,
  NoticeEventSchema,
  UpdateNoticeSchema,
} from './notice.schema';
// Notice schemas
export {
  approveNoticeSchema,
  createNoticeSchema,
  NOTICE_LIMITS,
  noticeEventSchema,
  updateNoticeSchema,
} from './notice.schema';
// Owner schemas
export type {
  AssignOwnerInput,
  BuildingOwnerAssignment,
  CreateOwnerInput,
  InviteOwnerInput,
  OwnerResponse,
  UpdateOwnerInput,
} from './owner.schema';
export {
  assignOwnerSchema,
  buildingOwnerAssignmentSchema,
  createOwnerSchema,
  inviteOwnerSchema,
  ownerResponseSchema,
  updateOwnerSchema,
} from './owner.schema';
// Platform subscription console + enterprise-request queue + revenue metrics
export {
  type CreatePlatformSubscriptionSchema,
  createPlatformSubscriptionSchema,
  type EnterpriseRequestResponse,
  enterpriseRequestResponseSchema,
  type GetEnterpriseRequestsQuerySchema,
  type GetPlatformSubscriptionsQuerySchema,
  getEnterpriseRequestsQuerySchema,
  getPlatformSubscriptionsQuerySchema,
  type PlatformSubscriptionResponse,
  platformSubscriptionResponseSchema,
  type RevenueMetricsResponse,
  revenueMetricsResponseSchema,
  type UpdateEnterpriseRequestSchema,
  type UpdatePlatformSubscriptionSchema,
  updateEnterpriseRequestSchema,
  updatePlatformSubscriptionSchema,
} from './platform-subscription.schema';
export type {
  CreatePollSchema,
  FinalizePollSchema,
  RecordOfflineVotesSchema,
  UpdatePollSchema,
  VotePollSchema,
  VoteWithIdCardSchema,
} from './poll.schema';
// Poll schemas
export {
  createPollSchema,
  finalizePollSchema,
  POLL_LIMITS,
  POLL_TYPES,
  pollTypeSchema,
  recordOfflineVotesSchema,
  updatePollSchema,
  votePollSchema,
  voteWithIdCardSchema,
} from './poll.schema';
// Transaction category schemas
export type {
  CopyTransactionCategoriesSchema,
  CreateTransactionCategorySchema,
  GetTransactionCategoriesQuerySchema,
  UpdateTransactionCategorySchema,
} from './transaction-category.schema';
export {
  copyTransactionCategoriesSchema,
  createTransactionCategorySchema,
  getTransactionCategoriesQuerySchema,
  TRANSACTION_CATEGORY_LIMITS,
  updateTransactionCategorySchema,
} from './transaction-category.schema';
