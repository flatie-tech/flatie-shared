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

// Inferred types
export type UuidSchema = z.infer<typeof uuidSchema>;
export type DateTimeSchema = z.infer<typeof dateTimeSchema>;
export type BaseEntitySchema = z.infer<typeof baseEntitySchema>;
export type BuildingEntitySchema = z.infer<typeof buildingEntitySchema>;
export type UserEntitySchema = z.infer<typeof userEntitySchema>;
export type BuildingUserEntitySchema = z.infer<typeof buildingUserEntitySchema>;
export type PermissionFieldsSchema = z.infer<typeof permissionFieldsSchema>;
