import { ALL_CHECKPOINT_IDS, CATEGORIES, CHECKPOINTS, PRIORITY, TRAILER_CHECKPOINT_IDS, TRUCK_CHECKPOINT_IDS } from '../data/checklist';
import { CHECKPOINT_I18N } from '../i18n/translations';
import { SEED_HISTORY, SEED_MELDINGEN } from '../data/seed';
import type { Deel, Priority } from '../data/checklist';
import type { DamageItem, Melding, Photo, SubmittedCheck } from '../types';
import type { Lang } from '../i18n/translations';

export function checkpointText(id: string, lang: Lang): { label: string; sub: string } {
  const tr = CHECKPOINT_I18N[id]?.[lang];
  if (tr) return { label: tr[0], sub: tr[1] };
  const fallback = CHECKPOINTS[id];
  return fallback ? { label: fallback.label, sub: fallback.sub } : { label: id, sub: '' };
}

export function getApplicableIds(truckNvt: boolean, trailerNvt: boolean): string[] {
  return ALL_CHECKPOINT_IDS.filter((id) => {
    if (truckNvt && TRUCK_CHECKPOINT_IDS.has(id)) return false;
    if (trailerNvt && TRAILER_CHECKPOINT_IDS.has(id)) return false;
    return true;
  });
}

export interface Progress {
  done: number;
  total: number;
  ok: number;
  nok: number;
  pct: number;
}

export function getProgress(checkStatus: Record<string, string | null>, truckNvt: boolean, trailerNvt: boolean): Progress {
  const applicable = getApplicableIds(truckNvt, trailerNvt);
  const done = applicable.filter((id) => checkStatus[id]).length;
  const ok = applicable.filter((id) => checkStatus[id] === 'ok').length;
  const nok = applicable.filter((id) => checkStatus[id] === 'nok').length;
  const total = applicable.length || 1;
  return { done, total: applicable.length, ok, nok, pct: Math.round((done / total) * 100) };
}

/** Live not-OK checkpoints, formatted as admin-facing meldingen for today's (in-progress) check. */
export function getLiveMeldingen(
  checkStatus: Record<string, string | null>,
  notes: Record<string, string>,
  photos: Record<string, Photo[]>,
  vlootTruck: string,
  vlootTrailer: string,
): Melding[] {
  return ALL_CHECKPOINT_IDS.filter((id) => checkStatus[id] === 'nok').map((id) => {
    const isTruck = TRUCK_CHECKPOINT_IDS.has(id);
    const vloot = (isTruck ? vlootTruck : vlootTrailer).trim() || (isTruck ? '214' : '512');
    return {
      key: `live-${id}`,
      vloot,
      deel: (isTruck ? 'truck' : 'trailer') as Deel,
      punt: checkpointText(id, 'nl').label,
      note: (notes[id] || '').trim() || '—',
      photos: photos[id] || [],
      datum: 'vandaag',
      priority: (PRIORITY[id] || 'urgent') as Priority,
      startsHandled: false,
    };
  });
}

export function getDamageMeldingen(damages: DamageItem[], vlootTruck: string, vlootTrailer: string): Melding[] {
  return damages.map((d) => {
    const vloot = (d.deel === 'truck' ? vlootTruck : vlootTrailer).trim() || (d.deel === 'truck' ? '214' : '512');
    return {
      key: `damage-${d.id}`,
      vloot,
      deel: d.deel,
      punt: `Schade · ${(d.plek || '').trim() || 'onbekend'}`,
      note: (d.note || '').trim() || '—',
      photos: d.photos,
      datum: 'vandaag',
      priority: 'kritiek' as Priority,
      startsHandled: false,
    };
  });
}

/** Not-OK checkpoints + damage from every submitted check (persists across drafts being reset). */
export function getSubmittedMeldingen(submittedChecks: SubmittedCheck[]): Melding[] {
  const out: Melding[] = [];
  for (const check of submittedChecks) {
    const applicable = getApplicableIds(check.truckNvt, check.trailerNvt);
    for (const id of applicable) {
      if (check.checkStatus[id] !== 'nok') continue;
      const isTruck = TRUCK_CHECKPOINT_IDS.has(id);
      const vloot = (isTruck ? check.vlootTruck : check.vlootTrailer).trim() || (isTruck ? '214' : '512');
      out.push({
        key: `sub-${check.id}-${id}`,
        vloot,
        deel: (isTruck ? 'truck' : 'trailer') as Deel,
        punt: checkpointText(id, 'nl').label,
        note: (check.notes[id] || '').trim() || '—',
        photos: check.photos[id] || [],
        datum: check.datum,
        priority: (PRIORITY[id] || 'urgent') as Priority,
        startsHandled: false,
      });
    }
    for (const d of check.damages) {
      const vloot = (d.deel === 'truck' ? check.vlootTruck : check.vlootTrailer).trim() || (d.deel === 'truck' ? '214' : '512');
      out.push({
        key: `sub-${check.id}-damage-${d.id}`,
        vloot,
        deel: d.deel,
        punt: `Schade · ${(d.plek || '').trim() || 'onbekend'}`,
        note: (d.note || '').trim() || '—',
        photos: d.photos,
        datum: check.datum,
        priority: 'kritiek' as Priority,
        startsHandled: false,
      });
    }
  }
  return out;
}

export function getAllMeldingen(
  checkStatus: Record<string, string | null>,
  notes: Record<string, string>,
  photos: Record<string, Photo[]>,
  damages: DamageItem[],
  vlootTruck: string,
  vlootTrailer: string,
  submittedChecks: SubmittedCheck[],
  draftAlreadySubmitted: boolean,
): Melding[] {
  return [
    // While the driver is still filling in the form (not yet submitted), show it live for immediate feedback.
    ...(draftAlreadySubmitted ? [] : getLiveMeldingen(checkStatus, notes, photos, vlootTruck, vlootTrailer)),
    ...(draftAlreadySubmitted ? [] : getDamageMeldingen(damages, vlootTruck, vlootTrailer)),
    ...SEED_MELDINGEN,
    ...getSubmittedMeldingen(submittedChecks),
  ];
}

export const PRIO_RANK: Record<Priority, number> = { kritiek: 0, urgent: 1, nice: 2 };

export interface DecoratedMelding extends Melding {
  isOpen: boolean;
  archived: boolean;
}

export function decorateMeldingen(all: Melding[], archivedIds: Record<string, boolean>): DecoratedMelding[] {
  return all.map((m) => {
    const archived = !!archivedIds[m.key];
    const isOpen = !m.startsHandled && !archived;
    return { ...m, archived, isOpen };
  });
}

export interface MeldingGroup {
  key: string;
  vloot: string;
  deel: Deel;
  title: string;
  items: DecoratedMelding[];
  topPriority: Priority | null;
}

export function getGroups(active: DecoratedMelding[], search: string): MeldingGroup[] {
  const q = search.trim().toLowerCase();
  const map = new Map<string, DecoratedMelding[]>();
  active
    .filter((m) => !q || m.vloot.toLowerCase().includes(q))
    .forEach((m) => {
      const key = `${m.vloot}|${m.deel}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(m);
    });
  const groups: MeldingGroup[] = [...map.entries()].map(([key, items]) => {
    const [vloot, deel] = key.split('|') as [string, Deel];
    items.sort((a, b) => PRIO_RANK[a.priority] - PRIO_RANK[b.priority]);
    const openItems = items.filter((i) => i.isOpen);
    const top = openItems.length
      ? openItems.reduce((a, b) => (PRIO_RANK[a.priority] <= PRIO_RANK[b.priority] ? a : b)).priority
      : null;
    return { key, vloot, deel, title: `VLOOT ${vloot} · ${deel === 'truck' ? 'TRUCK' : 'TRAILER'}`, items, topPriority: top };
  });
  groups.sort((a, b) => (a.deel === b.deel ? (a.vloot < b.vloot ? -1 : 1) : a.deel === 'truck' ? -1 : 1));
  return groups;
}

export interface HistoryVlootView {
  key: string;
  vloot: string;
  checksCount: number;
  archivedCount: number;
  checks: { key: string; datum: string; door: string; ok: number; nok: number }[];
  archived: DecoratedMelding[];
}

export function getHistoryForDeel(deel: Deel, archived: DecoratedMelding[], search: string): HistoryVlootView[] {
  const q = search.trim().toLowerCase();
  const seedVloots = SEED_HISTORY.filter((h) => h.deel === deel).map((h) => h.vloot);
  const archivedVloots = archived.filter((m) => m.deel === deel).map((m) => m.vloot);
  const vloots = Array.from(new Set([...seedVloots, ...archivedVloots])).sort();
  return vloots
    .filter((v) => !q || v.toLowerCase().includes(q))
    .map((v) => {
      const seed = SEED_HISTORY.find((h) => h.vloot === v && h.deel === deel);
      const checks = seed?.checks || [];
      const arch = archived.filter((m) => m.vloot === v && m.deel === deel).sort((a, b) => PRIO_RANK[a.priority] - PRIO_RANK[b.priority]);
      return {
        key: `h-${deel}-${v}`,
        vloot: v,
        checksCount: checks.length,
        archivedCount: arch.length,
        checks: checks.map((c, i) => ({ key: `h-${deel}-${v}-${i}`, datum: c.datum, door: c.door, ok: c.ok, nok: c.nok })),
        archived: arch,
      };
    });
}

export function findSeedCheck(deel: Deel, vloot: string, datum: string) {
  const seed = SEED_HISTORY.find((h) => h.vloot === vloot && h.deel === deel);
  return seed?.checks.find((c) => c.datum === datum) || null;
}

export const CATEGORY_LIST = CATEGORIES;
