import { z } from 'zod';
import { uuidSchema } from '../base.schema';

/**
 * Building type options
 */
export const BUILDING_TYPES = ['residential', 'commercial'] as const;
export type BuildingTypeOption = (typeof BUILDING_TYPES)[number];

/**
 * Building type schema
 */
export const buildingTypeSchema = z.enum(BUILDING_TYPES);

/**
 * Validation constants for buildings
 */
export const BUILDING_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ADDRESS_MIN: 1,
  ADDRESS_MAX: 200,
  UNITS_MIN: 1,
  UNITS_MAX: 10000,
} as const;

/**
 * Create building request schema
 */
export const createBuildingSchema = z.object({
  name: z
    .string()
    .min(BUILDING_LIMITS.NAME_MIN, 'Name is required')
    .max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`),
  type: buildingTypeSchema,
  address: z
    .string()
    .min(BUILDING_LIMITS.ADDRESS_MIN, 'Address is required')
    .max(
      BUILDING_LIMITS.ADDRESS_MAX,
      `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`,
    ),
  totalUnits: z.coerce
    .number()
    .min(BUILDING_LIMITS.UNITS_MIN, 'Building must have at least 1 unit')
    .max(
      BUILDING_LIMITS.UNITS_MAX,
      `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`,
    ),
});

/**
 * Update building request schema
 */
export const updateBuildingSchema = z.object({
  name: z.string().min(1).max(BUILDING_LIMITS.NAME_MAX).optional(),
  type: buildingTypeSchema.optional(),
  address: z.string().min(1).max(BUILDING_LIMITS.ADDRESS_MAX).optional(),
  totalUnits: z.coerce.number().min(1).max(BUILDING_LIMITS.UNITS_MAX).optional(),
});

/**
 * Join building with OTP schema
 */
export const joinBuildingWithOtpSchema = z.object({
  otp: z.string().min(1, 'OTP is required'),
  buildingId: uuidSchema,
});

/**
 * Update user building role schema
 */
export const updateUserBuildingRoleSchema = z.object({
  userId: uuidSchema,
  roleType: z.string().min(1, 'Role is required'),
  buildingSurfacePercentage: z.coerce.number().min(0).max(100).optional(),
});

// Inferred types
export type CreateBuildingSchema = z.infer<typeof createBuildingSchema>;
export type UpdateBuildingSchema = z.infer<typeof updateBuildingSchema>;
export type JoinBuildingWithOtpSchema = z.infer<typeof joinBuildingWithOtpSchema>;
export type UpdateUserBuildingRoleSchema = z.infer<typeof updateUserBuildingRoleSchema>;
