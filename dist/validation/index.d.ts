import { z } from 'zod';

/**
 * Optional IBAN — accepts undefined/null/empty string, or a valid IBAN.
 * Used on update endpoints where the caller can clear the field by
 * submitting an empty string.
 */
declare const optionalIbanSchema: z.ZodNullable<z.ZodOptional<z.ZodString>>;

/**
 * Branded UUID string.
 *
 * A plain `string` that TypeScript treats as distinct from an ordinary string
 * thanks to the `__brand` phantom field. Consumers can opt in to stricter
 * typing at boundary points (URL builders, DB query helpers) without breaking
 * any of the existing signatures that still accept `string`.
 *
 * The brand exists only at compile time; at runtime a `UuidString` is an
 * ordinary string with no extra properties.
 */
type UuidString = string & {
    readonly __brand: 'UuidString';
};
/**
 * Type guard — narrows `string` to `UuidString` in a conditional branch.
 *
 * @example
 *   if (isUuid(id)) {
 *     // id: UuidString here
 *     API_ROUTES.BUILDINGS.BY_ID(id);
 *   }
 */
declare function isUuid(value: string): value is UuidString;
/**
 * Assert-cast: returns the input as `UuidString` if valid, throws otherwise.
 *
 * @example
 *   const buildingId = toUuid(req.params.id); // throws 422 if invalid
 *
 * @throws {Error} when the input is not a valid UUID.
 */
declare function toUuid(value: string): UuidString;

/**
 * Croatian OIB (Personal Identification Number) validation.
 * OIB is an 11-digit number with a check digit (ISO 7064, MOD 11,10).
 */
declare const oibSchema: z.ZodString;
/**
 * Optional OIB — allows undefined, empty string, whitespace-only, or a valid OIB.
 */
declare const optionalOibSchema: z.ZodOptional<z.ZodString>;
/**
 * Phone number validation. Allows undefined or empty string.
 * Must be 8–20 characters with only digits, spaces, +, -, and parentheses.
 * Requires at least 8 digits.
 */
declare const phoneSchema: z.ZodOptional<z.ZodString>;
/**
 * Address schema. Allows empty string or a value up to 200 characters.
 */
declare const addressSchema: z.ZodString;

export { type UuidString, addressSchema, isUuid, oibSchema, optionalIbanSchema, optionalOibSchema, phoneSchema, toUuid };
