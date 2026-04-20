---
'@flatie/shared': patch
---

Remove 7 stale hand-rolled `UpdateXRequest` interfaces from `src/types/*.types.ts`:

- `UpdateTransactionRequest`, `UpdateFundRequest`, `UpdateRecurringTemplateRequest` (`src/types/financial.types.ts`)
- `UpdateNoticeRequest` (`src/types/notice.types.ts`)
- `UpdateFailureReportRequest` (`src/types/failure-report.types.ts`)
- `UpdateEventRequest` (`src/types/event.types.ts`)
- `UpdateMaintenanceLogRequest` (`src/types/maintenance-log.types.ts`)

These were superseded by the `*RequestPayload` types / entity-level `updateXSchema` shipped in `src/schemas/requests/` and `src/schemas/entities/` in v0.20.0. Zero consumers across `flatie-backend`, `flatie-frontend`, and `flatie-mobile` (verified via grep on 2026-04-20).
