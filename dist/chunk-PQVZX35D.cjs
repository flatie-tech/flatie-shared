'use strict';

// src/constants/ai-chat.ts
var AI_CHAT_LIMITS = {
  /** Hard ceiling on the messages array per request. */
  MAX_MESSAGES: 100,
  /** Hard ceiling on a single message's text content, in characters. */
  MAX_MESSAGE_CHARS: 2e4,
  /** Client-side cap for the user's input box (web textarea / mobile TextInput). */
  MAX_INPUT_CHARS: 4e3,
  /** Server-side history window: newest messages kept per model call. */
  WINDOW_MAX_MESSAGES: 20,
  /** Server-side history window: character budget (~6k tokens) per model call. */
  WINDOW_MAX_CHARS: 24e3
};

// src/constants/zuoz-adjacent-consent.ts
var ZUOZ_ADJACENT_CONSENT_CATEGORIES = [
  "noisyActivityConsent",
  // čl. 33. st. 2.
  "shortTermRentalConsent",
  // čl. 34. st. 1.
  "multiPersonRentalConsent"
  // čl. 35. st. 1.
];
function isZuozAdjacentConsentCategory(category) {
  return category != null && ZUOZ_ADJACENT_CONSENT_CATEGORIES.includes(category);
}

exports.AI_CHAT_LIMITS = AI_CHAT_LIMITS;
exports.ZUOZ_ADJACENT_CONSENT_CATEGORIES = ZUOZ_ADJACENT_CONSENT_CATEGORIES;
exports.isZuozAdjacentConsentCategory = isZuozAdjacentConsentCategory;
//# sourceMappingURL=chunk-PQVZX35D.cjs.map
//# sourceMappingURL=chunk-PQVZX35D.cjs.map