# @flatie/shared

## 0.75.0

### Changes

- feat(units)!: unified unit schema — single units entity with kind discriminant

## 0.74.0

### Changes

- feat(polls): owners-model schemas — scopedOwnerIds, offline votes by owner, eligible-voter roster, owner invite

## 0.73.2

### Changes

- fix(board): allowComments must survive multipart — multipartBoolean, not z.boolean

## 0.73.1

### Changes

- fix(building-email): reach EMAIL_LIMITS/emailAttachmentSchema from the top barrel + multipart ccEmails

## 0.73.0

### Changes

- feat(building-email): management-only mailbox, EMAIL_LIMITS, attachments, test-ids

## 0.72.0

### Changes

- feat(permissions): expose memberRoleType in permissions response

## 0.71.0

### Changes

- feat(money): decimal-string money primitives + schemas + expense/funds contracts

## 0.70.0

### Changes

- feat(address): existingBuilding on AddressSearchResult

## 0.69.0

### Changes

- feat(documents): shared create/update request schemas + DOCUMENT_LIMITS + test-ids

## 0.68.0

### Changes

- feat(address): canonical address value-object subpath

## 0.67.0

### Changes

- feat(polls): update-schema consensus fields, expanded test-ids, deadline types implemented

## 0.66.0

### Changes

- feat(maintenance-log): event endDate>=startDate refine + expand test-ids

## 0.65.0

### Changes

- feat(notifications): add FAILURE_REPORT_APPROVED/DECLINED types

## 0.64.0

### Changes

- Failure reports: allowComments in create/update schemas (the field backend persists but Zod previously stripped — the comment toggle never worked), endDate>=startDate refinement on report events, and expanded FailureReportsTestIds for e2e/Maestro coverage.

## 0.63.0

### Changes

- Notices: allowComments in create/update schemas (the field backend persists but Zod previously stripped — the toggle never worked), endDate>=startDate refinement on notice events, and expanded NoticeBoardTestIds for e2e/Maestro coverage.

## 0.62.0

### Changes

- Remove exports deprecated in v0.59.0: phantom API routes (phone verification, quotas, recurring templates), org-quota schemas, and dead *WithCreator/PollWithResults/RecurringTemplate types. (Removals originally slated for v0.60.0 — that number was taken by the notification-sync release.)

## 0.61.1

### Changes

- remove the temporary SMS shim from NotificationChannel (backend no longer references it)

## 0.61.0

### Changes

- Board v3: user-defined columns (create/rename/reorder), card file attachments + inline calendar events, markdown descriptions; NotificationChannel.SMS

## 0.60.3

### Changes

- export CO_OWNER_VISIBLE_SYSTEM_TYPES from the enums barrel

## 0.60.2

### Changes

- wasteTypeLabel optional on waste reminder data — backend sends raw subtype; clients derive the localized label

## 0.60.1

### Changes

- wasteTypeLabel optional on waste reminder data — backend sends raw subtype; clients derive the localized label

## 0.60.0

### Changes

- Notification enum/schema sync: event reminders un-hidden from preferences, sms channel removed, CO_OWNER_VISIBLE_SYSTEM_TYPES promoted, real poll_vote_signature_* and event_reminder_* data schemas

## 0.59.0

### Changes

- v0.59.0 batches the Phase-3 cleanup: new resident-restriction util (applyResidentRestriction/applyResidentRestrictionToItem — owner-only edit/delete gating shared by web's resident view and mobile's non-management view), new BuildingContextFromPlatformAdmin permission-context variant (source 'platform_admin', no orgId/orgRole), new ENTITY_LINK_TYPE_META (entity type → section/icon/tint incl. board_card), native hex token artifacts (tokens.native.css + tokens.native subpath exports, oklch→sRGB hex) plus a build fix so script-emitted .d.ts files survive tsup's DTS phase, and types/↔schemas/ convergence (EventType/EventColor/RecurrenceType/MaintenanceFinancedBy/VoteRequest now z.infer-derived with type-level assertion tests). Merges the v0.58.0 board foundation into main. Deletes the long-deprecated raw permission helpers (hasPermission/hasAnyPermission/hasAllPermissions — zero importers). Deprecates for removal in v0.60.0: phantom API_ROUTES (USERS.PHONE_*, BUILDINGS.QUOTAS, FUNDS.RECURRING_TEMPLATE*, ORGANIZATIONS.QUOTAS), the org-quota schemas, the *WithCreator/PollWithResults response types, and financial RecurringTemplate/CreateRecurringTemplateRequest.

## 0.57.0

### Minor Changes

- Add `API_ROUTES.NOTIFICATIONS.UNREAD` (`PATCH /notifications/unread`) for marking notifications back to unread — the mirror of the existing `READ` route. Additive; no schema change (`notificationResponseSchema` already models unread via `read`/`readAt`).

## 0.56.1

### Patch Changes

- Expose optional `createdAt` (ISO-8601) on `eventResponseSchema` — the only
  entity response that omitted it. Optional because synthesized recurrence
  instances may not carry one.

## 0.56.0

### Minor Changes

- `getInitials` and `formatCurrencyEUR` utils — absorb helpers that were
  copy-pasted across consumers (six `getInitials` copies between frontend and
  mobile; the euro-normalize + cent-rounding currency wrapper duplicated in
  frontend tables/PDF and mobile funds helpers).

## 0.55.1

### Patch Changes

- Fix: re-export the v0.55.0 representative/building-settings response schemas from the package root barrel (`schemas/index.ts` uses explicit named blocks, so `responses/index.ts` alone wasn't reachable via `@flatie/shared`). Adds a root-reachability regression test.

## 0.55.0

### Minor Changes

- Representative-experience parity contracts (rep-parity program phase 0):

  - `responses/representatives.ts` — `repUserItemSchema` / `repBuildingItemSchema` with paginated envelopes (`paginatedRepUsersResponseSchema`, `paginatedRepBuildingsResponseSchema`) and `repDashboardSummaryResponseSchema` (incl. `recentActivity` + `buildingsWithActivity` feeds and the `repRecentActivityTypeSchema` enum for route mapping).
  - `rep-list-params.schema.ts` — `getRepUsersParamsSchema` / `getRepBuildingsParamsSchema` query-param contracts mirroring the backend DTOs (search/filter/sort/limit/offset with backend defaults).
  - `responses/building-settings.ts` — `buildingSettingsResponseSchema`; `entities/building-settings.schema.ts` — `updateBuildingSettingsSchema` (full field set incl. voting methods, consensus tier, ownership-percentage source).
  - `utils/voting-methods.ts` — last-method-lock invariant helpers (`violatesVotingMethodLock`, `isLastEnabledVotingMethod`, `resolveVotingMethods`) so clients can lock the final voting-method toggle instead of hitting a server error.
  - `entities/income-transaction.schema.ts` — `createIncomeSchema` / `updateIncomeSchema` for the manual income ledger; new `incomeKeys` query-key factory.

## 0.54.0

### Minor Changes

- Entity links: display metadata + batch link counts (Connections UI support).

  - `entityLinkReferenceSchema` gains an optional `metadata` object
    (`entityLinkMetadataSchema` / `EntityLinkMetadata`): raw, unformatted
    per-type display fields — `status` (enum value, client-localized), `date`
    (ISO), `amount` (number), `secondary` (already-human text like a contractor
    name or accounting period). Purely additive; existing consumers that ignore
    it are unaffected.
  - New `entityLinkCountsResponseSchema` / `EntityLinkCountsResponse` and
    `API_ROUTES.LINKS.COUNTS(buildingId)` for a batch "how many links touch each
    entity" lookup, powering link-count indicators on list/card rows.

## 0.53.1

### Patch Changes

- Export `CHAT_CONVERSATIONS_POLL_MS` from the constants barrel — it was added
  in 0.53.0 but never re-exported, so the published package did not expose it.

## 0.53.0

### Minor Changes

- Chat: building-DM eligibility + org-scoped chat + role badges.
  - New `canMessageUser` / `getMessageableUsers` utils (`MessageableUserShape`) —
    the single building-chat DM-eligibility rule shared by web, mobile, and the
    backend docs; caller managerial-ness must come from the caller's direct
    building role. Org chat deliberately has no eligibility mechanic.
  - New error code `CHAT_TARGET_NOT_MESSAGEABLE` (target co-owner hasn't opted
    in to co-owner DMs) — replaces the misleading generic
    `INSUFFICIENT_PERMISSIONS` on that path.
  - New `ROLE_BADGE_COLORS` (`RoleBadgeColor` semantic names) + `getRoleBadge`
    — one role→color source of truth for badges on web and mobile.
    `ROLE_TRANSLATION_KEYS`/`ROLE_DESCRIPTION_KEYS` gain `ApartmentRole.TENANT`
    (new `DisplayableRole` union).
  - New `CHAT_CONVERSATIONS_POLL_MS` so web and mobile can't drift on polling.
  - Org-scoped chat contract: `API_ROUTES.CHAT.ORG_*` route builders,
    `chatKeys.org*` query keys, and `conversationResponseSchema` now carries
    `buildingId: string | null` + optional `orgId` (exactly one set; building
    payloads are unchanged on the wire).

## 0.52.0

### Minor Changes

- Entity-link primitives for the generic links API: `EntityLinkType` /
  `LinkableEntityType` enums, `ALLOWED_ENTITY_LINKS` rules table +
  `isEntityLinkAllowed`, create/delete/list request schemas,
  `entityLinksResponseSchema`, `API_ROUTES.LINKS`, `entityLinkKeys`.

## 0.51.0

### Minor Changes

- Refresh event entity schemas to match the backend contract and add a Google
  Calendar link builder. `EVENT_TYPES` gains `waste_collection` (+ color-map
  entry); new `RECURRENCE_TYPES` / `recurrenceTypeSchema` / `RecurrenceType`;
  `createEventSchema`/`updateEventSchema` now carry recurrence, subtype,
  anonymity, comments toggle, meeting fields (`onlineMeetingUrl`,
  `meetingMinutes`, `minuteTakerId`) and `fileIds`, with required title and an
  end-after-start refinement; description max aligned to the backend's 500.
  `Event`/`CreateEventRequest` types extended to match. New
  `buildGoogleCalendarUrl(event)` util (`GoogleCalendarEventInput`) produces a
  prefilled calendar.google.com TEMPLATE link with UTC dates, details from
  description + meeting URL, optional location, and an RRULE for recurring
  events (suppressed for expanded recurrence instances).

## 0.50.0

### Minor Changes

- AI chat request/usage schemas + `AI_CHAT_LIMITS`: lenient chat request
  contract moved from flatie-backend with abuse-ceiling caps,
  `aiUsageResponseSchema` with per-user fairness fields, and a single source
  for request caps / client input cap / server history window.

## 0.49.0

### Minor Changes

- Poll "cannot vote" reasons and building membership on the permission
  context. New `PollCannotVoteReason` enum + `POLL_CANNOT_VOTE_REASON_KEY`
  (enum → i18n key suffix shared by web and mobile) and an optional
  `cannotVoteReason` field on `pollResultsSchema`, so clients can explain a
  blocked vote instead of a generic "not eligible". New `BuildingMembership`
  interface carried as `membership` on both building permission-context
  variants — the caller's direct `building_roles` identity (role + ownership
  surface), which the access merge must never drop even when org/platform
  permissions win. Adds `POLL_NOT_APPROVED` and `CONSENSUS_TIER_TOO_LOW` to
  `BACKEND_ERROR_CODES`, and documents the top-level `status` field on
  `buildingDetailResponseSchema`.

## 0.48.0

### Minor Changes

- Add tiered identity-verification primitives. New `VerificationTier` enum
  (UNVERIFIED/OIB/IDENTITY/QUALIFIED as numeric ordinals) and a `methodToTier()`
  helper; `IdentityVerificationMethod` gains `KYC_VENDOR` and `OIB_SELF_DECLARED`.
  Adds `INSUFFICIENT_VERIFICATION_TIER`, `VERIFICATION_TIER_BELOW_LEGAL_MINIMUM`,
  and `KYC_VERIFICATION_FAILED` to `BACKEND_ERROR_CODES`.

## 0.47.0

### Minor Changes

- Add `GEOCODE_NO_ADDRESS`, `GEOCODE_ADDRESS_NOT_FOUND`, and
  `GEOCODE_COORDINATES_NOT_FOUND` to `BACKEND_ERROR_CODES`, so the building
  geocode endpoint's three failure modes carry a machine-readable code instead
  of a plain message string.

## 0.46.0

### Minor Changes

- Zod validation messages are now user-facing across all three locales. `hr` was
  reworded from Zod's developer-facing tone into polite, imperative messages;
  curated `en` and `de` locales were added that override Zod's built-in maps so
  the wording is consistent everywhere. Empty/missing input now renders a clean
  "required" message instead of a type/length error. `setZodLocale` registers all
  three custom locales and still falls back to Zod's built-ins for other languages.

  Also bumps the base radius token (`radii.radius`) from `0.625rem` to `0.75rem`,
  softening default corner rounding across consumers that bind the token.

## 0.40.0

### Minor Changes

- Add the unified `createPermissionChecker(subject)` primitive — an isomorphic
  `can / canAny / canAll / canOnResource / actionFlags` surface (Clerk-`has()`
  analogue) that backs the backend guards and both client hooks over a minimal
  `PermissionSubject` (`{ userId, permissions }`). The evaluator functions
  (`canDo`, `canDoOnResource`, `computeActionFlags`) now accept `PermissionSubject`
  instead of the full `PermissionContext`; `PermissionContext` still satisfies it,
  so existing backend call-sites are unaffected (parameter widening, non-breaking).

  The raw `string[]` helpers in `utils/permissions.ts`
  (`hasPermission`/`hasAnyPermission`/`hasAllPermissions`) are now `@deprecated` in
  favour of the checker — kept in place for one minor cycle.

  New permission strings (additive): `document:set_private`, `chat:create_group`,
  `poll:export_signers` (granted to representatives, inherited by ORG_ADMIN /
  SUPERVISOR) and `platform:view_archive` (PLATFORM_ADMIN only).

## 0.35.0

### Minor Changes

- 4355e5b: feat(test-ids): add `OnboardingTestIds` and `AppShellTestIds`

  `OnboardingTestIds` covers the three onboarding tabs (`tabFind`, `tabJoin`,
  `tabCreate`) on `/onboarding`. Existing consumers in `flatie-frontend`
  will swap their inline `data-testid="onboarding-tab-..."` strings for
  typed references.

  `AppShellTestIds` covers the dashboard-header account controls:
  `accountDropdown` (avatar button) + `signOutButton` (menu item).
  Lifting these out of `flatie-frontend/src/components/layout/DashboardHeader/AccountDropdown.tsx`
  where they were inline strings — `flatie-mobile` will likely need
  the same selectors when it gains a logout flow.

## 0.34.0

### Minor Changes

- Re-scope Certilia contracts from OIDC login to consensus-vote identity
  verification. The 0.33.0 changelog described this scope but the
  shipped exports were still the earlier login-flow shape; 0.34.0
  brings the actual exports in line with how `flatie-backend` and
  `flatie-frontend` consume them.

  **Removed (login-flow, never used by any consumer):**

  - `BACKEND_ERROR_CODES.CERTILIA_NO_MATCH`
  - `BACKEND_ERROR_CODES.CERTILIA_OIB_CONFLICT`
  - `LoginTestIds.certiliaButton`

  **Added (vote-flow, consumed by the identity-challenge endpoint):**

  - `BACKEND_ERROR_CODES.CONSENSUS_REQUIRES_IDENTITY_VERIFICATION` —
    plain vote rejected on a CONSENSUS poll.
  - `BACKEND_ERROR_CODES.OIB_REQUIRED_BEFORE_VOTE` — user has no OIB on
    file; frontend prompts the OIB-required dialog.
  - `BACKEND_ERROR_CODES.CERTILIA_OIB_MISMATCH` — Certilia returned an
    OIB different from the user's stored OIB.
  - `BACKEND_ERROR_CODES.CERTILIA_EMAIL_MISMATCH` — Certilia returned
    an email different from the user's stored email.

  **Unchanged from 0.33.0:** `certiliaUserinfoSchema`,
  `BACKEND_ERROR_CODES.CERTILIA_INSUFFICIENT_CLAIMS`,
  `PollsTestIds.identityVerifiedVoteButton`.

## 0.33.0

### Minor Changes

- Add Certilia OIDC userinfo schema + login error codes for the Croatian eID
  login flow.

  - `certiliaUserinfoSchema` parses Certilia's `/userinfo` response and
    normalises the OIB claim across the variants Certilia uses (`oib`,
    `pin`, `oib_pin`).
  - `BACKEND_ERROR_CODES.CERTILIA_NO_MATCH`, `CERTILIA_OIB_CONFLICT`, and
    `CERTILIA_INSUFFICIENT_CLAIMS` for the three rejection paths in the
    backend's `genericOAuth` Certilia provider.
  - `LoginTestIds.certiliaButton` for the new login-page button.

## 0.32.0

### Minor Changes

- 3deac44: feat(building-email): add `BUILDING_EMAIL_VIEW` and `BUILDING_EMAIL_MANAGE`
  permissions for the per-building inbox feature, wire `view` to co-owners and
  `manage` to representatives/deputies, and expose `buildingEmailKeys` through
  the master `queryKeys` aggregator.
- ff01387: feat(building-email): add Zod request + response schemas for the per-building
  inbox feature: `createEmailThreadRequestSchema`, `replyEmailThreadRequestSchema`,
  `emailMessageSchema`, `emailThreadSchema`, `emailThreadDetailSchema`, and
  `paginatedEmailThreadsResponseSchema`. Companion to the v0.30.0 permissions
  release; together they form the complete contract for the building-email
  feature consumed by `flatie-backend` + `flatie-frontend`.
- 622ca7c: feat(utils): add `LOCALE_MAP`, `getDateLocale`, `formatDateByLocale`,
  `formatDateTime`, `formatCurrencyByLocale` for cross-consumer locale-aware
  date / currency formatting; add `parseApiError` (pure, no axios coupling) and
  `ParsedApiError` for extracting domain error codes + messages from caught HTTP
  errors. Lifts identical local copies that previously lived in
  `flatie-frontend/src/lib/api/errors.ts`,
  `flatie-frontend/src/hooks/use-locale-date-format.ts`,
  `flatie-mobile/src/api/common/errors.ts`, and the inline helpers in
  `flatie-backend/src/modules/notification/notification-email-templates.ts`.
- 622ca7c: feat(query-keys): add `userKeys.me()` and `userKeys.profile()`; broaden
  `chatKeys.messages` to `(buildingId, conversationId)`.

  - `userKeys.me()` returns `['user', 'me']` and `userKeys.profile()` returns
    `[...me, 'profile']`. These match the convention mobile already uses
    (`/users/me` REST shape) and let mobile delete its local `userKeys`
    block. Existing `userKeys.info()` is unchanged for current frontend
    callers.
  - `chatKeys.messages` now requires both `buildingId` and `conversationId`.
    Flatie's chat is scoped per-building, so single-arg keys could collide
    across buildings. **Breaking** for any caller passing a single argument
    — frontend's chat code needs to add the buildingId at every call site.
    Treated as minor because there are no production users to migrate.

## 0.25.0

### Minor Changes

- Add per-post `allowComments` flag to notices, events, and failure reports.

  - `createNoticeSchema`, `updateNoticeSchema`, `noticeResponseSchema` carry `allowComments?: boolean`.
  - Same field added to the event and failure-report request/response schemas.
  - Consumers can gate the comments UI on a per-post basis; default remains open when the field is omitted.

- d531a30: Add `monthlyFeePerSqm` to the building schema.

  - `createBuildingSchema` and `updateBuildingSchema` accept optional `monthlyFeePerSqm` (non-negative number; EUR per m² of owned floor area, per month).
  - `buildingDetailResponseSchema` returns it so clients can derive per-co-owner expected pričuva from apartment/garage/storage area.
  - New `FUNDS.PRICUVA_LEDGER(buildingId)` URL + `pricuvaLedgerResponseSchema` response contract: per-co-owner expected-vs-paid rows for a given month.

- Add organization-scoped business-partner contracts and `ORG_VIEW_PARTNERS` / `ORG_MANAGE_PARTNERS` permissions.

  - New `businessPartnerResponseSchema`, `createBusinessPartnerSchema`, `updateBusinessPartnerSchema` in `@flatie/shared/schemas/entities` (all 15 fields incl. `oib`, `taxNumber`, `iban`, `bankAccount`, `code` / "oznaka", `isVatPayer`, `isActive`).
  - Types: `BusinessPartnerResponse`, `CreateBusinessPartnerInput`, `UpdateBusinessPartnerInput`.
  - New `API_ROUTES.ORGANIZATIONS.BUSINESS_PARTNERS` / `BUSINESS_PARTNER_DETAIL` URLs.
  - Two new org-scoped permissions wired into `ORG_ROLE_PERMISSIONS` (all org roles see partners; `ORG_ADMIN` + `SUPERVISOR` manage them).
  - New `businessPartnerKeys` query-key factory.

- a3c99e5: Add building IBAN + funds-source mode and CAMT.053 import contract.

  - New `FundsSource` / `TransactionSource` enums (`'manual' | 'camt'`) in `@flatie/shared/enums`.
  - New `ibanSchema` + `optionalIbanSchema` in `@flatie/shared/validation` (format-only, no mod-97).
  - `createBuildingSchema` accepts an optional `iban`; `updateBuildingSchema` accepts `iban` + `fundsSource` for switching between manual entry and CAMT ingestion.
  - `buildingDetailResponseSchema` now carries `iban` + `fundsSource` so clients can gate the import UI.
  - New `FUNDS.IMPORT_CAMT(buildingId)` URL plus `FUNDS.EXPENSES` / `FUNDS.EXPENSE_DETAIL` URLs for the new expense transactions surface.
  - New `camtImportResponseSchema` for the `POST .../funds/import/camt` response: statement metadata, counts, and per-row imported/error details.

## 0.24.1

### Patch Changes

- Surface archive schema exports at the top-level barrel. `ARCHIVE_TYPES`, `archiveTypeSchema`, `archivedItemSchema`, and `listArchivedResponseSchema` were added to `src/schemas/responses/` in v0.24.0 but missing from `src/schemas/index.ts`, so consumers importing from `@flatie/shared` saw them as `undefined`.

## 0.24.0

### Minor Changes

- Add platform archive contract: `API_ROUTES.PLATFORM.ARCHIVE`, `ARCHIVE_CLEANUP`, `ARCHIVE_RESTORE(type, id)`, `ARCHIVE_PERMANENT(type, id)`, plus `ARCHIVE_TYPES`, `archiveTypeSchema`, `archivedItemSchema`, and `listArchivedResponseSchema`. Consumed by the frontend platform-admin archive page and mirrored by the backend `archive-registry.ts`.

## 0.23.0

### Minor Changes

- 4c37d76: Add `parseData` + `ParseError` runtime helpers.

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
