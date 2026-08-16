import { z } from 'zod';

/**
 * UUID validation schema
 */
export const uuidSchema = z.string().uuid();

/**
 * ISO 8601 datetime validation schema
 */
export const dateTimeSchema = z.string().datetime();

/**
 * Optional/nullable datetime schema
 */
export const optionalDateTimeSchema = z.string().datetime().nullable().optional();

/**
 * Boolean that survives a query string.
 *
 * `z.coerce.boolean()` is `Boolean(value)`, and `Boolean('false')` is TRUE — so
 * `?flag=false` silently means "on", which is worse than no filter at all: a
 * denials-only audit view returns everything, an overdue-only DSAR queue
 * returns every request. Use this for every boolean query param. Real booleans
 * pass through for callers that already parsed the query string.
 */
export const booleanish = z
  .union([z.boolean(), z.literal('true'), z.literal('false')])
  .transform((value) => (typeof value === 'boolean' ? value : value === 'true'));

/**
 * Base entity schema with common fields
 */
export const baseEntitySchema = z.object({
  id: uuidSchema,
  createdAt: dateTimeSchema,
  updatedAt: optionalDateTimeSchema,
});

/**
 * Entity that belongs to a building
 */
export const buildingEntitySchema = baseEntitySchema.extend({
  buildingId: uuidSchema,
});

/**
 * Entity created by a user
 */
export const userEntitySchema = baseEntitySchema.extend({
  createdBy: uuidSchema,
});

/**
 * Entity that belongs to a building and was created by a user
 */
export const buildingUserEntitySchema = baseEntitySchema.extend({
  buildingId: uuidSchema,
  createdBy: uuidSchema,
});

/**
 * Permission fields for API responses
 */
export const permissionFieldsSchema = z.object({
  canEdit: z.boolean(),
  canDelete: z.boolean(),
});
