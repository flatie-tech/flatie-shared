'use strict';

var zod = require('zod');

// src/validation/index.ts
var oibSchema = zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").refine(
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
var optionalOibSchema = zod.z.string().optional().refine(
  (val) => {
    if (!val || val === "") return true;
    return /^\d{11}$/.test(val);
  },
  { message: "OIB must be exactly 11 digits" }
);
var phoneSchema = zod.z.string().regex(/^\+?[\d\s\-()]{6,20}$/, "Invalid phone number format").optional().or(zod.z.literal(""));
var addressSchema = zod.z.string().min(3, "Address must be at least 3 characters").max(200, "Address must be at most 200 characters");

exports.addressSchema = addressSchema;
exports.oibSchema = oibSchema;
exports.optionalOibSchema = optionalOibSchema;
exports.phoneSchema = phoneSchema;
//# sourceMappingURL=chunk-PQ65W6KL.cjs.map
//# sourceMappingURL=chunk-PQ65W6KL.cjs.map