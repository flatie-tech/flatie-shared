'use strict';

// src/urls/index.ts
var API_VERSION = "v1";
var API_ROUTES = {
  // ─── Auth ────────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_OTP: "/auth/verify-otp"
  },
  // ─── Users / self ────────────────────────────────────────────────────────
  USERS: {
    ME: "/users/me",
    BY_ID: (userId) => `/users/${userId}`,
    BUILDINGS: "/users/me/buildings",
    LOCALE: "/users/me/locale",
    CHAT_VISIBILITY: "/users/me/chat-visibility",
    EXPORT: "/users/me/export",
    RESTORE: "/users/me/restore",
    PERMISSIONS: "/users/me/permissions"
  },
  // ─── Buildings ───────────────────────────────────────────────────────────
  BUILDINGS: {
    BASE: "/buildings",
    SEARCH: "/buildings/search",
    PENDING: "/buildings/my/pending",
    BY_ID: (id) => `/buildings/${id}`,
    GENERATE_OTP: (id) => `/buildings/${id}/otp`,
    JOIN_WITH_OTP: "/buildings/join-with-otp",
    JOIN_REQUESTS: (id) => `/buildings/${id}/join-requests`,
    SETTINGS: (id) => `/buildings/${id}/settings`,
    RECENT: (id) => `/buildings/${id}/recent`,
    BUILDING_SEARCH: (id) => `/buildings/${id}/search`,
    USERS: (id) => `/buildings/${id}/users`,
    USER_BY_ID: (id, userId) => `/buildings/${id}/users/${userId}`,
    IMPORT_TEMPLATE: (id) => `/buildings/${id}/import/template`,
    IMPORT_PREVIEW: (id) => `/buildings/${id}/import/preview`,
    IMPORT_COMMIT: (id) => `/buildings/${id}/import/commit`
  },
  // ─── Apartments (building-scoped) ────────────────────────────────────────
  APARTMENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/apartments`,
    DETAIL: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}`,
    RESTORE: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}/restore`,
    USERS: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}/users`,
    USER_DETAIL: (buildingId, apartmentId, userId) => `/buildings/${buildingId}/apartments/${apartmentId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/apartments/floors`
  },
  // ─── Garages (building-scoped) ───────────────────────────────────────────
  GARAGES: {
    LIST: (buildingId) => `/buildings/${buildingId}/garages`,
    DETAIL: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}`,
    RESTORE: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}/restore`,
    USERS: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}/users`,
    USER_DETAIL: (buildingId, garageId, userId) => `/buildings/${buildingId}/garages/${garageId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/garages/floors`
  },
  // ─── Storage units (building-scoped) ─────────────────────────────────────
  STORAGE_UNITS: {
    LIST: (buildingId) => `/buildings/${buildingId}/storage-units`,
    DETAIL: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}`,
    RESTORE: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/restore`,
    USERS: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/users`,
    USER_DETAIL: (buildingId, storageUnitId, userId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/storage-units/floors`
  },
  // ─── Units (unified search across apartments + garages + storage) ────────
  UNITS: {
    LIST: (buildingId) => `/buildings/${buildingId}/units`,
    USER_UNITS: (buildingId) => `/users/me/buildings/${buildingId}/units`
  },
  // ─── Notices (building-scoped) ───────────────────────────────────────────
  NOTICES: {
    LIST: (buildingId) => `/buildings/${buildingId}/notices`,
    DETAIL: (buildingId, noticeId) => `/buildings/${buildingId}/notices/${noticeId}`,
    RESTORE: (buildingId, noticeId) => `/buildings/${buildingId}/notices/${noticeId}/restore`
  },
  // ─── Polls (building-scoped) ─────────────────────────────────────────────
  POLLS: {
    LIST: (buildingId) => `/buildings/${buildingId}/polls`,
    DETAIL: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}`,
    APPROVE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/approve`,
    VOTE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/vote`,
    RESTORE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/restore`,
    RESULTS: (buildingId) => `/buildings/${buildingId}/polls/results`,
    VOTERS: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/voters`
  },
  // ─── Events (building-scoped) ────────────────────────────────────────────
  EVENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/events`,
    DETAIL: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}`,
    APPROVE: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}/approve`,
    RESTORE: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}/restore`
  },
  // ─── Failure reports (building-scoped) ───────────────────────────────────
  FAILURE_REPORTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/failure-reports`,
    DETAIL: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}`,
    APPROVE: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}/approve`,
    RESTORE: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}/restore`
  },
  // ─── Maintenance logs (building-scoped) ──────────────────────────────────
  MAINTENANCE_LOGS: {
    LIST: (buildingId) => `/buildings/${buildingId}/maintenance-logs`,
    DETAIL: (buildingId, maintenanceLogId) => `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}`,
    RESTORE: (buildingId, maintenanceLogId) => `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}/restore`
  },
  // ─── Documents (building-scoped) ─────────────────────────────────────────
  DOCUMENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/documents`,
    DETAIL: (buildingId, documentId) => `/buildings/${buildingId}/documents/${documentId}`,
    RESTORE: (buildingId, documentId) => `/buildings/${buildingId}/documents/${documentId}/restore`
  },
  // ─── FAQs (building-scoped) ──────────────────────────────────────────────
  FAQS: {
    LIST: (buildingId) => `/buildings/${buildingId}/faqs`,
    DETAIL: (buildingId, faqId) => `/buildings/${buildingId}/faqs/${faqId}`,
    RESTORE: (buildingId, faqId) => `/buildings/${buildingId}/faqs/${faqId}/restore`,
    REORDER: (buildingId) => `/buildings/${buildingId}/faqs/reorder`,
    COPY: (buildingId) => `/buildings/${buildingId}/faqs/copy`
  },
  // ─── Transaction categories (building-scoped) ────────────────────────────
  TRANSACTION_CATEGORIES: {
    LIST: (buildingId) => `/buildings/${buildingId}/transaction-categories`,
    DETAIL: (buildingId, categoryId) => `/buildings/${buildingId}/transaction-categories/${categoryId}`,
    RESTORE: (buildingId, categoryId) => `/buildings/${buildingId}/transaction-categories/${categoryId}/restore`,
    COPY: (buildingId) => `/buildings/${buildingId}/transaction-categories/copy`
  },
  // ─── Funds + income + recurring templates (building-scoped) ──────────────
  FUNDS: {
    BALANCE: (buildingId) => `/buildings/${buildingId}/funds`,
    SUMMARY: (buildingId) => `/buildings/${buildingId}/funds/summary`,
    GRAPH: (buildingId) => `/buildings/${buildingId}/funds/graph`,
    INCOME: (buildingId) => `/buildings/${buildingId}/income`,
    INCOME_DETAIL: (buildingId, incomeId) => `/buildings/${buildingId}/income/${incomeId}`,
    RECURRING_TEMPLATES: (buildingId) => `/buildings/${buildingId}/recurring-templates`,
    RECURRING_TEMPLATE_DETAIL: (buildingId, templateId) => `/buildings/${buildingId}/recurring-templates/${templateId}`
  },
  // ─── Chat (building-scoped) ──────────────────────────────────────────────
  CHAT: {
    CONVERSATIONS: (buildingId) => `/buildings/${buildingId}/conversations`,
    CONVERSATION: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}`,
    MESSAGES: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}/messages`,
    MARK_READ: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}/read`,
    UNREAD_COUNT: (buildingId) => `/buildings/${buildingId}/conversations/unread-count`
  },
  // ─── Organizations ───────────────────────────────────────────────────────
  ORGANIZATIONS: {
    BASE: "/organizations",
    MY: "/organizations/my",
    BY_ID: (orgId) => `/organizations/${orgId}`,
    BUILDINGS: (orgId) => `/organizations/${orgId}/buildings`,
    MEMBERS: (orgId) => `/organizations/${orgId}/members`,
    MEMBER_DETAIL: (orgId, memberId) => `/organizations/${orgId}/members/${memberId}`,
    INVITATIONS: (orgId) => `/organizations/${orgId}/invitations`,
    INVITE: (orgId) => `/organizations/${orgId}/invite`
  },
  // ─── Platform (admin) ────────────────────────────────────────────────────
  PLATFORM: {
    USERS: "/platform/users",
    USER_DETAIL: (userId) => `/platform/users/${userId}`,
    MEMBERS: "/platform/members",
    MEMBER_DETAIL: (memberId) => `/platform/members/${memberId}`,
    BUILDINGS: "/platform/buildings",
    ORGANIZATIONS: "/platform/organizations",
    ORGANIZATION_DETAIL: (orgId) => `/platform/organizations/${orgId}`,
    ORGANIZATION_MEMBERS: (orgId) => `/platform/organizations/${orgId}/members`,
    ORGANIZATION_BUILDINGS: (orgId) => `/platform/organizations/${orgId}/buildings`,
    DASHBOARD_SUMMARY: "/platform/dashboard/summary",
    SEARCH: "/platform/search",
    BLOG: "/platform/blog",
    BLOG_DETAIL: (id) => `/platform/blog/${id}`,
    BLOG_PUBLISH: (id) => `/platform/blog/${id}/publish`,
    BLOG_COVER_IMAGE: (id) => `/platform/blog/${id}/cover-image`,
    BLOG_RESTORE: (id) => `/platform/blog/${id}/restore`,
    BLOG_CATEGORIES: "/platform/blog/categories"
  },
  // ─── Representatives ─────────────────────────────────────────────────────
  REPRESENTATIVES: {
    BUILDINGS: "/representatives/buildings",
    USERS: "/representatives/users",
    DASHBOARD_SUMMARY: "/representatives/dashboard/summary"
  },
  // ─── Notifications ───────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: "/notifications",
    DETAIL: (notificationId) => `/notifications/${notificationId}`,
    READ: "/notifications/read",
    READ_CATEGORY: (category) => `/notifications/read-category/${category}`,
    READ_CHAT: (conversationId) => `/notifications/read-chat/${conversationId}`,
    READ_ALL: "/notifications/read-all",
    UNREAD_COUNT: "/notifications/unread-count",
    UNREAD_COUNT_BY_CATEGORY: "/notifications/unread-count/by-category",
    PREFERENCES: "/notifications/preferences",
    STREAM: "/notifications/stream"
  },
  // ─── Addresses ───────────────────────────────────────────────────────────
  ADDRESSES: {
    AUTOCOMPLETE: "/addresses/autocomplete"
  },
  // ─── Subscriptions ───────────────────────────────────────────────────────
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    PRICES: "/subscriptions/prices",
    INVOICE: "/subscriptions/invoice"
  }
};

exports.API_ROUTES = API_ROUTES;
exports.API_VERSION = API_VERSION;
//# sourceMappingURL=chunk-E76I2DNG.cjs.map
//# sourceMappingURL=chunk-E76I2DNG.cjs.map