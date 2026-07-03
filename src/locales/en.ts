import type { $ZodErrorMap, $ZodStringFormatIssues, $ZodStringFormats } from 'zod/v4/core';

/**
 * English Zod error map — user-facing tone.
 *
 * Overrides Zod's built-in `en` locale so the wording matches `hr`/`de`:
 * polite, imperative, no `<=`/`>=` jargon. Fallback only — a schema's own
 * `.min(1, { message })` still wins. Messages are friendly-but-generic
 * because a global error map can't see the field label.
 */
const error: () => $ZodErrorMap = () => {
  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    email: 'email address',
    url: 'URL',
    uuid: 'UUID',
    datetime: 'date and time',
    date: 'date',
    time: 'time',
    duration: 'duration',
    ipv4: 'IPv4 address',
    ipv6: 'IPv6 address',
    e164: 'phone number',
  };

  return (issue) => {
    const isMissing = issue.input === undefined || issue.input === null;

    switch (issue.code) {
      case 'invalid_type': {
        if (isMissing) return 'This field is required.';
        if (issue.expected === 'number') return 'Please enter a valid number.';
        return 'Please enter a valid value.';
      }

      case 'too_small': {
        const min = Number(issue.minimum);
        if (issue.origin === 'string') {
          if (min <= 1) return 'This field is required.';
          return `Please use at least ${min} characters.`;
        }
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Please select at least ${min} items.`;
        }
        if (issue.inclusive) return `Please enter a value of ${min} or more.`;
        return `Please enter a value greater than ${min}.`;
      }

      case 'too_big': {
        const max = Number(issue.maximum);
        if (issue.origin === 'string') return `Please use ${max} characters or fewer.`;
        if (issue.origin === 'array' || issue.origin === 'set') {
          return `Please select ${max} items or fewer.`;
        }
        if (issue.inclusive) return `Please enter a value of ${max} or less.`;
        return `Please enter a value less than ${max}.`;
      }

      case 'invalid_format': {
        const _issue = issue as $ZodStringFormatIssues;
        if (_issue.format === 'starts_with') return `Input must start with "${_issue.prefix}".`;
        if (_issue.format === 'ends_with') return `Input must end with "${_issue.suffix}".`;
        if (_issue.format === 'includes') return `Input must include "${_issue.includes}".`;
        if (_issue.format === 'email') return 'Please enter a valid email address.';
        if (_issue.format === 'url') return 'Please enter a valid URL.';
        if (_issue.format === 'regex') return 'Please enter a valid value.';
        return `Please enter a valid ${FormatDictionary[_issue.format] ?? _issue.format}.`;
      }

      case 'invalid_value':
        return 'Please choose a valid option.';

      case 'not_multiple_of':
        return `Please enter a multiple of ${issue.divisor}.`;

      default:
        return 'Please check your input.';
    }
  };
};

export default function (): { localeError: $ZodErrorMap } {
  return {
    localeError: error(),
  };
}
