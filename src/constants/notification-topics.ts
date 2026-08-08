import { NotificationType, UNIMPLEMENTED_NOTIFICATION_TYPES } from '../enums/notification.enum';

/**
 * Notification **topics** — the user-facing unit of notification preference.
 *
 * A notification *type* is a storage and emit concern: `NOTICE_APPROVED` and
 * `NOTICE_REJECTED` are separate types because the backend emits one or the
 * other from a single ternary. To a person they are one thing — "what happened
 * to the notice I posted" — and offering two switches for it asks a question
 * nobody has. A topic groups 1..n types under one control.
 *
 * Why this lives in shared rather than in the web feature folder: three
 * surfaces render notification preferences — the settings page, mobile's
 * `app/notifications/preferences.tsx`, and `FeatureNotificationPopover` on the
 * feature boards. If the grouping lived in one of them, the others would
 * re-expose the duplicates and the surfaces would disagree about what "off"
 * means for the same notification.
 *
 * Labels are NOT here. Copy belongs to each client's i18n catalogue, keyed by
 * `topicId` — this module is structure only.
 */

/** Groups whose members are one question with several outcomes or timings. */
export interface NotificationTopic {
  /** Stable id; the i18n key both clients translate (`topic_<id>`). */
  readonly id: string;
  /** The types this topic writes to. Order is display order where it shows. */
  readonly types: readonly NotificationType[];
  /**
   * `timing` topics differ from plain merges: their members are the *same*
   * event at different lead times, so a client should offer a lead-time
   * chooser rather than one on/off. Members are ordered earliest-first.
   */
  readonly kind: 'single' | 'merged' | 'timing';
}

export const NOTIFICATION_TOPICS: readonly NotificationTopic[] = [
  // ── Notices ──────────────────────────────────────────────────────────────
  { id: 'notice_new', kind: 'single', types: [NotificationType.NOTICE_CREATED] },
  {
    id: 'notice_decision',
    kind: 'merged',
    types: [NotificationType.NOTICE_APPROVED, NotificationType.NOTICE_REJECTED],
  },

  // ── Polls ────────────────────────────────────────────────────────────────
  { id: 'poll_new', kind: 'single', types: [NotificationType.POLL_CREATED] },
  {
    id: 'poll_deadline',
    kind: 'timing',
    types: [NotificationType.POLL_DEADLINE_24H, NotificationType.POLL_DEADLINE_1H],
  },
  { id: 'poll_results', kind: 'single', types: [NotificationType.POLL_FINALIZED] },
  {
    id: 'ballot_review_pending',
    kind: 'single',
    types: [NotificationType.POLL_VOTE_SIGNATURE_PENDING],
  },
  {
    id: 'ballot_decision',
    kind: 'merged',
    types: [
      NotificationType.POLL_VOTE_SIGNATURE_APPROVED,
      NotificationType.POLL_VOTE_SIGNATURE_REJECTED,
    ],
  },

  // ── Events ───────────────────────────────────────────────────────────────
  { id: 'event_new', kind: 'single', types: [NotificationType.EVENT_CREATED] },
  {
    id: 'event_reminder',
    kind: 'timing',
    types: [NotificationType.EVENT_REMINDER_24H, NotificationType.EVENT_REMINDER_1H],
  },
  {
    id: 'event_changes',
    kind: 'merged',
    types: [NotificationType.EVENT_UPDATED, NotificationType.EVENT_CANCELLED],
  },

  // ── Waste ────────────────────────────────────────────────────────────────
  // Which fractions a building collects is building configuration, not a
  // personal preference, and the fraction is already named in the message.
  {
    id: 'waste_collection',
    kind: 'merged',
    types: [
      NotificationType.WASTE_REMINDER_MIXED,
      NotificationType.WASTE_REMINDER_BIO,
      NotificationType.WASTE_REMINDER_PLASTIC_METAL,
      NotificationType.WASTE_REMINDER_PAPER_CARDBOARD,
    ],
  },

  // ── Maintenance ──────────────────────────────────────────────────────────
  {
    id: 'failure_report_new',
    kind: 'single',
    types: [NotificationType.FAILURE_REPORT_CREATED],
  },
  {
    id: 'failure_report_progress',
    kind: 'merged',
    types: [
      NotificationType.FAILURE_REPORT_STATUS_CHANGED,
      NotificationType.FAILURE_REPORT_RESOLVED,
    ],
  },
  {
    id: 'failure_report_decision',
    kind: 'merged',
    types: [NotificationType.FAILURE_REPORT_APPROVED, NotificationType.FAILURE_REPORT_DECLINED],
  },

  // ── Chat / mailbox ───────────────────────────────────────────────────────
  { id: 'chat_new_message', kind: 'single', types: [NotificationType.CHAT_MESSAGE] },
  { id: 'mailbox_new_message', kind: 'single', types: [NotificationType.EMAIL_RECEIVED] },

  // ── Membership ───────────────────────────────────────────────────────────
  {
    id: 'member_joined',
    kind: 'single',
    types: [NotificationType.BUILDING_MEMBER_JOINED],
  },
  {
    id: 'join_request_decision',
    kind: 'merged',
    types: [
      NotificationType.BUILDING_JOIN_REQUEST_APPROVED,
      NotificationType.BUILDING_JOIN_REQUEST_REJECTED,
    ],
  },
  {
    id: 'join_request_received',
    kind: 'single',
    types: [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED],
  },

  // ── Building lifecycle (managerial) ──────────────────────────────────────
  {
    id: 'building_pending',
    kind: 'single',
    types: [NotificationType.BUILDING_PENDING_APPROVAL],
  },
  {
    id: 'building_decision',
    kind: 'merged',
    types: [NotificationType.BUILDING_APPROVED, NotificationType.BUILDING_REJECTED],
  },
] as const;

/**
 * Types that carry no preference at all — they describe a change to the
 * reader's own access, and someone who mutes "your role changed" and then
 * cannot explain why the app looks different becomes a support ticket.
 * Clients list these read-only rather than pretending they are switches.
 */
export const ALWAYS_ON_NOTIFICATION_TYPES: ReadonlySet<NotificationType> =
  new Set<NotificationType>([
    NotificationType.BUILDING_ROLE_CHANGED,
    NotificationType.OWNER_RECORD_LINKED,
  ]);

/**
 * Org-membership events target property-management staff in an org context,
 * not residents of a building. They are excluded from the building-scoped
 * preferences UI entirely rather than shown to everyone as `system` noise.
 */
export const ORG_SCOPED_NOTIFICATION_TYPES: ReadonlySet<NotificationType> =
  new Set<NotificationType>([
    NotificationType.ORG_MEMBER_ADDED,
    NotificationType.ORG_MEMBER_REMOVED,
    NotificationType.ORG_MEMBER_ROLE_CHANGED,
  ]);

const TOPIC_BY_TYPE: ReadonlyMap<NotificationType, NotificationTopic> = new Map(
  NOTIFICATION_TOPICS.flatMap((topic) => topic.types.map((t) => [t, topic] as const)),
);

/**
 * The topic a type belongs to, or `null` for always-on / org-scoped types and
 * for any type added to the enum but not yet grouped.
 *
 * Callers should treat `null` from an *ungrouped* type as "render it as its own
 * single-type topic" rather than hiding it — a new backend type must degrade to
 * a visible row, never vanish from the settings page.
 */
export function getNotificationTopic(type: NotificationType): NotificationTopic | null {
  return TOPIC_BY_TYPE.get(type) ?? null;
}

/**
 * Every implemented type that belongs to no topic and is not deliberately
 * excluded. Empty in a healthy tree; a client can fall back to rendering these
 * individually, and the shared test asserts the list stays empty so a new type
 * is grouped deliberately rather than by omission.
 */
export function getUngroupedNotificationTypes(): NotificationType[] {
  return Object.values(NotificationType).filter(
    (t) =>
      !UNIMPLEMENTED_NOTIFICATION_TYPES.has(t) &&
      !ALWAYS_ON_NOTIFICATION_TYPES.has(t) &&
      !ORG_SCOPED_NOTIFICATION_TYPES.has(t) &&
      !TOPIC_BY_TYPE.has(t),
  );
}
