---
'@flatie/shared': minor
---

feat(utils): add `LOCALE_MAP`, `getDateLocale`, `formatDateByLocale`,
`formatDateTime`, `formatCurrencyByLocale` for cross-consumer locale-aware
date / currency formatting; add `parseApiError` (pure, no axios coupling) and
`ParsedApiError` for extracting domain error codes + messages from caught HTTP
errors. Lifts identical local copies that previously lived in
`flatie-frontend/src/lib/api/errors.ts`,
`flatie-frontend/src/hooks/use-locale-date-format.ts`,
`flatie-mobile/src/api/common/errors.ts`, and the inline helpers in
`flatie-backend/src/modules/notification/notification-email-templates.ts`.
