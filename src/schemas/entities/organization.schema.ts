import { z } from 'zod';
import { OrgType } from '../../enums/org-type.enum';
import { OrgRole } from '../../enums/role.enum';
import { uuidSchema } from '../base.schema';

/**
 * Validation constants for organizations
 */
export const ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11,
} as const;

const orgRoleSchema = z.enum([
  OrgRole.ORG_ADMIN,
  OrgRole.SUPERVISOR,
  OrgRole.REFERENT,
  OrgRole.OPERATIVE,
]);

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

/**
 * Add existing user as an organization member
 */
export const addOrgMemberSchema = z.object({
  userId: uuidSchema,
  orgRole: orgRoleSchema,
});

/**
 * Update an existing organization member's role
 */
export const updateOrgMemberRoleSchema = z.object({
  orgRole: orgRoleSchema,
});

/**
 * Invite a user to an organization by email
 */
export const inviteOrgMemberSchema = z.object({
  email: z.string().email('Invalid email'),
  orgRole: orgRoleSchema,
  message: z.string().optional(),
});

/**
 * Assign a building to an organization with optional contract window
 */
export const assignOrgBuildingSchema = z.object({
  buildingId: uuidSchema,
  contractStart: z.string().optional(),
  contractEnd: z.string().optional(),
});

/**
 * Assign a member to a building within the organization
 */
export const assignOrgMemberBuildingSchema = z.object({
  buildingId: uuidSchema,
});

/**
 * Search users query schema (used when inviting org members)
 */
export const searchUsersQuerySchema = z.object({
  search: z.string().optional(),
});

/**
 * Paginated + sorted query for listing buildings assigned to an organization
 */
export const getOrgBuildingsQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'address', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * Paginated + sorted query for listing members of an organization
 */
export const getOrgMembersQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(['userName', 'orgRole', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Inferred types
export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
export type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>;
export type AddOrgMemberSchema = z.infer<typeof addOrgMemberSchema>;
export type UpdateOrgMemberRoleSchema = z.infer<typeof updateOrgMemberRoleSchema>;
export type InviteOrgMemberSchema = z.infer<typeof inviteOrgMemberSchema>;
export type AssignOrgBuildingSchema = z.infer<typeof assignOrgBuildingSchema>;
export type AssignOrgMemberBuildingSchema = z.infer<typeof assignOrgMemberBuildingSchema>;
export type SearchUsersQuerySchema = z.infer<typeof searchUsersQuerySchema>;
export type GetOrgBuildingsQuerySchema = z.infer<typeof getOrgBuildingsQuerySchema>;
export type GetOrgMembersQuerySchema = z.infer<typeof getOrgMembersQuerySchema>;
