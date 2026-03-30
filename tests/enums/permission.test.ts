import { describe, expect, it } from 'vitest';
import { domainPermissions } from '../../src/enums';

describe('domainPermissions', () => {
  it('read level returns only domain:read', () => {
    expect(domainPermissions('notice', 'read')).toEqual(['notice:read']);
  });

  it('own level returns read + create + update:own + delete:own', () => {
    expect(domainPermissions('notice', 'own')).toEqual([
      'notice:read',
      'notice:create',
      'notice:update:own',
      'notice:delete:own',
    ]);
  });

  it('manage level returns own + update:any + delete:any', () => {
    expect(domainPermissions('notice', 'manage')).toEqual([
      'notice:read',
      'notice:create',
      'notice:update:own',
      'notice:update:any',
      'notice:delete:own',
      'notice:delete:any',
    ]);
  });

  it('works with underscore domains', () => {
    expect(domainPermissions('failure_report', 'read')).toEqual(['failure_report:read']);
    expect(domainPermissions('failure_report', 'own')).toEqual([
      'failure_report:read',
      'failure_report:create',
      'failure_report:update:own',
      'failure_report:delete:own',
    ]);
  });

  it('manage is a superset of own', () => {
    const own = domainPermissions('event', 'own');
    const manage = domainPermissions('event', 'manage');
    for (const p of own) {
      expect(manage).toContain(p);
    }
    expect(manage.length).toBeGreaterThan(own.length);
  });

  it('own is a superset of read', () => {
    const read = domainPermissions('poll', 'read');
    const own = domainPermissions('poll', 'own');
    for (const p of read) {
      expect(own).toContain(p);
    }
    expect(own.length).toBeGreaterThan(read.length);
  });
});
