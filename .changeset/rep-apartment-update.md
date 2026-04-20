---
'@flatie/shared': minor
---

Grant `apartment:update` to building representatives (OWNER_REPRESENTATIVE, DEPUTY_REPRESENTATIVE).

Representatives now hold `APARTMENT_UPDATE`, which unlocks the full set of apartment mutations on the backend (create/update/delete/add-user/remove-user all gate on this permission today) and surfaces the edit/delete and resident-management buttons in the UI via `canEdit`.

Motivation: representatives administer the resident roster and apartment metadata for their building; previously only org-admin roles held these permissions, so reps on `/representatives/buildings/:id/apartments` could view but not edit apartments or manage residents.
