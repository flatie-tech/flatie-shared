import { describe, expect, it } from 'vitest';
import { NotificationType } from '../../src/enums/notification.enum';
import { getNotificationDataSchema } from '../../src/schemas/responses/notifications';

/**
 * Cross-type discrimination tests.
 *
 * The exhaustiveness test (notification-exhaustiveness.test.ts) proves every
 * NotificationType maps to a live schema. This file goes further: each schema
 * must actually enforce its per-type payload shape and reject payloads
 * intended for a different type.
 *
 * If two schemas drift to both accept the same "generic" payload, a real
 * type-specific bug in a consumer branch becomes invisible. These tests catch
 * that at PR time.
 */

const BASE = {
  entityType: 'notice',
  entityId: '550e8400-e29b-41d4-a716-446655440000',
  actorId: '550e8400-e29b-41d4-a716-446655440001',
  actorName: 'Alice',
  actionUrl: '/n/abc',
};

describe('notification data schemas — per-type payload enforcement', () => {
  it('NOTICE_CREATED accepts a complete notice-created payload', () => {
    const schema = getNotificationDataSchema(NotificationType.NOTICE_CREATED);
    const result = schema.safeParse({
      ...BASE,
      title: 'Water outage',
      content: 'Water off Tuesday 10:00–14:00',
      createdAt: '2026-04-20T12:00:00.000Z',
      isPinned: false,
    });
    expect(result.success).toBe(true);
  });

  it('NOTICE_CREATED rejects payload missing required `content`', () => {
    const schema = getNotificationDataSchema(NotificationType.NOTICE_CREATED);
    const result = schema.safeParse({
      ...BASE,
      title: 'Water outage',
      // content intentionally omitted
      createdAt: '2026-04-20T12:00:00.000Z',
    });
    expect(result.success).toBe(false);
  });

  it('POLL_CREATED accepts a complete poll-created payload', () => {
    const schema = getNotificationDataSchema(NotificationType.POLL_CREATED);
    const result = schema.safeParse({
      ...BASE,
      question: 'Paint the facade this year?',
      pollType: 'COMMUNITY',
      options: ['Yes', 'No'],
      deadline: '2026-12-31T23:59:59.000Z',
    });
    expect(result.success).toBe(true);
  });

  it('POLL_CREATED rejects payload missing required `options`', () => {
    const schema = getNotificationDataSchema(NotificationType.POLL_CREATED);
    const result = schema.safeParse({
      ...BASE,
      question: 'Paint the facade this year?',
      pollType: 'COMMUNITY',
      // options intentionally omitted
    });
    expect(result.success).toBe(false);
  });

  it('CHAT_MESSAGE accepts a minimal chat-message payload', () => {
    const schema = getNotificationDataSchema(NotificationType.CHAT_MESSAGE);
    // Chat messages carry senderName (separate from the shared `actorName`
    // on the base), plus conversationId and messagePreview.
    const result = schema.safeParse({
      senderName: 'Alice',
      conversationId: '550e8400-e29b-41d4-a716-446655440010',
      messagePreview: 'Hey, have you seen the notice?',
    });
    expect(result.success).toBe(true);
  });

  it('CHAT_MESSAGE rejects a payload missing senderName', () => {
    const schema = getNotificationDataSchema(NotificationType.CHAT_MESSAGE);
    const result = schema.safeParse({
      conversationId: '550e8400-e29b-41d4-a716-446655440010',
      messagePreview: 'Hey, have you seen the notice?',
    });
    expect(result.success).toBe(false);
  });

  it('NOTICE_CREATED schema rejects a POLL_CREATED-shaped payload', () => {
    // A payload with `question` + `pollType` + `options` (poll-shaped) must
    // not validate against the NOTICE_CREATED schema — both of NOTICE_CREATED's
    // required fields (`title`, `content`) are missing, so the schema should
    // reject. This ensures schemas aren't accidentally loose enough to accept
    // cross-type payloads.
    const schema = getNotificationDataSchema(NotificationType.NOTICE_CREATED);
    const result = schema.safeParse({
      ...BASE,
      question: 'Paint the facade this year?',
      pollType: 'COMMUNITY',
      options: ['Yes', 'No'],
    });
    expect(result.success).toBe(false);
  });

  it('POLL_CREATED schema rejects a NOTICE_CREATED-shaped payload', () => {
    const schema = getNotificationDataSchema(NotificationType.POLL_CREATED);
    const result = schema.safeParse({
      ...BASE,
      title: 'Water outage',
      content: 'Water off Tuesday',
      createdAt: '2026-04-20T12:00:00.000Z',
    });
    // question/pollType/options all required for POLL_CREATED → must reject.
    expect(result.success).toBe(false);
  });

  it('EVENT_CREATED accepts a payload with optional description + subtype', () => {
    const schema = getNotificationDataSchema(NotificationType.EVENT_CREATED);
    const result = schema.safeParse({
      ...BASE,
      title: 'Monthly meeting',
      startDate: '2026-05-01T10:00:00.000Z',
      description: null,
      subtype: null,
      eventType: 'meeting',
      endDate: '2026-05-01T12:00:00.000Z',
      color: 'blue',
    });
    expect(result.success).toBe(true);
  });

  it('FAILURE_REPORT_STATUS_CHANGED and FAILURE_REPORT_RESOLVED share the same schema (intentional)', () => {
    // Both map to failureReportStatusDataSchema by design — a status transition
    // to 'resolved' is a special case of the general status-change notification.
    // Keep them aligned; if they diverge in the future, this test will flag.
    const changedSchema = getNotificationDataSchema(NotificationType.FAILURE_REPORT_STATUS_CHANGED);
    const resolvedSchema = getNotificationDataSchema(NotificationType.FAILURE_REPORT_RESOLVED);
    expect(changedSchema).toBe(resolvedSchema);
  });
});
