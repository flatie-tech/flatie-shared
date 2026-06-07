import { P as PaginatedResponse } from '../pagination.types-BdLhL-Jg.js';
import { z } from 'zod';
import { BackendErrorCode } from '../errors/index.js';
import { P as Permission, S as ScopedDomain, a as ScopedAction, B as BuildingRole, O as OrgRole, b as PlatformRole } from '../role.enum-BTOXn9M9.js';
import { F as FailureStatus, P as Priority } from '../status.enum-BYlt7_Fs.js';

/**
 * Croatian house number normalization and parsing.
 *
 * Croatian house numbers follow patterns defined by Pravilnik NN 117/2022:
 * - Plain number: "42"
 * - Number + letter suffix (infill): "42A", "22B"
 * - Number/sub-number (multiple entrances): "16/1", "16/2"
 * - BB (bez broja — no assigned number, rural): "BB"
 */
/**
 * Normalize a raw house number input to its canonical form.
 * - Trims whitespace
 * - Uppercases
 * - Strips spaces between digits and letters ("42 A" → "42A")
 * - Strips spaces around slash ("16 / 1" → "16/1")
 * - "bb" → "BB"
 *
 * Returns null for empty/whitespace-only input or invalid values.
 */
declare function normalizeHouseNumber(raw: string): string | null;
/**
 * Check whether a raw house number string is valid after normalization.
 */
declare function isValidHouseNumber(raw: string): boolean;
interface ParsedHouseNumber {
    number: number;
    letter?: string;
    subNumber?: number;
}
/**
 * Parse a normalized house number into structured components for sorting.
 * Expects already-normalized input (uppercase, no spaces).
 *
 * "42"   → { number: 42 }
 * "42A"  → { number: 42, letter: "A" }
 * "16/1" → { number: 16, subNumber: 1 }
 * "BB"   → null
 */
declare function parseHouseNumber(normalized: string): ParsedHouseNumber | null;
interface AddressParts {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
}
/**
 * Format address components into the canonical Croatian display string.
 * "Ilica 42A, 10000 Zagreb"
 */
declare function formatAddress(parts: AddressParts): string;

/**
 * Locale utilities — shared across web, mobile, and backend so app-locale
 * codes (e.g. `'hr'`, `'en'`, `'de'` from i18n libraries) consistently map
 * to BCP-47 strings consumed by `Intl.*`.
 *
 * Pure functions only — no React, no next-intl, no platform globals. Web
 * wraps these in a hook (see flatie-frontend `useLocaleDateFormat`); mobile
 * and backend call them directly.
 */
/**
 * Maps short application-locale codes to the BCP-47 strings expected by
 * `Intl.DateTimeFormat` / `Intl.NumberFormat`. Add a key here when adding
 * a new app language.
 */
declare const LOCALE_MAP: Record<string, string>;
/**
 * Resolve a short app-locale code to a BCP-47 locale, falling back to
 * `en-US` when the code is unknown. Accepts `undefined` so callers can
 * pass an optional locale through without a separate guard.
 */
declare function getDateLocale(appLocale: string | undefined | null): string;
declare const DATE_FORMATS: {
    readonly SHORT: Intl.DateTimeFormatOptions;
    readonly MEDIUM: Intl.DateTimeFormatOptions;
    readonly LONG: Intl.DateTimeFormatOptions;
    readonly FULL: Intl.DateTimeFormatOptions;
    readonly MONTH_YEAR: Intl.DateTimeFormatOptions;
    readonly MONTH_SHORT: Intl.DateTimeFormatOptions;
    readonly WEEKDAY_DAY_MONTH: Intl.DateTimeFormatOptions;
};
declare const TIME_FORMATS: {
    readonly SHORT: Intl.DateTimeFormatOptions;
};
declare const DATETIME_FORMATS: {
    readonly SHORT: Intl.DateTimeFormatOptions;
    readonly FULL: Intl.DateTimeFormatOptions;
};
/**
 * Format a date using `Intl.DateTimeFormat`. `locale` accepts either a
 * short app code (`'hr'`) or an explicit BCP-47 string (`'hr-HR'`); the
 * function normalises via `getDateLocale`.
 */
declare function formatDate(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Format a date with date + time fields. Convenience wrapper used by
 * notification templates and chat timestamps.
 */
declare function formatDateTime(date: Date | string | number, locale: string, options?: Intl.DateTimeFormatOptions): string;
/**
 * Format a number as currency. `locale` accepts either a short app code
 * or an explicit BCP-47 string. Currency defaults to EUR — Flatie's
 * primary market is Croatia (€).
 */
declare function formatCurrencyByLocale(amount: number, locale: string, currency?: string): string;

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

/**
 * Error thrown by `parseData` when a value fails schema validation.
 *
 * Carries the underlying `ZodError` on `cause` (per the ES2022 spec),
 * a stable `code` that matches the `BACKEND_ERROR_CODES` naming
 * convention so fetch interceptors / toasts can discriminate it the
 * same way they discriminate server-side codes, and the flat
 * `issues` array for quick inspection.
 */
declare class ParseError extends Error {
    readonly code: "RESPONSE_CONTRACT_DRIFT";
    readonly issues: z.core.$ZodIssue[];
    constructor(message: string, zodError: z.ZodError);
}
/**
 * Validates `data` against a Zod schema and returns the inferred type.
 *
 * Throws `ParseError` on shape drift so contract mismatches surface as
 * loud, toast-able errors at the client boundary — instead of cascading
 * `undefined` access downstream.
 *
 * Designed for response-parsing on the client (mobile, web). Server code
 * should use schema `.parse()` directly.
 */
declare const parseData: <T extends z.ZodType>(schema: T, data: unknown, errorMessage?: string) => z.infer<T>;

/**
 * Parsed shape of an API error.
 *
 * - `code`:   A validated {@link BackendErrorCode} when the backend returned
 *             a `code` field on the error response and it matches a known
 *             domain code. `null` otherwise (legacy endpoint, network error,
 *             unknown code string, etc.).
 * - `message`: A human-readable fallback message. Prefers the backend's
 *             `response.data.message`, then the JS `Error.message`, and
 *             finally a generic `'Unknown error'` string.
 * - `status`:  The HTTP status code if the error originated from an Axios
 *             response; `null` otherwise.
 */
interface ParsedApiError {
    code: BackendErrorCode | null;
    message: string;
    status: number | null;
}
/**
 * Extract a domain error code and message from an arbitrary caught error.
 *
 * Designed for use in `catch` blocks around API calls. Never throws — on
 * completely unrecognizable input it returns
 * `{ code: null, message: 'Unknown error', status: null }`.
 *
 * Pure function; no axios coupling. Walks `error.response.data.{code,message}`
 * which matches the shape every Flatie HTTP client (axios on web/mobile,
 * fetch wrappers on the server) produces.
 *
 * @example
 * try {
 *   await apiClient.post('/buildings/123/join-requests', payload);
 * } catch (err) {
 *   const { code, message } = parseApiError(err);
 *   if (code === BACKEND_ERROR_CODES.USER_ALREADY_MEMBER) {
 *     setStatus('already_member');
 *   } else {
 *     toast.error(message);
 *   }
 * }
 */
declare const parseApiError: (error: unknown) => ParsedApiError;

/**
 * Minimal shape needed to evaluate permissions: the caller's id plus their
 * resolved permission list. The full {@link PermissionContext} discriminated
 * union (backend) satisfies this, but clients can also pass a plain
 * `{ userId, permissions }` built from the `/users/me/permissions` response
 * without fabricating the rest of the union. This is what lets a single
 * evaluator back both the server guards and the client `can()` checker.
 */
interface PermissionSubject {
    userId: string;
    permissions: Permission[];
}
interface ActionFlags {
    canEdit: boolean;
    canDelete: boolean;
    canApprove: boolean;
}
declare function canDo(subject: PermissionSubject, permission: Permission): boolean;
declare function canDoOnResource(subject: PermissionSubject, domain: ScopedDomain, action: ScopedAction, resourceOwnerId: string): boolean;
/**
 * Compute standard action flags for an entity.
 *
 * Uses `:own`/`:any` resolution for edit/delete; type-safe lookup for approve.
 * Clients can use this for optimistic UI gating (show/hide edit/delete buttons)
 * without a round-trip to `/users/me/permissions`.
 */
declare function computeActionFlags(subject: PermissionSubject, domain: ScopedDomain, resourceOwnerId: string): ActionFlags;
declare function getContextUserId(subject: PermissionSubject): string;

/**
 * The unified, isomorphic permission check surface — Flatie's analogue of
 * Clerk's `has()`. Built once over {@link PermissionSubject} so the same five
 * methods work identically on the backend (pass a `PermissionContext`) and on
 * the clients (pass a `{ userId, permissions }` derived from the session or the
 * `/users/me/permissions` response).
 *
 * Pass `null` when the subject is unknown/unresolved (loading, error, preview
 * mode) — every check then returns the safe `false`.
 *
 * @example
 *   const checker = createPermissionChecker({ userId, permissions });
 *   checker.can(Permission.NOTICE_CREATE);
 *   checker.canOnResource('notice', 'update', notice.authorId);
 */
interface PermissionChecker {
    /** True if the subject holds `permission`. */
    can: (permission: Permission) => boolean;
    /** True if the subject holds at least one of `permissions`. */
    canAny: (permissions: Permission[]) => boolean;
    /** True if the subject holds every one of `permissions`. */
    canAll: (permissions: Permission[]) => boolean;
    /**
     * `:own`/`:any` resolution for a scoped domain. Grants when the subject has
     * the `:any` permission, or the `:own` permission and owns the resource.
     */
    canOnResource: (domain: ScopedDomain, action: ScopedAction, resourceOwnerId?: string) => boolean;
    /** Standard edit/delete/approve flags for a scoped-domain entity. */
    actionFlags: (domain: ScopedDomain, resourceOwnerId?: string) => ActionFlags;
}
declare function createPermissionChecker(subject: PermissionSubject | null): PermissionChecker;

/**
 * @deprecated Use `createPermissionChecker(subject).can(permission)` from
 * `./permission-checker`. These raw `string[]` helpers predate the unified
 * `PermissionChecker` and are kept only so existing call-sites keep compiling
 * during migration; they will be removed in a future minor.
 */
declare function hasPermission(userPermissions: string[], permission: Permission): boolean;
/**
 * @deprecated Use `createPermissionChecker(subject).canAny(permissions)` from
 * `./permission-checker`.
 */
declare function hasAnyPermission(userPermissions: string[], permissions: Permission[]): boolean;
/**
 * @deprecated Use `createPermissionChecker(subject).canAll(permissions)` from
 * `./permission-checker`.
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

export { type ActionFlags, type AddressParts, DATETIME_FORMATS, DATE_FORMATS, LOCALE_MAP, MANAGERIAL_BUILDING_ROLES, ParseError, type ParsedApiError, type ParsedHouseNumber, type PermissionChecker, type PermissionSubject, ROLE_DESCRIPTION_KEYS, ROLE_TRANSLATION_KEYS, type StatusVariant, TIME_FORMATS, calculatePaginationMeta, canDo, canDoOnResource, computeActionFlags, createPermissionChecker, debounce, extractPaginatedItems, failureStatusVariant, formatAddress, formatCurrency, formatCurrencyByLocale, formatDate as formatDateByLocale, formatDateTime, formatText, getContextUserId, getDateLocale, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, isManagerialRole, isValidHouseNumber, normalizeHouseNumber, normalizePaginatedResponse, parseApiError, parseData, parseHouseNumber, priorityVariant };
