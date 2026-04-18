import { z } from 'zod';

/**
 * API error response envelope.
 *
 * The backend's global exception filter returns errors in this shape. Clients
 * should type their error handlers against `ApiError` to avoid drift.
 *
 * @example
 * { statusCode: 400, message: "Validation failed", timestamp: "2026-04-18T…", path: "/api/v1/notices" }
 */
declare const apiErrorSchema: z.ZodObject<{
    statusCode: z.ZodNumber;
    message: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
    timestamp: z.ZodString;
    path: z.ZodString;
}, z.core.$strip>;
type ApiError = z.infer<typeof apiErrorSchema>;

/**
 * Common field schemas for authentication
 */
declare const emailSchema: z.ZodString;
declare const passwordSchema: z.ZodString;
declare const strongPasswordSchema: z.ZodString;
/**
 * Login form schema
 */
declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    rememberMe: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * Registration form schema
 */
declare const registerSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    passwordConfirmation: z.ZodString;
    agreedToTermsAndConditions: z.ZodBoolean;
}, z.core.$strip>;
/**
 * Forgot password form schema (request password reset)
 */
declare const forgotPasswordSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
/**
 * Reset password form schema
 */
declare const resetPasswordSchema: z.ZodObject<{
    email: z.ZodString;
    token: z.ZodString;
    password: z.ZodString;
    passwordConfirmation: z.ZodString;
}, z.core.$strip>;
/**
 * OTP verification schema
 */
declare const verifyOtpSchema: z.ZodObject<{
    email: z.ZodString;
    otp: z.ZodString;
}, z.core.$strip>;
/**
 * Update password schema (when already logged in)
 */
declare const updatePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
type LoginSchema = z.infer<typeof loginSchema>;
type RegisterSchema = z.infer<typeof registerSchema>;
type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
type VerifyOtpSchema = z.infer<typeof verifyOtpSchema>;
type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;

/**
 * UUID validation schema
 */
declare const uuidSchema: z.ZodString;
/**
 * ISO 8601 datetime validation schema
 */
declare const dateTimeSchema: z.ZodString;
/**
 * Optional/nullable datetime schema
 */
declare const optionalDateTimeSchema: z.ZodOptional<z.ZodNullable<z.ZodString>>;
/**
 * Base entity schema with common fields
 */
declare const baseEntitySchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Entity that belongs to a building
 */
declare const buildingEntitySchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    buildingId: z.ZodString;
}, z.core.$strip>;
/**
 * Entity created by a user
 */
declare const userEntitySchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodString;
}, z.core.$strip>;
/**
 * Entity that belongs to a building and was created by a user
 */
declare const buildingUserEntitySchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    buildingId: z.ZodString;
    createdBy: z.ZodString;
}, z.core.$strip>;
/**
 * Permission fields for API responses
 */
declare const permissionFieldsSchema: z.ZodObject<{
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
}, z.core.$strip>;
type UuidSchema = z.infer<typeof uuidSchema>;
type DateTimeSchema = z.infer<typeof dateTimeSchema>;
type BaseEntitySchema = z.infer<typeof baseEntitySchema>;
type BuildingEntitySchema = z.infer<typeof buildingEntitySchema>;
type UserEntitySchema = z.infer<typeof userEntitySchema>;
type BuildingUserEntitySchema = z.infer<typeof buildingUserEntitySchema>;
type PermissionFieldsSchema = z.infer<typeof permissionFieldsSchema>;

/**
 * Date range filter parameters schema
 */
declare const dateRangeParamsSchema: z.ZodObject<{
    fromDate: z.ZodOptional<z.ZodString>;
    toDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Date range with datetime validation
 */
declare const dateRangeWithValidationSchema: z.ZodObject<{
    fromDate: z.ZodOptional<z.ZodString>;
    toDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type DateRangeParamsSchema = z.infer<typeof dateRangeParamsSchema>;
type DateRangeWithValidationSchema = z.infer<typeof dateRangeWithValidationSchema>;

declare const apartmentRoleSchema: z.ZodEnum<{
    OWNER: "OWNER";
    TENANT: "TENANT";
}>;
declare const apartmentUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        OWNER: "OWNER";
        TENANT: "TENANT";
    }>;
    joinedAt: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$loose>;
type ApartmentUser = z.infer<typeof apartmentUserSchema>;
declare const apartmentSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    number: z.ZodString;
    floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    surnameOnDoor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    surnameOnIntercom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        roleType: z.ZodEnum<{
            OWNER: "OWNER";
            TENANT: "TENANT";
        }>;
        joinedAt: z.ZodString;
        ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$loose>>;
    userCount: z.ZodNumber;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
}, z.core.$loose>;
type Apartment = z.infer<typeof apartmentSchema>;
declare const paginatedApartmentsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        number: z.ZodString;
        floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        surnameOnDoor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        surnameOnIntercom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        users: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            roleType: z.ZodEnum<{
                OWNER: "OWNER";
                TENANT: "TENANT";
            }>;
            joinedAt: z.ZodString;
            ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, z.core.$loose>>;
        userCount: z.ZodNumber;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
    }, z.core.$loose>>;
    count: z.ZodOptional<z.ZodNumber>;
    page: z.ZodOptional<z.ZodNumber>;
    totalPages: z.ZodNumber;
    limit: z.ZodNumber;
    hasNextPage: z.ZodOptional<z.ZodBoolean>;
    hasPreviousPage: z.ZodOptional<z.ZodBoolean>;
}, z.core.$loose>;
type PaginatedApartmentsResponse = z.infer<typeof paginatedApartmentsResponseSchema>;

/**
 * Validation constants for chat
 */
declare const CHAT_LIMITS: {
    readonly MESSAGE_MIN: 1;
    readonly MESSAGE_MAX: 5000;
    readonly GROUP_NAME_MAX: 100;
    readonly PARTICIPANTS_MIN: 1;
    readonly PARTICIPANTS_MAX: 50;
};
/**
 * Conversation type — direct (1:1) or group
 */
declare const ConversationType: {
    readonly DIRECT: "direct";
    readonly GROUP: "group";
};
type ConversationType = (typeof ConversationType)[keyof typeof ConversationType];
/**
 * Send message request schema
 */
declare const sendMessageSchema: z.ZodObject<{
    content: z.ZodString;
}, z.core.$strip>;
/**
 * Create conversation request schema
 */
declare const createConversationSchema: z.ZodObject<{
    type: z.ZodEnum<{
        direct: "direct";
        group: "group";
    }>;
    participantIds: z.ZodArray<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Update conversation request schema (rename or add/remove participants)
 */
declare const updateConversationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    addParticipantIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    removeParticipantIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Cursor-based pagination query schema (conversations / messages)
 */
declare const cursorQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type SendMessageSchema = z.infer<typeof sendMessageSchema>;
type CreateConversationSchema = z.infer<typeof createConversationSchema>;
type UpdateConversationSchema = z.infer<typeof updateConversationSchema>;
type CursorQuerySchema = z.infer<typeof cursorQuerySchema>;

/**
 * Validation constants for FAQs
 */
declare const FAQ_LIMITS: {
    readonly QUESTION_MIN: 1;
    readonly QUESTION_MAX: 500;
    readonly ANSWER_MIN: 1;
    readonly ANSWER_MAX: 2000;
};
/**
 * Create FAQ request schema
 */
declare const createFaqSchema: z.ZodObject<{
    question: z.ZodString;
    answer: z.ZodString;
}, z.core.$strip>;
/**
 * Update FAQ request schema (all fields optional)
 */
declare const updateFaqSchema: z.ZodObject<{
    question: z.ZodOptional<z.ZodString>;
    answer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Reorder FAQs request schema
 */
declare const reorderFaqsSchema: z.ZodObject<{
    orderedIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
/**
 * Copy FAQs from another building request schema
 */
declare const copyFaqsSchema: z.ZodObject<{
    sourceBuildingId: z.ZodString;
}, z.core.$strip>;
type CreateFaqSchema = z.infer<typeof createFaqSchema>;
type UpdateFaqSchema = z.infer<typeof updateFaqSchema>;
type ReorderFaqsSchema = z.infer<typeof reorderFaqsSchema>;
type CopyFaqsSchema = z.infer<typeof copyFaqsSchema>;

/**
 * Validation constants for organizations
 */
declare const ORGANIZATION_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 200;
    readonly OIB_LENGTH: 11;
};
/**
 * Create organization request schema
 */
declare const createOrganizationSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        MANAGEMENT_FIRM: "MANAGEMENT_FIRM";
        PLATFORM: "PLATFORM";
    }>;
    oib: z.ZodOptional<z.ZodString>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Update organization request schema (all fields optional)
 */
declare const updateOrganizationSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    oib: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Add existing user as an organization member
 */
declare const addOrgMemberSchema: z.ZodObject<{
    userId: z.ZodString;
    orgRole: z.ZodEnum<{
        ORG_ADMIN: "ORG_ADMIN";
        SUPERVISOR: "SUPERVISOR";
        REFERENT: "REFERENT";
        OPERATIVE: "OPERATIVE";
    }>;
}, z.core.$strip>;
/**
 * Update an existing organization member's role
 */
declare const updateOrgMemberRoleSchema: z.ZodObject<{
    orgRole: z.ZodEnum<{
        ORG_ADMIN: "ORG_ADMIN";
        SUPERVISOR: "SUPERVISOR";
        REFERENT: "REFERENT";
        OPERATIVE: "OPERATIVE";
    }>;
}, z.core.$strip>;
/**
 * Invite a user to an organization by email
 */
declare const inviteOrgMemberSchema: z.ZodObject<{
    email: z.ZodString;
    orgRole: z.ZodEnum<{
        ORG_ADMIN: "ORG_ADMIN";
        SUPERVISOR: "SUPERVISOR";
        REFERENT: "REFERENT";
        OPERATIVE: "OPERATIVE";
    }>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Assign a building to an organization with optional contract window
 */
declare const assignOrgBuildingSchema: z.ZodObject<{
    buildingId: z.ZodString;
    contractStart: z.ZodOptional<z.ZodString>;
    contractEnd: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Assign a member to a building within the organization
 */
declare const assignOrgMemberBuildingSchema: z.ZodObject<{
    buildingId: z.ZodString;
}, z.core.$strip>;
/**
 * Search users query schema (used when inviting org members)
 */
declare const searchUsersQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Paginated + sorted query for listing buildings assigned to an organization
 */
declare const getOrgBuildingsQuerySchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        name: "name";
        createdAt: "createdAt";
        address: "address";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
/**
 * Paginated + sorted query for listing members of an organization
 */
declare const getOrgMembersQuerySchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        orgRole: "orgRole";
        userName: "userName";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
type UpdateOrganizationSchema = z.infer<typeof updateOrganizationSchema>;
type AddOrgMemberSchema = z.infer<typeof addOrgMemberSchema>;
type UpdateOrgMemberRoleSchema = z.infer<typeof updateOrgMemberRoleSchema>;
type InviteOrgMemberSchema = z.infer<typeof inviteOrgMemberSchema>;
type AssignOrgBuildingSchema = z.infer<typeof assignOrgBuildingSchema>;
type AssignOrgMemberBuildingSchema = z.infer<typeof assignOrgMemberBuildingSchema>;
type SearchUsersQuerySchema = z.infer<typeof searchUsersQuerySchema>;
type GetOrgBuildingsQuerySchema = z.infer<typeof getOrgBuildingsQuerySchema>;
type GetOrgMembersQuerySchema = z.infer<typeof getOrgMembersQuerySchema>;

/**
 * Building type options
 */
declare const BUILDING_TYPES: readonly ["residential", "commercial"];
type BuildingTypeOption = (typeof BUILDING_TYPES)[number];
/**
 * Building type schema
 */
declare const buildingTypeSchema: z.ZodEnum<{
    residential: "residential";
    commercial: "commercial";
}>;
/**
 * Validation constants for buildings
 */
declare const BUILDING_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 100;
    readonly ADDRESS_MIN: 1;
    readonly ADDRESS_MAX: 200;
    readonly UNITS_MIN: 1;
    readonly UNITS_MAX: 10000;
};
/**
 * Create building request schema
 */
declare const createBuildingSchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
    }>;
    address: z.ZodString;
    totalUnits: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
/**
 * Update building request schema
 */
declare const updateBuildingSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
    }>>;
    address: z.ZodOptional<z.ZodString>;
    totalUnits: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
/**
 * Join building with OTP schema
 */
declare const joinBuildingWithOtpSchema: z.ZodObject<{
    otp: z.ZodString;
    buildingId: z.ZodString;
}, z.core.$strip>;
/**
 * Update user building role schema
 */
declare const updateUserBuildingRoleSchema: z.ZodObject<{
    userId: z.ZodString;
    roleType: z.ZodString;
    buildingSurfacePercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
type CreateBuildingSchema = z.infer<typeof createBuildingSchema>;
type UpdateBuildingSchema = z.infer<typeof updateBuildingSchema>;
type JoinBuildingWithOtpSchema = z.infer<typeof joinBuildingWithOtpSchema>;
type UpdateUserBuildingRoleSchema = z.infer<typeof updateUserBuildingRoleSchema>;

/**
 * Event type options
 */
declare const EVENT_TYPES: readonly ["service", "inspection", "maintenance", "meeting", "discussion", "planned_works", "other"];
type EventTypeOption = (typeof EVENT_TYPES)[number];
/**
 * Event color options
 */
declare const EVENT_COLORS: readonly ["blue", "green", "red", "yellow", "purple", "orange", "gray"];
type EventColorOption = (typeof EVENT_COLORS)[number];
/**
 * Mapping of event types to default colors
 */
declare const EVENT_TYPE_COLOR_MAP: Record<EventTypeOption, EventColorOption>;
/**
 * Event type schema
 */
declare const eventTypeSchema: z.ZodEnum<{
    maintenance: "maintenance";
    other: "other";
    service: "service";
    inspection: "inspection";
    meeting: "meeting";
    discussion: "discussion";
    planned_works: "planned_works";
}>;
/**
 * Event color schema
 */
declare const eventColorSchema: z.ZodEnum<{
    blue: "blue";
    green: "green";
    red: "red";
    yellow: "yellow";
    purple: "purple";
    orange: "orange";
    gray: "gray";
}>;
/**
 * Time object schema (for form inputs)
 */
declare const timeSchema: z.ZodObject<{
    hour: z.ZodNumber;
    minute: z.ZodNumber;
}, z.core.$strip>;
/**
 * Create event request schema
 */
declare const createEventSchema: z.ZodObject<{
    buildingId: z.ZodString;
    type: z.ZodEnum<{
        maintenance: "maintenance";
        other: "other";
        service: "service";
        inspection: "inspection";
        meeting: "meeting";
        discussion: "discussion";
        planned_works: "planned_works";
    }>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    color: z.ZodEnum<{
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
        purple: "purple";
        orange: "orange";
        gray: "gray";
    }>;
}, z.core.$strip>;
/**
 * Update event request schema
 */
declare const updateEventSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        maintenance: "maintenance";
        other: "other";
        service: "service";
        inspection: "inspection";
        meeting: "meeting";
        discussion: "discussion";
        planned_works: "planned_works";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    color: z.ZodOptional<z.ZodEnum<{
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
        purple: "purple";
        orange: "orange";
        gray: "gray";
    }>>;
}, z.core.$strip>;
type TimeSchema = z.infer<typeof timeSchema>;
type CreateEventSchema = z.infer<typeof createEventSchema>;
type UpdateEventSchema = z.infer<typeof updateEventSchema>;

/**
 * Create failure report request schema
 */
declare const createFailureReportSchema: z.ZodObject<{
    buildingId: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    maintenanceLogIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Update failure report request schema
 */
declare const updateFailureReportSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    maintenanceLogIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Approve failure report request schema
 */
declare const approveFailureReportSchema: z.ZodObject<{
    approved: z.ZodBoolean;
}, z.core.$strip>;
type CreateFailureReportSchema = z.infer<typeof createFailureReportSchema>;
type UpdateFailureReportSchema = z.infer<typeof updateFailureReportSchema>;
type ApproveFailureReportSchema = z.infer<typeof approveFailureReportSchema>;

declare const garageRoleSchema: z.ZodEnum<{
    OWNER: "OWNER";
    TENANT: "TENANT";
}>;
type GarageRole = z.infer<typeof garageRoleSchema>;
declare const garageUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        OWNER: "OWNER";
        TENANT: "TENANT";
    }>;
    joinedAt: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$loose>;
type GarageUser = z.infer<typeof garageUserSchema>;
declare const garageSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    title: z.ZodString;
    floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        roleType: z.ZodEnum<{
            OWNER: "OWNER";
            TENANT: "TENANT";
        }>;
        joinedAt: z.ZodString;
        ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
type Garage = z.infer<typeof garageSchema>;

/**
 * Maintenance financed by options
 */
declare const MAINTENANCE_FINANCED_BY: readonly ["building_funds", "insurance", "co_owner"];
type MaintenanceFinancedByOption = (typeof MAINTENANCE_FINANCED_BY)[number];
/**
 * Maintenance financed by schema
 */
declare const maintenanceFinancedBySchema: z.ZodEnum<{
    building_funds: "building_funds";
    insurance: "insurance";
    co_owner: "co_owner";
}>;
/**
 * Create maintenance log request schema
 */
declare const createMaintenanceLogSchema: z.ZodObject<{
    buildingId: z.ZodString;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    financedBy: z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>;
    hasWarranty: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    warrantyExpiresAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    failureReportIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    pollIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Update maintenance log request schema
 */
declare const updateMaintenanceLogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    financedBy: z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>;
    hasWarranty: z.ZodOptional<z.ZodBoolean>;
    warrantyExpiresAt: z.ZodNullable<z.ZodOptional<z.ZodCoercedDate<unknown>>>;
    fileIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    failureReportIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    pollIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type CreateMaintenanceLogSchema = z.infer<typeof createMaintenanceLogSchema>;
type UpdateMaintenanceLogSchema = z.infer<typeof updateMaintenanceLogSchema>;

/**
 * Validation constants for notices
 */
declare const NOTICE_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly CONTENT_MIN: 1;
    readonly CONTENT_MAX: 2000;
};
/**
 * Notice event schema (for calendar integration)
 */
declare const noticeEventSchema: z.ZodObject<{
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Create notice request schema
 */
declare const createNoticeSchema: z.ZodObject<{
    buildingId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    events: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Update notice request schema
 */
declare const updateNoticeSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    events: z.ZodOptional<z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    fileIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Approve notice request schema
 */
declare const approveNoticeSchema: z.ZodObject<{
    approved: z.ZodBoolean;
}, z.core.$strip>;
type NoticeEventSchema = z.infer<typeof noticeEventSchema>;
type CreateNoticeSchema = z.infer<typeof createNoticeSchema>;
type UpdateNoticeSchema = z.infer<typeof updateNoticeSchema>;
type ApproveNoticeSchema = z.infer<typeof approveNoticeSchema>;

/**
 * Poll type options
 */
declare const POLL_TYPES: readonly ["CONSENSUS", "COMMUNITY"];
type PollTypeOption = (typeof POLL_TYPES)[number];
/**
 * Poll type enum schema
 */
declare const pollTypeSchema: z.ZodEnum<{
    CONSENSUS: "CONSENSUS";
    COMMUNITY: "COMMUNITY";
}>;
/**
 * Validation constants for polls
 */
declare const POLL_LIMITS: {
    readonly QUESTION_MIN: 5;
    readonly QUESTION_MAX: 250;
    readonly OPTION_MAX: 100;
    readonly COMMUNITY_OPTIONS_MIN: 2;
    readonly COMMUNITY_OPTIONS_MAX: 4;
    readonly CONSENSUS_OPTIONS: 1;
    readonly CONSENSUS_PERCENTAGE_MIN: 10;
    readonly CONSENSUS_PERCENTAGE_MAX: 100;
};
/**
 * Create poll request schema
 */
declare const createPollSchema: z.ZodObject<{
    buildingId: z.ZodString;
    question: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    pollType: z.ZodEnum<{
        CONSENSUS: "CONSENSUS";
        COMMUNITY: "COMMUNITY";
    }>;
    deadline: z.ZodCoercedDate<unknown>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Vote on poll request schema
 */
declare const votePollSchema: z.ZodObject<{
    optionId: z.ZodString;
}, z.core.$strip>;
/**
 * Finalize poll request schema
 */
declare const finalizePollSchema: z.ZodObject<{
    result: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type CreatePollSchema = z.infer<typeof createPollSchema>;
type VotePollSchema = z.infer<typeof votePollSchema>;
type FinalizePollSchema = z.infer<typeof finalizePollSchema>;

declare const storageUnitRoleSchema: z.ZodEnum<{
    OWNER: "OWNER";
    TENANT: "TENANT";
}>;
type StorageUnitRole = z.infer<typeof storageUnitRoleSchema>;
declare const storageUnitUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        OWNER: "OWNER";
        TENANT: "TENANT";
    }>;
    joinedAt: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$loose>;
type StorageUnitUser = z.infer<typeof storageUnitUserSchema>;
declare const storageUnitSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    title: z.ZodString;
    floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    users: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        roleType: z.ZodEnum<{
            OWNER: "OWNER";
            TENANT: "TENANT";
        }>;
        joinedAt: z.ZodString;
        ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
type StorageUnit = z.infer<typeof storageUnitSchema>;

/**
 * Validation constants for transaction categories
 */
declare const TRANSACTION_CATEGORY_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 100;
    readonly SEARCH_MAX: 200;
};
/**
 * Create transaction category request schema
 */
declare const createTransactionCategorySchema: z.ZodObject<{
    name: z.ZodString;
    type: z.ZodEnum<{
        income: "income";
        expense: "expense";
    }>;
}, z.core.$strip>;
/**
 * Update transaction category request schema (name only)
 */
declare const updateTransactionCategorySchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Get transaction categories query schema
 */
declare const getTransactionCategoriesQuerySchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        income: "income";
        expense: "expense";
    }>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Copy categories (between buildings) request schema
 */
declare const copyTransactionCategoriesSchema: z.ZodObject<{
    sourceBuildingId: z.ZodString;
}, z.core.$strip>;
type CreateTransactionCategorySchema = z.infer<typeof createTransactionCategorySchema>;
type UpdateTransactionCategorySchema = z.infer<typeof updateTransactionCategorySchema>;
type GetTransactionCategoriesQuerySchema = z.infer<typeof getTransactionCategoriesQuerySchema>;
type CopyTransactionCategoriesSchema = z.infer<typeof copyTransactionCategoriesSchema>;

/**
 * Pagination query parameters schema
 */
declare const paginationParamsSchema: z.ZodObject<{
    offset: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
/**
 * Generic paginated response schema factory
 * @param itemSchema - The schema for individual items in the response
 */
declare const paginatedResponseSchema: <T extends z.ZodTypeAny>(itemSchema: T) => z.ZodObject<{
    data: z.ZodArray<T>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type PaginationParamsSchema = z.infer<typeof paginationParamsSchema>;
type PaginatedResponseSchema<T> = {
    data: T[];
    count: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

/** Zod schema for role types across all scopes. */
declare const roleTypeSchema: z.ZodEnum<{
    [x: string]: string;
}>;
/** Zod schema for the unified GET /users/me/permissions response. */
declare const permissionsResponseSchema: z.ZodObject<{
    scope: z.ZodEnum<{
        building: "building";
        organization: "organization";
        platform: "platform";
    }>;
    permissions: z.ZodArray<z.ZodString>;
    roleType: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    buildingId: z.ZodOptional<z.ZodString>;
    orgId: z.ZodOptional<z.ZodString>;
    chatVisibleToCoOwners: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type PermissionsResponseSchema = z.infer<typeof permissionsResponseSchema>;

/**
 * Common status options
 */
declare const commonStatusOptions: readonly ["active", "completed", "cancelled"];
/**
 * Approval status options
 */
declare const approvalStatusOptions: readonly ["pending", "approved", "rejected"];
/**
 * Maintenance status options
 */
declare const maintenanceStatusOptions: readonly ["pending", "in_progress", "completed", "cancelled"];
/**
 * Failure status options
 */
declare const failureStatusOptions: readonly ["pending", "inProgress", "resolved"];
/**
 * Priority options
 */
declare const priorityOptions: readonly ["normal", "urgent"];
declare const CommonStatusSchema: z.ZodEnum<{
    active: "active";
    completed: "completed";
    cancelled: "cancelled";
}>;
declare const ApprovalStatusSchema: z.ZodEnum<{
    pending: "pending";
    approved: "approved";
    rejected: "rejected";
}>;
declare const MaintenanceStatusSchema: z.ZodEnum<{
    pending: "pending";
    completed: "completed";
    cancelled: "cancelled";
    in_progress: "in_progress";
}>;
declare const FailureStatusSchema: z.ZodEnum<{
    pending: "pending";
    inProgress: "inProgress";
    resolved: "resolved";
}>;
declare const PrioritySchema: z.ZodEnum<{
    normal: "normal";
    urgent: "urgent";
}>;
type CommonStatusSchemaType = z.infer<typeof CommonStatusSchema>;
type ApprovalStatusSchemaType = z.infer<typeof ApprovalStatusSchema>;
type MaintenanceStatusSchemaType = z.infer<typeof MaintenanceStatusSchema>;
type FailureStatusSchemaType = z.infer<typeof FailureStatusSchema>;
type PrioritySchemaType = z.infer<typeof PrioritySchema>;

export { type AddOrgMemberSchema, type Apartment, type ApartmentUser, type ApiError, ApprovalStatusSchema, type ApprovalStatusSchemaType, type ApproveFailureReportSchema, type ApproveNoticeSchema, type AssignOrgBuildingSchema, type AssignOrgMemberBuildingSchema, BUILDING_LIMITS, BUILDING_TYPES, type BaseEntitySchema, type BuildingEntitySchema, type BuildingTypeOption, type BuildingUserEntitySchema, CHAT_LIMITS, CommonStatusSchema, type CommonStatusSchemaType, ConversationType, type CopyFaqsSchema, type CopyTransactionCategoriesSchema, type CreateBuildingSchema, type CreateConversationSchema, type CreateEventSchema, type CreateFailureReportSchema, type CreateFaqSchema, type CreateMaintenanceLogSchema, type CreateNoticeSchema, type CreateOrganizationSchema, type CreatePollSchema, type CreateTransactionCategorySchema, type CursorQuerySchema, type DateRangeParamsSchema, type DateRangeWithValidationSchema, type DateTimeSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, type EventColorOption, type EventTypeOption, FAQ_LIMITS, FailureStatusSchema, type FailureStatusSchemaType, type FinalizePollSchema, type ForgotPasswordSchema, type Garage, type GarageRole, type GarageUser, type GetOrgBuildingsQuerySchema, type GetOrgMembersQuerySchema, type GetTransactionCategoriesQuerySchema, type InviteOrgMemberSchema, type JoinBuildingWithOtpSchema, type LoginSchema, MAINTENANCE_FINANCED_BY, type MaintenanceFinancedByOption, MaintenanceStatusSchema, type MaintenanceStatusSchemaType, NOTICE_LIMITS, type NoticeEventSchema, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, type PaginatedApartmentsResponse, type PaginatedResponseSchema, type PaginationParamsSchema, type PermissionFieldsSchema, type PermissionsResponseSchema, type PollTypeOption, PrioritySchema, type PrioritySchemaType, type RegisterSchema, type ReorderFaqsSchema, type ResetPasswordSchema, type SearchUsersQuerySchema, type SendMessageSchema, type StorageUnit, type StorageUnitRole, type StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, type TimeSchema, type UpdateBuildingSchema, type UpdateConversationSchema, type UpdateEventSchema, type UpdateFailureReportSchema, type UpdateFaqSchema, type UpdateMaintenanceLogSchema, type UpdateNoticeSchema, type UpdateOrgMemberRoleSchema, type UpdateOrganizationSchema, type UpdatePasswordSchema, type UpdateTransactionCategorySchema, type UpdateUserBuildingRoleSchema, type UserEntitySchema, type UuidSchema, type VerifyOtpSchema, type VotePollSchema, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureStatusOptions, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceStatusOptions, noticeEventSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema };
