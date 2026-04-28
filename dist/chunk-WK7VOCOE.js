import { z } from 'zod';

// src/validation/iban.ts
var IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
var ibanSchema = z.string().min(15).max(34).regex(
  IBAN_REGEX,
  "IBAN must start with a 2-letter country code, 2 check digits, then 11-30 alphanumeric characters (uppercase)."
).describe(
  "International bank account number for the building's fund account. Format: 2-letter country code + 2 check digits + 11\u201330 alphanumeric BBAN characters. Stored uppercase, no spaces."
);
var optionalIbanSchema = z.string().optional().nullable().refine(
  (val) => {
    if (val == null || val.trim() === "") return true;
    return IBAN_REGEX.test(val.trim());
  },
  {
    message: "IBAN must start with a 2-letter country code, 2 check digits, then 11-30 alphanumeric characters (uppercase)."
  }
).describe(
  "Optional IBAN for the building fund account. Omit, send null, or send an empty string to clear; otherwise must match the IBAN format."
);

export { ibanSchema, optionalIbanSchema };
//# sourceMappingURL=chunk-WK7VOCOE.js.map
//# sourceMappingURL=chunk-WK7VOCOE.js.map