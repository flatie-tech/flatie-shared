import { describe, expect, it } from 'vitest';
import {
  updateFailureReportRequestSchema,
  updateMaintenanceLogRequestSchema,
  updateNoticeRequestSchema,
  updatePollRequestSchema,
} from '../../src/schemas/requests';

const UUID = '550e8400-e29b-41d4-a716-446655440000';

describe('updateNoticeRequestSchema', () => {
  it('accepts id plus a partial body (all fields optional)', () => {
    const result = updateNoticeRequestSchema.safeParse({ id: UUID, title: 'Updated title' });
    expect(result.success).toBe(true);
  });

  it('rejects a payload missing the id', () => {
    const result = updateNoticeRequestSchema.safeParse({ title: 'Updated title' });
    expect(result.success).toBe(false);
  });

  it('rejects a non-uuid id', () => {
    const result = updateNoticeRequestSchema.safeParse({ id: 'not-a-uuid', title: 'x' });
    expect(result.success).toBe(false);
  });
});

describe('updateFailureReportRequestSchema', () => {
  it('accepts id plus a partial body', () => {
    const result = updateFailureReportRequestSchema.safeParse({ id: UUID, status: 'pending' });
    expect(result.success).toBe(true);
  });

  it('preserves the refineLocation cross-field rule (common_area needs description)', () => {
    const result = updateFailureReportRequestSchema.safeParse({
      id: UUID,
      locationType: 'common_area',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.includes('commonAreaDescription'))).toBe(true);
    }
  });

  it('preserves the refineLocation cross-field rule (own_unit needs unitType + unitId)', () => {
    const result = updateFailureReportRequestSchema.safeParse({
      id: UUID,
      locationType: 'own_unit',
    });
    expect(result.success).toBe(false);
  });

  it('rejects a payload missing the id', () => {
    const result = updateFailureReportRequestSchema.safeParse({ status: 'pending' });
    expect(result.success).toBe(false);
  });
});

describe('updateMaintenanceLogRequestSchema', () => {
  it('accepts id plus a partial body', () => {
    const result = updateMaintenanceLogRequestSchema.safeParse({ id: UUID, title: 'Updated' });
    expect(result.success).toBe(true);
  });

  it('rejects a payload missing the id', () => {
    const result = updateMaintenanceLogRequestSchema.safeParse({ title: 'Updated' });
    expect(result.success).toBe(false);
  });
});

describe('updatePollRequestSchema', () => {
  it('accepts id plus a partial body', () => {
    const result = updatePollRequestSchema.safeParse({ id: UUID, status: 'active' });
    expect(result.success).toBe(true);
  });

  it('rejects a payload missing the id', () => {
    const result = updatePollRequestSchema.safeParse({ status: 'active' });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown status value', () => {
    const result = updatePollRequestSchema.safeParse({ id: UUID, status: 'bogus' });
    expect(result.success).toBe(false);
  });
});
