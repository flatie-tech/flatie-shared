import { z } from 'zod';
import { OrgType } from '../../enums/org-type.enum';
import { OrgRole } from '../../enums/role.enum';
import { uuidSchema } from '../base.schema';
import { NOTICE_LIMITS } from './notice.schema';

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
    .enum(['name', 'address', 'createdAt', 'contractEnd'])
    .optional()
    .describe('Column to sort results by.'),
  sortOrder: z
    .enum(['asc', 'desc'])
    .optional()
    .describe('Sort direction: `asc` for ascending, `desc` for descending.'),
  expiringWithinDays: z.coerce
    .number()
    .int()
    .min(1)
    .max(365)
    .optional()
    .describe(
      'Only buildings whose management contract ends within this many days from now ' +
        '(and has not already ended). Omit to return all buildings.',
    ),
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

/**
 * Update the contract window on an existing org↔building assignment.
 */
export const updateOrgBuildingContractSchema = z.object({
  contractStart: z
    .string()
    .nullable()
    .optional()
    .describe('New contract start date (ISO-8601 `YYYY-MM-DD`); null clears it.'),
  contractEnd: z
    .string()
    .nullable()
    .optional()
    .describe('New contract end date (ISO-8601 `YYYY-MM-DD`); null clears it.'),
});

/**
 * Organization invitation lifecycle states. Stored as text (uppercase,
 * pre-existing data) — deliberately NOT a pg enum.
 */
export const OrgInvitationStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
} as const;
export type OrgInvitationStatus = (typeof OrgInvitationStatus)[keyof typeof OrgInvitationStatus];

/**
 * An invitation as seen by org managers. The accept token is NEVER exposed
 * here — it travels only inside the invitation email.
 */
export const orgInvitationResponseSchema = z.looseObject({
  id: uuidSchema.describe('Invitation id.'),
  email: z.string().describe('Invitee email address.'),
  orgRole: orgRoleSchema.describe('Role the invitee receives on accept.'),
  status: z
    .enum([OrgInvitationStatus.PENDING, OrgInvitationStatus.ACCEPTED])
    .describe('Lifecycle state; expired invitations stay PENDING but are past expiresAt.'),
  createdAt: z.string().describe('ISO-8601 timestamp the invitation was created.'),
  expiresAt: z
    .string()
    .nullable()
    .describe('ISO-8601 expiry; a PENDING invitation past this moment cannot be accepted.'),
  acceptedAt: z.string().nullable().optional().describe('ISO-8601 acceptance timestamp.'),
});

/**
 * The public (token-scoped) view of an invitation, shown on the accept page
 * before the user authenticates.
 */
export const publicOrgInvitationSchema = z.looseObject({
  orgName: z.string().describe('Name of the inviting organization.'),
  email: z.string().describe('Email address the invitation was issued to.'),
  orgRole: orgRoleSchema.describe('Role granted on accept.'),
  status: z
    .enum([OrgInvitationStatus.PENDING, OrgInvitationStatus.ACCEPTED])
    .describe('Lifecycle state of the invitation.'),
  expiresAt: z.string().nullable().describe('ISO-8601 expiry of the invitation.'),
  inviterName: z.string().nullable().describe('Display name of the inviting member, if known.'),
});

/**
 * Publish one notice to many (or all) buildings the organization manages.
 */
export const createOrgBroadcastSchema = z.object({
  title: z
    .string()
    .min(NOTICE_LIMITS.TITLE_MIN, 'Title is required')
    .max(NOTICE_LIMITS.TITLE_MAX)
    .describe('Notice title, shared by every created notice (same limits as a single notice).'),
  content: z
    .string()
    .min(1, 'Content is required')
    .max(NOTICE_LIMITS.CONTENT_MAX)
    .describe('Notice body, shared by every created notice.'),
  buildingIds: z
    .array(uuidSchema)
    .min(1)
    .max(200)
    .optional()
    .describe(
      'Target buildings; every id must belong to the organization. ' +
        'Omit to broadcast to ALL managed buildings.',
    ),
  allowComments: z
    .boolean()
    .optional()
    .describe('Whether residents may comment on the created notices. Defaults to true.'),
});

export const orgBroadcastResponseSchema = z.looseObject({
  id: uuidSchema.describe('Broadcast id grouping the created notices.'),
  title: z.string().describe('Broadcast (and notice) title.'),
  noticeCount: z.number().describe('Number of per-building notices created.'),
  createdAt: z.string().describe('ISO-8601 creation timestamp.'),
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
export type UpdateOrgBuildingContractSchema = z.infer<typeof updateOrgBuildingContractSchema>;
export type OrgInvitationResponse = z.infer<typeof orgInvitationResponseSchema>;
export type PublicOrgInvitation = z.infer<typeof publicOrgInvitationSchema>;
export type CreateOrgBroadcastSchema = z.infer<typeof createOrgBroadcastSchema>;
export type OrgBroadcastResponse = z.infer<typeof orgBroadcastResponseSchema>;
