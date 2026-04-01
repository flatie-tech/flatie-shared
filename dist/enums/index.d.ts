export { P as Permission, S as SCOPED_DOMAINS, a as ScopedAction, b as ScopedDomain, d as domainPermissions } from '../permission.enum-kFexC4fy.js';

declare enum BuildingType {
    RESIDENTIAL = "RESIDENTIAL",
    COMMERCIAL = "COMMERCIAL",
    RESIDENTIAL_COMMERCIAL = "RESIDENTIAL_COMMERCIAL"
}

declare enum PollType {
    CONSENSUS = "CONSENSUS",
    COMMUNITY = "COMMUNITY"
}

declare const Role: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
};
type Role = (typeof Role)[keyof typeof Role];
declare const BuildingRole: {
    readonly OWNER_REPRESENTATIVE: "OWNER_REPRESENTATIVE";
    readonly DEPUTY_REPRESENTATIVE: "DEPUTY_REPRESENTATIVE";
    readonly CO_OWNER: "CO_OWNER";
};
type BuildingRole = (typeof BuildingRole)[keyof typeof BuildingRole];
declare const BUILDING_ROLE_RANK: Record<BuildingRole, number>;
declare function canAssignRole(assignerRole: BuildingRole, targetRole: BuildingRole): boolean;
declare const OrgRole: {
    readonly ORG_ADMIN: "ORG_ADMIN";
    readonly SUPERVISOR: "SUPERVISOR";
    readonly REFERENT: "REFERENT";
    readonly OPERATIVE: "OPERATIVE";
};
type OrgRole = (typeof OrgRole)[keyof typeof OrgRole];
declare const ORG_ROLE_RANK: Record<OrgRole, number>;
declare function canAssignOrgRole(assignerRole: OrgRole, targetRole: OrgRole): boolean;
declare const PlatformRole: {
    readonly PLATFORM_ADMIN: "PLATFORM_ADMIN";
    readonly PLATFORM_MODERATOR: "PLATFORM_MODERATOR";
    readonly PLATFORM_SUPPORT: "PLATFORM_SUPPORT";
    readonly PLATFORM_OPERATIVE: "PLATFORM_OPERATIVE";
};
type PlatformRole = (typeof PlatformRole)[keyof typeof PlatformRole];
declare const PLATFORM_ROLE_RANK: Record<PlatformRole, number>;
declare function canAssignPlatformRole(assignerRole: PlatformRole, targetRole: PlatformRole): boolean;

declare enum CommonStatus {
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
declare enum ApprovalStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
declare enum MaintenanceStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
declare enum FailureStatus {
    PENDING = "pending",
    IN_PROGRESS = "in_progress",
    RESOLVED = "resolved",
    CANCELLED = "cancelled"
}
declare enum MaintenanceType {
    PREVENTIVE = "preventive",
    CORRECTIVE = "corrective",
    EMERGENCY = "emergency"
}
declare enum FailureType {
    EQUIPMENT = "equipment",
    STRUCTURAL = "structural",
    UTILITY = "utility",
    OTHER = "other"
}
declare enum Priority {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}
declare enum TransactionType {
    INCOME = "income",
    EXPENSE = "expense"
}
declare enum TransactionCategory {
    RENT = "rent",
    MAINTENANCE = "maintenance",
    UTILITIES = "utilities",
    INSURANCE = "insurance",
    TAXES = "taxes",
    OTHER = "other"
}
declare enum Frequency {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    QUARTERLY = "quarterly",
    YEARLY = "yearly"
}
declare enum FileCategory {
    FINANCIAL = "financial",
    LEGAL = "legal",
    MAINTENANCE = "maintenance",
    GENERAL = "general",
    OTHER = "other"
}

export { ApprovalStatus, BUILDING_ROLE_RANK, BuildingRole, BuildingType, CommonStatus, FailureStatus, FailureType, FileCategory, Frequency, MaintenanceStatus, MaintenanceType, ORG_ROLE_RANK, OrgRole, PLATFORM_ROLE_RANK, PlatformRole, PollType, Priority, Role, TransactionCategory, TransactionType, canAssignOrgRole, canAssignPlatformRole, canAssignRole };
