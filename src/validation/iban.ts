import { z } from 'zod';

/**
 * IBAN validation. Format-only by default — accepts any IBAN-shaped
 * string (2-letter country code + 2 check digits + 11–30 alphanumeric
 * BBAN chars, total 15–34 chars, uppercase). No mod-97 check here; the
 * bank-import flow validates statement IBANs match building IBANs, and
 * the backend can add stricter mod-97 verification later without
 * requiring a schema migration.
 *
 * Croatian IBANs: `HR` + 19 digits = 21 chars total. The format range
 * is deliberately permissive to support foreign bank accounts if a
 * building ever needs one.
 */
const IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;

export const ibanSchema = z
  .string()
  .min(15)
  .max(34)
  .regex(
    IBAN_REGEX,
    'IBAN must start with a 2-letter country code, 2 check digits, then 11-30 alphanumeric characters (uppercase).',
  )
  .describe(
    "International bank account number for the building's fund account. Format: 2-letter country code + 2 check digits + 11–30 alphanumeric BBAN characters. Stored uppercase, no spaces.",
  );

/**
 * Optional IBAN — accepts undefined/null/empty string, or a valid IBAN.
 * Used on update endpoints where the caller can clear the field by
 * submitting an empty string.
 */
export const optionalIbanSchema = z
  .string()
  .optional()
  .nullable()
  .refine(
    (val) => {
      if (val == null || val.trim() === '') return true;
      return IBAN_REGEX.test(val.trim());
    },
    {
      message:
        'IBAN must start with a 2-letter country code, 2 check digits, then 11-30 alphanumeric characters (uppercase).',
    },
  )
  .describe(
    'Optional IBAN for the building fund account. Omit, send null, or send an empty string to clear; otherwise must match the IBAN format.',
  );
