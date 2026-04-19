import { z } from 'zod';

// Croatian personal ID number — exactly 11 digits
export const oibSchema = z
  .string()
  .length(11, 'OIB must be exactly 11 digits')
  .regex(/^\d{11}$/, 'OIB must contain only digits');

// Same, but the field is optional (empty string treated as absent)
export const optionalOibSchema = z
  .string()
  .max(11)
  .optional()
  .refine((val) => !val || val.trim() === '' || /^\d{11}$/.test(val.trim()), {
    message: 'OIB must be exactly 11 digits',
  });

// Phone number — digits, spaces, +, -, parentheses; minimum 8 digits when non-empty
export const phoneSchema = z
  .string()
  .max(20)
  .optional()
  .refine(
    (val) => {
      if (!val || val.trim() === '') return true;
      return /^[\d\s\-+()]+$/.test(val) && val.replace(/\D/g, '').length >= 8;
    },
    { message: 'Please enter a valid phone number (minimum 8 digits)' },
  );

// Physical address string
export const addressSchema = z.string().max(200);
