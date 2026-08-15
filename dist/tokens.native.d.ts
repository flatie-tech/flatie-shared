import type { ColorTokenName, ThemeDefinition, ThemeName } from './tokens/index.js';

/** Hex (light/dark) values for every base color token. */
export declare const colors: Record<ColorTokenName, { light: string; dark: string }>;

/** Hex theme overrides per theme context. */
export declare const themes: Record<ThemeName, ThemeDefinition>;

/** Radius tokens (unchanged from @flatie/shared/tokens). */
export declare const radii: { radius: string };
