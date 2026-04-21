# @flatie/shared

## 0.22.0

### Minor Changes

- 5f3c20a: Enrich public-API schemas with field-level descriptions; add `apiErrorResponseSchema` for typed 4xx/5xx envelopes.

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

## 0.21.0

### Minor Changes

- fd8949e: Add `UuidString` branded type + helpers, and cross-schema discriminated-union tests.

  **New in `@flatie/shared/validation`:**

  - `UuidString` — a branded `string` that TypeScript distinguishes from plain strings. Opt-in; existing signatures that accept `string` continue to work.
  - `toUuid(s)` — validates and casts, throws on invalid input. For boundary checks.
  - `isUuid(s)` — type guard for narrowing in conditionals.
  - `unsafeUuid(s)` — cast without validation. Trust-the-caller escape hatch (constants, test fixtures).
  - `uuidStringSchema` — Zod schema that parses into `UuidString`.

  **New cross-schema tests** (`tests/schemas/notification-cross-type.test.ts`):

  - For representative `NotificationType` values, the per-type data schema enforces required fields and rejects payloads shaped for a different type. Complements the exhaustiveness test by proving schemas aren't accidentally loose.
  - Captures the intentional schema-sharing for `FAILURE_REPORT_STATUS_CHANGED` / `FAILURE_REPORT_RESOLVED` so a future divergence is caught at PR time.

  Minor bump (new exports); non-breaking.

## 0.20.3

### Patch Changes

- c9b8a3b: Add versioning policy doc and three regression guards:

  - `docs/versioning.md` — when to bump patch vs minor vs major; how to coordinate
    consumer bumps; forward-only rollback policy.
  - `tests/schemas/notification-exhaustiveness.test.ts` — asserts every
    `NotificationType` maps to a live Zod schema via `getNotificationDataSchema`.
    Catches silent drift when a new notification type is added.
  - `tests/enums/permission-shape.test.ts` — asserts every `Permission` value
    matches the canonical `domain:action[:own|any]` format and that keys/values
    are unique. Catches typos that would otherwise surface as "access denied".
  - `.github/workflows/pr-check.yml` — runs lint/type-check/test/build on every
    PR and fails if `dist/` is out of sync with `src/`. Prevents the "consumer
    pins a tag where dist/ doesn't match src/" failure mode.

## 0.20.2

### Patch Changes

- a84ccc8: Add `messageResponseSchema` (`{ message: string }`) for bare-action endpoints.

  Backend controllers across notices, polls, failure-reports, maintenance-logs,
  events, garages, storage-units, apartments, transaction-categories, and
  income-transactions all return `{ message: string }` from their approve /
  archive / restore / permanent-delete / decline endpoints. Previously these
  were modeled ad-hoc on each consumer (frontend used lenient `z.looseObject({})`
  as a placeholder). Exposing the canonical schema lets consumers strict-parse
  and surfaces drift at the edges instead of laundering it through a catch-all.

  Non-breaking additive change.

## 0.20.1

### Patch Changes

- ce87422: Remove 7 stale hand-rolled `UpdateXRequest` interfaces from `src/types/*.types.ts`:

  - `UpdateTransactionRequest`, `UpdateFundRequest`, `UpdateRecurringTemplateRequest` (`src/types/financial.types.ts`)
  - `UpdateNoticeRequest` (`src/types/notice.types.ts`)
  - `UpdateFailureReportRequest` (`src/types/failure-report.types.ts`)
  - `UpdateEventRequest` (`src/types/event.types.ts`)
  - `UpdateMaintenanceLogRequest` (`src/types/maintenance-log.types.ts`)

  These were superseded by the `*RequestPayload` types / entity-level `updateXSchema` shipped in `src/schemas/requests/` and `src/schemas/entities/` in v0.20.0. Zero consumers across `flatie-backend`, `flatie-frontend`, and `flatie-mobile` (verified via grep on 2026-04-20).

## 0.20.0

### Minor Changes

- eea2dc9: Add `src/schemas/requests/` with canonical PATCH request schemas — `updateNoticeRequestSchema`, `updateFailureReportRequestSchema`, `updateMaintenanceLogRequestSchema`, `updatePollRequestSchema` — plus their inferred payload types (`UpdateNoticeRequestPayload`, `UpdateFailureReportRequestPayload`, `UpdateMaintenanceLogRequestPayload`, `UpdatePollRequestPayload`). Each schema composes the existing entity-level body schema (all fields optional, PATCH semantics) with a required `id` so consumers get a single shape covering "id from URL + optional body fields" in one place.

  Body shapes are not duplicated: the new request schemas are `.extend({ id: uuidSchema })` on top of the entity-level schemas (e.g. `updateNoticeSchema`), so request and body stay in lockstep. For `updateFailureReportRequestSchema`, Zod's `.extend()` on a `superRefine`'d object preserves the `refineLocation` cross-field rule.

  The payload types use a `*RequestPayload` suffix (rather than `*Request`) because the shared package already exposes hand-rolled legacy `UpdateNoticeRequest` / `UpdateFailureReportRequest` / `UpdateMaintenanceLogRequest` interfaces in `src/types/*.types.ts`. The Zod-inferred payload types here are the contract-of-truth going forward; the legacy interfaces have no known consumers and are candidates for removal in a future major.

  No breaking change — consumers that currently hand-roll a wrapper schema in their server actions (frontend) or accept `id` from `@Param` + body from `@Body` (backend) can adopt this opportunistically. Entity-level body schemas (`updateNoticeSchema`, `updatePollSchema`, etc.) are unchanged.

- 7e457a9: Tighten `notificationResponseSchema.data` from `z.record(z.string(), z.unknown())` to a union of per-notification-type payload schemas. Each `NotificationType` now maps to a concrete `data` shape (e.g. `NOTICE_CREATED` -> `{ title, content, createdAt, isPinned, actionUrl, ... }`, `CHAT_MESSAGE` -> `{ senderName, messagePreview, conversationId, actionUrl, ... }`). Shared fields (`entityType`, `entityId`, `actorId`, `actorName`, `actionUrl`) are typed on a common base. The notification `type` field itself is now a `z.enum` of `NotificationType` values instead of an open `z.string()`. Exports `notificationDataSchema`, `getNotificationDataSchema(type)`, and the `NotificationData` type for consumers who want to narrow. Existing callers that read `data?.actionUrl` are unaffected.

### Patch Changes

- 006c68b: Extract duplicated `nestedEventSchema`, `nestedFileSchema`, and `pollReferenceSchema` from `notices.ts`, `maintenance-logs.ts`, and `failure-reports.ts` into a single source `src/schemas/responses/_nested.ts`. Schema shapes are unchanged; consumers don't need to update.
- eea2dc9: Fix two response-schema drifts flagged by the backend contract tests:

  - `pollResponseSchema` / `pollResultsSchema`: widen `winningOptionIndex`, `finalizedAt`, `finalizedBy` to `.nullable().optional()`. The backend emits explicit `null` for non-finalised polls; schemas accepted only `undefined` before.
  - `buildingResponseSchema` (list): add `status: buildingStatusSchema.optional()` and `houseRulesFileUrl: z.string().nullable().optional()`. Both fields were emitted by `GET /buildings` but missing from the list schema (detail schema already had `houseRulesFileUrl`).

  Shape changes are additive — consumers that already tolerate the fields (all do, since responses use `z.looseObject`) need no update.

## 0.19.0

### Minor Changes

- 8c387de: Grant `apartment:update` to building representatives (OWNER_REPRESENTATIVE, DEPUTY_REPRESENTATIVE).

  Representatives now hold `APARTMENT_UPDATE`, which unlocks the full set of apartment mutations on the backend (create/update/delete/add-user/remove-user all gate on this permission today) and surfaces the edit/delete and resident-management buttons in the UI via `canEdit`.

  Motivation: representatives administer the resident roster and apartment metadata for their building; previously only org-admin roles held these permissions, so reps on `/representatives/buildings/:id/apartments` could view but not edit apartments or manage residents.

## 0.18.2

### Patch Changes

- Widen nested `events` schema in notices, failure-reports, and maintenance-logs response schemas to declare the full 11-field shape the backend emits (`type`, `description`, `color`, `userId`, `buildingId`, `createdAt`, `updatedAt` — all optional/nullable). Loose parsing already tolerated them; strict-parse tests in consumers can now validate nested events without drift.
- Add `polls` array to `failureReportResponseSchema` (mirrors the existing `events` and `maintenanceLogs` nested references). The backend has been emitting this field; the schema now declares it.

## 0.18.1

### Patch Changes

- Export building, events, and polls response schemas from the top-level `schemas` barrel so consumers can actually import them. v0.18.0 added the schema files but forgot to re-export them through `src/schemas/index.ts`.

## 0.18.0

### Minor Changes

- 70dd033: Add response schemas for building, events, and polls

## 0.17.2

- Add 11 new error codes for funds, billing, blog, platform, and workflow domains.

## 0.17.1

- Add chat/poll lifecycle + workflow error codes.

## 0.17.0

- Add response schemas for FAQs, notifications, comments, failure-reports, notices, maintenance-logs.
- Expand `BACKEND_ERROR_CODES` with resource, membership, and permission codes.
- Align `API_ROUTES` with backend controller paths.

## 0.15.0 and earlier

See git tags for history prior to Changesets adoption.
