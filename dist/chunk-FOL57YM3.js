// src/utils/house-number.ts
var HOUSE_NUMBER_PATTERN = /^\d{1,4}[A-Z]?(?:\/\d{1,3})?$|^BB$/;
function normalizeHouseNumber(raw) {
  if (!raw || !raw.trim()) return null;
  const normalized = raw.trim().toUpperCase().replace(/\s+/g, "").replace(/\s*\/\s*/g, "/");
  if (!HOUSE_NUMBER_PATTERN.test(normalized)) return null;
  return normalized;
}
function isValidHouseNumber(raw) {
  return normalizeHouseNumber(raw) !== null;
}
function parseHouseNumber(normalized) {
  if (normalized === "BB") return null;
  const match = normalized.match(/^(\d{1,4})([A-Z])?(?:\/(\d{1,3}))?$/);
  if (!match) return null;
  const result = { number: Number.parseInt(match[1], 10) };
  if (match[2]) result.letter = match[2];
  if (match[3]) result.subNumber = Number.parseInt(match[3], 10);
  return result;
}
function formatAddress(parts) {
  const streetPart = [parts.street, parts.houseNumber].filter(Boolean).join(" ");
  return `${streetPart}, ${parts.postalCode} ${parts.city}`;
}

export { formatAddress, isValidHouseNumber, normalizeHouseNumber, parseHouseNumber };
//# sourceMappingURL=chunk-FOL57YM3.js.map
//# sourceMappingURL=chunk-FOL57YM3.js.map