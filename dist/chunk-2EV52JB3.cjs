'use strict';

var chunkQTV2ZV2E_cjs = require('./chunk-QTV2ZV2E.cjs');
var chunkIGBERUWL_cjs = require('./chunk-IGBERUWL.cjs');

// src/utils/pagination.ts
function normalizePaginatedResponse(input, fallbackLimit = 10) {
  if (Array.isArray(input)) {
    return chunkIGBERUWL_cjs.createPaginatedResponse(input, input.length, 0, input.length);
  }
  if (input && typeof input === "object") {
    const response = input;
    const data = response.data ?? response.items ?? response.results ?? [];
    const limit = response.limit ?? response.pageSize ?? response.perPage ?? (Array.isArray(data) ? data.length : fallbackLimit);
    const count = response.count ?? response.total ?? response.totalCount ?? (Array.isArray(data) ? data.length : 0);
    const page = response.page ?? response.currentPage ?? (response.offset !== void 0 && limit ? Math.floor(response.offset / limit) + 1 : 1);
    const offset = response.offset !== void 0 ? response.offset : limit && page ? (page - 1) * limit : 0;
    return chunkIGBERUWL_cjs.createPaginatedResponse(Array.isArray(data) ? data : [], count, offset, limit);
  }
  return chunkIGBERUWL_cjs.createPaginatedResponse([], 0, 0, fallbackLimit);
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

// src/utils/permission-evaluator.ts
function canDo(ctx, permission) {
  if (ctx.kind === "admin") return true;
  return ctx.permissions.includes(permission);
}
function canDoOnResource(ctx, domain, action, resourceOwnerId) {
  if (ctx.kind === "admin") return true;
  const scopedPerms = chunkQTV2ZV2E_cjs.SCOPED_PERMISSIONS[domain]?.[action];
  if (!scopedPerms) return false;
  if (ctx.permissions.includes(scopedPerms.any)) return true;
  return ctx.permissions.includes(scopedPerms.own) && resourceOwnerId === ctx.userId;
}
function computeActionFlags(ctx, domain, resourceOwnerId) {
  const approvePermission = chunkQTV2ZV2E_cjs.APPROVE_PERMISSIONS[domain];
  return {
    canEdit: canDoOnResource(ctx, domain, "update", resourceOwnerId),
    canDelete: canDoOnResource(ctx, domain, "delete", resourceOwnerId),
    canApprove: approvePermission ? canDo(ctx, approvePermission) : false
  };
}
function isAdminContext(ctx) {
  return ctx.kind === "admin";
}
function getContextUserId(ctx) {
  if (ctx.kind === "admin") return null;
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
  chunkQTV2ZV2E_cjs.BuildingRole.OWNER_REPRESENTATIVE,
  chunkQTV2ZV2E_cjs.BuildingRole.DEPUTY_REPRESENTATIVE
];
function isManagerialRole(role) {
  return MANAGERIAL_BUILDING_ROLES.includes(role);
}
var ROLE_TRANSLATION_KEYS = {
  // Building roles
  [chunkQTV2ZV2E_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE",
  [chunkQTV2ZV2E_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE",
  [chunkQTV2ZV2E_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER",
  [chunkQTV2ZV2E_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT",
  // Org roles
  [chunkQTV2ZV2E_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN",
  [chunkQTV2ZV2E_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR",
  [chunkQTV2ZV2E_cjs.OrgRole.REFERENT]: "roles.REFERENT",
  [chunkQTV2ZV2E_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE",
  // Platform roles
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE"
};
var ROLE_DESCRIPTION_KEYS = {
  [chunkQTV2ZV2E_cjs.BuildingRole.OWNER_REPRESENTATIVE]: "roles.OWNER_REPRESENTATIVE_DESC",
  [chunkQTV2ZV2E_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: "roles.DEPUTY_REPRESENTATIVE_DESC",
  [chunkQTV2ZV2E_cjs.BuildingRole.CO_OWNER]: "roles.CO_OWNER_DESC",
  [chunkQTV2ZV2E_cjs.BuildingRole.RESIDENT]: "roles.RESIDENT_DESC",
  [chunkQTV2ZV2E_cjs.OrgRole.ORG_ADMIN]: "roles.ORG_ADMIN_DESC",
  [chunkQTV2ZV2E_cjs.OrgRole.SUPERVISOR]: "roles.SUPERVISOR_DESC",
  [chunkQTV2ZV2E_cjs.OrgRole.REFERENT]: "roles.REFERENT_DESC",
  [chunkQTV2ZV2E_cjs.OrgRole.OPERATIVE]: "roles.OPERATIVE_DESC",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_ADMIN]: "roles.PLATFORM_ADMIN_DESC",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_MODERATOR]: "roles.PLATFORM_MODERATOR_DESC",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_SUPPORT]: "roles.PLATFORM_SUPPORT_DESC",
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_OPERATIVE]: "roles.PLATFORM_OPERATIVE_DESC"
};

// src/utils/status-variants.ts
function failureStatusVariant(status) {
  switch (status) {
    case chunkQTV2ZV2E_cjs.FailureStatus.PENDING:
      return "info";
    case chunkQTV2ZV2E_cjs.FailureStatus.IN_PROGRESS:
      return "warning";
    case chunkQTV2ZV2E_cjs.FailureStatus.RESOLVED:
      return "success";
    default:
      return "neutral";
  }
}
function priorityVariant(priority) {
  switch (priority) {
    case chunkQTV2ZV2E_cjs.Priority.URGENT:
      return "danger";
    case chunkQTV2ZV2E_cjs.Priority.NORMAL:
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
  const formatDate = (date) => date.toISOString().slice(0, 10);
  switch (filter) {
    case "today":
      return {
        fromDate: formatDate(today),
        toDate: formatDate(today)
      };
    case "yesterday": {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        fromDate: formatDate(yesterday),
        toDate: formatDate(yesterday)
      };
    }
    case "week": {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return {
        fromDate: formatDate(weekAgo),
        toDate: formatDate(today)
      };
    }
    case "month": {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return {
        fromDate: formatDate(monthAgo),
        toDate: formatDate(today)
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

exports.MANAGERIAL_BUILDING_ROLES = MANAGERIAL_BUILDING_ROLES;
exports.ParseError = ParseError;
exports.ROLE_DESCRIPTION_KEYS = ROLE_DESCRIPTION_KEYS;
exports.ROLE_TRANSLATION_KEYS = ROLE_TRANSLATION_KEYS;
exports.calculatePaginationMeta = calculatePaginationMeta;
exports.canDo = canDo;
exports.canDoOnResource = canDoOnResource;
exports.computeActionFlags = computeActionFlags;
exports.debounce = debounce;
exports.extractPaginatedItems = extractPaginatedItems;
exports.failureStatusVariant = failureStatusVariant;
exports.formatCurrency = formatCurrency;
exports.formatText = formatText;
exports.getContextUserId = getContextUserId;
exports.getDateRange = getDateRange;
exports.hasAllPermissions = hasAllPermissions;
exports.hasAnyPermission = hasAnyPermission;
exports.hasPermission = hasPermission;
exports.isAdminContext = isAdminContext;
exports.isManagerialRole = isManagerialRole;
exports.normalizePaginatedResponse = normalizePaginatedResponse;
exports.parseData = parseData;
exports.priorityVariant = priorityVariant;
//# sourceMappingURL=chunk-2EV52JB3.cjs.map
//# sourceMappingURL=chunk-2EV52JB3.cjs.map