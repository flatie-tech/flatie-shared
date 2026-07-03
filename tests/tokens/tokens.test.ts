import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { colors, radii, themes } from '../../src/tokens';

describe('design tokens', () => {
  describe('colors', () => {
    it('every color has both light and dark values', () => {
      for (const [name, token] of Object.entries(colors)) {
        expect(token.light, `${name}.light`).toMatch(/^oklch\(/);
        expect(token.dark, `${name}.dark`).toMatch(/^oklch\(/);
      }
    });

    it('covers the non-themed variables used in globals.css', () => {
      const required = [
        'background',
        'foreground',
        'card',
        'card-foreground',
        'destructive',
        'success',
        'warning',
        'info',
        'brand-accent',
        'border',
        'input',
        'ring',
        'sidebar',
        'sidebar-ring',
        'card-background',
        'dashboard-background',
        'negative-action',
      ] as const;
      for (const name of required) {
        expect(colors, `missing ${name}`).toHaveProperty(name);
      }
    });
  });

  describe('themes', () => {
    it('exposes the five expected themes', () => {
      expect(Object.keys(themes).sort()).toEqual(
        ['admin', 'default', 'org', 'platform', 'representatives'].sort(),
      );
    });

    it('every theme has the same five override tokens for light + dark', () => {
      const expectedKeys = [
        'primary',
        'primary-foreground',
        'button-primary',
        'sidebar-primary',
        'sidebar-primary-foreground',
      ].sort();
      for (const [name, def] of Object.entries(themes)) {
        expect(Object.keys(def.light).sort(), `${name}.light`).toEqual(expectedKeys);
        expect(Object.keys(def.dark).sort(), `${name}.dark`).toEqual(expectedKeys);
      }
    });
  });

  describe('radii', () => {
    it('exports the base radius', () => {
      expect(radii.radius).toBe('0.75rem');
    });
  });

  describe('generated CSS', () => {
    const cssPath = resolve(__dirname, '../../dist/tokens.css');
    let css: string;

    try {
      css = readFileSync(cssPath, 'utf8');
    } catch {
      css = '';
    }

    it.skipIf(!css)('contains :root and .dark blocks', () => {
      expect(css).toMatch(/^:root \{/m);
      expect(css).toMatch(/^\.dark \{/m);
    });

    it.skipIf(!css)('contains every theme override class', () => {
      for (const theme of ['org', 'admin', 'platform', 'representatives']) {
        expect(css, `.theme-${theme}`).toMatch(new RegExp(`\\.theme-${theme} \\{`));
        expect(css, `.dark .theme-${theme}`).toMatch(new RegExp(`\\.dark \\.theme-${theme} \\{`));
      }
    });

    it.skipIf(!css)('matches the primary color defined in themes.default.light', () => {
      expect(css).toContain(`--primary: ${themes.default.light.primary};`);
    });
  });
});
