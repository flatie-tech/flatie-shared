import { describe, expect, it } from 'vitest';
import {
  createDocumentSchema,
  DOCUMENT_LIMITS,
  updateDocumentSchema,
} from '../../src/schemas/entities/document.schema';

describe('document request schemas (v0.69.0)', () => {
  it('create requires a 1–100 char title, coerces isPrivate', () => {
    expect(createDocumentSchema.safeParse({ title: '' }).success).toBe(false);
    expect(createDocumentSchema.safeParse({ title: 'x'.repeat(101) }).success).toBe(false);
    expect(createDocumentSchema.parse({ title: 'Invoice', isPrivate: 'true' }).isPrivate).toBe(
      true,
    );
  });

  it('update is all-optional and coerces multipart arrays', () => {
    expect(updateDocumentSchema.parse({}).title).toBeUndefined();
    const parsed = updateDocumentSchema.parse({
      removeFileIds: '["11111111-1111-4111-8111-111111111111"]',
      renameFiles: [{ id: '22222222-2222-4222-8222-222222222222', fileName: 'renamed.pdf' }],
    });
    expect(parsed.removeFileIds).toHaveLength(1);
    expect(parsed.renameFiles?.[0]?.fileName).toBe('renamed.pdf');
  });

  it('rejects a too-long child file name', () => {
    const bad = updateDocumentSchema.safeParse({
      renameFiles: [
        {
          id: '22222222-2222-4222-8222-222222222222',
          fileName: 'x'.repeat(DOCUMENT_LIMITS.FILE_NAME_MAX + 1),
        },
      ],
    });
    expect(bad.success).toBe(false);
  });
});
