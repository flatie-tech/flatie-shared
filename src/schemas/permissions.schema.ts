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
  buildingId: z.string().uuid().optional(),
  orgId: z.string().uuid().optional(),
  chatVisibleToCoOwners: z.boolean().optional(),
});

export type PermissionsResponseSchema = z.infer<typeof permissionsResponseSchema>;
