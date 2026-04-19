#!/usr/bin/env node
/**
 * Emits dist/tokens.css and dist/tailwind-preset.{js,cjs,d.ts,d.cts} from the
 * built token source in dist/tokens/index.js.
 *
 * Runs after tsup builds the TS sources — see tsup.config.ts `onSuccess`.
 *
 * - tokens.css: :root / .dark / .theme-* / .dark .theme-* blocks for Tailwind
 *   v4 consumers (frontend) via `@import '@flatie/shared/tokens.css'`.
 * - tailwind-preset: Tailwind v3-compatible preset exposing colors + radius
 *   for NativeWind consumers (mobile).
 */

import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(here, '..', 'dist');

const { colors, radii, themes } = await import(resolve(distDir, 'tokens/index.js'));

const indent = '  ';

const varLine = (name, value) => `${indent}--${name}: ${value};`;

const renderBaseBlock = (mode, themeName) => {
  const lines = [];

  if (mode === 'light') {
    lines.push(varLine('radius', radii.radius));
    lines.push('');
  }

  lines.push(`${indent}/* Base colors */`);
  for (const [name, token] of Object.entries(colors)) {
    lines.push(varLine(name, token[mode]));
  }

  lines.push('');
  lines.push(`${indent}/* Default theme */`);
  for (const [name, value] of Object.entries(themes[themeName][mode])) {
    lines.push(varLine(name, value));
  }

  return lines.join('\n');
};

const renderThemeOverride = (themeName, mode) => {
  const lines = [];
  for (const [name, value] of Object.entries(themes[themeName][mode])) {
    lines.push(varLine(name, value));
  }
  return lines.join('\n');
};

const cssBlocks = [];

cssBlocks.push(
  '/**\n' +
    ' * Flatie design tokens — generated from @flatie/shared.\n' +
    ' * Do not edit directly. Source: src/tokens/ in flatie-shared.\n' +
    ' */',
);

cssBlocks.push(`:root {\n${renderBaseBlock('light', 'default')}\n}`);
cssBlocks.push(`.dark {\n${renderBaseBlock('dark', 'default')}\n}`);

for (const themeName of ['org', 'admin', 'platform', 'representatives']) {
  cssBlocks.push(`.theme-${themeName} {\n${renderThemeOverride(themeName, 'light')}\n}`);
  cssBlocks.push(`.dark .theme-${themeName} {\n${renderThemeOverride(themeName, 'dark')}\n}`);
}

const css = `${cssBlocks.join('\n\n')}\n`;
writeFileSync(resolve(distDir, 'tokens.css'), css, 'utf8');

const presetData = {
  colors: Object.fromEntries(Object.entries(colors).map(([name, token]) => [name, token.light])),
  colorsDark: Object.fromEntries(Object.entries(colors).map(([name, token]) => [name, token.dark])),
  themes: Object.fromEntries(
    Object.entries(themes).map(([name, def]) => [name, { light: def.light, dark: def.dark }]),
  ),
  radius: radii.radius,
};

const presetBody = `/**
 * Tailwind v3-compatible preset for NativeWind consumers.
 * Exposes Flatie's default (light) theme colors under \`theme.extend.colors\`.
 * Dark mode + theme context switches are the consumer's responsibility —
 * this preset exposes \`colorsDark\` and \`themes\` as raw data for custom wiring.
 *
 * Generated from @flatie/shared/tokens. Do not edit directly.
 */

const tokens = ${JSON.stringify(presetData, null, 2)};

const preset = {
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: {
        DEFAULT: tokens.radius,
      },
    },
  },
};

module.exports = preset;
module.exports.tokens = tokens;
module.exports.default = preset;
`;

writeFileSync(resolve(distDir, 'tailwind-preset.cjs'), presetBody, 'utf8');

const presetEsm = `/**
 * Tailwind v3-compatible preset for NativeWind consumers.
 * See tailwind-preset.cjs for the full description.
 *
 * Generated from @flatie/shared/tokens. Do not edit directly.
 */

export const tokens = ${JSON.stringify(presetData, null, 2)};

const preset = {
  theme: {
    extend: {
      colors: tokens.colors,
      borderRadius: {
        DEFAULT: tokens.radius,
      },
    },
  },
};

export default preset;
`;

writeFileSync(resolve(distDir, 'tailwind-preset.js'), presetEsm, 'utf8');

const presetDts = `import type { ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName } from './tokens/index.js';

export type TokenBundle = {
  colors: Record<ColorTokenName, string>;
  colorsDark: Record<ColorTokenName, string>;
  themes: Record<ThemeName, ThemeDefinition>;
  radius: string;
};

export declare const tokens: TokenBundle;

declare const preset: {
  theme: {
    extend: {
      colors: Record<ColorTokenName, string>;
      borderRadius: {
        DEFAULT: string;
      };
    };
  };
};

export default preset;
`;

writeFileSync(resolve(distDir, 'tailwind-preset.d.ts'), presetDts, 'utf8');
writeFileSync(resolve(distDir, 'tailwind-preset.d.cts'), presetDts, 'utf8');

// biome-ignore lint/suspicious/noConsole: build-time feedback surfaced in tsup output
console.log('[tokens] emitted tokens.css + tailwind-preset');
