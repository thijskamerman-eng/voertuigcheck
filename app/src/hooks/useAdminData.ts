import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import {
  decorateMeldingen,
  findSeedCheck,
  getAllMeldingen,
  getGroups,
  getHistoryForDeel,
} from '../selectors/derive';
import type { ActiveReport } from '../types';

function useDecoratedMeldingen() {
  const checkStatus = useAppStore((s) => s.checkStatus);
  const notes = useAppStore((s) => s.notes);
  const photos = useAppStore((s) => s.photos);
  const damages = useAppStore((s) => s.damages);
  const vlootTruck = useAppStore((s) => s.vlootTruck);
  const vlootTrailer = useAppStore((s) => s.vlootTrailer);
  const archivedIds = useAppStore((s) => s.archivedIds);
  const submittedChecks = useAppStore((s) => s.submittedChecks);
  const draftAlreadySubmitted = useAppStore((s) => !!s.submittedAt);

  return useMemo(() => {
    const all = getAllMeldingen(
      checkStatus,
      notes,
      photos,
      damages,
      vlootTruck,
      vlootTrailer,
      submittedChecks,
      draftAlreadySubmitted,
    );
    return decorateMeldingen(all, archivedIds);
  }, [checkStatus, notes, photos, damages, vlootTruck, vlootTrailer, submittedChecks, draftAlreadySubmitted, archivedIds]);
}

export function useOpenMeldingenCount(): number {
  const decorated = useDecoratedMeldingen();
  return decorated.filter((m) => !m.archived && m.isOpen).length;
}

export function useMeldingGroups() {
  const decorated = useDecoratedMeldingen();
  const search = useAppStore((s) => s.meldSearch);
  const active = useMemo(() => decorated.filter((m) => !m.archived), [decorated]);
  return useMemo(() => getGroups(active, search), [active, search]);
}

export function useHistory(deel: 'truck' | 'trailer') {
  const decorated = useDecoratedMeldingen();
  const search = useAppStore((s) => s.meldSearch);
  const archived = useMemo(() => decorated.filter((m) => m.archived), [decorated]);
  return useMemo(() => getHistoryForDeel(deel, archived, search), [deel, archived, search]);
}

export function useActiveReport(): ActiveReport | null {
  const activeReportKey = useAppStore((s) => s.activeReportKey);
  return useMemo(() => {
    if (!activeReportKey) return null;
    const [deel, vloot, datum] = activeReportKey.split('|') as ['truck' | 'trailer', string, string];
    const check = findSeedCheck(deel, vloot, datum);
    if (!check) return null;
    return {
      vloot,
      deel,
      datum: check.datum,
      door: check.door,
      ok: check.ok,
      nok: check.nok,
      punten: check.punten,
      schade: check.schade.map((s) => ({
        plek: s.plek,
        photos: Array.from({ length: s.foto }, (_, i) => ({ id: `${activeReportKey}-${s.plek}-${i}` })),
      })),
    };
  }, [activeReportKey]);
}
