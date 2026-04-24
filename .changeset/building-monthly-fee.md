---
'@flatie/shared': minor
---

Add `monthlyFeePerSqm` to the building schema.

- `createBuildingSchema` and `updateBuildingSchema` accept optional `monthlyFeePerSqm` (non-negative number; EUR per m² of owned floor area, per month).
- `buildingDetailResponseSchema` returns it so clients can derive per-co-owner expected pričuva from apartment/garage/storage area.
- New `FUNDS.PRICUVA_LEDGER(buildingId)` URL + `pricuvaLedgerResponseSchema` response contract: per-co-owner expected-vs-paid rows for a given month.
