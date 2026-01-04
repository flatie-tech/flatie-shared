/**
 * React Query Key Factory
 *
 * Provides consistent, hierarchical query keys for React Query / TanStack Query.
 * Use these keys for cache invalidation and query management across the app.
 *
 * @example
 * // In a query
 * useQuery({
 *   queryKey: noticeKeys.list({ buildingId: '123' }),
 *   queryFn: () => fetchNotices({ buildingId: '123' }),
 * });
 *
 * // Invalidate all notices
 * queryClient.invalidateQueries({ queryKey: noticeKeys.all });
 *
 * // Invalidate specific notice
 * queryClient.invalidateQueries({ queryKey: noticeKeys.detail('notice-id') });
 */

export const userKeys = {
  all: ['user'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (name: string, filters: Record<string, unknown> = {}) =>
    [...userKeys.lists(), name, { ...filters }] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
  info: () => userKeys.detail('info'),
};

export const buildingKeys = {
  all: ['building'] as const,
  lists: () => [...buildingKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...buildingKeys.lists(), { ...filters }] as const,
  details: () => [...buildingKeys.all, 'detail'] as const,
  detail: (id: string) => [...buildingKeys.details(), id] as const,
  otp: (id: string) => [...buildingKeys.all, 'otp', id] as const,
  users: (id: string, filters: Record<string, unknown> = {}) =>
    [...buildingKeys.all, 'users', id, { ...filters }] as const,
};

export const noticeKeys = {
  all: ['notice'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...noticeKeys.lists(), { ...filters }] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (id: string) => [...noticeKeys.details(), id] as const,
};

export const pollKeys = {
  all: ['poll'] as const,
  lists: () => [...pollKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...pollKeys.lists(), { ...filters }] as const,
  details: () => [...pollKeys.all, 'detail'] as const,
  detail: (id: string) => [...pollKeys.details(), id] as const,
  results: (id: string) => [...pollKeys.detail(id), 'results'] as const,
  voters: (id: string) => [...pollKeys.detail(id), 'voters'] as const,
};

export const eventKeys = {
  all: ['event'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...eventKeys.lists(), { ...filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

export const failureReportKeys = {
  all: ['failureReport'] as const,
  lists: () => [...failureReportKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...failureReportKeys.lists(), { ...filters }] as const,
  details: () => [...failureReportKeys.all, 'detail'] as const,
  detail: (id: string) => [...failureReportKeys.details(), id] as const,
};

export const maintenanceLogKeys = {
  all: ['maintenanceLog'] as const,
  lists: () => [...maintenanceLogKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...maintenanceLogKeys.lists(), { ...filters }] as const,
  details: () => [...maintenanceLogKeys.all, 'detail'] as const,
  detail: (id: string) => [...maintenanceLogKeys.details(), id] as const,
};

export const documentKeys = {
  all: ['document'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...documentKeys.lists(), { ...filters }] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};

export const fundsKeys = {
  all: ['funds'] as const,
  balance: (buildingId: string) => [...fundsKeys.all, 'balance', buildingId] as const,
  summary: (buildingId: string) => [...fundsKeys.all, 'summary', buildingId] as const,
  graph: (buildingId: string) => [...fundsKeys.all, 'graph', buildingId] as const,
  income: (buildingId: string) => [...fundsKeys.all, 'income', buildingId] as const,
  transactions: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...fundsKeys.all, 'transactions', buildingId, { ...filters }] as const,
};

export const permissionKeys = {
  all: ['permission'] as const,
  lists: () => [...permissionKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...permissionKeys.lists(), { ...filters }] as const,
  details: () => [...permissionKeys.all, 'detail'] as const,
  detail: (id: string) => [...permissionKeys.details(), id] as const,
};

export const recentKeys = {
  all: ['recent'] as const,
  items: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...recentKeys.all, buildingId, { ...filters }] as const,
};

export const adminKeys = {
  all: ['admin'] as const,
  dashboard: () => [...adminKeys.all, 'dashboard'] as const,
  dashboardSummary: () => [...adminKeys.dashboard(), 'summary'] as const,
  users: (filters: Record<string, unknown> = {}) =>
    [...adminKeys.all, 'users', { ...filters }] as const,
  buildings: (filters: Record<string, unknown> = {}) =>
    [...adminKeys.all, 'buildings', { ...filters }] as const,
};

/**
 * All query keys combined for easy access
 */
export const queryKeys = {
  user: userKeys,
  building: buildingKeys,
  notice: noticeKeys,
  poll: pollKeys,
  event: eventKeys,
  failureReport: failureReportKeys,
  maintenanceLog: maintenanceLogKeys,
  document: documentKeys,
  funds: fundsKeys,
  permission: permissionKeys,
  recent: recentKeys,
  admin: adminKeys,
} as const;
