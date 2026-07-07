import { useAppStore } from '../store/useAppStore';
import { UI } from '../i18n/translations';

export function useT() {
  const lang = useAppStore((s) => s.lang);
  return UI[lang];
}
