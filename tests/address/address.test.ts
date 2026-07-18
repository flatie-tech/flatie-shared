import { describe, expect, it } from 'vitest';
import { addressSearchResultSchema, buildMapUrl, compareHouseNumbers } from '../../src/address';

describe('buildMapUrl', () => {
  it('prefers coordinates and formats them as lat,lng', () => {
    expect(buildMapUrl({ latitude: 45.815, longitude: 15.9819 })).toBe(
      'https://www.google.com/maps/search/?api=1&query=45.815%2C15.9819',
    );
  });

  it('falls back to an encoded display address', () => {
    expect(buildMapUrl({ address: 'Ilica 42A, 10000 Zagreb' })).toBe(
      'https://www.google.com/maps/search/?api=1&query=Ilica%2042A%2C%2010000%20Zagreb',
    );
  });

  it('encodes Croatian diacritics safely', () => {
    const url = buildMapUrl({ address: 'Šubićeva 9, Zagreb' });
    expect(url).toContain('%C5%A0ubi%C4%87eva');
    expect(() => new URL(url)).not.toThrow();
  });
});

describe('addressSearchResultSchema', () => {
  const base = {
    id: '018f6d0a-0000-7000-8000-000000000001',
    streetId: '018f6d0a-0000-7000-8000-000000000002',
    fullAddress: 'Ilica 42, 10000 Zagreb',
    street: 'Ilica',
    houseNumber: '42',
    city: 'Zagreb',
    postcode: '10000',
    latitude: 45.815,
    longitude: 15.9819,
  };

  it('accepts an address-level row', () => {
    expect(addressSearchResultSchema.parse(base)).toEqual(base);
  });

  it('accepts a street-level row (null houseNumber/coords, id === streetId)', () => {
    const streetRow = {
      ...base,
      id: base.streetId,
      houseNumber: null,
      latitude: null,
      longitude: null,
    };
    expect(addressSearchResultSchema.parse(streetRow)).toEqual(streetRow);
  });

  it('rejects a non-uuid id', () => {
    expect(addressSearchResultSchema.safeParse({ ...base, id: 'nope' }).success).toBe(false);
  });
});

describe('compareHouseNumbers', () => {
  it('orders by numeric value, not lexically', () => {
    expect(['10', '2', '100', '1'].sort(compareHouseNumbers)).toEqual(['1', '2', '10', '100']);
  });

  it('is stable and total for canonical inputs (sort() must not throw)', () => {
    const input = ['42A', 'BB', '16/2', '7', '16/1', '42', '16'];
    expect(() => [...input].sort(compareHouseNumbers)).not.toThrow();
  });

  it('orders same-base variants: plain < letters < sub-numbers (DGU listing order)', () => {
    expect(['10/1', '10A', '10', '10/2', '10B'].sort(compareHouseNumbers)).toEqual([
      '10',
      '10A',
      '10B',
      '10/1',
      '10/2',
    ]);
  });

  it('sorts BB last', () => {
    expect(['BB', '2', '10'].sort(compareHouseNumbers)).toEqual(['2', '10', 'BB']);
  });

  it('gives unparseable input a stable last position without throwing', () => {
    expect(['?', '3', 'BB', '1'].sort(compareHouseNumbers)).toEqual(['1', '3', '?', 'BB']);
  });
});
