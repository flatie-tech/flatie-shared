'use strict';

var chunkXXNOAOHF_cjs = require('./chunk-XXNOAOHF.cjs');
var chunkN4VU2M34_cjs = require('./chunk-N4VU2M34.cjs');
var chunkAU46DIAR_cjs = require('./chunk-AU46DIAR.cjs');
var zod = require('zod');

var apiErrorSchema = zod.z.object({
  statusCode: zod.z.number(),
  message: zod.z.union([zod.z.string(), zod.z.array(zod.z.string())]),
  timestamp: zod.z.string(),
  path: zod.z.string()
});
var apiErrorResponseSchema = apiErrorSchema.extend({
  code: zod.z.enum(Object.values(chunkAU46DIAR_cjs.BACKEND_ERROR_CODES)).optional().describe(
    "Canonical error code from `@flatie/shared/errors` (`BACKEND_ERROR_CODES`). Present when the backend raised a `DomainException`; absent for generic HTTP errors (network failures, unhandled exceptions, validation-pipe rejections)."
  )
}).describe("Standard error envelope returned by the Flatie backend on 4xx and 5xx responses.");
var emailSchema = zod.z.string().email("Invalid email address");
var passwordSchema = zod.z.string().min(8, "Password must be at least 8 characters long").max(100, "Password must not exceed 100 characters");
var strongPasswordSchema = passwordSchema.regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number");
var loginSchema = zod.z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: zod.z.boolean().optional().default(false)
});
var registerSchema = zod.z.object({
  name: zod.z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long"),
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
  token: zod.z.string().min(1, "Token is required"),
  password: strongPasswordSchema,
  passwordConfirmation: zod.z.string()
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"]
});
var verifyOtpSchema = zod.z.object({
  email: emailSchema,
  otp: zod.z.string().min(4, "OTP must be 4 digits").max(4, "OTP must be 4 digits")
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
var apartmentRoleSchema = zod.z.enum([chunkN4VU2M34_cjs.ApartmentRole.OWNER, chunkN4VU2M34_cjs.ApartmentRole.TENANT]).describe("`OWNER` for the title-deed holder, `TENANT` for a resident renting from the owner.");
var apartmentUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string().describe("Display name of the apartment member."),
  email: zod.z.string().describe("Contact email of the apartment member."),
  image: zod.z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: apartmentRoleSchema.describe(
    "Relationship of this user to the apartment (`OWNER` or `TENANT`)."
  ),
  joinedAt: zod.z.string().describe("ISO-8601 timestamp when the user was attached to the apartment."),
  ownershipPercentage: zod.z.number().nullable().optional().describe(
    "Share of the apartment held by this user, 0\u2013100. Null for tenants and for owners whose share has not been recorded."
  )
});
var apartmentSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  number: zod.z.string().describe('Apartment identifier as used by residents and mail (e.g. "12A", "3.5").'),
  paymentRefCode: zod.z.string().nullable().optional().describe(
    "Apartment code used as the middle segment of the HR01 poziv-na-broj in `apartment` ref mode. Auto-assigned on create (sequential per building, zero-padded e.g. `001`); editable. Null is allowed on legacy rows that pre-date the column."
  ),
  floor: zod.z.string().nullable().optional().describe(
    'Floor label where the apartment is located (e.g. "1", "Ground", "Basement"); null when not recorded.'
  ),
  area: zod.z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  surnameOnDoor: zod.z.string().nullable().optional().describe(
    "Surname displayed on the apartment door, used for deliveries; null when not provided."
  ),
  surnameOnIntercom: zod.z.string().nullable().optional().describe("Surname listed on the building intercom; null when not provided."),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(apartmentUserSchema).describe("Owners and tenants currently attached to the apartment."),
  userCount: zod.z.number().describe("Total number of users linked to this apartment."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit this apartment\u2019s metadata."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete this apartment.")
});
var paginatedApartmentsResponseSchema = zod.z.looseObject({
  data: zod.z.array(apartmentSchema).describe("Apartments on the current page, ordered as requested."),
  count: zod.z.number().optional().describe("Total number of apartments matching the query across all pages."),
  page: zod.z.number().optional().describe("Current page number, 1-indexed."),
  totalPages: zod.z.number().describe("Total number of pages available for this query."),
  limit: zod.z.number().describe("Maximum number of items returned per page."),
  hasNextPage: zod.z.boolean().optional().describe("True when at least one more page follows the current one."),
  hasPreviousPage: zod.z.boolean().optional().describe("True when at least one page precedes the current one.")
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
var orgRoleSchema = zod.z.enum([chunkN4VU2M34_cjs.OrgRole.ORG_ADMIN, chunkN4VU2M34_cjs.OrgRole.SUPERVISOR, chunkN4VU2M34_cjs.OrgRole.REFERENT, chunkN4VU2M34_cjs.OrgRole.OPERATIVE]).describe(
  "Organization role, from highest to lowest authority: `ORG_ADMIN` (manages the org), `SUPERVISOR` (oversees operations), `REFERENT` (day-to-day member interactions), `OPERATIVE` (field work)."
);
var createOrganizationSchema = zod.z.object({
  name: zod.z.string().min(ORGANIZATION_LIMITS.NAME_MIN, "Name is required").max(
    ORGANIZATION_LIMITS.NAME_MAX,
    `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`
  ).describe("Legal or display name of the organization, 1\u2013200 chars."),
  type: zod.z.enum([chunkN4VU2M34_cjs.OrgType.MANAGEMENT_FIRM, chunkN4VU2M34_cjs.OrgType.PLATFORM]).describe(
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

// src/schemas/entities/building.schema.ts
var BUILDING_TYPES = [
  chunkN4VU2M34_cjs.BuildingType.RESIDENTIAL,
  chunkN4VU2M34_cjs.BuildingType.COMMERCIAL,
  chunkN4VU2M34_cjs.BuildingType.RESIDENTIAL_COMMERCIAL
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
  address: zod.z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ).describe("Full postal address including street and city."),
  streetId: uuidSchema.describe(
    "UUID of the street record the building belongs to; used to normalise address data."
  ),
  houseNumber: zod.z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, "House number is required").max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).describe('Street/house number including any suffix (e.g. "12A", "5B").'),
  type: buildingTypeSchema,
  totalUnits: zod.z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  ).describe("Total number of individual units (apartments, garages, storage)."),
  isStratified: multipartBoolean().optional().describe(
    "True when the building is stratified (each unit has its own title deed). Defaults to false when omitted."
  ),
  role: zod.z.enum([
    chunkN4VU2M34_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunkN4VU2M34_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunkN4VU2M34_cjs.BuildingRole.CO_OWNER
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
  address: zod.z.string().min(BUILDING_LIMITS.ADDRESS_MIN).max(BUILDING_LIMITS.ADDRESS_MAX).optional().describe("New full postal address."),
  type: buildingTypeSchema.optional(),
  houseNumber: zod.z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN).max(BUILDING_LIMITS.HOUSE_NUMBER_MAX).optional().describe('Street/house number (e.g. "12A"). Used as first HR01 reference segment.'),
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
  fundsSource: zod.z.enum([chunkN4VU2M34_cjs.FundsSource.MANUAL, chunkN4VU2M34_cjs.FundsSource.CAMT]).optional().describe(
    "Switches how the building's fund transactions are populated. `manual` (default) keeps the representative-facing add/edit flow; `camt` locks manual writes and only a platform admin can ingest CAMT.053 XML statements."
  ),
  pricuvaRefMode: zod.z.enum([chunkN4VU2M34_cjs.PricuvaRefMode.APARTMENT, chunkN4VU2M34_cjs.PricuvaRefMode.OWNER]).optional().describe(
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
    chunkN4VU2M34_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunkN4VU2M34_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunkN4VU2M34_cjs.BuildingRole.CO_OWNER
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
    chunkN4VU2M34_cjs.QUOTA_RESOURCE_TYPES
  ),
  dailyLimit: zod.z.number().int().min(0).max(1e4).nullable()
});
var buildingQuotaConfigSchema = zod.z.object({
  quotas: zod.z.array(buildingQuotaEntrySchema).max(chunkN4VU2M34_cjs.QUOTA_RESOURCE_TYPES.length)
});
var buildingQuotaListSchema = zod.z.object({
  buildingId: zod.z.string().uuid(),
  quotas: zod.z.array(buildingQuotaEntrySchema)
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
var eventTypeSchema = zod.z.enum(EVENT_TYPES).describe(
  "Kind of calendar event: `service` (routine service call), `inspection` (regulatory/safety check), `maintenance` (contractor work), `meeting` (residents gathering), `discussion` (informal), `planned_works` (scheduled project), `other` (miscellaneous)."
);
var eventColorSchema = zod.z.enum(EVENT_COLORS).describe("Display colour used when rendering the event on the calendar.");
var timeSchema = zod.z.object({
  hour: zod.z.number().min(0).max(23).describe("Hour component in 24-hour format, 0\u201323."),
  minute: zod.z.number().min(0).max(59).describe("Minute component, 0\u201359.")
});
var createEventSchema = zod.z.object({
  buildingId: uuidSchema.describe("UUID of the building the event belongs to."),
  type: eventTypeSchema,
  title: zod.z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters").describe("Short event title shown on the calendar, 1\u2013100 chars."),
  description: zod.z.string().max(2e3, "Description must be at most 2000 characters").optional().describe("Free-text details about the event; omitted when the event is self-explanatory."),
  startDate: zod.z.coerce.date({ error: "Start date is required" }).describe("Event start \u2014 accepts an ISO-8601 string or Date, stored as a timestamp."),
  endDate: zod.z.coerce.date({ error: "End date is required" }).describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  color: eventColorSchema
});
var updateEventSchema = zod.z.object({
  type: eventTypeSchema.optional(),
  title: zod.z.string().min(1).max(100).optional().describe("Revised title, 1\u2013100 chars."),
  description: zod.z.string().max(2e3).optional().describe("Revised description, max 2000 chars."),
  startDate: zod.z.coerce.date().optional().describe("Revised start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().optional().describe("Revised end \u2014 accepts an ISO-8601 string or Date."),
  color: eventColorSchema.optional()
});
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
function refineLocation(schema) {
  return schema.superRefine((data, ctx) => {
    if (data.locationType === chunkN4VU2M34_cjs.FailureLocationType.COMMON_AREA) {
      if (!data.commonAreaDescription || data.commonAreaDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "commonAreaDescription is required when locationType is common_area",
          path: ["commonAreaDescription"]
        });
      }
    }
    if (data.locationType === chunkN4VU2M34_cjs.FailureLocationType.OWN_UNIT) {
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
    priority: zod.z.enum([chunkN4VU2M34_cjs.Priority.NORMAL, chunkN4VU2M34_cjs.Priority.URGENT]).optional().describe("`normal` for standard reports, `urgent` to flag immediate attention."),
    locationType: zod.z.enum([chunkN4VU2M34_cjs.FailureLocationType.COMMON_AREA, chunkN4VU2M34_cjs.FailureLocationType.OWN_UNIT]).optional().describe(
      "`common_area` for shared spaces (hallway, roof, etc.) or `own_unit` for a specific apartment/garage/storage unit."
    ),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Free-text location description. Required when `locationType` is `common_area`."),
    unitType: zod.z.enum([chunkN4VU2M34_cjs.FailureUnitType.APARTMENT, chunkN4VU2M34_cjs.FailureUnitType.GARAGE, chunkN4VU2M34_cjs.FailureUnitType.STORAGE_UNIT]).optional().describe("Kind of unit when `locationType` is `own_unit`. Required in that case."),
    unitId: uuidSchema.optional().describe("UUID of the specific unit. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-uploaded files to attach to this report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "UUIDs of maintenance logs to associate with this report (e.g. related past work)."
    ),
    events: multipartArray(failureReportEventSchema).optional().describe("Calendar events to create alongside the report (inspections, scheduled fixes).")
  })
);
var updateFailureReportSchema = refineLocation(
  zod.z.object({
    title: zod.z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN).max(FAILURE_REPORT_LIMITS.TITLE_MAX).optional().describe("Revised report title, 1\u2013100 chars."),
    description: zod.z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional().describe("Revised description, up to 2000 chars."),
    status: zod.z.enum([chunkN4VU2M34_cjs.FailureStatus.PENDING, chunkN4VU2M34_cjs.FailureStatus.IN_PROGRESS, chunkN4VU2M34_cjs.FailureStatus.RESOLVED]).optional().describe(
      "Lifecycle status: `pending` (newly filed), `in_progress` (assigned work), `resolved` (closed out)."
    ),
    priority: zod.z.enum([chunkN4VU2M34_cjs.Priority.NORMAL, chunkN4VU2M34_cjs.Priority.URGENT]).optional().describe("Revised priority: `normal` or `urgent`."),
    locationType: zod.z.enum([chunkN4VU2M34_cjs.FailureLocationType.COMMON_AREA, chunkN4VU2M34_cjs.FailureLocationType.OWN_UNIT]).optional().describe("Revised location classification: `common_area` or `own_unit`."),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional().describe("Revised common-area description. Required when `locationType` is `common_area`."),
    unitType: zod.z.enum([chunkN4VU2M34_cjs.FailureUnitType.APARTMENT, chunkN4VU2M34_cjs.FailureUnitType.GARAGE, chunkN4VU2M34_cjs.FailureUnitType.STORAGE_UNIT]).optional().describe("Revised unit kind. Required when `locationType` is `own_unit`."),
    unitId: uuidSchema.optional().describe("Revised unit UUID. Required when `locationType` is `own_unit`."),
    fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to add to the report."),
    removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the report."),
    maintenanceLogIds: multipartArray(uuidSchema).optional().describe(
      "Full list of maintenance-log UUIDs to associate with the report (replaces existing links)."
    ),
    events: multipartArray(failureReportEventSchema).optional().describe("Full list of events for the report \u2014 replaces the existing event set.")
  })
);
var approveFailureReportSchema = zod.z.object({
  approved: zod.z.boolean().describe("True to approve the report for public visibility, false to reject.")
});
var garageRoleSchema = zod.z.enum([chunkN4VU2M34_cjs.ApartmentRole.OWNER, chunkN4VU2M34_cjs.ApartmentRole.TENANT]).describe("`owner` for the title-deed holder, `tenant` for a resident renting from the owner.");
var garageUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string().describe("Display name of the garage member."),
  email: zod.z.string().describe("Contact email of the garage member."),
  image: zod.z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: garageRoleSchema.describe(
    "Relationship of this user to the garage (`owner` or `tenant`)."
  ),
  joinedAt: zod.z.string().describe("ISO-8601 timestamp when the user was attached to the garage."),
  ownershipPercentage: zod.z.number().nullable().optional().describe(
    "Share of the garage held by this user, 0\u2013100. Null for tenants and owners whose share was not recorded."
  )
});
var garageSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  title: zod.z.string().describe('Garage identifier or name as shown to residents (e.g. "G-12").'),
  floor: zod.z.string().nullable().optional().describe(
    'Floor label where the garage is located (e.g. "Basement", "-1"); null when not recorded.'
  ),
  area: zod.z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(garageUserSchema).describe("Owners and tenants currently attached to the garage.")
});
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
var noticeEventSchema = zod.z.object({
  id: uuidSchema.optional().describe(
    "UUID of an existing event to update in place. Omit to create a new event. Events absent from the update request are deleted."
  ),
  startDate: zod.z.coerce.date().describe("Event start \u2014 accepts an ISO-8601 string or Date."),
  endDate: zod.z.coerce.date().describe("Event end \u2014 accepts an ISO-8601 string or Date; must not precede `startDate`."),
  title: zod.z.string().max(NOTICE_LIMITS.EVENT_TITLE_MAX, "Event title must be at most 100 characters").optional().describe("Event title, max 100 chars; defaults to the notice title when omitted."),
  description: zod.z.string().optional().describe("Event description; defaults to the notice content when omitted.")
});
var createNoticeSchema = zod.z.object({
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`).describe("Notice headline shown in listings, 1\u2013100 chars."),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
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
var updateNoticeSchema = zod.z.object({
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional().describe("Revised notice headline, 1\u2013100 chars."),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional().describe("Revised notice body, up to 2000 chars."),
  pinned: multipartBoolean().optional().describe("Toggles whether the notice is pinned to the top of the feed."),
  events: multipartArray(noticeEventSchema).optional().describe(
    "Replacement event set: events with an `id` are updated, new events are inserted, and existing events omitted from the list are deleted."
  ),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded files to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the notice.")
});
var approveNoticeSchema = zod.z.object({
  approved: zod.z.boolean().describe("True to approve the notice for public visibility, false to reject.")
});
var orgQuotaEntrySchema = zod.z.object({
  resourceType: zod.z.enum(
    chunkN4VU2M34_cjs.ORG_QUOTA_RESOURCE_TYPES
  ),
  dailyLimit: zod.z.number().int().min(0).max(1e4).nullable()
});
var orgQuotaConfigSchema = zod.z.object({
  quotas: zod.z.array(orgQuotaEntrySchema).max(chunkN4VU2M34_cjs.ORG_QUOTA_RESOURCE_TYPES.length)
});
var orgQuotaListSchema = zod.z.object({
  orgId: zod.z.string().uuid(),
  quotas: zod.z.array(orgQuotaEntrySchema)
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
  paymentRefCode: zod.z.string().nullable().optional(),
  createdAt: zod.z.union([zod.z.string(), zod.z.date()]),
  updatedAt: zod.z.union([zod.z.string(), zod.z.date()]).nullable().optional()
}).meta({ id: "OwnerResponse" });
var createOwnerSchema = zod.z.object({
  fullName: zod.z.string().trim().min(1).max(200),
  email: zod.z.string().trim().email().optional().nullable(),
  phone: zod.z.string().trim().max(50).optional().nullable(),
  oib: zod.z.string().regex(/^\d{11}$/, "OIB must be exactly 11 digits").optional().nullable(),
  address: zod.z.string().trim().max(500).optional().nullable(),
  paymentRefCode: zod.z.string().trim().max(22).optional().nullable(),
  userId: zod.z.string().uuid().optional().nullable()
}).meta({ id: "CreateOwner" });
var updateOwnerSchema = createOwnerSchema.partial().meta({ id: "UpdateOwner" });
var assignOwnerSchema = zod.z.object({
  ownerId: zod.z.string().uuid(),
  ownershipPercentage: zod.z.number().min(0).max(100).nullable().optional()
}).meta({ id: "AssignOwner" });
var POLL_TYPES = [chunkN4VU2M34_cjs.PollType.CONSENSUS, chunkN4VU2M34_cjs.PollType.COMMUNITY];
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
  scopedUserIds: multipartArray(uuidSchema).optional().describe("UUIDs of users explicitly added to the eligible-voter list. Omit when not used."),
  fileIds: multipartArray(uuidSchema).optional().default([]).describe("UUIDs of previously-uploaded supporting documents (proposals, receipts, specs).")
}).refine(
  (data) => {
    if (data.pollType === chunkN4VU2M34_cjs.PollType.COMMUNITY) {
      return data.options.length >= POLL_LIMITS.COMMUNITY_OPTIONS_MIN && data.options.length <= POLL_LIMITS.COMMUNITY_OPTIONS_MAX;
    }
    if (data.pollType === chunkN4VU2M34_cjs.PollType.CONSENSUS) {
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
    if (data.pollType === chunkN4VU2M34_cjs.PollType.CONSENSUS) {
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
  status: zod.z.enum(["active", "inactive", "ended"]).optional().describe(
    "Lifecycle override: `active` accepts votes, `inactive` pauses the poll, `ended` seals it."
  ),
  scopedUnitIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped unit UUIDs. Empty array clears scoping."),
  scopedUserIds: multipartArray(uuidSchema).optional().describe("Replacement list of scoped user UUIDs. Empty array clears explicit-user scoping."),
  fileIds: multipartArray(uuidSchema).optional().describe("UUIDs of newly-uploaded supporting documents to attach."),
  removeChildFileIds: multipartArray(uuidSchema).optional().describe("UUIDs of previously-attached files to detach from the poll.")
});
var votePollSchema = zod.z.object({
  selectedOptionIndex: zod.z.number().int().min(0).describe("Zero-based index into the poll\u2019s `options` array identifying the chosen option.")
});
var finalizePollSchema = zod.z.object({
  finalize: zod.z.boolean().describe(
    "True to seal the poll and freeze its results; false is accepted as a no-op for legacy compatibility."
  )
});
var storageUnitRoleSchema = zod.z.enum([chunkN4VU2M34_cjs.ApartmentRole.OWNER, chunkN4VU2M34_cjs.ApartmentRole.TENANT]).describe("`owner` for the title-deed holder, `tenant` for a resident renting from the owner.");
var storageUnitUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string().describe("Display name of the storage-unit member."),
  email: zod.z.string().describe("Contact email of the storage-unit member."),
  image: zod.z.string().nullable().optional().describe("Absolute URL to the member\u2019s profile image; null when none is set."),
  roleType: storageUnitRoleSchema.describe(
    "Relationship of this user to the storage unit (`owner` or `tenant`)."
  ),
  joinedAt: zod.z.string().describe("ISO-8601 timestamp when the user was attached to the storage unit."),
  ownershipPercentage: zod.z.number().nullable().optional().describe(
    "Share of the storage unit held by this user, 0\u2013100. Null for tenants and owners whose share was not recorded."
  )
});
var storageUnitSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  title: zod.z.string().describe('Storage-unit identifier or name as shown to residents (e.g. "S-04").'),
  floor: zod.z.string().nullable().optional().describe(
    'Floor label where the storage unit is located (e.g. "Basement", "-1"); null when not recorded.'
  ),
  area: zod.z.number().nullable().optional().describe("Floor area in square metres; null when not recorded."),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(storageUnitUserSchema).describe("Owners and tenants currently attached to the storage unit.")
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
  type: zod.z.enum([chunkN4VU2M34_cjs.TransactionType.INCOME, chunkN4VU2M34_cjs.TransactionType.EXPENSE]).describe(
    "`INCOME` for categories that receive money into the fund; `EXPENSE` for categories that spend from it."
  )
});
var updateTransactionCategorySchema = zod.z.object({
  name: zod.z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN).max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX).optional().describe("Revised category name, 1\u2013100 chars.")
});
var getTransactionCategoriesQuerySchema = zod.z.object({
  type: zod.z.enum([chunkN4VU2M34_cjs.TransactionType.INCOME, chunkN4VU2M34_cjs.TransactionType.EXPENSE]).optional().describe(
    "Filter results by category type. Omit to return both income and expense categories."
  ),
  search: zod.z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional().describe("Case-insensitive substring matched against the category name.")
});
var copyTransactionCategoriesSchema = zod.z.object({
  sourceBuildingId: uuidSchema.describe(
    "UUID of the building whose categories should be copied into the target building."
  )
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
var roleTypeSchema = zod.z.enum([
  ...Object.values(chunkN4VU2M34_cjs.BuildingRole),
  ...Object.values(chunkN4VU2M34_cjs.OrgRole),
  ...Object.values(chunkN4VU2M34_cjs.PlatformRole)
]);
var permissionsResponseSchema = zod.z.object({
  scope: zod.z.enum(["building", "organization", "platform"]),
  permissions: zod.z.array(zod.z.string()),
  roleType: roleTypeSchema.optional(),
  buildingId: zod.z.string().uuid().optional(),
  orgId: zod.z.string().uuid().optional(),
  chatVisibleToCoOwners: zod.z.boolean().optional()
});
var createEmailThreadRequestSchema = zod.z.object({
  recipientEmail: zod.z.string().email().describe("Primary To address of the first outbound message."),
  recipientName: zod.z.string().optional().describe(
    'Display name to include in the To header (renders as "Name <email>" on the manager side).'
  ),
  ccEmails: zod.z.array(zod.z.string().email()).optional().describe("Optional list of Cc addresses for the first message."),
  subject: zod.z.string().min(1).max(200).describe("Subject line; used for both the first message and the thread summary."),
  body: zod.z.string().min(1).describe("Plain-text body of the first outbound message.")
}).strict();
var replyEmailThreadRequestSchema = zod.z.object({
  body: zod.z.string().min(1).describe("Plain-text body of the reply."),
  ccEmails: zod.z.array(zod.z.string().email()).optional().describe("Optional Cc addresses for this reply; do not persist beyond this message.")
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
var buildingStatusSchema = zod.z.enum(Object.values(chunkN4VU2M34_cjs.BuildingStatus)).describe(
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
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the building record was created."),
  updatedAt: zod.z.string().nullable().optional().describe("ISO-8601 timestamp of the last edit; null when never edited.")
});
var buildingDetailResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
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
  fundsSource: zod.z.enum([chunkN4VU2M34_cjs.FundsSource.MANUAL, chunkN4VU2M34_cjs.FundsSource.CAMT]).optional().describe(
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
  pricuvaRefMode: zod.z.enum([chunkN4VU2M34_cjs.PricuvaRefMode.APARTMENT, chunkN4VU2M34_cjs.PricuvaRefMode.OWNER]).optional().describe(
    "Which middle-segment identifier the HR01 poziv-na-broj uses: `apartment` (per-apartment code) or `owner` (per-co-owner code)."
  ),
  ownerRepresentatives: zod.z.array(buildingRepresentativeSchema).default([]).describe("Users with the owner-representative role for this building."),
  deputyRepresentatives: zod.z.array(buildingRepresentativeSchema).default([]).describe("Users with the deputy-representative role, if any.")
});
var paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);
var emailDirectionSchema = zod.z.enum(["outbound", "inbound"]).describe(
  "`outbound` when a representative sent the message through the app; `inbound` when Flatie received the message from an external party via the inbound-mail webhook."
);
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
  createdAt: zod.z.string().describe("ISO-8601 timestamp when the message was persisted server-side.")
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
var commentResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  entityType: zod.z.string().describe(
    "Type of entity this comment is attached to. One of `notice`, `failure_report`, `event`."
  ),
  entityId: zod.z.string().describe("UUID of the entity (notice, failure report, or event) this comment belongs to."),
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
  canEdit: zod.z.boolean().describe("True when the calling user is allowed to edit this event."),
  canDelete: zod.z.boolean().describe("True when the calling user is allowed to delete this event."),
  canApprove: zod.z.boolean().describe("True when the calling user is allowed to approve or reject this event."),
  onlineMeetingUrl: zod.z.string().nullable().optional().describe("Optional join URL for online meetings; null for in-person events."),
  meetingMinutes: zod.z.string().nullable().optional().describe(
    "Rich-text minutes captured during the meeting; null until the minute-taker submits them."
  ),
  minuteTakerId: zod.z.string().nullable().optional().describe(
    "UUID of the user assigned to record minutes; null for events that do not require one."
  ),
  usedAsScheduleBy: zod.z.array(entityScheduleReferenceSchema).optional().describe(
    "Entities (failure reports, maintenance logs, notices) that reference this event as their schedule; empty when none do."
  )
});
var paginatedEventsResponseSchema = paginatedResponseSchema(eventResponseSchema);
var commonStatusOptions = [
  chunkN4VU2M34_cjs.CommonStatus.ACTIVE,
  chunkN4VU2M34_cjs.CommonStatus.COMPLETED,
  chunkN4VU2M34_cjs.CommonStatus.CANCELLED
];
var approvalStatusOptions = [
  chunkN4VU2M34_cjs.ApprovalStatus.PENDING,
  chunkN4VU2M34_cjs.ApprovalStatus.APPROVED,
  chunkN4VU2M34_cjs.ApprovalStatus.REJECTED
];
var maintenanceStatusOptions = [
  chunkN4VU2M34_cjs.MaintenanceStatus.PENDING,
  chunkN4VU2M34_cjs.MaintenanceStatus.IN_PROGRESS,
  chunkN4VU2M34_cjs.MaintenanceStatus.COMPLETED,
  chunkN4VU2M34_cjs.MaintenanceStatus.CANCELLED
];
var failureStatusOptions = [
  chunkN4VU2M34_cjs.FailureStatus.PENDING,
  chunkN4VU2M34_cjs.FailureStatus.IN_PROGRESS,
  chunkN4VU2M34_cjs.FailureStatus.RESOLVED
];
var priorityOptions = ["normal", "urgent"];
var CommonStatusSchema = zod.z.enum(commonStatusOptions);
var ApprovalStatusSchema = zod.z.enum(approvalStatusOptions);
var MaintenanceStatusSchema = zod.z.enum(maintenanceStatusOptions);
var FailureStatusSchema = zod.z.enum(failureStatusOptions);
var PrioritySchema = zod.z.enum(priorityOptions);
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
  canEdit: zod.z.boolean().describe("True when the calling user is allowed to edit this report."),
  canDelete: zod.z.boolean().describe("True when the calling user is allowed to delete this report."),
  canApprove: zod.z.boolean().describe("True when the calling user may approve or reject the report."),
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
  type: zod.z.enum([chunkN4VU2M34_cjs.TransactionType.INCOME, chunkN4VU2M34_cjs.TransactionType.EXPENSE]).describe(
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
  canApprove: zod.z.boolean().describe("True when the calling user may approve or reject the notice."),
  canEdit: zod.z.boolean().describe("True when the calling user may edit the notice."),
  canDelete: zod.z.boolean().describe("True when the calling user may delete the notice."),
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
  wasteTypeLabel: zod.z.string(),
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
var unimplementedDataSchema = baseNotificationDataSchema;
({
  [chunkN4VU2M34_cjs.NotificationType.NOTICE_CREATED]: noticeCreatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.NOTICE_APPROVED]: noticeApprovedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.NOTICE_REJECTED]: noticeRejectedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_CREATED]: pollCreatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_DEADLINE_24H]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_DEADLINE_1H]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_FINALIZED]: pollFinalizedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.EVENT_CREATED]: eventCreatedOrUpdatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.EVENT_UPDATED]: eventCreatedOrUpdatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.EVENT_CANCELLED]: eventCancelledDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.EVENT_REMINDER_24H]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.EVENT_REMINDER_1H]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.WASTE_REMINDER_MIXED]: wasteReminderDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.WASTE_REMINDER_BIO]: wasteReminderDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.WASTE_REMINDER_PLASTIC_METAL]: wasteReminderDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: wasteReminderDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.FAILURE_REPORT_CREATED]: failureReportCreatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.FAILURE_REPORT_STATUS_CHANGED]: failureReportStatusDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.FAILURE_REPORT_RESOLVED]: failureReportStatusDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.MAINTENANCE_LOG_CREATED]: maintenanceLogCreatedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.PAYMENT_DUE]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.PAYMENT_RECEIVED]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: buildingJoinRequestReceivedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: buildingJoinRequestDecidedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: buildingJoinRequestDecidedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_MEMBER_JOINED]: buildingMemberJoinedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_ROLE_CHANGED]: buildingRoleChangedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_PENDING_APPROVAL]: buildingPendingApprovalDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_APPROVED]: buildingApprovedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.BUILDING_REJECTED]: buildingRejectedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.CHAT_MESSAGE]: chatMessageDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_VOTE_SIGNATURE_PENDING]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: unimplementedDataSchema,
  [chunkN4VU2M34_cjs.NotificationType.SYSTEM_ANNOUNCEMENT]: unimplementedDataSchema
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
var notificationTypeValues = Object.values(chunkN4VU2M34_cjs.NotificationType);
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
var pollScopedUserSchema = zod.z.looseObject({
  userId: zod.z.string().describe("UUID of the explicitly-eligible user."),
  name: zod.z.string().describe("Display name of the scoped user.")
}).describe("User explicitly added to the poll\u2019s eligible-voter list.");
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
  canVote: zod.z.boolean().describe(
    "True when the calling user is eligible to vote and has not yet voted (and the poll is still active)."
  ),
  hasUserVoted: zod.z.boolean().describe("True when the calling user has already voted on this poll."),
  userVotedOptionIndex: zod.z.number().nullable().optional().describe(
    "Zero-based index of the option the calling user voted for; null when they have not voted."
  ),
  scopedUnits: zod.z.array(pollScopedUnitSchema).optional().describe("Units scoped into eligibility; absent when the poll is building-wide."),
  eligibleTotalWeight: zod.z.number().optional().describe(
    "Cached sum of eligible voters\u2019 ownership percentages captured at poll creation. Used to normalise `totalWeight` against the full eligible weight."
  ),
  scopedUsers: zod.z.array(pollScopedUserSchema).optional().describe("Users scoped into eligibility by explicit selection; absent when not used."),
  maintenanceLogs: zod.z.array(pollMaintenanceLogReferenceSchema).optional().describe("Maintenance logs linked to the poll (for context); absent when none."),
  files: zod.z.array(pollDocumentReferenceSchema).optional().describe("Supporting documents uploaded with the poll; absent when none.")
});
var pollVoterSchema = zod.z.looseObject({
  userId: zod.z.string().describe("UUID of the voter."),
  name: zod.z.string().describe("Voter display name."),
  email: zod.z.string().describe("Voter contact email."),
  selectedOptionIndex: zod.z.number().describe("Zero-based index of the option the voter chose."),
  selectedOptionText: zod.z.string().describe("Text of the chosen option (denormalised)."),
  voteWeight: zod.z.number().describe(
    "Weight contributed by this vote. 1.00 for community polls; the voter\u2019s ownership percentage for consensus polls."
  ),
  votedAt: zod.z.string().describe("ISO-8601 timestamp when the vote was recorded.")
}).describe("Individual voter entry returned by the poll voters endpoint.");
var pollVotersResponseSchema = zod.z.looseObject({
  pollId: zod.z.string().uuid().describe("UUID of the poll these voters belong to."),
  question: zod.z.string().describe("Poll question, repeated for convenience."),
  options: zod.z.array(zod.z.string()).describe("Poll options in display order."),
  totalVotes: zod.z.number().describe("Total number of distinct voters represented in `voters`."),
  voters: zod.z.array(pollVoterSchema).describe("Individual voter entries with their chosen option.")
});
var paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);

exports.ARCHIVE_TYPES = ARCHIVE_TYPES;
exports.ApprovalStatusSchema = ApprovalStatusSchema;
exports.BUILDING_LIMITS = BUILDING_LIMITS;
exports.BUILDING_TYPES = BUILDING_TYPES;
exports.CHAT_LIMITS = CHAT_LIMITS;
exports.CommonStatusSchema = CommonStatusSchema;
exports.EVENT_COLORS = EVENT_COLORS;
exports.EVENT_TYPES = EVENT_TYPES;
exports.EVENT_TYPE_COLOR_MAP = EVENT_TYPE_COLOR_MAP;
exports.FAILURE_REPORT_LIMITS = FAILURE_REPORT_LIMITS;
exports.FAQ_LIMITS = FAQ_LIMITS;
exports.FailureStatusSchema = FailureStatusSchema;
exports.MAINTENANCE_FINANCED_BY = MAINTENANCE_FINANCED_BY;
exports.MAINTENANCE_LOG_LIMITS = MAINTENANCE_LOG_LIMITS;
exports.MaintenanceStatusSchema = MaintenanceStatusSchema;
exports.NOTICE_LIMITS = NOTICE_LIMITS;
exports.ORGANIZATION_LIMITS = ORGANIZATION_LIMITS;
exports.POLL_LIMITS = POLL_LIMITS;
exports.POLL_TYPES = POLL_TYPES;
exports.PrioritySchema = PrioritySchema;
exports.TRANSACTION_CATEGORY_LIMITS = TRANSACTION_CATEGORY_LIMITS;
exports.addOrgMemberSchema = addOrgMemberSchema;
exports.apartmentRoleSchema = apartmentRoleSchema;
exports.apartmentSchema = apartmentSchema;
exports.apartmentUserSchema = apartmentUserSchema;
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
exports.buildingDetailResponseSchema = buildingDetailResponseSchema;
exports.buildingEntitySchema = buildingEntitySchema;
exports.buildingFundsLedgerResponseSchema = buildingFundsLedgerResponseSchema;
exports.buildingFundsLedgerRowSchema = buildingFundsLedgerRowSchema;
exports.buildingQuotaConfigSchema = buildingQuotaConfigSchema;
exports.buildingQuotaEntrySchema = buildingQuotaEntrySchema;
exports.buildingQuotaListSchema = buildingQuotaListSchema;
exports.buildingResponseSchema = buildingResponseSchema;
exports.buildingTypeSchema = buildingTypeSchema;
exports.buildingUserEntitySchema = buildingUserEntitySchema;
exports.businessPartnerResponseSchema = businessPartnerResponseSchema;
exports.camtImportResponseSchema = camtImportResponseSchema;
exports.certiliaUserinfoSchema = certiliaUserinfoSchema;
exports.commentResponseSchema = commentResponseSchema;
exports.commonStatusOptions = commonStatusOptions;
exports.copyFaqsSchema = copyFaqsSchema;
exports.copyTransactionCategoriesSchema = copyTransactionCategoriesSchema;
exports.createBuildingSchema = createBuildingSchema;
exports.createBusinessPartnerSchema = createBusinessPartnerSchema;
exports.createConversationSchema = createConversationSchema;
exports.createEmailThreadRequestSchema = createEmailThreadRequestSchema;
exports.createEventSchema = createEventSchema;
exports.createFailureReportSchema = createFailureReportSchema;
exports.createFaqSchema = createFaqSchema;
exports.createMaintenanceLogSchema = createMaintenanceLogSchema;
exports.createNoticeSchema = createNoticeSchema;
exports.createOrganizationSchema = createOrganizationSchema;
exports.createOwnerSchema = createOwnerSchema;
exports.createPollSchema = createPollSchema;
exports.createTransactionCategorySchema = createTransactionCategorySchema;
exports.cursorQuerySchema = cursorQuerySchema;
exports.dateRangeParamsSchema = dateRangeParamsSchema;
exports.dateRangeWithValidationSchema = dateRangeWithValidationSchema;
exports.dateTimeSchema = dateTimeSchema;
exports.emailMessageSchema = emailMessageSchema;
exports.emailSchema = emailSchema;
exports.emailThreadDetailSchema = emailThreadDetailSchema;
exports.emailThreadSchema = emailThreadSchema;
exports.eventColorSchema = eventColorSchema;
exports.eventResponseSchema = eventResponseSchema;
exports.eventTypeSchema = eventTypeSchema;
exports.failureReportEventSchema = failureReportEventSchema;
exports.failureReportResponseSchema = failureReportResponseSchema;
exports.failureStatusOptions = failureStatusOptions;
exports.faqResponseSchema = faqResponseSchema;
exports.finalizePollSchema = finalizePollSchema;
exports.forgotPasswordSchema = forgotPasswordSchema;
exports.garageRoleSchema = garageRoleSchema;
exports.garageSchema = garageSchema;
exports.garageUserSchema = garageUserSchema;
exports.getOrgBuildingsQuerySchema = getOrgBuildingsQuerySchema;
exports.getOrgMembersQuerySchema = getOrgMembersQuerySchema;
exports.getTransactionCategoriesQuerySchema = getTransactionCategoriesQuerySchema;
exports.inviteOrgMemberSchema = inviteOrgMemberSchema;
exports.joinBuildingWithOtpSchema = joinBuildingWithOtpSchema;
exports.listArchivedResponseSchema = listArchivedResponseSchema;
exports.loginSchema = loginSchema;
exports.maintenanceFinancedBySchema = maintenanceFinancedBySchema;
exports.maintenanceLogEventSchema = maintenanceLogEventSchema;
exports.maintenanceLogResponseSchema = maintenanceLogResponseSchema;
exports.maintenanceStatusOptions = maintenanceStatusOptions;
exports.messageResponseSchema = messageResponseSchema;
exports.multipartArray = multipartArray;
exports.multipartBoolean = multipartBoolean;
exports.noticeEventSchema = noticeEventSchema;
exports.noticeResponseSchema = noticeResponseSchema;
exports.notificationPreferenceCategorySchema = notificationPreferenceCategorySchema;
exports.notificationPreferenceItemSchema = notificationPreferenceItemSchema;
exports.notificationResponseSchema = notificationResponseSchema;
exports.optionalDateTimeSchema = optionalDateTimeSchema;
exports.orgQuotaConfigSchema = orgQuotaConfigSchema;
exports.orgQuotaEntrySchema = orgQuotaEntrySchema;
exports.orgQuotaListSchema = orgQuotaListSchema;
exports.ownerResponseSchema = ownerResponseSchema;
exports.paginatedApartmentsResponseSchema = paginatedApartmentsResponseSchema;
exports.paginatedBuildingsResponseSchema = paginatedBuildingsResponseSchema;
exports.paginatedEmailThreadsResponseSchema = paginatedEmailThreadsResponseSchema;
exports.paginatedEventsResponseSchema = paginatedEventsResponseSchema;
exports.paginatedFailureReportsResponseSchema = paginatedFailureReportsResponseSchema;
exports.paginatedMaintenanceLogsResponseSchema = paginatedMaintenanceLogsResponseSchema;
exports.paginatedNoticesResponseSchema = paginatedNoticesResponseSchema;
exports.paginatedPollsResponseSchema = paginatedPollsResponseSchema;
exports.paginatedResponseSchema = paginatedResponseSchema;
exports.paginationParamsSchema = paginationParamsSchema;
exports.passwordSchema = passwordSchema;
exports.permissionFieldsSchema = permissionFieldsSchema;
exports.permissionsResponseSchema = permissionsResponseSchema;
exports.pollResponseSchema = pollResponseSchema;
exports.pollResultsSchema = pollResultsSchema;
exports.pollTypeSchema = pollTypeSchema;
exports.pollVotersResponseSchema = pollVotersResponseSchema;
exports.priorityOptions = priorityOptions;
exports.registerSchema = registerSchema;
exports.reorderFaqsSchema = reorderFaqsSchema;
exports.replyEmailThreadRequestSchema = replyEmailThreadRequestSchema;
exports.resetPasswordSchema = resetPasswordSchema;
exports.roleTypeSchema = roleTypeSchema;
exports.searchUsersQuerySchema = searchUsersQuerySchema;
exports.sendMessageSchema = sendMessageSchema;
exports.storageUnitRoleSchema = storageUnitRoleSchema;
exports.storageUnitSchema = storageUnitSchema;
exports.storageUnitUserSchema = storageUnitUserSchema;
exports.strongPasswordSchema = strongPasswordSchema;
exports.timeSchema = timeSchema;
exports.updateBuildingSchema = updateBuildingSchema;
exports.updateBusinessPartnerSchema = updateBusinessPartnerSchema;
exports.updateConversationSchema = updateConversationSchema;
exports.updateEventSchema = updateEventSchema;
exports.updateFailureReportRequestSchema = updateFailureReportRequestSchema;
exports.updateFailureReportSchema = updateFailureReportSchema;
exports.updateFaqSchema = updateFaqSchema;
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
exports.updateUserBuildingRoleSchema = updateUserBuildingRoleSchema;
exports.userEntitySchema = userEntitySchema;
exports.uuidSchema = uuidSchema;
exports.verifyOtpSchema = verifyOtpSchema;
exports.votePollSchema = votePollSchema;
//# sourceMappingURL=chunk-6AQI2Y5F.cjs.map
//# sourceMappingURL=chunk-6AQI2Y5F.cjs.map