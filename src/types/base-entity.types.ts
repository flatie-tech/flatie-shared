/**
 * Base entity with common fields for all database entities
 */
export interface BaseEntity {
  id: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

/**
 * Entity that belongs to a building
 */
export interface BuildingEntity extends BaseEntity {
  buildingId: string;
}

/**
 * Entity created by a user
 */
export interface UserCreatedEntity extends BaseEntity {
  createdBy: string;
}

/**
 * Entity that belongs to a building and was created by a user
 */
export interface BuildingUserEntity extends BuildingEntity, UserCreatedEntity {}

/**
 * Permission fields for API responses
 */
export interface PermissionFields {
  canEdit: boolean;
  canDelete: boolean;
}
