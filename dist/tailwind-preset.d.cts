import type { ColorTokenName, RadiusTokenName, ThemeDefinition, ThemeName } from './tokens/index.js';

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
