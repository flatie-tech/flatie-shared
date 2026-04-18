import { z } from 'zod';
import { OrgType } from '../../enums/org-type.enum';

/**
 * Validation constants for organizations
 */
export const ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11,
} as const;

/**
 * Create organization request schema
 */
export const createOrganizationSchema = z.object({
  name: z
    .string()
    .min(ORGANIZATION_LIMITS.NAME_MIN, 'Name is required')
    .max(
      ORGANIZATION_LIMITS.NAME_MAX,
      `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`,
    ),
  type: z.enum([OrgType.MANAGEMENT_FIRM, OrgType.PLATFORM]),
  oib: z
    .string()
    .max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`)
    .optional(),
  contactEmail: z.string().email('Invalid email').optional(),
  contactPhone: z.string().optional(),
});

/**
 * Update organization request schema (all fields optional)
 */
export const updateOrganizationSchema = z.object({
  name: z.string().min(ORGANIZATION_LIMITS.NAME_MIN).max(ORGANIZATION_LIMITS.NAME_MAX).optional(),
  contactEmail: z.string().email('Invalid email').optional(),
  contactPhone: z.string().optional(),
  oib: z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH).optional(),
});

// Inferred types
export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>;
