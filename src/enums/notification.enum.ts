export const NotificationType = {
  NOTICE_CREATED: 'notice_created',
  NOTICE_APPROVED: 'notice_approved',
  NOTICE_REJECTED: 'notice_rejected',

  POLL_CREATED: 'poll_created',
  POLL_DEADLINE_24H: 'poll_deadline_24h',
  POLL_DEADLINE_1H: 'poll_deadline_1h',
  POLL_FINALIZED: 'poll_finalized',
  POLL_VOTE_SIGNATURE_PENDING: 'poll_vote_signature_pending',
  POLL_VOTE_SIGNATURE_APPROVED: 'poll_vote_signature_approved',
  POLL_VOTE_SIGNATURE_REJECTED: 'poll_vote_signature_rejected',

  EVENT_CREATED: 'event_created',
  EVENT_REMINDER_24H: 'event_reminder_24h',
  EVENT_REMINDER_1H: 'event_reminder_1h',
  EVENT_UPDATED: 'event_updated',
  EVENT_CANCELLED: 'event_cancelled',

  WASTE_REMINDER_MIXED: 'waste_reminder_mixed',
  WASTE_REMINDER_BIO: 'waste_reminder_bio',
  WASTE_REMINDER_PLASTIC_METAL: 'waste_reminder_plastic_metal',
  WASTE_REMINDER_PAPER_CARDBOARD: 'waste_reminder_paper_cardboard',

  FAILURE_REPORT_CREATED: 'failure_report_created',
  FAILURE_REPORT_STATUS_CHANGED: 'failure_report_status_changed',
  FAILURE_REPORT_RESOLVED: 'failure_report_resolved',
  MAINTENANCE_LOG_CREATED: 'maintenance_log_created',

  PAYMENT_DUE: 'payment_due',
  PAYMENT_RECEIVED: 'payment_received',

  BUILDING_JOIN_REQUEST_RECEIVED: 'building_join_request_received',
  BUILDING_JOIN_REQUEST_APPROVED: 'building_join_request_approved',
  BUILDING_JOIN_REQUEST_REJECTED: 'building_join_request_rejected',
  BUILDING_MEMBER_JOINED: 'building_member_joined',
  BUILDING_ROLE_CHANGED: 'building_role_changed',
  BUILDING_PENDING_APPROVAL: 'building_pending_approval',
  BUILDING_APPROVED: 'building_approved',
  BUILDING_REJECTED: 'building_rejected',

  CHAT_MESSAGE: 'chat_message',

  SYSTEM_ANNOUNCEMENT: 'system_announcement',
} as const;

export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationCategory = {
  NOTICES: 'notices',
  POLLS: 'polls',
  EVENTS: 'events',
  WASTE: 'waste',
  MAINTENANCE: 'maintenance',
  FINANCIAL: 'financial',
  CHAT: 'chat',
  SYSTEM: 'system',
} as const;

export type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];

export const NotificationChannel = {
  IN_APP: 'in_app',
  PUSH: 'push',
  EMAIL: 'email',
  SMS: 'sms',
} as const;

export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];

export const NotificationDeliveryStatus = {
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
} as const;

export type NotificationDeliveryStatus =
  (typeof NotificationDeliveryStatus)[keyof typeof NotificationDeliveryStatus];

export const DevicePlatform = {
  IOS: 'ios',
  ANDROID: 'android',
  WEB: 'web',
} as const;

export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform];

/**
 * Maps each notification type to its category.
 *
 * Used by client UIs to group notification preferences and by the backend to
 * route notifications to the right delivery channels per category.
 */
export const NOTIFICATION_TYPE_CATEGORY: Record<NotificationType, NotificationCategory> = {
  [NotificationType.NOTICE_CREATED]: NotificationCategory.NOTICES,
  [NotificationType.NOTICE_APPROVED]: NotificationCategory.NOTICES,
  [NotificationType.NOTICE_REJECTED]: NotificationCategory.NOTICES,

  [NotificationType.POLL_CREATED]: NotificationCategory.POLLS,
  [NotificationType.POLL_DEADLINE_24H]: NotificationCategory.POLLS,
  [NotificationType.POLL_DEADLINE_1H]: NotificationCategory.POLLS,
  [NotificationType.POLL_FINALIZED]: NotificationCategory.POLLS,
  [NotificationType.POLL_VOTE_SIGNATURE_PENDING]: NotificationCategory.POLLS,
  [NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: NotificationCategory.POLLS,
  [NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: NotificationCategory.POLLS,

  [NotificationType.EVENT_CREATED]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_REMINDER_24H]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_REMINDER_1H]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_UPDATED]: NotificationCategory.EVENTS,
  [NotificationType.EVENT_CANCELLED]: NotificationCategory.EVENTS,

  [NotificationType.WASTE_REMINDER_MIXED]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_BIO]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: NotificationCategory.WASTE,
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: NotificationCategory.WASTE,

  [NotificationType.FAILURE_REPORT_CREATED]: NotificationCategory.MAINTENANCE,
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: NotificationCategory.MAINTENANCE,
  [NotificationType.FAILURE_REPORT_RESOLVED]: NotificationCategory.MAINTENANCE,
  [NotificationType.MAINTENANCE_LOG_CREATED]: NotificationCategory.MAINTENANCE,

  [NotificationType.PAYMENT_DUE]: NotificationCategory.FINANCIAL,
  [NotificationType.PAYMENT_RECEIVED]: NotificationCategory.FINANCIAL,

  [NotificationType.CHAT_MESSAGE]: NotificationCategory.CHAT,

  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_MEMBER_JOINED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_ROLE_CHANGED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_PENDING_APPROVAL]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_APPROVED]: NotificationCategory.SYSTEM,
  [NotificationType.BUILDING_REJECTED]: NotificationCategory.SYSTEM,
  [NotificationType.SYSTEM_ANNOUNCEMENT]: NotificationCategory.SYSTEM,
};

/**
 * Notification types not yet implemented (no emit calls in the codebase).
 * UI layers hide these from user preferences until their triggers are built.
 */
export const UNIMPLEMENTED_NOTIFICATION_TYPES: ReadonlySet<NotificationType> =
  new Set<NotificationType>([
    NotificationType.POLL_DEADLINE_24H,
    NotificationType.POLL_DEADLINE_1H,
    NotificationType.EVENT_REMINDER_24H,
    NotificationType.EVENT_REMINDER_1H,
    NotificationType.PAYMENT_DUE,
    NotificationType.PAYMENT_RECEIVED,
    NotificationType.SYSTEM_ANNOUNCEMENT,
  ]);

/**
 * Maps waste-collection subtype keys to the corresponding notification type.
 * Used by the backend scheduler; exposed here so clients can match
 * incoming events to UI strings.
 */
export const WASTE_SUBTYPE_NOTIFICATION_MAP: Record<string, NotificationType> = {
  mixed: NotificationType.WASTE_REMINDER_MIXED,
  bio: NotificationType.WASTE_REMINDER_BIO,
  plastic_metal: NotificationType.WASTE_REMINDER_PLASTIC_METAL,
  paper_cardboard: NotificationType.WASTE_REMINDER_PAPER_CARDBOARD,
};
