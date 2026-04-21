---
'@flatie/shared': minor
---

Add `parseData` + `ParseError` runtime helpers.

Moves the response-validation helper that's been copy-pasted between
`flatie-frontend` and `flatie-mobile` into the shared package so both
clients drop in the same loud-on-drift behavior without maintaining
duplicate ~15-line shims.

- `parseData(schema, data, message?)` — runs `schema.safeParse`, returns
  `data` on success, throws `ParseError` on failure.
- `ParseError extends Error` — carries the `ZodError` on `cause`, a
  stable `code: 'RESPONSE_CONTRACT_DRIFT'` for fetch-interceptor and
  toast discrimination (matches the `BACKEND_ERROR_CODES` convention),
  and a flat `issues: ZodIssue[]` field for per-field error rendering.

Exported from the main package barrel.
