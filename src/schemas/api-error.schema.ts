import { z } from 'zod';

/**
 * API error response envelope.
 *
 * The backend's global exception filter returns errors in this shape. Clients
 * should type their error handlers against `ApiError` to avoid drift.
 *
 * @example
 * { statusCode: 400, message: "Validation failed", timestamp: "2026-04-18T…", path: "/api/v1/notices" }
 */
export const apiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.union([z.string(), z.array(z.string())]),
  timestamp: z.string(),
  path: z.string(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
