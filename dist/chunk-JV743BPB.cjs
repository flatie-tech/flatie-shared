'use strict';

// src/urls/index.ts
var API_VERSION = "v1";
var API_ROUTES = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH_TOKEN: "/auth/refresh-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_OTP: "/auth/verify-otp"
  },
  // Users
  USERS: {
    ME: "/users/me",
    BUILDINGS: "/users/me/buildings"
  },
  // Buildings
  BUILDINGS: {
    BASE: "/buildings",
    BY_ID: (id) => `/buildings/${id}`,
    GENERATE_OTP: (id) => `/buildings/${id}/otp`,
    JOIN_WITH_OTP: "/buildings/join-with-otp",
    USERS: (id) => `/buildings/${id}/users`
  },
  // Building-scoped resources
  NOTICES: (buildingId) => `/buildings/${buildingId}/notices`,
  NOTICE: (buildingId, id) => `/buildings/${buildingId}/notices/${id}`,
  POLLS: (buildingId) => `/buildings/${buildingId}/polls`,
  POLL: (buildingId, id) => `/buildings/${buildingId}/polls/${id}`,
  EVENTS: (buildingId) => `/buildings/${buildingId}/events`,
  EVENT: (buildingId, id) => `/buildings/${buildingId}/events/${id}`,
  FAILURE_REPORTS: (buildingId) => `/buildings/${buildingId}/failure-reports`,
  FAILURE_REPORT: (buildingId, id) => `/buildings/${buildingId}/failure-reports/${id}`,
  MAINTENANCE_LOGS: (buildingId) => `/buildings/${buildingId}/maintenance-logs`,
  MAINTENANCE_LOG: (buildingId, id) => `/buildings/${buildingId}/maintenance-logs/${id}`,
  FUNDS: (buildingId) => `/buildings/${buildingId}/funds`,
  FUNDS_SUMMARY: (buildingId) => `/buildings/${buildingId}/funds/summary`,
  DOCUMENTS: (buildingId) => `/buildings/${buildingId}/documents`,
  DOCUMENT: (buildingId, id) => `/buildings/${buildingId}/documents/${id}`
};

exports.API_ROUTES = API_ROUTES;
exports.API_VERSION = API_VERSION;
//# sourceMappingURL=chunk-JV743BPB.cjs.map
//# sourceMappingURL=chunk-JV743BPB.cjs.map