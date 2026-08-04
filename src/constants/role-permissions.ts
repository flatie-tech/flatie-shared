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
  ...domainPermissions('financial', 'read'),
  ...domainPermissions('document', 'read'),
  ...domainPermissions('unit', 'read'),
  ...domainPermissions('apartment', 'read'), // deprecated alias of unit:read
  'house_rules:read',
  'faq:read',
  'board_card:read',
];

// Reads available to ledger owners and managers but not plain residents:
// fund finances and the (money-adjacent) work board. Under Croatian ZUOZ /
// NN 152/2024 the pričuva is a co-ownership concern.
const OWNER_ONLY_READS = ['financial:read', 'board_card:read'];

// ─── Building Role Permission Mappings ──────────────────────────────

/**
 * RESIDENT: default building-level membership for anyone who lives in the
 * building — owners and non-owners alike (tenants, family members of owners,
 * pre-land-book-registration buyers). Ownership itself is an owners-ledger
 * fact, layered on via OWNERSHIP_DERIVED_PERMISSIONS.
 *
 * The rule (decided 2026-07-28): membership grants PARTICIPATION — reads,
 * own community content (notices, events, polls, documents, failure
 * reports), and voting in ordinary polls. Ownership grants MONEY (fund
 * finances, work board) and LEGAL DECISIONS — consensus-poll eligibility is
 * enforced by ledger-derived voting weight in poll-voting, not by this
 * permission list, so `poll:vote` here cannot reach a potpisna lista.
 */
const RESIDENT_PERMISSIONS = [
  // ALL_READS minus owner-only reads (fund balances, work board).
  ...ALL_READS.filter((p) => !OWNER_ONLY_READS.includes(p)),
  ...domainPermissions('notice', 'own'),
  ...domainPermissions('event', 'own'),
  ...domainPermissions('poll', 'own'),
  'poll:vote',
  ...domainPermissions('failure_report', 'own'),
  ...domainPermissions('document', 'own'),
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
  // NOTE: building_email:view deliberately NOT granted — the building mailbox
  // (manager correspondence) is management-only (decision 2026-07-21); the
  // grant moved to REPRESENTATIVE_PERMISSIONS.
  'user:delete:own',
];

/**
 * Permissions an OWNER holds on top of a plain RESIDENT, granted server-side
 * from the OWNERS LEDGER (a user who holds an active owner record in the
 * building), NOT from a role. Deliberately tiny (2026-07-28 simplification):
 * ownership adds MONEY visibility only — fund finances and the work board.
 * Community participation (own content, ordinary-poll voting) is membership
 * (RESIDENT_PERMISSIONS), and consensus-poll eligibility is enforced by
 * ledger-derived voting weight in poll-voting, not by any permission here.
 */
export const OWNERSHIP_DERIVED_PERMISSIONS = unique([...OWNER_ONLY_READS]);

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
  'poll:export_signers',
  'document:set_private',
  'chat:create_group',
  'building:update',
  'user:create',
  'user:update',
  'user:kick',
  'building_role:assign',
  'building_role:update',
  'building_role:remove',
  'building_settings:manage',
  // Self-managed buildings (no upravitelj org) are run by their predstavnik:
  // ToS §7.4 promises them the pričuva ledger, so reps hold the finance
  // writes too (T4 decision, 2026-07-30). Org-managed buildings are
  // unaffected — org roles already held these.
  'financial:create',
  'financial:update',
  'financial:delete',
  // Mailbox is management-only: reps get BOTH the read gate (view) and the
  // mutate gate (manage). view moved here from CO_OWNER_PERMISSIONS 2026-07-21.
  'building_email:view',
  'building_email:manage',
  'board_card:manage',
  'faq:manage:representative',
  'unit:update',
  'apartment:update', // deprecated alias of unit:update
];

// ─── Org Role Building Permission Mappings ──────────────────────────

const ORG_ADMIN_BUILDING_PERMISSIONS = [
  ...REPRESENTATIVE_PERMISSIONS,
  'financial:create',
  'financial:update',
  'financial:delete',
  'unit:create',
  'unit:update',
  'unit:delete',
  'unit:manage_users',
  'apartment:create', // deprecated aliases of unit:* below — granted during rename window
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

const OPERATIVE_BUILDING_PERMISSIONS = [...ALL_READS, 'failure_report:update:own'];

// ─── Org-Level Permission Mappings ──────────────────────────────────

const ORG_ADMIN_ORG_PERMISSIONS = [
  'org:manage_members',
  'org:assign_buildings',
  'org:assign_referents',
  'org:manage_settings',
  'org:view_buildings',
  'org:view_partners',
  'org:manage_partners',
  'org:broadcast',
];

const SUPERVISOR_ORG_PERMISSIONS = [
  'org:view_buildings',
  'org:assign_referents',
  'org:view_partners',
  'org:manage_partners',
  'org:broadcast',
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
    'platform:manage_subscriptions',
    'platform:purge',
    'platform:view_archive',
    // ADMIN-only by design — see the permission enum for why each of these is
    // separate from the MODERATOR-held platform:manage_users.
    'platform:manage_staff',
    'platform:view_audit',
    'platform:manage_dsar',
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
    // NOT platform:moderate_content. That permission controls the blog, which
    // publishes to and deletes from the PUBLIC marketing site — a support-tier
    // action should never be visible to everyone on the internet. Removed
    // 2026-08-04; MODERATOR and ADMIN retain it.
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
