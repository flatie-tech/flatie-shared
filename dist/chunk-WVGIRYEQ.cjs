'use strict';

var chunkQTV2ZV2E_cjs = require('./chunk-QTV2ZV2E.cjs');

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
  users: (id, filters = {}) => [...buildingKeys.all, "users", id, { ...filters }],
  settings: (id) => [...buildingKeys.all, "settings", id],
  quotas: (id) => [...buildingKeys.all, "quotas", id],
  joinRequests: (id) => [...buildingKeys.all, "joinRequests", id],
  pending: () => [...buildingKeys.all, "pending"],
  chatVisibility: () => [...buildingKeys.all, "chatVisibility"],
  chatPermissions: (ids) => [...buildingKeys.all, "chatPermissions", ...ids ? [ids] : []],
  search: (query) => [...buildingKeys.all, "search", query]
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
  voters: (buildingId, pollId) => [...pollKeys.detail(pollId), "voters", buildingId]
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
var adminBuildingKeys = {
  all: ["adminBuilding"],
  lists: () => [...adminBuildingKeys.all, "list"],
  list: (filters = {}) => [...adminBuildingKeys.lists(), { ...filters }],
  details: () => [...adminBuildingKeys.all, "detail"],
  detail: (id) => [...adminBuildingKeys.details(), id]
};
var apartmentKeys = {
  all: ["apartment"],
  lists: () => [...apartmentKeys.all, "list"],
  list: (buildingId, filters = {}) => [...apartmentKeys.lists(), buildingId, { ...filters }],
  details: () => [...apartmentKeys.all, "detail"],
  detail: (id) => [...apartmentKeys.details(), id],
  floors: (buildingId) => [...apartmentKeys.all, "floors", buildingId]
};
var blogKeys = {
  all: ["blog"],
  lists: () => [...blogKeys.all, "list"],
  list: (filters = {}) => [...blogKeys.lists(), { ...filters }],
  details: () => [...blogKeys.all, "detail"],
  detail: (id) => [...blogKeys.details(), id],
  categories: () => [...blogKeys.all, "categories"]
};
var chatKeys = {
  all: ["chat"],
  conversations: (buildingId) => [...chatKeys.all, "conversations", buildingId],
  conversation: (buildingId, conversationId) => [...chatKeys.all, "conversation", buildingId, conversationId],
  messages: (conversationId) => [...chatKeys.all, "messages", conversationId],
  unreadCount: (buildingId) => [...chatKeys.all, "unreadCount", buildingId],
  buildingUsers: (buildingId, search) => [...chatKeys.all, "buildingUsers", buildingId, search],
  selfUser: (buildingId) => [...chatKeys.all, "selfUser", buildingId]
};
var dashboardSummaryKeys = {
  all: ["dashboardSummary"],
  summary: () => [...dashboardSummaryKeys.all, "summary"],
  platform: () => [...dashboardSummaryKeys.all, "platform"],
  representatives: () => [...dashboardSummaryKeys.all, "representatives"]
};
var faqKeys = {
  all: ["faq"],
  lists: () => [...faqKeys.all, "list"],
  list: (buildingId) => [...faqKeys.lists(), buildingId],
  details: () => [...faqKeys.all, "detail"],
  detail: (id) => [...faqKeys.details(), id]
};
var garageKeys = {
  all: ["garage"],
  lists: () => [...garageKeys.all, "list"],
  list: (buildingId) => [...garageKeys.lists(), buildingId],
  details: () => [...garageKeys.all, "detail"],
  detail: (id) => [...garageKeys.details(), id],
  floors: (buildingId) => [...garageKeys.all, "floors", buildingId]
};
var layoutKeys = {
  all: ["layout"],
  sidebar: () => [...layoutKeys.all, "sidebar"],
  config: (buildingId) => [...layoutKeys.all, "config", buildingId],
  building: (buildingId) => [...layoutKeys.all, "building", buildingId],
  kiosk: (buildingId) => [...layoutKeys.all, "kiosk", buildingId]
};
var notificationKeys = {
  all: ["notification"],
  lists: () => [...notificationKeys.all, "list"],
  list: (filters = {}) => [...notificationKeys.lists(), { ...filters }],
  unreadCount: () => [...notificationKeys.all, "unreadCount"],
  unreadCountByCategory: (buildingId) => [
    ...notificationKeys.all,
    "unreadCountByCategory",
    ...buildingId ? [buildingId] : []
  ],
  preferences: () => [...notificationKeys.all, "preferences"]
};
var platformBuildingKeys = {
  all: ["platformBuilding"],
  lists: () => [...platformBuildingKeys.all, "list"],
  list: (filters = {}) => [...platformBuildingKeys.lists(), { ...filters }],
  details: () => [...platformBuildingKeys.all, "detail"],
  detail: (id) => [...platformBuildingKeys.details(), id]
};
var recurringTemplateKeys = {
  all: ["recurringTemplate"],
  lists: () => [...recurringTemplateKeys.all, "list"],
  list: (buildingId) => [...recurringTemplateKeys.lists(), buildingId],
  details: () => [...recurringTemplateKeys.all, "detail"],
  detail: (id) => [...recurringTemplateKeys.details(), id]
};
var spotlightKeys = {
  all: ["spotlight"],
  search: (query) => [...spotlightKeys.all, "search", query],
  buildingSearch: (buildingId, query, limit) => [...spotlightKeys.all, "buildingSearch", buildingId, query, limit],
  platformSearch: (query, limit) => [...spotlightKeys.all, "platformSearch", query, limit]
};
var storageUnitKeys = {
  all: ["storageUnit"],
  lists: () => [...storageUnitKeys.all, "list"],
  list: (buildingId) => [...storageUnitKeys.lists(), buildingId],
  details: () => [...storageUnitKeys.all, "detail"],
  detail: (id) => [...storageUnitKeys.details(), id],
  floors: (buildingId) => [...storageUnitKeys.all, "floors", buildingId]
};
var transactionCategoryKeys = {
  all: ["transactionCategory"],
  lists: () => [...transactionCategoryKeys.all, "list"],
  list: (buildingId, type, search) => [...transactionCategoryKeys.lists(), buildingId, type, search],
  details: () => [...transactionCategoryKeys.all, "detail"],
  detail: (id) => [...transactionCategoryKeys.details(), id]
};
var unitSearchKeys = {
  all: ["unitSearch"],
  search: (buildingId, query) => [...unitSearchKeys.all, "search", buildingId, query],
  initial: (buildingId, unitId) => [...unitSearchKeys.all, "initial", buildingId, unitId],
  my: (buildingId) => [...unitSearchKeys.all, "my", buildingId]
};
var widgetKeys = {
  all: ["widget"],
  config: (buildingId) => [...widgetKeys.all, "config", buildingId],
  data: (buildingId, widgetId) => [...widgetKeys.all, "data", buildingId, widgetId],
  notices: (buildingId) => [...widgetKeys.all, "notices", buildingId]
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
  admin: adminKeys,
  adminBuilding: adminBuildingKeys,
  apartment: apartmentKeys,
  blog: blogKeys,
  chat: chatKeys,
  dashboardSummary: dashboardSummaryKeys,
  faq: faqKeys,
  garage: garageKeys,
  layout: layoutKeys,
  notification: notificationKeys,
  platformBuilding: platformBuildingKeys,
  recurringTemplate: recurringTemplateKeys,
  spotlight: spotlightKeys,
  storageUnit: storageUnitKeys,
  transactionCategory: transactionCategoryKeys,
  unitSearch: unitSearchKeys,
  widget: widgetKeys
};

// src/constants/role-permissions.ts
var unique = (arr) => [...new Set(arr)];
var ALL_READS = [
  ...chunkQTV2ZV2E_cjs.domainPermissions("building", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("user", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("notice", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("event", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("poll", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("failure_report", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("maintenance_log", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("financial", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("document", "read"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("apartment", "read"),
  "house_rules:read",
  "faq:read"
];
var RESIDENT_PERMISSIONS = [
  // ALL_READS minus financial:read — residents don't see fund balances.
  ...ALL_READS.filter((p) => p !== "financial:read"),
  // File their own issue reports (plumbing, heating, common-area issues).
  "failure_report:create",
  "failure_report:update:own",
  "failure_report:delete:own",
  "user:delete:own"
];
var CO_OWNER_PERMISSIONS = [
  ...ALL_READS,
  ...chunkQTV2ZV2E_cjs.domainPermissions("notice", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("event", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("poll", "own"),
  "poll:vote",
  ...chunkQTV2ZV2E_cjs.domainPermissions("failure_report", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("document", "own"),
  "vote:cast",
  "vote:weight_based",
  "user:delete:own"
];
var REPRESENTATIVE_PERMISSIONS = [
  ...CO_OWNER_PERMISSIONS,
  ...chunkQTV2ZV2E_cjs.domainPermissions("notice", "manage"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("event", "manage"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("poll", "manage"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("failure_report", "manage"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("document", "manage"),
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
  "faq:manage:representative",
  "apartment:update"
];
var ORG_ADMIN_BUILDING_PERMISSIONS = [
  ...REPRESENTATIVE_PERMISSIONS,
  ...chunkQTV2ZV2E_cjs.domainPermissions("maintenance_log", "manage"),
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
  ...chunkQTV2ZV2E_cjs.domainPermissions("notice", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("event", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("failure_report", "own"),
  ...chunkQTV2ZV2E_cjs.domainPermissions("document", "own")
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
  [chunkQTV2ZV2E_cjs.BuildingRole.RESIDENT]: unique(RESIDENT_PERMISSIONS),
  [chunkQTV2ZV2E_cjs.BuildingRole.CO_OWNER]: unique(CO_OWNER_PERMISSIONS),
  [chunkQTV2ZV2E_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
  [chunkQTV2ZV2E_cjs.BuildingRole.OWNER_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS)
};
var ORG_ROLE_PERMISSIONS = {
  [chunkQTV2ZV2E_cjs.OrgRole.ORG_ADMIN]: unique([...ORG_ADMIN_BUILDING_PERMISSIONS, ...ORG_ADMIN_ORG_PERMISSIONS]),
  [chunkQTV2ZV2E_cjs.OrgRole.SUPERVISOR]: unique([...SUPERVISOR_BUILDING_PERMISSIONS, ...SUPERVISOR_ORG_PERMISSIONS]),
  [chunkQTV2ZV2E_cjs.OrgRole.REFERENT]: unique([...REFERENT_BUILDING_PERMISSIONS, ...REFERENT_ORG_PERMISSIONS]),
  [chunkQTV2ZV2E_cjs.OrgRole.OPERATIVE]: unique([...OPERATIVE_BUILDING_PERMISSIONS, ...OPERATIVE_ORG_PERMISSIONS])
};
var PLATFORM_ROLE_PERMISSIONS = {
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_ADMIN]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content",
    "platform:manage_settings",
    "platform:manage_operatives",
    "platform:manage_subscriptions",
    "platform:purge",
    "system:delete_user",
    "system:create_organization"
  ],
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_MODERATOR]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_SUPPORT]: [
    "platform:approve_buildings",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_OPERATIVE]: ["platform:view_analytics"]
};
var ALL_PERMISSIONS = unique(Object.values(chunkQTV2ZV2E_cjs.Permission));
var ADMIN_ORG_PERMISSIONS = ORG_ROLE_PERMISSIONS[chunkQTV2ZV2E_cjs.OrgRole.ORG_ADMIN];
var ADMIN_PLATFORM_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS[chunkQTV2ZV2E_cjs.PlatformRole.PLATFORM_ADMIN];

exports.ADMIN_ORG_PERMISSIONS = ADMIN_ORG_PERMISSIONS;
exports.ADMIN_PLATFORM_PERMISSIONS = ADMIN_PLATFORM_PERMISSIONS;
exports.ALL_PERMISSIONS = ALL_PERMISSIONS;
exports.BUILDING_ROLE_PERMISSIONS = BUILDING_ROLE_PERMISSIONS;
exports.DEFAULT_PAGINATION_LIMIT = DEFAULT_PAGINATION_LIMIT;
exports.MAX_PAGINATION_LIMIT = MAX_PAGINATION_LIMIT;
exports.ORG_ROLE_PERMISSIONS = ORG_ROLE_PERMISSIONS;
exports.PLATFORM_ROLE_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS;
exports.adminBuildingKeys = adminBuildingKeys;
exports.adminKeys = adminKeys;
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
exports.queryKeys = queryKeys;
exports.recentKeys = recentKeys;
exports.recurringTemplateKeys = recurringTemplateKeys;
exports.spotlightKeys = spotlightKeys;
exports.storageUnitKeys = storageUnitKeys;
exports.transactionCategoryKeys = transactionCategoryKeys;
exports.unitSearchKeys = unitSearchKeys;
exports.userKeys = userKeys;
exports.widgetKeys = widgetKeys;
//# sourceMappingURL=chunk-WVGIRYEQ.cjs.map
//# sourceMappingURL=chunk-WVGIRYEQ.cjs.map