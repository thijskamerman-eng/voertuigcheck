import type { HistoryVlootSeed, Melding } from '../types';

/** Standalone reports that exist before the driver submits anything today. */
export const SEED_MELDINGEN: Melding[] = [
  {
    key: 'seed-banden-214',
    vloot: '214',
    deel: 'truck',
    punt: 'Banden',
    note: 'Profiel links achter < 3mm',
    photos: [{ id: 'seed-banden-214-p0' }, { id: 'seed-banden-214-p1' }],
    datum: '30-06',
    priority: 'kritiek',
    startsHandled: false,
  },
  {
    key: 'seed-verlichting-118',
    vloot: '118',
    deel: 'truck',
    punt: 'Verlichting',
    note: 'Achterlicht rechts defect',
    photos: [{ id: 'seed-verlichting-118-p0' }],
    datum: '28-06',
    priority: 'kritiek',
    startsHandled: false,
  },
  {
    key: 'seed-klep-512',
    vloot: '512',
    deel: 'trailer',
    punt: 'Werkende klep',
    note: 'Laadklep hapert',
    photos: [{ id: 'seed-klep-512-p0' }],
    datum: '27-06',
    priority: 'kritiek',
    startsHandled: false,
  },
  {
    key: 'seed-tankpas-214',
    vloot: '214',
    deel: 'truck',
    punt: 'Tankpas / Tag',
    note: 'Tag niet leesbaar',
    photos: [],
    datum: '26-06',
    priority: 'nice',
    startsHandled: true,
  },
];

export const SEED_HISTORY: HistoryVlootSeed[] = [
  {
    vloot: '214',
    deel: 'truck',
    checks: [
      {
        datum: '30-06',
        ok: 15,
        nok: 2,
        door: 'J. de Vries',
        punten: ['Banden', 'Verlichting'],
        schade: [
          { plek: 'Voorbumper links', foto: 2 },
          { plek: 'Spatbord rechtsvoor', foto: 1 },
        ],
      },
      { datum: '23-06', ok: 17, nok: 0, door: 'M. Bakker', punten: [], schade: [] },
      {
        datum: '16-06',
        ok: 16,
        nok: 1,
        door: 'J. de Vries',
        punten: ['Tankpas / Tag'],
        schade: [{ plek: 'Treeplank bestuurderszijde', foto: 1 }],
      },
    ],
  },
  {
    vloot: '118',
    deel: 'truck',
    checks: [
      {
        datum: '28-06',
        ok: 16,
        nok: 1,
        door: 'S. El Idrissi',
        punten: ['Verlichting'],
        schade: [{ plek: 'Zijskirt links', foto: 3 }],
      },
      { datum: '21-06', ok: 17, nok: 0, door: 'S. El Idrissi', punten: [], schade: [] },
    ],
  },
  {
    vloot: '512',
    deel: 'trailer',
    checks: [
      {
        datum: '27-06',
        ok: 14,
        nok: 3,
        door: 'T. Visser',
        punten: ['Werkende klep', 'Binnenkant schoon', 'Werkende balken in oplegger'],
        schade: [
          { plek: 'Achterdeur rechts', foto: 2 },
          { plek: 'Laadvloer midden', foto: 1 },
        ],
      },
      { datum: '20-06', ok: 16, nok: 1, door: 'T. Visser', punten: ['Spanband'], schade: [] },
    ],
  },
  {
    vloot: '488',
    deel: 'trailer',
    checks: [
      { datum: '26-06', ok: 15, nok: 0, door: 'R. Nowak', punten: [], schade: [] },
      {
        datum: '19-06',
        ok: 14,
        nok: 1,
        door: 'R. Nowak',
        punten: ['Afstandsbediening laadklep'],
        schade: [{ plek: 'Zijwand rechts achter', foto: 2 }],
      },
    ],
  },
];
