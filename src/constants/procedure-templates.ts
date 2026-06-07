export interface ProcedureTemplate {
  slug: string;
  name: string;
  description: string;
  phases: string[];
}

export const PROCEDURE_TEMPLATES: ProcedureTemplate[] = [
  {
    slug: 'legalization',
    name: 'Legalizacija zgrade',
    description:
      'Postupak za usklađivanje dokumentacije zgrade s građevinskom i uporabnom dozvolom.',
    phases: [
      'Analiza postojeće dokumentacije',
      'Arhitektonski elaborat',
      'Geodetski elaborat',
      'Podnošenje zahtjeva',
      'Komunalne naknade',
    ],
  },
  {
    slug: 'roof_replacement',
    name: 'Zamjena krova',
    description: 'Postupak za zamjenu krovišta zgrade — od ponuda do završetka radova.',
    phases: [
      'Analiza stanja i procjena',
      'Prikupljanje ponuda',
      'Glasanje i odabir izvođača',
      'Izvođenje radova',
      'Primopredaja i garancija',
    ],
  },
  {
    slug: 'energy_renovation',
    name: 'Energetska obnova',
    description: 'Postupak energetske obnove zgrade — fasada, prozori, krov, grijanje.',
    phases: [
      'Energetski pregled',
      'Projekt energetske obnove',
      'Prijava za sufinanciranje',
      'Odabir izvođača',
      'Izvođenje radova',
      'Završna dokumentacija',
    ],
  },
  {
    slug: 'elevator_installation',
    name: 'Ugradnja dizala',
    description: 'Postupak za ugradnju ili zamjenu dizala u zgradi.',
    phases: [
      'Tehnička procjena',
      'Prikupljanje ponuda',
      'Glasanje i odabir',
      'Dozvole i dokumentacija',
      'Ugradnja',
      'Tehnički pregled i puštanje u rad',
    ],
  },
];
