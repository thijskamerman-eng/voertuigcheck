import { useAppStore } from '../../store/useAppStore';
import { useActiveReport } from '../../hooks/useAdminData';
import { PhotoThumbnails } from '../shared/PhotoThumbnails';
import styles from './ReportSheet.module.css';

export function ReportSheet() {
  const report = useActiveReport();
  const closeReport = useAppStore((s) => s.closeReport);
  const openLightbox = useAppStore((s) => s.openLightbox);

  if (!report) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={closeReport} />
      <div className={styles.sheet}>
        <div className={styles.grabber} />
        <div className={styles.kicker}>
          RAPPORT · VLOOT {report.vloot} · {report.deel.toUpperCase()}
        </div>
        <div className={styles.datum}>{report.datum}</div>
        <div className={styles.door}>Uitgevoerd door {report.door}</div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum} data-variant="ok">
              {report.ok}
            </div>
            <div className={styles.statLabel}>OK</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum} data-variant="nok">
              {report.nok}
            </div>
            <div className={styles.statLabel}>NIET OK</div>
          </div>
        </div>
        {report.nok > 0 && (
          <>
            <div className={styles.sectionHeading}>NIET OK BEVONDEN</div>
            {report.punten.map((p, i) => (
              <div key={i} className={styles.puntRow}>
                <span className={styles.dotRed} />
                <span className={styles.puntLabel}>{p}</span>
              </div>
            ))}
          </>
        )}
        {report.schade.length > 0 && (
          <>
            <div className={styles.schadeHeading}>SCHADE</div>
            {report.schade.map((sc, i) => (
              <div key={i} className={styles.schadeRow}>
                <div className={styles.schadeTop}>
                  <span className={styles.dotRed} />
                  <span className={styles.schadePlek}>{sc.plek}</span>
                  <span className={styles.schadeFotoTxt}>
                    {sc.photos.length > 0 ? `${sc.photos.length} foto${sc.photos.length > 1 ? "'s" : ''}` : 'geen foto'}
                  </span>
                </div>
                {sc.photos.length > 0 && (
                  <div className={styles.schadeThumbs}>
                    <PhotoThumbnails
                      photos={sc.photos}
                      size={46}
                      onOpen={(p, i2) =>
                        openLightbox({
                          title: `Schade · ${sc.plek}`,
                          sub: `VLOOT ${report.vloot} · ${report.deel.toUpperCase()} · foto ${i2 + 1}/${sc.photos.length}`,
                          zoom: 1,
                          photo: p,
                        })
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </>
        )}
        <button type="button" className={styles.close} onClick={closeReport}>
          Sluiten
        </button>
      </div>
    </div>
  );
}
