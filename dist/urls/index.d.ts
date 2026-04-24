/**
 * API Route Constants
 *
 * Centralized API endpoint definitions for use across frontend, mobile, and backend.
 */
declare const API_VERSION = "v1";
declare const API_ROUTES: {
    readonly AUTH: {
        readonly LOGIN: "/auth/login";
        readonly REGISTER: "/auth/register";
        readonly LOGOUT: "/auth/logout";
        readonly REFRESH_TOKEN: "/auth/refresh-token";
        readonly FORGOT_PASSWORD: "/auth/forgot-password";
        readonly RESET_PASSWORD: "/auth/reset-password";
        readonly VERIFY_OTP: "/auth/verify-otp";
        readonly UPDATE_USER: "/auth/update-user";
        readonly UPDATE_PASSWORD: "/auth/update-password";
    };
    readonly USERS: {
        readonly ME: "/users/me";
        readonly BY_ID: (userId: string) => string;
        readonly RESTORE: "/users/me/restore";
        readonly EXPORT: "/users/me/export";
        readonly LOCALE: "/users/me/locale";
        readonly PERMISSIONS: "/users/me/permissions";
        readonly PHONE_SEND_VERIFICATION: "/users/me/phone/send-verification";
        readonly PHONE_VERIFY: "/users/me/phone/verify";
        readonly BUILDING_CHAT_VISIBILITY: (buildingId: string) => string;
    };
    readonly BUILDINGS: {
        readonly BASE: "/buildings";
        readonly BY_ID: (id: string) => string;
        readonly SETTINGS: (id: string) => string;
        readonly USERS: (id: string) => string;
        readonly OTP: (id: string) => string;
        readonly GENERATE_OTP: "/buildings/generate-otp";
        readonly JOIN_WITH_OTP: "/buildings/join-with-otp";
        readonly PENDING: "/buildings/my/pending";
        readonly RECENT: (id: string) => string;
        readonly SEARCH: "/buildings/search";
        readonly BUILDING_SEARCH: (id: string) => string;
        readonly JOIN_REQUESTS: (id: string) => string;
        readonly JOIN_REQUEST_APPROVE: (id: string, requestId: string) => string;
        readonly JOIN_REQUEST_REJECT: (id: string, requestId: string) => string;
        readonly IMPORT_TEMPLATE: (id: string) => string;
        readonly IMPORT_PREVIEW: (id: string) => string;
        readonly IMPORT_COMMIT: (id: string) => string;
    };
    readonly APARTMENTS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, apartmentId: string) => string;
        readonly RESTORE: (buildingId: string, apartmentId: string) => string;
        readonly USERS: (buildingId: string, apartmentId: string) => string;
        readonly USER_DETAIL: (buildingId: string, apartmentId: string, userId: string) => string;
        readonly FLOORS: (buildingId: string) => string;
    };
    readonly GARAGES: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, garageId: string) => string;
        readonly RESTORE: (buildingId: string, garageId: string) => string;
        readonly USERS: (buildingId: string, garageId: string) => string;
        readonly USER_DETAIL: (buildingId: string, garageId: string, userId: string) => string;
        readonly FLOORS: (buildingId: string) => string;
    };
    readonly STORAGE_UNITS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, storageUnitId: string) => string;
        readonly RESTORE: (buildingId: string, storageUnitId: string) => string;
        readonly USERS: (buildingId: string, storageUnitId: string) => string;
        readonly USER_DETAIL: (buildingId: string, storageUnitId: string, userId: string) => string;
        readonly FLOORS: (buildingId: string) => string;
    };
    readonly UNIT_REMINDERS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, reminderId: string) => string;
    };
    readonly OWNERS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, ownerId: string) => string;
        readonly APARTMENT_ASSIGNMENTS: (buildingId: string, apartmentId: string) => string;
        readonly APARTMENT_ASSIGNMENT_DETAIL: (buildingId: string, apartmentId: string, ownerId: string) => string;
        readonly GARAGE_ASSIGNMENTS: (buildingId: string, garageId: string) => string;
        readonly GARAGE_ASSIGNMENT_DETAIL: (buildingId: string, garageId: string, ownerId: string) => string;
        readonly STORAGE_ASSIGNMENTS: (buildingId: string, storageUnitId: string) => string;
        readonly STORAGE_ASSIGNMENT_DETAIL: (buildingId: string, storageUnitId: string, ownerId: string) => string;
    };
    readonly UNITS: {
        readonly LIST: (buildingId: string) => string;
        readonly USER_UNITS: (buildingId: string) => string;
    };
    readonly NOTICES: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, noticeId: string) => string;
        readonly APPROVE: (buildingId: string, noticeId: string) => string;
        readonly RESTORE: (buildingId: string, noticeId: string) => string;
    };
    readonly POLLS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, pollId: string) => string;
        readonly APPROVE: (buildingId: string, pollId: string) => string;
        readonly RESTORE: (buildingId: string, pollId: string) => string;
        readonly VOTE: (buildingId: string, pollId: string) => string;
        readonly VOTERS: (buildingId: string, pollId: string) => string;
        readonly RESULTS: (buildingId: string) => string;
        readonly OFFLINE_VOTES: (buildingId: string, pollId: string) => string;
    };
    readonly EVENTS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, eventId: string) => string;
        readonly APPROVE: (buildingId: string, eventId: string) => string;
        readonly RESTORE: (buildingId: string, eventId: string) => string;
    };
    readonly FAILURE_REPORTS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, failureReportId: string) => string;
        readonly APPROVE: (buildingId: string, failureReportId: string) => string;
        readonly RESTORE: (buildingId: string, failureReportId: string) => string;
    };
    readonly MAINTENANCE_LOGS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, maintenanceLogId: string) => string;
        readonly RESTORE: (buildingId: string, maintenanceLogId: string) => string;
    };
    readonly FILES: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, documentId: string) => string;
        readonly RESTORE: (buildingId: string, documentId: string) => string;
        readonly STORAGE_USAGE: (buildingId: string) => string;
    };
    readonly COMMENTS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, commentId: string) => string;
    };
    readonly FAQS: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, faqId: string) => string;
        readonly RESTORE: (buildingId: string, faqId: string) => string;
        readonly REORDER: (buildingId: string) => string;
        readonly COPY: (targetBuildingId: string) => string;
    };
    readonly FUNDS: {
        readonly BALANCE: (buildingId: string) => string;
        readonly RECALCULATE: (buildingId: string) => string;
        readonly SUMMARY: (buildingId: string) => string;
        readonly GRAPH: (buildingId: string) => string;
        readonly INCOME: (buildingId: string) => string;
        readonly INCOME_DETAIL: (buildingId: string, incomeId: string) => string;
        readonly INCOME_RESTORE: (buildingId: string, incomeId: string) => string;
        readonly EXPENSES: (buildingId: string) => string;
        readonly EXPENSE_DETAIL: (buildingId: string, expenseId: string) => string;
        readonly IMPORT_CAMT: (buildingId: string) => string;
        readonly BUILDING_FUNDS_LEDGER: (buildingId: string) => string;
        readonly UPLATNICAS: (buildingId: string) => string;
        readonly RECURRING_TEMPLATES: (buildingId: string) => string;
        readonly RECURRING_TEMPLATE_DETAIL: (buildingId: string, templateId: string) => string;
        readonly RECURRING_TEMPLATE_RESTORE: (buildingId: string, templateId: string) => string;
    };
    readonly TRANSACTION_CATEGORIES: {
        readonly LIST: (buildingId: string) => string;
        readonly DETAIL: (buildingId: string, id: string) => string;
        readonly RESTORE: (buildingId: string, id: string) => string;
        readonly COPY: (targetBuildingId: string) => string;
    };
    readonly CHAT: {
        readonly CONVERSATIONS: (buildingId: string) => string;
        readonly CONVERSATION: (buildingId: string, conversationId: string) => string;
        readonly MESSAGES: (buildingId: string, conversationId: string) => string;
        readonly MARK_READ: (buildingId: string, conversationId: string) => string;
        readonly UNREAD_COUNT: (buildingId: string) => string;
    };
    readonly NOTIFICATIONS: {
        readonly LIST: "/notifications";
        readonly DETAIL: (notificationId: string) => string;
        readonly PREFERENCES: "/notifications/preferences";
        readonly UNREAD_COUNT: "/notifications/unread-count";
        readonly UNREAD_COUNT_BY_CATEGORY: "/notifications/unread-count/by-category";
        readonly READ: "/notifications/read";
        readonly READ_ALL: "/notifications/read-all";
        readonly READ_CATEGORY: (category: string) => string;
        readonly READ_CHAT: (conversationId: string) => string;
    };
    readonly ORGANIZATIONS: {
        readonly BASE: "/organizations";
        readonly MY: "/organizations/my";
        readonly BY_ID: (orgId: string) => string;
        readonly BUILDINGS: (orgId: string) => string;
        readonly MEMBERS: (orgId: string) => string;
        readonly MEMBER_DETAIL: (orgId: string, memberId: string) => string;
        readonly INVITE: (orgId: string) => string;
        readonly INVITATIONS: (orgId: string) => string;
        readonly BUSINESS_PARTNERS: (orgId: string) => string;
        readonly BUSINESS_PARTNER_DETAIL: (orgId: string, partnerId: string) => string;
    };
    readonly PLATFORM: {
        readonly DASHBOARD_SUMMARY: "/platform/dashboard/summary";
        readonly BUILDINGS: "/platform/buildings";
        readonly USERS: "/platform/users";
        readonly USER_DETAIL: (userId: string) => string;
        readonly MEMBERS: "/platform/members";
        readonly MEMBER_DETAIL: (memberId: string) => string;
        readonly ORGANIZATIONS: "/platform/organizations";
        readonly ORGANIZATION_DETAIL: (orgId: string) => string;
        readonly ORGANIZATION_MEMBERS: (orgId: string) => string;
        readonly ORGANIZATION_BUILDINGS: (orgId: string) => string;
        readonly SEARCH: "/platform/search";
        readonly BLOG: "/platform/blog";
        readonly BLOG_DETAIL: (id: string) => string;
        readonly BLOG_PUBLISH: (id: string) => string;
        readonly BLOG_RESTORE: (id: string) => string;
        readonly BLOG_COVER_IMAGE: (id: string) => string;
        readonly BLOG_CATEGORIES: "/platform/blog/categories";
        readonly ARCHIVE: "/platform/archive";
        readonly ARCHIVE_CLEANUP: "/platform/archive/cleanup/run";
        readonly ARCHIVE_RESTORE: (type: string, id: string) => string;
        readonly ARCHIVE_PERMANENT: (type: string, id: string) => string;
    };
    readonly REPRESENTATIVES: {
        readonly DASHBOARD_SUMMARY: "/representatives/dashboard/summary";
        readonly BUILDINGS: "/representatives/buildings";
        readonly USERS: "/representatives/users";
    };
    readonly ADDRESSES: {
        readonly AUTOCOMPLETE: "/addresses/autocomplete";
    };
    readonly SUBSCRIPTIONS: {
        readonly BASE: "/subscriptions";
        readonly PRICES: "/subscriptions/prices";
        readonly INVOICE: "/subscriptions/invoice";
        readonly MARK_PAID: (id: string) => string;
    };
};

export { API_ROUTES, API_VERSION };
