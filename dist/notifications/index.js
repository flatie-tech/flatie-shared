import { NotificationType } from '../chunk-2BDCEEIP.js';

// src/notifications/labels.ts
var SUPPORTED_LOCALES = ["hr", "en", "de"];
var DEFAULT_LOCALE = "hr";
function resolveLocale(raw) {
  if (!raw) return DEFAULT_LOCALE;
  const base = raw.toLowerCase().split(/[-_]/)[0] ?? "";
  return SUPPORTED_LOCALES.includes(base) ? base : DEFAULT_LOCALE;
}
var STATUS_LABELS = {
  hr: {
    pending: "Na \u010Dekanju",
    in_progress: "U tijeku",
    inProgress: "U tijeku",
    resolved: "Rije\u0161eno",
    approved: "Odobreno",
    rejected: "Odbijeno",
    cancelled: "Otkazano",
    completed: "Zavr\u0161eno",
    pendingApproval: "\u010Ceka odobrenje"
  },
  en: {
    pending: "Pending",
    in_progress: "In progress",
    inProgress: "In progress",
    resolved: "Resolved",
    approved: "Approved",
    rejected: "Rejected",
    cancelled: "Cancelled",
    completed: "Completed",
    pendingApproval: "Pending approval"
  },
  de: {
    pending: "Ausstehend",
    in_progress: "In Bearbeitung",
    inProgress: "In Bearbeitung",
    resolved: "Behoben",
    approved: "Genehmigt",
    rejected: "Abgelehnt",
    cancelled: "Abgesagt",
    completed: "Abgeschlossen",
    pendingApproval: "Genehmigung ausstehend"
  }
};
var EVENT_TYPE_LABELS = {
  hr: {
    service: "Servis",
    inspection: "Inspekcija",
    maintenance: "Odr\u017Eavanje",
    meeting: "Sastanak",
    discussion: "Rasprava",
    planned_works: "Planirani radovi",
    waste_collection: "Odvoz sme\u0107a",
    other: "Ostalo"
  },
  en: {
    service: "Service",
    inspection: "Inspection",
    maintenance: "Maintenance",
    meeting: "Meeting",
    discussion: "Discussion",
    planned_works: "Planned works",
    waste_collection: "Waste collection",
    other: "Other"
  },
  de: {
    service: "Service",
    inspection: "Inspektion",
    maintenance: "Wartung",
    meeting: "Sitzung",
    discussion: "Diskussion",
    planned_works: "Geplante Arbeiten",
    waste_collection: "M\xFCllabfuhr",
    other: "Sonstiges"
  }
};
var WASTE_SUBTYPE_LABELS = {
  hr: {
    plastic_metal: "Plastika i metal",
    bio: "Biootpad",
    paper_cardboard: "Papir i karton",
    mixed: "Mije\u0161ani otpad",
    bulky: "Glomazni otpad"
  },
  en: {
    plastic_metal: "Plastic & metal",
    bio: "Bio waste",
    paper_cardboard: "Paper & cardboard",
    mixed: "Mixed waste",
    bulky: "Bulky waste"
  },
  de: {
    plastic_metal: "Plastik & Metall",
    bio: "Bioabfall",
    paper_cardboard: "Papier & Karton",
    mixed: "Restm\xFCll",
    bulky: "Sperrm\xFCll"
  }
};
var POLL_TYPE_LABELS = {
  hr: { consensus: "Konsenzus", community: "Zajednica" },
  en: { consensus: "Consensus", community: "Community" },
  de: { consensus: "Konsens", community: "Gemeinschaft" }
};
var ROLE_LABELS = {
  hr: {
    BUILDING_MANAGER: "Upravitelj zgrade",
    OWNER_REPRESENTATIVE: "Predstavnik suvlasnika",
    DEPUTY_REPRESENTATIVE: "Zamjenik predstavnika",
    CO_OWNER: "Suvlasnik",
    TENANT: "Stanar"
  },
  en: {
    BUILDING_MANAGER: "Building manager",
    OWNER_REPRESENTATIVE: "Owner representative",
    DEPUTY_REPRESENTATIVE: "Deputy representative",
    CO_OWNER: "Co-owner",
    TENANT: "Tenant"
  },
  de: {
    BUILDING_MANAGER: "Geb\xE4udeverwalter",
    OWNER_REPRESENTATIVE: "Eigent\xFCmervertreter",
    DEPUTY_REPRESENTATIVE: "Stellvertreter",
    CO_OWNER: "Miteigent\xFCmer",
    TENANT: "Mieter"
  }
};
function getStatusLabel(locale, status) {
  return STATUS_LABELS[locale][status] ?? status;
}
function getEventTypeLabel(locale, eventType) {
  return EVENT_TYPE_LABELS[locale][eventType] ?? eventType;
}
function getWasteSubtypeLabel(locale, subtype) {
  return WASTE_SUBTYPE_LABELS[locale][subtype] ?? subtype;
}
function getPollTypeLabel(locale, pollType) {
  return POLL_TYPE_LABELS[locale][pollType] ?? pollType;
}
function getRoleLabel(locale, role) {
  return ROLE_LABELS[locale][role] ?? role;
}
function getDateLocale(locale) {
  return locale === "hr" ? "hr-HR" : locale === "de" ? "de-DE" : "en-US";
}

// src/notifications/templates.ts
var NOTIFICATION_TEMPLATES = {
  // ── Notices ────────────────────────────────────────────────────────────
  [NotificationType.NOTICE_CREATED]: {
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: {
      hr: "{{actorName}} je objavio/la novu obavijest u zgradi {{buildingName}}",
      en: "{{actorName}} posted a new notice in {{buildingName}}",
      de: "{{actorName}} hat eine neue Mitteilung in {{buildingName}} ver\xF6ffentlicht"
    },
    description: {
      hr: "\u0160alje se kada je u zgradi objavljena nova obavijest",
      en: "Sent when a new notice is created in a building",
      de: "Wird gesendet, wenn eine neue Mitteilung im Geb\xE4ude erstellt wird"
    }
  },
  [NotificationType.NOTICE_APPROVED]: {
    title: { hr: "Obavijest odobrena", en: "Notice Approved", de: "Mitteilung genehmigt" },
    body: {
      hr: "Va\u0161a obavijest \u201E{{title}}\u201D je odobrena",
      en: 'Your notice "{{title}}" has been approved',
      de: "Ihre Mitteilung \u201E{{title}}\u201C wurde genehmigt"
    },
    description: {
      hr: "\u0160alje se autoru kada je njegova obavijest odobrena",
      en: "Sent to the notice creator when their notice is approved",
      de: "Wird an den Autor gesendet, wenn seine Mitteilung genehmigt wird"
    }
  },
  [NotificationType.NOTICE_REJECTED]: {
    title: { hr: "Obavijest odbijena", en: "Notice Rejected", de: "Mitteilung abgelehnt" },
    body: {
      hr: "Va\u0161a obavijest \u201E{{title}}\u201D nije odobrena",
      en: 'Your notice "{{title}}" was not approved',
      de: "Ihre Mitteilung \u201E{{title}}\u201C wurde nicht genehmigt"
    },
    description: {
      hr: "\u0160alje se autoru kada njegova obavijest nije odobrena",
      en: "Sent to the notice creator when their notice is rejected",
      de: "Wird an den Autor gesendet, wenn seine Mitteilung abgelehnt wird"
    }
  },
  // ── Polls ──────────────────────────────────────────────────────────────
  [NotificationType.POLL_CREATED]: {
    title: { hr: "{{question}}", en: "{{question}}", de: "{{question}}" },
    body: {
      hr: "{{actorName}} je kreirao/la novu anketu u zgradi {{buildingName}}",
      en: "{{actorName}} created a new poll in {{buildingName}}",
      de: "{{actorName}} hat eine neue Umfrage in {{buildingName}} erstellt"
    },
    description: {
      hr: "\u0160alje se kada je kreirana nova anketa",
      en: "Sent when a new poll is created",
      de: "Wird gesendet, wenn eine neue Umfrage erstellt wird"
    }
  },
  [NotificationType.POLL_DEADLINE_24H]: {
    title: { hr: "Anketa uskoro zavr\u0161ava", en: "Poll Ending Soon", de: "Umfrage endet bald" },
    body: {
      hr: "Anketa \u201E{{question}}\u201D zavr\u0161ava za 24 sata. Glasajte!",
      en: 'Poll "{{question}}" ends in 24 hours. Cast your vote!',
      de: "Die Umfrage \u201E{{question}}\u201C endet in 24 Stunden. Stimmen Sie ab!"
    },
    description: {
      hr: "Podsjetnik 24 sata prije isteka roka za glasanje",
      en: "Reminder sent 24 hours before poll deadline",
      de: "Erinnerung 24 Stunden vor Ablauf der Abstimmungsfrist"
    }
  },
  [NotificationType.POLL_DEADLINE_1H]: {
    title: {
      hr: "Posljednja prilika za glasanje",
      en: "Last Chance to Vote",
      de: "Letzte Chance zum Abstimmen"
    },
    body: {
      hr: "Anketa \u201E{{question}}\u201D zavr\u0161ava za 1 sat!",
      en: 'Poll "{{question}}" ends in 1 hour!',
      de: "Die Umfrage \u201E{{question}}\u201C endet in 1 Stunde!"
    },
    description: {
      hr: "Podsjetnik 1 sat prije isteka roka za glasanje",
      en: "Reminder sent 1 hour before poll deadline",
      de: "Erinnerung 1 Stunde vor Ablauf der Abstimmungsfrist"
    }
  },
  [NotificationType.POLL_FINALIZED]: {
    title: {
      hr: "Rezultati ankete dostupni",
      en: "Poll Results Available",
      de: "Umfrageergebnisse verf\xFCgbar"
    },
    body: {
      hr: "Rezultati ankete \u201E{{question}}\u201D su sada dostupni",
      en: 'Results for "{{question}}" are now available',
      de: "Die Ergebnisse der Umfrage \u201E{{question}}\u201C sind jetzt verf\xFCgbar"
    },
    description: {
      hr: "\u0160alje se kada su rezultati ankete finalizirani",
      en: "Sent when poll results are finalized",
      de: "Wird gesendet, wenn die Umfrageergebnisse feststehen"
    }
  },
  [NotificationType.POLL_VOTE_SIGNATURE_PENDING]: {
    title: {
      hr: "Potpisani glas \u010Deka pregled",
      en: "Signed vote awaiting review",
      de: "Unterschriebene Stimme wartet auf Pr\xFCfung"
    },
    body: {
      hr: "{{actorName}} je prilo\u017Eio/la potpisani glasa\u010Dki listi\u0107 za \u201E{{question}}\u201D",
      en: '{{actorName}} uploaded a signed ballot for "{{question}}"',
      de: "{{actorName}} hat einen unterschriebenen Stimmzettel f\xFCr \u201E{{question}}\u201C hochgeladen"
    },
    description: {
      hr: "\u0160alje se predstavnicima kada suvlasnik prilo\u017Ei potpisani glasa\u010Dki listi\u0107",
      en: "Sent to representatives when a co-owner uploads a signed ballot",
      de: "Wird an Vertreter gesendet, wenn ein Miteigent\xFCmer einen unterschriebenen Stimmzettel hochl\xE4dt"
    }
  },
  [NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: {
    title: {
      hr: "Potpisani glas odobren",
      en: "Signed vote approved",
      de: "Unterschriebene Stimme genehmigt"
    },
    body: {
      hr: "Va\u0161 potpisani glas za \u201E{{question}}\u201D je odobren",
      en: 'Your signed vote for "{{question}}" was approved',
      de: "Ihre unterschriebene Stimme f\xFCr \u201E{{question}}\u201C wurde genehmigt"
    },
    description: {
      hr: "\u0160alje se glasa\u010Du kada predstavnik odobri njegov potpisani listi\u0107",
      en: "Sent to the voter when a representative approves their signed ballot",
      de: "Wird an den W\xE4hler gesendet, wenn ein Vertreter seinen Stimmzettel genehmigt"
    }
  },
  [NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: {
    title: {
      hr: "Potpisani glas odbijen",
      en: "Signed vote rejected",
      de: "Unterschriebene Stimme abgelehnt"
    },
    body: {
      hr: "Va\u0161 potpisani glas za \u201E{{question}}\u201D je odbijen: {{reason}}",
      en: 'Your signed vote for "{{question}}" was rejected: {{reason}}',
      de: "Ihre unterschriebene Stimme f\xFCr \u201E{{question}}\u201C wurde abgelehnt: {{reason}}"
    },
    description: {
      hr: "\u0160alje se glasa\u010Du kada predstavnik odbije njegov potpisani listi\u0107",
      en: "Sent to the voter when a representative rejects their signed ballot",
      de: "Wird an den W\xE4hler gesendet, wenn ein Vertreter seinen Stimmzettel ablehnt"
    }
  },
  // ── Events ─────────────────────────────────────────────────────────────
  [NotificationType.EVENT_CREATED]: {
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: {
      hr: "{{actorName}} je zakazao/la \u201E{{title}}\u201D za {{startDate}}",
      en: '{{actorName}} scheduled "{{title}}" for {{startDate}}',
      de: "{{actorName}} hat \u201E{{title}}\u201C f\xFCr {{startDate}} geplant"
    },
    description: {
      hr: "\u0160alje se kada je kreiran novi doga\u0111aj",
      en: "Sent when a new event is created",
      de: "Wird gesendet, wenn ein neues Ereignis erstellt wird"
    }
  },
  [NotificationType.EVENT_REMINDER_24H]: {
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: {
      hr: "\u201E{{title}}\u201D po\u010Dinje sutra u {{startTime}}",
      en: '"{{title}}" is happening tomorrow at {{startTime}}',
      de: "\u201E{{title}}\u201C findet morgen um {{startTime}} statt"
    },
    description: {
      hr: "Podsjetnik 24 sata prije doga\u0111aja",
      en: "Reminder sent 24 hours before event",
      de: "Erinnerung 24 Stunden vor dem Ereignis"
    }
  },
  [NotificationType.EVENT_REMINDER_1H]: {
    title: {
      hr: "Doga\u0111aj uskoro po\u010Dinje",
      en: "Event Starting Soon",
      de: "Ereignis beginnt bald"
    },
    body: {
      hr: "\u201E{{title}}\u201D po\u010Dinje za 1 sat",
      en: '"{{title}}" starts in 1 hour',
      de: "\u201E{{title}}\u201C beginnt in 1 Stunde"
    },
    description: {
      hr: "Podsjetnik 1 sat prije doga\u0111aja",
      en: "Reminder sent 1 hour before event",
      de: "Erinnerung 1 Stunde vor dem Ereignis"
    }
  },
  [NotificationType.EVENT_UPDATED]: {
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: {
      hr: "Detalji doga\u0111aja \u201E{{title}}\u201D su a\u017Eurirani",
      en: 'Details for "{{title}}" have been updated',
      de: "Die Details von \u201E{{title}}\u201C wurden aktualisiert"
    },
    description: {
      hr: "\u0160alje se kada su detalji doga\u0111aja promijenjeni",
      en: "Sent when event details are changed",
      de: "Wird gesendet, wenn Ereignisdetails ge\xE4ndert werden"
    }
  },
  [NotificationType.EVENT_CANCELLED]: {
    title: { hr: "Doga\u0111aj otkazan", en: "Event Cancelled", de: "Ereignis abgesagt" },
    body: {
      hr: "\u201E{{title}}\u201D zakazan za {{startDate}} je otkazan",
      en: '"{{title}}" scheduled for {{startDate}} has been cancelled',
      de: "\u201E{{title}}\u201C geplant f\xFCr {{startDate}} wurde abgesagt"
    },
    description: {
      hr: "\u0160alje se kada je doga\u0111aj otkazan",
      en: "Sent when an event is cancelled",
      de: "Wird gesendet, wenn ein Ereignis abgesagt wird"
    }
  },
  // ── Waste collection reminders ─────────────────────────────────────────
  [NotificationType.WASTE_REMINDER_MIXED]: {
    title: { hr: "{{wasteTypeLabel}}", en: "{{wasteTypeLabel}}", de: "{{wasteTypeLabel}}" },
    body: {
      hr: "Odvoz za {{wasteTypeLabel}} po\u010Dinje za 1 sat",
      en: "Waste collection for {{wasteTypeLabel}} in 1 hour",
      de: "Die Abholung f\xFCr {{wasteTypeLabel}} beginnt in 1 Stunde"
    },
    description: {
      hr: "Podsjetnik 1 sat prije odvoza mije\u0161anog otpada",
      en: "Reminder 1 hour before mixed waste collection",
      de: "Erinnerung 1 Stunde vor der Restm\xFCllabholung"
    }
  },
  [NotificationType.WASTE_REMINDER_BIO]: {
    title: { hr: "{{wasteTypeLabel}}", en: "{{wasteTypeLabel}}", de: "{{wasteTypeLabel}}" },
    body: {
      hr: "Odvoz za {{wasteTypeLabel}} po\u010Dinje za 1 sat",
      en: "Waste collection for {{wasteTypeLabel}} in 1 hour",
      de: "Die Abholung f\xFCr {{wasteTypeLabel}} beginnt in 1 Stunde"
    },
    description: {
      hr: "Podsjetnik 1 sat prije odvoza biootpada",
      en: "Reminder 1 hour before bio waste collection",
      de: "Erinnerung 1 Stunde vor der Bioabfallabholung"
    }
  },
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: {
    title: { hr: "{{wasteTypeLabel}}", en: "{{wasteTypeLabel}}", de: "{{wasteTypeLabel}}" },
    body: {
      hr: "Odvoz za {{wasteTypeLabel}} po\u010Dinje za 1 sat",
      en: "Waste collection for {{wasteTypeLabel}} in 1 hour",
      de: "Die Abholung f\xFCr {{wasteTypeLabel}} beginnt in 1 Stunde"
    },
    description: {
      hr: "Podsjetnik 1 sat prije odvoza plastike i metala",
      en: "Reminder 1 hour before plastic & metal waste collection",
      de: "Erinnerung 1 Stunde vor der Abholung von Plastik & Metall"
    }
  },
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: {
    title: { hr: "{{wasteTypeLabel}}", en: "{{wasteTypeLabel}}", de: "{{wasteTypeLabel}}" },
    body: {
      hr: "Odvoz za {{wasteTypeLabel}} po\u010Dinje za 1 sat",
      en: "Waste collection for {{wasteTypeLabel}} in 1 hour",
      de: "Die Abholung f\xFCr {{wasteTypeLabel}} beginnt in 1 Stunde"
    },
    description: {
      hr: "Podsjetnik 1 sat prije odvoza papira i kartona",
      en: "Reminder 1 hour before paper & cardboard waste collection",
      de: "Erinnerung 1 Stunde vor der Abholung von Papier & Karton"
    }
  },
  // ── Maintenance ────────────────────────────────────────────────────────
  [NotificationType.FAILURE_REPORT_CREATED]: {
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: {
      hr: "{{actorName}} je prijavio/la kvar: {{title}}",
      en: "{{actorName}} reported an issue: {{title}}",
      de: "{{actorName}} hat einen Schaden gemeldet: {{title}}"
    },
    description: {
      hr: "\u0160alje se upraviteljima zgrade kada je prijavljen kvar",
      en: "Sent to building managers when a failure report is created",
      de: "Wird an Geb\xE4udeverwalter gesendet, wenn ein Schaden gemeldet wird"
    }
  },
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: {
    title: {
      hr: "Status kvara promijenjen",
      en: "Issue Status Updated",
      de: "Schadensstatus ge\xE4ndert"
    },
    body: {
      hr: "Prijava \u201E{{title}}\u201D sada ima status: {{status}}",
      en: 'Issue "{{title}}" is now {{status}}',
      de: "Die Meldung \u201E{{title}}\u201C hat jetzt den Status: {{status}}"
    },
    description: {
      hr: "\u0160alje se kada se promijeni status prijave kvara",
      en: "Sent when failure report status changes",
      de: "Wird gesendet, wenn sich der Status einer Schadensmeldung \xE4ndert"
    }
  },
  [NotificationType.FAILURE_REPORT_RESOLVED]: {
    title: { hr: "Kvar rije\u0161en", en: "Issue Resolved", de: "Schaden behoben" },
    body: {
      hr: "Prijava \u201E{{title}}\u201D je rije\u0161ena",
      en: 'Issue "{{title}}" has been resolved',
      de: "Die Meldung \u201E{{title}}\u201C wurde behoben"
    },
    description: {
      hr: "\u0160alje se kada je prijava kvara ozna\u010Dena kao rije\u0161ena",
      en: "Sent when a failure report is marked as resolved",
      de: "Wird gesendet, wenn eine Schadensmeldung als behoben markiert wird"
    }
  },
  [NotificationType.FAILURE_REPORT_APPROVED]: {
    title: { hr: "Prijava kvara odobrena", en: "Report Approved", de: "Meldung genehmigt" },
    body: {
      hr: "Va\u0161a prijava kvara \u201E{{title}}\u201D je odobrena",
      en: 'Your failure report "{{title}}" has been approved',
      de: "Ihre Schadensmeldung \u201E{{title}}\u201C wurde genehmigt"
    },
    description: {
      hr: "\u0160alje se podnositelju kada je njegova prijava kvara odobrena",
      en: "Sent to the submitter when their failure report is approved",
      de: "Wird an den Einreicher gesendet, wenn seine Schadensmeldung genehmigt wird"
    }
  },
  [NotificationType.FAILURE_REPORT_DECLINED]: {
    title: { hr: "Prijava kvara odbijena", en: "Report Declined", de: "Meldung abgelehnt" },
    body: {
      hr: "Va\u0161a prijava kvara \u201E{{title}}\u201D nije odobrena",
      en: 'Your failure report "{{title}}" was not approved',
      de: "Ihre Schadensmeldung \u201E{{title}}\u201C wurde nicht genehmigt"
    },
    description: {
      hr: "\u0160alje se podnositelju kada njegova prijava kvara nije odobrena",
      en: "Sent to the submitter when their failure report is declined",
      de: "Wird an den Einreicher gesendet, wenn seine Schadensmeldung abgelehnt wird"
    }
  },
  // ── Financial ──────────────────────────────────────────────────────────
  [NotificationType.PAYMENT_DUE]: {
    title: { hr: "Dospije\u0107e pla\u0107anja", en: "Payment Due", de: "Zahlung f\xE4llig" },
    body: {
      hr: "Pla\u0107anje od {{amount}} dospijeva za zgradu {{buildingName}}",
      en: "A payment of {{amount}} is due for {{buildingName}}",
      de: "Eine Zahlung von {{amount}} ist f\xFCr {{buildingName}} f\xE4llig"
    },
    description: {
      hr: "\u0160alje se kada dospijeva pla\u0107anje",
      en: "Sent when a payment is due",
      de: "Wird gesendet, wenn eine Zahlung f\xE4llig ist"
    }
  },
  [NotificationType.PAYMENT_RECEIVED]: {
    title: { hr: "Uplata primljena", en: "Payment Received", de: "Zahlung erhalten" },
    body: {
      hr: "Uplata od {{amount}} primljena za zgradu {{buildingName}}",
      en: "Payment of {{amount}} received for {{buildingName}}",
      de: "Zahlung von {{amount}} f\xFCr {{buildingName}} erhalten"
    },
    description: {
      hr: "\u0160alje se kada je uplata primljena",
      en: "Sent when a payment is received",
      de: "Wird gesendet, wenn eine Zahlung eingeht"
    }
  },
  // ── Building / system ──────────────────────────────────────────────────
  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: {
    title: {
      hr: "Novi zahtjev za pridru\u017Eivanje",
      en: "New Join Request",
      de: "Neue Beitrittsanfrage"
    },
    body: {
      hr: "{{actorName}} se \u017Eeli pridru\u017Eiti zgradi {{buildingName}}",
      en: "{{actorName}} wants to join {{buildingName}}",
      de: "{{actorName}} m\xF6chte {{buildingName}} beitreten"
    },
    description: {
      hr: "\u0160alje se upraviteljima kada netko zatra\u017Ei pridru\u017Eivanje",
      en: "Sent to building managers when someone requests to join",
      de: "Wird an Verwalter gesendet, wenn jemand einen Beitritt anfragt"
    }
  },
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: {
    title: { hr: "Zahtjev odobren", en: "Join Request Approved", de: "Anfrage genehmigt" },
    body: {
      hr: "Va\u0161 zahtjev za pridru\u017Eivanje zgradi {{buildingName}} je odobren",
      en: "Your request to join {{buildingName}} has been approved",
      de: "Ihre Anfrage zum Beitritt zu {{buildingName}} wurde genehmigt"
    },
    description: {
      hr: "\u0160alje se korisniku kada je njegov zahtjev odobren",
      en: "Sent to user when their join request is approved",
      de: "Wird gesendet, wenn die Beitrittsanfrage genehmigt wird"
    }
  },
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: {
    title: { hr: "Zahtjev odbijen", en: "Join Request Rejected", de: "Anfrage abgelehnt" },
    body: {
      hr: "Va\u0161 zahtjev za pridru\u017Eivanje zgradi {{buildingName}} nije odobren",
      en: "Your request to join {{buildingName}} was not approved",
      de: "Ihre Anfrage zum Beitritt zu {{buildingName}} wurde nicht genehmigt"
    },
    description: {
      hr: "\u0160alje se korisniku kada njegov zahtjev nije odobren",
      en: "Sent to user when their join request is rejected",
      de: "Wird gesendet, wenn die Beitrittsanfrage abgelehnt wird"
    }
  },
  [NotificationType.BUILDING_MEMBER_JOINED]: {
    title: { hr: "Novi \u010Dlan", en: "New Member", de: "Neues Mitglied" },
    body: {
      hr: "{{actorName}} se pridru\u017Eio/la zgradi {{buildingName}}",
      en: "{{actorName}} joined {{buildingName}}",
      de: "{{actorName}} ist {{buildingName}} beigetreten"
    },
    description: {
      hr: "\u0160alje se upraviteljima kada se netko pridru\u017Ei zgradi",
      en: "Sent to building managers when someone joins",
      de: "Wird an Verwalter gesendet, wenn jemand dem Geb\xE4ude beitritt"
    }
  },
  [NotificationType.BUILDING_ROLE_CHANGED]: {
    title: {
      hr: "Va\u0161a uloga je promijenjena",
      en: "Your Role Changed",
      de: "Ihre Rolle wurde ge\xE4ndert"
    },
    body: {
      hr: "Va\u0161a uloga u zgradi {{buildingName}} je promijenjena u: {{role}}",
      en: "Your role in {{buildingName}} has been updated to {{role}}",
      de: "Ihre Rolle in {{buildingName}} wurde ge\xE4ndert zu: {{role}}"
    },
    description: {
      hr: "\u0160alje se kada je korisniku promijenjena uloga",
      en: "Sent when user role is changed",
      de: "Wird gesendet, wenn sich die Rolle eines Nutzers \xE4ndert"
    }
  },
  [NotificationType.OWNER_RECORD_LINKED]: {
    title: {
      hr: "Povezani ste kao suvlasnik",
      en: "Linked as an Owner",
      de: "Als Eigent\xFCmer verkn\xFCpft"
    },
    body: {
      hr: "Va\u0161 ra\u010Dun je povezan s vlasni\u010Dkim zapisom u zgradi {{buildingName}}. Ako ovo niste o\u010Dekivali, obratite se predstavniku zgrade.",
      en: "Your account was linked to an ownership record in {{buildingName}}. If you did not expect this, contact the building representative.",
      de: "Ihr Konto wurde mit einem Eigentumseintrag im Geb\xE4ude {{buildingName}} verkn\xFCpft. Falls Sie dies nicht erwartet haben, wenden Sie sich an den Geb\xE4udevertreter."
    },
    description: {
      hr: "\u0160alje se korisniku kada je njegov ra\u010Dun povezan s vlasni\u010Dkim zapisom",
      en: "Sent to a user when their account is linked to an ownership record",
      de: "Wird gesendet, wenn ein Konto mit einem Eigentumseintrag verkn\xFCpft wird"
    }
  },
  [NotificationType.BUILDING_PENDING_APPROVAL]: {
    title: {
      hr: "Nova zgrada \u010Deka odobrenje",
      en: "New Building Pending Approval",
      de: "Neues Geb\xE4ude wartet auf Genehmigung"
    },
    body: {
      hr: "{{actorName}} je poslao/la zgradu \u201E{{buildingName}}\u201D na odobrenje",
      en: '{{actorName}} submitted "{{buildingName}}" for approval',
      de: "{{actorName}} hat \u201E{{buildingName}}\u201C zur Genehmigung eingereicht"
    },
    description: {
      hr: "\u0160alje se administratorima kada nova zgrada \u010Deka odobrenje",
      en: "Sent to admins when a user creates a building that needs approval",
      de: "Wird an Admins gesendet, wenn ein neues Geb\xE4ude auf Genehmigung wartet"
    }
  },
  [NotificationType.BUILDING_APPROVED]: {
    title: { hr: "Zgrada odobrena", en: "Building Approved", de: "Geb\xE4ude genehmigt" },
    body: {
      hr: "Va\u0161a zgrada \u201E{{buildingName}}\u201D je odobrena",
      en: 'Your building "{{buildingName}}" has been approved',
      de: "Ihr Geb\xE4ude \u201E{{buildingName}}\u201C wurde genehmigt"
    },
    description: {
      hr: "\u0160alje se kreatoru kada je njegova zgrada odobrena",
      en: "Sent to the building creator when their building is approved",
      de: "Wird an den Ersteller gesendet, wenn sein Geb\xE4ude genehmigt wird"
    }
  },
  [NotificationType.BUILDING_REJECTED]: {
    title: { hr: "Zgrada odbijena", en: "Building Rejected", de: "Geb\xE4ude abgelehnt" },
    body: {
      hr: "Va\u0161a zgrada \u201E{{buildingName}}\u201D nije odobrena: {{rejectionReason}}",
      en: 'Your building "{{buildingName}}" was not approved: {{rejectionReason}}',
      de: "Ihr Geb\xE4ude \u201E{{buildingName}}\u201C wurde nicht genehmigt: {{rejectionReason}}"
    },
    description: {
      hr: "\u0160alje se kreatoru kada njegova zgrada nije odobrena",
      en: "Sent to the building creator when their building is rejected",
      de: "Wird an den Ersteller gesendet, wenn sein Geb\xE4ude abgelehnt wird"
    }
  },
  // ── Chat ───────────────────────────────────────────────────────────────
  [NotificationType.CHAT_MESSAGE]: {
    // User content — identical in every locale by design.
    title: { hr: "{{senderName}}", en: "{{senderName}}", de: "{{senderName}}" },
    body: { hr: "{{messagePreview}}", en: "{{messagePreview}}", de: "{{messagePreview}}" },
    description: {
      hr: "\u0160alje se kada primite novu poruku u razgovoru",
      en: "Sent when a new chat message is received",
      de: "Wird gesendet, wenn eine neue Chat-Nachricht eingeht"
    }
  },
  // ── Building mailbox (Korisnički pretinac; rep/deputy audience) ────────
  [NotificationType.EMAIL_RECEIVED]: {
    title: {
      hr: "Nova poruka u korisni\u010Dkom pretincu",
      en: "New message in the inbox",
      de: "Neue Nachricht im Postfach"
    },
    body: {
      hr: "{{fromAddress}}: {{subject}}",
      en: "{{fromAddress}}: {{subject}}",
      de: "{{fromAddress}}: {{subject}}"
    },
    description: {
      hr: "\u0160alje se predstavnicima kada u pretinac zgrade stigne nova e-poruka",
      en: "Sent to representatives when the building inbox receives a new email",
      de: "Wird an Vertreter gesendet, wenn im Geb\xE4ude-Postfach eine neue E-Mail eingeht"
    }
  },
  // ── Organization membership (fired at the affected member only) ────────
  [NotificationType.ORG_MEMBER_ADDED]: {
    title: {
      hr: "Dodani ste u organizaciju",
      en: "Added to an Organization",
      de: "Zu einer Organisation hinzugef\xFCgt"
    },
    body: {
      hr: "Dodani ste u organizaciju {{orgName}} s ulogom: {{orgRole}}",
      en: "You were added to {{orgName}} with the role {{orgRole}}",
      de: "Sie wurden zu {{orgName}} mit der Rolle {{orgRole}} hinzugef\xFCgt"
    },
    description: {
      hr: "\u0160alje se korisniku kada postane \u010Dlan organizacije",
      en: "Sent to a user when they become an organization member",
      de: "Wird gesendet, wenn ein Nutzer Mitglied einer Organisation wird"
    }
  },
  [NotificationType.ORG_MEMBER_REMOVED]: {
    title: {
      hr: "Uklonjeni ste iz organizacije",
      en: "Removed from an Organization",
      de: "Aus einer Organisation entfernt"
    },
    body: {
      hr: "Uklonjeni ste iz organizacije {{orgName}}",
      en: "You were removed from {{orgName}}",
      de: "Sie wurden aus {{orgName}} entfernt"
    },
    description: {
      hr: "\u0160alje se korisniku kada je uklonjen iz organizacije",
      en: "Sent to a user when they are removed from an organization",
      de: "Wird gesendet, wenn ein Nutzer aus einer Organisation entfernt wird"
    }
  },
  [NotificationType.ORG_MEMBER_ROLE_CHANGED]: {
    title: {
      hr: "Va\u0161a uloga u organizaciji je promijenjena",
      en: "Your Organization Role Changed",
      de: "Ihre Organisationsrolle wurde ge\xE4ndert"
    },
    body: {
      hr: "Va\u0161a uloga u organizaciji {{orgName}} je promijenjena u: {{orgRole}}",
      en: "Your role in {{orgName}} has been updated to {{orgRole}}",
      de: "Ihre Rolle in {{orgName}} wurde ge\xE4ndert zu: {{orgRole}}"
    },
    description: {
      hr: "\u0160alje se \u010Dlanu kada mu je promijenjena uloga u organizaciji",
      en: "Sent to a member when their organization role changes",
      de: "Wird gesendet, wenn sich die Organisationsrolle eines Mitglieds \xE4ndert"
    }
  },
  // ── System ─────────────────────────────────────────────────────────────
  [NotificationType.SYSTEM_ANNOUNCEMENT]: {
    // Announcement content is authored, not templated — identical everywhere.
    title: { hr: "{{title}}", en: "{{title}}", de: "{{title}}" },
    body: { hr: "{{body}}", en: "{{body}}", de: "{{body}}" },
    description: {
      hr: "Obavijesti na razini cijele platforme",
      en: "System-wide announcements",
      de: "Plattformweite Ank\xFCndigungen"
    }
  }
};
var ACTOR_FALLBACK = {
  hr: "Netko",
  en: "Someone",
  de: "Jemand"
};

// src/notifications/render.ts
function formatNotificationDate(value, locale) {
  const date = value instanceof Date ? value : typeof value === "string" ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat(getDateLocale(locale), {
    timeZone: "Europe/Zagreb",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
var DATE_VARS = ["startDate", "endDate", "deadline"];
function buildLocalizedVars(locale, rawVars) {
  const vars = { ...rawVars };
  if (typeof vars.subtype === "string" && vars.subtype) {
    vars.wasteTypeLabel = getWasteSubtypeLabel(locale, vars.subtype);
  }
  if (typeof vars.status === "string" && vars.status) {
    vars.status = getStatusLabel(locale, vars.status);
  }
  if (typeof vars.role === "string" && vars.role) {
    vars.role = getRoleLabel(locale, vars.role);
  }
  for (const key of DATE_VARS) {
    if (vars[key] !== void 0 && vars[key] !== null) {
      vars[key] = formatNotificationDate(vars[key], locale);
    }
  }
  if (typeof vars.actorName !== "string" || vars.actorName.trim() === "") {
    vars.actorName = ACTOR_FALLBACK[locale];
  }
  return vars;
}
var TEMPLATE_VAR_RE = /\{\{(\w+)\}\}/g;
function renderTemplate(template, variables) {
  return template.replace(
    TEMPLATE_VAR_RE,
    (match, key) => variables[key] !== void 0 ? String(variables[key]) : match
  );
}
function renderNotificationText(type, locale, rawVars, options) {
  const template = NOTIFICATION_TEMPLATES[type];
  const vars = buildLocalizedVars(locale, rawVars);
  const title = renderTemplate(template.title[locale], vars);
  const body = renderTemplate(template.body[locale], vars);
  const leftover = `${title} ${body}`.match(TEMPLATE_VAR_RE) ?? [];
  const unresolvedVars = [...new Set(leftover)];
  if (unresolvedVars.length > 0) {
    options?.onUnresolvedVars?.(unresolvedVars);
  }
  return { title, body, unresolvedVars };
}
function getLocalizedTypeDescription(type, locale) {
  return NOTIFICATION_TEMPLATES[type].description[locale];
}

export { ACTOR_FALLBACK, DEFAULT_LOCALE, NOTIFICATION_TEMPLATES, SUPPORTED_LOCALES, buildLocalizedVars, formatNotificationDate, getDateLocale, getEventTypeLabel, getLocalizedTypeDescription, getPollTypeLabel, getRoleLabel, getStatusLabel, getWasteSubtypeLabel, renderNotificationText, renderTemplate, resolveLocale };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map