---
'@flatie/shared': minor
---

feat(building-email): add Zod request + response schemas for the per-building
inbox feature: `createEmailThreadRequestSchema`, `replyEmailThreadRequestSchema`,
`emailMessageSchema`, `emailThreadSchema`, `emailThreadDetailSchema`, and
`paginatedEmailThreadsResponseSchema`. Companion to the v0.30.0 permissions
release; together they form the complete contract for the building-email
feature consumed by `flatie-backend` + `flatie-frontend`.
