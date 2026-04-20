---
'@flatie/shared': patch
---

Fix two response-schema drifts flagged by the backend contract tests:

- `pollResponseSchema` / `pollResultsSchema`: widen `winningOptionIndex`, `finalizedAt`, `finalizedBy` to `.nullable().optional()`. The backend emits explicit `null` for non-finalised polls; schemas accepted only `undefined` before.
- `buildingResponseSchema` (list): add `status: buildingStatusSchema.optional()` and `houseRulesFileUrl: z.string().nullable().optional()`. Both fields were emitted by `GET /buildings` but missing from the list schema (detail schema already had `houseRulesFileUrl`).

Shape changes are additive — consumers that already tolerate the fields (all do, since responses use `z.looseObject`) need no update.
