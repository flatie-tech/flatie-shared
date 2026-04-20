# @flatie/shared

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
