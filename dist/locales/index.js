import * as z from 'zod';
import { util } from 'zod/v4/core';

// src/locales/index.ts
var error = () => {
  const Sizable = {
    string: { unit: "znakova", verb: "imati" },
    file: { unit: "bajtova", verb: "imati" },
    array: { unit: "elemenata", verb: "imati" },
    set: { unit: "elemenata", verb: "imati" }
  };
  function getSizing(origin) {
    return Sizable[origin] ?? null;
  }
  const FormatDictionary = {
    regex: "unos",
    email: "adresa e-po\u0161te",
    url: "URL",
    emoji: "emoji",
    uuid: "UUID",
    uuidv4: "UUIDv4",
    uuidv6: "UUIDv6",
    nanoid: "nanoid",
    guid: "GUID",
    cuid: "cuid",
    cuid2: "cuid2",
    ulid: "ULID",
    xid: "XID",
    ksuid: "KSUID",
    datetime: "ISO datum i vrijeme",
    date: "ISO datum",
    time: "ISO vrijeme",
    duration: "ISO trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    cidrv4: "IPv4 raspon",
    cidrv6: "IPv6 raspon",
    base64: "Base64 string",
    base64url: "Base64 URL string",
    json_string: "JSON string",
    e164: "E.164 broj",
    jwt: "JWT",
    template_literal: "unos"
  };
  const TypeDictionary = {
    nan: "NaN",
    number: "broj",
    array: "niz"
  };
  return (issue) => {
    switch (issue.code) {
      case "invalid_type": {
        const expected = TypeDictionary[issue.expected] ?? issue.expected;
        const receivedType = util.getParsedType(issue.input);
        const received = TypeDictionary[receivedType] ?? receivedType;
        if (/^[A-Z]/.test(issue.expected)) {
          return `Neva\u017Ee\u0107i unos: o\u010Dekivano instanceof ${issue.expected}, primljeno ${received}`;
        }
        return `Neva\u017Ee\u0107i unos: o\u010Dekivano ${expected}, primljeno ${received}`;
      }
      case "invalid_value":
        if (issue.values.length === 1)
          return `Neva\u017Ee\u0107i unos: o\u010Dekivano ${util.stringifyPrimitive(issue.values[0])}`;
        return `Neva\u017Ee\u0107a opcija: o\u010Dekivano jedno od ${util.joinValues(issue.values, "|")}`;
      case "too_big": {
        const adj = issue.inclusive ? "<=" : "<";
        const sizing = getSizing(issue.origin);
        if (sizing)
          return `Preveliko: o\u010Dekivano da ${issue.origin ?? "vrijednost"} ima ${adj}${issue.maximum.toString()} ${sizing.unit ?? "elemenata"}`;
        return `Preveliko: o\u010Dekivano da ${issue.origin ?? "vrijednost"} bude ${adj}${issue.maximum.toString()}`;
      }
      case "too_small": {
        const adj = issue.inclusive ? ">=" : ">";
        const sizing = getSizing(issue.origin);
        if (sizing) {
          return `Premalo: o\u010Dekivano da ${issue.origin} ima ${adj}${issue.minimum.toString()} ${sizing.unit}`;
        }
        return `Premalo: o\u010Dekivano da ${issue.origin} bude ${adj}${issue.minimum.toString()}`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Neva\u017Ee\u0107i string: mora zapo\u010Deti s "${_issue.prefix}"`;
        if (_issue.format === "ends_with")
          return `Neva\u017Ee\u0107i string: mora zavr\u0161iti s "${_issue.suffix}"`;
        if (_issue.format === "includes")
          return `Neva\u017Ee\u0107i string: mora sadr\u017Eavati "${_issue.includes}"`;
        if (_issue.format === "regex")
          return `Neva\u017Ee\u0107i string: mora odgovarati uzorku ${_issue.pattern}`;
        return `Neva\u017Ee\u0107e: ${FormatDictionary[_issue.format] ?? issue.format}`;
      }
      case "not_multiple_of":
        return `Neva\u017Ee\u0107i broj: mora biti vi\u0161ekratnik od ${issue.divisor}`;
      case "unrecognized_keys":
        return `${issue.keys.length > 1 ? "Nepoznati klju\u010Devi" : "Nepoznati klju\u010D"}: ${util.joinValues(issue.keys, ", ")}`;
      case "invalid_key":
        return `Neva\u017Ee\u0107i klju\u010D u ${issue.origin}`;
      case "invalid_union":
        return "Neva\u017Ee\u0107i unos";
      case "invalid_element":
        return `Neva\u017Ee\u0107a vrijednost u ${issue.origin}`;
      default:
        return "Neva\u017Ee\u0107i unos";
    }
  };
};
function hr_default() {
  return {
    localeError: error()
  };
}

// src/locales/index.ts
function setZodLocale(lang) {
  if (lang === "hr") {
    z.config(hr_default());
    return;
  }
  const builtIn = z.locales[lang];
  if (builtIn) {
    z.config(builtIn());
  }
}

export { hr_default as hrLocale, setZodLocale };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map