---
'@flatie/shared': minor
---

feat(query-keys): add `userKeys.me()` and `userKeys.profile()`; broaden
`chatKeys.messages` to `(buildingId, conversationId)`.

- `userKeys.me()` returns `['user', 'me']` and `userKeys.profile()` returns
  `[...me, 'profile']`. These match the convention mobile already uses
  (`/users/me` REST shape) and let mobile delete its local `userKeys`
  block. Existing `userKeys.info()` is unchanged for current frontend
  callers.
- `chatKeys.messages` now requires both `buildingId` and `conversationId`.
  Flatie's chat is scoped per-building, so single-arg keys could collide
  across buildings. **Breaking** for any caller passing a single argument
  — frontend's chat code needs to add the buildingId at every call site.
  Treated as minor because there are no production users to migrate.
