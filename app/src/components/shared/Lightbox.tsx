import { useAppStore } from '../../store/useAppStore';
import styles from './Lightbox.module.css';

export function Lightbox() {
  const lightbox = useAppStore((s) => s.lightbox);
  const closeLightbox = useAppStore((s) => s.closeLightbox);
  const zoomIn = useAppStore((s) => s.zoomIn);
  const zoomOut = useAppStore((s) => s.zoomOut);

  if (!lightbox) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={lightbox.title}>
      <div className={styles.stage}>
        <div className={styles.frame} style={{ transform: `scale(${lightbox.zoom})` }}>
          {lightbox.photo?.dataUrl ? (
            <img src={lightbox.photo.dataUrl} alt={lightbox.title} className={styles.img} />
          ) : (
            <span className={styles.placeholder}>📷 foto</span>
          )}
        </div>
      </div>
      <div className={styles.caption}>
        <div className={styles.title}>{lightbox.title}</div>
        <div className={styles.sub}>{lightbox.sub}</div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.round} onClick={zoomOut} aria-label="Uitzoomen">
          −
        </button>
        <button type="button" className={styles.close} onClick={closeLightbox}>
          Sluiten
        </button>
        <button type="button" className={styles.round} onClick={zoomIn} aria-label="Inzoomen">
          +
        </button>
      </div>
    </div>
  );
}
