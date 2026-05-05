import { z } from 'zod';
import { NotificationType } from '../../enums/notification.enum';

/**
 * Fields merged into `data` by NotificationService#emit for every notification.
 *
 * The backend always spreads these keys before the per-type payload:
 *   - entityType / entityId: populated from the emit call (absent for chat)
 *   - actorId: populated from the emit call when the action has an actor
 *   - actorName: resolved from DB, defaults to "Someone"
 *
 * All fields are optional because individual emit sites may omit them
 * (e.g. schedulers have no actor, chat doesn't set an entity pair).
 */
const baseNotificationDataSchema = z.object({
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  actorId: z.string().uuid().optional(),
  actorName: z.string().optional(),
  actionUrl: z.string().optional(),
});

// ---------- Per-type data payload schemas ----------

const noticeCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  content: z.string(),
  createdAt: z.string().or(z.date()),
  isPinned: z.boolean().optional(),
});

const noticeApprovedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
});

const noticeRejectedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
});

const pollCreatedDataSchema = baseNotificationDataSchema.extend({
  question: z.string(),
  pollType: z.string(),
  deadline: z.string().or(z.date()).nullable().optional(),
  options: z.array(z.string()),
});

const pollFinalizedDataSchema = baseNotificationDataSchema.extend({
  question: z.string(),
  pollType: z.string(),
  options: z.array(z.string()),
});

const eventCreatedOrUpdatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  eventType: z.string().nullable().optional(),
  subtype: z.string().nullable().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional(),
  color: z.string().nullable().optional(),
});

const eventCancelledDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  eventType: z.string().nullable().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional(),
});

const wasteReminderDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  wasteTypeLabel: z.string(),
  subtype: z.string(),
  startDate: z.string().or(z.date()),
});

const failureReportCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
});

const failureReportStatusDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  status: z.string(),
  description: z.string().nullable().optional(),
});

const maintenanceLogCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  contractor: z.string().nullable().optional(),
  // `cost` comes from a Postgres DECIMAL, which drizzle serializes as string.
  cost: z.union([z.string(), z.number()]).nullable().optional(),
});

const buildingJoinRequestReceivedDataSchema = baseNotificationDataSchema.extend({
  userName: z.string(),
  userEmail: z.string(),
  message: z.string().nullable().optional(),
});

const buildingJoinRequestDecidedDataSchema = baseNotificationDataSchema.extend({
  rejectionReason: z.string().nullable().optional(),
});

const buildingMemberJoinedDataSchema = baseNotificationDataSchema;

const buildingRoleChangedDataSchema = baseNotificationDataSchema.extend({
  role: z.string(),
});

const buildingPendingApprovalDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string(),
});

const buildingApprovedDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string(),
});

const buildingRejectedDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string(),
  rejectionReason: z.string(),
});

const chatMessageDataSchema = baseNotificationDataSchema.extend({
  senderName: z.string(),
  messagePreview: z.string(),
  conversationId: z.string().uuid(),
});

/**
 * Unimplemented notification types (no emit sites yet) — shape will be
 * locked down when the triggers ship. Until then we accept the base shape.
 * See UNIMPLEMENTED_NOTIFICATION_TYPES in enums/notification.enum.ts.
 */
const unimplementedDataSchema = baseNotificationDataSchema;

/**
 * Maps each notification type to its `data` payload schema.
 *
 * Sourced from backend emit sites (NotificationService#emit callers in
 * flatie-backend `src/modules/**`). The service prepends `entityType`,
 * `entityId`, `actorId`, and `actorName` to every payload before insert.
 */
const notificationDataSchemaByType = {
  [NotificationType.NOTICE_CREATED]: noticeCreatedDataSchema,
  [NotificationType.NOTICE_APPROVED]: noticeApprovedDataSchema,
  [NotificationType.NOTICE_REJECTED]: noticeRejectedDataSchema,

  [NotificationType.POLL_CREATED]: pollCreatedDataSchema,
  [NotificationType.POLL_DEADLINE_24H]: unimplementedDataSchema,
  [NotificationType.POLL_DEADLINE_1H]: unimplementedDataSchema,
  [NotificationType.POLL_FINALIZED]: pollFinalizedDataSchema,
  [NotificationType.POLL_VOTE_SIGNATURE_PENDING]: unimplementedDataSchema,
  [NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: unimplementedDataSchema,
  [NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: unimplementedDataSchema,

  [NotificationType.EVENT_CREATED]: eventCreatedOrUpdatedDataSchema,
  [NotificationType.EVENT_UPDATED]: eventCreatedOrUpdatedDataSchema,
  [NotificationType.EVENT_CANCELLED]: eventCancelledDataSchema,
  [NotificationType.EVENT_REMINDER_24H]: unimplementedDataSchema,
  [NotificationType.EVENT_REMINDER_1H]: unimplementedDataSchema,

  [NotificationType.WASTE_REMINDER_MIXED]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_BIO]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: wasteReminderDataSchema,

  [NotificationType.FAILURE_REPORT_CREATED]: failureReportCreatedDataSchema,
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: failureReportStatusDataSchema,
  [NotificationType.FAILURE_REPORT_RESOLVED]: failureReportStatusDataSchema,
  [NotificationType.MAINTENANCE_LOG_CREATED]: maintenanceLogCreatedDataSchema,

  [NotificationType.PAYMENT_DUE]: unimplementedDataSchema,
  [NotificationType.PAYMENT_RECEIVED]: unimplementedDataSchema,

  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: buildingJoinRequestReceivedDataSchema,
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: buildingJoinRequestDecidedDataSchema,
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: buildingJoinRequestDecidedDataSchema,
  [NotificationType.BUILDING_MEMBER_JOINED]: buildingMemberJoinedDataSchema,
  [NotificationType.BUILDING_ROLE_CHANGED]: buildingRoleChangedDataSchema,
  [NotificationType.BUILDING_PENDING_APPROVAL]: buildingPendingApprovalDataSchema,
  [NotificationType.BUILDING_APPROVED]: buildingApprovedDataSchema,
  [NotificationType.BUILDING_REJECTED]: buildingRejectedDataSchema,

  [NotificationType.CHAT_MESSAGE]: chatMessageDataSchema,

  [NotificationType.SYSTEM_ANNOUNCEMENT]: unimplementedDataSchema,
} as const satisfies Record<NotificationType, z.ZodType>;

/**
 * Union of all notification-type data payloads. Each variant is the
 * per-type object plus the shared base fields (actionUrl, entity*, actor*).
 *
 * Payloads are not discriminated internally — callers discriminate on the
 * parent `type` field or, when not narrowing, read only shared keys like
 * `actionUrl` which are present on the base schema.
 */
export const notificationDataSchema = z.union([
  noticeCreatedDataSchema,
  noticeApprovedDataSchema,
  noticeRejectedDataSchema,
  pollCreatedDataSchema,
  pollFinalizedDataSchema,
  eventCreatedOrUpdatedDataSchema,
  eventCancelledDataSchema,
  wasteReminderDataSchema,
  failureReportCreatedDataSchema,
  failureReportStatusDataSchema,
  maintenanceLogCreatedDataSchema,
  buildingJoinRequestReceivedDataSchema,
  buildingJoinRequestDecidedDataSchema,
  buildingMemberJoinedDataSchema,
  buildingRoleChangedDataSchema,
  buildingPendingApprovalDataSchema,
  buildingApprovedDataSchema,
  buildingRejectedDataSchema,
  chatMessageDataSchema,
  unimplementedDataSchema,
]);

const notificationTypeValues = Object.values(NotificationType) as [
  NotificationType,
  ...NotificationType[],
];

export const notificationResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z
    .string()
    .describe('Localized notification title shown in the UI list and push notification.'),
  body: z.string().describe('Localized notification body — one or two short sentences.'),
  type: z
    .enum(notificationTypeValues)
    .describe(
      'Discriminator for the notification subtype. Determines which per-type schema governs `data` — see `getNotificationDataSchema(type)`.',
    ),
  buildingId: z
    .string()
    .uuid()
    .nullable()
    .optional()
    .describe(
      'UUID of the related building. Null for cross-building notifications (system announcements, chat DMs).',
    ),
  buildingName: z
    .string()
    .nullable()
    .optional()
    .describe(
      'Denormalized building display name for convenience. Null when `buildingId` is null.',
    ),
  data: notificationDataSchema
    .nullable()
    .optional()
    .describe(
      'Per-type payload. Shape depends on the `type` field; use `getNotificationDataSchema(type).parse(data)` to narrow.',
    ),
  read: z.boolean().describe('True once the user has opened this notification.'),
  readAt: z
    .string()
    .nullable()
    .optional()
    .describe('ISO-8601 timestamp of the first read. Null while unread.'),
  createdAt: z.string(),
});

export const notificationPreferenceItemSchema = z.looseObject({
  type: z
    .string()
    .describe('Notification type identifier (maps to a value in `NotificationType`).'),
  description: z.string().describe('Human-readable description of what this notification signals.'),
  enabled: z.boolean().describe('Whether the user has this notification type turned on.'),
  channels: z
    .array(z.string())
    .describe('Enabled delivery channels for this type: subset of `push`, `email`, `in_app`.'),
});

export const notificationPreferenceCategorySchema = z.looseObject({
  category: z.string().describe('Category grouping (e.g. `building`, `financial`, `social`).'),
  notifications: z
    .array(notificationPreferenceItemSchema)
    .describe(
      'Items belonging to this category; each represents one toggleable notification type.',
    ),
});

/**
 * Look up the data payload schema for a specific notification type.
 *
 * Useful for consumers that know the concrete type and want to parse
 * `notification.data` into a narrowed shape (e.g. push-notification handlers
 * that branch on `type`).
 */
export const getNotificationDataSchema = <T extends NotificationType>(
  type: T,
): (typeof notificationDataSchemaByType)[T] => notificationDataSchemaByType[type];

export type NotificationData = z.infer<typeof notificationDataSchema>;
export type NotificationResponse = z.infer<typeof notificationResponseSchema>;
export type NotificationPreferenceItem = z.infer<typeof notificationPreferenceItemSchema>;
export type NotificationPreferenceCategory = z.infer<typeof notificationPreferenceCategorySchema>;
