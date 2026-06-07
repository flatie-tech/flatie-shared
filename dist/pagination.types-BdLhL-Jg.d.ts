/**
 * Pagination query parameters
 */
interface PaginationParams {
    offset?: number;
    limit?: number;
}
/**
 * Date range filter parameters
 */
interface DateRangeParams {
    fromDate?: string;
    toDate?: string;
}
/**
 * Cursor-based paginated response (used by chat and other infinite-scroll endpoints)
 */
interface CursorPaginatedResponse<T> {
    data: T[];
    nextCursor?: string | null;
    hasMore?: boolean;
}
/**
 * Paginated response wrapper
 */
interface PaginatedResponse<T> {
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
declare function createPaginatedResponse<T>(data: T[], count: number, offset: number, limit: number): PaginatedResponse<T>;

export { type CursorPaginatedResponse as C, type DateRangeParams as D, type PaginatedResponse as P, type PaginationParams as a, createPaginatedResponse as c };
