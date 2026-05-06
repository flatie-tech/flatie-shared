import { domainPermissions, BuildingRole, OrgRole, PlatformRole, Permission } from './chunk-KT36KDYK.js';

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
  info: () => userKeys.detail("info"),
  /** Current authenticated user. Convention matches `/users/me` REST shape. */
  me: () => [...userKeys.all, "me"],
  /** Current user's profile-screen data. */
  profile: () => [...userKeys.me(), "profile"]
};
var organizationKeys = {
  all: ["organization"],
  lists: () => [...organizationKeys.all, "list"],
  list: (filters = {}) => [...organizationKeys.lists(), { ...filters }],
  details: () => [...organizationKeys.all, "detail"],
  detail: (id) => [...organizationKeys.details(), id],
  quotas: (id) => [...organizationKeys.all, "quotas", id]
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
var buildingEmailKeys = {
  all: ["buildingEmail"],
  threads: (buildingId) => [...buildingEmailKeys.all, "threads", buildingId],
  threadList: (buildingId, filters = {}) => [...buildingEmailKeys.threads(buildingId), { ...filters }],
  thread: (buildingId, threadId) => [...buildingEmailKeys.threads(buildingId), threadId]
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
  expenses: (buildingId) => [...fundsKeys.all, "expenses", buildingId],
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
  /**
   * Building-scoped message list. The buildingId is part of the cache key
   * because Flatie's chat lives inside a building — the same conversationId
   * resolved against a different building would return different data, so
   * one-arg keys would collide.
   */
  messages: (buildingId, conversationId) => [...chatKeys.all, "messages", buildingId, conversationId],
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
var ownerKeys = {
  all: ["owner"],
  lists: () => [...ownerKeys.all, "list"],
  list: (buildingId, search) => [...ownerKeys.lists(), buildingId, search ?? null],
  details: () => [...ownerKeys.all, "detail"],
  detail: (buildingId, ownerId) => [...ownerKeys.details(), buildingId, ownerId],
  assignments: (buildingId, unitKind, unitId) => [...ownerKeys.all, "assignments", buildingId, unitKind, unitId]
};
var unitReminderKeys = {
  all: ["unitReminder"],
  list: (buildingId, unitKind, unitId) => [...unitReminderKeys.all, "list", buildingId, unitKind, unitId]
};
var businessPartnerKeys = {
  all: ["businessPartner"],
  lists: () => [...businessPartnerKeys.all, "list"],
  list: (orgId, params) => [
    ...businessPartnerKeys.lists(),
    orgId,
    params?.search ?? null,
    params?.activeOnly ?? null
  ],
  details: () => [...businessPartnerKeys.all, "detail"],
  detail: (orgId, partnerId) => [...businessPartnerKeys.details(), orgId, partnerId]
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
  buildingEmail: buildingEmailKeys,
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
  ...domainPermissions("notice", "own"),
  ...domainPermissions("event", "own"),
  ...domainPermissions("poll", "own"),
  "poll:vote",
  ...domainPermissions("failure_report", "own"),
  ...domainPermissions("document", "own"),
  "building_email:view",
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
  "user:update",
  "user:kick",
  "building_role:assign",
  "building_role:update",
  "building_role:remove",
  "house_rules:manage",
  "building_settings:manage",
  "building_email:manage",
  "faq:manage:representative",
  "apartment:update"
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
  "org:view_buildings",
  "org:view_partners",
  "org:manage_partners"
];
var SUPERVISOR_ORG_PERMISSIONS = [
  "org:view_buildings",
  "org:view_analytics",
  "org:assign_referents",
  "org:view_partners",
  "org:manage_partners"
];
var REFERENT_ORG_PERMISSIONS = ["org:view_buildings", "org:view_partners"];
var OPERATIVE_ORG_PERMISSIONS = ["org:view_buildings", "org:view_partners"];
var BUILDING_ROLE_PERMISSIONS = {
  [BuildingRole.RESIDENT]: unique(RESIDENT_PERMISSIONS),
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
    "platform:manage_subscriptions",
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

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, adminKeys, apartmentKeys, blogKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys };
//# sourceMappingURL=chunk-R47UEGM5.js.map
//# sourceMappingURL=chunk-R47UEGM5.js.map