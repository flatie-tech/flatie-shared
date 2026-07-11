/**
 * Initials for avatar fallbacks: first character of the first two words,
 * uppercased. Ported verbatim from the frontend's UserInitials component —
 * the same logic was copy-pasted six times across frontend and mobile.
 *
 * `getInitials('Ana Barić')  → 'AB'`
 * `getInitials('ana')        → 'A'`
 * `getInitials('')           → ''`
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
