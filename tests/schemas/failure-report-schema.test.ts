import { describe, expect, it } from 'vitest';
import {
  createFailureReportSchema,
  FAILURE_REPORT_LIMITS,
  updateFailureReportSchema,
} from '../../src/schemas/entities/failure-report.schema';

const base = { title: 'Leaking roof', description: 'Water in the stairwell.' };

describe('failure-report schemas (v0.64.0 additions)', () => {
  it('accepts and coerces allowComments on create and update', () => {
    expect(createFailureReportSchema.parse({ ...base, allowComments: 'false' }).allowComments).toBe(
      false,
    );
    expect(updateFailureReportSchema.parse({ allowComments: true }).allowComments).toBe(true);
  });

  it('defaults allowComments to undefined when omitted (backend applies true)', () => {
    expect(createFailureReportSchema.parse(base).allowComments).toBeUndefined();
  });

  it('rejects an event whose end precedes its start', () => {
    const result = createFailureReportSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T12:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts an event with equal start and end', () => {
    const result = createFailureReportSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T10:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(true);
  });

  it('still enforces the location cross-field rule alongside the new fields', () => {
    const result = createFailureReportSchema.safeParse({
      ...base,
      allowComments: true,
      locationType: 'own_unit',
    });
    expect(result.success).toBe(false); // unitType + unitId missing
  });

  it('description limit is 2000', () => {
    expect(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).toBe(2000);
  });
});
