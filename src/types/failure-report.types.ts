import type { FailureStatus } from '../enums/status.enum';
import type { BaseEntity, PermissionFields } from './base-entity.types';

/**
 * Failure report entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * `submittedBy` user id) — deliberately diverges from
 * `failureReportResponseSchema` (wire shape: ISO strings, nested submitter,
 * location fields, permission flags).
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
 * Failure report with creator info for API responses.
 *
 * @deprecated Zero consumers — clients parse responses via
 * `failureReportResponseSchema` / `FailureReportResponse` instead.
 * Will be removed in v0.60.0.
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
 * Create failure report request.
 *
 * Kept hand-written: minimal JSON payload. Diverges from
 * `createFailureReportSchema` (multipart request), which requires
 * `description` and models priority/location/attachment fields.
 */
export interface CreateFailureReportRequest {
  title: string;
  description?: string;
}
