---
'@flatie/shared': minor
---

feat(test-ids): add `OnboardingTestIds` and `AppShellTestIds`

`OnboardingTestIds` covers the three onboarding tabs (`tabFind`, `tabJoin`,
`tabCreate`) on `/onboarding`. Existing consumers in `flatie-frontend`
will swap their inline `data-testid="onboarding-tab-..."` strings for
typed references.

`AppShellTestIds` covers the dashboard-header account controls:
`accountDropdown` (avatar button) + `signOutButton` (menu item).
Lifting these out of `flatie-frontend/src/components/layout/DashboardHeader/AccountDropdown.tsx`
where they were inline strings — `flatie-mobile` will likely need
the same selectors when it gains a logout flow.
