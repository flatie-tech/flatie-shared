import { BuildingRole, PlatformRole, OrgRole, SCOPED_PERMISSIONS, APPROVE_PERMISSIONS, FailureStatus, Priority } from './chunk-ZEX3OJQI.js';
import { createPaginatedResponse } from './chunk-W3SU22LA.js';

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

// src/utils/permission-evaluator.ts
function canDo(ctx, permission) {
  if (ctx.kind === "admin") return true;
  return ctx.permissions.includes(permission);
}
function canDoOnResource(ctx, domain, action, resourceOwnerId) {
  if (ctx.kind === "admin") return true;
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

export { MANAGERIAL_BUILDING_ROLES, ParseError, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatText, getContextUserId, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, parseData, priorityVariant };
//# sourceMappingURL=chunk-B4ZDVAQP.js.map
//# sourceMappingURL=chunk-B4ZDVAQP.js.map