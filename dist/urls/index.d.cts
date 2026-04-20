/**
 * API Route Constants
 *
 * Centralized API endpoint definitions for use across frontend, mobile, and backend.
 *
 * TODO: Add API route constants from frontend/backend implementations:
 * - Auth routes (login, register, refresh-token, etc.)
 * - Building routes
 * - Notice, Poll, Event routes
 * - Maintenance, Failure report routes
 * - Financial routes
 * - Admin routes
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
    };
    readonly USERS: {
        readonly ME: "/users/me";
        readonly BUILDINGS: "/users/me/buildings";
    };
    readonly BUILDINGS: {
        readonly BASE: "/buildings";
        readonly BY_ID: (id: string) => string;
        readonly GENERATE_OTP: (id: string) => string;
        readonly JOIN_WITH_OTP: "/buildings/join-with-otp";
        readonly USERS: (id: string) => string;
    };
    readonly NOTICES: (buildingId: string) => string;
    readonly NOTICE: (buildingId: string, id: string) => string;
    readonly POLLS: (buildingId: string) => string;
    readonly POLL: (buildingId: string, id: string) => string;
    readonly EVENTS: (buildingId: string) => string;
    readonly EVENT: (buildingId: string, id: string) => string;
    readonly FAILURE_REPORTS: (buildingId: string) => string;
    readonly FAILURE_REPORT: (buildingId: string, id: string) => string;
    readonly MAINTENANCE_LOGS: (buildingId: string) => string;
    readonly MAINTENANCE_LOG: (buildingId: string, id: string) => string;
    readonly FUNDS: (buildingId: string) => string;
    readonly FUNDS_SUMMARY: (buildingId: string) => string;
    readonly DOCUMENTS: (buildingId: string) => string;
    readonly DOCUMENT: (buildingId: string, id: string) => string;
    readonly SUBSCRIPTIONS: {
        readonly BASE: "/subscriptions";
        readonly PRICES: "/subscriptions/prices";
        readonly INVOICE: "/subscriptions/invoice";
        readonly INVOICES: "/subscriptions/invoices";
        readonly INVOICE_BY_ID: (id: string) => string;
        readonly MARK_PAID: (id: string) => string;
    };
};

export { API_ROUTES, API_VERSION };
