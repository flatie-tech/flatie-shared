import type { BuildingType } from '../enums/building-type.enum';
import type { BuildingRole } from '../enums/role.enum';
import type { BaseEntity, UserCreatedEntity } from './base-entity.types';

/**
 * Building entity.
 *
 * Kept hand-written (as are the other types in this file): persisted-entity
 * shape (`Date | string` timestamps) — deliberately diverges from
 * `buildingResponseSchema` / `buildingDetailResponseSchema` (wire shapes:
 * ISO strings, status/funds/representative envelopes, billing fields).
 */
export interface Building extends UserCreatedEntity {
  name: string;
  address: string;
  slug?: string | null;
  coverImage?: string | null;
  type: BuildingType;
  totalUnits: number;
}

/**
 * Building with user's role for API responses
 */
export interface BuildingWithRole extends Building {
  role?: BuildingRole;
  permissions?: string[];
}

/**
 * User's membership in a building
 */
export interface BuildingMember extends BaseEntity {
  userId: string;
  buildingId: string;
  roleType: BuildingRole;
  assignedBy: string;
  buildingSurfacePercentage?: string | null;
}

/**
 * Building user for list responses
 */
export interface BuildingUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: BuildingRole;
  joinedAt: Date | string;
  surfacePercentage?: string | null;
}

/**
 * OTP response for building join
 */
export interface BuildingOTPResponse {
  otp: string;
  expiresAt: Date | string;
}
