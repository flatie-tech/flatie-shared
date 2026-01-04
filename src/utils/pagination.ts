import { createPaginatedResponse, type PaginatedResponse } from '../types/pagination.types';

/**
 * Shape of various backend paginated responses
 * Different backends may use different field names
 */
type BackendPaginatedResponse<T> = {
  data?: T[];
  items?: T[];
  results?: T[];
  count?: number;
  total?: number;
  totalCount?: number;
  page?: number;
  currentPage?: number;
  limit?: number;
  pageSize?: number;
  perPage?: number;
  offset?: number;
};

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
export function normalizePaginatedResponse<T>(
  input: unknown,
  fallbackLimit = 10,
): PaginatedResponse<T> {
  // Handle plain array
  if (Array.isArray(input)) {
    return createPaginatedResponse(input as T[], input.length, 0, input.length);
  }

  // Handle object response
  if (input && typeof input === 'object') {
    const response = input as BackendPaginatedResponse<T>;

    // Extract items from various field names
    const data = response.data ?? response.items ?? response.results ?? [];

    // Extract limit from various field names
    const limit =
      response.limit ??
      response.pageSize ??
      response.perPage ??
      (Array.isArray(data) ? data.length : fallbackLimit);

    // Extract total from various field names
    const count =
      response.count ??
      response.total ??
      response.totalCount ??
      (Array.isArray(data) ? data.length : 0);

    // Calculate page from offset or use provided page
    const page =
      response.page ??
      response.currentPage ??
      (response.offset !== undefined && limit ? Math.floor(response.offset / limit) + 1 : 1);

    // Calculate offset from page or use provided offset
    const offset =
      response.offset !== undefined ? response.offset : limit && page ? (page - 1) * limit : 0;

    return createPaginatedResponse(Array.isArray(data) ? data : [], count, offset, limit);
  }

  return createPaginatedResponse([], 0, 0, fallbackLimit);
}

/**
 * Extract items from a paginated response, handling various formats
 *
 * @param response - The raw response
 * @param itemsKey - Optional specific key to look for items
 * @returns Array of items
 */
export function extractPaginatedItems<T>(response: unknown, itemsKey?: string): T[] {
  if (Array.isArray(response)) {
    return response as T[];
  }

  if (response && typeof response === 'object') {
    const obj = response as Record<string, unknown>;

    // Try specific key first
    if (itemsKey && Array.isArray(obj[itemsKey])) {
      return obj[itemsKey] as T[];
    }

    // Try common field names
    if (Array.isArray(obj.items)) return obj.items as T[];
    if (Array.isArray(obj.data)) return obj.data as T[];
    if (Array.isArray(obj.results)) return obj.results as T[];
  }

  return [];
}

/**
 * Calculate pagination metadata
 *
 * @param total - Total number of items
 * @param offset - Current offset
 * @param limit - Items per page
 */
export function calculatePaginationMeta(total: number, offset: number, limit: number) {
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  return {
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
}
