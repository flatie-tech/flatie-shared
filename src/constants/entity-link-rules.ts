import { EntityLinkType, LinkableEntityType } from '../enums/entity-link.enum';

/**
 * A legal (source, target, linkType) triple for the generic links API.
 * `'*'` on source/target means "any type in RELATED_TO_LINKABLE_TYPES".
 */
export interface EntityLinkRule {
  readonly source: LinkableEntityType | '*';
  readonly target: LinkableEntityType | '*';
  readonly linkType: EntityLinkType;
}

/**
 * Entity types the wildcard `related_to` rule spans. Deliberately excludes
 * `expense_transaction` — expenses relate to logs through `expense_for`.
 */
export const RELATED_TO_LINKABLE_TYPES: readonly LinkableEntityType[] = [
  LinkableEntityType.NOTICE,
  LinkableEntityType.EVENT,
  LinkableEntityType.POLL,
  LinkableEntityType.MAINTENANCE_LOG,
  LinkableEntityType.FAILURE_REPORT,
  LinkableEntityType.FILE,
  LinkableEntityType.BOARD_CARD,
];

/**
 * Every (source, target, linkType) triple the generic links API accepts.
 * The first six mirror the links the entity create/update flows already
 * write inline; `related_to` is the free-form association available
 * between any two linkable entities.
 *
 * Note: `schedule` is reserved for inline-created events that die with
 * their parent — the generic API must not create schedule links to
 * pre-existing events (use `related_to` instead).
 */
export const ALLOWED_ENTITY_LINKS: readonly EntityLinkRule[] = [
  {
    source: LinkableEntityType.NOTICE,
    target: LinkableEntityType.EVENT,
    linkType: EntityLinkType.SCHEDULE,
  },
  {
    source: LinkableEntityType.MAINTENANCE_LOG,
    target: LinkableEntityType.EVENT,
    linkType: EntityLinkType.SCHEDULE,
  },
  {
    source: LinkableEntityType.FAILURE_REPORT,
    target: LinkableEntityType.EVENT,
    linkType: EntityLinkType.SCHEDULE,
  },
  {
    source: LinkableEntityType.FAILURE_REPORT,
    target: LinkableEntityType.MAINTENANCE_LOG,
    linkType: EntityLinkType.RESOLVED_BY,
  },
  {
    source: LinkableEntityType.MAINTENANCE_LOG,
    target: LinkableEntityType.POLL,
    linkType: EntityLinkType.BASED_ON,
  },
  {
    source: LinkableEntityType.EXPENSE_TRANSACTION,
    target: LinkableEntityType.MAINTENANCE_LOG,
    linkType: EntityLinkType.EXPENSE_FOR,
  },
  { source: '*', target: '*', linkType: EntityLinkType.RELATED_TO },
];

/**
 * Whether the generic links API may create/delete a link with this triple.
 * Self-links (same id would be caught upstream; same type pairs are fine).
 */
export function isEntityLinkAllowed(
  source: LinkableEntityType,
  target: LinkableEntityType,
  linkType: EntityLinkType,
): boolean {
  return ALLOWED_ENTITY_LINKS.some((rule) => {
    if (rule.linkType !== linkType) return false;
    const sourceOk =
      rule.source === '*' ? RELATED_TO_LINKABLE_TYPES.includes(source) : rule.source === source;
    const targetOk =
      rule.target === '*' ? RELATED_TO_LINKABLE_TYPES.includes(target) : rule.target === target;
    return sourceOk && targetOk;
  });
}
