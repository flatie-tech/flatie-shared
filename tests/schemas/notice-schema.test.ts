import { describe, expect, it } from 'vitest';
import {
  createNoticeSchema,
  NOTICE_LIMITS,
  updateNoticeSchema,
} from '../../src/schemas/entities/notice.schema';

const base = { title: 'Skupština', content: 'Dnevni red u prilogu.' };

describe('notice schemas (v0.63.0 additions)', () => {
  it('accepts and coerces allowComments on create and update', () => {
    const created = createNoticeSchema.parse({ ...base, allowComments: 'false' });
    expect(created.allowComments).toBe(false);

    const updated = updateNoticeSchema.parse({ allowComments: true });
    expect(updated.allowComments).toBe(true);
  });

  it('still defaults allowComments to undefined when omitted (backend applies true)', () => {
    expect(createNoticeSchema.parse(base).allowComments).toBeUndefined();
  });

  it('rejects an event whose end precedes its start', () => {
    const result = createNoticeSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T12:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts an event with equal start and end', () => {
    const result = createNoticeSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T10:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(true);
  });

  it('content limit is 2000 (guards stale client copy)', () => {
    expect(NOTICE_LIMITS.CONTENT_MAX).toBe(2000);
  });
});
