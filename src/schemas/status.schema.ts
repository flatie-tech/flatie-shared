import { z } from 'zod';
import {
  ApprovalStatus,
  CommonStatus,
  FailureStatus,
  MaintenanceStatus,
} from '../enums/status.enum';

export const commonStatusOptions = [
  CommonStatus.ACTIVE,
  CommonStatus.COMPLETED,
  CommonStatus.CANCELLED,
] as const;

export const approvalStatusOptions = [
  ApprovalStatus.PENDING,
  ApprovalStatus.APPROVED,
  ApprovalStatus.REJECTED,
] as const;

export const maintenanceStatusOptions = [
  MaintenanceStatus.PENDING,
  MaintenanceStatus.IN_PROGRESS,
  MaintenanceStatus.COMPLETED,
  MaintenanceStatus.CANCELLED,
] as const;

export const failureStatusOptions = [
  FailureStatus.PENDING,
  FailureStatus.IN_PROGRESS,
  FailureStatus.RESOLVED,
] as const;

/**
 * Priority options
 */
export const priorityOptions = ['normal', 'urgent'] as const;

// Zod enums
export const CommonStatusSchema = z.enum(commonStatusOptions);
export const ApprovalStatusSchema = z.enum(approvalStatusOptions);
export const MaintenanceStatusSchema = z.enum(maintenanceStatusOptions);
export const FailureStatusSchema = z.enum(failureStatusOptions);
export const PrioritySchema = z.enum(priorityOptions);

// Inferred types
export type CommonStatusSchemaType = z.infer<typeof CommonStatusSchema>;
export type ApprovalStatusSchemaType = z.infer<typeof ApprovalStatusSchema>;
export type MaintenanceStatusSchemaType = z.infer<typeof MaintenanceStatusSchema>;
export type FailureStatusSchemaType = z.infer<typeof FailureStatusSchema>;
export type PrioritySchemaType = z.infer<typeof PrioritySchema>;
