import { useAppStore } from '../../store/useAppStore';
import { PhotoThumbnails } from '../shared/PhotoThumbnails';
import { PriorityBadge } from '../shared/PriorityBadge';
import type { DecoratedMelding } from '../../selectors/derive';
import styles from './MeldingCard.module.css';

export function MeldingCard({ melding }: { melding: DecoratedMelding }) {
  const markGereedArchiveren = useAppStore((s) => s.markGereedArchiveren);
  const openLightbox = useAppStore((s) => s.openLightbox);

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <PriorityBadge priority={melding.priority} />
        <span className={styles.punt}>{melding.punt}</span>
      </div>
      <div className={styles.note}>{melding.note}</div>
      {melding.photos.length > 0 && (
        <div className={styles.photos}>
          <PhotoThumbnails
            photos={melding.photos}
            size={46}
            onOpen={(p, i) =>
              openLightbox({
                title: melding.punt,
                sub: `VLOOT ${melding.vloot} · ${melding.deel.toUpperCase()} · foto ${i + 1}/${melding.photos.length}`,
                zoom: 1,
                photo: p,
              })
            }
          />
        </div>
      )}
      <div className={styles.meta}>
        <span>{melding.datum}</span>
        <span className={styles.spacer} />
        <span className={styles.status} data-open={melding.isOpen}>
          {melding.isOpen ? 'OPEN' : '✓ AFGEHANDELD'}
        </span>
      </div>
      {melding.isOpen && (
        <button type="button" className={styles.gereed} onClick={() => markGereedArchiveren(melding.key)}>
          ✓ Gereed &amp; archiveren
        </button>
      )}
    </div>
  );
}
