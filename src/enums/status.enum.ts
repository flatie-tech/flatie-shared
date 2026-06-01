export const CommonStatus = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type CommonStatus = (typeof CommonStatus)[keyof typeof CommonStatus];

export const ApprovalStatus = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export type ApprovalStatus = (typeof ApprovalStatus)[keyof typeof ApprovalStatus];

export const MaintenanceStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

export const FailureStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
} as const;

export type FailureStatus = (typeof FailureStatus)[keyof typeof FailureStatus];

export const MaintenanceType = {
  PREVENTIVE: 'preventive',
  CORRECTIVE: 'corrective',
  EMERGENCY: 'emergency',
} as const;

export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

export const FailureType = {
  EQUIPMENT: 'equipment',
  STRUCTURAL: 'structural',
  UTILITY: 'utility',
  OTHER: 'other',
} as const;

export type FailureType = (typeof FailureType)[keyof typeof FailureType];

export const Priority = {
  NORMAL: 'normal',
  URGENT: 'urgent',
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];

export const TransactionType = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

export const TransactionCategory = {
  RENT: 'rent',
  MAINTENANCE: 'maintenance',
  UTILITIES: 'utilities',
  INSURANCE: 'insurance',
  TAXES: 'taxes',
  OTHER: 'other',
} as const;

export type TransactionCategory = (typeof TransactionCategory)[keyof typeof TransactionCategory];

export const Frequency = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly',
} as const;

export type Frequency = (typeof Frequency)[keyof typeof Frequency];

export const FileCategory = {
  FINANCIAL: 'financial',
  LEGAL: 'legal',
  MAINTENANCE: 'maintenance',
  GENERAL: 'general',
  OTHER: 'other',
} as const;

export type FileCategory = (typeof FileCategory)[keyof typeof FileCategory];
