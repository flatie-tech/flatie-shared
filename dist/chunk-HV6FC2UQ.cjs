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
var BUILDING_TYPES = ["residential", "commercial"];
var buildingTypeSchema = zod.z.enum(BUILDING_TYPES);
var BUILDING_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ADDRESS_MIN: 1,
  ADDRESS_MAX: 200,
  UNITS_MIN: 1,
  UNITS_MAX: 1e4
};
var createBuildingSchema = zod.z.object({
  name: zod.z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`),
  type: buildingTypeSchema,
  address: zod.z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ),
  totalUnits: zod.z.coerce.number().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  )
});
var updateBuildingSchema = zod.z.object({
  name: zod.z.string().min(1).max(BUILDING_LIMITS.NAME_MAX).optional(),
  type: buildingTypeSchema.optional(),
  address: zod.z.string().min(1).max(BUILDING_LIMITS.ADDRESS_MAX).optional(),
  totalUnits: zod.z.coerce.number().min(1).max(BUILDING_LIMITS.UNITS_MAX).optional()
});
var joinBuildingWithOtpSchema = zod.z.object({
  otp: zod.z.string().min(1, "OTP is required"),
  buildingId: uuidSchema
});
var updateUserBuildingRoleSchema = zod.z.object({
  userId: uuidSchema,
  roleType: zod.z.string().min(1, "Role is required"),
  buildingSurfacePercentage: zod.z.coerce.number().min(0).max(100).optional()
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
var createFailureReportSchema = zod.z.object({
  buildingId: uuidSchema,
  title: zod.z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: zod.z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  fileIds: zod.z.array(uuidSchema).optional().default([]),
  maintenanceLogIds: zod.z.array(uuidSchema).optional().default([])
});
var updateFailureReportSchema = zod.z.object({
  title: zod.z.string().min(1).max(100).optional(),
  description: zod.z.string().max(2e3).optional(),
  fileIds: zod.z.array(uuidSchema).optional(),
  maintenanceLogIds: zod.z.array(uuidSchema).optional()
});
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
var createMaintenanceLogSchema = zod.z.object({
  buildingId: uuidSchema,
  title: zod.z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: zod.z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  cost: zod.z.coerce.number().min(0, "Cost must be a positive number").optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: zod.z.boolean().optional().default(false),
  warrantyExpiresAt: zod.z.coerce.date().optional(),
  fileIds: zod.z.array(uuidSchema).optional().default([]),
  failureReportIds: zod.z.array(uuidSchema).optional().default([]),
  pollIds: zod.z.array(uuidSchema).optional().default([])
});
var updateMaintenanceLogSchema = zod.z.object({
  title: zod.z.string().min(1).max(100).optional(),
  description: zod.z.string().max(2e3).optional(),
  cost: zod.z.coerce.number().min(0).optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: zod.z.boolean().optional(),
  warrantyExpiresAt: zod.z.coerce.date().optional().nullable(),
  fileIds: zod.z.array(uuidSchema).optional(),
  failureReportIds: zod.z.array(uuidSchema).optional(),
  pollIds: zod.z.array(uuidSchema).optional()
});
var NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2e3
};
var noticeEventSchema = zod.z.object({
  startDate: zod.z.coerce.date(),
  endDate: zod.z.coerce.date(),
  title: zod.z.string().max(100, "Event title must be at most 100 characters").optional()
});
var createNoticeSchema = zod.z.object({
  buildingId: uuidSchema,
  title: zod.z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`),
  content: zod.z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
    NOTICE_LIMITS.CONTENT_MAX,
    `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`
  ),
  events: zod.z.array(noticeEventSchema).optional().default([]),
  fileIds: zod.z.array(uuidSchema).optional().default([])
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
  events: zod.z.array(noticeEventSchema).optional(),
  fileIds: zod.z.array(uuidSchema).optional()
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
  buildingId: uuidSchema,
  question: zod.z.string().min(POLL_LIMITS.QUESTION_MIN, "Question must be at least 5 characters").max(
    POLL_LIMITS.QUESTION_MAX,
    `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`
  ),
  options: zod.z.array(zod.z.string().max(POLL_LIMITS.OPTION_MAX, "Option must be at most 100 characters")).min(1, "At least one option is required"),
  pollType: pollTypeSchema,
  deadline: zod.z.coerce.date({ error: "Deadline is required" }),
  requiredConsensusPercentage: zod.z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  fileIds: zod.z.array(uuidSchema).optional().default([])
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
var votePollSchema = zod.z.object({
  optionId: uuidSchema
});
var finalizePollSchema = zod.z.object({
  result: zod.z.string().optional()
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

exports.ApprovalStatusSchema = ApprovalStatusSchema;
exports.BUILDING_LIMITS = BUILDING_LIMITS;
exports.BUILDING_TYPES = BUILDING_TYPES;
exports.CHAT_LIMITS = CHAT_LIMITS;
exports.CommonStatusSchema = CommonStatusSchema;
exports.EVENT_COLORS = EVENT_COLORS;
exports.EVENT_TYPES = EVENT_TYPES;
exports.EVENT_TYPE_COLOR_MAP = EVENT_TYPE_COLOR_MAP;
exports.FAQ_LIMITS = FAQ_LIMITS;
exports.FailureStatusSchema = FailureStatusSchema;
exports.MAINTENANCE_FINANCED_BY = MAINTENANCE_FINANCED_BY;
exports.MaintenanceStatusSchema = MaintenanceStatusSchema;
exports.NOTICE_LIMITS = NOTICE_LIMITS;
exports.ORGANIZATION_LIMITS = ORGANIZATION_LIMITS;
exports.POLL_LIMITS = POLL_LIMITS;
exports.POLL_TYPES = POLL_TYPES;
exports.PrioritySchema = PrioritySchema;
exports.TRANSACTION_CATEGORY_LIMITS = TRANSACTION_CATEGORY_LIMITS;
exports.apartmentRoleSchema = apartmentRoleSchema;
exports.apartmentSchema = apartmentSchema;
exports.apartmentUserSchema = apartmentUserSchema;
exports.apiErrorSchema = apiErrorSchema;
exports.approvalStatusOptions = approvalStatusOptions;
exports.approveFailureReportSchema = approveFailureReportSchema;
exports.approveNoticeSchema = approveNoticeSchema;
exports.baseEntitySchema = baseEntitySchema;
exports.buildingEntitySchema = buildingEntitySchema;
exports.buildingTypeSchema = buildingTypeSchema;
exports.buildingUserEntitySchema = buildingUserEntitySchema;
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
exports.eventTypeSchema = eventTypeSchema;
exports.failureStatusOptions = failureStatusOptions;
exports.finalizePollSchema = finalizePollSchema;
exports.forgotPasswordSchema = forgotPasswordSchema;
exports.garageRoleSchema = garageRoleSchema;
exports.garageSchema = garageSchema;
exports.garageUserSchema = garageUserSchema;
exports.getTransactionCategoriesQuerySchema = getTransactionCategoriesQuerySchema;
exports.joinBuildingWithOtpSchema = joinBuildingWithOtpSchema;
exports.loginSchema = loginSchema;
exports.maintenanceFinancedBySchema = maintenanceFinancedBySchema;
exports.maintenanceStatusOptions = maintenanceStatusOptions;
exports.noticeEventSchema = noticeEventSchema;
exports.optionalDateTimeSchema = optionalDateTimeSchema;
exports.paginatedApartmentsResponseSchema = paginatedApartmentsResponseSchema;
exports.paginatedResponseSchema = paginatedResponseSchema;
exports.paginationParamsSchema = paginationParamsSchema;
exports.passwordSchema = passwordSchema;
exports.permissionFieldsSchema = permissionFieldsSchema;
exports.permissionsResponseSchema = permissionsResponseSchema;
exports.pollTypeSchema = pollTypeSchema;
exports.priorityOptions = priorityOptions;
exports.registerSchema = registerSchema;
exports.reorderFaqsSchema = reorderFaqsSchema;
exports.resetPasswordSchema = resetPasswordSchema;
exports.roleTypeSchema = roleTypeSchema;
exports.sendMessageSchema = sendMessageSchema;
exports.storageUnitRoleSchema = storageUnitRoleSchema;
exports.storageUnitSchema = storageUnitSchema;
exports.storageUnitUserSchema = storageUnitUserSchema;
exports.strongPasswordSchema = strongPasswordSchema;
exports.timeSchema = timeSchema;
exports.updateBuildingSchema = updateBuildingSchema;
exports.updateConversationSchema = updateConversationSchema;
exports.updateEventSchema = updateEventSchema;
exports.updateFailureReportSchema = updateFailureReportSchema;
exports.updateFaqSchema = updateFaqSchema;
exports.updateMaintenanceLogSchema = updateMaintenanceLogSchema;
exports.updateNoticeSchema = updateNoticeSchema;
exports.updateOrganizationSchema = updateOrganizationSchema;
exports.updatePasswordSchema = updatePasswordSchema;
exports.updateTransactionCategorySchema = updateTransactionCategorySchema;
exports.updateUserBuildingRoleSchema = updateUserBuildingRoleSchema;
exports.userEntitySchema = userEntitySchema;
exports.uuidSchema = uuidSchema;
exports.verifyOtpSchema = verifyOtpSchema;
exports.votePollSchema = votePollSchema;
//# sourceMappingURL=chunk-HV6FC2UQ.cjs.map
//# sourceMappingURL=chunk-HV6FC2UQ.cjs.map