import { B as BuildingType, P as PollType } from '../poll-type.enum-CGV5tBqR.js';
import { e as BuildingRole, P as Permission, i as OrgRole, k as PlatformRole } from '../role.enum-MLM2GI6q.js';
import { z } from 'zod';
import { g as eventTypeSchema, f as eventColorSchema, r as recurrenceTypeSchema, o as maintenanceFinancedBySchema, D as votePollSchema } from '../poll.schema-BAh4dUAo.js';
import { F as FailureStatus, e as TransactionType, T as TransactionCategory, C as CommonStatus } from '../status.enum-BYlt7_Fs.js';
export { C as CursorPaginatedResponse, D as DateRangeParams, P as PaginatedResponse, a as PaginationParams, c as createPaginatedResponse } from '../pagination.types-BdLhL-Jg.js';

/**
 * Base entity with common fields for all database entities
 */
interface BaseEntity {
    id: string;
    createdAt: Date | string;
    updatedAt?: Date | string;
}
/**
 * Entity that belongs to a building
 */
interface BuildingEntity extends BaseEntity {
    buildingId: string;
}
/**
 * Entity created by a user
 */
interface UserCreatedEntity extends BaseEntity {
    createdBy: string;
}
/**
 * Entity that belongs to a building and was created by a user
 */
interface BuildingUserEntity extends BuildingEntity, UserCreatedEntity {
}
/**
 * Permission fields for API responses
 */
interface PermissionFields {
    canEdit: boolean;
    canDelete: boolean;
}

/**
 * Building entity.
 *
 * Kept hand-written (as are the other types in this file): persisted-entity
 * shape (`Date | string` timestamps) — deliberately diverges from
 * `buildingResponseSchema` / `buildingDetailResponseSchema` (wire shapes:
 * ISO strings, status/funds/representative envelopes, billing fields).
 */
interface Building extends UserCreatedEntity {
    name: string;
    address: string;
    slug?: string | null;
    coverImage?: string | null;
    type: BuildingType;
    totalUnits: number;
}
/**
 * Building with user's role for API responses
 */
interface BuildingWithRole extends Building {
    role?: BuildingRole;
    permissions?: string[];
}
/**
 * User's membership in a building
 */
interface BuildingMember extends BaseEntity {
    userId: string;
    buildingId: string;
    roleType: BuildingRole;
    assignedBy: string;
    buildingSurfacePercentage?: string | null;
}
/**
 * Building user for list responses
 */
interface BuildingUser {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: BuildingRole;
    joinedAt: Date | string;
    surfacePercentage?: string | null;
}
/**
 * OTP response for building join
 */
interface BuildingOTPResponse {
    otp: string;
    expiresAt: Date | string;
}

/**
 * Event type — derived from `eventTypeSchema` so the type union and the Zod
 * validator can never drift apart. Same exported name and shape as the
 * previously hand-written union.
 */
type EventType = z.infer<typeof eventTypeSchema>;
/**
 * Event color — derived from `eventColorSchema`.
 */
type EventColor = z.infer<typeof eventColorSchema>;
/**
 * Recurrence cadence — derived from `recurrenceTypeSchema`.
 */
type RecurrenceType = z.infer<typeof recurrenceTypeSchema>;
/**
 * Event entity.
 *
 * Kept hand-written: this is the persisted-entity shape (`userId`,
 * `Date | string` timestamps), which deliberately diverges from
 * `eventResponseSchema` (wire shape — ISO strings, nested `user` reference,
 * permission flags) and from `createEventSchema` (request shape — coerced
 * `Date` outputs).
 */
interface Event extends BaseEntity {
    buildingId: string;
    userId: string;
    title: string;
    type: EventType;
    description?: string | null;
    startDate: Date | string;
    endDate: Date | string;
    color: EventColor;
    approved: boolean;
    isAnonymous: boolean;
    allowComments: boolean;
    recurrenceType: RecurrenceType;
    recurrenceEndDate?: Date | string | null;
    subtype?: string | null;
    onlineMeetingUrl?: string | null;
    meetingMinutes?: string | null;
    minuteTakerId?: string | null;
}
/**
 * Event with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse event responses via
 * `eventResponseSchema` / `EventResponse` instead. Will be removed in v0.60.0.
 */
interface EventWithCreator extends Event, PermissionFields {
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
}
/**
 * Create event request.
 *
 * Kept hand-written: represents the JSON payload a client sends (dates as
 * ISO strings), whereas `z.infer<typeof createEventSchema>` is the *parsed*
 * shape (`z.coerce.date()` outputs `Date`), so the two genuinely differ.
 */
interface CreateEventRequest {
    title: string;
    type: EventType;
    description?: string;
    startDate: string;
    endDate: string;
    color: EventColor;
    isAnonymous?: boolean;
    allowComments?: boolean;
    recurrenceType?: RecurrenceType;
    recurrenceEndDate?: string;
    subtype?: string;
    onlineMeetingUrl?: string;
    meetingMinutes?: string;
    minuteTakerId?: string;
    fileIds?: string[];
}

/**
 * Failure report entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * `submittedBy` user id) — deliberately diverges from
 * `failureReportResponseSchema` (wire shape: ISO strings, nested submitter,
 * location fields, permission flags).
 */
interface FailureReport extends BaseEntity {
    buildingId: string;
    submittedBy: string;
    title: string;
    description?: string | null;
    status: FailureStatus;
    approved: boolean;
}
/**
 * Failure report with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse responses via
 * `failureReportResponseSchema` / `FailureReportResponse` instead.
 * Will be removed in v0.60.0.
 */
interface FailureReportWithCreator extends FailureReport, PermissionFields {
    submitter?: {
        id: string;
        name: string;
        image?: string | null;
    };
    images?: string[];
}
/**
 * Create failure report request.
 *
 * Kept hand-written: minimal JSON payload. Diverges from
 * `createFailureReportSchema` (multipart request), which requires
 * `description` and models priority/location/attachment fields.
 */
interface CreateFailureReportRequest {
    title: string;
    description?: string;
}

/**
 * Building fund/balance entity
 */
interface BuildingFund extends BuildingEntity {
    initialBalance: number;
    currentBalance: number;
    totalIncome: number;
    totalExpenses: number;
}
/**
 * Financial summary for a building
 */
interface FinancialSummary {
    currentBalance: number;
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    period: {
        start: string;
        end: string;
    };
}
/**
 * Financial graph data point
 */
interface FinancialGraphData {
    month: string;
    income: number;
    expenses: number;
    balance: number;
}
/**
 * Income/expense transaction
 */
interface Transaction extends BaseEntity {
    buildingId: string;
    title?: string;
    description: string;
    amount: number;
    date: string | Date;
    type: TransactionType;
    category: TransactionCategory;
    frequency?: string;
    currency?: string;
}
/**
 * Create transaction request
 */
interface CreateTransactionRequest {
    buildingId: string;
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
    category: TransactionCategory;
    title?: string;
    frequency?: string;
}
/**
 * Recurring transaction template.
 *
 * @deprecated Zero consumers — the backend never implemented recurring
 * templates (the `FUNDS.RECURRING_TEMPLATE*` routes are phantoms) and
 * mobile's dead recurring-templates feature uses its own local type and is
 * slated for deletion. Will be removed in v0.60.0.
 */
interface RecurringTemplate extends BaseEntity {
    buildingId: string;
    title: string;
    description?: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    frequency: string;
    startDate: string | Date;
    endDate?: string | Date | null;
    isActive: boolean;
    lastGeneratedAt?: string | Date | null;
}
/**
 * Create recurring template request.
 *
 * @deprecated Zero consumers — see {@link RecurringTemplate}. Will be removed in v0.60.0.
 */
interface CreateRecurringTemplateRequest {
    buildingId: string;
    title: string;
    description?: string;
    amount: number;
    type: TransactionType;
    category: TransactionCategory;
    frequency: string;
    startDate: string;
    endDate?: string;
}

/**
 * How maintenance was financed — derived from `maintenanceFinancedBySchema`
 * so the type union and the Zod validator can never drift apart. Same
 * exported name and shape as the previously hand-written union.
 */
type MaintenanceFinancedBy = z.infer<typeof maintenanceFinancedBySchema>;
/**
 * Maintenance log entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps via
 * `BuildingUserEntity`, `cost` as a plain string) — deliberately diverges
 * from `maintenanceLogResponseSchema` (wire shape) and
 * `createMaintenanceLogSchema` (request shape with required `events`).
 */
interface MaintenanceLog extends BuildingUserEntity {
    title: string;
    description?: string | null;
    contractor: string;
    cost: string;
    financedBy?: MaintenanceFinancedBy | null;
    warranty: boolean;
}
/**
 * Maintenance log with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse responses via
 * `maintenanceLogResponseSchema` / `MaintenanceLogResponse` instead.
 * Will be removed in v0.60.0.
 */
interface MaintenanceLogWithCreator extends MaintenanceLog, PermissionFields {
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
    images?: string[];
}
/**
 * Create maintenance log request.
 *
 * Kept hand-written: legacy JSON payload shape. Diverges from
 * `createMaintenanceLogSchema` (multipart request), which additionally
 * requires `events` (min 1) and models `cost` via string/number coercion.
 */
interface CreateMaintenanceLogRequest {
    title: string;
    description?: string;
    contractor: string;
    cost: string;
    financedBy?: MaintenanceFinancedBy;
    warranty?: boolean;
}

/**
 * Notice entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * non-null `createdBy` via `BuildingUserEntity`) — deliberately diverges from
 * `noticeResponseSchema` (wire shape: ISO strings, nullable `createdBy`,
 * permission flags, nested files/events).
 */
interface Notice extends BuildingUserEntity {
    title: string;
    content: string;
    approved: boolean;
}
/**
 * Notice with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse notice responses via
 * `noticeResponseSchema` / `NoticeResponse` instead. Will be removed in v0.60.0.
 */
interface NoticeWithCreator extends Notice, PermissionFields {
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
}
/**
 * Create notice request.
 *
 * Kept hand-written: the minimal JSON payload. Diverges from
 * `createNoticeSchema` (multipart request), whose parsed output additionally
 * carries `isAnonymous`/`pinned` and defaulted `events`/`fileIds` arrays.
 */
interface CreateNoticeRequest {
    title: string;
    content: string;
}

/**
 * The caller's DIRECT `building_roles` membership — their *voter identity* in a
 * building, independent of which permission path won the context merge.
 *
 * Rationale: `permissions` answers "what may they do here"; `membership` answers
 * "who are they here". `resolveBuildingAccess` may pick org-derived permissions
 * over the building-role permissions (to avoid downgrades), but it must never
 * drop `membership`. A co-owner who is also an org/platform admin is still a
 * co-owner and must keep their vote and ownership weight.
 */
interface BuildingMembership {
    buildingRole: BuildingRole;
    /** `building_roles.building_surface_percentage` — numeric string; undefined for reps with no ownership. */
    buildingSurfacePercentage?: string;
}
/** Building access granted via organization membership. */
interface BuildingContextFromOrg {
    kind: 'building';
    userId: string;
    buildingId: string;
    permissions: Permission[];
    source: 'organization';
    orgId: string;
    orgRole: OrgRole;
    buildingRole?: undefined;
    buildingSurfacePercentage?: undefined;
    /** Set when this org/platform admin ALSO holds a direct building_roles row here. */
    membership?: BuildingMembership;
}
/** Building access granted via direct building role assignment. */
interface BuildingContextFromRole {
    kind: 'building';
    userId: string;
    buildingId: string;
    permissions: Permission[];
    source: 'building_role';
    buildingRole: BuildingRole;
    buildingSurfacePercentage?: string;
    orgId?: undefined;
    orgRole?: undefined;
    /** Populated when resolved via access.service — mirrors buildingRole/surface. */
    membership?: BuildingMembership;
}
/**
 * Building access granted purely by platform-admin privilege — the caller has
 * no org membership over this building and no direct building role, so there
 * is no `orgId`/`orgRole` to report. Introduced so the backend's
 * access-resolution can stop fabricating an org-shaped context
 * (`orgId: undefined as any`) for platform admins.
 */
interface BuildingContextFromPlatformAdmin {
    kind: 'building';
    userId: string;
    buildingId: string;
    permissions: Permission[];
    source: 'platform_admin';
    orgId?: undefined;
    orgRole?: undefined;
    buildingRole?: undefined;
    buildingSurfacePercentage?: undefined;
    /** Set when the platform admin ALSO holds a direct building_roles row here. */
    membership?: BuildingMembership;
}
type BuildingPermissionContext = BuildingContextFromOrg | BuildingContextFromRole | BuildingContextFromPlatformAdmin;
/**
 * Discriminated union representing the caller's permission context.
 *
 * - `platform` — platform-scoped role (e.g. PLATFORM_ADMIN)
 * - `organization` — org-scoped role
 * - `building` — building-scoped, via org membership, direct role, or
 *   platform-admin privilege (see `source` on the building variants)
 */
type PermissionContext = {
    kind: 'platform';
    userId: string;
    platformRole: PlatformRole;
    permissions: Permission[];
} | {
    kind: 'organization';
    userId: string;
    orgId: string;
    orgRole: OrgRole;
    permissions: Permission[];
} | BuildingPermissionContext;

/** Scope for permission resolution. */
type PermissionScope = 'building' | 'organization' | 'platform';
/** Unified response from GET /users/me/permissions. */
interface PermissionsResponse {
    scope: PermissionScope;
    permissions: Permission[];
    roleType?: string;
    buildingId?: string;
    orgId?: string;
    chatVisibleToCoOwners?: boolean;
}

/**
 * Poll entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * decimal-string weights) — deliberately diverges from `pollResponseSchema`
 * (wire shape: ISO strings, results/vote-status envelopes, permission flags).
 */
interface Poll extends BuildingUserEntity {
    question: string;
    options: string[];
    pollType: PollType;
    status: CommonStatus;
    deadline?: Date | string | null;
    requiredConsensusPercentage?: string | null;
    totalVotes: number;
    totalWeight: string;
    winningOptionIndex?: number | null;
    isResultsFinalized: boolean;
    finalizedAt?: Date | string | null;
    finalizedBy?: string | null;
}
/**
 * Poll with results for API responses.
 *
 * @deprecated Zero consumers — clients parse poll responses via
 * `pollResponseSchema` / `PollResponse` instead. Will be removed in v0.60.0.
 */
interface PollWithResults extends Poll, PermissionFields {
    results?: PollOptionResult[];
    userVote?: PollVote | null;
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
}
/**
 * Poll option result
 */
interface PollOptionResult {
    optionIndex: number;
    option: string;
    voteCount: number;
    totalWeight: string;
    percentage: number;
}
/**
 * Poll vote
 */
interface PollVote {
    id: string;
    pollId: string;
    userId: string;
    selectedOptionIndex: number;
    voteWeight: string;
    createdAt: Date | string;
}
/**
 * Create poll request.
 *
 * Kept hand-written: the JSON payload a client sends (deadline as ISO
 * string). Diverges from `createPollSchema` (multipart request), whose
 * parsed output has a coerced `Date` deadline plus scoping/consensus fields.
 */
interface CreatePollRequest {
    question: string;
    options: string[];
    pollType: PollType;
    deadline?: string;
    requiredConsensusPercentage?: number;
}
/**
 * Vote request — derived from `votePollSchema` so the request type and the
 * Zod validator can never drift apart. Same exported name and shape as the
 * previously hand-written interface.
 */
type VoteRequest = z.infer<typeof votePollSchema>;

/**
 * User entity
 */
interface User extends BaseEntity {
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    phone?: string | null;
    address?: string | null;
    oib?: string | null;
    agreedToTermsAndConditions?: boolean | null;
    termsAgreedAt?: Date | string | null;
}
/**
 * Session entity
 */
interface Session extends BaseEntity {
    expiresAt: Date | string;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
}
/**
 * User with building roles for API responses
 */
interface UserWithBuildings extends User {
    buildingRoles?: UserBuildingRole[];
}
/**
 * User's role in a specific building
 */
interface UserBuildingRole {
    buildingId: string;
    roleType: string;
    permissions: string[];
}

export type { BaseEntity, Building, BuildingContextFromOrg, BuildingContextFromPlatformAdmin, BuildingContextFromRole, BuildingEntity, BuildingFund, BuildingMember, BuildingMembership, BuildingOTPResponse, BuildingPermissionContext, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionContext, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurrenceType, RecurringTemplate, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest };
