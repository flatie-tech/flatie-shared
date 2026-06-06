import { BuildingRole, domainPermissions, OrgRole, Permission, PlatformRole } from '../enums';

// ─── Helper ─────────────────────────────────────────────────────────

const unique = (arr: string[]) => [...new Set(arr)] as Permission[];

// ─── Reads ──────────────────────────────────────────────────────────
//
// domainPermissions(domain, level) generates the standard permission set:
//   'read'   → [read]
//   'own'    → [read, create, update:own, delete:own]
//   'manage' → own + [update:any, delete:any]
// Domain-specific extras (approve, pin, vote, finalize) are listed explicitly.

const ALL_READS = [
  ...domainPermissions('building', 'read'),
  ...domainPermissions('user', 'read'),
  ...domainPermissions('notice', 'read'),
  ...domainPermissions('event', 'read'),
  ...domainPermissions('poll', 'read'),
  ...domainPermissions('failure_report', 'read'),
  ...domainPermissions('maintenance_log', 'read'),
  ...domainPermissions('financial', 'read'),
  ...domainPermissions('document', 'read'),
  ...domainPermissions('apartment', 'read'),
  'house_rules:read',
  'faq:read',
];

// ─── Building Role Permission Mappings ──────────────────────────────

/**
 * RESIDENT: default building-level membership for anyone who lives in the
 * building but hasn't been confirmed as a co-owner. Covers tenants, family
 * members of co-owners, pre-land-book-registration buyers, and similar.
 *
 * Reads community content and files their own failure reports. Cannot see
 * fund finances or vote — under Croatian ZUOZ / NN 152/2024, pričuva and
 * voting are co-ownership rights.
 */
const RESIDENT_PERMISSIONS = [
  // ALL_READS minus financial:read — residents don't see fund balances.
  ...ALL_READS.filter((p) => p !== 'financial:read'),
  // File their own issue reports (plumbing, heating, common-area issues).
  'failure_report:create',
  'failure_report:update:own',
  'failure_report:delete:own',
  'user:delete:own',
];

// CO_OWNER: own content for scoped domains + voting
const CO_OWNER_PERMISSIONS = [
  ...ALL_READS,
  ...domainPermissions('notice', 'own'),
  ...domainPermissions('event', 'own'),
  ...domainPermissions('poll', 'own'),
  'poll:vote',
  ...domainPermissions('failure_report', 'own'),
  ...domainPermissions('document', 'own'),
  'building_email:view',
  'vote:cast',
  'vote:weight_based',
  'user:delete:own',
];

/**
 * REPRESENTATIVE (Owner + Deputy): manage for scoped domains + approve + building mgmt.
 *
 * OWNER_REPRESENTATIVE and DEPUTY_REPRESENTATIVE share identical permissions by design,
 * per Croatian ZUOZ law — the roles are legally distinct titles with the same authority.
 * Any future permission differentiation should be an explicit, deliberate decision.
 */
const REPRESENTATIVE_PERMISSIONS = [
  ...CO_OWNER_PERMISSIONS,
  ...domainPermissions('notice', 'manage'),
  ...domainPermissions('event', 'manage'),
  ...domainPermissions('poll', 'manage'),
  ...domainPermissions('failure_report', 'manage'),
  ...domainPermissions('document', 'manage'),
  'notice:approve',
  'notice:pin',
  'failure_report:approve',
  'event:approve',
  'poll:approve',
  'poll:finalize',
  'poll:delete_after_vote',
  'poll:export_signers',
  'document:set_private',
  'chat:create_group',
  'building:create',
  'building:update',
  'building:delete',
  'user:create',
  'user:update',
  'user:kick',
  'building_role:assign',
  'building_role:update',
  'building_role:remove',
  'house_rules:manage',
  'building_settings:manage',
  'building_email:manage',
  'faq:manage:representative',
  'apartment:update',
];

// ─── Org Role Building Permission Mappings ──────────────────────────

const ORG_ADMIN_BUILDING_PERMISSIONS = [
  ...REPRESENTATIVE_PERMISSIONS,
  ...domainPermissions('maintenance_log', 'manage'),
  'financial:create',
  'financial:update',
  'financial:delete',
  'apartment:create',
  'apartment:update',
  'apartment:delete',
  'apartment:manage_users',
  'building:manage',
  'building:generate_otp',
  'user:delete:any',
  'system:admin',
  'system:manage',
  'faq:manage:manager',
];

/**
 * SUPERVISOR: same building-level permissions as ORG_ADMIN by design.
 * The roles differ only in org-level permissions.
 */
const SUPERVISOR_BUILDING_PERMISSIONS = [...ORG_ADMIN_BUILDING_PERMISSIONS];

const REFERENT_BUILDING_PERMISSIONS = [
  ...ALL_READS,
  ...domainPermissions('notice', 'own'),
  ...domainPermissions('event', 'own'),
  ...domainPermissions('failure_report', 'own'),
  ...domainPermissions('document', 'own'),
];

const OPERATIVE_BUILDING_PERMISSIONS = [
  ...ALL_READS,
  'failure_report:update:own',
  'maintenance_log:update:own',
];

// ─── Org-Level Permission Mappings ──────────────────────────────────

const ORG_ADMIN_ORG_PERMISSIONS = [
  'org:manage_members',
  'org:manage_roles',
  'org:assign_buildings',
  'org:assign_referents',
  'org:manage_settings',
  'org:view_analytics',
  'org:manage_contracts',
  'org:view_buildings',
  'org:view_partners',
  'org:manage_partners',
];

const SUPERVISOR_ORG_PERMISSIONS = [
  'org:view_buildings',
  'org:view_analytics',
  'org:assign_referents',
  'org:view_partners',
  'org:manage_partners',
];

const REFERENT_ORG_PERMISSIONS = ['org:view_buildings', 'org:view_partners'];
const OPERATIVE_ORG_PERMISSIONS = ['org:view_buildings', 'org:view_partners'];

// ─── Final Role → Permission Records ────────────────────────────────

export const BUILDING_ROLE_PERMISSIONS: Record<BuildingRole, Permission[]> = {
  [BuildingRole.RESIDENT]: unique(RESIDENT_PERMISSIONS),
  [BuildingRole.CO_OWNER]: unique(CO_OWNER_PERMISSIONS),
  [BuildingRole.DEPUTY_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
  [BuildingRole.OWNER_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
};

export const ORG_ROLE_PERMISSIONS: Record<OrgRole, Permission[]> = {
  [OrgRole.ORG_ADMIN]: unique([...ORG_ADMIN_BUILDING_PERMISSIONS, ...ORG_ADMIN_ORG_PERMISSIONS]),
  [OrgRole.SUPERVISOR]: unique([...SUPERVISOR_BUILDING_PERMISSIONS, ...SUPERVISOR_ORG_PERMISSIONS]),
  [OrgRole.REFERENT]: unique([...REFERENT_BUILDING_PERMISSIONS, ...REFERENT_ORG_PERMISSIONS]),
  [OrgRole.OPERATIVE]: unique([...OPERATIVE_BUILDING_PERMISSIONS, ...OPERATIVE_ORG_PERMISSIONS]),
};

// ─── Platform Role Permissions ──────────────────────────────────────

export const PLATFORM_ROLE_PERMISSIONS: Record<PlatformRole, Permission[]> = {
  [PlatformRole.PLATFORM_ADMIN]: [
    'platform:approve_buildings',
    'platform:manage_users',
    'platform:manage_orgs',
    'platform:view_orgs',
    'platform:view_analytics',
    'platform:moderate_content',
    'platform:manage_settings',
    'platform:manage_operatives',
    'platform:manage_subscriptions',
    'platform:purge',
    'platform:view_archive',
    'system:delete_user',
    'system:create_organization',
  ] as Permission[],
  [PlatformRole.PLATFORM_MODERATOR]: [
    'platform:approve_buildings',
    'platform:manage_users',
    'platform:manage_orgs',
    'platform:view_orgs',
    'platform:view_analytics',
    'platform:moderate_content',
  ] as Permission[],
  [PlatformRole.PLATFORM_SUPPORT]: [
    'platform:approve_buildings',
    'platform:view_orgs',
    'platform:view_analytics',
    'platform:moderate_content',
  ] as Permission[],
  [PlatformRole.PLATFORM_OPERATIVE]: ['platform:view_analytics'] as Permission[],
};

// ─── Admin Scope Permissions ───────────────────────────────────────
//
// System admins bypass guards but the permissions endpoint still needs
// explicit permission lists.

/** All permissions — used for system admin building-scope resolution. */
export const ALL_PERMISSIONS: Permission[] = unique(Object.values(Permission));

/** Admin org-scope permissions — same as ORG_ADMIN. */
export const ADMIN_ORG_PERMISSIONS: Permission[] = ORG_ROLE_PERMISSIONS[OrgRole.ORG_ADMIN];

/** Admin platform-scope permissions — same as PLATFORM_ADMIN. */
export const ADMIN_PLATFORM_PERMISSIONS: Permission[] =
  PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_ADMIN];
