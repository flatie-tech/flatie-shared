/**
 * Pagination query parameters
 */
export interface PaginationParams {
  offset?: number;
  limit?: number;
}

/**
 * Date range filter parameters
 */
export interface DateRangeParams {
  fromDate?: string;
  toDate?: string;
}

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Creates a paginated response from data
 */
export function createPaginatedResponse<T>(
  data: T[],
  count: number,
  offset: number,
  limit: number,
): PaginatedResponse<T> {
  const page = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(count / limit);

  return {
    data,
    count,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
