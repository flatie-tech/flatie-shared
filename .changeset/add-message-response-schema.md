---
'@flatie/shared': patch
---

Add `messageResponseSchema` (`{ message: string }`) for bare-action endpoints.

Backend controllers across notices, polls, failure-reports, maintenance-logs,
events, garages, storage-units, apartments, transaction-categories, and
income-transactions all return `{ message: string }` from their approve /
archive / restore / permanent-delete / decline endpoints. Previously these
were modeled ad-hoc on each consumer (frontend used lenient `z.looseObject({})`
as a placeholder). Exposing the canonical schema lets consumers strict-parse
and surfaces drift at the edges instead of laundering it through a catch-all.

Non-breaking additive change.
