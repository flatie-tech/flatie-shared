/**
 * Base + semantic colors for Flatie's design system, in OKLCH.
 *
 * Each token has a `light` and `dark` value. Theme-specific tokens (primary,
 * button-primary, sidebar-primary, plus their foregrounds) live in themes.ts —
 * those vary per context (org/admin/platform/representatives).
 */
type ColorToken = {
    light: string;
    dark: string;
};
declare const colors: {
    readonly background: {
        readonly light: "oklch(1 0 0)";
        readonly dark: "oklch(0.14 0.015 265)";
    };
    readonly foreground: {
        readonly light: "oklch(0.175 0.02 265)";
        readonly dark: "oklch(0.95 0.005 260)";
    };
    readonly card: {
        readonly light: "oklch(1 0 0)";
        readonly dark: "oklch(0.185 0.018 265)";
    };
    readonly 'card-foreground': {
        readonly light: "oklch(0.175 0.02 265)";
        readonly dark: "oklch(0.95 0.005 260)";
    };
    readonly popover: {
        readonly light: "oklch(1 0 0)";
        readonly dark: "oklch(0.185 0.018 265)";
    };
    readonly 'popover-foreground': {
        readonly light: "oklch(0.175 0.02 265)";
        readonly dark: "oklch(0.95 0.005 260)";
    };
    readonly secondary: {
        readonly light: "oklch(0.94 0.012 260)";
        readonly dark: "oklch(0.24 0.018 265)";
    };
    readonly 'secondary-foreground': {
        readonly light: "oklch(0.24 0.015 265)";
        readonly dark: "oklch(0.94 0.005 260)";
    };
    readonly muted: {
        readonly light: "oklch(0.96 0.005 260)";
        readonly dark: "oklch(0.24 0.015 265)";
    };
    readonly 'muted-foreground': {
        readonly light: "oklch(0.5 0.015 260)";
        readonly dark: "oklch(0.58 0.012 260)";
    };
    readonly accent: {
        readonly light: "oklch(0.925 0.02 260)";
        readonly dark: "oklch(0.26 0.02 265)";
    };
    readonly 'accent-foreground': {
        readonly light: "oklch(0.22 0.02 265)";
        readonly dark: "oklch(0.94 0.005 260)";
    };
    readonly destructive: {
        readonly light: "oklch(0.577 0.245 27.325)";
        readonly dark: "oklch(0.704 0.191 22.216)";
    };
    readonly success: {
        readonly light: "oklch(0.62 0.19 150)";
        readonly dark: "oklch(0.65 0.17 150)";
    };
    readonly 'success-foreground': {
        readonly light: "oklch(0.985 0 0)";
        readonly dark: "oklch(0.985 0 0)";
    };
    readonly warning: {
        readonly light: "oklch(0.75 0.15 80)";
        readonly dark: "oklch(0.78 0.13 80)";
    };
    readonly 'warning-foreground': {
        readonly light: "oklch(0.3 0.08 60)";
        readonly dark: "oklch(0.25 0.06 60)";
    };
    readonly info: {
        readonly light: "oklch(0.62 0.15 245)";
        readonly dark: "oklch(0.65 0.14 245)";
    };
    readonly 'info-foreground': {
        readonly light: "oklch(0.985 0 0)";
        readonly dark: "oklch(0.985 0 0)";
    };
    readonly 'brand-accent': {
        readonly light: "oklch(0.68 0.14 195)";
        readonly dark: "oklch(0.72 0.12 195)";
    };
    readonly 'brand-accent-foreground': {
        readonly light: "oklch(0.985 0 0)";
        readonly dark: "oklch(0.985 0 0)";
    };
    readonly border: {
        readonly light: "oklch(0.905 0.01 260)";
        readonly dark: "oklch(1 0.005 260 / 12%)";
    };
    readonly input: {
        readonly light: "oklch(0.885 0.012 260)";
        readonly dark: "oklch(1 0.005 260 / 16%)";
    };
    readonly ring: {
        readonly light: "oklch(0.6143 0.2076 265.75)";
        readonly dark: "oklch(0.65 0.19 265.75)";
    };
    readonly 'chart-1': {
        readonly light: "oklch(0.6143 0.2076 265.75)";
        readonly dark: "oklch(0.55 0.19 265)";
    };
    readonly 'chart-2': {
        readonly light: "oklch(0.68 0.14 195)";
        readonly dark: "oklch(0.62 0.12 195)";
    };
    readonly 'chart-3': {
        readonly light: "oklch(0.75 0.15 80)";
        readonly dark: "oklch(0.72 0.13 80)";
    };
    readonly 'chart-4': {
        readonly light: "oklch(0.65 0.18 15)";
        readonly dark: "oklch(0.58 0.16 15)";
    };
    readonly 'chart-5': {
        readonly light: "oklch(0.62 0.17 150)";
        readonly dark: "oklch(0.58 0.15 150)";
    };
    readonly sidebar: {
        readonly light: "oklch(1 0 0)";
        readonly dark: "oklch(0.195 0.018 265)";
    };
    readonly 'sidebar-foreground': {
        readonly light: "oklch(0.175 0.02 265)";
        readonly dark: "oklch(0.95 0.005 260)";
    };
    readonly 'sidebar-accent': {
        readonly light: "oklch(0.925 0.02 260)";
        readonly dark: "oklch(0.26 0.02 265)";
    };
    readonly 'sidebar-accent-foreground': {
        readonly light: "oklch(0.22 0.02 265)";
        readonly dark: "oklch(0.94 0.005 260)";
    };
    readonly 'sidebar-border': {
        readonly light: "oklch(0.905 0.01 260)";
        readonly dark: "oklch(1 0.005 260 / 12%)";
    };
    readonly 'sidebar-ring': {
        readonly light: "oklch(0.6143 0.2076 265.75)";
        readonly dark: "oklch(0.55 0.15 265)";
    };
    readonly 'card-background': {
        readonly light: "oklch(0.98 0.005 260)";
        readonly dark: "oklch(0.185 0.018 265)";
    };
    readonly 'card-border': {
        readonly light: "oklch(0.925 0.008 260)";
        readonly dark: "oklch(0.27 0.018 265)";
    };
    readonly 'dashboard-background': {
        readonly light: "oklch(0.96 0.006 260)";
        readonly dark: "oklch(0.155 0.015 265)";
    };
    readonly 'negative-action': {
        readonly light: "oklch(0.28 0.015 265)";
        readonly dark: "oklch(0.82 0.005 260)";
    };
};
type ColorTokenName = keyof typeof colors;

/**
 * Border radius tokens. Frontend's `@theme inline` derives sm/md/lg/xl from
 * this base via `calc(var(--radius) ± Xpx)` — mobile can mirror or define its
 * own scale.
 */
declare const radii: {
    readonly radius: "0.75rem";
};
type RadiusTokenName = keyof typeof radii;

/**
 * Theme context tokens — values that swap per route context (default,
 * organization, admin, platform, representatives).
 *
 * Each theme overrides the same 5 CSS variables. `default` is applied on the
 * base :root selector; the other four are applied via `.theme-<name>` class
 * selectors. Dark-mode variants swap under `.dark` or `.dark .theme-<name>`.
 */
type ThemeName = 'default' | 'org' | 'admin' | 'platform' | 'representatives';
type ThemeTokens = {
    primary: string;
    'primary-foreground': string;
    'button-primary': string;
    'sidebar-primary': string;
    'sidebar-primary-foreground': string;
};
type ThemeDefinition = {
    light: ThemeTokens;
    dark: ThemeTokens;
};
declare const themes: {
    readonly default: {
        readonly light: {
            readonly primary: "oklch(0.6143 0.2076 265.75)";
            readonly 'primary-foreground': "oklch(0.985 0 0)";
            readonly 'button-primary': "oklch(0.22 0.02 265)";
            readonly 'sidebar-primary': "oklch(0.6143 0.2076 265.75)";
            readonly 'sidebar-primary-foreground': "oklch(0.985 0 0)";
        };
        readonly dark: {
            readonly primary: "oklch(0.65 0.19 265.75)";
            readonly 'primary-foreground': "oklch(0.16 0.015 265)";
            readonly 'button-primary': "oklch(0.92 0.005 260)";
            readonly 'sidebar-primary': "oklch(0.55 0.19 265)";
            readonly 'sidebar-primary-foreground': "oklch(0.95 0.005 260)";
        };
    };
    readonly org: {
        readonly light: {
            readonly primary: "oklch(0.55 0.17 145)";
            readonly 'primary-foreground': "oklch(0.985 0 0)";
            readonly 'button-primary': "oklch(0.22 0.02 145)";
            readonly 'sidebar-primary': "oklch(0.55 0.17 145)";
            readonly 'sidebar-primary-foreground': "oklch(0.985 0 0)";
        };
        readonly dark: {
            readonly primary: "oklch(0.6 0.17 145)";
            readonly 'primary-foreground': "oklch(0.16 0.015 145)";
            readonly 'button-primary': "oklch(0.92 0.005 145)";
            readonly 'sidebar-primary': "oklch(0.5 0.17 145)";
            readonly 'sidebar-primary-foreground': "oklch(0.95 0.005 145)";
        };
    };
    readonly admin: {
        readonly light: {
            readonly primary: "oklch(0.55 0.17 310)";
            readonly 'primary-foreground': "oklch(0.985 0 0)";
            readonly 'button-primary': "oklch(0.22 0.02 310)";
            readonly 'sidebar-primary': "oklch(0.55 0.17 310)";
            readonly 'sidebar-primary-foreground': "oklch(0.985 0 0)";
        };
        readonly dark: {
            readonly primary: "oklch(0.6 0.17 310)";
            readonly 'primary-foreground': "oklch(0.16 0.015 310)";
            readonly 'button-primary': "oklch(0.92 0.005 310)";
            readonly 'sidebar-primary': "oklch(0.5 0.17 310)";
            readonly 'sidebar-primary-foreground': "oklch(0.95 0.005 310)";
        };
    };
    readonly platform: {
        readonly light: {
            readonly primary: "oklch(0.55 0.15 195)";
            readonly 'primary-foreground': "oklch(0.985 0 0)";
            readonly 'button-primary': "oklch(0.22 0.02 195)";
            readonly 'sidebar-primary': "oklch(0.55 0.15 195)";
            readonly 'sidebar-primary-foreground': "oklch(0.985 0 0)";
        };
        readonly dark: {
            readonly primary: "oklch(0.6 0.15 195)";
            readonly 'primary-foreground': "oklch(0.16 0.015 195)";
            readonly 'button-primary': "oklch(0.92 0.005 195)";
            readonly 'sidebar-primary': "oklch(0.5 0.15 195)";
            readonly 'sidebar-primary-foreground': "oklch(0.95 0.005 195)";
        };
    };
    readonly representatives: {
        readonly light: {
            readonly primary: "oklch(0.6143 0.2076 265.75)";
            readonly 'primary-foreground': "oklch(0.985 0 0)";
            readonly 'button-primary': "oklch(0.22 0.02 265)";
            readonly 'sidebar-primary': "oklch(0.6143 0.2076 265.75)";
            readonly 'sidebar-primary-foreground': "oklch(0.985 0 0)";
        };
        readonly dark: {
            readonly primary: "oklch(0.65 0.19 265.75)";
            readonly 'primary-foreground': "oklch(0.16 0.015 265)";
            readonly 'button-primary': "oklch(0.92 0.005 260)";
            readonly 'sidebar-primary': "oklch(0.55 0.19 265)";
            readonly 'sidebar-primary-foreground': "oklch(0.95 0.005 260)";
        };
    };
};

export { type ColorToken, type ColorTokenName, type RadiusTokenName, type ThemeDefinition, type ThemeName, type ThemeTokens, colors, radii, themes };
