import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { getProgress } from '../../selectors/derive';
import styles from './DoneScreen.module.css';

export function DoneScreen() {
  const t = useT();
  const vlootTruck = useAppStore((s) => s.vlootTruck);
  const checkStatus = useAppStore((s) => s.checkStatus);
  const truckNvt = useAppStore((s) => s.truckNvt);
  const trailerNvt = useAppStore((s) => s.trailerNvt);
  const resetCheck = useAppStore((s) => s.resetCheck);

  const progress = getProgress(checkStatus, truckNvt, trailerNvt);
  const vlootDisp = vlootTruck.trim() || '214';

  return (
    <div className={styles.wrap}>
      <div className={styles.check}>✓</div>
      <div className={styles.title}>{t.verzonden}</div>
      <div className={styles.summary}>
        Vloot {vlootDisp} · {progress.ok} {t.okWoord}, {progress.nok} {t.nietWoord}
      </div>
      <button type="button" className={styles.newBtn} onClick={resetCheck}>
        {t.nieuwe}
      </button>
    </div>
  );
}
