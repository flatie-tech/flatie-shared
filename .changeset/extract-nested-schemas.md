---
'@flatie/shared': patch
---

Extract duplicated `nestedEventSchema`, `nestedFileSchema`, and `pollReferenceSchema` from `notices.ts`, `maintenance-logs.ts`, and `failure-reports.ts` into a single source `src/schemas/responses/_nested.ts`. Schema shapes are unchanged; consumers don't need to update.
