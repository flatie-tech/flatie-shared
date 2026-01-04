import { z } from 'zod';

/**
 * Common status options
 */
export const commonStatusOptions = ['active', 'completed', 'cancelled'] as const;

/**
 * Approval status options
 */
export const approvalStatusOptions = ['pending', 'approved', 'rejected'] as const;

/**
 * Maintenance status options
 */
export const maintenanceStatusOptions = [
  'pending',
  'in_progress',
  'completed',
  'cancelled',
] as const;

/**
 * Failure status options
 */
export const failureStatusOptions = ['pending', 'in_progress', 'resolved', 'cancelled'] as const;

/**
 * Priority options
 */
export const priorityOptions = ['low', 'medium', 'high', 'urgent'] as const;

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
