'use strict';

var zod = require('zod');

// src/validation/index.ts
var oibSchema = zod.z.string().length(11, "OIB must be exactly 11 digits").regex(/^\d{11}$/, "OIB must contain only digits");
var optionalOibSchema = zod.z.string().max(11).optional().refine(
  (val) => !val || val.trim() === "" || /^\d{11}$/.test(val.trim()),
  { message: "OIB must be exactly 11 digits" }
);
var phoneSchema = zod.z.string().max(20).optional().refine(
  (val) => {
    if (!val || val.trim() === "") return true;
    return /^[\d\s\-+()]+$/.test(val) && val.replace(/\D/g, "").length >= 8;
  },
  { message: "Please enter a valid phone number (minimum 8 digits)" }
);
var addressSchema = zod.z.string().max(200);

exports.addressSchema = addressSchema;
exports.oibSchema = oibSchema;
exports.optionalOibSchema = optionalOibSchema;
exports.phoneSchema = phoneSchema;
//# sourceMappingURL=chunk-3GLURNUB.cjs.map
//# sourceMappingURL=chunk-3GLURNUB.cjs.map