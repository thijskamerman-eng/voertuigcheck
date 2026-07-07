import { useRef } from 'react';
import type { Photo } from '../../types';
import { genId } from '../../store/useAppStore';
import { readFileAsDataUrl } from '../../utils/file';
import styles from './PhotoThumbnails.module.css';

interface Props {
  photos: Photo[];
  onAdd?: (photo: Photo) => void;
  onOpen?: (photo: Photo, index: number) => void;
  addLabel?: string;
  size?: number;
}

export function PhotoThumbnails({ photos, onAdd, onOpen, addLabel = 'foto', size = 52 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length || !onAdd) return;
    for (const file of Array.from(files)) {
      const dataUrl = await readFileAsDataUrl(file);
      onAdd({ id: genId('photo'), dataUrl });
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div className={styles.row}>
      {photos.map((p, i) => (
        <button
          key={p.id}
          type="button"
          className={styles.thumb}
          style={{ width: size, height: size }}
          onClick={() => onOpen?.(p, i)}
          aria-label={`${addLabel} ${i + 1}`}
        >
          {p.dataUrl ? <img src={p.dataUrl} alt="" className={styles.img} /> : <span className={styles.placeholder}>{addLabel}</span>}
        </button>
      ))}
      {onAdd && (
        <>
          <button
            type="button"
            className={styles.add}
            style={{ width: size, height: size }}
            onClick={() => inputRef.current?.click()}
            aria-label="Foto toevoegen"
          >
            +
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            className="visually-hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </>
      )}
    </div>
  );
}
