import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import { DamageItemCard } from './DamageItemCard';
import type { DamageItem } from '../../types';
import styles from './DamageSection.module.css';

export function DamageSection({ categoryKey, items }: { categoryKey: string; items: DamageItem[] }) {
  const t = useT();
  const addDamage = useAppStore((s) => s.addDamage);

  return (
    <div className={styles.wrap}>
      <div className={styles.heading}>
        {t.schade} · {items.length}
      </div>
      {items.map((d) => (
        <DamageItemCard key={d.id} damage={d} />
      ))}
      <button type="button" className={styles.add} onClick={() => addDamage(categoryKey)}>
        {t.schadeAdd}
      </button>
    </div>
  );
}
