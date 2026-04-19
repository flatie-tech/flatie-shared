import { describe, expect, it } from 'vitest';
import { addressSchema, oibSchema, optionalOibSchema, phoneSchema } from '../../src/validation';

describe('oibSchema', () => {
  it('accepts valid 11-digit OIB', () => {
    expect(oibSchema.safeParse('12345678901').success).toBe(true);
  });

  it('rejects fewer than 11 digits', () => {
    expect(oibSchema.safeParse('1234567890').success).toBe(false);
  });

  it('rejects more than 11 digits', () => {
    expect(oibSchema.safeParse('123456789012').success).toBe(false);
  });

  it('rejects non-digit characters', () => {
    expect(oibSchema.safeParse('1234567890A').success).toBe(false);
    expect(oibSchema.safeParse('12345-67890').success).toBe(false);
  });
});

describe('optionalOibSchema', () => {
  it('accepts undefined', () => {
    expect(optionalOibSchema.safeParse(undefined).success).toBe(true);
  });

  it('accepts empty string', () => {
    expect(optionalOibSchema.safeParse('').success).toBe(true);
  });

  it('accepts whitespace-only string', () => {
    expect(optionalOibSchema.safeParse('   ').success).toBe(true);
  });

  it('accepts valid 11-digit OIB', () => {
    expect(optionalOibSchema.safeParse('12345678901').success).toBe(true);
  });

  it('rejects malformed OIB when non-empty', () => {
    expect(optionalOibSchema.safeParse('1234567').success).toBe(false);
    expect(optionalOibSchema.safeParse('1234567890A').success).toBe(false);
  });
});

describe('phoneSchema', () => {
  it('accepts undefined', () => {
    expect(phoneSchema.safeParse(undefined).success).toBe(true);
  });

  it('accepts empty string', () => {
    expect(phoneSchema.safeParse('').success).toBe(true);
  });

  it('accepts valid phone numbers', () => {
    expect(phoneSchema.safeParse('+385 91 234 5678').success).toBe(true);
    expect(phoneSchema.safeParse('091-234-5678').success).toBe(true);
    expect(phoneSchema.safeParse('(091) 234 5678').success).toBe(true);
    expect(phoneSchema.safeParse('00385912345678').success).toBe(true);
  });

  it('rejects phone numbers with fewer than 8 digits', () => {
    expect(phoneSchema.safeParse('1234567').success).toBe(false);
  });

  it('rejects phones with invalid characters', () => {
    expect(phoneSchema.safeParse('+385abc12345').success).toBe(false);
  });

  it('rejects strings over 20 characters', () => {
    expect(phoneSchema.safeParse('+385 91 234 5678 9999').success).toBe(false);
  });
});

describe('addressSchema', () => {
  it('accepts a normal address', () => {
    expect(addressSchema.safeParse('Ilica 1, Zagreb').success).toBe(true);
  });

  it('accepts empty string', () => {
    expect(addressSchema.safeParse('').success).toBe(true);
  });

  it('rejects strings over 200 characters', () => {
    expect(addressSchema.safeParse('A'.repeat(201)).success).toBe(false);
  });

  it('accepts exactly 200 characters', () => {
    expect(addressSchema.safeParse('A'.repeat(200)).success).toBe(true);
  });
});
