import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { multipartArray, multipartBoolean } from '../../src/schemas/multipart.schema';

describe('multipartArray', () => {
  const schema = multipartArray(z.string());

  it('passes through an actual array unchanged', () => {
    const result = schema.parse(['a', 'b', 'c']);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('parses a JSON-encoded array string', () => {
    const result = schema.parse('["a","b","c"]');
    expect(result).toEqual(['a', 'b', 'c']);
  });

  it('wraps a single string as a one-element array', () => {
    const result = schema.parse('hello');
    expect(result).toEqual(['hello']);
  });

  it('returns an empty array for an empty string', () => {
    const result = schema.parse('');
    expect(result).toEqual([]);
  });

  it('returns an empty array for a whitespace-only string', () => {
    const result = schema.parse('   ');
    expect(result).toEqual([]);
  });

  it('treats broken JSON as a single raw string', () => {
    // Mirrors class-transformer's fallback — we get the raw value wrapped,
    // not a parse exception.
    const result = schema.parse('[not-json,really');
    expect(result).toEqual(['[not-json,really']);
  });

  it('treats a non-array JSON value as a single raw string', () => {
    const result = schema.parse('{"not":"an array"}');
    expect(result).toEqual(['{"not":"an array"}']);
  });

  it('still validates inner items against the schema', () => {
    const uuidArraySchema = multipartArray(z.string().uuid());
    const bad = uuidArraySchema.safeParse('["not-a-uuid"]');
    expect(bad.success).toBe(false);
  });

  it('rejects undefined when not wrapped in .optional()', () => {
    const result = schema.safeParse(undefined);
    expect(result.success).toBe(false);
  });

  it('passes undefined through when wrapped in .optional()', () => {
    const optionalSchema = multipartArray(z.string()).optional();
    expect(optionalSchema.parse(undefined)).toBeUndefined();
  });
});

describe('multipartBoolean', () => {
  const schema = multipartBoolean();

  it('passes through a real boolean', () => {
    expect(schema.parse(true)).toBe(true);
    expect(schema.parse(false)).toBe(false);
  });

  it('coerces the string "true" to true', () => {
    expect(schema.parse('true')).toBe(true);
  });

  it('coerces the string "false" to false', () => {
    expect(schema.parse('false')).toBe(false);
  });

  it('coerces an empty string to false (blank checkbox default)', () => {
    expect(schema.parse('')).toBe(false);
  });

  it('coerces null to false', () => {
    expect(schema.parse(null)).toBe(false);
  });

  it('rejects arbitrary strings', () => {
    const result = schema.safeParse('maybe');
    expect(result.success).toBe(false);
  });
});
