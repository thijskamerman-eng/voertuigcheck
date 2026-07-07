import { useAppStore } from '../../store/useAppStore';
import type { HistoryVlootView } from '../../selectors/derive';
import type { Deel } from '../../data/checklist';
import { PriorityBadge } from '../shared/PriorityBadge';
import styles from './HistoryVlootRow.module.css';

export function HistoryVlootRow({ deel, view }: { deel: Deel; view: HistoryVlootView }) {
  const isOpen = useAppStore((s) => !!s.openHistGroups[view.key]);
  const toggleHistGroup = useAppStore((s) => s.toggleHistGroup);
  const openReport = useAppStore((s) => s.openReport);

  const countTxt = `${view.checksCount} checks${view.archivedCount ? ` · ${view.archivedCount} gearch.` : ''}`;

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.head} onClick={() => toggleHistGroup(view.key)}>
        <span className={styles.chevron}>{isOpen ? '▾' : '▸'}</span>
        <span className={styles.title}>VLOOT {view.vloot}</span>
        <span className={styles.count}>{countTxt}</span>
      </button>
      {isOpen && (
        <div className={styles.body}>
          {view.checks.map((c) => (
            <button
              key={c.key}
              type="button"
              className={styles.check}
              onClick={() => openReport(`${deel}|${view.vloot}|${c.datum}`)}
            >
              <span className={styles.datum}>{c.datum}</span>
              <span className={styles.door}>{c.door}</span>
              <span className={styles.summary} data-nok={c.nok > 0}>
                {c.nok > 0 ? `${c.nok} niet OK` : 'alles OK'}
              </span>
              <span className={styles.arrow}>›</span>
            </button>
          ))}
          {view.archived.length > 0 && (
            <div className={styles.archivedBlock}>
              <div className={styles.archivedHeading}>🗄 GEARCHIVEERDE MELDINGEN</div>
              {view.archived.map((a) => (
                <div key={a.key} className={styles.archivedRow}>
                  <PriorityBadge priority={a.priority} />
                  <span className={styles.archivedPunt}>{a.punt}</span>
                  <span className={styles.archivedDeel}>{a.deel.toUpperCase()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
