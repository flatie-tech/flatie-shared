// Defaults
export { DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT } from './defaults';
// Query keys for React Query / TanStack Query
export {
  adminKeys,
  buildingKeys,
  documentKeys,
  eventKeys,
  failureReportKeys,
  fundsKeys,
  maintenanceLogKeys,
  noticeKeys,
  permissionKeys,
  pollKeys,
  queryKeys,
  recentKeys,
  userKeys,
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
