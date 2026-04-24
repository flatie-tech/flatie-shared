// Defaults
export { DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT } from './defaults';
// Query keys for React Query / TanStack Query
export {
  adminBuildingKeys,
  adminKeys,
  apartmentKeys,
  blogKeys,
  buildingKeys,
  businessPartnerKeys,
  chatKeys,
  dashboardSummaryKeys,
  documentKeys,
  eventKeys,
  failureReportKeys,
  faqKeys,
  fundsKeys,
  garageKeys,
  layoutKeys,
  maintenanceLogKeys,
  noticeKeys,
  notificationKeys,
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
