---
'@flatie/shared': minor
---

Add building IBAN + funds-source mode and CAMT.053 import contract.

- New `FundsSource` / `TransactionSource` enums (`'manual' | 'camt'`) in `@flatie/shared/enums`.
- New `ibanSchema` + `optionalIbanSchema` in `@flatie/shared/validation` (format-only, no mod-97).
- `createBuildingSchema` accepts an optional `iban`; `updateBuildingSchema` accepts `iban` + `fundsSource` for switching between manual entry and CAMT ingestion.
- `buildingDetailResponseSchema` now carries `iban` + `fundsSource` so clients can gate the import UI.
- New `FUNDS.IMPORT_CAMT(buildingId)` URL plus `FUNDS.EXPENSES` / `FUNDS.EXPENSE_DETAIL` URLs for the new expense transactions surface.
- New `camtImportResponseSchema` for the `POST .../funds/import/camt` response: statement metadata, counts, and per-row imported/error details.
