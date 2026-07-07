import { useAppStore } from '../../store/useAppStore';
import { useHistory } from '../../hooks/useAdminData';
import type { Deel } from '../../data/checklist';
import { HistoryVlootRow } from './HistoryVlootRow';
import styles from './HistorySection.module.css';

export function HistorySection({ deel }: { deel: Deel }) {
  const isTruck = deel === 'truck';
  const isOpen = useAppStore((s) => (isTruck ? s.histTruckOpen : s.histTrailerOpen));
  const toggle = useAppStore((s) => (isTruck ? s.toggleHistTruck : s.toggleHistTrailer));
  const history = useHistory(deel);

  return (
    <>
      <button type="button" className={styles.toggle} data-deel={deel} onClick={toggle}>
        <span className={styles.chevron}>{isOpen ? '▾' : '▸'}</span>
        <span className={styles.label}>HISTORIEK VLOOT {isTruck ? 'TRUCKS' : 'TRAILERS'}</span>
      </button>
      {isOpen && (
        <div className={styles.body}>
          {history.map((v) => (
            <HistoryVlootRow key={v.key} deel={deel} view={v} />
          ))}
          {history.length === 0 && <div className={styles.empty}>Geen historiek gevonden.</div>}
        </div>
      )}
    </>
  );
}
