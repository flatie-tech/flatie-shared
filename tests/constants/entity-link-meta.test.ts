import { describe, expect, it } from 'vitest';
import { ENTITY_LINK_TYPE_META } from '../../src/constants/entity-link-meta';
import { LinkableEntityType } from '../../src/enums/entity-link.enum';

describe('ENTITY_LINK_TYPE_META', () => {
  it('covers every linkable entity type (including board_card)', () => {
    for (const type of Object.values(LinkableEntityType)) {
      expect(ENTITY_LINK_TYPE_META, `missing meta for ${type}`).toHaveProperty(type);
    }
    expect(ENTITY_LINK_TYPE_META).toHaveProperty(LinkableEntityType.BOARD_CARD);
  });

  it('has no entries for unknown entity types', () => {
    const known = new Set<string>(Object.values(LinkableEntityType));
    for (const key of Object.keys(ENTITY_LINK_TYPE_META)) {
      expect(known.has(key), `unexpected meta key ${key}`).toBe(true);
    }
  });

  it('every entry carries a non-empty section, icon, and tint', () => {
    for (const [type, meta] of Object.entries(ENTITY_LINK_TYPE_META)) {
      expect(meta.section, `${type}.section`).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(meta.icon, `${type}.icon`).toMatch(/^[a-z][a-z0-9-]*$/);
      expect(meta.tint, `${type}.tint`).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it('tint values stay within the shared badge-color token vocabulary', () => {
    const badgeTokens = [
      'success',
      'warning',
      'info',
      'danger',
      'purple',
      'orange',
      'amber',
      'neutral',
    ];
    for (const [type, meta] of Object.entries(ENTITY_LINK_TYPE_META)) {
      expect(badgeTokens, `${type}.tint = ${meta.tint}`).toContain(meta.tint);
    }
  });
});
