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
    waste_collection: "waste_collection";
    other: "other";
    service: "service";
    inspection: "inspection";
    discussion: "discussion";
    planned_works: "planned_works";
}>;
/**
 * Event color schema
 */
declare const eventColorSchema: z.ZodEnum<{
    orange: "orange";
    blue: "blue";
    green: "green";
    red: "red";
    yellow: "yellow";
    purple: "purple";
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
        waste_collection: "waste_collection";
        other: "other";
        service: "service";
        inspection: "inspection";
        discussion: "discussion";
        planned_works: "planned_works";
    }>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodCoercedDate<unknown>;
    endDate: z.ZodCoercedDate<unknown>;
    color: z.ZodEnum<{
        orange: "orange";
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
        purple: "purple";
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
        waste_collection: "waste_collection";
        other: "other";
        service: "service";
        inspection: "inspection";
        discussion: "discussion";
        planned_works: "planned_works";
    }>>;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    endDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    color: z.ZodOptional<z.ZodEnum<{
        orange: "orange";
        blue: "blue";
        green: "green";
        red: "red";
        yellow: "yellow";
        purple: "purple";
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

/**
 * Poll type options
 */
declare const POLL_TYPES: readonly ["consensus", "community"];
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
 * Vote-with-ID-card request schema
 *
 * A ballot cast under VotingStrength.ID_CARD: the standard vote payload
 * plus the voter's ID card number, which the backend re-hashes and
 * compares against their approved id-card verification record.
 */
declare const voteWithIdCardSchema: z.ZodObject<{
    selectedOptionIndex: z.ZodNumber;
    idCardNumber: z.ZodString;
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
type VoteWithIdCardSchema = z.infer<typeof voteWithIdCardSchema>;
type FinalizePollSchema = z.infer<typeof finalizePollSchema>;
type RecordOfflineVotesSchema = z.infer<typeof recordOfflineVotesSchema>;

export { type CreatePollSchema as C, type EventColorOption as E, type FinalizePollSchema as F, POLL_LIMITS as P, type RecurrenceTypeOption as R, type UpdatePollSchema as U, type VotePollSchema as V, type EventTypeOption as a, EVENT_COLORS as b, createEventSchema as c, EVENT_TYPE_COLOR_MAP as d, EVENT_TYPES as e, eventColorSchema as f, eventTypeSchema as g, RECURRENCE_TYPES as h, type RecordOfflineVotesSchema as i, type VoteWithIdCardSchema as j, createPollSchema as k, finalizePollSchema as l, POLL_TYPES as m, recordOfflineVotesSchema as n, updatePollSchema as o, pollTypeSchema as p, voteWithIdCardSchema as q, recurrenceTypeSchema as r, timeSchema as t, updateEventSchema as u, votePollSchema as v };
