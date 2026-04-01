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
    voters: (id: string) => readonly ["poll", "detail", string, "voters"];
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
        voters: (id: string) => readonly ["poll", "detail", string, "voters"];
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
};

export { adminKeys, buildingKeys, documentKeys, eventKeys, failureReportKeys, fundsKeys, maintenanceLogKeys, noticeKeys, permissionKeys, pollKeys, queryKeys, recentKeys, userKeys };
