/**
 * API Route Constants
 *
 * Centralized API endpoint definitions for use across frontend, mobile, and backend.
 */

export const API_VERSION = 'v1';

export const API_ROUTES = {
  // ── Auth ──────────────────────────────────────────────────────────────
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
    UPDATE_USER: '/auth/update-user',
    CHANGE_PASSWORD: '/auth/change-password',
  },

  // ── Users ─────────────────────────────────────────────────────────────
  USERS: {
    ME: '/users/me',
    BY_ID: (userId: string) => `/users/${userId}`,
    RESTORE: '/users/me/restore',
    EXPORT: '/users/me/export',
    LOCALE: '/users/me/locale',
    PERMISSIONS: '/users/me/permissions',
    /** @deprecated Phantom route — no backend endpoint exists. Will be removed in v0.60.0. */
    PHONE_SEND_VERIFICATION: '/users/me/phone/send-verification',
    /** @deprecated Phantom route — no backend endpoint exists. Will be removed in v0.60.0. */
    PHONE_VERIFY: '/users/me/phone/verify',
    BUILDING_CHAT_VISIBILITY: (buildingId: string) =>
      `/users/me/buildings/${buildingId}/chat-visibility`,
  },

  // ── Buildings ─────────────────────────────────────────────────────────
  BUILDINGS: {
    BASE: '/buildings',
    BY_ID: (id: string) => `/buildings/${id}`,
    SETTINGS: (id: string) => `/buildings/${id}/settings`,
    USERS: (id: string) => `/buildings/${id}/users`,
    OTP: (id: string) => `/buildings/${id}/otp`,
    GENERATE_OTP: '/buildings/generate-otp',
    JOIN_WITH_OTP: '/buildings/join-with-otp',
    PENDING: '/buildings/my/pending',
    RECENT: (id: string) => `/buildings/${id}/recent`,
    SEARCH: '/buildings/search',
    CHECK_ADDRESS: '/buildings/check-address',
    BUILDING_SEARCH: (id: string) => `/buildings/${id}/search`,
    JOIN_REQUESTS: (id: string) => `/buildings/${id}/join-requests`,
    JOIN_REQUEST_APPROVE: (id: string, requestId: string) =>
      `/buildings/${id}/join-requests/${requestId}/approve`,
    JOIN_REQUEST_REJECT: (id: string, requestId: string) =>
      `/buildings/${id}/join-requests/${requestId}/reject`,
    IMPORT_TEMPLATE: (id: string) => `/buildings/${id}/import/template`,
    IMPORT_PREVIEW: (id: string) => `/buildings/${id}/import/preview`,
    IMPORT_COMMIT: (id: string) => `/buildings/${id}/import/commit`,
    /** @deprecated Phantom route — no backend endpoint exists. Will be removed in v0.60.0. */
    QUOTAS: (id: string) => `/buildings/${id}/quotas`,
    AI_USAGE: (id: string) => `/buildings/${id}/ai-usage`,
  },

  // ── Apartments ────────────────────────────────────────────────────────
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

  // ── Garages ───────────────────────────────────────────────────────────
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

  // ── Storage Units ─────────────────────────────────────────────────────
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

  // ── Unit Reminders (polymorphic — apartment/garage/storage) ─────────
  UNIT_REMINDERS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/unit-reminders`,
    DETAIL: (buildingId: string, reminderId: string) =>
      `/buildings/${buildingId}/unit-reminders/${reminderId}`,
  },

  // ── Owners (building-scoped, user-link optional) ────────────────────
  OWNERS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/owners`,
    DETAIL: (buildingId: string, ownerId: string) => `/buildings/${buildingId}/owners/${ownerId}`,
    APARTMENT_ASSIGNMENTS: (buildingId: string, apartmentId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}/owners`,
    APARTMENT_ASSIGNMENT_DETAIL: (buildingId: string, apartmentId: string, ownerId: string) =>
      `/buildings/${buildingId}/apartments/${apartmentId}/owners/${ownerId}`,
    GARAGE_ASSIGNMENTS: (buildingId: string, garageId: string) =>
      `/buildings/${buildingId}/garages/${garageId}/owners`,
    GARAGE_ASSIGNMENT_DETAIL: (buildingId: string, garageId: string, ownerId: string) =>
      `/buildings/${buildingId}/garages/${garageId}/owners/${ownerId}`,
    STORAGE_ASSIGNMENTS: (buildingId: string, storageUnitId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}/owners`,
    STORAGE_ASSIGNMENT_DETAIL: (buildingId: string, storageUnitId: string, ownerId: string) =>
      `/buildings/${buildingId}/storage-units/${storageUnitId}/owners/${ownerId}`,
  },

  // ── Units (generic) ──────────────────────────────────────────────────
  UNITS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/units`,
    USER_UNITS: (buildingId: string) => `/users/me/buildings/${buildingId}/units`,
  },

  // ── Notices ───────────────────────────────────────────────────────────
  NOTICES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/notices`,
    DETAIL: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}`,
    APPROVE: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}/approve`,
    RESTORE: (buildingId: string, noticeId: string) =>
      `/buildings/${buildingId}/notices/${noticeId}/restore`,
  },

  // ── Polls / Feedback ─────────────────────────────────────────────────
  POLLS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/polls`,
    DETAIL: (buildingId: string, pollId: string) => `/buildings/${buildingId}/polls/${pollId}`,
    APPROVE: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/approve`,
    RESTORE: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/restore`,
    VOTE: (buildingId: string, pollId: string) => `/buildings/${buildingId}/polls/${pollId}/vote`,
    VOTERS: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/voters`,
    RESULTS: (buildingId: string) => `/buildings/${buildingId}/polls/results`,
    OFFLINE_VOTES: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/offline-votes`,
    SIGNATURE_BALLOT_PDF: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/signature-ballot.pdf`,
    SIGNATURE_VOTE: (buildingId: string, pollId: string) =>
      `/buildings/${buildingId}/polls/${pollId}/signature-vote`,
    PENDING_SIGNATURES: (buildingId: string) =>
      `/buildings/${buildingId}/poll-votes/pending-signatures`,
    APPROVE_SIGNATURE: (buildingId: string, voteId: string) =>
      `/buildings/${buildingId}/poll-votes/${voteId}/approve-signature`,
    REJECT_SIGNATURE: (buildingId: string, voteId: string) =>
      `/buildings/${buildingId}/poll-votes/${voteId}/reject-signature`,
  },

  // ── Events ────────────────────────────────────────────────────────────
  EVENTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/events`,
    DETAIL: (buildingId: string, eventId: string) => `/buildings/${buildingId}/events/${eventId}`,
    APPROVE: (buildingId: string, eventId: string) =>
      `/buildings/${buildingId}/events/${eventId}/approve`,
    RESTORE: (buildingId: string, eventId: string) =>
      `/buildings/${buildingId}/events/${eventId}/restore`,
  },

  // ── Failure Reports ──────────────────────────────────────────────────
  FAILURE_REPORTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/failure-reports`,
    DETAIL: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}`,
    APPROVE: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}/approve`,
    RESTORE: (buildingId: string, failureReportId: string) =>
      `/buildings/${buildingId}/failure-reports/${failureReportId}/restore`,
  },

  // ── Boards (Kanban) ──────────────────────────────────────────────────
  BOARDS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/boards`,
    DETAIL: (buildingId: string, boardId: string) => `/buildings/${buildingId}/boards/${boardId}`,
    CARDS: (buildingId: string, boardId: string) =>
      `/buildings/${buildingId}/boards/${boardId}/cards`,
    CARD_DETAIL: (buildingId: string, boardId: string, cardId: string) =>
      `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}`,
    CARD_MOVE: (buildingId: string, boardId: string, cardId: string) =>
      `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}/move`,
    CARD_RESTORE: (buildingId: string, boardId: string, cardId: string) =>
      `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}/restore`,
  },

  // ── Maintenance Logs ─────────────────────────────────────────────────
  MAINTENANCE_LOGS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/maintenance-logs`,
    DETAIL: (buildingId: string, maintenanceLogId: string) =>
      `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}`,
    RESTORE: (buildingId: string, maintenanceLogId: string) =>
      `/buildings/${buildingId}/maintenance-logs/${maintenanceLogId}/restore`,
  },

  // ── Entity Links ─────────────────────────────────────────────────────
  LINKS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/links`,
    CREATE: (buildingId: string) => `/buildings/${buildingId}/links`,
    DELETE: (buildingId: string) => `/buildings/${buildingId}/links`,
    COUNTS: (buildingId: string) => `/buildings/${buildingId}/links/counts`,
  },

  // ── Documents / Files ────────────────────────────────────────────────
  FILES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/files`,
    DETAIL: (buildingId: string, documentId: string) =>
      `/buildings/${buildingId}/files/${documentId}`,
    RESTORE: (buildingId: string, documentId: string) =>
      `/buildings/${buildingId}/files/${documentId}/restore`,
    STORAGE_USAGE: (buildingId: string) => `/buildings/${buildingId}/files/storage-usage`,
  },

  // ── Comments ─────────────────────────────────────────────────────────
  COMMENTS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/comments`,
    DETAIL: (buildingId: string, commentId: string) =>
      `/buildings/${buildingId}/comments/${commentId}`,
  },

  // ── FAQs ──────────────────────────────────────────────────────────────
  FAQS: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/faqs`,
    DETAIL: (buildingId: string, faqId: string) => `/buildings/${buildingId}/faqs/${faqId}`,
    RESTORE: (buildingId: string, faqId: string) =>
      `/buildings/${buildingId}/faqs/${faqId}/restore`,
    REORDER: (buildingId: string) => `/buildings/${buildingId}/faqs/reorder`,
    COPY: (targetBuildingId: string) => `/buildings/${targetBuildingId}/faqs/copy`,
  },

  // ── Funds ─────────────────────────────────────────────────────────────
  FUNDS: {
    BALANCE: (buildingId: string) => `/buildings/${buildingId}/funds`,
    RECALCULATE: (buildingId: string) => `/buildings/${buildingId}/funds/recalculate`,
    SUMMARY: (buildingId: string) => `/buildings/${buildingId}/funds/summary`,
    GRAPH: (buildingId: string) => `/buildings/${buildingId}/funds/graph`,
    INCOME: (buildingId: string) => `/buildings/${buildingId}/income`,
    INCOME_DETAIL: (buildingId: string, incomeId: string) =>
      `/buildings/${buildingId}/income/${incomeId}`,
    INCOME_RESTORE: (buildingId: string, incomeId: string) =>
      `/buildings/${buildingId}/income/${incomeId}/restore`,
    EXPENSES: (buildingId: string) => `/buildings/${buildingId}/expenses`,
    EXPENSE_DETAIL: (buildingId: string, expenseId: string) =>
      `/buildings/${buildingId}/expenses/${expenseId}`,
    IMPORT_CAMT: (buildingId: string) => `/buildings/${buildingId}/funds/import/camt`,
    BUILDING_FUNDS_LEDGER: (buildingId: string) =>
      `/buildings/${buildingId}/funds/building-funds-ledger`,
    INVOICES: (buildingId: string) => `/buildings/${buildingId}/funds/invoices`,
    /** @deprecated Phantom route — no backend endpoint exists (the mobile recurring-templates feature 404s). Will be removed in v0.60.0. */
    RECURRING_TEMPLATES: (buildingId: string) => `/buildings/${buildingId}/recurring-templates`,
    /** @deprecated Phantom route — no backend endpoint exists. Will be removed in v0.60.0. */
    RECURRING_TEMPLATE_DETAIL: (buildingId: string, templateId: string) =>
      `/buildings/${buildingId}/recurring-templates/${templateId}`,
    /** @deprecated Phantom route — no backend endpoint exists. Will be removed in v0.60.0. */
    RECURRING_TEMPLATE_RESTORE: (buildingId: string, templateId: string) =>
      `/buildings/${buildingId}/recurring-templates/${templateId}/restore`,
  },

  // ── Transaction Categories ───────────────────────────────────────────
  TRANSACTION_CATEGORIES: {
    LIST: (buildingId: string) => `/buildings/${buildingId}/transaction-categories`,
    DETAIL: (buildingId: string, id: string) =>
      `/buildings/${buildingId}/transaction-categories/${id}`,
    RESTORE: (buildingId: string, id: string) =>
      `/buildings/${buildingId}/transaction-categories/${id}/restore`,
    COPY: (targetBuildingId: string) =>
      `/buildings/${targetBuildingId}/transaction-categories/copy`,
  },

  // ── Chat ──────────────────────────────────────────────────────────────
  CHAT: {
    CONVERSATIONS: (buildingId: string) => `/buildings/${buildingId}/conversations`,
    CONVERSATION: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}`,
    MESSAGES: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}/messages`,
    MARK_READ: (buildingId: string, conversationId: string) =>
      `/buildings/${buildingId}/conversations/${conversationId}/read`,
    UNREAD_COUNT: (buildingId: string) => `/buildings/${buildingId}/conversations/unread-count`,

    // Org-scoped chat (org members messaging each other; mirrors the building routes)
    ORG_CONVERSATIONS: (orgId: string) => `/organizations/${orgId}/conversations`,
    ORG_CONVERSATION: (orgId: string, conversationId: string) =>
      `/organizations/${orgId}/conversations/${conversationId}`,
    ORG_MESSAGES: (orgId: string, conversationId: string) =>
      `/organizations/${orgId}/conversations/${conversationId}/messages`,
    ORG_MARK_READ: (orgId: string, conversationId: string) =>
      `/organizations/${orgId}/conversations/${conversationId}/read`,
    ORG_UNREAD_COUNT: (orgId: string) => `/organizations/${orgId}/conversations/unread-count`,
  },

  // ── Notifications ────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: '/notifications',
    DETAIL: (notificationId: string) => `/notifications/${notificationId}`,
    PREFERENCES: '/notifications/preferences',
    UNREAD_COUNT: '/notifications/unread-count',
    UNREAD_COUNT_BY_CATEGORY: '/notifications/unread-count/by-category',
    READ: '/notifications/read',
    UNREAD: '/notifications/unread',
    READ_ALL: '/notifications/read-all',
    READ_CATEGORY: (category: string) => `/notifications/read-category/${category}`,
    READ_CHAT: (conversationId: string) => `/notifications/read-chat/${conversationId}`,
  },

  // ── Organizations ────────────────────────────────────────────────────
  ORGANIZATIONS: {
    BASE: '/organizations',
    MY: '/organizations/my',
    BY_ID: (orgId: string) => `/organizations/${orgId}`,
    BUILDINGS: (orgId: string) => `/organizations/${orgId}/buildings`,
    MEMBERS: (orgId: string) => `/organizations/${orgId}/members`,
    MEMBER_DETAIL: (orgId: string, memberId: string) =>
      `/organizations/${orgId}/members/${memberId}`,
    INVITE: (orgId: string) => `/organizations/${orgId}/invite`,
    INVITATIONS: (orgId: string) => `/organizations/${orgId}/invitations`,
    BUSINESS_PARTNERS: (orgId: string) => `/organizations/${orgId}/business-partners`,
    BUSINESS_PARTNER_DETAIL: (orgId: string, partnerId: string) =>
      `/organizations/${orgId}/business-partners/${partnerId}`,
    /** @deprecated Phantom route — no backend endpoint exists (org quotas were never implemented; see org-quota.schema.ts). Will be removed in v0.60.0. */
    QUOTAS: (orgId: string) => `/organizations/${orgId}/quotas`,
  },

  // ── Platform (admin) ─────────────────────────────────────────────────
  PLATFORM: {
    DASHBOARD_SUMMARY: '/platform/dashboard/summary',
    BUILDINGS: '/platform/buildings',
    USERS: '/platform/users',
    USER_DETAIL: (userId: string) => `/platform/users/${userId}`,
    MEMBERS: '/platform/members',
    MEMBER_DETAIL: (memberId: string) => `/platform/members/${memberId}`,
    ORGANIZATIONS: '/platform/organizations',
    ORGANIZATION_DETAIL: (orgId: string) => `/platform/organizations/${orgId}`,
    ORGANIZATION_MEMBERS: (orgId: string) => `/platform/organizations/${orgId}/members`,
    ORGANIZATION_BUILDINGS: (orgId: string) => `/platform/organizations/${orgId}/buildings`,
    SEARCH: '/platform/search',
    BLOG: '/platform/blog',
    BLOG_DETAIL: (id: string) => `/platform/blog/${id}`,
    BLOG_PUBLISH: (id: string) => `/platform/blog/${id}/publish`,
    BLOG_RESTORE: (id: string) => `/platform/blog/${id}/restore`,
    BLOG_COVER_IMAGE: (id: string) => `/platform/blog/${id}/cover-image`,
    BLOG_CATEGORIES: '/platform/blog/categories',
    ARCHIVE: '/platform/archive',
    ARCHIVE_CLEANUP: '/platform/archive/cleanup/run',
    ARCHIVE_RESTORE: (type: string, id: string) => `/platform/archive/${type}/${id}/restore`,
    ARCHIVE_PERMANENT: (type: string, id: string) => `/platform/archive/${type}/${id}/permanent`,
  },

  // ── Representatives ──────────────────────────────────────────────────
  REPRESENTATIVES: {
    DASHBOARD_SUMMARY: '/representatives/dashboard/summary',
    BUILDINGS: '/representatives/buildings',
    USERS: '/representatives/users',
  },

  // ── Addresses ────────────────────────────────────────────────────────
  ADDRESSES: {
    AUTOCOMPLETE: '/addresses/autocomplete',
    SEARCH: '/addresses/search',
    BY_STREET: (streetId: string) => `/addresses/by-street/${streetId}`,
  },

  // ── Subscriptions & Billing ──────────────────────────────────────────
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    PRICES: '/subscriptions/prices',
    INVOICE: '/subscriptions/invoice',
    MARK_PAID: (id: string) => `/subscriptions/invoices/${id}/mark-paid`,
  },
} as const;
