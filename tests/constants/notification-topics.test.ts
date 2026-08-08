import { describe, expect, it } from 'vitest';
import {
  ALWAYS_ON_NOTIFICATION_TYPES,
  getNotificationTopic,
  getUngroupedNotificationTypes,
  MANAGERIAL_NOTIFICATION_TYPES,
  NOTIFICATION_TOPICS,
  ORG_SCOPED_NOTIFICATION_TYPES,
} from '../../src/constants/notification-topics';
import {
  NOTIFICATION_TYPE_CATEGORY,
  NotificationType,
  UNIMPLEMENTED_NOTIFICATION_TYPES,
} from '../../src/enums/notification.enum';

describe('NOTIFICATION_TOPICS', () => {
  it('groups every implemented type exactly once', () => {
    // The point of the test: a type added to the enum without a topic would
    // otherwise silently disappear from the settings page, and a type listed
    // in two topics would give the user two switches that fight each other.
    const seen = new Map<NotificationType, string[]>();
    for (const topic of NOTIFICATION_TOPICS) {
      for (const type of topic.types) {
        seen.set(type, [...(seen.get(type) ?? []), topic.id]);
      }
    }

    const duplicated = [...seen.entries()].filter(([, ids]) => ids.length > 1);
    expect(duplicated, `types in more than one topic: ${JSON.stringify(duplicated)}`).toEqual([]);

    expect(
      getUngroupedNotificationTypes(),
      'implemented types belonging to no topic — group them deliberately or add them to the always-on / org-scoped sets',
    ).toEqual([]);
  });

  it('references only real, implemented types', () => {
    const real = new Set(Object.values(NotificationType));
    for (const topic of NOTIFICATION_TOPICS) {
      expect(topic.types.length, `${topic.id} has no types`).toBeGreaterThan(0);
      for (const type of topic.types) {
        expect(real.has(type), `${topic.id} references unknown type ${type}`).toBe(true);
        expect(
          UNIMPLEMENTED_NOTIFICATION_TYPES.has(type),
          `${topic.id} groups ${type}, which is unimplemented and hidden from preferences`,
        ).toBe(false);
      }
    }
  });

  it('keeps every topic inside a single category', () => {
    // A topic spanning two categories could not be rendered under one card.
    for (const topic of NOTIFICATION_TOPICS) {
      const categories = new Set(topic.types.map((t) => NOTIFICATION_TYPE_CATEGORY[t]));
      expect(categories.size, `${topic.id} spans categories ${[...categories].join(', ')}`).toBe(1);
    }
  });

  it('has unique topic ids', () => {
    const ids = NOTIFICATION_TOPICS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives timing topics more than one member, ordered earliest first', () => {
    for (const topic of NOTIFICATION_TOPICS.filter((t) => t.kind === 'timing')) {
      expect(topic.types.length, `${topic.id} is timing but has one member`).toBeGreaterThan(1);
      // 24h before the event must precede 1h before it.
      expect(topic.types[0]).toMatch(/24h$/);
    }
  });

  it('keeps always-on and org-scoped types out of the topic map', () => {
    for (const type of [...ALWAYS_ON_NOTIFICATION_TYPES, ...ORG_SCOPED_NOTIFICATION_TYPES]) {
      expect(getNotificationTopic(type), `${type} is both excluded and grouped`).toBeNull();
    }
  });

  it('keeps every managerial type real, grouped and implemented', () => {
    // A managerial type that stopped existing would silently hide nothing; one
    // that is unimplemented would hide a row that was never shown anyway. Both
    // mean the set has drifted from the emit sites it was derived from.
    const real = new Set(Object.values(NotificationType));
    for (const type of MANAGERIAL_NOTIFICATION_TYPES) {
      expect(real.has(type), `${type} is not a real notification type`).toBe(true);
      expect(UNIMPLEMENTED_NOTIFICATION_TYPES.has(type), `${type} is unimplemented`).toBe(false);
      expect(getNotificationTopic(type), `${type} is managerial but ungrouped`).not.toBeNull();
    }
  });

  it('never marks an always-on or org-scoped type as managerial', () => {
    for (const type of [...ALWAYS_ON_NOTIFICATION_TYPES, ...ORG_SCOPED_NOTIFICATION_TYPES]) {
      expect(MANAGERIAL_NOTIFICATION_TYPES.has(type)).toBe(false);
    }
  });

  it('resolves a grouped type back to its topic', () => {
    const topic = getNotificationTopic(NotificationType.WASTE_REMINDER_BIO);
    expect(topic?.id).toBe('waste_collection');
    expect(topic?.types).toHaveLength(4);
  });
});
