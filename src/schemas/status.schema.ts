import { z } from 'zod';
import { ApprovalStatus, CommonStatus, FailureStatus } from '../enums/status.enum';

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
export const FailureStatusSchema = z.enum(failureStatusOptions);
export const PrioritySchema = z.enum(priorityOptions);
