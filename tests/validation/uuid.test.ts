import { describe, expect, it } from 'vitest';
import { isUuid, toUuid } from '../../src/validation/uuid';

const VALID = '550e8400-e29b-41d4-a716-446655440000';
const INVALID_LIST = [
  '',
  'not-a-uuid',
  '550e8400-e29b-41d4-a716', // too short
  '550e8400-e29b-41d4-a716-446655440000X', // too long
  '550e8400_e29b_41d4_a716_446655440000', // wrong separator
  '550e8400-e29b-41d4-a716-44665544000Z', // invalid hex
];

describe('UuidString — branded UUID helpers', () => {
  describe('isUuid', () => {
    it('returns true for a canonical UUID v4', () => {
      expect(isUuid(VALID)).toBe(true);
    });

    it('accepts upper + lower case hex', () => {
      expect(isUuid(VALID.toUpperCase())).toBe(true);
      expect(isUuid(VALID.toLowerCase())).toBe(true);
    });

    for (const bad of INVALID_LIST) {
      it(`returns false for "${bad}"`, () => {
        expect(isUuid(bad)).toBe(false);
      });
    }
  });

  describe('toUuid', () => {
    it('returns the input unchanged for a valid UUID', () => {
      const branded = toUuid(VALID);
      expect(branded).toBe(VALID);
    });

    for (const bad of INVALID_LIST) {
      it(`throws on "${bad}"`, () => {
        expect(() => toUuid(bad)).toThrow(/valid UUID/);
      });
    }
  });
});
