import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { getProgress } from '../../selectors/derive';
import styles from './SubmitBar.module.css';

export function SubmitBar() {
  const t = useT();
  const checkStatus = useAppStore((s) => s.checkStatus);
  const truckNvt = useAppStore((s) => s.truckNvt);
  const trailerNvt = useAppStore((s) => s.trailerNvt);
  const submitCheck = useAppStore((s) => s.submitCheck);
  const goToAdminLogin = useAppStore((s) => s.goToAdminLogin);

  const progress = getProgress(checkStatus, truckNvt, trailerNvt);

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.submit} onClick={submitCheck}>
        {t.verstuur} · {progress.done}/{progress.total}
      </button>
      <button type="button" className={styles.link} onClick={goToAdminLogin}>
        {t.overzicht}
      </button>
    </div>
  );
}
