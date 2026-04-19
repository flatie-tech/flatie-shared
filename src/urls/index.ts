/**
 * API route constants.
 *
 * Single source of truth for URL paths used by Flatie clients (frontend + mobile).
 * Consumers compose these into their own HTTP transport — shared does not own
 * the transport layer (auth, headers, interceptors are per-client concerns).
 *
 * Organized by resource group. Building-scoped resources live under their own
 * namespace rather than nested under `BUILDINGS` so call sites stay readable:
 *   API_ROUTES.FAILURE_REPORTS.DETAIL(buildingId, id)
 *   API_ROUTES.FUNDS.SUMMARY(buildingId)
 */

export const API_VERSION = 'v1';

export const API_ROUTES = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
    UPDATE_USER: '/auth/update-user',
    UPDATE_PASSWORD: '/auth/update-password',
  },

  // ─── Users / self ────────────────────────────────────────────────────────
  USERS: {
    ME: '/users/me',
    BY_ID: (userId: string) => `/users/${userId}`,
    BUILDINGS: '/users/me/buildings',
    LOCALE: '/users/me/locale',
    BUILDING_CHAT_VISIBILITY: (buildingId: string) =>
      `/users/me/buildings/${buildingId}/chat-visibility`,
    EXPORT: '/users/me/export',
    RESTORE: '/users/me/restore',
    PERMISSIONS: '/users/me/permissions',
    PHONE_SEND_VERIFICATION: '/users/me/phone/send-verification',
    PHONE_VERIFY: '/users/me/phone/verify',
  },

  // ─── Buildings ───────────────────────────────────────────────────────────
  BUILDINGS: {
    BASE: '/buildings',
    SEARCH: '/buildings/search',
    PENDING: '/buildings/my/pending',
    BY_ID: (id: string) => `/buildings/${id}`,
    OTP: (id: string) => `/buildings/${id}/otp`,
    GENERATE_OTP: '/buildings/generate-otp',
    JOIN_WITH_OTP: '/buildings/join-with-otp',
    JOIN_REQUESTS: (id: string) => `/buildings/${id}/join-requests`,
    JOIN_REQUEST_APPROVE: (id: string, requestId: string) =>
      `/buildings/${id}/join-requests/${requestId}/approve`,
    JOIN_REQUEST_REJECT: (id: string, requestId: string) =>
      `/buildings/${id}/join-requests/${requestId}/reject`,
    SETTINGS: (id: string) => `/buildings/${id}/settings`,
    RECENT: (id: string) => `/buildings/${id}/recent`,
    BUILDING_SEARCH: (id: string) => `/buildings/${id}/search`,
    USERS: (id: string) => `/buildings/${id}/users`,
    USER_BY_ID: (id: string, userId: string) => `/buildings/${id}/users/${userId}`,
    IMPORT_TEMPLATE: (id: string) => `/buildings/${id}/import/template`,
    IMPORT_PREVIEW: (id: string) => `/buildings/${id}/import/preview`,
    IMPORT_COMMIT: (id: string) => `/buildings/${id}/import/commit`,
  },

  // ─── Apartments (building-scoped) ────────────────────────────────────────
  APARTMENTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/apartments`,
    DETAIL: (buildingId: string, apartmentId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}`,
    RESTORE: (buildingId: string, apartmentId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}/restore`,
    USERS: (buildingId: string, apartmentId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}/users`,
    USER_DETAIL: (buildingId: string, apartmentId: string, userId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}/users/${userId}`,
    FLOORS: (buildingId: string) => `/buildings/${buildingId}/apartments/floors`,
  },

  // ─── Garages (building-scoped) ───────────────────────────────────────────
  GARAGES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/garages`,
    DETAIL: (buildingId: string, garageId: string) =>
      `/buildings/${buildingId}/garages/${garageId}`,
    RESTORE: (buildingId: string, garageId: string) =>
      `/buildings/${buildingId}/garages/${garageId}/restore`,
    USERS: (buildingId: string, garageId: string) =>
      `/buildings/${buildingId}/garages/${garageId}/users`,
    USER_DETAIL: (buildingId: string, garageId: string, userId: string) =>
      `/buildings/${buildingId}/garages/${garageId}/users/${userId}`,
    FLOORS: (buildingId: string) => `/buildings/${buildingId}/garages/floors`,
  },

  // ─── Storage units (building-scoped) ─────────────────────────────────────
  STORAGE_UNITS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/storage-units`,
    DETAIL: (buildingId: string, storageUnitId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}`,
    RESTORE: (buildingId: string, storageUnitId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}/restore`,
    USERS: (buildingId: string, storageUnitId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}/users`,
    USER_DETAIL: (buildingId: string, storageUnitId: string, userId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}/users/${userId}`,
    FLOORS: (buildingId: string) => `/buildings/${buildingId}/storage-units/floors`,
  },

  // ─── Units (unified search across apartments + garages + storage) ────────
  UNITS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/units`,
    USER_UNITS: (buildingId: string) => `/users/me/buildings/${buildingId}/units`,
  },

  // ─── Notices (building-scoped) ───────────────────────────────────────────
  NOTICES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/notices`,
    DETAIL: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}`,
    APPROVE: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}/approve`,
    RESTORE: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}/restore`,
  },

  // ─── Polls (building-scoped) ─────────────────────────────────────────────
  POLLS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/polls`,
    DETAIL: (buildingId: string, pollId: string) => `/buildings/${buildingId}/polls/${pollId}`,
    APPROVE: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/approve`,
    VOTE: (buildingId: string, pollId: string) => `/buildings/${buildingId}/polls/${pollId}/vote`,
    RESTORE: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/restore`,
    RESULTS: (buildingId: string) => `/buildings/${buildingId}/polls/results`,
    VOTERS: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/voters`,
  },

  // ─── Events (building-scoped) ────────────────────────────────────────────
  EVENTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/events`,
    DETAIL: (buildingId: string, eventId: string) => `/buildings/${buildingId}/events/${eventId}`,
    APPROVE: (buildingId: string, eventId: string) =>
      `/buildings/${buildingId}/events/${eventId}/approve`,
    RESTORE: (buildingId: string, eventId: string) =>
      `/buildings/${buildingId}/events/${eventId}/restore`,
  },

  // ─── Failure reports (building-scoped) ───────────────────────────────────
  FAILURE_REPORTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/failure-reports`,
    DETAIL: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}`,
    APPROVE: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}/approve`,
    RESTORE: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}/restore`,
  },

  // ─── Maintenance logs (building-scoped) ──────────────────────────────────
  MAINTENANCE_LOGS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/maintenance-logs`,
    DETAIL: (buildingId: string, maintenanceLogId: string) =>
      `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}`,
    RESTORE: (buildingId: string, maintenanceLogId: string) =>
      `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}/restore`,
  },

  // ─── Files / documents (building-scoped) ─────────────────────────────────
  // Note: Backend renamed /documents → /files. Frontend keeps "document"
  // terminology in its own types and query keys; the wire route is /files.
  FILES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/files`,
    DETAIL: (buildingId: string, fileId: string) => `/buildings/${buildingId}/files/${fileId}`,
    RESTORE: (buildingId: string, fileId: string) =>
      `/buildings/${buildingId}/files/${fileId}/restore`,
  },

  // ─── FAQs (building-scoped) ──────────────────────────────────────────────
  FAQS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/faqs`,
    DETAIL: (buildingId: string, faqId: string) => `/buildings/${buildingId}/faqs/${faqId}`,
    RESTORE: (buildingId: string, faqId: string) =>
      `/buildings/${buildingId}/faqs/${faqId}/restore`,
    REORDER: (buildingId: string) => `/buildings/${buildingId}/faqs/reorder`,
    COPY: (buildingId: string) => `/buildings/${buildingId}/faqs/copy`,
  },

  // ─── Transaction categories (building-scoped) ────────────────────────────
  TRANSACTION_CATEGORIES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/transaction-categories`,
    DETAIL: (buildingId: string, categoryId: string) =>
      `/buildings/${buildingId}/transaction-categories/${categoryId}`,
    RESTORE: (buildingId: string, categoryId: string) =>
      `/buildings/${buildingId}/transaction-categories/${categoryId}/restore`,
    COPY: (buildingId: string) => `/buildings/${buildingId}/transaction-categories/copy`,
  },

  // ─── Funds + income + recurring templates (building-scoped) ──────────────
  FUNDS: {
    BALANCE: (buildingId: string) => `/buildings/${buildingId}/funds`,
    SUMMARY: (buildingId: string) => `/buildings/${buildingId}/funds/summary`,
    GRAPH: (buildingId: string) => `/buildings/${buildingId}/funds/graph`,
    RECALCULATE: (buildingId: string) => `/buildings/${buildingId}/funds/recalculate`,
    INCOME: (buildingId: string) => `/buildings/${buildingId}/income`,
    INCOME_DETAIL: (buildingId: string, incomeId: string) =>
      `/buildings/${buildingId}/income/${incomeId}`,
    INCOME_RESTORE: (buildingId: string, incomeId: string) =>
      `/buildings/${buildingId}/income/${incomeId}/restore`,
    RECURRING_TEMPLATES: (buildingId: string) => `/buildings/${buildingId}/recurring-templates`,
    RECURRING_TEMPLATE_DETAIL: (buildingId: string, templateId: string) =>
      `/buildings/${buildingId}/recurring-templates/${templateId}`,
    RECURRING_TEMPLATE_RESTORE: (buildingId: string, templateId: string) =>
      `/buildings/${buildingId}/recurring-templates/${templateId}/restore`,
  },

  // ─── Chat (building-scoped) ──────────────────────────────────────────────
  CHAT: {
    CONVERSATIONS: (buildingId: string) => `/buildings/${buildingId}/conversations`,
    CONVERSATION: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}`,
    MESSAGES: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}/messages`,
    MARK_READ: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}/read`,
    UNREAD_COUNT: (buildingId: string) => `/buildings/${buildingId}/conversations/unread-count`,
  },

  // ─── Organizations ───────────────────────────────────────────────────────
  ORGANIZATIONS: {
    BASE: '/organizations',
    MY: '/organizations/my',
    BY_ID: (orgId: string) => `/organizations/${orgId}`,
    BUILDINGS: (orgId: string) => `/organizations/${orgId}/buildings`,
    MEMBERS: (orgId: string) => `/organizations/${orgId}/members`,
    MEMBER_DETAIL: (orgId: string, memberId: string) =>
      `/organizations/${orgId}/members/${memberId}`,
    INVITATIONS: (orgId: string) => `/organizations/${orgId}/invitations`,
    INVITE: (orgId: string) => `/organizations/${orgId}/invite`,
  },

  // ─── Platform (admin) ────────────────────────────────────────────────────
  PLATFORM: {
    USERS: '/platform/users',
    USER_DETAIL: (userId: string) => `/platform/users/${userId}`,
    MEMBERS: '/platform/members',
    MEMBER_DETAIL: (memberId: string) => `/platform/members/${memberId}`,
    BUILDINGS: '/platform/buildings',
    ORGANIZATIONS: '/platform/organizations',
    ORGANIZATION_DETAIL: (orgId: string) => `/platform/organizations/${orgId}`,
    ORGANIZATION_MEMBERS: (orgId: string) => `/platform/organizations/${orgId}/members`,
    ORGANIZATION_BUILDINGS: (orgId: string) => `/platform/organizations/${orgId}/buildings`,
    DASHBOARD_SUMMARY: '/platform/dashboard/summary',
    SEARCH: '/platform/search',
    BLOG: '/platform/blog',
    BLOG_DETAIL: (id: string) => `/platform/blog/${id}`,
    BLOG_PUBLISH: (id: string) => `/platform/blog/${id}/publish`,
    BLOG_COVER_IMAGE: (id: string) => `/platform/blog/${id}/cover-image`,
    BLOG_RESTORE: (id: string) => `/platform/blog/${id}/restore`,
    BLOG_CATEGORIES: '/platform/blog/categories',
  },

  // ─── Representatives ─────────────────────────────────────────────────────
  REPRESENTATIVES: {
    BUILDINGS: '/representatives/buildings',
    USERS: '/representatives/users',
    DASHBOARD_SUMMARY: '/representatives/dashboard/summary',
  },

  // ─── Notifications ───────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (notificationId: string) => `/notifications/${notificationId}`,
    READ: '/notifications/read',
    READ_CATEGORY: (category: string) => `/notifications/read-category/${category}`,
    READ_CHAT: (conversationId: string) => `/notifications/read-chat/${conversationId}`,
    READ_ALL: '/notifications/read-all',
    UNREAD_COUNT: '/notifications/unread-count',
    UNREAD_COUNT_BY_CATEGORY: '/notifications/unread-count/by-category',
    PREFERENCES: '/notifications/preferences',
    STREAM: '/notifications/stream',
  },

  // ─── Addresses ───────────────────────────────────────────────────────────
  ADDRESSES: {
    AUTOCOMPLETE: '/addresses/autocomplete',
  },

  // ─── Subscriptions ───────────────────────────────────────────────────────
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    PRICES: '/subscriptions/prices',
    INVOICE: '/subscriptions/invoice',
  },
} as const;
