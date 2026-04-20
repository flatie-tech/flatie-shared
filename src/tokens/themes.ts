/**
 * Theme context tokens — values that swap per route context (default,
 * organization, admin, platform, representatives).
 *
 * Each theme overrides the same 5 CSS variables. `default` is applied on the
 * base :root selector; the other four are applied via `.theme-<name>` class
 * selectors. Dark-mode variants swap under `.dark` or `.dark .theme-<name>`.
 */

export type ThemeName = 'default' | 'org' | 'admin' | 'platform' | 'representatives';

export type ThemeTokens = {
  primary: string;
  'primary-foreground': string;
  'button-primary': string;
  'sidebar-primary': string;
  'sidebar-primary-foreground': string;
};

export type ThemeDefinition = {
  light: ThemeTokens;
  dark: ThemeTokens;
};

export const themes = {
  // Blue (hue 265.75) — default for building resident dashboards
  default: {
    light: {
      primary: 'oklch(0.6143 0.2076 265.75)',
      'primary-foreground': 'oklch(0.985 0 0)',
      'button-primary': 'oklch(0.22 0.02 265)',
      'sidebar-primary': 'oklch(0.6143 0.2076 265.75)',
      'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.65 0.19 265.75)',
      'primary-foreground': 'oklch(0.16 0.015 265)',
      'button-primary': 'oklch(0.92 0.005 260)',
      'sidebar-primary': 'oklch(0.55 0.19 265)',
      'sidebar-primary-foreground': 'oklch(0.95 0.005 260)',
    },
  },

  // Green (hue 145) — organization context
  org: {
    light: {
      primary: 'oklch(0.55 0.17 145)',
      'primary-foreground': 'oklch(0.985 0 0)',
      'button-primary': 'oklch(0.22 0.02 145)',
      'sidebar-primary': 'oklch(0.55 0.17 145)',
      'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.6 0.17 145)',
      'primary-foreground': 'oklch(0.16 0.015 145)',
      'button-primary': 'oklch(0.92 0.005 145)',
      'sidebar-primary': 'oklch(0.5 0.17 145)',
      'sidebar-primary-foreground': 'oklch(0.95 0.005 145)',
    },
  },

  // Purple (hue 310) — admin panel
  admin: {
    light: {
      primary: 'oklch(0.55 0.17 310)',
      'primary-foreground': 'oklch(0.985 0 0)',
      'button-primary': 'oklch(0.22 0.02 310)',
      'sidebar-primary': 'oklch(0.55 0.17 310)',
      'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.6 0.17 310)',
      'primary-foreground': 'oklch(0.16 0.015 310)',
      'button-primary': 'oklch(0.92 0.005 310)',
      'sidebar-primary': 'oklch(0.5 0.17 310)',
      'sidebar-primary-foreground': 'oklch(0.95 0.005 310)',
    },
  },

  // Teal (hue 195) — platform management
  platform: {
    light: {
      primary: 'oklch(0.55 0.15 195)',
      'primary-foreground': 'oklch(0.985 0 0)',
      'button-primary': 'oklch(0.22 0.02 195)',
      'sidebar-primary': 'oklch(0.55 0.15 195)',
      'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.6 0.15 195)',
      'primary-foreground': 'oklch(0.16 0.015 195)',
      'button-primary': 'oklch(0.92 0.005 195)',
      'sidebar-primary': 'oklch(0.5 0.15 195)',
      'sidebar-primary-foreground': 'oklch(0.95 0.005 195)',
    },
  },

  // Representatives panel — currently blue (hue 265.75), same as default.
  // Tracked in the token source so diverging from default is a one-line change.
  representatives: {
    light: {
      primary: 'oklch(0.6143 0.2076 265.75)',
      'primary-foreground': 'oklch(0.985 0 0)',
      'button-primary': 'oklch(0.22 0.02 265)',
      'sidebar-primary': 'oklch(0.6143 0.2076 265.75)',
      'sidebar-primary-foreground': 'oklch(0.985 0 0)',
    },
    dark: {
      primary: 'oklch(0.65 0.19 265.75)',
      'primary-foreground': 'oklch(0.16 0.015 265)',
      'button-primary': 'oklch(0.92 0.005 260)',
      'sidebar-primary': 'oklch(0.55 0.19 265)',
      'sidebar-primary-foreground': 'oklch(0.95 0.005 260)',
    },
  },
} as const satisfies Record<ThemeName, ThemeDefinition>;
