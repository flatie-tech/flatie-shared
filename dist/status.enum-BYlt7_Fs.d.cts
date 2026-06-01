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
    readonly IN_PROGRESS: "in_progress";
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

export { ApprovalStatus as A, CommonStatus as C, FailureStatus as F, MaintenanceStatus as M, Priority as P, TransactionCategory as T, FailureType as a, FileCategory as b, Frequency as c, MaintenanceType as d, TransactionType as e };
