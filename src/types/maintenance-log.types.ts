import type { z } from 'zod';
import type { maintenanceFinancedBySchema } from '../schemas/entities/maintenance-log.schema';
import type { BuildingUserEntity } from './base-entity.types';

/**
 * How maintenance was financed — derived from `maintenanceFinancedBySchema`
 * so the type union and the Zod validator can never drift apart. Same
 * exported name and shape as the previously hand-written union.
 */
export type MaintenanceFinancedBy = z.infer<typeof maintenanceFinancedBySchema>;

/**
 * Maintenance log entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps via
 * `BuildingUserEntity`, `cost` as a plain string) — deliberately diverges
 * from `maintenanceLogResponseSchema` (wire shape) and
 * `createMaintenanceLogSchema` (request shape with required `events`).
 */
export interface MaintenanceLog extends BuildingUserEntity {
  title: string;
  description?: string | null;
  contractor: string;
  cost: string;
  financedBy?: MaintenanceFinancedBy | null;
  warranty: boolean;
}

/**
 * Create maintenance log request.
 *
 * Kept hand-written: legacy JSON payload shape. Diverges from
 * `createMaintenanceLogSchema` (multipart request), which additionally
 * requires `events` (min 1) and models `cost` via string/number coercion.
 */
export interface CreateMaintenanceLogRequest {
  title: string;
  description?: string;
  contractor: string;
  cost: string;
  financedBy?: MaintenanceFinancedBy;
  warranty?: boolean;
}
