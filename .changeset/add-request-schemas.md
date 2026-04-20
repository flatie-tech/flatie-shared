---
'@flatie/shared': minor
---

Add `src/schemas/requests/` with canonical PATCH request schemas — `updateNoticeRequestSchema`, `updateFailureReportRequestSchema`, `updateMaintenanceLogRequestSchema`, `updatePollRequestSchema` — plus their inferred payload types (`UpdateNoticeRequestPayload`, `UpdateFailureReportRequestPayload`, `UpdateMaintenanceLogRequestPayload`, `UpdatePollRequestPayload`). Each schema composes the existing entity-level body schema (all fields optional, PATCH semantics) with a required `id` so consumers get a single shape covering "id from URL + optional body fields" in one place.

Body shapes are not duplicated: the new request schemas are `.extend({ id: uuidSchema })` on top of the entity-level schemas (e.g. `updateNoticeSchema`), so request and body stay in lockstep. For `updateFailureReportRequestSchema`, Zod's `.extend()` on a `superRefine`'d object preserves the `refineLocation` cross-field rule.

The payload types use a `*RequestPayload` suffix (rather than `*Request`) because the shared package already exposes hand-rolled legacy `UpdateNoticeRequest` / `UpdateFailureReportRequest` / `UpdateMaintenanceLogRequest` interfaces in `src/types/*.types.ts`. The Zod-inferred payload types here are the contract-of-truth going forward; the legacy interfaces have no known consumers and are candidates for removal in a future major.

No breaking change — consumers that currently hand-roll a wrapper schema in their server actions (frontend) or accept `id` from `@Param` + body from `@Body` (backend) can adopt this opportunistically. Entity-level body schemas (`updateNoticeSchema`, `updatePollSchema`, etc.) are unchanged.
