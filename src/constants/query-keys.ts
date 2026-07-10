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
  /** Current authenticated user. Convention matches `/users/me` REST shape. */
  me: () => [...userKeys.all, 'me'] as const,
  /** Current user's profile-screen data. */
  profile: () => [...userKeys.me(), 'profile'] as const,
};

export const organizationKeys = {
  all: ['organization'] as const,
  lists: () => [...organizationKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...organizationKeys.lists(), { ...filters }] as const,
  details: () => [...organizationKeys.all, 'detail'] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,
  quotas: (id: string) => [...organizationKeys.all, 'quotas', id] as const,
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
  settings: (id: string) => [...buildingKeys.all, 'settings', id] as const,
  quotas: (id: string) => [...buildingKeys.all, 'quotas', id] as const,
  joinRequests: (id: string) => [...buildingKeys.all, 'joinRequests', id] as const,
  pending: () => [...buildingKeys.all, 'pending'] as const,
  chatVisibility: () => [...buildingKeys.all, 'chatVisibility'] as const,
  chatPermissions: (ids?: string[]) =>
    [...buildingKeys.all, 'chatPermissions', ...(ids ? [ids] : [])] as const,
  search: (query: string) => [...buildingKeys.all, 'search', query] as const,
};

export const noticeKeys = {
  all: ['notice'] as const,
  lists: () => [...noticeKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...noticeKeys.lists(), { ...filters }] as const,
  details: () => [...noticeKeys.all, 'detail'] as const,
  detail: (id: string) => [...noticeKeys.details(), id] as const,
};

export const buildingEmailKeys = {
  all: ['buildingEmail'] as const,
  threads: (buildingId: string) => [...buildingEmailKeys.all, 'threads', buildingId] as const,
  threadList: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...buildingEmailKeys.threads(buildingId), { ...filters }] as const,
  thread: (buildingId: string, threadId: string) =>
    [...buildingEmailKeys.threads(buildingId), threadId] as const,
};

export const pollKeys = {
  all: ['poll'] as const,
  lists: () => [...pollKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...pollKeys.lists(), { ...filters }] as const,
  details: () => [...pollKeys.all, 'detail'] as const,
  detail: (id: string) => [...pollKeys.details(), id] as const,
  results: (id: string) => [...pollKeys.detail(id), 'results'] as const,
  voters: (buildingId: string, pollId: string) =>
    [...pollKeys.detail(pollId), 'voters', buildingId] as const,
};

export const eventKeys = {
  all: ['event'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...eventKeys.lists(), { ...filters }] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: string) => [...eventKeys.details(), id] as const,
};

export const entityLinkKeys = {
  all: ['entityLink'] as const,
  lists: () => [...entityLinkKeys.all, 'list'] as const,
  list: (entityType: string, entityId: string) =>
    [...entityLinkKeys.lists(), entityType, entityId] as const,
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
  expenses: (buildingId: string) => [...fundsKeys.all, 'expenses', buildingId] as const,
  transactions: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...fundsKeys.all, 'transactions', buildingId, { ...filters }] as const,
};

export const incomeKeys = {
  all: ['income'] as const,
  lists: () => [...incomeKeys.all, 'list'] as const,
  list: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...incomeKeys.lists(), buildingId, { ...filters }] as const,
  details: () => [...incomeKeys.all, 'detail'] as const,
  detail: (id: string) => [...incomeKeys.details(), id] as const,
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

// ── Additional query key factories ──────────────────────────────────────

export const adminBuildingKeys = {
  all: ['adminBuilding'] as const,
  lists: () => [...adminBuildingKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...adminBuildingKeys.lists(), { ...filters }] as const,
  details: () => [...adminBuildingKeys.all, 'detail'] as const,
  detail: (id: string) => [...adminBuildingKeys.details(), id] as const,
};

export const apartmentKeys = {
  all: ['apartment'] as const,
  lists: () => [...apartmentKeys.all, 'list'] as const,
  list: (buildingId: string, filters: Record<string, unknown> = {}) =>
    [...apartmentKeys.lists(), buildingId, { ...filters }] as const,
  details: () => [...apartmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...apartmentKeys.details(), id] as const,
  floors: (buildingId: string) => [...apartmentKeys.all, 'floors', buildingId] as const,
};

export const blogKeys = {
  all: ['blog'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) => [...blogKeys.lists(), { ...filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (id: string) => [...blogKeys.details(), id] as const,
  categories: () => [...blogKeys.all, 'categories'] as const,
};

export const chatKeys = {
  all: ['chat'] as const,
  conversations: (buildingId: string) => [...chatKeys.all, 'conversations', buildingId] as const,
  conversation: (buildingId: string, conversationId: string) =>
    [...chatKeys.all, 'conversation', buildingId, conversationId] as const,
  /**
   * Building-scoped message list. The buildingId is part of the cache key
   * because Flatie's chat lives inside a building — the same conversationId
   * resolved against a different building would return different data, so
   * one-arg keys would collide.
   */
  messages: (buildingId: string, conversationId: string) =>
    [...chatKeys.all, 'messages', buildingId, conversationId] as const,
  unreadCount: (buildingId: string) => [...chatKeys.all, 'unreadCount', buildingId] as const,
  buildingUsers: (buildingId: string, search?: string) =>
    [...chatKeys.all, 'buildingUsers', buildingId, search] as const,
  selfUser: (buildingId: string) => [...chatKeys.all, 'selfUser', buildingId] as const,

  // Org-scoped chat. The literal 'org' segment keeps these disjoint from the
  // buildingId-keyed entries above even when a building and an org share an id space.
  orgConversations: (orgId: string) => [...chatKeys.all, 'conversations', 'org', orgId] as const,
  orgConversation: (orgId: string, conversationId: string) =>
    [...chatKeys.all, 'conversation', 'org', orgId, conversationId] as const,
  orgMessages: (orgId: string, conversationId: string) =>
    [...chatKeys.all, 'messages', 'org', orgId, conversationId] as const,
  orgUnreadCount: (orgId: string) => [...chatKeys.all, 'unreadCount', 'org', orgId] as const,
};

export const dashboardSummaryKeys = {
  all: ['dashboardSummary'] as const,
  summary: () => [...dashboardSummaryKeys.all, 'summary'] as const,
  platform: () => [...dashboardSummaryKeys.all, 'platform'] as const,
  representatives: () => [...dashboardSummaryKeys.all, 'representatives'] as const,
};

export const faqKeys = {
  all: ['faq'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
  list: (buildingId: string) => [...faqKeys.lists(), buildingId] as const,
  details: () => [...faqKeys.all, 'detail'] as const,
  detail: (id: string) => [...faqKeys.details(), id] as const,
};

export const garageKeys = {
  all: ['garage'] as const,
  lists: () => [...garageKeys.all, 'list'] as const,
  list: (buildingId: string) => [...garageKeys.lists(), buildingId] as const,
  details: () => [...garageKeys.all, 'detail'] as const,
  detail: (id: string) => [...garageKeys.details(), id] as const,
  floors: (buildingId: string) => [...garageKeys.all, 'floors', buildingId] as const,
};

export const layoutKeys = {
  all: ['layout'] as const,
  sidebar: () => [...layoutKeys.all, 'sidebar'] as const,
  config: (buildingId: string) => [...layoutKeys.all, 'config', buildingId] as const,
  building: (buildingId: string) => [...layoutKeys.all, 'building', buildingId] as const,
  kiosk: (buildingId: string) => [...layoutKeys.all, 'kiosk', buildingId] as const,
};

export const notificationKeys = {
  all: ['notification'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...notificationKeys.lists(), { ...filters }] as const,
  unreadCount: () => [...notificationKeys.all, 'unreadCount'] as const,
  unreadCountByCategory: (buildingId?: string) =>
    [
      ...notificationKeys.all,
      'unreadCountByCategory',
      ...(buildingId ? [buildingId] : []),
    ] as const,
  preferences: () => [...notificationKeys.all, 'preferences'] as const,
};

export const platformBuildingKeys = {
  all: ['platformBuilding'] as const,
  lists: () => [...platformBuildingKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown> = {}) =>
    [...platformBuildingKeys.lists(), { ...filters }] as const,
  details: () => [...platformBuildingKeys.all, 'detail'] as const,
  detail: (id: string) => [...platformBuildingKeys.details(), id] as const,
};

export const recurringTemplateKeys = {
  all: ['recurringTemplate'] as const,
  lists: () => [...recurringTemplateKeys.all, 'list'] as const,
  list: (buildingId: string) => [...recurringTemplateKeys.lists(), buildingId] as const,
  details: () => [...recurringTemplateKeys.all, 'detail'] as const,
  detail: (id: string) => [...recurringTemplateKeys.details(), id] as const,
};

export const spotlightKeys = {
  all: ['spotlight'] as const,
  search: (query: string) => [...spotlightKeys.all, 'search', query] as const,
  buildingSearch: (buildingId: string, query: string, limit?: number) =>
    [...spotlightKeys.all, 'buildingSearch', buildingId, query, limit] as const,
  platformSearch: (query: string, limit?: number) =>
    [...spotlightKeys.all, 'platformSearch', query, limit] as const,
};

export const storageUnitKeys = {
  all: ['storageUnit'] as const,
  lists: () => [...storageUnitKeys.all, 'list'] as const,
  list: (buildingId: string) => [...storageUnitKeys.lists(), buildingId] as const,
  details: () => [...storageUnitKeys.all, 'detail'] as const,
  detail: (id: string) => [...storageUnitKeys.details(), id] as const,
  floors: (buildingId: string) => [...storageUnitKeys.all, 'floors', buildingId] as const,
};

export const ownerKeys = {
  all: ['owner'] as const,
  lists: () => [...ownerKeys.all, 'list'] as const,
  list: (buildingId: string, search?: string) =>
    [...ownerKeys.lists(), buildingId, search ?? null] as const,
  details: () => [...ownerKeys.all, 'detail'] as const,
  detail: (buildingId: string, ownerId: string) =>
    [...ownerKeys.details(), buildingId, ownerId] as const,
  assignments: (buildingId: string, unitKind: string, unitId: string) =>
    [...ownerKeys.all, 'assignments', buildingId, unitKind, unitId] as const,
};

export const unitReminderKeys = {
  all: ['unitReminder'] as const,
  list: (buildingId: string, unitKind: string, unitId: string) =>
    [...unitReminderKeys.all, 'list', buildingId, unitKind, unitId] as const,
};

export const businessPartnerKeys = {
  all: ['businessPartner'] as const,
  lists: () => [...businessPartnerKeys.all, 'list'] as const,
  list: (orgId: string, params?: { search?: string; activeOnly?: boolean }) =>
    [
      ...businessPartnerKeys.lists(),
      orgId,
      params?.search ?? null,
      params?.activeOnly ?? null,
    ] as const,
  details: () => [...businessPartnerKeys.all, 'detail'] as const,
  detail: (orgId: string, partnerId: string) =>
    [...businessPartnerKeys.details(), orgId, partnerId] as const,
};

export const transactionCategoryKeys = {
  all: ['transactionCategory'] as const,
  lists: () => [...transactionCategoryKeys.all, 'list'] as const,
  list: (buildingId?: string, type?: string, search?: string) =>
    [...transactionCategoryKeys.lists(), buildingId, type, search] as const,
  details: () => [...transactionCategoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionCategoryKeys.details(), id] as const,
};

export const unitSearchKeys = {
  all: ['unitSearch'] as const,
  search: (buildingId: string, query?: string) =>
    [...unitSearchKeys.all, 'search', buildingId, query] as const,
  initial: (buildingId: string, unitId?: string) =>
    [...unitSearchKeys.all, 'initial', buildingId, unitId] as const,
  my: (buildingId: string) => [...unitSearchKeys.all, 'my', buildingId] as const,
};

export const widgetKeys = {
  all: ['widget'] as const,
  config: (buildingId: string) => [...widgetKeys.all, 'config', buildingId] as const,
  data: (buildingId: string, widgetId: string) =>
    [...widgetKeys.all, 'data', buildingId, widgetId] as const,
  notices: (buildingId: string) => [...widgetKeys.all, 'notices', buildingId] as const,
};

export const aiUsageKeys = {
  all: ['aiUsage'] as const,
  detail: (buildingId: string) => [...aiUsageKeys.all, buildingId] as const,
};

/**
 * All query keys combined for easy access
 */
export const queryKeys = {
  aiUsage: aiUsageKeys,
  user: userKeys,
  building: buildingKeys,
  buildingEmail: buildingEmailKeys,
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
  adminBuilding: adminBuildingKeys,
  apartment: apartmentKeys,
  blog: blogKeys,
  chat: chatKeys,
  dashboardSummary: dashboardSummaryKeys,
  faq: faqKeys,
  garage: garageKeys,
  income: incomeKeys,
  layout: layoutKeys,
  notification: notificationKeys,
  platformBuilding: platformBuildingKeys,
  recurringTemplate: recurringTemplateKeys,
  spotlight: spotlightKeys,
  storageUnit: storageUnitKeys,
  transactionCategory: transactionCategoryKeys,
  unitSearch: unitSearchKeys,
  widget: widgetKeys,
} as const;
