import { z } from 'zod';

// src/validation/index.ts
var oibSchema = z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").refine(
  (oib) => {
    let remainder = 10;
    for (let i = 0; i < 10; i++) {
      remainder = (remainder + Number(oib[i])) % 10;
      if (remainder === 0) remainder = 10;
      remainder = remainder * 2 % 11;
    }
    const checkDigit = (11 - remainder) % 10;
    return checkDigit === Number(oib[10]);
  },
  { message: "Invalid OIB check digit" }
);
var optionalOibSchema = z.string().optional().refine(
  (val) => {
    if (!val || val.trim() === "") return true;
    if (!/^\d{11}$/.test(val.trim())) return false;
    const oib = val.trim();
    let remainder = 10;
    for (let i = 0; i < 10; i++) {
      remainder = (remainder + Number(oib[i])) % 10;
      if (remainder === 0) remainder = 10;
      remainder = remainder * 2 % 11;
    }
    const checkDigit = (11 - remainder) % 10;
    return checkDigit === Number(oib[10]);
  },
  { message: "OIB must be exactly 11 digits with a valid check digit" }
);
var phoneSchema = z.string().optional().refine(
  (val) => {
    if (!val || val.trim() === "") return true;
    if (!/^[\d\s\-+()]+$/.test(val)) return false;
    if (val.length > 20) return false;
    return val.replace(/\D/g, "").length >= 8;
  },
  { message: "Please enter a valid phone number (minimum 8 digits)" }
);
var addressSchema = z.string().max(200, "Address must be at most 200 characters");

export { addressSchema, oibSchema, optionalOibSchema, phoneSchema };
//# sourceMappingURL=chunk-WXILYGYF.js.map
//# sourceMappingURL=chunk-WXILYGYF.js.map