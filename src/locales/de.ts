import type { $ZodErrorMap, $ZodStringFormatIssues, $ZodStringFormats } from 'zod/v4/core';

/**
 * German Zod error map — user-facing tone.
 *
 * Overrides Zod's built-in `de` locale so the wording matches `hr`/`en`.
 * Uses the neutral "Bitte … eingeben" infinitive-imperative common on German
 * forms (no du/Sie split). Fallback only — a schema's own `.min(1, { message })`
 * still wins. Messages are friendly-but-generic (no field label available).
 */
const error: () => $ZodErrorMap = () => {
  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    email: 'E-Mail-Adresse',
    url: 'URL',
    uuid: 'UUID',
    datetime: 'Datum und Uhrzeit',
    date: 'Datum',
    time: 'Uhrzeit',
    duration: 'Dauer',
    ipv4: 'IPv4-Adresse',
    ipv6: 'IPv6-Adresse',
    e164: 'Telefonnummer',
  };

  return (issue) => {
    const isMissing = issue.input === undefined || issue.input === null;

    switch (issue.code) {
      case 'invalid_type': {
        if (isMissing) return 'Dieses Feld ist erforderlich.';
        if (issue.expected === 'number') return 'Bitte eine gültige Zahl eingeben.';
        return 'Bitte einen gültigen Wert eingeben.';
      }

      case 'too_small': {
        const min = Number(issue.minimum);
        if (issue.origin === 'string') {
          if (min <= 1) return 'Dieses Feld ist erforderlich.';
          return `Bitte mindestens ${min} Zeichen eingeben.`;
        }
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Bitte mindestens ${min} Optionen auswählen.`;
        }
        if (issue.inclusive) return `Bitte einen Wert von ${min} oder mehr eingeben.`;
        return `Bitte einen Wert größer als ${min} eingeben.`;
      }

      case 'too_big': {
        const max = Number(issue.maximum);
        if (issue.origin === 'string') return `Bitte höchstens ${max} Zeichen eingeben.`;
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Bitte höchstens ${max} Optionen auswählen.`;
        }
        if (issue.inclusive) return `Bitte einen Wert von ${max} oder weniger eingeben.`;
        return `Bitte einen Wert kleiner als ${max} eingeben.`;
      }

      case 'invalid_format': {
        const _issue = issue as $ZodStringFormatIssues;
        if (_issue.format === 'starts_with')
          return `Die Eingabe muss mit "${_issue.prefix}" beginnen.`;
        if (_issue.format === 'ends_with') return `Die Eingabe muss mit "${_issue.suffix}" enden.`;
        if (_issue.format === 'includes') return `Die Eingabe muss "${_issue.includes}" enthalten.`;
        if (_issue.format === 'email') return 'Bitte eine gültige E-Mail-Adresse eingeben.';
        if (_issue.format === 'url') return 'Bitte eine gültige URL eingeben.';
        if (_issue.format === 'regex') return 'Bitte eine gültige Eingabe machen.';
        return `Bitte einen gültigen Wert eingeben (${FormatDictionary[_issue.format] ?? _issue.format}).`;
      }

      case 'invalid_value':
        return 'Bitte eine gültige Option wählen.';

      case 'not_multiple_of':
        return `Bitte ein Vielfaches von ${issue.divisor} eingeben.`;

      default:
        return 'Bitte die Eingaben überprüfen.';
    }
  };
};

export default function (): { localeError: $ZodErrorMap } {
  return {
    localeError: error(),
  };
}
