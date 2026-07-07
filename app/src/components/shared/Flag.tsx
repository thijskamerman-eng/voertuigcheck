import type { Lang } from '../../i18n/translations';
import styles from './Flag.module.css';

const FLAG_BG: Record<Lang, string> = {
  nl: 'linear-gradient(#ae1c28 0 33.3%, #fff 33.3% 66.6%, #21468b 66.6% 100%)',
  en: 'linear-gradient(#cf142b,#cf142b) center/100% 22% no-repeat,linear-gradient(#cf142b,#cf142b) center/22% 100% no-repeat,#fff',
  pl: 'linear-gradient(#fff 0 50%, #dc143c 50% 100%)',
  ro: 'linear-gradient(90deg, #002b7f 0 33.3%, #fcd116 33.3% 66.6%, #ce1126 66.6% 100%)',
};

export function Flag({ lang }: { lang: Lang }) {
  return <span className={styles.flag} style={{ background: FLAG_BG[lang] }} aria-hidden="true" />;
}
