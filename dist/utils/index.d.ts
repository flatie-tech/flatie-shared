import { P as PaginatedResponse } from '../pagination.types-CKR9lS7u.js';
import { P as Permission } from '../permission.enum-CIZ7gCeI.js';

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

export { calculatePaginationMeta, debounce, extractPaginatedItems, formatCurrency, formatText, getDateRange, hasAllPermissions, hasAnyPermission, hasPermission, normalizePaginatedResponse };
