import { create } from 'zustand';
import { ALL_CHECKPOINT_IDS, CATEGORIES, TRAILER_CHECKPOINT_IDS, TRUCK_CHECKPOINT_IDS } from '../data/checklist';
import type { AppView, CheckStatus, DamageItem, LightboxState, Photo } from '../types';
import type { Lang } from '../i18n/translations';

let seq = 0;
export function genId(prefix = 'id'): string {
  seq += 1;
  return `${prefix}-${Date.now()}-${seq}`;
}

interface AppState {
  view: AppView;
  lang: Lang;

  // General details
  vlootTruck: string;
  vlootTrailer: string;
  truckNvt: boolean;
  trailerNvt: boolean;
  driverName: string;

  // Checklist
  checkStatus: Record<string, CheckStatus>;
  notes: Record<string, string>;
  photos: Record<string, Photo[]>;
  openSections: Record<string, boolean>;

  // Damage per category
  damages: DamageItem[];

  submittedAt: string | null;

  // Admin
  adminUser: string;
  adminPass: string;
  meldSearch: string;
  openGroups: Record<string, boolean>;
  archivedIds: Record<string, boolean>;
  histTruckOpen: boolean;
  histTrailerOpen: boolean;
  openHistGroups: Record<string, boolean>;
  activeReportKey: string | null;
  lightbox: LightboxState | null;

  // Actions
  setLang: (lang: Lang) => void;
  goToForm: () => void;
  goToDone: () => void;
  goToAdminLogin: () => void;
  adminLogin: () => void;

  setVlootTruck: (v: string) => void;
  setVlootTrailer: (v: string) => void;
  toggleTruckNvt: () => void;
  toggleTrailerNvt: () => void;
  setDriverName: (v: string) => void;

  setCheckStatus: (id: string, status: Exclude<CheckStatus, null>) => void;
  setNote: (id: string, note: string) => void;
  addPhoto: (id: string, photo: Photo) => void;
  toggleSection: (key: string) => void;
  setCategoryAllOk: (categoryKey: string) => void;

  addDamage: (categoryKey: string) => void;
  updateDamage: (id: string, patch: Partial<Pick<DamageItem, 'plek' | 'note'>>) => void;
  addDamagePhoto: (id: string, photo: Photo) => void;
  removeDamage: (id: string) => void;

  submitCheck: () => void;
  resetCheck: () => void;

  setAdminUser: (v: string) => void;
  setAdminPass: (v: string) => void;
  setMeldSearch: (v: string) => void;
  toggleGroup: (key: string) => void;
  toggleHistTruck: () => void;
  toggleHistTrailer: () => void;
  toggleHistGroup: (key: string) => void;
  markGereedArchiveren: (key: string) => void;
  openReport: (key: string) => void;
  closeReport: () => void;
  openLightbox: (data: LightboxState) => void;
  closeLightbox: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

const initialOpenSections = Object.fromEntries(CATEGORIES.map((c) => [c.key, false]));

export const useAppStore = create<AppState>((set) => ({
  view: 'form',
  lang: 'nl',

  vlootTruck: '',
  vlootTrailer: '',
  truckNvt: false,
  trailerNvt: false,
  driverName: '',

  checkStatus: {},
  notes: {},
  photos: {},
  openSections: initialOpenSections,

  damages: [],

  submittedAt: null,

  adminUser: '',
  adminPass: '',
  meldSearch: '',
  openGroups: {},
  archivedIds: {},
  histTruckOpen: false,
  histTrailerOpen: false,
  openHistGroups: {},
  activeReportKey: null,
  lightbox: null,

  setLang: (lang) => set({ lang }),
  goToForm: () => set({ view: 'form', adminUser: '', adminPass: '' }),
  goToDone: () => set({ view: 'done' }),
  goToAdminLogin: () => set({ view: 'admin-login' }),
  adminLogin: () => set({ view: 'admin-backend' }),

  setVlootTruck: (v) => set({ vlootTruck: v }),
  setVlootTrailer: (v) => set({ vlootTrailer: v }),
  toggleTruckNvt: () => set((s) => ({ truckNvt: !s.truckNvt })),
  toggleTrailerNvt: () => set((s) => ({ trailerNvt: !s.trailerNvt })),
  setDriverName: (v) => set({ driverName: v }),

  setCheckStatus: (id, status) =>
    set((s) => ({
      checkStatus: { ...s.checkStatus, [id]: s.checkStatus[id] === status ? null : status },
    })),
  setNote: (id, note) => set((s) => ({ notes: { ...s.notes, [id]: note } })),
  addPhoto: (id, photo) =>
    set((s) => ({ photos: { ...s.photos, [id]: [...(s.photos[id] || []), photo] } })),
  toggleSection: (key) =>
    set((s) => ({ openSections: { ...s.openSections, [key]: !s.openSections[key] } })),
  setCategoryAllOk: (categoryKey) =>
    set((s) => {
      const cat = CATEGORIES.find((c) => c.key === categoryKey);
      if (!cat) return s;
      const next = { ...s.checkStatus };
      cat.ids.forEach((id) => {
        next[id] = 'ok';
      });
      return { checkStatus: next };
    }),

  addDamage: (categoryKey) =>
    set((s) => {
      const cat = CATEGORIES.find((c) => c.key === categoryKey);
      if (!cat) return s;
      const item: DamageItem = { id: genId('dmg'), categoryKey, deel: cat.deel, plek: '', note: '', photos: [] };
      return { damages: [...s.damages, item], openSections: { ...s.openSections, [categoryKey]: true } };
    }),
  updateDamage: (id, patch) =>
    set((s) => ({ damages: s.damages.map((d) => (d.id === id ? { ...d, ...patch } : d)) })),
  addDamagePhoto: (id, photo) =>
    set((s) => ({ damages: s.damages.map((d) => (d.id === id ? { ...d, photos: [...d.photos, photo] } : d)) })),
  removeDamage: (id) => set((s) => ({ damages: s.damages.filter((d) => d.id !== id) })),

  submitCheck: () =>
    set({ submittedAt: new Date().toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit' }), view: 'done' }),
  resetCheck: () =>
    set({
      view: 'form',
      checkStatus: {},
      notes: {},
      photos: {},
      damages: [],
      openSections: initialOpenSections,
      submittedAt: null,
    }),

  setAdminUser: (v) => set({ adminUser: v }),
  setAdminPass: (v) => set({ adminPass: v }),
  setMeldSearch: (v) => set({ meldSearch: v }),
  toggleGroup: (key) => set((s) => ({ openGroups: { ...s.openGroups, [key]: !s.openGroups[key] } })),
  toggleHistTruck: () => set((s) => ({ histTruckOpen: !s.histTruckOpen })),
  toggleHistTrailer: () => set((s) => ({ histTrailerOpen: !s.histTrailerOpen })),
  toggleHistGroup: (key) => set((s) => ({ openHistGroups: { ...s.openHistGroups, [key]: !s.openHistGroups[key] } })),
  markGereedArchiveren: (key) => set((s) => ({ archivedIds: { ...s.archivedIds, [key]: true } })),
  openReport: (key) => set({ activeReportKey: key }),
  closeReport: () => set({ activeReportKey: null }),
  openLightbox: (data) => set({ lightbox: data }),
  closeLightbox: () => set({ lightbox: null }),
  zoomIn: () => set((s) => (s.lightbox ? { lightbox: { ...s.lightbox, zoom: Math.min(3, s.lightbox.zoom + 0.5) } } : s)),
  zoomOut: () => set((s) => (s.lightbox ? { lightbox: { ...s.lightbox, zoom: Math.max(1, s.lightbox.zoom - 0.5) } } : s)),
}));

export { ALL_CHECKPOINT_IDS, TRUCK_CHECKPOINT_IDS, TRAILER_CHECKPOINT_IDS };
