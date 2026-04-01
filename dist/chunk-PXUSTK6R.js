// src/enums/building-type.enum.ts
var BuildingType = /* @__PURE__ */ ((BuildingType2) => {
  BuildingType2["RESIDENTIAL"] = "RESIDENTIAL";
  BuildingType2["COMMERCIAL"] = "COMMERCIAL";
  BuildingType2["RESIDENTIAL_COMMERCIAL"] = "RESIDENTIAL_COMMERCIAL";
  return BuildingType2;
})(BuildingType || {});

// src/enums/permission.enum.ts
var SCOPED_DOMAINS = [
  "notice",
  "event",
  "poll",
  "failure_report",
  "document",
  "maintenance_log"
];
function domainPermissions(domain, level) {
  if (level === "read") return [`${domain}:read`];
  if (level === "own") {
    return [`${domain}:read`, `${domain}:create`, `${domain}:update:own`, `${domain}:delete:own`];
  }
  return [
    `${domain}:read`,
    `${domain}:create`,
    `${domain}:update:own`,
    `${domain}:update:any`,
    `${domain}:delete:own`,
    `${domain}:delete:any`
  ];
}
var Permission = {
  // Building
  BUILDING_CREATE: "building:create",
  BUILDING_READ: "building:read",
  BUILDING_UPDATE: "building:update",
  BUILDING_DELETE: "building:delete",
  BUILDING_MANAGE: "building:manage",
  BUILDING_GENERATE_OTP: "building:generate_otp",
  // User
  USER_CREATE: "user:create",
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE_OWN: "user:delete:own",
  USER_DELETE_ANY: "user:delete:any",
  USER_KICK: "user:kick",
  // Building Role
  BUILDING_ROLE_ASSIGN: "building_role:assign",
  BUILDING_ROLE_UPDATE: "building_role:update",
  BUILDING_ROLE_REMOVE: "building_role:remove",
  // Notice
  NOTICE_CREATE: "notice:create",
  NOTICE_READ: "notice:read",
  NOTICE_UPDATE_OWN: "notice:update:own",
  NOTICE_UPDATE_ANY: "notice:update:any",
  NOTICE_DELETE_OWN: "notice:delete:own",
  NOTICE_DELETE_ANY: "notice:delete:any",
  NOTICE_APPROVE: "notice:approve",
  NOTICE_PIN: "notice:pin",
  // Event
  EVENT_CREATE: "event:create",
  EVENT_READ: "event:read",
  EVENT_UPDATE_OWN: "event:update:own",
  EVENT_UPDATE_ANY: "event:update:any",
  EVENT_DELETE_OWN: "event:delete:own",
  EVENT_DELETE_ANY: "event:delete:any",
  EVENT_APPROVE: "event:approve",
  // Poll
  POLL_CREATE: "poll:create",
  POLL_READ: "poll:read",
  POLL_UPDATE_OWN: "poll:update:own",
  POLL_UPDATE_ANY: "poll:update:any",
  POLL_DELETE_OWN: "poll:delete:own",
  POLL_DELETE_ANY: "poll:delete:any",
  POLL_APPROVE: "poll:approve",
  POLL_VOTE: "poll:vote",
  POLL_FINALIZE: "poll:finalize",
  POLL_DELETE_AFTER_VOTE: "poll:delete_after_vote",
  // Failure Report
  FAILURE_REPORT_CREATE: "failure_report:create",
  FAILURE_REPORT_READ: "failure_report:read",
  FAILURE_REPORT_UPDATE_OWN: "failure_report:update:own",
  FAILURE_REPORT_UPDATE_ANY: "failure_report:update:any",
  FAILURE_REPORT_DELETE_OWN: "failure_report:delete:own",
  FAILURE_REPORT_DELETE_ANY: "failure_report:delete:any",
  FAILURE_REPORT_APPROVE: "failure_report:approve",
  // Maintenance Log
  MAINTENANCE_LOG_CREATE: "maintenance_log:create",
  MAINTENANCE_LOG_READ: "maintenance_log:read",
  MAINTENANCE_LOG_UPDATE_OWN: "maintenance_log:update:own",
  MAINTENANCE_LOG_UPDATE_ANY: "maintenance_log:update:any",
  MAINTENANCE_LOG_DELETE_OWN: "maintenance_log:delete:own",
  MAINTENANCE_LOG_DELETE_ANY: "maintenance_log:delete:any",
  // Financial (flat, no :own/:any)
  FINANCIAL_CREATE: "financial:create",
  FINANCIAL_READ: "financial:read",
  FINANCIAL_UPDATE: "financial:update",
  FINANCIAL_DELETE: "financial:delete",
  // Document
  DOCUMENT_CREATE: "document:create",
  DOCUMENT_READ: "document:read",
  DOCUMENT_UPDATE_OWN: "document:update:own",
  DOCUMENT_UPDATE_ANY: "document:update:any",
  DOCUMENT_DELETE_OWN: "document:delete:own",
  DOCUMENT_DELETE_ANY: "document:delete:any",
  // Apartment (flat, no :own/:any)
  APARTMENT_CREATE: "apartment:create",
  APARTMENT_READ: "apartment:read",
  APARTMENT_UPDATE: "apartment:update",
  APARTMENT_DELETE: "apartment:delete",
  APARTMENT_MANAGE_USERS: "apartment:manage_users",
  // House Rules
  HOUSE_RULES_READ: "house_rules:read",
  HOUSE_RULES_MANAGE: "house_rules:manage",
  // FAQ
  FAQ_READ: "faq:read",
  FAQ_MANAGE_REPRESENTATIVE: "faq:manage:representative",
  FAQ_MANAGE_MANAGER: "faq:manage:manager",
  // Building Settings
  BUILDING_SETTINGS_MANAGE: "building_settings:manage",
  // Voting
  VOTE_CAST: "vote:cast",
  VOTE_WEIGHT_BASED: "vote:weight_based",
  // System
  SYSTEM_ADMIN: "system:admin",
  SYSTEM_MANAGE: "system:manage",
  // Organization (org-scoped)
  ORG_MANAGE_MEMBERS: "org:manage_members",
  ORG_MANAGE_ROLES: "org:manage_roles",
  ORG_ASSIGN_BUILDINGS: "org:assign_buildings",
  ORG_ASSIGN_REFERENTS: "org:assign_referents",
  ORG_MANAGE_SETTINGS: "org:manage_settings",
  ORG_VIEW_ANALYTICS: "org:view_analytics",
  ORG_MANAGE_CONTRACTS: "org:manage_contracts",
  ORG_VIEW_BUILDINGS: "org:view_buildings",
  // Platform (global scope)
  PLATFORM_APPROVE_BUILDINGS: "platform:approve_buildings",
  PLATFORM_MANAGE_USERS: "platform:manage_users",
  PLATFORM_MANAGE_ORGS: "platform:manage_orgs",
  PLATFORM_VIEW_ORGS: "platform:view_orgs",
  PLATFORM_VIEW_ANALYTICS: "platform:view_analytics",
  PLATFORM_MODERATE_CONTENT: "platform:moderate_content",
  PLATFORM_MANAGE_SETTINGS: "platform:manage_settings",
  PLATFORM_MANAGE_OPERATIVES: "platform:manage_operatives"
};

// src/enums/poll-type.enum.ts
var PollType = /* @__PURE__ */ ((PollType2) => {
  PollType2["CONSENSUS"] = "CONSENSUS";
  PollType2["COMMUNITY"] = "COMMUNITY";
  return PollType2;
})(PollType || {});

// src/enums/role.enum.ts
var Role = {
  USER: "USER",
  ADMIN: "ADMIN"
};
var BuildingRole = {
  OWNER_REPRESENTATIVE: "OWNER_REPRESENTATIVE",
  DEPUTY_REPRESENTATIVE: "DEPUTY_REPRESENTATIVE",
  CO_OWNER: "CO_OWNER"
};
var BUILDING_ROLE_RANK = {
  [BuildingRole.CO_OWNER]: 0,
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 1,
  [BuildingRole.OWNER_REPRESENTATIVE]: 1
};
function canAssignRole(assignerRole, targetRole) {
  return BUILDING_ROLE_RANK[assignerRole] > BUILDING_ROLE_RANK[targetRole];
}
var OrgRole = {
  ORG_ADMIN: "ORG_ADMIN",
  SUPERVISOR: "SUPERVISOR",
  REFERENT: "REFERENT",
  OPERATIVE: "OPERATIVE"
};
var ORG_ROLE_RANK = {
  [OrgRole.OPERATIVE]: 0,
  [OrgRole.REFERENT]: 1,
  [OrgRole.SUPERVISOR]: 2,
  [OrgRole.ORG_ADMIN]: 3
};
function canAssignOrgRole(assignerRole, targetRole) {
  return ORG_ROLE_RANK[assignerRole] > ORG_ROLE_RANK[targetRole];
}
var PlatformRole = {
  PLATFORM_ADMIN: "PLATFORM_ADMIN",
  PLATFORM_MODERATOR: "PLATFORM_MODERATOR",
  PLATFORM_SUPPORT: "PLATFORM_SUPPORT",
  PLATFORM_OPERATIVE: "PLATFORM_OPERATIVE"
};
var PLATFORM_ROLE_RANK = {
  [PlatformRole.PLATFORM_OPERATIVE]: 0,
  [PlatformRole.PLATFORM_SUPPORT]: 1,
  [PlatformRole.PLATFORM_MODERATOR]: 2,
  [PlatformRole.PLATFORM_ADMIN]: 3
};
function canAssignPlatformRole(assignerRole, targetRole) {
  return PLATFORM_ROLE_RANK[assignerRole] > PLATFORM_ROLE_RANK[targetRole];
}

// src/enums/status.enum.ts
var CommonStatus = /* @__PURE__ */ ((CommonStatus2) => {
  CommonStatus2["ACTIVE"] = "active";
  CommonStatus2["COMPLETED"] = "completed";
  CommonStatus2["CANCELLED"] = "cancelled";
  return CommonStatus2;
})(CommonStatus || {});
var ApprovalStatus = /* @__PURE__ */ ((ApprovalStatus2) => {
  ApprovalStatus2["PENDING"] = "pending";
  ApprovalStatus2["APPROVED"] = "approved";
  ApprovalStatus2["REJECTED"] = "rejected";
  return ApprovalStatus2;
})(ApprovalStatus || {});
var MaintenanceStatus = /* @__PURE__ */ ((MaintenanceStatus2) => {
  MaintenanceStatus2["PENDING"] = "pending";
  MaintenanceStatus2["IN_PROGRESS"] = "in_progress";
  MaintenanceStatus2["COMPLETED"] = "completed";
  MaintenanceStatus2["CANCELLED"] = "cancelled";
  return MaintenanceStatus2;
})(MaintenanceStatus || {});
var FailureStatus = /* @__PURE__ */ ((FailureStatus2) => {
  FailureStatus2["PENDING"] = "pending";
  FailureStatus2["IN_PROGRESS"] = "in_progress";
  FailureStatus2["RESOLVED"] = "resolved";
  FailureStatus2["CANCELLED"] = "cancelled";
  return FailureStatus2;
})(FailureStatus || {});
var MaintenanceType = /* @__PURE__ */ ((MaintenanceType2) => {
  MaintenanceType2["PREVENTIVE"] = "preventive";
  MaintenanceType2["CORRECTIVE"] = "corrective";
  MaintenanceType2["EMERGENCY"] = "emergency";
  return MaintenanceType2;
})(MaintenanceType || {});
var FailureType = /* @__PURE__ */ ((FailureType2) => {
  FailureType2["EQUIPMENT"] = "equipment";
  FailureType2["STRUCTURAL"] = "structural";
  FailureType2["UTILITY"] = "utility";
  FailureType2["OTHER"] = "other";
  return FailureType2;
})(FailureType || {});
var Priority = /* @__PURE__ */ ((Priority2) => {
  Priority2["LOW"] = "low";
  Priority2["MEDIUM"] = "medium";
  Priority2["HIGH"] = "high";
  Priority2["URGENT"] = "urgent";
  return Priority2;
})(Priority || {});
var TransactionType = /* @__PURE__ */ ((TransactionType2) => {
  TransactionType2["INCOME"] = "income";
  TransactionType2["EXPENSE"] = "expense";
  return TransactionType2;
})(TransactionType || {});
var TransactionCategory = /* @__PURE__ */ ((TransactionCategory2) => {
  TransactionCategory2["RENT"] = "rent";
  TransactionCategory2["MAINTENANCE"] = "maintenance";
  TransactionCategory2["UTILITIES"] = "utilities";
  TransactionCategory2["INSURANCE"] = "insurance";
  TransactionCategory2["TAXES"] = "taxes";
  TransactionCategory2["OTHER"] = "other";
  return TransactionCategory2;
})(TransactionCategory || {});
var Frequency = /* @__PURE__ */ ((Frequency2) => {
  Frequency2["DAILY"] = "daily";
  Frequency2["WEEKLY"] = "weekly";
  Frequency2["MONTHLY"] = "monthly";
  Frequency2["QUARTERLY"] = "quarterly";
  Frequency2["YEARLY"] = "yearly";
  return Frequency2;
})(Frequency || {});
var FileCategory = /* @__PURE__ */ ((FileCategory2) => {
  FileCategory2["FINANCIAL"] = "financial";
  FileCategory2["LEGAL"] = "legal";
  FileCategory2["MAINTENANCE"] = "maintenance";
  FileCategory2["GENERAL"] = "general";
  FileCategory2["OTHER"] = "other";
  return FileCategory2;
})(FileCategory || {});

export { ApprovalStatus, BUILDING_ROLE_RANK, BuildingRole, BuildingType, CommonStatus, FailureStatus, FailureType, FileCategory, Frequency, MaintenanceStatus, MaintenanceType, ORG_ROLE_RANK, OrgRole, PLATFORM_ROLE_RANK, Permission, PlatformRole, PollType, Priority, Role, SCOPED_DOMAINS, TransactionCategory, TransactionType, canAssignOrgRole, canAssignPlatformRole, canAssignRole, domainPermissions };
//# sourceMappingURL=chunk-PXUSTK6R.js.map
//# sourceMappingURL=chunk-PXUSTK6R.js.map