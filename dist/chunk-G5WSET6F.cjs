'use strict';

// src/urls/index.ts
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
    CHANGE_PASSWORD: "/auth/change-password"
  },
  // ── Users ─────────────────────────────────────────────────────────────
  USERS: {
    ME: "/users/me",
    BY_ID: (userId) => `/users/${userId}`,
    RESTORE: "/users/me/restore",
    EXPORT: "/users/me/export",
    LOCALE: "/users/me/locale",
    PERMISSIONS: "/users/me/permissions",
    BUILDING_CHAT_VISIBILITY: (buildingId) => `/users/me/buildings/${buildingId}/chat-visibility`
  },
  // ── ID Card Verification ──────────────────────────────────────────────
  ID_CARD_VERIFICATION: {
    SUBMIT: "/users/me/id-card-verification",
    STATUS: "/users/me/id-card-verification",
    PENDING: (buildingId) => `/buildings/${buildingId}/id-card-verifications/pending`,
    APPROVE: (buildingId, verificationId) => `/buildings/${buildingId}/id-card-verifications/${verificationId}/approve`,
    REJECT: (buildingId, verificationId) => `/buildings/${buildingId}/id-card-verifications/${verificationId}/reject`
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
    CHECK_ADDRESS: "/buildings/check-address",
    BUILDING_SEARCH: (id) => `/buildings/${id}/search`,
    JOIN_REQUESTS: (id) => `/buildings/${id}/join-requests`,
    JOIN_REQUEST_APPROVE: (id, requestId) => `/buildings/${id}/join-requests/${requestId}/approve`,
    JOIN_REQUEST_REJECT: (id, requestId) => `/buildings/${id}/join-requests/${requestId}/reject`,
    IMPORT_TEMPLATE: (id) => `/buildings/${id}/import/template`,
    IMPORT_PREVIEW: (id) => `/buildings/${id}/import/preview`,
    IMPORT_AI_PREVIEW: (id) => `/buildings/${id}/import/ai-preview`,
    IMPORT_RESTAGE: (id) => `/buildings/${id}/import/restage`,
    IMPORT_COMMIT: (id) => `/buildings/${id}/import/commit`,
    AI_USAGE: (id) => `/buildings/${id}/ai-usage`
  },
  // ── Units (unified: apartment | garage | storage_unit) ──────────────
  UNITS: {
    LIST: (buildingId) => `/buildings/${buildingId}/units`,
    DETAIL: (buildingId, unitId) => `/buildings/${buildingId}/units/${unitId}`,
    RESTORE: (buildingId, unitId) => `/buildings/${buildingId}/units/${unitId}/restore`,
    FLOORS: (buildingId) => `/buildings/${buildingId}/units/floors`,
    USER_UNITS: (buildingId) => `/users/me/buildings/${buildingId}/units`
  },
  // ── Owners (building-scoped, user-link optional) ────────────────────
  OWNERS: {
    LIST: (buildingId) => `/buildings/${buildingId}/owners`,
    /** Building-wide current owner↔unit assignments (owners board aggregate). */
    BUILDING_ASSIGNMENTS: (buildingId) => `/buildings/${buildingId}/owner-assignments`,
    DETAIL: (buildingId, ownerId) => `/buildings/${buildingId}/owners/${ownerId}`,
    UNIT_ASSIGNMENTS: (buildingId, unitId) => `/buildings/${buildingId}/units/${unitId}/owners`,
    UNIT_ASSIGNMENT_DETAIL: (buildingId, unitId, ownerId) => `/buildings/${buildingId}/units/${unitId}/owners/${ownerId}`,
    INVITE: (buildingId, ownerId) => `/buildings/${buildingId}/owners/${ownerId}/invite`
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
    OFFLINE_VOTES: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/offline-votes`,
    ELIGIBLE_VOTERS: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/eligible-voters`,
    SIGNATURE_SHEET_PDF: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/signature-sheet.pdf`,
    SIGNATURE_BALLOT_PDF: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/signature-ballot.pdf`,
    SIGNATURE_VOTE: (buildingId, pollId) => `/buildings/${buildingId}/polls/${pollId}/signature-vote`,
    PENDING_SIGNATURES: (buildingId) => `/buildings/${buildingId}/poll-votes/pending-signatures`,
    APPROVE_SIGNATURE: (buildingId, voteId) => `/buildings/${buildingId}/poll-votes/${voteId}/approve-signature`,
    REJECT_SIGNATURE: (buildingId, voteId) => `/buildings/${buildingId}/poll-votes/${voteId}/reject-signature`
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
  // ── Boards (Kanban) ──────────────────────────────────────────────────
  BOARDS: {
    LIST: (buildingId) => `/buildings/${buildingId}/boards`,
    DETAIL: (buildingId, boardId) => `/buildings/${buildingId}/boards/${boardId}`,
    COLUMNS: (buildingId, boardId) => `/buildings/${buildingId}/boards/${boardId}/columns`,
    COLUMN_DETAIL: (buildingId, boardId, columnId) => `/buildings/${buildingId}/boards/${boardId}/columns/${columnId}`,
    COLUMNS_REORDER: (buildingId, boardId) => `/buildings/${buildingId}/boards/${boardId}/columns/reorder`,
    CARDS: (buildingId, boardId) => `/buildings/${buildingId}/boards/${boardId}/cards`,
    CARD_DETAIL: (buildingId, boardId, cardId) => `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}`,
    CARD_MOVE: (buildingId, boardId, cardId) => `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}/move`,
    CARD_RESTORE: (buildingId, boardId, cardId) => `/buildings/${buildingId}/boards/${boardId}/cards/${cardId}/restore`
  },
  // ── Entity Links ─────────────────────────────────────────────────────
  LINKS: {
    LIST: (buildingId) => `/buildings/${buildingId}/links`,
    CREATE: (buildingId) => `/buildings/${buildingId}/links`,
    DELETE: (buildingId) => `/buildings/${buildingId}/links`,
    COUNTS: (buildingId) => `/buildings/${buildingId}/links/counts`
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
    EXPENSES: (buildingId) => `/buildings/${buildingId}/expenses`,
    EXPENSE_DETAIL: (buildingId, expenseId) => `/buildings/${buildingId}/expenses/${expenseId}`,
    IMPORT_CAMT: (buildingId) => `/buildings/${buildingId}/funds/import/camt`,
    BUILDING_FUNDS_LEDGER: (buildingId) => `/buildings/${buildingId}/funds/building-funds-ledger`,
    INVOICES: (buildingId) => `/buildings/${buildingId}/funds/invoices`
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
    UNREAD_COUNT: (buildingId) => `/buildings/${buildingId}/conversations/unread-count`,
    // Org-scoped chat (org members messaging each other; mirrors the building routes)
    ORG_CONVERSATIONS: (orgId) => `/organizations/${orgId}/conversations`,
    ORG_CONVERSATION: (orgId, conversationId) => `/organizations/${orgId}/conversations/${conversationId}`,
    ORG_MESSAGES: (orgId, conversationId) => `/organizations/${orgId}/conversations/${conversationId}/messages`,
    ORG_MARK_READ: (orgId, conversationId) => `/organizations/${orgId}/conversations/${conversationId}/read`,
    ORG_UNREAD_COUNT: (orgId) => `/organizations/${orgId}/conversations/unread-count`
  },
  // ── Notifications ────────────────────────────────────────────────────
  NOTIFICATIONS: {
    LIST: "/notifications",
    DETAIL: (notificationId) => `/notifications/${notificationId}`,
    PREFERENCES: "/notifications/preferences",
    UNREAD_COUNT: "/notifications/unread-count",
    UNREAD_COUNT_BY_CATEGORY: "/notifications/unread-count/by-category",
    READ: "/notifications/read",
    UNREAD: "/notifications/unread",
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
    INVITATIONS: (orgId) => `/organizations/${orgId}/invitations`,
    INVITATION_RESEND: (orgId, invitationId) => `/organizations/${orgId}/invitations/${invitationId}/resend`,
    // Token-scoped invitation endpoints (public lookup / authenticated accept).
    INVITATION_BY_TOKEN: (token) => `/organizations/invitations/${token}`,
    INVITATION_ACCEPT: (token) => `/organizations/invitations/${token}/accept`,
    BROADCASTS: (orgId) => `/organizations/${orgId}/broadcasts`,
    BUILDING_CONTRACT: (orgId, buildingId) => `/organizations/${orgId}/buildings/${buildingId}`,
    DASHBOARD_ATTENTION: (orgId) => `/organizations/${orgId}/dashboard/attention`,
    BUSINESS_PARTNERS: (orgId) => `/organizations/${orgId}/business-partners`,
    BUSINESS_PARTNER_DETAIL: (orgId, partnerId) => `/organizations/${orgId}/business-partners/${partnerId}`
  },
  // ── Platform (admin) ─────────────────────────────────────────────────
  /** Lightweight platform feature-flag map for clients (nav/widget visibility). */
  FEATURE_FLAGS: "/feature-flags",
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
    FEATURES: "/platform/features",
    FEATURE_DETAIL: (key) => `/platform/features/${key}`,
    ARCHIVE: "/platform/archive",
    ARCHIVE_CLEANUP: "/platform/archive/cleanup/run",
    ARCHIVE_RESTORE: (type, id) => `/platform/archive/${type}/${id}/restore`,
    ARCHIVE_PERMANENT: (type, id) => `/platform/archive/${type}/${id}/permanent`,
    INVOICES: "/platform/invoices",
    INVOICE_MARK_PAID: (id) => `/platform/invoices/${id}/mark-paid`,
    INVOICE_CANCEL: (id) => `/platform/invoices/${id}/cancel`,
    INVOICE_RESEND_ERACUN: (id) => `/platform/invoices/${id}/resend-eracun`,
    AUDIT_LOGS: "/platform/audit-logs",
    SUBSCRIPTIONS: "/platform/subscriptions",
    SUBSCRIPTION_DETAIL: (id) => `/platform/subscriptions/${id}`,
    ENTERPRISE_REQUESTS: "/platform/enterprise-requests",
    ENTERPRISE_REQUEST_DETAIL: (id) => `/platform/enterprise-requests/${id}`,
    DASHBOARD_REVENUE: "/platform/dashboard/revenue",
    DSAR: "/platform/dsar",
    DSAR_DETAIL: (id) => `/platform/dsar/${id}`,
    DSAR_EVENTS: (id) => `/platform/dsar/${id}/events`,
    DSAR_EXPORT: (id) => `/platform/dsar/${id}/export`,
    DSAR_RESTRICTION: (id) => `/platform/dsar/${id}/restriction`,
    DSAR_ERASURE: (id) => `/platform/dsar/${id}/erasure`,
    DSAR_RECTIFICATION: (id) => `/platform/dsar/${id}/rectification`
  },
  // ── Representatives ──────────────────────────────────────────────────
  REPRESENTATIVES: {
    DASHBOARD_SUMMARY: "/representatives/dashboard/summary",
    BUILDINGS: "/representatives/buildings",
    USERS: "/representatives/users"
  },
  // ── Addresses ────────────────────────────────────────────────────────
  ADDRESSES: {
    AUTOCOMPLETE: "/addresses/autocomplete",
    SEARCH: "/addresses/search",
    BY_STREET: (streetId) => `/addresses/by-street/${streetId}`
  },
  // ── Subscriptions & Billing ──────────────────────────────────────────
  SUBSCRIPTIONS: {
    BASE: "/subscriptions",
    PRICES: "/subscriptions/prices",
    INVOICE: "/subscriptions/invoice"
    // MARK_PAID removed in v0.92.0 — the duplicate `/subscriptions/invoices/:id/mark-paid`
    // route had zero consumers (verified across backend/frontend/mobile) and skipped the
    // audit log its `/platform/invoices/:id/mark-paid` twin writes. Use PLATFORM.INVOICE_MARK_PAID.
  }
};

exports.API_ROUTES = API_ROUTES;
//# sourceMappingURL=chunk-G5WSET6F.cjs.map
//# sourceMappingURL=chunk-G5WSET6F.cjs.map