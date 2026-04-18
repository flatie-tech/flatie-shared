import { domainPermissions, BuildingRole, OrgRole, PlatformRole, Permission } from './chunk-P25WSM2I.js';

// src/constants/defaults.ts
var DEFAULT_PAGINATION_LIMIT = 10;
var MAX_PAGINATION_LIMIT = 100;

// src/constants/query-keys.ts
var userKeys = {
  all: ["user"],
  lists: () => [...userKeys.all, "list"],
  list: (name, filters = {}) => [...userKeys.lists(), name, { ...filters }],
  details: () => [...userKeys.all, "detail"],
  detail: (id) => [...userKeys.details(), id],
  info: () => userKeys.detail("info")
};
var buildingKeys = {
  all: ["building"],
  lists: () => [...buildingKeys.all, "list"],
  list: (filters = {}) => [...buildingKeys.lists(), { ...filters }],
  details: () => [...buildingKeys.all, "detail"],
  detail: (id) => [...buildingKeys.details(), id],
  otp: (id) => [...buildingKeys.all, "otp", id],
  users: (id, filters = {}) => [...buildingKeys.all, "users", id, { ...filters }]
};
var noticeKeys = {
  all: ["notice"],
  lists: () => [...noticeKeys.all, "list"],
  list: (filters = {}) => [...noticeKeys.lists(), { ...filters }],
  details: () => [...noticeKeys.all, "detail"],
  detail: (id) => [...noticeKeys.details(), id]
};
var pollKeys = {
  all: ["poll"],
  lists: () => [...pollKeys.all, "list"],
  list: (filters = {}) => [...pollKeys.lists(), { ...filters }],
  details: () => [...pollKeys.all, "detail"],
  detail: (id) => [...pollKeys.details(), id],
  results: (id) => [...pollKeys.detail(id), "results"],
  voters: (id) => [...pollKeys.detail(id), "voters"]
};
var eventKeys = {
  all: ["event"],
  lists: () => [...eventKeys.all, "list"],
  list: (filters = {}) => [...eventKeys.lists(), { ...filters }],
  details: () => [...eventKeys.all, "detail"],
  detail: (id) => [...eventKeys.details(), id]
};
var failureReportKeys = {
  all: ["failureReport"],
  lists: () => [...failureReportKeys.all, "list"],
  list: (filters = {}) => [...failureReportKeys.lists(), { ...filters }],
  details: () => [...failureReportKeys.all, "detail"],
  detail: (id) => [...failureReportKeys.details(), id]
};
var maintenanceLogKeys = {
  all: ["maintenanceLog"],
  lists: () => [...maintenanceLogKeys.all, "list"],
  list: (filters = {}) => [...maintenanceLogKeys.lists(), { ...filters }],
  details: () => [...maintenanceLogKeys.all, "detail"],
  detail: (id) => [...maintenanceLogKeys.details(), id]
};
var documentKeys = {
  all: ["document"],
  lists: () => [...documentKeys.all, "list"],
  list: (filters = {}) => [...documentKeys.lists(), { ...filters }],
  details: () => [...documentKeys.all, "detail"],
  detail: (id) => [...documentKeys.details(), id]
};
var fundsKeys = {
  all: ["funds"],
  balance: (buildingId) => [...fundsKeys.all, "balance", buildingId],
  summary: (buildingId) => [...fundsKeys.all, "summary", buildingId],
  graph: (buildingId) => [...fundsKeys.all, "graph", buildingId],
  income: (buildingId) => [...fundsKeys.all, "income", buildingId],
  transactions: (buildingId, filters = {}) => [...fundsKeys.all, "transactions", buildingId, { ...filters }]
};
var permissionKeys = {
  all: ["permission"],
  lists: () => [...permissionKeys.all, "list"],
  list: (filters = {}) => [...permissionKeys.lists(), { ...filters }],
  details: () => [...permissionKeys.all, "detail"],
  detail: (id) => [...permissionKeys.details(), id]
};
var recentKeys = {
  all: ["recent"],
  items: (buildingId, filters = {}) => [...recentKeys.all, buildingId, { ...filters }]
};
var adminKeys = {
  all: ["admin"],
  dashboard: () => [...adminKeys.all, "dashboard"],
  dashboardSummary: () => [...adminKeys.dashboard(), "summary"],
  users: (filters = {}) => [...adminKeys.all, "users", { ...filters }],
  buildings: (filters = {}) => [...adminKeys.all, "buildings", { ...filters }]
};
var queryKeys = {
  user: userKeys,
  building: buildingKeys,
  notice: noticeKeys,
  poll: pollKeys,
  event: eventKeys,
  failureReport: failureReportKeys,
  maintenanceLog: maintenanceLogKeys,
  document: documentKeys,
  funds: fundsKeys,
  permission: permissionKeys,
  recent: recentKeys,
  admin: adminKeys
};

// src/constants/role-permissions.ts
var unique = (arr) => [...new Set(arr)];
var ALL_READS = [
  ...domainPermissions("building", "read"),
  ...domainPermissions("user", "read"),
  ...domainPermissions("notice", "read"),
  ...domainPermissions("event", "read"),
  ...domainPermissions("poll", "read"),
  ...domainPermissions("failure_report", "read"),
  ...domainPermissions("maintenance_log", "read"),
  ...domainPermissions("financial", "read"),
  ...domainPermissions("document", "read"),
  ...domainPermissions("apartment", "read"),
  "house_rules:read",
  "faq:read"
];
var CO_OWNER_PERMISSIONS = [
  ...ALL_READS,
  ...domainPermissions("notice", "own"),
  ...domainPermissions("event", "own"),
  ...domainPermissions("poll", "own"),
  "poll:vote",
  ...domainPermissions("failure_report", "own"),
  ...domainPermissions("document", "own"),
  "vote:cast",
  "vote:weight_based",
  "user:delete:own"
];
var REPRESENTATIVE_PERMISSIONS = [
  ...CO_OWNER_PERMISSIONS,
  ...domainPermissions("notice", "manage"),
  ...domainPermissions("event", "manage"),
  ...domainPermissions("poll", "manage"),
  ...domainPermissions("failure_report", "manage"),
  ...domainPermissions("document", "manage"),
  "notice:approve",
  "notice:pin",
  "failure_report:approve",
  "event:approve",
  "poll:approve",
  "poll:finalize",
  "poll:delete_after_vote",
  "building:create",
  "building:update",
  "building:delete",
  "user:create",
  "user:kick",
  "building_role:assign",
  "building_role:update",
  "building_role:remove",
  "house_rules:manage",
  "building_settings:manage",
  "faq:manage:representative"
];
var ORG_ADMIN_BUILDING_PERMISSIONS = [
  ...REPRESENTATIVE_PERMISSIONS,
  ...domainPermissions("maintenance_log", "manage"),
  "financial:create",
  "financial:update",
  "financial:delete",
  "apartment:create",
  "apartment:update",
  "apartment:delete",
  "apartment:manage_users",
  "building:manage",
  "building:generate_otp",
  "user:update",
  "user:delete:any",
  "system:admin",
  "system:manage",
  "faq:manage:manager"
];
var SUPERVISOR_BUILDING_PERMISSIONS = [...ORG_ADMIN_BUILDING_PERMISSIONS];
var REFERENT_BUILDING_PERMISSIONS = [
  ...ALL_READS,
  ...domainPermissions("notice", "own"),
  ...domainPermissions("event", "own"),
  ...domainPermissions("failure_report", "own"),
  ...domainPermissions("document", "own")
];
var OPERATIVE_BUILDING_PERMISSIONS = [
  ...ALL_READS,
  "failure_report:update:own",
  "maintenance_log:update:own"
];
var ORG_ADMIN_ORG_PERMISSIONS = [
  "org:manage_members",
  "org:manage_roles",
  "org:assign_buildings",
  "org:assign_referents",
  "org:manage_settings",
  "org:view_analytics",
  "org:manage_contracts",
  "org:view_buildings"
];
var SUPERVISOR_ORG_PERMISSIONS = [
  "org:view_buildings",
  "org:view_analytics",
  "org:assign_referents"
];
var REFERENT_ORG_PERMISSIONS = ["org:view_buildings"];
var OPERATIVE_ORG_PERMISSIONS = ["org:view_buildings"];
var BUILDING_ROLE_PERMISSIONS = {
  [BuildingRole.CO_OWNER]: unique(CO_OWNER_PERMISSIONS),
  [BuildingRole.DEPUTY_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
  [BuildingRole.OWNER_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS)
};
var ORG_ROLE_PERMISSIONS = {
  [OrgRole.ORG_ADMIN]: unique([...ORG_ADMIN_BUILDING_PERMISSIONS, ...ORG_ADMIN_ORG_PERMISSIONS]),
  [OrgRole.SUPERVISOR]: unique([...SUPERVISOR_BUILDING_PERMISSIONS, ...SUPERVISOR_ORG_PERMISSIONS]),
  [OrgRole.REFERENT]: unique([...REFERENT_BUILDING_PERMISSIONS, ...REFERENT_ORG_PERMISSIONS]),
  [OrgRole.OPERATIVE]: unique([...OPERATIVE_BUILDING_PERMISSIONS, ...OPERATIVE_ORG_PERMISSIONS])
};
var PLATFORM_ROLE_PERMISSIONS = {
  [PlatformRole.PLATFORM_ADMIN]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content",
    "platform:manage_settings",
    "platform:manage_operatives",
    "platform:purge",
    "system:delete_user",
    "system:create_organization"
  ],
  [PlatformRole.PLATFORM_MODERATOR]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [PlatformRole.PLATFORM_SUPPORT]: [
    "platform:approve_buildings",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [PlatformRole.PLATFORM_OPERATIVE]: ["platform:view_analytics"]
};
var ALL_PERMISSIONS = unique(Object.values(Permission));
var ADMIN_ORG_PERMISSIONS = ORG_ROLE_PERMISSIONS[OrgRole.ORG_ADMIN];
var ADMIN_PLATFORM_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_ADMIN];

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminKeys, buildingKeys, documentKeys, eventKeys, failureReportKeys, fundsKeys, maintenanceLogKeys, noticeKeys, permissionKeys, pollKeys, queryKeys, recentKeys, userKeys };
//# sourceMappingURL=chunk-BKMSEUZD.js.map
//# sourceMappingURL=chunk-BKMSEUZD.js.map