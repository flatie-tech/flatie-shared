'use strict';

var z = require('zod');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var z__namespace = /*#__PURE__*/_interopNamespace(z);

// src/locales/index.ts

// src/locales/de.ts
var error = () => {
  const FormatDictionary = {
    email: "E-Mail-Adresse",
    url: "URL",
    uuid: "UUID",
    datetime: "Datum und Uhrzeit",
    date: "Datum",
    time: "Uhrzeit",
    duration: "Dauer",
    ipv4: "IPv4-Adresse",
    ipv6: "IPv6-Adresse",
    e164: "Telefonnummer"
  };
  return (issue) => {
    const isMissing = issue.input === void 0 || issue.input === null;
    switch (issue.code) {
      case "invalid_type": {
        if (isMissing) return "Dieses Feld ist erforderlich.";
        if (issue.expected === "number") return "Bitte eine g\xFCltige Zahl eingeben.";
        return "Bitte einen g\xFCltigen Wert eingeben.";
      }
      case "too_small": {
        const min = Number(issue.minimum);
        if (issue.origin === "string") {
          if (min <= 1) return "Dieses Feld ist erforderlich.";
          return `Bitte mindestens ${min} Zeichen eingeben.`;
        }
        if (issue.origin === "array" || issue.origin === "set") {
          return `Bitte mindestens ${min} Optionen ausw\xE4hlen.`;
        }
        if (issue.inclusive) return `Bitte einen Wert von ${min} oder mehr eingeben.`;
        return `Bitte einen Wert gr\xF6\xDFer als ${min} eingeben.`;
      }
      case "too_big": {
        const max = Number(issue.maximum);
        if (issue.origin === "string") return `Bitte h\xF6chstens ${max} Zeichen eingeben.`;
        if (issue.origin === "array" || issue.origin === "set") {
          return `Bitte h\xF6chstens ${max} Optionen ausw\xE4hlen.`;
        }
        if (issue.inclusive) return `Bitte einen Wert von ${max} oder weniger eingeben.`;
        return `Bitte einen Wert kleiner als ${max} eingeben.`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with")
          return `Die Eingabe muss mit "${_issue.prefix}" beginnen.`;
        if (_issue.format === "ends_with") return `Die Eingabe muss mit "${_issue.suffix}" enden.`;
        if (_issue.format === "includes") return `Die Eingabe muss "${_issue.includes}" enthalten.`;
        if (_issue.format === "email") return "Bitte eine g\xFCltige E-Mail-Adresse eingeben.";
        if (_issue.format === "url") return "Bitte eine g\xFCltige URL eingeben.";
        if (_issue.format === "regex") return "Bitte eine g\xFCltige Eingabe machen.";
        return `Bitte einen g\xFCltigen Wert eingeben (${FormatDictionary[_issue.format] ?? _issue.format}).`;
      }
      case "invalid_value":
        return "Bitte eine g\xFCltige Option w\xE4hlen.";
      case "not_multiple_of":
        return `Bitte ein Vielfaches von ${issue.divisor} eingeben.`;
      default:
        return "Bitte die Eingaben \xFCberpr\xFCfen.";
    }
  };
};
function de_default() {
  return {
    localeError: error()
  };
}

// src/locales/en.ts
var error2 = () => {
  const FormatDictionary = {
    email: "email address",
    url: "URL",
    uuid: "UUID",
    datetime: "date and time",
    date: "date",
    time: "time",
    duration: "duration",
    ipv4: "IPv4 address",
    ipv6: "IPv6 address",
    e164: "phone number"
  };
  return (issue) => {
    const isMissing = issue.input === void 0 || issue.input === null;
    switch (issue.code) {
      case "invalid_type": {
        if (isMissing) return "This field is required.";
        if (issue.expected === "number") return "Please enter a valid number.";
        return "Please enter a valid value.";
      }
      case "too_small": {
        const min = Number(issue.minimum);
        if (issue.origin === "string") {
          if (min <= 1) return "This field is required.";
          return `Please use at least ${min} characters.`;
        }
        if (issue.origin === "array" || issue.origin === "set") {
          return `Please select at least ${min} items.`;
        }
        if (issue.inclusive) return `Please enter a value of ${min} or more.`;
        return `Please enter a value greater than ${min}.`;
      }
      case "too_big": {
        const max = Number(issue.maximum);
        if (issue.origin === "string") return `Please use ${max} characters or fewer.`;
        if (issue.origin === "array" || issue.origin === "set") {
          return `Please select ${max} items or fewer.`;
        }
        if (issue.inclusive) return `Please enter a value of ${max} or less.`;
        return `Please enter a value less than ${max}.`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") return `Input must start with "${_issue.prefix}".`;
        if (_issue.format === "ends_with") return `Input must end with "${_issue.suffix}".`;
        if (_issue.format === "includes") return `Input must include "${_issue.includes}".`;
        if (_issue.format === "email") return "Please enter a valid email address.";
        if (_issue.format === "url") return "Please enter a valid URL.";
        if (_issue.format === "regex") return "Please enter a valid value.";
        return `Please enter a valid ${FormatDictionary[_issue.format] ?? _issue.format}.`;
      }
      case "invalid_value":
        return "Please choose a valid option.";
      case "not_multiple_of":
        return `Please enter a multiple of ${issue.divisor}.`;
      default:
        return "Please check your input.";
    }
  };
};
function en_default() {
  return {
    localeError: error2()
  };
}

// src/locales/hr.ts
var error3 = () => {
  const FormatDictionary = {
    email: "adresa e-po\u0161te",
    url: "URL",
    uuid: "UUID",
    datetime: "datum i vrijeme",
    date: "datum",
    time: "vrijeme",
    duration: "trajanje",
    ipv4: "IPv4 adresa",
    ipv6: "IPv6 adresa",
    e164: "telefonski broj"
  };
  return (issue) => {
    const isMissing = issue.input === void 0 || issue.input === null;
    switch (issue.code) {
      case "invalid_type": {
        if (isMissing) return "Ovo polje je obavezno.";
        if (issue.expected === "number") return "Unesite ispravan broj.";
        return "Unesite ispravnu vrijednost.";
      }
      case "too_small": {
        const min = Number(issue.minimum);
        if (issue.origin === "string") {
          if (min <= 1) return "Ovo polje je obavezno.";
          return `Unesite barem ${min} znakova.`;
        }
        if (issue.origin === "array" || issue.origin === "set") {
          return `Odaberite barem ${min} stavki.`;
        }
        if (issue.inclusive) return `Unesite vrijednost ${min} ili ve\u0107u.`;
        return `Unesite vrijednost ve\u0107u od ${min}.`;
      }
      case "too_big": {
        const max = Number(issue.maximum);
        if (issue.origin === "string") return `Unesite najvi\u0161e ${max} znakova.`;
        if (issue.origin === "array" || issue.origin === "set") {
          return `Odaberite najvi\u0161e ${max} stavki.`;
        }
        if (issue.inclusive) return `Unesite vrijednost ${max} ili manju.`;
        return `Unesite vrijednost manju od ${max}.`;
      }
      case "invalid_format": {
        const _issue = issue;
        if (_issue.format === "starts_with") return `Unos mora zapo\u010Deti s "${_issue.prefix}".`;
        if (_issue.format === "ends_with") return `Unos mora zavr\u0161iti s "${_issue.suffix}".`;
        if (_issue.format === "includes") return `Unos mora sadr\u017Eavati "${_issue.includes}".`;
        if (_issue.format === "email") return "Unesite ispravnu adresu e-po\u0161te.";
        if (_issue.format === "url") return "Unesite ispravan URL.";
        if (_issue.format === "regex") return "Unesite ispravan unos.";
        return `Unesite ispravnu vrijednost (${FormatDictionary[_issue.format] ?? _issue.format}).`;
      }
      case "invalid_value":
        return "Odaberite jednu od ponu\u0111enih opcija.";
      case "not_multiple_of":
        return `Unesite vi\u0161ekratnik broja ${issue.divisor}.`;
      default:
        return "Provjerite unesene podatke.";
    }
  };
};
function hr_default() {
  return {
    localeError: error3()
  };
}

// src/locales/index.ts
var CUSTOM_LOCALES = {
  hr: hr_default,
  en: en_default,
  de: de_default
};
function setZodLocale(lang) {
  const custom = CUSTOM_LOCALES[lang];
  if (custom) {
    z__namespace.config(custom());
    return;
  }
  const builtIn = z__namespace.locales[lang];
  if (builtIn) {
    z__namespace.config(builtIn());
  }
}

exports.deLocale = de_default;
exports.enLocale = en_default;
exports.hrLocale = hr_default;
exports.setZodLocale = setZodLocale;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map