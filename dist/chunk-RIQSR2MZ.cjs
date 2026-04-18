'use strict';

var chunk5UBJHQVX_cjs = require('./chunk-5UBJHQVX.cjs');

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
  ...chunk5UBJHQVX_cjs.domainPermissions("building", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("user", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("notice", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("event", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("poll", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("failure_report", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("maintenance_log", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("financial", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("document", "read"),
  ...chunk5UBJHQVX_cjs.domainPermissions("apartment", "read"),
  "house_rules:read",
  "faq:read"
];
var CO_OWNER_PERMISSIONS = [
  ...ALL_READS,
  ...chunk5UBJHQVX_cjs.domainPermissions("notice", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("event", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("poll", "own"),
  "poll:vote",
  ...chunk5UBJHQVX_cjs.domainPermissions("failure_report", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("document", "own"),
  "vote:cast",
  "vote:weight_based",
  "user:delete:own"
];
var REPRESENTATIVE_PERMISSIONS = [
  ...CO_OWNER_PERMISSIONS,
  ...chunk5UBJHQVX_cjs.domainPermissions("notice", "manage"),
  ...chunk5UBJHQVX_cjs.domainPermissions("event", "manage"),
  ...chunk5UBJHQVX_cjs.domainPermissions("poll", "manage"),
  ...chunk5UBJHQVX_cjs.domainPermissions("failure_report", "manage"),
  ...chunk5UBJHQVX_cjs.domainPermissions("document", "manage"),
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
  ...chunk5UBJHQVX_cjs.domainPermissions("maintenance_log", "manage"),
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
  ...chunk5UBJHQVX_cjs.domainPermissions("notice", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("event", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("failure_report", "own"),
  ...chunk5UBJHQVX_cjs.domainPermissions("document", "own")
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
  [chunk5UBJHQVX_cjs.BuildingRole.CO_OWNER]: unique(CO_OWNER_PERMISSIONS),
  [chunk5UBJHQVX_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
  [chunk5UBJHQVX_cjs.BuildingRole.OWNER_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS)
};
var ORG_ROLE_PERMISSIONS = {
  [chunk5UBJHQVX_cjs.OrgRole.ORG_ADMIN]: unique([...ORG_ADMIN_BUILDING_PERMISSIONS, ...ORG_ADMIN_ORG_PERMISSIONS]),
  [chunk5UBJHQVX_cjs.OrgRole.SUPERVISOR]: unique([...SUPERVISOR_BUILDING_PERMISSIONS, ...SUPERVISOR_ORG_PERMISSIONS]),
  [chunk5UBJHQVX_cjs.OrgRole.REFERENT]: unique([...REFERENT_BUILDING_PERMISSIONS, ...REFERENT_ORG_PERMISSIONS]),
  [chunk5UBJHQVX_cjs.OrgRole.OPERATIVE]: unique([...OPERATIVE_BUILDING_PERMISSIONS, ...OPERATIVE_ORG_PERMISSIONS])
};
var PLATFORM_ROLE_PERMISSIONS = {
  [chunk5UBJHQVX_cjs.PlatformRole.PLATFORM_ADMIN]: [
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
  [chunk5UBJHQVX_cjs.PlatformRole.PLATFORM_MODERATOR]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [chunk5UBJHQVX_cjs.PlatformRole.PLATFORM_SUPPORT]: [
    "platform:approve_buildings",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [chunk5UBJHQVX_cjs.PlatformRole.PLATFORM_OPERATIVE]: ["platform:view_analytics"]
};
var ALL_PERMISSIONS = unique(Object.values(chunk5UBJHQVX_cjs.Permission));
var ADMIN_ORG_PERMISSIONS = ORG_ROLE_PERMISSIONS[chunk5UBJHQVX_cjs.OrgRole.ORG_ADMIN];
var ADMIN_PLATFORM_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS[chunk5UBJHQVX_cjs.PlatformRole.PLATFORM_ADMIN];

exports.ADMIN_ORG_PERMISSIONS = ADMIN_ORG_PERMISSIONS;
exports.ADMIN_PLATFORM_PERMISSIONS = ADMIN_PLATFORM_PERMISSIONS;
exports.ALL_PERMISSIONS = ALL_PERMISSIONS;
exports.BUILDING_ROLE_PERMISSIONS = BUILDING_ROLE_PERMISSIONS;
exports.DEFAULT_PAGINATION_LIMIT = DEFAULT_PAGINATION_LIMIT;
exports.MAX_PAGINATION_LIMIT = MAX_PAGINATION_LIMIT;
exports.ORG_ROLE_PERMISSIONS = ORG_ROLE_PERMISSIONS;
exports.PLATFORM_ROLE_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS;
exports.adminKeys = adminKeys;
exports.buildingKeys = buildingKeys;
exports.documentKeys = documentKeys;
exports.eventKeys = eventKeys;
exports.failureReportKeys = failureReportKeys;
exports.fundsKeys = fundsKeys;
exports.maintenanceLogKeys = maintenanceLogKeys;
exports.noticeKeys = noticeKeys;
exports.permissionKeys = permissionKeys;
exports.pollKeys = pollKeys;
exports.queryKeys = queryKeys;
exports.recentKeys = recentKeys;
exports.userKeys = userKeys;
//# sourceMappingURL=chunk-RIQSR2MZ.cjs.map
//# sourceMappingURL=chunk-RIQSR2MZ.cjs.map