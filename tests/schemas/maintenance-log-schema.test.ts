import { describe, expect, it } from 'vitest';
import {
  createMaintenanceLogSchema,
  MAINTENANCE_LOG_LIMITS,
  updateMaintenanceLogSchema,
} from '../../src/schemas/entities/maintenance-log.schema';

const base = {
  title: 'Boiler service',
  contractor: 'Acme Heating',
  cost: '250.50',
};
const goodEvent = { startDate: '2026-09-01T10:00:00Z', endDate: '2026-09-01T12:00:00Z' };

describe('maintenance-log schemas (v0.66.0 event-date refine)', () => {
  it('rejects an event whose end precedes its start (create)', () => {
    const result = createMaintenanceLogSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T12:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(false);
  });

  it('accepts an event with equal start and end (create)', () => {
    const result = createMaintenanceLogSchema.safeParse({
      ...base,
      events: [{ startDate: '2026-09-01T10:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
    });
    expect(result.success).toBe(true);
  });

  it('requires at least one event on create', () => {
    expect(createMaintenanceLogSchema.safeParse({ ...base, events: [] }).success).toBe(false);
    expect(createMaintenanceLogSchema.safeParse({ ...base, events: [goodEvent] }).success).toBe(
      true,
    );
  });

  it('applies the same date refine to update events', () => {
    expect(
      updateMaintenanceLogSchema.safeParse({
        events: [{ startDate: '2026-09-01T12:00:00Z', endDate: '2026-09-01T10:00:00Z' }],
      }).success,
    ).toBe(false);
    expect(updateMaintenanceLogSchema.safeParse({ events: [goodEvent] }).success).toBe(true);
  });

  it('update leaves events optional (undefined = no change)', () => {
    expect(updateMaintenanceLogSchema.safeParse({ title: 'Renamed' }).success).toBe(true);
  });

  it('description limit is 2000', () => {
    expect(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).toBe(2000);
  });
});
