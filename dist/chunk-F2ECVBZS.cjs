'use strict';

var chunkORB3GL74_cjs = require('./chunk-ORB3GL74.cjs');

// src/constants/defaults.ts
var DEFAULT_PAGINATION_LIMIT = 10;
var MAX_PAGINATION_LIMIT = 100;
var CHAT_CONVERSATIONS_POLL_MS = 15e3;
var STANDARD_UNIT_PRICE_CENTS = 99;

// src/constants/entity-link-meta.ts
var ENTITY_LINK_TYPE_META = {
  notice: { section: "notices", icon: "bell", tint: "orange" },
  event: { section: "calendar", icon: "calendar", tint: "success" },
  poll: { section: "polls", icon: "chart-pie", tint: "info" },
  failure_report: { section: "failure-reports", icon: "triangle-alert", tint: "danger" },
  file: { section: "documents", icon: "file-text", tint: "neutral" },
  expense_transaction: { section: "funds", icon: "receipt", tint: "amber" },
  board_card: { section: "board", icon: "square-kanban", tint: "info" }
};

// src/constants/entity-link-rules.ts
var RELATED_TO_LINKABLE_TYPES = [
  chunkORB3GL74_cjs.LinkableEntityType.NOTICE,
  chunkORB3GL74_cjs.LinkableEntityType.EVENT,
  chunkORB3GL74_cjs.LinkableEntityType.POLL,
  chunkORB3GL74_cjs.LinkableEntityType.FAILURE_REPORT,
  chunkORB3GL74_cjs.LinkableEntityType.FILE,
  chunkORB3GL74_cjs.LinkableEntityType.BOARD_CARD
];
var ALLOWED_ENTITY_LINKS = [
  {
    source: chunkORB3GL74_cjs.LinkableEntityType.NOTICE,
    target: chunkORB3GL74_cjs.LinkableEntityType.EVENT,
    linkType: chunkORB3GL74_cjs.EntityLinkType.SCHEDULE
  },
  {
    source: chunkORB3GL74_cjs.LinkableEntityType.FAILURE_REPORT,
    target: chunkORB3GL74_cjs.LinkableEntityType.EVENT,
    linkType: chunkORB3GL74_cjs.EntityLinkType.SCHEDULE
  },
  {
    source: chunkORB3GL74_cjs.LinkableEntityType.EXPENSE_TRANSACTION,
    target: chunkORB3GL74_cjs.LinkableEntityType.FAILURE_REPORT,
    linkType: chunkORB3GL74_cjs.EntityLinkType.EXPENSE_FOR
  },
  {
    source: chunkORB3GL74_cjs.LinkableEntityType.EXPENSE_TRANSACTION,
    target: chunkORB3GL74_cjs.LinkableEntityType.POLL,
    linkType: chunkORB3GL74_cjs.EntityLinkType.BASED_ON
  },
  { source: "*", target: "*", linkType: chunkORB3GL74_cjs.EntityLinkType.RELATED_TO }
];
function isEntityLinkAllowed(source, target, linkType) {
  return ALLOWED_ENTITY_LINKS.some((rule) => {
    if (rule.linkType !== linkType) return false;
    const sourceOk = rule.source === "*" ? RELATED_TO_LINKABLE_TYPES.includes(source) : rule.source === source;
    const targetOk = rule.target === "*" ? RELATED_TO_LINKABLE_TYPES.includes(target) : rule.target === target;
    return sourceOk && targetOk;
  });
}

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
  thread: (buildingId, threadId) => [...buildingEmailKeys.threads(buildingId), threadId],
  unreadCount: (buildingId) => [...buildingEmailKeys.all, "unreadCount", buildingId]
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
var entityLinkKeys = {
  all: ["entityLink"],
  lists: () => [...entityLinkKeys.all, "list"],
  list: (entityType, entityId) => [...entityLinkKeys.lists(), entityType, entityId]
};
var failureReportKeys = {
  all: ["failureReport"],
  lists: () => [...failureReportKeys.all, "list"],
  list: (filters = {}) => [...failureReportKeys.lists(), { ...filters }],
  details: () => [...failureReportKeys.all, "detail"],
  detail: (id) => [...failureReportKeys.details(), id]
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
var incomeKeys = {
  all: ["income"],
  lists: () => [...incomeKeys.all, "list"],
  list: (buildingId, filters = {}) => [...incomeKeys.lists(), buildingId, { ...filters }],
  details: () => [...incomeKeys.all, "detail"],
  detail: (id) => [...incomeKeys.details(), id]
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
  selfUser: (buildingId) => [...chatKeys.all, "selfUser", buildingId],
  // Org-scoped chat. The literal 'org' segment keeps these disjoint from the
  // buildingId-keyed entries above even when a building and an org share an id space.
  orgConversations: (orgId) => [...chatKeys.all, "conversations", "org", orgId],
  orgConversation: (orgId, conversationId) => [...chatKeys.all, "conversation", "org", orgId, conversationId],
  orgMessages: (orgId, conversationId) => [...chatKeys.all, "messages", "org", orgId, conversationId],
  orgUnreadCount: (orgId) => [...chatKeys.all, "unreadCount", "org", orgId]
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
var auditLogKeys = {
  all: ["auditLog"],
  lists: () => [...auditLogKeys.all, "list"],
  list: (filters = {}) => [...auditLogKeys.lists(), { ...filters }]
};
var platformSubscriptionKeys = {
  all: ["platformSubscription"],
  lists: () => [...platformSubscriptionKeys.all, "list"],
  list: (filters = {}) => [...platformSubscriptionKeys.lists(), { ...filters }],
  details: () => [...platformSubscriptionKeys.all, "detail"],
  detail: (id) => [...platformSubscriptionKeys.details(), id],
  revenue: () => [...platformSubscriptionKeys.all, "revenue"]
};
var enterpriseRequestKeys = {
  all: ["enterpriseRequest"],
  lists: () => [...enterpriseRequestKeys.all, "list"],
  list: (filters = {}) => [...enterpriseRequestKeys.lists(), { ...filters }]
};
var dsarKeys = {
  all: ["dsar"],
  lists: () => [...dsarKeys.all, "list"],
  list: (filters = {}) => [...dsarKeys.lists(), { ...filters }],
  details: () => [...dsarKeys.all, "detail"],
  detail: (id) => [...dsarKeys.details(), id]
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
  assignments: (buildingId, unitKind, unitId) => [...ownerKeys.all, "assignments", buildingId, unitKind, unitId],
  /** Building-wide current assignments — the owners board aggregate. */
  buildingAssignments: (buildingId) => [...ownerKeys.all, "building-assignments", buildingId]
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
var aiUsageKeys = {
  all: ["aiUsage"],
  detail: (buildingId) => [...aiUsageKeys.all, buildingId]
};
var boardKeys = {
  all: ["board"],
  /** The list of boards in a building. */
  boards: (buildingId) => [...boardKeys.all, "boards", buildingId],
  /** Columns of one board. */
  columns: (buildingId, boardId) => [...boardKeys.all, "columns", buildingId, boardId],
  /** Cards of one board. */
  cardLists: () => [...boardKeys.all, "cards"],
  cards: (buildingId, boardId) => [...boardKeys.cardLists(), buildingId, boardId],
  details: () => [...boardKeys.all, "detail"],
  detail: (id) => [...boardKeys.details(), id]
};
var queryKeys = {
  aiUsage: aiUsageKeys,
  board: boardKeys,
  user: userKeys,
  building: buildingKeys,
  buildingEmail: buildingEmailKeys,
  notice: noticeKeys,
  poll: pollKeys,
  event: eventKeys,
  failureReport: failureReportKeys,
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
  income: incomeKeys,
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
var platformFeatureKeys = {
  all: ["platformFeature"],
  list: () => [...platformFeatureKeys.all, "list"]
};
var featureFlagKeys = {
  all: ["featureFlags"],
  map: () => [...featureFlagKeys.all, "map"]
};

// src/constants/role-permissions.ts
var unique = (arr) => [...new Set(arr)];
var ALL_READS = [
  ...chunkORB3GL74_cjs.domainPermissions("building", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("user", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("notice", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("event", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("poll", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("failure_report", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("financial", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("document", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("unit", "read"),
  ...chunkORB3GL74_cjs.domainPermissions("apartment", "read"),
  // deprecated alias of unit:read
  "house_rules:read",
  "faq:read",
  "board_card:read"
];
var OWNER_ONLY_READS = ["financial:read", "board_card:read"];
var RESIDENT_PERMISSIONS = [
  // ALL_READS minus owner-only reads (fund balances, work board).
  ...ALL_READS.filter((p) => !OWNER_ONLY_READS.includes(p)),
  ...chunkORB3GL74_cjs.domainPermissions("notice", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("event", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("poll", "own"),
  "poll:vote",
  ...chunkORB3GL74_cjs.domainPermissions("failure_report", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("document", "own"),
  "user:delete:own"
];
var CO_OWNER_PERMISSIONS = [
  ...ALL_READS,
  ...chunkORB3GL74_cjs.domainPermissions("notice", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("event", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("poll", "own"),
  "poll:vote",
  ...chunkORB3GL74_cjs.domainPermissions("failure_report", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("document", "own"),
  // NOTE: building_email:view deliberately NOT granted — the building mailbox
  // (manager correspondence) is management-only (decision 2026-07-21); the
  // grant moved to REPRESENTATIVE_PERMISSIONS.
  "user:delete:own"
];
var OWNERSHIP_DERIVED_PERMISSIONS = unique([...OWNER_ONLY_READS]);
var REPRESENTATIVE_PERMISSIONS = [
  ...CO_OWNER_PERMISSIONS,
  ...chunkORB3GL74_cjs.domainPermissions("notice", "manage"),
  ...chunkORB3GL74_cjs.domainPermissions("event", "manage"),
  ...chunkORB3GL74_cjs.domainPermissions("poll", "manage"),
  ...chunkORB3GL74_cjs.domainPermissions("failure_report", "manage"),
  ...chunkORB3GL74_cjs.domainPermissions("document", "manage"),
  "notice:approve",
  "notice:pin",
  "failure_report:approve",
  "event:approve",
  "poll:approve",
  "poll:finalize",
  "poll:export_signers",
  "document:set_private",
  "chat:create_group",
  "building:update",
  "user:create",
  "user:update",
  "user:kick",
  "building_role:assign",
  "building_role:update",
  "building_role:remove",
  "building_settings:manage",
  // Self-managed buildings (no upravitelj org) are run by their predstavnik:
  // ToS §7.4 promises them the pričuva ledger, so reps hold the finance
  // writes too (T4 decision, 2026-07-30). Org-managed buildings are
  // unaffected — org roles already held these.
  "financial:create",
  "financial:update",
  "financial:delete",
  // Mailbox is management-only: reps get BOTH the read gate (view) and the
  // mutate gate (manage). view moved here from CO_OWNER_PERMISSIONS 2026-07-21.
  "building_email:view",
  "building_email:manage",
  "board_card:manage",
  "faq:manage:representative",
  "unit:update",
  "apartment:update"
  // deprecated alias of unit:update
];
var ORG_ADMIN_BUILDING_PERMISSIONS = [
  ...REPRESENTATIVE_PERMISSIONS,
  "financial:create",
  "financial:update",
  "financial:delete",
  "unit:create",
  "unit:update",
  "unit:delete",
  "unit:manage_users",
  "apartment:create",
  // deprecated aliases of unit:* below — granted during rename window
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
  ...chunkORB3GL74_cjs.domainPermissions("notice", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("event", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("failure_report", "own"),
  ...chunkORB3GL74_cjs.domainPermissions("document", "own")
];
var OPERATIVE_BUILDING_PERMISSIONS = [...ALL_READS, "failure_report:update:own"];
var ORG_ADMIN_ORG_PERMISSIONS = [
  "org:manage_members",
  "org:assign_buildings",
  "org:assign_referents",
  "org:manage_settings",
  "org:view_buildings",
  "org:view_partners",
  "org:manage_partners",
  "org:broadcast"
];
var SUPERVISOR_ORG_PERMISSIONS = [
  "org:view_buildings",
  "org:assign_referents",
  "org:view_partners",
  "org:manage_partners",
  "org:broadcast"
];
var REFERENT_ORG_PERMISSIONS = ["org:view_buildings", "org:view_partners"];
var OPERATIVE_ORG_PERMISSIONS = ["org:view_buildings", "org:view_partners"];
var BUILDING_ROLE_PERMISSIONS = {
  [chunkORB3GL74_cjs.BuildingRole.RESIDENT]: unique(RESIDENT_PERMISSIONS),
  [chunkORB3GL74_cjs.BuildingRole.CO_OWNER]: unique(CO_OWNER_PERMISSIONS),
  [chunkORB3GL74_cjs.BuildingRole.DEPUTY_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS),
  [chunkORB3GL74_cjs.BuildingRole.OWNER_REPRESENTATIVE]: unique(REPRESENTATIVE_PERMISSIONS)
};
var ORG_ROLE_PERMISSIONS = {
  [chunkORB3GL74_cjs.OrgRole.ORG_ADMIN]: unique([...ORG_ADMIN_BUILDING_PERMISSIONS, ...ORG_ADMIN_ORG_PERMISSIONS]),
  [chunkORB3GL74_cjs.OrgRole.SUPERVISOR]: unique([...SUPERVISOR_BUILDING_PERMISSIONS, ...SUPERVISOR_ORG_PERMISSIONS]),
  [chunkORB3GL74_cjs.OrgRole.REFERENT]: unique([...REFERENT_BUILDING_PERMISSIONS, ...REFERENT_ORG_PERMISSIONS]),
  [chunkORB3GL74_cjs.OrgRole.OPERATIVE]: unique([...OPERATIVE_BUILDING_PERMISSIONS, ...OPERATIVE_ORG_PERMISSIONS])
};
var PLATFORM_ROLE_PERMISSIONS = {
  [chunkORB3GL74_cjs.PlatformRole.PLATFORM_ADMIN]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content",
    "platform:manage_settings",
    "platform:manage_subscriptions",
    "platform:purge",
    "platform:view_archive",
    // ADMIN-only by design — see the permission enum for why each of these is
    // separate from the MODERATOR-held platform:manage_users.
    "platform:manage_staff",
    "platform:view_audit",
    "platform:manage_dsar",
    "system:delete_user",
    "system:create_organization"
  ],
  [chunkORB3GL74_cjs.PlatformRole.PLATFORM_MODERATOR]: [
    "platform:approve_buildings",
    "platform:manage_users",
    "platform:manage_orgs",
    "platform:view_orgs",
    "platform:view_analytics",
    "platform:moderate_content"
  ],
  [chunkORB3GL74_cjs.PlatformRole.PLATFORM_SUPPORT]: [
    "platform:approve_buildings",
    "platform:view_orgs",
    "platform:view_analytics"
    // NOT platform:moderate_content. That permission controls the blog, which
    // publishes to and deletes from the PUBLIC marketing site — a support-tier
    // action should never be visible to everyone on the internet. Removed
    // 2026-08-04; MODERATOR and ADMIN retain it.
  ],
  [chunkORB3GL74_cjs.PlatformRole.PLATFORM_OPERATIVE]: ["platform:view_analytics"]
};
var ALL_PERMISSIONS = unique(Object.values(chunkORB3GL74_cjs.Permission));
var ADMIN_ORG_PERMISSIONS = ORG_ROLE_PERMISSIONS[chunkORB3GL74_cjs.OrgRole.ORG_ADMIN];
var ADMIN_PLATFORM_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS[chunkORB3GL74_cjs.PlatformRole.PLATFORM_ADMIN];

exports.ADMIN_ORG_PERMISSIONS = ADMIN_ORG_PERMISSIONS;
exports.ADMIN_PLATFORM_PERMISSIONS = ADMIN_PLATFORM_PERMISSIONS;
exports.ALLOWED_ENTITY_LINKS = ALLOWED_ENTITY_LINKS;
exports.ALL_PERMISSIONS = ALL_PERMISSIONS;
exports.BUILDING_ROLE_PERMISSIONS = BUILDING_ROLE_PERMISSIONS;
exports.CHAT_CONVERSATIONS_POLL_MS = CHAT_CONVERSATIONS_POLL_MS;
exports.DEFAULT_PAGINATION_LIMIT = DEFAULT_PAGINATION_LIMIT;
exports.ENTITY_LINK_TYPE_META = ENTITY_LINK_TYPE_META;
exports.MAX_PAGINATION_LIMIT = MAX_PAGINATION_LIMIT;
exports.ORG_ROLE_PERMISSIONS = ORG_ROLE_PERMISSIONS;
exports.OWNERSHIP_DERIVED_PERMISSIONS = OWNERSHIP_DERIVED_PERMISSIONS;
exports.PLATFORM_ROLE_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS;
exports.RELATED_TO_LINKABLE_TYPES = RELATED_TO_LINKABLE_TYPES;
exports.STANDARD_UNIT_PRICE_CENTS = STANDARD_UNIT_PRICE_CENTS;
exports.adminBuildingKeys = adminBuildingKeys;
exports.adminKeys = adminKeys;
exports.aiUsageKeys = aiUsageKeys;
exports.apartmentKeys = apartmentKeys;
exports.auditLogKeys = auditLogKeys;
exports.blogKeys = blogKeys;
exports.boardKeys = boardKeys;
exports.buildingEmailKeys = buildingEmailKeys;
exports.buildingKeys = buildingKeys;
exports.businessPartnerKeys = businessPartnerKeys;
exports.chatKeys = chatKeys;
exports.dashboardSummaryKeys = dashboardSummaryKeys;
exports.documentKeys = documentKeys;
exports.dsarKeys = dsarKeys;
exports.enterpriseRequestKeys = enterpriseRequestKeys;
exports.entityLinkKeys = entityLinkKeys;
exports.eventKeys = eventKeys;
exports.failureReportKeys = failureReportKeys;
exports.faqKeys = faqKeys;
exports.featureFlagKeys = featureFlagKeys;
exports.fundsKeys = fundsKeys;
exports.garageKeys = garageKeys;
exports.incomeKeys = incomeKeys;
exports.isEntityLinkAllowed = isEntityLinkAllowed;
exports.layoutKeys = layoutKeys;
exports.noticeKeys = noticeKeys;
exports.notificationKeys = notificationKeys;
exports.organizationKeys = organizationKeys;
exports.ownerKeys = ownerKeys;
exports.permissionKeys = permissionKeys;
exports.platformBuildingKeys = platformBuildingKeys;
exports.platformFeatureKeys = platformFeatureKeys;
exports.platformSubscriptionKeys = platformSubscriptionKeys;
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
//# sourceMappingURL=chunk-F2ECVBZS.cjs.map
//# sourceMappingURL=chunk-F2ECVBZS.cjs.map