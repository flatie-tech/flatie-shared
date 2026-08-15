import * as zod from 'zod';
import { z } from 'zod';
export { C as CreatePollSchema, b as EVENT_COLORS, e as EVENT_TYPES, d as EVENT_TYPE_COLOR_MAP, E as EventColorOption, a as EventTypeOption, F as FinalizePollSchema, P as POLL_LIMITS, m as POLL_TYPES, h as RECURRENCE_TYPES, i as RecordOfflineVotesSchema, R as RecurrenceTypeOption, U as UpdatePollSchema, V as VotePollSchema, j as VoteWithIdCardSchema, c as createEventSchema, k as createPollSchema, f as eventColorSchema, g as eventTypeSchema, l as finalizePollSchema, p as pollTypeSchema, n as recordOfflineVotesSchema, r as recurrenceTypeSchema, t as timeSchema, u as updateEventSchema, o as updatePollSchema, v as votePollSchema, q as voteWithIdCardSchema } from '../poll.schema-a34vq7Hy.js';
import * as zod_v4_core from 'zod/v4/core';
import { S as Strict } from '../notifications-CNtDB4JA.js';
export { N as NotificationPreferenceCategory, a as NotificationPreferenceItem, b as NotificationResponse, g as getNotificationDataSchema, n as notificationDataSchema, c as notificationPreferenceCategorySchema, d as notificationPreferenceItemSchema, e as notificationResponseSchema } from '../notifications-CNtDB4JA.js';
import '../notification.enum-BtF7QI0-.js';

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
/**
 * NIST SP 800-63B-4 style policy: length is the only client-checkable rule
 * (8-128, long passphrases welcome). Composition classes (forced upper/
 * lower/digit) were dropped 2026-07 — they push users toward predictable
 * patterns. Breached-password screening happens server-side (HIBP k-anonymity
 * in flatie-backend's auth hooks) and surfaces as a WEAK_PASSWORD error.
 */
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

/**
 * Validation constants for boards.
 */
declare const BOARD_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 60;
    readonly DESCRIPTION_MAX: 500;
};
/**
 * Validation constants for board columns.
 */
declare const BOARD_COLUMN_LIMITS: {
    readonly NAME_MIN: 1;
    readonly NAME_MAX: 40;
};
/**
 * Create board request schema — matches `POST /buildings/:buildingId/boards`.
 * buildingId comes from the URL, not the body.
 */
declare const createBoardSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodEnum<{
        building: "building";
        representatives: "representatives";
    }>>;
}, z.core.$strip>;
/**
 * Update board request schema — all fields optional.
 */
declare const updateBoardSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    visibility: z.ZodOptional<z.ZodEnum<{
        building: "building";
        representatives: "representatives";
    }>>;
}, z.core.$strip>;
/**
 * Create board column request schema — matches
 * `POST /buildings/:buildingId/boards/:boardId/columns`. New columns are
 * appended to the end of the board.
 */
declare const createBoardColumnSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Update (rename) board column request schema.
 */
declare const updateBoardColumnSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
/**
 * Reorder board columns request schema — the full ordered id list
 * (same contract as FAQ reorder).
 */
declare const reorderBoardColumnsSchema: z.ZodObject<{
    orderedIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
/**
 * Validation constants for board (Kanban) cards.
 */
declare const BOARD_CARD_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly DESCRIPTION_MAX: 5000;
    readonly CHECKLIST_MAX_ITEMS: 50;
    readonly CHECKLIST_ITEM_MIN: 1;
    readonly CHECKLIST_ITEM_MAX: 200;
};
/**
 * A calendar event created inline with a card (schedule link). Same shape as
 * the notice/failure-report inline events.
 */
declare const boardCardEventSchema: z.ZodObject<{
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    title: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * A single checklist item on a card. `id` is server-assigned when omitted so
 * the client can add items optimistically without minting ids itself.
 */
declare const boardCardChecklistItemSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    text: z.ZodString;
    done: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
/**
 * Create board card request schema — matches
 * `POST /buildings/:buildingId/boards/:boardId/cards` (multipart/form-data —
 * file parts ride alongside; array/boolean fields use the multipart helpers).
 * buildingId/boardId come from the URL, not the body.
 */
declare const createBoardCardSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    columnId: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    assignedTo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    checklist: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        text: z.ZodString;
        done: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * Update board card request schema — all fields optional. Column moves that
 * reorder within a column go through the dedicated move endpoint, but
 * `columnId` is still accepted for non-drag edits (appends to the target
 * column).
 */
declare const updateBoardCardSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    columnId: z.ZodOptional<z.ZodString>;
    priority: z.ZodOptional<z.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    assignedTo: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    checklist: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        text: z.ZodString;
        done: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    events: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        startDate: z.ZodCoercedDate<unknown>;
        endDate: z.ZodCoercedDate<unknown>;
        title: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
/**
 * Move board card request schema — matches
 * `PATCH .../boards/:boardId/cards/:id/move`. Drives drag-and-drop:
 * the client computes a fractional `position` (midpoint between neighbours)
 * so a move never has to reindex the rest of the column.
 */
declare const moveBoardCardSchema: z.ZodObject<{
    columnId: z.ZodString;
    position: z.ZodNumber;
}, z.core.$strip>;
type CreateBoardSchema = z.infer<typeof createBoardSchema>;
type UpdateBoardSchema = z.infer<typeof updateBoardSchema>;
type CreateBoardColumnSchema = z.infer<typeof createBoardColumnSchema>;
type UpdateBoardColumnSchema = z.infer<typeof updateBoardColumnSchema>;
type ReorderBoardColumnsSchema = z.infer<typeof reorderBoardColumnsSchema>;
type CreateBoardCardSchema = z.infer<typeof createBoardCardSchema>;
type UpdateBoardCardSchema = z.infer<typeof updateBoardCardSchema>;
type MoveBoardCardSchema = z.infer<typeof moveBoardCardSchema>;

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
        contractEnd: "contractEnd";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    expiringWithinDays: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
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
        userName: "userName";
        orgRole: "orgRole";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
/**
 * Update the contract window on an existing org↔building assignment.
 */
declare const updateOrgBuildingContractSchema: z.ZodObject<{
    contractStart: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contractEnd: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Organization invitation lifecycle states. Stored as text (uppercase,
 * pre-existing data) — deliberately NOT a pg enum.
 */
declare const OrgInvitationStatus: {
    readonly PENDING: "PENDING";
    readonly ACCEPTED: "ACCEPTED";
};
type OrgInvitationStatus = (typeof OrgInvitationStatus)[keyof typeof OrgInvitationStatus];
/**
 * An invitation as seen by org managers. The accept token is NEVER exposed
 * here — it travels only inside the invitation email.
 */
declare const orgInvitationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    orgRole: z.ZodEnum<{
        org_admin: "org_admin";
        supervisor: "supervisor";
        referent: "referent";
        operative: "operative";
    }>;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        ACCEPTED: "ACCEPTED";
    }>;
    createdAt: z.ZodString;
    expiresAt: z.ZodNullable<z.ZodString>;
    acceptedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
/**
 * The public (token-scoped) view of an invitation, shown on the accept page
 * before the user authenticates.
 */
declare const publicOrgInvitationSchema: z.ZodObject<{
    orgName: z.ZodString;
    email: z.ZodString;
    orgRole: z.ZodEnum<{
        org_admin: "org_admin";
        supervisor: "supervisor";
        referent: "referent";
        operative: "operative";
    }>;
    status: z.ZodEnum<{
        PENDING: "PENDING";
        ACCEPTED: "ACCEPTED";
    }>;
    expiresAt: z.ZodNullable<z.ZodString>;
    inviterName: z.ZodNullable<z.ZodString>;
}, z.core.$loose>;
/**
 * Publish one notice to many (or all) buildings the organization manages.
 */
declare const createOrgBroadcastSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    buildingIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    allowComments: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const orgBroadcastResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    noticeCount: z.ZodNumber;
    createdAt: z.ZodString;
}, z.core.$loose>;
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
type UpdateOrgBuildingContractSchema = z.infer<typeof updateOrgBuildingContractSchema>;
type OrgInvitationResponse = z.infer<typeof orgInvitationResponseSchema>;
type PublicOrgInvitation = z.infer<typeof publicOrgInvitationSchema>;
type CreateOrgBroadcastSchema = z.infer<typeof createOrgBroadcastSchema>;
type OrgBroadcastResponse = z.infer<typeof orgBroadcastResponseSchema>;

/**
 * Unified building unit. Replaces the former apartment / garage /
 * storage-unit triplet — one table, one schema, a `kind` discriminant.
 * `label` is the land-registry-style identifier residents use
 * (e.g. "ST 3448", "GR 364", "12A").
 */
declare const UNIT_KINDS: readonly ["apartment", "garage", "storage_unit"];
type UnitKind = (typeof UNIT_KINDS)[number];
declare const unitKindSchema: z.ZodEnum<{
    apartment: "apartment";
    garage: "garage";
    storage_unit: "storage_unit";
}>;
declare const unitSchema: z.ZodObject<{
    id: z.ZodString;
    buildingId: z.ZodString;
    kind: z.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>;
    label: z.ZodString;
    floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    type: z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
    }>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    surnameOnDoor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    surnameOnIntercom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodOptional<z.ZodBoolean>;
    canDelete: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodString>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
type Unit = z.infer<typeof unitSchema>;
declare const paginatedUnitsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        buildingId: z.ZodString;
        kind: z.ZodEnum<{
            apartment: "apartment";
            garage: "garage";
            storage_unit: "storage_unit";
        }>;
        label: z.ZodString;
        floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        area: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        type: z.ZodOptional<z.ZodEnum<{
            residential: "residential";
            commercial: "commercial";
        }>>;
        paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        surnameOnDoor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        surnameOnIntercom: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        canEdit: z.ZodOptional<z.ZodBoolean>;
        canDelete: z.ZodOptional<z.ZodBoolean>;
        createdAt: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
type PaginatedUnitsResponse = z.infer<typeof paginatedUnitsResponseSchema>;
/** Create/update requests. `kind` is create-only (a garage never becomes an apartment). */
declare const createUnitSchema: z.ZodObject<{
    kind: z.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>;
    label: z.ZodString;
    floor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    area: z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
    type: z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
    }>>;
    paymentRefCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    surnameOnDoor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    surnameOnIntercom: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
type CreateUnitInput = z.infer<typeof createUnitSchema>;
declare const updateUnitSchema: z.ZodObject<{
    type: z.ZodOptional<z.ZodOptional<z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
    }>>>;
    label: z.ZodOptional<z.ZodString>;
    floor: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    area: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodCoercedNumber<unknown>>>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    surnameOnDoor: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    surnameOnIntercom: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
}, z.core.$strip>;
type UpdateUnitInput = z.infer<typeof updateUnitSchema>;

/**
 * Read contract for the platform audit-log viewer.
 *
 * Two action vocabularies coexist in `audit_logs` and the viewer must tolerate
 * both: `AuditInterceptor` writes route-shaped actions (`POST /platform/...`)
 * for every authenticated mutation, while services write semantic ones
 * (`invoice:mark-paid`). Filters therefore match exactly rather than parsing.
 */
/**
 * Denial rows are written by the permission guard on every 403. They are
 * useful for spotting probing but drown the real action feed, so the viewer
 * excludes them unless asked.
 */
declare const AUDIT_DENIAL_TARGET_TYPE = "permission_denial";
declare const getAuditLogsQuerySchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    action: z.ZodOptional<z.ZodString>;
    targetType: z.ZodOptional<z.ZodString>;
    targetId: z.ZodOptional<z.ZodString>;
    fromDate: z.ZodOptional<z.ZodString>;
    toDate: z.ZodOptional<z.ZodString>;
    includeDenials: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    denialsOnly: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
declare const auditLogResponseSchema: z.ZodObject<{
    id: z.ZodString;
    createdAt: z.ZodString;
    userId: z.ZodNullable<z.ZodString>;
    actorName: z.ZodNullable<z.ZodString>;
    actorEmail: z.ZodNullable<z.ZodString>;
    action: z.ZodString;
    targetType: z.ZodString;
    targetId: z.ZodNullable<z.ZodString>;
    /** Credential-ish keys are redacted server-side before this is returned. */
    metadata: z.ZodNullable<z.ZodUnknown>;
    ipAddress: z.ZodNullable<z.ZodString>;
    userAgent: z.ZodNullable<z.ZodString>;
}, z.core.$loose>;
type GetAuditLogsQuerySchema = z.infer<typeof getAuditLogsQuerySchema>;
type AuditLogResponse = z.infer<typeof auditLogResponseSchema>;

/**
 * Building type options — lowercase_snake_case to match the backend pgEnum.
 */
declare const BUILDING_TYPES: readonly ["residential", "commercial", "residential_commercial"];
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
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
        co_owner: "co_owner";
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
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
        co_owner: "co_owner";
        resident: "resident";
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
            invite: "invite";
        }>;
        dailyLimit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Update building settings request — body of
 * `PATCH /buildings/:buildingId/settings`.
 *
 * Every field optional (partial patch). Consensus voting is governed by
 * `minVotingStrengthForConsensus` (a `VotingStrength` rung): the minimum
 * account verification an ONLINE consensus ballot must carry. Rep-recorded
 * paper votes are never gated by it. The backend rejects the PHONE rung
 * while no SMS provider is configured.
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
    emailEnabled: z.ZodOptional<z.ZodBoolean>;
    commentsEnabled: z.ZodOptional<z.ZodBoolean>;
    coOwnerConsensusEnabled: z.ZodOptional<z.ZodBoolean>;
    votingCertiliaEnabled: z.ZodOptional<z.ZodBoolean>;
    votingPrintedSignatureEnabled: z.ZodOptional<z.ZodBoolean>;
    minVerificationTierForConsensus: z.ZodOptional<z.ZodNumber>;
    minVotingStrengthForConsensus: z.ZodOptional<z.ZodNumber>;
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

/**
 * Validation constants for the building document library.
 * A "document" is a container holding one or more child files (there is no
 * folder entity — the flat list groups by container).
 */
declare const DOCUMENT_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly DESCRIPTION_MAX: 500;
    readonly FILE_NAME_MAX: 255;
};
/**
 * Create document request — `POST /buildings/:buildingId/files` (multipart).
 * Files are extracted by MultipartFilesInterceptor on the backend and merged
 * into the service payload, so they are not part of this schema.
 */
declare const createDocumentSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    isPrivate: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
}, z.core.$strip>;
/**
 * Update document request — `PUT /buildings/:buildingId/files/:documentId`
 * (multipart). All fields optional. New files ride along as multipart parts.
 */
declare const updateDocumentSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    isPrivate: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    removeFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    renameFiles: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        fileName: z.ZodString;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
type CreateDocumentSchema = z.infer<typeof createDocumentSchema>;
type UpdateDocumentSchema = z.infer<typeof updateDocumentSchema>;

declare const createDsarRequestSchema: z.ZodObject<{
    subjectEmail: z.ZodString;
    type: z.ZodEnum<{
        access: "access";
        rectification: "rectification";
        erasure: "erasure";
        restriction: "restriction";
        portability: "portability";
        objection: "objection";
    }>;
    receivedAt: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const updateDsarRequestSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        received: "received";
        in_progress: "in_progress";
        awaiting_subject: "awaiting_subject";
        fulfilled: "fulfilled";
        refused: "refused";
        cancelled: "cancelled";
    }>>;
    assigneeUserId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionNote: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    identityVerifiedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    extendByDays: z.ZodOptional<z.ZodNumber>;
    extensionReason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const createDsarEventSchema: z.ZodObject<{
    note: z.ZodString;
}, z.core.$strip>;
declare const setDsarRestrictionSchema: z.ZodObject<{
    restricted: z.ZodBoolean;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const dsarErasureSchema: z.ZodObject<{
    mode: z.ZodEnum<{
        schedule: "schedule";
        immediate: "immediate";
    }>;
}, z.core.$strip>;
declare const recordDsarRectificationSchema: z.ZodObject<{
    fields: z.ZodArray<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const getDsarRequestsQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        received: "received";
        in_progress: "in_progress";
        awaiting_subject: "awaiting_subject";
        fulfilled: "fulfilled";
        refused: "refused";
        cancelled: "cancelled";
    }>>;
    type: z.ZodOptional<z.ZodEnum<{
        access: "access";
        rectification: "rectification";
        erasure: "erasure";
        restriction: "restriction";
        portability: "portability";
        objection: "objection";
    }>>;
    assigneeUserId: z.ZodOptional<z.ZodString>;
    overdue: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
declare const dsarRequestResponseSchema: z.ZodObject<{
    id: z.ZodString;
    subjectUserId: z.ZodNullable<z.ZodString>;
    subjectEmail: z.ZodString;
    subjectName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<{
        access: "access";
        rectification: "rectification";
        erasure: "erasure";
        restriction: "restriction";
        portability: "portability";
        objection: "objection";
    }>;
    status: z.ZodEnum<{
        received: "received";
        in_progress: "in_progress";
        awaiting_subject: "awaiting_subject";
        fulfilled: "fulfilled";
        refused: "refused";
        cancelled: "cancelled";
    }>;
    receivedAt: z.ZodString;
    dueAt: z.ZodString;
    isOverdue: z.ZodBoolean;
    identityVerifiedAt: z.ZodNullable<z.ZodString>;
    assigneeUserId: z.ZodNullable<z.ZodString>;
    assigneeName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resolutionNote: z.ZodNullable<z.ZodString>;
    closedAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const dsarEventResponseSchema: z.ZodObject<{
    id: z.ZodString;
    requestId: z.ZodString;
    actorUserId: z.ZodNullable<z.ZodString>;
    actorName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    eventType: z.ZodString;
    note: z.ZodNullable<z.ZodString>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodUnknown>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
type CreateDsarRequestSchema = z.infer<typeof createDsarRequestSchema>;
type UpdateDsarRequestSchema = z.infer<typeof updateDsarRequestSchema>;
type CreateDsarEventSchema = z.infer<typeof createDsarEventSchema>;
type SetDsarRestrictionSchema = z.infer<typeof setDsarRestrictionSchema>;
type DsarErasureSchema = z.infer<typeof dsarErasureSchema>;
type RecordDsarRectificationSchema = z.infer<typeof recordDsarRectificationSchema>;
type GetDsarRequestsQuerySchema = z.infer<typeof getDsarRequestsQuerySchema>;
type DsarRequestResponse = z.infer<typeof dsarRequestResponseSchema>;
type DsarEventResponse = z.infer<typeof dsarEventResponseSchema>;

declare const ENTITY_LINK_TYPES: readonly ["image", "document", "invoice", "warranty", "agenda", "schedule", "deadline", "meeting", "resolved_by", "based_on", "discussed_in", "expense_for", "related_to"];
declare const LINKABLE_ENTITY_TYPES: readonly ["failure_report", "notice", "event", "poll", "file", "expense_transaction", "board_card"];
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
    notice: "notice";
    event: "event";
    poll: "poll";
    file: "file";
    expense_transaction: "expense_transaction";
    board_card: "board_card";
}>;
/** One end of an entity link. */
declare const entityLinkEndpointSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        failure_report: "failure_report";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
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
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
            board_card: "board_card";
        }>;
    }, z.core.$strip>;
    target: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
            board_card: "board_card";
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
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
            board_card: "board_card";
        }>;
    }, z.core.$strip>;
    target: z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            failure_report: "failure_report";
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
            board_card: "board_card";
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
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
    }>;
    targetId: z.ZodString;
    targetType: z.ZodEnum<{
        failure_report: "failure_report";
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
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
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
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
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
    }>;
    ids: z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<string[], string>>, z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
type CreateEntityLinkRequest = z.infer<typeof createEntityLinkRequestSchema>;
type DeleteEntityLinkQuery = z.infer<typeof deleteEntityLinkQuerySchema>;
type GetEntityLinksQuery = z.infer<typeof getEntityLinksQuerySchema>;
type GetEntityLinkCountsQuery = z.infer<typeof getEntityLinkCountsQuerySchema>;

/** Body of `POST /buildings/:buildingId/expenses`. */
declare const createExpenseSchema: z.ZodObject<{
    categoryId: z.ZodString;
    amount: z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
    failureReportIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
}, z.core.$strict>;
/** Body of `PUT /buildings/:buildingId/expenses/:id` — partial patch. */
declare const updateExpenseSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
    failureReportIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
}, z.core.$strict>;
type UpdateExpenseSchema = z.infer<typeof updateExpenseSchema>;

/**
 * Validation constants for failure reports
 */
declare const FAILURE_REPORT_LIMITS: {
    readonly TITLE_MIN: 1;
    readonly TITLE_MAX: 100;
    readonly DESCRIPTION_MAX: 2000;
    readonly COMMON_AREA_DESCRIPTION_MAX: 500;
    readonly CONTRACTOR_MAX: 200;
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
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
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
    fundingSource: z.ZodOptional<z.ZodEnum<{
        pricuva: "pricuva";
        osiguranje: "osiguranje";
        suvlasnik: "suvlasnik";
        ostalo: "ostalo";
    }>>;
    warrantyClaim: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    contractor: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
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
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
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
    fundingSource: z.ZodOptional<z.ZodEnum<{
        pricuva: "pricuva";
        osiguranje: "osiguranje";
        suvlasnik: "suvlasnik";
        ostalo: "ostalo";
    }>>;
    warrantyClaim: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
    contractor: z.ZodOptional<z.ZodString>;
    cost: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    fileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    removeChildFileIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
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

declare const submitIdCardVerificationSchema: z.ZodObject<{
    idCardNumber: z.ZodString;
}, z.core.$strip>;
type SubmitIdCardVerificationSchema = z.infer<typeof submitIdCardVerificationSchema>;
declare const rejectIdCardVerificationSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
type RejectIdCardVerificationSchema = z.infer<typeof rejectIdCardVerificationSchema>;
declare const idCardVerificationStatusSchema: z.ZodEnum<{
    pending: "pending";
    rejected: "rejected";
    approved: "approved";
}>;
type IdCardVerificationStatus = z.infer<typeof idCardVerificationStatusSchema>;

/** Body of `POST /buildings/:buildingId/income`. */
declare const createIncomeSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
/** Body of `PUT /buildings/:buildingId/income/:id` — partial patch. */
declare const updateIncomeSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    amount: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>>;
    description: z.ZodOptional<z.ZodString>;
    period: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
type CreateIncomeSchema = z.infer<typeof createIncomeSchema>;
type UpdateIncomeSchema = z.infer<typeof updateIncomeSchema>;

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
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
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
    allowComments: z.ZodOptional<z.ZodPipe<z.ZodTransform<{}, unknown>, z.ZodBoolean>>;
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
    addressId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastInvitedAt: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>>>;
    buildingSharePercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isBuildingShareDerived: z.ZodOptional<z.ZodBoolean>;
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
    addressId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    streetId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    houseNumber: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    paymentRefCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    userId: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    buildingSharePercentage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
type CreateOwnerInput = z.infer<typeof createOwnerSchema>;
declare const updateOwnerSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    oib: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    addressId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    streetId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    houseNumber: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    paymentRefCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    userId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    buildingSharePercentage: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
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
 * One current owner↔unit assignment, as returned by the building-wide
 * aggregate (`GET /buildings/:id/owner-assignments`). Deliberately flat —
 * the owners board joins these against the owner list and the unit lists
 * on the client, so the payload is one small row per current link
 * (`endedAt IS NULL`) instead of nested owner/unit objects.
 */
declare const buildingOwnerAssignmentSchema: z.ZodObject<{
    unitId: z.ZodString;
    ownerId: z.ZodString;
    ownershipPercentage: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
type BuildingOwnerAssignment = z.infer<typeof buildingOwnerAssignmentSchema>;
/**
 * Invite an owner to register. Valid only for owner rows that have an
 * email and no linked user; the backend sends the standard building
 * OTP invite to `owner.email` and stamps `lastInvitedAt`.
 */
declare const inviteOwnerSchema: z.ZodObject<{
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type InviteOwnerInput = z.infer<typeof inviteOwnerSchema>;

declare const createPlatformSubscriptionSchema: z.ZodObject<{
    entityType: z.ZodEnum<{
        organization: "organization";
        building: "building";
    }>;
    entityId: z.ZodString;
    tier: z.ZodEnum<{
        standard: "standard";
        enterprise: "enterprise";
    }>;
    quantity: z.ZodNumber;
    pricePerUnitCents: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    trialEndsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const updatePlatformSubscriptionSchema: z.ZodObject<{
    tier: z.ZodOptional<z.ZodEnum<{
        standard: "standard";
        enterprise: "enterprise";
    }>>;
    quantity: z.ZodOptional<z.ZodNumber>;
    pricePerUnitCents: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    trialEndsAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        cancelled: "cancelled";
        past_due: "past_due";
    }>>;
}, z.core.$strip>;
declare const getPlatformSubscriptionsQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodString>;
    tier: z.ZodOptional<z.ZodEnum<{
        standard: "standard";
        enterprise: "enterprise";
    }>>;
    entityType: z.ZodOptional<z.ZodEnum<{
        organization: "organization";
        building: "building";
    }>>;
    trialing: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
declare const platformSubscriptionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    entityType: z.ZodEnum<{
        organization: "organization";
        building: "building";
    }>;
    entityId: z.ZodString;
    entityName: z.ZodNullable<z.ZodString>;
    tier: z.ZodEnum<{
        standard: "standard";
        enterprise: "enterprise";
    }>;
    status: z.ZodString;
    quantity: z.ZodNumber;
    pricePerUnitCents: z.ZodNullable<z.ZodNumber>;
    /** Computed: quantity × (negotiated price or the catalog price). */
    monthlyTotalCents: z.ZodNumber;
    trialEndsAt: z.ZodNullable<z.ZodString>;
    trialEndedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    currentPeriodEnd: z.ZodNullable<z.ZodString>;
    priceSetAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    priceSetByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const updateEnterpriseRequestSchema: z.ZodObject<{
    status: z.ZodEnum<{
        fulfilled: "fulfilled";
        open: "open";
        contacted: "contacted";
        dismissed: "dismissed";
    }>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
declare const getEnterpriseRequestsQuerySchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<{
        fulfilled: "fulfilled";
        open: "open";
        contacted: "contacted";
        dismissed: "dismissed";
    }>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    offset: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
declare const enterpriseRequestResponseSchema: z.ZodObject<{
    id: z.ZodString;
    entityType: z.ZodEnum<{
        organization: "organization";
        building: "building";
    }>;
    entityId: z.ZodNullable<z.ZodString>;
    entityName: z.ZodNullable<z.ZodString>;
    requestedByName: z.ZodNullable<z.ZodString>;
    requestedByEmail: z.ZodNullable<z.ZodString>;
    unitCount: z.ZodNullable<z.ZodNumber>;
    status: z.ZodEnum<{
        fulfilled: "fulfilled";
        open: "open";
        contacted: "contacted";
        dismissed: "dismissed";
    }>;
    notes: z.ZodNullable<z.ZodString>;
    handledByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const revenueMetricsResponseSchema: z.ZodObject<{
    /** Booked monthly recurring revenue in cents; excludes trialing entities. */
    mrrCents: z.ZodNumber;
    payingEntities: z.ZodNumber;
    billableUnits: z.ZodNumber;
    arpuCents: z.ZodNumber;
    /**
     * Rolling 90-day trial→paid conversion, 0–1. Null until enough history
     * accrues — trial end dates were being erased before this pass, so the
     * series starts at deploy rather than being backfilled.
     */
    trialConversionRate: z.ZodNullable<z.ZodNumber>;
    unpaidAging: z.ZodArray<z.ZodObject<{
        bucket: z.ZodEnum<{
            "0_30": "0_30";
            "31_60": "31_60";
            "61_90": "61_90";
            "90_plus": "90_plus";
        }>;
        count: z.ZodNumber;
        amountCents: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$loose>;
type CreatePlatformSubscriptionSchema = z.infer<typeof createPlatformSubscriptionSchema>;
type UpdatePlatformSubscriptionSchema = z.infer<typeof updatePlatformSubscriptionSchema>;
type GetPlatformSubscriptionsQuerySchema = z.infer<typeof getPlatformSubscriptionsQuerySchema>;
type PlatformSubscriptionResponse = z.infer<typeof platformSubscriptionResponseSchema>;
type UpdateEnterpriseRequestSchema = z.infer<typeof updateEnterpriseRequestSchema>;
type GetEnterpriseRequestsQuerySchema = z.infer<typeof getEnterpriseRequestsQuerySchema>;
type EnterpriseRequestResponse = z.infer<typeof enterpriseRequestResponseSchema>;
type RevenueMetricsResponse = z.infer<typeof revenueMetricsResponseSchema>;

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
 * Canonical monetary field schemas. Money is a two-decimal string end to end.
 *
 * Both schemas accept a string OR a number on the way in (so a client that has
 * not yet migrated off `number` payloads still validates during the transition)
 * and always OUTPUT the canonical `"N.NN"` string. Backends type their
 * `decimal` columns against these; clients parse responses through them.
 */
/** Non-negative amount, up to `decimal(10,2)` (max 99,999,999.99). */
declare const moneyStringSchema: z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
/** Signed balance, up to `decimal(12,2)` — may be negative (overdrawn fund). */
declare const signedMoneyStringSchema: z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<string, string | number>>, z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;

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
    memberRoleType: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    buildingId: z.ZodOptional<z.ZodString>;
    orgId: z.ZodOptional<z.ZodString>;
    chatVisibleToCoOwners: z.ZodOptional<z.ZodBoolean>;
    isOwner: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
type PermissionsResponseSchema = z.infer<typeof permissionsResponseSchema>;

/** Params for `GET /representatives/users`. */
declare const getRepUsersParamsSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    buildingRole: z.ZodOptional<z.ZodEnum<{
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
        co_owner: "co_owner";
        resident: "resident";
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

declare const aiChatMessageSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    role: z.ZodEnum<{
        system: "system";
        user: "user";
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
            system: "system";
            user: "user";
            assistant: "assistant";
        }>;
        content: z.ZodOptional<z.ZodString>;
        parts: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    }, z.core.$strip>>;
}, z.core.$strip>;

/**
 * Validation constants for the building mailbox. Clients derive their form
 * validation from these instead of inventing local caps.
 */
declare const EMAIL_LIMITS: {
    readonly SUBJECT_MAX: 200;
    readonly BODY_MAX: 50000;
    readonly RECIPIENT_NAME_MAX: 100;
    readonly CC_MAX: 10;
    /** Per-message attachment cap; individual files obey the shared 10MB/type rules. */
    readonly ATTACHMENTS_MAX: 10;
};
/**
 * Body of `POST /buildings/:buildingId/email/threads` — representative
 * opens a new outbound thread to an external party (typically the
 * building's manager / upravitelj).
 *
 * Attachments ride along as multipart file parts (extracted server-side by
 * MultipartFilesInterceptor, same convention as notices/documents), so they
 * are not part of this schema.
 */
declare const createEmailThreadRequestSchema: z.ZodObject<{
    recipientEmail: z.ZodString;
    recipientName: z.ZodOptional<z.ZodString>;
    ccEmails: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>, z.ZodArray<z.ZodString>>>;
    subject: z.ZodString;
    body: z.ZodString;
}, z.core.$strict>;
type CreateEmailThreadRequestPayload = z.infer<typeof createEmailThreadRequestSchema>;

/**
 * Body of `POST /buildings/:buildingId/email/threads/:threadId/reply` —
 * representative sends a reply message on an existing thread. Attachments
 * ride along as multipart file parts (see create-email-thread).
 */
declare const replyEmailThreadRequestSchema: z.ZodObject<{
    body: z.ZodString;
    ccEmails: z.ZodOptional<z.ZodPipe<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>, z.ZodArray<z.ZodString>>>;
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
declare const updateFailureReportRequestSchema: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    description: zod.ZodOptional<zod.ZodString>;
    status: zod.ZodOptional<zod.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>>;
    allowComments: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<{}, unknown>, zod.ZodBoolean>>;
    priority: zod.ZodOptional<zod.ZodEnum<{
        normal: "normal";
        urgent: "urgent";
    }>>;
    locationType: zod.ZodOptional<zod.ZodEnum<{
        common_area: "common_area";
        own_unit: "own_unit";
    }>>;
    commonAreaDescription: zod.ZodOptional<zod.ZodString>;
    unitType: zod.ZodOptional<zod.ZodEnum<{
        apartment: "apartment";
        garage: "garage";
        storage_unit: "storage_unit";
    }>>;
    unitId: zod.ZodOptional<zod.ZodString>;
    fundingSource: zod.ZodOptional<zod.ZodEnum<{
        pricuva: "pricuva";
        osiguranje: "osiguranje";
        suvlasnik: "suvlasnik";
        ostalo: "ostalo";
    }>>;
    warrantyClaim: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<{}, unknown>, zod.ZodBoolean>>;
    contractor: zod.ZodOptional<zod.ZodString>;
    cost: zod.ZodOptional<zod.ZodPipe<zod.ZodPipe<zod.ZodUnion<readonly [zod.ZodString, zod.ZodNumber]>, zod.ZodTransform<string, string | number>>, zod.ZodPipe<zod.ZodString, zod.ZodTransform<string, string>>>>;
    fileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    removeChildFileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    events: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodObject<{
        startDate: zod.ZodCoercedDate<unknown>;
        endDate: zod.ZodCoercedDate<unknown>;
        title: zod.ZodOptional<zod.ZodString>;
        description: zod.ZodOptional<zod.ZodString>;
    }, zod_v4_core.$strip>>>>;
    id: zod.ZodString;
}, zod_v4_core.$strip>;

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
declare const updateNoticeRequestSchema: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    content: zod.ZodOptional<zod.ZodString>;
    pinned: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<{}, unknown>, zod.ZodBoolean>>;
    allowComments: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<{}, unknown>, zod.ZodBoolean>>;
    events: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodObject<{
        id: zod.ZodOptional<zod.ZodString>;
        startDate: zod.ZodCoercedDate<unknown>;
        endDate: zod.ZodCoercedDate<unknown>;
        title: zod.ZodOptional<zod.ZodString>;
        description: zod.ZodOptional<zod.ZodString>;
    }, zod_v4_core.$strip>>>>;
    fileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    removeChildFileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    id: zod.ZodString;
}, zod_v4_core.$strip>;

/**
 * Body of `PATCH /platform/features/:key` — a platform admin flips a feature
 * on or off app-wide. The `note` is the audit-friendly "why", surfaced back on
 * the admin page next to who changed it.
 */
declare const updatePlatformFeatureRequestSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    note: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
type UpdatePlatformFeatureRequestPayload = z.infer<typeof updatePlatformFeatureRequestSchema>;

/**
 * Update poll request schema — the canonical PATCH request shape,
 * combining the poll `id` (from the URL) with the optional body fields
 * validated by `updatePollSchema` in `entities/poll.schema.ts`.
 */
declare const updatePollRequestSchema: zod.ZodObject<{
    question: zod.ZodOptional<zod.ZodString>;
    options: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    pollType: zod.ZodOptional<zod.ZodEnum<{
        consensus: "consensus";
        community: "community";
    }>>;
    deadline: zod.ZodOptional<zod.ZodCoercedDate<unknown>>;
    requiredConsensusPercentage: zod.ZodOptional<zod.ZodCoercedNumber<unknown>>;
    consensusCategory: zod.ZodOptional<zod.ZodString>;
    legalBasis: zod.ZodOptional<zod.ZodString>;
    status: zod.ZodOptional<zod.ZodEnum<{
        active: "active";
        inactive: "inactive";
        ended: "ended";
    }>>;
    scopedUnitIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    scopedOwnerIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    fileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    removeChildFileIds: zod.ZodOptional<zod.ZodPipe<zod.ZodTransform<unknown, unknown>, zod.ZodArray<zod.ZodString>>>;
    id: zod.ZodString;
}, zod_v4_core.$strip>;

/**
 * Response shape returned by bare-action endpoints (approve, archive, restore,
 * permanent-delete, decline, etc.) — the controller finishes the side effect
 * and returns a single human-readable confirmation string.
 *
 * Shape is intentionally minimal: backend controllers across notices, polls,
 * failure-reports, events, garages, storage-units, apartments,
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

declare const ARCHIVE_TYPES: readonly ["apartments", "blog_posts", "board_cards", "boards", "building_join_requests", "buildings", "comments", "events", "failure_reports", "faqs", "files", "garages", "income_transactions", "notices", "organizations", "polls", "recurring_templates", "storage_units", "transaction_categories", "units"];
type ArchiveType = (typeof ARCHIVE_TYPES)[number];
declare const archiveTypeSchema: z.ZodEnum<{
    notices: "notices";
    polls: "polls";
    events: "events";
    buildings: "buildings";
    boards: "boards";
    units: "units";
    apartments: "apartments";
    blog_posts: "blog_posts";
    board_cards: "board_cards";
    building_join_requests: "building_join_requests";
    comments: "comments";
    failure_reports: "failure_reports";
    faqs: "faqs";
    files: "files";
    garages: "garages";
    income_transactions: "income_transactions";
    organizations: "organizations";
    recurring_templates: "recurring_templates";
    storage_units: "storage_units";
    transaction_categories: "transaction_categories";
}>;
/**
 * The subset of archive types a building's own managers may browse and
 * restore via `GET/POST /buildings/:id/archive/…` — strictly the
 * building-scoped tables. Mirrors the backend's BUILDING_ARCHIVE_TYPE_FILTERS.
 */
declare const BUILDING_ARCHIVE_TYPES: readonly ["board_cards", "boards", "building_join_requests", "comments", "events", "failure_reports", "faqs", "files", "income_transactions", "notices", "polls", "units", "transaction_categories"];
type BuildingArchiveType = (typeof BUILDING_ARCHIVE_TYPES)[number];
declare const buildingArchiveTypeSchema: z.ZodEnum<{
    notices: "notices";
    polls: "polls";
    events: "events";
    boards: "boards";
    units: "units";
    board_cards: "board_cards";
    building_join_requests: "building_join_requests";
    comments: "comments";
    failure_reports: "failure_reports";
    faqs: "faqs";
    files: "files";
    income_transactions: "income_transactions";
    transaction_categories: "transaction_categories";
}>;
declare const archivedItemSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        notices: "notices";
        polls: "polls";
        events: "events";
        buildings: "buildings";
        boards: "boards";
        units: "units";
        apartments: "apartments";
        blog_posts: "blog_posts";
        board_cards: "board_cards";
        building_join_requests: "building_join_requests";
        comments: "comments";
        failure_reports: "failure_reports";
        faqs: "faqs";
        files: "files";
        garages: "garages";
        income_transactions: "income_transactions";
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
            notices: "notices";
            polls: "polls";
            events: "events";
            buildings: "buildings";
            boards: "boards";
            units: "units";
            apartments: "apartments";
            blog_posts: "blog_posts";
            board_cards: "board_cards";
            building_join_requests: "building_join_requests";
            comments: "comments";
            failure_reports: "failure_reports";
            faqs: "faqs";
            files: "files";
            garages: "garages";
            income_transactions: "income_transactions";
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
    createdBy: z.ZodNullable<z.ZodString>;
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

declare const emailAttachmentSchema: z.ZodObject<{
    id: z.ZodString;
    fileName: z.ZodString;
    mimeType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fileSize: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
    url: z.ZodString;
}, z.core.$loose>;
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
    receivedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        fileName: z.ZodString;
        mimeType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        fileSize: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
        url: z.ZodString;
    }, z.core.$loose>>>;
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
    hasAttachments: z.ZodDefault<z.ZodBoolean>;
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
    hasAttachments: z.ZodDefault<z.ZodBoolean>;
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
        receivedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            fileName: z.ZodString;
            mimeType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            fileSize: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
            url: z.ZodString;
        }, z.core.$loose>>>;
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
        hasAttachments: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
declare const emailUnreadCountResponseSchema: z.ZodObject<{
    unreadCount: z.ZodCoercedNumber<unknown>;
}, z.core.$loose>;
type EmailAttachment = Strict<z.infer<typeof emailAttachmentSchema>>;
type EmailMessage = Strict<z.infer<typeof emailMessageSchema>>;
type EmailThread = Strict<z.infer<typeof emailThreadSchema>>;
type EmailThreadDetail = Strict<z.infer<typeof emailThreadDetailSchema>>;
type PaginatedEmailThreadsResponse = Strict<z.infer<typeof paginatedEmailThreadsResponseSchema>>;
type EmailUnreadCountResponse = Strict<z.infer<typeof emailUnreadCountResponseSchema>>;

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

/**
 * Building settings response — shape returned from
 * `GET /buildings/:buildingId/settings`.
 *
 * Field set mirrors the backend `building_settings` row. Consensus voting
 * is governed by `minVotingStrengthForConsensus`; the legacy voting-method
 * toggles and `minVerificationTierForConsensus` are still emitted for old
 * clients but no longer enforced.
 */
declare const buildingSettingsResponseSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    buildingId: z.ZodOptional<z.ZodString>;
    ownershipPercentageSource: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        users: "users";
        units: "units";
    }>>>;
    requireApprovalForNotices: z.ZodBoolean;
    requireApprovalForFailureReports: z.ZodBoolean;
    requireApprovalForPolls: z.ZodBoolean;
    requireApprovalForEvents: z.ZodBoolean;
    allowAnonymousPosting: z.ZodBoolean;
    faqEnabled: z.ZodBoolean;
    houseRulesEnabled: z.ZodBoolean;
    chatEnabled: z.ZodBoolean;
    emailEnabled: z.ZodDefault<z.ZodBoolean>;
    commentsEnabled: z.ZodBoolean;
    coOwnerConsensusEnabled: z.ZodBoolean;
    votingCertiliaEnabled: z.ZodBoolean;
    votingPrintedSignatureEnabled: z.ZodBoolean;
    minVerificationTierForConsensus: z.ZodNumber;
    minVotingStrengthForConsensus: z.ZodOptional<z.ZodNumber>;
    addonAiEnabled: z.ZodOptional<z.ZodBoolean>;
    addonStorage5gbEnabled: z.ZodOptional<z.ZodBoolean>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
type BuildingSettingsResponse = Strict<z.infer<typeof buildingSettingsResponseSchema>>;

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
    senderId: z.ZodNullable<z.ZodString>;
    senderName: z.ZodNullable<z.ZodString>;
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
        senderId: z.ZodNullable<z.ZodString>;
        senderName: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
    }, z.core.$loose>>>;
    unreadCount: z.ZodNumber;
    lastMessageAt: z.ZodString;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const chatMessageResponseSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    senderId: z.ZodNullable<z.ZodString>;
    senderName: z.ZodNullable<z.ZodString>;
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
            senderId: z.ZodNullable<z.ZodString>;
            senderName: z.ZodNullable<z.ZodString>;
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
        senderId: z.ZodNullable<z.ZodString>;
        senderName: z.ZodNullable<z.ZodString>;
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

/**
 * Entity types that can be the SOURCE of a file attachment link — the
 * possible values of a document's `type` / `linkedRecords[].type` besides
 * the standalone `'document'`. Kept as a constant (not a schema enum) so
 * adding a link source never breaks older clients' response parsing —
 * clients should render unknown types with a generic fallback.
 */
declare const DOCUMENT_SOURCE_TYPES: readonly ["notice", "failure_report", "poll", "event", "board_card", "expense_transaction"];
declare const documentLinkedRecordSchema: z.ZodObject<{
    type: z.ZodString;
    id: z.ZodString;
    title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        pending: "pending";
        in_progress: "in_progress";
        resolved: "resolved";
    }>>>;
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
    type: z.ZodOptional<z.ZodString>;
    sourceId: z.ZodOptional<z.ZodString>;
    sourceTitle: z.ZodOptional<z.ZodString>;
    linkedRecords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        id: z.ZodString;
        title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            pending: "pending";
            in_progress: "in_progress";
            resolved: "resolved";
        }>>>;
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
        type: z.ZodOptional<z.ZodString>;
        sourceId: z.ZodOptional<z.ZodString>;
        sourceTitle: z.ZodOptional<z.ZodString>;
        linkedRecords: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            id: z.ZodString;
            title: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            status: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
                pending: "pending";
                in_progress: "in_progress";
                resolved: "resolved";
            }>>>;
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
        notice: "notice";
        event: "event";
        poll: "poll";
        file: "file";
        expense_transaction: "expense_transaction";
        board_card: "board_card";
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
            notice: "notice";
            event: "event";
            poll: "poll";
            file: "file";
            expense_transaction: "expense_transaction";
            board_card: "board_card";
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
    createdAt: z.ZodOptional<z.ZodString>;
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
        createdAt: z.ZodOptional<z.ZodString>;
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
    fundingSource: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
        pricuva: "pricuva";
        osiguranje: "osiguranje";
        suvlasnik: "suvlasnik";
        ostalo: "ostalo";
    }>>>;
    warrantyClaim: z.ZodDefault<z.ZodBoolean>;
    contractor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    cost: z.ZodNullable<z.ZodOptional<z.ZodString>>;
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
        fundingSource: z.ZodNullable<z.ZodOptional<z.ZodEnum<{
            pricuva: "pricuva";
            osiguranje: "osiguranje";
            suvlasnik: "suvlasnik";
            ostalo: "ostalo";
        }>>>;
        warrantyClaim: z.ZodDefault<z.ZodBoolean>;
        contractor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        cost: z.ZodNullable<z.ZodOptional<z.ZodString>>;
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

declare const platformFeatureFlagSchema: z.ZodObject<{
    key: z.ZodEnum<{
        [x: string]: string;
    }>;
    enabled: z.ZodBoolean;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    updatedByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    /** How many buildings set this feature's per-building toggle away from its default. */
    buildingOverrideCount: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
    buildingOverrideDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        enabled: "enabled";
        disabled: "disabled";
    }>>>;
}, z.core.$loose>;
declare const platformFeatureFlagsResponseSchema: z.ZodObject<{
    flags: z.ZodArray<z.ZodObject<{
        key: z.ZodEnum<{
            [x: string]: string;
        }>;
        enabled: z.ZodBoolean;
        note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        updatedByName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        /** How many buildings set this feature's per-building toggle away from its default. */
        buildingOverrideCount: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
        buildingOverrideDirection: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
            enabled: "enabled";
            disabled: "disabled";
        }>>>;
    }, z.core.$loose>>;
}, z.core.$loose>;
declare const featureFlagsResponseSchema: z.ZodObject<{
    flags: z.ZodRecord<z.ZodString, z.ZodBoolean>;
}, z.core.$loose>;
type PlatformFeatureFlag = Strict<z.infer<typeof platformFeatureFlagSchema>>;
type PlatformFeatureFlagsResponse = Strict<z.infer<typeof platformFeatureFlagsResponseSchema>>;
type FeatureFlagsResponse = Strict<z.infer<typeof featureFlagsResponseSchema>>;

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
        cancelled: "cancelled";
        completed: "completed";
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
        cancelled: "cancelled";
        completed: "completed";
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
    hasPendingSignatures: z.ZodOptional<z.ZodBoolean>;
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
        ownerNames: z.ZodOptional<z.ZodArray<z.ZodString>>;
        allOwnersVoted: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$loose>>>;
    eligibleTotalWeight: z.ZodOptional<z.ZodNumber>;
    scopedOwners: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ownerId: z.ZodString;
        fullName: z.ZodString;
        userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
 * Eligible-voter roster entry — one row per owner in the poll's
 * electorate, with the derived ownership weight and unit holdings.
 * Powers the offline-votes modal and signature-sheet preview.
 */
declare const pollEligibleVoterSchema: z.ZodObject<{
    ownerId: z.ZodString;
    userId: z.ZodNullable<z.ZodString>;
    fullName: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    oib: z.ZodNullable<z.ZodString>;
    weightPct: z.ZodString;
    holdings: z.ZodArray<z.ZodObject<{
        unitType: z.ZodString;
        unitId: z.ZodString;
        label: z.ZodString;
        floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        areaM2: z.ZodNullable<z.ZodString>;
        unitSharePct: z.ZodString;
    }, z.core.$loose>>;
    voteStatus: z.ZodOptional<z.ZodEnum<{
        rejected: "rejected";
        accepted: "accepted";
        pending_signature_review: "pending_signature_review";
        not_voted: "not_voted";
    }>>;
}, z.core.$loose>;
/**
 * Eligible-voters response — the poll's electorate with derived
 * weights, plus data-quality warnings from the roster derivation.
 */
declare const pollEligibleVotersResponseSchema: z.ZodObject<{
    pollId: z.ZodString;
    voters: z.ZodArray<z.ZodObject<{
        ownerId: z.ZodString;
        userId: z.ZodNullable<z.ZodString>;
        fullName: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        oib: z.ZodNullable<z.ZodString>;
        weightPct: z.ZodString;
        holdings: z.ZodArray<z.ZodObject<{
            unitType: z.ZodString;
            unitId: z.ZodString;
            label: z.ZodString;
            floor: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            areaM2: z.ZodNullable<z.ZodString>;
            unitSharePct: z.ZodString;
        }, z.core.$loose>>;
        voteStatus: z.ZodOptional<z.ZodEnum<{
            rejected: "rejected";
            accepted: "accepted";
            pending_signature_review: "pending_signature_review";
            not_voted: "not_voted";
        }>>;
    }, z.core.$loose>>;
    totalWeightPct: z.ZodString;
    warnings: z.ZodObject<{
        unitsWithoutArea: z.ZodArray<z.ZodString>;
        unitsWithoutOwners: z.ZodArray<z.ZodString>;
    }, z.core.$loose>;
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
        userId: z.ZodNullable<z.ZodString>;
        ownerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        name: z.ZodString;
        email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        selectedOptionIndex: z.ZodNumber;
        selectedOptionText: z.ZodString;
        voteWeight: z.ZodNumber;
        votedAt: z.ZodString;
        isOffline: z.ZodOptional<z.ZodBoolean>;
        hasAccount: z.ZodOptional<z.ZodBoolean>;
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
            cancelled: "cancelled";
            completed: "completed";
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
type PollEligibleVoter = Strict<z.infer<typeof pollEligibleVoterSchema>>;
type PollEligibleVotersResponse = Strict<z.infer<typeof pollEligibleVotersResponseSchema>>;

declare const repUserBuildingSchema: z.ZodObject<{
    buildingId: z.ZodString;
    buildingName: z.ZodString;
    buildingAddress: z.ZodString;
    roleType: z.ZodEnum<{
        owner_representative: "owner_representative";
        deputy_representative: "deputy_representative";
        co_owner: "co_owner";
        resident: "resident";
    }>;
    buildingSurfacePercentage: z.ZodString;
    createdAt: z.ZodString;
    canEdit: z.ZodBoolean;
    canKick: z.ZodBoolean;
}, z.core.$loose>;
declare const repUserItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    buildings: z.ZodArray<z.ZodObject<{
        buildingId: z.ZodString;
        buildingName: z.ZodString;
        buildingAddress: z.ZodString;
        roleType: z.ZodEnum<{
            owner_representative: "owner_representative";
            deputy_representative: "deputy_representative";
            co_owner: "co_owner";
            resident: "resident";
        }>;
        buildingSurfacePercentage: z.ZodString;
        createdAt: z.ZodString;
        canEdit: z.ZodBoolean;
        canKick: z.ZodBoolean;
    }, z.core.$loose>>;
    isYou: z.ZodBoolean;
}, z.core.$loose>;
declare const paginatedRepUsersResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        address: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        buildings: z.ZodArray<z.ZodObject<{
            buildingId: z.ZodString;
            buildingName: z.ZodString;
            buildingAddress: z.ZodString;
            roleType: z.ZodEnum<{
                owner_representative: "owner_representative";
                deputy_representative: "deputy_representative";
                co_owner: "co_owner";
                resident: "resident";
            }>;
            buildingSurfacePercentage: z.ZodString;
            createdAt: z.ZodString;
            canEdit: z.ZodBoolean;
            canKick: z.ZodBoolean;
        }, z.core.$loose>>;
        isYou: z.ZodBoolean;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
declare const repBuildingItemSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    address: z.ZodString;
    type: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>;
    status: z.ZodString;
    totalUnits: z.ZodNumber;
    manager: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
    }, z.core.$loose>;
    funds: z.ZodObject<{
        currentBalance: z.ZodString;
        currency: z.ZodString;
    }, z.core.$loose>;
    createdAt: z.ZodString;
    updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    coverImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
declare const paginatedRepBuildingsResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        address: z.ZodString;
        type: z.ZodEnum<{
            residential: "residential";
            commercial: "commercial";
            residential_commercial: "residential_commercial";
        }>;
        status: z.ZodString;
        totalUnits: z.ZodNumber;
        manager: z.ZodObject<{
            name: z.ZodString;
            email: z.ZodString;
        }, z.core.$loose>;
        funds: z.ZodObject<{
            currentBalance: z.ZodString;
            currency: z.ZodString;
        }, z.core.$loose>;
        createdAt: z.ZodString;
        updatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        coverImage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>;
    count: z.ZodNumber;
    page: z.ZodNumber;
    limit: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNextPage: z.ZodBoolean;
    hasPreviousPage: z.ZodBoolean;
}, z.core.$strip>;
declare const REP_RECENT_ACTIVITY_TYPES: readonly ["notice", "failure_report", "user_joined"];
declare const repRecentActivityTypeSchema: z.ZodEnum<{
    failure_report: "failure_report";
    notice: "notice";
    user_joined: "user_joined";
}>;
declare const repRecentActivitySchema: z.ZodObject<{
    buildingId: z.ZodString;
    buildingName: z.ZodString;
    activityType: z.ZodEnum<{
        failure_report: "failure_report";
        notice: "notice";
        user_joined: "user_joined";
    }>;
    description: z.ZodString;
    timestamp: z.ZodString;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$loose>;
declare const repBuildingActivitySchema: z.ZodObject<{
    buildingId: z.ZodString;
    buildingName: z.ZodString;
    buildingAddress: z.ZodString;
    buildingType: z.ZodEnum<{
        residential: "residential";
        commercial: "commercial";
        residential_commercial: "residential_commercial";
    }>;
    lastActivityAt: z.ZodString;
}, z.core.$loose>;
declare const repDashboardSummaryResponseSchema: z.ZodObject<{
    buildings: z.ZodObject<{
        total: z.ZodNumber;
        addedThisMonth: z.ZodNumber;
        byType: z.ZodObject<{
            residential: z.ZodNumber;
            commercial: z.ZodNumber;
        }, z.core.$loose>;
    }, z.core.$loose>;
    users: z.ZodObject<{
        total: z.ZodNumber;
        managers: z.ZodNumber;
        newThisMonth: z.ZodNumber;
        byRole: z.ZodObject<{
            admin: z.ZodNumber;
            manager: z.ZodNumber;
            tenant: z.ZodNumber;
        }, z.core.$loose>;
    }, z.core.$loose>;
    activities: z.ZodObject<{
        notices: z.ZodObject<{
            total: z.ZodNumber;
            pending: z.ZodNumber;
            today: z.ZodNumber;
        }, z.core.$loose>;
        failureReports: z.ZodObject<{
            total: z.ZodNumber;
            open: z.ZodNumber;
            resolved: z.ZodNumber;
            today: z.ZodNumber;
        }, z.core.$loose>;
    }, z.core.$loose>;
    polls: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        active: z.ZodNumber;
        pendingApproval: z.ZodNumber;
        expiringSoon: z.ZodNumber;
    }, z.core.$loose>>>;
    funds: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        totalBalance: z.ZodString;
        buildingsWithFunds: z.ZodNumber;
        negativeBalanceCount: z.ZodNumber;
    }, z.core.$loose>>>;
    recentActivity: z.ZodArray<z.ZodObject<{
        buildingId: z.ZodString;
        buildingName: z.ZodString;
        activityType: z.ZodEnum<{
            failure_report: "failure_report";
            notice: "notice";
            user_joined: "user_joined";
        }>;
        description: z.ZodString;
        timestamp: z.ZodString;
        userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        userName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$loose>>;
    buildingsWithActivity: z.ZodArray<z.ZodObject<{
        buildingId: z.ZodString;
        buildingName: z.ZodString;
        buildingAddress: z.ZodString;
        buildingType: z.ZodEnum<{
            residential: "residential";
            commercial: "commercial";
            residential_commercial: "residential_commercial";
        }>;
        lastActivityAt: z.ZodString;
    }, z.core.$loose>>;
    totalUsers: z.ZodNumber;
    totalManagers: z.ZodNumber;
    newManagersThisMonth: z.ZodNumber;
    newUsersThisMonth: z.ZodNumber;
    activitiesLast24Hours: z.ZodNumber;
    pendingSignatureVotes: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$loose>;
type RepUserBuilding = Strict<z.infer<typeof repUserBuildingSchema>>;
type RepBuildingItem = Strict<z.infer<typeof repBuildingItemSchema>>;
type RepRecentActivity = Strict<z.infer<typeof repRecentActivitySchema>>;
type RepBuildingActivity = Strict<z.infer<typeof repBuildingActivitySchema>>;
type RepDashboardSummaryResponse = Strict<z.infer<typeof repDashboardSummaryResponseSchema>>;

declare const commonStatusOptions: readonly ["active", "completed", "cancelled"];
declare const approvalStatusOptions: readonly ["pending", "approved", "rejected"];
declare const failureStatusOptions: readonly ["pending", "in_progress", "resolved"];
/**
 * Priority options
 */
declare const priorityOptions: readonly ["normal", "urgent"];
declare const CommonStatusSchema: z.ZodEnum<{
    active: "active";
    cancelled: "cancelled";
    completed: "completed";
}>;
declare const ApprovalStatusSchema: z.ZodEnum<{
    pending: "pending";
    rejected: "rejected";
    approved: "approved";
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

export { ARCHIVE_TYPES, AUDIT_DENIAL_TARGET_TYPE, type AddOrgMemberSchema, type AiUsageResponse, type ApiError, type ApiErrorResponse, ApprovalStatusSchema, type ApproveFailureReportSchema, type ApproveNoticeSchema, type ArchiveType, type ArchivedItem, type AssignOrgBuildingSchema, type AssignOrgMemberBuildingSchema, type AssignOwnerInput, type AuditLogResponse, BOARD_CARD_LIMITS, BOARD_COLUMN_LIMITS, BOARD_LIMITS, BUILDING_ARCHIVE_TYPES, BUILDING_LIMITS, BUILDING_TYPES, type BuildingArchiveType, type BuildingDetailResponse, type BuildingFundsLedgerResponse, type BuildingFundsLedgerRow, type BuildingOwnerAssignment, type BuildingResponse, type BuildingSettingsResponse, type BusinessPartnerResponse, CHAT_LIMITS, type CamtImportResponse, type ChatMessageResponse, type CommentResponse, CommonStatusSchema, type ConversationLastMessage, type ConversationParticipant, type ConversationResponse, ConversationType, type ConversationsListResponse, type CopyFaqsSchema, type CopyTransactionCategoriesSchema, type CreateBoardCardSchema, type CreateBoardColumnSchema, type CreateBoardSchema, type CreateBuildingSchema, type CreateBusinessPartnerInput, type CreateConversationSchema, type CreateDocumentSchema, type CreateDsarEventSchema, type CreateDsarRequestSchema, type CreateEmailThreadRequestPayload, type CreateEntityLinkRequest, type CreateFailureReportSchema, type CreateFaqSchema, type CreateIncomeSchema, type CreateNoticeSchema, type CreateOrgBroadcastSchema, type CreateOrganizationSchema, type CreateOwnerInput, type CreatePlatformSubscriptionSchema, type CreateTransactionCategorySchema, type CreateUnitInput, type CursorQuerySchema, DOCUMENT_LIMITS, DOCUMENT_SOURCE_TYPES, type DeleteEntityLinkQuery, type DocumentFile, type DocumentLinkedRecord, type DocumentResponse, type DsarErasureSchema, type DsarEventResponse, type DsarRequestResponse, EMAIL_LIMITS, ENTITY_LINK_TYPES, type EmailAttachment, type EmailMessage, type EmailThread, type EmailThreadDetail, type EmailUnreadCountResponse, type EnterpriseRequestResponse, type EntityLinkCountsResponse, type EntityLinkMetadata, type EntityLinkReference, type EntityLinksResponse, type EventResponse, FAILURE_REPORT_LIMITS, FAQ_LIMITS, type FailureReportEventSchema, type FailureReportResponse, FailureStatusSchema, type FaqResponse, type FeatureFlagsResponse, type GetAuditLogsQuerySchema, type GetDsarRequestsQuerySchema, type GetEnterpriseRequestsQuerySchema, type GetEntityLinkCountsQuery, type GetEntityLinksQuery, type GetOrgBuildingsQuerySchema, type GetOrgMembersQuerySchema, type GetPlatformSubscriptionsQuerySchema, type GetTransactionCategoriesQuerySchema, type IdCardVerificationStatus, type InviteOrgMemberSchema, type InviteOwnerInput, type JoinBuildingWithOtpSchema, LINKABLE_ENTITY_TYPES, type ListArchivedResponse, type MessageResponse, type MessagesListResponse, type MoveBoardCardSchema, NOTICE_LIMITS, type NoticeEventSchema, type NoticeResponse, ORGANIZATION_LIMITS, type OrgBroadcastResponse, type OrgInvitationResponse, OrgInvitationStatus, type OwnerResponse, type PaginatedBuildingsResponse, type PaginatedDocumentsResponse, type PaginatedEmailThreadsResponse, type PaginatedEventsResponse, type PaginatedFailureReportsResponse, type PaginatedNoticesResponse, type PaginatedPollsResponse, type PaginatedUnitsResponse, type PermissionsResponseSchema, type PlatformFeatureFlag, type PlatformFeatureFlagsResponse, type PlatformSubscriptionResponse, type PollEligibleVoter, type PollEligibleVotersResponse, type PollResponse, type PollResults, type PollVotersResponse, PrioritySchema, type PublicOrgInvitation, REP_RECENT_ACTIVITY_TYPES, type RecordDsarRectificationSchema, type RejectIdCardVerificationSchema, type ReorderBoardColumnsSchema, type ReorderFaqsSchema, type RepBuildingActivity, type RepBuildingItem, type RepDashboardSummaryResponse, type RepRecentActivity, type RepUserBuilding, type ReplyEmailThreadRequestPayload, type RevenueMetricsResponse, type SearchUsersQuerySchema, type SendMessageSchema, type SetDsarRestrictionSchema, type SubmitIdCardVerificationSchema, TRANSACTION_CATEGORY_LIMITS, UNIT_KINDS, type Unit, type UnitKind, type UnreadCountResponse, type UpdateBoardCardSchema, type UpdateBoardColumnSchema, type UpdateBoardSchema, type UpdateBuildingSchema, type UpdateBuildingSettingsSchema, type UpdateBusinessPartnerInput, type UpdateConversationSchema, type UpdateDocumentSchema, type UpdateDsarRequestSchema, type UpdateEnterpriseRequestSchema, type UpdateExpenseSchema, type UpdateFailureReportSchema, type UpdateFaqSchema, type UpdateIncomeSchema, type UpdateNoticeSchema, type UpdateOrgBuildingContractSchema, type UpdateOrgMemberRoleSchema, type UpdateOrganizationSchema, type UpdateOwnerInput, type UpdatePlatformFeatureRequestPayload, type UpdatePlatformSubscriptionSchema, type UpdateTransactionCategorySchema, type UpdateUnitInput, type UpdateUserBuildingRoleSchema, addOrgMemberSchema, aiChatMessageSchema, aiChatRequestSchema, aiUsageResponseSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, assignOwnerSchema, auditLogResponseSchema, baseEntitySchema, boardCardChecklistItemSchema, boardCardEventSchema, buildingArchiveTypeSchema, buildingDetailResponseSchema, buildingEntitySchema, buildingFundsLedgerResponseSchema, buildingFundsLedgerRowSchema, buildingOwnerAssignmentSchema, buildingQuotaConfigSchema, buildingQuotaEntrySchema, buildingQuotaListSchema, buildingResponseSchema, buildingSettingsResponseSchema, buildingTypeSchema, buildingUserEntitySchema, businessPartnerResponseSchema, camtImportResponseSchema, certiliaUserinfoSchema, chatMessageResponseSchema, commentResponseSchema, commonStatusOptions, conversationLastMessageSchema, conversationParticipantSchema, conversationResponseSchema, conversationsListResponseSchema, copyFaqsSchema, copyTransactionCategoriesSchema, createBoardCardSchema, createBoardColumnSchema, createBoardSchema, createBuildingSchema, createBusinessPartnerSchema, createConversationSchema, createDocumentSchema, createDsarEventSchema, createDsarRequestSchema, createEmailThreadRequestSchema, createEntityLinkRequestSchema, createExpenseSchema, createFailureReportSchema, createFaqSchema, createIncomeSchema, createNoticeSchema, createOrgBroadcastSchema, createOrganizationSchema, createOwnerSchema, createPlatformSubscriptionSchema, createTransactionCategorySchema, createUnitSchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, deleteEntityLinkQuerySchema, deleteEntityLinkRequestSchema, documentFileSchema, documentLinkedRecordSchema, documentResponseSchema, dsarErasureSchema, dsarEventResponseSchema, dsarRequestResponseSchema, emailAttachmentSchema, emailMessageSchema, emailSchema, emailThreadDetailSchema, emailThreadSchema, emailUnreadCountResponseSchema, enterpriseRequestResponseSchema, entityLinkCountsResponseSchema, entityLinkEndpointSchema, entityLinkMetadataSchema, entityLinkReferenceSchema, entityLinkTypeSchema, entityLinksResponseSchema, eventResponseSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, featureFlagsResponseSchema, forgotPasswordSchema, getAuditLogsQuerySchema, getDsarRequestsQuerySchema, getEnterpriseRequestsQuerySchema, getEntityLinkCountsQuerySchema, getEntityLinksQuerySchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getPlatformSubscriptionsQuerySchema, getRepBuildingsParamsSchema, getRepUsersParamsSchema, getTransactionCategoriesQuerySchema, idCardVerificationStatusSchema, inviteOrgMemberSchema, inviteOwnerSchema, joinBuildingWithOtpSchema, linkableEntityTypeSchema, listArchivedResponseSchema, loginSchema, messageResponseSchema, messagesListResponseSchema, moneyStringSchema, moveBoardCardSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, optionalDateTimeSchema, orgBroadcastResponseSchema, orgInvitationResponseSchema, ownerResponseSchema, paginatedBuildingsResponseSchema, paginatedDocumentsResponseSchema, paginatedEmailThreadsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedRepBuildingsResponseSchema, paginatedRepUsersResponseSchema, paginatedResponseSchema, paginatedUnitsResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, platformFeatureFlagSchema, platformFeatureFlagsResponseSchema, platformSubscriptionResponseSchema, pollEligibleVoterSchema, pollEligibleVotersResponseSchema, pollResponseSchema, pollResultsSchema, pollVotersResponseSchema, priorityOptions, publicOrgInvitationSchema, recordDsarRectificationSchema, registerSchema, rejectIdCardVerificationSchema, reorderBoardColumnsSchema, reorderFaqsSchema, repBuildingActivitySchema, repBuildingItemSchema, repDashboardSummaryResponseSchema, repRecentActivitySchema, repRecentActivityTypeSchema, repUserBuildingSchema, repUserItemSchema, replyEmailThreadRequestSchema, resetPasswordSchema, revenueMetricsResponseSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, setDsarRestrictionSchema, signedMoneyStringSchema, strongPasswordSchema, submitIdCardVerificationSchema, unitKindSchema, unitSchema, unreadCountResponseSchema, updateBoardCardSchema, updateBoardColumnSchema, updateBoardSchema, updateBuildingSchema, updateBuildingSettingsSchema, updateBusinessPartnerSchema, updateConversationSchema, updateDocumentSchema, updateDsarRequestSchema, updateEnterpriseRequestSchema, updateExpenseSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateIncomeSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgBuildingContractSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updateOwnerSchema, updatePasswordSchema, updatePlatformFeatureRequestSchema, updatePlatformSubscriptionSchema, updatePollRequestSchema, updateTransactionCategorySchema, updateUnitSchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema };
