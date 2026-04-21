import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { ParseError, parseData } from '../../src/utils';

const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().int().positive(),
});

describe('parseData', () => {
  it('returns the parsed value when input matches the schema', () => {
    const input = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'a@b.com',
      age: 30,
    };
    const result = parseData(userSchema, input);
    expect(result).toEqual(input);
  });

  it('throws ParseError with a stable `code` when input drifts', () => {
    try {
      parseData(userSchema, { id: 'not-a-uuid', email: 'bad', age: -1 });
      expect.fail('should have thrown');
    } catch (err) {
      expect(err).toBeInstanceOf(ParseError);
      expect(err).toBeInstanceOf(Error);
      expect((err as ParseError).name).toBe('ParseError');
      expect((err as ParseError).code).toBe('RESPONSE_CONTRACT_DRIFT');
    }
  });

  it('attaches the original ZodError as `cause` and flattens issues', () => {
    try {
      parseData(userSchema, { id: '', email: '', age: 'x' });
      expect.fail('should have thrown');
    } catch (err) {
      const parseError = err as ParseError;
      expect(parseError.cause).toBeInstanceOf(z.ZodError);
      expect(Array.isArray(parseError.issues)).toBe(true);
      expect(parseError.issues.length).toBeGreaterThan(0);
      // Every issue has a `path` (from zod) so callers can render per-field
      // error summaries without digging into `cause`.
      for (const issue of parseError.issues) {
        expect(issue).toHaveProperty('path');
        expect(issue).toHaveProperty('message');
      }
    }
  });

  it('uses the custom message when provided, default otherwise', () => {
    const custom = () => parseData(userSchema, {}, 'Notices API returned bad data');
    expect(custom).toThrow('Notices API returned bad data');

    const defaultMsg = () => parseData(userSchema, {});
    expect(defaultMsg).toThrow('Response failed schema validation');
  });

  it('strips unknown fields on plain z.object (Zod 4 default)', () => {
    const input = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'a@b.com',
      age: 30,
      extra: 'dropped',
    };
    const result = parseData(userSchema, input) as Record<string, unknown>;
    expect(result).not.toHaveProperty('extra');
  });

  it('returns primitive types unwrapped', () => {
    const result = parseData(z.string().min(1), 'hello');
    expect(result).toBe('hello');
  });
});
