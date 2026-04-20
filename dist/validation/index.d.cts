import { z } from 'zod';

/**
 * Croatian OIB (Personal Identification Number) validation.
 * OIB is an 11-digit number with a check digit (ISO 7064, MOD 11,10).
 */
declare const oibSchema: z.ZodString;
/**
 * Optional OIB — allows empty string or valid OIB.
 */
declare const optionalOibSchema: z.ZodOptional<z.ZodString>;
/**
 * Phone number validation (international format).
 */
declare const phoneSchema: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
/**
 * Address schema for user profile / organization.
 */
declare const addressSchema: z.ZodString;

export { addressSchema, oibSchema, optionalOibSchema, phoneSchema };
