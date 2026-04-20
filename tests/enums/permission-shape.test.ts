import { describe, expect, it } from 'vitest';
import { Permission } from '../../src/enums/permission.enum';

/**
 * Guards against typos and format drift in permission strings.
 *
 * Permissions are passed as opaque strings across the RBAC layer — a typo
 * silently becomes an "unknown permission, access denied" at runtime, which
 * is indistinguishable from "user lacks this permission." These shape checks
 * catch the typo at PR time.
 *
 * The canonical format (documented in docs/conventions.md and consistently
 * used across backend role mappings) is:
 *
 *   domain[_more_domain]:action[:scope]
 *
 *   - domain:        lowercase, underscore-separated (e.g. `notice`,
 *                    `building_role`, `failure_report`).
 *   - action:        lowercase verb (e.g. `create`, `read`, `update`,
 *                    `delete`, `approve`, `pin`, `kick`, `manage`).
 *   - scope:         optional, lowercase. Two families are allowed:
 *                      * ownership scopes: `own` | `any` — pair only with
 *                        update / delete.
 *                      * role scopes: `manager` | `representative` — pair
 *                        only with `manage` (used by scoped FAQ perms so a
 *                        manager can only manage manager-audience FAQs).
 */

const OWNERSHIP_SCOPES = ['own', 'any'] as const;
const ROLE_SCOPES = ['manager', 'representative'] as const;
const ALL_SCOPES = [...OWNERSHIP_SCOPES, ...ROLE_SCOPES];
describe('Permission strings — shape & uniqueness', () => {
  const permissionEntries = Object.entries(Permission) as Array<[string, string]>;

  it('has at least one permission (sanity)', () => {
    expect(permissionEntries.length).toBeGreaterThan(0);
  });

  it('every permission string matches the canonical format', () => {
    const scopeAlternation = ALL_SCOPES.join('|');
    const canonical = new RegExp(
      `^[a-z][a-z0-9]*(?:_[a-z0-9]+)*:[a-z][a-z0-9]*(?:_[a-z0-9]+)*(?::(?:${scopeAlternation}))?$`,
    );

    for (const [key, value] of permissionEntries) {
      expect(
        value,
        `Permission.${key} = "${value}" must match domain:action[:${scopeAlternation}]`,
      ).toMatch(canonical);
    }
  });

  it('permission keys are SCREAMING_SNAKE_CASE', () => {
    const snakeCase = /^[A-Z][A-Z0-9_]*$/;
    for (const [key] of permissionEntries) {
      expect(key, `Permission key "${key}" must be SCREAMING_SNAKE_CASE`).toMatch(snakeCase);
    }
  });

  it('permission values are globally unique', () => {
    const values = permissionEntries.map(([, v]) => v);
    const unique = new Set(values);
    expect(unique.size, 'Duplicate permission strings detected').toBe(values.length);
  });

  it('ownership scopes (:own / :any) only attach to update and delete actions', () => {
    for (const [key, value] of permissionEntries) {
      const parts = value.split(':');
      if (parts.length !== 3) continue;
      if (!OWNERSHIP_SCOPES.includes(parts[2] as (typeof OWNERSHIP_SCOPES)[number])) continue;
      expect(
        parts[1],
        `Permission.${key} = "${value}" — :own / :any should only pair with update or delete`,
      ).toMatch(/^(update|delete)$/);
    }
  });

  it('role scopes (:manager / :representative) only attach to the manage action', () => {
    for (const [key, value] of permissionEntries) {
      const parts = value.split(':');
      if (parts.length !== 3) continue;
      if (!ROLE_SCOPES.includes(parts[2] as (typeof ROLE_SCOPES)[number])) continue;
      expect(
        parts[1],
        `Permission.${key} = "${value}" — role scopes should only pair with manage`,
      ).toBe('manage');
    }
  });
});
