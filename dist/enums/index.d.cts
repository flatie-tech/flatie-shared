export { A as ApartmentRole } from '../apartment-role.enum-CNJsuYgq.cjs';
export { B as BuildingType, P as PollType } from '../poll-type.enum-CGV5tBqR.cjs';
export { E as EntityLinkType, L as LinkableEntityType } from '../entity-link.enum-BYEzMg8A.cjs';
export { A as APPROVE_PERMISSIONS, B as BUILDING_ROLE_RANK, e as BuildingRole, O as ORG_ROLE_RANK, i as OrgRole, j as PLATFORM_ROLE_RANK, P as Permission, k as PlatformRole, S as SCOPED_DOMAINS, a as SCOPED_PERMISSIONS, b as ScopedAction, c as ScopedDomain, f as canAssignOrgRole, g as canAssignPlatformRole, h as canAssignRole, d as domainPermissions } from '../role.enum-MLM2GI6q.cjs';
export { A as ApprovalStatus, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, M as MaintenanceStatus, d as MaintenanceType, P as Priority, T as TransactionCategory, e as TransactionType } from '../status.enum-BYlt7_Fs.cjs';

/**
 * Who can see a board. `building` = every member with `board_card:read`
 * (co-owners and up); `representatives` = a private board only members with
 * `board_card:manage` can see — co-owners never learn it exists.
 */
declare const BoardVisibility: {
    readonly BUILDING: "building";
    readonly REPRESENTATIVES: "representatives";
};
type BoardVisibility = (typeof BoardVisibility)[keyof typeof BoardVisibility];

declare const BuildingOtpExpiry: {
    readonly ONE_HOUR: "1_hour";
    readonly ONE_DAY: "1_day";
    readonly SEVEN_DAYS: "7_days";
    readonly NEVER: "never";
};
type BuildingOtpExpiry = (typeof BuildingOtpExpiry)[keyof typeof BuildingOtpExpiry];

declare const BuildingStatus: {
    readonly PENDING_APPROVAL: "pending_approval";
    readonly ACTIVE: "active";
    readonly REJECTED: "rejected";
};
type BuildingStatus = (typeof BuildingStatus)[keyof typeof BuildingStatus];
declare const OrgStatus: {
    readonly PENDING_APPROVAL: "pending_approval";
    readonly ACTIVE: "active";
    readonly REJECTED: "rejected";
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

declare const IdentityVerificationMethod: {
    readonly PRINTED_SIGNATURE: "printed_signature";
    readonly CERTILIA: "certilia";
    readonly KYC_VENDOR: "kyc_vendor";
    readonly OIB_SELF_DECLARED: "oib_self_declared";
};
type IdentityVerificationMethod = (typeof IdentityVerificationMethod)[keyof typeof IdentityVerificationMethod];
/**
 * Durable per-user identity assurance level. Numeric ordinals so building
 * policy can compare with `>=` and the value stores as a smallint.
 *
 * Grounded in Croatian ZUOZ (NN 152/2024) Čl. 40, which accepts consent
 * "with proof of identity OR a qualified electronic signature":
 *  - IDENTITY (2) satisfies the "dokaz identiteta" limb,
 *  - QUALIFIED (3) is the eID/QES limb.
 */
declare const VerificationTier: {
    /** Account exists, email verified. No identity claim. */
    readonly UNVERIFIED: 0;
    /** OIB self-declared, checksum-valid, unique. Data quality only. */
    readonly OIB: 1;
    /** One-time identity proof (KYC doc+liveness, bank-level, or rep-attested signature). */
    readonly IDENTITY: 2;
    /** eID / qualified electronic signature (Certilia). Legally binding equivalence. */
    readonly QUALIFIED: 3;
};
type VerificationTier = (typeof VerificationTier)[keyof typeof VerificationTier];
/** Map a verification method to the durable tier it confers. */
declare function methodToTier(method: IdentityVerificationMethod): VerificationTier;

declare const JoinRequestStatus: {
    readonly PENDING: "pending";
    readonly APPROVED: "approved";
    readonly REJECTED: "rejected";
};
type JoinRequestStatus = (typeof JoinRequestStatus)[keyof typeof JoinRequestStatus];

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
    readonly POLL_VOTE_SIGNATURE_PENDING: "poll_vote_signature_pending";
    readonly POLL_VOTE_SIGNATURE_APPROVED: "poll_vote_signature_approved";
    readonly POLL_VOTE_SIGNATURE_REJECTED: "poll_vote_signature_rejected";
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
    readonly MANAGEMENT_FIRM: "management_firm";
    readonly PLATFORM: "platform";
};
type OrgType = (typeof OrgType)[keyof typeof OrgType];

/**
 * Machine-readable reason the calling user cannot vote on a poll. Returned
 * alongside `canVote: false` so the client can show a specific "why" (a locked
 * icon + tooltip) instead of a generic "not eligible" message.
 *
 * Ordering note (backend emits the first matching reason): most-final first, so
 * a voter sees the least-actionable blocker last.
 */
declare const PollCannotVoteReason: {
    /** Already cast a ballot on this poll. */
    readonly ALREADY_VOTED: "ALREADY_VOTED";
    /** Poll is completed/cancelled or its deadline has passed. */
    readonly POLL_ENDED: "POLL_ENDED";
    /** Poll has not been approved by a representative yet. */
    readonly NOT_APPROVED: "NOT_APPROVED";
    /** Caller's role does not include `poll:vote`. */
    readonly NO_VOTE_PERMISSION: "NO_VOTE_PERMISSION";
    /** Caller reaches the building only via org/platform admin access — no co-owner membership here. */
    readonly NON_VOTER_CONTEXT: "NON_VOTER_CONTEXT";
    /** Not in the poll's scoped-user list, or zero ownership surface on a building-wide consensus poll. */
    readonly NOT_ELIGIBLE_SCOPE: "NOT_ELIGIBLE_SCOPE";
    /** Consensus poll needs the user's OIB on file first (resolved in-flow via a dialog). */
    readonly NEEDS_OIB: "NEEDS_OIB";
    /** Building requires a higher verification tier than the caller can currently reach. */
    readonly NEEDS_IDENTITY: "NEEDS_IDENTITY";
};
type PollCannotVoteReason = (typeof PollCannotVoteReason)[keyof typeof PollCannotVoteReason];
/**
 * Reason → i18n key suffix. Web reads `Polls.cannotVoteReason.<suffix>` (next-intl),
 * mobile reads `polls.cannotVoteReason.<suffix>` (i18next). Owning the suffixes here
 * guarantees both apps use identical key names, and a new reason is a type error
 * until this map handles it.
 */
declare const POLL_CANNOT_VOTE_REASON_KEY: Record<PollCannotVoteReason, string>;

declare const PollStatus: {
    readonly ACTIVE: "active";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
type PollStatus = (typeof PollStatus)[keyof typeof PollStatus];

declare const PollVoteStatus: {
    readonly ACCEPTED: "accepted";
    readonly PENDING_SIGNATURE_REVIEW: "pending_signature_review";
    readonly REJECTED: "rejected";
};
type PollVoteStatus = (typeof PollVoteStatus)[keyof typeof PollVoteStatus];

/**
 * How the building expects co-owners to address their pričuva payments
 * in the HR01 poziv-na-broj reference.
 *
 * - `apartment`: the middle reference segment is the apartment's
 *   `paymentRefCode` (e.g. `015-001-202604`). All co-owners of the
 *   apartment are credited proportionally to their ownership share.
 * - `owner`: the middle segment is the co-owner's own `paymentRefCode`
 *   on the building (e.g. `015-001-202604` where `001` is Ivan
 *   Horvat). Payments are credited directly to that owner.
 *
 * The mode is a per-building choice set by the representative; CAMT
 * imports branch on it when matching references to units or owners.
 */
declare const PricuvaRefMode: {
    readonly APARTMENT: "apartment";
    readonly OWNER: "owner";
};
type PricuvaRefMode = (typeof PricuvaRefMode)[keyof typeof PricuvaRefMode];

declare const QuotaResourceType: {
    readonly COMMENT: "comment";
    readonly MAINTENANCE_REQUEST: "maintenance_request";
    readonly INVITE: "invite";
    readonly NOTIFICATION: "notification";
};
type QuotaResourceType = (typeof QuotaResourceType)[keyof typeof QuotaResourceType];
declare const QUOTA_RESOURCE_TYPES: readonly QuotaResourceType[];
declare const QUOTA_DEFAULT_DAILY_LIMITS: Record<QuotaResourceType, number | null>;
declare const OrgQuotaResourceType: {
    readonly MEMBER_INVITE: "member_invite";
    readonly BUILDING_CREATE: "building_create";
    readonly NOTIFICATION: "notification";
};
type OrgQuotaResourceType = (typeof OrgQuotaResourceType)[keyof typeof OrgQuotaResourceType];
declare const ORG_QUOTA_RESOURCE_TYPES: readonly OrgQuotaResourceType[];
declare const ORG_QUOTA_DEFAULT_DAILY_LIMITS: Record<OrgQuotaResourceType, number | null>;

/**
 * Usage classification for a physical unit (apartment, garage, or
 * storage). Drives split pričuva rates — a building can carry a
 * residential rate per m² and a commercial rate per m², and expected
 * contributions are computed per-unit against the matching rate.
 *
 * Added late; existing rows default to `residential` via backfill.
 */
declare const UnitType: {
    readonly RESIDENTIAL: "residential";
    readonly COMMERCIAL: "commercial";
};
type UnitType = (typeof UnitType)[keyof typeof UnitType];

export { BoardVisibility, BuildingOtpExpiry, BuildingStatus, DevicePlatform, FailureLocationType, FailureUnitType, FundsSource, IdentityVerificationMethod, JoinRequestStatus, MaintenanceLogFinancedBy, NOTIFICATION_TYPE_CATEGORY, NotificationCategory, NotificationChannel, NotificationDeliveryStatus, NotificationType, ORG_QUOTA_DEFAULT_DAILY_LIMITS, ORG_QUOTA_RESOURCE_TYPES, OrgQuotaResourceType, OrgStatus, OrgType, POLL_CANNOT_VOTE_REASON_KEY, PollCannotVoteReason, PollStatus, PollVoteStatus, PricuvaRefMode, QUOTA_DEFAULT_DAILY_LIMITS, QUOTA_RESOURCE_TYPES, QuotaResourceType, TransactionSource, UNIMPLEMENTED_NOTIFICATION_TYPES, UnitType, VerificationTier, WASTE_SUBTYPE_NOTIFICATION_MAP, methodToTier };
