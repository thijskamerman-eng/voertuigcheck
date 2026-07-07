import { useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useT } from '../../hooks/useT';
import type { CategoryDef } from '../../data/checklist';
import { ChecklistItemRow } from './ChecklistItemRow';
import { DamageSection } from './DamageSection';
import styles from './ChecklistSection.module.css';

export function ChecklistSection({ category }: { category: CategoryDef }) {
  const t = useT();
  const truckNvt = useAppStore((s) => s.truckNvt);
  const trailerNvt = useAppStore((s) => s.trailerNvt);
  const checkStatus = useAppStore((s) => s.checkStatus);
  const isOpen = useAppStore((s) => !!s.openSections[category.key]);
  const allDamages = useAppStore((s) => s.damages);
  const damages = useMemo(() => allDamages.filter((d) => d.categoryKey === category.key), [allDamages, category.key]);
  const toggleSection = useAppStore((s) => s.toggleSection);
  const setCategoryAllOk = useAppStore((s) => s.setCategoryAllOk);

  const nvt = (category.deel === 'truck' && truckNvt) || (category.deel === 'trailer' && trailerNvt);
  const done = category.ids.filter((id) => checkStatus[id]).length;
  const allOk = done === category.ids.length && category.ids.every((id) => checkStatus[id] === 'ok');
  const secWord = category.section === 'ext' ? t.ext : category.section === 'int' ? t.int : t.klein;
  const deelWord = category.deel === 'truck' ? t.truck : t.trailer;
  const title = `${secWord} · ${deelWord}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <button
          type="button"
          className={styles.headBtn}
          onClick={() => !nvt && toggleSection(category.key)}
          disabled={nvt}
        >
          <span className={styles.chevron}>{nvt ? '' : isOpen ? '▾' : '▸'}</span>
          <span className={styles.title} data-nvt={nvt}>
            {title}
          </span>
          <span className={styles.count}>{nvt ? t.nvt : `${done}/${category.ids.length}`}</span>
        </button>
        {!nvt && (
          <button type="button" className={styles.allOk} data-active={allOk} onClick={() => setCategoryAllOk(category.key)}>
            {t.allesOk}
          </button>
        )}
      </div>
      {isOpen && !nvt && (
        <div className={styles.list}>
          {category.ids.map((id) => (
            <ChecklistItemRow key={id} id={id} />
          ))}
        </div>
      )}
      {isOpen && !nvt && category.hasDamage && <DamageSection categoryKey={category.key} items={damages} />}
    </div>
  );
}
