import { parseHouseNumber } from './chunk-FOL57YM3.js';
import { z } from 'zod';

var existingBuildingRefSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string().nullable()
});
var addressSearchResultSchema = z.object({
  id: z.string().uuid(),
  streetId: z.string().uuid(),
  fullAddress: z.string(),
  street: z.string().nullable(),
  houseNumber: z.string().nullable(),
  city: z.string().nullable(),
  postcode: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  // Only populated for building-context searches (see above). Optional so
  // existing consumers and non-building searches are unaffected.
  existingBuilding: existingBuildingRefSchema.nullable().optional()
}).meta({ id: "AddressSearchResult" });
var structuredAddressInputSchema = z.object({
  addressId: z.string().uuid().optional().nullable(),
  streetId: z.string().uuid().optional().nullable(),
  houseNumber: z.string().trim().min(1).max(20).optional().nullable()
});
function buildMapUrl(input) {
  const query = "latitude" in input ? `${input.latitude},${input.longitude}` : input.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
function compareHouseNumbers(a, b) {
  const pa = parseHouseNumber(a);
  const pb = parseHouseNumber(b);
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

export { addressSearchResultSchema, buildMapUrl, compareHouseNumbers, existingBuildingRefSchema, structuredAddressInputSchema };
//# sourceMappingURL=chunk-IDRPSHWU.js.map
//# sourceMappingURL=chunk-IDRPSHWU.js.map