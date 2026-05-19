import { BuildingRole, PlatformRole, OrgRole, SCOPED_PERMISSIONS, APPROVE_PERMISSIONS, FailureStatus, Priority } from './chunk-5SW3ASZL.js';
import { isBackendErrorCode } from './chunk-DKJVFB3Z.js';
import { createPaginatedResponse } from './chunk-W3SU22LA.js';

// src/utils/locale.ts
var LOCALE_MAP = {
  hr: "hr-HR",
  de: "de-DE",
  en: "en-US"
};
var DEFAULT_LOCALE = "en-US";
function getDateLocale(appLocale) {
  if (!appLocale) return DEFAULT_LOCALE;
  return LOCALE_MAP[appLocale] ?? DEFAULT_LOCALE;
}
var DEFAULT_DATE_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric"
};
var DEFAULT_DATETIME_OPTIONS = {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
};
function formatDate(date, locale, options = DEFAULT_DATE_OPTIONS) {
  const dateObj = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(getDateLocale(locale), options).format(dateObj);
}
function formatDateTime(date, locale, options = DEFAULT_DATETIME_OPTIONS) {
  return formatDate(date, locale, options);
}
function formatCurrencyByLocale(amount, locale, currency = "EUR") {
  return new Intl.NumberFormat(getDateLocale(locale), {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// src/utils/pagination.ts
function normalizePaginatedResponse(input, fallbackLimit = 10) {
  if (Array.isArray(input)) {
    return createPaginatedResponse(input, input.length, 0, input.length);
  }
  if (input && typeof input === "object") {
    const response = input;
    const data = response.data ?? response.items ?? response.results ?? [];
    const limit = response.limit ?? response.pageSize ?? response.perPage ?? (Array.isArray(data) ? data.length : fallbackLimit);
    const count = response.count ?? response.total ?? response.totalCount ?? (Array.isArray(data) ? data.length : 0);
    const page = response.page ?? response.currentPage ?? (response.offset !== void 0 && limit ? Math.floor(response.offset / limit) + 1 : 1);
    const offset = response.offset !== void 0 ? response.offset : limit && page ? (page - 1) * limit : 0;
    return createPaginatedResponse(Array.isArray(data) ? data : [], count, offset, limit);
  }
  return createPaginatedResponse([], 0, 0, fallbackLimit);
}
function extractPaginatedItems(response, itemsKey) {
  if (Array.isArray(response)) {
    return response;
  }
  if (response && typeof response === "object") {
    const obj = response;
    if (itemsKey && Array.isArray(obj[itemsKey])) {
      return obj[itemsKey];
    }
    if (Array.isArray(obj.items)) return obj.items;
    if (Array.isArray(obj.data)) return obj.data;
    if (Array.isArray(obj.results)) return obj.results;
  }
  return [];
}
function calculatePaginationMeta(total, offset, limit) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;
  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  };
}

// src/utils/parse.ts
var ParseError = class extends Error {
  code = "RESPONSE_CONTRACT_DRIFT";
  issues;
  constructor(message, zodError) {
    super(message, { cause: zodError });
    this.name = "ParseError";
    this.issues = zodError.issues;
  }
};
var parseData = (schema, data, errorMessage = "Response failed schema validation") => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ParseError(errorMessage, result.error);
  }
  return result.data;
};

// src/utils/parse-error.ts
var readProp = (value, key) => {
  if (value !== null && typeof value === "object" && key in value) {
    return value[key];
  }
  return void 0;
};
var parseApiError = (error) => {
  const response = readProp(error, "response");
  const data = readProp(response, "data");
  const rawCode = readProp(data, "code");
  const code = isBackendErrorCode(rawCode) ? rawCode : null;
  const dataMessage = readProp(data, "message");
  const errorMessage = readProp(error, "message");
  const message = typeof dataMessage === "string" && dataMessage.length > 0 && dataMessage || typeof errorMessage === "string" && errorMessage.length > 0 && errorMessage || "Unknown error";
  const rawStatus = readProp(response, "status");
  const status = typeof rawStatus === "number" ? rawStatus : null;
  return { code, message, status };
};

// src/utils/permission-evaluator.ts
function canDo(ctx, permission) {
  return ctx.permissions.includes(permission);
}
function canDoOnResource(ctx, domain, action, resourceOwnerId) {
  const scopedPerms = SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;
  if (ctx.permissions.includes(scopedPerms.any)) return true;
  return ctx.permissions.includes(scopedPerms.own) && resourceOwnerId === ctx.userId;
}
function computeActionFlags(ctx, domain, resourceOwnerId) {
  const approvePermission = APPROVE_PERMISSIONS[domain];
  return {
    canEdit: canDoOnResource(ctx, domain, "update", resourceOwnerId),
    canDelete: canDoOnResource(ctx, domain, "delete", resourceOwnerId),
    canApprove: approvePermission ? canDo(ctx, approvePermission) : false
  };
}
function getContextUserId(ctx) {
  return ctx.userId;
}

// src/utils/permissions.ts
function hasPermission(userPermissions, permission) {
  return userPermissions.includes(permission);
}
function hasAnyPermission(userPermissions, permissions) {
  return permissions.some((p) => userPermissions.includes(p));
}
function hasAllPermissions(userPermissions, permissions) {
  return permissions.every((p) => userPermissions.includes(p));
}

// src/utils/role-helpers.ts
var MANAGERIAL_BUILDING_ROLES = [
  BuildingRole.OWNER_REPRESENTATIVE,
  BuildingRole.DEPUTY_REPRESENTATIVE
];
function isManagerialRole(role) {
  return MANAGERIAL_BUILDING_ROLES.includes(role);
}
var ROLE_TRANSLATION_KEYS = {
  // Building roles
  [BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE",
  [BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE",
  [BuildingRole.CO_OWNER]: "roles.CO_OWNER",
  [BuildingRole.RESIDENT]: "roles.RESIDENT",
  // Org roles
  [OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN",
  [OrgRole.SUPERVISOR]: "roles.SUPERVISOR",
  [OrgRole.REFERENT]: "roles.REFERENT",
  [OrgRole.OPERATIVE]: "roles.OPERATIVE",
  // Platform roles
  [PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN",
  [PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR",
  [PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT",
  [PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE"
};
var ROLE_DESCRIPTION_KEYS = {
  [BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE_DESC",
  [BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE_DESC",
  [BuildingRole.CO_OWNER]: "roles.CO_OWNER_DESC",
  [BuildingRole.RESIDENT]: "roles.RESIDENT_DESC",
  [OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN_DESC",
  [OrgRole.SUPERVISOR]: "roles.SUPERVISOR_DESC",
  [OrgRole.REFERENT]: "roles.REFERENT_DESC",
  [OrgRole.OPERATIVE]: "roles.OPERATIVE_DESC",
  [PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN_DESC",
  [PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR_DESC",
  [PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT_DESC",
  [PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE_DESC"
};

// src/utils/status-variants.ts
function failureStatusVariant(status) {
  switch (status) {
    case FailureStatus.PENDING:
      return "info";
    case FailureStatus.IN_PROGRESS:
      return "warning";
    case FailureStatus.RESOLVED:
      return "success";
    default:
      return "neutral";
  }
}
function priorityVariant(priority) {
  switch (priority) {
    case Priority.URGENT:
      return "danger";
    case Priority.NORMAL:
      return "neutral";
    default:
      return "neutral";
  }
}

// src/utils/index.ts
function formatText(text) {
  return text.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
function formatCurrency(amount, locale = "en-EU", currency = "EUR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}
function getDateRange(filter) {
  const today = /* @__PURE__ */ new Date();
  const formatDate2 = (date) => date.toISOString().slice(0, 10);
  switch (filter) {
    case "today":
      return {
        fromDate: formatDate2(today),
        toDate: formatDate2(today)
      };
    case "yesterday": {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        fromDate: formatDate2(yesterday),
        toDate: formatDate2(yesterday)
      };
    }
    case "week": {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return {
        fromDate: formatDate2(weekAgo),
        toDate: formatDate2(today)
      };
    }
    case "month": {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return {
        fromDate: formatDate2(monthAgo),
        toDate: formatDate2(today)
      };
    }
  }
}
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export { LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatCurrencyByLocale, formatDate, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isManagerialRole, normalizePaginatedResponse, parseApiError, parseData, priorityVariant };
//# sourceMappingURL=chunk-FB7JURPY.js.map
//# sourceMappingURL=chunk-FB7JURPY.js.map