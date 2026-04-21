import type { z } from 'zod';
import { uuidSchema } from '../base.schema';
import { updateMaintenanceLogSchema as updateMaintenanceLogBodySchema } from '../entities/maintenance-log.schema';

/**
 * Update maintenance-log request schema — the canonical PATCH request
 * shape, combining the maintenance-log `id` (from the URL) with the
 * optional body fields validated by `updateMaintenanceLogSchema` in
 * `entities/maintenance-log.schema.ts`.
 */
export const updateMaintenanceLogRequestSchema = updateMaintenanceLogBodySchema.extend({
  id: uuidSchema.describe('UUID of the maintenance log to update, taken from the URL.'),
});

export type UpdateMaintenanceLogRequestPayload = z.infer<typeof updateMaintenanceLogRequestSchema>;
