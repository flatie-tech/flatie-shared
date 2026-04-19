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
  settings: (id) => [...buildingKeys.all, "settings", id],
  users: (id, filters = {}) => [...buildingKeys.all, "users", id, { ...filters }],
  joinRequests: (id) => [...buildingKeys.all, "joinRequests", id],
  search: (query) => [...buildingKeys.all, "search", query],
  pending: () => ["buildings", "my", "pending"],
  chatVisibility: () => ["buildings", "chat-visibility"],
  chatPermissions: (buildingIds) => ["building-permissions", "chat-visibility", ...buildingIds ? [buildingIds] : []]
};
var adminBuildingKeys = {
  all: ["admin-buildings"],
  lists: () => [...adminBuildingKeys.all, "list"]
};
var platformBuildingKeys = {
  all: ["platform-buildings"],
  lists: () => [...platformBuildingKeys.all, "list"]
};
var apartmentKeys = {
  all: ["apartment"],
  lists: () => [...apartmentKeys.all, "list"],
  list: (buildingId, filters = {}) => [...apartmentKeys.lists(), buildingId, { ...filters }],
  details: () => [...apartmentKeys.all, "detail"],
  detail: (buildingId, apartmentId) => [...apartmentKeys.details(), buildingId, apartmentId]
};
var garageKeys = {
  all: ["garage"],
  lists: () => [...garageKeys.all, "list"],
  list: (buildingId) => [...garageKeys.lists(), buildingId]
};
var storageUnitKeys = {
  all: ["storageUnit"],
  lists: () => [...storageUnitKeys.all, "list"],
  list: (buildingId) => [...storageUnitKeys.lists(), buildingId]
};
var noticeKeys = {
  all: ["notice"],
  lists: () => [...noticeKeys.all, "list"],
  list: (filters = {}) => [...noticeKeys.lists(), { ...filters }],
  details: () => [...noticeKeys.all, "detail"],
  detail: (id) => [...noticeKeys.details(), id]
};
var permissionKeys = {
  all: ["permission"],
  lists: () => [...permissionKeys.all, "list"],
  list: (filters = {}) => [...permissionKeys.lists(), { ...filters }],
  details: () => [...permissionKeys.all, "detail"],
  detail: (id) => [...permissionKeys.details(), id]
};
var maintenanceLogKeys = {
  all: ["maintenanceLog"],
  lists: () => [...maintenanceLogKeys.all, "list"],
  list: (filters = {}) => [...maintenanceLogKeys.lists(), { ...filters }],
  details: () => [...maintenanceLogKeys.all, "detail"],
  detail: (id) => [...maintenanceLogKeys.details(), id]
};
var failureReportKeys = {
  all: ["failureReport"],
  lists: () => [...failureReportKeys.all, "list"],
  list: (filters = {}) => [...failureReportKeys.lists(), { ...filters }],
  details: () => [...failureReportKeys.all, "detail"],
  detail: (id) => [...failureReportKeys.details(), id]
};
var eventKeys = {
  all: ["event"],
  lists: () => [...eventKeys.all, "list"],
  list: (filters = {}) => [...eventKeys.lists(), { ...filters }],
  details: () => [...eventKeys.all, "detail"],
  detail: (id) => [...eventKeys.details(), id]
};
var pollKeys = {
  all: ["poll"],
  lists: () => [...pollKeys.all, "list"],
  list: (filters = {}) => [...pollKeys.lists(), { ...filters }],
  details: () => [...pollKeys.all, "detail"],
  detail: (id) => [...pollKeys.details(), id],
  voters: (buildingId, pollId) => [...pollKeys.all, "voters", buildingId, pollId]
};
var fundsKeys = {
  all: ["funds"],
  balance: (buildingId) => [...fundsKeys.all, "balance", buildingId],
  summary: (buildingId) => [...fundsKeys.all, "summary", buildingId],
  graph: (buildingId) => [...fundsKeys.all, "graph", buildingId],
  income: (buildingId) => [...fundsKeys.all, "income", buildingId]
};
var documentKeys = {
  all: ["document"],
  lists: () => [...documentKeys.all, "list"],
  list: (filters = {}) => [...documentKeys.lists(), { ...filters }],
  details: () => [...documentKeys.all, "detail"],
  detail: (id) => [...documentKeys.details(), id]
};
var recentKeys = {
  all: ["recent"],
  items: (buildingId, filters = {}) => [...recentKeys.all, buildingId, { ...filters }]
};
var transactionCategoryKeys = {
  all: ["transactionCategory"],
  lists: () => [...transactionCategoryKeys.all, "list"],
  list: (buildingId, type, search) => [...transactionCategoryKeys.lists(), buildingId, type, search]
};
var faqKeys = {
  all: ["faq"],
  lists: () => [...faqKeys.all, "list"],
  list: (buildingId) => [...faqKeys.lists(), buildingId]
};
var chatKeys = {
  all: ["chat"],
  conversations: (buildingId) => [...chatKeys.all, "conversations", buildingId],
  conversation: (conversationId) => [...chatKeys.all, "conversation", conversationId],
  messages: (conversationId) => [...chatKeys.all, "messages", conversationId],
  unreadCount: (buildingId) => [...chatKeys.all, "unreadCount", buildingId],
  buildingUsers: (buildingId, search) => [...chatKeys.all, "building-users", buildingId, search],
  selfUser: (buildingId) => [...chatKeys.all, "building-users-self", buildingId]
};
var blogKeys = {
  all: ["blog"],
  lists: () => [...blogKeys.all, "list"],
  list: (filters = {}) => [...blogKeys.lists(), { ...filters }],
  details: () => [...blogKeys.all, "detail"],
  detail: (id) => [...blogKeys.details(), id]
};
var layoutKeys = {
  all: ["building-layouts"],
  building: (buildingId) => [...layoutKeys.all, buildingId],
  kiosk: (buildingId) => ["kiosk-layout", buildingId]
};
var recurringTemplateKeys = {
  all: ["recurring-templates"],
  list: (buildingId) => [...recurringTemplateKeys.all, buildingId]
};
var spotlightKeys = {
  all: ["spotlight"],
  buildingSearch: (buildingId, query, limit) => [...spotlightKeys.all, "building", buildingId, query, limit],
  platformSearch: (query, limit) => [...spotlightKeys.all, "platform", query, limit]
};
var dashboardSummaryKeys = {
  all: ["dashboard"],
  summary: () => [...dashboardSummaryKeys.all, "summary"]
};
var unitSearchKeys = {
  all: ["units"],
  search: (buildingId, query) => [...unitSearchKeys.all, "search", buildingId, query],
  initial: (buildingId, unitId) => [...unitSearchKeys.all, "search", buildingId, "__initial", unitId],
  my: (buildingId) => [...unitSearchKeys.all, "my", buildingId]
};
var widgetKeys = {
  all: ["widget"],
  notices: (buildingId) => [...widgetKeys.all, "notices", buildingId]
};
var notificationKeys = {
  all: ["notification"],
  lists: () => [...notificationKeys.all, "list"],
  list: (filters = {}) => [...notificationKeys.lists(), { ...filters }],
  unreadCount: () => [...notificationKeys.all, "unreadCount"],
  unreadCountByCategory: (buildingId) => [...notificationKeys.all, "unreadCountByCategory", buildingId],
  preferences: () => [...notificationKeys.all, "preferences"]
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
exports.adminBuildingKeys = adminBuildingKeys;
exports.apartmentKeys = apartmentKeys;
exports.blogKeys = blogKeys;
exports.buildingKeys = buildingKeys;
exports.chatKeys = chatKeys;
exports.dashboardSummaryKeys = dashboardSummaryKeys;
exports.documentKeys = documentKeys;
exports.eventKeys = eventKeys;
exports.failureReportKeys = failureReportKeys;
exports.faqKeys = faqKeys;
exports.fundsKeys = fundsKeys;
exports.garageKeys = garageKeys;
exports.layoutKeys = layoutKeys;
exports.maintenanceLogKeys = maintenanceLogKeys;
exports.noticeKeys = noticeKeys;
exports.notificationKeys = notificationKeys;
exports.permissionKeys = permissionKeys;
exports.platformBuildingKeys = platformBuildingKeys;
exports.pollKeys = pollKeys;
exports.recentKeys = recentKeys;
exports.recurringTemplateKeys = recurringTemplateKeys;
exports.spotlightKeys = spotlightKeys;
exports.storageUnitKeys = storageUnitKeys;
exports.transactionCategoryKeys = transactionCategoryKeys;
exports.unitSearchKeys = unitSearchKeys;
exports.userKeys = userKeys;
exports.widgetKeys = widgetKeys;
//# sourceMappingURL=chunk-VAH6ECJG.cjs.map
//# sourceMappingURL=chunk-VAH6ECJG.cjs.map