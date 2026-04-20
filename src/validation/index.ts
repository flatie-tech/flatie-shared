import { z } from 'zod';

/**
 * Croatian OIB (Personal Identification Number) validation.
 * OIB is an 11-digit number with a check digit (ISO 7064, MOD 11,10).
 */
export const oibSchema = z
  .string()
  .regex(/^\d{11}$/, 'OIB must be exactly 11 digits')
  .refine(
    (oib) => {
      let remainder = 10;
      for (let i = 0; i < 10; i++) {
        remainder = (remainder + Number(oib[i])) % 10;
        if (remainder === 0) remainder = 10;
        remainder = (remainder * 2) % 11;
      }
      const checkDigit = (11 - remainder) % 10;
      return checkDigit === Number(oib[10]);
    },
    { message: 'Invalid OIB check digit' },
  );

/**
 * Optional OIB — allows empty string or valid OIB.
 */
export const optionalOibSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val === '') return true;
      return /^\d{11}$/.test(val);
    },
    { message: 'OIB must be exactly 11 digits' },
  );

/**
 * Phone number validation (international format).
 */
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-()]{6,20}$/, 'Invalid phone number format')
  .optional()
  .or(z.literal(''));

/**
 * Address schema for user profile / organization.
 */
export const addressSchema = z
  .string()
  .min(3, 'Address must be at least 3 characters')
  .max(200, 'Address must be at most 200 characters');
