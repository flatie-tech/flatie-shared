import { NotificationType } from '../enums';
import type { NotificationLocale as Locale } from './labels';

/**
 * Render templates for every notification type in all supported locales.
 * Lifted verbatim from flatie-backend's notification-i18n.ts so backend
 * (emit-time render), web and mobile (display-time re-render) share ONE
 * dictionary. `{{var}}` placeholders must be identical across the three
 * locales of a type — tests/notifications enforces parity.
 */
interface LocalizedNotificationTemplate {
  title: Record<Locale, string>;
  body: Record<Locale, string>;
  description: Record<Locale, string>;
}

export const NOTIFICATION_TEMPLATES: Record<NotificationType, LocalizedNotificationTemplate> = {
  // ── Notices ────────────────────────────────────────────────────────────
  [NotificationType.NOTICE_CREATED]: {
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: {
      hr: '{{actorName}} je objavio/la novu obavijest u zgradi {{buildingName}}',
      en: '{{actorName}} posted a new notice in {{buildingName}}',
      de: '{{actorName}} hat eine neue Mitteilung in {{buildingName}} veröffentlicht',
    },
    description: {
      hr: 'Šalje se kada je u zgradi objavljena nova obavijest',
      en: 'Sent when a new notice is created in a building',
      de: 'Wird gesendet, wenn eine neue Mitteilung im Gebäude erstellt wird',
    },
  },
  [NotificationType.NOTICE_APPROVED]: {
    title: { hr: 'Obavijest odobrena', en: 'Notice Approved', de: 'Mitteilung genehmigt' },
    body: {
      hr: 'Vaša obavijest „{{title}}” je odobrena',
      en: 'Your notice "{{title}}" has been approved',
      de: 'Ihre Mitteilung „{{title}}“ wurde genehmigt',
    },
    description: {
      hr: 'Šalje se autoru kada je njegova obavijest odobrena',
      en: 'Sent to the notice creator when their notice is approved',
      de: 'Wird an den Autor gesendet, wenn seine Mitteilung genehmigt wird',
    },
  },
  [NotificationType.NOTICE_REJECTED]: {
    title: { hr: 'Obavijest odbijena', en: 'Notice Rejected', de: 'Mitteilung abgelehnt' },
    body: {
      hr: 'Vaša obavijest „{{title}}” nije odobrena',
      en: 'Your notice "{{title}}" was not approved',
      de: 'Ihre Mitteilung „{{title}}“ wurde nicht genehmigt',
    },
    description: {
      hr: 'Šalje se autoru kada njegova obavijest nije odobrena',
      en: 'Sent to the notice creator when their notice is rejected',
      de: 'Wird an den Autor gesendet, wenn seine Mitteilung abgelehnt wird',
    },
  },

  // ── Polls ──────────────────────────────────────────────────────────────
  [NotificationType.POLL_CREATED]: {
    title: { hr: '{{question}}', en: '{{question}}', de: '{{question}}' },
    body: {
      hr: '{{actorName}} je kreirao/la novu anketu u zgradi {{buildingName}}',
      en: '{{actorName}} created a new poll in {{buildingName}}',
      de: '{{actorName}} hat eine neue Umfrage in {{buildingName}} erstellt',
    },
    description: {
      hr: 'Šalje se kada je kreirana nova anketa',
      en: 'Sent when a new poll is created',
      de: 'Wird gesendet, wenn eine neue Umfrage erstellt wird',
    },
  },
  [NotificationType.POLL_DEADLINE_24H]: {
    title: { hr: 'Anketa uskoro završava', en: 'Poll Ending Soon', de: 'Umfrage endet bald' },
    body: {
      hr: 'Anketa „{{question}}” završava za 24 sata. Glasajte!',
      en: 'Poll "{{question}}" ends in 24 hours. Cast your vote!',
      de: 'Die Umfrage „{{question}}“ endet in 24 Stunden. Stimmen Sie ab!',
    },
    description: {
      hr: 'Podsjetnik 24 sata prije isteka roka za glasanje',
      en: 'Reminder sent 24 hours before poll deadline',
      de: 'Erinnerung 24 Stunden vor Ablauf der Abstimmungsfrist',
    },
  },
  [NotificationType.POLL_DEADLINE_1H]: {
    title: {
      hr: 'Posljednja prilika za glasanje',
      en: 'Last Chance to Vote',
      de: 'Letzte Chance zum Abstimmen',
    },
    body: {
      hr: 'Anketa „{{question}}” završava za 1 sat!',
      en: 'Poll "{{question}}" ends in 1 hour!',
      de: 'Die Umfrage „{{question}}“ endet in 1 Stunde!',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije isteka roka za glasanje',
      en: 'Reminder sent 1 hour before poll deadline',
      de: 'Erinnerung 1 Stunde vor Ablauf der Abstimmungsfrist',
    },
  },
  [NotificationType.POLL_FINALIZED]: {
    title: {
      hr: 'Rezultati ankete dostupni',
      en: 'Poll Results Available',
      de: 'Umfrageergebnisse verfügbar',
    },
    body: {
      hr: 'Rezultati ankete „{{question}}” su sada dostupni',
      en: 'Results for "{{question}}" are now available',
      de: 'Die Ergebnisse der Umfrage „{{question}}“ sind jetzt verfügbar',
    },
    description: {
      hr: 'Šalje se kada su rezultati ankete finalizirani',
      en: 'Sent when poll results are finalized',
      de: 'Wird gesendet, wenn die Umfrageergebnisse feststehen',
    },
  },
  [NotificationType.POLL_VOTE_SIGNATURE_PENDING]: {
    title: {
      hr: 'Potpisani glas čeka pregled',
      en: 'Signed vote awaiting review',
      de: 'Unterschriebene Stimme wartet auf Prüfung',
    },
    body: {
      hr: '{{actorName}} je priložio/la potpisani glasački listić za „{{question}}”',
      en: '{{actorName}} uploaded a signed ballot for "{{question}}"',
      de: '{{actorName}} hat einen unterschriebenen Stimmzettel für „{{question}}“ hochgeladen',
    },
    description: {
      hr: 'Šalje se predstavnicima kada suvlasnik priloži potpisani glasački listić',
      en: 'Sent to representatives when a co-owner uploads a signed ballot',
      de: 'Wird an Vertreter gesendet, wenn ein Miteigentümer einen unterschriebenen Stimmzettel hochlädt',
    },
  },
  [NotificationType.POLL_VOTE_SIGNATURE_APPROVED]: {
    title: {
      hr: 'Potpisani glas odobren',
      en: 'Signed vote approved',
      de: 'Unterschriebene Stimme genehmigt',
    },
    body: {
      hr: 'Vaš potpisani glas za „{{question}}” je odobren',
      en: 'Your signed vote for "{{question}}" was approved',
      de: 'Ihre unterschriebene Stimme für „{{question}}“ wurde genehmigt',
    },
    description: {
      hr: 'Šalje se glasaču kada predstavnik odobri njegov potpisani listić',
      en: 'Sent to the voter when a representative approves their signed ballot',
      de: 'Wird an den Wähler gesendet, wenn ein Vertreter seinen Stimmzettel genehmigt',
    },
  },
  [NotificationType.POLL_VOTE_SIGNATURE_REJECTED]: {
    title: {
      hr: 'Potpisani glas odbijen',
      en: 'Signed vote rejected',
      de: 'Unterschriebene Stimme abgelehnt',
    },
    body: {
      hr: 'Vaš potpisani glas za „{{question}}” je odbijen: {{reason}}',
      en: 'Your signed vote for "{{question}}" was rejected: {{reason}}',
      de: 'Ihre unterschriebene Stimme für „{{question}}“ wurde abgelehnt: {{reason}}',
    },
    description: {
      hr: 'Šalje se glasaču kada predstavnik odbije njegov potpisani listić',
      en: 'Sent to the voter when a representative rejects their signed ballot',
      de: 'Wird an den Wähler gesendet, wenn ein Vertreter seinen Stimmzettel ablehnt',
    },
  },

  // ── Events ─────────────────────────────────────────────────────────────
  [NotificationType.EVENT_CREATED]: {
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: {
      hr: '{{actorName}} je zakazao/la „{{title}}” za {{startDate}}',
      en: '{{actorName}} scheduled "{{title}}" for {{startDate}}',
      de: '{{actorName}} hat „{{title}}“ für {{startDate}} geplant',
    },
    description: {
      hr: 'Šalje se kada je kreiran novi događaj',
      en: 'Sent when a new event is created',
      de: 'Wird gesendet, wenn ein neues Ereignis erstellt wird',
    },
  },
  [NotificationType.EVENT_REMINDER_24H]: {
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: {
      hr: '„{{title}}” počinje sutra u {{startTime}}',
      en: '"{{title}}" is happening tomorrow at {{startTime}}',
      de: '„{{title}}“ findet morgen um {{startTime}} statt',
    },
    description: {
      hr: 'Podsjetnik 24 sata prije događaja',
      en: 'Reminder sent 24 hours before event',
      de: 'Erinnerung 24 Stunden vor dem Ereignis',
    },
  },
  [NotificationType.EVENT_REMINDER_1H]: {
    title: {
      hr: 'Događaj uskoro počinje',
      en: 'Event Starting Soon',
      de: 'Ereignis beginnt bald',
    },
    body: {
      hr: '„{{title}}” počinje za 1 sat',
      en: '"{{title}}" starts in 1 hour',
      de: '„{{title}}“ beginnt in 1 Stunde',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije događaja',
      en: 'Reminder sent 1 hour before event',
      de: 'Erinnerung 1 Stunde vor dem Ereignis',
    },
  },
  [NotificationType.EVENT_UPDATED]: {
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: {
      hr: 'Detalji događaja „{{title}}” su ažurirani',
      en: 'Details for "{{title}}" have been updated',
      de: 'Die Details von „{{title}}“ wurden aktualisiert',
    },
    description: {
      hr: 'Šalje se kada su detalji događaja promijenjeni',
      en: 'Sent when event details are changed',
      de: 'Wird gesendet, wenn Ereignisdetails geändert werden',
    },
  },
  [NotificationType.EVENT_CANCELLED]: {
    title: { hr: 'Događaj otkazan', en: 'Event Cancelled', de: 'Ereignis abgesagt' },
    body: {
      hr: '„{{title}}” zakazan za {{startDate}} je otkazan',
      en: '"{{title}}" scheduled for {{startDate}} has been cancelled',
      de: '„{{title}}“ geplant für {{startDate}} wurde abgesagt',
    },
    description: {
      hr: 'Šalje se kada je događaj otkazan',
      en: 'Sent when an event is cancelled',
      de: 'Wird gesendet, wenn ein Ereignis abgesagt wird',
    },
  },

  // ── Waste collection reminders ─────────────────────────────────────────
  [NotificationType.WASTE_REMINDER_MIXED]: {
    title: { hr: '{{wasteTypeLabel}}', en: '{{wasteTypeLabel}}', de: '{{wasteTypeLabel}}' },
    body: {
      hr: 'Odvoz za {{wasteTypeLabel}} počinje za 1 sat',
      en: 'Waste collection for {{wasteTypeLabel}} in 1 hour',
      de: 'Die Abholung für {{wasteTypeLabel}} beginnt in 1 Stunde',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije odvoza miješanog otpada',
      en: 'Reminder 1 hour before mixed waste collection',
      de: 'Erinnerung 1 Stunde vor der Restmüllabholung',
    },
  },
  [NotificationType.WASTE_REMINDER_BIO]: {
    title: { hr: '{{wasteTypeLabel}}', en: '{{wasteTypeLabel}}', de: '{{wasteTypeLabel}}' },
    body: {
      hr: 'Odvoz za {{wasteTypeLabel}} počinje za 1 sat',
      en: 'Waste collection for {{wasteTypeLabel}} in 1 hour',
      de: 'Die Abholung für {{wasteTypeLabel}} beginnt in 1 Stunde',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije odvoza biootpada',
      en: 'Reminder 1 hour before bio waste collection',
      de: 'Erinnerung 1 Stunde vor der Bioabfallabholung',
    },
  },
  [NotificationType.WASTE_REMINDER_PLASTIC_METAL]: {
    title: { hr: '{{wasteTypeLabel}}', en: '{{wasteTypeLabel}}', de: '{{wasteTypeLabel}}' },
    body: {
      hr: 'Odvoz za {{wasteTypeLabel}} počinje za 1 sat',
      en: 'Waste collection for {{wasteTypeLabel}} in 1 hour',
      de: 'Die Abholung für {{wasteTypeLabel}} beginnt in 1 Stunde',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije odvoza plastike i metala',
      en: 'Reminder 1 hour before plastic & metal waste collection',
      de: 'Erinnerung 1 Stunde vor der Abholung von Plastik & Metall',
    },
  },
  [NotificationType.WASTE_REMINDER_PAPER_CARDBOARD]: {
    title: { hr: '{{wasteTypeLabel}}', en: '{{wasteTypeLabel}}', de: '{{wasteTypeLabel}}' },
    body: {
      hr: 'Odvoz za {{wasteTypeLabel}} počinje za 1 sat',
      en: 'Waste collection for {{wasteTypeLabel}} in 1 hour',
      de: 'Die Abholung für {{wasteTypeLabel}} beginnt in 1 Stunde',
    },
    description: {
      hr: 'Podsjetnik 1 sat prije odvoza papira i kartona',
      en: 'Reminder 1 hour before paper & cardboard waste collection',
      de: 'Erinnerung 1 Stunde vor der Abholung von Papier & Karton',
    },
  },

  // ── Maintenance ────────────────────────────────────────────────────────
  [NotificationType.FAILURE_REPORT_CREATED]: {
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: {
      hr: '{{actorName}} je prijavio/la kvar: {{title}}',
      en: '{{actorName}} reported an issue: {{title}}',
      de: '{{actorName}} hat einen Schaden gemeldet: {{title}}',
    },
    description: {
      hr: 'Šalje se upraviteljima zgrade kada je prijavljen kvar',
      en: 'Sent to building managers when a failure report is created',
      de: 'Wird an Gebäudeverwalter gesendet, wenn ein Schaden gemeldet wird',
    },
  },
  [NotificationType.FAILURE_REPORT_STATUS_CHANGED]: {
    title: {
      hr: 'Status kvara promijenjen',
      en: 'Issue Status Updated',
      de: 'Schadensstatus geändert',
    },
    body: {
      hr: 'Prijava „{{title}}” sada ima status: {{status}}',
      en: 'Issue "{{title}}" is now {{status}}',
      de: 'Die Meldung „{{title}}“ hat jetzt den Status: {{status}}',
    },
    description: {
      hr: 'Šalje se kada se promijeni status prijave kvara',
      en: 'Sent when failure report status changes',
      de: 'Wird gesendet, wenn sich der Status einer Schadensmeldung ändert',
    },
  },
  [NotificationType.FAILURE_REPORT_RESOLVED]: {
    title: { hr: 'Kvar riješen', en: 'Issue Resolved', de: 'Schaden behoben' },
    body: {
      hr: 'Prijava „{{title}}” je riješena',
      en: 'Issue "{{title}}" has been resolved',
      de: 'Die Meldung „{{title}}“ wurde behoben',
    },
    description: {
      hr: 'Šalje se kada je prijava kvara označena kao riješena',
      en: 'Sent when a failure report is marked as resolved',
      de: 'Wird gesendet, wenn eine Schadensmeldung als behoben markiert wird',
    },
  },
  [NotificationType.FAILURE_REPORT_APPROVED]: {
    title: { hr: 'Prijava kvara odobrena', en: 'Report Approved', de: 'Meldung genehmigt' },
    body: {
      hr: 'Vaša prijava kvara „{{title}}” je odobrena',
      en: 'Your failure report "{{title}}" has been approved',
      de: 'Ihre Schadensmeldung „{{title}}“ wurde genehmigt',
    },
    description: {
      hr: 'Šalje se podnositelju kada je njegova prijava kvara odobrena',
      en: 'Sent to the submitter when their failure report is approved',
      de: 'Wird an den Einreicher gesendet, wenn seine Schadensmeldung genehmigt wird',
    },
  },
  [NotificationType.FAILURE_REPORT_DECLINED]: {
    title: { hr: 'Prijava kvara odbijena', en: 'Report Declined', de: 'Meldung abgelehnt' },
    body: {
      hr: 'Vaša prijava kvara „{{title}}” nije odobrena',
      en: 'Your failure report "{{title}}" was not approved',
      de: 'Ihre Schadensmeldung „{{title}}“ wurde nicht genehmigt',
    },
    description: {
      hr: 'Šalje se podnositelju kada njegova prijava kvara nije odobrena',
      en: 'Sent to the submitter when their failure report is declined',
      de: 'Wird an den Einreicher gesendet, wenn seine Schadensmeldung abgelehnt wird',
    },
  },
  // ── Financial ──────────────────────────────────────────────────────────
  [NotificationType.PAYMENT_DUE]: {
    title: { hr: 'Dospijeće plaćanja', en: 'Payment Due', de: 'Zahlung fällig' },
    body: {
      hr: 'Plaćanje od {{amount}} dospijeva za zgradu {{buildingName}}',
      en: 'A payment of {{amount}} is due for {{buildingName}}',
      de: 'Eine Zahlung von {{amount}} ist für {{buildingName}} fällig',
    },
    description: {
      hr: 'Šalje se kada dospijeva plaćanje',
      en: 'Sent when a payment is due',
      de: 'Wird gesendet, wenn eine Zahlung fällig ist',
    },
  },
  [NotificationType.DUNNING_NOTICE_ISSUED]: {
    title: {
      hr: 'Opomena za pričuvu',
      en: 'Reserve-fund reminder issued',
      de: 'Mahnung für die Rücklage',
    },
    body: {
      hr: 'Za zgradu {{buildingName}} izdana vam je {{levelLabel}} na iznos od {{amount}}. Rok za uplatu: {{deadline}}.',
      en: 'A {{levelLabel}} for {{amount}} was issued to you for {{buildingName}}. Payment deadline: {{deadline}}.',
      de: 'Für {{buildingName}} wurde Ihnen eine {{levelLabel}} über {{amount}} ausgestellt. Zahlungsfrist: {{deadline}}.',
    },
    description: {
      hr: 'Šalje se suvlasniku kada mu upravitelj ili predstavnik izda opomenu za dospjelu pričuvu',
      en: 'Sent to a co-owner when the manager or representative issues a reserve-fund arrears notice',
      de: 'Wird an einen Miteigentümer gesendet, wenn der Verwalter eine Mahnung wegen Rücklagenrückstand ausstellt',
    },
  },
  [NotificationType.PAYMENT_RECEIVED]: {
    title: { hr: 'Uplata primljena', en: 'Payment Received', de: 'Zahlung erhalten' },
    body: {
      hr: 'Uplata od {{amount}} primljena za zgradu {{buildingName}}',
      en: 'Payment of {{amount}} received for {{buildingName}}',
      de: 'Zahlung von {{amount}} für {{buildingName}} erhalten',
    },
    description: {
      hr: 'Šalje se kada je uplata primljena',
      en: 'Sent when a payment is received',
      de: 'Wird gesendet, wenn eine Zahlung eingeht',
    },
  },

  // ── Building / system ──────────────────────────────────────────────────
  [NotificationType.BUILDING_JOIN_REQUEST_RECEIVED]: {
    title: {
      hr: 'Novi zahtjev za pridruživanje',
      en: 'New Join Request',
      de: 'Neue Beitrittsanfrage',
    },
    body: {
      hr: '{{actorName}} se želi pridružiti zgradi {{buildingName}}',
      en: '{{actorName}} wants to join {{buildingName}}',
      de: '{{actorName}} möchte {{buildingName}} beitreten',
    },
    description: {
      hr: 'Šalje se upraviteljima kada netko zatraži pridruživanje',
      en: 'Sent to building managers when someone requests to join',
      de: 'Wird an Verwalter gesendet, wenn jemand einen Beitritt anfragt',
    },
  },
  [NotificationType.BUILDING_JOIN_REQUEST_APPROVED]: {
    title: { hr: 'Zahtjev odobren', en: 'Join Request Approved', de: 'Anfrage genehmigt' },
    body: {
      hr: 'Vaš zahtjev za pridruživanje zgradi {{buildingName}} je odobren',
      en: 'Your request to join {{buildingName}} has been approved',
      de: 'Ihre Anfrage zum Beitritt zu {{buildingName}} wurde genehmigt',
    },
    description: {
      hr: 'Šalje se korisniku kada je njegov zahtjev odobren',
      en: 'Sent to user when their join request is approved',
      de: 'Wird gesendet, wenn die Beitrittsanfrage genehmigt wird',
    },
  },
  [NotificationType.BUILDING_JOIN_REQUEST_REJECTED]: {
    title: { hr: 'Zahtjev odbijen', en: 'Join Request Rejected', de: 'Anfrage abgelehnt' },
    body: {
      hr: 'Vaš zahtjev za pridruživanje zgradi {{buildingName}} nije odobren',
      en: 'Your request to join {{buildingName}} was not approved',
      de: 'Ihre Anfrage zum Beitritt zu {{buildingName}} wurde nicht genehmigt',
    },
    description: {
      hr: 'Šalje se korisniku kada njegov zahtjev nije odobren',
      en: 'Sent to user when their join request is rejected',
      de: 'Wird gesendet, wenn die Beitrittsanfrage abgelehnt wird',
    },
  },
  [NotificationType.BUILDING_MEMBER_JOINED]: {
    title: { hr: 'Novi član', en: 'New Member', de: 'Neues Mitglied' },
    body: {
      hr: '{{actorName}} se pridružio/la zgradi {{buildingName}}',
      en: '{{actorName}} joined {{buildingName}}',
      de: '{{actorName}} ist {{buildingName}} beigetreten',
    },
    description: {
      hr: 'Šalje se upraviteljima kada se netko pridruži zgradi',
      en: 'Sent to building managers when someone joins',
      de: 'Wird an Verwalter gesendet, wenn jemand dem Gebäude beitritt',
    },
  },
  [NotificationType.BUILDING_ROLE_CHANGED]: {
    title: {
      hr: 'Vaša uloga je promijenjena',
      en: 'Your Role Changed',
      de: 'Ihre Rolle wurde geändert',
    },
    body: {
      hr: 'Vaša uloga u zgradi {{buildingName}} je promijenjena u: {{role}}',
      en: 'Your role in {{buildingName}} has been updated to {{role}}',
      de: 'Ihre Rolle in {{buildingName}} wurde geändert zu: {{role}}',
    },
    description: {
      hr: 'Šalje se kada je korisniku promijenjena uloga',
      en: 'Sent when user role is changed',
      de: 'Wird gesendet, wenn sich die Rolle eines Nutzers ändert',
    },
  },
  [NotificationType.OWNER_RECORD_LINKED]: {
    title: {
      hr: 'Povezani ste kao suvlasnik',
      en: 'Linked as an Owner',
      de: 'Als Eigentümer verknüpft',
    },
    body: {
      hr: 'Vaš račun je povezan s vlasničkim zapisom u zgradi {{buildingName}}. Ako ovo niste očekivali, obratite se predstavniku zgrade.',
      en: 'Your account was linked to an ownership record in {{buildingName}}. If you did not expect this, contact the building representative.',
      de: 'Ihr Konto wurde mit einem Eigentumseintrag im Gebäude {{buildingName}} verknüpft. Falls Sie dies nicht erwartet haben, wenden Sie sich an den Gebäudevertreter.',
    },
    description: {
      hr: 'Šalje se korisniku kada je njegov račun povezan s vlasničkim zapisom',
      en: 'Sent to a user when their account is linked to an ownership record',
      de: 'Wird gesendet, wenn ein Konto mit einem Eigentumseintrag verknüpft wird',
    },
  },
  [NotificationType.BUILDING_PENDING_APPROVAL]: {
    title: {
      hr: 'Nova zgrada čeka odobrenje',
      en: 'New Building Pending Approval',
      de: 'Neues Gebäude wartet auf Genehmigung',
    },
    body: {
      hr: '{{actorName}} je poslao/la zgradu „{{buildingName}}” na odobrenje',
      en: '{{actorName}} submitted "{{buildingName}}" for approval',
      de: '{{actorName}} hat „{{buildingName}}“ zur Genehmigung eingereicht',
    },
    description: {
      hr: 'Šalje se administratorima kada nova zgrada čeka odobrenje',
      en: 'Sent to admins when a user creates a building that needs approval',
      de: 'Wird an Admins gesendet, wenn ein neues Gebäude auf Genehmigung wartet',
    },
  },
  [NotificationType.BUILDING_APPROVED]: {
    title: { hr: 'Zgrada odobrena', en: 'Building Approved', de: 'Gebäude genehmigt' },
    body: {
      hr: 'Vaša zgrada „{{buildingName}}” je odobrena',
      en: 'Your building "{{buildingName}}" has been approved',
      de: 'Ihr Gebäude „{{buildingName}}“ wurde genehmigt',
    },
    description: {
      hr: 'Šalje se kreatoru kada je njegova zgrada odobrena',
      en: 'Sent to the building creator when their building is approved',
      de: 'Wird an den Ersteller gesendet, wenn sein Gebäude genehmigt wird',
    },
  },
  [NotificationType.BUILDING_REJECTED]: {
    title: { hr: 'Zgrada odbijena', en: 'Building Rejected', de: 'Gebäude abgelehnt' },
    body: {
      hr: 'Vaša zgrada „{{buildingName}}” nije odobrena: {{rejectionReason}}',
      en: 'Your building "{{buildingName}}" was not approved: {{rejectionReason}}',
      de: 'Ihr Gebäude „{{buildingName}}“ wurde nicht genehmigt: {{rejectionReason}}',
    },
    description: {
      hr: 'Šalje se kreatoru kada njegova zgrada nije odobrena',
      en: 'Sent to the building creator when their building is rejected',
      de: 'Wird an den Ersteller gesendet, wenn sein Gebäude abgelehnt wird',
    },
  },

  // ── Chat ───────────────────────────────────────────────────────────────
  [NotificationType.CHAT_MESSAGE]: {
    // User content — identical in every locale by design.
    title: { hr: '{{senderName}}', en: '{{senderName}}', de: '{{senderName}}' },
    body: { hr: '{{messagePreview}}', en: '{{messagePreview}}', de: '{{messagePreview}}' },
    description: {
      hr: 'Šalje se kada primite novu poruku u razgovoru',
      en: 'Sent when a new chat message is received',
      de: 'Wird gesendet, wenn eine neue Chat-Nachricht eingeht',
    },
  },

  // ── Building mailbox (Korisnički pretinac; rep/deputy audience) ────────
  [NotificationType.EMAIL_RECEIVED]: {
    title: {
      hr: 'Nova poruka u korisničkom pretincu',
      en: 'New message in the inbox',
      de: 'Neue Nachricht im Postfach',
    },
    body: {
      hr: '{{fromAddress}}: {{subject}}',
      en: '{{fromAddress}}: {{subject}}',
      de: '{{fromAddress}}: {{subject}}',
    },
    description: {
      hr: 'Šalje se predstavnicima kada u pretinac zgrade stigne nova e-poruka',
      en: 'Sent to representatives when the building inbox receives a new email',
      de: 'Wird an Vertreter gesendet, wenn im Gebäude-Postfach eine neue E-Mail eingeht',
    },
  },

  // ── Organization membership (fired at the affected member only) ────────
  [NotificationType.ORG_MEMBER_ADDED]: {
    title: {
      hr: 'Dodani ste u organizaciju',
      en: 'Added to an Organization',
      de: 'Zu einer Organisation hinzugefügt',
    },
    body: {
      hr: 'Dodani ste u organizaciju {{orgName}} s ulogom: {{orgRole}}',
      en: 'You were added to {{orgName}} with the role {{orgRole}}',
      de: 'Sie wurden zu {{orgName}} mit der Rolle {{orgRole}} hinzugefügt',
    },
    description: {
      hr: 'Šalje se korisniku kada postane član organizacije',
      en: 'Sent to a user when they become an organization member',
      de: 'Wird gesendet, wenn ein Nutzer Mitglied einer Organisation wird',
    },
  },
  [NotificationType.ORG_MEMBER_REMOVED]: {
    title: {
      hr: 'Uklonjeni ste iz organizacije',
      en: 'Removed from an Organization',
      de: 'Aus einer Organisation entfernt',
    },
    body: {
      hr: 'Uklonjeni ste iz organizacije {{orgName}}',
      en: 'You were removed from {{orgName}}',
      de: 'Sie wurden aus {{orgName}} entfernt',
    },
    description: {
      hr: 'Šalje se korisniku kada je uklonjen iz organizacije',
      en: 'Sent to a user when they are removed from an organization',
      de: 'Wird gesendet, wenn ein Nutzer aus einer Organisation entfernt wird',
    },
  },
  [NotificationType.ORG_MEMBER_ROLE_CHANGED]: {
    title: {
      hr: 'Vaša uloga u organizaciji je promijenjena',
      en: 'Your Organization Role Changed',
      de: 'Ihre Organisationsrolle wurde geändert',
    },
    body: {
      hr: 'Vaša uloga u organizaciji {{orgName}} je promijenjena u: {{orgRole}}',
      en: 'Your role in {{orgName}} has been updated to {{orgRole}}',
      de: 'Ihre Rolle in {{orgName}} wurde geändert zu: {{orgRole}}',
    },
    description: {
      hr: 'Šalje se članu kada mu je promijenjena uloga u organizaciji',
      en: 'Sent to a member when their organization role changes',
      de: 'Wird gesendet, wenn sich die Organisationsrolle eines Mitglieds ändert',
    },
  },

  // ── System ─────────────────────────────────────────────────────────────
  [NotificationType.SYSTEM_ANNOUNCEMENT]: {
    // Announcement content is authored, not templated — identical everywhere.
    title: { hr: '{{title}}', en: '{{title}}', de: '{{title}}' },
    body: { hr: '{{body}}', en: '{{body}}', de: '{{body}}' },
    description: {
      hr: 'Obavijesti na razini cijele platforme',
      en: 'System-wide announcements',
      de: 'Plattformweite Ankündigungen',
    },
  },
};

export const ACTOR_FALLBACK: Record<Locale, string> = {
  hr: 'Netko',
  en: 'Someone',
  de: 'Jemand',
};
