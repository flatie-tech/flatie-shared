import type { $ZodErrorMap, $ZodStringFormatIssues, $ZodStringFormats } from 'zod/v4/core';

/**
 * Croatian Zod error map — user-facing tone.
 *
 * Unlike Zod's built-in maps (which read like debugger output), these are
 * written for end users filling in forms: polite, imperative, no `<=`/`>=`
 * jargon. This map is only the *fallback* — schemas that set their own
 * `.min(1, { message })` still win. Because a global error map can't see the
 * field label, messages are friendly-but-generic ("Ovo polje je obavezno.",
 * not "E-pošta je obavezna.").
 */
const error: () => $ZodErrorMap = () => {
  // Friendly names for string formats, used in the invalid_format fallback.
  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    email: 'adresa e-pošte',
    url: 'URL',
    uuid: 'UUID',
    datetime: 'datum i vrijeme',
    date: 'datum',
    time: 'vrijeme',
    duration: 'trajanje',
    ipv4: 'IPv4 adresa',
    ipv6: 'IPv6 adresa',
    e164: 'telefonski broj',
  };

  return (issue) => {
    const isMissing = issue.input === undefined || issue.input === null;

    switch (issue.code) {
      case 'invalid_type': {
        if (isMissing) return 'Ovo polje je obavezno.';
        if (issue.expected === 'number') return 'Unesite ispravan broj.';
        return 'Unesite ispravnu vrijednost.';
      }

      case 'too_small': {
        const min = Number(issue.minimum);
        if (issue.origin === 'string') {
          if (min <= 1) return 'Ovo polje je obavezno.';
          return `Unesite barem ${min} znakova.`;
        }
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Odaberite barem ${min} stavki.`;
        }
        if (issue.inclusive) return `Unesite vrijednost ${min} ili veću.`;
        return `Unesite vrijednost veću od ${min}.`;
      }

      case 'too_big': {
        const max = Number(issue.maximum);
        if (issue.origin === 'string') return `Unesite najviše ${max} znakova.`;
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Odaberite najviše ${max} stavki.`;
        }
        if (issue.inclusive) return `Unesite vrijednost ${max} ili manju.`;
        return `Unesite vrijednost manju od ${max}.`;
      }

      case 'invalid_format': {
        const _issue = issue as $ZodStringFormatIssues;
        if (_issue.format === 'starts_with') return `Unos mora započeti s "${_issue.prefix}".`;
        if (_issue.format === 'ends_with') return `Unos mora završiti s "${_issue.suffix}".`;
        if (_issue.format === 'includes') return `Unos mora sadržavati "${_issue.includes}".`;
        if (_issue.format === 'email') return 'Unesite ispravnu adresu e-pošte.';
        if (_issue.format === 'url') return 'Unesite ispravan URL.';
        if (_issue.format === 'regex') return 'Unesite ispravan unos.';
        return `Unesite ispravnu vrijednost (${FormatDictionary[_issue.format] ?? _issue.format}).`;
      }

      case 'invalid_value':
        return 'Odaberite jednu od ponuđenih opcija.';

      case 'not_multiple_of':
        return `Unesite višekratnik broja ${issue.divisor}.`;

      default:
        return 'Provjerite unesene podatke.';
    }
  };
};

export default function (): { localeError: $ZodErrorMap } {
  return {
    localeError: error(),
  };
}
