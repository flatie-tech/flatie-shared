import type { Role } from '../enums/role.enum';
import type { BaseEntity } from './base-entity.types';

/**
 * User entity
 */
export interface User extends BaseEntity {
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
  role: Role;
  agreedToTermsAndConditions?: boolean | null;
  termsAgreedAt?: Date | string | null;
}

/**
 * Session entity
 */
export interface Session extends BaseEntity {
  expiresAt: Date | string;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
}

/**
 * User with building roles for API responses
 */
export interface UserWithBuildings extends User {
  buildingRoles?: UserBuildingRole[];
}

/**
 * User's role in a specific building
 */
export interface UserBuildingRole {
  buildingId: string;
  roleType: string;
  permissions: string[];
}
