'use strict';

// src/tokens/colors.ts
var colors = {
  // Backgrounds
  background: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.14 0.015 265)"
  },
  foreground: {
    light: "oklch(0.175 0.02 265)",
    dark: "oklch(0.95 0.005 260)"
  },
  // Cards
  card: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.185 0.018 265)"
  },
  "card-foreground": {
    light: "oklch(0.175 0.02 265)",
    dark: "oklch(0.95 0.005 260)"
  },
  // Popovers
  popover: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.185 0.018 265)"
  },
  "popover-foreground": {
    light: "oklch(0.175 0.02 265)",
    dark: "oklch(0.95 0.005 260)"
  },
  // Secondary — cool blue-gray, for secondary buttons & actions
  secondary: {
    light: "oklch(0.94 0.012 260)",
    dark: "oklch(0.24 0.018 265)"
  },
  "secondary-foreground": {
    light: "oklch(0.24 0.015 265)",
    dark: "oklch(0.94 0.005 260)"
  },
  // Muted — lightest, for disabled states & subtle backgrounds
  muted: {
    light: "oklch(0.96 0.005 260)",
    dark: "oklch(0.24 0.015 265)"
  },
  "muted-foreground": {
    light: "oklch(0.5 0.015 260)",
    dark: "oklch(0.58 0.012 260)"
  },
  // Accent — most blue-tinted, for hover & focus states
  accent: {
    light: "oklch(0.925 0.02 260)",
    dark: "oklch(0.26 0.02 265)"
  },
  "accent-foreground": {
    light: "oklch(0.22 0.02 265)",
    dark: "oklch(0.94 0.005 260)"
  },
  // Destructive
  destructive: {
    light: "oklch(0.577 0.245 27.325)",
    dark: "oklch(0.704 0.191 22.216)"
  },
  // Semantic
  success: {
    light: "oklch(0.62 0.19 150)",
    dark: "oklch(0.65 0.17 150)"
  },
  "success-foreground": {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.985 0 0)"
  },
  warning: {
    light: "oklch(0.75 0.15 80)",
    dark: "oklch(0.78 0.13 80)"
  },
  "warning-foreground": {
    light: "oklch(0.3 0.08 60)",
    dark: "oklch(0.25 0.06 60)"
  },
  info: {
    light: "oklch(0.62 0.15 245)",
    dark: "oklch(0.65 0.14 245)"
  },
  "info-foreground": {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.985 0 0)"
  },
  // Brand accent — teal, for callouts & secondary brand elements
  "brand-accent": {
    light: "oklch(0.68 0.14 195)",
    dark: "oklch(0.72 0.12 195)"
  },
  "brand-accent-foreground": {
    light: "oklch(0.985 0 0)",
    dark: "oklch(0.985 0 0)"
  },
  // Borders & inputs — cool-tinted
  border: {
    light: "oklch(0.905 0.01 260)",
    dark: "oklch(1 0.005 260 / 12%)"
  },
  input: {
    light: "oklch(0.885 0.012 260)",
    dark: "oklch(1 0.005 260 / 16%)"
  },
  ring: {
    light: "oklch(0.6143 0.2076 265.75)",
    dark: "oklch(0.65 0.19 265.75)"
  },
  // Charts — harmonized with blue primary
  "chart-1": {
    light: "oklch(0.6143 0.2076 265.75)",
    dark: "oklch(0.55 0.19 265)"
  },
  "chart-2": {
    light: "oklch(0.68 0.14 195)",
    dark: "oklch(0.62 0.12 195)"
  },
  "chart-3": {
    light: "oklch(0.75 0.15 80)",
    dark: "oklch(0.72 0.13 80)"
  },
  "chart-4": {
    light: "oklch(0.65 0.18 15)",
    dark: "oklch(0.58 0.16 15)"
  },
  "chart-5": {
    light: "oklch(0.62 0.17 150)",
    dark: "oklch(0.58 0.15 150)"
  },
  // Sidebar (non-themed surfaces; sidebar-primary is themed, see themes.ts)
  sidebar: {
    light: "oklch(1 0 0)",
    dark: "oklch(0.195 0.018 265)"
  },
  "sidebar-foreground": {
    light: "oklch(0.175 0.02 265)",
    dark: "oklch(0.95 0.005 260)"
  },
  "sidebar-accent": {
    light: "oklch(0.925 0.02 260)",
    dark: "oklch(0.26 0.02 265)"
  },
  "sidebar-accent-foreground": {
    light: "oklch(0.22 0.02 265)",
    dark: "oklch(0.94 0.005 260)"
  },
  "sidebar-border": {
    light: "oklch(0.905 0.01 260)",
    dark: "oklch(1 0.005 260 / 12%)"
  },
  "sidebar-ring": {
    light: "oklch(0.6143 0.2076 265.75)",
    dark: "oklch(0.55 0.15 265)"
  },
  // Custom surface tokens
  "card-background": {
    light: "oklch(0.98 0.005 260)",
    dark: "oklch(0.185 0.018 265)"
  },
  "card-border": {
    light: "oklch(0.925 0.008 260)",
    dark: "oklch(0.27 0.018 265)"
  },
  "dashboard-background": {
    light: "oklch(0.96 0.006 260)",
    dark: "oklch(0.155 0.015 265)"
  },
  "negative-action": {
    light: "oklch(0.28 0.015 265)",
    dark: "oklch(0.82 0.005 260)"
  }
};

// src/tokens/radii.ts
var radii = {
  radius: "0.75rem"
};

// src/tokens/themes.ts
var themes = {
  // Blue (hue 265.75) — default for building resident dashboards
  default: {
    light: {
      primary: "oklch(0.6143 0.2076 265.75)",
      "primary-foreground": "oklch(0.985 0 0)",
      "button-primary": "oklch(0.22 0.02 265)",
      "sidebar-primary": "oklch(0.6143 0.2076 265.75)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)"
    },
    dark: {
      primary: "oklch(0.65 0.19 265.75)",
      "primary-foreground": "oklch(0.16 0.015 265)",
      "button-primary": "oklch(0.92 0.005 260)",
      "sidebar-primary": "oklch(0.55 0.19 265)",
      "sidebar-primary-foreground": "oklch(0.95 0.005 260)"
    }
  },
  // Green (hue 145) — organization context
  org: {
    light: {
      primary: "oklch(0.55 0.17 145)",
      "primary-foreground": "oklch(0.985 0 0)",
      "button-primary": "oklch(0.22 0.02 145)",
      "sidebar-primary": "oklch(0.55 0.17 145)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)"
    },
    dark: {
      primary: "oklch(0.6 0.17 145)",
      "primary-foreground": "oklch(0.16 0.015 145)",
      "button-primary": "oklch(0.92 0.005 145)",
      "sidebar-primary": "oklch(0.5 0.17 145)",
      "sidebar-primary-foreground": "oklch(0.95 0.005 145)"
    }
  },
  // Purple (hue 310) — admin panel
  admin: {
    light: {
      primary: "oklch(0.55 0.17 310)",
      "primary-foreground": "oklch(0.985 0 0)",
      "button-primary": "oklch(0.22 0.02 310)",
      "sidebar-primary": "oklch(0.55 0.17 310)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)"
    },
    dark: {
      primary: "oklch(0.6 0.17 310)",
      "primary-foreground": "oklch(0.16 0.015 310)",
      "button-primary": "oklch(0.92 0.005 310)",
      "sidebar-primary": "oklch(0.5 0.17 310)",
      "sidebar-primary-foreground": "oklch(0.95 0.005 310)"
    }
  },
  // Teal (hue 195) — platform management
  platform: {
    light: {
      primary: "oklch(0.55 0.15 195)",
      "primary-foreground": "oklch(0.985 0 0)",
      "button-primary": "oklch(0.22 0.02 195)",
      "sidebar-primary": "oklch(0.55 0.15 195)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)"
    },
    dark: {
      primary: "oklch(0.6 0.15 195)",
      "primary-foreground": "oklch(0.16 0.015 195)",
      "button-primary": "oklch(0.92 0.005 195)",
      "sidebar-primary": "oklch(0.5 0.15 195)",
      "sidebar-primary-foreground": "oklch(0.95 0.005 195)"
    }
  },
  // Representatives panel — currently blue (hue 265.75), same as default.
  // Tracked in the token source so diverging from default is a one-line change.
  representatives: {
    light: {
      primary: "oklch(0.6143 0.2076 265.75)",
      "primary-foreground": "oklch(0.985 0 0)",
      "button-primary": "oklch(0.22 0.02 265)",
      "sidebar-primary": "oklch(0.6143 0.2076 265.75)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)"
    },
    dark: {
      primary: "oklch(0.65 0.19 265.75)",
      "primary-foreground": "oklch(0.16 0.015 265)",
      "button-primary": "oklch(0.92 0.005 260)",
      "sidebar-primary": "oklch(0.55 0.19 265)",
      "sidebar-primary-foreground": "oklch(0.95 0.005 260)"
    }
  }
};

exports.colors = colors;
exports.radii = radii;
exports.themes = themes;
//# sourceMappingURL=chunk-L6DDUCLQ.cjs.map
//# sourceMappingURL=chunk-L6DDUCLQ.cjs.map