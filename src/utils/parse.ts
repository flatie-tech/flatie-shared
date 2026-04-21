import type { z } from 'zod';

/**
 * Error thrown by `parseData` when a value fails schema validation.
 *
 * Carries the underlying `ZodError` on `cause` (per the ES2022 spec),
 * a stable `code` that matches the `BACKEND_ERROR_CODES` naming
 * convention so fetch interceptors / toasts can discriminate it the
 * same way they discriminate server-side codes, and the flat
 * `issues` array for quick inspection.
 */
export class ParseError extends Error {
  readonly code = 'RESPONSE_CONTRACT_DRIFT' as const;
  readonly issues: z.core.$ZodIssue[];

  constructor(message: string, zodError: z.ZodError) {
    super(message, { cause: zodError });
    this.name = 'ParseError';
    this.issues = zodError.issues;
  }
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
export const parseData = <T extends z.ZodType>(
  schema: T,
  data: unknown,
  errorMessage = 'Response failed schema validation',
): z.infer<T> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new ParseError(errorMessage, result.error);
  }
  return result.data;
};
