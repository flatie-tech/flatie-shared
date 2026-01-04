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
    data: z.array(itemSchema),
    count: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPreviousPage: z.boolean(),
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
