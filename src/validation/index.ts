import { z } from 'zod';

export { ibanSchema, optionalIbanSchema } from './iban';
// Re-export UUID brand + helpers so consumers can `import { toUuid, UuidString }
// from '@flatie/shared/validation'` alongside OIB/phone/address validators.
export { isUuid, toUuid, type UuidString, unsafeUuid, uuidStringSchema } from './uuid';

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
 * Optional OIB — allows undefined, empty string, whitespace-only, or a valid OIB.
 */
export const optionalOibSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      if (!/^\d{11}$/.test(val.trim())) return false;
      const oib = val.trim();
      let remainder = 10;
      for (let i = 0; i < 10; i++) {
        remainder = (remainder + Number(oib[i])) % 10;
        if (remainder === 0) remainder = 10;
        remainder = (remainder * 2) % 11;
      }
      const checkDigit = (11 - remainder) % 10;
      return checkDigit === Number(oib[10]);
    },
    { message: 'OIB must be exactly 11 digits with a valid check digit' },
  );

/**
 * Phone number validation. Allows undefined or empty string.
 * Must be 8–20 characters with only digits, spaces, +, -, and parentheses.
 * Requires at least 8 digits.
 */
export const phoneSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      if (!/^[\d\s\-+()]+$/.test(val)) return false;
      if (val.length > 20) return false;
      return val.replace(/\D/g, '').length >= 8;
    },
    { message: 'Please enter a valid phone number (minimum 8 digits)' },
  );

/**
 * Address schema. Allows empty string or a value up to 200 characters.
 */
export const addressSchema = z.string().max(200, 'Address must be at most 200 characters');
