import { P as Permission, B as BuildingRole, O as OrgRole, a as PlatformRole } from '../role.enum-ek-UhQVw.cjs';

/**
 * Default pagination page size used across the stack.
 *
 * Backend clamps requests to `[1, 100]`. Clients that don't specify a limit
 * default to this value so list responses stay predictable.
 */
declare const DEFAULT_PAGINATION_LIMIT = 10;
/** Maximum pagination page size the backend accepts. */
declare const MAX_PAGINATION_LIMIT = 100;

/**
 * React Query / TanStack Query key factories.
 *
 * Hierarchical keys for consistent cache invalidation and query management
 * across Flatie's clients. Consumers on TanStack Query can use `queryOptions`
 * with these keys directly; consumers on wrappers (e.g. mobile's React Query
 * Kit) adapt as needed.
 *
 * @example
 * useQuery({
 *   queryKey: noticeKeys.list({ buildingId: '123' }),
 *   queryFn: () => fetchNotices({ buildingId: '123' }),
 * });
 *
 * queryClient.invalidateQueries({ queryKey: noticeKeys.all });
 * queryClient.invalidateQueries({ queryKey: noticeKeys.detail('id') });
 */
declare const userKeys: {
    all: readonly ["user"];
    lists: () => readonly ["user", "list"];
    list: (name: string, filters?: Record<string, unknown>) => readonly ["user", "list", string, {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["user", "detail"];
    detail: (id: string) => readonly ["user", "detail", string];
    info: () => readonly ["user", "detail", string];
};
declare const buildingKeys: {
    all: readonly ["building"];
    lists: () => readonly ["building", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["building", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["building", "detail"];
    detail: (id: string) => readonly ["building", "detail", string];
    otp: (id: string) => readonly ["building", "otp", string];
    settings: (id: string) => readonly ["building", "settings", string];
    users: (id: string, filters?: Record<string, unknown>) => readonly ["building", "users", string, {
        readonly [x: string]: unknown;
    }];
    joinRequests: (id: string) => readonly ["building", "joinRequests", string];
    pending: () => readonly ["buildings", "my", "pending"];
    chatVisibility: () => readonly ["buildings", "chat-visibility"];
    chatPermissions: (buildingIds?: string[]) => readonly ["building-permissions", "chat-visibility", ...string[][]];
};
declare const adminBuildingKeys: {
    all: readonly ["admin-buildings"];
    lists: () => readonly ["admin-buildings", "list"];
};
declare const platformBuildingKeys: {
    all: readonly ["platform-buildings"];
    lists: () => readonly ["platform-buildings", "list"];
};
declare const apartmentKeys: {
    all: readonly ["apartment"];
    lists: () => readonly ["apartment", "list"];
    list: (buildingId: string, filters?: Record<string, unknown>) => readonly ["apartment", "list", string, {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["apartment", "detail"];
    detail: (buildingId: string, apartmentId: string) => readonly ["apartment", "detail", string, string];
};
declare const garageKeys: {
    all: readonly ["garage"];
    lists: () => readonly ["garage", "list"];
    list: (buildingId: string) => readonly ["garage", "list", string];
};
declare const storageUnitKeys: {
    all: readonly ["storageUnit"];
    lists: () => readonly ["storageUnit", "list"];
    list: (buildingId: string) => readonly ["storageUnit", "list", string];
};
declare const noticeKeys: {
    all: readonly ["notice"];
    lists: () => readonly ["notice", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["notice", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["notice", "detail"];
    detail: (id: string) => readonly ["notice", "detail", string];
};
declare const permissionKeys: {
    all: readonly ["permission"];
    lists: () => readonly ["permission", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["permission", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["permission", "detail"];
    detail: (id: string) => readonly ["permission", "detail", string];
};
declare const maintenanceLogKeys: {
    all: readonly ["maintenanceLog"];
    lists: () => readonly ["maintenanceLog", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["maintenanceLog", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["maintenanceLog", "detail"];
    detail: (id: string) => readonly ["maintenanceLog", "detail", string];
};
declare const failureReportKeys: {
    all: readonly ["failureReport"];
    lists: () => readonly ["failureReport", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["failureReport", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["failureReport", "detail"];
    detail: (id: string) => readonly ["failureReport", "detail", string];
};
declare const eventKeys: {
    all: readonly ["event"];
    lists: () => readonly ["event", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["event", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["event", "detail"];
    detail: (id: string) => readonly ["event", "detail", string];
};
declare const pollKeys: {
    all: readonly ["poll"];
    lists: () => readonly ["poll", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["poll", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["poll", "detail"];
    detail: (id: string) => readonly ["poll", "detail", string];
    voters: (buildingId: string, pollId: string) => readonly ["poll", "voters", string, string];
};
declare const fundsKeys: {
    all: readonly ["funds"];
    balance: (buildingId: string) => readonly ["funds", "balance", string];
    summary: (buildingId: string) => readonly ["funds", "summary", string];
    graph: (buildingId: string) => readonly ["funds", "graph", string];
    income: (buildingId: string) => readonly ["funds", "income", string];
};
declare const documentKeys: {
    all: readonly ["document"];
    lists: () => readonly ["document", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["document", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["document", "detail"];
    detail: (id: string) => readonly ["document", "detail", string];
};
declare const recentKeys: {
    all: readonly ["recent"];
    items: (buildingId: string, filters?: Record<string, unknown>) => readonly ["recent", string, {
        readonly [x: string]: unknown;
    }];
};
declare const transactionCategoryKeys: {
    all: readonly ["transactionCategory"];
    lists: () => readonly ["transactionCategory", "list"];
    list: (buildingId?: string, type?: string, search?: string) => readonly ["transactionCategory", "list", string | undefined, string | undefined, string | undefined];
};
declare const faqKeys: {
    all: readonly ["faq"];
    lists: () => readonly ["faq", "list"];
    list: (buildingId: string) => readonly ["faq", "list", string];
};
declare const chatKeys: {
    all: readonly ["chat"];
    conversations: (buildingId: string) => readonly ["chat", "conversations", string];
    conversation: (conversationId: string) => readonly ["chat", "conversation", string];
    messages: (conversationId: string) => readonly ["chat", "messages", string];
    unreadCount: (buildingId: string) => readonly ["chat", "unreadCount", string];
    buildingUsers: (buildingId: string, search?: string) => readonly ["chat", "building-users", string, string | undefined];
    selfUser: (buildingId: string) => readonly ["chat", "building-users-self", string];
};
declare const blogKeys: {
    all: readonly ["blog"];
    lists: () => readonly ["blog", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["blog", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["blog", "detail"];
    detail: (id: string) => readonly ["blog", "detail", string];
};
declare const layoutKeys: {
    all: readonly ["building-layouts"];
    building: (buildingId: string) => readonly ["building-layouts", string];
    kiosk: (buildingId: string) => readonly ["kiosk-layout", string];
};
declare const recurringTemplateKeys: {
    all: readonly ["recurring-templates"];
    list: (buildingId: string) => readonly ["recurring-templates", string];
};
declare const spotlightKeys: {
    all: readonly ["spotlight"];
    buildingSearch: (buildingId: string, query: string, limit?: number) => readonly ["spotlight", "building", string, string, number | undefined];
    platformSearch: (query: string, limit?: number) => readonly ["spotlight", "platform", string, number | undefined];
};
declare const dashboardSummaryKeys: {
    all: readonly ["dashboard"];
    summary: () => readonly ["dashboard", "summary"];
};
declare const unitSearchKeys: {
    all: readonly ["units"];
    search: (buildingId: string, query: string) => readonly ["units", "search", string, string];
    initial: (buildingId: string, unitId?: string) => readonly ["units", "search", string, "__initial", string | undefined];
    my: (buildingId: string) => readonly ["units", "my", string];
};
declare const widgetKeys: {
    all: readonly ["widget"];
    notices: (buildingId: string) => readonly ["widget", "notices", string];
};
declare const notificationKeys: {
    all: readonly ["notification"];
    lists: () => readonly ["notification", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["notification", "list", {
        readonly [x: string]: unknown;
    }];
    unreadCount: () => readonly ["notification", "unreadCount"];
    unreadCountByCategory: (buildingId?: string) => readonly ["notification", "unreadCountByCategory", string | undefined];
    preferences: () => readonly ["notification", "preferences"];
};

declare const BUILDING_ROLE_PERMISSIONS: Record<BuildingRole, Permission[]>;
declare const ORG_ROLE_PERMISSIONS: Record<OrgRole, Permission[]>;
declare const PLATFORM_ROLE_PERMISSIONS: Record<PlatformRole, Permission[]>;
/** All permissions — used for system admin building-scope resolution. */
declare const ALL_PERMISSIONS: Permission[];
/** Admin org-scope permissions — same as ORG_ADMIN. */
declare const ADMIN_ORG_PERMISSIONS: Permission[];
/** Admin platform-scope permissions — same as PLATFORM_ADMIN. */
declare const ADMIN_PLATFORM_PERMISSIONS: Permission[];

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, apartmentKeys, blogKeys, buildingKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, permissionKeys, platformBuildingKeys, pollKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitSearchKeys, userKeys, widgetKeys };
