// AI chat guardrails (request caps + server history window)
export { AI_CHAT_LIMITS } from './ai-chat';
// Defaults
export {
  CHAT_CONVERSATIONS_POLL_MS,
  DEFAULT_PAGINATION_LIMIT,
  MAX_PAGINATION_LIMIT,
  STANDARD_UNIT_PRICE_CENTS,
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
// Deriving preference rows from notification types (shared by both clients)
export {
  buildLeadTimeWrites,
  buildTopicStates,
  buildTopicWrites,
  getLeadTime,
  type LeadTime,
  type PreferenceWrite,
  SELECTABLE_CHANNELS,
  type SelectableChannel,
  type TopicState,
  toggleChannel,
} from './notification-preference-state';
// Notification topics — the user-facing grouping of notification types that
// all three preference surfaces render from
export {
  ALWAYS_ON_NOTIFICATION_TYPES,
  getNotificationTopic,
  getUngroupedNotificationTypes,
  MANAGERIAL_NOTIFICATION_TYPES,
  NOTIFICATION_TOPICS,
  type NotificationTopic,
  ORG_SCOPED_NOTIFICATION_TYPES,
} from './notification-topics';
// Query keys for React Query / TanStack Query
export {
  adminBuildingKeys,
  adminKeys,
  aiUsageKeys,
  apartmentKeys,
  auditLogKeys,
  blogKeys,
  boardKeys,
  buildingEmailKeys,
  buildingKeys,
  businessPartnerKeys,
  chatKeys,
  dashboardSummaryKeys,
  documentKeys,
  dsarKeys,
  dunningKeys,
  enterpriseRequestKeys,
  entityLinkKeys,
  eventKeys,
  failureReportKeys,
  faqKeys,
  featureFlagKeys,
  fundsKeys,
  garageKeys,
  incomeKeys,
  interestRateKeys,
  layoutKeys,
  noticeKeys,
  notificationKeys,
  organizationKeys,
  ownerKeys,
  permissionKeys,
  platformBuildingKeys,
  platformFeatureKeys,
  platformSubscriptionKeys,
  pollKeys,
  pricuvaKeys,
  queryKeys,
  recentKeys,
  recurringTemplateKeys,
  spotlightKeys,
  storageUnitKeys,
  transactionCategoryKeys,
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
  OWNERSHIP_DERIVED_PERMISSIONS,
  PLATFORM_ROLE_PERMISSIONS,
} from './role-permissions';
// ZUOZ čl. 33/34/35 — adjacent-consent poll categories
export {
  isZuozAdjacentConsentCategory,
  ZUOZ_ADJACENT_CONSENT_CATEGORIES,
  type ZuozAdjacentConsentCategory,
} from './zuoz-adjacent-consent';
