---
'@flatie/shared': patch
---

Add versioning policy doc and three regression guards:

- `docs/versioning.md` — when to bump patch vs minor vs major; how to coordinate
  consumer bumps; forward-only rollback policy.
- `tests/schemas/notification-exhaustiveness.test.ts` — asserts every
  `NotificationType` maps to a live Zod schema via `getNotificationDataSchema`.
  Catches silent drift when a new notification type is added.
- `tests/enums/permission-shape.test.ts` — asserts every `Permission` value
  matches the canonical `domain:action[:own|any]` format and that keys/values
  are unique. Catches typos that would otherwise surface as "access denied".
- `.github/workflows/pr-check.yml` — runs lint/type-check/test/build on every
  PR and fails if `dist/` is out of sync with `src/`. Prevents the "consumer
  pins a tag where dist/ doesn't match src/" failure mode.
