import type { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { updateFailureReportSchema as updateFailureReportBodySchema } from '../entities/failure-report.schema';

/**
 * Update failure report request schema — the canonical PATCH request
 * shape, combining the failure-report `id` (from the URL) with the
 * optional body fields validated by `updateFailureReportSchema` in
 * `entities/failure-report.schema.ts`.
 *
 * The cross-field `refineLocation` rule (commonAreaDescription required
 * for common_area locations; unitType + unitId required for own_unit)
 * is preserved by Zod's `.extend()` on a refined object.
 */
export const updateFailureReportRequestSchema = updateFailureReportBodySchema.extend({
  id: uuidSchema,
});

export type UpdateFailureReportRequestPayload = z.infer<typeof updateFailureReportRequestSchema>;
