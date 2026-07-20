import { z } from 'zod';
export { A as AddressParts, P as ParsedHouseNumber, f as formatAddress, i as isValidHouseNumber, n as normalizeHouseNumber, p as parseHouseNumber } from '../house-number-Di2u5fvq.js';

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

/**
 * A building already registered at an address — attached to a search result
 * so the create/edit picker can warn "already registered here" and offer the
 * join flow instead of letting the user hit a 409. Present only when the
 * search was requested with the building flag AND an active/pending building
 * exists at that exact address; null otherwise.
 */
declare const existingBuildingRefSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type ExistingBuildingRef = z.infer<typeof existingBuildingRefSchema>;
/**
 * One suggestion row served by the address search endpoints.
 * Street-level rows (no house number yet) have `houseNumber: null`,
 * `id === streetId`, and null coordinates.
 */
declare const addressSearchResultSchema: z.ZodObject<{
    id: z.ZodString;
    streetId: z.ZodString;
    fullAddress: z.ZodString;
    street: z.ZodNullable<z.ZodString>;
    houseNumber: z.ZodNullable<z.ZodString>;
    city: z.ZodNullable<z.ZodString>;
    postcode: z.ZodNullable<z.ZodString>;
    latitude: z.ZodNullable<z.ZodNumber>;
    longitude: z.ZodNullable<z.ZodNumber>;
    existingBuilding: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type AddressSearchResult = z.infer<typeof addressSearchResultSchema>;
/**
 * Reusable request fragment for structured address input. Merge into a
 * form/request schema (`.extend(structuredAddressInputSchema.shape)`) —
 * used by owner and profile contracts; the building schemas predate it
 * and keep their own equivalent fields.
 */
declare const structuredAddressInputSchema: z.ZodObject<{
    addressId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    streetId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    houseNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
type StructuredAddressInput = z.infer<typeof structuredAddressInputSchema>;
/**
 * A structured address as held on an entity (building / owner / user).
 * `addressId` is null when the value fell back to free text or an
 * unlisted house number that the backend has not resolved yet.
 */
interface AddressValue {
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
interface AddressDisplayProps {
    /** Display string; prefer the entity's cached/canonical one. */
    address: string;
    /** Render the map-pin icon in front of the text. */
    withIcon?: boolean;
    /** Wrap in an "open in maps" affordance when coords/address allow. */
    linkToMap?: boolean;
    latitude?: number | null;
    longitude?: number | null;
}
type MapUrlInput = {
    latitude: number;
    longitude: number;
} | {
    address: string;
};
/**
 * Build a provider-neutral external map URL. Google Maps universal
 * links open the native maps app on iOS/Android and the web map on
 * desktop. Coordinates are preferred (exact); a display-address query
 * is the fallback for entities without geocoding.
 */
declare function buildMapUrl(input: MapUrlInput): string;
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
declare function compareHouseNumbers(a: string, b: string): number;

export { type AddressDisplayProps, type AddressSearchResult, type AddressValue, type ExistingBuildingRef, type MapUrlInput, type StructuredAddressInput, addressSearchResultSchema, buildMapUrl, compareHouseNumbers, existingBuildingRefSchema, structuredAddressInputSchema };
