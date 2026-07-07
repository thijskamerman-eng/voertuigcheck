import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { checkpointText } from '../../selectors/derive';
import { PhotoThumbnails } from '../shared/PhotoThumbnails';
import { EMPTY_PHOTOS } from '../../utils/emptyArray';
import type { Lang } from '../../i18n/translations';
import styles from './ChecklistItemRow.module.css';

export function ChecklistItemRow({ id }: { id: string }) {
  const t = useT();
  const lang = useAppStore((s) => s.lang);
  const status = useAppStore((s) => s.checkStatus[id] ?? null);
  const note = useAppStore((s) => s.notes[id] ?? '');
  const photos = useAppStore((s) => s.photos[id] ?? EMPTY_PHOTOS);
  const setCheckStatus = useAppStore((s) => s.setCheckStatus);
  const setNote = useAppStore((s) => s.setNote);
  const addPhoto = useAppStore((s) => s.addPhoto);
  const openLightbox = useAppStore((s) => s.openLightbox);

  const { label, sub } = checkpointText(id, lang as Lang);
  const isNok = status === 'nok';

  return (
    <div className={styles.row}>
      <div className={styles.top}>
        <div className={styles.textCol}>
          <div className={styles.label}>{label}</div>
          {!!sub && <div className={styles.sub}>{sub}</div>}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.actionBtn}
            data-variant="ok"
            data-active={status === 'ok'}
            onClick={() => setCheckStatus(id, 'ok')}
          >
            {t.ok}
          </button>
          <button
            type="button"
            className={styles.actionBtn}
            data-variant="nok"
            data-active={isNok}
            onClick={() => setCheckStatus(id, 'nok')}
          >
            {t.niet}
          </button>
        </div>
      </div>
      {isNok && (
        <div className={styles.nokPanel}>
          <textarea
            className={styles.textarea}
            value={note}
            onChange={(e) => setNote(id, e.target.value)}
            placeholder={t.nietPl}
          />
          <PhotoThumbnails
            photos={photos}
            onAdd={(p) => addPhoto(id, p)}
            onOpen={(p, i) =>
              openLightbox({ title: label, sub: `foto ${i + 1}/${photos.length}`, zoom: 1, photo: p })
            }
            addLabel={t.foto}
          />
        </div>
      )}
    </div>
  );
}
