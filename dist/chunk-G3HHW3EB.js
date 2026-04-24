import { optionalIbanSchema } from './chunk-WK7VOCOE.js';
import { ApartmentRole, OrgRole, OrgType, BuildingRole, PricuvaRefMode, FundsSource, FailureUnitType, FailureLocationType, Priority, TransactionType, Role, PlatformRole, BuildingStatus, NotificationType } from './chunk-YXJBZCY5.js';
import { BACKEND_ERROR_CODES } from './chunk-E45VMJJC.js';
import { z } from 'zod';

var apiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.union([z.string(), z.array(z.string())]),
  timestamp: z.string(),
  path: z.string()
});
var apiErrorResponseSchema = apiErrorSchema.extend({
  code: z.enum(Object.values(BACKEND_ERROR_CODES)).optional().describe(
    "Canonical error code from `@flatie/shared/errors` (`BACKEND_ERROR_CODES`). Present when the backend raised a `DomainException`; absent for generic HTTP errors (network failures, unhandled exceptions, validation-pipe rejections)."
  )
}).describe("Standard error envelope returned by the Flatie backend on 4xx and 5xx responses.");
var emailSchema = z.string().email("Invalid email address");
var passwordSchema = z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must not exceed 100 characters");
var strongPasswordSchema = passwordSchema.regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number");
var loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional().default(false)
});
var registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
  email: emailSchema,
  password: strongPasswordSchema,
  passwordConfirmation: z.string(),
  agreedToTermsAndConditions: z.boolean().refine((data) => data, {
    message: "You must accept the terms and conditions"
  })
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
});
var forgotPasswordSchema = z.object({
  email: emailSchema
});
var resetPasswordSchema = z.object({
  email: emailSchema,
  token: z.string().min(1, "Token is required"),
  password: strongPasswordSchema,
  passwordConfirmation: z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
});
var verifyOtpSchema = z.object({
  email: emailSchema,
  otp: z.string().min(4, "OTP must be 4 digits").max(4, "OTP must be 4 digits")
});
var updatePasswordSchema = z.object({
  currentPassword: passwordSchema,
  newPassword: strongPasswordSchema,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
var uuidSchema = z.string().uuid();
var dateTimeSchema = z.string().datetime();
var optionalDateTimeSchema = z.string().datetime().nullable().optional();
var baseEntitySchema = z.object({
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
var permissionFieldsSchema = z.object({
  canEdit: z.boolean(),
  canDelete: z.boolean()
});
var dateRangeParamsSchema = z.object({
  fromDate: z.string().optional(),
  toDate: z.string().optional()
});
var dateRangeWithValidationSchema = z.object({
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional()
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
var apartmentRoleSchema = z.enum([ApartmentRole.OWNER, ApartmentRole.TENANT]).describe("`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.");
var apartmentUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe("Display name of the apartment member."),
  email: z.string().describe("Contact email of the apartment member."),
  image: z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: apartmentRoleSchema.describe(
    "Relationship of this user to the apartment (`OWNER` or `TENANT`)."
  ),
  joinedAt: z.string().describe("ISO-8601 timestamp when the user was attached to the apartment."),
  ownershipPercentage: z.number().nullable().optional().describe(
    "Share of the apartment held by this user, 0\u2013100. Null for tenants and for owners whose share has not been recorded."
  )
});
var apartmentSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  number: z.string().describe('Apartment identifier as used by residents and mail (e.g. "12A", "3.5").'),
  paymentRefCode: z.string().nullable().optional().describe(
    "Apartment code used as the middle segment of the HR01 poziv-na-broj in `apartment` ref mode. Auto-assigned on create (sequential per building, zero-padded e.g. `001`); editable. Null is allowed on legacy rows that pre-date the column."
  ),
  floor: z.string().nullable().optional().describe(
    'Floor label where the apartment is located (e.g. "1", "Ground", "Basement"); null when not recorded.'
  ),
  area: z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  surnameOnDoor: z.string().nullable().optional().describe(
    "Surname displayed on the apartment door, used for deliveries; null when not provided."
  ),
  surnameOnIntercom: z.string().nullable().optional().describe("Surname listed on the building intercom; null when not provided."),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(apartmentUserSchema).describe("Owners and tenants currently attached to the apartment."),
  userCount: z.number().describe("Total number of users linked to this apartment."),
  canEdit: z.boolean().describe("True when the calling user may edit this apartment\u2019s metadata."),
  canDelete: z.boolean().describe("True when the calling user may delete this apartment.")
});
var paginatedApartmentsResponseSchema = z.looseObject({
  data: z.array(apartmentSchema).describe("Apartments on the current page, ordered as requested."),
  count: z.number().optional().describe("Total number of apartments matching the query across all pages."),
  page: z.number().optional().describe("Current page number, 1-indexed."),
  totalPages: z.number().describe("Total number of pages available for this query."),
  limit: z.number().describe("Maximum number of items returned per page."),
  hasNextPage: z.boolean().optional().describe("True when at least one more page follows the current one."),
  hasPreviousPage: z.boolean().optional().describe("True when at least one page precedes the current one.")
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
var sendMessageSchema = z.object({
  content: z.string().min(CHAT_LIMITS.MESSAGE_MIN, "Message is required").max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`).describe("Plain-text message body, 1\u20135000 characters. Trimmed and stored verbatim.")
});
var createConversationSchema = z.object({
  type: z.enum([ConversationType.DIRECT, ConversationType.GROUP]).describe("`direct` for a one-to-one thread, `group` for a named multi-user conversation."),
  participantIds: z.array(uuidSchema).min(CHAT_LIMITS.PARTICIPANTS_MIN, "At least one participant is required").max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`).describe(
    "UUIDs of the other participants. The caller is added automatically; direct conversations must have exactly one other participant."
  ),
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional().describe("Group display name, max 100 chars. Ignored for direct conversations.")
});
var updateConversationSchema = z.object({
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional().describe("New group name, max 100 chars. Omit to leave the name unchanged."),
  addParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional().describe("UUIDs of users to add to the conversation. Omit or pass [] to add no one."),
  removeParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional().describe("UUIDs of users to remove from the conversation. Omit or pass [] to remove no one.")
});
var cursorQuerySchema = z.object({
  cursor: z.string().optional().describe(
    "Opaque pagination cursor returned by a previous response. Omit to fetch the first page."
  )
});
var FAQ_LIMITS = {
  QUESTION_MIN: 1,
  QUESTION_MAX: 500,
  ANSWER_MIN: 1,
  ANSWER_MAX: 2e3
};
var createFaqSchema = z.object({
  question: z.string().min(FAQ_LIMITS.QUESTION_MIN, "Question is required").max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`).describe("FAQ question displayed to residents, 1\u2013500 chars."),
  answer: z.string().min(FAQ_LIMITS.ANSWER_MIN, "Answer is required").max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`).describe("FAQ answer body, up to 2000 chars.")
});
var updateFaqSchema = z.object({
  question: z.string().min(FAQ_LIMITS.QUESTION_MIN).max(FAQ_LIMITS.QUESTION_MAX).optional().describe("Revised question, 1\u2013500 chars."),
  answer: z.string().min(FAQ_LIMITS.ANSWER_MIN).max(FAQ_LIMITS.ANSWER_MAX).optional().describe("Revised answer, up to 2000 chars.")
});
var reorderFaqsSchema = z.object({
  orderedIds: z.array(uuidSchema).min(1, "At least one FAQ ID is required").describe(
    "Full list of FAQ UUIDs in their new display order. Must include every FAQ in the target building."
  )
});
var copyFaqsSchema = z.object({
  sourceBuildingId: uuidSchema.describe(
    "UUID of the building whose FAQs should be copied into the target building."
  )
});
var ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11
};
var orgRoleSchema = z.enum([OrgRole.ORG_ADMIN, OrgRole.SUPERVISOR, OrgRole.REFERENT, OrgRole.OPERATIVE]).describe(
  "Organization role, from highest to lowest authority: `ORG_ADMIN` (manages the org), `SUPERVISOR` (oversees operations), `REFERENT` (day-to-day member interactions), `OPERATIVE` (field work)."
);
var createOrganizationSchema = z.object({
  name: z.string().min(ORGANIZATION_LIMITS.NAME_MIN, "Name is required").max(
    ORGANIZATION_LIMITS.NAME_MAX,
    `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`
  ).describe("Legal or display name of the organization, 1\u2013200 chars."),
  type: z.enum([OrgType.MANAGEMENT_FIRM, OrgType.PLATFORM]).describe(
    "`MANAGEMENT_FIRM` for external building-management firms, `PLATFORM` for the Flatie platform organization itself."
  ),
  oib: z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`).optional().describe(
    "Croatian OIB (tax identification number), 11 digits. Required for firms but optional at creation."
  ),
  contactEmail: z.string().email("Invalid email").optional().describe("Public contact email for the organization."),
  contactPhone: z.string().optional().describe("Public contact phone number.")
});
var updateOrganizationSchema = z.object({
  name: z.string().min(ORGANIZATION_LIMITS.NAME_MIN).max(ORGANIZATION_LIMITS.NAME_MAX).optional().describe("Revised organization name, 1\u2013200 chars."),
  contactEmail: z.string().email("Invalid email").optional().describe("Revised contact email."),
  contactPhone: z.string().optional().describe("Revised contact phone number."),
  oib: z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH).optional().describe("Revised Croatian OIB (tax identification number), 11 digits.")
});
var addOrgMemberSchema = z.object({
  userId: uuidSchema.describe("UUID of the existing user to add to the organization."),
  orgRole: orgRoleSchema.describe("Organization role to assign to the new member.")
});
var updateOrgMemberRoleSchema = z.object({
  orgRole: orgRoleSchema.describe("New organization role for the member.")
});
var inviteOrgMemberSchema = z.object({
  email: z.string().email("Invalid email").describe("Email address of the invitee; a signup/join link is sent here."),
  orgRole: orgRoleSchema.describe("Organization role the invitee will receive when they accept."),
  message: z.string().optional().describe("Optional custom message included in the invitation email.")
});
var assignOrgBuildingSchema = z.object({
  buildingId: uuidSchema.describe("UUID of the building to assign to this organization."),
  contractStart: z.string().optional().describe("Contract start date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts."),
  contractEnd: z.string().optional().describe("Contract end date (ISO-8601 date, `YYYY-MM-DD`). Omit for open-ended contracts.")
});
var assignOrgMemberBuildingSchema = z.object({
  buildingId: uuidSchema.describe("UUID of the building the member should be assigned to work on.")
});
var searchUsersQuerySchema = z.object({
  search: z.string().optional().describe("Substring to match against user name or email. Omit to return unfiltered results.")
});
var getOrgBuildingsQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0).describe("Zero-based offset into the result set. Defaults to 0."),
  limit: z.coerce.number().min(1).optional().default(10).describe("Maximum number of items to return per page. Defaults to 10."),
  search: z.string().optional().describe("Substring matched against building name or address."),
  sortBy: z.enum(["name", "address", "createdAt"]).optional().describe("Column to sort results by."),
  sortOrder: z.enum(["asc", "desc"]).optional().describe("Sort direction: `asc` for ascending, `desc` for descending.")
});
var getOrgMembersQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0).describe("Zero-based offset into the result set. Defaults to 0."),
  limit: z.coerce.number().min(1).optional().default(10).describe("Maximum number of items to return per page. Defaults to 10."),
  search: z.string().optional().describe("Substring matched against member name or email."),
  sortBy: z.enum(["userName", "orgRole", "createdAt"]).optional().describe("Column to sort results by."),
  sortOrder: z.enum(["asc", "desc"]).optional().describe("Sort direction: `asc` for ascending, `desc` for descending.")
});
function multipartArray(itemSchema) {
  return z.preprocess((value) => {
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
  }, z.array(itemSchema));
}
function multipartBoolean() {
  return z.preprocess((value) => {
    if (typeof value === "boolean") return value;
    if (value === "true") return true;
    if (value === "false" || value === "" || value == null) return false;
    return value;
  }, z.boolean());
}

// src/schemas/entities/building.schema.ts
var BUILDING_TYPES = ["RESIDENTIAL", "COMMERCIAL", "RESIDENTIAL_COMMERCIAL"];
var buildingTypeSchema = z.enum(BUILDING_TYPES).describe(
  "Usage of the building: `RESIDENTIAL` (homes only), `COMMERCIAL` (business only), or `RESIDENTIAL_COMMERCIAL` (mixed use)."
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
var createBuildingSchema = z.object({
  name: z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`).describe("Display name of the building shown throughout the UI."),
  address: z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ).describe("Full postal address including street and city."),
  streetId: uuidSchema.describe(
    "UUID of the street record the building belongs to; used to normalise address data."
  ),
  houseNumber: z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, "House number is required").max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).describe('Street/house number including any suffix (e.g. "12A", "5B").'),
  type: buildingTypeSchema,
  totalUnits: z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  ).describe("Total number of individual units (apartments, garages, storage)."),
  isStratified: multipartBoolean().optional().describe(
    "True when the building is stratified (each unit has its own title deed). Defaults to false when omitted."
  ),
  role: z.enum([
    BuildingRole.OWNER_REPRESENTATIVE,
    BuildingRole.DEPUTY_REPRESENTATIVE,
    BuildingRole.CO_OWNER
  ]).optional().describe(
    "Role the creating user should claim for themselves in the new building; omitted creates the building without assigning the caller a role."
  ),
  iban: optionalIbanSchema,
  oib: z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable().describe(
    "Croatian tax ID (OIB) of the building (Zajednica suvlasnika). Used as the payee OIB on generated uplatnicas."
  ),
  monthlyFeePerSqm: z.coerce.number().nonnegative().optional().describe(
    "Monthly fund contribution rate in EUR per m\xB2 of owned floor area. Used to derive each co-owner\u2019s expected pri\u010Duva from their apartment/garage/storage area."
  ),
  billingBuildingCode: z.string().trim().min(1).max(22).optional().describe(
    "Short code identifying this building in HR01 poziv-na-broj references. Forms the first segment of `{billingBuildingCode}-{paymentRefCode}-{YYYYMM}`. Independent of the street house number."
  )
});
var updateBuildingSchema = z.object({
  name: z.string().min(BUILDING_LIMITS.NAME_MIN).max(BUILDING_LIMITS.NAME_MAX).optional().describe("New display name of the building."),
  address: z.string().min(BUILDING_LIMITS.ADDRESS_MIN).max(BUILDING_LIMITS.ADDRESS_MAX).optional().describe("New full postal address."),
  type: buildingTypeSchema.optional(),
  houseNumber: z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN).max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).optional().describe('Street/house number (e.g. "12A"). Used as first HR01 reference segment.'),
  totalUnits: z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN).max(BUILDING_LIMITS.UNITS_MAX).optional().describe("Revised total unit count."),
  isStratified: multipartBoolean().optional().describe("Toggles whether the building is stratified (per-unit title deeds)."),
  removeHouseRulesFile: multipartBoolean().optional().describe(
    "When true, clears the existing house-rules attachment. Submit independently of `houseRulesFile` uploads."
  ),
  iban: optionalIbanSchema,
  oib: z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable().describe("Croatian tax ID (OIB) of the building. Pass null to clear."),
  monthlyFeePerSqm: z.coerce.number().nonnegative().optional().describe(
    "New monthly fund contribution rate in EUR per m\xB2. Pass a value to update, omit to leave unchanged."
  ),
  billingBuildingCode: z.string().trim().min(1).max(22).optional().nullable().describe(
    "New poziv-na-broj building identifier. Pass null to clear; omit to leave unchanged."
  ),
  fundsSource: z.enum([FundsSource.MANUAL, FundsSource.CAMT]).optional().describe(
    "Switches how the building's fund transactions are populated. `manual` (default) keeps the representative-facing add/edit flow; `camt` locks manual writes and only a platform admin can ingest CAMT.053 XML statements."
  ),
  pricuvaRefMode: z.enum([PricuvaRefMode.APARTMENT, PricuvaRefMode.OWNER]).optional().describe(
    "Selects whether the HR01 poziv-na-broj middle segment identifies the apartment (`apartment`, default) or the individual co-owner (`owner`). Changes how CAMT imports match payments to units/users."
  )
});
var joinBuildingWithOtpSchema = z.object({
  code: z.string().length(
    BUILDING_LIMITS.OTP_LENGTH,
    `OTP must be a ${BUILDING_LIMITS.OTP_LENGTH}-character code`
  ).regex(/^[A-Z0-9]{6}$/, "OTP must be a 6-character alphanumeric code").describe("Six-character alphanumeric invite code shared by a building representative.")
});
var updateUserBuildingRoleSchema = z.object({
  userId: uuidSchema.describe("UUID of the user whose building role is being updated."),
  roleType: z.enum([
    BuildingRole.OWNER_REPRESENTATIVE,
    BuildingRole.DEPUTY_REPRESENTATIVE,
    BuildingRole.CO_OWNER
  ]).optional().describe(
    "New building role for the user; omit to leave the role unchanged while updating other fields."
  ),
  buildingSurfacePercentage: z.coerce.number().min(0).max(100).optional().describe(
    "User\u2019s weighted share of the building surface, 0\u2013100. Used to compute vote weight for consensus polls."
  ),
  chatVisibleToCoOwners: z.boolean().optional().describe("Controls whether this user appears in chat directories visible to co-owners.")
});
var EVENT_TYPES = [
  "service",
  "inspection",
  "maintenance",
  "meeting",
  "discussion",
  "planned_works",
  "other"
];
var EVENT_COLORS = ["blue", "green", "red", "yellow", "purple", "orange", "gray"];
var EVENT_TYPE_COLOR_MAP = {
  service: "blue",
  inspection: "purple",
  maintenance: "orange",
  meeting: "green",
  discussion: "yellow",
  planned_works: "red",
  other: "gray"
};
var eventTypeSchema = z.enum(EVENT_TYPES).describe(
  "Kind of calendar event: `service` (routine service call), `inspection` (regulatory/safety check), `maintenance` (contractor work), `meeting` (residents gathering), `discussion` (informal), `planned_works` (scheduled project), `other` (miscellaneous)."
);
var eventColorSchema = z.enum(EVENT_COLORS).describe("Display colour used when rendering the event on the calendar.");
var timeSchema = z.object({
  hour: z.number().min(0).max(23).describe("Hour component in 24-hour format, 0\u201323."),
  minute: z.number().min(0).max(59).describe("Minute component, 0\u201359.")
});
var createEventSchema = z.object({
  buildingId: uuidSchema.describe("UUID of the building the event belongs to."),
  type: eventTypeSchema,
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters").describe("Short event title shown on the calendar, 1\u2013100 chars."),
  description: z.string().max(2e3, "Description must be at most 2000 characters").optional().describe("Free-text details about the event; omitted when the event is self-explanatory."),
  startDate: z.coerce.date({ error: "Start date is required" }).describe("Event start \u2014 accepts an ISO-8601 string or Date, stored as a timestamp."),
  endDate: z.coerce.date({ error: "End date is required" }).describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  color: eventColorSchema
});
var updateEventSchema = z.object({
  type: eventTypeSchema.optional(),
  title: z.string().min(1).max(100).optional().describe("Revised title, 1\u2013100 chars."),
  description: z.string().max(2e3).optional().describe("Revised description, max 2000 chars."),
  startDate: z.coerce.date().optional().describe("Revised start \u2014 accepts an ISO-8601 string or Date."),
  endDate: z.coerce.date().optional().describe("Revised end \u2014 accepts an ISO-8601 string or Date."),
  color: eventColorSchema.optional()
});
var FAILURE_REPORT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  COMMON_AREA_DESCRIPTION_MAX: 500
};
var failureReportEventSchema = z.object({
  startDate: z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: z.string().optional().describe("Event title; defaults to the failure report title when omitted."),
  description: z.string().optional().describe("Event description; defaults to the failure report description when omitted.")
});
function refineLocation(schema) {
  return schema.superRefine((data, ctx) => {
    if (data.locationType === FailureLocationType.COMMON_AREA) {
      if (!data.commonAreaDescription || data.commonAreaDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "commonAreaDescription is required when locationType is common_area",
          path: ["commonAreaDescription"]
        });
      }
    }
    if (data.locationType === FailureLocationType.OWN_UNIT) {
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
  z.object({
    title: z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN, "Title is required").max(
      FAILURE_REPORT_LIMITS.TITLE_MAX,
      `Title must be at most ${FAILURE_REPORT_LIMITS.TITLE_MAX} characters`
    ).describe("Short summary of the failure, 1\u2013100 chars."),
    description: z.string().min(1, "Description is required").max(
      FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`
    ).describe("Detailed description of the failure, up to 2000 chars."),
    isAnonymous: multipartBoolean().optional().describe(
      "When true, hides the reporter\u2019s identity from other residents. Defaults to false."
    ),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional().describe("`normal` for standard reports, `urgent` to flag immediate attention."),
    locationType: z.enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT]).optional().describe(
      "`common_area` for shared spaces (hallway, roof, etc.) or `own_unit` for a specific apartment/garage/storage unit."
    ),
    commonAreaDescription: z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Free-text location description. Required when `locationType` is `common_area`."),
    unitType: z.enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT]).optional().describe("Kind of unit when `locationType` is `own_unit`. Required in that case."),
    unitId: uuidSchema.optional().describe("UUID of the specific unit. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-uploaded files to attach to this report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "UUIDs of maintenance logs to associate with this report (e.g. related past work)."
    ),
    events: multipartArray(failureReportEventSchema).optional().describe("Calendar events to create alongside the report (inspections, scheduled fixes).")
  })
);
var updateFailureReportSchema = refineLocation(
  z.object({
    title: z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN).max(FAILURE_REPORT_LIMITS.TITLE_MAX).optional().describe("Revised report title, 1\u2013100 chars."),
    description: z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description, up to 2000 chars."),
    status: z.enum(["pending", "inProgress", "resolved"]).optional().describe(
      "Lifecycle status: `pending` (newly filed), `inProgress` (assigned work), `resolved` (closed out)."
    ),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional().describe("Revised priority: `normal` or `urgent`."),
    locationType: z.enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT]).optional().describe("Revised location classification: `common_area` or `own_unit`."),
    commonAreaDescription: z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Revised common-area description. Required when `locationType` is `common_area`."),
    unitType: z.enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT]).optional().describe("Revised unit kind. Required when `locationType` is `own_unit`."),
    unitId: uuidSchema.optional().describe("Revised unit UUID. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to add to the report."),
    removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "Full list of maintenance-log UUIDs to associate with the report (replaces existing links)."
    ),
    events: multipartArray(failureReportEventSchema).optional().describe("Full list of events for the report \u2014 replaces the existing event set.")
  })
);
var approveFailureReportSchema = z.object({
  approved: z.boolean().describe("True to approve the report for public visibility, false to reject.")
});
var garageRoleSchema = z.enum(["OWNER", "TENANT"]).describe("`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.");
var garageUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe("Display name of the garage member."),
  email: z.string().describe("Contact email of the garage member."),
  image: z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: garageRoleSchema.describe(
    "Relationship of this user to the garage (`OWNER` or `TENANT`)."
  ),
  joinedAt: z.string().describe("ISO-8601 timestamp when the user was attached to the garage."),
  ownershipPercentage: z.number().nullable().optional().describe(
    "Share of the garage held by this user, 0\u2013100. Null for tenants and owners whose share was not recorded."
  )
});
var garageSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string().describe('Garage identifier or name as shown to residents (e.g. "G-12").'),
  floor: z.string().nullable().optional().describe(
    'Floor label where the garage is located (e.g. "Basement", "-1"); null when not recorded.'
  ),
  area: z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(garageUserSchema).describe("Owners and tenants currently attached to the garage.")
});
var MAINTENANCE_FINANCED_BY = ["building_funds", "insurance", "co_owner"];
var maintenanceFinancedBySchema = z.enum(MAINTENANCE_FINANCED_BY).describe(
  "Funding source of the work: `building_funds` (paid from the common fund), `insurance` (covered by an insurance claim), or `co_owner` (paid directly by an individual co-owner)."
);
var MAINTENANCE_LOG_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  CONTRACTOR_MIN: 1,
  EVENTS_MIN: 1
};
var costSchema = z.preprocess(
  (value) => {
    if (typeof value === "number") return value.toString();
    if (typeof value === "string") return value.trim();
    return value;
  },
  z.string().regex(/^-?\d+(\.\d{1,2})?$/, "Cost must be a decimal with at most 2 decimal places")
);
var maintenanceLogEventSchema = z.object({
  id: uuidSchema.optional().describe(
    "UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted."
  ),
  startDate: z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: z.string().optional().describe("Event title; defaults to the maintenance-log title when omitted."),
  description: z.string().optional().describe("Event description; defaults to the maintenance-log description when omitted.")
});
var createMaintenanceLogSchema = z.object({
  title: z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN, "Title is required").max(
    MAINTENANCE_LOG_LIMITS.TITLE_MAX,
    `Title must be at most ${MAINTENANCE_LOG_LIMITS.TITLE_MAX} characters`
  ).describe("Short title of the maintenance work, 1\u2013100 chars."),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional().describe("Detailed description of the work performed, up to 2000 chars."),
  categoryId: uuidSchema.optional().describe("UUID of the expense category the cost should be booked under."),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, "Contractor is required").describe("Name of the contractor or vendor who performed the work."),
  cost: costSchema.describe(
    'Total cost as a decimal string with up to two decimal places (e.g. "250.50"). Numeric input is coerced to a string.'
  ),
  financedBy: maintenanceFinancedBySchema.optional().describe("Funding source; omit when unknown at the time of logging."),
  warranty: multipartBoolean().optional().describe("True when the work is covered by an active warranty."),
  events: multipartArray(maintenanceLogEventSchema).refine((events) => events.length >= MAINTENANCE_LOG_LIMITS.EVENTS_MIN, {
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
var updateMaintenanceLogSchema = z.object({
  title: z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN).max(MAINTENANCE_LOG_LIMITS.TITLE_MAX).optional().describe("Revised title, 1\u2013100 chars."),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description, up to 2000 chars."),
  categoryId: uuidSchema.optional().describe("Revised expense-category UUID."),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN).optional().describe("Revised contractor or vendor name."),
  cost: costSchema.optional().describe(
    'Revised total cost as a decimal string with up to two decimal places (e.g. "250.50").'
  ),
  financedBy: maintenanceFinancedBySchema.optional().describe("Revised funding source."),
  warranty: multipartBoolean().optional().describe("Toggles whether the work is under warranty."),
  events: multipartArray(maintenanceLogEventSchema).optional().describe(
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
var noticeEventSchema = z.object({
  id: uuidSchema.optional().describe(
    "UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted."
  ),
  startDate: z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: z.string().max(NOTICE_LIMITS.EVENT_TITLE_MAX, "Event title must be at most 100 characters").optional().describe("Event title, max 100 chars; defaults to the notice title when omitted."),
  description: z.string().optional().describe("Event description; defaults to the notice content when omitted.")
});
var createNoticeSchema = z.object({
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`).describe("Notice headline shown in listings, 1\u2013100 chars."),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
    NOTICE_LIMITS.CONTENT_MAX,
    `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`
  ).describe("Rich-text or plain-text body of the notice, up to 2000 chars."),
  isAnonymous: multipartBoolean().optional().describe("When true, hides the author\u2019s identity from other residents. Defaults to false."),
  pinned: multipartBoolean().optional().describe("When true, pins the notice to the top of the building feed."),
  events: multipartArray(noticeEventSchema).optional().default([]).describe("Calendar events to create alongside the notice (e.g. meeting on a given date)."),
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
var updateNoticeSchema = z.object({
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional().describe("Revised notice headline, 1\u2013100 chars."),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional().describe("Revised notice body, up to 2000 chars."),
  pinned: multipartBoolean().optional().describe("Toggles whether the notice is pinned to the top of the feed."),
  events: multipartArray(noticeEventSchema).optional().describe(
    "Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted."
  ),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the notice.")
});
var approveNoticeSchema = z.object({
  approved: z.boolean().describe("True to approve the notice for public visibility, false to reject.")
});
var POLL_TYPES = ["CONSENSUS", "COMMUNITY"];
var pollTypeSchema = z.enum(POLL_TYPES).describe(
  "`COMMUNITY` polls pass by simple majority of votes cast; `CONSENSUS` polls require an ownership-weighted approval threshold."
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
var createPollSchema = z.object({
  question: z.string().min(POLL_LIMITS.QUESTION_MIN, "Question must be at least 5 characters").max(
    POLL_LIMITS.QUESTION_MAX,
    `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`
  ).describe("Poll question presented to voters, 5\u2013250 chars."),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).pipe(z.array(z.string().min(1).max(POLL_LIMITS.OPTION_MAX))).describe(
    "Answer options in display order. Community polls: 2\u20134 options. Consensus polls: exactly 1 option (voters approve or abstain)."
  ),
  pollType: pollTypeSchema,
  deadline: z.coerce.date().optional().describe(
    "Cutoff date/time after which votes are rejected. Accepts an ISO-8601 string or Date. Omit for open-ended consensus polls."
  ),
  requiredConsensusPercentage: z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional().describe(
    "Ownership-weighted approval threshold (10\u2013100) required for consensus polls to pass. Ignored for community polls."
  ),
  consensusCategory: z.string().max(100).optional().describe(
    'Classification of the consensus decision (e.g. "fundUsage", "houseRules"); used to group and filter related polls.'
  ),
  legalBasis: z.string().max(100).optional().describe(
    "Reference to the legal article or statute that authorises the vote; shown alongside consensus results for audit."
  ),
  scopedUnitIds: multipartArray(uuidSchema).optional().describe(
    "UUIDs of units whose owners/tenants are eligible to vote. Omit for building-wide polls."
  ),
  scopedUserIds: multipartArray(uuidSchema).optional().describe("UUIDs of users explicitly added to the eligible-voter list. Omit when not used."),
  fileIds: multipartArray(uuidSchema).optional().default([]).describe("UUIDs of previously-uploaded supporting documents (proposals, receipts, specs).")
}).refine(
  (data) => {
    if (data.pollType === "COMMUNITY") {
      return data.options.length >= POLL_LIMITS.COMMUNITY_OPTIONS_MIN && data.options.length <= POLL_LIMITS.COMMUNITY_OPTIONS_MAX;
    }
    if (data.pollType === "CONSENSUS") {
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
    if (data.pollType === "CONSENSUS") {
      return data.requiredConsensusPercentage !== void 0 && data.requiredConsensusPercentage >= POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN && data.requiredConsensusPercentage <= POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX;
    }
    return true;
  },
  {
    message: "Consensus percentage must be between 10 and 100 for consensus polls",
    path: ["requiredConsensusPercentage"]
  }
);
var updatePollSchema = z.object({
  question: z.string().min(1).max(POLL_LIMITS.QUESTION_MAX).optional().describe("Revised poll question, up to 250 chars."),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).optional().describe("Replacement option list. Must still respect the community/consensus option counts."),
  pollType: pollTypeSchema.optional(),
  deadline: z.coerce.date().optional().describe("Revised deadline. Accepts an ISO-8601 string or Date."),
  requiredConsensusPercentage: z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional().describe("Revised ownership-weighted approval threshold (10\u2013100) for consensus polls."),
  status: z.enum(["active", "inactive", "ended"]).optional().describe(
    "Lifecycle override: `active` accepts votes, `inactive` pauses the poll, `ended` seals it."
  ),
  scopedUnitIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped unit UUIDs. Empty array clears scoping."),
  scopedUserIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped user UUIDs. Empty array clears explicit-user scoping."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded supporting documents to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the poll.")
});
var votePollSchema = z.object({
  selectedOptionIndex: z.number().int().min(0).describe("Zero-based index into the poll\u2019s `options` array identifying the chosen option.")
});
var finalizePollSchema = z.object({
  finalize: z.boolean().describe(
    "True to seal the poll and freeze its results; false is accepted as a no-op for legacy compatibility."
  )
});
var storageUnitRoleSchema = z.enum(["OWNER", "TENANT"]).describe("`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.");
var storageUnitUserSchema = z.looseObject({
  id: z.string(),
  name: z.string().describe("Display name of the storage-unit member."),
  email: z.string().describe("Contact email of the storage-unit member."),
  image: z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: storageUnitRoleSchema.describe(
    "Relationship of this user to the storage unit (`OWNER` or `TENANT`)."
  ),
  joinedAt: z.string().describe("ISO-8601 timestamp when the user was attached to the storage unit."),
  ownershipPercentage: z.number().nullable().optional().describe(
    "Share of the storage unit held by this user, 0\u2013100. Null for tenants and owners whose share was not recorded."
  )
});
var storageUnitSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string().describe('Storage-unit identifier or name as shown to residents (e.g. "S-04").'),
  floor: z.string().nullable().optional().describe(
    'Floor label where the storage unit is located (e.g. "Basement", "-1"); null when not recorded.'
  ),
  area: z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(storageUnitUserSchema).describe("Owners and tenants currently attached to the storage unit.")
});
var TRANSACTION_CATEGORY_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  SEARCH_MAX: 200
};
var createTransactionCategorySchema = z.object({
  name: z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN, "Name is required").max(
    TRANSACTION_CATEGORY_LIMITS.NAME_MAX,
    `Name must be at most ${TRANSACTION_CATEGORY_LIMITS.NAME_MAX} characters`
  ).describe('Human-readable category name (e.g. "Cleaning", "Water utility"), 1\u2013100 chars.'),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).describe(
    "`INCOME` for categories that receive money into the fund; `EXPENSE` for categories that spend from it."
  )
});
var updateTransactionCategorySchema = z.object({
  name: z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN).max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX).optional().describe("Revised category name, 1\u2013100 chars.")
});
var getTransactionCategoriesQuerySchema = z.object({
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).optional().describe(
    "Filter results by category type. Omit to return both income and expense categories."
  ),
  search: z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional().describe("Case-insensitive substring matched against the category name.")
});
var copyTransactionCategoriesSchema = z.object({
  sourceBuildingId: uuidSchema.describe(
    "UUID of the building whose categories should be copied into the target building."
  )
});
var paginationParamsSchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).max(100).optional().default(10)
});
var paginatedResponseSchema = (itemSchema) => z.object({
  data: z.array(itemSchema).describe("Items for the current page."),
  count: z.number().describe("Total number of matching items across all pages."),
  page: z.number().describe("1-based current page index."),
  limit: z.number().describe("Page size (items per page, max 100)."),
  totalPages: z.number().describe("Total number of pages available for this query."),
  hasNextPage: z.boolean().describe("True when another page follows the current one."),
  hasPreviousPage: z.boolean().describe("True when a previous page exists.")
});
var roleTypeSchema = z.enum([
  ...Object.values(Role),
  ...Object.values(BuildingRole),
  ...Object.values(OrgRole),
  ...Object.values(PlatformRole)
]);
var permissionsResponseSchema = z.object({
  scope: z.enum(["building", "organization", "platform"]),
  permissions: z.array(z.string()),
  roleType: roleTypeSchema.optional(),
  buildingId: z.string().uuid().optional(),
  orgId: z.string().uuid().optional(),
  chatVisibleToCoOwners: z.boolean().optional()
});

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
var messageResponseSchema = z.object({
  message: z.string().describe(
    'Human-readable confirmation that the action completed successfully (e.g., "Notice approved").'
  )
});
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
var archiveTypeSchema = z.enum(ARCHIVE_TYPES).describe("Name of the archived entity kind; must match a key in the backend archive registry.");
var archivedItemSchema = z.looseObject({
  id: z.string().uuid().describe("UUID of the archived row within its source table."),
  type: archiveTypeSchema,
  label: z.string().describe("Human-readable label for the archived row (e.g. apartment number, notice title)."),
  buildingId: z.string().uuid().nullable().describe(
    "UUID of the building the row belongs to; null for global entities like organizations."
  ),
  archivedAt: z.string().describe("ISO-8601 timestamp when the row was archived."),
  archivedBy: z.string().uuid().nullable().describe(
    "UUID of the user who archived the row; null when the original actor has been deleted."
  ),
  archivedByName: z.string().nullable().describe("Display name of the archiving user; null when unavailable."),
  daysUntilPurge: z.number().int().describe(
    "Remaining days before the automated 30-day purge removes the row; 0 means the TTL has elapsed."
  )
});
var listArchivedResponseSchema = z.object({
  items: z.array(archivedItemSchema).describe("Archived rows across all registered archive types, sorted by archivedAt desc.")
});
var buildingStatusSchema = z.enum(Object.values(BuildingStatus)).describe(
  "Building lifecycle status \u2014 reflects where the building is in the platform onboarding pipeline (pending approval, active, rejected, etc.)."
);
var buildingManagerSchema = z.looseObject({
  name: z.string().describe("Display name of the assigned management-firm contact."),
  email: z.string().describe("Contact email for the assigned manager.")
}).describe("Summary of the building\u2019s assigned management-firm contact.");
var buildingRepresentativeSchema = z.looseObject({
  id: z.string().describe("UUID of the user who holds the representative role."),
  name: z.string().describe("Representative display name."),
  email: z.string().describe("Representative contact email."),
  phone: z.string().optional().nullable().describe("Contact phone in E.164 format, or null when the representative has not set one.")
}).describe("Building representative (owner or deputy) nested inside building detail responses.");
var buildingFundsSchema = z.looseObject({
  currentBalance: z.string().describe(
    'Current building-fund balance, serialized as a decimal string (e.g. "27820.54") to preserve precision from the numeric column.'
  ),
  currency: z.string().describe('ISO-4217-ish currency symbol or code displayed alongside the balance (e.g. "\u20AC").')
}).describe("Summary of the building\u2019s current fund balance and currency.");
var buildingResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string().describe("Building display name."),
  address: z.string().describe("Full postal address of the building."),
  coverImage: z.string().optional().nullable().describe("Absolute URL of the cover photo, or null when no cover image is set."),
  type: buildingTypeSchema.describe(
    "Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`."
  ),
  status: buildingStatusSchema.optional().describe(
    "Platform onboarding status (`pending`, `active`, `rejected`). Optional on list responses where all buildings returned are known-active."
  ),
  totalUnits: z.number().describe("Declared number of individual units (apartments, garages, storage units)."),
  isStratified: z.boolean().describe(
    "True when the building is stratified (each unit has its own title deed), affecting voting weight calculations."
  ),
  houseRulesFileUrl: z.string().nullable().optional().describe("Absolute URL to the uploaded house-rules PDF, or null if none has been uploaded."),
  createdBy: z.string().uuid().optional().nullable().describe("UUID of the user who registered the building on the platform."),
  createdAt: z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
});
var buildingDetailResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string().describe("Building display name."),
  address: z.string().describe("Full postal address of the building."),
  coverImage: z.string().nullable().optional().describe("Absolute URL of the cover photo, or null when no cover image is set."),
  type: buildingTypeSchema.describe(
    "Usage type: `RESIDENTIAL`, `COMMERCIAL`, or `RESIDENTIAL_COMMERCIAL`."
  ),
  totalUnits: z.number().describe("Declared number of individual units in the building."),
  isStratified: z.boolean().describe(
    "True when the building is stratified (per-unit title deeds), affecting voting weight."
  ),
  houseRulesFileUrl: z.string().nullable().optional().describe("Absolute URL to the uploaded house-rules PDF, or null when none has been uploaded."),
  numberOfFloors: z.number().nullable().optional().describe("Floor count above ground, or null when the information is not set."),
  description: z.string().nullable().optional().describe("Free-form description shown on the building page; null when not provided."),
  latitude: z.number().nullable().optional().describe(
    "Geographic latitude in decimal degrees (WGS 84); null when geocoding not performed."
  ),
  longitude: z.number().nullable().optional().describe(
    "Geographic longitude in decimal degrees (WGS 84); null when geocoding not performed."
  ),
  createdBy: z.string().describe("UUID of the user who registered the building."),
  createdAt: z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  manager: buildingManagerSchema.nullable().optional().describe(
    "Assigned management-firm contact, or null when the building has no manager assigned."
  ),
  funds: buildingFundsSchema.nullable().optional().describe("Current fund balance summary, or null when funds have not been initialised."),
  iban: z.string().nullable().optional().describe(
    "IBAN of the building fund bank account, or null when unset. Required on the building before a CAMT.053 import can match statements to this building."
  ),
  oib: z.string().nullable().optional().describe(
    "Croatian tax ID (OIB) of the building (Zajednica suvlasnika), or null when unset. Used as the payee OIB on generated uplatnicas."
  ),
  houseNumber: z.string().nullable().optional().describe(
    "Street/house number as stored on the building row. Address data only \u2014 the HR01 reference uses `billingBuildingCode`."
  ),
  fundsSource: z.enum([FundsSource.MANUAL, FundsSource.CAMT]).optional().describe(
    "Current funding-entry mode for this building. `manual` = representatives add income/expense through the UI; `camt` = platform admin ingests CAMT.053 XML statements and manual writes are blocked."
  ),
  monthlyFeePerSqm: z.number().nullable().optional().describe("Monthly pri\u010Duva rate in EUR per m\xB2 of owned area. Null when not yet configured."),
  billingBuildingCode: z.string().nullable().optional().describe(
    "Building identifier used as the first segment of HR01 poziv-na-broj references. Null until the managing org assigns one."
  ),
  pricuvaRefMode: z.enum([PricuvaRefMode.APARTMENT, PricuvaRefMode.OWNER]).optional().describe(
    "Which middle-segment identifier the HR01 poziv-na-broj uses: `apartment` (per-apartment code) or `owner` (per-co-owner code)."
  ),
  ownerRepresentatives: z.array(buildingRepresentativeSchema).default([]).describe("Users with the owner-representative role for this building."),
  deputyRepresentatives: z.array(buildingRepresentativeSchema).default([]).describe("Users with the deputy-representative role, if any.")
});
var paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);
var commentResponseSchema = z.looseObject({
  id: z.string().uuid(),
  entityType: z.string().describe(
    "Type of entity this comment is attached to. One of `notice`, `failure_report`, `event`."
  ),
  entityId: z.string().describe("UUID of the entity (notice, failure report, or event) this comment belongs to."),
  userId: z.string().describe("UUID of the user who authored the comment."),
  userName: z.string().nullable().describe("Author display name. Null when the authoring user was deleted."),
  userImage: z.string().nullable().describe("Absolute URL of the author avatar, or null if the user has no profile image."),
  content: z.string().describe("Comment body text as entered by the user."),
  createdAt: z.string().describe("ISO-8601 timestamp when the comment was created."),
  updatedAt: z.string().describe("ISO-8601 timestamp of the last edit; equal to createdAt if never edited."),
  canEdit: z.boolean().describe("True when the calling user is allowed to edit this comment (author only)."),
  canDelete: z.boolean().describe(
    "True when the calling user is allowed to delete this comment (author or moderator)."
  )
});
var eventUserSchema = z.looseObject({
  id: z.string().describe("UUID of the user."),
  name: z.string().describe("User display name.")
}).describe("Minimal user reference embedded in event responses.");
var entityScheduleReferenceSchema = z.looseObject({
  id: z.string().describe("UUID of the parent entity (failure report, maintenance log, notice)."),
  // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
  // a free string to tolerate new entity types added backend-side.
  type: z.string().describe(
    "Kind of entity using this event as its schedule. One of `failure_report`, `maintenance_log`, `notice`."
  ),
  title: z.string().describe("Title of the parent entity for quick reference in the calendar.")
}).describe("Parent entity that attaches this event as its scheduled work window.");
var eventResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Event title displayed in the calendar."),
  type: z.string().describe(
    "Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`)."
  ),
  description: z.string().optional().nullable().describe("Free-form event description; null or absent when not provided."),
  startDate: z.string().describe("ISO-8601 timestamp when the event starts."),
  endDate: z.string().describe("ISO-8601 timestamp when the event ends."),
  color: z.string().describe(
    "Display color \u2014 one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`."
  ),
  buildingId: z.string().uuid().describe("UUID of the building this event is scheduled in."),
  recurrenceType: z.string().describe("Recurrence cadence (`none`, `weekly`, `biweekly`, `monthly`, `yearly`)."),
  subtype: z.string().nullable().optional().describe(
    "Free-form subtype qualifier (used for waste-collection subtypes like `mixed`, `bio`, `paper_cardboard`)."
  ),
  recurrenceEndDate: z.string().nullable().optional().describe(
    "ISO-8601 date after which the recurrence stops. Null for open-ended recurring events."
  ),
  isRecurrenceInstance: z.boolean().optional().describe(
    "True when this payload represents an expanded instance of a recurring parent (rather than the parent itself)."
  ),
  originalEventId: z.string().optional().describe(
    "For recurrence instances, the UUID of the recurring parent event; absent on standalone events."
  ),
  user: eventUserSchema.optional().describe("Creator of the event; omitted when the event is anonymous or seeded by the system."),
  isAnonymous: z.boolean().describe("True when the creator chose to hide their identity from other residents."),
  approved: z.boolean().describe("True when the event has been approved by a representative and is publicly visible."),
  canEdit: z.boolean().describe("True when the calling user is allowed to edit this event."),
  canDelete: z.boolean().describe("True when the calling user is allowed to delete this event."),
  canApprove: z.boolean().describe("True when the calling user is allowed to approve or reject this event."),
  onlineMeetingUrl: z.string().nullable().optional().describe("Optional join URL for online meetings; null for in-person events."),
  meetingMinutes: z.string().nullable().optional().describe(
    "Rich-text minutes captured during the meeting; null until the minute-taker submits them."
  ),
  minuteTakerId: z.string().nullable().optional().describe(
    "UUID of the user assigned to record minutes; null for events that do not require one."
  ),
  usedAsScheduleBy: z.array(entityScheduleReferenceSchema).optional().describe(
    "Entities (failure reports, maintenance logs, notices) that reference this event as their schedule; empty when none do."
  )
});
var paginatedEventsResponseSchema = paginatedResponseSchema(eventResponseSchema);
var commonStatusOptions = ["active", "completed", "cancelled"];
var approvalStatusOptions = ["pending", "approved", "rejected"];
var maintenanceStatusOptions = [
  "pending",
  "in_progress",
  "completed",
  "cancelled"
];
var failureStatusOptions = ["pending", "inProgress", "resolved"];
var priorityOptions = ["normal", "urgent"];
var CommonStatusSchema = z.enum(commonStatusOptions);
var ApprovalStatusSchema = z.enum(approvalStatusOptions);
var MaintenanceStatusSchema = z.enum(maintenanceStatusOptions);
var FailureStatusSchema = z.enum(failureStatusOptions);
var PrioritySchema = z.enum(priorityOptions);
var nestedFileSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Human-readable file name displayed in the UI."),
  documentUrl: z.string().optional().nullable().describe(
    "Absolute URL to download or preview the file. Null/absent when the underlying object has been removed from storage."
  )
}).describe("Lightweight reference to a file attached to a parent entity (notice, report, etc.).");
var nestedEventSchema = z.looseObject({
  id: z.string(),
  title: z.string().describe("Event title as it appears in the calendar."),
  type: z.string().optional().describe(
    "Event type (`service`, `inspection`, `maintenance`, `meeting`, `discussion`, `planned_works`, `waste_collection`, `other`)."
  ),
  description: z.string().nullable().optional().describe("Free-form event description; null when no description was provided."),
  startDate: z.string().describe("ISO-8601 timestamp when the event starts."),
  endDate: z.string().describe("ISO-8601 timestamp when the event ends."),
  color: z.string().optional().describe(
    "Calendar display color \u2014 one of `blue`, `green`, `red`, `yellow`, `purple`, `orange`, `gray`."
  ),
  userId: z.string().nullable().optional().describe("UUID of the user who created the event; null for system-scheduled events."),
  buildingId: z.string().optional().describe("UUID of the building the event belongs to."),
  createdAt: z.string().optional().describe("ISO-8601 timestamp when the event was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
}).describe(
  "Nested event reference embedded inside notices, failure reports and maintenance logs."
);
var pollReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  question: z.string().describe("Poll question text shown to voters."),
  pollType: z.string().describe("`COMMUNITY` for majority polls, `CONSENSUS` for ownership-weighted polls."),
  deadline: z.string().optional().nullable().describe(
    "ISO-8601 datetime after which votes are rejected. Null for open-ended consensus polls."
  )
}).describe("Lightweight poll reference embedded in other entities (failure reports, logs).");

// src/schemas/responses/failure-reports.ts
var maintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Maintenance log title for quick UI display."),
  contractor: z.string().describe("Contractor or vendor who performed the work."),
  cost: z.number().optional().nullable().describe("Total cost in the building\u2019s currency; null when the cost was not recorded."),
  financedBy: maintenanceFinancedBySchema.optional().nullable().describe(
    "Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`)."
  ),
  warranty: z.boolean().optional().nullable().describe(
    "True when the work is covered by an active warranty. Null when the warranty status was not captured."
  )
}).describe(
  "Lightweight maintenance-log reference embedded in failure report responses (link to the follow-up work record)."
);
var failureReportResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building the report was filed against."),
  title: z.string().describe("Short summary of the reported failure."),
  description: z.string().optional().nullable().describe("Detailed description of the failure; null when the reporter left it blank."),
  files: z.array(nestedFileSchema).default([]).describe("Attached photos or documents supporting the report; empty array when none."),
  submittedBy: z.string().uuid().nullable().describe(
    "UUID of the reporting user. Null when the reporting user has been deleted from the platform."
  ),
  submittedByName: z.string().optional().nullable().describe(
    "Reporter display name. Null when `isAnonymous` is true or the user has been deleted."
  ),
  status: FailureStatusSchema.describe(
    "Lifecycle status: `pending` (newly filed), `inProgress` (assigned work), `resolved` (closed out)."
  ),
  approved: z.boolean().describe("True when a representative has approved the report for public visibility."),
  isAnonymous: z.boolean().optional().default(false).describe("True when the reporter opted to hide their identity from other residents."),
  priority: PrioritySchema.optional().nullable().describe(
    "`normal` for standard reports, `urgent` to flag immediate attention. Null when unset."
  ),
  createdAt: z.string().describe("ISO-8601 timestamp when the report was filed."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  canEdit: z.boolean().describe("True when the calling user is allowed to edit this report."),
  canDelete: z.boolean().describe("True when the calling user is allowed to delete this report."),
  canApprove: z.boolean().describe("True when the calling user may approve or reject the report."),
  canStatus: z.boolean().describe(
    "True when the calling user may change the lifecycle status (e.g. mark as in progress or resolved)."
  ),
  locationType: z.string().optional().nullable().describe("`common_area` or `own_unit`. Null when the location has not been classified."),
  commonAreaDescription: z.string().optional().nullable().describe("Free-text location when `locationType` is `common_area`; null otherwise."),
  unitType: z.string().optional().nullable().describe(
    "Kind of unit when `locationType` is `own_unit` (`apartment`, `garage`, `storage_unit`); null otherwise."
  ),
  unitId: z.string().uuid().optional().nullable().describe("UUID of the specific unit when `locationType` is `own_unit`; null otherwise."),
  unitName: z.string().optional().nullable().describe('Resolved human-readable label of the unit (e.g. "Apartment 4B"); null when unset.'),
  events: z.array(nestedEventSchema).default([]).describe("Events (scheduled work or meetings) linked to this report; empty when none."),
  maintenanceLogs: z.array(maintenanceLogReferenceSchema).default([]).describe("Maintenance logs produced to resolve this report; empty when none."),
  polls: z.array(pollReferenceSchema).default([]).describe("Polls created to gather resident input on this report; empty when none.")
});
var paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema
);
var faqResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building this FAQ entry belongs to."),
  question: z.string().describe("FAQ question text as displayed to residents."),
  answer: z.string().describe("FAQ answer text in plain markdown."),
  category: z.enum(["representative", "manager"]).describe(
    "Target audience. `representative` entries are visible to building representatives; `manager` entries are visible to management-firm staff."
  ),
  orderIndex: z.number().describe("Zero-based display order within the building; lower values appear first."),
  createdBy: z.string().uuid().nullable().describe("UUID of the user who created the FAQ; null if the original author was removed."),
  createdAt: z.string().describe("ISO-8601 timestamp when the FAQ was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
});
var camtImportedEntrySchema = z.looseObject({
  transactionId: z.string().uuid().describe("UUID of the newly inserted income_transactions or expense_transactions row."),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).describe(
    "`INCOME` when the CAMT entry was a credit (money into the fund); `EXPENSE` when it was a debit."
  ),
  bankRef: z.string().describe(
    "Bank-assigned unique reference (`AcctSvcrRef` from CAMT.053) used as the idempotency key. Re-importing the same file will skip rows that already have this ref."
  ),
  amount: z.string().describe('Entry amount serialized as a decimal string (e.g. "1234.56").'),
  bookingDate: z.string().describe("ISO-8601 date (YYYY-MM-DD) the entry was booked, taken from `BookgDt`."),
  description: z.string().nullable().describe(
    "Unstructured remittance info (`RmtInf/Ustrd`) concatenated into a single string, or null when the entry carried none."
  )
}).describe("One imported CAMT entry persisted to the building's fund transactions.");
var camtImportErrorSchema = z.looseObject({
  bankRef: z.string().nullable().describe(
    "`AcctSvcrRef` of the offending entry, or null when the entry lacked one (which itself is an error)."
  ),
  reason: z.string().describe(
    "Human-readable explanation of why this entry was rejected. Surfaced directly in the upload-result toast."
  )
}).describe("A CAMT entry that failed to import, with the reason.");
var camtImportResponseSchema = z.looseObject({
  statementId: z.string().describe(
    "Statement identifier from the CAMT `<Stmt><Id>` field, echoed back so the admin can correlate with the source file."
  ),
  statementIban: z.string().describe(
    "IBAN of the account the statement was issued against. Validated to match `building.iban` before any row is persisted."
  ),
  periodFrom: z.string().nullable().describe(
    "ISO-8601 timestamp of the statement start (`FrToDt/FrDtTm`), or null when the bank omitted the period block."
  ),
  periodTo: z.string().nullable().describe("ISO-8601 timestamp of the statement end (`FrToDt/ToDtTm`), or null."),
  importedCount: z.number().int().nonnegative().describe("Number of CAMT entries that produced a new transaction row in this call."),
  skippedCount: z.number().int().nonnegative().describe(
    "Number of CAMT entries whose `bankRef` already existed for this building (idempotent re-import)."
  ),
  errorCount: z.number().int().nonnegative().describe("Number of CAMT entries that were rejected for the reasons listed in `errors`."),
  imported: z.array(camtImportedEntrySchema).describe("Detail rows for each newly persisted transaction."),
  errors: z.array(camtImportErrorSchema).describe("Detail rows for each rejected entry, matched 1:1 against `errorCount`.")
}).describe("Outcome summary for a CAMT.053 statement import.");
var failureReportReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Failure report title for quick UI display."),
  status: z.string().describe("Report lifecycle status (`pending`, `inProgress`, `resolved`)."),
  createdAt: z.string().describe("ISO-8601 timestamp when the failure report was filed.")
}).describe(
  "Lightweight failure-report reference embedded in maintenance-log responses (the report this work resolved)."
);
var expenseReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  amount: z.number().describe("Transaction amount in EUR."),
  description: z.string().nullable().optional().describe("Free-form description; null when not set."),
  period: z.string().nullable().optional().describe("Reporting period as `YYYY-MM`; null when unset."),
  source: z.string().describe("Provenance tag: `manual` or `camt`."),
  createdAt: z.string().describe("ISO-8601 timestamp when the expense row was created.")
}).describe("Expense transaction linked via `expense_for`.");
var maintenanceLogResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building the work was performed in."),
  title: z.string().describe("Short summary of the maintenance work."),
  files: z.array(nestedFileSchema).default([]).describe("Attached invoices, photos, or other documents; empty when none are uploaded."),
  createdBy: z.string().uuid().describe("UUID of the user who logged the entry."),
  createdByName: z.string().nullable().optional().describe("Author display name; null when the creating user has been deleted."),
  contractor: z.string().describe("Contractor or vendor who performed the work."),
  cost: z.number().describe("Total cost in the building\u2019s currency (two-decimal precision)."),
  financedBy: maintenanceFinancedBySchema.optional().nullable().describe(
    "Source of funds that covered the expense (`building_funds`, `insurance`, `co_owner`); null when unset."
  ),
  warranty: z.boolean().optional().nullable().describe("True when the work is covered by an active warranty. Null when not captured."),
  categoryId: z.string().uuid().optional().nullable().describe("UUID of the transaction category this log rolls up into; null when uncategorised."),
  categoryName: z.string().optional().nullable().describe("Human-readable category label resolved from `categoryId`; null when uncategorised."),
  events: z.array(nestedEventSchema).default([]).describe(
    "Calendar events representing the work window. Every maintenance log must have at least one event."
  ),
  createdAt: z.string().describe("ISO-8601 timestamp when the log was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  canEdit: z.boolean().describe("True when the calling user may edit this log."),
  canDelete: z.boolean().describe("True when the calling user may delete this log."),
  polls: z.array(pollReferenceSchema).default([]).describe("Polls linked to this log (e.g. consensus to authorise the expense); empty if none."),
  failureReports: z.array(failureReportReferenceSchema).optional().describe(
    "Failure reports this log was produced to resolve; absent when the log is standalone."
  ),
  expenses: z.array(expenseReferenceSchema).optional().describe(
    "Expense transactions linked to this log via `entity_links` (linkType `expense_for`). Populated on detail views."
  )
});
var paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema
);
var noticeResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building this notice was posted in."),
  title: z.string().describe("Notice title shown in lists and the notice detail view."),
  content: z.string().describe("Notice body text (rich-text / HTML allowed)."),
  files: z.array(nestedFileSchema).default([]).describe("Attached documents or images; empty array when none are uploaded."),
  createdBy: z.string().uuid().nullable().describe("UUID of the notice author; null when the authoring user has been deleted."),
  approved: z.boolean().describe("True once a representative has approved the notice for public visibility."),
  isAnonymous: z.boolean().optional().default(false).describe("True when the author opted to hide their identity from other residents."),
  pinned: z.boolean().optional().default(false).describe("True when the notice is pinned to the top of the notice board."),
  createdAt: z.string().describe("ISO-8601 timestamp when the notice was created."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited."),
  createdByName: z.string().nullable().optional().describe(
    "Author display name. Null when `isAnonymous` is true or the author has been deleted."
  ),
  canApprove: z.boolean().describe("True when the calling user may approve or reject the notice."),
  canEdit: z.boolean().describe("True when the calling user may edit the notice."),
  canDelete: z.boolean().describe("True when the calling user may delete the notice."),
  events: z.array(nestedEventSchema).default([]).describe("Calendar events linked to the notice (e.g. planned works window); empty when none.")
});
var paginatedNoticesResponseSchema = paginatedResponseSchema(noticeResponseSchema);
var baseNotificationDataSchema = z.object({
  entityType: z.string().optional(),
  entityId: z.string().optional(),
  actorId: z.string().uuid().optional(),
  actorName: z.string().optional(),
  actionUrl: z.string().optional()
});
var noticeCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  content: z.string(),
  createdAt: z.string().or(z.date()),
  isPinned: z.boolean().optional()
});
var noticeApprovedDataSchema = baseNotificationDataSchema.extend({
  title: z.string()
});
var noticeRejectedDataSchema = baseNotificationDataSchema.extend({
  title: z.string()
});
var pollCreatedDataSchema = baseNotificationDataSchema.extend({
  question: z.string(),
  pollType: z.string(),
  deadline: z.string().or(z.date()).nullable().optional(),
  options: z.array(z.string())
});
var pollFinalizedDataSchema = baseNotificationDataSchema.extend({
  question: z.string(),
  pollType: z.string(),
  options: z.array(z.string())
});
var eventCreatedOrUpdatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  eventType: z.string().nullable().optional(),
  subtype: z.string().nullable().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional(),
  color: z.string().nullable().optional()
});
var eventCancelledDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  eventType: z.string().nullable().optional(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).nullable().optional()
});
var wasteReminderDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  wasteTypeLabel: z.string(),
  subtype: z.string(),
  startDate: z.string().or(z.date())
});
var failureReportCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional()
});
var failureReportStatusDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  status: z.string(),
  description: z.string().nullable().optional()
});
var maintenanceLogCreatedDataSchema = baseNotificationDataSchema.extend({
  title: z.string(),
  description: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  contractor: z.string().nullable().optional(),
  // `cost` comes from a Postgres DECIMAL, which drizzle serializes as string.
  cost: z.union([z.string(), z.number()]).nullable().optional()
});
var buildingJoinRequestReceivedDataSchema = baseNotificationDataSchema.extend({
  userName: z.string(),
  userEmail: z.string(),
  message: z.string().nullable().optional()
});
var buildingJoinRequestDecidedDataSchema = baseNotificationDataSchema.extend({
  rejectionReason: z.string().nullable().optional()
});
var buildingMemberJoinedDataSchema = baseNotificationDataSchema;
var buildingRoleChangedDataSchema = baseNotificationDataSchema.extend({
  role: z.string()
});
var buildingPendingApprovalDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string()
});
var buildingApprovedDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string()
});
var buildingRejectedDataSchema = baseNotificationDataSchema.extend({
  buildingName: z.string(),
  rejectionReason: z.string()
});
var chatMessageDataSchema = baseNotificationDataSchema.extend({
  senderName: z.string(),
  messagePreview: z.string(),
  conversationId: z.string().uuid()
});
var unimplementedDataSchema = baseNotificationDataSchema;
({
  [NotificationType.NOTICE_CREATED]: noticeCreatedDataSchema,
  [NotificationType.NOTICE_APPROVED]: noticeApprovedDataSchema,
  [NotificationType.NOTICE_REJECTED]: noticeRejectedDataSchema,
  [NotificationType.POLL_CREATED]: pollCreatedDataSchema,
  [NotificationType.POLL_DEADLINE_24H]: unimplementedDataSchema,
  [NotificationType.POLL_DEADLINE_1H]: unimplementedDataSchema,
  [NotificationType.POLL_FINALIZED]: pollFinalizedDataSchema,
  [NotificationType.EVENT_CREATED]: eventCreatedOrUpdatedDataSchema,
  [NotificationType.EVENT_UPDATED]: eventCreatedOrUpdatedDataSchema,
  [NotificationType.EVENT_CANCELLED]: eventCancelledDataSchema,
  [NotificationType.EVENT_REMINDER_24H]: unimplementedDataSchema,
  [NotificationType.EVENT_REMINDER_1H]: unimplementedDataSchema,
  [NotificationType.WASTE_REMINDER_MIXED]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_BIO]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: wasteReminderDataSchema,
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: wasteReminderDataSchema,
  [NotificationType.FAILURE_REPORT_CREATED]: failureReportCreatedDataSchema,
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: failureReportStatusDataSchema,
  [NotificationType.FAILURE_REPORT_RESOLVED]: failureReportStatusDataSchema,
  [NotificationType.MAINTENANCE_LOG_CREATED]: maintenanceLogCreatedDataSchema,
  [NotificationType.PAYMENT_DUE]: unimplementedDataSchema,
  [NotificationType.PAYMENT_RECEIVED]: unimplementedDataSchema,
  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: buildingJoinRequestReceivedDataSchema,
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: buildingJoinRequestDecidedDataSchema,
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: buildingJoinRequestDecidedDataSchema,
  [NotificationType.BUILDING_MEMBER_JOINED]: buildingMemberJoinedDataSchema,
  [NotificationType.BUILDING_ROLE_CHANGED]: buildingRoleChangedDataSchema,
  [NotificationType.BUILDING_PENDING_APPROVAL]: buildingPendingApprovalDataSchema,
  [NotificationType.BUILDING_APPROVED]: buildingApprovedDataSchema,
  [NotificationType.BUILDING_REJECTED]: buildingRejectedDataSchema,
  [NotificationType.CHAT_MESSAGE]: chatMessageDataSchema,
  [NotificationType.SYSTEM_ANNOUNCEMENT]: unimplementedDataSchema
});
var notificationDataSchema = z.union([
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
  maintenanceLogCreatedDataSchema,
  buildingJoinRequestReceivedDataSchema,
  buildingJoinRequestDecidedDataSchema,
  buildingMemberJoinedDataSchema,
  buildingRoleChangedDataSchema,
  buildingPendingApprovalDataSchema,
  buildingApprovedDataSchema,
  buildingRejectedDataSchema,
  chatMessageDataSchema,
  unimplementedDataSchema
]);
var notificationTypeValues = Object.values(NotificationType);
var notificationResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Localized notification title shown in the UI list and push notification."),
  body: z.string().describe("Localized notification body \u2014 one or two short sentences."),
  type: z.enum(notificationTypeValues).describe(
    "Discriminator for the notification subtype. Determines which per-type schema governs `data` \u2014 see `getNotificationDataSchema(type)`."
  ),
  buildingId: z.string().uuid().nullable().optional().describe(
    "UUID of the related building. Null for cross-building notifications (system announcements, chat DMs)."
  ),
  buildingName: z.string().nullable().optional().describe(
    "Denormalized building display name for convenience. Null when `buildingId` is null."
  ),
  data: notificationDataSchema.nullable().optional().describe(
    "Per-type payload. Shape depends on the `type` field; use `getNotificationDataSchema(type).parse(data)` to narrow."
  ),
  read: z.boolean().describe("True once the user has opened this notification."),
  readAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the first read. Null while unread."),
  createdAt: z.string()
});
var notificationPreferenceItemSchema = z.looseObject({
  type: z.string().describe("Notification type identifier (maps to a value in `NotificationType`)."),
  description: z.string().describe("Human-readable description of what this notification signals."),
  enabled: z.boolean().describe("Whether the user has this notification type turned on."),
  channels: z.array(z.string()).describe("Enabled delivery channels for this type: subset of `push`, `email`, `in_app`.")
});
var notificationPreferenceCategorySchema = z.looseObject({
  category: z.string().describe("Category grouping (e.g. `building`, `financial`, `social`)."),
  notifications: z.array(notificationPreferenceItemSchema).describe(
    "Items belonging to this category; each represents one toggleable notification type."
  )
});
var pollStatusSchema = z.enum(["active", "completed", "cancelled"]).describe(
  "Poll lifecycle: `active` while accepting votes, `completed` once finalised, `cancelled` when archived before completion."
);
var pollDocumentReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Document title displayed in the file list."),
  description: z.string().nullable().optional().describe("Optional short description; null when none was provided."),
  documentUrl: z.string().describe("Absolute URL to download or preview the file."),
  fileType: z.enum(["image", "document"]).describe("Coarse file category used to pick the viewer (image preview vs document reader)."),
  uploadedBy: z.string().describe("Display name or UUID of the uploader, depending on the endpoint."),
  createdAt: z.string().describe("ISO-8601 timestamp when the file was attached to the poll."),
  updatedAt: z.string().nullable().optional().describe("ISO-8601 timestamp of the last file update; null when never updated.")
}).describe("Supporting document attached to a poll (proposal, receipt, spec, etc.).");
var pollMaintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string().describe("Linked maintenance-log title."),
  contractor: z.string().describe("Contractor who performed the underlying work."),
  cost: z.number().describe("Total cost of the underlying work."),
  createdAt: z.string().describe("ISO-8601 timestamp when the maintenance log was created.")
}).describe("Maintenance log linked to this poll (e.g. a quote being voted on).");
var pollScopedUnitSchema = z.looseObject({
  unitType: z.string().describe("Kind of unit eligible to vote (`apartment`, `garage`, `storage_unit`)."),
  unitId: z.string().describe("UUID of the scoped unit."),
  label: z.string().describe('Human-readable unit label (e.g. "Apartment 4B").'),
  floor: z.string().optional().describe("Floor label where the unit is located; absent when not recorded.")
}).describe("Unit whose owners/tenants are eligible to participate in a scoped poll.");
var pollScopedUserSchema = z.looseObject({
  userId: z.string().describe("UUID of the explicitly-eligible user."),
  name: z.string().describe("Display name of the scoped user.")
}).describe("User explicitly added to the poll\u2019s eligible-voter list.");
var pollResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building this poll belongs to."),
  question: z.string().describe("Poll question displayed to voters."),
  options: z.array(z.string()).describe(
    "Answer options in display order. Community polls: 2\u20134 options. Consensus polls: always a single option (voters approve or abstain)."
  ),
  createdBy: z.string().describe("UUID of the user who created the poll; preserved even after user deletion."),
  createdAt: z.string().describe("ISO-8601 timestamp when the poll was created."),
  updatedAt: z.string().describe("ISO-8601 timestamp of the last poll mutation."),
  deadline: z.string().optional().describe(
    "ISO-8601 datetime after which votes are rejected. Absent for open-ended consensus polls."
  ),
  pollType: pollTypeSchema.describe(
    "`COMMUNITY` polls pass by simple majority; `CONSENSUS` polls require an ownership-weighted threshold."
  ),
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional().describe(
    "Ownership-weighted approval threshold (10\u2013100) required for consensus polls; absent for community polls."
  ),
  totalVotes: z.number().describe("Number of distinct voters who have voted so far."),
  totalWeight: z.number().describe(
    "Sum of vote weights cast so far. Equal to `totalVotes` for community polls; varies by ownership for consensus polls."
  ),
  winningOptionIndex: z.number().nullable().optional().describe(
    "Zero-based index of the winning option once the poll is finalised; null while still active or if no option won."
  ),
  isResultsFinalized: z.boolean().describe("True once results have been sealed and no further votes are accepted."),
  finalizedAt: z.string().nullable().optional().describe("ISO-8601 timestamp when the poll was finalised; null while active."),
  finalizedBy: z.string().nullable().optional().describe("UUID of the user who finalised the poll; null while active."),
  hasVoted: z.boolean().optional().describe("True when the calling user has already cast a vote on this poll."),
  userVote: z.number().optional().describe(
    "Zero-based index of the option the calling user voted for; absent when the user has not voted."
  ),
  files: z.array(pollDocumentReferenceSchema).optional().describe("Supporting documents uploaded with the poll; absent when none.")
});
var pollOptionResultSchema = z.looseObject({
  optionIndex: z.number().describe("Zero-based index into the poll `options` array."),
  optionText: z.string().describe("Text of the option (denormalised for convenience)."),
  voteCount: z.number().describe("Number of distinct voters that chose this option."),
  totalWeight: z.number().describe("Sum of vote weights for this option (ownership-weighted for consensus polls)."),
  percentage: z.number().describe("Share of `totalVotes` that chose this option, in percent (0\u2013100)."),
  weightPercentage: z.number().describe("Share of `totalWeight` that chose this option, in percent (0\u2013100).")
}).describe("Per-option tally produced after finalising a poll.");
var pollResultsSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid().describe("UUID of the building this poll belongs to."),
  question: z.string().describe("Poll question displayed to voters."),
  options: z.array(z.string()).describe("Answer options in display order."),
  createdBy: z.string().describe("UUID of the user who created the poll."),
  createdAt: z.string().describe("ISO-8601 timestamp when the poll was created."),
  deadline: z.string().optional().describe("ISO-8601 datetime after which votes are rejected. Absent for open-ended polls."),
  pollType: pollTypeSchema.describe("`COMMUNITY` for majority polls, `CONSENSUS` for weighted."),
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional().describe("Consensus approval threshold in percent (10\u2013100) for consensus polls."),
  totalVotes: z.number().describe("Number of distinct voters who have voted so far."),
  totalWeight: z.number().describe("Sum of vote weights cast so far (ownership-weighted for consensus polls)."),
  totalEligibleVoters: z.number().describe("Number of distinct users eligible to vote on this poll (based on scope)."),
  winningOptionIndex: z.number().nullable().optional().describe(
    "Zero-based index of the winning option once finalised; null while active or if no option won."
  ),
  isResultsFinalized: z.boolean().describe("True once results are sealed and no further votes are accepted."),
  finalizedAt: z.string().nullable().optional().describe("ISO-8601 timestamp when the poll was finalised; null while active."),
  finalizedBy: z.string().nullable().optional().describe("UUID of the user who finalised the poll; null while active."),
  optionResults: z.array(pollOptionResultSchema).describe("Per-option vote tallies."),
  consensusReached: z.boolean().optional().describe(
    "True when the ownership-weighted approval threshold has been reached. Only present for consensus polls."
  ),
  currentConsensusPercentage: z.number().optional().describe("Current cumulative weight in favour, in percent. Only present for consensus polls."),
  approved: z.boolean().describe("True when a representative has approved the poll for public visibility."),
  canApprove: z.boolean().describe("True when the calling user may approve or reject the poll."),
  canEdit: z.boolean().describe("True when the calling user may edit this poll."),
  canDelete: z.boolean().describe("True when the calling user may delete this poll."),
  canVote: z.boolean().describe(
    "True when the calling user is eligible to vote and has not yet voted (and the poll is still active)."
  ),
  hasUserVoted: z.boolean().describe("True when the calling user has already voted on this poll."),
  userVotedOptionIndex: z.number().nullable().optional().describe(
    "Zero-based index of the option the calling user voted for; null when they have not voted."
  ),
  scopedUnits: z.array(pollScopedUnitSchema).optional().describe("Units scoped into eligibility; absent when the poll is building-wide."),
  eligibleTotalWeight: z.number().optional().describe(
    "Cached sum of eligible voters\u2019 ownership percentages captured at poll creation. Used to normalise `totalWeight` against the full eligible weight."
  ),
  scopedUsers: z.array(pollScopedUserSchema).optional().describe("Users scoped into eligibility by explicit selection; absent when not used."),
  maintenanceLogs: z.array(pollMaintenanceLogReferenceSchema).optional().describe("Maintenance logs linked to the poll (for context); absent when none."),
  files: z.array(pollDocumentReferenceSchema).optional().describe("Supporting documents uploaded with the poll; absent when none.")
});
var pollVoterSchema = z.looseObject({
  userId: z.string().describe("UUID of the voter."),
  name: z.string().describe("Voter display name."),
  email: z.string().describe("Voter contact email."),
  selectedOptionIndex: z.number().describe("Zero-based index of the option the voter chose."),
  selectedOptionText: z.string().describe("Text of the chosen option (denormalised)."),
  voteWeight: z.number().describe(
    "Weight contributed by this vote. 1.00 for community polls; the voter\u2019s ownership percentage for consensus polls."
  ),
  votedAt: z.string().describe("ISO-8601 timestamp when the vote was recorded.")
}).describe("Individual voter entry returned by the poll voters endpoint.");
var pollVotersResponseSchema = z.looseObject({
  pollId: z.string().uuid().describe("UUID of the poll these voters belong to."),
  question: z.string().describe("Poll question, repeated for convenience."),
  options: z.array(z.string()).describe("Poll options in display order."),
  totalVotes: z.number().describe("Total number of distinct voters represented in `voters`."),
  voters: z.array(pollVoterSchema).describe("Individual voter entries with their chosen option.")
});
var paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);
var pricuvaLedgerRowSchema = z.object({
  userId: z.string().uuid(),
  userName: z.string().describe("Display name of the co-owner this row attributes to."),
  ownedApartmentArea: z.number().describe("\u03A3 apartment.area \xD7 ownershipPercentage / 100, in m\xB2."),
  ownedGarageArea: z.number().describe("\u03A3 garage.area \xD7 ownershipPercentage / 100, in m\xB2."),
  ownedStorageArea: z.number().describe("\u03A3 storage_unit.area \xD7 ownershipPercentage / 100, in m\xB2."),
  totalOwnedArea: z.number().describe("Sum of the three area fields, for convenience."),
  expected: z.number().describe("Rate \xD7 totalOwnedArea, in EUR."),
  paid: z.number().describe(
    "Attributed apartment income for the period, in EUR. Does not include garage/storage."
  ),
  diff: z.number().describe("paid \u2212 expected, in EUR.")
}).meta({ id: "PricuvaLedgerRow" });
var pricuvaLedgerResponseSchema = z.object({
  buildingId: z.string().uuid(),
  period: z.string().regex(/^\d{4}-\d{2}$/).describe("Reporting month, `YYYY-MM`."),
  monthlyFeePerSqm: z.number().nullable().describe("Rate in EUR per m\xB2 used for this report; null when the building has none set."),
  rows: z.array(pricuvaLedgerRowSchema).describe("One entry per co-owner with any owned area on the building.")
}).meta({ id: "PricuvaLedgerResponse" });

export { ARCHIVE_TYPES, ApprovalStatusSchema, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorResponseSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, archiveTypeSchema, archivedItemSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingDetailResponseSchema, buildingEntitySchema, buildingResponseSchema, buildingTypeSchema, buildingUserEntitySchema, camtImportResponseSchema, commentResponseSchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, listArchivedResponseSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, messageResponseSchema, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, pricuvaLedgerResponseSchema, pricuvaLedgerRowSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema };
//# sourceMappingURL=chunk-G3HHW3EB.js.map
//# sourceMappingURL=chunk-G3HHW3EB.js.map