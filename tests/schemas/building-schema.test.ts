import { describe, expect, it } from 'vitest';
import { createBuildingSchema, updateBuildingSchema } from '../../src/schemas';

/**
 * Regression guard for the pričuva rate and surface coefficients.
 *
 * These were `z.coerce.number()`, and `z.coerce.number()` maps BOTH `''` — what
 * a cleared number input posts — and `null` to `0`. A representative who
 * cleared the monthly rate stored `0.0000`, which is not the same state as "no
 * rate configured": the ledger then rendered every row with `expected: 0`,
 * pričuva-tracking posted 0-amount charges (which in turn blocked moving
 * `pricuvaTrackingFrom`), and the invoice generator emitted 0-EUR uplatnicas
 * instead of its "set the rate first" error. Nothing could restore NULL through
 * the API afterwards.
 */

const MINIMAL_CREATE = { name: 'Zgrada A', type: 'residential', totalUnits: 12 } as const;

const RATE_FIELDS = ['monthlyFeePerSqm', 'monthlyFeeCommercialPerSqm'] as const;

const COEF_FIELDS = [
  'apartmentResidentialCoef',
  'apartmentCommercialCoef',
  'garageResidentialCoef',
  'garageCommercialCoef',
  'storageResidentialCoef',
  'storageCommercialCoef',
] as const;

describe('updateBuildingSchema — clearable numerics', () => {
  it.each(RATE_FIELDS)('%s: a cleared value round-trips to null, never 0', (field) => {
    expect(updateBuildingSchema.parse({ [field]: '' })[field]).toBeNull();
    expect(updateBuildingSchema.parse({ [field]: null })[field]).toBeNull();
  });

  it.each(RATE_FIELDS)('%s: a real value still coerces from the multipart string', (field) => {
    expect(updateBuildingSchema.parse({ [field]: '0.55' })[field]).toBe(0.55);
    expect(updateBuildingSchema.parse({ [field]: 1.2 })[field]).toBe(1.2);
    // A deliberate zero is still a zero — clearing and "free" stay distinct.
    expect(updateBuildingSchema.parse({ [field]: 0 })[field]).toBe(0);
  });

  it.each(COEF_FIELDS)('%s: a cleared value leaves the stored value unchanged', (field) => {
    // Not 0 and not null: the backend calls `.toString()` on coefficients
    // unguarded and skips the field on `undefined`, so an empty submission has
    // to arrive as undefined ("leave as is"), never as a zeroing 0.
    expect(updateBuildingSchema.parse({ [field]: '' })[field]).toBeUndefined();
    expect(updateBuildingSchema.parse({ [field]: null })[field]).toBeUndefined();
    expect(updateBuildingSchema.parse({ [field]: '1.25' })[field]).toBe(1.25);
  });

  it('omitting a field leaves it absent rather than nulling it', () => {
    expect(updateBuildingSchema.parse({ name: 'Zgrada B' })).toEqual({ name: 'Zgrada B' });
  });

  it('still rejects non-numeric and negative rates', () => {
    expect(updateBuildingSchema.safeParse({ monthlyFeePerSqm: 'abc' }).success).toBe(false);
    expect(updateBuildingSchema.safeParse({ monthlyFeePerSqm: -1 }).success).toBe(false);
    expect(updateBuildingSchema.safeParse({ garageResidentialCoef: -0.5 }).success).toBe(false);
  });
});

describe('createBuildingSchema — clearable numerics', () => {
  it.each(RATE_FIELDS)('%s: a cleared value is created as null, not 0', (field) => {
    expect(createBuildingSchema.parse({ ...MINIMAL_CREATE, [field]: '' })[field]).toBeNull();
    expect(createBuildingSchema.parse({ ...MINIMAL_CREATE, [field]: null })[field]).toBeNull();
  });

  it.each(COEF_FIELDS)('%s: a cleared value falls through to the column default', (field) => {
    expect(createBuildingSchema.parse({ ...MINIMAL_CREATE, [field]: '' })[field]).toBeUndefined();
  });
});
