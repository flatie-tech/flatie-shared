import { z } from 'zod';

/**
 * Pagination query parameters schema
 */
export const paginationParamsSchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).max(100).optional().default(10),
});

/**
 * Generic paginated response schema factory
 * @param itemSchema - The schema for individual items in the response
 */
export const paginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema).describe('Items for the current page.'),
    count: z.number().describe('Total number of matching items across all pages.'),
    page: z.number().describe('1-based current page index.'),
    limit: z.number().describe('Page size (items per page, max 100).'),
    totalPages: z.number().describe('Total number of pages available for this query.'),
    hasNextPage: z.boolean().describe('True when another page follows the current one.'),
    hasPreviousPage: z.boolean().describe('True when a previous page exists.'),
  });

// Inferred types
export type PaginationParamsSchema = z.infer<typeof paginationParamsSchema>;

// Type helper for paginated response
export type PaginatedResponseSchema<T> = {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
