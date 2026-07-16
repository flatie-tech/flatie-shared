// AI chat guardrails (request caps + server history window)
export { AI_CHAT_LIMITS } from './ai-chat';
// Defaults
export {
  CHAT_CONVERSATIONS_POLL_MS,
  DEFAULT_PAGINATION_LIMIT,
  MAX_PAGINATION_LIMIT,
} from './defaults';
// Entity-link display metadata (entity type → section/icon/tint for linked-records UI)
export { ENTITY_LINK_TYPE_META, type EntityLinkTypeMeta } from './entity-link-meta';
// Entity-link rules (which (source, target, linkType) triples the links API accepts)
export {
  ALLOWED_ENTITY_LINKS,
  type EntityLinkRule,
  isEntityLinkAllowed,
  RELATED_TO_LINKABLE_TYPES,
} from './entity-link-rules';
// Query keys for React Query / TanStack Query
export {
  adminBuildingKeys,
  adminKeys,
  aiUsageKeys,
  apartmentKeys,
  blogKeys,
  boardKeys,
  buildingEmailKeys,
  buildingKeys,
  businessPartnerKeys,
  chatKeys,
  dashboardSummaryKeys,
  documentKeys,
  entityLinkKeys,
  eventKeys,
  failureReportKeys,
  faqKeys,
  fundsKeys,
  garageKeys,
  incomeKeys,
  layoutKeys,
  maintenanceLogKeys,
  noticeKeys,
  notificationKeys,
  organizationKeys,
  ownerKeys,
  permissionKeys,
  platformBuildingKeys,
  pollKeys,
  queryKeys,
  recentKeys,
  recurringTemplateKeys,
  spotlightKeys,
  storageUnitKeys,
  transactionCategoryKeys,
  unitReminderKeys,
  unitSearchKeys,
  userKeys,
  widgetKeys,
} from './query-keys';
// Role → permission mappings (hoisted from backend so clients can compute
// permissions without an API round-trip)
export {
  ADMIN_ORG_PERMISSIONS,
  ADMIN_PLATFORM_PERMISSIONS,
  ALL_PERMISSIONS,
  BUILDING_ROLE_PERMISSIONS,
  ORG_ROLE_PERMISSIONS,
  PLATFORM_ROLE_PERMISSIONS,
} from './role-permissions';
