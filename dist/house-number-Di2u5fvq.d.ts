/**
 * Croatian house number normalization and parsing.
 *
 * Croatian house numbers follow patterns defined by Pravilnik NN 117/2022:
 * - Plain number: "42"
 * - Number + letter suffix (infill): "42A", "22B"
 * - Number/sub-number (multiple entrances): "16/1", "16/2"
 * - BB (bez broja — no assigned number, rural): "BB"
 */
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
declare function normalizeHouseNumber(raw: string): string | null;
/**
 * Check whether a raw house number string is valid after normalization.
 */
declare function isValidHouseNumber(raw: string): boolean;
interface ParsedHouseNumber {
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
declare function parseHouseNumber(normalized: string): ParsedHouseNumber | null;
interface AddressParts {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
}
/**
 * Format address components into the canonical Croatian display string.
 * "Ilica 42A, 10000 Zagreb"
 */
declare function formatAddress(parts: AddressParts): string;

export { type AddressParts as A, type ParsedHouseNumber as P, formatAddress as f, isValidHouseNumber as i, normalizeHouseNumber as n, parseHouseNumber as p };
