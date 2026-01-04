import type { BuildingUserEntity, PermissionFields } from './base-entity.types';

/**
 * How maintenance was financed
 */
export type MaintenanceFinancedBy = 'building_funds' | 'insurance' | 'co_owner';

/**
 * Maintenance log entity
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
 * Maintenance log with creator info for API responses
 */
export interface MaintenanceLogWithCreator extends MaintenanceLog, PermissionFields {
  creator?: {
    id: string;
    name: string;
    image?: string | null;
  };
  images?: string[];
}

/**
 * Create maintenance log request
 */
export interface CreateMaintenanceLogRequest {
  title: string;
  description?: string;
  contractor: string;
  cost: string;
  financedBy?: MaintenanceFinancedBy;
  warranty?: boolean;
}

/**
 * Update maintenance log request
 */
export interface UpdateMaintenanceLogRequest {
  title?: string;
  description?: string;
  contractor?: string;
  cost?: string;
  financedBy?: MaintenanceFinancedBy;
  warranty?: boolean;
}
