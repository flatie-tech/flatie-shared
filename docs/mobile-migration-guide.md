# @flatie/shared — Mobile Migration Guide

This guide covers adopting `@flatie/shared` in **flatie-mobile** (React Native / Expo). The web frontend has already completed this migration; this document tells you what to do in the mobile repo.

---

## 1. Install the package

In `flatie-mobile/package.json`, replace any existing `@flatie/shared` reference:

```jsonc
// For CI / production builds:
"@flatie/shared": "github:flatie-tech/flatie-shared#v0.15.0"

// For local development (when you need to test shared changes before tagging):
"@flatie/shared": "file:../flatie-shared"
```

Then run `pnpm install` (or `yarn` / `npm install`, depending on the mobile repo's package manager).

---

## 2. What's available

| Import path | What's inside |
|---|---|
| `@flatie/shared` | Everything below, re-exported (use subpath imports for tree-shaking) |
| `@flatie/shared/constants` | 26 TanStack Query key factories |
| `@flatie/shared/enums` | All domain enums (BuildingStatus, FailureStatus, PollType, etc.) |
| `@flatie/shared/errors` | `BACKEND_ERROR_CODES` const + `BackendErrorCode` type + `isBackendErrorCode` guard |
| `@flatie/shared/schemas` | Zod schemas for auth flows (register, login, reset-password) |
| `@flatie/shared/tokens` | Design token JS objects (programmatic access) |
| `@flatie/shared/tailwind-preset` | Tailwind v3 / NativeWind preset |
| `@flatie/shared/types` | Shared TypeScript types |
| `@flatie/shared/urls` | `API_ROUTES` — typed path-builder functions for every backend endpoint |
| `@flatie/shared/utils` | Shared utilities (formatting, permissions) |
| `@flatie/shared/validation` | Zod refinements: `oibSchema`, `optionalOibSchema`, `phoneSchema`, `addressSchema` |

---

## 3. Delete duplicate enums

Mobile likely has inline enum definitions that duplicate shared. Common ones to delete:

```
src/api/types.ts           → BuildingStatus, BuildingType, OrgStatus
src/api/failureReports.ts  → FailureStatus, FailureLocation, UnitType, Priority
src/api/maintenance.ts     → MaintenanceLogFinancedBy
src/api/polls.ts           → PollType
```

Replace inline definitions with imports:

```ts
// Before
export enum BuildingStatus { ACTIVE = 'ACTIVE', PENDING = 'PENDING', ... }

// After
export { BuildingStatus } from '@flatie/shared/enums';
```

The full enum list: `BuildingStatus`, `BuildingType`, `OrgStatus`, `FailureStatus`, `FailureLocation`, `UnitType`, `Priority`, `MaintenanceLogFinancedBy`, `PermissionContext`, `PollType`, `Role`, `RoleCategory`.

---

## 4. Adopt API_ROUTES

Replace every hand-rolled path string with the shared path builders:

```ts
// Before
const url = `/buildings/${buildingId}/failure-reports`;
const url = `/buildings/${buildingId}/failure-reports/${reportId}`;

// After
import { API_ROUTES } from '@flatie/shared/urls';
const url = API_ROUTES.FAILURE_REPORTS.LIST(buildingId);
const url = API_ROUTES.FAILURE_REPORTS.DETAIL(buildingId, reportId);
```

All resource groups: `AUTH`, `USERS`, `BUILDINGS`, `APARTMENTS`, `GARAGES`, `STORAGE_UNITS`, `UNITS`, `NOTICES`, `POLLS`, `EVENTS`, `FAILURE_REPORTS`, `MAINTENANCE_LOGS`, `FILES` (not DOCUMENTS — backend renamed the endpoint), `FAQS`, `TRANSACTION_CATEGORIES`, `FUNDS`, `CHAT`, `ORGANIZATIONS`, `PLATFORM`, `REPRESENTATIVES`, `NOTIFICATIONS`, `ADDRESSES`, `SUBSCRIPTIONS`.

---

## 5. Adopt query key factories

If mobile uses TanStack Query (React Query), replace any hand-written `queryKey` arrays with the shared factories:

```ts
// Before
queryKey: ['failure-reports', buildingId]
queryKey: ['failure-reports', buildingId, { status, page }]

// After
import { failureReportKeys } from '@flatie/shared/constants';
queryKey: failureReportKeys.list(buildingId)
queryKey: failureReportKeys.list(buildingId, { status, page })
```

All 26 factories: `adminBuildingKeys`, `apartmentKeys`, `blogKeys`, `buildingKeys`, `chatKeys`, `dashboardSummaryKeys`, `documentKeys`, `eventKeys`, `failureReportKeys`, `faqKeys`, `fundsKeys`, `garageKeys`, `layoutKeys`, `maintenanceLogKeys`, `noticeKeys`, `notificationKeys`, `permissionKeys`, `platformBuildingKeys`, `pollKeys`, `recentKeys`, `recurringTemplateKeys`, `spotlightKeys`, `storageUnitKeys`, `transactionCategoryKeys`, `unitSearchKeys`, `userKeys`, `widgetKeys`.

If mobile uses **React Query Kit** (not plain React Query), write a thin adapter:

```ts
import { createQuery } from 'react-query-kit';
import { failureReportKeys } from '@flatie/shared/constants';
import { API_ROUTES } from '@flatie/shared/urls';

export const useFailureReports = createQuery({
  queryKey: failureReportKeys.lists(),
  fetcher: (buildingId: string) => apiClient.get(API_ROUTES.FAILURE_REPORTS.LIST(buildingId)),
});
```

The shared factories return `queryKey` arrays compatible with React Query Kit's key structure.

---

## 6. Adopt design tokens via the Tailwind preset

The shared package exports a Tailwind v3 / NativeWind preset:

```js
// tailwind.config.js (or tailwind.config.ts)
const { flatiePreset } = require('@flatie/shared/tailwind-preset');

module.exports = {
  presets: [flatiePreset],
  content: ['./src/**/*.{ts,tsx}'],
  // your other config
};
```

The preset contains:
- `colors` — all brand, semantic (success/warning/destructive/info), sidebar, and chart colors as OKLCH values
- `borderRadius` — `radius: 0.625rem`
- Context theme classes: `.theme-org`, `.theme-admin`, `.theme-platform`, `.theme-representatives` (apply to root wrappers for context-specific primary color)

> **NativeWind note:** The preset uses OKLCH color values. NativeWind v4 (Tailwind v4 engine) supports OKLCH natively. If you're on NativeWind v2/v3 (Tailwind v3 engine), OKLCH support depends on your build target — test on a physical device. Fallback: access token values programmatically via `@flatie/shared/tokens` and apply them with StyleSheet.

---

## 7. Adopt validation helpers

Replace inline Zod validators in mobile form schemas:

```ts
// Before
oib: z.string().length(11).regex(/^\d+$/)
phone: z.string().refine(val => /^[\d\s\-+()]+$/.test(val) && val.replace(/\D/g,'').length >= 8)

// After
import { oibSchema, phoneSchema } from '@flatie/shared/validation';
oib: oibSchema          // required 11-digit OIB
oib: optionalOibSchema  // optional version (empty string allowed)
phone: phoneSchema      // optional, min 8 digits
```

Also available: `addressSchema` (string, max 200 chars).

For password fields, use `strongPasswordSchema` from `@flatie/shared/schemas`:

```ts
import { strongPasswordSchema } from '@flatie/shared/schemas';
password: strongPasswordSchema   // min 8, max 100, uppercase + lowercase + number
```

---

## 8. Adopt error codes

Replace inline error code strings with the typed const:

```ts
// Before
if (error.code === 'EMAIL_NOT_VERIFIED') { ... }
if (error.code === 'TOKEN_EXPIRED') { ... }

// After
import { BACKEND_ERROR_CODES, isBackendErrorCode } from '@flatie/shared/errors';
if (error.code === BACKEND_ERROR_CODES.EMAIL_NOT_VERIFIED) { ... }

// Type-safe error code check:
if (isBackendErrorCode(error.code)) {
  // error.code is now narrowed to BackendErrorCode
}
```

Full list in `src/errors/index.ts` — 22 codes covering auth, session, and account management.

---

## 9. Don't share

These intentionally stay per-client:

| Concern | Reason |
|---|---|
| HTTP client / transport | Auth mechanisms differ (cookies on web, tokens on mobile) |
| `use*` React hooks | Web uses hooks, mobile has different hook conventions |
| Form schemas with `File` fields | Browser `File` ≠ React Native file refs |
| i18n translations | Keys are shared (`BACKEND_ERROR_CODES` values = translation keys); prose stays per-client |
| UI components | React web ≠ React Native primitives |

---

## 10. Verify

After the migration:

```bash
# type check
pnpm type-check  # or tsc --noEmit

# tests
pnpm test

# EAS build (check no resolution errors from @flatie/shared)
eas build --platform ios --profile preview
```

If you hit `Cannot find module '@flatie/shared/validation'` or similar, check that `package.json` exports in `node_modules/@flatie/shared/package.json` contains the `./validation` entry. If using `file:../flatie-shared` locally, run `pnpm build` in `flatie-shared` first so the `dist/` is up to date.
