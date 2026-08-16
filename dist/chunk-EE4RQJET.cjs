'use strict';

var chunkI2YOJMQL_cjs = require('./chunk-I2YOJMQL.cjs');
var chunkXOQU25DL_cjs = require('./chunk-XOQU25DL.cjs');
var chunkQKHLAIRE_cjs = require('./chunk-QKHLAIRE.cjs');

// src/utils/role-helpers.ts
var MANAGERIAL_BUILDING_ROLES = [
  chunkI2YOJMQL_cjs.BuildingRole.OWNER_REPRESENTATIVE,
  chunkI2YOJMQL_cjs.BuildingRole.DEPUTY_REPRESENTATIVE
];
function isManagerialRole(role) {
  return MANAGERIAL_BUILDING_ROLES.includes(role);
}
var ROLE_TRANSLATION_KEYS = {
  // Building roles
  [chunkI2YOJMQL_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE",
  [chunkI2YOJMQL_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE",
  [chunkI2YOJMQL_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER",
  [chunkI2YOJMQL_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT",
  // Org roles
  [chunkI2YOJMQL_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN",
  [chunkI2YOJMQL_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR",
  [chunkI2YOJMQL_cjs.OrgRole.REFERENT]: "roles.REFERENT",
  [chunkI2YOJMQL_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE",
  // Platform roles
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE"
};
var ROLE_DESCRIPTION_KEYS = {
  [chunkI2YOJMQL_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE_DESC",
  [chunkI2YOJMQL_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE_DESC",
  [chunkI2YOJMQL_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER_DESC",
  [chunkI2YOJMQL_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT_DESC",
  [chunkI2YOJMQL_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN_DESC",
  [chunkI2YOJMQL_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR_DESC",
  [chunkI2YOJMQL_cjs.OrgRole.REFERENT]: "roles.REFERENT_DESC",
  [chunkI2YOJMQL_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE_DESC",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN_DESC",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR_DESC",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT_DESC",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE_DESC"
};
var ROLE_BADGE_COLORS = {
  // Building roles
  [chunkI2YOJMQL_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "info",
  [chunkI2YOJMQL_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "success",
  [chunkI2YOJMQL_cjs.BuildingRole.CO_OWNER]: "warning",
  [chunkI2YOJMQL_cjs.BuildingRole.RESIDENT]: "neutral",
  // Org roles
  [chunkI2YOJMQL_cjs.OrgRole.ORG_ADMIN]: "purple",
  [chunkI2YOJMQL_cjs.OrgRole.SUPERVISOR]: "info",
  [chunkI2YOJMQL_cjs.OrgRole.REFERENT]: "success",
  [chunkI2YOJMQL_cjs.OrgRole.OPERATIVE]: "amber",
  // Platform roles
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_ADMIN]: "purple",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_MODERATOR]: "info",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_SUPPORT]: "success",
  [chunkI2YOJMQL_cjs.PlatformRole.PLATFORM_OPERATIVE]: "amber"
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
  return target.buildingRole?.chatVisibleToCoOwners === true;
}
function getMessageableUsers(users, callerIsManagerial) {
  return users.filter((user) => canMessageUser(callerIsManagerial, user));
}

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

// src/utils/feature-availability.ts
function isFeatureAvailable({
  feature,
  platformFlags,
  buildingSettings,
  loading = false
}) {
  const meta = chunkI2YOJMQL_cjs.PLATFORM_FEATURE_META[feature];
  if (!meta) return false;
  const platformState = platformFlags?.[feature];
  if (loading || platformState === void 0) {
    if (!meta.defaultEnabled) return false;
  } else if (!platformState) {
    return false;
  }
  if (!meta.buildingSettingKey) return true;
  if (buildingSettings === void 0) return true;
  if (buildingSettings === null) return meta.defaultEnabled;
  const value = buildingSettings[meta.buildingSettingKey];
  if (value === void 0) return meta.defaultEnabled;
  return value === true;
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

// src/utils/initials.ts
function getInitials(name) {
  return name.split(" ").map((part) => part[0]).join("").toUpperCase().slice(0, 2);
}

// src/utils/pagination.ts
function normalizePaginatedResponse(input, fallbackLimit = 10) {
  if (Array.isArray(input)) {
    return chunkQKHLAIRE_cjs.createPaginatedResponse(input, input.length, 0, input.length);
  }
  if (input && typeof input === "object") {
    const response = input;
    const data = response.data ?? response.items ?? response.results ?? [];
    const limit = response.limit ?? response.pageSize ?? response.perPage ?? (Array.isArray(data) ? data.length : fallbackLimit);
    const count = response.count ?? response.total ?? response.totalCount ?? (Array.isArray(data) ? data.length : 0);
    const page = response.page ?? response.currentPage ?? (response.offset !== void 0 && limit ? Math.floor(response.offset / limit) + 1 : 1);
    const offset = response.offset !== void 0 ? response.offset : limit && page ? (page - 1) * limit : 0;
    return chunkQKHLAIRE_cjs.createPaginatedResponse(Array.isArray(data) ? data : [], count, offset, limit);
  }
  return chunkQKHLAIRE_cjs.createPaginatedResponse([], 0, 0, fallbackLimit);
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
  const code = chunkXOQU25DL_cjs.isBackendErrorCode(rawCode) ? rawCode : null;
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
  const scopedPerms = chunkI2YOJMQL_cjs.SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;
  if (subject.permissions.includes(scopedPerms.any)) return true;
  return subject.permissions.includes(scopedPerms.own) && resourceOwnerId === subject.userId;
}
function computeActionFlags(subject, domain, resourceOwnerId) {
  const approvePermission = chunkI2YOJMQL_cjs.APPROVE_PERMISSIONS[domain];
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

// src/utils/resident-restriction.ts
function applyResidentRestrictionToItem(item, isRestrictedView) {
  if (!isRestrictedView) return item;
  return {
    ...item,
    canEdit: item.canEdit && item.isOwner,
    canDelete: item.canDelete && item.isOwner,
    ...item.canApprove !== void 0 && { canApprove: false }
  };
}
function applyResidentRestriction(items, isRestrictedView) {
  if (!isRestrictedView) return items;
  return items.map((item) => applyResidentRestrictionToItem(item, true));
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
exports.ROLE_BADGE_COLORS = ROLE_BADGE_COLORS;
exports.ROLE_DESCRIPTION_KEYS = ROLE_DESCRIPTION_KEYS;
exports.ROLE_TRANSLATION_KEYS = ROLE_TRANSLATION_KEYS;
exports.TIME_FORMATS = TIME_FORMATS;
exports.VOTING_METHOD_SETTINGS = VOTING_METHOD_SETTINGS;
exports.applyResidentRestriction = applyResidentRestriction;
exports.applyResidentRestrictionToItem = applyResidentRestrictionToItem;
exports.buildGoogleCalendarUrl = buildGoogleCalendarUrl;
exports.canDo = canDo;
exports.canDoOnResource = canDoOnResource;
exports.canMessageUser = canMessageUser;
exports.computeActionFlags = computeActionFlags;
exports.createPermissionChecker = createPermissionChecker;
exports.debounce = debounce;
exports.formatCurrency = formatCurrency;
exports.formatCurrencyByLocale = formatCurrencyByLocale;
exports.formatCurrencyEUR = formatCurrencyEUR;
exports.formatDate = formatDate;
exports.formatDateTime = formatDateTime;
exports.formatText = formatText;
exports.getContextUserId = getContextUserId;
exports.getDateLocale = getDateLocale;
exports.getInitials = getInitials;
exports.getMessageableUsers = getMessageableUsers;
exports.getRoleBadge = getRoleBadge;
exports.isFeatureAvailable = isFeatureAvailable;
exports.isManagerialRole = isManagerialRole;
exports.normalizePaginatedResponse = normalizePaginatedResponse;
exports.parseApiError = parseApiError;
exports.parseData = parseData;
exports.resolveVotingMethods = resolveVotingMethods;
//# sourceMappingURL=chunk-EE4RQJET.cjs.map
//# sourceMappingURL=chunk-EE4RQJET.cjs.map