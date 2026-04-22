'use strict';

var zod = require('zod');

// src/validation/index.ts
var uuidStringSchema = zod.z.string().uuid("Must be a valid UUID").transform((value) => value);
var UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUuid(value) {
  return UUID_RE.test(value);
}
function toUuid(value) {
  if (!UUID_RE.test(value)) {
    throw new Error(`Expected a valid UUID, got: ${value}`);
  }
  return value;
}
function unsafeUuid(value) {
  return value;
}

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
var phoneSchema = zod.z.string().optional().refine(
  (val) => {
    if (!val || val.trim() === "") return true;
    if (!/^[\d\s\-+()]+$/.test(val)) return false;
    if (val.length > 20) return false;
    return val.replace(/\D/g, "").length >= 8;
  },
  { message: "Please enter a valid phone number (minimum 8 digits)" }
);
var addressSchema = zod.z.string().max(200, "Address must be at most 200 characters");

exports.addressSchema = addressSchema;
exports.isUuid = isUuid;
exports.oibSchema = oibSchema;
exports.optionalOibSchema = optionalOibSchema;
exports.phoneSchema = phoneSchema;
exports.toUuid = toUuid;
exports.unsafeUuid = unsafeUuid;
exports.uuidStringSchema = uuidStringSchema;
//# sourceMappingURL=chunk-4YQ2M22Q.cjs.map
//# sourceMappingURL=chunk-4YQ2M22Q.cjs.map