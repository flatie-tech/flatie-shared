import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
// @ts-expect-error — plain .mjs build helper without type declarations
import { oklchToHex, replaceOklch } from '../../scripts/oklch-to-hex.mjs';
import { colors, themes } from '../../src/tokens';

const distDir = resolve(__dirname, '..', '..', 'dist');

describe('oklch → hex conversion', () => {
  it('converts pure white and pure black', () => {
    expect(oklchToHex('oklch(1 0 0)')).toBe('#ffffff');
    expect(oklchToHex('oklch(0 0 0)')).toBe('#000000');
  });

  it('converts a chromatic value to a plausible blue', () => {
    // default theme primary — blue hue 265.75
    const hex = oklchToHex('oklch(0.6143 0.2076 265.75)');
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    const [r, g, b] = [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((c) =>
      Number.parseInt(c, 16),
    );
    expect(b).toBeGreaterThan(r);
    expect(b).toBeGreaterThan(g);
  });

  it('emits 8-digit hex for alpha values (percentage form)', () => {
    expect(oklchToHex('oklch(1 0.005 260 / 12%)')).toMatch(/^#[0-9a-f]{8}$/);
  });

  it('passes non-oklch values through unchanged', () => {
    expect(oklchToHex('#123456')).toBe('#123456');
    expect(oklchToHex('transparent')).toBe('transparent');
  });

  it('replaces every oklch occurrence in a CSS document', () => {
    const sample = ':root {\n  --a: oklch(1 0 0);\n  --b: oklch(0.5 0.1 145 / 0.5);\n}';
    const out = replaceOklch(sample);
    expect(out).not.toContain('oklch(');
    expect(out).toContain('#ffffff');
  });
});

describe('dist/tokens.native artifacts (built output)', () => {
  it('tokens.native.css contains no oklch values, only hex', () => {
    const css = readFileSync(resolve(distDir, 'tokens.native.css'), 'utf8');
    expect(css).not.toContain('oklch(');
    expect(css).toMatch(/--background: #[0-9a-f]{6};/);
  });

  it('tokens.native.js mirrors the token names with hex values', async () => {
    const native = await import(resolve(distDir, 'tokens.native.js'));
    for (const name of Object.keys(colors)) {
      expect(native.colors, `missing color ${name}`).toHaveProperty(name);
      expect(native.colors[name].light, `${name}.light`).toMatch(/^#[0-9a-f]{6,8}$/);
      expect(native.colors[name].dark, `${name}.dark`).toMatch(/^#[0-9a-f]{6,8}$/);
    }
    for (const theme of Object.keys(themes)) {
      expect(native.themes, `missing theme ${theme}`).toHaveProperty(theme);
      expect(native.themes[theme].light.primary).toMatch(/^#[0-9a-f]{6,8}$/);
    }
    expect(native.radii.radius).toBe('0.75rem');
  });
});
