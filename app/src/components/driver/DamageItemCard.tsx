import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { PhotoThumbnails } from '../shared/PhotoThumbnails';
import type { DamageItem } from '../../types';
import styles from './DamageItemCard.module.css';

export function DamageItemCard({ damage }: { damage: DamageItem }) {
  const t = useT();
  const updateDamage = useAppStore((s) => s.updateDamage);
  const addDamagePhoto = useAppStore((s) => s.addDamagePhoto);
  const removeDamage = useAppStore((s) => s.removeDamage);
  const openLightbox = useAppStore((s) => s.openLightbox);

  return (
    <div className={styles.card}>
      <label className={styles.label}>{t.schadeplek}</label>
      <input
        className={styles.input}
        value={damage.plek}
        onChange={(e) => updateDamage(damage.id, { plek: e.target.value })}
        placeholder={t.schadeplekPl}
      />
      <label className={styles.label}>{t.toelichting}</label>
      <textarea
        className={styles.textarea}
        value={damage.note}
        onChange={(e) => updateDamage(damage.id, { note: e.target.value })}
        placeholder={t.nietPl}
      />
      <div className={styles.photoRow}>
        <PhotoThumbnails
          photos={damage.photos}
          onAdd={(p) => addDamagePhoto(damage.id, p)}
          onOpen={(p, i) =>
            openLightbox({
              title: `${t.schade} · ${damage.plek || '—'}`,
              sub: `foto ${i + 1}/${damage.photos.length}`,
              zoom: 1,
              photo: p,
            })
          }
          addLabel={t.foto}
        />
      </div>
      <button type="button" className={styles.remove} onClick={() => removeDamage(damage.id)}>
        {t.verwijderen}
      </button>
    </div>
  );
}
