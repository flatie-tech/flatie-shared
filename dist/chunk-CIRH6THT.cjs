'use strict';

var chunkX3TW7GWG_cjs = require('./chunk-X3TW7GWG.cjs');
var chunkXXNOAOHF_cjs = require('./chunk-XXNOAOHF.cjs');
var chunkNQLL5CZO_cjs = require('./chunk-NQLL5CZO.cjs');
var chunkZASNDKJM_cjs = require('./chunk-ZASNDKJM.cjs');
var chunkAKVKGQ3H_cjs = require('./chunk-AKVKGQ3H.cjs');
var zod = require('zod');

var apiErrorSchema = zod.z.object({
  statusCode: zod.z.number(),
  message: zod.z.union([zod.z.string(), zod.z.array(zod.z.string())]),
  timestamp: zod.z.string(),
  path: zod.z.string()
});
var apiErrorResponseSchema = apiErrorSchema.extend({
  code: zod.z.enum(Object.values(chunkAKVKGQ3H_cjs.BACKEND_ERROR_CODES)).optional().describe(
    "Canonical error code from `@flatie/shared/errors` (`BACKEND_ERROR_CODES`). Present when the backend raised a `DomainException`; absent for generic HTTP errors (network failures, unhandled exceptions, validation-pipe rejections)."
  )
}).describe("Standard error envelope returned by the Flatie backend on 4xx and 5xx responses.");
var emailSchema = zod.z.string().email();
var passwordSchema = zod.z.string().min(8).max(128);
var strongPasswordSchema = passwordSchema;
var loginSchema = zod.z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: zod.z.boolean().optional().default(false)
});
var registerSchema = zod.z.object({
  name: zod.z.string().min(3).max(50),
  email: emailSchema,
  password: strongPasswordSchema,
  passwordConfirmation: zod.z.string(),
  agreedToTermsAndConditions: zod.z.boolean().refine((data) => data, {
    message: "You must accept the terms and conditions"
  })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
});
var forgotPasswordSchema = zod.z.object({
  email: emailSchema
});
var resetPasswordSchema = zod.z.object({
  email: emailSchema,
  token: zod.z.string().min(1),
  password: strongPasswordSchema,
  passwordConfirmation: zod.z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
});
var verifyOtpSchema = zod.z.object({
  email: emailSchema,
  otp: zod.z.string().min(4).max(4)
});
var updatePasswordSchema = zod.z.object({
  currentPassword: passwordSchema,
  newPassword: strongPasswordSchema,
  confirmPassword: zod.z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var uuidSchema = zod.z.string().uuid();
var dateTimeSchema = zod.z.string().datetime();
var optionalDateTimeSchema = zod.z.string().datetime().nullable().optional();
var baseEntitySchema = zod.z.object({
  id: uuidSchema,
  createdAt: dateTimeSchema,
  updatedAt: optionalDateTimeSchema
});
var buildingEntitySchema = baseEntitySchema.extend({
  buildingId: uuidSchema
});
var userEntitySchema = baseEntitySchema.extend({
  createdBy: uuidSchema
});
var buildingUserEntitySchema = baseEntitySchema.extend({
  buildingId: uuidSchema,
  createdBy: uuidSchema
});
var permissionFieldsSchema = zod.z.object({
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean()
});
var oibValueSchema = zod.z.string().trim().regex(/^\d{11}$/, "OIB must be 11 digits").optional();
var certiliaUserinfoSchema = zod.z.object({
  sub: zod.z.string().min(1),
  email: zod.z.string().email().optional(),
  email_verified: zod.z.boolean().optional(),
  name: zod.z.string().optional(),
  given_name: zod.z.string().optional(),
  family_name: zod.z.string().optional(),
  phone_number: zod.z.string().optional(),
  address: zod.z.union([zod.z.string(), zod.z.object({ formatted: zod.z.string().optional() }).passthrough()]).optional(),
  // Custom Croatian eID claims — Certilia exposes OIB under a couple of
  // different names depending on tenant configuration. Accept any.
  oib: oibValueSchema,
  pin: oibValueSchema,
  oib_pin: oibValueSchema
}).passthrough().transform((profile) => {
  const oib = profile.oib ?? profile.pin ?? profile.oib_pin ?? void 0;
  const fullName = profile.name ?? [profile.given_name, profile.family_name].filter(Boolean).join(" ").trim() ?? void 0;
  return {
    sub: profile.sub,
    email: profile.email?.toLowerCase().trim(),
    emailVerified: profile.email_verified ?? false,
    name: fullName || void 0,
    givenName: profile.given_name,
    familyName: profile.family_name,
    phoneNumber: profile.phone_number,
    oib,
    raw: profile
  };
});
var dateRangeParamsSchema = zod.z.object({
  fromDate: zod.z.string().optional(),
  toDate: zod.z.string().optional()
});
var dateRangeWithValidationSchema = zod.z.object({
  fromDate: zod.z.string().datetime().optional(),
  toDate: zod.z.string().datetime().optional()
}).refine(
  (data) => {
    if (data.fromDate && data.toDate) {
      return new Date(data.fromDate) <= new Date(data.toDate);
    }
    return true;
  },
  {
    message: "fromDate must be before or equal to toDate",
    path: ["fromDate"]
  }
);
function multipartArray(itemSchema) {
  return zod.z.preprocess((value) => {
    if (Array.isArray(value)) return value;
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (trimmed === "") return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed : [value];
      } catch {
        return [value];
      }
    }
    return [value];
  }, zod.z.array(itemSchema));
}
function multipartBoolean() {
  return zod.z.preprocess((value) => {
    if (typeof value === "boolean") return value;
    if (value === "true") return true;
    if (value === "false" || value === "" || value == null) return false;
    return value;
  }, zod.z.boolean());
}

// src/schemas/entities/board-card.schema.ts
var BOARD_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 60,
  DESCRIPTION_MAX: 500
};
var BOARD_COLUMN_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 40
};
var boardVisibilitySchema = zod.z.enum([chunkZASNDKJM_cjs.BoardVisibility.BUILDING, chunkZASNDKJM_cjs.BoardVisibility.REPRESENTATIVES]);
var createBoardSchema = zod.z.object({
  name: zod.z.string().min(BOARD_LIMITS.NAME_MIN, "Name is required").max(BOARD_LIMITS.NAME_MAX, `Name must be at most ${BOARD_LIMITS.NAME_MAX} characters`).describe("Board name, 1\u201360 chars."),
  description: zod.z.string().max(BOARD_LIMITS.DESCRIPTION_MAX).optional().describe("Optional board description, up to 500 chars."),
  visibility: boardVisibilitySchema.optional().describe(
    "`building` (default) \u2014 visible to every member with board read access; `representatives` \u2014 a private board only representatives can see."
  )
});
var updateBoardSchema = zod.z.object({
  name: zod.z.string().min(BOARD_LIMITS.NAME_MIN).max(BOARD_LIMITS.NAME_MAX).optional().describe("Revised board name, 1\u201360 chars."),
  description: zod.z.string().max(BOARD_LIMITS.DESCRIPTION_MAX).nullable().optional().describe("Revised description; null clears it."),
  visibility: boardVisibilitySchema.optional().describe("Revised visibility.")
});
var createBoardColumnSchema = zod.z.object({
  name: zod.z.string().min(BOARD_COLUMN_LIMITS.NAME_MIN, "Name is required").max(
    BOARD_COLUMN_LIMITS.NAME_MAX,
    `Name must be at most ${BOARD_COLUMN_LIMITS.NAME_MAX} characters`
  ).describe("Column name, 1\u201340 chars.")
});
var updateBoardColumnSchema = zod.z.object({
  name: zod.z.string().min(BOARD_COLUMN_LIMITS.NAME_MIN).max(BOARD_COLUMN_LIMITS.NAME_MAX).describe("Revised column name, 1\u201340 chars.")
});
var reorderBoardColumnsSchema = zod.z.object({
  orderedIds: zod.z.array(uuidSchema).min(1).describe("Every column id of the board in the desired display order.")
});
var BOARD_CARD_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 5e3,
  CHECKLIST_MAX_ITEMS: 50,
  CHECKLIST_ITEM_MIN: 1,
  CHECKLIST_ITEM_MAX: 200
};
var prioritySchema = zod.z.enum([chunkZASNDKJM_cjs.Priority.NORMAL, chunkZASNDKJM_cjs.Priority.URGENT]);
var boardCardEventSchema = zod.z.object({
  startDate: zod.z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: zod.z.string().max(100).optional().describe("Event title; defaults to the card title when omitted.")
});
var boardCardChecklistItemSchema = zod.z.object({
  id: uuidSchema.optional().describe("Stable item id; the server assigns one when omitted."),
  text: zod.z.string().min(BOARD_CARD_LIMITS.CHECKLIST_ITEM_MIN).max(BOARD_CARD_LIMITS.CHECKLIST_ITEM_MAX).describe("Checklist item label."),
  done: zod.z.boolean().default(false).describe("Whether the item is checked off.")
});
var createBoardCardSchema = zod.z.object({
  title: zod.z.string().min(BOARD_CARD_LIMITS.TITLE_MIN, "Title is required").max(
    BOARD_CARD_LIMITS.TITLE_MAX,
    `Title must be at most ${BOARD_CARD_LIMITS.TITLE_MAX} characters`
  ).describe("Short summary of the card, 1\u2013100 chars."),
  description: zod.z.string().max(BOARD_CARD_LIMITS.DESCRIPTION_MAX).optional().describe("Optional details as markdown, up to 5000 chars."),
  columnId: uuidSchema.optional().describe("Target column; defaults to the board\u2019s first column when omitted."),
  priority: prioritySchema.optional().describe("`normal` for standard cards, `urgent` to flag immediate attention."),
  assignedTo: uuidSchema.nullable().optional().describe("UUID of the representative responsible for the card."),
  checklist: multipartArray(boardCardChecklistItemSchema).optional().describe("Optional subtasks (e.g. documents to collect from co-owners)."),
  // multipartBoolean, NOT z.boolean(): card create/update is multipart/form-data,
  // so this arrives as the string "true"/"false" — bare z.boolean() rejected every
  // UI create/edit (same bug notices had and fixed).
  allowComments: multipartBoolean().optional().describe("Whether members may comment on this card. Defaults to true."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-uploaded files to attach to this card."),
  events: multipartArray(boardCardEventSchema).optional().describe("Calendar events to create alongside the card (deadlines, site visits).")
});
var updateBoardCardSchema = zod.z.object({
  title: zod.z.string().min(BOARD_CARD_LIMITS.TITLE_MIN).max(BOARD_CARD_LIMITS.TITLE_MAX).optional().describe("Revised card title, 1\u2013100 chars."),
  description: zod.z.string().max(BOARD_CARD_LIMITS.DESCRIPTION_MAX).nullable().optional().describe("Revised markdown details; null clears them."),
  columnId: uuidSchema.optional().describe("Revised column (card is appended to it)."),
  priority: prioritySchema.optional().describe("Revised priority: `normal` or `urgent`."),
  assignedTo: uuidSchema.nullable().optional().describe("Revised assignee; null unassigns."),
  checklist: multipartArray(boardCardChecklistItemSchema).optional().describe("Full replacement checklist \u2014 replaces the existing items."),
  // multipart string-boolean — see createBoardCardSchema note.
  allowComments: multipartBoolean().optional().describe("Whether members may comment on this card."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to add to the card."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the card."),
  events: multipartArray(boardCardEventSchema).optional().describe("Full list of events for the card \u2014 replaces the existing event set.")
});
var moveBoardCardSchema = zod.z.object({
  columnId: uuidSchema.describe("Target column."),
  position: zod.z.number().finite().nonnegative().describe("Fractional index within the target column (midpoint between neighbours).")
});
var CHAT_LIMITS = {
  MESSAGE_MIN: 1,
  MESSAGE_MAX: 5e3,
  GROUP_NAME_MAX: 100,
  PARTICIPANTS_MIN: 1,
  PARTICIPANTS_MAX: 50
};
var ConversationType = {
  DIRECT: "direct",
  GROUP: "group"
};
var sendMessageSchema = zod.z.object({
  content: zod.z.string().min(CHAT_LIMITS.MESSAGE_MIN, "Message is required").max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`).describe("Plain-text message body, 1\u20135000 characters. Trimmed and stored verbatim.")
});
var createConversationSchema = zod.z.object({
  type: zod.z.enum([ConversationType.DIRECT, ConversationType.GROUP]).describe("`direct` for a one-to-one thread, `group` for a named multi-user conversation."),
  participantIds: zod.z.array(uuidSchema).min(CHAT_LIMITS.PARTICIPANTS_MIN, "At least one participant is required").max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`).describe(
    "UUIDs of the other participants. The caller is added automatically; direct conversations must have exactly one other participant."
  ),
  name: zod.z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional().describe("Group display name, max 100 chars. Ignored for direct conversations.")
});
var updateConversationSchema = zod.z.object({
  name: zod.z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional().describe("New group name, max 100 chars. Omit to leave the name unchanged."),
  addParticipantIds: zod.z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional().describe("UUIDs of users to add to the conversation. Omit or pass [] to add no one."),
  removeParticipantIds: zod.z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional().describe("UUIDs of users to remove from the conversation. Omit or pass [] to remove no one.")
});
var cursorQuerySchema = zod.z.object({
  cursor: zod.z.string().optional().describe(
    "Opaque pagination cursor returned by a previous response. Omit to fetch the first page."
  )
});
var FAQ_LIMITS = {
  QUESTION_MIN: 1,
  QUESTION_MAX: 500,
  ANSWER_MIN: 1,
  ANSWER_MAX: 2e3
};
var createFaqSchema = zod.z.object({
  question: zod.z.string().min(FAQ_LIMITS.QUESTION_MIN, "Question is required").max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`).describe("FAQ question displayed to residents, 1\u2013500 chars."),
  answer: zod.z.string().min(FAQ_LIMITS.ANSWER_MIN, "Answer is required").max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`).describe("FAQ answer body, up to 2000 chars.")
});
var updateFaqSchema = zod.z.object({
  question: zod.z.string().min(FAQ_LIMITS.QUESTION_MIN).max(FAQ_LIMITS.QUESTION_MAX).optional().describe("Revised question, 1\u2013500 chars."),
  answer: zod.z.string().min(FAQ_LIMITS.ANSWER_MIN).max(FAQ_LIMITS.ANSWER_MAX).optional().describe("Revised answer, up to 2000 chars.")
});
var reorderFaqsSchema = zod.z.object({
  orderedIds: zod.z.array(uuidSchema).min(1, "At least one FAQ ID is required").describe(
    "Full list of FAQ UUIDs in their new display order. Must include every FAQ in the target building."
  )
});
var copyFaqsSchema = zod.z.object({
  sourceBuildingId: uuidSchema.describe(
    "UUID of the building whose FAQs should be copied into the target building."
  )
});
var ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11
};
var orgRoleSchema = zod.z.enum([chunkZASNDKJM_cjs.OrgRole.ORG_ADMIN, chunkZASNDKJM_cjs.OrgRole.SUPERVISOR, chunkZASNDKJM_cjs.OrgRole.REFERENT, chunkZASNDKJM_cjs.OrgRole.OPERATIVE]).describe(
  "Organization role, from highest to lowest authority: `ORG_ADMIN` (manages the org), `SUPERVISOR` (oversees operations), `REFERENT` (day-to-day member interactions), `OPERATIVE` (field work)."
);
var createOrganizationSchema = zod.z.object({
  name: zod.z.string().min(ORGANIZATION_LIMITS.NAME_MIN, "Name is required").max(
    ORGANIZATION_LIMITS.NAME_MAX,
    `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`
  ).describe("Legal or display name of the organization, 1\u2013200 chars."),
  type: zod.z.enum([chunkZASNDKJM_cjs.OrgType.MANAGEMENT_FIRM, chunkZASNDKJM_cjs.OrgType.PLATFORM]).describe(
    "`MANAGEMENT_FIRM` for external building-management firms, `PLATFORM` for the Flatie platform organization itself."
  ),
  oib: zod.z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`).optional().describe(
    "Croatian OIB (tax identification number), 11 digits. Required for firms but optional at creation."
  ),
  contactEmail: zod.z.string().email("Invalid email").optional().describe("Public contact email for the organization."),
  contactPhone: zod.z.string().optional().describe("Public contact phone number.")
});
var updateOrganizationSchema = zod.z.object({
  name: zod.z.string().min(ORGANIZATION_LIMITS.NAME_MIN).max(ORGANIZATION_LIMITS.NAME_MAX).optional().describe("Revised organization name, 1\u2013200 chars."),
  contactEmail: zod.z.string().email("Invalid email").optional().describe("Revised contact email."),
  contactPhone: zod.z.string().optional().describe("Revised contact phone number."),
  oib: zod.z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH).optional().describe("Revised Croatian OIB (tax identification number), 11 digits.")
});
var addOrgMemberSchema = zod.z.object({
  userId: uuidSchema.describe("UUID of the existing user to add to the organization."),
  orgRole: orgRoleSchema.describe("Organization role to assign to the new member.")
});
var updateOrgMemberRoleSchema = zod.z.object({
  orgRole: orgRoleSchema.describe("New organization role for the member.")
});
var inviteOrgMemberSchema = zod.z.object({
  email: zod.z.string().email("Invalid email").describe("Email address of the invitee; a signup/join link is sent here."),
  orgRole: orgRoleSchema.describe("Organization role the invitee will receive when they accept."),
  message: zod.z.string().optional().describe("Optional custom message included in the invitation email.")
});
var assignOrgBuildingSchema = zod.z.object({
  buildingId: uuidSchema.describe("UUID of the building to assign to this organization."),
  contractStart: zod.z.string().optional().describe("Contract start date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts."),
  contractEnd: zod.z.string().optional().describe("Contract end date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts.")
});
var assignOrgMemberBuildingSchema = zod.z.object({
  buildingId: uuidSchema.describe("UUID of the building the member should be assigned to work on.")
});
var searchUsersQuerySchema = zod.z.object({
  search: zod.z.string().optional().describe("Substring to match against user name or email. Omit to return unfiltered results.")
});
var getOrgBuildingsQuerySchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0).describe("Zero-based offset into the result set. Defaults to 0."),
  limit: zod.z.coerce.number().min(1).optional().default(10).describe("Maximum number of items to return per page. Defaults to 10."),
  search: zod.z.string().optional().describe("Substring matched against building name or address."),
  sortBy: zod.z.enum(["name", "address", "createdAt"]).optional().describe("Column to sort results by."),
  sortOrder: zod.z.enum(["asc", "desc"]).optional().describe("Sort direction: `asc` for ascending, `desc` for descending.")
});
var getOrgMembersQuerySchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0).describe("Zero-based offset into the result set. Defaults to 0."),
  limit: zod.z.coerce.number().min(1).optional().default(10).describe("Maximum number of items to return per page. Defaults to 10."),
  search: zod.z.string().optional().describe("Substring matched against member name or email."),
  sortBy: zod.z.enum(["userName", "orgRole", "createdAt"]).optional().describe("Column to sort results by."),
  sortOrder: zod.z.enum(["asc", "desc"]).optional().describe("Sort direction: `asc` for ascending, `desc` for descending.")
});
var paginationParamsSchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0),
  limit: zod.z.coerce.number().min(1).max(100).optional().default(10)
});
var paginatedResponseSchema = (itemSchema) => zod.z.object({
  data: zod.z.array(itemSchema).describe("Items for the current page."),
  count: zod.z.number().describe("Total number of matching items across all pages."),
  page: zod.z.number().describe("1-based current page index."),
  limit: zod.z.number().describe("Page size (items per page, max 100)."),
  totalPages: zod.z.number().describe("Total number of pages available for this query."),
  hasNextPage: zod.z.boolean().describe("True when another page follows the current one."),
  hasPreviousPage: zod.z.boolean().describe("True when a previous page exists.")
});

// src/schemas/entities/unit.schema.ts
var UNIT_KINDS = ["apartment", "garage", "storage_unit"];
var unitKindSchema = zod.z.enum(UNIT_KINDS).describe("What the unit physically is: `apartment`, `garage`, or `storage_unit`.");
var unitRoleSchema = zod.z.enum([chunkZASNDKJM_cjs.ApartmentRole.OWNER, chunkZASNDKJM_cjs.ApartmentRole.TENANT]).describe("`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.");
var unitUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string().describe("Display name of the unit member."),
  email: zod.z.string().describe("Contact email of the unit member."),
  image: zod.z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: unitRoleSchema.describe("Relationship of this user to the unit (`OWNER` or `TENANT`)."),
  joinedAt: zod.z.string().describe("ISO-8601 timestamp when the user was attached to the unit."),
  ownershipPercentage: zod.z.number().nullable().optional().describe(
    "Share of the unit held by this user, 0\u2013100. Null for tenants and for owners whose share has not been recorded."
  )
});
var unitSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  kind: unitKindSchema,
  label: zod.z.string().describe(
    'Unit identifier as used by residents and the land registry (e.g. "ST 3448", "GR 364", "12A").'
  ),
  floor: zod.z.string().nullable().optional().describe('Floor label (e.g. "1", "PR", "POD", "POT"); null when not recorded.'),
  area: zod.z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  type: zod.z.enum(["residential", "commercial"]).optional().describe("Usage classification \u2014 drives the pri\u010Duva rate coefficient."),
  paymentRefCode: zod.z.string().nullable().optional().describe(
    "Code used as the middle segment of the HR01 poziv-na-broj in unit ref mode. Auto-assigned on create for apartments; null elsewhere."
  ),
  surnameOnDoor: zod.z.string().nullable().optional().describe("Surname shown on the door plate; apartments only, null otherwise."),
  surnameOnIntercom: zod.z.string().nullable().optional().describe("Surname shown on the intercom; apartments only, null otherwise."),
  users: zod.z.array(unitUserSchema).optional().describe("Users attached to the unit (residency view); present on detail/list endpoints."),
  userCount: zod.z.number().optional().describe("Number of users attached to the unit; present on list endpoints."),
  canEdit: zod.z.boolean().optional().describe("True when the calling user may edit this unit (management gate)."),
  canDelete: zod.z.boolean().optional().describe("True when the calling user may archive this unit (management gate)."),
  createdAt: zod.z.string().optional(),
  updatedAt: zod.z.string().nullable().optional()
});
var paginatedUnitsResponseSchema = paginatedResponseSchema(unitSchema);
var createUnitSchema = zod.z.object({
  kind: unitKindSchema,
  label: zod.z.string().trim().min(1).max(50),
  floor: zod.z.string().trim().max(50).optional().nullable(),
  area: zod.z.coerce.number().positive().max(1e5).optional().nullable(),
  type: zod.z.enum(["residential", "commercial"]).optional(),
  paymentRefCode: zod.z.string().trim().max(22).optional().nullable(),
  surnameOnDoor: zod.z.string().trim().max(100).optional().nullable(),
  surnameOnIntercom: zod.z.string().trim().max(100).optional().nullable()
});
var updateUnitSchema = createUnitSchema.omit({ kind: true }).partial();
var BUILDING_TYPES = [
  chunkZASNDKJM_cjs.BuildingType.RESIDENTIAL,
  chunkZASNDKJM_cjs.BuildingType.COMMERCIAL,
  chunkZASNDKJM_cjs.BuildingType.RESIDENTIAL_COMMERCIAL
];
var buildingTypeSchema = zod.z.enum(BUILDING_TYPES).describe(
  "Usage of the building: `residential` (homes only), `commercial` (business only), or `residential_commercial` (mixed use)."
);
var BUILDING_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ADDRESS_MIN: 1,
  ADDRESS_MAX: 200,
  HOUSE_NUMBER_MIN: 1,
  HOUSE_NUMBER_MAX: 20,
  OTP_LENGTH: 6,
  UNITS_MIN: 1,
  UNITS_MAX: 1e4
};
var createBuildingSchema = zod.z.object({
  name: zod.z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`).describe("Display name of the building shown throughout the UI."),
  addressId: uuidSchema.optional().describe(
    "UUID of an existing address record. When provided, streetId/houseNumber are ignored."
  ),
  streetId: uuidSchema.optional().describe(
    "UUID of the street record. Required when addressId is not provided (address will be resolved or created)."
  ),
  houseNumber: zod.z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, "House number is required").max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).optional().describe('Street/house number (e.g. "12A", "16/1"). Required when addressId is not provided.'),
  type: buildingTypeSchema,
  totalUnits: zod.z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  ).describe("Total number of individual units (apartments, garages, storage)."),
  isStratified: multipartBoolean().optional().describe(
    "True when the building is stratified (each unit has its own title deed). Defaults to false when omitted."
  ),
  role: zod.z.enum([
    chunkZASNDKJM_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.CO_OWNER
  ]).optional().describe(
    "Role the creating user should claim for themselves in the new building; omitted creates the building without assigning the caller a role."
  ),
  iban: chunkXXNOAOHF_cjs.optionalIbanSchema,
  oib: zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable().describe(
    "Croatian tax ID (OIB) of the building (Zajednica suvlasnika). Used as the payee OIB on generated uplatnicas."
  ),
  monthlyFeePerSqm: zod.z.coerce.number().nonnegative().optional().describe(
    "Monthly fund contribution rate in EUR per m\xB2 for RESIDENTIAL units. Multiplied by each co-owner\u2019s owned residential area (apartments/garages/storage of type `residential`) to derive their expected pri\u010Duva."
  ),
  monthlyFeeCommercialPerSqm: zod.z.coerce.number().nonnegative().optional().describe(
    "Monthly fund contribution rate in EUR per m\xB2 for COMMERCIAL units. Applied to owned area of any unit with `type = commercial`. Leave unset when the building has no commercial units."
  ),
  apartmentResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  apartmentCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  garageResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  garageCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  storageResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  storageCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  billingBuildingCode: zod.z.string().trim().min(1).max(22).optional().describe(
    "Short code identifying this building in HR01 poziv-na-broj references. Forms the first segment of `{billingBuildingCode}-{paymentRefCode}-{YYYYMM}`. Independent of the street house number."
  )
});
var updateBuildingSchema = zod.z.object({
  name: zod.z.string().min(BUILDING_LIMITS.NAME_MIN).max(BUILDING_LIMITS.NAME_MAX).optional().describe("New display name of the building."),
  addressId: uuidSchema.optional().describe("UUID of the new address record to assign to this building."),
  streetId: uuidSchema.optional().describe("UUID of the street record. Used with houseNumber to resolve or create an address."),
  houseNumber: zod.z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN).max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).optional().describe(
    'Street/house number (e.g. "12A", "16/1"). Used with streetId to resolve an address.'
  ),
  type: buildingTypeSchema.optional(),
  totalUnits: zod.z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN).max(BUILDING_LIMITS.UNITS_MAX).optional().describe("Revised total unit count."),
  isStratified: multipartBoolean().optional().describe("Toggles whether the building is stratified (per-unit title deeds)."),
  removeHouseRulesFile: multipartBoolean().optional().describe(
    "When true, clears the existing house-rules attachment. Submit independently of `houseRulesFile` uploads."
  ),
  iban: chunkXXNOAOHF_cjs.optionalIbanSchema,
  oib: zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable().describe("Croatian tax ID (OIB) of the building. Pass null to clear."),
  monthlyFeePerSqm: zod.z.coerce.number().nonnegative().optional().describe(
    "New monthly residential fund contribution rate in EUR per m\xB2. Pass a value to update, omit to leave unchanged."
  ),
  monthlyFeeCommercialPerSqm: zod.z.coerce.number().nonnegative().optional().nullable().describe(
    "New monthly commercial fund contribution rate in EUR per m\xB2. Pass null to clear; omit to leave unchanged."
  ),
  apartmentResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  apartmentCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  garageResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  garageCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  storageResidentialCoef: zod.z.coerce.number().nonnegative().optional(),
  storageCommercialCoef: zod.z.coerce.number().nonnegative().optional(),
  billingBuildingCode: zod.z.string().trim().min(1).max(22).optional().nullable().describe(
    "New poziv-na-broj building identifier. Pass null to clear; omit to leave unchanged."
  ),
  fundsSource: zod.z.enum([chunkZASNDKJM_cjs.FundsSource.MANUAL, chunkZASNDKJM_cjs.FundsSource.CAMT]).optional().describe(
    "Switches how the building's fund transactions are populated. `manual` (default) keeps the representative-facing add/edit flow; `camt` locks manual writes and only a platform admin can ingest CAMT.053 XML statements."
  ),
  pricuvaRefMode: zod.z.enum([chunkZASNDKJM_cjs.PricuvaRefMode.APARTMENT, chunkZASNDKJM_cjs.PricuvaRefMode.OWNER]).optional().describe(
    "Selects whether the HR01 poziv-na-broj middle segment identifies the apartment (`apartment`, default) or the individual co-owner (`owner`). Changes how CAMT imports match payments to units/users."
  )
});
var joinBuildingWithOtpSchema = zod.z.object({
  code: zod.z.string().length(
    BUILDING_LIMITS.OTP_LENGTH,
    `OTP must be a ${BUILDING_LIMITS.OTP_LENGTH}-character code`
  ).regex(/^[A-Z0-9]{6}$/, "OTP must be a 6-character alphanumeric code").describe("Six-character alphanumeric invite code shared by a building representative.")
});
var updateUserBuildingRoleSchema = zod.z.object({
  userId: uuidSchema.describe("UUID of the user whose building role is being updated."),
  roleType: zod.z.enum([
    chunkZASNDKJM_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.CO_OWNER
  ]).optional().describe(
    "New building role for the user; omit to leave the role unchanged while updating other fields."
  ),
  buildingSurfacePercentage: zod.z.coerce.number().min(0).max(100).optional().describe(
    "User\u2019s weighted share of the building surface, 0\u2013100. Used to compute vote weight for consensus polls."
  ),
  chatVisibleToCoOwners: zod.z.boolean().optional().describe("Controls whether this user appears in chat directories visible to co-owners.")
});
var buildingQuotaEntrySchema = zod.z.object({
  resourceType: zod.z.enum(
    chunkZASNDKJM_cjs.QUOTA_RESOURCE_TYPES
  ),
  dailyLimit: zod.z.number().int().min(0).max(1e4).nullable()
});
var buildingQuotaConfigSchema = zod.z.object({
  quotas: zod.z.array(buildingQuotaEntrySchema).max(chunkZASNDKJM_cjs.QUOTA_RESOURCE_TYPES.length)
});
var buildingQuotaListSchema = zod.z.object({
  buildingId: zod.z.string().uuid(),
  quotas: zod.z.array(buildingQuotaEntrySchema)
});
var updateBuildingSettingsSchema = zod.z.object({
  ownershipPercentageSource: zod.z.enum(["units", "users"]).nullable().optional().describe("Ownership-percentage source for consensus polls; null resets to auto-detect."),
  requireApprovalForNotices: zod.z.boolean().optional(),
  requireApprovalForFailureReports: zod.z.boolean().optional(),
  requireApprovalForPolls: zod.z.boolean().optional(),
  requireApprovalForEvents: zod.z.boolean().optional(),
  allowAnonymousPosting: zod.z.boolean().optional(),
  faqEnabled: zod.z.boolean().optional(),
  houseRulesEnabled: zod.z.boolean().optional(),
  chatEnabled: zod.z.boolean().optional(),
  commentsEnabled: zod.z.boolean().optional(),
  votingCertiliaEnabled: zod.z.boolean().optional(),
  votingPrintedSignatureEnabled: zod.z.boolean().optional(),
  minVerificationTierForConsensus: zod.z.number().int().min(0).max(3).optional().describe(
    "Minimum durable VerificationTier ordinal for CONSENSUS ballots. The backend enforces the ZUOZ legal floor (IDENTITY = 2) and consistency with the printed-signature toggle."
  ),
  addonAiEnabled: zod.z.boolean().optional(),
  addonStorage5gbEnabled: zod.z.boolean().optional()
});
var businessPartnerResponseSchema = zod.z.object({
  id: zod.z.string().uuid(),
  organizationId: zod.z.string().uuid(),
  name: zod.z.string(),
  code: zod.z.string().nullable().optional(),
  city: zod.z.string().nullable().optional(),
  email: zod.z.string().nullable().optional(),
  address: zod.z.string().nullable().optional(),
  postalCode: zod.z.string().nullable().optional(),
  phone: zod.z.string().nullable().optional(),
  mobile: zod.z.string().nullable().optional(),
  contactPerson: zod.z.string().nullable().optional(),
  iban: zod.z.string().nullable().optional(),
  bankAccount: zod.z.string().nullable().optional(),
  taxNumber: zod.z.string().nullable().optional(),
  oib: zod.z.string().nullable().optional(),
  isVatPayer: zod.z.boolean(),
  isActive: zod.z.boolean(),
  createdAt: zod.z.union([zod.z.string(), zod.z.date()]),
  updatedAt: zod.z.union([zod.z.string(), zod.z.date()]).nullable().optional()
}).meta({ id: "BusinessPartnerResponse" });
var createBusinessPartnerSchema = zod.z.object({
  name: zod.z.string().trim().min(1).max(200),
  code: zod.z.string().trim().max(50).optional().nullable(),
  city: zod.z.string().trim().max(100).optional().nullable(),
  email: zod.z.string().trim().email().optional().nullable(),
  address: zod.z.string().trim().max(500).optional().nullable(),
  postalCode: zod.z.string().trim().max(20).optional().nullable(),
  phone: zod.z.string().trim().max(50).optional().nullable(),
  mobile: zod.z.string().trim().max(50).optional().nullable(),
  contactPerson: zod.z.string().trim().max(200).optional().nullable(),
  iban: zod.z.string().trim().max(50).optional().nullable(),
  bankAccount: zod.z.string().trim().max(50).optional().nullable(),
  taxNumber: zod.z.string().trim().max(50).optional().nullable(),
  oib: zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable(),
  isVatPayer: zod.z.boolean().optional(),
  isActive: zod.z.boolean().optional()
}).meta({ id: "CreateBusinessPartner" });
var updateBusinessPartnerSchema = createBusinessPartnerSchema.partial().meta({ id: "UpdateBusinessPartner" });
var DOCUMENT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 500,
  FILE_NAME_MAX: 255
};
var createDocumentSchema = zod.z.object({
  title: zod.z.string().min(DOCUMENT_LIMITS.TITLE_MIN, "title must not be empty").max(DOCUMENT_LIMITS.TITLE_MAX).describe("Document title, 1\u2013100 chars."),
  description: zod.z.string().max(DOCUMENT_LIMITS.DESCRIPTION_MAX).optional().describe("Optional markdown description, up to 500 chars."),
  isPrivate: multipartBoolean().optional().describe("When true, visible only to the uploader and holders of DOCUMENT_READ_PRIVATE.")
}).meta({ id: "CreateDocument" });
var updateDocumentSchema = zod.z.object({
  title: zod.z.string().max(DOCUMENT_LIMITS.TITLE_MAX).optional().describe("Revised title."),
  description: zod.z.string().max(DOCUMENT_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description."),
  isPrivate: multipartBoolean().optional().describe("Toggle private visibility."),
  removeFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of child files to detach from the document."),
  renameFiles: multipartArray(
    zod.z.object({
      id: uuidSchema,
      fileName: zod.z.string().min(1).max(DOCUMENT_LIMITS.FILE_NAME_MAX)
    })
  ).optional().describe(
    "Rename individual child files by id (metadata only; R2 key + extension preserved)."
  )
}).meta({ id: "UpdateDocument" });
var ENTITY_LINK_TYPES = [
  "image",
  "document",
  "invoice",
  "warranty",
  "agenda",
  "schedule",
  "deadline",
  "meeting",
  "resolved_by",
  "based_on",
  "discussed_in",
  "expense_for",
  "related_to"
];
var LINKABLE_ENTITY_TYPES = [
  "failure_report",
  "maintenance_log",
  "notice",
  "event",
  "poll",
  "file",
  "expense_transaction",
  "board_card"
];
var entityLinkTypeSchema = zod.z.enum(ENTITY_LINK_TYPES).describe("Semantic type of the link, e.g. `related_to`, `resolved_by`, `schedule`.");
var linkableEntityTypeSchema = zod.z.enum(LINKABLE_ENTITY_TYPES).describe("Kind of entity on one end of a link.");
var entityLinkEndpointSchema = zod.z.object({
  id: uuidSchema.describe("UUID of the entity."),
  type: linkableEntityTypeSchema
});
var createEntityLinkRequestSchema = zod.z.object({
  source: entityLinkEndpointSchema.describe("Owning end of the link."),
  target: entityLinkEndpointSchema.describe("Referenced end of the link."),
  linkType: entityLinkTypeSchema
});
var deleteEntityLinkRequestSchema = createEntityLinkRequestSchema;
var deleteEntityLinkQuerySchema = zod.z.object({
  sourceId: uuidSchema.describe("UUID of the source entity."),
  sourceType: linkableEntityTypeSchema,
  targetId: uuidSchema.describe("UUID of the target entity."),
  targetType: linkableEntityTypeSchema,
  linkType: entityLinkTypeSchema
});
var getEntityLinksQuerySchema = zod.z.object({
  entityId: uuidSchema.describe("UUID of the anchor entity."),
  entityType: linkableEntityTypeSchema
});
var getEntityLinkCountsQuerySchema = zod.z.object({
  entityType: linkableEntityTypeSchema,
  ids: zod.z.string().describe("Comma-separated list of entity UUIDs to count links for.").transform(
    (value) => value.split(",").map((part) => part.trim()).filter(Boolean)
  ).pipe(zod.z.array(uuidSchema).min(1).max(200))
});
var EVENT_TYPES = [
  "service",
  "inspection",
  "maintenance",
  "meeting",
  "discussion",
  "planned_works",
  "waste_collection",
  "other"
];
var EVENT_COLORS = ["blue", "green", "red", "yellow", "purple", "orange", "gray"];
var RECURRENCE_TYPES = ["none", "weekly", "biweekly", "monthly", "yearly"];
var EVENT_TYPE_COLOR_MAP = {
  service: "blue",
  inspection: "purple",
  maintenance: "orange",
  meeting: "green",
  discussion: "yellow",
  planned_works: "red",
  waste_collection: "green",
  other: "gray"
};
var eventTypeSchema = zod.z.enum(EVENT_TYPES).describe(
  "Kind of calendar event: `service` (routine service call), `inspection` (regulatory/safety check), `maintenance` (contractor work), `meeting` (residents gathering), `discussion` (informal), `planned_works` (scheduled project), `waste_collection` (waste pickup, uses `subtype`), `other` (miscellaneous)."
);
var eventColorSchema = zod.z.enum(EVENT_COLORS).describe("Display colour used when rendering the event on the calendar.");
var recurrenceTypeSchema = zod.z.enum(RECURRENCE_TYPES).describe("Recurrence cadence; `none` for one-off events.");
var timeSchema = zod.z.object({
  hour: zod.z.number().min(0).max(23).describe("Hour component in 24-hour format, 0\u201323."),
  minute: zod.z.number().min(0).max(59).describe("Minute component, 0\u201359.")
});
var createEventSchema = zod.z.object({
  buildingId: uuidSchema.describe("UUID of the building the event belongs to."),
  type: eventTypeSchema,
  title: zod.z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters").describe("Short event title shown on the calendar, 1\u2013100 chars."),
  description: zod.z.string().max(500, "Description must be at most 500 characters").optional().describe("Free-text details about the event; omitted when the event is self-explanatory."),
  startDate: zod.z.coerce.date({ error: "Start date is required" }).describe("Event start \u2014 accepts an ISO-8601 string or Date, stored as a timestamp."),
  endDate: zod.z.coerce.date({ error: "End date is required" }).describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  color: eventColorSchema,
  isAnonymous: multipartBoolean().optional().describe("True hides the creator's identity from other residents."),
  allowComments: multipartBoolean().optional().describe("False disables the comment thread on this event."),
  recurrenceType: recurrenceTypeSchema.optional(),
  recurrenceEndDate: zod.z.coerce.date().optional().describe("Date after which the recurrence stops; omitted for open-ended recurrence."),
  subtype: zod.z.string().optional().describe("Free-form subtype qualifier (waste-collection types like `mixed`, `bio`)."),
  onlineMeetingUrl: zod.z.string().url().max(500).optional().or(zod.z.literal("")).describe("Join URL for online meetings; empty or omitted for in-person events."),
  meetingMinutes: zod.z.string().max(1e4).optional().describe("Rich-text minutes captured during the meeting."),
  minuteTakerId: uuidSchema.optional().describe("UUID of the user assigned to record meeting minutes."),
  fileIds: zod.z.array(uuidSchema).optional().describe("UUIDs of previously uploaded files to attach to the event.")
}).refine((data) => data.endDate >= data.startDate, {
  message: "endDate must not precede startDate",
  path: ["endDate"]
});
var updateEventSchema = zod.z.object({
  type: eventTypeSchema.optional(),
  title: zod.z.string().min(1).max(100).optional().describe("Revised title, 1\u2013100 chars."),
  description: zod.z.string().max(500).optional().describe("Revised description, max 500 chars."),
  startDate: zod.z.coerce.date().optional().describe("Revised start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().optional().describe("Revised end \u2014 accepts an ISO-8601 string or Date."),
  color: eventColorSchema.optional(),
  isAnonymous: multipartBoolean().optional(),
  allowComments: multipartBoolean().optional(),
  recurrenceType: recurrenceTypeSchema.optional(),
  recurrenceEndDate: zod.z.coerce.date().optional(),
  subtype: zod.z.string().optional(),
  onlineMeetingUrl: zod.z.string().url().max(500).optional().or(zod.z.literal("")),
  meetingMinutes: zod.z.string().max(1e4).optional(),
  minuteTakerId: uuidSchema.optional(),
  fileIds: zod.z.array(uuidSchema).optional()
});
var moneyStringSchema = zod.z.union([zod.z.string(), zod.z.number()]).transform((v) => typeof v === "number" ? v.toString() : v.trim()).pipe(
  zod.z.string().regex(/^\d+(\.\d{1,2})?$/, "must be a non-negative amount with at most 2 decimals").refine((s) => Number(s) <= 9999999999e-2, "amount exceeds the maximum of 99,999,999.99").transform((s) => chunkX3TW7GWG_cjs.normalizeMoney(s))
);
var signedMoneyStringSchema = zod.z.union([zod.z.string(), zod.z.number()]).transform((v) => typeof v === "number" ? v.toString() : v.trim()).pipe(
  zod.z.string().regex(/^-?\d+(\.\d{1,2})?$/, "must be an amount with at most 2 decimals").refine((s) => Math.abs(Number(s)) <= 999999999999e-2, "balance exceeds the maximum").transform((s) => chunkX3TW7GWG_cjs.normalizeMoney(s))
);

// src/schemas/entities/expense-transaction.schema.ts
var expenseAmountSchema = moneyStringSchema.describe(
  'Expense amount in EUR as a two-decimal string (e.g. "120.00").'
);
var createExpenseSchema = zod.z.object({
  categoryId: zod.z.string().uuid().describe("Expense transaction-category to file this entry under."),
  amount: expenseAmountSchema,
  description: zod.z.string().trim().max(500).optional(),
  period: zod.z.string().max(50).optional().describe('Free-form billing period label (e.g. "2026-06").')
}).strict();
var updateExpenseSchema = zod.z.object({
  categoryId: zod.z.string().uuid().optional(),
  amount: expenseAmountSchema.optional(),
  description: zod.z.string().max(500).optional(),
  period: zod.z.string().max(50).optional()
}).strict();
var FAILURE_REPORT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  COMMON_AREA_DESCRIPTION_MAX: 500
};
var failureReportEventSchema = zod.z.object({
  startDate: zod.z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: zod.z.string().optional().describe("Event title; defaults to the failure report title when omitted."),
  description: zod.z.string().optional().describe("Event description; defaults to the failure report description when omitted.")
});
var failureReportEventWithDateOrderSchema = failureReportEventSchema.refine(
  (event) => event.endDate >= event.startDate,
  { message: "Event end must not precede its start", path: ["endDate"] }
);
function refineLocation(schema) {
  return schema.superRefine((data, ctx) => {
    if (data.locationType === chunkZASNDKJM_cjs.FailureLocationType.COMMON_AREA) {
      if (!data.commonAreaDescription || data.commonAreaDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "commonAreaDescription is required when locationType is common_area",
          path: ["commonAreaDescription"]
        });
      }
    }
    if (data.locationType === chunkZASNDKJM_cjs.FailureLocationType.OWN_UNIT) {
      if (!data.unitType) {
        ctx.addIssue({
          code: "custom",
          message: "unitType is required when locationType is own_unit",
          path: ["unitType"]
        });
      }
      if (!data.unitId) {
        ctx.addIssue({
          code: "custom",
          message: "unitId is required when locationType is own_unit",
          path: ["unitId"]
        });
      }
    }
  });
}
var createFailureReportSchema = refineLocation(
  zod.z.object({
    title: zod.z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN, "Title is required").max(
      FAILURE_REPORT_LIMITS.TITLE_MAX,
      `Title must be at most ${FAILURE_REPORT_LIMITS.TITLE_MAX} characters`
    ).describe("Short summary of the failure, 1\u2013100 chars."),
    description: zod.z.string().min(1, "Description is required").max(
      FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`
    ).describe("Detailed description of the failure, up to 2000 chars."),
    isAnonymous: multipartBoolean().optional().describe(
      "When true, hides the reporter\u2019s identity from other residents. Defaults to false."
    ),
    allowComments: multipartBoolean().optional().describe(
      "When false, disables the comment thread on this report. Defaults to true; also subject to the building-level comments setting."
    ),
    priority: zod.z.enum([chunkZASNDKJM_cjs.Priority.NORMAL, chunkZASNDKJM_cjs.Priority.URGENT]).optional().describe("`normal` for standard reports, `urgent` to flag immediate attention."),
    locationType: zod.z.enum([chunkZASNDKJM_cjs.FailureLocationType.COMMON_AREA, chunkZASNDKJM_cjs.FailureLocationType.OWN_UNIT]).optional().describe(
      "`common_area` for shared spaces (hallway, roof, etc.) or `own_unit` for a specific apartment/garage/storage unit."
    ),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Free-text location description. Required when `locationType` is `common_area`."),
    unitType: zod.z.enum([chunkZASNDKJM_cjs.FailureUnitType.APARTMENT, chunkZASNDKJM_cjs.FailureUnitType.GARAGE, chunkZASNDKJM_cjs.FailureUnitType.STORAGE_UNIT]).optional().describe("Kind of unit when `locationType` is `own_unit`. Required in that case."),
    unitId: uuidSchema.optional().describe("UUID of the specific unit. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-uploaded files to attach to this report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "UUIDs of maintenance logs to associate with this report (e.g. related past work)."
    ),
    events: multipartArray(failureReportEventWithDateOrderSchema).optional().describe("Calendar events to create alongside the report (inspections, scheduled fixes).")
  })
);
var updateFailureReportSchema = refineLocation(
  zod.z.object({
    title: zod.z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN).max(FAILURE_REPORT_LIMITS.TITLE_MAX).optional().describe("Revised report title, 1\u2013100 chars."),
    description: zod.z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description, up to 2000 chars."),
    status: zod.z.enum([chunkZASNDKJM_cjs.FailureStatus.PENDING, chunkZASNDKJM_cjs.FailureStatus.IN_PROGRESS, chunkZASNDKJM_cjs.FailureStatus.RESOLVED]).optional().describe(
      "Lifecycle status: `pending` (newly filed), `in_progress` (assigned work), `resolved` (closed out)."
    ),
    allowComments: multipartBoolean().optional().describe("Toggles the comment thread on this report."),
    priority: zod.z.enum([chunkZASNDKJM_cjs.Priority.NORMAL, chunkZASNDKJM_cjs.Priority.URGENT]).optional().describe("Revised priority: `normal` or `urgent`."),
    locationType: zod.z.enum([chunkZASNDKJM_cjs.FailureLocationType.COMMON_AREA, chunkZASNDKJM_cjs.FailureLocationType.OWN_UNIT]).optional().describe("Revised location classification: `common_area` or `own_unit`."),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Revised common-area description. Required when `locationType` is `common_area`."),
    unitType: zod.z.enum([chunkZASNDKJM_cjs.FailureUnitType.APARTMENT, chunkZASNDKJM_cjs.FailureUnitType.GARAGE, chunkZASNDKJM_cjs.FailureUnitType.STORAGE_UNIT]).optional().describe("Revised unit kind. Required when `locationType` is `own_unit`."),
    unitId: uuidSchema.optional().describe("Revised unit UUID. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to add to the report."),
    removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "Full list of maintenance-log UUIDs to associate with the report (replaces existing links)."
    ),
    events: multipartArray(failureReportEventWithDateOrderSchema).optional().describe("Full list of events for the report \u2014 replaces the existing event set.")
  })
);
var approveFailureReportSchema = zod.z.object({
  approved: zod.z.boolean().describe("True to approve the report for public visibility, false to reject.")
});
var incomeAmountSchema = moneyStringSchema.describe(
  'Income amount in EUR as a two-decimal string (e.g. "250.50").'
);
var createIncomeSchema = zod.z.object({
  categoryId: zod.z.string().uuid().optional().describe("Income transaction-category to file this entry under."),
  amount: incomeAmountSchema,
  description: zod.z.string().max(500).optional(),
  period: zod.z.string().max(50).optional().describe('Free-form billing period label (e.g. "2026-06").')
}).strict();
var updateIncomeSchema = zod.z.object({
  categoryId: zod.z.string().uuid().optional(),
  amount: incomeAmountSchema.optional(),
  description: zod.z.string().max(500).optional(),
  period: zod.z.string().max(50).optional()
}).strict();
var MAINTENANCE_FINANCED_BY = ["building_funds", "insurance", "co_owner"];
var maintenanceFinancedBySchema = zod.z.enum(MAINTENANCE_FINANCED_BY).describe(
  "Funding source of the work: `building_funds` (paid from the common fund), `insurance` (covered by an insurance claim), or `co_owner` (paid directly by an individual co-owner)."
);
var MAINTENANCE_LOG_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  CONTRACTOR_MIN: 1,
  EVENTS_MIN: 1
};
var costSchema = zod.z.preprocess(
  (value) => {
    if (typeof value === "number") return value.toString();
    if (typeof value === "string") return value.trim();
    return value;
  },
  zod.z.string().regex(/^-?\d+(\.\d{1,2})?$/, "Cost must be a decimal with at most 2 decimal places")
);
var maintenanceLogEventSchema = zod.z.object({
  id: uuidSchema.optional().describe(
    "UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted."
  ),
  startDate: zod.z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: zod.z.string().optional().describe("Event title; defaults to the maintenance-log title when omitted."),
  description: zod.z.string().optional().describe("Event description; defaults to the maintenance-log description when omitted.")
});
var maintenanceLogEventWithDateOrderSchema = maintenanceLogEventSchema.refine(
  (event) => event.endDate >= event.startDate,
  { message: "Event end must not precede its start", path: ["endDate"] }
);
var createMaintenanceLogSchema = zod.z.object({
  title: zod.z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN, "Title is required").max(
    MAINTENANCE_LOG_LIMITS.TITLE_MAX,
    `Title must be at most ${MAINTENANCE_LOG_LIMITS.TITLE_MAX} characters`
  ).describe("Short title of the maintenance work, 1\u2013100 chars."),
  description: zod.z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional().describe("Detailed description of the work performed, up to 2000 chars."),
  categoryId: uuidSchema.optional().describe("UUID of the expense category the cost should be booked under."),
  contractor: zod.z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, "Contractor is required").describe("Name of the contractor or vendor who performed the work."),
  cost: costSchema.describe(
    'Total cost as a decimal string with up to two decimal places (e.g. "250.50"). Numeric input is coerced to a string.'
  ),
  financedBy: maintenanceFinancedBySchema.optional().describe("Funding source; omit when unknown at the time of logging."),
  warranty: multipartBoolean().optional().describe("True when the work is covered by an active warranty."),
  events: multipartArray(maintenanceLogEventWithDateOrderSchema).refine((events) => events.length >= MAINTENANCE_LOG_LIMITS.EVENTS_MIN, {
    message: "At least one event is required"
  }).describe("Calendar events associated with the work; at least one is required on create."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-uploaded files (invoices, photos) to attach."),
  pollId: uuidSchema.optional().describe("UUID of a single poll to associate with this log. Legacy field \u2014 prefer `pollIds`."),
  pollIds: multipartArray(uuidSchema).optional().describe(
    "UUIDs of polls to associate with this log (e.g. the vote that authorised the work)."
  ),
  expenseIds: multipartArray(uuidSchema).optional().describe(
    "UUIDs of existing `expense_transactions` to link to this log via `entity_links` (linkType `expense_for`). The expenses must belong to the same building."
  )
});
var updateMaintenanceLogSchema = zod.z.object({
  title: zod.z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN).max(MAINTENANCE_LOG_LIMITS.TITLE_MAX).optional().describe("Revised title, 1\u2013100 chars."),
  description: zod.z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description, up to 2000 chars."),
  categoryId: uuidSchema.optional().describe("Revised expense-category UUID."),
  contractor: zod.z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN).optional().describe("Revised contractor or vendor name."),
  cost: costSchema.optional().describe(
    'Revised total cost as a decimal string with up to two decimal places (e.g. "250.50").'
  ),
  financedBy: maintenanceFinancedBySchema.optional().describe("Revised funding source."),
  warranty: multipartBoolean().optional().describe("Toggles whether the work is under warranty."),
  events: multipartArray(maintenanceLogEventWithDateOrderSchema).optional().describe(
    "Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted."
  ),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the log."),
  pollId: uuidSchema.optional().describe("Single poll UUID to associate. Legacy field \u2014 prefer `pollIds`."),
  pollIds: multipartArray(uuidSchema).optional().describe("Full list of poll UUIDs to associate with this log (replaces existing links)."),
  expenseIds: multipartArray(uuidSchema).optional().describe(
    "Replacement set of linked expense UUIDs. Existing `expense_for` links not in this list are removed; new ones are inserted."
  )
});
var NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2e3,
  EVENT_TITLE_MAX: 100
};
var noticeEventSchema = zod.z.object({
  id: uuidSchema.optional().describe(
    "UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted."
  ),
  startDate: zod.z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: zod.z.string().max(NOTICE_LIMITS.EVENT_TITLE_MAX, "Event title must be at most 100 characters").optional().describe("Event title, max 100 chars; defaults to the notice title when omitted."),
  description: zod.z.string().optional().describe("Event description; defaults to the notice content when omitted.")
});
var noticeEventWithDateOrderSchema = noticeEventSchema.refine(
  (event) => event.endDate >= event.startDate,
  { message: "Event end must not precede its start", path: ["endDate"] }
);
var createNoticeSchema = zod.z.object({
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`).describe("Notice headline shown in listings, 1\u2013100 chars."),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
    NOTICE_LIMITS.CONTENT_MAX,
    `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`
  ).describe("Rich-text or plain-text body of the notice, up to 2000 chars."),
  isAnonymous: multipartBoolean().optional().describe("When true, hides the author\u2019s identity from other residents. Defaults to false."),
  pinned: multipartBoolean().optional().describe("When true, pins the notice to the top of the building feed."),
  allowComments: multipartBoolean().optional().describe(
    "When false, disables the comment thread on this notice. Defaults to true; also subject to the building-level comments setting."
  ),
  events: multipartArray(noticeEventWithDateOrderSchema).optional().default([]).describe("Calendar events to create alongside the notice (e.g. meeting on a given date)."),
  fileIds: multipartArray(uuidSchema).optional().default([]).describe("UUIDs of previously-uploaded files to attach to the notice.")
}).refine(
  (data) => {
    if (data.events && data.events.length > 0) {
      return data.events.every((event) => event.startDate && event.endDate);
    }
    return true;
  },
  {
    message: "Each event must have both start and end dates",
    path: ["events"]
  }
);
var updateNoticeSchema = zod.z.object({
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional().describe("Revised notice headline, 1\u2013100 chars."),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional().describe("Revised notice body, up to 2000 chars."),
  pinned: multipartBoolean().optional().describe("Toggles whether the notice is pinned to the top of the feed."),
  allowComments: multipartBoolean().optional().describe("Toggles the comment thread on this notice."),
  events: multipartArray(noticeEventWithDateOrderSchema).optional().describe(
    "Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted."
  ),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the notice.")
});
var approveNoticeSchema = zod.z.object({
  approved: zod.z.boolean().describe("True to approve the notice for public visibility, false to reject.")
});
var ownerResponseSchema = zod.z.object({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  userId: zod.z.string().uuid().nullable().optional(),
  fullName: zod.z.string(),
  email: zod.z.string().nullable().optional(),
  phone: zod.z.string().nullable().optional(),
  oib: zod.z.string().nullable().optional(),
  address: zod.z.string().nullable().optional(),
  /** FK into the DGU-backed `addresses` table; null for legacy free-text rows. */
  addressId: zod.z.string().uuid().nullable().optional(),
  paymentRefCode: zod.z.string().nullable().optional(),
  /** When a representative last sent this owner a building invite; null when never invited. */
  lastInvitedAt: zod.z.union([zod.z.string(), zod.z.date()]).nullable().optional(),
  createdAt: zod.z.union([zod.z.string(), zod.z.date()]),
  updatedAt: zod.z.union([zod.z.string(), zod.z.date()]).nullable().optional()
}).meta({ id: "OwnerResponse" });
var createOwnerSchema = zod.z.object({
  fullName: zod.z.string().trim().min(1).max(200),
  email: zod.z.string().trim().email().optional().nullable(),
  phone: zod.z.string().trim().max(50).optional().nullable(),
  oib: zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable(),
  address: zod.z.string().trim().max(500).optional().nullable(),
  // Structured address (DGU reference model). Either send `addressId`
  // directly, or `streetId` + `houseNumber` for the backend to resolve
  // (mirrors the building create/update contract). Free-text `address`
  // alone remains valid as the unstructured fallback.
  addressId: zod.z.string().uuid().optional().nullable(),
  streetId: zod.z.string().uuid().optional().nullable(),
  houseNumber: zod.z.string().trim().min(1).max(20).optional().nullable(),
  paymentRefCode: zod.z.string().trim().max(22).optional().nullable(),
  userId: zod.z.string().uuid().optional().nullable()
}).meta({ id: "CreateOwner" });
var updateOwnerSchema = createOwnerSchema.partial().meta({ id: "UpdateOwner" });
var assignOwnerSchema = zod.z.object({
  ownerId: zod.z.string().uuid(),
  ownershipPercentage: zod.z.number().min(0).max(100).nullable().optional()
}).meta({ id: "AssignOwner" });
var inviteOwnerSchema = zod.z.object({
  message: zod.z.string().trim().max(500).optional().describe("Optional personal message included in the invite email.")
}).meta({ id: "InviteOwner" });
var POLL_TYPES = [chunkZASNDKJM_cjs.PollType.CONSENSUS, chunkZASNDKJM_cjs.PollType.COMMUNITY];
var pollTypeSchema = zod.z.enum(POLL_TYPES).describe(
  "`community` polls pass by simple majority of votes cast; `consensus` polls require an ownership-weighted approval threshold."
);
var POLL_LIMITS = {
  QUESTION_MIN: 5,
  QUESTION_MAX: 250,
  OPTION_MAX: 100,
  COMMUNITY_OPTIONS_MIN: 2,
  COMMUNITY_OPTIONS_MAX: 4,
  CONSENSUS_OPTIONS: 1,
  CONSENSUS_PERCENTAGE_MIN: 10,
  CONSENSUS_PERCENTAGE_MAX: 100
};
var createPollSchema = zod.z.object({
  question: zod.z.string().min(POLL_LIMITS.QUESTION_MIN, "Question must be at least 5 characters").max(
    POLL_LIMITS.QUESTION_MAX,
    `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`
  ).describe("Poll question presented to voters, 5\u2013250 chars."),
  options: multipartArray(zod.z.string().max(POLL_LIMITS.OPTION_MAX)).pipe(zod.z.array(zod.z.string().min(1).max(POLL_LIMITS.OPTION_MAX))).describe(
    "Answer options in display order. Community polls: 2\u20134 options. Consensus polls: exactly 1 option (voters approve or abstain)."
  ),
  pollType: pollTypeSchema,
  deadline: zod.z.coerce.date().optional().describe(
    "Cutoff date/time after which votes are rejected. Accepts an ISO-8601 string or Date. Omit for open-ended consensus polls."
  ),
  requiredConsensusPercentage: zod.z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional().describe(
    "Ownership-weighted approval threshold (10\u2013100) required for consensus polls to pass. Ignored for community polls."
  ),
  consensusCategory: zod.z.string().max(100).optional().describe(
    'Classification of the consensus decision (e.g. "fundUsage", "houseRules"); used to group and filter related polls.'
  ),
  legalBasis: zod.z.string().max(100).optional().describe(
    "Reference to the legal article or statute that authorises the vote; shown alongside consensus results for audit."
  ),
  scopedUnitIds: multipartArray(uuidSchema).optional().describe(
    "UUIDs of units whose owners/tenants are eligible to vote. Omit for building-wide polls."
  ),
  scopedOwnerIds: multipartArray(uuidSchema).optional().describe(
    "UUIDs of owner records explicitly added to the eligible-voter list. Owners need no user account. Omit when not used."
  ),
  fileIds: multipartArray(uuidSchema).optional().default([]).describe("UUIDs of previously-uploaded supporting documents (proposals, receipts, specs).")
}).refine(
  (data) => {
    if (data.pollType === chunkZASNDKJM_cjs.PollType.COMMUNITY) {
      return data.options.length >= POLL_LIMITS.COMMUNITY_OPTIONS_MIN && data.options.length <= POLL_LIMITS.COMMUNITY_OPTIONS_MAX;
    }
    if (data.pollType === chunkZASNDKJM_cjs.PollType.CONSENSUS) {
      return data.options.length === POLL_LIMITS.CONSENSUS_OPTIONS;
    }
    return true;
  },
  {
    message: "Invalid number of options for poll type",
    path: ["options"]
  }
).refine(
  (data) => {
    if (data.pollType === chunkZASNDKJM_cjs.PollType.CONSENSUS) {
      return data.requiredConsensusPercentage !== void 0 && data.requiredConsensusPercentage >= POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN && data.requiredConsensusPercentage <= POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX;
    }
    return true;
  },
  {
    message: "Consensus percentage must be between 10 and 100 for consensus polls",
    path: ["requiredConsensusPercentage"]
  }
);
var updatePollSchema = zod.z.object({
  question: zod.z.string().min(1).max(POLL_LIMITS.QUESTION_MAX).optional().describe("Revised poll question, up to 250 chars."),
  options: multipartArray(zod.z.string().max(POLL_LIMITS.OPTION_MAX)).optional().describe("Replacement option list. Must still respect the community/consensus option counts."),
  pollType: pollTypeSchema.optional(),
  deadline: zod.z.coerce.date().optional().describe("Revised deadline. Accepts an ISO-8601 string or Date."),
  requiredConsensusPercentage: zod.z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional().describe("Revised ownership-weighted approval threshold (10\u2013100) for consensus polls."),
  consensusCategory: zod.z.string().max(100).optional().describe('Revised classification of the consensus decision (e.g. "fundUsage", "houseRules").'),
  legalBasis: zod.z.string().max(100).optional().describe("Revised reference to the legal article or statute that authorises the vote."),
  status: zod.z.enum(["active", "inactive", "ended"]).optional().describe(
    "Lifecycle override: `active` accepts votes, `inactive` pauses the poll, `ended` seals it."
  ),
  scopedUnitIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped unit UUIDs. Empty array clears scoping."),
  scopedOwnerIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped owner UUIDs. Empty array clears explicit-owner scoping."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded supporting documents to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the poll.")
});
var votePollSchema = zod.z.object({
  selectedOptionIndex: zod.z.number().int().min(0).describe("Zero-based index into the poll\u2019s `options` array identifying the chosen option.")
});
var recordOfflineVotesSchema = zod.z.object({
  ownerIds: zod.z.array(uuidSchema).min(1).describe("UUIDs of owner records whose signed approvals are being recorded."),
  proofFileId: uuidSchema.optional().describe("UUID of an uploaded scan of the signed sheet, stored as evidence.")
});
var finalizePollSchema = zod.z.object({
  finalize: zod.z.boolean().describe(
    "True to seal the poll and freeze its results; false is accepted as a no-op for legacy compatibility."
  )
});
var TRANSACTION_CATEGORY_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  SEARCH_MAX: 200
};
var createTransactionCategorySchema = zod.z.object({
  name: zod.z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN, "Name is required").max(
    TRANSACTION_CATEGORY_LIMITS.NAME_MAX,
    `Name must be at most ${TRANSACTION_CATEGORY_LIMITS.NAME_MAX} characters`
  ).describe('Human-readable category name (e.g. "Cleaning", "Water utility"), 1\u2013100 chars.'),
  type: zod.z.enum([chunkZASNDKJM_cjs.TransactionType.INCOME, chunkZASNDKJM_cjs.TransactionType.EXPENSE]).describe(
    "`INCOME` for categories that receive money into the fund; `EXPENSE` for categories that spend from it."
  )
});
var updateTransactionCategorySchema = zod.z.object({
  name: zod.z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN).max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX).optional().describe("Revised category name, 1\u2013100 chars.")
});
var getTransactionCategoriesQuerySchema = zod.z.object({
  type: zod.z.enum([chunkZASNDKJM_cjs.TransactionType.INCOME, chunkZASNDKJM_cjs.TransactionType.EXPENSE]).optional().describe(
    "Filter results by category type. Omit to return both income and expense categories."
  ),
  search: zod.z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional().describe("Case-insensitive substring matched against the category name.")
});
var copyTransactionCategoriesSchema = zod.z.object({
  sourceBuildingId: uuidSchema.describe(
    "UUID of the building whose categories should be copied into the target building."
  )
});
var roleTypeSchema = zod.z.enum([
  ...Object.values(chunkZASNDKJM_cjs.BuildingRole),
  ...Object.values(chunkZASNDKJM_cjs.OrgRole),
  ...Object.values(chunkZASNDKJM_cjs.PlatformRole)
]);
var permissionsResponseSchema = zod.z.object({
  scope: zod.z.enum(["building", "organization", "platform"]),
  permissions: zod.z.array(zod.z.string()),
  roleType: roleTypeSchema.optional(),
  /**
   * Building scope only: the user's actual building_roles membership, when one
   * exists. `roleType` reports the PERMISSION source, which for dual-role users
   * (a co-owner who is also org staff / platform admin) is the broader admin
   * context — this field preserves their member identity so clients can route
   * them to the tree where they vote.
   */
  memberRoleType: zod.z.enum(Object.values(chunkZASNDKJM_cjs.BuildingRole)).optional(),
  buildingId: zod.z.string().uuid().optional(),
  orgId: zod.z.string().uuid().optional(),
  chatVisibleToCoOwners: zod.z.boolean().optional()
});
var sortOrderSchema = zod.z.enum(["asc", "desc"]).describe("Sort direction applied to `sortBy`.");
var getRepUsersParamsSchema = zod.z.object({
  search: zod.z.string().optional().describe("Free-text filter matched against user name and email."),
  buildingRole: zod.z.enum([
    chunkZASNDKJM_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunkZASNDKJM_cjs.BuildingRole.CO_OWNER
  ]).optional().describe("Restrict to users holding this role in at least one of the caller\u2019s buildings."),
  fromDate: zod.z.string().optional().describe("Inclusive lower bound (ISO date) on the user\u2019s earliest building-join date."),
  toDate: zod.z.string().optional().describe("Inclusive upper bound (ISO date) on the user\u2019s earliest building-join date."),
  limit: zod.z.coerce.number().min(1).max(100).optional().default(50),
  offset: zod.z.coerce.number().min(0).optional().default(0),
  sortBy: zod.z.string().optional().default("createdAt"),
  sortOrder: sortOrderSchema.optional().default("desc")
});
var getRepBuildingsParamsSchema = zod.z.object({
  search: zod.z.string().optional().describe("Free-text filter matched against building name and address."),
  type: zod.z.enum([chunkZASNDKJM_cjs.BuildingType.RESIDENTIAL, chunkZASNDKJM_cjs.BuildingType.COMMERCIAL, chunkZASNDKJM_cjs.BuildingType.RESIDENTIAL_COMMERCIAL]).optional().describe("Restrict to a single building usage type."),
  status: zod.z.string().optional().describe("Restrict to a building lifecycle status (`pending`, `active`, `rejected`)."),
  fromDate: zod.z.string().optional().describe("Inclusive lower bound (ISO date) on the building creation date."),
  toDate: zod.z.string().optional().describe("Inclusive upper bound (ISO date) on the building creation date."),
  limit: zod.z.coerce.number().min(1).max(100).optional().default(20),
  offset: zod.z.coerce.number().min(0).optional().default(0),
  sortBy: zod.z.string().optional().default("createdAt"),
  sortOrder: sortOrderSchema.optional().default("desc")
});
var aiChatMessageSchema = zod.z.object({
  id: zod.z.string().optional().describe("Client-generated message id (AI SDK UIMessage id)."),
  role: zod.z.enum(["user", "assistant", "system"]).describe("Author of the message in the conversation history."),
  content: zod.z.string().max(chunkNQLL5CZO_cjs.AI_CHAT_LIMITS.MAX_MESSAGE_CHARS).optional().describe("Plain-text body; legacy shape, superseded by parts."),
  parts: zod.z.array(zod.z.any()).optional().refine(
    (parts) => parts === void 0 || parts.every(
      (part) => typeof part?.text !== "string" || part.text.length <= chunkNQLL5CZO_cjs.AI_CHAT_LIMITS.MAX_MESSAGE_CHARS
    ),
    { message: `Text part exceeds ${chunkNQLL5CZO_cjs.AI_CHAT_LIMITS.MAX_MESSAGE_CHARS} characters` }
  ).describe(
    "AI SDK UIMessage parts (text, tool invocations, ...). Text parts are capped at MAX_MESSAGE_CHARS."
  )
});
var aiChatRequestSchema = zod.z.object({
  id: zod.z.string().optional().describe("AI SDK chat/session id."),
  trigger: zod.z.string().optional().describe("AI SDK submit trigger metadata; ignored by the API."),
  buildingId: zod.z.string().optional().describe(
    "Building context for the turn. When present, building-data tools are attached and the building AI budget applies; without it the assistant answers from general knowledge only."
  ),
  locale: zod.z.enum(["hr", "en", "de"]).optional().describe(
    "The user\u2019s active UI locale, sent per request so the assistant locks its reply language without relying on content inference (unreliable on small models). Defaults to hr."
  ),
  messages: zod.z.array(aiChatMessageSchema).min(1).max(chunkNQLL5CZO_cjs.AI_CHAT_LIMITS.MAX_MESSAGES).describe("Full client-held conversation history, newest last; the server windows it.")
});
var EMAIL_LIMITS = {
  SUBJECT_MAX: 200,
  BODY_MAX: 5e4,
  RECIPIENT_NAME_MAX: 100,
  CC_MAX: 10,
  /** Per-message attachment cap; individual files obey the shared 10MB/type rules. */
  ATTACHMENTS_MAX: 10
};
var createEmailThreadRequestSchema = zod.z.object({
  recipientEmail: zod.z.string().email().describe("Primary To address of the first outbound message."),
  recipientName: zod.z.string().max(EMAIL_LIMITS.RECIPIENT_NAME_MAX).optional().describe(
    'Display name to include in the To header (renders as "Name <email>" on the manager side).'
  ),
  // multipartArray: with attachments the endpoints are multipart — accepts a
  // real array, repeated form fields, or a JSON-encoded array string.
  ccEmails: multipartArray(zod.z.string().email()).pipe(zod.z.array(zod.z.string().email()).max(EMAIL_LIMITS.CC_MAX)).optional().describe("Optional list of Cc addresses for the first message (max 10)."),
  subject: zod.z.string().min(1).max(EMAIL_LIMITS.SUBJECT_MAX).describe("Subject line; used for both the first message and the thread summary."),
  body: zod.z.string().min(1).max(EMAIL_LIMITS.BODY_MAX).describe("Plain-text body of the first outbound message, up to 50k chars.")
}).strict();
var replyEmailThreadRequestSchema = zod.z.object({
  body: zod.z.string().min(1).max(EMAIL_LIMITS.BODY_MAX).describe("Plain-text body of the reply, up to 50k chars."),
  // multipartArray: with attachments the endpoints are multipart — accepts a
  // real array, repeated form fields, or a JSON-encoded array string.
  ccEmails: multipartArray(zod.z.string().email()).pipe(zod.z.array(zod.z.string().email()).max(EMAIL_LIMITS.CC_MAX)).optional().describe("Optional Cc addresses for this reply; do not persist beyond this message.")
}).strict();

// src/schemas/requests/update-failure-report.ts
var updateFailureReportRequestSchema = updateFailureReportSchema.extend({
  id: uuidSchema.describe("UUID of the failure report to update, taken from the URL.")
});

// src/schemas/requests/update-maintenance-log.ts
var updateMaintenanceLogRequestSchema = updateMaintenanceLogSchema.extend({
  id: uuidSchema.describe("UUID of the maintenance log to update, taken from the URL.")
});

// src/schemas/requests/update-notice.ts
var updateNoticeRequestSchema = updateNoticeSchema.extend({
  id: uuidSchema.describe("UUID of the notice to update, taken from the URL.")
});

// src/schemas/requests/update-poll.ts
var updatePollRequestSchema = updatePollSchema.extend({
  id: uuidSchema.describe("UUID of the poll to update, taken from the URL.")
});
var messageResponseSchema = zod.z.object({
  message: zod.z.string().describe(
    'Human-readable confirmation that the action completed successfully (e.g., "Notice approved").'
  )
});
var aiUsageResponseSchema = zod.z.looseObject({
  buildingId: zod.z.string().describe("UUID of the building this usage row belongs to."),
  period: zod.z.string().describe("Billing period key in YYYY-MM (UTC calendar month); resets implicitly."),
  spentMicroUsd: zod.z.number().describe("Estimated AI spend accumulated by the whole building this period, in micro-USD."),
  messageCount: zod.z.number().describe("Number of AI chat replies the building has consumed this period."),
  capMicroUsd: zod.z.number().describe("Monthly building cap in micro-USD ($1 base, $6 with the AI add-on)."),
  userSpentMicroUsd: zod.z.number().optional().describe(
    "Requesting user\u2019s own spend this period, in micro-USD. Omitted when the per-user tracker (Redis) is unavailable."
  ),
  userCapMicroUsd: zod.z.number().optional().describe(
    "Requesting user\u2019s personal share of the building cap, in micro-USD (fairness limit so one member cannot drain the building budget). Omitted with userSpentMicroUsd."
  )
}).describe("AI chat budget usage for one building in the current monthly period.");
var ARCHIVE_TYPES = [
  "apartments",
  "blog_posts",
  "building_join_requests",
  "buildings",
  "comments",
  "events",
  "failure_reports",
  "faqs",
  "files",
  "garages",
  "income_transactions",
  "maintenance_logs",
  "notices",
  "organizations",
  "polls",
  "recurring_templates",
  "storage_units",
  "transaction_categories"
];
var archiveTypeSchema = zod.z.enum(ARCHIVE_TYPES).describe("Name of the archived entity kind; must match a key in the backend archive registry.");
var archivedItemSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the archived row within its source table."),
  type: archiveTypeSchema,
  label: zod.z.string().describe("Human-readable label for the archived row (e.g. apartment number, notice title)."),
  buildingId: zod.z.string().uuid().nullable().describe(
    "UUID of the building the row belongs to; null for global entities like organizations."
  ),
  archivedAt: zod.z.string().describe("ISO-8601 timestamp when the row was archived."),
  archivedBy: zod.z.string().uuid().nullable().describe(
    "UUID of the user who archived the row; null when the original actor has been deleted."
  ),
  archivedByName: zod.z.string().nullable().describe("Display name of the archiving user; null when unavailable."),
  daysUntilPurge: zod.z.number().int().describe(
    "Remaining days before the automated 30-day purge removes the row; 0 means the TTL has elapsed."
  )
});
var listArchivedResponseSchema = zod.z.object({
  items: zod.z.array(archivedItemSchema).describe("Archived rows across all registered archive types, sorted by archivedAt desc.")
});
var buildingStatusSchema = zod.z.enum(Object.values(chunkZASNDKJM_cjs.BuildingStatus)).describe(
  "Building lifecycle status \u2014 reflects where the building is in the platform onboarding pipeline (pending approval, active, rejected, etc.)."
);
var buildingManagerSchema = zod.z.looseObject({
  name: zod.z.string().describe("Display name of the assigned management-firm contact."),
  email: zod.z.string().describe("Contact email for the assigned manager.")
}).describe("Summary of the building\u2019s assigned management-firm contact.");
var buildingRepresentativeSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the user who holds the representative role."),
  name: zod.z.string().describe("Representative display name."),
  email: zod.z.string().describe("Representative contact email."),
  phone: zod.z.string().optional().nullable().describe("Contact phone in E.164 format, or null when the representative has not set one.")
}).describe("Building representative (owner or deputy) nested inside building detail responses.");
var buildingFundsSchema = zod.z.looseObject({
  currentBalance: zod.z.string().describe(
    'Current building-fund balance, serialized as a decimal string (e.g. "27820.54") to preserve precision from the numeric column.'
  ),
  currency: zod.z.string().describe('ISO-4217-ish currency symbol or code displayed alongside the balance (e.g. "\u20AC").')
}).describe("Summary of the building\u2019s current fund balance and currency.");
var buildingResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  slug: zod.z.string().nullable().optional().describe("URL-friendly slug derived from the building address."),
  name: zod.z.string().describe("Building display name."),
  address: zod.z.string().describe("Full postal address of the building."),
  coverImage: zod.z.string().optional().nullable().describe("Absolute URL of the cover photo, or null when no cover image is set."),
  type: buildingTypeSchema.describe(
    "Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`."
  ),
  status: buildingStatusSchema.optional().describe(
    "Platform onboarding status (`pending`, `active`, `rejected`). Optional on list responses where all buildings returned are known-active."
  ),
  totalUnits: zod.z.number().describe("Declared number of individual units (apartments, garages, storage units)."),
  isStratified: zod.z.boolean().describe(
    "True when the building is stratified (each unit has its own title deed), affecting voting weight calculations."
  ),
  houseRulesFileUrl: zod.z.string().nullable().optional().describe("Absolute URL to the uploaded house-rules PDF, or null if none has been uploaded."),
  createdBy: zod.z.string().uuid().optional().nullable().describe("UUID of the user who registered the building on the platform."),
  iban: zod.z.string().nullable().optional().describe("IBAN of the building fund bank account, or null when unset."),
  oib: zod.z.string().nullable().optional().describe("Croatian tax ID (OIB) of the building, or null when unset."),
  houseNumber: zod.z.string().nullable().optional().describe("Street/house number, or null when not set."),
  billingBuildingCode: zod.z.string().nullable().optional().describe("Building identifier used in HR01 poziv-na-broj references, or null until assigned."),
  monthlyFeePerSqm: zod.z.number().nullable().optional().describe("Monthly residential pri\u010Duva rate in EUR per m\xB2, or null when not configured."),
  monthlyFeeCommercialPerSqm: zod.z.number().nullable().optional().describe("Monthly commercial pri\u010Duva rate in EUR per m\xB2, or null when not configured."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
});
var buildingDetailResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  status: buildingStatusSchema.optional().describe("Platform onboarding status (`pending`, `active`, `rejected`)."),
  slug: zod.z.string().nullable().optional().describe("URL-friendly slug derived from the building address."),
  name: zod.z.string().describe("Building display name."),
  address: zod.z.string().describe("Full postal address of the building."),
  coverImage: zod.z.string().nullable().optional().describe("Absolute URL of the cover photo, or null when no cover image is set."),
  type: buildingTypeSchema.describe(
    "Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`."
  ),
  totalUnits: zod.z.number().describe("Declared number of individual units in the building."),
  isStratified: zod.z.boolean().describe(
    "True when the building is stratified (per-unit title deeds), affecting voting weight."
  ),
  houseRulesFileUrl: zod.z.string().nullable().optional().describe("Absolute URL to the uploaded house-rules PDF, or null when none has been uploaded."),
  numberOfFloors: zod.z.number().nullable().optional().describe("Floor count above ground, or null when the information is not set."),
  description: zod.z.string().nullable().optional().describe("Free-form description shown on the building page; null when not provided."),
  latitude: zod.z.number().nullable().optional().describe(
    "Geographic latitude in decimal degrees (WGS 84); null when geocoding not performed."
  ),
  longitude: zod.z.number().nullable().optional().describe(
    "Geographic longitude in decimal degrees (WGS 84); null when geocoding not performed."
  ),
  createdBy: zod.z.string().describe("UUID of the user who registered the building."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  manager: buildingManagerSchema.nullable().optional().describe(
    "Assigned management-firm contact, or null when the building has no manager assigned."
  ),
  funds: buildingFundsSchema.nullable().optional().describe("Current fund balance summary, or null when funds have not been initialised."),
  iban: zod.z.string().nullable().optional().describe(
    "IBAN of the building fund bank account, or null when unset. Required on the building before a CAMT.053 import can match statements to this building."
  ),
  oib: zod.z.string().nullable().optional().describe(
    "Croatian tax ID (OIB) of the building (Zajednica suvlasnika), or null when unset. Used as the payee OIB on generated uplatnicas."
  ),
  houseNumber: zod.z.string().nullable().optional().describe(
    "Street/house number as stored on the building row. Address data only \u2014 the HR01 reference uses `billingBuildingCode`."
  ),
  fundsSource: zod.z.enum([chunkZASNDKJM_cjs.FundsSource.MANUAL, chunkZASNDKJM_cjs.FundsSource.CAMT]).optional().describe(
    "Current funding-entry mode for this building. `manual` = representatives add income/expense through the UI; `camt` = platform admin ingests CAMT.053 XML statements and manual writes are blocked."
  ),
  monthlyFeePerSqm: zod.z.number().nullable().optional().describe(
    "Monthly RESIDENTIAL pri\u010Duva rate in EUR per m\xB2 of owned residential area. Null when not yet configured."
  ),
  monthlyFeeCommercialPerSqm: zod.z.number().nullable().optional().describe(
    "Monthly COMMERCIAL pri\u010Duva rate in EUR per m\xB2 of owned commercial area. Null when the building has no commercial units or the rate has not been configured."
  ),
  hasResidentialUnits: zod.z.boolean().optional().describe(
    "True when the building has at least one unit (apartment/garage/storage) with `type = residential`. Lets the UI decide whether to show the residential rate input."
  ),
  hasCommercialUnits: zod.z.boolean().optional().describe(
    "True when the building has at least one unit (apartment/garage/storage) with `type = commercial`. Lets the UI decide whether to show the commercial rate input."
  ),
  apartmentResidentialCoef: zod.z.number().optional().describe("Multiplier on the residential rate for apartment areas. Defaults to 1."),
  apartmentCommercialCoef: zod.z.number().optional().describe("Multiplier on the commercial rate for apartment areas. Defaults to 1."),
  garageResidentialCoef: zod.z.number().optional().describe("Multiplier on the residential rate for garage areas. Defaults to 1."),
  garageCommercialCoef: zod.z.number().optional().describe("Multiplier on the commercial rate for garage areas. Defaults to 1."),
  storageResidentialCoef: zod.z.number().optional().describe("Multiplier on the residential rate for storage areas. Defaults to 1."),
  storageCommercialCoef: zod.z.number().optional().describe("Multiplier on the commercial rate for storage areas. Defaults to 1."),
  billingBuildingCode: zod.z.string().nullable().optional().describe(
    "Building identifier used as the first segment of HR01 poziv-na-broj references. Null until the managing org assigns one."
  ),
  pricuvaRefMode: zod.z.enum([chunkZASNDKJM_cjs.PricuvaRefMode.APARTMENT, chunkZASNDKJM_cjs.PricuvaRefMode.OWNER]).optional().describe(
    "Which middle-segment identifier the HR01 poziv-na-broj uses: `apartment` (per-apartment code) or `owner` (per-co-owner code)."
  ),
  ownerRepresentatives: zod.z.array(buildingRepresentativeSchema).default([]).describe("Users with the owner-representative role for this building."),
  deputyRepresentatives: zod.z.array(buildingRepresentativeSchema).default([]).describe("Users with the deputy-representative role, if any.")
});
var paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);
var emailDirectionSchema = zod.z.enum(["outbound", "inbound"]).describe(
  "`outbound` when a representative sent the message through the app; `inbound` when Flatie received the message from an external party via the inbound-mail webhook."
);
var emailAttachmentSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the stored attachment file."),
  fileName: zod.z.string().describe("Original file name as sent/received."),
  mimeType: zod.z.string().nullable().optional().describe("MIME type when known."),
  fileSize: zod.z.coerce.number().nullable().optional().describe("Size in bytes when known."),
  url: zod.z.string().describe("Time-limited download URL for the attachment (presigned/HMAC-signed).")
}).describe("A file attached to an email message (inbound or outbound).");
var emailMessageSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the stored email message."),
  threadId: zod.z.string().uuid().describe("UUID of the thread this message belongs to."),
  direction: emailDirectionSchema,
  fromAddress: zod.z.string().describe("Envelope/From address of this message."),
  fromName: zod.z.string().nullable().optional().describe("Display name parsed from the From header, or null when missing."),
  toAddresses: zod.z.array(zod.z.string()).default([]).describe("Primary recipients parsed from the To header."),
  ccAddresses: zod.z.array(zod.z.string()).default([]).describe("Carbon-copy recipients parsed from the Cc header."),
  subject: zod.z.string().describe("Subject line as stored (inherited from the thread for replies)."),
  bodyText: zod.z.string().nullable().optional().describe("Plain-text body. Always populated for outbound; may be null for inbound."),
  bodyHtml: zod.z.string().nullable().optional().describe("Rendered HTML body when the original message included one; null otherwise."),
  messageId: zod.z.string().nullable().optional().describe(
    "RFC 5322 Message-ID header value. Stable identifier used as a threading fallback when plus-addressing routing fails."
  ),
  sentByUserId: zod.z.string().uuid().nullable().optional().describe("UUID of the representative who triggered the outbound send; null for inbound."),
  sentByUserName: zod.z.string().nullable().optional().describe("Display name of the sending representative; null for inbound."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the message was persisted server-side."),
  attachments: zod.z.array(emailAttachmentSchema).default([]).describe("Files attached to this message; empty when none.")
}).describe("A single email message within a building thread.");
var emailThreadSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the thread."),
  buildingId: zod.z.string().uuid().describe("UUID of the building that owns the thread."),
  subject: zod.z.string().describe("Subject line at thread creation; not rewritten on reply."),
  externalParticipants: zod.z.array(zod.z.string()).default([]).describe(
    "Unique external email addresses seen on this thread (recipients of outbound + senders of inbound)."
  ),
  inboxAddress: zod.z.string().describe("The building\u2019s inbox address at the time the thread was routed."),
  lastMessageAt: zod.z.string().describe("ISO-8601 timestamp of the most recent message."),
  lastMessagePreview: zod.z.string().nullable().optional().describe("First ~140 characters of the most recent message body, for list previews."),
  lastMessageDirection: emailDirectionSchema.nullable().optional().describe("Direction of the most recent message; null when the thread has no messages yet."),
  messageCount: zod.z.coerce.number().default(0).describe("Total messages currently in the thread."),
  unreadCount: zod.z.coerce.number().default(0).describe("Count of inbound messages not yet marked as read."),
  archived: zod.z.boolean().default(false).describe("True when the thread has been archived.")
}).describe("Summary row for the thread list view.");
var emailThreadDetailSchema = emailThreadSchema.extend({
  messages: zod.z.array(emailMessageSchema).default([]).describe("All messages in the thread, oldest first.")
}).describe("Full thread detail including every message.");
var paginatedEmailThreadsResponseSchema = paginatedResponseSchema(emailThreadSchema);
var buildingFundsLedgerRowSchema = zod.z.object({
  ownerId: zod.z.string().uuid().describe("ID of the owner record this row attributes to."),
  ownerName: zod.z.string().describe("Full name of the owner this row attributes to."),
  linkedUserId: zod.z.string().uuid().nullable().optional().describe("Registered user ID linked to this owner, when one exists."),
  ownedApartmentArea: zod.z.number().describe("\u03A3 apartment.area \xD7 ownershipPercentage / 100, in m\xB2."),
  ownedGarageArea: zod.z.number().describe("\u03A3 garage.area \xD7 ownershipPercentage / 100, in m\xB2."),
  ownedStorageArea: zod.z.number().describe("\u03A3 storage_unit.area \xD7 ownershipPercentage / 100, in m\xB2."),
  totalOwnedArea: zod.z.number().describe("Sum of the three area fields, for convenience."),
  residentialArea: zod.z.number().describe("\u03A3 owned-share-weighted area of RESIDENTIAL-typed units, in m\xB2."),
  commercialArea: zod.z.number().describe("\u03A3 owned-share-weighted area of COMMERCIAL-typed units, in m\xB2."),
  expected: zod.z.number().describe("\u03A3 area \xD7 kindTypeCoef \xD7 rate[type] across the user\u2019s units, in EUR."),
  paid: zod.z.number().describe(
    "Attributed apartment income for the period, in EUR. Does not include garage/storage."
  ),
  diff: zod.z.number().describe("paid \u2212 expected, in EUR.")
}).meta({ id: "BuildingFundsLedgerRow" });
var buildingFundsLedgerResponseSchema = zod.z.object({
  buildingId: zod.z.string().uuid(),
  period: zod.z.string().regex(/^\d{4}-\d{2}$/).describe("Reporting month, `YYYY-MM`."),
  monthlyFeePerSqm: zod.z.number().nullable().describe(
    "Residential rate in EUR per m\xB2 used for this report; null when the building has none set."
  ),
  monthlyFeeCommercialPerSqm: zod.z.number().nullable().describe(
    "Commercial rate in EUR per m\xB2 used for this report; null when the building has no commercial rate."
  ),
  rows: zod.z.array(buildingFundsLedgerRowSchema).describe("One entry per co-owner with any owned area on the building.")
}).meta({ id: "BuildingFundsLedgerResponse" });
var buildingSettingsResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid().optional(),
  buildingId: zod.z.string().uuid().optional(),
  ownershipPercentageSource: zod.z.enum(["units", "users"]).nullable().optional().describe(
    "Which ownership-percentage source consensus polls use: `units` (unit surface areas) or `users` (per-user shares). Null = auto-detect (units when the building has units, users otherwise)."
  ),
  requireApprovalForNotices: zod.z.boolean().describe("When true, co-owner notices need representative approval before publishing."),
  requireApprovalForFailureReports: zod.z.boolean().describe("When true, failure reports need representative approval before publishing."),
  requireApprovalForPolls: zod.z.boolean().describe("When true, co-owner polls need representative approval before opening."),
  requireApprovalForEvents: zod.z.boolean().describe("When true, co-owner events need representative approval before publishing."),
  allowAnonymousPosting: zod.z.boolean().describe("When true, co-owners may post notices/reports without their name shown."),
  faqEnabled: zod.z.boolean().describe("Whether the FAQ section is available in this building."),
  houseRulesEnabled: zod.z.boolean().describe("Whether the house-rules section is available in this building."),
  chatEnabled: zod.z.boolean().describe("Whether building chat is available in this building."),
  commentsEnabled: zod.z.boolean().describe("Whether commenting on notices/reports is available in this building."),
  votingCertiliaEnabled: zod.z.boolean().describe(
    "Whether the Certilia eID online voting path is offered on CONSENSUS polls. Subject to the last-method-lock invariant."
  ),
  votingPrintedSignatureEnabled: zod.z.boolean().describe(
    "Whether the printed-signature voting path (rep-reviewed paper ballots) is offered on CONSENSUS polls. Subject to the last-method-lock invariant."
  ),
  minVerificationTierForConsensus: zod.z.number().int().describe(
    "Minimum durable VerificationTier ordinal a co-owner must hold to cast a binding CONSENSUS vote. The backend enforces the ZUOZ legal floor."
  ),
  addonAiEnabled: zod.z.boolean().optional().describe("Whether the AI add-on is enabled (billed on the next HUB-3 invoice)."),
  addonStorage5gbEnabled: zod.z.boolean().optional().describe("Whether the 5 GB storage add-on is enabled."),
  createdAt: zod.z.string().nullable().optional(),
  updatedAt: zod.z.string().nullable().optional()
}).describe("Payload of `GET /buildings/:buildingId/settings`.");
var conversationParticipantSchema = zod.z.looseObject({
  id: zod.z.string().describe("Participation record ID."),
  userId: zod.z.string().describe("UUID of the participant user."),
  name: zod.z.string().describe("Participant display name."),
  image: zod.z.string().nullable().optional().describe("Avatar URL; null when the user has no profile image."),
  roleType: zod.z.string().nullable().optional().describe(
    "Participant role within the conversation's scope \u2014 a building role for building chats, an org role for org chats; null when not applicable."
  ),
  lastReadAt: zod.z.string().describe("ISO-8601 timestamp of the last message this participant has read.")
}).describe("A participant in a chat conversation.");
var conversationLastMessageSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the message."),
  content: zod.z.string().describe("Plain-text message body (may be truncated for preview)."),
  senderId: zod.z.string().describe("UUID of the user who sent the message."),
  senderName: zod.z.string().describe("Display name of the sender."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the message was sent.")
}).describe("Last message preview embedded in conversation list responses.");
var conversationResponseSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the conversation."),
  buildingId: zod.z.string().nullable().describe("UUID of the building this conversation belongs to; null for org-scoped chats."),
  orgId: zod.z.string().nullable().optional().describe(
    "UUID of the organization this conversation belongs to; null/absent for building-scoped chats. Exactly one of buildingId/orgId is set."
  ),
  type: zod.z.enum([ConversationType.DIRECT, ConversationType.GROUP]).describe("`direct` for 1:1 threads, `group` for named multi-user conversations."),
  name: zod.z.string().nullable().optional().describe("Group name; null for direct conversations."),
  participants: zod.z.array(conversationParticipantSchema).describe("All participants in the conversation."),
  lastMessage: conversationLastMessageSchema.nullable().optional().describe("Most recent message; null when no messages have been sent."),
  unreadCount: zod.z.number().describe("Number of unread messages for the calling user in this conversation."),
  lastMessageAt: zod.z.string().describe("ISO-8601 timestamp of the most recent message."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the conversation was created.")
}).describe("Conversation response from list and detail endpoints.");
var chatMessageResponseSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the message."),
  conversationId: zod.z.string().describe("UUID of the parent conversation."),
  senderId: zod.z.string().describe("UUID of the user who sent the message."),
  senderName: zod.z.string().describe("Display name of the sender."),
  senderImage: zod.z.string().nullable().optional().describe("Avatar URL of the sender; null when no profile image is set."),
  senderRoleType: zod.z.string().nullable().optional().describe(
    "Sender role within the conversation's scope \u2014 a building role for building chats, an org role for org chats; null when not applicable."
  ),
  content: zod.z.string().describe("Plain-text message body."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the message was sent.")
}).describe("Chat message response from message list endpoints.");
var conversationsListResponseSchema = zod.z.looseObject({
  data: zod.z.array(conversationResponseSchema).describe("Page of conversations."),
  nextCursor: zod.z.string().nullable().optional().describe("Opaque cursor for the next page; null when there are no more results.")
}).describe("Cursor-paginated list of conversations.");
var messagesListResponseSchema = zod.z.looseObject({
  data: zod.z.array(chatMessageResponseSchema).describe("Page of messages."),
  nextCursor: zod.z.string().nullable().optional().describe("Opaque cursor for the next page; null when there are no more results.")
}).describe("Cursor-paginated list of chat messages.");
var unreadCountResponseSchema = zod.z.looseObject({
  unreadCount: zod.z.number().describe("Total number of unread messages across all conversations.")
}).describe("Unread message count for a chat scope (building or organization).");
var commentResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  entityType: zod.z.string().describe(
    "Type of entity this comment is attached to. One of `notice`, `failure_report`, `event`, `board_card`."
  ),
  entityId: zod.z.string().describe(
    "UUID of the entity (notice, failure report, event, or board card) this comment belongs to."
  ),
  userId: zod.z.string().describe("UUID of the user who authored the comment."),
  userName: zod.z.string().nullable().describe("Author display name. Null when the authoring user was deleted."),
  userImage: zod.z.string().nullable().describe("Absolute URL of the author avatar, or null if the user has no profile image."),
  content: zod.z.string().describe("Comment body text as entered by the user."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the comment was created."),
  updatedAt: zod.z.string().describe("ISO-8601 timestamp of the last edit; equal to createdAt if never edited."),
  canEdit: zod.z.boolean().describe("True when the calling user is allowed to edit this comment (author only)."),
  canDelete: zod.z.boolean().describe(
    "True when the calling user is allowed to delete this comment (author or moderator)."
  )
});
var commonStatusOptions = [
  chunkZASNDKJM_cjs.CommonStatus.ACTIVE,
  chunkZASNDKJM_cjs.CommonStatus.COMPLETED,
  chunkZASNDKJM_cjs.CommonStatus.CANCELLED
];
var approvalStatusOptions = [
  chunkZASNDKJM_cjs.ApprovalStatus.PENDING,
  chunkZASNDKJM_cjs.ApprovalStatus.APPROVED,
  chunkZASNDKJM_cjs.ApprovalStatus.REJECTED
];
var maintenanceStatusOptions = [
  chunkZASNDKJM_cjs.MaintenanceStatus.PENDING,
  chunkZASNDKJM_cjs.MaintenanceStatus.IN_PROGRESS,
  chunkZASNDKJM_cjs.MaintenanceStatus.COMPLETED,
  chunkZASNDKJM_cjs.MaintenanceStatus.CANCELLED
];
var failureStatusOptions = [
  chunkZASNDKJM_cjs.FailureStatus.PENDING,
  chunkZASNDKJM_cjs.FailureStatus.IN_PROGRESS,
  chunkZASNDKJM_cjs.FailureStatus.RESOLVED
];
var priorityOptions = ["normal", "urgent"];
var CommonStatusSchema = zod.z.enum(commonStatusOptions);
var ApprovalStatusSchema = zod.z.enum(approvalStatusOptions);
var MaintenanceStatusSchema = zod.z.enum(maintenanceStatusOptions);
var FailureStatusSchema = zod.z.enum(failureStatusOptions);
var PrioritySchema = zod.z.enum(priorityOptions);

// src/schemas/responses/documents.ts
var documentLinkedRecordSchema = zod.z.looseObject({
  type: zod.z.enum(["notice", "maintenance_log", "failure_report", "poll"]).describe("Kind of entity this document is linked to."),
  id: zod.z.string().describe("UUID of the linked entity."),
  title: zod.z.string().optional().nullable().describe("Title of the linked entity."),
  status: FailureStatusSchema.optional().nullable().describe("Status of the linked failure report; null for other entity types."),
  contractor: zod.z.string().optional().nullable().describe("Contractor name from linked maintenance log; null for other entity types."),
  cost: zod.z.number().optional().nullable().describe("Cost from linked maintenance log; null when not recorded."),
  financedBy: maintenanceFinancedBySchema.optional().nullable().describe("Funding source from linked maintenance log; null for other entity types."),
  warranty: zod.z.boolean().optional().nullable().describe("Whether the linked maintenance work is under warranty."),
  createdAt: zod.z.string().optional().nullable().describe("ISO-8601 creation timestamp."),
  updatedAt: zod.z.string().optional().nullable().describe("ISO-8601 last-edit timestamp.")
}).describe("Reference to an entity linked to a document.");
var documentFileSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the file record."),
  fileUrl: zod.z.string().describe("URL to download or preview the file."),
  fileName: zod.z.string().describe("Original file name as uploaded."),
  mimeType: zod.z.string().optional().nullable().describe("MIME type of the file; null when not detected."),
  fileSize: zod.z.number().optional().nullable().describe("File size in bytes; null when not recorded."),
  createdAt: zod.z.union([zod.z.string(), zod.z.date()]).describe("Timestamp when the file was uploaded.")
}).describe("Individual file within a document container.");
var documentResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the document."),
  containerId: zod.z.string().uuid().optional().describe("UUID of the parent container; absent for standalone documents."),
  buildingId: zod.z.string().uuid().describe("UUID of the building this document belongs to."),
  title: zod.z.string().describe("Document title displayed in the UI."),
  description: zod.z.string().optional().nullable().describe("Optional description; null when not provided."),
  documentUrl: zod.z.string().optional().nullable().describe("Legacy single-file URL; null for multi-file documents."),
  files: zod.z.array(documentFileSchema).optional().default([]).describe("File attachments; empty array when no files are attached."),
  uploadedBy: zod.z.string().uuid().describe("UUID of the user who uploaded the document."),
  uploadedByName: zod.z.string().describe("Display name of the uploader."),
  createdAt: zod.z.union([zod.z.string(), zod.z.date()]).describe("ISO-8601 timestamp when the document was created."),
  updatedAt: zod.z.union([zod.z.string(), zod.z.date()]).nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit this document."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete this document."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this document."),
  isPrivate: zod.z.boolean().optional().default(false).describe("True when the document is visible only to managers."),
  type: zod.z.enum(["document", "notice", "failure_report", "maintenance_log", "poll"]).optional().describe("Source entity type; absent for standalone documents."),
  sourceId: zod.z.string().optional().describe("UUID of the source entity when type is set; absent for standalone documents."),
  sourceTitle: zod.z.string().optional().describe("Title of the source entity for quick display; absent for standalone documents."),
  linkedRecords: zod.z.array(documentLinkedRecordSchema).optional().default([]).describe("Entities linked to this document; empty when none."),
  visibility: zod.z.enum(["public", "private"]).optional().describe("Document visibility level; absent when the building uses default visibility.")
}).describe("Document response from list and detail endpoints.");
var paginatedDocumentsResponseSchema = paginatedResponseSchema(documentResponseSchema);
var entityLinkMetadataSchema = zod.z.looseObject({
  status: zod.z.string().nullable().optional().describe("Raw status enum value (e.g. failure-report status); the client localizes it."),
  date: zod.z.string().nullable().optional().describe("Primary ISO date for the entity (created/start); the client formats per locale."),
  amount: zod.z.number().nullable().optional().describe("Monetary amount (e.g. expense/maintenance cost); the client formats as currency."),
  secondary: zod.z.string().nullable().optional().describe("Already-human supplementary text such as a contractor name or accounting period.")
}).describe("Per-type display metadata for a linked entity; all fields optional and raw.");
var entityLinkReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid().describe("UUID of the entity on the far end of the link."),
  type: linkableEntityTypeSchema.describe("Kind of entity on the far end."),
  linkType: entityLinkTypeSchema,
  direction: zod.z.enum(["outgoing", "incoming"]).describe(
    "Whether the anchor entity is the source (`outgoing`) or the target (`incoming`) of the stored link row."
  ),
  title: zod.z.string().nullable().optional().describe("Display title of the far entity; null when it has none."),
  metadata: entityLinkMetadataSchema.nullable().optional().describe("Optional per-type display metadata (status, date, amount, secondary text).")
}).describe("A link from the anchor entity to another entity, with display enrichment.");
var entityLinksResponseSchema = zod.z.looseObject({
  links: zod.z.array(entityLinkReferenceSchema).describe("Every link touching the anchor entity, outgoing and incoming.")
}).describe("All links touching the anchor entity, in both directions.");
var entityLinkCountsResponseSchema = zod.z.looseObject({
  counts: zod.z.record(zod.z.string(), zod.z.number()).describe("Map of entity id \u2192 number of entity links touching it.")
}).describe("Batch link counts keyed by entity id.");
var eventUserSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the user."),
  name: zod.z.string().describe("User display name.")
}).describe("Minimal user reference embedded in event responses.");
var entityScheduleReferenceSchema = zod.z.looseObject({
  id: zod.z.string().describe("UUID of the parent entity (failure report, maintenance log, notice)."),
  // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
  // a free string to tolerate new entity types added backend-side.
  type: zod.z.string().describe(
    "Kind of entity using this event as its schedule. One of `failure_report`, `maintenance_log`, `notice`."
  ),
  title: zod.z.string().describe("Title of the parent entity for quick reference in the calendar.")
}).describe("Parent entity that attaches this event as its scheduled work window.");
var eventResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Event title displayed in the calendar."),
  type: zod.z.string().describe(
    "Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`)."
  ),
  description: zod.z.string().optional().nullable().describe("Free-form event description; null or absent when not provided."),
  startDate: zod.z.string().describe("ISO-8601 timestamp when the event starts."),
  endDate: zod.z.string().describe("ISO-8601 timestamp when the event ends."),
  color: zod.z.string().describe(
    "Display color \u2014 one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`."
  ),
  buildingId: zod.z.string().uuid().describe("UUID of the building this event is scheduled in."),
  recurrenceType: zod.z.string().describe("Recurrence cadence (`none`, `weekly`, `biweekly`, `monthly`, `yearly`)."),
  subtype: zod.z.string().nullable().optional().describe(
    "Free-form subtype qualifier (used for waste-collection subtypes like `mixed`, `bio`, `paper_cardboard`)."
  ),
  recurrenceEndDate: zod.z.string().nullable().optional().describe(
    "ISO-8601 date after which the recurrence stops. Null for open-ended recurring events."
  ),
  isRecurrenceInstance: zod.z.boolean().optional().describe(
    "True when this payload represents an expanded instance of a recurring parent (rather than the parent itself)."
  ),
  originalEventId: zod.z.string().optional().describe(
    "For recurrence instances, the UUID of the recurring parent event; absent on standalone events."
  ),
  user: eventUserSchema.optional().describe("Creator of the event; omitted when the event is anonymous or seeded by the system."),
  isAnonymous: zod.z.boolean().describe("True when the creator chose to hide their identity from other residents."),
  approved: zod.z.boolean().describe("True when the event has been approved by a representative and is publicly visible."),
  allowComments: zod.z.boolean().optional().default(true).describe("True when comments are enabled on this event."),
  canEdit: zod.z.boolean().describe("True when the calling user is allowed to edit this event."),
  canDelete: zod.z.boolean().describe("True when the calling user is allowed to delete this event."),
  canApprove: zod.z.boolean().describe("True when the calling user is allowed to approve or reject this event."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this event."),
  onlineMeetingUrl: zod.z.string().nullable().optional().describe("Optional join URL for online meetings; null for in-person events."),
  meetingMinutes: zod.z.string().nullable().optional().describe(
    "Rich-text minutes captured during the meeting; null until the minute-taker submits them."
  ),
  minuteTakerId: zod.z.string().nullable().optional().describe(
    "UUID of the user assigned to record minutes; null for events that do not require one."
  ),
  usedAsScheduleBy: zod.z.array(entityScheduleReferenceSchema).optional().describe(
    "Entities (failure reports, maintenance logs, notices) that reference this event as their schedule; empty when none do."
  ),
  createdAt: zod.z.string().optional().describe(
    "ISO-8601 timestamp when the event was created; absent on synthesized recurrence instances."
  )
});
var paginatedEventsResponseSchema = paginatedResponseSchema(eventResponseSchema);
var nestedFileSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Human-readable file name displayed in the UI."),
  documentUrl: zod.z.string().optional().nullable().describe(
    "Absolute URL to download or preview the file. Null/absent when the underlying object has been removed from storage."
  )
}).describe("Lightweight reference to a file attached to a parent entity (notice, report, etc.).");
var nestedEventSchema = zod.z.looseObject({
  id: zod.z.string(),
  title: zod.z.string().describe("Event title as it appears in the calendar."),
  type: zod.z.string().optional().describe(
    "Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`)."
  ),
  description: zod.z.string().nullable().optional().describe("Free-form event description; null when no description was provided."),
  startDate: zod.z.string().describe("ISO-8601 timestamp when the event starts."),
  endDate: zod.z.string().describe("ISO-8601 timestamp when the event ends."),
  color: zod.z.string().optional().describe(
    "Calendar display color \u2014 one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`."
  ),
  userId: zod.z.string().nullable().optional().describe("UUID of the user who created the event; null for system-scheduled events."),
  buildingId: zod.z.string().optional().describe("UUID of the building the event belongs to."),
  createdAt: zod.z.string().optional().describe("ISO-8601 timestamp when the event was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
}).describe(
  "Nested event reference embedded inside notices, failure reports and maintenance logs."
);
var pollReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  question: zod.z.string().describe("Poll question text shown to voters."),
  pollType: zod.z.string().describe("`COMMUNITY` for majority polls, `CONSENSUS` for ownership-weighted polls."),
  deadline: zod.z.string().optional().nullable().describe(
    "ISO-8601 datetime after which votes are rejected. Null for open-ended consensus polls."
  )
}).describe("Lightweight poll reference embedded in other entities (failure reports, logs).");

// src/schemas/responses/failure-reports.ts
var maintenanceLogReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Maintenance log title for quick UI display."),
  contractor: zod.z.string().describe("Contractor or vendor who performed the work."),
  cost: zod.z.number().optional().nullable().describe("Total cost in the building\u2019s currency; null when the cost was not recorded."),
  financedBy: maintenanceFinancedBySchema.optional().nullable().describe(
    "Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`)."
  ),
  warranty: zod.z.boolean().optional().nullable().describe(
    "True when the work is covered by an active warranty. Null when the warranty status was not captured."
  )
}).describe(
  "Lightweight maintenance-log reference embedded in failure report responses (link to the follow-up work record)."
);
var failureReportResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building the report was filed against."),
  title: zod.z.string().describe("Short summary of the reported failure."),
  description: zod.z.string().optional().nullable().describe("Detailed description of the failure; null when the reporter left it blank."),
  files: zod.z.array(nestedFileSchema).default([]).describe("Attached photos or documents supporting the report; empty array when none."),
  submittedBy: zod.z.string().uuid().nullable().describe(
    "UUID of the reporting user. Null when the reporting user has been deleted from the platform."
  ),
  submittedByName: zod.z.string().optional().nullable().describe(
    "Reporter display name. Null when `isAnonymous` is true or the user has been deleted."
  ),
  status: FailureStatusSchema.describe(
    "Lifecycle status: `pending` (newly filed), `in_progress` (assigned work), `resolved` (closed out)."
  ),
  approved: zod.z.boolean().describe("True when a representative has approved the report for public visibility."),
  isAnonymous: zod.z.boolean().optional().default(false).describe("True when the reporter opted to hide their identity from other residents."),
  priority: PrioritySchema.optional().nullable().describe(
    "`normal` for standard reports, `urgent` to flag immediate attention. Null when unset."
  ),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the report was filed."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  allowComments: zod.z.boolean().optional().default(true).describe("True when comments are enabled on this failure report."),
  canEdit: zod.z.boolean().describe("True when the calling user is allowed to edit this report."),
  canDelete: zod.z.boolean().describe("True when the calling user is allowed to delete this report."),
  canApprove: zod.z.boolean().describe("True when the calling user may approve or reject the report."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this report."),
  canStatus: zod.z.boolean().describe(
    "True when the calling user may change the lifecycle status (e.g. mark as in progress or resolved)."
  ),
  locationType: zod.z.string().optional().nullable().describe("`common_area` or `own_unit`. Null when the location has not been classified."),
  commonAreaDescription: zod.z.string().optional().nullable().describe("Free-text location when `locationType` is `common_area`; null otherwise."),
  unitType: zod.z.string().optional().nullable().describe(
    "Kind of unit when `locationType` is `own_unit` (`apartment`, `garage`, `storage_unit`); null otherwise."
  ),
  unitId: zod.z.string().uuid().optional().nullable().describe("UUID of the specific unit when `locationType` is `own_unit`; null otherwise."),
  unitName: zod.z.string().optional().nullable().describe('Resolved human-readable label of the unit (e.g. "Apartment 4B"); null when unset.'),
  events: zod.z.array(nestedEventSchema).default([]).describe("Events (scheduled work or meetings) linked to this report; empty when none."),
  maintenanceLogs: zod.z.array(maintenanceLogReferenceSchema).default([]).describe("Maintenance logs produced to resolve this report; empty when none."),
  polls: zod.z.array(pollReferenceSchema).default([]).describe("Polls created to gather resident input on this report; empty when none.")
});
var paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema
);
var faqResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building this FAQ entry belongs to."),
  question: zod.z.string().describe("FAQ question text as displayed to residents."),
  answer: zod.z.string().describe("FAQ answer text in plain markdown."),
  category: zod.z.enum(["representative", "manager"]).describe(
    "Target audience. `representative` entries are visible to building representatives; `manager` entries are visible to management-firm staff."
  ),
  orderIndex: zod.z.number().describe("Zero-based display order within the building; lower values appear first."),
  createdBy: zod.z.string().uuid().nullable().describe("UUID of the user who created the FAQ; null if the original author was removed."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the FAQ was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
});
var camtImportedEntrySchema = zod.z.looseObject({
  transactionId: zod.z.string().uuid().describe("UUID of the newly inserted income_transactions or expense_transactions row."),
  type: zod.z.enum([chunkZASNDKJM_cjs.TransactionType.INCOME, chunkZASNDKJM_cjs.TransactionType.EXPENSE]).describe(
    "`INCOME` when the CAMT entry was a credit (money into the fund); `EXPENSE` when it was a debit."
  ),
  bankRef: zod.z.string().describe(
    "Bank-assigned unique reference (`AcctSvcrRef` from CAMT.053) used as the idempotency key. Re-importing the same file will skip rows that already have this ref."
  ),
  amount: zod.z.string().describe('Entry amount serialized as a decimal string (e.g. "1234.56").'),
  bookingDate: zod.z.string().describe("ISO-8601 date (YYYY-MM-DD) the entry was booked, taken from `BookgDt`."),
  description: zod.z.string().nullable().describe(
    "Unstructured remittance info (`RmtInf/Ustrd`) concatenated into a single string, or null when the entry carried none."
  )
}).describe("One imported CAMT entry persisted to the building's fund transactions.");
var camtImportErrorSchema = zod.z.looseObject({
  bankRef: zod.z.string().nullable().describe(
    "`AcctSvcrRef` of the offending entry, or null when the entry lacked one (which itself is an error)."
  ),
  reason: zod.z.string().describe(
    "Human-readable explanation of why this entry was rejected. Surfaced directly in the upload-result toast."
  )
}).describe("A CAMT entry that failed to import, with the reason.");
var camtImportResponseSchema = zod.z.looseObject({
  statementId: zod.z.string().describe(
    "Statement identifier from the CAMT `<Stmt><Id>` field, echoed back so the admin can correlate with the source file."
  ),
  statementIban: zod.z.string().describe(
    "IBAN of the account the statement was issued against. Validated to match `building.iban` before any row is persisted."
  ),
  periodFrom: zod.z.string().nullable().describe(
    "ISO-8601 timestamp of the statement start (`FrToDt/FrDtTm`), or null when the bank omitted the period block."
  ),
  periodTo: zod.z.string().nullable().describe("ISO-8601 timestamp of the statement end (`FrToDt/ToDtTm`), or null."),
  importedCount: zod.z.number().int().nonnegative().describe("Number of CAMT entries that produced a new transaction row in this call."),
  skippedCount: zod.z.number().int().nonnegative().describe(
    "Number of CAMT entries whose `bankRef` already existed for this building (idempotent re-import)."
  ),
  errorCount: zod.z.number().int().nonnegative().describe("Number of CAMT entries that were rejected for the reasons listed in `errors`."),
  imported: zod.z.array(camtImportedEntrySchema).describe("Detail rows for each newly persisted transaction."),
  errors: zod.z.array(camtImportErrorSchema).describe("Detail rows for each rejected entry, matched 1:1 against `errorCount`.")
}).describe("Outcome summary for a CAMT.053 statement import.");
var failureReportReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Failure report title for quick UI display."),
  status: zod.z.string().describe("Report lifecycle status (`pending`, `in_progress`, `resolved`)."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the failure report was filed.")
}).describe(
  "Lightweight failure-report reference embedded in maintenance-log responses (the report this work resolved)."
);
var expenseReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  amount: zod.z.number().describe("Transaction amount in EUR."),
  description: zod.z.string().nullable().optional().describe("Free-form description; null when not set."),
  period: zod.z.string().nullable().optional().describe("Reporting period as `YYYY-MM`; null when unset."),
  source: zod.z.string().describe("Provenance tag: `manual` or `camt`."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the expense row was created.")
}).describe("Expense transaction linked via `expense_for`.");
var maintenanceLogResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building the work was performed in."),
  title: zod.z.string().describe("Short summary of the maintenance work."),
  files: zod.z.array(nestedFileSchema).default([]).describe("Attached invoices, photos, or other documents; empty when none are uploaded."),
  createdBy: zod.z.string().uuid().describe("UUID of the user who logged the entry."),
  createdByName: zod.z.string().nullable().optional().describe("Author display name; null when the creating user has been deleted."),
  contractor: zod.z.string().describe("Contractor or vendor who performed the work."),
  cost: zod.z.number().describe("Total cost in the building\u2019s currency (two-decimal precision)."),
  financedBy: maintenanceFinancedBySchema.optional().nullable().describe(
    "Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`); null when unset."
  ),
  warranty: zod.z.boolean().optional().nullable().describe("True when the work is covered by an active warranty. Null when not captured."),
  categoryId: zod.z.string().uuid().optional().nullable().describe("UUID of the transaction category this log rolls up into; null when uncategorised."),
  categoryName: zod.z.string().optional().nullable().describe("Human-readable category label resolved from `categoryId`; null when uncategorised."),
  events: zod.z.array(nestedEventSchema).default([]).describe(
    "Calendar events representing the work window. Every maintenance log must have at least one event."
  ),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the log was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit this log."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete this log."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this log."),
  polls: zod.z.array(pollReferenceSchema).default([]).describe("Polls linked to this log (e.g. consensus to authorise the expense); empty if none."),
  failureReports: zod.z.array(failureReportReferenceSchema).optional().describe(
    "Failure reports this log was produced to resolve; absent when the log is standalone."
  ),
  expenses: zod.z.array(expenseReferenceSchema).optional().describe(
    "Expense transactions linked to this log via `entity_links` (linkType `expense_for`). Populated on detail views."
  )
});
var paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema
);
var noticeResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building this notice was posted in."),
  title: zod.z.string().describe("Notice title shown in lists and the notice detail view."),
  content: zod.z.string().describe("Notice body text (rich-text / HTML allowed)."),
  files: zod.z.array(nestedFileSchema).default([]).describe("Attached documents or images; empty array when none are uploaded."),
  createdBy: zod.z.string().uuid().nullable().describe("UUID of the notice author; null when the authoring user has been deleted."),
  approved: zod.z.boolean().describe("True once a representative has approved the notice for public visibility."),
  isAnonymous: zod.z.boolean().optional().default(false).describe("True when the author opted to hide their identity from other residents."),
  pinned: zod.z.boolean().optional().default(false).describe("True when the notice is pinned to the top of the notice board."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the notice was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  createdByName: zod.z.string().nullable().optional().describe(
    "Author display name. Null when `isAnonymous` is true or the author has been deleted."
  ),
  allowComments: zod.z.boolean().optional().default(true).describe("True when comments are enabled on this notice."),
  commentsCount: zod.z.number().int().default(0).describe("Number of non-archived comments on this notice."),
  canApprove: zod.z.boolean().describe("True when the calling user may approve or reject the notice."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit the notice."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete the notice."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this notice."),
  events: zod.z.array(nestedEventSchema).default([]).describe("Calendar events linked to the notice (e.g. planned works window); empty when none.")
});
var paginatedNoticesResponseSchema = paginatedResponseSchema(noticeResponseSchema);
var baseNotificationDataSchema = zod.z.object({
  entityType: zod.z.string().optional(),
  entityId: zod.z.string().optional(),
  actorId: zod.z.string().uuid().optional(),
  actorName: zod.z.string().optional(),
  actionUrl: zod.z.string().optional()
});
var noticeCreatedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  content: zod.z.string(),
  createdAt: zod.z.string().or(zod.z.date()),
  isPinned: zod.z.boolean().optional()
});
var noticeApprovedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string()
});
var noticeRejectedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string()
});
var pollCreatedDataSchema = baseNotificationDataSchema.extend({
  question: zod.z.string(),
  pollType: zod.z.string(),
  deadline: zod.z.string().or(zod.z.date()).nullable().optional(),
  options: zod.z.array(zod.z.string())
});
var pollFinalizedDataSchema = baseNotificationDataSchema.extend({
  question: zod.z.string(),
  pollType: zod.z.string(),
  options: zod.z.array(zod.z.string())
});
var eventCreatedOrUpdatedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  eventType: zod.z.string().nullable().optional(),
  subtype: zod.z.string().nullable().optional(),
  startDate: zod.z.string().or(zod.z.date()),
  endDate: zod.z.string().or(zod.z.date()).nullable().optional(),
  color: zod.z.string().nullable().optional()
});
var eventCancelledDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  eventType: zod.z.string().nullable().optional(),
  startDate: zod.z.string().or(zod.z.date()),
  endDate: zod.z.string().or(zod.z.date()).nullable().optional()
});
var wasteReminderDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  /**
   * @deprecated The backend no longer sends a pre-rendered label — derive it
   * from `subtype` in the client's locale. Present only on pre-2026-07 rows.
   */
  wasteTypeLabel: zod.z.string().optional(),
  subtype: zod.z.string(),
  startDate: zod.z.string().or(zod.z.date())
});
var failureReportCreatedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  location: zod.z.string().nullable().optional()
});
var failureReportStatusDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  status: zod.z.string(),
  description: zod.z.string().nullable().optional()
});
var failureReportApprovedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string()
});
var failureReportDeclinedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string()
});
var maintenanceLogCreatedDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  category: zod.z.string().nullable().optional(),
  contractor: zod.z.string().nullable().optional(),
  // `cost` comes from a Postgres DECIMAL, which drizzle serializes as string.
  cost: zod.z.union([zod.z.string(), zod.z.number()]).nullable().optional()
});
var buildingJoinRequestReceivedDataSchema = baseNotificationDataSchema.extend({
  userName: zod.z.string(),
  userEmail: zod.z.string(),
  message: zod.z.string().nullable().optional()
});
var buildingJoinRequestDecidedDataSchema = baseNotificationDataSchema.extend({
  rejectionReason: zod.z.string().nullable().optional()
});
var buildingMemberJoinedDataSchema = baseNotificationDataSchema;
var buildingRoleChangedDataSchema = baseNotificationDataSchema.extend({
  role: zod.z.string()
});
var buildingPendingApprovalDataSchema = baseNotificationDataSchema.extend({
  buildingName: zod.z.string()
});
var buildingApprovedDataSchema = baseNotificationDataSchema.extend({
  buildingName: zod.z.string()
});
var buildingRejectedDataSchema = baseNotificationDataSchema.extend({
  buildingName: zod.z.string(),
  rejectionReason: zod.z.string()
});
var chatMessageDataSchema = baseNotificationDataSchema.extend({
  senderName: zod.z.string(),
  messagePreview: zod.z.string(),
  conversationId: zod.z.string().uuid()
});
var eventReminderDataSchema = baseNotificationDataSchema.extend({
  title: zod.z.string(),
  // Pre-formatted wall-clock time in Europe/Zagreb (e.g. "18:00") — template var.
  startTime: zod.z.string().optional(),
  // Occurrence start (not the parent event's) — feeds the calendar deep-link `date` param.
  startDate: zod.z.string().or(zod.z.date())
});
var pollVoteSignatureDataSchema = baseNotificationDataSchema.extend({
  question: zod.z.string()
});
var pollVoteSignatureRejectedDataSchema = pollVoteSignatureDataSchema.extend({
  reason: zod.z.string().nullable().optional()
});
var unimplementedDataSchema = baseNotificationDataSchema;
({
  [chunkZASNDKJM_cjs.NotificationType.NOTICE_CREATED]: noticeCreatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.NOTICE_APPROVED]: noticeApprovedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.NOTICE_REJECTED]: noticeRejectedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_CREATED]: pollCreatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_DEADLINE_24H]: unimplementedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_DEADLINE_1H]: unimplementedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_FINALIZED]: pollFinalizedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.EVENT_CREATED]: eventCreatedOrUpdatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.EVENT_UPDATED]: eventCreatedOrUpdatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.EVENT_CANCELLED]: eventCancelledDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.EVENT_REMINDER_24H]: eventReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.EVENT_REMINDER_1H]: eventReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.WASTE_REMINDER_MIXED]: wasteReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.WASTE_REMINDER_BIO]: wasteReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.WASTE_REMINDER_PLASTIC_METAL]: wasteReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: wasteReminderDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.FAILURE_REPORT_CREATED]: failureReportCreatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.FAILURE_REPORT_STATUS_CHANGED]: failureReportStatusDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.FAILURE_REPORT_RESOLVED]: failureReportStatusDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.FAILURE_REPORT_APPROVED]: failureReportApprovedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.FAILURE_REPORT_DECLINED]: failureReportDeclinedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.MAINTENANCE_LOG_CREATED]: maintenanceLogCreatedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.PAYMENT_DUE]: unimplementedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.PAYMENT_RECEIVED]: unimplementedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: buildingJoinRequestReceivedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: buildingJoinRequestDecidedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: buildingJoinRequestDecidedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_MEMBER_JOINED]: buildingMemberJoinedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_ROLE_CHANGED]: buildingRoleChangedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_PENDING_APPROVAL]: buildingPendingApprovalDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_APPROVED]: buildingApprovedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.BUILDING_REJECTED]: buildingRejectedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.CHAT_MESSAGE]: chatMessageDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_VOTE_SIGNATURE_PENDING]: pollVoteSignatureDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: pollVoteSignatureDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: pollVoteSignatureRejectedDataSchema,
  [chunkZASNDKJM_cjs.NotificationType.SYSTEM_ANNOUNCEMENT]: unimplementedDataSchema
});
var notificationDataSchema = zod.z.union([
  noticeCreatedDataSchema,
  noticeApprovedDataSchema,
  noticeRejectedDataSchema,
  pollCreatedDataSchema,
  pollFinalizedDataSchema,
  eventCreatedOrUpdatedDataSchema,
  eventCancelledDataSchema,
  wasteReminderDataSchema,
  failureReportCreatedDataSchema,
  failureReportStatusDataSchema,
  failureReportApprovedDataSchema,
  failureReportDeclinedDataSchema,
  maintenanceLogCreatedDataSchema,
  buildingJoinRequestReceivedDataSchema,
  buildingJoinRequestDecidedDataSchema,
  buildingMemberJoinedDataSchema,
  buildingRoleChangedDataSchema,
  buildingPendingApprovalDataSchema,
  buildingApprovedDataSchema,
  buildingRejectedDataSchema,
  chatMessageDataSchema,
  eventReminderDataSchema,
  pollVoteSignatureDataSchema,
  pollVoteSignatureRejectedDataSchema,
  unimplementedDataSchema
]);
var notificationTypeValues = Object.values(chunkZASNDKJM_cjs.NotificationType);
var notificationResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Localized notification title shown in the UI list and push notification."),
  body: zod.z.string().describe("Localized notification body \u2014 one or two short sentences."),
  type: zod.z.enum(notificationTypeValues).describe(
    "Discriminator for the notification subtype. Determines which per-type schema governs `data` \u2014 see `getNotificationDataSchema(type)`."
  ),
  buildingId: zod.z.string().uuid().nullable().optional().describe(
    "UUID of the related building. Null for cross-building notifications (system announcements, chat DMs)."
  ),
  buildingName: zod.z.string().nullable().optional().describe(
    "Denormalized building display name for convenience. Null when `buildingId` is null."
  ),
  data: notificationDataSchema.nullable().optional().describe(
    "Per-type payload. Shape depends on the `type` field; use `getNotificationDataSchema(type).parse(data)` to narrow."
  ),
  read: zod.z.boolean().describe("True once the user has opened this notification."),
  readAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the first read. Null while unread."),
  createdAt: zod.z.string()
});
var notificationPreferenceItemSchema = zod.z.looseObject({
  type: zod.z.string().describe("Notification type identifier (maps to a value in `NotificationType`)."),
  description: zod.z.string().describe("Human-readable description of what this notification signals."),
  enabled: zod.z.boolean().describe("Whether the user has this notification type turned on."),
  channels: zod.z.array(zod.z.string()).describe("Enabled delivery channels for this type: subset of `push`, `email`, `in_app`.")
});
var notificationPreferenceCategorySchema = zod.z.looseObject({
  category: zod.z.string().describe("Category grouping (e.g. `building`, `financial`, `social`)."),
  notifications: zod.z.array(notificationPreferenceItemSchema).describe(
    "Items belonging to this category; each represents one toggleable notification type."
  )
});
var pollStatusSchema = zod.z.enum(["active", "completed", "cancelled"]).describe(
  "Poll lifecycle: `active` while accepting votes, `completed` once finalised, `cancelled` when archived before completion."
);
var pollDocumentReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Document title displayed in the file list."),
  description: zod.z.string().nullable().optional().describe("Optional short description; null when none was provided."),
  documentUrl: zod.z.string().describe("Absolute URL to download or preview the file."),
  fileType: zod.z.enum(["image", "document"]).describe("Coarse file category used to pick the viewer (image preview vs document reader)."),
  uploadedBy: zod.z.string().describe("Display name or UUID of the uploader, depending on the endpoint."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the file was attached to the poll."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last file update; null when never updated.")
}).describe("Supporting document attached to a poll (proposal, receipt, spec, etc.).");
var pollMaintenanceLogReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string().describe("Linked maintenance-log title."),
  contractor: zod.z.string().describe("Contractor who performed the underlying work."),
  cost: zod.z.number().describe("Total cost of the underlying work."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the maintenance log was created.")
}).describe("Maintenance log linked to this poll (e.g. a quote being voted on).");
var pollScopedUnitSchema = zod.z.looseObject({
  unitType: zod.z.string().describe("Kind of unit eligible to vote (`apartment`, `garage`, `storage_unit`)."),
  unitId: zod.z.string().describe("UUID of the scoped unit."),
  label: zod.z.string().describe('Human-readable unit label (e.g. "Apartment 4B").'),
  floor: zod.z.string().optional().describe("Floor label where the unit is located; absent when not recorded.")
}).describe("Unit whose owners/tenants are eligible to participate in a scoped poll.");
var pollScopedOwnerSchema = zod.z.looseObject({
  ownerId: zod.z.string().describe("UUID of the explicitly-eligible owner record."),
  fullName: zod.z.string().describe("Display name of the scoped owner."),
  userId: zod.z.string().nullable().optional().describe("UUID of the linked user account; null for placeholder owners without an account.")
}).describe("Owner record explicitly added to the poll\u2019s eligible-voter list.");
var pollResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building this poll belongs to."),
  question: zod.z.string().describe("Poll question displayed to voters."),
  options: zod.z.array(zod.z.string()).describe(
    "Answer options in display order. Community polls: 2\u20134 options. Consensus polls: always a single option (voters approve or abstain)."
  ),
  createdBy: zod.z.string().describe("UUID of the user who created the poll; preserved even after user deletion."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the poll was created."),
  updatedAt: zod.z.string().describe("ISO-8601 timestamp of the last poll mutation."),
  deadline: zod.z.string().optional().describe(
    "ISO-8601 datetime after which votes are rejected. Absent for open-ended consensus polls."
  ),
  pollType: pollTypeSchema.describe(
    "`COMMUNITY` polls pass by simple majority; `CONSENSUS` polls require an ownership-weighted threshold."
  ),
  status: pollStatusSchema,
  requiredConsensusPercentage: zod.z.number().optional().describe(
    "Ownership-weighted approval threshold (10\u2013100) required for consensus polls; absent for community polls."
  ),
  totalVotes: zod.z.number().describe("Number of distinct voters who have voted so far."),
  totalWeight: zod.z.number().describe(
    "Sum of vote weights cast so far. Equal to `totalVotes` for community polls; varies by ownership for consensus polls."
  ),
  winningOptionIndex: zod.z.number().nullable().optional().describe(
    "Zero-based index of the winning option once the poll is finalised; null while still active or if no option won."
  ),
  isResultsFinalized: zod.z.boolean().describe("True once results have been sealed and no further votes are accepted."),
  finalizedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp when the poll was finalised; null while active."),
  finalizedBy: zod.z.string().nullable().optional().describe("UUID of the user who finalised the poll; null while active."),
  hasVoted: zod.z.boolean().optional().describe("True when the calling user has already cast a vote on this poll."),
  userVote: zod.z.number().optional().describe(
    "Zero-based index of the option the calling user voted for; absent when the user has not voted."
  ),
  files: zod.z.array(pollDocumentReferenceSchema).optional().describe("Supporting documents uploaded with the poll; absent when none.")
});
var pollOptionResultSchema = zod.z.looseObject({
  optionIndex: zod.z.number().describe("Zero-based index into the poll `options` array."),
  optionText: zod.z.string().describe("Text of the option (denormalised for convenience)."),
  voteCount: zod.z.number().describe("Number of distinct voters that chose this option."),
  totalWeight: zod.z.number().describe("Sum of vote weights for this option (ownership-weighted for consensus polls)."),
  percentage: zod.z.number().describe("Share of `totalVotes` that chose this option, in percent (0\u2013100)."),
  weightPercentage: zod.z.number().describe("Share of `totalWeight` that chose this option, in percent (0\u2013100).")
}).describe("Per-option tally produced after finalising a poll.");
var pollResultsSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid().describe("UUID of the building this poll belongs to."),
  question: zod.z.string().describe("Poll question displayed to voters."),
  options: zod.z.array(zod.z.string()).describe("Answer options in display order."),
  createdBy: zod.z.string().describe("UUID of the user who created the poll."),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the poll was created."),
  deadline: zod.z.string().optional().describe("ISO-8601 datetime after which votes are rejected. Absent for open-ended polls."),
  pollType: pollTypeSchema.describe("`COMMUNITY` for majority polls, `CONSENSUS` for weighted."),
  status: pollStatusSchema,
  requiredConsensusPercentage: zod.z.number().optional().describe("Consensus approval threshold in percent (10\u2013100) for consensus polls."),
  totalVotes: zod.z.number().describe("Number of distinct voters who have voted so far."),
  totalWeight: zod.z.number().describe("Sum of vote weights cast so far (ownership-weighted for consensus polls)."),
  totalEligibleVoters: zod.z.number().describe("Number of distinct users eligible to vote on this poll (based on scope)."),
  winningOptionIndex: zod.z.number().nullable().optional().describe(
    "Zero-based index of the winning option once finalised; null while active or if no option won."
  ),
  isResultsFinalized: zod.z.boolean().describe("True once results are sealed and no further votes are accepted."),
  finalizedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp when the poll was finalised; null while active."),
  finalizedBy: zod.z.string().nullable().optional().describe("UUID of the user who finalised the poll; null while active."),
  optionResults: zod.z.array(pollOptionResultSchema).describe("Per-option vote tallies."),
  consensusReached: zod.z.boolean().optional().describe(
    "True when the ownership-weighted approval threshold has been reached. Only present for consensus polls."
  ),
  currentConsensusPercentage: zod.z.number().optional().describe("Current cumulative weight in favour, in percent. Only present for consensus polls."),
  approved: zod.z.boolean().describe("True when a representative has approved the poll for public visibility."),
  canApprove: zod.z.boolean().describe("True when the calling user may approve or reject the poll."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit this poll."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete this poll."),
  isOwner: zod.z.boolean().describe("True when the calling user is the creator of this poll."),
  canVote: zod.z.boolean().describe(
    "True when the calling user is eligible to vote and has not yet voted (and the poll is still active)."
  ),
  cannotVoteReason: zod.z.enum(Object.values(chunkZASNDKJM_cjs.PollCannotVoteReason)).optional().describe("Machine-readable reason the caller cannot vote (present when canVote is false)."),
  hasUserVoted: zod.z.boolean().describe("True when the calling user has already voted on this poll."),
  userVotedOptionIndex: zod.z.number().nullable().optional().describe(
    "Zero-based index of the option the calling user voted for; null when they have not voted."
  ),
  scopedUnits: zod.z.array(pollScopedUnitSchema).optional().describe("Units scoped into eligibility; absent when the poll is building-wide."),
  eligibleTotalWeight: zod.z.number().optional().describe(
    "Cached sum of eligible voters\u2019 ownership percentages captured at poll creation. Used to normalise `totalWeight` against the full eligible weight."
  ),
  scopedOwners: zod.z.array(pollScopedOwnerSchema).optional().describe("Owners scoped into eligibility by explicit selection; absent when not used."),
  maintenanceLogs: zod.z.array(pollMaintenanceLogReferenceSchema).optional().describe("Maintenance logs linked to the poll (for context); absent when none."),
  files: zod.z.array(pollDocumentReferenceSchema).optional().describe("Supporting documents uploaded with the poll; absent when none.")
});
var pollVoterSchema = zod.z.looseObject({
  userId: zod.z.string().nullable().describe(
    "UUID of the voting user; null for paper votes recorded for owners without accounts."
  ),
  ownerId: zod.z.string().nullable().optional().describe("UUID of the owner record the vote is attributed to; null for non-owner voters."),
  name: zod.z.string().describe("Voter display name (owner full name for owner-attributed votes)."),
  email: zod.z.string().nullable().optional().describe("Voter contact email; null when unknown."),
  selectedOptionIndex: zod.z.number().describe("Zero-based index of the option the voter chose."),
  selectedOptionText: zod.z.string().describe("Text of the chosen option (denormalised)."),
  voteWeight: zod.z.number().describe(
    "Weight contributed by this vote. 1.00 for community polls; the voter\u2019s derived building ownership share (5-decimal precision) for consensus polls."
  ),
  votedAt: zod.z.string().describe("ISO-8601 timestamp when the vote was recorded."),
  isOffline: zod.z.boolean().optional().describe("True when the vote was recorded by a representative from a paper signature."),
  hasAccount: zod.z.boolean().optional().describe("True when the voter has a registered user account.")
}).describe("Individual voter entry returned by the poll voters endpoint.");
var pollEligibleVoterSchema = zod.z.looseObject({
  ownerId: zod.z.string().uuid().describe("UUID of the owner record."),
  userId: zod.z.string().nullable().describe("UUID of the linked user account; null for placeholder owners."),
  fullName: zod.z.string().describe("Owner full name (person, joint couple, or legal entity)."),
  email: zod.z.string().nullable().describe("Owner contact email; null when not recorded."),
  oib: zod.z.string().nullable().describe("Croatian OIB of the owner; null when not recorded."),
  weightPct: zod.z.string().describe(
    'Derived ownership weight in percent as an exact decimal string (5-decimal precision), e.g. "12.20000".'
  ),
  holdings: zod.z.array(
    zod.z.looseObject({
      unitType: zod.z.string().describe("Kind of unit held (`apartment`, `garage`, `storage_unit`)."),
      unitId: zod.z.string().describe("UUID of the unit."),
      label: zod.z.string().describe('Human-readable unit label (e.g. "ST 3448").'),
      floor: zod.z.string().nullable().optional().describe("Floor label; null when not recorded."),
      areaM2: zod.z.string().nullable().describe("Unit area in m\xB2 as a decimal string; null when not recorded."),
      unitSharePct: zod.z.string().describe("Owner\u2019s share of this unit in percent as a decimal string.")
    })
  ).describe("Units this owner currently holds, with per-unit shares."),
  voteStatus: zod.z.enum(["not_voted", "accepted", "pending_signature_review", "rejected"]).optional().describe("The owner\u2019s vote state on the poll in question, when requested per-poll.")
}).describe("Aggregated per-owner roster row for a poll\u2019s electorate.");
var pollEligibleVotersResponseSchema = zod.z.looseObject({
  pollId: zod.z.string().uuid().describe("UUID of the poll this electorate belongs to."),
  voters: zod.z.array(pollEligibleVoterSchema).describe("One entry per eligible owner."),
  totalWeightPct: zod.z.string().describe("Sum of eligible owners\u2019 derived weights as an exact decimal string."),
  warnings: zod.z.looseObject({
    unitsWithoutArea: zod.z.array(zod.z.string()).describe("Labels of units with no recorded area (excluded from weight math)."),
    unitsWithoutOwners: zod.z.array(zod.z.string()).describe("Labels of units with no active owner (weight unassigned).")
  }).describe("Data-quality warnings surfaced by the roster derivation.")
});
var pollVotersResponseSchema = zod.z.looseObject({
  pollId: zod.z.string().uuid().describe("UUID of the poll these voters belong to."),
  question: zod.z.string().describe("Poll question, repeated for convenience."),
  options: zod.z.array(zod.z.string()).describe("Poll options in display order."),
  totalVotes: zod.z.number().describe("Total number of distinct voters represented in `voters`."),
  voters: zod.z.array(pollVoterSchema).describe("Individual voter entries with their chosen option.")
});
var paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);
var repUserRoleSchema = zod.z.enum([
  chunkZASNDKJM_cjs.BuildingRole.OWNER_REPRESENTATIVE,
  chunkZASNDKJM_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
  chunkZASNDKJM_cjs.BuildingRole.CO_OWNER,
  chunkZASNDKJM_cjs.BuildingRole.RESIDENT
]).describe("Role the user holds within the specific building association.");
var repUserBuildingSchema = zod.z.looseObject({
  buildingId: zod.z.string().uuid(),
  buildingName: zod.z.string().describe("Display name of the associated building."),
  buildingAddress: zod.z.string().describe("Full postal address of the associated building."),
  roleType: repUserRoleSchema,
  buildingSurfacePercentage: zod.z.string().describe(
    'The user\u2019s ownership share of the building surface, serialized as a decimal string (e.g. "12.50").'
  ),
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the user joined this building."),
  canEdit: zod.z.boolean().describe("True when the caller may edit this association (role, surface share)."),
  canKick: zod.z.boolean().describe("True when the caller may remove the user from this building.")
}).describe("One building association of a user visible to the calling representative.");
var repUserItemSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  name: zod.z.string().describe("User display name."),
  email: zod.z.string().describe("User contact email."),
  phone: zod.z.string().nullable().optional().describe("Contact phone, or null when the user has not set one."),
  address: zod.z.string().nullable().optional().describe("User postal address, or null when not provided."),
  buildings: zod.z.array(repUserBuildingSchema).describe("All of the user\u2019s associations within the caller\u2019s buildings."),
  isYou: zod.z.boolean().describe("True when this row is the calling user.")
}).describe("A user visible to the calling representative, flattened across buildings.");
var paginatedRepUsersResponseSchema = paginatedResponseSchema(repUserItemSchema);
var repBuildingManagerSchema = zod.z.looseObject({
  name: zod.z.string().describe("Display name of the assigned management-firm contact."),
  email: zod.z.string().describe("Contact email for the assigned manager.")
}).describe("Summary of the building\u2019s assigned management-firm contact.");
var repBuildingFundsSchema = zod.z.looseObject({
  currentBalance: zod.z.string().describe('Current fund balance as a decimal string (e.g. "27820.54").'),
  currency: zod.z.string().describe("Currency symbol or code displayed alongside the balance.")
}).describe("Summary of the building\u2019s current fund balance.");
var repBuildingItemSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  name: zod.z.string().describe("Building display name."),
  address: zod.z.string().describe("Full postal address of the building."),
  type: buildingTypeSchema,
  status: zod.z.string().describe("Building lifecycle status (`pending`, `active`, `rejected`)."),
  totalUnits: zod.z.number().describe("Declared number of individual units."),
  manager: repBuildingManagerSchema,
  funds: repBuildingFundsSchema,
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  coverImage: zod.z.string().nullable().optional().describe("Absolute URL of the cover photo, or null when no cover image is set.")
}).describe(
  "A building managed by the calling representative, as listed in the rep buildings table."
);
var paginatedRepBuildingsResponseSchema = paginatedResponseSchema(repBuildingItemSchema);
var REP_RECENT_ACTIVITY_TYPES = [
  "notice",
  "maintenance",
  "failure_report",
  "user_joined"
];
var repRecentActivityTypeSchema = zod.z.enum(REP_RECENT_ACTIVITY_TYPES).describe("Kind of event surfaced in the recent-activity feed.");
var repRecentActivitySchema = zod.z.looseObject({
  buildingId: zod.z.string().describe("UUID of the building the activity happened in."),
  buildingName: zod.z.string().describe("Display name of the building."),
  activityType: repRecentActivityTypeSchema,
  description: zod.z.string().describe("Human-readable one-line summary of the activity."),
  timestamp: zod.z.string().describe("ISO-8601 timestamp of the activity."),
  userId: zod.z.string().nullable().optional().describe("UUID of the acting user, when the activity has an actor."),
  userName: zod.z.string().nullable().optional().describe("Display name of the acting user, when the activity has an actor.")
}).describe("One row of the representative dashboard recent-activity feed.");
var repBuildingActivitySchema = zod.z.looseObject({
  buildingId: zod.z.string().describe("UUID of the building."),
  buildingName: zod.z.string().describe("Display name of the building."),
  buildingAddress: zod.z.string().describe("Full postal address of the building."),
  buildingType: buildingTypeSchema,
  lastActivityAt: zod.z.string().describe("ISO-8601 timestamp of the most recent activity.")
}).describe('A building with activity in the last 24 hours ("buildings updated" list).');
var repDashboardSummaryResponseSchema = zod.z.looseObject({
  buildings: zod.z.looseObject({
    total: zod.z.number().describe("Total buildings managed by the caller."),
    addedThisMonth: zod.z.number().describe("Buildings added this calendar month."),
    byType: zod.z.looseObject({
      residential: zod.z.number().describe("Residential buildings managed by the caller."),
      commercial: zod.z.number().describe("Commercial buildings managed by the caller.")
    }).describe("Building counts split by usage type.")
  }).describe("Building statistics for the caller\u2019s portfolio."),
  users: zod.z.looseObject({
    total: zod.z.number().describe("Total users across the caller\u2019s buildings."),
    managers: zod.z.number().describe("Users holding a managerial role."),
    newThisMonth: zod.z.number().describe("Users who joined this calendar month."),
    byRole: zod.z.looseObject({
      admin: zod.z.number().describe("Users counted under the admin bucket."),
      manager: zod.z.number().describe("Users counted under the manager bucket."),
      tenant: zod.z.number().describe("Users counted under the tenant bucket.")
    }).describe("User counts split by coarse role bucket.")
  }).describe("User statistics across the caller\u2019s buildings."),
  activities: zod.z.looseObject({
    notices: zod.z.looseObject({
      total: zod.z.number().describe("All notices across the caller\u2019s buildings."),
      pending: zod.z.number().describe("Notices awaiting representative approval."),
      today: zod.z.number().describe("Notices created today.")
    }).describe("Notice counts."),
    maintenanceLogs: zod.z.looseObject({
      total: zod.z.number().describe("All maintenance logs across the caller\u2019s buildings."),
      today: zod.z.number().describe("Maintenance logs created today.")
    }).describe("Maintenance-log counts."),
    failureReports: zod.z.looseObject({
      total: zod.z.number().describe("All failure reports across the caller\u2019s buildings."),
      open: zod.z.number().describe("Reports not yet resolved."),
      resolved: zod.z.number().describe("Reports already resolved."),
      today: zod.z.number().describe("Reports submitted today.")
    }).describe("Failure-report counts.")
  }).describe("Activity statistics per content type."),
  polls: zod.z.looseObject({
    active: zod.z.number().describe("Approved polls currently open for voting."),
    pendingApproval: zod.z.number().describe("Polls awaiting representative approval."),
    expiringSoon: zod.z.number().describe("Active polls with a deadline within 48 hours.")
  }).nullable().optional().describe("Poll statistics; absent when the caller has no poll access."),
  funds: zod.z.looseObject({
    totalBalance: zod.z.string().describe("Sum of all building fund balances as a decimal string."),
    buildingsWithFunds: zod.z.number().describe("Buildings that have a fund record."),
    negativeBalanceCount: zod.z.number().describe("Buildings with a negative fund balance.")
  }).nullable().optional().describe("Fund-balance statistics; absent when the caller has no financial access."),
  recentActivity: zod.z.array(repRecentActivitySchema).describe("Most recent activities across the caller\u2019s buildings, newest first."),
  buildingsWithActivity: zod.z.array(repBuildingActivitySchema).describe("Buildings with activity in the last 24 hours."),
  totalUsers: zod.z.number().describe("Total unique users across all of the caller\u2019s buildings."),
  totalManagers: zod.z.number().describe("Total unique building managers."),
  newManagersThisMonth: zod.z.number().describe("Managers who joined this calendar month."),
  newUsersThisMonth: zod.z.number().describe("Users who joined this calendar month."),
  activitiesLast24Hours: zod.z.number().describe("Total activities in the last 24 hours."),
  pendingSignatureVotes: zod.z.number().nullable().optional().describe("Printed-signature votes awaiting representative review (rep scope only).")
}).describe("Payload of `GET /representatives/dashboard/summary`.");

exports.ARCHIVE_TYPES = ARCHIVE_TYPES;
exports.ApprovalStatusSchema = ApprovalStatusSchema;
exports.BOARD_CARD_LIMITS = BOARD_CARD_LIMITS;
exports.BOARD_COLUMN_LIMITS = BOARD_COLUMN_LIMITS;
exports.BOARD_LIMITS = BOARD_LIMITS;
exports.BUILDING_LIMITS = BUILDING_LIMITS;
exports.BUILDING_TYPES = BUILDING_TYPES;
exports.CHAT_LIMITS = CHAT_LIMITS;
exports.CommonStatusSchema = CommonStatusSchema;
exports.DOCUMENT_LIMITS = DOCUMENT_LIMITS;
exports.EMAIL_LIMITS = EMAIL_LIMITS;
exports.ENTITY_LINK_TYPES = ENTITY_LINK_TYPES;
exports.EVENT_COLORS = EVENT_COLORS;
exports.EVENT_TYPES = EVENT_TYPES;
exports.EVENT_TYPE_COLOR_MAP = EVENT_TYPE_COLOR_MAP;
exports.FAILURE_REPORT_LIMITS = FAILURE_REPORT_LIMITS;
exports.FAQ_LIMITS = FAQ_LIMITS;
exports.FailureStatusSchema = FailureStatusSchema;
exports.LINKABLE_ENTITY_TYPES = LINKABLE_ENTITY_TYPES;
exports.MAINTENANCE_FINANCED_BY = MAINTENANCE_FINANCED_BY;
exports.MAINTENANCE_LOG_LIMITS = MAINTENANCE_LOG_LIMITS;
exports.MaintenanceStatusSchema = MaintenanceStatusSchema;
exports.NOTICE_LIMITS = NOTICE_LIMITS;
exports.ORGANIZATION_LIMITS = ORGANIZATION_LIMITS;
exports.POLL_LIMITS = POLL_LIMITS;
exports.POLL_TYPES = POLL_TYPES;
exports.PrioritySchema = PrioritySchema;
exports.RECURRENCE_TYPES = RECURRENCE_TYPES;
exports.REP_RECENT_ACTIVITY_TYPES = REP_RECENT_ACTIVITY_TYPES;
exports.TRANSACTION_CATEGORY_LIMITS = TRANSACTION_CATEGORY_LIMITS;
exports.UNIT_KINDS = UNIT_KINDS;
exports.addOrgMemberSchema = addOrgMemberSchema;
exports.aiChatMessageSchema = aiChatMessageSchema;
exports.aiChatRequestSchema = aiChatRequestSchema;
exports.aiUsageResponseSchema = aiUsageResponseSchema;
exports.apiErrorResponseSchema = apiErrorResponseSchema;
exports.apiErrorSchema = apiErrorSchema;
exports.approvalStatusOptions = approvalStatusOptions;
exports.approveFailureReportSchema = approveFailureReportSchema;
exports.approveNoticeSchema = approveNoticeSchema;
exports.archiveTypeSchema = archiveTypeSchema;
exports.archivedItemSchema = archivedItemSchema;
exports.assignOrgBuildingSchema = assignOrgBuildingSchema;
exports.assignOrgMemberBuildingSchema = assignOrgMemberBuildingSchema;
exports.assignOwnerSchema = assignOwnerSchema;
exports.baseEntitySchema = baseEntitySchema;
exports.boardCardChecklistItemSchema = boardCardChecklistItemSchema;
exports.boardCardEventSchema = boardCardEventSchema;
exports.buildingDetailResponseSchema = buildingDetailResponseSchema;
exports.buildingEntitySchema = buildingEntitySchema;
exports.buildingFundsLedgerResponseSchema = buildingFundsLedgerResponseSchema;
exports.buildingFundsLedgerRowSchema = buildingFundsLedgerRowSchema;
exports.buildingQuotaConfigSchema = buildingQuotaConfigSchema;
exports.buildingQuotaEntrySchema = buildingQuotaEntrySchema;
exports.buildingQuotaListSchema = buildingQuotaListSchema;
exports.buildingResponseSchema = buildingResponseSchema;
exports.buildingSettingsResponseSchema = buildingSettingsResponseSchema;
exports.buildingTypeSchema = buildingTypeSchema;
exports.buildingUserEntitySchema = buildingUserEntitySchema;
exports.businessPartnerResponseSchema = businessPartnerResponseSchema;
exports.camtImportResponseSchema = camtImportResponseSchema;
exports.certiliaUserinfoSchema = certiliaUserinfoSchema;
exports.chatMessageResponseSchema = chatMessageResponseSchema;
exports.commentResponseSchema = commentResponseSchema;
exports.commonStatusOptions = commonStatusOptions;
exports.conversationLastMessageSchema = conversationLastMessageSchema;
exports.conversationParticipantSchema = conversationParticipantSchema;
exports.conversationResponseSchema = conversationResponseSchema;
exports.conversationsListResponseSchema = conversationsListResponseSchema;
exports.copyFaqsSchema = copyFaqsSchema;
exports.copyTransactionCategoriesSchema = copyTransactionCategoriesSchema;
exports.createBoardCardSchema = createBoardCardSchema;
exports.createBoardColumnSchema = createBoardColumnSchema;
exports.createBoardSchema = createBoardSchema;
exports.createBuildingSchema = createBuildingSchema;
exports.createBusinessPartnerSchema = createBusinessPartnerSchema;
exports.createConversationSchema = createConversationSchema;
exports.createDocumentSchema = createDocumentSchema;
exports.createEmailThreadRequestSchema = createEmailThreadRequestSchema;
exports.createEntityLinkRequestSchema = createEntityLinkRequestSchema;
exports.createEventSchema = createEventSchema;
exports.createExpenseSchema = createExpenseSchema;
exports.createFailureReportSchema = createFailureReportSchema;
exports.createFaqSchema = createFaqSchema;
exports.createIncomeSchema = createIncomeSchema;
exports.createMaintenanceLogSchema = createMaintenanceLogSchema;
exports.createNoticeSchema = createNoticeSchema;
exports.createOrganizationSchema = createOrganizationSchema;
exports.createOwnerSchema = createOwnerSchema;
exports.createPollSchema = createPollSchema;
exports.createTransactionCategorySchema = createTransactionCategorySchema;
exports.createUnitSchema = createUnitSchema;
exports.cursorQuerySchema = cursorQuerySchema;
exports.dateRangeParamsSchema = dateRangeParamsSchema;
exports.dateRangeWithValidationSchema = dateRangeWithValidationSchema;
exports.dateTimeSchema = dateTimeSchema;
exports.deleteEntityLinkQuerySchema = deleteEntityLinkQuerySchema;
exports.deleteEntityLinkRequestSchema = deleteEntityLinkRequestSchema;
exports.documentFileSchema = documentFileSchema;
exports.documentLinkedRecordSchema = documentLinkedRecordSchema;
exports.documentResponseSchema = documentResponseSchema;
exports.emailAttachmentSchema = emailAttachmentSchema;
exports.emailMessageSchema = emailMessageSchema;
exports.emailSchema = emailSchema;
exports.emailThreadDetailSchema = emailThreadDetailSchema;
exports.emailThreadSchema = emailThreadSchema;
exports.entityLinkCountsResponseSchema = entityLinkCountsResponseSchema;
exports.entityLinkEndpointSchema = entityLinkEndpointSchema;
exports.entityLinkMetadataSchema = entityLinkMetadataSchema;
exports.entityLinkReferenceSchema = entityLinkReferenceSchema;
exports.entityLinkTypeSchema = entityLinkTypeSchema;
exports.entityLinksResponseSchema = entityLinksResponseSchema;
exports.eventColorSchema = eventColorSchema;
exports.eventResponseSchema = eventResponseSchema;
exports.eventTypeSchema = eventTypeSchema;
exports.failureReportEventSchema = failureReportEventSchema;
exports.failureReportResponseSchema = failureReportResponseSchema;
exports.failureStatusOptions = failureStatusOptions;
exports.faqResponseSchema = faqResponseSchema;
exports.finalizePollSchema = finalizePollSchema;
exports.forgotPasswordSchema = forgotPasswordSchema;
exports.getEntityLinkCountsQuerySchema = getEntityLinkCountsQuerySchema;
exports.getEntityLinksQuerySchema = getEntityLinksQuerySchema;
exports.getOrgBuildingsQuerySchema = getOrgBuildingsQuerySchema;
exports.getOrgMembersQuerySchema = getOrgMembersQuerySchema;
exports.getRepBuildingsParamsSchema = getRepBuildingsParamsSchema;
exports.getRepUsersParamsSchema = getRepUsersParamsSchema;
exports.getTransactionCategoriesQuerySchema = getTransactionCategoriesQuerySchema;
exports.inviteOrgMemberSchema = inviteOrgMemberSchema;
exports.inviteOwnerSchema = inviteOwnerSchema;
exports.joinBuildingWithOtpSchema = joinBuildingWithOtpSchema;
exports.linkableEntityTypeSchema = linkableEntityTypeSchema;
exports.listArchivedResponseSchema = listArchivedResponseSchema;
exports.loginSchema = loginSchema;
exports.maintenanceFinancedBySchema = maintenanceFinancedBySchema;
exports.maintenanceLogEventSchema = maintenanceLogEventSchema;
exports.maintenanceLogResponseSchema = maintenanceLogResponseSchema;
exports.maintenanceStatusOptions = maintenanceStatusOptions;
exports.messageResponseSchema = messageResponseSchema;
exports.messagesListResponseSchema = messagesListResponseSchema;
exports.moneyStringSchema = moneyStringSchema;
exports.moveBoardCardSchema = moveBoardCardSchema;
exports.multipartArray = multipartArray;
exports.multipartBoolean = multipartBoolean;
exports.noticeEventSchema = noticeEventSchema;
exports.noticeResponseSchema = noticeResponseSchema;
exports.notificationPreferenceCategorySchema = notificationPreferenceCategorySchema;
exports.notificationPreferenceItemSchema = notificationPreferenceItemSchema;
exports.notificationResponseSchema = notificationResponseSchema;
exports.optionalDateTimeSchema = optionalDateTimeSchema;
exports.ownerResponseSchema = ownerResponseSchema;
exports.paginatedBuildingsResponseSchema = paginatedBuildingsResponseSchema;
exports.paginatedDocumentsResponseSchema = paginatedDocumentsResponseSchema;
exports.paginatedEmailThreadsResponseSchema = paginatedEmailThreadsResponseSchema;
exports.paginatedEventsResponseSchema = paginatedEventsResponseSchema;
exports.paginatedFailureReportsResponseSchema = paginatedFailureReportsResponseSchema;
exports.paginatedMaintenanceLogsResponseSchema = paginatedMaintenanceLogsResponseSchema;
exports.paginatedNoticesResponseSchema = paginatedNoticesResponseSchema;
exports.paginatedPollsResponseSchema = paginatedPollsResponseSchema;
exports.paginatedRepBuildingsResponseSchema = paginatedRepBuildingsResponseSchema;
exports.paginatedRepUsersResponseSchema = paginatedRepUsersResponseSchema;
exports.paginatedResponseSchema = paginatedResponseSchema;
exports.paginatedUnitsResponseSchema = paginatedUnitsResponseSchema;
exports.paginationParamsSchema = paginationParamsSchema;
exports.passwordSchema = passwordSchema;
exports.permissionFieldsSchema = permissionFieldsSchema;
exports.permissionsResponseSchema = permissionsResponseSchema;
exports.pollEligibleVoterSchema = pollEligibleVoterSchema;
exports.pollEligibleVotersResponseSchema = pollEligibleVotersResponseSchema;
exports.pollResponseSchema = pollResponseSchema;
exports.pollResultsSchema = pollResultsSchema;
exports.pollTypeSchema = pollTypeSchema;
exports.pollVotersResponseSchema = pollVotersResponseSchema;
exports.priorityOptions = priorityOptions;
exports.recordOfflineVotesSchema = recordOfflineVotesSchema;
exports.recurrenceTypeSchema = recurrenceTypeSchema;
exports.registerSchema = registerSchema;
exports.reorderBoardColumnsSchema = reorderBoardColumnsSchema;
exports.reorderFaqsSchema = reorderFaqsSchema;
exports.repBuildingActivitySchema = repBuildingActivitySchema;
exports.repBuildingItemSchema = repBuildingItemSchema;
exports.repDashboardSummaryResponseSchema = repDashboardSummaryResponseSchema;
exports.repRecentActivitySchema = repRecentActivitySchema;
exports.repRecentActivityTypeSchema = repRecentActivityTypeSchema;
exports.repUserBuildingSchema = repUserBuildingSchema;
exports.repUserItemSchema = repUserItemSchema;
exports.replyEmailThreadRequestSchema = replyEmailThreadRequestSchema;
exports.resetPasswordSchema = resetPasswordSchema;
exports.roleTypeSchema = roleTypeSchema;
exports.searchUsersQuerySchema = searchUsersQuerySchema;
exports.sendMessageSchema = sendMessageSchema;
exports.signedMoneyStringSchema = signedMoneyStringSchema;
exports.strongPasswordSchema = strongPasswordSchema;
exports.timeSchema = timeSchema;
exports.unitKindSchema = unitKindSchema;
exports.unitRoleSchema = unitRoleSchema;
exports.unitSchema = unitSchema;
exports.unitUserSchema = unitUserSchema;
exports.unreadCountResponseSchema = unreadCountResponseSchema;
exports.updateBoardCardSchema = updateBoardCardSchema;
exports.updateBoardColumnSchema = updateBoardColumnSchema;
exports.updateBoardSchema = updateBoardSchema;
exports.updateBuildingSchema = updateBuildingSchema;
exports.updateBuildingSettingsSchema = updateBuildingSettingsSchema;
exports.updateBusinessPartnerSchema = updateBusinessPartnerSchema;
exports.updateConversationSchema = updateConversationSchema;
exports.updateDocumentSchema = updateDocumentSchema;
exports.updateEventSchema = updateEventSchema;
exports.updateExpenseSchema = updateExpenseSchema;
exports.updateFailureReportRequestSchema = updateFailureReportRequestSchema;
exports.updateFailureReportSchema = updateFailureReportSchema;
exports.updateFaqSchema = updateFaqSchema;
exports.updateIncomeSchema = updateIncomeSchema;
exports.updateMaintenanceLogRequestSchema = updateMaintenanceLogRequestSchema;
exports.updateMaintenanceLogSchema = updateMaintenanceLogSchema;
exports.updateNoticeRequestSchema = updateNoticeRequestSchema;
exports.updateNoticeSchema = updateNoticeSchema;
exports.updateOrgMemberRoleSchema = updateOrgMemberRoleSchema;
exports.updateOrganizationSchema = updateOrganizationSchema;
exports.updateOwnerSchema = updateOwnerSchema;
exports.updatePasswordSchema = updatePasswordSchema;
exports.updatePollRequestSchema = updatePollRequestSchema;
exports.updatePollSchema = updatePollSchema;
exports.updateTransactionCategorySchema = updateTransactionCategorySchema;
exports.updateUnitSchema = updateUnitSchema;
exports.updateUserBuildingRoleSchema = updateUserBuildingRoleSchema;
exports.userEntitySchema = userEntitySchema;
exports.uuidSchema = uuidSchema;
exports.verifyOtpSchema = verifyOtpSchema;
exports.votePollSchema = votePollSchema;
//# sourceMappingURL=chunk-CIRH6THT.cjs.map
//# sourceMappingURL=chunk-CIRH6THT.cjs.map