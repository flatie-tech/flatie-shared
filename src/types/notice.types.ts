import type { BuildingUserEntity } from './base-entity.types';

/**
 * Notice entity.
 *
 * Kept hand-written: persisted-entity shape (`Date | string` timestamps,
 * non-null `createdBy` via `BuildingUserEntity`) — deliberately diverges from
 * `noticeResponseSchema` (wire shape: ISO strings, nullable `createdBy`,
 * permission flags, nested files/events).
 */
export interface Notice extends BuildingUserEntity {
  title: string;
  content: string;
  approved: boolean;
}

/**
 * Create notice request.
 *
 * Kept hand-written: the minimal JSON payload. Diverges from
 * `createNoticeSchema` (multipart request), whose parsed output additionally
 * carries `isAnonymous`/`pinned` and defaulted `events`/`fileIds` arrays.
 */
export interface CreateNoticeRequest {
  title: string;
  content: string;
}
