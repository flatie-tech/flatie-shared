import { z } from 'zod';

// src/validation/iban.ts
var IBAN_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/;
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

export { optionalIbanSchema };
//# sourceMappingURL=chunk-7YKQN43X.js.map
//# sourceMappingURL=chunk-7YKQN43X.js.map