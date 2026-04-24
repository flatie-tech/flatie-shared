import { P as Permission, B as BuildingRole, O as OrgRole, a as PlatformRole } from '../role.enum-B3dkJjAq.js';

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
 * React Query Key Factory
 *
 * Provides consistent, hierarchical query keys for React Query / TanStack Query.
 * Use these keys for cache invalidation and query management across the app.
 *
 * @example
 * // In a query
 * useQuery({
 *   queryKey: noticeKeys.list({ buildingId: '123' }),
 *   queryFn: () => fetchNotices({ buildingId: '123' }),
 * });
 *
 * // Invalidate all notices
 * queryClient.invalidateQueries({ queryKey: noticeKeys.all });
 *
 * // Invalidate specific notice
 * queryClient.invalidateQueries({ queryKey: noticeKeys.detail('notice-id') });
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
    users: (id: string, filters?: Record<string, unknown>) => readonly ["building", "users", string, {
        readonly [x: string]: unknown;
    }];
    settings: (id: string) => readonly ["building", "settings", string];
    joinRequests: (id: string) => readonly ["building", "joinRequests", string];
    pending: () => readonly ["building", "pending"];
    chatVisibility: () => readonly ["building", "chatVisibility"];
    chatPermissions: (ids?: string[]) => readonly ["building", "chatPermissions", ...string[][]];
    search: (query: string) => readonly ["building", "search", string];
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
declare const pollKeys: {
    all: readonly ["poll"];
    lists: () => readonly ["poll", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["poll", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["poll", "detail"];
    detail: (id: string) => readonly ["poll", "detail", string];
    results: (id: string) => readonly ["poll", "detail", string, "results"];
    voters: (buildingId: string, pollId: string) => readonly ["poll", "detail", string, "voters", string];
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
declare const failureReportKeys: {
    all: readonly ["failureReport"];
    lists: () => readonly ["failureReport", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["failureReport", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["failureReport", "detail"];
    detail: (id: string) => readonly ["failureReport", "detail", string];
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
declare const documentKeys: {
    all: readonly ["document"];
    lists: () => readonly ["document", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["document", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["document", "detail"];
    detail: (id: string) => readonly ["document", "detail", string];
};
declare const fundsKeys: {
    all: readonly ["funds"];
    balance: (buildingId: string) => readonly ["funds", "balance", string];
    summary: (buildingId: string) => readonly ["funds", "summary", string];
    graph: (buildingId: string) => readonly ["funds", "graph", string];
    income: (buildingId: string) => readonly ["funds", "income", string];
    expenses: (buildingId: string) => readonly ["funds", "expenses", string];
    transactions: (buildingId: string, filters?: Record<string, unknown>) => readonly ["funds", "transactions", string, {
        readonly [x: string]: unknown;
    }];
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
declare const recentKeys: {
    all: readonly ["recent"];
    items: (buildingId: string, filters?: Record<string, unknown>) => readonly ["recent", string, {
        readonly [x: string]: unknown;
    }];
};
declare const adminKeys: {
    all: readonly ["admin"];
    dashboard: () => readonly ["admin", "dashboard"];
    dashboardSummary: () => readonly ["admin", "dashboard", "summary"];
    users: (filters?: Record<string, unknown>) => readonly ["admin", "users", {
        readonly [x: string]: unknown;
    }];
    buildings: (filters?: Record<string, unknown>) => readonly ["admin", "buildings", {
        readonly [x: string]: unknown;
    }];
};
declare const adminBuildingKeys: {
    all: readonly ["adminBuilding"];
    lists: () => readonly ["adminBuilding", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["adminBuilding", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["adminBuilding", "detail"];
    detail: (id: string) => readonly ["adminBuilding", "detail", string];
};
declare const apartmentKeys: {
    all: readonly ["apartment"];
    lists: () => readonly ["apartment", "list"];
    list: (buildingId: string, filters?: Record<string, unknown>) => readonly ["apartment", "list", string, {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["apartment", "detail"];
    detail: (id: string) => readonly ["apartment", "detail", string];
    floors: (buildingId: string) => readonly ["apartment", "floors", string];
};
declare const blogKeys: {
    all: readonly ["blog"];
    lists: () => readonly ["blog", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["blog", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["blog", "detail"];
    detail: (id: string) => readonly ["blog", "detail", string];
    categories: () => readonly ["blog", "categories"];
};
declare const chatKeys: {
    all: readonly ["chat"];
    conversations: (buildingId: string) => readonly ["chat", "conversations", string];
    conversation: (buildingId: string, conversationId: string) => readonly ["chat", "conversation", string, string];
    messages: (conversationId: string) => readonly ["chat", "messages", string];
    unreadCount: (buildingId: string) => readonly ["chat", "unreadCount", string];
    buildingUsers: (buildingId: string, search?: string) => readonly ["chat", "buildingUsers", string, string | undefined];
    selfUser: (buildingId: string) => readonly ["chat", "selfUser", string];
};
declare const dashboardSummaryKeys: {
    all: readonly ["dashboardSummary"];
    summary: () => readonly ["dashboardSummary", "summary"];
    platform: () => readonly ["dashboardSummary", "platform"];
    representatives: () => readonly ["dashboardSummary", "representatives"];
};
declare const faqKeys: {
    all: readonly ["faq"];
    lists: () => readonly ["faq", "list"];
    list: (buildingId: string) => readonly ["faq", "list", string];
    details: () => readonly ["faq", "detail"];
    detail: (id: string) => readonly ["faq", "detail", string];
};
declare const garageKeys: {
    all: readonly ["garage"];
    lists: () => readonly ["garage", "list"];
    list: (buildingId: string) => readonly ["garage", "list", string];
    details: () => readonly ["garage", "detail"];
    detail: (id: string) => readonly ["garage", "detail", string];
    floors: (buildingId: string) => readonly ["garage", "floors", string];
};
declare const layoutKeys: {
    all: readonly ["layout"];
    sidebar: () => readonly ["layout", "sidebar"];
    config: (buildingId: string) => readonly ["layout", "config", string];
    building: (buildingId: string) => readonly ["layout", "building", string];
    kiosk: (buildingId: string) => readonly ["layout", "kiosk", string];
};
declare const notificationKeys: {
    all: readonly ["notification"];
    lists: () => readonly ["notification", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["notification", "list", {
        readonly [x: string]: unknown;
    }];
    unreadCount: () => readonly ["notification", "unreadCount"];
    unreadCountByCategory: (buildingId?: string) => readonly ["notification", "unreadCountByCategory", ...string[]];
    preferences: () => readonly ["notification", "preferences"];
};
declare const platformBuildingKeys: {
    all: readonly ["platformBuilding"];
    lists: () => readonly ["platformBuilding", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["platformBuilding", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["platformBuilding", "detail"];
    detail: (id: string) => readonly ["platformBuilding", "detail", string];
};
declare const recurringTemplateKeys: {
    all: readonly ["recurringTemplate"];
    lists: () => readonly ["recurringTemplate", "list"];
    list: (buildingId: string) => readonly ["recurringTemplate", "list", string];
    details: () => readonly ["recurringTemplate", "detail"];
    detail: (id: string) => readonly ["recurringTemplate", "detail", string];
};
declare const spotlightKeys: {
    all: readonly ["spotlight"];
    search: (query: string) => readonly ["spotlight", "search", string];
    buildingSearch: (buildingId: string, query: string, limit?: number) => readonly ["spotlight", "buildingSearch", string, string, number | undefined];
    platformSearch: (query: string, limit?: number) => readonly ["spotlight", "platformSearch", string, number | undefined];
};
declare const storageUnitKeys: {
    all: readonly ["storageUnit"];
    lists: () => readonly ["storageUnit", "list"];
    list: (buildingId: string) => readonly ["storageUnit", "list", string];
    details: () => readonly ["storageUnit", "detail"];
    detail: (id: string) => readonly ["storageUnit", "detail", string];
    floors: (buildingId: string) => readonly ["storageUnit", "floors", string];
};
declare const ownerKeys: {
    all: readonly ["owner"];
    lists: () => readonly ["owner", "list"];
    list: (buildingId: string, search?: string) => readonly ["owner", "list", string, string | null];
    details: () => readonly ["owner", "detail"];
    detail: (buildingId: string, ownerId: string) => readonly ["owner", "detail", string, string];
    assignments: (buildingId: string, unitKind: string, unitId: string) => readonly ["owner", "assignments", string, string, string];
};
declare const unitReminderKeys: {
    all: readonly ["unitReminder"];
    list: (buildingId: string, unitKind: string, unitId: string) => readonly ["unitReminder", "list", string, string, string];
};
declare const businessPartnerKeys: {
    all: readonly ["businessPartner"];
    lists: () => readonly ["businessPartner", "list"];
    list: (orgId: string, params?: {
        search?: string;
        activeOnly?: boolean;
    }) => readonly ["businessPartner", "list", string, string | null, boolean | null];
    details: () => readonly ["businessPartner", "detail"];
    detail: (orgId: string, partnerId: string) => readonly ["businessPartner", "detail", string, string];
};
declare const transactionCategoryKeys: {
    all: readonly ["transactionCategory"];
    lists: () => readonly ["transactionCategory", "list"];
    list: (buildingId?: string, type?: string, search?: string) => readonly ["transactionCategory", "list", string | undefined, string | undefined, string | undefined];
    details: () => readonly ["transactionCategory", "detail"];
    detail: (id: string) => readonly ["transactionCategory", "detail", string];
};
declare const unitSearchKeys: {
    all: readonly ["unitSearch"];
    search: (buildingId: string, query?: string) => readonly ["unitSearch", "search", string, string | undefined];
    initial: (buildingId: string, unitId?: string) => readonly ["unitSearch", "initial", string, string | undefined];
    my: (buildingId: string) => readonly ["unitSearch", "my", string];
};
declare const widgetKeys: {
    all: readonly ["widget"];
    config: (buildingId: string) => readonly ["widget", "config", string];
    data: (buildingId: string, widgetId: string) => readonly ["widget", "data", string, string];
    notices: (buildingId: string) => readonly ["widget", "notices", string];
};
/**
 * All query keys combined for easy access
 */
declare const queryKeys: {
    readonly user: {
        all: readonly ["user"];
        lists: () => readonly ["user", "list"];
        list: (name: string, filters?: Record<string, unknown>) => readonly ["user", "list", string, {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["user", "detail"];
        detail: (id: string) => readonly ["user", "detail", string];
        info: () => readonly ["user", "detail", string];
    };
    readonly building: {
        all: readonly ["building"];
        lists: () => readonly ["building", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["building", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["building", "detail"];
        detail: (id: string) => readonly ["building", "detail", string];
        otp: (id: string) => readonly ["building", "otp", string];
        users: (id: string, filters?: Record<string, unknown>) => readonly ["building", "users", string, {
            readonly [x: string]: unknown;
        }];
        settings: (id: string) => readonly ["building", "settings", string];
        joinRequests: (id: string) => readonly ["building", "joinRequests", string];
        pending: () => readonly ["building", "pending"];
        chatVisibility: () => readonly ["building", "chatVisibility"];
        chatPermissions: (ids?: string[]) => readonly ["building", "chatPermissions", ...string[][]];
        search: (query: string) => readonly ["building", "search", string];
    };
    readonly notice: {
        all: readonly ["notice"];
        lists: () => readonly ["notice", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["notice", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["notice", "detail"];
        detail: (id: string) => readonly ["notice", "detail", string];
    };
    readonly poll: {
        all: readonly ["poll"];
        lists: () => readonly ["poll", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["poll", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["poll", "detail"];
        detail: (id: string) => readonly ["poll", "detail", string];
        results: (id: string) => readonly ["poll", "detail", string, "results"];
        voters: (buildingId: string, pollId: string) => readonly ["poll", "detail", string, "voters", string];
    };
    readonly event: {
        all: readonly ["event"];
        lists: () => readonly ["event", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["event", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["event", "detail"];
        detail: (id: string) => readonly ["event", "detail", string];
    };
    readonly failureReport: {
        all: readonly ["failureReport"];
        lists: () => readonly ["failureReport", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["failureReport", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["failureReport", "detail"];
        detail: (id: string) => readonly ["failureReport", "detail", string];
    };
    readonly maintenanceLog: {
        all: readonly ["maintenanceLog"];
        lists: () => readonly ["maintenanceLog", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["maintenanceLog", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["maintenanceLog", "detail"];
        detail: (id: string) => readonly ["maintenanceLog", "detail", string];
    };
    readonly document: {
        all: readonly ["document"];
        lists: () => readonly ["document", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["document", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["document", "detail"];
        detail: (id: string) => readonly ["document", "detail", string];
    };
    readonly funds: {
        all: readonly ["funds"];
        balance: (buildingId: string) => readonly ["funds", "balance", string];
        summary: (buildingId: string) => readonly ["funds", "summary", string];
        graph: (buildingId: string) => readonly ["funds", "graph", string];
        income: (buildingId: string) => readonly ["funds", "income", string];
        expenses: (buildingId: string) => readonly ["funds", "expenses", string];
        transactions: (buildingId: string, filters?: Record<string, unknown>) => readonly ["funds", "transactions", string, {
            readonly [x: string]: unknown;
        }];
    };
    readonly permission: {
        all: readonly ["permission"];
        lists: () => readonly ["permission", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["permission", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["permission", "detail"];
        detail: (id: string) => readonly ["permission", "detail", string];
    };
    readonly recent: {
        all: readonly ["recent"];
        items: (buildingId: string, filters?: Record<string, unknown>) => readonly ["recent", string, {
            readonly [x: string]: unknown;
        }];
    };
    readonly admin: {
        all: readonly ["admin"];
        dashboard: () => readonly ["admin", "dashboard"];
        dashboardSummary: () => readonly ["admin", "dashboard", "summary"];
        users: (filters?: Record<string, unknown>) => readonly ["admin", "users", {
            readonly [x: string]: unknown;
        }];
        buildings: (filters?: Record<string, unknown>) => readonly ["admin", "buildings", {
            readonly [x: string]: unknown;
        }];
    };
    readonly adminBuilding: {
        all: readonly ["adminBuilding"];
        lists: () => readonly ["adminBuilding", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["adminBuilding", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["adminBuilding", "detail"];
        detail: (id: string) => readonly ["adminBuilding", "detail", string];
    };
    readonly apartment: {
        all: readonly ["apartment"];
        lists: () => readonly ["apartment", "list"];
        list: (buildingId: string, filters?: Record<string, unknown>) => readonly ["apartment", "list", string, {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["apartment", "detail"];
        detail: (id: string) => readonly ["apartment", "detail", string];
        floors: (buildingId: string) => readonly ["apartment", "floors", string];
    };
    readonly blog: {
        all: readonly ["blog"];
        lists: () => readonly ["blog", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["blog", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["blog", "detail"];
        detail: (id: string) => readonly ["blog", "detail", string];
        categories: () => readonly ["blog", "categories"];
    };
    readonly chat: {
        all: readonly ["chat"];
        conversations: (buildingId: string) => readonly ["chat", "conversations", string];
        conversation: (buildingId: string, conversationId: string) => readonly ["chat", "conversation", string, string];
        messages: (conversationId: string) => readonly ["chat", "messages", string];
        unreadCount: (buildingId: string) => readonly ["chat", "unreadCount", string];
        buildingUsers: (buildingId: string, search?: string) => readonly ["chat", "buildingUsers", string, string | undefined];
        selfUser: (buildingId: string) => readonly ["chat", "selfUser", string];
    };
    readonly dashboardSummary: {
        all: readonly ["dashboardSummary"];
        summary: () => readonly ["dashboardSummary", "summary"];
        platform: () => readonly ["dashboardSummary", "platform"];
        representatives: () => readonly ["dashboardSummary", "representatives"];
    };
    readonly faq: {
        all: readonly ["faq"];
        lists: () => readonly ["faq", "list"];
        list: (buildingId: string) => readonly ["faq", "list", string];
        details: () => readonly ["faq", "detail"];
        detail: (id: string) => readonly ["faq", "detail", string];
    };
    readonly garage: {
        all: readonly ["garage"];
        lists: () => readonly ["garage", "list"];
        list: (buildingId: string) => readonly ["garage", "list", string];
        details: () => readonly ["garage", "detail"];
        detail: (id: string) => readonly ["garage", "detail", string];
        floors: (buildingId: string) => readonly ["garage", "floors", string];
    };
    readonly layout: {
        all: readonly ["layout"];
        sidebar: () => readonly ["layout", "sidebar"];
        config: (buildingId: string) => readonly ["layout", "config", string];
        building: (buildingId: string) => readonly ["layout", "building", string];
        kiosk: (buildingId: string) => readonly ["layout", "kiosk", string];
    };
    readonly notification: {
        all: readonly ["notification"];
        lists: () => readonly ["notification", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["notification", "list", {
            readonly [x: string]: unknown;
        }];
        unreadCount: () => readonly ["notification", "unreadCount"];
        unreadCountByCategory: (buildingId?: string) => readonly ["notification", "unreadCountByCategory", ...string[]];
        preferences: () => readonly ["notification", "preferences"];
    };
    readonly platformBuilding: {
        all: readonly ["platformBuilding"];
        lists: () => readonly ["platformBuilding", "list"];
        list: (filters?: Record<string, unknown>) => readonly ["platformBuilding", "list", {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["platformBuilding", "detail"];
        detail: (id: string) => readonly ["platformBuilding", "detail", string];
    };
    readonly recurringTemplate: {
        all: readonly ["recurringTemplate"];
        lists: () => readonly ["recurringTemplate", "list"];
        list: (buildingId: string) => readonly ["recurringTemplate", "list", string];
        details: () => readonly ["recurringTemplate", "detail"];
        detail: (id: string) => readonly ["recurringTemplate", "detail", string];
    };
    readonly spotlight: {
        all: readonly ["spotlight"];
        search: (query: string) => readonly ["spotlight", "search", string];
        buildingSearch: (buildingId: string, query: string, limit?: number) => readonly ["spotlight", "buildingSearch", string, string, number | undefined];
        platformSearch: (query: string, limit?: number) => readonly ["spotlight", "platformSearch", string, number | undefined];
    };
    readonly storageUnit: {
        all: readonly ["storageUnit"];
        lists: () => readonly ["storageUnit", "list"];
        list: (buildingId: string) => readonly ["storageUnit", "list", string];
        details: () => readonly ["storageUnit", "detail"];
        detail: (id: string) => readonly ["storageUnit", "detail", string];
        floors: (buildingId: string) => readonly ["storageUnit", "floors", string];
    };
    readonly transactionCategory: {
        all: readonly ["transactionCategory"];
        lists: () => readonly ["transactionCategory", "list"];
        list: (buildingId?: string, type?: string, search?: string) => readonly ["transactionCategory", "list", string | undefined, string | undefined, string | undefined];
        details: () => readonly ["transactionCategory", "detail"];
        detail: (id: string) => readonly ["transactionCategory", "detail", string];
    };
    readonly unitSearch: {
        all: readonly ["unitSearch"];
        search: (buildingId: string, query?: string) => readonly ["unitSearch", "search", string, string | undefined];
        initial: (buildingId: string, unitId?: string) => readonly ["unitSearch", "initial", string, string | undefined];
        my: (buildingId: string) => readonly ["unitSearch", "my", string];
    };
    readonly widget: {
        all: readonly ["widget"];
        config: (buildingId: string) => readonly ["widget", "config", string];
        data: (buildingId: string, widgetId: string) => readonly ["widget", "data", string, string];
        notices: (buildingId: string) => readonly ["widget", "notices", string];
    };
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

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, adminBuildingKeys, adminKeys, apartmentKeys, blogKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys };
