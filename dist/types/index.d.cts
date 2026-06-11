import { B as BuildingType, P as PollType } from '../poll-type.enum-CGV5tBqR.cjs';
import { B as BuildingRole, P as Permission, O as OrgRole, b as PlatformRole } from '../role.enum-BTOXn9M9.cjs';
import { F as FailureStatus, e as TransactionType, T as TransactionCategory, C as CommonStatus } from '../status.enum-BYlt7_Fs.cjs';
export { C as CursorPaginatedResponse, D as DateRangeParams, P as PaginatedResponse, a as PaginationParams, c as createPaginatedResponse } from '../pagination.types-BdLhL-Jg.cjs';

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
 * Building entity
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
 * Event type
 */
type EventType = 'service' | 'inspection' | 'maintenance' | 'meeting' | 'discussion' | 'planned_works' | 'other';
/**
 * Event color
 */
type EventColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'orange' | 'gray';
/**
 * Event entity
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
}
/**
 * Event with creator info for API responses
 */
interface EventWithCreator extends Event, PermissionFields {
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
}
/**
 * Create event request
 */
interface CreateEventRequest {
    title: string;
    type: EventType;
    description?: string;
    startDate: string;
    endDate: string;
    color: EventColor;
}

/**
 * Failure report entity
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
 * Failure report with creator info for API responses
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
 * Create failure report request
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
 * Recurring transaction template
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
 * Create recurring template request
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
 * How maintenance was financed
 */
type MaintenanceFinancedBy = 'building_funds' | 'insurance' | 'co_owner';
/**
 * Maintenance log entity
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
 * Maintenance log with creator info for API responses
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
 * Create maintenance log request
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
 * Notice entity
 */
interface Notice extends BuildingUserEntity {
    title: string;
    content: string;
    approved: boolean;
}
/**
 * Notice with creator info for API responses
 */
interface NoticeWithCreator extends Notice, PermissionFields {
    creator?: {
        id: string;
        name: string;
        image?: string | null;
    };
}
/**
 * Create notice request
 */
interface CreateNoticeRequest {
    title: string;
    content: string;
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
}
type BuildingPermissionContext = BuildingContextFromOrg | BuildingContextFromRole;
/**
 * Discriminated union representing the caller's permission context.
 *
 * - `platform` — platform-scoped role (e.g. PLATFORM_ADMIN)
 * - `organization` — org-scoped role
 * - `building` — building-scoped, either via org membership or direct role
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
 * Poll entity
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
 * Poll with results for API responses
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
 * Create poll request
 */
interface CreatePollRequest {
    question: string;
    options: string[];
    pollType: PollType;
    deadline?: string;
    requiredConsensusPercentage?: number;
}
/**
 * Vote request
 */
interface VoteRequest {
    selectedOptionIndex: number;
}

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

export type { BaseEntity, Building, BuildingContextFromOrg, BuildingContextFromRole, BuildingEntity, BuildingFund, BuildingMember, BuildingOTPResponse, BuildingPermissionContext, BuildingUser, BuildingUserEntity, BuildingWithRole, CreateEventRequest, CreateFailureReportRequest, CreateMaintenanceLogRequest, CreateNoticeRequest, CreatePollRequest, CreateRecurringTemplateRequest, CreateTransactionRequest, Event, EventColor, EventType, EventWithCreator, FailureReport, FailureReportWithCreator, FinancialGraphData, FinancialSummary, MaintenanceFinancedBy, MaintenanceLog, MaintenanceLogWithCreator, Notice, NoticeWithCreator, PermissionContext, PermissionFields, PermissionScope, PermissionsResponse, Poll, PollOptionResult, PollVote, PollWithResults, RecurringTemplate, Session, Transaction, User, UserBuildingRole, UserCreatedEntity, UserWithBuildings, VoteRequest };
