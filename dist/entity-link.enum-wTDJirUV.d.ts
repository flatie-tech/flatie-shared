/**
 * Link types stored in the backend `entity_links.link_type` Postgres enum.
 * Values must stay in sync with the `entity_link_type` pgEnum in
 * flatie-backend/src/db/schema/entity-links.schema.ts.
 */
declare const EntityLinkType: {
    readonly IMAGE: "image";
    readonly DOCUMENT: "document";
    readonly INVOICE: "invoice";
    readonly WARRANTY: "warranty";
    readonly AGENDA: "agenda";
    readonly SCHEDULE: "schedule";
    readonly DEADLINE: "deadline";
    readonly MEETING: "meeting";
    readonly RESOLVED_BY: "resolved_by";
    readonly BASED_ON: "based_on";
    readonly DISCUSSED_IN: "discussed_in";
    readonly EXPENSE_FOR: "expense_for";
    readonly RELATED_TO: "related_to";
};
type EntityLinkType = (typeof EntityLinkType)[keyof typeof EntityLinkType];
/**
 * Entity types that can appear on either end of an entity link
 * (`entity_links.source_type` / `target_type`).
 */
declare const LinkableEntityType: {
    readonly FAILURE_REPORT: "failure_report";
    readonly MAINTENANCE_LOG: "maintenance_log";
    readonly NOTICE: "notice";
    readonly EVENT: "event";
    readonly POLL: "poll";
    readonly FILE: "file";
    readonly EXPENSE_TRANSACTION: "expense_transaction";
};
type LinkableEntityType = (typeof LinkableEntityType)[keyof typeof LinkableEntityType];

export { EntityLinkType as E, LinkableEntityType as L };
