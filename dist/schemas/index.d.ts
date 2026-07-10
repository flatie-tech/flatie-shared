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
 * Canonical error envelope returned by every 4xx/5xx response from the
 * Flatie backend.
 *
 * Extends the base `apiErrorSchema` (always-present `statusCode`, `message`,
 * `timestamp`, `path`) with the optional `code` field populated by
 * `AllExceptionsFilter` whenever a `DomainException` is thrown — carrying
 * the concrete `BACKEND_ERROR_CODES` value so consumers can discriminate
 * by code at the boundary.
 *
 * Referenced by the backend's `@ApiTypedErrorResponse` decorator so every
 * 4xx/5xx response in the OpenAPI spec resolves to this shape. Registered
 * as `ApiErrorResponse` in the backend's OpenAPI components.
 */
declare const apiErrorResponseSchema: z.ZodObject<{
    statusCode: z.ZodNumber;
    message: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;
    timestamp: z.ZodString;
    path: z.ZodString;
    code: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
}, z.core.$strip>;
type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

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

declare const certiliaUserinfoSchema: z.ZodPipe<z.ZodObject<{
    sub: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    email_verified: z.ZodOptional<z.ZodBoolean>;
    name: z.ZodOptional<z.ZodString>;
    given_name: z.ZodOptional<z.ZodString>;
    family_name: z.ZodOptional<z.ZodString>;
    phone_number: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        formatted: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>]>>;
    oib: z.ZodOptional<z.ZodString>;
    pin: z.ZodOptional<z.ZodString>;
    oib_pin: z.ZodOptional<z.ZodString>;
}, z.core.$loose>, z.ZodTransform<{
    sub: string;
    email: string | undefined;
    emailVerified: boolean;
    name: string | undefined;
    givenName: string | undefined;
    familyName: string | undefined;
    phoneNumber: string | undefined;
    oib: string | undefined;
    raw: Record<string, unknown>;
}, {
    [x: string]: unknown;
    sub: string;
    email?: string | undefined;
    email_verified?: boolean | undefined;
    name?: string | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
    phone_number?: string | undefined;
    address?: string | {
        [x: string]: unknown;
        formatted?: string | undefined;
    } | undefined;
    oib?: string | undefined;
    pin?: string | undefined;
    oib_pin?: string | undefined;
}>>;
type CertiliaUserinfo = z.infer<typeof certiliaUserinfoSchema>;

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
    owner: "owner";
    tenant: "tenant";
}>;
declare const apartmentUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        owner: "owner";
        tenant: "tenant";
    }>;
    joinedAt: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$loose>;
type ApartmentUser = z.infer<typeof apartmentUserSchema>;
declare const apartmentSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    number: z.ZodString;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
            owner: "owner";
            tenant: "tenant";
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
        paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                owner: "owner";
                tenant: "tenant";
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
        platform: "platform";
        management_firm: "management_firm";
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
        org_admin: "org_admin";
        supervisor: "supervisor";
        referent: "referent";
        operative: "operative";
    }>;
}, z.core.$strip>;
/**
 * Update an existing organization member's role
 */
declare const updateOrgMemberRoleSchema: z.ZodObject<{
    orgRole: z.ZodEnum<{
        org_admin: "org_admin";
        supervisor: "supervisor";
        referent: "referent";
        operative: "operative";
    }>;
}, z.core.$strip>;
/**
 * Invite a user to an organization by email
 */
declare const inviteOrgMemberSchema: z.ZodObject<{
    email: z.ZodString;
    orgRole: z.ZodEnum<{
        org_admin: "org_admin";
        supervisor: "supervisor";
        referent: "referent";
        operative: "operative";
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
 * Building type options — lowercase_snake_case to match the backend pgEnum.
 */
declare const BUILDING_TYPES: readonly ["residential", "commercial", "residential_commercial"];
type BuildingTypeOption = (typeof BUILDING_TYPES)[number];
/**
 * Building type schema
 */
declare const buildingTypeSchema: z.ZodEnum<{
    residential: "residential";
    commercial: "commercial";
    residential_commercial: "residential_commercial";
}>;
/**
 * Validation constants for buildings
 */
declare const BUILDING_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 100;
    readonly ADDRESS_MIN: 1;
    readonly ADDRESS_MAX: 200;
    readonly HOUSE_NUMBER_MIN: 1;
    readonly HOUSE_NUMBER_MAX: 20;
    readonly OTP_LENGTH: 6;
    readonly UNITS_MIN: 1;
    readonly UNITS_MAX: 10000;
};
/**
 * Create building request schema — matches flatie-backend's
 * `POST /buildings` multipart/form-data payload. `coverImage` and
 * `houseRulesFile` files are uploaded separately via the multipart
 * interceptor and merged in the controller after validation.
 */
declare const createBuildingSchema: z.ZodObject<{
    name: z.ZodString;
    addressId: z.ZodOptional<z.ZodString>;
    streetId: z.ZodOptional<z.ZodString>;
    houseNumber: z.ZodOptional<z.ZodString>;
    type: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>;
    totalUnits: z.ZodCoercedNumber<unknown>;
    isStratified: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    role: z.ZodOptional<z.ZodEnum<{
        co_owner: "co_owner";
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
    }>>;
    iban: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    oib: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    monthlyFeePerSqm: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    monthlyFeeCommercialPerSqm: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    apartmentResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    apartmentCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    garageResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    garageCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    storageResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    storageCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    billingBuildingCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Update building request schema — all top-level fields optional.
 * `coverImage` and `houseRulesFile` upload files via multipart;
 * `removeHouseRulesFile` is an explicit opt-in to clear the
 * existing house-rules attachment.
 */
declare const updateBuildingSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    addressId: z.ZodOptional<z.ZodString>;
    streetId: z.ZodOptional<z.ZodString>;
    houseNumber: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>>;
    totalUnits: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    isStratified: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    removeHouseRulesFile: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    iban: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    oib: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    monthlyFeePerSqm: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    monthlyFeeCommercialPerSqm: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    apartmentResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    apartmentCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    garageResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    garageCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    storageResidentialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    storageCommercialCoef: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    billingBuildingCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    fundsSource: z.ZodOptional<z.ZodEnum<{
        manual: "manual";
        camt: "camt";
    }>>;
    pricuvaRefMode: z.ZodOptional<z.ZodEnum<{
        apartment: "apartment";
        owner: "owner";
    }>>;
}, z.core.$strip>;
/**
 * Join building with OTP — backend wire shape is
 * `POST /buildings/:buildingId/join-with-otp { code: string }`.
 * buildingId comes from the URL, not the body.
 */
declare const joinBuildingWithOtpSchema: z.ZodObject<{
    code: z.ZodString;
}, z.core.$strip>;
/**
 * Update user building role schema (admin endpoint)
 */
declare const updateUserBuildingRoleSchema: z.ZodObject<{
    userId: z.ZodString;
    roleType: z.ZodOptional<z.ZodEnum<{
        co_owner: "co_owner";
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
    }>>;
    buildingSurfacePercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    chatVisibleToCoOwners: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type CreateBuildingSchema = z.infer<typeof createBuildingSchema>;
type UpdateBuildingSchema = z.infer<typeof updateBuildingSchema>;
type JoinBuildingWithOtpSchema = z.infer<typeof joinBuildingWithOtpSchema>;
type UpdateUserBuildingRoleSchema = z.infer<typeof updateUserBuildingRoleSchema>;

/**
 * One row of per-building daily quota configuration. `dailyLimit` is an integer
 * number of actions allowed per day per user in that building; `null` means
 * "unlimited" (quota is disabled for this resource in this building).
 */
declare const buildingQuotaEntrySchema: z.ZodObject<{
    resourceType: z.ZodEnum<{
        notification: "notification";
        comment: "comment";
        maintenance_request: "maintenance_request";
        invite: "invite";
    }>;
    dailyLimit: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
/**
 * PUT /buildings/:id/quotas payload — full list of quota rows the representative
 * is configuring for the building. Missing resource types fall back to the
 * platform defaults from `QUOTA_DEFAULT_DAILY_LIMITS`.
 */
declare const buildingQuotaConfigSchema: z.ZodObject<{
    quotas: z.ZodArray<z.ZodObject<{
        resourceType: z.ZodEnum<{
            notification: "notification";
            comment: "comment";
            maintenance_request: "maintenance_request";
            invite: "invite";
        }>;
        dailyLimit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * GET /buildings/:id/quotas response shape.
 */
declare const buildingQuotaListSchema: z.ZodObject<{
    buildingId: z.ZodString;
    quotas: z.ZodArray<z.ZodObject<{
        resourceType: z.ZodEnum<{
            notification: "notification";
            comment: "comment";
            maintenance_request: "maintenance_request";
            invite: "invite";
        }>;
        dailyLimit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type BuildingQuotaEntry = z.infer<typeof buildingQuotaEntrySchema>;
type BuildingQuotaConfig = z.infer<typeof buildingQuotaConfigSchema>;
type BuildingQuotaList = z.infer<typeof buildingQuotaListSchema>;

/**
 * Update building settings request — body of
 * `PATCH /buildings/:buildingId/settings`.
 *
 * Every field optional (partial patch). The backend service enforces
 * two invariants on top of this shape:
 *  - last-method-lock: at least one `voting*Enabled` flag must remain
 *    true (see `utils/voting-methods.ts` for the client-side check);
 *  - `minVerificationTierForConsensus` cannot go below the ZUOZ legal
 *    floor and must stay consistent with the printed-signature toggle.
 */
declare const updateBuildingSettingsSchema: z.ZodObject<{
    ownershipPercentageSource: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        users: "users";
        units: "units";
    }>>>;
    requireApprovalForNotices: z.ZodOptional<z.ZodBoolean>;
    requireApprovalForFailureReports: z.ZodOptional<z.ZodBoolean>;
    requireApprovalForPolls: z.ZodOptional<z.ZodBoolean>;
    requireApprovalForEvents: z.ZodOptional<z.ZodBoolean>;
    allowAnonymousPosting: z.ZodOptional<z.ZodBoolean>;
    faqEnabled: z.ZodOptional<z.ZodBoolean>;
    houseRulesEnabled: z.ZodOptional<z.ZodBoolean>;
    chatEnabled: z.ZodOptional<z.ZodBoolean>;
    commentsEnabled: z.ZodOptional<z.ZodBoolean>;
    votingCertiliaEnabled: z.ZodOptional<z.ZodBoolean>;
    votingPrintedSignatureEnabled: z.ZodOptional<z.ZodBoolean>;
    minVerificationTierForConsensus: z.ZodOptional<z.ZodNumber>;
    addonAiEnabled: z.ZodOptional<z.ZodBoolean>;
    addonStorage5gbEnabled: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type UpdateBuildingSettingsSchema = z.infer<typeof updateBuildingSettingsSchema>;

/**
 * Business partner (Croatian "poslovni partner") scoped to an
 * organization. Address-book with bookkeeping fields — later linkable
 * to expense transactions via `expense_transactions.partner_id`.
 *
 * `oib` and `taxNumber` are separate on purpose: `oib` is the 11-digit
 * Croatian tax ID, while `taxNumber` ("broj poreznog obveznika") is a
 * free-form field used for foreign partners with non-HR tax IDs.
 */
declare const businessPartnerResponseSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    code: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    mobile: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contactPerson: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bankAccount: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    taxNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isVatPayer: z.ZodBoolean;
    isActive: z.ZodBoolean;
    createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>>;
}, z.core.$strip>;
type BusinessPartnerResponse = z.infer<typeof businessPartnerResponseSchema>;
declare const createBusinessPartnerSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    city: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    postalCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    mobile: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    contactPerson: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    iban: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bankAccount: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    taxNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    oib: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    isVatPayer: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type CreateBusinessPartnerInput = z.infer<typeof createBusinessPartnerSchema>;
declare const updateBusinessPartnerSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    city: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    postalCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    mobile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    contactPerson: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    bankAccount: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    taxNumber: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    isVatPayer: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    isActive: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
type UpdateBusinessPartnerInput = z.infer<typeof updateBusinessPartnerSchema>;

declare const ENTITY_LINK_TYPES: readonly ["image", "document", "invoice", "warranty", "agenda", "schedule", "deadline", "meeting", "resolved_by", "based_on", "discussed_in", "expense_for", "related_to"];
declare const LINKABLE_ENTITY_TYPES: readonly ["failure_report", "maintenance_log", "notice", "event", "poll", "file", "expense_transaction"];
declare const entityLinkTypeSchema: z.ZodEnum<{
    image: "image";
    document: "document";
    invoice: "invoice";
    warranty: "warranty";
    agenda: "agenda";
    schedule: "schedule";
    deadline: "deadline";
    meeting: "meeting";
    resolved_by: "resolved_by";
    based_on: "based_on";
    discussed_in: "discussed_in";
    expense_for: "expense_for";
    related_to: "related_to";
}>;
declare const linkableEntityTypeSchema: z.ZodEnum<{
    failure_report: "failure_report";
    maintenance_log: "maintenance_log";
    notice: "notice";
    event: "event";
    poll: "poll";
    file: "file";
    expense_transaction: "expense_transaction";
}>;
/** One end of an entity link. */
declare const entityLinkEndpointSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
}, z.core.$strip>;
/**
 * Create-link request. The (source.type, target.type, linkType) triple must
 * appear in `ALLOWED_ENTITY_LINKS`; both entities must belong to the URL's
 * building. Idempotent — re-creating an existing link is a no-op.
 */
declare const createEntityLinkRequestSchema: z.ZodObject<{
    source: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
        }>;
    }, z.core.$strip>;
    target: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
        }>;
    }, z.core.$strip>;
    linkType: z.ZodEnum<{
        image: "image";
        document: "document";
        invoice: "invoice";
        warranty: "warranty";
        agenda: "agenda";
        schedule: "schedule";
        deadline: "deadline";
        meeting: "meeting";
        resolved_by: "resolved_by";
        based_on: "based_on";
        discussed_in: "discussed_in";
        expense_for: "expense_for";
        related_to: "related_to";
    }>;
}, z.core.$strip>;
/** Delete-link request — the exact triple to remove. */
declare const deleteEntityLinkRequestSchema: z.ZodObject<{
    source: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
        }>;
    }, z.core.$strip>;
    target: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
        }>;
    }, z.core.$strip>;
    linkType: z.ZodEnum<{
        image: "image";
        document: "document";
        invoice: "invoice";
        warranty: "warranty";
        agenda: "agenda";
        schedule: "schedule";
        deadline: "deadline";
        meeting: "meeting";
        resolved_by: "resolved_by";
        based_on: "based_on";
        discussed_in: "discussed_in";
        expense_for: "expense_for";
        related_to: "related_to";
    }>;
}, z.core.$strip>;
/**
 * Flat variant of the delete request, carried in query params (DELETE
 * requests with bodies are dropped by some proxies).
 */
declare const deleteEntityLinkQuerySchema: z.ZodObject<{
    sourceId: z.ZodString;
    sourceType: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
    targetId: z.ZodString;
    targetType: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
    linkType: z.ZodEnum<{
        image: "image";
        document: "document";
        invoice: "invoice";
        warranty: "warranty";
        agenda: "agenda";
        schedule: "schedule";
        deadline: "deadline";
        meeting: "meeting";
        resolved_by: "resolved_by";
        based_on: "based_on";
        discussed_in: "discussed_in";
        expense_for: "expense_for";
        related_to: "related_to";
    }>;
}, z.core.$strip>;
/** Query params for listing an entity's links (both directions). */
declare const getEntityLinksQuerySchema: z.ZodObject<{
    entityId: z.ZodString;
    entityType: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
}, z.core.$strip>;
/**
 * Query params for the batch link-count lookup. `ids` is a comma-separated
 * list of UUIDs (query-string friendly, unambiguous across serializers); it is
 * split, trimmed, and validated as UUIDs. Capped to keep the count query bounded.
 */
declare const getEntityLinkCountsQuerySchema: z.ZodObject<{
    entityType: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
    ids: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>, z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type EntityLinkEndpoint = z.infer<typeof entityLinkEndpointSchema>;
type CreateEntityLinkRequest = z.infer<typeof createEntityLinkRequestSchema>;
type DeleteEntityLinkRequest = z.infer<typeof deleteEntityLinkRequestSchema>;
type DeleteEntityLinkQuery = z.infer<typeof deleteEntityLinkQuerySchema>;
type GetEntityLinksQuery = z.infer<typeof getEntityLinksQuerySchema>;
type GetEntityLinkCountsQuery = z.infer<typeof getEntityLinkCountsQuerySchema>;

/**
 * Event type options
 */
declare const EVENT_TYPES: readonly ["service", "inspection", "maintenance", "meeting", "discussion", "planned_works", "waste_collection", "other"];
type EventTypeOption = (typeof EVENT_TYPES)[number];
/**
 * Event color options
 */
declare const EVENT_COLORS: readonly ["blue", "green", "red", "yellow", "purple", "orange", "gray"];
type EventColorOption = (typeof EVENT_COLORS)[number];
/**
 * Recurrence cadence options
 */
declare const RECURRENCE_TYPES: readonly ["none", "weekly", "biweekly", "monthly", "yearly"];
type RecurrenceTypeOption = (typeof RECURRENCE_TYPES)[number];
/**
 * Mapping of event types to default colors
 */
declare const EVENT_TYPE_COLOR_MAP: Record<EventTypeOption, EventColorOption>;
/**
 * Event type schema
 */
declare const eventTypeSchema: z.ZodEnum<{
    meeting: "meeting";
    maintenance: "maintenance";
    other: "other";
    service: "service";
    inspection: "inspection";
    discussion: "discussion";
    planned_works: "planned_works";
    waste_collection: "waste_collection";
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
 * Recurrence type schema
 */
declare const recurrenceTypeSchema: z.ZodEnum<{
    weekly: "weekly";
    monthly: "monthly";
    yearly: "yearly";
    none: "none";
    biweekly: "biweekly";
}>;
/**
 * Time object schema (for form inputs)
 */
declare const timeSchema: z.ZodObject<{
    hour: z.ZodNumber;
    minute: z.ZodNumber;
}, z.core.$strip>;
/**
 * Create event request schema — mirrors the backend `CreateEventDto`
 * (flatie-backend `src/modules/events/dto/create-event.dto.ts`).
 */
declare const createEventSchema: z.ZodObject<{
    buildingId: z.ZodString;
    type: z.ZodEnum<{
        meeting: "meeting";
        maintenance: "maintenance";
        other: "other";
        service: "service";
        inspection: "inspection";
        discussion: "discussion";
        planned_works: "planned_works";
        waste_collection: "waste_collection";
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
    isAnonymous: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    recurrenceType: z.ZodOptional<z.ZodEnum<{
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
        none: "none";
        biweekly: "biweekly";
    }>>;
    recurrenceEndDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    subtype: z.ZodOptional<z.ZodString>;
    onlineMeetingUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    meetingMinutes: z.ZodOptional<z.ZodString>;
    minuteTakerId: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Update event request schema — partial variant of the create schema
 * (no cross-field date refinement; the backend validates the merged result).
 */
declare const updateEventSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<{
        meeting: "meeting";
        maintenance: "maintenance";
        other: "other";
        service: "service";
        inspection: "inspection";
        discussion: "discussion";
        planned_works: "planned_works";
        waste_collection: "waste_collection";
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
    isAnonymous: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    recurrenceType: z.ZodOptional<z.ZodEnum<{
        weekly: "weekly";
        monthly: "monthly";
        yearly: "yearly";
        none: "none";
        biweekly: "biweekly";
    }>>;
    recurrenceEndDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    subtype: z.ZodOptional<z.ZodString>;
    onlineMeetingUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    meetingMinutes: z.ZodOptional<z.ZodString>;
    minuteTakerId: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type TimeSchema = z.infer<typeof timeSchema>;
type CreateEventSchema = z.infer<typeof createEventSchema>;
type UpdateEventSchema = z.infer<typeof updateEventSchema>;

/**
 * Validation constants for failure reports
 */
declare const FAILURE_REPORT_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly DESCRIPTION_MAX: 2000;
    readonly COMMON_AREA_DESCRIPTION_MAX: 500;
};
/**
 * Failure report nested event schema (same shape as notice event —
 * optional title/description that default to the report title).
 */
declare const failureReportEventSchema: z.ZodObject<{
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Create failure report request schema — matches
 * `POST /buildings/:buildingId/failure-reports` multipart/form-data.
 * buildingId comes from the URL, not the body.
 */
declare const createFailureReportSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    isAnonymous: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    priority: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    locationType: z.ZodOptional<z.ZodEnum<{
        common_area: "common_area";
        own_unit: "own_unit";
    }>>;
    commonAreaDescription: z.ZodOptional<z.ZodString>;
    unitType: z.ZodOptional<z.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>>;
    unitId: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    maintenanceLogIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * Update failure report request schema — all fields optional, same
 * location conditional rule as create. Adds `status` and
 * `removeChildFileIds`.
 */
declare const updateFailureReportSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    locationType: z.ZodOptional<z.ZodEnum<{
        common_area: "common_area";
        own_unit: "own_unit";
    }>>;
    commonAreaDescription: z.ZodOptional<z.ZodString>;
    unitType: z.ZodOptional<z.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>>;
    unitId: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    maintenanceLogIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * Approve failure report request schema
 */
declare const approveFailureReportSchema: z.ZodObject<{
    approved: z.ZodBoolean;
}, z.core.$strip>;
type FailureReportEventSchema = z.infer<typeof failureReportEventSchema>;
type CreateFailureReportSchema = z.infer<typeof createFailureReportSchema>;
type UpdateFailureReportSchema = z.infer<typeof updateFailureReportSchema>;
type ApproveFailureReportSchema = z.infer<typeof approveFailureReportSchema>;

declare const garageRoleSchema: z.ZodEnum<{
    owner: "owner";
    tenant: "tenant";
}>;
type GarageRole = z.infer<typeof garageRoleSchema>;
declare const garageUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        owner: "owner";
        tenant: "tenant";
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
            owner: "owner";
            tenant: "tenant";
        }>;
        joinedAt: z.ZodString;
        ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
type Garage = z.infer<typeof garageSchema>;

/** Body of `POST /buildings/:buildingId/income`. */
declare const createIncomeSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodCoercedNumber<unknown>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Body of `PUT /buildings/:buildingId/income/:id` — partial patch. */
declare const updateIncomeSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
type UpdateIncomeSchema = z.infer<typeof updateIncomeSchema>;

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
 * Validation constants for maintenance logs
 */
declare const MAINTENANCE_LOG_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly DESCRIPTION_MAX: 2000;
    readonly CONTRACTOR_MIN: 1;
    readonly EVENTS_MIN: 1;
};
/**
 * Nested event schema for maintenance logs. Events are required on
 * create (min 1), optional on update.
 */
declare const maintenanceLogEventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Create maintenance log request schema — matches
 * `POST /buildings/:buildingId/maintenance-logs` multipart/form-data.
 * buildingId comes from the URL, not the body.
 */
declare const createMaintenanceLogSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    contractor: z.ZodString;
    cost: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodString>;
    financedBy: z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>;
    warranty: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    pollId: z.ZodOptional<z.ZodString>;
    pollIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    expenseIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Update maintenance log request schema — all fields optional.
 * Events passed as an array replace the full event set (events
 * omitted are deleted; events with an `id` are updated in place).
 * Adds `removeChildFileIds` for granular file removal.
 */
declare const updateMaintenanceLogSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    contractor: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodString>>;
    financedBy: z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>;
    warranty: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    pollId: z.ZodOptional<z.ZodString>;
    pollIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    expenseIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
type MaintenanceLogEventSchema = z.infer<typeof maintenanceLogEventSchema>;
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
    readonly EVENT_TITLE_MAX: 100;
};
/**
 * Notice event schema (nested inside create/update notice).
 *
 * `id` is optional — when present on update, the backend updates an
 * existing event; when absent it creates a new one, and events
 * omitted from the array are deleted.
 */
declare const noticeEventSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Create notice request schema — matches flatie-backend's
 * `POST /buildings/:buildingId/notices` multipart/form-data payload.
 * buildingId comes from the URL, not the body.
 */
declare const createNoticeSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    isAnonymous: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    pinned: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
/**
 * Update notice request schema — all top-level fields optional.
 * Events passed as an array replace the full event set (events not
 * in the array are deleted; events with an `id` are updated in place;
 * events without an `id` are created).
 */
declare const updateNoticeSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    pinned: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
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
 * One row of per-organization daily quota configuration. Mirrors the
 * per-building schema but keyed on orgId + OrgQuotaResourceType. Null
 * `dailyLimit` means "unlimited" for this resource in this org.
 */
declare const orgQuotaEntrySchema: z.ZodObject<{
    resourceType: z.ZodEnum<{
        notification: "notification";
        member_invite: "member_invite";
        building_create: "building_create";
    }>;
    dailyLimit: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
/**
 * PUT /organizations/:orgId/quotas payload. Missing resource types fall
 * back to the platform defaults in `ORG_QUOTA_DEFAULT_DAILY_LIMITS`.
 */
declare const orgQuotaConfigSchema: z.ZodObject<{
    quotas: z.ZodArray<z.ZodObject<{
        resourceType: z.ZodEnum<{
            notification: "notification";
            member_invite: "member_invite";
            building_create: "building_create";
        }>;
        dailyLimit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * GET /organizations/:orgId/quotas response shape.
 */
declare const orgQuotaListSchema: z.ZodObject<{
    orgId: z.ZodString;
    quotas: z.ZodArray<z.ZodObject<{
        resourceType: z.ZodEnum<{
            notification: "notification";
            member_invite: "member_invite";
            building_create: "building_create";
        }>;
        dailyLimit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type OrgQuotaEntry = z.infer<typeof orgQuotaEntrySchema>;
type OrgQuotaConfig = z.infer<typeof orgQuotaConfigSchema>;
type OrgQuotaList = z.infer<typeof orgQuotaListSchema>;

/**
 * Owner entity. Decoupled from `user` — `userId` is nullable and set
 * only when the physical person has registered on Flatie (auto-linked
 * by email match across buildings, or manually via the admin UI).
 */
declare const ownerResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fullName: z.ZodString;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>>;
}, z.core.$strip>;
type OwnerResponse = z.infer<typeof ownerResponseSchema>;
/**
 * Create-owner request. `fullName` is the only hard requirement; the
 * rest are optional because the org may record just what they have.
 * If an email is given and it matches an existing user, the backend
 * auto-links the new owner to that user.
 */
declare const createOwnerSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    oib: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    paymentRefCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    userId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
type CreateOwnerInput = z.infer<typeof createOwnerSchema>;
declare const updateOwnerSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    userId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, z.core.$strip>;
type UpdateOwnerInput = z.infer<typeof updateOwnerSchema>;
/**
 * Assign an owner to a unit (apartment/garage/storage). Closes any
 * existing open assignment on that unit by owner-id via the service
 * (not modeled in this schema — purely a request shape).
 */
declare const assignOwnerSchema: z.ZodObject<{
    ownerId: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
type AssignOwnerInput = z.infer<typeof assignOwnerSchema>;

/**
 * Poll type options
 */
declare const POLL_TYPES: readonly ["consensus", "community"];
type PollTypeOption = (typeof POLL_TYPES)[number];
/**
 * Poll type enum schema
 */
declare const pollTypeSchema: z.ZodEnum<{
    consensus: "consensus";
    community: "community";
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
 * Create poll request schema — matches flatie-backend's
 * `POST /buildings/:buildingId/polls` multipart/form-data payload.
 * buildingId comes from the URL, not the body.
 */
declare const createPollSchema: z.ZodObject<{
    question: z.ZodString;
    options: z.ZodPipe<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>, z.ZodArray<z.ZodString>>;
    pollType: z.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    consensusCategory: z.ZodOptional<z.ZodString>;
    legalBasis: z.ZodOptional<z.ZodString>;
    scopedUnitIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    scopedUserIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    fileIds: z.ZodDefault<z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>>;
}, z.core.$strip>;
/**
 * Update poll request schema — all fields optional; the extra
 * `status` discriminant (`active` / `inactive` / `ended`) and the
 * `removeChildFileIds` list matches the legacy `UpdatePollDto`.
 */
declare const updatePollSchema: z.ZodObject<{
    question: z.ZodOptional<z.ZodString>;
    options: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    pollType: z.ZodOptional<z.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        ended: "ended";
    }>>;
    scopedUnitIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    scopedUserIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
/**
 * Vote on poll request schema
 *
 * Backend stores poll options as a JSON array and votes reference the
 * 0-based index, not the option's row id — that's what the controller
 * expects on the wire.
 */
declare const votePollSchema: z.ZodObject<{
    selectedOptionIndex: z.ZodNumber;
}, z.core.$strip>;
/**
 * Finalize poll request schema
 *
 * A boolean toggle — `true` seals the poll, `false` is a no-op the
 * controller still accepts to match the existing API shape.
 */
declare const finalizePollSchema: z.ZodObject<{
    finalize: z.ZodBoolean;
}, z.core.$strip>;
type CreatePollSchema = z.infer<typeof createPollSchema>;
type UpdatePollSchema = z.infer<typeof updatePollSchema>;
type VotePollSchema = z.infer<typeof votePollSchema>;
type FinalizePollSchema = z.infer<typeof finalizePollSchema>;

declare const storageUnitRoleSchema: z.ZodEnum<{
    owner: "owner";
    tenant: "tenant";
}>;
type StorageUnitRole = z.infer<typeof storageUnitRoleSchema>;
declare const storageUnitUserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodEnum<{
        owner: "owner";
        tenant: "tenant";
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
            owner: "owner";
            tenant: "tenant";
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
 * Zod preprocessor for array fields arriving through multipart/form-data.
 *
 * When a form posts an array field via multipart, the browser or form
 * serializer can send one of four shapes — none of which are raw arrays
 * on the server side:
 *
 *   - real array (e.g. after Fastify multipart already parsed it)
 *   - JSON-encoded string `'["a","b"]'` (manual form.append of
 *     JSON.stringify)
 *   - a single string `'a'` (one append call)
 *   - an empty string `''` (absent field submitted as blank)
 *
 * Normalizes all four into a plain array before handing off to the
 * inner schema's validation. Mirrors the behavior of the class-transformer
 * `@Transform` hooks that wrapped every `options` / `fileIds` /
 * `scopedUnitIds` / etc. field on the legacy DTOs.
 *
 * Leaves `undefined` / `null` unchanged so the caller can `.optional()`
 * the whole thing and have it skip when the field is absent.
 */
declare function multipartArray<T extends z.ZodTypeAny>(itemSchema: T): z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<T>>;
/**
 * Zod preprocessor for boolean fields arriving through multipart/form-data.
 *
 * Multipart posts booleans as strings (`'true'` / `'false'`) or bare
 * checkbox state. Accepts these plus real booleans; everything else
 * falls through untouched so the inner schema can reject it.
 */
declare function multipartBoolean(): z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>;

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
        organization: "organization";
        building: "building";
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

/** Params for `GET /representatives/users`. */
declare const getRepUsersParamsSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    buildingRole: z.ZodOptional<z.ZodEnum<{
        co_owner: "co_owner";
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
    }>>;
    fromDate: z.ZodOptional<z.ZodString>;
    toDate: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
/** Params for `GET /representatives/buildings`. */
declare const getRepBuildingsParamsSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>>;
    status: z.ZodOptional<z.ZodString>;
    fromDate: z.ZodOptional<z.ZodString>;
    toDate: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    offset: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    sortBy: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    sortOrder: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
type GetRepUsersParams = z.infer<typeof getRepUsersParamsSchema>;
type GetRepBuildingsParams = z.infer<typeof getRepBuildingsParamsSchema>;

declare const aiChatMessageSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    role: z.ZodEnum<{
        user: "user";
        system: "system";
        assistant: "assistant";
    }>;
    content: z.ZodOptional<z.ZodString>;
    parts: z.ZodOptional<z.ZodArray<z.ZodAny>>;
}, z.core.$strip>;
declare const aiChatRequestSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    trigger: z.ZodOptional<z.ZodString>;
    buildingId: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodEnum<{
        hr: "hr";
        en: "en";
        de: "de";
    }>>;
    messages: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        role: z.ZodEnum<{
            user: "user";
            system: "system";
            assistant: "assistant";
        }>;
        content: z.ZodOptional<z.ZodString>;
        parts: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type AiChatMessagePayload = z.infer<typeof aiChatMessageSchema>;
type AiChatRequestPayload = z.infer<typeof aiChatRequestSchema>;

/**
 * Body of `POST /buildings/:buildingId/email/threads` — representative
 * opens a new outbound thread to an external party (typically the
 * building's manager / upravitelj).
 */
declare const createEmailThreadRequestSchema: z.ZodObject<{
    recipientEmail: z.ZodString;
    recipientName: z.ZodOptional<z.ZodString>;
    ccEmails: z.ZodOptional<z.ZodArray<z.ZodString>>;
    subject: z.ZodString;
    body: z.ZodString;
}, z.core.$strict>;
type CreateEmailThreadRequestPayload = z.infer<typeof createEmailThreadRequestSchema>;

/**
 * Body of `POST /buildings/:buildingId/email/threads/:threadId/reply` —
 * representative sends a reply message on an existing thread.
 */
declare const replyEmailThreadRequestSchema: z.ZodObject<{
    body: z.ZodString;
    ccEmails: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strict>;
type ReplyEmailThreadRequestPayload = z.infer<typeof replyEmailThreadRequestSchema>;

/**
 * Update failure report request schema — the canonical PATCH request
 * shape, combining the failure-report `id` (from the URL) with the
 * optional body fields validated by `updateFailureReportSchema` in
 * `entities/failure-report.schema.ts`.
 *
 * The cross-field `refineLocation` rule (commonAreaDescription required
 * for common_area locations; unitType + unitId required for own_unit)
 * is preserved by Zod's `.extend()` on a refined object.
 */
declare const updateFailureReportRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>>;
    priority: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    locationType: z.ZodOptional<z.ZodEnum<{
        common_area: "common_area";
        own_unit: "own_unit";
    }>>;
    commonAreaDescription: z.ZodOptional<z.ZodString>;
    unitType: z.ZodOptional<z.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>>;
    unitId: z.ZodOptional<z.ZodString>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    maintenanceLogIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    id: z.ZodString;
}, z.core.$strip>;
type UpdateFailureReportRequestPayload = z.infer<typeof updateFailureReportRequestSchema>;

/**
 * Update maintenance-log request schema — the canonical PATCH request
 * shape, combining the maintenance-log `id` (from the URL) with the
 * optional body fields validated by `updateMaintenanceLogSchema` in
 * `entities/maintenance-log.schema.ts`.
 */
declare const updateMaintenanceLogRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    contractor: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodString>>;
    financedBy: z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>;
    warranty: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    pollId: z.ZodOptional<z.ZodString>;
    pollIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    expenseIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    id: z.ZodString;
}, z.core.$strip>;
type UpdateMaintenanceLogRequestPayload = z.infer<typeof updateMaintenanceLogRequestSchema>;

/**
 * Update notice request schema — the canonical PATCH request shape,
 * combining the notice `id` (from the URL) with the optional body
 * fields validated by `updateNoticeSchema` in `entities/notice.schema.ts`.
 *
 * Consumers (frontend server actions, backend handlers that want a
 * single-object signature) should prefer this over hand-rolling their
 * own wrapper — the body shape stays in lockstep with the backend
 * controller because it reuses the entity-level body schema directly.
 */
declare const updateNoticeRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    pinned: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    id: z.ZodString;
}, z.core.$strip>;
type UpdateNoticeRequestPayload = z.infer<typeof updateNoticeRequestSchema>;

/**
 * Update poll request schema — the canonical PATCH request shape,
 * combining the poll `id` (from the URL) with the optional body fields
 * validated by `updatePollSchema` in `entities/poll.schema.ts`.
 */
declare const updatePollRequestSchema: z.ZodObject<{
    question: z.ZodOptional<z.ZodString>;
    options: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    pollType: z.ZodOptional<z.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>>;
    deadline: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        ended: "ended";
    }>>;
    scopedUnitIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    scopedUserIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    id: z.ZodString;
}, z.core.$strip>;
type UpdatePollRequestPayload = z.infer<typeof updatePollRequestSchema>;

/**
 * Recursively strips the `[k: string]: unknown` index signature that
 * Zod 4's `looseObject` adds to inferred types. Gives consumers clean
 * types where only explicitly declared properties are accessible, at
 * every nesting level.
 *
 * Preserves Date, RegExp, and other built-in objects as-is.
 */
type Strict<T> = T extends Date | RegExp | Map<any, any> | Set<any> ? T : T extends readonly (infer U)[] ? Strict<U>[] : T extends object ? {
    [K in keyof T as string extends K ? never : K]: Strict<T[K]>;
} : T;

/**
 * Response shape returned by bare-action endpoints (approve, archive, restore,
 * permanent-delete, decline, etc.) — the controller finishes the side effect
 * and returns a single human-readable confirmation string.
 *
 * Shape is intentionally minimal: backend controllers across notices, polls,
 * failure-reports, maintenance-logs, events, garages, storage-units, apartments,
 * transaction-categories, income-transactions, and more all return
 * `{ message: string }` with no additional fields.
 */
declare const messageResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
type MessageResponse = Strict<z.infer<typeof messageResponseSchema>>;

declare const aiUsageResponseSchema: z.ZodObject<{
    buildingId: z.ZodString;
    period: z.ZodString;
    spentMicroUsd: z.ZodNumber;
    messageCount: z.ZodNumber;
    capMicroUsd: z.ZodNumber;
    userSpentMicroUsd: z.ZodOptional<z.ZodNumber>;
    userCapMicroUsd: z.ZodOptional<z.ZodNumber>;
}, z.core.$loose>;
type AiUsageResponse = z.infer<typeof aiUsageResponseSchema>;

declare const ARCHIVE_TYPES: readonly ["apartments", "blog_posts", "building_join_requests", "buildings", "comments", "events", "failure_reports", "faqs", "files", "garages", "income_transactions", "maintenance_logs", "notices", "organizations", "polls", "recurring_templates", "storage_units", "transaction_categories"];
type ArchiveType = (typeof ARCHIVE_TYPES)[number];
declare const archiveTypeSchema: z.ZodEnum<{
    buildings: "buildings";
    notices: "notices";
    polls: "polls";
    events: "events";
    apartments: "apartments";
    blog_posts: "blog_posts";
    building_join_requests: "building_join_requests";
    comments: "comments";
    failure_reports: "failure_reports";
    faqs: "faqs";
    files: "files";
    garages: "garages";
    income_transactions: "income_transactions";
    maintenance_logs: "maintenance_logs";
    organizations: "organizations";
    recurring_templates: "recurring_templates";
    storage_units: "storage_units";
    transaction_categories: "transaction_categories";
}>;
declare const archivedItemSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        buildings: "buildings";
        notices: "notices";
        polls: "polls";
        events: "events";
        apartments: "apartments";
        blog_posts: "blog_posts";
        building_join_requests: "building_join_requests";
        comments: "comments";
        failure_reports: "failure_reports";
        faqs: "faqs";
        files: "files";
        garages: "garages";
        income_transactions: "income_transactions";
        maintenance_logs: "maintenance_logs";
        organizations: "organizations";
        recurring_templates: "recurring_templates";
        storage_units: "storage_units";
        transaction_categories: "transaction_categories";
    }>;
    label: z.ZodString;
    buildingId: z.ZodNullable<z.ZodString>;
    archivedAt: z.ZodString;
    archivedBy: z.ZodNullable<z.ZodString>;
    archivedByName: z.ZodNullable<z.ZodString>;
    daysUntilPurge: z.ZodNumber;
}, z.core.$loose>;
declare const listArchivedResponseSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            buildings: "buildings";
            notices: "notices";
            polls: "polls";
            events: "events";
            apartments: "apartments";
            blog_posts: "blog_posts";
            building_join_requests: "building_join_requests";
            comments: "comments";
            failure_reports: "failure_reports";
            faqs: "faqs";
            files: "files";
            garages: "garages";
            income_transactions: "income_transactions";
            maintenance_logs: "maintenance_logs";
            organizations: "organizations";
            recurring_templates: "recurring_templates";
            storage_units: "storage_units";
            transaction_categories: "transaction_categories";
        }>;
        label: z.ZodString;
        buildingId: z.ZodNullable<z.ZodString>;
        archivedAt: z.ZodString;
        archivedBy: z.ZodNullable<z.ZodString>;
        archivedByName: z.ZodNullable<z.ZodString>;
        daysUntilPurge: z.ZodNumber;
    }, z.core.$loose>>;
}, z.core.$strip>;
type ArchivedItem = Strict<z.infer<typeof archivedItemSchema>>;
type ListArchivedResponse = Strict<z.infer<typeof listArchivedResponseSchema>>;

/**
 * Building summary response — shape returned from the paginated
 * list endpoints (`GET /buildings`, admin building lists).
 */
declare const buildingResponseSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    address: z.ZodString;
    coverImage: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    type: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    totalUnits: z.ZodNumber;
    isStratified: z.ZodBoolean;
    houseRulesFileUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdBy: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    billingBuildingCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monthlyFeePerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    monthlyFeeCommercialPerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
/**
 * Building detail response — full shape returned from
 * `GET /buildings/:buildingId`.
 */
declare const buildingDetailResponseSchema: z.ZodObject<{
    id: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    name: z.ZodString;
    address: z.ZodString;
    coverImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>;
    totalUnits: z.ZodNumber;
    isStratified: z.ZodBoolean;
    houseRulesFileUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    numberOfFloors: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    latitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    longitude: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    manager: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, z.core.$loose>>>;
    funds: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        currentBalance: z.ZodString;
        currency: z.ZodString;
    }, z.core.$loose>>>;
    iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fundsSource: z.ZodOptional<z.ZodEnum<{
        manual: "manual";
        camt: "camt";
    }>>;
    monthlyFeePerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    monthlyFeeCommercialPerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    hasResidentialUnits: z.ZodOptional<z.ZodBoolean>;
    hasCommercialUnits: z.ZodOptional<z.ZodBoolean>;
    apartmentResidentialCoef: z.ZodOptional<z.ZodNumber>;
    apartmentCommercialCoef: z.ZodOptional<z.ZodNumber>;
    garageResidentialCoef: z.ZodOptional<z.ZodNumber>;
    garageCommercialCoef: z.ZodOptional<z.ZodNumber>;
    storageResidentialCoef: z.ZodOptional<z.ZodNumber>;
    storageCommercialCoef: z.ZodOptional<z.ZodNumber>;
    billingBuildingCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    pricuvaRefMode: z.ZodOptional<z.ZodEnum<{
        apartment: "apartment";
        owner: "owner";
    }>>;
    ownerRepresentatives: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
    deputyRepresentatives: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedBuildingsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodString;
        address: z.ZodString;
        coverImage: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        type: z.ZodEnum<{
            residential: "residential";
            commercial: "commercial";
            residential_commercial: "residential_commercial";
        }>;
        status: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        totalUnits: z.ZodNumber;
        isStratified: z.ZodBoolean;
        houseRulesFileUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdBy: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        iban: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        oib: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        houseNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        billingBuildingCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        monthlyFeePerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        monthlyFeeCommercialPerSqm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type BuildingResponse = Strict<z.infer<typeof buildingResponseSchema>>;
type BuildingDetailResponse = Strict<z.infer<typeof buildingDetailResponseSchema>>;
type PaginatedBuildingsResponse = Strict<z.infer<typeof paginatedBuildingsResponseSchema>>;

declare const emailDirectionSchema: z.ZodEnum<{
    outbound: "outbound";
    inbound: "inbound";
}>;
declare const emailMessageSchema: z.ZodObject<{
    id: z.ZodString;
    threadId: z.ZodString;
    direction: z.ZodEnum<{
        outbound: "outbound";
        inbound: "inbound";
    }>;
    fromAddress: z.ZodString;
    fromName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    toAddresses: z.ZodDefault<z.ZodArray<z.ZodString>>;
    ccAddresses: z.ZodDefault<z.ZodArray<z.ZodString>>;
    subject: z.ZodString;
    bodyText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bodyHtml: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    messageId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sentByUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sentByUserName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const emailThreadSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    subject: z.ZodString;
    externalParticipants: z.ZodDefault<z.ZodArray<z.ZodString>>;
    inboxAddress: z.ZodString;
    lastMessageAt: z.ZodString;
    lastMessagePreview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastMessageDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        outbound: "outbound";
        inbound: "inbound";
    }>>>;
    messageCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    unreadCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    archived: z.ZodDefault<z.ZodBoolean>;
}, z.core.$loose>;
declare const emailThreadDetailSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    subject: z.ZodString;
    externalParticipants: z.ZodDefault<z.ZodArray<z.ZodString>>;
    inboxAddress: z.ZodString;
    lastMessageAt: z.ZodString;
    lastMessagePreview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastMessageDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        outbound: "outbound";
        inbound: "inbound";
    }>>>;
    messageCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    unreadCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    archived: z.ZodDefault<z.ZodBoolean>;
    messages: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        threadId: z.ZodString;
        direction: z.ZodEnum<{
            outbound: "outbound";
            inbound: "inbound";
        }>;
        fromAddress: z.ZodString;
        fromName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        toAddresses: z.ZodDefault<z.ZodArray<z.ZodString>>;
        ccAddresses: z.ZodDefault<z.ZodArray<z.ZodString>>;
        subject: z.ZodString;
        bodyText: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bodyHtml: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        messageId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sentByUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        sentByUserName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedEmailThreadsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        subject: z.ZodString;
        externalParticipants: z.ZodDefault<z.ZodArray<z.ZodString>>;
        inboxAddress: z.ZodString;
        lastMessageAt: z.ZodString;
        lastMessagePreview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        lastMessageDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            outbound: "outbound";
            inbound: "inbound";
        }>>>;
        messageCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        unreadCount: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
        archived: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type EmailDirection = Strict<z.infer<typeof emailDirectionSchema>>;
type EmailMessage = Strict<z.infer<typeof emailMessageSchema>>;
type EmailThread = Strict<z.infer<typeof emailThreadSchema>>;
type EmailThreadDetail = Strict<z.infer<typeof emailThreadDetailSchema>>;
type PaginatedEmailThreadsResponse = Strict<z.infer<typeof paginatedEmailThreadsResponseSchema>>;

/**
 * Expected-vs-paid building-funds ledger for a building over a single
 * month (also known as pričuva in the Croatian domain).
 *
 * The server computes one row per co-owner that holds any share of an
 * apartment, garage, or storage unit in the building. For each row:
 *
 * - Residential area is the sum of each residential unit's area
 *   weighted by the user's ownership share; commercial area is the
 *   same for commercial-typed units.
 * - `expected` = Σ over the user's units of
 *     area × ownershipShare × kindTypeCoef × rate[type]
 *   where `kindTypeCoef` picks the multiplier matching the unit's
 *   kind (apartment/garage/storage) and type (residential/commercial).
 *   Either rate can be null if the building has no units of that
 *   type — matching area is then priced at 0 and contributes nothing.
 * - `paid` = Σ over the apartments this user co-owns of (that
 *   apartment's matched income in the selected period × the user's
 *   ownership share of that apartment).
 * - `diff` = paid − expected. Negative = the user owes, positive =
 *   the user over-paid (credit).
 *
 * Garage and storage areas feed `expected` but not `paid`: only
 * apartment payments carry the HR01 poziv-na-broj that links bank
 * entries to a unit.
 *
 * Both rates are null when neither has been configured. In that case
 * `rows` is empty — the server can't compute expected amounts.
 */
declare const buildingFundsLedgerRowSchema: z.ZodObject<{
    ownerId: z.ZodString;
    ownerName: z.ZodString;
    linkedUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    ownedApartmentArea: z.ZodNumber;
    ownedGarageArea: z.ZodNumber;
    ownedStorageArea: z.ZodNumber;
    totalOwnedArea: z.ZodNumber;
    residentialArea: z.ZodNumber;
    commercialArea: z.ZodNumber;
    expected: z.ZodNumber;
    paid: z.ZodNumber;
    diff: z.ZodNumber;
}, z.core.$strip>;
declare const buildingFundsLedgerResponseSchema: z.ZodObject<{
    buildingId: z.ZodString;
    period: z.ZodString;
    monthlyFeePerSqm: z.ZodNullable<z.ZodNumber>;
    monthlyFeeCommercialPerSqm: z.ZodNullable<z.ZodNumber>;
    rows: z.ZodArray<z.ZodObject<{
        ownerId: z.ZodString;
        ownerName: z.ZodString;
        linkedUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        ownedApartmentArea: z.ZodNumber;
        ownedGarageArea: z.ZodNumber;
        ownedStorageArea: z.ZodNumber;
        totalOwnedArea: z.ZodNumber;
        residentialArea: z.ZodNumber;
        commercialArea: z.ZodNumber;
        expected: z.ZodNumber;
        paid: z.ZodNumber;
        diff: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
type BuildingFundsLedgerRow = Strict<z.infer<typeof buildingFundsLedgerRowSchema>>;
type BuildingFundsLedgerResponse = Strict<z.infer<typeof buildingFundsLedgerResponseSchema>>;

declare const conversationParticipantSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    roleType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastReadAt: z.ZodString;
}, z.core.$loose>;
declare const conversationLastMessageSchema: z.ZodObject<{
    id: z.ZodString;
    content: z.ZodString;
    senderId: z.ZodString;
    senderName: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const conversationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodNullable<z.ZodString>;
    orgId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<{
        direct: "direct";
        group: "group";
    }>;
    name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    participants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        name: z.ZodString;
        image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        roleType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        lastReadAt: z.ZodString;
    }, z.core.$loose>>;
    lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        senderId: z.ZodString;
        senderName: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
    unreadCount: z.ZodNumber;
    lastMessageAt: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const chatMessageResponseSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    senderId: z.ZodString;
    senderName: z.ZodString;
    senderImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    senderRoleType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    content: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const conversationsListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodNullable<z.ZodString>;
        orgId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodEnum<{
            direct: "direct";
            group: "group";
        }>;
        name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        participants: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            name: z.ZodString;
            image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            roleType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            lastReadAt: z.ZodString;
        }, z.core.$loose>>;
        lastMessage: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            content: z.ZodString;
            senderId: z.ZodString;
            senderName: z.ZodString;
            createdAt: z.ZodString;
        }, z.core.$loose>>>;
        unreadCount: z.ZodNumber;
        lastMessageAt: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
declare const messagesListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        conversationId: z.ZodString;
        senderId: z.ZodString;
        senderName: z.ZodString;
        senderImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        senderRoleType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        content: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$loose>>;
    nextCursor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
declare const unreadCountResponseSchema: z.ZodObject<{
    unreadCount: z.ZodNumber;
}, z.core.$loose>;

type ConversationParticipant = Strict<z.infer<typeof conversationParticipantSchema>>;
type ConversationLastMessage = Strict<z.infer<typeof conversationLastMessageSchema>>;
type ConversationResponse = Strict<z.infer<typeof conversationResponseSchema>>;
type ChatMessageResponse = Strict<z.infer<typeof chatMessageResponseSchema>>;
type ConversationsListResponse = Strict<z.infer<typeof conversationsListResponseSchema>>;
type MessagesListResponse = Strict<z.infer<typeof messagesListResponseSchema>>;
type UnreadCountResponse = Strict<z.infer<typeof unreadCountResponseSchema>>;

declare const commentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    entityType: z.ZodString;
    entityId: z.ZodString;
    userId: z.ZodString;
    userName: z.ZodNullable<z.ZodString>;
    userImage: z.ZodNullable<z.ZodString>;
    content: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
}, z.core.$loose>;
type CommentResponse = Strict<z.infer<typeof commentResponseSchema>>;

declare const documentLinkedRecordSchema: z.ZodObject<{
    type: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        poll: "poll";
    }>;
    id: z.ZodString;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>>>;
    contractor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    cost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>>;
    warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    createdAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    updatedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$loose>;
declare const documentFileSchema: z.ZodObject<{
    id: z.ZodString;
    fileUrl: z.ZodString;
    fileName: z.ZodString;
    mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    fileSize: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
}, z.core.$loose>;
declare const documentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    containerId: z.ZodOptional<z.ZodString>;
    buildingId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    files: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        fileUrl: z.ZodString;
        fileName: z.ZodString;
        mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        fileSize: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    }, z.core.$loose>>>>;
    uploadedBy: z.ZodString;
    uploadedByName: z.ZodString;
    createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>>;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    isPrivate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    type: z.ZodOptional<z.ZodEnum<{
        document: "document";
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        poll: "poll";
    }>>;
    sourceId: z.ZodOptional<z.ZodString>;
    sourceTitle: z.ZodOptional<z.ZodString>;
    linkedRecords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            poll: "poll";
        }>;
        id: z.ZodString;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            pending: "pending";
            in_progress: "in_progress";
            resolved: "resolved";
        }>>>;
        contractor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        cost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            building_funds: "building_funds";
            insurance: "insurance";
            co_owner: "co_owner";
        }>>>;
        warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        createdAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        updatedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>>;
    visibility: z.ZodOptional<z.ZodEnum<{
        public: "public";
        private: "private";
    }>>;
}, z.core.$loose>;
declare const paginatedDocumentsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        containerId: z.ZodOptional<z.ZodString>;
        buildingId: z.ZodString;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        files: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            fileUrl: z.ZodString;
            fileName: z.ZodString;
            mimeType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            fileSize: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
        }, z.core.$loose>>>>;
        uploadedBy: z.ZodString;
        uploadedByName: z.ZodString;
        createdAt: z.ZodUnion<readonly [z.ZodString, z.ZodDate]>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>>;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
        isOwner: z.ZodBoolean;
        isPrivate: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        type: z.ZodOptional<z.ZodEnum<{
            document: "document";
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            poll: "poll";
        }>>;
        sourceId: z.ZodOptional<z.ZodString>;
        sourceTitle: z.ZodOptional<z.ZodString>;
        linkedRecords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<{
                failure_report: "failure_report";
                maintenance_log: "maintenance_log";
                notice: "notice";
                poll: "poll";
            }>;
            id: z.ZodString;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
                pending: "pending";
                in_progress: "in_progress";
                resolved: "resolved";
            }>>>;
            contractor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            cost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
                building_funds: "building_funds";
                insurance: "insurance";
                co_owner: "co_owner";
            }>>>;
            warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
            createdAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            updatedAt: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>>;
        visibility: z.ZodOptional<z.ZodEnum<{
            public: "public";
            private: "private";
        }>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;

type DocumentLinkedRecord = Strict<z.infer<typeof documentLinkedRecordSchema>>;
type DocumentFile = Strict<z.infer<typeof documentFileSchema>>;
type DocumentResponse = Strict<z.infer<typeof documentResponseSchema>>;
type PaginatedDocumentsResponse = Strict<z.infer<typeof paginatedDocumentsResponseSchema>>;

/**
 * Compact, per-type display metadata for a linked entity. Values are **raw**
 * (unformatted): dates are ISO strings and amounts are numbers, so each client
 * can format them in its own locale/currency. `status` is a raw enum value the
 * client localizes; `secondary` is already-human text (contractor, period).
 * Every field is optional — a given entity type fills only what it has.
 */
declare const entityLinkMetadataSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    secondary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
/**
 * One link as seen from an anchor entity, enriched with the far endpoint's
 * display data.
 */
declare const entityLinkReferenceSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        failure_report: "failure_report";
        maintenance_log: "maintenance_log";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
    }>;
    linkType: z.ZodEnum<{
        image: "image";
        document: "document";
        invoice: "invoice";
        warranty: "warranty";
        agenda: "agenda";
        schedule: "schedule";
        deadline: "deadline";
        meeting: "meeting";
        resolved_by: "resolved_by";
        based_on: "based_on";
        discussed_in: "discussed_in";
        expense_for: "expense_for";
        related_to: "related_to";
    }>;
    direction: z.ZodEnum<{
        outgoing: "outgoing";
        incoming: "incoming";
    }>;
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        secondary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const entityLinksResponseSchema: z.ZodObject<{
    links: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            maintenance_log: "maintenance_log";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
        }>;
        linkType: z.ZodEnum<{
            image: "image";
            document: "document";
            invoice: "invoice";
            warranty: "warranty";
            agenda: "agenda";
            schedule: "schedule";
            deadline: "deadline";
            meeting: "meeting";
            resolved_by: "resolved_by";
            based_on: "based_on";
            discussed_in: "discussed_in";
            expense_for: "expense_for";
            related_to: "related_to";
        }>;
        direction: z.ZodEnum<{
            outgoing: "outgoing";
            incoming: "incoming";
        }>;
        title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        metadata: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            status: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            date: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            amount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            secondary: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Batch link-count lookup: how many entity↔entity links touch each requested
 * entity id (both directions, excluding file-attachment link types). Missing
 * ids and zero counts are simply absent from the map.
 */
declare const entityLinkCountsResponseSchema: z.ZodObject<{
    counts: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$loose>;
type EntityLinkMetadata = Strict<z.infer<typeof entityLinkMetadataSchema>>;
type EntityLinkCountsResponse = Strict<z.infer<typeof entityLinkCountsResponseSchema>>;
type EntityLinkReference = Strict<z.infer<typeof entityLinkReferenceSchema>>;
type EntityLinksResponse = Strict<z.infer<typeof entityLinksResponseSchema>>;

/**
 * Event response — shape returned from event list / detail endpoints.
 * Dates are serialised as ISO-8601 strings on the wire (the backend
 * response DTO uses `string` for both startDate and endDate).
 */
declare const eventResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    type: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    color: z.ZodString;
    buildingId: z.ZodString;
    recurrenceType: z.ZodString;
    subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    recurrenceEndDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isRecurrenceInstance: z.ZodOptional<z.ZodBoolean>;
    originalEventId: z.ZodOptional<z.ZodString>;
    user: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, z.core.$loose>>;
    isAnonymous: z.ZodBoolean;
    approved: z.ZodBoolean;
    allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    canApprove: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    onlineMeetingUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    meetingMinutes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    minuteTakerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    usedAsScheduleBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        title: z.ZodString;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedEventsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        color: z.ZodString;
        buildingId: z.ZodString;
        recurrenceType: z.ZodString;
        subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        recurrenceEndDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isRecurrenceInstance: z.ZodOptional<z.ZodBoolean>;
        originalEventId: z.ZodOptional<z.ZodString>;
        user: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, z.core.$loose>>;
        isAnonymous: z.ZodBoolean;
        approved: z.ZodBoolean;
        allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
        canApprove: z.ZodBoolean;
        isOwner: z.ZodBoolean;
        onlineMeetingUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        meetingMinutes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        minuteTakerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        usedAsScheduleBy: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodString;
            title: z.ZodString;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type EventResponse = Strict<z.infer<typeof eventResponseSchema>>;
type PaginatedEventsResponse = Strict<z.infer<typeof paginatedEventsResponseSchema>>;

declare const failureReportResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    files: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
    submittedBy: z.ZodNullable<z.ZodString>;
    submittedByName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>;
    approved: z.ZodBoolean;
    isAnonymous: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    priority: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    canApprove: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    canStatus: z.ZodBoolean;
    locationType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    commonAreaDescription: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    unitType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    unitId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    unitName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        buildingId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
    maintenanceLogs: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        contractor: z.ZodString;
        cost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            building_funds: "building_funds";
            insurance: "insurance";
            co_owner: "co_owner";
        }>>>;
        warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    }, z.core.$loose>>>;
    polls: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        question: z.ZodString;
        pollType: z.ZodString;
        deadline: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedFailureReportsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        title: z.ZodString;
        description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>;
        submittedBy: z.ZodNullable<z.ZodString>;
        submittedByName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        status: z.ZodEnum<{
            pending: "pending";
            in_progress: "in_progress";
            resolved: "resolved";
        }>;
        approved: z.ZodBoolean;
        isAnonymous: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        priority: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            normal: "normal";
            urgent: "urgent";
        }>>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
        canApprove: z.ZodBoolean;
        isOwner: z.ZodBoolean;
        canStatus: z.ZodBoolean;
        locationType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        commonAreaDescription: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        unitType: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        unitId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        unitName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        events: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            type: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            startDate: z.ZodString;
            endDate: z.ZodString;
            color: z.ZodOptional<z.ZodString>;
            userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            buildingId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$loose>>>;
        maintenanceLogs: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            contractor: z.ZodString;
            cost: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
            financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
                building_funds: "building_funds";
                insurance: "insurance";
                co_owner: "co_owner";
            }>>>;
            warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        }, z.core.$loose>>>;
        polls: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            question: z.ZodString;
            pollType: z.ZodString;
            deadline: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type FailureReportResponse = Strict<z.infer<typeof failureReportResponseSchema>>;
type PaginatedFailureReportsResponse = Strict<z.infer<typeof paginatedFailureReportsResponseSchema>>;

declare const faqResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    question: z.ZodString;
    answer: z.ZodString;
    category: z.ZodEnum<{
        manager: "manager";
        representative: "representative";
    }>;
    orderIndex: z.ZodNumber;
    createdBy: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
type FaqResponse = Strict<z.infer<typeof faqResponseSchema>>;

/**
 * Response from `POST /buildings/:buildingId/funds/import/camt`.
 * Summarises the outcome of a single CAMT.053 file upload so the
 * admin UI can render an at-a-glance result without refetching the
 * funds list.
 */
declare const camtImportResponseSchema: z.ZodObject<{
    statementId: z.ZodString;
    statementIban: z.ZodString;
    periodFrom: z.ZodNullable<z.ZodString>;
    periodTo: z.ZodNullable<z.ZodString>;
    importedCount: z.ZodNumber;
    skippedCount: z.ZodNumber;
    errorCount: z.ZodNumber;
    imported: z.ZodArray<z.ZodObject<{
        transactionId: z.ZodString;
        type: z.ZodEnum<{
            income: "income";
            expense: "expense";
        }>;
        bankRef: z.ZodString;
        amount: z.ZodString;
        bookingDate: z.ZodString;
        description: z.ZodNullable<z.ZodString>;
    }, z.core.$loose>>;
    errors: z.ZodArray<z.ZodObject<{
        bankRef: z.ZodNullable<z.ZodString>;
        reason: z.ZodString;
    }, z.core.$loose>>;
}, z.core.$loose>;
type CamtImportResponse = Strict<z.infer<typeof camtImportResponseSchema>>;

declare const maintenanceLogResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    title: z.ZodString;
    files: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
    createdBy: z.ZodString;
    createdByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contractor: z.ZodString;
    cost: z.ZodNumber;
    financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        building_funds: "building_funds";
        insurance: "insurance";
        co_owner: "co_owner";
    }>>>;
    warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
    categoryId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    categoryName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        buildingId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    polls: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        question: z.ZodString;
        pollType: z.ZodString;
        deadline: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
    failureReports: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        status: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
    expenses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        amount: z.ZodNumber;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        period: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        source: z.ZodString;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedMaintenanceLogsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        title: z.ZodString;
        files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>;
        createdBy: z.ZodString;
        createdByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        contractor: z.ZodString;
        cost: z.ZodNumber;
        financedBy: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            building_funds: "building_funds";
            insurance: "insurance";
            co_owner: "co_owner";
        }>>>;
        warranty: z.ZodNullable<z.ZodOptional<z.ZodBoolean>>;
        categoryId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        categoryName: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        events: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            type: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            startDate: z.ZodString;
            endDate: z.ZodString;
            color: z.ZodOptional<z.ZodString>;
            userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            buildingId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$loose>>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
        isOwner: z.ZodBoolean;
        polls: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            question: z.ZodString;
            pollType: z.ZodString;
            deadline: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>;
        failureReports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            status: z.ZodString;
            createdAt: z.ZodString;
        }, z.core.$loose>>>;
        expenses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            amount: z.ZodNumber;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            period: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            source: z.ZodString;
            createdAt: z.ZodString;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type MaintenanceLogResponse = Strict<z.infer<typeof maintenanceLogResponseSchema>>;
type PaginatedMaintenanceLogsResponse = Strict<z.infer<typeof paginatedMaintenanceLogsResponseSchema>>;

declare const noticeResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
    files: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$loose>>>;
    createdBy: z.ZodNullable<z.ZodString>;
    approved: z.ZodBoolean;
    isAnonymous: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    pinned: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    commentsCount: z.ZodDefault<z.ZodNumber>;
    canApprove: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    events: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        type: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodString;
        endDate: z.ZodString;
        color: z.ZodOptional<z.ZodString>;
        userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        buildingId: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
declare const paginatedNoticesResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        title: z.ZodString;
        content: z.ZodString;
        files: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            documentUrl: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        }, z.core.$loose>>>;
        createdBy: z.ZodNullable<z.ZodString>;
        approved: z.ZodBoolean;
        isAnonymous: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        pinned: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        createdByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        allowComments: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        commentsCount: z.ZodDefault<z.ZodNumber>;
        canApprove: z.ZodBoolean;
        canEdit: z.ZodBoolean;
        canDelete: z.ZodBoolean;
        isOwner: z.ZodBoolean;
        events: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            type: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            startDate: z.ZodString;
            endDate: z.ZodString;
            color: z.ZodOptional<z.ZodString>;
            userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            buildingId: z.ZodOptional<z.ZodString>;
            createdAt: z.ZodOptional<z.ZodString>;
            updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type NoticeResponse = Strict<z.infer<typeof noticeResponseSchema>>;
type PaginatedNoticesResponse = Strict<z.infer<typeof paginatedNoticesResponseSchema>>;

declare const notificationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    type: z.ZodEnum<{
        notice_created: "notice_created";
        notice_approved: "notice_approved";
        notice_rejected: "notice_rejected";
        poll_created: "poll_created";
        poll_deadline_24h: "poll_deadline_24h";
        poll_deadline_1h: "poll_deadline_1h";
        poll_finalized: "poll_finalized";
        event_created: "event_created";
        event_reminder_24h: "event_reminder_24h";
        event_reminder_1h: "event_reminder_1h";
        event_updated: "event_updated";
        event_cancelled: "event_cancelled";
        waste_reminder_mixed: "waste_reminder_mixed";
        waste_reminder_bio: "waste_reminder_bio";
        waste_reminder_plastic_metal: "waste_reminder_plastic_metal";
        waste_reminder_paper_cardboard: "waste_reminder_paper_cardboard";
        failure_report_created: "failure_report_created";
        failure_report_status_changed: "failure_report_status_changed";
        failure_report_resolved: "failure_report_resolved";
        maintenance_log_created: "maintenance_log_created";
        payment_due: "payment_due";
        payment_received: "payment_received";
        building_join_request_received: "building_join_request_received";
        building_join_request_approved: "building_join_request_approved";
        building_join_request_rejected: "building_join_request_rejected";
        building_member_joined: "building_member_joined";
        building_role_changed: "building_role_changed";
        building_pending_approval: "building_pending_approval";
        building_approved: "building_approved";
        building_rejected: "building_rejected";
        chat_message: "chat_message";
        poll_vote_signature_pending: "poll_vote_signature_pending";
        poll_vote_signature_approved: "poll_vote_signature_approved";
        poll_vote_signature_rejected: "poll_vote_signature_rejected";
        system_announcement: "system_announcement";
    }>;
    buildingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    buildingName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    data: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        content: z.ZodString;
        createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        isPinned: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        deadline: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodString;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        status: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        category: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        contractor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        cost: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        userName: z.ZodString;
        userEmail: z.ZodString;
        message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        role: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
        rejectionReason: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        senderName: z.ZodString;
        messagePreview: z.ZodString;
        conversationId: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>>;
    read: z.ZodBoolean;
    readAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const notificationPreferenceItemSchema: z.ZodObject<{
    type: z.ZodString;
    description: z.ZodString;
    enabled: z.ZodBoolean;
    channels: z.ZodArray<z.ZodString>;
}, z.core.$loose>;
declare const notificationPreferenceCategorySchema: z.ZodObject<{
    category: z.ZodString;
    notifications: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        description: z.ZodString;
        enabled: z.ZodBoolean;
        channels: z.ZodArray<z.ZodString>;
    }, z.core.$loose>>;
}, z.core.$loose>;
type NotificationResponse = Strict<z.infer<typeof notificationResponseSchema>>;
type NotificationPreferenceItem = Strict<z.infer<typeof notificationPreferenceItemSchema>>;
type NotificationPreferenceCategory = Strict<z.infer<typeof notificationPreferenceCategorySchema>>;

/**
 * Per-user poll response — shape returned from poll list / detail
 * endpoints where the current user may have voted but the poll is
 * not yet finalised.
 */
declare const pollResponseSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    question: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    deadline: z.ZodOptional<z.ZodString>;
    pollType: z.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>;
    status: z.ZodEnum<{
        active: "active";
        completed: "completed";
        cancelled: "cancelled";
    }>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodNumber>;
    totalVotes: z.ZodNumber;
    totalWeight: z.ZodNumber;
    winningOptionIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isResultsFinalized: z.ZodBoolean;
    finalizedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finalizedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    hasVoted: z.ZodOptional<z.ZodBoolean>;
    userVote: z.ZodOptional<z.ZodNumber>;
    files: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documentUrl: z.ZodString;
        fileType: z.ZodEnum<{
            image: "image";
            document: "document";
        }>;
        uploadedBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
/**
 * Poll results response — fuller shape with per-option breakdown,
 * consensus flags and permissions, returned from the results endpoint.
 */
declare const pollResultsSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    question: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    createdBy: z.ZodString;
    createdAt: z.ZodString;
    deadline: z.ZodOptional<z.ZodString>;
    pollType: z.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>;
    status: z.ZodEnum<{
        active: "active";
        completed: "completed";
        cancelled: "cancelled";
    }>;
    requiredConsensusPercentage: z.ZodOptional<z.ZodNumber>;
    totalVotes: z.ZodNumber;
    totalWeight: z.ZodNumber;
    totalEligibleVoters: z.ZodNumber;
    winningOptionIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isResultsFinalized: z.ZodBoolean;
    finalizedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finalizedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    optionResults: z.ZodArray<z.ZodObject<{
        optionIndex: z.ZodNumber;
        optionText: z.ZodString;
        voteCount: z.ZodNumber;
        totalWeight: z.ZodNumber;
        percentage: z.ZodNumber;
        weightPercentage: z.ZodNumber;
    }, z.core.$loose>>;
    consensusReached: z.ZodOptional<z.ZodBoolean>;
    currentConsensusPercentage: z.ZodOptional<z.ZodNumber>;
    approved: z.ZodBoolean;
    canApprove: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    canDelete: z.ZodBoolean;
    isOwner: z.ZodBoolean;
    canVote: z.ZodBoolean;
    cannotVoteReason: z.ZodOptional<z.ZodEnum<{
        ALREADY_VOTED: "ALREADY_VOTED";
        POLL_ENDED: "POLL_ENDED";
        NOT_APPROVED: "NOT_APPROVED";
        NO_VOTE_PERMISSION: "NO_VOTE_PERMISSION";
        NON_VOTER_CONTEXT: "NON_VOTER_CONTEXT";
        NOT_ELIGIBLE_SCOPE: "NOT_ELIGIBLE_SCOPE";
        NEEDS_OIB: "NEEDS_OIB";
        NEEDS_IDENTITY: "NEEDS_IDENTITY";
    }>>;
    hasUserVoted: z.ZodBoolean;
    userVotedOptionIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    scopedUnits: z.ZodOptional<z.ZodArray<z.ZodObject<{
        unitType: z.ZodString;
        unitId: z.ZodString;
        label: z.ZodString;
        floor: z.ZodOptional<z.ZodString>;
    }, z.core.$loose>>>;
    eligibleTotalWeight: z.ZodOptional<z.ZodNumber>;
    scopedUsers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        name: z.ZodString;
    }, z.core.$loose>>>;
    maintenanceLogs: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        contractor: z.ZodString;
        cost: z.ZodNumber;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
    files: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        documentUrl: z.ZodString;
        fileType: z.ZodEnum<{
            image: "image";
            document: "document";
        }>;
        uploadedBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>>;
}, z.core.$loose>;
/**
 * Poll voters response — voter list returned from the voters endpoint.
 */
declare const pollVotersResponseSchema: z.ZodObject<{
    pollId: z.ZodString;
    question: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    totalVotes: z.ZodNumber;
    voters: z.ZodArray<z.ZodObject<{
        userId: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        selectedOptionIndex: z.ZodNumber;
        selectedOptionText: z.ZodString;
        voteWeight: z.ZodNumber;
        votedAt: z.ZodString;
    }, z.core.$loose>>;
}, z.core.$loose>;
declare const paginatedPollsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        question: z.ZodString;
        options: z.ZodArray<z.ZodString>;
        createdBy: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        deadline: z.ZodOptional<z.ZodString>;
        pollType: z.ZodEnum<{
            consensus: "consensus";
            community: "community";
        }>;
        status: z.ZodEnum<{
            active: "active";
            completed: "completed";
            cancelled: "cancelled";
        }>;
        requiredConsensusPercentage: z.ZodOptional<z.ZodNumber>;
        totalVotes: z.ZodNumber;
        totalWeight: z.ZodNumber;
        winningOptionIndex: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isResultsFinalized: z.ZodBoolean;
        finalizedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        finalizedBy: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        hasVoted: z.ZodOptional<z.ZodBoolean>;
        userVote: z.ZodOptional<z.ZodNumber>;
        files: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            documentUrl: z.ZodString;
            fileType: z.ZodEnum<{
                image: "image";
                document: "document";
            }>;
            uploadedBy: z.ZodString;
            createdAt: z.ZodString;
            updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, z.core.$loose>>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type PollResponse = Strict<z.infer<typeof pollResponseSchema>>;
type PollResults = Strict<z.infer<typeof pollResultsSchema>>;
type PollVotersResponse = Strict<z.infer<typeof pollVotersResponseSchema>>;
type PaginatedPollsResponse = Strict<z.infer<typeof paginatedPollsResponseSchema>>;

declare const commonStatusOptions: readonly ["active", "completed", "cancelled"];
declare const approvalStatusOptions: readonly ["pending", "approved", "rejected"];
declare const maintenanceStatusOptions: readonly ["pending", "in_progress", "completed", "cancelled"];
declare const failureStatusOptions: readonly ["pending", "in_progress", "resolved"];
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
    rejected: "rejected";
    approved: "approved";
}>;
declare const MaintenanceStatusSchema: z.ZodEnum<{
    pending: "pending";
    completed: "completed";
    cancelled: "cancelled";
    in_progress: "in_progress";
}>;
declare const FailureStatusSchema: z.ZodEnum<{
    pending: "pending";
    in_progress: "in_progress";
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

export { ARCHIVE_TYPES, type AddOrgMemberSchema, type AiChatMessagePayload, type AiChatRequestPayload, type AiUsageResponse, type Apartment, type ApartmentUser, type ApiError, type ApiErrorResponse, ApprovalStatusSchema, type ApprovalStatusSchemaType, type ApproveFailureReportSchema, type ApproveNoticeSchema, type ArchiveType, type ArchivedItem, type AssignOrgBuildingSchema, type AssignOrgMemberBuildingSchema, type AssignOwnerInput, BUILDING_LIMITS, BUILDING_TYPES, type BaseEntitySchema, type BuildingDetailResponse, type BuildingEntitySchema, type BuildingFundsLedgerResponse, type BuildingFundsLedgerRow, type BuildingQuotaConfig, type BuildingQuotaEntry, type BuildingQuotaList, type BuildingResponse, type BuildingTypeOption, type BuildingUserEntitySchema, type BusinessPartnerResponse, CHAT_LIMITS, type CamtImportResponse, type CertiliaUserinfo, type ChatMessageResponse, type CommentResponse, CommonStatusSchema, type CommonStatusSchemaType, type ConversationLastMessage, type ConversationParticipant, type ConversationResponse, ConversationType, type ConversationsListResponse, type CopyFaqsSchema, type CopyTransactionCategoriesSchema, type CreateBuildingSchema, type CreateBusinessPartnerInput, type CreateConversationSchema, type CreateEmailThreadRequestPayload, type CreateEntityLinkRequest, type CreateEventSchema, type CreateFailureReportSchema, type CreateFaqSchema, type CreateIncomeSchema, type CreateMaintenanceLogSchema, type CreateNoticeSchema, type CreateOrganizationSchema, type CreateOwnerInput, type CreatePollSchema, type CreateTransactionCategorySchema, type CursorQuerySchema, type DateRangeParamsSchema, type DateRangeWithValidationSchema, type DateTimeSchema, type DeleteEntityLinkQuery, type DeleteEntityLinkRequest, type DocumentFile, type DocumentLinkedRecord, type DocumentResponse, ENTITY_LINK_TYPES, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, type EmailDirection, type EmailMessage, type EmailThread, type EmailThreadDetail, type EntityLinkCountsResponse, type EntityLinkEndpoint, type EntityLinkMetadata, type EntityLinkReference, type EntityLinksResponse, type EventColorOption, type EventResponse, type EventTypeOption, FAILURE_REPORT_LIMITS, FAQ_LIMITS, type FailureReportEventSchema, type FailureReportResponse, FailureStatusSchema, type FailureStatusSchemaType, type FaqResponse, type FinalizePollSchema, type ForgotPasswordSchema, type Garage, type GarageRole, type GarageUser, type GetEntityLinkCountsQuery, type GetEntityLinksQuery, type GetOrgBuildingsQuerySchema, type GetOrgMembersQuerySchema, type GetRepBuildingsParams, type GetRepUsersParams, type GetTransactionCategoriesQuerySchema, type InviteOrgMemberSchema, type JoinBuildingWithOtpSchema, LINKABLE_ENTITY_TYPES, type ListArchivedResponse, type LoginSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, type MaintenanceFinancedByOption, type MaintenanceLogEventSchema, type MaintenanceLogResponse, MaintenanceStatusSchema, type MaintenanceStatusSchemaType, type MessageResponse, type MessagesListResponse, NOTICE_LIMITS, type NoticeEventSchema, type NoticeResponse, type NotificationPreferenceCategory, type NotificationPreferenceItem, type NotificationResponse, ORGANIZATION_LIMITS, type OrgQuotaConfig, type OrgQuotaEntry, type OrgQuotaList, type OwnerResponse, POLL_LIMITS, POLL_TYPES, type PaginatedApartmentsResponse, type PaginatedBuildingsResponse, type PaginatedDocumentsResponse, type PaginatedEmailThreadsResponse, type PaginatedEventsResponse, type PaginatedFailureReportsResponse, type PaginatedMaintenanceLogsResponse, type PaginatedNoticesResponse, type PaginatedPollsResponse, type PaginatedResponseSchema, type PaginationParamsSchema, type PermissionFieldsSchema, type PermissionsResponseSchema, type PollResponse, type PollResults, type PollTypeOption, type PollVotersResponse, PrioritySchema, type PrioritySchemaType, RECURRENCE_TYPES, type RecurrenceTypeOption, type RegisterSchema, type ReorderFaqsSchema, type ReplyEmailThreadRequestPayload, type ResetPasswordSchema, type SearchUsersQuerySchema, type SendMessageSchema, type StorageUnit, type StorageUnitRole, type StorageUnitUser, TRANSACTION_CATEGORY_LIMITS, type TimeSchema, type UnreadCountResponse, type UpdateBuildingSchema, type UpdateBuildingSettingsSchema, type UpdateBusinessPartnerInput, type UpdateConversationSchema, type UpdateEventSchema, type UpdateFailureReportRequestPayload, type UpdateFailureReportSchema, type UpdateFaqSchema, type UpdateIncomeSchema, type UpdateMaintenanceLogRequestPayload, type UpdateMaintenanceLogSchema, type UpdateNoticeRequestPayload, type UpdateNoticeSchema, type UpdateOrgMemberRoleSchema, type UpdateOrganizationSchema, type UpdateOwnerInput, type UpdatePasswordSchema, type UpdatePollRequestPayload, type UpdatePollSchema, type UpdateTransactionCategorySchema, type UpdateUserBuildingRoleSchema, type UserEntitySchema, type UuidSchema, type VerifyOtpSchema, type VotePollSchema, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, baseEntitySchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createOwnerSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, messagesListResponseSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, orgQuotaConfigSchema, orgQuotaEntrySchema, orgQuotaListSchema, ownerResponseSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, recurrenceTypeSchema, registerSchema, reorderFaqsSchema, replyEmailThreadRequestSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, unreadCountResponseSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema };
