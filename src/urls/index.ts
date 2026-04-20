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

// Placeholder - API routes will be added here
export const API_VERSION = 'v1';

export const API_ROUTES = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh-token',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_OTP: '/auth/verify-otp',
  },

  // Users
  USERS: {
    ME: '/users/me',
    BUILDINGS: '/users/me/buildings',
  },

  // Buildings
  BUILDINGS: {
    BASE: '/buildings',
    BY_ID: (id: string) => `/buildings/${id}`,
    GENERATE_OTP: (id: string) => `/buildings/${id}/otp`,
    JOIN_WITH_OTP: '/buildings/join-with-otp',
    USERS: (id: string) => `/buildings/${id}/users`,
  },

  // Building-scoped resources
  NOTICES: (buildingId: string) => `/buildings/${buildingId}/notices`,
  NOTICE: (buildingId: string, id: string) => `/buildings/${buildingId}/notices/${id}`,

  POLLS: (buildingId: string) => `/buildings/${buildingId}/polls`,
  POLL: (buildingId: string, id: string) => `/buildings/${buildingId}/polls/${id}`,

  EVENTS: (buildingId: string) => `/buildings/${buildingId}/events`,
  EVENT: (buildingId: string, id: string) => `/buildings/${buildingId}/events/${id}`,

  FAILURE_REPORTS: (buildingId: string) => `/buildings/${buildingId}/failure-reports`,
  FAILURE_REPORT: (buildingId: string, id: string) =>
    `/buildings/${buildingId}/failure-reports/${id}`,

  MAINTENANCE_LOGS: (buildingId: string) => `/buildings/${buildingId}/maintenance-logs`,
  MAINTENANCE_LOG: (buildingId: string, id: string) =>
    `/buildings/${buildingId}/maintenance-logs/${id}`,

  FUNDS: (buildingId: string) => `/buildings/${buildingId}/funds`,
  FUNDS_SUMMARY: (buildingId: string) => `/buildings/${buildingId}/funds/summary`,

  DOCUMENTS: (buildingId: string) => `/buildings/${buildingId}/documents`,
  DOCUMENT: (buildingId: string, id: string) => `/buildings/${buildingId}/documents/${id}`,

  // Subscriptions & Billing
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    PRICES: '/subscriptions/prices',
    INVOICE: '/subscriptions/invoice',
    INVOICES: '/subscriptions/invoices',
    INVOICE_BY_ID: (id: string) => `/subscriptions/invoices/${id}`,
    MARK_PAID: (id: string) => `/subscriptions/invoices/${id}/mark-paid`,
  },
} as const;
