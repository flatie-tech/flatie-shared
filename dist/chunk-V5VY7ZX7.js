import { ApartmentRole, OrgRole, OrgType, BuildingRole, FailureUnitType, FailureLocationType, Priority, TransactionType, Role, PlatformRole, BuildingStatus, NotificationType } from './chunk-P25WSM2I.js';
import { z } from 'zod';

var apiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.union([z.string(), z.array(z.string())]),
  timestamp: z.string(),
  path: z.string()
});
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
var apartmentRoleSchema = z.enum([ApartmentRole.OWNER, ApartmentRole.TENANT]);
var apartmentUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: apartmentRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional()
});
var apartmentSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  number: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  surnameOnDoor: z.string().nullable().optional(),
  surnameOnIntercom: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(apartmentUserSchema),
  userCount: z.number(),
  canEdit: z.boolean(),
  canDelete: z.boolean()
});
var paginatedApartmentsResponseSchema = z.looseObject({
  data: z.array(apartmentSchema),
  count: z.number().optional(),
  page: z.number().optional(),
  totalPages: z.number(),
  limit: z.number(),
  hasNextPage: z.boolean().optional(),
  hasPreviousPage: z.boolean().optional()
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
  content: z.string().min(CHAT_LIMITS.MESSAGE_MIN, "Message is required").max(CHAT_LIMITS.MESSAGE_MAX, `Message must be at most ${CHAT_LIMITS.MESSAGE_MAX} characters`)
});
var createConversationSchema = z.object({
  type: z.enum([ConversationType.DIRECT, ConversationType.GROUP]),
  participantIds: z.array(uuidSchema).min(CHAT_LIMITS.PARTICIPANTS_MIN, "At least one participant is required").max(CHAT_LIMITS.PARTICIPANTS_MAX, `Maximum ${CHAT_LIMITS.PARTICIPANTS_MAX} participants`),
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional()
});
var updateConversationSchema = z.object({
  name: z.string().max(CHAT_LIMITS.GROUP_NAME_MAX).optional(),
  addParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional(),
  removeParticipantIds: z.array(uuidSchema).max(CHAT_LIMITS.PARTICIPANTS_MAX).optional()
});
var cursorQuerySchema = z.object({
  cursor: z.string().optional()
});
var FAQ_LIMITS = {
  QUESTION_MIN: 1,
  QUESTION_MAX: 500,
  ANSWER_MIN: 1,
  ANSWER_MAX: 2e3
};
var createFaqSchema = z.object({
  question: z.string().min(FAQ_LIMITS.QUESTION_MIN, "Question is required").max(FAQ_LIMITS.QUESTION_MAX, `Question must be at most ${FAQ_LIMITS.QUESTION_MAX} characters`),
  answer: z.string().min(FAQ_LIMITS.ANSWER_MIN, "Answer is required").max(FAQ_LIMITS.ANSWER_MAX, `Answer must be at most ${FAQ_LIMITS.ANSWER_MAX} characters`)
});
var updateFaqSchema = z.object({
  question: z.string().min(FAQ_LIMITS.QUESTION_MIN).max(FAQ_LIMITS.QUESTION_MAX).optional(),
  answer: z.string().min(FAQ_LIMITS.ANSWER_MIN).max(FAQ_LIMITS.ANSWER_MAX).optional()
});
var reorderFaqsSchema = z.object({
  orderedIds: z.array(uuidSchema).min(1, "At least one FAQ ID is required")
});
var copyFaqsSchema = z.object({
  sourceBuildingId: uuidSchema
});
var ORGANIZATION_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 200,
  OIB_LENGTH: 11
};
var orgRoleSchema = z.enum([
  OrgRole.ORG_ADMIN,
  OrgRole.SUPERVISOR,
  OrgRole.REFERENT,
  OrgRole.OPERATIVE
]);
var createOrganizationSchema = z.object({
  name: z.string().min(ORGANIZATION_LIMITS.NAME_MIN, "Name is required").max(
    ORGANIZATION_LIMITS.NAME_MAX,
    `Name must be at most ${ORGANIZATION_LIMITS.NAME_MAX} characters`
  ),
  type: z.enum([OrgType.MANAGEMENT_FIRM, OrgType.PLATFORM]),
  oib: z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH, `OIB must be ${ORGANIZATION_LIMITS.OIB_LENGTH} characters`).optional(),
  contactEmail: z.string().email("Invalid email").optional(),
  contactPhone: z.string().optional()
});
var updateOrganizationSchema = z.object({
  name: z.string().min(ORGANIZATION_LIMITS.NAME_MIN).max(ORGANIZATION_LIMITS.NAME_MAX).optional(),
  contactEmail: z.string().email("Invalid email").optional(),
  contactPhone: z.string().optional(),
  oib: z.string().max(ORGANIZATION_LIMITS.OIB_LENGTH).optional()
});
var addOrgMemberSchema = z.object({
  userId: uuidSchema,
  orgRole: orgRoleSchema
});
var updateOrgMemberRoleSchema = z.object({
  orgRole: orgRoleSchema
});
var inviteOrgMemberSchema = z.object({
  email: z.string().email("Invalid email"),
  orgRole: orgRoleSchema,
  message: z.string().optional()
});
var assignOrgBuildingSchema = z.object({
  buildingId: uuidSchema,
  contractStart: z.string().optional(),
  contractEnd: z.string().optional()
});
var assignOrgMemberBuildingSchema = z.object({
  buildingId: uuidSchema
});
var searchUsersQuerySchema = z.object({
  search: z.string().optional()
});
var getOrgBuildingsQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(["name", "address", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional()
});
var getOrgMembersQuerySchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).optional().default(10),
  search: z.string().optional(),
  sortBy: z.enum(["userName", "orgRole", "createdAt"]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional()
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
var buildingTypeSchema = z.enum(BUILDING_TYPES);
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
  name: z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`),
  address: z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ),
  streetId: uuidSchema,
  houseNumber: z.string().min(BUILDING_LIMITS.HOUSE_NUMBER_MIN, "House number is required").max(BUILDING_LIMITS.HOUSE_NUMBER_MAX),
  type: buildingTypeSchema,
  totalUnits: z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  ),
  isStratified: multipartBoolean().optional(),
  role: z.enum([
    BuildingRole.OWNER_REPRESENTATIVE,
    BuildingRole.DEPUTY_REPRESENTATIVE,
    BuildingRole.CO_OWNER
  ]).optional()
});
var updateBuildingSchema = z.object({
  name: z.string().min(BUILDING_LIMITS.NAME_MIN).max(BUILDING_LIMITS.NAME_MAX).optional(),
  address: z.string().min(BUILDING_LIMITS.ADDRESS_MIN).max(BUILDING_LIMITS.ADDRESS_MAX).optional(),
  type: buildingTypeSchema.optional(),
  totalUnits: z.coerce.number().int().min(BUILDING_LIMITS.UNITS_MIN).max(BUILDING_LIMITS.UNITS_MAX).optional(),
  isStratified: multipartBoolean().optional(),
  removeHouseRulesFile: multipartBoolean().optional()
});
var joinBuildingWithOtpSchema = z.object({
  code: z.string().length(
    BUILDING_LIMITS.OTP_LENGTH,
    `OTP must be a ${BUILDING_LIMITS.OTP_LENGTH}-character code`
  ).regex(/^[A-Z0-9]{6}$/, "OTP must be a 6-character alphanumeric code")
});
var updateUserBuildingRoleSchema = z.object({
  userId: uuidSchema,
  roleType: z.enum([
    BuildingRole.OWNER_REPRESENTATIVE,
    BuildingRole.DEPUTY_REPRESENTATIVE,
    BuildingRole.CO_OWNER
  ]).optional(),
  buildingSurfacePercentage: z.coerce.number().min(0).max(100).optional(),
  chatVisibleToCoOwners: z.boolean().optional()
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
var eventTypeSchema = z.enum(EVENT_TYPES);
var eventColorSchema = z.enum(EVENT_COLORS);
var timeSchema = z.object({
  hour: z.number().min(0).max(23),
  minute: z.number().min(0).max(59)
});
var createEventSchema = z.object({
  buildingId: uuidSchema,
  type: eventTypeSchema,
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  startDate: z.coerce.date({ error: "Start date is required" }),
  endDate: z.coerce.date({ error: "End date is required" }),
  color: eventColorSchema
});
var updateEventSchema = z.object({
  type: eventTypeSchema.optional(),
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2e3).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  color: eventColorSchema.optional()
});
var FAILURE_REPORT_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  DESCRIPTION_MAX: 2e3,
  COMMON_AREA_DESCRIPTION_MAX: 500
};
var failureReportEventSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().optional(),
  description: z.string().optional()
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
    ),
    description: z.string().min(1, "Description is required").max(
      FAILURE_REPORT_LIMITS.DESCRIPTION_MAX,
      `Description must be at most ${FAILURE_REPORT_LIMITS.DESCRIPTION_MAX} characters`
    ),
    isAnonymous: multipartBoolean().optional(),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional(),
    locationType: z.enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT]).optional(),
    commonAreaDescription: z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional(),
    unitType: z.enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT]).optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional()
  })
);
var updateFailureReportSchema = refineLocation(
  z.object({
    title: z.string().min(FAILURE_REPORT_LIMITS.TITLE_MIN).max(FAILURE_REPORT_LIMITS.TITLE_MAX).optional(),
    description: z.string().min(1).max(FAILURE_REPORT_LIMITS.DESCRIPTION_MAX).optional(),
    status: z.enum(["pending", "inProgress", "resolved"]).optional(),
    priority: z.enum([Priority.NORMAL, Priority.URGENT]).optional(),
    locationType: z.enum([FailureLocationType.COMMON_AREA, FailureLocationType.OWN_UNIT]).optional(),
    commonAreaDescription: z.string().max(FAILURE_REPORT_LIMITS.COMMON_AREA_DESCRIPTION_MAX).optional(),
    unitType: z.enum([FailureUnitType.APARTMENT, FailureUnitType.GARAGE, FailureUnitType.STORAGE_UNIT]).optional(),
    unitId: uuidSchema.optional(),
    fileIds: multipartArray(uuidSchema).optional(),
    removeChildFileIds: multipartArray(uuidSchema).optional(),
    maintenanceLogIds: multipartArray(uuidSchema).optional(),
    events: multipartArray(failureReportEventSchema).optional()
  })
);
var approveFailureReportSchema = z.object({
  approved: z.boolean()
});
var garageRoleSchema = z.enum(["OWNER", "TENANT"]);
var garageUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: garageRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional()
});
var garageSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(garageUserSchema)
});
var MAINTENANCE_FINANCED_BY = ["building_funds", "insurance", "co_owner"];
var maintenanceFinancedBySchema = z.enum(MAINTENANCE_FINANCED_BY);
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
  id: uuidSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().optional(),
  description: z.string().optional()
});
var createMaintenanceLogSchema = z.object({
  title: z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN, "Title is required").max(
    MAINTENANCE_LOG_LIMITS.TITLE_MAX,
    `Title must be at most ${MAINTENANCE_LOG_LIMITS.TITLE_MAX} characters`
  ),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN, "Contractor is required"),
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
var updateMaintenanceLogSchema = z.object({
  title: z.string().min(MAINTENANCE_LOG_LIMITS.TITLE_MIN).max(MAINTENANCE_LOG_LIMITS.TITLE_MAX).optional(),
  description: z.string().max(MAINTENANCE_LOG_LIMITS.DESCRIPTION_MAX).optional(),
  categoryId: uuidSchema.optional(),
  contractor: z.string().min(MAINTENANCE_LOG_LIMITS.CONTRACTOR_MIN).optional(),
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
var noticeEventSchema = z.object({
  id: uuidSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().max(NOTICE_LIMITS.EVENT_TITLE_MAX, "Event title must be at most 100 characters").optional(),
  description: z.string().optional()
});
var createNoticeSchema = z.object({
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
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
var updateNoticeSchema = z.object({
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN).max(NOTICE_LIMITS.TITLE_MAX).optional(),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN).max(NOTICE_LIMITS.CONTENT_MAX).optional(),
  pinned: multipartBoolean().optional(),
  events: multipartArray(noticeEventSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional()
});
var approveNoticeSchema = z.object({
  approved: z.boolean()
});
var POLL_TYPES = ["CONSENSUS", "COMMUNITY"];
var pollTypeSchema = z.enum(POLL_TYPES);
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
  ),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).pipe(
    z.array(z.string().min(1).max(POLL_LIMITS.OPTION_MAX))
  ),
  pollType: pollTypeSchema,
  deadline: z.coerce.date().optional(),
  requiredConsensusPercentage: z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  consensusCategory: z.string().max(100).optional(),
  legalBasis: z.string().max(100).optional(),
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
var updatePollSchema = z.object({
  question: z.string().min(1).max(POLL_LIMITS.QUESTION_MAX).optional(),
  options: multipartArray(z.string().max(POLL_LIMITS.OPTION_MAX)).optional(),
  pollType: pollTypeSchema.optional(),
  deadline: z.coerce.date().optional(),
  requiredConsensusPercentage: z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  status: z.enum(["active", "inactive", "ended"]).optional(),
  scopedUnitIds: multipartArray(uuidSchema).optional(),
  scopedUserIds: multipartArray(uuidSchema).optional(),
  fileIds: multipartArray(uuidSchema).optional(),
  removeChildFileIds: multipartArray(uuidSchema).optional()
});
var votePollSchema = z.object({
  selectedOptionIndex: z.number().int().min(0)
});
var finalizePollSchema = z.object({
  finalize: z.boolean()
});
var storageUnitRoleSchema = z.enum(["OWNER", "TENANT"]);
var storageUnitUserSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  image: z.string().nullable().optional(),
  roleType: storageUnitRoleSchema,
  joinedAt: z.string(),
  ownershipPercentage: z.number().nullable().optional()
});
var storageUnitSchema = z.looseObject({
  id: z.string(),
  buildingId: z.string(),
  title: z.string(),
  floor: z.string().nullable().optional(),
  area: z.number().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  users: z.array(storageUnitUserSchema)
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
  ),
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE])
});
var updateTransactionCategorySchema = z.object({
  name: z.string().min(TRANSACTION_CATEGORY_LIMITS.NAME_MIN).max(TRANSACTION_CATEGORY_LIMITS.NAME_MAX).optional()
});
var getTransactionCategoriesQuerySchema = z.object({
  type: z.enum([TransactionType.INCOME, TransactionType.EXPENSE]).optional(),
  search: z.string().max(TRANSACTION_CATEGORY_LIMITS.SEARCH_MAX).optional()
});
var copyTransactionCategoriesSchema = z.object({
  sourceBuildingId: uuidSchema
});
var paginationParamsSchema = z.object({
  offset: z.coerce.number().min(0).optional().default(0),
  limit: z.coerce.number().min(1).max(100).optional().default(10)
});
var paginatedResponseSchema = (itemSchema) => z.object({
  data: z.array(itemSchema),
  count: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean()
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
var buildingStatusSchema = z.enum(Object.values(BuildingStatus));
var buildingManagerSchema = z.looseObject({
  name: z.string(),
  email: z.string()
});
var buildingRepresentativeSchema = z.looseObject({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().optional().nullable()
});
var buildingFundsSchema = z.looseObject({
  currentBalance: z.string(),
  currency: z.string()
});
var buildingResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  coverImage: z.string().optional().nullable(),
  type: buildingTypeSchema,
  status: buildingStatusSchema.optional(),
  totalUnits: z.number(),
  isStratified: z.boolean(),
  houseRulesFileUrl: z.string().nullable().optional(),
  createdBy: z.string().uuid().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional()
});
var buildingDetailResponseSchema = z.looseObject({
  id: z.string().uuid(),
  name: z.string(),
  address: z.string(),
  coverImage: z.string().nullable().optional(),
  type: buildingTypeSchema,
  totalUnits: z.number(),
  isStratified: z.boolean(),
  houseRulesFileUrl: z.string().nullable().optional(),
  numberOfFloors: z.number().nullable().optional(),
  description: z.string().nullable().optional(),
  latitude: z.number().nullable().optional(),
  longitude: z.number().nullable().optional(),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  manager: buildingManagerSchema.nullable().optional(),
  funds: buildingFundsSchema.nullable().optional(),
  ownerRepresentatives: z.array(buildingRepresentativeSchema).default([]),
  deputyRepresentatives: z.array(buildingRepresentativeSchema).default([])
});
var paginatedBuildingsResponseSchema = paginatedResponseSchema(buildingResponseSchema);
var commentResponseSchema = z.looseObject({
  id: z.string().uuid(),
  entityType: z.string(),
  entityId: z.string(),
  userId: z.string(),
  userName: z.string().nullable(),
  userImage: z.string().nullable(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  canEdit: z.boolean(),
  canDelete: z.boolean()
});
var eventUserSchema = z.looseObject({
  id: z.string(),
  name: z.string()
});
var entityScheduleReferenceSchema = z.looseObject({
  id: z.string(),
  // One of 'failure_report' | 'maintenance_log' | 'notice' — left as
  // a free string to tolerate new entity types added backend-side.
  type: z.string(),
  title: z.string()
});
var eventResponseSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  type: z.string(),
  description: z.string().optional().nullable(),
  startDate: z.string(),
  endDate: z.string(),
  color: z.string(),
  buildingId: z.string().uuid(),
  recurrenceType: z.string(),
  subtype: z.string().nullable().optional(),
  recurrenceEndDate: z.string().nullable().optional(),
  isRecurrenceInstance: z.boolean().optional(),
  originalEventId: z.string().optional(),
  user: eventUserSchema.optional(),
  isAnonymous: z.boolean(),
  approved: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canApprove: z.boolean(),
  onlineMeetingUrl: z.string().nullable().optional(),
  meetingMinutes: z.string().nullable().optional(),
  minuteTakerId: z.string().nullable().optional(),
  usedAsScheduleBy: z.array(entityScheduleReferenceSchema).optional()
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
  title: z.string(),
  documentUrl: z.string().optional().nullable()
});
var nestedEventSchema = z.looseObject({
  id: z.string(),
  title: z.string(),
  type: z.string().optional(),
  description: z.string().nullable().optional(),
  startDate: z.string(),
  endDate: z.string(),
  color: z.string().optional(),
  userId: z.string().nullable().optional(),
  buildingId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().nullable().optional()
});
var pollReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  question: z.string(),
  pollType: z.string(),
  deadline: z.string().optional().nullable()
});

// src/schemas/responses/failure-reports.ts
var maintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  contractor: z.string(),
  cost: z.number().optional().nullable(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: z.boolean().optional().nullable()
});
var failureReportResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  description: z.string().optional().nullable(),
  files: z.array(nestedFileSchema).default([]),
  submittedBy: z.string().uuid().nullable(),
  submittedByName: z.string().optional().nullable(),
  status: FailureStatusSchema,
  approved: z.boolean(),
  isAnonymous: z.boolean().optional().default(false),
  priority: PrioritySchema.optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canApprove: z.boolean(),
  canStatus: z.boolean(),
  locationType: z.string().optional().nullable(),
  commonAreaDescription: z.string().optional().nullable(),
  unitType: z.string().optional().nullable(),
  unitId: z.string().uuid().optional().nullable(),
  unitName: z.string().optional().nullable(),
  events: z.array(nestedEventSchema).default([]),
  maintenanceLogs: z.array(maintenanceLogReferenceSchema).default([]),
  polls: z.array(pollReferenceSchema).default([])
});
var paginatedFailureReportsResponseSchema = paginatedResponseSchema(
  failureReportResponseSchema
);
var faqResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  answer: z.string(),
  category: z.enum(["representative", "manager"]),
  orderIndex: z.number(),
  createdBy: z.string().uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional()
});
var failureReportReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  status: z.string(),
  createdAt: z.string()
});
var maintenanceLogResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  files: z.array(nestedFileSchema).default([]),
  createdBy: z.string().uuid(),
  createdByName: z.string().nullable().optional(),
  contractor: z.string(),
  cost: z.number(),
  financedBy: maintenanceFinancedBySchema.optional().nullable(),
  warranty: z.boolean().optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  categoryName: z.string().optional().nullable(),
  events: z.array(nestedEventSchema).default([]),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  polls: z.array(pollReferenceSchema).default([]),
  failureReports: z.array(failureReportReferenceSchema).optional()
});
var paginatedMaintenanceLogsResponseSchema = paginatedResponseSchema(
  maintenanceLogResponseSchema
);
var noticeResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  files: z.array(nestedFileSchema).default([]),
  createdBy: z.string().uuid().nullable(),
  approved: z.boolean(),
  isAnonymous: z.boolean().optional().default(false),
  pinned: z.boolean().optional().default(false),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional(),
  createdByName: z.string().nullable().optional(),
  canApprove: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  events: z.array(nestedEventSchema).default([])
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
  title: z.string(),
  body: z.string(),
  type: z.enum(notificationTypeValues),
  buildingId: z.string().uuid().nullable().optional(),
  buildingName: z.string().nullable().optional(),
  data: notificationDataSchema.nullable().optional(),
  read: z.boolean(),
  readAt: z.string().nullable().optional(),
  createdAt: z.string()
});
var notificationPreferenceItemSchema = z.looseObject({
  type: z.string(),
  description: z.string(),
  enabled: z.boolean(),
  channels: z.array(z.string())
});
var notificationPreferenceCategorySchema = z.looseObject({
  category: z.string(),
  notifications: z.array(notificationPreferenceItemSchema)
});
var pollStatusSchema = z.enum(["active", "completed", "cancelled"]);
var pollDocumentReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable().optional(),
  documentUrl: z.string(),
  fileType: z.enum(["image", "document"]),
  uploadedBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string().nullable().optional()
});
var pollMaintenanceLogReferenceSchema = z.looseObject({
  id: z.string().uuid(),
  title: z.string(),
  contractor: z.string(),
  cost: z.number(),
  createdAt: z.string()
});
var pollScopedUnitSchema = z.looseObject({
  unitType: z.string(),
  unitId: z.string(),
  label: z.string(),
  floor: z.string().optional()
});
var pollScopedUserSchema = z.looseObject({
  userId: z.string(),
  name: z.string()
});
var pollResponseSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deadline: z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional(),
  totalVotes: z.number(),
  totalWeight: z.number(),
  winningOptionIndex: z.number().nullable().optional(),
  isResultsFinalized: z.boolean(),
  finalizedAt: z.string().nullable().optional(),
  finalizedBy: z.string().nullable().optional(),
  hasVoted: z.boolean().optional(),
  userVote: z.number().optional(),
  files: z.array(pollDocumentReferenceSchema).optional()
});
var pollOptionResultSchema = z.looseObject({
  optionIndex: z.number(),
  optionText: z.string(),
  voteCount: z.number(),
  totalWeight: z.number(),
  percentage: z.number(),
  weightPercentage: z.number()
});
var pollResultsSchema = z.looseObject({
  id: z.string().uuid(),
  buildingId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string(),
  deadline: z.string().optional(),
  pollType: pollTypeSchema,
  status: pollStatusSchema,
  requiredConsensusPercentage: z.number().optional(),
  totalVotes: z.number(),
  totalWeight: z.number(),
  totalEligibleVoters: z.number(),
  winningOptionIndex: z.number().nullable().optional(),
  isResultsFinalized: z.boolean(),
  finalizedAt: z.string().nullable().optional(),
  finalizedBy: z.string().nullable().optional(),
  optionResults: z.array(pollOptionResultSchema),
  consensusReached: z.boolean().optional(),
  currentConsensusPercentage: z.number().optional(),
  approved: z.boolean(),
  canApprove: z.boolean(),
  canEdit: z.boolean(),
  canDelete: z.boolean(),
  canVote: z.boolean(),
  hasUserVoted: z.boolean(),
  userVotedOptionIndex: z.number().nullable().optional(),
  scopedUnits: z.array(pollScopedUnitSchema).optional(),
  eligibleTotalWeight: z.number().optional(),
  scopedUsers: z.array(pollScopedUserSchema).optional(),
  maintenanceLogs: z.array(pollMaintenanceLogReferenceSchema).optional(),
  files: z.array(pollDocumentReferenceSchema).optional()
});
var pollVoterSchema = z.looseObject({
  userId: z.string(),
  name: z.string(),
  email: z.string(),
  selectedOptionIndex: z.number(),
  selectedOptionText: z.string(),
  voteWeight: z.number(),
  votedAt: z.string()
});
var pollVotersResponseSchema = z.looseObject({
  pollId: z.string().uuid(),
  question: z.string(),
  options: z.array(z.string()),
  totalVotes: z.number(),
  voters: z.array(pollVoterSchema)
});
var paginatedPollsResponseSchema = paginatedResponseSchema(pollResponseSchema);

export { ApprovalStatusSchema, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAILURE_REPORT_LIMITS, FAQ_LIMITS, FailureStatusSchema, MAINTENANCE_FINANCED_BY, MAINTENANCE_LOG_LIMITS, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingDetailResponseSchema, buildingEntitySchema, buildingResponseSchema, buildingTypeSchema, buildingUserEntitySchema, commentResponseSchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventResponseSchema, eventTypeSchema, failureReportEventSchema, failureReportResponseSchema, failureStatusOptions, faqResponseSchema, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceLogEventSchema, maintenanceLogResponseSchema, maintenanceStatusOptions, multipartArray, multipartBoolean, noticeEventSchema, noticeResponseSchema, notificationPreferenceCategorySchema, notificationPreferenceItemSchema, notificationResponseSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedBuildingsResponseSchema, paginatedEventsResponseSchema, paginatedFailureReportsResponseSchema, paginatedMaintenanceLogsResponseSchema, paginatedNoticesResponseSchema, paginatedPollsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollResponseSchema, pollResultsSchema, pollTypeSchema, pollVotersResponseSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportRequestSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogRequestSchema, updateMaintenanceLogSchema, updateNoticeRequestSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updatePollRequestSchema, updatePollSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema };
//# sourceMappingURL=chunk-V5VY7ZX7.js.map
//# sourceMappingURL=chunk-V5VY7ZX7.js.map