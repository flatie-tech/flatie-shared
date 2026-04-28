// ─── Scoped Domain Definitions ──────────────────────────────────────

export const SCOPED_DOMAINS = [
  'notice',
  'event',
  'poll',
  'failure_report',
  'document',
  'maintenance_log',
] as const;

export type ScopedDomain = (typeof SCOPED_DOMAINS)[number];
export type ScopedAction = 'update' | 'delete';

// ─── Permission Levels ──────────────────────────────────────────────

/**
 * Generate permission strings for a domain at a given access level.
 *   'read'   → [domain:read]
 *   'own'    → [domain:read, domain:create, domain:update:own, domain:delete:own]
 *   'manage' → own + [domain:update:any, domain:delete:any]
 */
export function domainPermissions(domain: string, level: 'read' | 'own' | 'manage'): string[] {
  if (level === 'read') return [`${domain}:read`];
  if (level === 'own') {
    return [`${domain}:read`, `${domain}:create`, `${domain}:update:own`, `${domain}:delete:own`];
  }
  return [
    `${domain}:read`,
    `${domain}:create`,
    `${domain}:update:own`,
    `${domain}:update:any`,
    `${domain}:delete:own`,
    `${domain}:delete:any`,
  ];
}

// ─── Permission Object ──────────────────────────────────────────────

export const Permission = {
  // Building
  BUILDING_CREATE: 'building:create',
  BUILDING_READ: 'building:read',
  BUILDING_UPDATE: 'building:update',
  BUILDING_DELETE: 'building:delete',
  BUILDING_MANAGE: 'building:manage',
  BUILDING_GENERATE_OTP: 'building:generate_otp',

  // User
  USER_CREATE: 'user:create',
  USER_READ: 'user:read',
  USER_UPDATE: 'user:update',
  USER_DELETE_OWN: 'user:delete:own',
  USER_DELETE_ANY: 'user:delete:any',
  USER_KICK: 'user:kick',

  // Building Role
  BUILDING_ROLE_ASSIGN: 'building_role:assign',
  BUILDING_ROLE_UPDATE: 'building_role:update',
  BUILDING_ROLE_REMOVE: 'building_role:remove',

  // Notice
  NOTICE_CREATE: 'notice:create',
  NOTICE_READ: 'notice:read',
  NOTICE_UPDATE_OWN: 'notice:update:own',
  NOTICE_UPDATE_ANY: 'notice:update:any',
  NOTICE_DELETE_OWN: 'notice:delete:own',
  NOTICE_DELETE_ANY: 'notice:delete:any',
  NOTICE_APPROVE: 'notice:approve',
  NOTICE_PIN: 'notice:pin',

  // Event
  EVENT_CREATE: 'event:create',
  EVENT_READ: 'event:read',
  EVENT_UPDATE_OWN: 'event:update:own',
  EVENT_UPDATE_ANY: 'event:update:any',
  EVENT_DELETE_OWN: 'event:delete:own',
  EVENT_DELETE_ANY: 'event:delete:any',
  EVENT_APPROVE: 'event:approve',

  // Poll
  POLL_CREATE: 'poll:create',
  POLL_READ: 'poll:read',
  POLL_UPDATE_OWN: 'poll:update:own',
  POLL_UPDATE_ANY: 'poll:update:any',
  POLL_DELETE_OWN: 'poll:delete:own',
  POLL_DELETE_ANY: 'poll:delete:any',
  POLL_APPROVE: 'poll:approve',
  POLL_VOTE: 'poll:vote',
  POLL_FINALIZE: 'poll:finalize',
  POLL_DELETE_AFTER_VOTE: 'poll:delete_after_vote',

  // Failure Report
  FAILURE_REPORT_CREATE: 'failure_report:create',
  FAILURE_REPORT_READ: 'failure_report:read',
  FAILURE_REPORT_UPDATE_OWN: 'failure_report:update:own',
  FAILURE_REPORT_UPDATE_ANY: 'failure_report:update:any',
  FAILURE_REPORT_DELETE_OWN: 'failure_report:delete:own',
  FAILURE_REPORT_DELETE_ANY: 'failure_report:delete:any',
  FAILURE_REPORT_APPROVE: 'failure_report:approve',

  // Maintenance Log
  MAINTENANCE_LOG_CREATE: 'maintenance_log:create',
  MAINTENANCE_LOG_READ: 'maintenance_log:read',
  MAINTENANCE_LOG_UPDATE_OWN: 'maintenance_log:update:own',
  MAINTENANCE_LOG_UPDATE_ANY: 'maintenance_log:update:any',
  MAINTENANCE_LOG_DELETE_OWN: 'maintenance_log:delete:own',
  MAINTENANCE_LOG_DELETE_ANY: 'maintenance_log:delete:any',

  // Financial (flat, no :own/:any)
  FINANCIAL_CREATE: 'financial:create',
  FINANCIAL_READ: 'financial:read',
  FINANCIAL_UPDATE: 'financial:update',
  FINANCIAL_DELETE: 'financial:delete',

  // Document
  DOCUMENT_CREATE: 'document:create',
  DOCUMENT_READ: 'document:read',
  DOCUMENT_UPDATE_OWN: 'document:update:own',
  DOCUMENT_UPDATE_ANY: 'document:update:any',
  DOCUMENT_DELETE_OWN: 'document:delete:own',
  DOCUMENT_DELETE_ANY: 'document:delete:any',

  // Apartment (flat, no :own/:any)
  APARTMENT_CREATE: 'apartment:create',
  APARTMENT_READ: 'apartment:read',
  APARTMENT_UPDATE: 'apartment:update',
  APARTMENT_DELETE: 'apartment:delete',
  APARTMENT_MANAGE_USERS: 'apartment:manage_users',

  // House Rules
  HOUSE_RULES_READ: 'house_rules:read',
  HOUSE_RULES_MANAGE: 'house_rules:manage',

  // FAQ
  FAQ_READ: 'faq:read',
  FAQ_MANAGE_REPRESENTATIVE: 'faq:manage:representative',
  FAQ_MANAGE_MANAGER: 'faq:manage:manager',

  // Building Settings
  BUILDING_SETTINGS_MANAGE: 'building_settings:manage',

  // Voting
  VOTE_CAST: 'vote:cast',
  VOTE_WEIGHT_BASED: 'vote:weight_based',

  // System
  SYSTEM_ADMIN: 'system:admin',
  SYSTEM_MANAGE: 'system:manage',
  SYSTEM_DELETE_USER: 'system:delete_user',
  SYSTEM_CREATE_ORGANIZATION: 'system:create_organization',

  // Organization (org-scoped)
  ORG_MANAGE_MEMBERS: 'org:manage_members',
  ORG_MANAGE_ROLES: 'org:manage_roles',
  ORG_ASSIGN_BUILDINGS: 'org:assign_buildings',
  ORG_ASSIGN_REFERENTS: 'org:assign_referents',
  ORG_MANAGE_SETTINGS: 'org:manage_settings',
  ORG_VIEW_ANALYTICS: 'org:view_analytics',
  ORG_MANAGE_CONTRACTS: 'org:manage_contracts',
  ORG_VIEW_BUILDINGS: 'org:view_buildings',
  ORG_VIEW_PARTNERS: 'org:view_partners',
  ORG_MANAGE_PARTNERS: 'org:manage_partners',

  // Platform (global scope)
  PLATFORM_APPROVE_BUILDINGS: 'platform:approve_buildings',
  PLATFORM_MANAGE_USERS: 'platform:manage_users',
  PLATFORM_MANAGE_ORGS: 'platform:manage_orgs',
  PLATFORM_VIEW_ORGS: 'platform:view_orgs',
  PLATFORM_VIEW_ANALYTICS: 'platform:view_analytics',
  PLATFORM_MODERATE_CONTENT: 'platform:moderate_content',
  PLATFORM_MANAGE_SETTINGS: 'platform:manage_settings',
  PLATFORM_MANAGE_OPERATIVES: 'platform:manage_operatives',
  PLATFORM_MANAGE_SUBSCRIPTIONS: 'platform:manage_subscriptions',
  PLATFORM_PURGE: 'platform:purge',
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

// ─── Scoped Permission Lookup ───────────────────────────────────────
//
// Type-safe lookup for :own/:any permissions. Generated from SCOPED_DOMAINS.

function buildScopedPermissions(): Record<
  ScopedDomain,
  Record<ScopedAction, { own: Permission; any: Permission }>
> {
  const result = {} as Record<
    ScopedDomain,
    Record<ScopedAction, { own: Permission; any: Permission }>
  >;
  for (const domain of SCOPED_DOMAINS) {
    result[domain] = {
      update: {
        own: `${domain}:update:own` as Permission,
        any: `${domain}:update:any` as Permission,
      },
      delete: {
        own: `${domain}:delete:own` as Permission,
        any: `${domain}:delete:any` as Permission,
      },
    };
  }
  return result;
}

export const SCOPED_PERMISSIONS = buildScopedPermissions();

/** Approve permissions per domain (not all domains have approve). */
export const APPROVE_PERMISSIONS: Partial<Record<ScopedDomain, Permission>> = {
  notice: 'notice:approve' as Permission,
  event: 'event:approve' as Permission,
  poll: 'poll:approve' as Permission,
  failure_report: 'failure_report:approve' as Permission,
};
