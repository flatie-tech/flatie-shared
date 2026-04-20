# BACKEND_ERROR_CODES usage audit

Snapshot date: 2026-04-20. Regenerate by re-running the grep in this doc's history.

Source: `grep -rn "BACKEND_ERROR_CODES.<code>" src --include="*.ts"` in `flatie-backend`, run against every code defined in `src/errors/index.ts` (58 codes total).

## Zero-usage codes

28 of 58 codes are never referenced in the backend. Likely category annotated in parentheses.

- `ACCOUNT_LOCKED` (future-work — lockout feature not implemented)
- `ALREADY_APPROVED` (redundant — join-request flows use other codes)
- `ALREADY_DECLINED` (redundant — join-request flows use other codes)
- `EMAIL_ALREADY_VERIFIED` (success-signal — better-auth owns this boundary)
- `EMAIL_NOT_VERIFIED` (boundary-handled — better-auth surfaces via its own codes)
- `FAILED_TO_CREATE_USER` (redundant — prefer `VALIDATION_ERROR` / `DUPLICATE_RECORD`)
- `FAILED_TO_UPDATE_USER` (redundant — prefer `VALIDATION_ERROR` / `DUPLICATE_RECORD`)
- `FORBIDDEN` (redundant — `INSUFFICIENT_PERMISSIONS` used instead, 62 hits)
- `INVALID_CREDENTIALS` (boundary-handled — better-auth)
- `INVALID_EMAIL` (boundary-handled — Zod validation)
- `INVALID_EMAIL_OR_PASSWORD` (boundary-handled — better-auth)
- `INVALID_OIB` (boundary-handled — Zod schema validator)
- `INVALID_PASSWORD` (boundary-handled — better-auth / Zod)
- `INVALID_PHONE` (boundary-handled — Zod schema validator)
- `INVALID_TOKEN` (boundary-handled — better-auth)
- `JOIN_REQUEST_ALREADY_DECIDED` (future-work — join-request lifecycle)
- `JOIN_REQUEST_NOT_FOUND` (future-work — join-request lifecycle)
- `JOIN_REQUEST_PENDING` (future-work — join-request lifecycle)
- `RESET_PASSWORD_EMAIL_SENT` (success-signal — not an error)
- `SESSION_EXPIRED` (boundary-handled — better-auth)
- `SOCIAL_ACCOUNT_ALREADY_LINKED` (future-work — social account linking not shipped)
- `SOCIAL_ACCOUNT_NOT_LINKED` (future-work — social account linking not shipped)
- `TOKEN_EXPIRED` (boundary-handled — better-auth)
- `TOO_MANY_REQUESTS` (boundary-handled — rate limiter middleware)
- `UNAUTHORIZED` (redundant — `INSUFFICIENT_PERMISSIONS` used instead)
- `USER_ALREADY_EXISTS` (boundary-handled — better-auth registration)
- `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL` (redundant — duplicate of above)
- `VERIFICATION_EMAIL_SENT` (success-signal — not an error)

## Top 10 most-used codes

| Code | Count |
|---|---|
| `INSUFFICIENT_PERMISSIONS` | 62 |
| `BUILDING_NOT_FOUND` | 22 |
| `ORGANIZATION_NOT_FOUND` | 12 |
| `POLL_NOT_FOUND` | 11 |
| `APARTMENT_NOT_FOUND` | 10 |
| `USER_NOT_MEMBER_OF_BUILDING` | 9 |
| `USER_ALREADY_MEMBER` | 9 |
| `DOCUMENT_NOT_FOUND` | 9 |
| `USER_NOT_FOUND` | 8 |
| `BLOG_POST_NOT_FOUND` | 8 |

## Full count table

Sorted descending. 58 codes total, 30 in use, 28 unused.

| Code | Count |
|---|---|
| `INSUFFICIENT_PERMISSIONS` | 62 |
| `BUILDING_NOT_FOUND` | 22 |
| `ORGANIZATION_NOT_FOUND` | 12 |
| `POLL_NOT_FOUND` | 11 |
| `APARTMENT_NOT_FOUND` | 10 |
| `USER_NOT_MEMBER_OF_BUILDING` | 9 |
| `USER_ALREADY_MEMBER` | 9 |
| `DOCUMENT_NOT_FOUND` | 9 |
| `USER_NOT_FOUND` | 8 |
| `BLOG_POST_NOT_FOUND` | 8 |
| `STORAGE_UNIT_NOT_FOUND` | 7 |
| `GARAGE_NOT_FOUND` | 7 |
| `NOTICE_NOT_FOUND` | 6 |
| `FAILURE_REPORT_NOT_FOUND` | 6 |
| `VALIDATION_ERROR` | 5 |
| `MAINTENANCE_LOG_NOT_FOUND` | 5 |
| `EVENT_NOT_FOUND` | 5 |
| `RECURRING_TEMPLATE_NOT_FOUND` | 4 |
| `INCOME_TRANSACTION_NOT_FOUND` | 4 |
| `DUPLICATE_RECORD` | 4 |
| `POLL_NOT_ACTIVE` | 2 |
| `FAQ_NOT_FOUND` | 2 |
| `CONVERSATION_NOT_FOUND` | 2 |
| `COMMENT_NOT_FOUND` | 2 |
| `BUILDING_NOT_PENDING_APPROVAL` | 2 |
| `USER_ALREADY_VOTED` | 1 |
| `USER_ALREADY_PLATFORM_MEMBER` | 1 |
| `POLL_EXPIRED` | 1 |
| `INVOICE_NOT_FOUND` | 1 |
| `INVOICE_ALREADY_PAID` | 1 |
| `VERIFICATION_EMAIL_SENT` | 0 |
| `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL` | 0 |
| `USER_ALREADY_EXISTS` | 0 |
| `UNAUTHORIZED` | 0 |
| `TOO_MANY_REQUESTS` | 0 |
| `TOKEN_EXPIRED` | 0 |
| `SOCIAL_ACCOUNT_NOT_LINKED` | 0 |
| `SOCIAL_ACCOUNT_ALREADY_LINKED` | 0 |
| `SESSION_EXPIRED` | 0 |
| `RESET_PASSWORD_EMAIL_SENT` | 0 |
| `JOIN_REQUEST_PENDING` | 0 |
| `JOIN_REQUEST_NOT_FOUND` | 0 |
| `JOIN_REQUEST_ALREADY_DECIDED` | 0 |
| `INVALID_TOKEN` | 0 |
| `INVALID_PHONE` | 0 |
| `INVALID_PASSWORD` | 0 |
| `INVALID_OIB` | 0 |
| `INVALID_EMAIL_OR_PASSWORD` | 0 |
| `INVALID_EMAIL` | 0 |
| `INVALID_CREDENTIALS` | 0 |
| `FORBIDDEN` | 0 |
| `FAILED_TO_UPDATE_USER` | 0 |
| `FAILED_TO_CREATE_USER` | 0 |
| `EMAIL_NOT_VERIFIED` | 0 |
| `EMAIL_ALREADY_VERIFIED` | 0 |
| `ALREADY_DECLINED` | 0 |
| `ALREADY_APPROVED` | 0 |
| `ACCOUNT_LOCKED` | 0 |

## Pruning recommendations

Do not drop any code without a separate PR. Candidates to consider:

- **Success signals** (not errors; delete if we don't surface them): `VERIFICATION_EMAIL_SENT`, `RESET_PASSWORD_EMAIL_SENT`, `EMAIL_ALREADY_VERIFIED`
- **Redundant with generic codes**: `FAILED_TO_CREATE_USER`, `FAILED_TO_UPDATE_USER` (use `VALIDATION_ERROR` or `DUPLICATE_RECORD` instead); `USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL` (duplicate of `USER_ALREADY_EXISTS`); `UNAUTHORIZED` / `FORBIDDEN` (superseded by `INSUFFICIENT_PERMISSIONS`)
- **Boundary-handled by better-auth / middleware** (we don't raise these ourselves): `INVALID_CREDENTIALS`, `INVALID_EMAIL_OR_PASSWORD`, `INVALID_EMAIL`, `INVALID_PASSWORD`, `INVALID_TOKEN`, `TOKEN_EXPIRED`, `SESSION_EXPIRED`, `EMAIL_NOT_VERIFIED`, `USER_ALREADY_EXISTS`, `TOO_MANY_REQUESTS`, `INVALID_OIB`, `INVALID_PHONE`
- **Future-work placeholders** (keep until feature lands): `SOCIAL_ACCOUNT_ALREADY_LINKED`, `SOCIAL_ACCOUNT_NOT_LINKED`, `ACCOUNT_LOCKED`, `JOIN_REQUEST_PENDING`, `JOIN_REQUEST_NOT_FOUND`, `JOIN_REQUEST_ALREADY_DECIDED`, `ALREADY_APPROVED`, `ALREADY_DECLINED`

Also re-audit after each minor version bump to keep this doc fresh.
