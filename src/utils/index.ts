/**
 * Shared Utility Functions
 *
 * Common utilities for use across frontend, mobile, and backend.
 */

// Chat DM eligibility (building-scoped; org chat has no visibility mechanic)
export type { MessageableUserShape } from './chat-eligibility';
export { canMessageUser, getMessageableUsers } from './chat-eligibility';
// Google Calendar "add event" template-URL builder
export type { GoogleCalendarEventInput } from './google-calendar';
export { buildGoogleCalendarUrl } from './google-calendar';
// Croatian house number normalization and address formatting
export type { AddressParts, ParsedHouseNumber } from './house-number';
export {
  formatAddress,
  isValidHouseNumber,
  normalizeHouseNumber,
  parseHouseNumber,
} from './house-number';
// Locale-aware date / currency formatting
export {
  DATE_FORMATS,
  DATETIME_FORMATS,
  formatCurrencyByLocale,
  formatDate as formatDateByLocale,
  formatDateTime,
  getDateLocale,
  LOCALE_MAP,
  TIME_FORMATS,
} from './locale';
// Pagination utilities
export {
  calculatePaginationMeta,
  extractPaginatedItems,
  normalizePaginatedResponse,
} from './pagination';
// Client-side schema validation for API responses
export { ParseError, parseData } from './parse';
// Error-shape parser — extract domain code + message from caught HTTP errors
export { type ParsedApiError, parseApiError } from './parse-error';
// Unified permission checker (isomorphic can() surface)
export type { PermissionChecker } from './permission-checker';
export { createPermissionChecker } from './permission-checker';
// Permission evaluator (pure, cross-package)
export type { ActionFlags, PermissionSubject } from './permission-evaluator';
export {
  canDo,
  canDoOnResource,
  computeActionFlags,
  getContextUserId,
} from './permission-evaluator';
// Permission utilities (deprecated — prefer createPermissionChecker)
export { hasAllPermissions, hasAnyPermission, hasPermission } from './permissions';
// Role helpers
export type { DisplayableRole, RoleBadgeColor } from './role-helpers';
export {
  getRoleBadge,
  isManagerialRole,
  MANAGERIAL_BUILDING_ROLES,
  ROLE_BADGE_COLORS,
  ROLE_DESCRIPTION_KEYS,
  ROLE_TRANSLATION_KEYS,
} from './role-helpers';
// Status variants (semantic design-system mappers)
export type { StatusVariant } from './status-variants';
export { failureStatusVariant, priorityVariant } from './status-variants';

/**
 * Format a snake_case or SCREAMING_SNAKE_CASE string to Title Case
 * @example formatText('CAN_EDIT_BUILDING') => 'Can Edit Building'
 */
export function formatText(text: string): string {
  return text
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param locale - The locale to use (default: 'en-EU')
 * @param currency - The currency code (default: 'EUR')
 */
export function formatCurrency(amount: number, locale = 'en-EU', currency = 'EUR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Get date range for common filter options
 * @param filter - The filter type
 * @returns Object with fromDate and toDate in 'yyyy-MM-dd' format
 */
export function getDateRange(filter: 'today' | 'yesterday' | 'week' | 'month'): {
  fromDate: string;
  toDate: string;
} {
  const today = new Date();
  const formatDate = (date: Date): string => date.toISOString().slice(0, 10);

  switch (filter) {
    case 'today':
      return {
        fromDate: formatDate(today),
        toDate: formatDate(today),
      };
    case 'yesterday': {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return {
        fromDate: formatDate(yesterday),
        toDate: formatDate(yesterday),
      };
    }
    case 'week': {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return {
        fromDate: formatDate(weekAgo),
        toDate: formatDate(today),
      };
    }
    case 'month': {
      const monthAgo = new Date(today);
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return {
        fromDate: formatDate(monthAgo),
        toDate: formatDate(today),
      };
    }
  }
}

/**
 * Debounce a value (for use in React effects)
 * @param value - The value to debounce
 * @param delay - Delay in milliseconds
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
