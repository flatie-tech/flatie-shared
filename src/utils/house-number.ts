/**
 * Croatian house number normalization and parsing.
 *
 * Croatian house numbers follow patterns defined by Pravilnik NN 117/2022:
 * - Plain number: "42"
 * - Number + letter suffix (infill): "42A", "22B"
 * - Number/sub-number (multiple entrances): "16/1", "16/2"
 * - BB (bez broja — no assigned number, rural): "BB"
 */

const HOUSE_NUMBER_PATTERN = /^\d{1,4}[A-Z]?(?:\/\d{1,3})?$|^BB$/;

/**
 * Normalize a raw house number input to its canonical form.
 * - Trims whitespace
 * - Uppercases
 * - Strips spaces between digits and letters ("42 A" → "42A")
 * - Strips spaces around slash ("16 / 1" → "16/1")
 * - "bb" → "BB"
 *
 * Returns null for empty/whitespace-only input or invalid values.
 */
export function normalizeHouseNumber(raw: string): string | null {
  if (!raw || !raw.trim()) return null;

  const normalized = raw
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/\s*\/\s*/g, '/');

  if (!HOUSE_NUMBER_PATTERN.test(normalized)) return null;

  return normalized;
}

/**
 * Check whether a raw house number string is valid after normalization.
 */
export function isValidHouseNumber(raw: string): boolean {
  return normalizeHouseNumber(raw) !== null;
}

export interface ParsedHouseNumber {
  number: number;
  letter?: string;
  subNumber?: number;
}

/**
 * Parse a normalized house number into structured components for sorting.
 * Expects already-normalized input (uppercase, no spaces).
 *
 * "42"   → { number: 42 }
 * "42A"  → { number: 42, letter: "A" }
 * "16/1" → { number: 16, subNumber: 1 }
 * "BB"   → null
 */
export function parseHouseNumber(normalized: string): ParsedHouseNumber | null {
  if (normalized === 'BB') return null;

  const match = normalized.match(/^(\d{1,4})([A-Z])?(?:\/(\d{1,3}))?$/);
  if (!match) return null;

  const result: ParsedHouseNumber = { number: Number.parseInt(match[1]!, 10) };
  if (match[2]) result.letter = match[2];
  if (match[3]) result.subNumber = Number.parseInt(match[3]!, 10);

  return result;
}

export interface AddressParts {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
}

/**
 * Format address components into the canonical Croatian display string.
 * "Ilica 42A, 10000 Zagreb"
 */
export function formatAddress(parts: AddressParts): string {
  const streetPart = [parts.street, parts.houseNumber].filter(Boolean).join(' ');
  return `${streetPart}, ${parts.postalCode} ${parts.city}`;
}
