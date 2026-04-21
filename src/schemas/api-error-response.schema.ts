import { z } from 'zod';
import { BACKEND_ERROR_CODES } from '../errors';
import { apiErrorSchema } from './api-error.schema';

/**
 * Canonical error envelope returned by every 4xx/5xx response from the
 * Flatie backend.
 *
 * Extends the base `apiErrorSchema` (always-present `statusCode`, `message`,
 * `timestamp`, `path`) with the optional `code` field populated by
 * `AllExceptionsFilter` whenever a `DomainException` is thrown — carrying
 * the concrete `BACKEND_ERROR_CODES` value so consumers can discriminate
 * by code at the boundary.
 *
 * Referenced by the backend's `@ApiTypedErrorResponse` decorator so every
 * 4xx/5xx response in the OpenAPI spec resolves to this shape. Registered
 * as `ApiErrorResponse` in the backend's OpenAPI components.
 */
export const apiErrorResponseSchema = apiErrorSchema
  .extend({
    code: z
      .enum(Object.values(BACKEND_ERROR_CODES) as [string, ...string[]])
      .optional()
      .describe(
        'Canonical error code from `@flatie/shared/errors` (`BACKEND_ERROR_CODES`). ' +
          'Present when the backend raised a `DomainException`; absent for generic ' +
          'HTTP errors (network failures, unhandled exceptions, validation-pipe rejections).',
      ),
  })
  .describe(
    'Standard error envelope returned by the Flatie backend on 4xx and 5xx responses.',
  );

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;
