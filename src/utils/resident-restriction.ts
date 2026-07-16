/**
 * Resident-view restriction over action-flagged items.
 *
 * Both clients render the same building sections in two modes: a management
 * view (representatives / org members with full flags) and a restricted view
 * — web's "resident view" toggle and mobile's non-management view. In the
 * restricted mode a user may only act on records they created, regardless of
 * what the server-computed flags would otherwise allow, and approval actions
 * are hidden entirely.
 *
 * These helpers centralise that rule as a pure map over items carrying the
 * shared permission flags ({@link PermissionFields} `canEdit`/`canDelete`,
 * plus `isOwner` and optionally `canApprove` from {@link ActionFlags}):
 *
 * - `isRestrictedView === false` → passthrough, flags unchanged.
 * - `isRestrictedView === true`  → `canEdit`/`canDelete` are additionally
 *   gated on `isOwner`; `canApprove` (when present) is forced to `false`.
 */

/**
 * Minimal flag shape the restriction operates on. Server response schemas
 * (`eventResponseSchema`, `noticeResponseSchema`, …) and the client-side
 * {@link ActionFlags} both satisfy it; `canApprove` is optional so items
 * without an approval concept pass through untouched.
 */
export interface RestrictableActionFlags {
  canEdit: boolean;
  canDelete: boolean;
  canApprove?: boolean;
  isOwner: boolean;
}

/**
 * Apply the resident-view restriction to a single item.
 *
 * Returns the item unchanged (same reference) when `isRestrictedView` is
 * false; otherwise returns a shallow copy with the flags narrowed.
 */
export function applyResidentRestrictionToItem<T extends RestrictableActionFlags>(
  item: T,
  isRestrictedView: boolean,
): T {
  if (!isRestrictedView) return item;
  return {
    ...item,
    canEdit: item.canEdit && item.isOwner,
    canDelete: item.canDelete && item.isOwner,
    ...(item.canApprove !== undefined && { canApprove: false }),
  };
}

/**
 * Apply the resident-view restriction to a list of items.
 *
 * Returns the array unchanged (same reference) when `isRestrictedView` is
 * false; otherwise returns a new array of shallow-copied items with the
 * flags narrowed.
 */
export function applyResidentRestriction<T extends RestrictableActionFlags>(
  items: T[],
  isRestrictedView: boolean,
): T[] {
  if (!isRestrictedView) return items;
  return items.map((item) => applyResidentRestrictionToItem(item, true));
}
