---
'@flatie/shared': major
---

**BREAKING**: Remove the system-level `Role` enum (`USER` / `ADMIN`) and the `User.role` field.

Platform-admin gating now consolidates onto `platform_members` + `PlatformRole.PLATFORM_ADMIN`. Consumers that read `user.role` must migrate to `user.platformMembership?.platformRole === 'PLATFORM_ADMIN'`.

Adds `Permission.PLATFORM_MANAGE_SUBSCRIPTIONS` (mapped to `PLATFORM_ADMIN`) as the new gate for subscription/invoice admin actions previously protected by `@Roles('ADMIN')`.
