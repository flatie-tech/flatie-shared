import { z } from 'zod';

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
    orange: "orange";
    purple: "purple";
    blue: "blue";
    green: "green";
    red: "red";
    yellow: "yellow";
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
        orange: "orange";
        purple: "purple";
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
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
        orange: "orange";
        purple: "purple";
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
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
    scopedOwnerIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
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
    consensusCategory: z.ZodOptional<z.ZodString>;
    legalBasis: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        active: "active";
        inactive: "inactive";
        ended: "ended";
    }>>;
    scopedUnitIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
    scopedOwnerIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodArray<z.ZodString>>>;
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
 * Record-offline-votes request schema
 *
 * A representative records approval votes collected on a printed
 * signature sheet (potpisna lista). Votes are attributed to owner
 * records — owners need no user account.
 */
declare const recordOfflineVotesSchema: z.ZodObject<{
    ownerIds: z.ZodArray<z.ZodString>;
    proofFileId: z.ZodOptional<z.ZodString>;
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
type RecordOfflineVotesSchema = z.infer<typeof recordOfflineVotesSchema>;

export { POLL_TYPES as A, pollTypeSchema as B, type CreateEventSchema as C, recordOfflineVotesSchema as D, type EventColorOption as E, type FinalizePollSchema as F, updatePollSchema as G, votePollSchema as H, type MaintenanceFinancedByOption as M, type PollTypeOption as P, type RecurrenceTypeOption as R, type TimeSchema as T, type UpdateEventSchema as U, type VotePollSchema as V, type EventTypeOption as a, EVENT_COLORS as b, createEventSchema as c, EVENT_TYPE_COLOR_MAP as d, EVENT_TYPES as e, eventColorSchema as f, eventTypeSchema as g, RECURRENCE_TYPES as h, type CreateMaintenanceLogSchema as i, type MaintenanceLogEventSchema as j, type UpdateMaintenanceLogSchema as k, createMaintenanceLogSchema as l, MAINTENANCE_FINANCED_BY as m, MAINTENANCE_LOG_LIMITS as n, maintenanceFinancedBySchema as o, maintenanceLogEventSchema as p, updateMaintenanceLogSchema as q, recurrenceTypeSchema as r, type CreatePollSchema as s, timeSchema as t, updateEventSchema as u, type RecordOfflineVotesSchema as v, type UpdatePollSchema as w, createPollSchema as x, finalizePollSchema as y, POLL_LIMITS as z };
