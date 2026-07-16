import type { FailureStatus } from '../enums/status.enum';
import type { BaseEntity } from './base-entity.types';

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
