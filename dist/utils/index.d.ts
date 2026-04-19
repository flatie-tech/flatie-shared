import { P as PaginatedResponse, a as PermissionContext } from '../permission-context-CtIXNz9a.js';
import { P as Permission, S as ScopedDomain, b as ScopedAction, B as BuildingRole, O as OrgRole, a as PlatformRole } from '../role.enum-ek-UhQVw.js';
import { F as FailureStatus, P as Priority } from '../status.enum-D4pAcU1b.js';

/**
 * Normalize various paginated response formats to a consistent structure
 *
 * @param input - The raw paginated response from the backend
 * @param fallbackLimit - Default limit if not provided in response
 * @returns Normalized PaginatedResponse
 *
 * @example
 * // Backend response with 'data' field
 * normalizePaginatedResponse({ data: [...], total: 100, page: 1 })
 *
 * // Backend response with 'items' field
 * normalizePaginatedResponse({ items: [...], totalCount: 100, offset: 0 })
 *
 * // Plain array response
 * normalizePaginatedResponse([...])
 */
declare function normalizePaginatedResponse<T>(input: unknown, fallbackLimit?: number): PaginatedResponse<T>;
/**
 * Extract items from a paginated response, handling various formats
 *
 * @param response - The raw response
 * @param itemsKey - Optional specific key to look for items
 * @returns Array of items
 */
declare function extractPaginatedItems<T>(response: unknown, itemsKey?: string): T[];
/**
 * Calculate pagination metadata
 *
 * @param total - Total number of items
 * @param offset - Current offset
 * @param limit - Items per page
 */
declare function calculatePaginationMeta(total: number, offset: number, limit: number): {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
};

interface ActionFlags {
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
}
/**
 * Check if a context has a specific permission. Admins always return true.
 *
 * Pure function — no logging, no side effects. Backend wraps this with a
 * NestJS-injectable that adds scope-mismatch warnings in dev.
 */
declare function canDo(ctx: PermissionContext, permission: Permission): boolean;
/**
 * Check if a context can perform an action on a specific resource,
 * resolving `:own` vs `:any` using the type-safe permission lookup.
 *
 * Checks `:any` first, then falls back to `:own` if the caller owns the resource.
 */
declare function canDoOnResource(ctx: PermissionContext, domain: ScopedDomain, action: ScopedAction, resourceOwnerId: string): boolean;
/**
 * Compute standard action flags for an entity.
 *
 * Uses `:own`/`:any` resolution for edit/delete; type-safe lookup for approve.
 * Clients can use this for optimistic UI gating (show/hide edit/delete buttons)
 * without a round-trip to `/users/me/permissions`.
 */
declare function computeActionFlags(ctx: PermissionContext, domain: ScopedDomain, resourceOwnerId: string): ActionFlags;
declare function isAdminContext(ctx: PermissionContext): boolean;
declare function getContextUserId(ctx: PermissionContext): string | null;

/**
 * Check if a user has a specific permission.
 */
declare function hasPermission(userPermissions: string[], permission: Permission): boolean;
/**
 * Check if a user has any of the specified permissions.
 */
declare function hasAnyPermission(userPermissions: string[], permissions: Permission[]): boolean;
/**
 * Check if a user has all of the specified permissions.
 */
declare function hasAllPermissions(userPermissions: string[], permissions: Permission[]): boolean;

/**
 * Building roles that grant admin-level access to building management.
 *
 * `CO_OWNER` is a regular building member (reads + own content); representatives
 * are managerial and own the building's full lifecycle.
 */
declare const MANAGERIAL_BUILDING_ROLES: readonly BuildingRole[];
/**
 * Check whether a building role has managerial authority.
 *
 * @example
 * isManagerialRole(BuildingRole.OWNER_REPRESENTATIVE) // true
 * isManagerialRole(BuildingRole.CO_OWNER)             // false
 */
declare function isManagerialRole(role: BuildingRole): boolean;
/**
 * Translation keys for every role value.
 *
 * Apps consume these with their own i18n layer (`t(ROLE_TRANSLATION_KEYS[role])`).
 * Keeping the keys here — not the localized strings — avoids duplicating a Record
 * in every app while leaving translation framework and locale up to each consumer.
 *
 * Each app must provide a matching `roles.<KEY>` translation for all locales it supports.
 */
declare const ROLE_TRANSLATION_KEYS: Record<BuildingRole | OrgRole | PlatformRole, string>;
/**
 * Description-variant translation keys for roles (typically for onboarding screens
 * or role-selection UIs where a sentence-length explanation accompanies the label).
 *
 * Same pattern as `ROLE_TRANSLATION_KEYS` — apps resolve via `t()`.
 */
declare const ROLE_DESCRIPTION_KEYS: Record<BuildingRole | OrgRole | PlatformRole, string>;

/**
 * Semantic variant names for a design system's status indicators.
 *
 * Apps map these to concrete colors/badges:
 * - `success`: green — resolved, completed, active-and-happy
 * - `warning`: yellow/amber — attention needed, in-progress
 * - `danger`: red — urgent, rejected, failed
 * - `info`: blue — informational, pending
 * - `neutral`: gray — inert, cancelled, default
 */
type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';
/**
 * Map a failure report status to a semantic variant.
 */
declare function failureStatusVariant(status: FailureStatus): StatusVariant;
/**
 * Map a priority value to a semantic variant.
 */
declare function priorityVariant(priority: Priority): StatusVariant;

/**
 * Shared Utility Functions
 *
 * Common utilities for use across frontend, mobile, and backend.
 */

/**
 * Format a snake_case or SCREAMING_SNAKE_CASE string to Title Case
 * @example formatText('CAN_EDIT_BUILDING') => 'Can Edit Building'
 */
declare function formatText(text: string): string;
/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param locale - The locale to use (default: 'en-EU')
 * @param currency - The currency code (default: 'EUR')
 */
declare function formatCurrency(amount: number, locale?: string, currency?: string): string;
/**
 * Get date range for common filter options
 * @param filter - The filter type
 * @returns Object with fromDate and toDate in 'yyyy-MM-dd' format
 */
declare function getDateRange(filter: 'today' | 'yesterday' | 'week' | 'month'): {
    fromDate: string;
    toDate: string;
};
/**
 * Debounce a value (for use in React effects)
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 */
declare function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(func: T, delay: number): (...args: Parameters<T>) => void;

export { type ActionFlags, MANAGERIAL_BUILDING_ROLES, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, type StatusVariant, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, debounce, extractPaginatedItems, failureStatusVariant, formatCurrency, formatText, getContextUserId, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isAdminContext, isManagerialRole, normalizePaginatedResponse, priorityVariant };
