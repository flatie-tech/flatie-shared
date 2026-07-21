import { z } from 'zod';
import { BuildingRole, OrgRole, PlatformRole } from '../enums';

/** Zod schema for role types across all scopes. */
export const roleTypeSchema = z.enum([
  ...Object.values(BuildingRole),
  ...Object.values(OrgRole),
  ...Object.values(PlatformRole),
] as [string, ...string[]]);

/** Zod schema for the unified GET /users/me/permissions response. */
export const permissionsResponseSchema = z.object({
  scope: z.enum(['building', 'organization', 'platform']),
  permissions: z.array(z.string()),
  roleType: roleTypeSchema.optional(),
  /**
   * Building scope only: the user's actual building_roles membership, when one
   * exists. `roleType` reports the PERMISSION source, which for dual-role users
   * (a co-owner who is also org staff / platform admin) is the broader admin
   * context — this field preserves their member identity so clients can route
   * them to the tree where they vote.
   */
  memberRoleType: z.enum(Object.values(BuildingRole) as [string, ...string[]]).optional(),
  buildingId: z.string().uuid().optional(),
  orgId: z.string().uuid().optional(),
  chatVisibleToCoOwners: z.boolean().optional(),
});

export type PermissionsResponseSchema = z.infer<typeof permissionsResponseSchema>;
