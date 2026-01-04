import type { FailureStatus } from '../enums/status.enum';
import type { BaseEntity, PermissionFields } from './base-entity.types';

/**
 * Failure report entity
 */
export interface FailureReport extends BaseEntity {
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
export interface FailureReportWithCreator extends FailureReport, PermissionFields {
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
export interface CreateFailureReportRequest {
  title: string;
  description?: string;
}

/**
 * Update failure report request
 */
export interface UpdateFailureReportRequest {
  title?: string;
  description?: string;
  status?: FailureStatus;
}
