declare const SCOPED_DOMAINS: readonly ["notice", "event", "poll", "failure_report", "document", "maintenance_log"];
type ScopedDomain = (typeof SCOPED_DOMAINS)[number];
type ScopedAction = 'update' | 'delete';
/**
 * Generate permission strings for a domain at a given access level.
 *   'read'   → [domain:read]
 *   'own'    → [domain:read, domain:create, domain:update:own, domain:delete:own]
 *   'manage' → own + [domain:update:any, domain:delete:any]
 */
declare function domainPermissions(domain: string, level: 'read' | 'own' | 'manage'): string[];
declare const Permission: {
    readonly BUILDING_CREATE: "building:create";
    readonly BUILDING_READ: "building:read";
    readonly BUILDING_UPDATE: "building:update";
    readonly BUILDING_DELETE: "building:delete";
    readonly BUILDING_MANAGE: "building:manage";
    readonly BUILDING_GENERATE_OTP: "building:generate_otp";
    readonly USER_CREATE: "user:create";
    readonly USER_READ: "user:read";
    readonly USER_UPDATE: "user:update";
    readonly USER_DELETE_OWN: "user:delete:own";
    readonly USER_DELETE_ANY: "user:delete:any";
    readonly USER_KICK: "user:kick";
    readonly BUILDING_ROLE_ASSIGN: "building_role:assign";
    readonly BUILDING_ROLE_UPDATE: "building_role:update";
    readonly BUILDING_ROLE_REMOVE: "building_role:remove";
    readonly NOTICE_CREATE: "notice:create";
    readonly NOTICE_READ: "notice:read";
    readonly NOTICE_UPDATE_OWN: "notice:update:own";
    readonly NOTICE_UPDATE_ANY: "notice:update:any";
    readonly NOTICE_DELETE_OWN: "notice:delete:own";
    readonly NOTICE_DELETE_ANY: "notice:delete:any";
    readonly NOTICE_APPROVE: "notice:approve";
    readonly NOTICE_PIN: "notice:pin";
    readonly EVENT_CREATE: "event:create";
    readonly EVENT_READ: "event:read";
    readonly EVENT_UPDATE_OWN: "event:update:own";
    readonly EVENT_UPDATE_ANY: "event:update:any";
    readonly EVENT_DELETE_OWN: "event:delete:own";
    readonly EVENT_DELETE_ANY: "event:delete:any";
    readonly EVENT_APPROVE: "event:approve";
    readonly POLL_CREATE: "poll:create";
    readonly POLL_READ: "poll:read";
    readonly POLL_UPDATE_OWN: "poll:update:own";
    readonly POLL_UPDATE_ANY: "poll:update:any";
    readonly POLL_DELETE_OWN: "poll:delete:own";
    readonly POLL_DELETE_ANY: "poll:delete:any";
    readonly POLL_APPROVE: "poll:approve";
    readonly POLL_VOTE: "poll:vote";
    readonly POLL_FINALIZE: "poll:finalize";
    readonly POLL_DELETE_AFTER_VOTE: "poll:delete_after_vote";
    readonly FAILURE_REPORT_CREATE: "failure_report:create";
    readonly FAILURE_REPORT_READ: "failure_report:read";
    readonly FAILURE_REPORT_UPDATE_OWN: "failure_report:update:own";
    readonly FAILURE_REPORT_UPDATE_ANY: "failure_report:update:any";
    readonly FAILURE_REPORT_DELETE_OWN: "failure_report:delete:own";
    readonly FAILURE_REPORT_DELETE_ANY: "failure_report:delete:any";
    readonly FAILURE_REPORT_APPROVE: "failure_report:approve";
    readonly MAINTENANCE_LOG_CREATE: "maintenance_log:create";
    readonly MAINTENANCE_LOG_READ: "maintenance_log:read";
    readonly MAINTENANCE_LOG_UPDATE_OWN: "maintenance_log:update:own";
    readonly MAINTENANCE_LOG_UPDATE_ANY: "maintenance_log:update:any";
    readonly MAINTENANCE_LOG_DELETE_OWN: "maintenance_log:delete:own";
    readonly MAINTENANCE_LOG_DELETE_ANY: "maintenance_log:delete:any";
    readonly FINANCIAL_CREATE: "financial:create";
    readonly FINANCIAL_READ: "financial:read";
    readonly FINANCIAL_UPDATE: "financial:update";
    readonly FINANCIAL_DELETE: "financial:delete";
    readonly DOCUMENT_CREATE: "document:create";
    readonly DOCUMENT_READ: "document:read";
    readonly DOCUMENT_UPDATE_OWN: "document:update:own";
    readonly DOCUMENT_UPDATE_ANY: "document:update:any";
    readonly DOCUMENT_DELETE_OWN: "document:delete:own";
    readonly DOCUMENT_DELETE_ANY: "document:delete:any";
    readonly APARTMENT_CREATE: "apartment:create";
    readonly APARTMENT_READ: "apartment:read";
    readonly APARTMENT_UPDATE: "apartment:update";
    readonly APARTMENT_DELETE: "apartment:delete";
    readonly APARTMENT_MANAGE_USERS: "apartment:manage_users";
    readonly HOUSE_RULES_READ: "house_rules:read";
    readonly HOUSE_RULES_MANAGE: "house_rules:manage";
    readonly FAQ_READ: "faq:read";
    readonly FAQ_MANAGE_REPRESENTATIVE: "faq:manage:representative";
    readonly FAQ_MANAGE_MANAGER: "faq:manage:manager";
    readonly BUILDING_SETTINGS_MANAGE: "building_settings:manage";
    readonly BUILDING_EMAIL_VIEW: "building_email:view";
    readonly BUILDING_EMAIL_MANAGE: "building_email:manage";
    readonly VOTE_CAST: "vote:cast";
    readonly VOTE_WEIGHT_BASED: "vote:weight_based";
    readonly SYSTEM_ADMIN: "system:admin";
    readonly SYSTEM_MANAGE: "system:manage";
    readonly SYSTEM_DELETE_USER: "system:delete_user";
    readonly SYSTEM_CREATE_ORGANIZATION: "system:create_organization";
    readonly ORG_MANAGE_MEMBERS: "org:manage_members";
    readonly ORG_MANAGE_ROLES: "org:manage_roles";
    readonly ORG_ASSIGN_BUILDINGS: "org:assign_buildings";
    readonly ORG_ASSIGN_REFERENTS: "org:assign_referents";
    readonly ORG_MANAGE_SETTINGS: "org:manage_settings";
    readonly ORG_VIEW_ANALYTICS: "org:view_analytics";
    readonly ORG_MANAGE_CONTRACTS: "org:manage_contracts";
    readonly ORG_VIEW_BUILDINGS: "org:view_buildings";
    readonly PLATFORM_APPROVE_BUILDINGS: "platform:approve_buildings";
    readonly PLATFORM_MANAGE_USERS: "platform:manage_users";
    readonly PLATFORM_MANAGE_ORGS: "platform:manage_orgs";
    readonly PLATFORM_VIEW_ORGS: "platform:view_orgs";
    readonly PLATFORM_VIEW_ANALYTICS: "platform:view_analytics";
    readonly PLATFORM_MODERATE_CONTENT: "platform:moderate_content";
    readonly PLATFORM_MANAGE_SETTINGS: "platform:manage_settings";
    readonly PLATFORM_MANAGE_OPERATIVES: "platform:manage_operatives";
    readonly PLATFORM_PURGE: "platform:purge";
};
type Permission = (typeof Permission)[keyof typeof Permission];
declare const SCOPED_PERMISSIONS: Record<"notice" | "poll" | "event" | "document" | "failure_report" | "maintenance_log", Record<ScopedAction, {
    own: Permission;
    any: Permission;
}>>;
/** Approve permissions per domain (not all domains have approve). */
declare const APPROVE_PERMISSIONS: Partial<Record<ScopedDomain, Permission>>;

declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
type Role = (typeof Role)[keyof typeof Role];
declare const BuildingRole: {
    readonly OWNER_REPRESENTATIVE: "OWNER_REPRESENTATIVE";
    readonly DEPUTY_REPRESENTATIVE: "DEPUTY_REPRESENTATIVE";
    readonly CO_OWNER: "CO_OWNER";
};
type BuildingRole = (typeof BuildingRole)[keyof typeof BuildingRole];
declare const BUILDING_ROLE_RANK: Record<BuildingRole, number>;
declare function canAssignRole(assignerRole: BuildingRole, targetRole: BuildingRole): boolean;
declare const OrgRole: {
    readonly ORG_ADMIN: "ORG_ADMIN";
    readonly SUPERVISOR: "SUPERVISOR";
    readonly REFERENT: "REFERENT";
    readonly OPERATIVE: "OPERATIVE";
};
type OrgRole = (typeof OrgRole)[keyof typeof OrgRole];
declare const ORG_ROLE_RANK: Record<OrgRole, number>;
declare function canAssignOrgRole(assignerRole: OrgRole, targetRole: OrgRole): boolean;
declare const PlatformRole: {
    readonly PLATFORM_ADMIN: "PLATFORM_ADMIN";
    readonly PLATFORM_MODERATOR: "PLATFORM_MODERATOR";
    readonly PLATFORM_SUPPORT: "PLATFORM_SUPPORT";
    readonly PLATFORM_OPERATIVE: "PLATFORM_OPERATIVE";
};
type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];
declare const PLATFORM_ROLE_RANK: Record<PlatformRole, number>;
declare function canAssignPlatformRole(assignerRole: PlatformRole, targetRole: PlatformRole): boolean;

export { APPROVE_PERMISSIONS as A, BuildingRole as B, OrgRole as O, Permission as P, Role as R, type ScopedDomain as S, PlatformRole as a, type ScopedAction as b, SCOPED_DOMAINS as c, domainPermissions as d, SCOPED_PERMISSIONS as e, BUILDING_ROLE_RANK as f, canAssignOrgRole as g, canAssignPlatformRole as h, canAssignRole as i, ORG_ROLE_RANK as j, PLATFORM_ROLE_RANK as k };
