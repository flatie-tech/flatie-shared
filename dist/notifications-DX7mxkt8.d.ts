import { z } from 'zod';
import { N as NotificationType } from './notification.enum-C1IHyJHj.js';

/**
 * Recursively strips the `[k: string]: unknown` index signature that
 * Zod 4's `looseObject` adds to inferred types. Gives consumers clean
 * types where only explicitly declared properties are accessible, at
 * every nesting level.
 *
 * Preserves Date, RegExp, and other built-in objects as-is.
 */
type Strict<T> = T extends Date | RegExp | Map<any, any> | Set<any> ? T : T extends readonly (infer U)[] ? Strict<U>[] : T extends object ? {
    [K in keyof T as string extends K ? never : K]: Strict<T[K]>;
} : T;

/**
 * Maps each notification type to its `data` payload schema.
 *
 * Sourced from backend emit sites (NotificationService#emit callers in
 * flatie-backend `src/modules/**`). The service prepends `entityType`,
 * `entityId`, `actorId`, and `actorName` to every payload before insert.
 */
declare const notificationDataSchemaByType: {
    readonly notice_created: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        content: z.ZodString;
        createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        isPinned: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>;
    readonly notice_approved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>;
    readonly notice_rejected: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>;
    readonly poll_created: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        deadline: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    readonly poll_deadline_24h: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly poll_deadline_1h: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly poll_finalized: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
    readonly event_created: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly event_updated: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly event_cancelled: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
    }, z.core.$strip>;
    readonly event_reminder_24h: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        startTime: z.ZodOptional<z.ZodString>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly event_reminder_1h: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        startTime: z.ZodOptional<z.ZodString>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly waste_reminder_mixed: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodOptional<z.ZodString>;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly waste_reminder_bio: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodOptional<z.ZodString>;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly waste_reminder_plastic_metal: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodOptional<z.ZodString>;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly waste_reminder_paper_cardboard: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodOptional<z.ZodString>;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>;
    readonly failure_report_created: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly failure_report_status_changed: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        status: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly failure_report_resolved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        status: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly failure_report_approved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>;
    readonly failure_report_declined: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>;
    readonly payment_due: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly payment_received: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly dunning_notice_issued: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        noticeId: z.ZodOptional<z.ZodString>;
        caseId: z.ZodOptional<z.ZodString>;
        level: z.ZodOptional<z.ZodString>;
        levelLabel: z.ZodOptional<z.ZodString>;
        amount: z.ZodOptional<z.ZodString>;
        deadline: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly building_join_request_received: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        userName: z.ZodString;
        userEmail: z.ZodString;
        message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly building_join_request_approved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly building_join_request_rejected: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly building_member_joined: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly building_role_changed: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        role: z.ZodString;
    }, z.core.$strip>;
    readonly owner_record_linked: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>;
    readonly building_pending_approval: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>;
    readonly building_approved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>;
    readonly building_rejected: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
        rejectionReason: z.ZodString;
    }, z.core.$strip>;
    readonly org_member_added: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        orgName: z.ZodString;
        orgRole: z.ZodString;
    }, z.core.$strip>;
    readonly org_member_removed: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        orgName: z.ZodString;
    }, z.core.$strip>;
    readonly org_member_role_changed: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        orgName: z.ZodString;
        orgRole: z.ZodString;
    }, z.core.$strip>;
    readonly chat_message: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        senderName: z.ZodString;
        messagePreview: z.ZodString;
        conversationId: z.ZodString;
    }, z.core.$strip>;
    readonly email_received: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        threadId: z.ZodString;
        subject: z.ZodString;
        fromAddress: z.ZodString;
        preview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly poll_vote_signature_pending: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
    }, z.core.$strip>;
    readonly poll_vote_signature_approved: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
    }, z.core.$strip>;
    readonly poll_vote_signature_rejected: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
    readonly system_announcement: z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
};
/**
 * Union of all notification-type data payloads. Each variant is the
 * per-type object plus the shared base fields (actionUrl, entity*, actor*).
 *
 * Payloads are not discriminated internally — callers discriminate on the
 * parent `type` field or, when not narrowing, read only shared keys like
 * `actionUrl` which are present on the base schema.
 */
declare const notificationDataSchema: z.ZodUnion<readonly [z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    content: z.ZodString;
    createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    isPinned: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
    pollType: z.ZodString;
    deadline: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
    options: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
    pollType: z.ZodString;
    options: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
    color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    wasteTypeLabel: z.ZodOptional<z.ZodString>;
    subtype: z.ZodString;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    status: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    userName: z.ZodString;
    userEmail: z.ZodString;
    message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    role: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    buildingName: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    buildingName: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    buildingName: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    buildingName: z.ZodString;
    rejectionReason: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    senderName: z.ZodString;
    messagePreview: z.ZodString;
    conversationId: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    threadId: z.ZodString;
    subject: z.ZodString;
    fromAddress: z.ZodString;
    preview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    startTime: z.ZodOptional<z.ZodString>;
    startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
    question: z.ZodString;
    reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodOptional<z.ZodString>;
    entityId: z.ZodOptional<z.ZodString>;
    actorId: z.ZodOptional<z.ZodString>;
    actorName: z.ZodOptional<z.ZodString>;
    actionUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>]>;
declare const notificationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    body: z.ZodString;
    type: z.ZodEnum<{
        notice_created: "notice_created";
        notice_approved: "notice_approved";
        notice_rejected: "notice_rejected";
        poll_created: "poll_created";
        poll_deadline_24h: "poll_deadline_24h";
        poll_deadline_1h: "poll_deadline_1h";
        poll_finalized: "poll_finalized";
        event_created: "event_created";
        event_reminder_24h: "event_reminder_24h";
        event_reminder_1h: "event_reminder_1h";
        event_updated: "event_updated";
        event_cancelled: "event_cancelled";
        waste_reminder_mixed: "waste_reminder_mixed";
        waste_reminder_bio: "waste_reminder_bio";
        waste_reminder_plastic_metal: "waste_reminder_plastic_metal";
        waste_reminder_paper_cardboard: "waste_reminder_paper_cardboard";
        failure_report_created: "failure_report_created";
        failure_report_status_changed: "failure_report_status_changed";
        failure_report_resolved: "failure_report_resolved";
        failure_report_approved: "failure_report_approved";
        failure_report_declined: "failure_report_declined";
        payment_due: "payment_due";
        payment_received: "payment_received";
        dunning_notice_issued: "dunning_notice_issued";
        building_join_request_received: "building_join_request_received";
        building_join_request_approved: "building_join_request_approved";
        building_join_request_rejected: "building_join_request_rejected";
        building_member_joined: "building_member_joined";
        building_role_changed: "building_role_changed";
        owner_record_linked: "owner_record_linked";
        building_pending_approval: "building_pending_approval";
        building_approved: "building_approved";
        building_rejected: "building_rejected";
        chat_message: "chat_message";
        email_received: "email_received";
        poll_vote_signature_pending: "poll_vote_signature_pending";
        poll_vote_signature_approved: "poll_vote_signature_approved";
        poll_vote_signature_rejected: "poll_vote_signature_rejected";
        org_member_added: "org_member_added";
        org_member_removed: "org_member_removed";
        org_member_role_changed: "org_member_role_changed";
        system_announcement: "system_announcement";
    }>;
    buildingId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    buildingName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    data: z.ZodOptional<z.ZodNullable<z.ZodUnion<readonly [z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        content: z.ZodString;
        createdAt: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        isPinned: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        deadline: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        pollType: z.ZodString;
        options: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        subtype: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
        color: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        eventType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
        endDate: z.ZodOptional<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodDate]>>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        wasteTypeLabel: z.ZodOptional<z.ZodString>;
        subtype: z.ZodString;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        location: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        status: z.ZodString;
        description: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        userName: z.ZodString;
        userEmail: z.ZodString;
        message: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        rejectionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        role: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        buildingName: z.ZodString;
        rejectionReason: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        senderName: z.ZodString;
        messagePreview: z.ZodString;
        conversationId: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        threadId: z.ZodString;
        subject: z.ZodString;
        fromAddress: z.ZodString;
        preview: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        title: z.ZodString;
        startTime: z.ZodOptional<z.ZodString>;
        startDate: z.ZodUnion<[z.ZodString, z.ZodDate]>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
        question: z.ZodString;
        reason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>, z.ZodObject<{
        entityType: z.ZodOptional<z.ZodString>;
        entityId: z.ZodOptional<z.ZodString>;
        actorId: z.ZodOptional<z.ZodString>;
        actorName: z.ZodOptional<z.ZodString>;
        actionUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>]>>>;
    read: z.ZodBoolean;
    readAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodString;
}, z.core.$loose>;
declare const notificationPreferenceItemSchema: z.ZodObject<{
    type: z.ZodString;
    description: z.ZodString;
    enabled: z.ZodBoolean;
    channels: z.ZodArray<z.ZodString>;
}, z.core.$loose>;
declare const notificationPreferenceCategorySchema: z.ZodObject<{
    category: z.ZodString;
    notifications: z.ZodArray<z.ZodObject<{
        type: z.ZodString;
        description: z.ZodString;
        enabled: z.ZodBoolean;
        channels: z.ZodArray<z.ZodString>;
    }, z.core.$loose>>;
}, z.core.$loose>;
/**
 * Look up the data payload schema for a specific notification type.
 *
 * Useful for consumers that know the concrete type and want to parse
 * `notification.data` into a narrowed shape (e.g. push-notification handlers
 * that branch on `type`).
 */
declare const getNotificationDataSchema: <T extends NotificationType>(type: T) => (typeof notificationDataSchemaByType)[T];
type NotificationResponse = Strict<z.infer<typeof notificationResponseSchema>>;
type NotificationPreferenceItem = Strict<z.infer<typeof notificationPreferenceItemSchema>>;
type NotificationPreferenceCategory = Strict<z.infer<typeof notificationPreferenceCategorySchema>>;

export { type NotificationPreferenceCategory as N, type Strict as S, type NotificationPreferenceItem as a, type NotificationResponse as b, notificationPreferenceCategorySchema as c, notificationPreferenceItemSchema as d, notificationResponseSchema as e, getNotificationDataSchema as g, notificationDataSchema as n };
