import type { BuildingUserEntity, PermissionFields } from './base-entity.types';

/**
 * Notice entity
 */
export interface Notice extends BuildingUserEntity {
  title: string;
  content: string;
  approved: boolean;
}

/**
 * Notice with creator info for API responses
 */
export interface NoticeWithCreator extends Notice, PermissionFields {
  creator?: {
    id: string;
    name: string;
    image?: string | null;
  };
}

/**
 * Create notice request
 */
export interface CreateNoticeRequest {
  title: string;
  content: string;
}
