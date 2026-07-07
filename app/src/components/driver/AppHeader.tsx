import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { getProgress } from '../../selectors/derive';
import { LanguageSwitcher } from '../shared/LanguageSwitcher';
import { useOpenMeldingenCount } from '../../hooks/useAdminData';
import styles from './AppHeader.module.css';

export function AppHeader() {
  const t = useT();
  const vlootTruck = useAppStore((s) => s.vlootTruck);
  const truckNvt = useAppStore((s) => s.truckNvt);
  const trailerNvt = useAppStore((s) => s.trailerNvt);
  const checkStatus = useAppStore((s) => s.checkStatus);
  const goToAdminLogin = useAppStore((s) => s.goToAdminLogin);
  const openCount = useOpenMeldingenCount();

  const progress = getProgress(checkStatus, truckNvt, trailerNvt);
  const vlootDisp = vlootTruck.trim() || '214';

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.title}>Voertuigcheck</div>
        <button type="button" className={styles.bell} onClick={goToAdminLogin}>
          🔔 {t.meldingen} <span className={styles.badge}>{openCount}</span>
        </button>
      </div>
      <div className={styles.mid}>
        <LanguageSwitcher />
        <div className={styles.vloot}>VLOOT {vlootDisp}</div>
      </div>
      <div className={styles.progressRow}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: `${progress.pct}%` }} />
        </div>
        <div className={styles.progressTxt}>
          {progress.done}/{progress.total}
        </div>
      </div>
    </header>
  );
}
