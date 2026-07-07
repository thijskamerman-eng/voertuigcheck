import { CATEGORIES } from '../../data/checklist';
import { AppHeader } from './AppHeader';
import { GeneralInfoCard } from './GeneralInfoCard';
import { ChecklistSection } from './ChecklistSection';
import { SubmitBar } from './SubmitBar';
import styles from './DriverFormScreen.module.css';

export function DriverFormScreen() {
  return (
    <>
      <AppHeader />
      <div className={`scroll-area ${styles.body}`}>
        <GeneralInfoCard />
        {CATEGORIES.map((cat) => (
          <ChecklistSection key={cat.key} category={cat} />
        ))}
      </div>
      <SubmitBar />
    </>
  );
}
