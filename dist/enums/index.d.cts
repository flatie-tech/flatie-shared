export { A as ApprovalStatus, B as BuildingType, C as CommonStatus, F as FailureStatus, a as FailureType, b as FileCategory, c as Frequency, P as PollType, d as Priority, T as TransactionCategory, e as TransactionType } from '../status.enum-POCdxmgc.cjs';
export { E as EntityLinkType, L as LinkableEntityType } from '../entity-link.enum-D2At-V8D.cjs';
export { C as CO_OWNER_VISIBLE_SYSTEM_TYPES, D as DevicePlatform, a as NOTIFICATION_TYPE_CATEGORY, b as NotificationCategory, c as NotificationChannel, d as NotificationDeliveryStatus, N as NotificationType, R as RESIDENT_VISIBLE_SYSTEM_TYPES, U as UNIMPLEMENTED_NOTIFICATION_TYPES, W as WASTE_SUBTYPE_NOTIFICATION_MAP } from '../notification.enum-C1IHyJHj.cjs';
export { A as APPROVE_PERMISSIONS, B as BUILDING_ROLE_RANK, e as BuildingRole, O as ORG_ROLE_RANK, i as OrgRole, j as PLATFORM_ROLE_RANK, P as Permission, k as PlatformRole, S as SCOPED_DOMAINS, a as SCOPED_PERMISSIONS, b as ScopedAction, c as ScopedDomain, f as canAssignOrgRole, g as canAssignPlatformRole, h as canAssignRole, d as domainPermissions } from '../role.enum-DoYck3g6.cjs';
export { B as BuildingFeatureSettingKey, b as PLATFORM_FEATURES, a as PLATFORM_FEATURE_META, c as PlatformFeature, P as PlatformFeatureMeta, g as getBuildingFeatureDefault } from '../platform-feature.enum-6TI7valI.cjs';

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

/**
 * GDPR data-subject-access-request (DSAR) handling.
 *
 * Flatie's DPO works these from the platform console; before that they lived
 * as uncommitted markdown files (see flatie-backend/docs/runbooks/dsar.md).
 */
/** The right the data subject is exercising (GDPR Arts. 15–21). */
declare const DsarRequestType: {
    /** Art. 15 — access / copy of the data held. */
    readonly ACCESS: "access";
    /** Art. 16 — correction of inaccurate data. */
    readonly RECTIFICATION: "rectification";
    /** Art. 17 — erasure ("right to be forgotten"). */
    readonly ERASURE: "erasure";
    /** Art. 18 — restriction of processing. */
    readonly RESTRICTION: "restriction";
    /** Art. 20 — machine-readable export for transfer elsewhere. */
    readonly PORTABILITY: "portability";
    /** Art. 21 — objection to processing. */
    readonly OBJECTION: "objection";
};
type DsarRequestType = (typeof DsarRequestType)[keyof typeof DsarRequestType];
declare const DsarRequestStatus: {
    readonly RECEIVED: "received";
    readonly IN_PROGRESS: "in_progress";
    /** Blocked on the subject — e.g. awaiting identity verification. */
    readonly AWAITING_SUBJECT: "awaiting_subject";
    readonly FULFILLED: "fulfilled";
    /** Lawfully refused (Art. 12(5)) — the reason belongs in the resolution note. */
    readonly REFUSED: "refused";
    readonly CANCELLED: "cancelled";
};
type DsarRequestStatus = (typeof DsarRequestStatus)[keyof typeof DsarRequestStatus];
/** Statuses that close a request and stop the SLA clock. */
declare const DSAR_CLOSED_STATUSES: readonly DsarRequestStatus[];
/** Art. 12(3) — one month to respond. */
declare const DSAR_SLA_DAYS = 30;
/** Art. 12(3) allows a further two months for complex requests. */
declare const DSAR_MAX_EXTENSION_DAYS = 60;
/**
 * How long a CLOSED request is retained before the nightly sweep purges it.
 * Basis: Art. 5(2) accountability + the limitation period for legal claims.
 */
declare const DSAR_RETENTION_YEARS = 3;

/**
 * Pričuva collections ("naplata") — the dunning ladder a manager walks
 * when a co-owner falls behind: reminder → final notice → hand-over to
 * enforcement (ovrha). Modelled on Croatian upravitelj practice under
 * ZUOZ (NN 152/2024) čl. 52 t. 10–11: the manager collects the pričuva,
 * notifies the representative and, if needed, pursues enforcement of
 * overdue instalments.
 *
 * Levels are the letters that leave the system. Anything after
 * `final_notice` (the ovrha itself) is tracked as a case status, not a
 * letter — Flatie records that a case was handed over, it does not draft
 * enforcement filings.
 */
declare const DunningLevel: {
    /** "Opomena" — first written reminder with the outstanding balance. */
    readonly REMINDER: "reminder";
    /** "Opomena pred ovrhu" — last notice before enforcement, with default interest. */
    readonly FINAL_NOTICE: "final_notice";
};
type DunningLevel = (typeof DunningLevel)[keyof typeof DunningLevel];
/**
 * A case is one owner's open collection thread on one building. At most
 * one case is `open` per owner; it closes when the balance is settled or
 * the manager decides the debt is uncollectible.
 */
declare const DunningCaseStatus: {
    readonly OPEN: "open";
    /** Balance reached zero (or credit) — closed automatically by the nightly sweep. */
    readonly SETTLED: "settled";
    /** Handed to a lawyer / notary / court for ovrha; the enforcement reference is kept. */
    readonly HANDED_TO_ENFORCEMENT: "handed_to_enforcement";
    /** Manager decided not to pursue. The arrears stay on the ledger; only the case closes. */
    readonly WRITTEN_OFF: "written_off";
};
type DunningCaseStatus = (typeof DunningCaseStatus)[keyof typeof DunningCaseStatus];
/** Case statuses that terminate the thread. */
declare const DUNNING_CLOSED_STATUSES: ReadonlySet<DunningCaseStatus>;

/**
 * Lifecycle of an inbound "request enterprise pricing" lead.
 *
 * Before this existed the request was only an email to info@flatie.hr, so
 * there was no queue, no dedupe and no way to tell a fulfilled request from a
 * forgotten one.
 */
declare const EnterpriseRequestStatus: {
    readonly OPEN: "open";
    readonly CONTACTED: "contacted";
    /** A negotiated subscription price has been set for the entity. */
    readonly FULFILLED: "fulfilled";
    readonly DISMISSED: "dismissed";
};
type EnterpriseRequestStatus = (typeof EnterpriseRequestStatus)[keyof typeof EnterpriseRequestStatus];

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
 * Who paid for the repair — "financirano od" on the report.
 *
 * Bookkeeping only: recording `pricuva` here does NOT move money or create a
 * fund transaction, it just says where the money came from so residents can
 * read the record. Fund movements live in expense_transactions.
 */
declare const FailureFundingSource: {
    /** Building reserve fund (pričuva). */
    readonly PRICUVA: "pricuva";
    /** Covered by an insurance claim (osiguranje). */
    readonly OSIGURANJE: "osiguranje";
    /** Paid by an individual co-owner (suvlasnik). */
    readonly SUVLASNIK: "suvlasnik";
    /** Anything else (ostalo). */
    readonly OSTALO: "ostalo";
};
type FailureFundingSource = (typeof FailureFundingSource)[keyof typeof FailureFundingSource];

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
    readonly ID_CARD_VERIFIED: "id_card_verified";
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

/**
 * How strongly a voter's account is verified — the ladder a building's
 * `minVotingStrengthForConsensus` floor is measured against.
 *
 * Distinct from {@link VerificationTier}: strength is about the *account*
 * (contact + identity confirmation a co-owner has completed), not about the
 * evidence attached to a single ballot. Rep-recorded paper votes sit outside
 * this ladder entirely — they are attested by the representative and are never
 * gated by the floor.
 *
 * Numeric with gaps so future rungs (declared OIB, ID-card number, …) can slot
 * between existing ones without renumbering. Stored as a smallint, compared
 * with `>=`.
 */
declare const VotingStrength: {
    /** No verified contact — cannot vote online. */
    readonly NONE: 0;
    /** Verified e-mail address (the default floor — every active account). */
    readonly EMAIL: 10;
    /** Verified e-mail + rep-approved ID-card number (broj osobne iskaznice). */
    readonly ID_CARD: 15;
    /** Verified e-mail + SMS-verified mobile number. */
    readonly PHONE: 20;
    /** eID / qualified electronic signature (Certilia-verified account). */
    readonly EID: 30;
};
type VotingStrength = (typeof VotingStrength)[keyof typeof VotingStrength];
/**
 * Derive a user's current voting strength from account state.
 *
 * `verificationTier` is the user's durable {@link VerificationTier}; only
 * QUALIFIED (eID) raises strength above the contact rungs. ID_CARD sits
 * between EMAIL and PHONE — a rep-approved ID-card number that proves the
 * voter's identity without requiring phone verification or eID.
 */
declare function deriveVotingStrength(user: {
    emailVerified?: boolean | null;
    phoneVerified?: boolean | null;
    idCardVerified?: boolean | null;
    verificationTier?: number | null;
}): VotingStrength;

export { BoardVisibility, BuildingOtpExpiry, BuildingStatus, DSAR_CLOSED_STATUSES, DSAR_MAX_EXTENSION_DAYS, DSAR_RETENTION_YEARS, DSAR_SLA_DAYS, DUNNING_CLOSED_STATUSES, DsarRequestStatus, DsarRequestType, DunningCaseStatus, DunningLevel, EnterpriseRequestStatus, FailureFundingSource, FailureLocationType, FailureUnitType, FundsSource, IdentityVerificationMethod, JoinRequestStatus, OrgStatus, OrgType, POLL_CANNOT_VOTE_REASON_KEY, PollCannotVoteReason, PollStatus, PollVoteStatus, PricuvaRefMode, TransactionSource, UnitType, VerificationTier, VotingStrength, deriveVotingStrength, methodToTier };
