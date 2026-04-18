declare const BuildingType: {
    readonly RESIDENTIAL: "RESIDENTIAL";
    readonly COMMERCIAL: "COMMERCIAL";
    readonly RESIDENTIAL_COMMERCIAL: "RESIDENTIAL_COMMERCIAL";
};
type BuildingType = (typeof BuildingType)[keyof typeof BuildingType];

declare const PollType: {
    readonly CONSENSUS: "CONSENSUS";
    readonly COMMUNITY: "COMMUNITY";
};
type PollType = (typeof PollType)[keyof typeof PollType];

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

declare const CommonStatus: {
    readonly ACTIVE: "active";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
type CommonStatus = (typeof CommonStatus)[keyof typeof CommonStatus];
declare const ApprovalStatus: {
    readonly PENDING: "pending";
    readonly APPROVED: "approved";
    readonly REJECTED: "rejected";
};
type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];
declare const MaintenanceStatus: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "in_progress";
    readonly COMPLETED: "completed";
    readonly CANCELLED: "cancelled";
};
type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];
declare const FailureStatus: {
    readonly PENDING: "pending";
    readonly IN_PROGRESS: "inProgress";
    readonly RESOLVED: "resolved";
};
type FailureStatus = (typeof FailureStatus)[keyof typeof FailureStatus];
declare const MaintenanceType: {
    readonly PREVENTIVE: "preventive";
    readonly CORRECTIVE: "corrective";
    readonly EMERGENCY: "emergency";
};
type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];
declare const FailureType: {
    readonly EQUIPMENT: "equipment";
    readonly STRUCTURAL: "structural";
    readonly UTILITY: "utility";
    readonly OTHER: "other";
};
type FailureType = (typeof FailureType)[keyof typeof FailureType];
declare const Priority: {
    readonly NORMAL: "normal";
    readonly URGENT: "urgent";
};
type Priority = (typeof Priority)[keyof typeof Priority];
declare const TransactionType: {
    readonly INCOME: "income";
    readonly EXPENSE: "expense";
};
type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
declare const TransactionCategory: {
    readonly RENT: "rent";
    readonly MAINTENANCE: "maintenance";
    readonly UTILITIES: "utilities";
    readonly INSURANCE: "insurance";
    readonly TAXES: "taxes";
    readonly OTHER: "other";
};
type TransactionCategory = (typeof TransactionCategory)[keyof typeof TransactionCategory];
declare const Frequency: {
    readonly DAILY: "daily";
    readonly WEEKLY: "weekly";
    readonly MONTHLY: "monthly";
    readonly QUARTERLY: "quarterly";
    readonly YEARLY: "yearly";
};
type Frequency = (typeof Frequency)[keyof typeof Frequency];
declare const FileCategory: {
    readonly FINANCIAL: "financial";
    readonly LEGAL: "legal";
    readonly MAINTENANCE: "maintenance";
    readonly GENERAL: "general";
    readonly OTHER: "other";
};
type FileCategory = (typeof FileCategory)[keyof typeof FileCategory];

export { ApprovalStatus as A, BuildingType as B, CommonStatus as C, FailureStatus as F, MaintenanceStatus as M, ORG_ROLE_RANK as O, PollType as P, Role as R, TransactionCategory as T, BUILDING_ROLE_RANK as a, BuildingRole as b, canAssignOrgRole as c, canAssignPlatformRole as d, canAssignRole as e, OrgRole as f, PLATFORM_ROLE_RANK as g, PlatformRole as h, FailureType as i, FileCategory as j, Frequency as k, MaintenanceType as l, Priority as m, TransactionType as n };
