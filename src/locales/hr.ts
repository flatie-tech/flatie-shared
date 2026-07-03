import type {
  $ZodErrorMap,
  $ZodInvalidTypeExpected,
  $ZodStringFormatIssues,
  $ZodStringFormats,
} from 'zod/v4/core';
import { util } from 'zod/v4/core';

const error: () => $ZodErrorMap = () => {
  const Sizable: Record<string, { unit: string; verb: string }> = {
    string: { unit: 'znakova', verb: 'imati' },
    file: { unit: 'bajtova', verb: 'imati' },
    array: { unit: 'elemenata', verb: 'imati' },
    set: { unit: 'elemenata', verb: 'imati' },
  };

  function getSizing(origin: string): { unit: string; verb: string } | null {
    return Sizable[origin] ?? null;
  }

  const FormatDictionary: {
    [k in $ZodStringFormats | (string & {})]?: string;
  } = {
    regex: 'unos',
    email: 'adresa e-pošte',
    url: 'URL',
    emoji: 'emoji',
    uuid: 'UUID',
    uuidv4: 'UUIDv4',
    uuidv6: 'UUIDv6',
    nanoid: 'nanoid',
    guid: 'GUID',
    cuid: 'cuid',
    cuid2: 'cuid2',
    ulid: 'ULID',
    xid: 'XID',
    ksuid: 'KSUID',
    datetime: 'ISO datum i vrijeme',
    date: 'ISO datum',
    time: 'ISO vrijeme',
    duration: 'ISO trajanje',
    ipv4: 'IPv4 adresa',
    ipv6: 'IPv6 adresa',
    cidrv4: 'IPv4 raspon',
    cidrv6: 'IPv6 raspon',
    base64: 'Base64 string',
    base64url: 'Base64 URL string',
    json_string: 'JSON string',
    e164: 'E.164 broj',
    jwt: 'JWT',
    template_literal: 'unos',
  };

  const TypeDictionary: {
    [k in $ZodInvalidTypeExpected | (string & {})]?: string;
  } = {
    nan: 'NaN',
    number: 'broj',
    array: 'niz',
  };

  return (issue) => {
    switch (issue.code) {
      case 'invalid_type': {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = util.getParsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Nevažeći unos: očekivano instanceof ${issue.expected}, primljeno ${received}`;
        }
        return `Nevažeći unos: očekivano ${expected}, primljeno ${received}`;
      }
      case 'invalid_value':
        if (issue.values.length === 1)
          return `Nevažeći unos: očekivano ${util.stringifyPrimitive(issue.values[0])}`;
        return `Nevažeća opcija: očekivano jedno od ${util.joinValues(issue.values, '|')}`;
      case 'too_big': {
        const adj = issue.inclusive ? '<=' : '<';
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Preveliko: očekivano da ${issue.origin ?? 'vrijednost'} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? 'elemenata'}`;
        return `Preveliko: očekivano da ${issue.origin ?? 'vrijednost'} bude ${adj}${issue.maximum.toString()}`;
      }
      case 'too_small': {
        const adj = issue.inclusive ? '>=' : '>';
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Premalo: očekivano da ${issue.origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Premalo: očekivano da ${issue.origin} bude ${adj}${issue.minimum.toString()}`;
      }
      case 'invalid_format': {
        const _issue = issue as $ZodStringFormatIssues;
        if (_issue.format === 'starts_with')
          return `Nevažeći string: mora započeti s "${_issue.prefix}"`;
        if (_issue.format === 'ends_with')
          return `Nevažeći string: mora završiti s "${_issue.suffix}"`;
        if (_issue.format === 'includes')
          return `Nevažeći string: mora sadržavati "${_issue.includes}"`;
        if (_issue.format === 'regex')
          return `Nevažeći string: mora odgovarati uzorku ${_issue.pattern}`;
        return `Nevažeće: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case 'not_multiple_of':
        return `Nevažeći broj: mora biti višekratnik od ${issue.divisor}`;
      case 'unrecognized_keys':
        return `${issue.keys.length > 1 ? 'Nepoznati ključevi' : 'Nepoznati ključ'}: ${util.joinValues(issue.keys, ', ')}`;
      case 'invalid_key':
        return `Nevažeći ključ u ${issue.origin}`;
      case 'invalid_union':
        return 'Nevažeći unos';
      case 'invalid_element':
        return `Nevažeća vrijednost u ${issue.origin}`;
      default:
        return 'Nevažeći unos';
    }
  };
};

export default function (): { localeError: $ZodErrorMap } {
  return {
    localeError: error(),
  };
}
