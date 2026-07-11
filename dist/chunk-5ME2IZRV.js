import { BuildingRole, PlatformRole, OrgRole, ApartmentRole, SCOPED_PERMISSIONS, APPROVE_PERMISSIONS, FailureStatus, Priority } from './chunk-FU32KUV4.js';
import { isBackendErrorCode } from './chunk-Q2NQ6DCL.js';
import { createPaginatedResponse } from './chunk-E4FOXN63.js';

// src/utils/locale.ts
var LOCALE_MAP = {
  hr: "hr-HR",
  de: "de-DE",
  en: "en-US"
};
var DEFAULT_LOCALE = "en-US";
var KNOWN_BCP47 = new Set(Object.values(LOCALE_MAP));
function getDateLocale(appLocale) {
  if (!appLocale) return DEFAULT_LOCALE;
  if (LOCALE_MAP[appLocale]) return LOCALE_MAP[appLocale];
  if (KNOWN_BCP47.has(appLocale)) return appLocale;
  return DEFAULT_LOCALE;
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

// src/utils/currency.ts
function formatCurrencyEUR(amount, locale, currency = "EUR") {
  if (amount === void 0) return "-";
  const normalizedCurrency = currency === "\u20AC" ? "EUR" : currency;
  const rounded = Math.round(amount * 100) / 100;
  return formatCurrencyByLocale(rounded, locale, normalizedCurrency);
}

// src/utils/initials.ts
function getInitials(name) {
  return name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 2);
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
  // Apartment role surfaced by the web role picker (UI-only; persists as CO_OWNER)
  [ApartmentRole.TENANT]: "roles.TENANT",
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
  [ApartmentRole.TENANT]: "roles.TENANT_DESC",
  [OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN_DESC",
  [OrgRole.SUPERVISOR]: "roles.SUPERVISOR_DESC",
  [OrgRole.REFERENT]: "roles.REFERENT_DESC",
  [OrgRole.OPERATIVE]: "roles.OPERATIVE_DESC",
  [PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN_DESC",
  [PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR_DESC",
  [PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT_DESC",
  [PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE_DESC"
};
var ROLE_BADGE_COLORS = {
  // Building roles
  [BuildingRole.OWNER_REPRESENTATIVE]: "info",
  [BuildingRole.DEPUTY_REPRESENTATIVE]: "success",
  [BuildingRole.CO_OWNER]: "warning",
  [BuildingRole.RESIDENT]: "neutral",
  [ApartmentRole.TENANT]: "neutral",
  // Org roles
  [OrgRole.ORG_ADMIN]: "purple",
  [OrgRole.SUPERVISOR]: "info",
  [OrgRole.REFERENT]: "success",
  [OrgRole.OPERATIVE]: "amber",
  // Platform roles
  [PlatformRole.PLATFORM_ADMIN]: "purple",
  [PlatformRole.PLATFORM_MODERATOR]: "info",
  [PlatformRole.PLATFORM_SUPPORT]: "success",
  [PlatformRole.PLATFORM_OPERATIVE]: "amber"
};
function getRoleBadge(role) {
  const known = role;
  return {
    translationKey: ROLE_TRANSLATION_KEYS[known] ?? `roles.${role}`,
    color: ROLE_BADGE_COLORS[known] ?? "neutral"
  };
}

// src/utils/chat-eligibility.ts
function canMessageUser(callerIsManagerial, target) {
  if (callerIsManagerial) return true;
  const role = target.buildingRole?.roleType;
  if (!role) return false;
  if (isManagerialRole(role)) return true;
  return role === BuildingRole.CO_OWNER && target.buildingRole?.chatVisibleToCoOwners === true;
}
function getMessageableUsers(users, callerIsManagerial) {
  return users.filter((user) => canMessageUser(callerIsManagerial, user));
}

// src/utils/google-calendar.ts
function toGoogleUtc(value) {
  const date = value instanceof Date ? value : new Date(value);
  return `${date.toISOString().slice(0, 19).replace(/[-:]/g, "")}Z`;
}
var RRULE_FREQ = {
  weekly: "FREQ=WEEKLY",
  biweekly: "FREQ=WEEKLY;INTERVAL=2",
  monthly: "FREQ=MONTHLY",
  yearly: "FREQ=YEARLY"
};
function buildGoogleCalendarUrl(event) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toGoogleUtc(event.startDate)}/${toGoogleUtc(event.endDate)}`
  });
  const detailParts = [];
  if (event.description) detailParts.push(event.description);
  if (event.onlineMeetingUrl) detailParts.push(event.onlineMeetingUrl);
  if (detailParts.length > 0) {
    params.set("details", detailParts.join("\n\n"));
  }
  if (event.location) {
    params.set("location", event.location);
  }
  const freq = event.recurrenceType ? RRULE_FREQ[event.recurrenceType] : void 0;
  if (freq && !event.isRecurrenceInstance) {
    const until = event.recurrenceEndDate ? `;UNTIL=${toGoogleUtc(event.recurrenceEndDate)}` : "";
    params.set("recur", `RRULE:${freq}${until}`);
  }
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

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
function canDo(subject, permission) {
  return subject.permissions.includes(permission);
}
function canDoOnResource(subject, domain, action, resourceOwnerId) {
  const scopedPerms = SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;
  if (subject.permissions.includes(scopedPerms.any)) return true;
  return subject.permissions.includes(scopedPerms.own) && resourceOwnerId === subject.userId;
}
function computeActionFlags(subject, domain, resourceOwnerId) {
  const approvePermission = APPROVE_PERMISSIONS[domain];
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

// src/utils/voting-methods.ts
var VOTING_METHOD_SETTINGS = [
  "votingCertiliaEnabled",
  "votingPrintedSignatureEnabled"
];
function resolveVotingMethods(current, patch) {
  return {
    votingCertiliaEnabled: patch.votingCertiliaEnabled ?? current.votingCertiliaEnabled,
    votingPrintedSignatureEnabled: patch.votingPrintedSignatureEnabled ?? current.votingPrintedSignatureEnabled
  };
}
function violatesVotingMethodLock(current, patch) {
  const next = resolveVotingMethods(current, patch);
  return VOTING_METHOD_SETTINGS.every((field) => !next[field]);
}
function isLastEnabledVotingMethod(current, method) {
  if (!current[method]) return false;
  return VOTING_METHOD_SETTINGS.every((field) => field === method || !current[field]);
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

export { DATETIME_FORMATS, DATE_FORMATS, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_BADGE_COLORS, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, TIME_FORMATS, VOTING_METHOD_SETTINGS, buildGoogleCalendarUrl, calculatePaginationMeta, canDo, canDoOnResource, canMessageUser, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatAddress, formatCurrency, formatCurrencyByLocale, formatCurrencyEUR, formatDate, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, getInitials, getMessageableUsers, getRoleBadge, hasAllPermissions, hasAnyPermission, hasPermission, isLastEnabledVotingMethod, isManagerialRole, isValidHouseNumber, normalizeHouseNumber, normalizePaginatedResponse, parseApiError, parseData, parseHouseNumber, priorityVariant, resolveVotingMethods, violatesVotingMethodLock };
//# sourceMappingURL=chunk-5ME2IZRV.js.map
//# sourceMappingURL=chunk-5ME2IZRV.js.map