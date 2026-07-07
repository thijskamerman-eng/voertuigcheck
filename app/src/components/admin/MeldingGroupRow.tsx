import { useAppStore } from '../../store/useAppStore';
import { PriorityBadge, DoneBadge } from '../shared/PriorityBadge';
import { MeldingCard } from './MeldingCard';
import type { MeldingGroup } from '../../selectors/derive';
import styles from './MeldingGroupRow.module.css';

export function MeldingGroupRow({ group }: { group: MeldingGroup }) {
  const isOpen = useAppStore((s) => !!s.openGroups[group.key]);
  const toggleGroup = useAppStore((s) => s.toggleGroup);

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.head} onClick={() => toggleGroup(group.key)}>
        <span className={styles.chevron}>{isOpen ? '▾' : '▸'}</span>
        <span className={styles.dot} data-deel={group.deel} />
        <span className={styles.title}>{group.title}</span>
        {group.topPriority ? <PriorityBadge priority={group.topPriority} /> : <DoneBadge />}
        <span className={styles.count}>{group.items.length}</span>
      </button>
      {isOpen && (
        <div className={styles.list}>
          {group.items.map((m) => (
            <MeldingCard key={m.key} melding={m} />
          ))}
        </div>
      )}
    </div>
  );
}
