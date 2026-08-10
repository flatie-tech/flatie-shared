import { LinkableEntityType, EntityLinkType, NotificationType, domainPermissions, BuildingRole, OrgRole, PlatformRole, Permission, UNIMPLEMENTED_NOTIFICATION_TYPES } from './chunk-ORODJY2W.js';

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
  LinkableEntityType.NOTICE,
  LinkableEntityType.EVENT,
  LinkableEntityType.POLL,
  LinkableEntityType.FAILURE_REPORT,
  LinkableEntityType.FILE,
  LinkableEntityType.BOARD_CARD
];
var ALLOWED_ENTITY_LINKS = [
  {
    source: LinkableEntityType.NOTICE,
    target: LinkableEntityType.EVENT,
    linkType: EntityLinkType.SCHEDULE
  },
  {
    source: LinkableEntityType.FAILURE_REPORT,
    target: LinkableEntityType.EVENT,
    linkType: EntityLinkType.SCHEDULE
  },
  {
    source: LinkableEntityType.EXPENSE_TRANSACTION,
    target: LinkableEntityType.FAILURE_REPORT,
    linkType: EntityLinkType.EXPENSE_FOR
  },
  {
    source: LinkableEntityType.EXPENSE_TRANSACTION,
    target: LinkableEntityType.POLL,
    linkType: EntityLinkType.BASED_ON
  },
  { source: "*", target: "*", linkType: EntityLinkType.RELATED_TO }
];
function isEntityLinkAllowed(source, target, linkType) {
  return ALLOWED_ENTITY_LINKS.some((rule) => {
    if (rule.linkType !== linkType) return false;
    const sourceOk = rule.source === "*" ? RELATED_TO_LINKABLE_TYPES.includes(source) : rule.source === source;
    const targetOk = rule.target === "*" ? RELATED_TO_LINKABLE_TYPES.includes(target) : rule.target === target;
    return sourceOk && targetOk;
  });
}

// src/constants/notification-topics.ts
var NOTIFICATION_TOPICS = [
  // ── Notices ──────────────────────────────────────────────────────────────
  { id: "notice_new", kind: "single", types: [NotificationType.NOTICE_CREATED] },
  {
    id: "notice_decision",
    kind: "merged",
    types: [NotificationType.NOTICE_APPROVED, NotificationType.NOTICE_REJECTED]
  },
  // ── Polls ────────────────────────────────────────────────────────────────
  { id: "poll_new", kind: "single", types: [NotificationType.POLL_CREATED] },
  {
    id: "poll_deadline",
    kind: "timing",
    types: [NotificationType.POLL_DEADLINE_24H, NotificationType.POLL_DEADLINE_1H]
  },
  { id: "poll_results", kind: "single", types: [NotificationType.POLL_FINALIZED] },
  {
    id: "ballot_review_pending",
    kind: "single",
    types: [NotificationType.POLL_VOTE_SIGNATURE_PENDING]
  },
  {
    id: "ballot_decision",
    kind: "merged",
    types: [
      NotificationType.POLL_VOTE_SIGNATURE_APPROVED,
      NotificationType.POLL_VOTE_SIGNATURE_REJECTED
    ]
  },
  // ── Events ───────────────────────────────────────────────────────────────
  { id: "event_new", kind: "single", types: [NotificationType.EVENT_CREATED] },
  {
    id: "event_reminder",
    kind: "timing",
    types: [NotificationType.EVENT_REMINDER_24H, NotificationType.EVENT_REMINDER_1H]
  },
  {
    id: "event_changes",
    kind: "merged",
    types: [NotificationType.EVENT_UPDATED, NotificationType.EVENT_CANCELLED]
  },
  // ── Waste ────────────────────────────────────────────────────────────────
  // Which fractions a building collects is building configuration, not a
  // personal preference, and the fraction is already named in the message.
  {
    id: "waste_collection",
    kind: "merged",
    types: [
      NotificationType.WASTE_REMINDER_MIXED,
      NotificationType.WASTE_REMINDER_BIO,
      NotificationType.WASTE_REMINDER_PLASTIC_METAL,
      NotificationType.WASTE_REMINDER_PAPER_CARDBOARD
    ]
  },
  // ── Maintenance ──────────────────────────────────────────────────────────
  {
    id: "failure_report_new",
    kind: "single",
    types: [NotificationType.FAILURE_REPORT_CREATED]
  },
  {
    id: "failure_report_progress",
    kind: "merged",
    types: [
      NotificationType.FAILURE_REPORT_STATUS_CHANGED,
      NotificationType.FAILURE_REPORT_RESOLVED
    ]
  },
  {
    id: "failure_report_decision",
    kind: "merged",
    types: [NotificationType.FAILURE_REPORT_APPROVED, NotificationType.FAILURE_REPORT_DECLINED]
  },
  // ── Chat / mailbox ───────────────────────────────────────────────────────
  { id: "chat_new_message", kind: "single", types: [NotificationType.CHAT_MESSAGE] },
  { id: "mailbox_new_message", kind: "single", types: [NotificationType.EMAIL_RECEIVED] },
  // ── Membership ───────────────────────────────────────────────────────────
  {
    id: "member_joined",
    kind: "single",
    types: [NotificationType.BUILDING_MEMBER_JOINED]
  },
  {
    id: "join_request_decision",
    kind: "merged",
    types: [
      NotificationType.BUILDING_JOIN_REQUEST_APPROVED,
      NotificationType.BUILDING_JOIN_REQUEST_REJECTED
    ]
  },
  {
    id: "join_request_received",
    kind: "single",
    types: [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]
  },
  // ── Building lifecycle (managerial) ──────────────────────────────────────
  {
    id: "building_pending",
    kind: "single",
    types: [NotificationType.BUILDING_PENDING_APPROVAL]
  },
  {
    id: "building_decision",
    kind: "merged",
    types: [NotificationType.BUILDING_APPROVED, NotificationType.BUILDING_REJECTED]
  }
];
var ALWAYS_ON_NOTIFICATION_TYPES = /* @__PURE__ */ new Set([
  NotificationType.BUILDING_ROLE_CHANGED,
  NotificationType.OWNER_RECORD_LINKED
]);
var ORG_SCOPED_NOTIFICATION_TYPES = /* @__PURE__ */ new Set([
  NotificationType.ORG_MEMBER_ADDED,
  NotificationType.ORG_MEMBER_REMOVED,
  NotificationType.ORG_MEMBER_ROLE_CHANGED
]);
var TOPIC_BY_TYPE = new Map(
  NOTIFICATION_TOPICS.flatMap((topic) => topic.types.map((t) => [t, topic]))
);
function getNotificationTopic(type) {
  return TOPIC_BY_TYPE.get(type) ?? null;
}
function getUngroupedNotificationTypes() {
  return Object.values(NotificationType).filter(
    (t) => !UNIMPLEMENTED_NOTIFICATION_TYPES.has(t) && !ALWAYS_ON_NOTIFICATION_TYPES.has(t) && !ORG_SCOPED_NOTIFICATION_TYPES.has(t) && !TOPIC_BY_TYPE.has(t)
  );
}
var MANAGERIAL_NOTIFICATION_TYPES = /* @__PURE__ */ new Set([
  NotificationType.BUILDING_JOIN_REQUEST_RECEIVED,
  NotificationType.POLL_VOTE_SIGNATURE_PENDING,
  NotificationType.FAILURE_REPORT_CREATED,
  NotificationType.BUILDING_PENDING_APPROVAL,
  NotificationType.BUILDING_APPROVED,
  NotificationType.BUILDING_REJECTED,
  NotificationType.EMAIL_RECEIVED
]);

// src/constants/notification-preference-state.ts
var SELECTABLE_CHANNELS = ["push", "email"];
var asSelectable = (channels) => SELECTABLE_CHANNELS.filter((c) => channels.includes(c));
function buildTopicStates(items) {
  const byTopicId = /* @__PURE__ */ new Map();
  for (const item of items) {
    const type = item.type;
    if (ALWAYS_ON_NOTIFICATION_TYPES.has(type) || ORG_SCOPED_NOTIFICATION_TYPES.has(type)) continue;
    const topic = getNotificationTopic(type) ?? {
      id: item.type,
      types: [type],
      kind: "single"
    };
    const entry = byTopicId.get(topic.id) ?? { topic, items: [] };
    entry.items.push(item);
    byTopicId.set(topic.id, entry);
  }
  return [...byTopicId.values()].map(({ topic, items: members }) => {
    const perMember = members.map((m) => m.enabled ? asSelectable(m.channels) : []);
    const first = perMember[0] ?? [];
    const mixed = perMember.some(
      (c) => c.length !== first.length || c.some((ch) => !first.includes(ch))
    );
    return {
      topic,
      // When members disagree, show the union so the row reflects everything
      // the person is still receiving — under-reporting would be worse.
      channels: mixed ? SELECTABLE_CHANNELS.filter((c) => perMember.some((m) => m.includes(c))) : first,
      mixed,
      enabled: members.some((m) => m.enabled),
      items: members
    };
  });
}
function buildTopicWrites(topic, channels) {
  const enabled = channels.length > 0;
  return [
    {
      notificationTypes: [...topic.types],
      enabled,
      channels: enabled ? ["in_app", ...channels] : []
    }
  ];
}
function toggleChannel(current, channel) {
  return current.includes(channel) ? current.filter((c) => c !== channel) : SELECTABLE_CHANNELS.filter((c) => c === channel || current.includes(c));
}
function getLeadTime(state) {
  if (state.topic.kind !== "timing" || state.topic.types.length < 2) return null;
  const early = state.topic.types[0];
  const late = state.topic.types[1];
  if (!early || !late) return null;
  const on = (t) => state.items.find((i) => i.type === t)?.enabled ?? false;
  if (on(early) && on(late)) return "both";
  if (on(early)) return "early";
  if (on(late)) return "late";
  return null;
}
function buildLeadTimeWrites(state, lead) {
  const early = state.topic.types[0];
  const late = state.topic.types[1];
  if (!early || !late) return [];
  const channels = state.channels.length > 0 ? state.channels : ["push"];
  const on = (t) => lead === "both" || lead === "early" && t === early || lead === "late" && t === late;
  return [early, late].map((type) => ({
    notificationTypes: [type],
    enabled: on(type),
    channels: on(type) ? ["in_app", ...channels] : []
  }));
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
  ...domainPermissions("building", "read"),
  ...domainPermissions("user", "read"),
  ...domainPermissions("notice", "read"),
  ...domainPermissions("event", "read"),
  ...domainPermissions("poll", "read"),
  ...domainPermissions("failure_report", "read"),
  ...domainPermissions("financial", "read"),
  ...domainPermissions("document", "read"),
  ...domainPermissions("unit", "read"),
  ...domainPermissions("apartment", "read"),
  // deprecated alias of unit:read
  "house_rules:read",
  "faq:read",
  "board_card:read"
];
var OWNER_ONLY_READS = ["financial:read", "board_card:read"];
var RESIDENT_PERMISSIONS = [
  // ALL_READS minus owner-only reads (fund balances, work board).
  ...ALL_READS.filter((p) => !OWNER_ONLY_READS.includes(p)),
  ...domainPermissions("notice", "own"),
  ...domainPermissions("event", "own"),
  ...domainPermissions("poll", "own"),
  "poll:vote",
  ...domainPermissions("failure_report", "own"),
  ...domainPermissions("document", "own"),
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
  // NOTE: building_email:view deliberately NOT granted — the building mailbox
  // (manager correspondence) is management-only (decision 2026-07-21); the
  // grant moved to REPRESENTATIVE_PERMISSIONS.
  "user:delete:own"
];
var OWNERSHIP_DERIVED_PERMISSIONS = unique([...OWNER_ONLY_READS]);
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
  ...domainPermissions("notice", "own"),
  ...domainPermissions("event", "own"),
  ...domainPermissions("failure_report", "own"),
  ...domainPermissions("document", "own")
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
    "platform:view_analytics"
    // NOT platform:moderate_content. That permission controls the blog, which
    // publishes to and deletes from the PUBLIC marketing site — a support-tier
    // action should never be visible to everyone on the internet. Removed
    // 2026-08-04; MODERATOR and ADMIN retain it.
  ],
  [PlatformRole.PLATFORM_OPERATIVE]: ["platform:view_analytics"]
};
var ALL_PERMISSIONS = unique(Object.values(Permission));
var ADMIN_ORG_PERMISSIONS = ORG_ROLE_PERMISSIONS[OrgRole.ORG_ADMIN];
var ADMIN_PLATFORM_PERMISSIONS = PLATFORM_ROLE_PERMISSIONS[PlatformRole.PLATFORM_ADMIN];

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, ALWAYS_ON_NOTIFICATION_TYPES, BUILDING_ROLE_PERMISSIONS, CHAT_CONVERSATIONS_POLL_MS, DEFAULT_PAGINATION_LIMIT, ENTITY_LINK_TYPE_META, MANAGERIAL_NOTIFICATION_TYPES, MAX_PAGINATION_LIMIT, NOTIFICATION_TOPICS, ORG_ROLE_PERMISSIONS, ORG_SCOPED_NOTIFICATION_TYPES, OWNERSHIP_DERIVED_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, SELECTABLE_CHANNELS, STANDARD_UNIT_PRICE_CENTS, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, auditLogKeys, blogKeys, boardKeys, buildLeadTimeWrites, buildTopicStates, buildTopicWrites, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, dsarKeys, enterpriseRequestKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, featureFlagKeys, fundsKeys, garageKeys, getLeadTime, getNotificationTopic, getUngroupedNotificationTypes, incomeKeys, isEntityLinkAllowed, layoutKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, platformFeatureKeys, platformSubscriptionKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, toggleChannel, transactionCategoryKeys, unitSearchKeys, userKeys, widgetKeys };
//# sourceMappingURL=chunk-6QS2SBBF.js.map
//# sourceMappingURL=chunk-6QS2SBBF.js.map