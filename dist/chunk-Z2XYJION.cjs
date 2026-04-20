'use strict';

var chunk5UBJHQVX_cjs = require('./chunk-5UBJHQVX.cjs');
var zod = require('zod');

var apiErrorSchema = zod.z.object({
  statusCode: zod.z.number(),
  message: zod.z.union([zod.z.string(), zod.z.array(zod.z.string())]),
  timestamp: zod.z.string(),
  path: zod.z.string()
});
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
var apartmentRoleSchema = zod.z.enum([chunk5UBJHQVX_cjs.ApartmentRole.OWNER, chunk5UBJHQVX_cjs.ApartmentRole.TENANT]);
var apartmentUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string(),
  email: zod.z.string(),
  image: zod.z.string().nullable().optional(),
  roleType: apartmentRoleSchema,
  joinedAt: zod.z.string(),
  ownershipPercentage: zod.z.number().nullable().optional()
});
var apartmentSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  number: zod.z.string(),
  floor: zod.z.string().nullable().optional(),
  area: zod.z.number().nullable().optional(),
  surnameOnDoor: zod.z.string().nullable().optional(),
  surnameOnIntercom: zod.z.string().nullable().optional(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(apartmentUserSchema),
  userCount: zod.z.number(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean()
});
var paginatedApartmentsResponseSchema = zod.z.looseObject({
  data: zod.z.array(apartmentSchema),
  count: zod.z.number().optional(),
  page: zod.z.number().optional(),
  totalPages: zod.z.number(),
  limit: zod.z.number(),
  hasNextPage: zod.z.boolean().optional(),
  hasPreviousPage: zod.z.boolean().optional()
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
  content: zod.z.string().min(CHAT_LIMITS.MESSAGE_MIN, "Message is required").max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`)
});
var createConversationSchema = zod.z.object({
  type: zod.z.enum([ConversationType.DIRECT, ConversationType.GROUP]),
  participantIds: zod.z.array(uuidSchema).min(CHAT_LIMITS.PARTICIPANTS_MIN, "At least one participant is required").max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`),
  name: zod.z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional()
});
var updateConversationSchema = zod.z.object({
  name: zod.z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional(),
  addParticipantIds: zod.z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional(),
  removeParticipantIds: zod.z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional()
});
var cursorQuerySchema = zod.z.object({
  cursor: zod.z.string().optional()
});
var FAQ_LIMITS = {
  QUESTION_MIN: 1,
  QUESTION_MAX: 500,
  ANSWER_MIN: 1,
  ANSWER_MAX: 2e3
};
var createFaqSchema = zod.z.object({
  question: zod.z.string().min(FAQ_LIMITS.QUESTION_MIN, "Question is required").max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`),
  answer: zod.z.string().min(FAQ_LIMITS.ANSWER_MIN, "Answer is required").max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`)
});
var updateFaqSchema = zod.z.object({
  question: zod.z.string().min(FAQ_LIMITS.QUESTION_MIN).max(FAQ_LIMITS.QUESTION_MAX).optional(),
  answer: zod.z.string().min(FAQ_LIMITS.ANSWER_MIN).max(FAQ_LIMITS.ANSWER_MAX).optional()
});
var reorderFaqsSchema = zod.z.object({
  orderedIds: zod.z.array(uuidSchema).min(1, "At least one FAQ ID is required")
});
var copyFaqsSchema = zod.z.object({
  sourceBuildingId: uuidSchema
});
var ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11
};
var orgRoleSchema = zod.z.enum([
  chunk5UBJHQVX_cjs.OrgRole.ORG_ADMIN,
  chunk5UBJHQVX_cjs.OrgRole.SUPERVISOR,
  chunk5UBJHQVX_cjs.OrgRole.REFERENT,
  chunk5UBJHQVX_cjs.OrgRole.OPERATIVE
]);
var createOrganizationSchema = zod.z.object({
  name: zod.z.string().min(ORGANIZATION_LIMITS.NAME_MIN, "Name is required").max(
    ORGANIZATION_LIMITS.NAME_MAX,
    `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`
  ),
  type: zod.z.enum([chunk5UBJHQVX_cjs.OrgType.MANAGEMENT_FIRM, chunk5UBJHQVX_cjs.OrgType.PLATFORM]),
  oib: zod.z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`).optional(),
  contactEmail: zod.z.string().email("Invalid email").optional(),
  contactPhone: zod.z.string().optional()
});
var updateOrganizationSchema = zod.z.object({
  name: zod.z.string().min(ORGANIZATION_LIMITS.NAME_MIN).max(ORGANIZATION_LIMITS.NAME_MAX).optional(),
  contactEmail: zod.z.string().email("Invalid email").optional(),
  contactPhone: zod.z.string().optional(),
  oib: zod.z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH).optional()
});
var addOrgMemberSchema = zod.z.object({
  userId: uuidSchema,
  orgRole: orgRoleSchema
});
var updateOrgMemberRoleSchema = zod.z.object({
  orgRole: orgRoleSchema
});
var inviteOrgMemberSchema = zod.z.object({
  email: zod.z.string().email("Invalid email"),
  orgRole: orgRoleSchema,
  message: zod.z.string().optional()
});
var assignOrgBuildingSchema = zod.z.object({
  buildingId: uuidSchema,
  contractStart: zod.z.string().optional(),
  contractEnd: zod.z.string().optional()
});
var assignOrgMemberBuildingSchema = zod.z.object({
  buildingId: uuidSchema
});
var searchUsersQuerySchema = zod.z.object({
  search: zod.z.string().optional()
});
var getOrgBuildingsQuerySchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0),
  limit: zod.z.coerce.number().min(1).optional().default(10),
  search: zod.z.string().optional(),
  sortBy: zod.z.enum(["name", "address", "createdAt"]).optional(),
  sortOrder: zod.z.enum(["asc", "desc"]).optional()
});
var getOrgMembersQuerySchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0),
  limit: zod.z.coerce.number().min(1).optional().default(10),
  search: zod.z.string().optional(),
  sortBy: zod.z.enum(["userName", "orgRole", "createdAt"]).optional(),
  sortOrder: zod.z.enum(["asc", "desc"]).optional()
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
var BUILDING_TYPES = ["RESIDENTIAL", "COMMERCIAL", "RESIDENTIAL_COMMERCIAL"];
var buildingTypeSchema = zod.z.enum(BUILDING_TYPES);
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
  name: zod.z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`),
  address: zod.z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ),
  streetId: uuidSchema,
  houseNumber: zod.z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, "House number is required").max(BUILDING_LIMITS.HOUSE_NUMBER_MAX),
  type: buildingTypeSchema,
  totalUnits: zod.z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  ),
  isStratified: multipartBoolean().optional(),
  role: zod.z.enum([
    chunk5UBJHQVX_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunk5UBJHQVX_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunk5UBJHQVX_cjs.BuildingRole.CO_OWNER
  ]).optional()
});
var updateBuildingSchema = zod.z.object({
  name: zod.z.string().min(BUILDING_LIMITS.NAME_MIN).max(BUILDING_LIMITS.NAME_MAX).optional(),
  address: zod.z.string().min(BUILDING_LIMITS.ADDRESS_MIN).max(BUILDING_LIMITS.ADDRESS_MAX).optional(),
  type: buildingTypeSchema.optional(),
  totalUnits: zod.z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN).max(BUILDING_LIMITS.UNITS_MAX).optional(),
  isStratified: multipartBoolean().optional(),
  removeHouseRulesFile: multipartBoolean().optional()
});
var joinBuildingWithOtpSchema = zod.z.object({
  code: zod.z.string().length(
    BUILDING_LIMITS.OTP_LENGTH,
    `OTP must be a ${BUILDING_LIMITS.OTP_LENGTH}-character code`
  ).regex(/^[A-Z0-9]{6}$/, "OTP must be a 6-character alphanumeric code")
});
var updateUserBuildingRoleSchema = zod.z.object({
  userId: uuidSchema,
  roleType: zod.z.enum([
    chunk5UBJHQVX_cjs.BuildingRole.OWNER_REPRESENTATIVE,
    chunk5UBJHQVX_cjs.BuildingRole.DEPUTY_REPRESENTATIVE,
    chunk5UBJHQVX_cjs.BuildingRole.CO_OWNER
  ]).optional(),
  buildingSurfacePercentage: zod.z.coerce.number().min(0).max(100).optional(),
  chatVisibleToCoOwners: zod.z.boolean().optional()
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
var eventTypeSchema = zod.z.enum(EVENT_TYPES);
var eventColorSchema = zod.z.enum(EVENT_COLORS);
var timeSchema = zod.z.object({
  hour: zod.z.number().min(0).max(23),
  minute: zod.z.number().min(0).max(59)
});
var createEventSchema = zod.z.object({
  buildingId: uuidSchema,
  type: eventTypeSchema,
  title: zod.z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: zod.z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  startDate: zod.z.coerce.date({ error: "Start date is required" }),
  endDate: zod.z.coerce.date({ error: "End date is required" }),
  color: eventColorSchema
});
var updateEventSchema = zod.z.object({
  type: eventTypeSchema.optional(),
  title: zod.z.string().min(1).max(100).optional(),
  description: zod.z.string().max(2e3).optional(),
  startDate: zod.z.coerce.date().optional(),
  endDate: zod.z.coerce.date().optional(),
  color: eventColorSchema.optional()
});
var FAILURE_REPORT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  COMMON_AREA_DESCRIPTION_MAX: 500
};
var failureReportEventSchema = zod.z.object({
  startDate: zod.z.coerce.date(),
  endDate: zod.z.coerce.date(),
  title: zod.z.string().optional(),
  description: zod.z.string().optional()
});
function refineLocation(schema) {
  return schema.superRefine((data, ctx) => {
    if (data.locationType === chunk5UBJHQVX_cjs.FailureLocationType.COMMON_AREA) {
      if (!data.commonAreaDescription || data.commonAreaDescription.trim() === "") {
        ctx.addIssue({
          code: "custom",
          message: "commonAreaDescription is required when locationType is common_area",
          path: ["commonAreaDescription"]
        });
      }
    }
    if (data.locationType === chunk5UBJHQVX_cjs.FailureLocationType.OWN_UNIT) {
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
    ),
    description: zod.z.string().min(1, "Description is required").max(
      FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`
    ),
    isAnonymous: multipartBoolean().optional(),
    priority: zod.z.enum([chunk5UBJHQVX_cjs.Priority.NORMAL, chunk5UBJHQVX_cjs.Priority.URGENT]).optional(),
    locationType: zod.z.enum([chunk5UBJHQVX_cjs.FailureLocationType.COMMON_AREA, chunk5UBJHQVX_cjs.FailureLocationType.OWN_UNIT]).optional(),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional(),
    unitType: zod.z.enum([chunk5UBJHQVX_cjs.FailureUnitType.APARTMENT, chunk5UBJHQVX_cjs.FailureUnitType.GARAGE, chunk5UBJHQVX_cjs.FailureUnitType.STORAGE_UNIT]).optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional()
  })
);
var updateFailureReportSchema = refineLocation(
  zod.z.object({
    title: zod.z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN).max(FAILURE_REPORT_LIMITS.TITLE_MAX).optional(),
    description: zod.z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional(),
    status: zod.z.enum(["pending", "inProgress", "resolved"]).optional(),
    priority: zod.z.enum([chunk5UBJHQVX_cjs.Priority.NORMAL, chunk5UBJHQVX_cjs.Priority.URGENT]).optional(),
    locationType: zod.z.enum([chunk5UBJHQVX_cjs.FailureLocationType.COMMON_AREA, chunk5UBJHQVX_cjs.FailureLocationType.OWN_UNIT]).optional(),
    commonAreaDescription: zod.z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional(),
    unitType: zod.z.enum([chunk5UBJHQVX_cjs.FailureUnitType.APARTMENT, chunk5UBJHQVX_cjs.FailureUnitType.GARAGE, chunk5UBJHQVX_cjs.FailureUnitType.STORAGE_UNIT]).optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    removeChildFileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional()
  })
);
var approveFailureReportSchema = zod.z.object({
  approved: zod.z.boolean()
});
var garageRoleSchema = zod.z.enum(["OWNER", "TENANT"]);
var garageUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string(),
  email: zod.z.string(),
  image: zod.z.string().nullable().optional(),
  roleType: garageRoleSchema,
  joinedAt: zod.z.string(),
  ownershipPercentage: zod.z.number().nullable().optional()
});
var garageSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  title: zod.z.string(),
  floor: zod.z.string().nullable().optional(),
  area: zod.z.number().nullable().optional(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(garageUserSchema)
});
var MAINTENANCE_FINANCED_BY = ["building_funds", "insurance", "co_owner"];
var maintenanceFinancedBySchema = zod.z.enum(MAINTENANCE_FINANCED_BY);
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
  id: uuidSchema.optional(),
  startDate: zod.z.coerce.date(),
  endDate: zod.z.coerce.date(),
  title: zod.z.string().optional(),
  description: zod.z.string().optional()
});
var createMaintenanceLogSchema = zod.z.object({
  title: zod.z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN, "Title is required").max(
    MAINTENANCE_LOG_LIMITS.TITLE_MAX,
    `Title must be at most ${MAINTENANCE_LOG_LIMITS.TITLE_MAX} characters`
  ),
  description: zod.z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: zod.z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, "Contractor is required"),
  cost: costSchema,
  financedBy: maintenanceFinancedBySchema.optional(),
  warranty: multipartBoolean().optional(),
  events: multipartArray(maintenanceLogEventSchema).refine(
    (events) => events.length >= MAINTENANCE_LOG_LIMITS.EVENTS_MIN,
    { message: "At least one event is required" }
  ),
  fileIds: multipartArray(uuidSchema).optional(),
  pollId: uuidSchema.optional(),
  pollIds: multipartArray(uuidSchema).optional()
});
var updateMaintenanceLogSchema = zod.z.object({
  title: zod.z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN).max(MAINTENANCE_LOG_LIMITS.TITLE_MAX).optional(),
  description: zod.z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: zod.z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN).optional(),
  cost: costSchema.optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  warranty: multipartBoolean().optional(),
  events: multipartArray(maintenanceLogEventSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional(),
  pollId: uuidSchema.optional(),
  pollIds: multipartArray(uuidSchema).optional()
});
var NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2e3,
  EVENT_TITLE_MAX: 100
};
var noticeEventSchema = zod.z.object({
  id: uuidSchema.optional(),
  startDate: zod.z.coerce.date(),
  endDate: zod.z.coerce.date(),
  title: zod.z.string().max(NOTICE_LIMITS.EVENT_TITLE_MAX, "Event title must be at most 100 characters").optional(),
  description: zod.z.string().optional()
});
var createNoticeSchema = zod.z.object({
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
    NOTICE_LIMITS.CONTENT_MAX,
    `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`
  ),
  isAnonymous: multipartBoolean().optional(),
  pinned: multipartBoolean().optional(),
  events: multipartArray(noticeEventSchema).optional().default([]),
  fileIds: multipartArray(uuidSchema).optional().default([])
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
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional(),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional(),
  pinned: multipartBoolean().optional(),
  events: multipartArray(noticeEventSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional()
});
var approveNoticeSchema = zod.z.object({
  approved: zod.z.boolean()
});
var POLL_TYPES = ["CONSENSUS", "COMMUNITY"];
var pollTypeSchema = zod.z.enum(POLL_TYPES);
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
  ),
  options: multipartArray(zod.z.string().max(POLL_LIMITS.OPTION_MAX)).pipe(
    zod.z.array(zod.z.string().min(1).max(POLL_LIMITS.OPTION_MAX))
  ),
  pollType: pollTypeSchema,
  deadline: zod.z.coerce.date().optional(),
  requiredConsensusPercentage: zod.z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  consensusCategory: zod.z.string().max(100).optional(),
  legalBasis: zod.z.string().max(100).optional(),
  scopedUnitIds: multipartArray(uuidSchema).optional(),
  scopedUserIds: multipartArray(uuidSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional().default([])
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
var updatePollSchema = zod.z.object({
  question: zod.z.string().min(1).max(POLL_LIMITS.QUESTION_MAX).optional(),
  options: multipartArray(zod.z.string().max(POLL_LIMITS.OPTION_MAX)).optional(),
  pollType: pollTypeSchema.optional(),
  deadline: zod.z.coerce.date().optional(),
  requiredConsensusPercentage: zod.z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  status: zod.z.enum(["active", "inactive", "ended"]).optional(),
  scopedUnitIds: multipartArray(uuidSchema).optional(),
  scopedUserIds: multipartArray(uuidSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional()
});
var votePollSchema = zod.z.object({
  selectedOptionIndex: zod.z.number().int().min(0)
});
var finalizePollSchema = zod.z.object({
  finalize: zod.z.boolean()
});
var storageUnitRoleSchema = zod.z.enum(["OWNER", "TENANT"]);
var storageUnitUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string(),
  email: zod.z.string(),
  image: zod.z.string().nullable().optional(),
  roleType: storageUnitRoleSchema,
  joinedAt: zod.z.string(),
  ownershipPercentage: zod.z.number().nullable().optional()
});
var storageUnitSchema = zod.z.looseObject({
  id: zod.z.string(),
  buildingId: zod.z.string(),
  title: zod.z.string(),
  floor: zod.z.string().nullable().optional(),
  area: zod.z.number().nullable().optional(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  users: zod.z.array(storageUnitUserSchema)
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
  ),
  type: zod.z.enum([chunk5UBJHQVX_cjs.TransactionType.INCOME, chunk5UBJHQVX_cjs.TransactionType.EXPENSE])
});
var updateTransactionCategorySchema = zod.z.object({
  name: zod.z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN).max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX).optional()
});
var getTransactionCategoriesQuerySchema = zod.z.object({
  type: zod.z.enum([chunk5UBJHQVX_cjs.TransactionType.INCOME, chunk5UBJHQVX_cjs.TransactionType.EXPENSE]).optional(),
  search: zod.z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional()
});
var copyTransactionCategoriesSchema = zod.z.object({
  sourceBuildingId: uuidSchema
});
var paginationParamsSchema = zod.z.object({
  offset: zod.z.coerce.number().min(0).optional().default(0),
  limit: zod.z.coerce.number().min(1).max(100).optional().default(10)
});
var paginatedResponseSchema = (itemSchema) => zod.z.object({
  data: zod.z.array(itemSchema),
  count: zod.z.number(),
  page: zod.z.number(),
  limit: zod.z.number(),
  totalPages: zod.z.number(),
  hasNextPage: zod.z.boolean(),
  hasPreviousPage: zod.z.boolean()
});
var roleTypeSchema = zod.z.enum([
  ...Object.values(chunk5UBJHQVX_cjs.Role),
  ...Object.values(chunk5UBJHQVX_cjs.BuildingRole),
  ...Object.values(chunk5UBJHQVX_cjs.OrgRole),
  ...Object.values(chunk5UBJHQVX_cjs.PlatformRole)
]);
var permissionsResponseSchema = zod.z.object({
  scope: zod.z.enum(["building", "organization", "platform"]),
  permissions: zod.z.array(zod.z.string()),
  roleType: roleTypeSchema.optional(),
  buildingId: zod.z.string().uuid().optional(),
  orgId: zod.z.string().uuid().optional(),
  chatVisibleToCoOwners: zod.z.boolean().optional()
});

// src/schemas/requests/update-failure-report.ts
var updateFailureReportRequestSchema = updateFailureReportSchema.extend({
  id: uuidSchema
});

// src/schemas/requests/update-maintenance-log.ts
var updateMaintenanceLogRequestSchema = updateMaintenanceLogSchema.extend({
  id: uuidSchema
});

// src/schemas/requests/update-notice.ts
var updateNoticeRequestSchema = updateNoticeSchema.extend({
  id: uuidSchema
});

// src/schemas/requests/update-poll.ts
var updatePollRequestSchema = updatePollSchema.extend({
  id: uuidSchema
});
var buildingStatusSchema = zod.z.enum(Object.values(chunk5UBJHQVX_cjs.BuildingStatus));
var buildingManagerSchema = zod.z.looseObject({
  name: zod.z.string(),
  email: zod.z.string()
});
var buildingRepresentativeSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string(),
  email: zod.z.string(),
  phone: zod.z.string().optional().nullable()
});
var buildingFundsSchema = zod.z.looseObject({
  currentBalance: zod.z.string(),
  currency: zod.z.string()
});
var buildingResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  name: zod.z.string(),
  address: zod.z.string(),
  coverImage: zod.z.string().optional().nullable(),
  type: buildingTypeSchema,
  status: buildingStatusSchema.optional(),
  totalUnits: zod.z.number(),
  isStratified: zod.z.boolean(),
  houseRulesFileUrl: zod.z.string().nullable().optional(),
  createdBy: zod.z.string().uuid().optional().nullable(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional()
});
var buildingDetailResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  name: zod.z.string(),
  address: zod.z.string(),
  coverImage: zod.z.string().nullable().optional(),
  type: buildingTypeSchema,
  totalUnits: zod.z.number(),
  isStratified: zod.z.boolean(),
  houseRulesFileUrl: zod.z.string().nullable().optional(),
  numberOfFloors: zod.z.number().nullable().optional(),
  description: zod.z.string().nullable().optional(),
  latitude: zod.z.number().nullable().optional(),
  longitude: zod.z.number().nullable().optional(),
  createdBy: zod.z.string(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional(),
  manager: buildingManagerSchema.nullable().optional(),
  funds: buildingFundsSchema.nullable().optional(),
  ownerRepresentatives: zod.z.array(buildingRepresentativeSchema).default([]),
  deputyRepresentatives: zod.z.array(buildingRepresentativeSchema).default([])
});
var paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);
var commentResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  entityType: zod.z.string(),
  entityId: zod.z.string(),
  userId: zod.z.string(),
  userName: zod.z.string().nullable(),
  userImage: zod.z.string().nullable(),
  content: zod.z.string(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean()
});
var eventUserSchema = zod.z.looseObject({
  id: zod.z.string(),
  name: zod.z.string()
});
var entityScheduleReferenceSchema = zod.z.looseObject({
  id: zod.z.string(),
  // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
  // a free string to tolerate new entity types added backend-side.
  type: zod.z.string(),
  title: zod.z.string()
});
var eventResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  type: zod.z.string(),
  description: zod.z.string().optional().nullable(),
  startDate: zod.z.string(),
  endDate: zod.z.string(),
  color: zod.z.string(),
  buildingId: zod.z.string().uuid(),
  recurrenceType: zod.z.string(),
  subtype: zod.z.string().nullable().optional(),
  recurrenceEndDate: zod.z.string().nullable().optional(),
  isRecurrenceInstance: zod.z.boolean().optional(),
  originalEventId: zod.z.string().optional(),
  user: eventUserSchema.optional(),
  isAnonymous: zod.z.boolean(),
  approved: zod.z.boolean(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean(),
  canApprove: zod.z.boolean(),
  onlineMeetingUrl: zod.z.string().nullable().optional(),
  meetingMinutes: zod.z.string().nullable().optional(),
  minuteTakerId: zod.z.string().nullable().optional(),
  usedAsScheduleBy: zod.z.array(entityScheduleReferenceSchema).optional()
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
var CommonStatusSchema = zod.z.enum(commonStatusOptions);
var ApprovalStatusSchema = zod.z.enum(approvalStatusOptions);
var MaintenanceStatusSchema = zod.z.enum(maintenanceStatusOptions);
var FailureStatusSchema = zod.z.enum(failureStatusOptions);
var PrioritySchema = zod.z.enum(priorityOptions);
var nestedFileSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  documentUrl: zod.z.string().optional().nullable()
});
var nestedEventSchema = zod.z.looseObject({
  id: zod.z.string(),
  title: zod.z.string(),
  type: zod.z.string().optional(),
  description: zod.z.string().nullable().optional(),
  startDate: zod.z.string(),
  endDate: zod.z.string(),
  color: zod.z.string().optional(),
  userId: zod.z.string().nullable().optional(),
  buildingId: zod.z.string().optional(),
  createdAt: zod.z.string().optional(),
  updatedAt: zod.z.string().nullable().optional()
});
var pollReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  question: zod.z.string(),
  pollType: zod.z.string(),
  deadline: zod.z.string().optional().nullable()
});

// src/schemas/responses/failure-reports.ts
var maintenanceLogReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  contractor: zod.z.string(),
  cost: zod.z.number().optional().nullable(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: zod.z.boolean().optional().nullable()
});
var failureReportResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  title: zod.z.string(),
  description: zod.z.string().optional().nullable(),
  files: zod.z.array(nestedFileSchema).default([]),
  submittedBy: zod.z.string().uuid().nullable(),
  submittedByName: zod.z.string().optional().nullable(),
  status: FailureStatusSchema,
  approved: zod.z.boolean(),
  isAnonymous: zod.z.boolean().optional().default(false),
  priority: PrioritySchema.optional().nullable(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean(),
  canApprove: zod.z.boolean(),
  canStatus: zod.z.boolean(),
  locationType: zod.z.string().optional().nullable(),
  commonAreaDescription: zod.z.string().optional().nullable(),
  unitType: zod.z.string().optional().nullable(),
  unitId: zod.z.string().uuid().optional().nullable(),
  unitName: zod.z.string().optional().nullable(),
  events: zod.z.array(nestedEventSchema).default([]),
  maintenanceLogs: zod.z.array(maintenanceLogReferenceSchema).default([]),
  polls: zod.z.array(pollReferenceSchema).default([])
});
var paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema
);
var faqResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  question: zod.z.string(),
  answer: zod.z.string(),
  category: zod.z.enum(["representative", "manager"]),
  orderIndex: zod.z.number(),
  createdBy: zod.z.string().uuid().nullable(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional()
});
var failureReportReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  status: zod.z.string(),
  createdAt: zod.z.string()
});
var maintenanceLogResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  title: zod.z.string(),
  files: zod.z.array(nestedFileSchema).default([]),
  createdBy: zod.z.string().uuid(),
  createdByName: zod.z.string().nullable().optional(),
  contractor: zod.z.string(),
  cost: zod.z.number(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: zod.z.boolean().optional().nullable(),
  categoryId: zod.z.string().uuid().optional().nullable(),
  categoryName: zod.z.string().optional().nullable(),
  events: zod.z.array(nestedEventSchema).default([]),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean(),
  polls: zod.z.array(pollReferenceSchema).default([]),
  failureReports: zod.z.array(failureReportReferenceSchema).optional()
});
var paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema
);
var noticeResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  title: zod.z.string(),
  content: zod.z.string(),
  files: zod.z.array(nestedFileSchema).default([]),
  createdBy: zod.z.string().uuid().nullable(),
  approved: zod.z.boolean(),
  isAnonymous: zod.z.boolean().optional().default(false),
  pinned: zod.z.boolean().optional().default(false),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional(),
  createdByName: zod.z.string().nullable().optional(),
  canApprove: zod.z.boolean(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean(),
  events: zod.z.array(nestedEventSchema).default([])
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
  [chunk5UBJHQVX_cjs.NotificationType.NOTICE_CREATED]: noticeCreatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.NOTICE_APPROVED]: noticeApprovedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.NOTICE_REJECTED]: noticeRejectedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.POLL_CREATED]: pollCreatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.POLL_DEADLINE_24H]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.POLL_DEADLINE_1H]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.POLL_FINALIZED]: pollFinalizedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.EVENT_CREATED]: eventCreatedOrUpdatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.EVENT_UPDATED]: eventCreatedOrUpdatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.EVENT_CANCELLED]: eventCancelledDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.EVENT_REMINDER_24H]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.EVENT_REMINDER_1H]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.WASTE_REMINDER_MIXED]: wasteReminderDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.WASTE_REMINDER_BIO]: wasteReminderDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.WASTE_REMINDER_PLASTIC_METAL]: wasteReminderDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: wasteReminderDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.FAILURE_REPORT_CREATED]: failureReportCreatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.FAILURE_REPORT_STATUS_CHANGED]: failureReportStatusDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.FAILURE_REPORT_RESOLVED]: failureReportStatusDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.MAINTENANCE_LOG_CREATED]: maintenanceLogCreatedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.PAYMENT_DUE]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.PAYMENT_RECEIVED]: unimplementedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: buildingJoinRequestReceivedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: buildingJoinRequestDecidedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: buildingJoinRequestDecidedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_MEMBER_JOINED]: buildingMemberJoinedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_ROLE_CHANGED]: buildingRoleChangedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_PENDING_APPROVAL]: buildingPendingApprovalDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_APPROVED]: buildingApprovedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.BUILDING_REJECTED]: buildingRejectedDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.CHAT_MESSAGE]: chatMessageDataSchema,
  [chunk5UBJHQVX_cjs.NotificationType.SYSTEM_ANNOUNCEMENT]: unimplementedDataSchema
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
var notificationTypeValues = Object.values(chunk5UBJHQVX_cjs.NotificationType);
var notificationResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  body: zod.z.string(),
  type: zod.z.enum(notificationTypeValues),
  buildingId: zod.z.string().uuid().nullable().optional(),
  buildingName: zod.z.string().nullable().optional(),
  data: notificationDataSchema.nullable().optional(),
  read: zod.z.boolean(),
  readAt: zod.z.string().nullable().optional(),
  createdAt: zod.z.string()
});
var notificationPreferenceItemSchema = zod.z.looseObject({
  type: zod.z.string(),
  description: zod.z.string(),
  enabled: zod.z.boolean(),
  channels: zod.z.array(zod.z.string())
});
var notificationPreferenceCategorySchema = zod.z.looseObject({
  category: zod.z.string(),
  notifications: zod.z.array(notificationPreferenceItemSchema)
});
var pollStatusSchema = zod.z.enum(["active", "completed", "cancelled"]);
var pollDocumentReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  description: zod.z.string().nullable().optional(),
  documentUrl: zod.z.string(),
  fileType: zod.z.enum(["image", "document"]),
  uploadedBy: zod.z.string(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string().nullable().optional()
});
var pollMaintenanceLogReferenceSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  title: zod.z.string(),
  contractor: zod.z.string(),
  cost: zod.z.number(),
  createdAt: zod.z.string()
});
var pollScopedUnitSchema = zod.z.looseObject({
  unitType: zod.z.string(),
  unitId: zod.z.string(),
  label: zod.z.string(),
  floor: zod.z.string().optional()
});
var pollScopedUserSchema = zod.z.looseObject({
  userId: zod.z.string(),
  name: zod.z.string()
});
var pollResponseSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  question: zod.z.string(),
  options: zod.z.array(zod.z.string()),
  createdBy: zod.z.string(),
  createdAt: zod.z.string(),
  updatedAt: zod.z.string(),
  deadline: zod.z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: zod.z.number().optional(),
  totalVotes: zod.z.number(),
  totalWeight: zod.z.number(),
  winningOptionIndex: zod.z.number().nullable().optional(),
  isResultsFinalized: zod.z.boolean(),
  finalizedAt: zod.z.string().nullable().optional(),
  finalizedBy: zod.z.string().nullable().optional(),
  hasVoted: zod.z.boolean().optional(),
  userVote: zod.z.number().optional(),
  files: zod.z.array(pollDocumentReferenceSchema).optional()
});
var pollOptionResultSchema = zod.z.looseObject({
  optionIndex: zod.z.number(),
  optionText: zod.z.string(),
  voteCount: zod.z.number(),
  totalWeight: zod.z.number(),
  percentage: zod.z.number(),
  weightPercentage: zod.z.number()
});
var pollResultsSchema = zod.z.looseObject({
  id: zod.z.string().uuid(),
  buildingId: zod.z.string().uuid(),
  question: zod.z.string(),
  options: zod.z.array(zod.z.string()),
  createdBy: zod.z.string(),
  createdAt: zod.z.string(),
  deadline: zod.z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: zod.z.number().optional(),
  totalVotes: zod.z.number(),
  totalWeight: zod.z.number(),
  totalEligibleVoters: zod.z.number(),
  winningOptionIndex: zod.z.number().nullable().optional(),
  isResultsFinalized: zod.z.boolean(),
  finalizedAt: zod.z.string().nullable().optional(),
  finalizedBy: zod.z.string().nullable().optional(),
  optionResults: zod.z.array(pollOptionResultSchema),
  consensusReached: zod.z.boolean().optional(),
  currentConsensusPercentage: zod.z.number().optional(),
  approved: zod.z.boolean(),
  canApprove: zod.z.boolean(),
  canEdit: zod.z.boolean(),
  canDelete: zod.z.boolean(),
  canVote: zod.z.boolean(),
  hasUserVoted: zod.z.boolean(),
  userVotedOptionIndex: zod.z.number().nullable().optional(),
  scopedUnits: zod.z.array(pollScopedUnitSchema).optional(),
  eligibleTotalWeight: zod.z.number().optional(),
  scopedUsers: zod.z.array(pollScopedUserSchema).optional(),
  maintenanceLogs: zod.z.array(pollMaintenanceLogReferenceSchema).optional(),
  files: zod.z.array(pollDocumentReferenceSchema).optional()
});
var pollVoterSchema = zod.z.looseObject({
  userId: zod.z.string(),
  name: zod.z.string(),
  email: zod.z.string(),
  selectedOptionIndex: zod.z.number(),
  selectedOptionText: zod.z.string(),
  voteWeight: zod.z.number(),
  votedAt: zod.z.string()
});
var pollVotersResponseSchema = zod.z.looseObject({
  pollId: zod.z.string().uuid(),
  question: zod.z.string(),
  options: zod.z.array(zod.z.string()),
  totalVotes: zod.z.number(),
  voters: zod.z.array(pollVoterSchema)
});
var paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);

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
exports.apiErrorSchema = apiErrorSchema;
exports.approvalStatusOptions = approvalStatusOptions;
exports.approveFailureReportSchema = approveFailureReportSchema;
exports.approveNoticeSchema = approveNoticeSchema;
exports.assignOrgBuildingSchema = assignOrgBuildingSchema;
exports.assignOrgMemberBuildingSchema = assignOrgMemberBuildingSchema;
exports.baseEntitySchema = baseEntitySchema;
exports.buildingDetailResponseSchema = buildingDetailResponseSchema;
exports.buildingEntitySchema = buildingEntitySchema;
exports.buildingResponseSchema = buildingResponseSchema;
exports.buildingTypeSchema = buildingTypeSchema;
exports.buildingUserEntitySchema = buildingUserEntitySchema;
exports.commentResponseSchema = commentResponseSchema;
exports.commonStatusOptions = commonStatusOptions;
exports.copyFaqsSchema = copyFaqsSchema;
exports.copyTransactionCategoriesSchema = copyTransactionCategoriesSchema;
exports.createBuildingSchema = createBuildingSchema;
exports.createConversationSchema = createConversationSchema;
exports.createEventSchema = createEventSchema;
exports.createFailureReportSchema = createFailureReportSchema;
exports.createFaqSchema = createFaqSchema;
exports.createMaintenanceLogSchema = createMaintenanceLogSchema;
exports.createNoticeSchema = createNoticeSchema;
exports.createOrganizationSchema = createOrganizationSchema;
exports.createPollSchema = createPollSchema;
exports.createTransactionCategorySchema = createTransactionCategorySchema;
exports.cursorQuerySchema = cursorQuerySchema;
exports.dateRangeParamsSchema = dateRangeParamsSchema;
exports.dateRangeWithValidationSchema = dateRangeWithValidationSchema;
exports.dateTimeSchema = dateTimeSchema;
exports.emailSchema = emailSchema;
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
exports.loginSchema = loginSchema;
exports.maintenanceFinancedBySchema = maintenanceFinancedBySchema;
exports.maintenanceLogEventSchema = maintenanceLogEventSchema;
exports.maintenanceLogResponseSchema = maintenanceLogResponseSchema;
exports.maintenanceStatusOptions = maintenanceStatusOptions;
exports.multipartArray = multipartArray;
exports.multipartBoolean = multipartBoolean;
exports.noticeEventSchema = noticeEventSchema;
exports.noticeResponseSchema = noticeResponseSchema;
exports.notificationPreferenceCategorySchema = notificationPreferenceCategorySchema;
exports.notificationPreferenceItemSchema = notificationPreferenceItemSchema;
exports.notificationResponseSchema = notificationResponseSchema;
exports.optionalDateTimeSchema = optionalDateTimeSchema;
exports.paginatedApartmentsResponseSchema = paginatedApartmentsResponseSchema;
exports.paginatedBuildingsResponseSchema = paginatedBuildingsResponseSchema;
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
exports.updatePasswordSchema = updatePasswordSchema;
exports.updatePollRequestSchema = updatePollRequestSchema;
exports.updatePollSchema = updatePollSchema;
exports.updateTransactionCategorySchema = updateTransactionCategorySchema;
exports.updateUserBuildingRoleSchema = updateUserBuildingRoleSchema;
exports.userEntitySchema = userEntitySchema;
exports.uuidSchema = uuidSchema;
exports.verifyOtpSchema = verifyOtpSchema;
exports.votePollSchema = votePollSchema;
//# sourceMappingURL=chunk-Z2XYJION.cjs.map
//# sourceMappingURL=chunk-Z2XYJION.cjs.map