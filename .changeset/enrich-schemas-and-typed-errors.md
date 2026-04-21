---
'@flatie/shared': minor
---

Enrich public-API schemas with field-level descriptions; add `apiErrorResponseSchema` for typed 4xx/5xx envelopes.

**`.describe()` sweep across `src/schemas/{entities,responses,requests}/`.**
Per `docs/schema-conventions.md`, every non-trivial response / request field
now carries a one-sentence description. These propagate to the backend's
OpenAPI spec via `@asteasolutions/zod-to-openapi` and render as field-level
prose in Swagger and the themed Stoplight viewer. Trivial primitives (`id`,
`createdAt`, etc.) stay undescribed by convention. Schema shapes unchanged.

**New `apiErrorResponseSchema` / `ApiErrorResponse` type.** Extends the
existing `apiErrorSchema` with a typed optional `code` field drawn from
`BACKEND_ERROR_CODES`, matching the actual wire shape emitted by the
backend's `AllExceptionsFilter`. Registered as `ApiErrorResponse` in
the backend's OpenAPI components and referenced by the new
`@ApiTypedErrorResponse` decorator so every 4xx/5xx response in the
spec resolves to a consistent shape.

**New `tests/schemas/describe-coverage.test.ts`.** Walks every exported
response schema and asserts every non-trivial field has `.description`
set. CI enforces — the TRIVIAL_FIELD_NAMES skip list is the single source
of truth for what names count as self-evident.

Minor bump: pure additions + semantic metadata. No breaking changes.
