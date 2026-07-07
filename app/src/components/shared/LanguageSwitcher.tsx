import { LANGS } from '../../i18n/translations';
import { useAppStore } from '../../store/useAppStore';
import { Flag } from './Flag';
import styles from './LanguageSwitcher.module.css';

const LABELS: Record<string, string> = { nl: 'Nederlands', en: 'English', pl: 'Polski', ro: 'Română' };

export function LanguageSwitcher() {
  const lang = useAppStore((s) => s.lang);
  const setLang = useAppStore((s) => s.setLang);

  return (
    <div className={styles.row} role="group" aria-label="Taal / Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={styles.btn}
          data-active={lang === l.code}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={LABELS[l.code]}
        >
          <Flag lang={l.code} />
        </button>
      ))}
    </div>
  );
}
