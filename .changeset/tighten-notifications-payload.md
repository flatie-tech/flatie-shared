---
'@flatie/shared': minor
---

Tighten `notificationResponseSchema.data` from `z.record(z.string(), z.unknown())` to a union of per-notification-type payload schemas. Each `NotificationType` now maps to a concrete `data` shape (e.g. `NOTICE_CREATED` -> `{ title, content, createdAt, isPinned, actionUrl, ... }`, `CHAT_MESSAGE` -> `{ senderName, messagePreview, conversationId, actionUrl, ... }`). Shared fields (`entityType`, `entityId`, `actorId`, `actorName`, `actionUrl`) are typed on a common base. The notification `type` field itself is now a `z.enum` of `NotificationType` values instead of an open `z.string()`. Exports `notificationDataSchema`, `getNotificationDataSchema(type)`, and the `NotificationData` type for consumers who want to narrow. Existing callers that read `data?.actionUrl` are unaffected.
