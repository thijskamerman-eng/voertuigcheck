export type Deel = 'truck' | 'trailer';
export type SectionWord = 'ext' | 'int' | 'klein';
export type Priority = 'kritiek' | 'urgent' | 'nice';

export interface CheckpointDef {
  id: string;
}

/** Fallback (Dutch) label/sub, actual display text comes from CHECKPOINT_I18N. */
export const CHECKPOINTS: Record<string, { label: string; sub: string }> = {
  banden: { label: 'Banden', sub: 'profiel, beschadigingen, spanning' },
  verlichting: { label: 'Verlichting', sub: 'koplampen, achterlichten, richtingaanwijzers' },
  schoon: { label: 'Schoon', sub: '' },
  trailer: { label: 'Schade trailer', sub: '' },
  balken: { label: 'Werkende balken in oplegger', sub: 'minimaal 2 aanwezig' },
  spanband: { label: 'Spanband', sub: '1× aanwezig' },
  afstandsbed: { label: 'Afstandsbediening laadklep', sub: 'aanwezig in oplegger' },
  klep: { label: 'Werkende klep', sub: '' },
  binnenkant: { label: 'Binnenkant schoon', sub: '' },
  koelmotor: { label: 'Tank koelmotor gevuld', sub: '' },
  ordelijk: { label: 'Interieur ordelijk', sub: 'netjes, vlekvrij, rookvrij' },
  dashboard: { label: 'Dashboardlampjes / storingen', sub: '' },
  brandstof: { label: 'Brandstofniveau', sub: '' },
  zekeringen: { label: 'Reserve (hoofd)zekeringen', sub: 'voor truck en oplegger' },
  schadeform: { label: 'Schadeformulier aanwezig', sub: 'in truck' },
  tankpas: { label: 'Tankpas / Tag', sub: '' },
  tussenschot: { label: 'Tussenschot werkend', sub: '' },
};

export interface CategoryDef {
  key: string;
  section: SectionWord;
  deel: Deel;
  ids: string[];
  /** Whether this category supports the "add damage" sub-feature. */
  hasDamage: boolean;
}

/** Order matters: all truck sections first, then all trailer sections. */
export const CATEGORIES: CategoryDef[] = [
  { key: 'ext_truck', section: 'ext', deel: 'truck', ids: ['banden', 'verlichting', 'schoon'], hasDamage: true },
  { key: 'int_truck', section: 'int', deel: 'truck', ids: ['ordelijk', 'dashboard', 'brandstof'], hasDamage: true },
  { key: 'klein_truck', section: 'klein', deel: 'truck', ids: ['zekeringen', 'schadeform', 'tankpas'], hasDamage: false },
  { key: 'ext_trailer', section: 'ext', deel: 'trailer', ids: ['trailer', 'klep', 'koelmotor'], hasDamage: true },
  { key: 'int_trailer', section: 'int', deel: 'trailer', ids: ['binnenkant', 'tussenschot'], hasDamage: true },
  { key: 'klein_trailer', section: 'klein', deel: 'trailer', ids: ['balken', 'spanband', 'afstandsbed'], hasDamage: false },
];

export const ALL_CHECKPOINT_IDS: string[] = CATEGORIES.flatMap((c) => c.ids);

export const TRUCK_CHECKPOINT_IDS = new Set(CATEGORIES.filter((c) => c.deel === 'truck').flatMap((c) => c.ids));
export const TRAILER_CHECKPOINT_IDS = new Set(CATEGORIES.filter((c) => c.deel === 'trailer').flatMap((c) => c.ids));

export const PRIORITY: Record<string, Priority> = {
  banden: 'kritiek',
  verlichting: 'kritiek',
  klep: 'kritiek',
  koelmotor: 'kritiek',
  zekeringen: 'kritiek',
  trailer: 'urgent',
  dashboard: 'urgent',
  brandstof: 'urgent',
  balken: 'urgent',
  spanband: 'urgent',
  afstandsbed: 'urgent',
  tussenschot: 'urgent',
  schoon: 'nice',
  ordelijk: 'nice',
  binnenkant: 'nice',
  schadeform: 'nice',
  tankpas: 'nice',
};

export function categoryForCheckpoint(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.ids.includes(id));
}
