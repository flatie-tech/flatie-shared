import type { NotificationType } from '../enums/notification.enum';
import type { NotificationPreferenceItem } from '../schemas/responses/notifications';
import {
  ALWAYS_ON_NOTIFICATION_TYPES,
  getNotificationTopic,
  type NotificationTopic,
  ORG_SCOPED_NOTIFICATION_TYPES,
} from './notification-topics';

/**
 * Deriving a topic's state from its member types, and the writes that put them
 * back. Lives in shared because both clients render the same preference model:
 * if web and mobile each computed "mixed" or derived `enabled` their own way,
 * the two would disagree about what a row means — the exact drift that putting
 * NOTIFICATION_TOPICS here was meant to prevent.
 */

/**
 * The channels a person can actually choose. `in_app` is deliberately absent:
 * it is the notification *record*, not a delivery preference. Dropping it would
 * mean the row never reaches the inbox, the unread badge is wrong, and a push
 * tap deep-links to something that does not exist — so it is implied whenever a
 * topic is on, and stated once in the UI rather than rendered as a dead chip on
 * every row.
 */
export const SELECTABLE_CHANNELS = ['push', 'email'] as const;
export type SelectableChannel = (typeof SELECTABLE_CHANNELS)[number];

/** A single PATCH body: one update applied to one or more notification types. */
export interface PreferenceWrite {
  notificationTypes: string[];
  enabled: boolean;
  channels: string[];
}

export interface TopicState {
  topic: NotificationTopic;
  /** Channels shared by every member type. */
  channels: SelectableChannel[];
  /**
   * True when member types disagree — e.g. EVENT_REMINDER_24H defaults to
   * in_app+push while _1H defaults to push only. Five of the ten merged groups
   * ship with mismatched defaults, so this is the common case on a fresh
   * account, not an edge case. The UI says "Prilagođeno" rather than silently
   * showing one member's state as if it spoke for all of them.
   */
  mixed: boolean;
  /** A topic is on when at least one member type would deliver something. */
  enabled: boolean;
  /** Member items, for the lead-time chooser on `timing` topics. */
  items: NotificationPreferenceItem[];
}

const asSelectable = (channels: string[]): SelectableChannel[] =>
  SELECTABLE_CHANNELS.filter((c) => channels.includes(c));

/**
 * Collapse the API's per-type rows into one state per topic.
 *
 * Types that belong to no topic are returned as single-type topics rather than
 * dropped — a notification type added to the backend must degrade to a visible
 * row, never disappear from the settings page.
 */
export function buildTopicStates(items: NotificationPreferenceItem[]): TopicState[] {
  const byTopicId = new Map<
    string,
    { topic: NotificationTopic; items: NotificationPreferenceItem[] }
  >();

  for (const item of items) {
    const type = item.type as NotificationType;
    if (ALWAYS_ON_NOTIFICATION_TYPES.has(type) || ORG_SCOPED_NOTIFICATION_TYPES.has(type)) continue;

    const topic = getNotificationTopic(type) ?? {
      id: item.type,
      types: [type],
      kind: 'single' as const,
    };
    const entry = byTopicId.get(topic.id) ?? { topic, items: [] };
    entry.items.push(item);
    byTopicId.set(topic.id, entry);
  }

  return [...byTopicId.values()].map(({ topic, items: members }) => {
    const perMember = members.map((m) => (m.enabled ? asSelectable(m.channels) : []));
    const first = perMember[0] ?? [];
    const mixed = perMember.some(
      (c) => c.length !== first.length || c.some((ch) => !first.includes(ch)),
    );
    return {
      topic,
      // When members disagree, show the union so the row reflects everything
      // the person is still receiving — under-reporting would be worse.
      channels: mixed
        ? SELECTABLE_CHANNELS.filter((c) => perMember.some((m) => m.includes(c)))
        : first,
      mixed,
      enabled: members.some((m) => m.enabled),
      items: members,
    };
  });
}

/**
 * The writes needed to put every member type of a topic into one state.
 *
 * `enabled` is derived rather than stored separately: with zero channels the
 * type is disabled outright. That is what makes the old contradictory state —
 * `enabled: false` while the email switch renders on — unrepresentable, because
 * there is now one source of truth instead of two.
 *
 * `in_app` is always written alongside the selected channels so the inbox
 * record still exists; the backend treats an empty channel list as suppressed.
 */
export function buildTopicWrites(
  topic: NotificationTopic,
  channels: SelectableChannel[],
): PreferenceWrite[] {
  const enabled = channels.length > 0;
  // One request for the whole topic: four separate PATCHes for a merged row
  // can half-fail and leave it looking on when it is not.
  return [
    {
      notificationTypes: [...topic.types],
      enabled,
      channels: enabled ? ['in_app', ...channels] : [],
    },
  ];
}

/** Toggle one channel on a topic, returning the next channel set. */
export function toggleChannel(
  current: SelectableChannel[],
  channel: SelectableChannel,
): SelectableChannel[] {
  return current.includes(channel)
    ? current.filter((c) => c !== channel)
    : SELECTABLE_CHANNELS.filter((c) => c === channel || current.includes(c));
}

/** Lead-time selection for `timing` topics (24 h before, 1 h before, or both). */
export type LeadTime = 'early' | 'late' | 'both';

export function getLeadTime(state: TopicState): LeadTime | null {
  if (state.topic.kind !== 'timing' || state.topic.types.length < 2) return null;
  const early = state.topic.types[0];
  const late = state.topic.types[1];
  if (!early || !late) return null;
  const on = (t: NotificationType) => state.items.find((i) => i.type === t)?.enabled ?? false;
  if (on(early) && on(late)) return 'both';
  if (on(early)) return 'early';
  if (on(late)) return 'late';
  return null;
}

/**
 * Writes for a lead-time change. The chooser only decides *which* reminder
 * fires; the channel selection is carried across unchanged so switching from
 * "both" to "an hour before" does not silently also turn email off.
 */
export function buildLeadTimeWrites(state: TopicState, lead: LeadTime): PreferenceWrite[] {
  const early = state.topic.types[0];
  const late = state.topic.types[1];
  if (!early || !late) return [];
  const channels = state.channels.length > 0 ? state.channels : (['push'] as SelectableChannel[]);
  const on = (t: NotificationType) =>
    lead === 'both' || (lead === 'early' && t === early) || (lead === 'late' && t === late);
  // Two writes here, not one: the members end in *different* states, which is
  // the whole point of a lead-time chooser.
  return [early, late].map((type) => ({
    notificationTypes: [type],
    enabled: on(type),
    channels: on(type) ? ['in_app', ...channels] : [],
  }));
}
