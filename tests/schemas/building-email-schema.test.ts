import { describe, expect, it } from 'vitest';
import { BUILDING_ROLE_PERMISSIONS, BuildingRole, Permission } from '../../src';
import {
  createEmailThreadRequestSchema,
  EMAIL_LIMITS,
  replyEmailThreadRequestSchema,
} from '../../src/schemas/requests';
import { emailMessageSchema } from '../../src/schemas/responses';

const base = { recipientEmail: 'upravitelj@example.com', subject: 'Račun', body: 'Poštovani,' };

describe('building-email schemas (v0.73.0)', () => {
  it('create enforces the shared limits (body/name/cc/subject)', () => {
    expect(createEmailThreadRequestSchema.safeParse(base).success).toBe(true);
    expect(
      createEmailThreadRequestSchema.safeParse({
        ...base,
        body: 'x'.repeat(EMAIL_LIMITS.BODY_MAX + 1),
      }).success,
    ).toBe(false);
    expect(
      createEmailThreadRequestSchema.safeParse({
        ...base,
        recipientName: 'x'.repeat(EMAIL_LIMITS.RECIPIENT_NAME_MAX + 1),
      }).success,
    ).toBe(false);
    expect(
      createEmailThreadRequestSchema.safeParse({
        ...base,
        ccEmails: Array.from({ length: EMAIL_LIMITS.CC_MAX + 1 }, (_, i) => `cc${i}@example.com`),
      }).success,
    ).toBe(false);
  });

  it('reply enforces body max + cc max', () => {
    expect(replyEmailThreadRequestSchema.safeParse({ body: 'Hvala' }).success).toBe(true);
    expect(
      replyEmailThreadRequestSchema.safeParse({ body: 'x'.repeat(EMAIL_LIMITS.BODY_MAX + 1) })
        .success,
    ).toBe(false);
  });

  it('message schema accepts attachments and defaults to []', () => {
    const msg = emailMessageSchema.parse({
      id: '11111111-1111-4111-8111-111111111111',
      threadId: '22222222-2222-4222-8222-222222222222',
      direction: 'inbound',
      fromAddress: 'a@b.com',
      subject: 'S',
      createdAt: '2026-07-21T00:00:00Z',
    });
    expect(msg.attachments).toEqual([]);

    const withAtt = emailMessageSchema.parse({
      id: '11111111-1111-4111-8111-111111111111',
      threadId: '22222222-2222-4222-8222-222222222222',
      direction: 'outbound',
      fromAddress: 'a@b.com',
      subject: 'S',
      createdAt: '2026-07-21T00:00:00Z',
      attachments: [
        {
          id: '33333333-3333-4333-8333-333333333333',
          fileName: 'racun.pdf',
          mimeType: 'application/pdf',
          fileSize: 12345,
          url: 'https://files.example/racun.pdf?sig=abc',
        },
      ],
    });
    expect(withAtt.attachments).toHaveLength(1);
    expect(withAtt.attachments[0]?.fileName).toBe('racun.pdf');
  });

  it('mailbox is management-only: co-owner lacks view, representative has view+manage', () => {
    const coOwner = BUILDING_ROLE_PERMISSIONS[BuildingRole.CO_OWNER];
    const rep = BUILDING_ROLE_PERMISSIONS[BuildingRole.OWNER_REPRESENTATIVE];
    expect(coOwner).not.toContain(Permission.BUILDING_EMAIL_VIEW);
    expect(rep).toContain(Permission.BUILDING_EMAIL_VIEW);
    expect(rep).toContain(Permission.BUILDING_EMAIL_MANAGE);
  });

  it('v0.73.1: exports reachable from the top barrel + ccEmails multipart coercion', async () => {
    const top = await import('../../src');
    expect(top.EMAIL_LIMITS.CC_MAX).toBe(10);
    expect(top.emailAttachmentSchema).toBeDefined();
    // JSON-encoded array string (multipart transport) coerces to a real array.
    const parsed = createEmailThreadRequestSchema.parse({
      ...base,
      ccEmails: '["a@b.com","c@d.com"]',
    });
    expect(parsed.ccEmails).toEqual(['a@b.com', 'c@d.com']);
  });
});
