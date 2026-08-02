import type { Permission } from '../enums/permission.enum';

/** Scope for permission resolution. */
export type PermissionScope = 'building' | 'organization' | 'platform';

/**
 * Unified response from GET /users/me/permissions.
 *
 * Keep in sync with `permissionsResponseSchema` (schemas/permissions.schema.ts),
 * which is the wire-validation twin of this interface.
 */
export interface PermissionsResponse {
  scope: PermissionScope;
  permissions: Permission[];
  roleType?: string;
  /**
   * Building scope only: the user's actual building_roles membership, when one
   * exists. `roleType` reports the PERMISSION source, which for dual-role users
   * (a co-owner who is also org staff / platform admin) is the broader admin
   * context — this field preserves their member identity so clients can route
   * them to the tree where they vote.
   */
  memberRoleType?: string;
  buildingId?: string;
  orgId?: string;
  chatVisibleToCoOwners?: boolean;
  /**
   * Building scope only: whether the user has an active (non-archived)
   * owners-ledger record in this building. Ownership is a ledger fact, not
   * a role — clients gate owner-visible UI on this, never on a role value.
   */
  isOwner?: boolean;
}
