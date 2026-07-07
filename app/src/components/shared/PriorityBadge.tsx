import type { Priority } from '../../data/checklist';
import styles from './PriorityBadge.module.css';

const LABEL: Record<Priority, string> = { kritiek: 'KRITIEK', urgent: 'URGENT', nice: 'NICE TO HAVE' };

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={styles.badge} data-priority={priority}>{LABEL[priority]}</span>;
}

export function DoneBadge() {
  return <span className={styles.badge} data-priority="done">✓ AF</span>;
}
