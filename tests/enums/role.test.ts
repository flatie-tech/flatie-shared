import { describe, expect, it } from 'vitest';
import {
  BuildingRole,
  canAssignOrgRole,
  canAssignPlatformRole,
  canAssignRole,
  OrgRole,
  PlatformRole,
} from '../../src/enums';

describe('Role Hierarchies', () => {
  describe('canAssignRole (BuildingRole)', () => {
    it('OWNER_REPRESENTATIVE can assign CO_OWNER (higher rank → lower)', () => {
      expect(canAssignRole(BuildingRole.OWNER_REPRESENTATIVE, BuildingRole.CO_OWNER)).toBe(true);
    });

    it('DEPUTY_REPRESENTATIVE can assign CO_OWNER (higher rank → lower)', () => {
      expect(canAssignRole(BuildingRole.DEPUTY_REPRESENTATIVE, BuildingRole.CO_OWNER)).toBe(true);
    });

    it('OWNER_REPRESENTATIVE cannot assign DEPUTY_REPRESENTATIVE (same rank)', () => {
      expect(
        canAssignRole(BuildingRole.OWNER_REPRESENTATIVE, BuildingRole.DEPUTY_REPRESENTATIVE),
      ).toBe(false);
    });

    it('CO_OWNER cannot assign OWNER_REPRESENTATIVE (lower rank → higher)', () => {
      expect(canAssignRole(BuildingRole.CO_OWNER, BuildingRole.OWNER_REPRESENTATIVE)).toBe(false);
    });

    it('CO_OWNER cannot assign CO_OWNER (same role, same rank)', () => {
      expect(canAssignRole(BuildingRole.CO_OWNER, BuildingRole.CO_OWNER)).toBe(false);
    });
  });

  describe('canAssignOrgRole', () => {
    it('ORG_ADMIN can assign all roles below', () => {
      expect(canAssignOrgRole(OrgRole.ORG_ADMIN, OrgRole.SUPERVISOR)).toBe(true);
      expect(canAssignOrgRole(OrgRole.ORG_ADMIN, OrgRole.REFERENT)).toBe(true);
      expect(canAssignOrgRole(OrgRole.ORG_ADMIN, OrgRole.OPERATIVE)).toBe(true);
    });

    it('SUPERVISOR cannot assign ORG_ADMIN (lower → higher)', () => {
      expect(canAssignOrgRole(OrgRole.SUPERVISOR, OrgRole.ORG_ADMIN)).toBe(false);
    });

    it('SUPERVISOR cannot assign SUPERVISOR (same rank)', () => {
      expect(canAssignOrgRole(OrgRole.SUPERVISOR, OrgRole.SUPERVISOR)).toBe(false);
    });

    it('OPERATIVE cannot assign anyone (lowest rank)', () => {
      expect(canAssignOrgRole(OrgRole.OPERATIVE, OrgRole.REFERENT)).toBe(false);
      expect(canAssignOrgRole(OrgRole.OPERATIVE, OrgRole.OPERATIVE)).toBe(false);
    });
  });

  describe('canAssignPlatformRole', () => {
    it('PLATFORM_ADMIN can assign all roles below', () => {
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_ADMIN, PlatformRole.PLATFORM_MODERATOR),
      ).toBe(true);
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_ADMIN, PlatformRole.PLATFORM_SUPPORT),
      ).toBe(true);
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_ADMIN, PlatformRole.PLATFORM_OPERATIVE),
      ).toBe(true);
    });

    it('PLATFORM_OPERATIVE cannot assign anyone (lowest rank)', () => {
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_OPERATIVE, PlatformRole.PLATFORM_SUPPORT),
      ).toBe(false);
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_OPERATIVE, PlatformRole.PLATFORM_OPERATIVE),
      ).toBe(false);
    });

    it('PLATFORM_MODERATOR cannot assign PLATFORM_ADMIN (lower → higher)', () => {
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_MODERATOR, PlatformRole.PLATFORM_ADMIN),
      ).toBe(false);
    });

    it('same rank returns false', () => {
      expect(
        canAssignPlatformRole(PlatformRole.PLATFORM_SUPPORT, PlatformRole.PLATFORM_SUPPORT),
      ).toBe(false);
    });
  });
});
