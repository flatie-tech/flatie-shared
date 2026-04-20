# @flatie/shared

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
