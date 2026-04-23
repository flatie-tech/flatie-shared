import { P as Permission, O as OrgRole, B as BuildingRole, a as PlatformRole } from './role.enum-B_pBlMJd.cjs';

/**
 * Pagination query parameters
 */
interface PaginationParams {
    offset?: number;
    limit?: number;
}
/**
 * Date range filter parameters
 */
interface DateRangeParams {
    fromDate?: string;
    toDate?: string;
}
/**
 * Paginated response wrapper
 */
interface PaginatedResponse<T> {
    data: T[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
/**
 * Creates a paginated response from data
 */
declare function createPaginatedResponse<T>(data: T[], count: number, offset: number, limit: number): PaginatedResponse<T>;

/** Building access granted via organization membership. */
interface BuildingContextFromOrg {
    kind: 'building';
    userId: string;
    buildingId: string;
    permissions: Permission[];
    source: 'organization';
    orgId: string;
    orgRole: OrgRole;
    buildingRole?: undefined;
    buildingSurfacePercentage?: undefined;
}
/** Building access granted via direct building role assignment. */
interface BuildingContextFromRole {
    kind: 'building';
    userId: string;
    buildingId: string;
    permissions: Permission[];
    source: 'building_role';
    buildingRole: BuildingRole;
    buildingSurfacePercentage?: string;
    orgId?: undefined;
    orgRole?: undefined;
}
type BuildingPermissionContext = BuildingContextFromOrg | BuildingContextFromRole;
/**
 * Discriminated union representing the caller's permission context.
 *
 * - `admin` — system admin, bypasses all checks
 * - `platform` — platform-scoped role (e.g. PLATFORM_ADMIN)
 * - `organization` — org-scoped role
 * - `building` — building-scoped, either via org membership or direct role
 */
type PermissionContext = {
    kind: 'admin';
} | {
    kind: 'platform';
    userId: string;
    platformRole: PlatformRole;
    permissions: Permission[];
} | {
    kind: 'organization';
    userId: string;
    orgId: string;
    orgRole: OrgRole;
    permissions: Permission[];
} | BuildingPermissionContext;

export { type BuildingContextFromOrg as B, type DateRangeParams as D, type PaginatedResponse as P, type PermissionContext as a, type PaginationParams as b, createPaginatedResponse as c, type BuildingContextFromRole as d, type BuildingPermissionContext as e };
