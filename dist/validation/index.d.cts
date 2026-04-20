import { z } from 'zod';

/**
 * Croatian OIB (Personal Identification Number) validation.
 * OIB is an 11-digit number with a check digit (ISO 7064, MOD 11,10).
 */
declare const oibSchema: z.ZodString;
/**
 * Optional OIB — allows undefined, empty string, whitespace-only, or a valid OIB.
 */
declare const optionalOibSchema: z.ZodOptional<z.ZodString>;
/**
 * Phone number validation. Allows undefined or empty string.
 * Must be 8–20 characters with only digits, spaces, +, -, and parentheses.
 * Requires at least 8 digits.
 */
declare const phoneSchema: z.ZodOptional<z.ZodString>;
/**
 * Address schema. Allows empty string or a value up to 200 characters.
 */
declare const addressSchema: z.ZodString;

export { addressSchema, oibSchema, optionalOibSchema, phoneSchema };
