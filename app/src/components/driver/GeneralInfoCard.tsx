import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import styles from './GeneralInfoCard.module.css';

export function GeneralInfoCard() {
  const t = useT();
  const vlootTruck = useAppStore((s) => s.vlootTruck);
  const vlootTrailer = useAppStore((s) => s.vlootTrailer);
  const truckNvt = useAppStore((s) => s.truckNvt);
  const trailerNvt = useAppStore((s) => s.trailerNvt);
  const driverName = useAppStore((s) => s.driverName);
  const setVlootTruck = useAppStore((s) => s.setVlootTruck);
  const setVlootTrailer = useAppStore((s) => s.setVlootTrailer);
  const toggleTruckNvt = useAppStore((s) => s.toggleTruckNvt);
  const toggleTrailerNvt = useAppStore((s) => s.toggleTrailerNvt);
  const setDriverName = useAppStore((s) => s.setDriverName);

  return (
    <section>
      <div className={styles.sectionTitle}>{t.algemene}</div>
      <div className={styles.card}>
        <div className={styles.fieldHead}>
          <label className={styles.label} htmlFor="vlootTruck">
            {t.vlootTruck}
          </label>
          <button type="button" className={styles.nvtBtn} data-active={truckNvt} onClick={toggleTruckNvt}>
            {t.nvt}
          </button>
        </div>
        {!truckNvt ? (
          <input
            id="vlootTruck"
            className={styles.input}
            value={vlootTruck}
            onChange={(e) => setVlootTruck(e.target.value)}
            placeholder="bv. 214"
          />
        ) : (
          <div className={styles.nvtNote}>{t.zonderTruck}</div>
        )}

        <div className={styles.fieldHead}>
          <label className={styles.label} htmlFor="vlootTrailer">
            {t.vlootTrailer}
          </label>
          <button type="button" className={styles.nvtBtn} data-active={trailerNvt} onClick={toggleTrailerNvt}>
            {t.nvt}
          </button>
        </div>
        {!trailerNvt ? (
          <input
            id="vlootTrailer"
            className={styles.input}
            value={vlootTrailer}
            onChange={(e) => setVlootTrailer(e.target.value)}
            placeholder="bv. 512"
          />
        ) : (
          <div className={styles.nvtNote}>{t.zonderTrailer}</div>
        )}

        <label className={styles.label} htmlFor="driverName">
          {t.uitgevoerd}
        </label>
        <input
          id="driverName"
          className={`${styles.input} ${styles.inputLast}`}
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
          placeholder={t.naam}
        />
      </div>
    </section>
  );
}
