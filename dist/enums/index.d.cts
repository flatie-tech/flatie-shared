export { B as BuildingType, P as PollType } from '../poll-type.enum-Cz_42Pj9.cjs';
export { A as APPROVE_PERMISSIONS, f as BUILDING_ROLE_RANK, B as BuildingRole, j as ORG_ROLE_RANK, O as OrgRole, k as PLATFORM_ROLE_RANK, P as Permission, a as PlatformRole, R as Role, c as SCOPED_DOMAINS, e as SCOPED_PERMISSIONS, b as ScopedAction, S as ScopedDomain, g as canAssignOrgRole, h as canAssignPlatformRole, i as canAssignRole, d as domainPermissions } from '../role.enum-Cr_Ex5DH.cjs';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from '../status.enum-D4pAcU1b.cjs';

declare const ApartmentRole: {
    readonly OWNER: "OWNER";
    readonly TENANT: "TENANT";
};
type ApartmentRole = (typeof ApartmentRole)[keyof typeof ApartmentRole];

declare const BuildingStatus: {
    readonly PENDING_APPROVAL: "PENDING_APPROVAL";
    readonly ACTIVE: "ACTIVE";
    readonly REJECTED: "REJECTED";
};
type BuildingStatus = (typeof BuildingStatus)[keyof typeof BuildingStatus];
declare const OrgStatus: {
    readonly PENDING_APPROVAL: "PENDING_APPROVAL";
    readonly ACTIVE: "ACTIVE";
    readonly REJECTED: "REJECTED";
};
type OrgStatus = (typeof OrgStatus)[keyof typeof OrgStatus];

declare const FailureLocationType: {
    readonly COMMON_AREA: "common_area";
    readonly OWN_UNIT: "own_unit";
};
type FailureLocationType = (typeof FailureLocationType)[keyof typeof FailureLocationType];
declare const FailureUnitType: {
    readonly APARTMENT: "apartment";
    readonly GARAGE: "garage";
    readonly STORAGE_UNIT: "storage_unit";
};
type FailureUnitType = (typeof FailureUnitType)[keyof typeof FailureUnitType];

/**
 * How a building's fund transactions are populated.
 *
 * - `MANUAL` — representatives record income/expense by hand through the
 *   regular funds UI. Default for all new buildings.
 * - `CAMT` — funds are ingested from the bank's CAMT.053 XML statements
 *   by a platform admin; manual add/edit endpoints return 403 while the
 *   building is in this mode. Switching back to `MANUAL` is allowed and
 *   leaves prior CAMT-sourced rows intact.
 */
declare const FundsSource: {
    readonly MANUAL: "manual";
    readonly CAMT: "camt";
};
type FundsSource = (typeof FundsSource)[keyof typeof FundsSource];
/**
 * Per-row provenance on income/expense transactions. Mirrors
 * `FundsSource` but is applied at the transaction level so the UI can
 * render a source badge and so CAMT re-imports can dedupe against
 * `bankRef`.
 */
declare const TransactionSource: {
    readonly MANUAL: "manual";
    readonly CAMT: "camt";
};
type TransactionSource = (typeof TransactionSource)[keyof typeof TransactionSource];

declare const MaintenanceLogFinancedBy: {
    readonly BUILDING_FUNDS: "building_funds";
    readonly INSURANCE: "insurance";
    readonly CO_OWNER: "co_owner";
};
type MaintenanceLogFinancedBy = (typeof MaintenanceLogFinancedBy)[keyof typeof MaintenanceLogFinancedBy];

declare const NotificationType: {
    readonly NOTICE_CREATED: "notice_created";
    readonly NOTICE_APPROVED: "notice_approved";
    readonly NOTICE_REJECTED: "notice_rejected";
    readonly POLL_CREATED: "poll_created";
    readonly POLL_DEADLINE_24H: "poll_deadline_24h";
    readonly POLL_DEADLINE_1H: "poll_deadline_1h";
    readonly POLL_FINALIZED: "poll_finalized";
    readonly EVENT_CREATED: "event_created";
    readonly EVENT_REMINDER_24H: "event_reminder_24h";
    readonly EVENT_REMINDER_1H: "event_reminder_1h";
    readonly EVENT_UPDATED: "event_updated";
    readonly EVENT_CANCELLED: "event_cancelled";
    readonly WASTE_REMINDER_MIXED: "waste_reminder_mixed";
    readonly WASTE_REMINDER_BIO: "waste_reminder_bio";
    readonly WASTE_REMINDER_PLASTIC_METAL: "waste_reminder_plastic_metal";
    readonly WASTE_REMINDER_PAPER_CARDBOARD: "waste_reminder_paper_cardboard";
    readonly FAILURE_REPORT_CREATED: "failure_report_created";
    readonly FAILURE_REPORT_STATUS_CHANGED: "failure_report_status_changed";
    readonly FAILURE_REPORT_RESOLVED: "failure_report_resolved";
    readonly MAINTENANCE_LOG_CREATED: "maintenance_log_created";
    readonly PAYMENT_DUE: "payment_due";
    readonly PAYMENT_RECEIVED: "payment_received";
    readonly BUILDING_JOIN_REQUEST_RECEIVED: "building_join_request_received";
    readonly BUILDING_JOIN_REQUEST_APPROVED: "building_join_request_approved";
    readonly BUILDING_JOIN_REQUEST_REJECTED: "building_join_request_rejected";
    readonly BUILDING_MEMBER_JOINED: "building_member_joined";
    readonly BUILDING_ROLE_CHANGED: "building_role_changed";
    readonly BUILDING_PENDING_APPROVAL: "building_pending_approval";
    readonly BUILDING_APPROVED: "building_approved";
    readonly BUILDING_REJECTED: "building_rejected";
    readonly CHAT_MESSAGE: "chat_message";
    readonly SYSTEM_ANNOUNCEMENT: "system_announcement";
};
type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
declare const NotificationCategory: {
    readonly NOTICES: "notices";
    readonly POLLS: "polls";
    readonly EVENTS: "events";
    readonly WASTE: "waste";
    readonly MAINTENANCE: "maintenance";
    readonly FINANCIAL: "financial";
    readonly CHAT: "chat";
    readonly SYSTEM: "system";
};
type NotificationCategory = (typeof NotificationCategory)[keyof typeof NotificationCategory];
declare const NotificationChannel: {
    readonly IN_APP: "in_app";
    readonly PUSH: "push";
    readonly EMAIL: "email";
    readonly SMS: "sms";
};
type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
declare const NotificationDeliveryStatus: {
    readonly PENDING: "pending";
    readonly SENT: "sent";
    readonly DELIVERED: "delivered";
    readonly FAILED: "failed";
};
type NotificationDeliveryStatus = (typeof NotificationDeliveryStatus)[keyof typeof NotificationDeliveryStatus];
declare const DevicePlatform: {
    readonly IOS: "ios";
    readonly ANDROID: "android";
    readonly WEB: "web";
};
type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform];
/**
 * Maps each notification type to its category.
 *
 * Used by client UIs to group notification preferences and by the backend to
 * route notifications to the right delivery channels per category.
 */
declare const NOTIFICATION_TYPE_CATEGORY: Record<NotificationType, NotificationCategory>;
/**
 * Notification types not yet implemented (no emit calls in the codebase).
 * UI layers hide these from user preferences until their triggers are built.
 */
declare const UNIMPLEMENTED_NOTIFICATION_TYPES: ReadonlySet<NotificationType>;
/**
 * Maps waste-collection subtype keys to the corresponding notification type.
 * Used by the backend scheduler; exposed here so clients can match
 * incoming events to UI strings.
 */
declare const WASTE_SUBTYPE_NOTIFICATION_MAP: Record<string, NotificationType>;

declare const OrgType: {
    readonly MANAGEMENT_FIRM: "MANAGEMENT_FIRM";
    readonly PLATFORM: "PLATFORM";
};
type OrgType = (typeof OrgType)[keyof typeof OrgType];

declare const PollStatus: {
    readonly ACTIVE: "active";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];

export { ApartmentRole, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, FundsSource, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, OrgStatus, OrgType, PollStatus, TransactionSource, UNIMPLEMENTED_NOTIFICATION_TYPES, WASTE_SUBTYPE_NOTIFICATION_MAP };
