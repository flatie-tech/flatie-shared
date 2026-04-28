# Conventions

> **🟢 Authoritative source for `@flatie/shared` package conventions** (naming, exports, error codes, response-schema pattern, `looseObject` vs `object`, what belongs in shared, API_ROUTES contract, versioning, tests). Backend / frontend / mobile docs link here for shared-package rules — don't duplicate.

Rules for contributing to `@flatie/shared`. Read before adding new code.

## Naming

| Kind | Convention | Example |
|------|-----------|---------|
| File names | kebab-case | `query-keys.ts`, `failure-report.schema.ts` |
| Zod schemas | `xSchema` suffix | `oibSchema`, `permissionFieldsSchema` |
| Types | inferred via `z.infer<>` (no `Type` suffix) | `export type User = z.infer<typeof userSchema>` |
| Enums | const object + `as const` (not TS `enum`) | `export const Role = { USER: 'USER' } as const` |
| Status schemas | `xStatusSchema` + colocated `xStatusOptions` array | `FailureStatusSchema`, `FailureStatusOptions` |

Why const-object enums: TypeScript `enum` uses nominal typing that breaks across the package boundary (an `enum Role` in the shared bundle is a different type than one imported by a consumer). Const objects use structural typing and survive the bundler.

## Zod: `object` vs `looseObject`

Default to `z.object()` (strict). Use `z.looseObject()` only when extra fields must pass through at runtime.

| Layer | Schema style | Reason |
|-------|-------------|--------|
| Request bodies | `z.object()` | Reject unknown fields — signals client bugs early. |
| Response schemas, nested references | `z.looseObject()` | Frontend transformers (e.g. `transformFiles`, `transformEvents`) add fields before parsing. Loose parse preserves them. Backend may also add fields (permission bits, joined relations) without breaking clients. |
| Entity base schemas | `z.looseObject()` | Entities are extensible by design. Composed schemas inherit from `baseEntitySchema`. |
| Form / validation schemas | `z.object()` | Strict. Reject unknown keys. |

When in doubt: pick `z.object()`. Only loosen if a real caller needs to pass through extra fields.

## Subpath exports

Every new module needs three touches:

1. Add `src/<module>/index.ts` as the barrel.
2. Declare an export in `package.json` under `"exports"`:
   ```json
   "./<module>": {
     "import": { "types": "./dist/<module>/index.d.ts", "default": "./dist/<module>/index.js" },
     "require": { "types": "./dist/<module>/index.d.cts", "default": "./dist/<module>/index.cjs" }
   }
   ```
3. Add the entry point to `tsup.config.ts`.

**Consumer note:** The backend's `tsconfig.json` uses `moduleResolution: "node"` which does not resolve package `exports` subpaths. Backend imports must use the main entry (`import { foo } from '@flatie/shared'`), not subpaths. Frontend (`moduleResolution: "bundler"`) is fine with subpaths.

## What belongs in shared

Add to shared when a type or value is shared by **two or more** of: backend, frontend, mobile. Do not pre-hoist things "in case we need them later" — wait for the second consumer.

| Add to shared | Keep local |
|--------------|-----------|
| Request schemas used by backend validator + frontend form | Frontend-only form helpers (UI-layer concerns) |
| Response schemas used for OpenAPI docs + frontend parsing | Intermediate transformer types (frontend-only) |
| Enums returned by API | UI-only enums (e.g. theme/variant) |
| Validation rules (OIB, phone) that must match on client and server | Platform-specific regex (e.g. iOS-only) |
| `API_ROUTES` constants | Backend controller decorator strings (must match but can't be shared) |
| Error codes returned in API responses | Toast/UX error messages |

## Response schema pattern (Phase 3+)

For each resource with response-schema sharing:

1. Place in `src/schemas/responses/<resource>.ts`.
2. Build the entity with `z.looseObject()` and the paginated wrapper with `paginatedResponseSchema(entity)` from `pagination.schema.ts`.
3. Use `z.looseObject()` for nested reference schemas (e.g. files, events) — frontend transformers add fields.
4. Export both `xResponseSchema` and `paginatedXResponseSchema`, plus the inferred types.
5. Register in `src/schemas/responses/index.ts` barrel.
6. Backend: register in `src/shared/openapi/response-schemas.ts` with `openApiRegistry.register('XResponse', xResponseSchema)`. Update `.docs.ts` to `schema: { $ref: '#/components/schemas/XResponse' }`.
7. Frontend: import the schema for `parseData(…)`. Define a **local** type that overrides nested `files`/`events` with the richer transformed types (`DocumentResponse[]`, `IEvent[]`) and cast the return. See `src/lib/api/failure-reports/getFailureReports.ts` for the pattern.

## Error codes & `DomainException`

`BACKEND_ERROR_CODES` (in `src/errors/`) is the single source of truth for machine-readable API error codes. Adding a code is the *first* step; emitting and consuming it follows.

**Adding a code:**
1. Add the entry to `BACKEND_ERROR_CODES` in `src/errors/index.ts`. Key === value, SCREAMING_SNAKE_CASE.
2. Add a quick assertion in `tests/errors/errors.test.ts` confirming the new code is present (the "values match keys" test catches typos automatically; explicit assertions catch deletion).
3. Bump the shared patch version, build, push.

**Backend emission (Phase 3 pattern):**
```ts
import { DomainException } from '@shared/exceptions';
import { BACKEND_ERROR_CODES } from '@flatie/shared';
import { HttpStatus } from '@nestjs/common';

throw new DomainException(
  'Apartment not found',
  HttpStatus.NOT_FOUND,
  BACKEND_ERROR_CODES.APARTMENT_NOT_FOUND,
);
```

`AllExceptionsFilter` automatically lifts `DomainException.code` into the JSON body (`{ statusCode, message, code, timestamp, path }`). Plain `NotFoundException` / `BadRequestException` / `ForbiddenException` etc. continue to work — they just don't emit a `code` field. Migration is per-domain and additive.

**Frontend consumption:**
```ts
import { parseApiError } from '@/lib/api';
import { BACKEND_ERROR_CODES } from '@flatie/shared';

try { ... } catch (error) {
  const { code, message } = parseApiError(error);
  if (code === BACKEND_ERROR_CODES.USER_ALREADY_MEMBER) { ... }
  // Keep the old message-string fallback during the rollout — codes
  // are null until the relevant backend domain has been migrated.
}
```

**Catch-block gotcha:** `DomainException` extends `HttpException` directly, **not** `BadRequestException` / `NotFoundException` / `ForbiddenException`. Code like:
```ts
catch (error) {
  if (error instanceof BadRequestException ||
      error instanceof NotFoundException ||
      error instanceof ForbiddenException) {
    throw error; // re-throw so the filter sees the right status
  }
  throw new InternalServerErrorException(...);
}
```
will silently swallow `DomainException` into a 500. Use `instanceof HttpException` instead. Audit existing services for this pattern before migrating them to `DomainException`.

**Assertion style in tests.** Services and guards that throw `DomainException` (or the `ForbiddenDomainException` / `BadRequestDomainException` / `UnauthorizedDomainException` subclasses) are asserted via `rejects.toMatchObject({ code: BACKEND_ERROR_CODES.X })`. Bare NestJS exceptions (only acceptable where the framework boundary cannot know the domain) assert via `toBeInstanceOf(HttpException)` plus a status-code check.

## API_ROUTES contract

`API_ROUTES` (in `src/urls/`) is the single source of truth for backend HTTP paths. The frontend imports it; the backend's controller decorators (`@Controller`, `@Get`, etc.) are the runtime truth. They must agree.

A vitest in the backend (`src/shared/openapi/routes-contract.spec.ts`) walks both sides and fails CI when a path in `API_ROUTES` doesn't resolve to a backend route. Run it before adding or renaming a route:

```bash
pnpm test src/shared/openapi/routes-contract
```

When you add a new endpoint:
1. Add the entry to `src/urls/index.ts` (string or function — function arity equals the number of `:p` params).
2. Add the matching `@Controller` + `@Get/@Post/...` on the backend.
3. Run the contract test — it must stay at zero drift.

If a frontend feature depends on a backend route that doesn't exist yet, **don't bypass the test** by hardcoding the URL in the consumer. Either add the backend endpoint or list the path in the `KNOWN_DRIFT` array (in `routes-contract.spec.ts`) with a comment explaining the gap. Drift entries are real bugs being tracked — keep the list short.

### When to use `KNOWN_DRIFT`

Add an entry only when the frontend has to ship a path before the backend route exists (rare — usually a mobile or feature-flagged rollout). Each entry must include a GitHub issue link or PR reference in a comment, and be removed within one sprint. An entry without a reference is a bug; a stale entry is tech debt. The list lives in `flatie-backend/src/shared/openapi/routes-contract.spec.ts`; the current target is `[]`.

## Versioning

- Bump the patch version for non-breaking additions (new exports, new enum values).
- Bump minor for new subpath exports.
- Bump major for renames, removals, schema shape changes that break parse.
- After bumping: commit, tag (`git tag v0.X.Y`), push branch + tag, update consumers' `package.json` references.

## Tests

- Unit tests live in `tests/<module>/*.test.ts`, mirroring `src/`.
- Every new schema needs a happy-path + one rejection case. Aim for ~5 cases per non-trivial schema (see `tests/validation/validation.test.ts` for the OIB pattern).
- Target: `pnpm test` stays green before every commit.

## Avoid

- `pnpm link` — breaks Turbopack; writes a persistent workspace file. Use `file:../flatie-shared` in consumer `package.json` instead.
- Premature shared ref schemas — resist extracting until three response files need the same nested shape. Inline duplication is cheaper than the wrong abstraction.
- Adding backend-only or frontend-only code. If it can't be used by two consumers, it doesn't belong here.
