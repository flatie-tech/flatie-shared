'use strict';

var chunk4CZ7F75B_cjs = require('./chunk-4CZ7F75B.cjs');
var zod = require('zod');

var addressSearchResultSchema = zod.z.object({
  id: zod.z.string().uuid(),
  streetId: zod.z.string().uuid(),
  fullAddress: zod.z.string(),
  street: zod.z.string().nullable(),
  houseNumber: zod.z.string().nullable(),
  city: zod.z.string().nullable(),
  postcode: zod.z.string().nullable(),
  latitude: zod.z.number().nullable(),
  longitude: zod.z.number().nullable()
}).meta({ id: "AddressSearchResult" });
var structuredAddressInputSchema = zod.z.object({
  addressId: zod.z.string().uuid().optional().nullable(),
  streetId: zod.z.string().uuid().optional().nullable(),
  houseNumber: zod.z.string().trim().min(1).max(20).optional().nullable()
});
function buildMapUrl(input) {
  const query = "latitude" in input ? `${input.latitude},${input.longitude}` : input.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function compareHouseNumbers(a, b) {
  const pa = chunk4CZ7F75B_cjs.parseHouseNumber(a);
  const pb = chunk4CZ7F75B_cjs.parseHouseNumber(b);
  if (!pa && !pb) return a.localeCompare(b);
  if (!pa) return 1;
  if (!pb) return -1;
  if (pa.number !== pb.number) return pa.number - pb.number;
  if (pa.subNumber !== void 0 !== (pb.subNumber !== void 0)) {
    return pa.subNumber !== void 0 ? 1 : -1;
  }
  const letterCmp = (pa.letter ?? "").localeCompare(pb.letter ?? "");
  if (letterCmp !== 0) return letterCmp;
  return (pa.subNumber ?? 0) - (pb.subNumber ?? 0);
}

exports.addressSearchResultSchema = addressSearchResultSchema;
exports.buildMapUrl = buildMapUrl;
exports.compareHouseNumbers = compareHouseNumbers;
exports.structuredAddressInputSchema = structuredAddressInputSchema;
//# sourceMappingURL=chunk-3AZTJ34D.cjs.map
//# sourceMappingURL=chunk-3AZTJ34D.cjs.map