export const NotificationType = {
  NOTICE_CREATED: 'notice_created',
  NOTICE_APPROVED: 'notice_approved',
  NOTICE_REJECTED: 'notice_rejected',

  POLL_CREATED: 'poll_created',
  POLL_DEADLINE_24H: 'poll_deadline_24h',
  POLL_DEADLINE_1H: 'poll_deadline_1h',
  POLL_FINALIZED: 'poll_finalized',

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
