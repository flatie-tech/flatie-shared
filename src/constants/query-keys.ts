/**
 * React Query / TanStack Query key factories.
 *
 * Hierarchical keys for consistent cache invalidation and query management
 * across Flatie's clients. Consumers on TanStack Query can use `queryOptions`
 * with these keys directly; consumers on wrappers (e.g. mobile's React Query
 * Kit) adapt as needed.
 *
 * @example
 * useQuery({
 *   queryKey: noticeKeys.list({ buildingId: '123' }),
 *   queryFn: () => fetchNotices({ buildingId: '123' }),
 * });
 *
 * queryClient.invalidateQueries({ queryKey: noticeKeys.all });
 * queryClient.invalidateQueries({ queryKey: noticeKeys.detail('id') });
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
  settings: (id: string) => [...buildingKeys.all, 'settings', id] as const,
  users: (id: string, filters: Record<string, unknown> = {}) =>
    [...buildingKeys.all, 'users', id, { ...filters }] as const,
  joinRequests: (id: string) => [...buildingKeys.all, 'joinRequests', id] as const,
  pending: () => ['buildings', 'my', 'pending'] as const,
  chatVisibility: () => ['buildings', 'chat-visibility'] as const,
  chatPermissions: (buildingIds?: string[]) =>
    ['building-permissions', 'chat-visibility', ...(buildingIds ? [buildingIds] : [])] as const,
};

export const adminBuildingKeys = {
  all: ['admin-buildings'] as const,
  lists: () => [...adminBuildingKeys.all, 'list'] as const,
};

export const platformBuildingKeys = {
  all: ['platform-buildings'] as const,
  lists: () => [...platformBuildingKeys.all, 'list'] as const,
};

export const apartmentKeys = {
  all: ['apartment'] as const,
  lists: () => [...apartmentKeys.all, 'list'] as const,
  list: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...apartmentKeys.lists(), buildingId, { ...filters }] as const,
  details: () => [...apartmentKeys.all, 'detail'] as const,
  detail: (buildingId: string, apartmentId: string) =>
    [...apartmentKeys.details(), buildingId, apartmentId] as const,
};

export const garageKeys = {
  all: ['garage'] as const,
  lists: () => [...garageKeys.all, 'list'] as const,
  list: (buildingId: string) => [...garageKeys.lists(), buildingId] as const,
};

export const storageUnitKeys = {
  all: ['storageUnit'] as const,
  lists: () => [...storageUnitKeys.all, 'list'] as const,
  list: (buildingId: string) => [...storageUnitKeys.lists(), buildingId] as const,
};

export const noticeKeys = {
  all: ['notice'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...noticeKeys.lists(), { ...filters }] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (id: string) => [...noticeKeys.details(), id] as const,
};

export const permissionKeys = {
  all: ['permission'] as const,
  lists: () => [...permissionKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...permissionKeys.lists(), { ...filters }] as const,
  details: () => [...permissionKeys.all, 'detail'] as const,
  detail: (id: string) => [...permissionKeys.details(), id] as const,
};

export const maintenanceLogKeys = {
  all: ['maintenanceLog'] as const,
  lists: () => [...maintenanceLogKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...maintenanceLogKeys.lists(), { ...filters }] as const,
  details: () => [...maintenanceLogKeys.all, 'detail'] as const,
  detail: (id: string) => [...maintenanceLogKeys.details(), id] as const,
};

export const failureReportKeys = {
  all: ['failureReport'] as const,
  lists: () => [...failureReportKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...failureReportKeys.lists(), { ...filters }] as const,
  details: () => [...failureReportKeys.all, 'detail'] as const,
  detail: (id: string) => [...failureReportKeys.details(), id] as const,
};

export const eventKeys = {
  all: ['event'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...eventKeys.lists(), { ...filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

export const pollKeys = {
  all: ['poll'] as const,
  lists: () => [...pollKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...pollKeys.lists(), { ...filters }] as const,
  details: () => [...pollKeys.all, 'detail'] as const,
  detail: (id: string) => [...pollKeys.details(), id] as const,
  voters: (buildingId: string, pollId: string) =>
    [...pollKeys.all, 'voters', buildingId, pollId] as const,
};

export const fundsKeys = {
  all: ['funds'] as const,
  balance: (buildingId: string) => [...fundsKeys.all, 'balance', buildingId] as const,
  summary: (buildingId: string) => [...fundsKeys.all, 'summary', buildingId] as const,
  graph: (buildingId: string) => [...fundsKeys.all, 'graph', buildingId] as const,
  income: (buildingId: string) => [...fundsKeys.all, 'income', buildingId] as const,
};

export const documentKeys = {
  all: ['document'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...documentKeys.lists(), { ...filters }] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
};

export const recentKeys = {
  all: ['recent'] as const,
  items: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...recentKeys.all, buildingId, { ...filters }] as const,
};

export const transactionCategoryKeys = {
  all: ['transactionCategory'] as const,
  lists: () => [...transactionCategoryKeys.all, 'list'] as const,
  list: (buildingId?: string, type?: string, search?: string) =>
    [...transactionCategoryKeys.lists(), buildingId, type, search] as const,
};

export const faqKeys = {
  all: ['faq'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
  list: (buildingId: string) => [...faqKeys.lists(), buildingId] as const,
};

export const chatKeys = {
  all: ['chat'] as const,
  conversations: (buildingId: string) => [...chatKeys.all, 'conversations', buildingId] as const,
  conversation: (conversationId: string) =>
    [...chatKeys.all, 'conversation', conversationId] as const,
  messages: (conversationId: string) => [...chatKeys.all, 'messages', conversationId] as const,
  unreadCount: (buildingId: string) => [...chatKeys.all, 'unreadCount', buildingId] as const,
  buildingUsers: (buildingId: string, search?: string) =>
    [...chatKeys.all, 'building-users', buildingId, search] as const,
  selfUser: (buildingId: string) => [...chatKeys.all, 'building-users-self', buildingId] as const,
};

export const blogKeys = {
  all: ['blog'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...blogKeys.lists(), { ...filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
};

export const layoutKeys = {
  all: ['building-layouts'] as const,
  building: (buildingId: string) => [...layoutKeys.all, buildingId] as const,
  kiosk: (buildingId: string) => ['kiosk-layout', buildingId] as const,
};

export const recurringTemplateKeys = {
  all: ['recurring-templates'] as const,
  list: (buildingId: string) => [...recurringTemplateKeys.all, buildingId] as const,
};

export const spotlightKeys = {
  all: ['spotlight'] as const,
  buildingSearch: (buildingId: string, query: string, limit?: number) =>
    [...spotlightKeys.all, 'building', buildingId, query, limit] as const,
  platformSearch: (query: string, limit?: number) =>
    [...spotlightKeys.all, 'platform', query, limit] as const,
};

export const dashboardSummaryKeys = {
  all: ['dashboard'] as const,
  summary: () => [...dashboardSummaryKeys.all, 'summary'] as const,
};

export const unitSearchKeys = {
  all: ['units'] as const,
  search: (buildingId: string, query: string) =>
    [...unitSearchKeys.all, 'search', buildingId, query] as const,
  initial: (buildingId: string, unitId?: string) =>
    [...unitSearchKeys.all, 'search', buildingId, '__initial', unitId] as const,
  my: (buildingId: string) => [...unitSearchKeys.all, 'my', buildingId] as const,
};

export const widgetKeys = {
  all: ['widget'] as const,
  notices: (buildingId: string) => [...widgetKeys.all, 'notices', buildingId] as const,
};

export const notificationKeys = {
  all: ['notification'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...notificationKeys.lists(), { ...filters }] as const,
  unreadCount: () => [...notificationKeys.all, 'unreadCount'] as const,
  unreadCountByCategory: (buildingId?: string) =>
    [...notificationKeys.all, 'unreadCountByCategory', buildingId] as const,
  preferences: () => [...notificationKeys.all, 'preferences'] as const,
};
