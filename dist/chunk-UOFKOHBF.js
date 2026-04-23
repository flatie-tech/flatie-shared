// src/urls/index.ts
var API_VERSION = "v1";
var API_ROUTES = {
  // ── Auth ──────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_OTP: "/auth/verify-otp",
    UPDATE_USER: "/auth/update-user",
    UPDATE_PASSWORD: "/auth/update-password"
  },
  // ── Users ─────────────────────────────────────────────────────────────
  USERS: {
    ME: "/users/me",
    BY_ID: (userId) => `/users/${userId}`,
    RESTORE: "/users/me/restore",
    EXPORT: "/users/me/export",
    LOCALE: "/users/me/locale",
    PERMISSIONS: "/users/me/permissions",
    PHONE_SEND_VERIFICATION: "/users/me/phone/send-verification",
    PHONE_VERIFY: "/users/me/phone/verify",
    BUILDING_CHAT_VISIBILITY: (buildingId) => `/users/me/buildings/${buildingId}/chat-visibility`
  },
  // ── Buildings ─────────────────────────────────────────────────────────
  BUILDINGS: {
    BASE: "/buildings",
    BY_ID: (id) => `/buildings/${id}`,
    SETTINGS: (id) => `/buildings/${id}/settings`,
    USERS: (id) => `/buildings/${id}/users`,
    OTP: (id) => `/buildings/${id}/otp`,
    GENERATE_OTP: "/buildings/generate-otp",
    JOIN_WITH_OTP: "/buildings/join-with-otp",
    PENDING: "/buildings/my/pending",
    RECENT: (id) => `/buildings/${id}/recent`,
    SEARCH: "/buildings/search",
    BUILDING_SEARCH: (id) => `/buildings/${id}/search`,
    JOIN_REQUESTS: (id) => `/buildings/${id}/join-requests`,
    JOIN_REQUEST_APPROVE: (id, requestId) => `/buildings/${id}/join-requests/${requestId}/approve`,
    JOIN_REQUEST_REJECT: (id, requestId) => `/buildings/${id}/join-requests/${requestId}/reject`,
    IMPORT_TEMPLATE: (id) => `/buildings/${id}/import/template`,
    IMPORT_PREVIEW: (id) => `/buildings/${id}/import/preview`,
    IMPORT_COMMIT: (id) => `/buildings/${id}/import/commit`
  },
  // ── Building Email (per-building inbox, representative-only) ────────────
  BUILDING_EMAIL: {
    THREADS: (buildingId) => `/buildings/${buildingId}/email/threads`,
    THREAD: (buildingId, threadId) => `/buildings/${buildingId}/email/threads/${threadId}`,
    REPLY: (buildingId, threadId) => `/buildings/${buildingId}/email/threads/${threadId}/reply`,
    ARCHIVE: (buildingId, threadId) => `/buildings/${buildingId}/email/threads/${threadId}/archive`,
    UNARCHIVE: (buildingId, threadId) => `/buildings/${buildingId}/email/threads/${threadId}/unarchive`,
    INBOUND_WEBHOOK: "/webhooks/mail/inbound"
  },
  // ── Apartments ────────────────────────────────────────────────────────
  APARTMENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/apartments`,
    DETAIL: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}`,
    RESTORE: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}/restore`,
    USERS: (buildingId, apartmentId) => `/buildings/${buildingId}/apartments/${apartmentId}/users`,
    USER_DETAIL: (buildingId, apartmentId, userId) => `/buildings/${buildingId}/apartments/${apartmentId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/apartments/floors`
  },
  // ── Garages ───────────────────────────────────────────────────────────
  GARAGES: {
    LIST: (buildingId) => `/buildings/${buildingId}/garages`,
    DETAIL: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}`,
    RESTORE: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}/restore`,
    USERS: (buildingId, garageId) => `/buildings/${buildingId}/garages/${garageId}/users`,
    USER_DETAIL: (buildingId, garageId, userId) => `/buildings/${buildingId}/garages/${garageId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/garages/floors`
  },
  // ── Storage Units ─────────────────────────────────────────────────────
  STORAGE_UNITS: {
    LIST: (buildingId) => `/buildings/${buildingId}/storage-units`,
    DETAIL: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}`,
    RESTORE: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/restore`,
    USERS: (buildingId, storageUnitId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/users`,
    USER_DETAIL: (buildingId, storageUnitId, userId) => `/buildings/${buildingId}/storage-units/${storageUnitId}/users/${userId}`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/storage-units/floors`
  },
  // ── Units (generic) ──────────────────────────────────────────────────
  UNITS: {
    LIST: (buildingId) => `/buildings/${buildingId}/units`,
    USER_UNITS: (buildingId) => `/users/me/buildings/${buildingId}/units`
  },
  // ── Notices ───────────────────────────────────────────────────────────
  NOTICES: {
    LIST: (buildingId) => `/buildings/${buildingId}/notices`,
    DETAIL: (buildingId, noticeId) => `/buildings/${buildingId}/notices/${noticeId}`,
    APPROVE: (buildingId, noticeId) => `/buildings/${buildingId}/notices/${noticeId}/approve`,
    RESTORE: (buildingId, noticeId) => `/buildings/${buildingId}/notices/${noticeId}/restore`
  },
  // ── Polls / Feedback ─────────────────────────────────────────────────
  POLLS: {
    LIST: (buildingId) => `/buildings/${buildingId}/polls`,
    DETAIL: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}`,
    APPROVE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/approve`,
    RESTORE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/restore`,
    VOTE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/vote`,
    VOTERS: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/voters`,
    RESULTS: (buildingId) => `/buildings/${buildingId}/polls/results`,
    OFFLINE_VOTES: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/offline-votes`
  },
  // ── Events ────────────────────────────────────────────────────────────
  EVENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/events`,
    DETAIL: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}`,
    APPROVE: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}/approve`,
    RESTORE: (buildingId, eventId) => `/buildings/${buildingId}/events/${eventId}/restore`
  },
  // ── Failure Reports ──────────────────────────────────────────────────
  FAILURE_REPORTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/failure-reports`,
    DETAIL: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}`,
    APPROVE: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}/approve`,
    RESTORE: (buildingId, failureReportId) => `/buildings/${buildingId}/failure-reports/${failureReportId}/restore`
  },
  // ── Maintenance Logs ─────────────────────────────────────────────────
  MAINTENANCE_LOGS: {
    LIST: (buildingId) => `/buildings/${buildingId}/maintenance-logs`,
    DETAIL: (buildingId, maintenanceLogId) => `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}`,
    RESTORE: (buildingId, maintenanceLogId) => `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}/restore`
  },
  // ── Documents / Files ────────────────────────────────────────────────
  FILES: {
    LIST: (buildingId) => `/buildings/${buildingId}/files`,
    DETAIL: (buildingId, documentId) => `/buildings/${buildingId}/files/${documentId}`,
    RESTORE: (buildingId, documentId) => `/buildings/${buildingId}/files/${documentId}/restore`,
    STORAGE_USAGE: (buildingId) => `/buildings/${buildingId}/files/storage-usage`
  },
  // ── Comments ─────────────────────────────────────────────────────────
  COMMENTS: {
    LIST: (buildingId) => `/buildings/${buildingId}/comments`,
    DETAIL: (buildingId, commentId) => `/buildings/${buildingId}/comments/${commentId}`
  },
  // ── FAQs ──────────────────────────────────────────────────────────────
  FAQS: {
    LIST: (buildingId) => `/buildings/${buildingId}/faqs`,
    DETAIL: (buildingId, faqId) => `/buildings/${buildingId}/faqs/${faqId}`,
    RESTORE: (buildingId, faqId) => `/buildings/${buildingId}/faqs/${faqId}/restore`,
    REORDER: (buildingId) => `/buildings/${buildingId}/faqs/reorder`,
    COPY: (targetBuildingId) => `/buildings/${targetBuildingId}/faqs/copy`
  },
  // ── Funds ─────────────────────────────────────────────────────────────
  FUNDS: {
    BALANCE: (buildingId) => `/buildings/${buildingId}/funds`,
    RECALCULATE: (buildingId) => `/buildings/${buildingId}/funds/recalculate`,
    SUMMARY: (buildingId) => `/buildings/${buildingId}/funds/summary`,
    GRAPH: (buildingId) => `/buildings/${buildingId}/funds/graph`,
    INCOME: (buildingId) => `/buildings/${buildingId}/income`,
    INCOME_DETAIL: (buildingId, incomeId) => `/buildings/${buildingId}/income/${incomeId}`,
    INCOME_RESTORE: (buildingId, incomeId) => `/buildings/${buildingId}/income/${incomeId}/restore`,
    RECURRING_TEMPLATES: (buildingId) => `/buildings/${buildingId}/recurring-templates`,
    RECURRING_TEMPLATE_DETAIL: (buildingId, templateId) => `/buildings/${buildingId}/recurring-templates/${templateId}`,
    RECURRING_TEMPLATE_RESTORE: (buildingId, templateId) => `/buildings/${buildingId}/recurring-templates/${templateId}/restore`
  },
  // ── Transaction Categories ───────────────────────────────────────────
  TRANSACTION_CATEGORIES: {
    LIST: (buildingId) => `/buildings/${buildingId}/transaction-categories`,
    DETAIL: (buildingId, id) => `/buildings/${buildingId}/transaction-categories/${id}`,
    RESTORE: (buildingId, id) => `/buildings/${buildingId}/transaction-categories/${id}/restore`,
    COPY: (targetBuildingId) => `/buildings/${targetBuildingId}/transaction-categories/copy`
  },
  // ── Chat ──────────────────────────────────────────────────────────────
  CHAT: {
    CONVERSATIONS: (buildingId) => `/buildings/${buildingId}/conversations`,
    CONVERSATION: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}`,
    MESSAGES: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}/messages`,
    MARK_READ: (buildingId, conversationId) => `/buildings/${buildingId}/conversations/${conversationId}/read`,
    UNREAD_COUNT: (buildingId) => `/buildings/${buildingId}/conversations/unread-count`
  },
  // ── Notifications ────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: "/notifications",
    DETAIL: (notificationId) => `/notifications/${notificationId}`,
    PREFERENCES: "/notifications/preferences",
    UNREAD_COUNT: "/notifications/unread-count",
    UNREAD_COUNT_BY_CATEGORY: "/notifications/unread-count/by-category",
    READ: "/notifications/read",
    READ_ALL: "/notifications/read-all",
    READ_CATEGORY: (category) => `/notifications/read-category/${category}`,
    READ_CHAT: (conversationId) => `/notifications/read-chat/${conversationId}`
  },
  // ── Organizations ────────────────────────────────────────────────────
  ORGANIZATIONS: {
    BASE: "/organizations",
    MY: "/organizations/my",
    BY_ID: (orgId) => `/organizations/${orgId}`,
    BUILDINGS: (orgId) => `/organizations/${orgId}/buildings`,
    MEMBERS: (orgId) => `/organizations/${orgId}/members`,
    MEMBER_DETAIL: (orgId, memberId) => `/organizations/${orgId}/members/${memberId}`,
    INVITE: (orgId) => `/organizations/${orgId}/invite`,
    INVITATIONS: (orgId) => `/organizations/${orgId}/invitations`
  },
  // ── Platform (admin) ─────────────────────────────────────────────────
  PLATFORM: {
    DASHBOARD_SUMMARY: "/platform/dashboard/summary",
    BUILDINGS: "/platform/buildings",
    USERS: "/platform/users",
    USER_DETAIL: (userId) => `/platform/users/${userId}`,
    MEMBERS: "/platform/members",
    MEMBER_DETAIL: (memberId) => `/platform/members/${memberId}`,
    ORGANIZATIONS: "/platform/organizations",
    ORGANIZATION_DETAIL: (orgId) => `/platform/organizations/${orgId}`,
    ORGANIZATION_MEMBERS: (orgId) => `/platform/organizations/${orgId}/members`,
    ORGANIZATION_BUILDINGS: (orgId) => `/platform/organizations/${orgId}/buildings`,
    SEARCH: "/platform/search",
    BLOG: "/platform/blog",
    BLOG_DETAIL: (id) => `/platform/blog/${id}`,
    BLOG_PUBLISH: (id) => `/platform/blog/${id}/publish`,
    BLOG_RESTORE: (id) => `/platform/blog/${id}/restore`,
    BLOG_COVER_IMAGE: (id) => `/platform/blog/${id}/cover-image`,
    BLOG_CATEGORIES: "/platform/blog/categories",
    ARCHIVE: "/platform/archive",
    ARCHIVE_CLEANUP: "/platform/archive/cleanup/run",
    ARCHIVE_RESTORE: (type, id) => `/platform/archive/${type}/${id}/restore`,
    ARCHIVE_PERMANENT: (type, id) => `/platform/archive/${type}/${id}/permanent`
  },
  // ── Representatives ──────────────────────────────────────────────────
  REPRESENTATIVES: {
    DASHBOARD_SUMMARY: "/representatives/dashboard/summary",
    BUILDINGS: "/representatives/buildings",
    USERS: "/representatives/users"
  },
  // ── Addresses ────────────────────────────────────────────────────────
  ADDRESSES: {
    AUTOCOMPLETE: "/addresses/autocomplete"
  },
  // ── Subscriptions & Billing ──────────────────────────────────────────
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    PRICES: "/subscriptions/prices",
    INVOICE: "/subscriptions/invoice",
    MARK_PAID: (id) => `/subscriptions/invoices/${id}/mark-paid`
  }
};

export { API_ROUTES, API_VERSION };
//# sourceMappingURL=chunk-UOFKOHBF.js.map
//# sourceMappingURL=chunk-UOFKOHBF.js.map