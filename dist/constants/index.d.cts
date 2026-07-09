import { L as LinkableEntityType, E as EntityLinkType } from '../entity-link.enum-wTDJirUV.cjs';
import { P as Permission, B as BuildingRole, O as OrgRole, b as PlatformRole } from '../role.enum-a_XALYng.cjs';

declare const AI_CHAT_LIMITS: {
    /** Hard ceiling on the messages array per request. */
    readonly MAX_MESSAGES: 100;
    /** Hard ceiling on a single message's text content, in characters. */
    readonly MAX_MESSAGE_CHARS: 20000;
    /** Client-side cap for the user's input box (web textarea / mobile TextInput). */
    readonly MAX_INPUT_CHARS: 4000;
    /** Server-side history window: newest messages kept per model call. */
    readonly WINDOW_MAX_MESSAGES: 20;
    /** Server-side history window: character budget (~6k tokens) per model call. */
    readonly WINDOW_MAX_CHARS: 24000;
};

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
 * A legal (source, target, linkType) triple for the generic links API.
 * `'*'` on source/target means "any type in RELATED_TO_LINKABLE_TYPES".
 */
interface EntityLinkRule {
    readonly source: LinkableEntityType | '*';
    readonly target: LinkableEntityType | '*';
    readonly linkType: EntityLinkType;
}
/**
 * Entity types the wildcard `related_to` rule spans. Deliberately excludes
 * `expense_transaction` — expenses relate to logs through `expense_for`.
 */
declare const RELATED_TO_LINKABLE_TYPES: readonly LinkableEntityType[];
/**
 * Every (source, target, linkType) triple the generic links API accepts.
 * The first six mirror the links the entity create/update flows already
 * write inline; `related_to` is the free-form association available
 * between any two linkable entities.
 *
 * Note: `schedule` is reserved for inline-created events that die with
 * their parent — the generic API must not create schedule links to
 * pre-existing events (use `related_to` instead).
 */
declare const ALLOWED_ENTITY_LINKS: readonly EntityLinkRule[];
/**
 * Whether the generic links API may create/delete a link with this triple.
 * Self-links (same id would be caught upstream; same type pairs are fine).
 */
declare function isEntityLinkAllowed(source: LinkableEntityType, target: LinkableEntityType, linkType: EntityLinkType): boolean;

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
    /** Current authenticated user. Convention matches `/users/me` REST shape. */
    me: () => readonly ["user", "me"];
    /** Current user's profile-screen data. */
    profile: () => readonly ["user", "me", "profile"];
};
declare const organizationKeys: {
    all: readonly ["organization"];
    lists: () => readonly ["organization", "list"];
    list: (filters?: Record<string, unknown>) => readonly ["organization", "list", {
        readonly [x: string]: unknown;
    }];
    details: () => readonly ["organization", "detail"];
    detail: (id: string) => readonly ["organization", "detail", string];
    quotas: (id: string) => readonly ["organization", "quotas", string];
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
    quotas: (id: string) => readonly ["building", "quotas", string];
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
declare const buildingEmailKeys: {
    all: readonly ["buildingEmail"];
    threads: (buildingId: string) => readonly ["buildingEmail", "threads", string];
    threadList: (buildingId: string, filters?: Record<string, unknown>) => readonly ["buildingEmail", "threads", string, {
        readonly [x: string]: unknown;
    }];
    thread: (buildingId: string, threadId: string) => readonly ["buildingEmail", "threads", string, string];
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
declare const entityLinkKeys: {
    all: readonly ["entityLink"];
    lists: () => readonly ["entityLink", "list"];
    list: (entityType: string, entityId: string) => readonly ["entityLink", "list", string, string];
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
    /**
     * Building-scoped message list. The buildingId is part of the cache key
     * because Flatie's chat lives inside a building — the same conversationId
     * resolved against a different building would return different data, so
     * one-arg keys would collide.
     */
    messages: (buildingId: string, conversationId: string) => readonly ["chat", "messages", string, string];
    unreadCount: (buildingId: string) => readonly ["chat", "unreadCount", string];
    buildingUsers: (buildingId: string, search?: string) => readonly ["chat", "buildingUsers", string, string | undefined];
    selfUser: (buildingId: string) => readonly ["chat", "selfUser", string];
    orgConversations: (orgId: string) => readonly ["chat", "conversations", "org", string];
    orgConversation: (orgId: string, conversationId: string) => readonly ["chat", "conversation", "org", string, string];
    orgMessages: (orgId: string, conversationId: string) => readonly ["chat", "messages", "org", string, string];
    orgUnreadCount: (orgId: string) => readonly ["chat", "unreadCount", "org", string];
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
declare const aiUsageKeys: {
    all: readonly ["aiUsage"];
    detail: (buildingId: string) => readonly ["aiUsage", string];
};
/**
 * All query keys combined for easy access
 */
declare const queryKeys: {
    readonly aiUsage: {
        all: readonly ["aiUsage"];
        detail: (buildingId: string) => readonly ["aiUsage", string];
    };
    readonly user: {
        all: readonly ["user"];
        lists: () => readonly ["user", "list"];
        list: (name: string, filters?: Record<string, unknown>) => readonly ["user", "list", string, {
            readonly [x: string]: unknown;
        }];
        details: () => readonly ["user", "detail"];
        detail: (id: string) => readonly ["user", "detail", string];
        info: () => readonly ["user", "detail", string];
        /** Current authenticated user. Convention matches `/users/me` REST shape. */
        me: () => readonly ["user", "me"];
        /** Current user's profile-screen data. */
        profile: () => readonly ["user", "me", "profile"];
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
        quotas: (id: string) => readonly ["building", "quotas", string];
        joinRequests: (id: string) => readonly ["building", "joinRequests", string];
        pending: () => readonly ["building", "pending"];
        chatVisibility: () => readonly ["building", "chatVisibility"];
        chatPermissions: (ids?: string[]) => readonly ["building", "chatPermissions", ...string[][]];
        search: (query: string) => readonly ["building", "search", string];
    };
    readonly buildingEmail: {
        all: readonly ["buildingEmail"];
        threads: (buildingId: string) => readonly ["buildingEmail", "threads", string];
        threadList: (buildingId: string, filters?: Record<string, unknown>) => readonly ["buildingEmail", "threads", string, {
            readonly [x: string]: unknown;
        }];
        thread: (buildingId: string, threadId: string) => readonly ["buildingEmail", "threads", string, string];
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
        /**
         * Building-scoped message list. The buildingId is part of the cache key
         * because Flatie's chat lives inside a building — the same conversationId
         * resolved against a different building would return different data, so
         * one-arg keys would collide.
         */
        messages: (buildingId: string, conversationId: string) => readonly ["chat", "messages", string, string];
        unreadCount: (buildingId: string) => readonly ["chat", "unreadCount", string];
        buildingUsers: (buildingId: string, search?: string) => readonly ["chat", "buildingUsers", string, string | undefined];
        selfUser: (buildingId: string) => readonly ["chat", "selfUser", string];
        orgConversations: (orgId: string) => readonly ["chat", "conversations", "org", string];
        orgConversation: (orgId: string, conversationId: string) => readonly ["chat", "conversation", "org", string, string];
        orgMessages: (orgId: string, conversationId: string) => readonly ["chat", "messages", "org", string, string];
        orgUnreadCount: (orgId: string) => readonly ["chat", "unreadCount", "org", string];
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

export { ADMIN_ORG_PERMISSIONS, ADMIN_PLATFORM_PERMISSIONS, AI_CHAT_LIMITS, ALLOWED_ENTITY_LINKS, ALL_PERMISSIONS, BUILDING_ROLE_PERMISSIONS, DEFAULT_PAGINATION_LIMIT, type EntityLinkRule, MAX_PAGINATION_LIMIT, ORG_ROLE_PERMISSIONS, PLATFORM_ROLE_PERMISSIONS, RELATED_TO_LINKABLE_TYPES, adminBuildingKeys, adminKeys, aiUsageKeys, apartmentKeys, blogKeys, buildingEmailKeys, buildingKeys, businessPartnerKeys, chatKeys, dashboardSummaryKeys, documentKeys, entityLinkKeys, eventKeys, failureReportKeys, faqKeys, fundsKeys, garageKeys, isEntityLinkAllowed, layoutKeys, maintenanceLogKeys, noticeKeys, notificationKeys, organizationKeys, ownerKeys, permissionKeys, platformBuildingKeys, pollKeys, queryKeys, recentKeys, recurringTemplateKeys, spotlightKeys, storageUnitKeys, transactionCategoryKeys, unitReminderKeys, unitSearchKeys, userKeys, widgetKeys };
