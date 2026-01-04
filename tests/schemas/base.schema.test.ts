import { describe, expect, it } from 'vitest';
import { baseEntitySchema, dateTimeSchema, uuidSchema } from '../../src/schemas';

describe('Base Schemas', () => {
  describe('uuidSchema', () => {
    it('should validate a valid UUID', () => {
      const validUuid = '550e8400-e29b-41d4-a716-446655440000';
      expect(() => uuidSchema.parse(validUuid)).not.toThrow();
    });

    it('should reject an invalid UUID', () => {
      const invalidUuid = 'not-a-uuid';
      expect(() => uuidSchema.parse(invalidUuid)).toThrow();
    });
  });

  describe('dateTimeSchema', () => {
    it('should validate a valid ISO datetime', () => {
      const validDateTime = '2025-01-04T12:00:00.000Z';
      expect(() => dateTimeSchema.parse(validDateTime)).not.toThrow();
    });

    it('should reject an invalid datetime', () => {
      const invalidDateTime = 'not-a-date';
      expect(() => dateTimeSchema.parse(invalidDateTime)).toThrow();
    });
  });

  describe('baseEntitySchema', () => {
    it('should validate a valid base entity', () => {
      const validEntity = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        createdAt: '2025-01-04T12:00:00.000Z',
        updatedAt: '2025-01-04T13:00:00.000Z',
      };
      expect(() => baseEntitySchema.parse(validEntity)).not.toThrow();
    });

    it('should allow null updatedAt', () => {
      const entityWithNullUpdate = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        createdAt: '2025-01-04T12:00:00.000Z',
        updatedAt: null,
      };
      expect(() => baseEntitySchema.parse(entityWithNullUpdate)).not.toThrow();
    });
  });
});
