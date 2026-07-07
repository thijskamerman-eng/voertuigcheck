import { useAppStore } from '../../store/useAppStore';
import { useMeldingGroups, useOpenMeldingenCount } from '../../hooks/useAdminData';
import { MeldingGroupRow } from './MeldingGroupRow';
import { HistorySection } from './HistorySection';
import { ReportSheet } from './ReportSheet';
import styles from './AdminBackendScreen.module.css';

export function AdminBackendScreen() {
  const goToForm = useAppStore((s) => s.goToForm);
  const meldSearch = useAppStore((s) => s.meldSearch);
  const setMeldSearch = useAppStore((s) => s.setMeldSearch);
  const groups = useMeldingGroups();
  const openCount = useOpenMeldingenCount();

  return (
    <>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={goToForm} aria-label="Terug">
          ‹
        </button>
        <div className={styles.topMid}>
          <div className={styles.topTitle}>Overzicht meldingen</div>
          <div className={styles.topSub}>Backend · wagenparkbeheer</div>
        </div>
        <div className={styles.topCount}>{openCount}</div>
      </div>
      <div className={`scroll-area ${styles.body}`}>
        <input
          className={styles.search}
          value={meldSearch}
          onChange={(e) => setMeldSearch(e.target.value)}
          placeholder="🔍  Zoek op vlootnr…"
        />
        <div className={styles.heading}>MELDINGEN · PER VOERTUIG</div>
        {groups.map((g) => (
          <MeldingGroupRow key={g.key} group={g} />
        ))}
        {groups.length === 0 && <div className={styles.empty}>Geen meldingen gevonden.</div>}

        <HistorySection deel="truck" />
        <HistorySection deel="trailer" />

        <button type="button" className={styles.terug} onClick={goToForm}>
          Terug naar controle
        </button>
      </div>
      <ReportSheet />
    </>
  );
}
