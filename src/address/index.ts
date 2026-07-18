/**
 * Address value-object — the canonical cross-consumer contract for
 * structured Croatian addresses (DGU-backed `streets` + `addresses`
 * reference model).
 *
 * Web, mobile, and backend all speak this shape:
 * - `AddressSearchResult` — one row from `/addresses/search` or
 *   `/addresses/by-street/:streetId` (street-level rows carry
 *   `houseNumber: null` and are navigational only — never a terminal
 *   pick in address pickers).
 * - `AddressValue` — a resolved address as persisted on an entity.
 * - `buildMapUrl` — external map link from coords (preferred) or a
 *   display string.
 * - `compareHouseNumbers` — natural ordering for house-number lists.
 *
 * House-number normalization/formatting itself lives in
 * `utils/house-number.ts` and is re-exported here for cohesion.
 */

import { z } from 'zod';
import { type ParsedHouseNumber, parseHouseNumber } from '../utils/house-number';

export type { AddressParts, ParsedHouseNumber } from '../utils/house-number';
export {
  formatAddress,
  isValidHouseNumber,
  normalizeHouseNumber,
  parseHouseNumber,
} from '../utils/house-number';

/**
 * One suggestion row served by the address search endpoints.
 * Street-level rows (no house number yet) have `houseNumber: null`,
 * `id === streetId`, and null coordinates.
 */
export const addressSearchResultSchema = z
  .object({
    id: z.string().uuid(),
    streetId: z.string().uuid(),
    fullAddress: z.string(),
    street: z.string().nullable(),
    houseNumber: z.string().nullable(),
    city: z.string().nullable(),
    postcode: z.string().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
  })
  .meta({ id: 'AddressSearchResult' });

export type AddressSearchResult = z.infer<typeof addressSearchResultSchema>;

/**
 * Reusable request fragment for structured address input. Merge into a
 * form/request schema (`.extend(structuredAddressInputSchema.shape)`) —
 * used by owner and profile contracts; the building schemas predate it
 * and keep their own equivalent fields.
 */
export const structuredAddressInputSchema = z.object({
  addressId: z.string().uuid().optional().nullable(),
  streetId: z.string().uuid().optional().nullable(),
  houseNumber: z.string().trim().min(1).max(20).optional().nullable(),
});

export type StructuredAddressInput = z.infer<typeof structuredAddressInputSchema>;

/**
 * A structured address as held on an entity (building / owner / user).
 * `addressId` is null when the value fell back to free text or an
 * unlisted house number that the backend has not resolved yet.
 */
export interface AddressValue {
  addressId?: string | null;
  streetId?: string | null;
  houseNumber?: string | null;
  street: string | null;
  city: string | null;
  postalCode: string | null;
  latitude?: number | null;
  longitude?: number | null;
  /** Canonical display string, e.g. "Ilica 42A, 10000 Zagreb". */
  displayAddress: string;
}

/**
 * Contract implemented by each platform's `<AddressDisplay>` component
 * so web and mobile render addresses identically. Shared ships no
 * React — only this prop shape and the formatting helpers.
 */
export interface AddressDisplayProps {
  /** Display string; prefer the entity's cached/canonical one. */
  address: string;
  /** Render the map-pin icon in front of the text. */
  withIcon?: boolean;
  /** Wrap in an "open in maps" affordance when coords/address allow. */
  linkToMap?: boolean;
  latitude?: number | null;
  longitude?: number | null;
}

export type MapUrlInput = { latitude: number; longitude: number } | { address: string };

/**
 * Build a provider-neutral external map URL. Google Maps universal
 * links open the native maps app on iOS/Android and the web map on
 * desktop. Coordinates are preferred (exact); a display-address query
 * is the fallback for entities without geocoding.
 */
export function buildMapUrl(input: MapUrlInput): string {
  const query = 'latitude' in input ? `${input.latitude},${input.longitude}` : input.address;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Natural comparator for canonical house numbers (see
 * `normalizeHouseNumber`), for `Array.prototype.sort`.
 *
 * Ordering contract (mirrors how DGU prints street listings):
 * - Numeric part ascending ("2" < "10" < "100")
 * - Same base: plain, then letter-suffixed, then sub-numbered
 *   ("10" < "10A" < "10B" < "10/1" < "10/2")
 * - "BB" and unparseable values sort last, stably by string.
 */
export function compareHouseNumbers(a: string, b: string): number {
  const pa: ParsedHouseNumber | null = parseHouseNumber(a);
  const pb: ParsedHouseNumber | null = parseHouseNumber(b);

  if (!pa && !pb) return a.localeCompare(b);
  if (!pa) return 1;
  if (!pb) return -1;

  if (pa.number !== pb.number) return pa.number - pb.number;
  if ((pa.subNumber !== undefined) !== (pb.subNumber !== undefined)) {
    return pa.subNumber !== undefined ? 1 : -1;
  }
  const letterCmp = (pa.letter ?? '').localeCompare(pb.letter ?? '');
  if (letterCmp !== 0) return letterCmp;
  return (pa.subNumber ?? 0) - (pb.subNumber ?? 0);
}
