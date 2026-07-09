import { BuildingRole } from '../enums';
import { isManagerialRole } from './role-helpers';

/**
 * Minimal structural shape of a chat-target candidate.
 *
 * Deliberately loose so both web's `BuildingUserResponse` and mobile's
 * `BuildingUser` fit without adapters — callers with a legacy flat `role`
 * field normalize to `{ buildingRole: { roleType } }` before filtering.
 */
export interface MessageableUserShape {
  buildingRole?: {
    roleType?: string | null;
    chatVisibleToCoOwners?: boolean | null;
  } | null;
}

/**
 * Whether `caller` may open a direct conversation with `target` in a
 * BUILDING-scoped chat.
 *
 * Rules (mirrors the backend's `createDirectConversation` check):
 * - Managerial callers (owner/deputy representative) may message anyone.
 * - Everyone else may message representatives, plus co-owners who opted in
 *   via `chatVisibleToCoOwners`. A missing/undefined flag counts as opted out.
 *
 * `callerIsManagerial` is an input on purpose: every consumer must derive it
 * from the caller's DIRECT building role (`isManagerialRole(role)`), never
 * from org or platform roles — building chat is building-member-only.
 *
 * Org-scoped chat does NOT use this filter: any org member may message any
 * other org member.
 */
export function canMessageUser(callerIsManagerial: boolean, target: MessageableUserShape): boolean {
  if (callerIsManagerial) return true;
  const role = target.buildingRole?.roleType;
  if (!role) return false;
  if (isManagerialRole(role as BuildingRole)) return true;
  return role === BuildingRole.CO_OWNER && target.buildingRole?.chatVisibleToCoOwners === true;
}

/**
 * Filter a building-user list down to the users the caller may DM.
 *
 * @example
 * const eligible = getMessageableUsers(users, isManagerialRole(myBuildingRole));
 */
export function getMessageableUsers<T extends MessageableUserShape>(
  users: readonly T[],
  callerIsManagerial: boolean,
): T[] {
  return users.filter((user) => canMessageUser(callerIsManagerial, user));
}
