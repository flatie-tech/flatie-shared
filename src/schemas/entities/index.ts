// Apartment schemas
export type {
  Apartment,
  ApartmentRole,
  ApartmentUser,
  PaginatedApartmentsResponse,
} from './apartment.schema';
export {
  apartmentRoleSchema,
  apartmentSchema,
  apartmentUserSchema,
  paginatedApartmentsResponseSchema,
} from './apartment.schema';

// Building schemas

export type {
  BuildingTypeOption,
  CreateBuildingSchema,
  JoinBuildingWithOtpSchema,
  UpdateBuildingSchema,
  UpdateUserBuildingRoleSchema,
} from './building.schema';
export {
  BUILDING_LIMITS,
  BUILDING_TYPES,
  buildingTypeSchema,
  createBuildingSchema,
  joinBuildingWithOtpSchema,
  updateBuildingSchema,
  updateUserBuildingRoleSchema,
} from './building.schema';
export type {
  CreateEventSchema,
  EventColorOption,
  EventTypeOption,
  TimeSchema,
  UpdateEventSchema,
} from './event.schema';
// Event schemas
export {
  createEventSchema,
  EVENT_COLORS,
  EVENT_TYPE_COLOR_MAP,
  EVENT_TYPES,
  eventColorSchema,
  eventTypeSchema,
  timeSchema,
  updateEventSchema,
} from './event.schema';
export type {
  ApproveFailureReportSchema,
  CreateFailureReportSchema,
  UpdateFailureReportSchema,
} from './failure-report.schema';
// Failure report schemas
export {
  approveFailureReportSchema,
  createFailureReportSchema,
  updateFailureReportSchema,
} from './failure-report.schema';
// Garage schemas
export type { Garage, GarageRole, GarageUser } from './garage.schema';
export { garageRoleSchema, garageSchema, garageUserSchema } from './garage.schema';
export type {
  CreateMaintenanceLogSchema,
  MaintenanceFinancedByOption,
  UpdateMaintenanceLogSchema,
} from './maintenance-log.schema';
// Maintenance log schemas
export {
  createMaintenanceLogSchema,
  MAINTENANCE_FINANCED_BY,
  maintenanceFinancedBySchema,
  updateMaintenanceLogSchema,
} from './maintenance-log.schema';
export type {
  ApproveNoticeSchema,
  CreateNoticeSchema,
  NoticeEventSchema,
  UpdateNoticeSchema,
} from './notice.schema';
// Notice schemas
export {
  approveNoticeSchema,
  createNoticeSchema,
  NOTICE_LIMITS,
  noticeEventSchema,
  updateNoticeSchema,
} from './notice.schema';
export type {
  CreatePollSchema,
  FinalizePollSchema,
  PollTypeOption,
  VotePollSchema,
} from './poll.schema';
// Poll schemas
export {
  createPollSchema,
  finalizePollSchema,
  POLL_LIMITS,
  POLL_TYPES,
  pollTypeSchema,
  votePollSchema,
} from './poll.schema';

// Storage unit schemas
export type { StorageUnit, StorageUnitRole, StorageUnitUser } from './storage-unit.schema';
export {
  storageUnitRoleSchema,
  storageUnitSchema,
  storageUnitUserSchema,
} from './storage-unit.schema';
