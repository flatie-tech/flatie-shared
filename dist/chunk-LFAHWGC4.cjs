'use strict';

var chunkOY3KKXHH_cjs = require('./chunk-OY3KKXHH.cjs');
var chunk6W5Z5YZC_cjs = require('./chunk-6W5Z5YZC.cjs');
var chunkOOJKTZT4_cjs = require('./chunk-OOJKTZT4.cjs');

// src/utils/house-number.ts
var HOUSE_NUMBER_PATTERN = /^\d{1,4}[A-Z]?(?:\/\d{1,3})?$|^BB$/;
function normalizeHouseNumber(raw) {
  if (!raw || !raw.trim()) return null;
  const normalized = raw.trim().toUpperCase().replace(/\s+/g, "").replace(/\s*\/\s*/g, "/");
  if (!HOUSE_NUMBER_PATTERN.test(normalized)) return null;
  return normalized;
}
function isValidHouseNumber(raw) {
  return normalizeHouseNumber(raw) !== null;
}
function parseHouseNumber(normalized) {
  if (normalized === "BB") return null;
  const match = normalized.match(/^(\d{1,4})([A-Z])?(?:\/(\d{1,3}))?$/);
  if (!match) return null;
  const result = { number: Number.parseInt(match[1], 10) };
  if (match[2]) result.letter = match[2];
  if (match[3]) result.subNumber = Number.parseInt(match[3], 10);
  return result;
}
function formatAddress(parts) {
  const streetPart = [parts.street, parts.houseNumber].filter(Boolean).join(" ");
  return `${streetPart}, ${parts.postalCode} ${parts.city}`;
}

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
var DATE_FORMATS = {
  SHORT: { day: "2-digit", month: "2-digit", year: "numeric" },
  MEDIUM: { day: "numeric", month: "short", year: "numeric" },
  LONG: { month: "long", day: "numeric", year: "numeric" },
  FULL: {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  },
  MONTH_YEAR: { month: "long", year: "numeric" },
  MONTH_SHORT: { month: "short" },
  WEEKDAY_DAY_MONTH: {
    weekday: "long",
    day: "2-digit",
    month: "2-digit"
  }
};
var TIME_FORMATS = {
  SHORT: { hour: "numeric", minute: "2-digit" }
};
var DATETIME_FORMATS = {
  SHORT: {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  },
  FULL: {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }
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
    return chunkOOJKTZT4_cjs.createPaginatedResponse(input, input.length, 0, input.length);
  }
  if (input && typeof input === "object") {
    const response = input;
    const data = response.data ?? response.items ?? response.results ?? [];
    const limit = response.limit ?? response.pageSize ?? response.perPage ?? (Array.isArray(data) ? data.length : fallbackLimit);
    const count = response.count ?? response.total ?? response.totalCount ?? (Array.isArray(data) ? data.length : 0);
    const page = response.page ?? response.currentPage ?? (response.offset !== void 0 && limit ? Math.floor(response.offset / limit) + 1 : 1);
    const offset = response.offset !== void 0 ? response.offset : limit && page ? (page - 1) * limit : 0;
    return chunkOOJKTZT4_cjs.createPaginatedResponse(Array.isArray(data) ? data : [], count, offset, limit);
  }
  return chunkOOJKTZT4_cjs.createPaginatedResponse([], 0, 0, fallbackLimit);
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
  const code = chunk6W5Z5YZC_cjs.isBackendErrorCode(rawCode) ? rawCode : null;
  const dataMessage = readProp(data, "message");
  const errorMessage = readProp(error, "message");
  const message = typeof dataMessage === "string" && dataMessage.length > 0 && dataMessage || typeof errorMessage === "string" && errorMessage.length > 0 && errorMessage || "Unknown error";
  const rawStatus = readProp(response, "status");
  const status = typeof rawStatus === "number" ? rawStatus : null;
  return { code, message, status };
};

// src/utils/permission-evaluator.ts
function canDo(subject, permission) {
  return subject.permissions.includes(permission);
}
function canDoOnResource(subject, domain, action, resourceOwnerId) {
  const scopedPerms = chunkOY3KKXHH_cjs.SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;
  if (subject.permissions.includes(scopedPerms.any)) return true;
  return subject.permissions.includes(scopedPerms.own) && resourceOwnerId === subject.userId;
}
function computeActionFlags(subject, domain, resourceOwnerId) {
  const approvePermission = chunkOY3KKXHH_cjs.APPROVE_PERMISSIONS[domain];
  return {
    canEdit: canDoOnResource(subject, domain, "update", resourceOwnerId),
    canDelete: canDoOnResource(subject, domain, "delete", resourceOwnerId),
    canApprove: approvePermission ? canDo(subject, approvePermission) : false,
    isOwner: subject.userId === resourceOwnerId
  };
}
function getContextUserId(subject) {
  return subject.userId;
}

// src/utils/permission-checker.ts
var EMPTY_ACTION_FLAGS = {
  canEdit: false,
  canDelete: false,
  canApprove: false,
  isOwner: false
};
function createPermissionChecker(subject) {
  const perms = subject?.permissions ?? [];
  return {
    can: (permission) => perms.includes(permission),
    canAny: (permissions) => permissions.some((p) => perms.includes(p)),
    canAll: (permissions) => permissions.every((p) => perms.includes(p)),
    canOnResource: (domain, action, resourceOwnerId) => subject ? canDoOnResource(subject, domain, action, resourceOwnerId ?? "") : false,
    actionFlags: (domain, resourceOwnerId) => subject ? computeActionFlags(subject, domain, resourceOwnerId ?? "") : EMPTY_ACTION_FLAGS
  };
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
  chunkOY3KKXHH_cjs.BuildingRole.OWNER_REPRESENTATIVE,
  chunkOY3KKXHH_cjs.BuildingRole.DEPUTY_REPRESENTATIVE
];
function isManagerialRole(role) {
  return MANAGERIAL_BUILDING_ROLES.includes(role);
}
var ROLE_TRANSLATION_KEYS = {
  // Building roles
  [chunkOY3KKXHH_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE",
  [chunkOY3KKXHH_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE",
  [chunkOY3KKXHH_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER",
  [chunkOY3KKXHH_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT",
  // Org roles
  [chunkOY3KKXHH_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN",
  [chunkOY3KKXHH_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR",
  [chunkOY3KKXHH_cjs.OrgRole.REFERENT]: "roles.REFERENT",
  [chunkOY3KKXHH_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE",
  // Platform roles
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE"
};
var ROLE_DESCRIPTION_KEYS = {
  [chunkOY3KKXHH_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE_DESC",
  [chunkOY3KKXHH_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE_DESC",
  [chunkOY3KKXHH_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER_DESC",
  [chunkOY3KKXHH_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT_DESC",
  [chunkOY3KKXHH_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN_DESC",
  [chunkOY3KKXHH_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR_DESC",
  [chunkOY3KKXHH_cjs.OrgRole.REFERENT]: "roles.REFERENT_DESC",
  [chunkOY3KKXHH_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE_DESC",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN_DESC",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR_DESC",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT_DESC",
  [chunkOY3KKXHH_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE_DESC"
};

// src/utils/status-variants.ts
function failureStatusVariant(status) {
  switch (status) {
    case chunkOY3KKXHH_cjs.FailureStatus.PENDING:
      return "info";
    case chunkOY3KKXHH_cjs.FailureStatus.IN_PROGRESS:
      return "warning";
    case chunkOY3KKXHH_cjs.FailureStatus.RESOLVED:
      return "success";
    default:
      return "neutral";
  }
}
function priorityVariant(priority) {
  switch (priority) {
    case chunkOY3KKXHH_cjs.Priority.URGENT:
      return "danger";
    case chunkOY3KKXHH_cjs.Priority.NORMAL:
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

exports.DATETIME_FORMATS = DATETIME_FORMATS;
exports.DATE_FORMATS = DATE_FORMATS;
exports.LOCALE_MAP = LOCALE_MAP;
exports.MANAGERIAL_BUILDING_ROLES = MANAGERIAL_BUILDING_ROLES;
exports.ParseError = ParseError;
exports.ROLE_DESCRIPTION_KEYS = ROLE_DESCRIPTION_KEYS;
exports.ROLE_TRANSLATION_KEYS = ROLE_TRANSLATION_KEYS;
exports.TIME_FORMATS = TIME_FORMATS;
exports.calculatePaginationMeta = calculatePaginationMeta;
exports.canDo = canDo;
exports.canDoOnResource = canDoOnResource;
exports.computeActionFlags = computeActionFlags;
exports.createPermissionChecker = createPermissionChecker;
exports.debounce = debounce;
exports.extractPaginatedItems = extractPaginatedItems;
exports.failureStatusVariant = failureStatusVariant;
exports.formatAddress = formatAddress;
exports.formatCurrency = formatCurrency;
exports.formatCurrencyByLocale = formatCurrencyByLocale;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatText = formatText;
exports.getContextUserId = getContextUserId;
exports.getDateLocale = getDateLocale;
exports.getDateRange = getDateRange;
exports.hasAllPermissions = hasAllPermissions;
exports.hasAnyPermission = hasAnyPermission;
exports.hasPermission = hasPermission;
exports.isManagerialRole = isManagerialRole;
exports.isValidHouseNumber = isValidHouseNumber;
exports.normalizeHouseNumber = normalizeHouseNumber;
exports.normalizePaginatedResponse = normalizePaginatedResponse;
exports.parseApiError = parseApiError;
exports.parseData = parseData;
exports.parseHouseNumber = parseHouseNumber;
exports.priorityVariant = priorityVariant;
//# sourceMappingURL=chunk-LFAHWGC4.cjs.map
//# sourceMappingURL=chunk-LFAHWGC4.cjs.map