---
'@flatie/shared': minor
---

Add `UuidString` branded type + helpers, and cross-schema discriminated-union tests.

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
