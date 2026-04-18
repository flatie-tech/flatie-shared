import { ApartmentRole, OrgRole, OrgType, TransactionType, Role, BuildingRole, PlatformRole } from './chunk-P25WSM2I.js';
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
var BUILDING_TYPES = ["residential", "commercial"];
var buildingTypeSchema = z.enum(BUILDING_TYPES);
var BUILDING_LIMITS = {
  NAME_MIN: 1,
  NAME_MAX: 100,
  ADDRESS_MIN: 1,
  ADDRESS_MAX: 200,
  UNITS_MIN: 1,
  UNITS_MAX: 1e4
};
var createBuildingSchema = z.object({
  name: z.string().min(BUILDING_LIMITS.NAME_MIN, "Name is required").max(BUILDING_LIMITS.NAME_MAX, `Name must be at most ${BUILDING_LIMITS.NAME_MAX} characters`),
  type: buildingTypeSchema,
  address: z.string().min(BUILDING_LIMITS.ADDRESS_MIN, "Address is required").max(
    BUILDING_LIMITS.ADDRESS_MAX,
    `Address must be at most ${BUILDING_LIMITS.ADDRESS_MAX} characters`
  ),
  totalUnits: z.coerce.number().min(BUILDING_LIMITS.UNITS_MIN, "Building must have at least 1 unit").max(
    BUILDING_LIMITS.UNITS_MAX,
    `Building cannot have more than ${BUILDING_LIMITS.UNITS_MAX} units`
  )
});
var updateBuildingSchema = z.object({
  name: z.string().min(1).max(BUILDING_LIMITS.NAME_MAX).optional(),
  type: buildingTypeSchema.optional(),
  address: z.string().min(1).max(BUILDING_LIMITS.ADDRESS_MAX).optional(),
  totalUnits: z.coerce.number().min(1).max(BUILDING_LIMITS.UNITS_MAX).optional()
});
var joinBuildingWithOtpSchema = z.object({
  otp: z.string().min(1, "OTP is required"),
  buildingId: uuidSchema
});
var updateUserBuildingRoleSchema = z.object({
  userId: uuidSchema,
  roleType: z.string().min(1, "Role is required"),
  buildingSurfacePercentage: z.coerce.number().min(0).max(100).optional()
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
var createFailureReportSchema = z.object({
  buildingId: uuidSchema,
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  fileIds: z.array(uuidSchema).optional().default([]),
  maintenanceLogIds: z.array(uuidSchema).optional().default([])
});
var updateFailureReportSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2e3).optional(),
  fileIds: z.array(uuidSchema).optional(),
  maintenanceLogIds: z.array(uuidSchema).optional()
});
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
var createMaintenanceLogSchema = z.object({
  buildingId: uuidSchema,
  title: z.string().min(1, "Title is required").max(100, "Title must be at most 100 characters"),
  description: z.string().max(2e3, "Description must be at most 2000 characters").optional(),
  cost: z.coerce.number().min(0, "Cost must be a positive number").optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: z.boolean().optional().default(false),
  warrantyExpiresAt: z.coerce.date().optional(),
  fileIds: z.array(uuidSchema).optional().default([]),
  failureReportIds: z.array(uuidSchema).optional().default([]),
  pollIds: z.array(uuidSchema).optional().default([])
});
var updateMaintenanceLogSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(2e3).optional(),
  cost: z.coerce.number().min(0).optional(),
  financedBy: maintenanceFinancedBySchema.optional(),
  hasWarranty: z.boolean().optional(),
  warrantyExpiresAt: z.coerce.date().optional().nullable(),
  fileIds: z.array(uuidSchema).optional(),
  failureReportIds: z.array(uuidSchema).optional(),
  pollIds: z.array(uuidSchema).optional()
});
var NOTICE_LIMITS = {
  TITLE_MIN: 1,
  TITLE_MAX: 100,
  CONTENT_MIN: 1,
  CONTENT_MAX: 2e3
};
var noticeEventSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  title: z.string().max(100, "Event title must be at most 100 characters").optional()
});
var createNoticeSchema = z.object({
  buildingId: uuidSchema,
  title: z.string().min(NOTICE_LIMITS.TITLE_MIN, "Title is required").max(NOTICE_LIMITS.TITLE_MAX, `Title must be at most ${NOTICE_LIMITS.TITLE_MAX} characters`),
  content: z.string().min(NOTICE_LIMITS.CONTENT_MIN, "Content is required").max(
    NOTICE_LIMITS.CONTENT_MAX,
    `Content must be at most ${NOTICE_LIMITS.CONTENT_MAX} characters`
  ),
  events: z.array(noticeEventSchema).optional().default([]),
  fileIds: z.array(uuidSchema).optional().default([])
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
  events: z.array(noticeEventSchema).optional(),
  fileIds: z.array(uuidSchema).optional()
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
  buildingId: uuidSchema,
  question: z.string().min(POLL_LIMITS.QUESTION_MIN, "Question must be at least 5 characters").max(
    POLL_LIMITS.QUESTION_MAX,
    `Question must be at most ${POLL_LIMITS.QUESTION_MAX} characters`
  ),
  options: z.array(z.string().max(POLL_LIMITS.OPTION_MAX, "Option must be at most 100 characters")).min(1, "At least one option is required"),
  pollType: pollTypeSchema,
  deadline: z.coerce.date({ error: "Deadline is required" }),
  requiredConsensusPercentage: z.coerce.number().min(POLL_LIMITS.CONSENSUS_PERCENTAGE_MIN).max(POLL_LIMITS.CONSENSUS_PERCENTAGE_MAX).optional(),
  fileIds: z.array(uuidSchema).optional().default([])
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
var votePollSchema = z.object({
  optionId: uuidSchema
});
var finalizePollSchema = z.object({
  result: z.string().optional()
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

export { ApprovalStatusSchema, BUILDING_LIMITS, BUILDING_TYPES, CHAT_LIMITS, CommonStatusSchema, EVENT_COLORS, EVENT_TYPES, EVENT_TYPE_COLOR_MAP, FAQ_LIMITS, FailureStatusSchema, MAINTENANCE_FINANCED_BY, MaintenanceStatusSchema, NOTICE_LIMITS, ORGANIZATION_LIMITS, POLL_LIMITS, POLL_TYPES, PrioritySchema, TRANSACTION_CATEGORY_LIMITS, addOrgMemberSchema, apartmentRoleSchema, apartmentSchema, apartmentUserSchema, apiErrorSchema, approvalStatusOptions, approveFailureReportSchema, approveNoticeSchema, assignOrgBuildingSchema, assignOrgMemberBuildingSchema, baseEntitySchema, buildingEntitySchema, buildingTypeSchema, buildingUserEntitySchema, commonStatusOptions, copyFaqsSchema, copyTransactionCategoriesSchema, createBuildingSchema, createConversationSchema, createEventSchema, createFailureReportSchema, createFaqSchema, createMaintenanceLogSchema, createNoticeSchema, createOrganizationSchema, createPollSchema, createTransactionCategorySchema, cursorQuerySchema, dateRangeParamsSchema, dateRangeWithValidationSchema, dateTimeSchema, emailSchema, eventColorSchema, eventTypeSchema, failureStatusOptions, finalizePollSchema, forgotPasswordSchema, garageRoleSchema, garageSchema, garageUserSchema, getOrgBuildingsQuerySchema, getOrgMembersQuerySchema, getTransactionCategoriesQuerySchema, inviteOrgMemberSchema, joinBuildingWithOtpSchema, loginSchema, maintenanceFinancedBySchema, maintenanceStatusOptions, noticeEventSchema, optionalDateTimeSchema, paginatedApartmentsResponseSchema, paginatedResponseSchema, paginationParamsSchema, passwordSchema, permissionFieldsSchema, permissionsResponseSchema, pollTypeSchema, priorityOptions, registerSchema, reorderFaqsSchema, resetPasswordSchema, roleTypeSchema, searchUsersQuerySchema, sendMessageSchema, storageUnitRoleSchema, storageUnitSchema, storageUnitUserSchema, strongPasswordSchema, timeSchema, updateBuildingSchema, updateConversationSchema, updateEventSchema, updateFailureReportSchema, updateFaqSchema, updateMaintenanceLogSchema, updateNoticeSchema, updateOrgMemberRoleSchema, updateOrganizationSchema, updatePasswordSchema, updateTransactionCategorySchema, updateUserBuildingRoleSchema, userEntitySchema, uuidSchema, verifyOtpSchema, votePollSchema };
//# sourceMappingURL=chunk-JXB5ZXO5.js.map
//# sourceMappingURL=chunk-JXB5ZXO5.js.map