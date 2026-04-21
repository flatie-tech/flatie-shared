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

const orgRoleSchema = z
  .enum([OrgRole.ORG_ADMIN, OrgRole.SUPERVISOR, OrgRole.REFERENT, OrgRole.OPERATIVE])
  .describe(
    'Organization role, from highest to lowest authority: `ORG_ADMIN` (manages the org), `SUPERVISOR` (oversees operations), `REFERENT` (day-to-day member interactions), `OPERATIVE` (field work).',
  );

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
    )
    .describe('Legal or display name of the organization, 1–200 chars.'),
  type: z
    .enum([OrgType.MANAGEMENT_FIRM, OrgType.PLATFORM])
    .describe(
      '`MANAGEMENT_FIRM` for external building-management firms, `PLATFORM` for the Flatie platform organization itself.',
    ),
  oib: z
    .string()
    .max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`)
    .optional()
    .describe(
      'Croatian OIB (tax identification number), 11 digits. Required for firms but optional at creation.',
    ),
  contactEmail: z
    .string()
    .email('Invalid email')
    .optional()
    .describe('Public contact email for the organization.'),
  contactPhone: z.string().optional().describe('Public contact phone number.'),
});

/**
 * Update organization request schema (all fields optional)
 */
export const updateOrganizationSchema = z.object({
  name: z
    .string()
    .min(ORGANIZATION_LIMITS.NAME_MIN)
    .max(ORGANIZATION_LIMITS.NAME_MAX)
    .optional()
    .describe('Revised organization name, 1–200 chars.'),
  contactEmail: z.string().email('Invalid email').optional().describe('Revised contact email.'),
  contactPhone: z.string().optional().describe('Revised contact phone number.'),
  oib: z
    .string()
    .max(ORGANIZATION_LIMITS.OIB_LENGTH)
    .optional()
    .describe('Revised Croatian OIB (tax identification number), 11 digits.'),
});

/**
 * Add existing user as an organization member
 */
export const addOrgMemberSchema = z.object({
  userId: uuidSchema.describe('UUID of the existing user to add to the organization.'),
  orgRole: orgRoleSchema.describe('Organization role to assign to the new member.'),
});

/**
 * Update an existing organization member's role
 */
export const updateOrgMemberRoleSchema = z.object({
  orgRole: orgRoleSchema.describe('New organization role for the member.'),
});

/**
 * Invite a user to an organization by email
 */
export const inviteOrgMemberSchema = z.object({
  email: z
    .string()
    .email('Invalid email')
    .describe('Email address of the invitee; a signup/join link is sent here.'),
  orgRole: orgRoleSchema.describe('Organization role the invitee will receive when they accept.'),
  message: z
    .string()
    .optional()
    .describe('Optional custom message included in the invitation email.'),
});

/**
 * Assign a building to an organization with optional contract window
 */
export const assignOrgBuildingSchema = z.object({
  buildingId: uuidSchema.describe('UUID of the building to assign to this organization.'),
  contractStart: z
    .string()
    .optional()
    .describe('Contract start date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts.'),
  contractEnd: z
    .string()
    .optional()
    .describe('Contract end date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts.'),
});

/**
 * Assign a member to a building within the organization
 */
export const assignOrgMemberBuildingSchema = z.object({
  buildingId: uuidSchema.describe('UUID of the building the member should be assigned to work on.'),
});

/**
 * Search users query schema (used when inviting org members)
 */
export const searchUsersQuerySchema = z.object({
  search: z
    .string()
    .optional()
    .describe('Substring to match against user name or email. Omit to return unfiltered results.'),
});

/**
 * Paginated + sorted query for listing buildings assigned to an organization
 */
export const getOrgBuildingsQuerySchema = z.object({
  offset: z.coerce
    .number()
    .min(0)
    .optional()
    .default(0)
    .describe('Zero-based offset into the result set. Defaults to 0.'),
  limit: z.coerce
    .number()
    .min(1)
    .optional()
    .default(10)
    .describe('Maximum number of items to return per page. Defaults to 10.'),
  search: z.string().optional().describe('Substring matched against building name or address.'),
  sortBy: z
    .enum(['name', 'address', 'createdAt'])
    .optional()
    .describe('Column to sort results by.'),
  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .describe('Sort direction: `asc` for ascending, `desc` for descending.'),
});

/**
 * Paginated + sorted query for listing members of an organization
 */
export const getOrgMembersQuerySchema = z.object({
  offset: z.coerce
    .number()
    .min(0)
    .optional()
    .default(0)
    .describe('Zero-based offset into the result set. Defaults to 0.'),
  limit: z.coerce
    .number()
    .min(1)
    .optional()
    .default(10)
    .describe('Maximum number of items to return per page. Defaults to 10.'),
  search: z.string().optional().describe('Substring matched against member name or email.'),
  sortBy: z
    .enum(['userName', 'orgRole', 'createdAt'])
    .optional()
    .describe('Column to sort results by.'),
  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .describe('Sort direction: `asc` for ascending, `desc` for descending.'),
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
