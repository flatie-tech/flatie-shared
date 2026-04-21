import { z } from 'zod';
import { BuildingRole } from '../../enums/role.enum';
import { uuidSchema } from '../base.schema';
import { multipartBoolean } from '../multipart.schema';

/**
 * Building type options — uppercase to match the backend pgEnum.
 * Frontend callers that use lowercase internally (form state)
 * must `toUpperCase()` before submitting.
 */
export const BUILDING_TYPES = ['RESIDENTIAL', 'COMMERCIAL', 'RESIDENTIAL_COMMERCIAL'] as const;
export type BuildingTypeOption = (typeof BUILDING_TYPES)[number];

/**
 * Building type schema
 */
export const buildingTypeSchema = z
  .enum(BUILDING_TYPES)
  .describe(
    'Usage of the building: `RESIDENTIAL` (homes only), `COMMERCIAL` (business only), or `RESIDENTIAL_COMMERCIAL` (mixed use).',
  );

/**
 * Validation constants for buildings
 */
export const BUILDING_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ADDRESS_MIN: 1,
  ADDRESS_MAX: 200,
  HOUSE_NUMBER_MIN: 1,
  HOUSE_NUMBER_MAX: 20,
  OTP_LENGTH: 6,
  UNITS_MIN: 1,
  UNITS_MAX: 10000,
} as const;

/**
 * Create building request schema — matches flatie-backend's
 * `POST /buildings` multipart/form-data payload. `coverImage` and
 * `houseRulesFile` files are uploaded separately via the multipart
 * interceptor and merged in the controller after validation.
 */
export const createBuildingSchema = z.object({
  name: z
    .string()
    .min(BUILDING_LIMITS.NAME_MIN, 'Name is required')
    .max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`)
    .describe('Display name of the building shown throughout the UI.'),
  address: z
    .string()
    .min(BUILDING_LIMITS.ADDRESS_MIN, 'Address is required')
    .max(
      BUILDING_LIMITS.ADDRESS_MAX,
      `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`,
    )
    .describe('Full postal address including street and city.'),
  streetId: uuidSchema.describe(
    'UUID of the street record the building belongs to; used to normalise address data.',
  ),
  houseNumber: z
    .string()
    .min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, 'House number is required')
    .max(BUILDING_LIMITS.HOUSE_NUMBER_MAX)
    .describe('Street/house number including any suffix (e.g. "12A", "5B").'),
  type: buildingTypeSchema,
  totalUnits: z.coerce
    .number()
    .int()
    .min(BUILDING_LIMITS.UNITS_MIN, 'Building must have at least 1 unit')
    .max(
      BUILDING_LIMITS.UNITS_MAX,
      `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`,
    )
    .describe('Total number of individual units (apartments, garages, storage).'),
  isStratified: multipartBoolean()
    .optional()
    .describe(
      'True when the building is stratified (each unit has its own title deed). Defaults to false when omitted.',
    ),
  role: z
    .enum([
      BuildingRole.OWNER_REPRESENTATIVE,
      BuildingRole.DEPUTY_REPRESENTATIVE,
      BuildingRole.CO_OWNER,
    ])
    .optional()
    .describe(
      'Role the creating user should claim for themselves in the new building; omitted creates the building without assigning the caller a role.',
    ),
});

/**
 * Update building request schema — all top-level fields optional.
 * `coverImage` and `houseRulesFile` upload files via multipart;
 * `removeHouseRulesFile` is an explicit opt-in to clear the
 * existing house-rules attachment.
 */
export const updateBuildingSchema = z.object({
  name: z
    .string()
    .min(BUILDING_LIMITS.NAME_MIN)
    .max(BUILDING_LIMITS.NAME_MAX)
    .optional()
    .describe('New display name of the building.'),
  address: z
    .string()
    .min(BUILDING_LIMITS.ADDRESS_MIN)
    .max(BUILDING_LIMITS.ADDRESS_MAX)
    .optional()
    .describe('New full postal address.'),
  type: buildingTypeSchema.optional(),
  totalUnits: z.coerce
    .number()
    .int()
    .min(BUILDING_LIMITS.UNITS_MIN)
    .max(BUILDING_LIMITS.UNITS_MAX)
    .optional()
    .describe('Revised total unit count.'),
  isStratified: multipartBoolean()
    .optional()
    .describe('Toggles whether the building is stratified (per-unit title deeds).'),
  removeHouseRulesFile: multipartBoolean()
    .optional()
    .describe(
      'When true, clears the existing house-rules attachment. Submit independently of `houseRulesFile` uploads.',
    ),
});

/**
 * Join building with OTP — backend wire shape is
 * `POST /buildings/:buildingId/join-with-otp { code: string }`.
 * buildingId comes from the URL, not the body.
 */
export const joinBuildingWithOtpSchema = z.object({
  code: z
    .string()
    .length(
      BUILDING_LIMITS.OTP_LENGTH,
      `OTP must be a ${BUILDING_LIMITS.OTP_LENGTH}-character code`,
    )
    .regex(/^[A-Z0-9]{6}$/, 'OTP must be a 6-character alphanumeric code')
    .describe('Six-character alphanumeric invite code shared by a building representative.'),
});

/**
 * Update user building role schema (admin endpoint)
 */
export const updateUserBuildingRoleSchema = z.object({
  userId: uuidSchema.describe('UUID of the user whose building role is being updated.'),
  roleType: z
    .enum([
      BuildingRole.OWNER_REPRESENTATIVE,
      BuildingRole.DEPUTY_REPRESENTATIVE,
      BuildingRole.CO_OWNER,
    ])
    .optional()
    .describe(
      'New building role for the user; omit to leave the role unchanged while updating other fields.',
    ),
  buildingSurfacePercentage: z.coerce
    .number()
    .min(0)
    .max(100)
    .optional()
    .describe(
      'User’s weighted share of the building surface, 0–100. Used to compute vote weight for consensus polls.',
    ),
  chatVisibleToCoOwners: z
    .boolean()
    .optional()
    .describe('Controls whether this user appears in chat directories visible to co-owners.'),
});

// Inferred types
export type CreateBuildingSchema = z.infer<typeof createBuildingSchema>;
export type UpdateBuildingSchema = z.infer<typeof updateBuildingSchema>;
export type JoinBuildingWithOtpSchema = z.infer<typeof joinBuildingWithOtpSchema>;
export type UpdateUserBuildingRoleSchema = z.infer<typeof updateUserBuildingRoleSchema>;
