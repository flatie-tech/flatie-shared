import { describe, expect, it } from 'vitest';
import { BACKEND_ERROR_CODES } from '../../src/errors';
import { apiErrorResponseSchema } from '../../src/schemas/api-error-response.schema';

describe('apiErrorResponseSchema', () => {
  const baseEnvelope = {
    statusCode: 404,
    message: 'Notice not found',
    timestamp: '2026-04-20T12:00:00.000Z',
    path: '/api/v1/buildings/b1/notices/n1',
  };

  it('accepts a full envelope with a known code', () => {
    const result = apiErrorResponseSchema.safeParse({
      ...baseEnvelope,
      code: BACKEND_ERROR_CODES.NOTICE_NOT_FOUND,
    });
    expect(result.success).toBe(true);
  });

  it('accepts an envelope without `code` (generic HTTP error)', () => {
    const result = apiErrorResponseSchema.safeParse(baseEnvelope);
    expect(result.success).toBe(true);
  });

  it('accepts `message` as an array of strings (validation-pipe shape)', () => {
    const result = apiErrorResponseSchema.safeParse({
      ...baseEnvelope,
      statusCode: 400,
      message: ['title: Required', 'content: too long'],
    });
    expect(result.success).toBe(true);
  });

  it('rejects an unknown `code` value', () => {
    const result = apiErrorResponseSchema.safeParse({
      ...baseEnvelope,
      code: 'NOT_A_REAL_CODE',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a missing `statusCode`', () => {
    const { statusCode: _statusCode, ...withoutStatus } = baseEnvelope;
    const result = apiErrorResponseSchema.safeParse(withoutStatus);
    expect(result.success).toBe(false);
  });

  it('rejects a non-string `timestamp`', () => {
    const result = apiErrorResponseSchema.safeParse({
      ...baseEnvelope,
      timestamp: 12345,
    });
    expect(result.success).toBe(false);
  });
});
