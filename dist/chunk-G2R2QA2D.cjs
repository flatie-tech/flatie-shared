'use strict';

// src/enums/apartment-role.enum.ts
var ApartmentRole = {
  OWNER: "OWNER",
  TENANT: "TENANT"
};

// src/enums/building-status.enum.ts
var BuildingStatus = {
  PENDING_APPROVAL: "PENDING_APPROVAL",
  ACTIVE: "ACTIVE",
  REJECTED: "REJECTED"
};
var OrgStatus = {
  PENDING_APPROVAL: "PENDING_APPROVAL",
  ACTIVE: "ACTIVE",
  REJECTED: "REJECTED"
};

// src/enums/building-type.enum.ts
var BuildingType = {
  RESIDENTIAL: "RESIDENTIAL",
  COMMERCIAL: "COMMERCIAL",
  RESIDENTIAL_COMMERCIAL: "RESIDENTIAL_COMMERCIAL"
};

// src/enums/failure-location.enum.ts
var FailureLocationType = {
  COMMON_AREA: "common_area",
  OWN_UNIT: "own_unit"
};
var FailureUnitType = {
  APARTMENT: "apartment",
  GARAGE: "garage",
  STORAGE_UNIT: "storage_unit"
};

// src/enums/maintenance-log.enum.ts
var MaintenanceLogFinancedBy = {
  BUILDING_FUNDS: "building_funds",
  INSURANCE: "insurance",
  CO_OWNER: "co_owner"
};

// src/enums/notification.enum.ts
var NotificationType = {
  NOTICE_CREATED: "notice_created",
  NOTICE_APPROVED: "notice_approved",
  NOTICE_REJECTED: "notice_rejected",
  POLL_CREATED: "poll_created",
  POLL_DEADLINE_24H: "poll_deadline_24h",
  POLL_DEADLINE_1H: "poll_deadline_1h",
  POLL_FINALIZED: "poll_finalized",
  EVENT_CREATED: "event_created",
  EVENT_REMINDER_24H: "event_reminder_24h",
  EVENT_REMINDER_1H: "event_reminder_1h",
  EVENT_UPDATED: "event_updated",
  EVENT_CANCELLED: "event_cancelled",
  WASTE_REMINDER_MIXED: "waste_reminder_mixed",
  WASTE_REMINDER_BIO: "waste_reminder_bio",
  WASTE_REMINDER_PLASTIC_METAL: "waste_reminder_plastic_metal",
  WASTE_REMINDER_PAPER_CARDBOARD: "waste_reminder_paper_cardboard",
  FAILURE_REPORT_CREATED: "failure_report_created",
  FAILURE_REPORT_STATUS_CHANGED: "failure_report_status_changed",
  FAILURE_REPORT_RESOLVED: "failure_report_resolved",
  MAINTENANCE_LOG_CREATED: "maintenance_log_created",
  PAYMENT_DUE: "payment_due",
  PAYMENT_RECEIVED: "payment_received",
  BUILDING_JOIN_REQUEST_RECEIVED: "building_join_request_received",
  BUILDING_JOIN_REQUEST_APPROVED: "building_join_request_approved",
  BUILDING_JOIN_REQUEST_REJECTED: "building_join_request_rejected",
  BUILDING_MEMBER_JOINED: "building_member_joined",
  BUILDING_ROLE_CHANGED: "building_role_changed",
  BUILDING_PENDING_APPROVAL: "building_pending_approval",
  BUILDING_APPROVED: "building_approved",
  BUILDING_REJECTED: "building_rejected",
  CHAT_MESSAGE: "chat_message",
  SYSTEM_ANNOUNCEMENT: "system_announcement"
};
var NotificationCategory = {
  NOTICES: "notices",
  POLLS: "polls",
  EVENTS: "events",
  WASTE: "waste",
  MAINTENANCE: "maintenance",
  FINANCIAL: "financial",
  CHAT: "chat",
  SYSTEM: "system"
};
var NotificationChannel = {
  IN_APP: "in_app",
  PUSH: "push",
  EMAIL: "email",
  SMS: "sms"
};
var NotificationDeliveryStatus = {
  PENDING: "pending",
  SENT: "sent",
  DELIVERED: "delivered",
  FAILED: "failed"
};
var DevicePlatform = {
  IOS: "ios",
  ANDROID: "android",
  WEB: "web"
};
var NOTIFICATION_TYPE_CATEGORY = {
  [NotificationType.NOTICE_CREATED]: NotificationCategory.NOTICES,
  [NotificationType.NOTICE_APPROVED]: NotificationCategory.NOTICES,
  [NotificationType.NOTICE_REJECTED]: NotificationCategory.NOTICES,
  [NotificationType.POLL_CREATED]: NotificationCategory.POLLS,
  [NotificationType.POLL_DEADLINE_24H]: NotificationCategory.POLLS,
  [NotificationType.POLL_DEADLINE_1H]: NotificationCategory.POLLS,
  [NotificationType.POLL_FINALIZED]: NotificationCategory.POLLS,
  [NotificationType.EVENT_CREATED]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_REMINDER_24H]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_REMINDER_1H]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_UPDATED]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_CANCELLED]: NotificationCategory.EVENTS,
  [NotificationType.WASTE_REMINDER_MIXED]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_BIO]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: NotificationCategory.WASTE,
  [NotificationType.FAILURE_REPORT_CREATED]: NotificationCategory.MAINTENANCE,
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: NotificationCategory.MAINTENANCE,
  [NotificationType.FAILURE_REPORT_RESOLVED]: NotificationCategory.MAINTENANCE,
  [NotificationType.MAINTENANCE_LOG_CREATED]: NotificationCategory.MAINTENANCE,
  [NotificationType.PAYMENT_DUE]: NotificationCategory.FINANCIAL,
  [NotificationType.PAYMENT_RECEIVED]: NotificationCategory.FINANCIAL,
  [NotificationType.CHAT_MESSAGE]: NotificationCategory.CHAT,
  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_MEMBER_JOINED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_ROLE_CHANGED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_PENDING_APPROVAL]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_APPROVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_REJECTED]: NotificationCategory.SYSTEM,
  [NotificationType.SYSTEM_ANNOUNCEMENT]: NotificationCategory.SYSTEM
};
var UNIMPLEMENTED_NOTIFICATION_TYPES = /* @__PURE__ */ new Set([
  NotificationType.POLL_DEADLINE_24H,
  NotificationType.POLL_DEADLINE_1H,
  NotificationType.EVENT_REMINDER_24H,
  NotificationType.EVENT_REMINDER_1H,
  NotificationType.PAYMENT_DUE,
  NotificationType.PAYMENT_RECEIVED,
  NotificationType.SYSTEM_ANNOUNCEMENT
]);
var WASTE_SUBTYPE_NOTIFICATION_MAP = {
  mixed: NotificationType.WASTE_REMINDER_MIXED,
  bio: NotificationType.WASTE_REMINDER_BIO,
  plastic_metal: NotificationType.WASTE_REMINDER_PLASTIC_METAL,
  paper_cardboard: NotificationType.WASTE_REMINDER_PAPER_CARDBOARD
};

// src/enums/org-type.enum.ts
var OrgType = {
  MANAGEMENT_FIRM: "MANAGEMENT_FIRM",
  PLATFORM: "PLATFORM"
};

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
  SYSTEM_DELETE_USER: "system:delete_user",
  SYSTEM_CREATE_ORGANIZATION: "system:create_organization",
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
  PLATFORM_MANAGE_OPERATIVES: "platform:manage_operatives",
  PLATFORM_MANAGE_SUBSCRIPTIONS: "platform:manage_subscriptions",
  PLATFORM_PURGE: "platform:purge"
};
function buildScopedPermissions() {
  const result = {};
  for (const domain of SCOPED_DOMAINS) {
    result[domain] = {
      update: {
        own: `${domain}:update:own`,
        any: `${domain}:update:any`
      },
      delete: {
        own: `${domain}:delete:own`,
        any: `${domain}:delete:any`
      }
    };
  }
  return result;
}
var SCOPED_PERMISSIONS = buildScopedPermissions();
var APPROVE_PERMISSIONS = {
  notice: "notice:approve",
  event: "event:approve",
  poll: "poll:approve",
  failure_report: "failure_report:approve"
};

// src/enums/poll-status.enum.ts
var PollStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

// src/enums/poll-type.enum.ts
var PollType = {
  CONSENSUS: "CONSENSUS",
  COMMUNITY: "COMMUNITY"
};

// src/enums/quota.enum.ts
var QuotaResourceType = {
  COMMENT: "COMMENT",
  MAINTENANCE_REQUEST: "MAINTENANCE_REQUEST",
  INVITE: "INVITE",
  NOTIFICATION: "NOTIFICATION"
};
var QUOTA_RESOURCE_TYPES = Object.values(
  QuotaResourceType
);
var QUOTA_DEFAULT_DAILY_LIMITS = {
  [QuotaResourceType.COMMENT]: 50,
  [QuotaResourceType.MAINTENANCE_REQUEST]: 10,
  [QuotaResourceType.INVITE]: 20,
  [QuotaResourceType.NOTIFICATION]: null
};
var OrgQuotaResourceType = {
  MEMBER_INVITE: "MEMBER_INVITE",
  BUILDING_CREATE: "BUILDING_CREATE",
  NOTIFICATION: "NOTIFICATION"
};
var ORG_QUOTA_RESOURCE_TYPES = Object.values(
  OrgQuotaResourceType
);
var ORG_QUOTA_DEFAULT_DAILY_LIMITS = {
  [OrgQuotaResourceType.MEMBER_INVITE]: 30,
  [OrgQuotaResourceType.BUILDING_CREATE]: 10,
  [OrgQuotaResourceType.NOTIFICATION]: null
};

// src/enums/role.enum.ts
var BuildingRole = {
  OWNER_REPRESENTATIVE: "OWNER_REPRESENTATIVE",
  DEPUTY_REPRESENTATIVE: "DEPUTY_REPRESENTATIVE",
  CO_OWNER: "CO_OWNER",
  RESIDENT: "RESIDENT"
};
var BUILDING_ROLE_RANK = {
  [BuildingRole.RESIDENT]: 0,
  [BuildingRole.CO_OWNER]: 1,
  [BuildingRole.DEPUTY_REPRESENTATIVE]: 2,
  [BuildingRole.OWNER_REPRESENTATIVE]: 2
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
var CommonStatus = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};
var ApprovalStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
};
var MaintenanceStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};
var FailureStatus = {
  PENDING: "pending",
  IN_PROGRESS: "inProgress",
  RESOLVED: "resolved"
};
var MaintenanceType = {
  PREVENTIVE: "preventive",
  CORRECTIVE: "corrective",
  EMERGENCY: "emergency"
};
var FailureType = {
  EQUIPMENT: "equipment",
  STRUCTURAL: "structural",
  UTILITY: "utility",
  OTHER: "other"
};
var Priority = {
  NORMAL: "normal",
  URGENT: "urgent"
};
var TransactionType = {
  INCOME: "income",
  EXPENSE: "expense"
};
var TransactionCategory = {
  RENT: "rent",
  MAINTENANCE: "maintenance",
  UTILITIES: "utilities",
  INSURANCE: "insurance",
  TAXES: "taxes",
  OTHER: "other"
};
var Frequency = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  QUARTERLY: "quarterly",
  YEARLY: "yearly"
};
var FileCategory = {
  FINANCIAL: "financial",
  LEGAL: "legal",
  MAINTENANCE: "maintenance",
  GENERAL: "general",
  OTHER: "other"
};

exports.APPROVE_PERMISSIONS = APPROVE_PERMISSIONS;
exports.ApartmentRole = ApartmentRole;
exports.ApprovalStatus = ApprovalStatus;
exports.BUILDING_ROLE_RANK = BUILDING_ROLE_RANK;
exports.BuildingRole = BuildingRole;
exports.BuildingStatus = BuildingStatus;
exports.BuildingType = BuildingType;
exports.CommonStatus = CommonStatus;
exports.DevicePlatform = DevicePlatform;
exports.FailureLocationType = FailureLocationType;
exports.FailureStatus = FailureStatus;
exports.FailureType = FailureType;
exports.FailureUnitType = FailureUnitType;
exports.FileCategory = FileCategory;
exports.Frequency = Frequency;
exports.MaintenanceLogFinancedBy = MaintenanceLogFinancedBy;
exports.MaintenanceStatus = MaintenanceStatus;
exports.MaintenanceType = MaintenanceType;
exports.NOTIFICATION_TYPE_CATEGORY = NOTIFICATION_TYPE_CATEGORY;
exports.NotificationCategory = NotificationCategory;
exports.NotificationChannel = NotificationChannel;
exports.NotificationDeliveryStatus = NotificationDeliveryStatus;
exports.NotificationType = NotificationType;
exports.ORG_QUOTA_DEFAULT_DAILY_LIMITS = ORG_QUOTA_DEFAULT_DAILY_LIMITS;
exports.ORG_QUOTA_RESOURCE_TYPES = ORG_QUOTA_RESOURCE_TYPES;
exports.ORG_ROLE_RANK = ORG_ROLE_RANK;
exports.OrgQuotaResourceType = OrgQuotaResourceType;
exports.OrgRole = OrgRole;
exports.OrgStatus = OrgStatus;
exports.OrgType = OrgType;
exports.PLATFORM_ROLE_RANK = PLATFORM_ROLE_RANK;
exports.Permission = Permission;
exports.PlatformRole = PlatformRole;
exports.PollStatus = PollStatus;
exports.PollType = PollType;
exports.Priority = Priority;
exports.QUOTA_DEFAULT_DAILY_LIMITS = QUOTA_DEFAULT_DAILY_LIMITS;
exports.QUOTA_RESOURCE_TYPES = QUOTA_RESOURCE_TYPES;
exports.QuotaResourceType = QuotaResourceType;
exports.SCOPED_DOMAINS = SCOPED_DOMAINS;
exports.SCOPED_PERMISSIONS = SCOPED_PERMISSIONS;
exports.TransactionCategory = TransactionCategory;
exports.TransactionType = TransactionType;
exports.UNIMPLEMENTED_NOTIFICATION_TYPES = UNIMPLEMENTED_NOTIFICATION_TYPES;
exports.WASTE_SUBTYPE_NOTIFICATION_MAP = WASTE_SUBTYPE_NOTIFICATION_MAP;
exports.canAssignOrgRole = canAssignOrgRole;
exports.canAssignPlatformRole = canAssignPlatformRole;
exports.canAssignRole = canAssignRole;
exports.domainPermissions = domainPermissions;
//# sourceMappingURL=chunk-G2R2QA2D.cjs.map
//# sourceMappingURL=chunk-G2R2QA2D.cjs.map