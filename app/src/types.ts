import type { Deel, Priority } from './data/checklist';
import type { Lang } from './i18n/translations';

export type CheckStatus = 'ok' | 'nok' | null;

/** A photo. `dataUrl` is set for real, user-captured photos; undefined for seeded/mock records (rendered as a placeholder). */
export interface Photo {
  id: string;
  dataUrl?: string;
}

export interface DamageItem {
  id: string;
  categoryKey: string;
  deel: Deel;
  plek: string;
  note: string;
  photos: Photo[];
}

export type AppView = 'form' | 'done' | 'admin-login' | 'admin-backend';

/** An immutable snapshot of a driver's check, captured at submit time so it survives the draft being reset for the next check. */
export interface SubmittedCheck {
  id: string;
  vlootTruck: string;
  vlootTrailer: string;
  driverName: string;
  datum: string;
  truckNvt: boolean;
  trailerNvt: boolean;
  checkStatus: Record<string, CheckStatus>;
  notes: Record<string, string>;
  photos: Record<string, Photo[]>;
  damages: DamageItem[];
}

/** A single checkpoint that is not-OK (or a damage entry) surfaced to the admin overview. */
export interface Melding {
  key: string;
  vloot: string;
  deel: Deel;
  punt: string;
  note: string;
  photos: Photo[];
  datum: string;
  priority: Priority;
  /** Was already handled before the admin ever saw it (seed data) — no "gereed" action needed/available. */
  startsHandled: boolean;
}

export interface HistoryCheckSeed {
  datum: string;
  ok: number;
  nok: number;
  door: string;
  punten: string[];
  schade: { plek: string; foto: number }[];
}

export interface HistoryVlootSeed {
  vloot: string;
  deel: Deel;
  checks: HistoryCheckSeed[];
}

export interface ActiveReport {
  vloot: string;
  deel: Deel;
  datum: string;
  door: string;
  ok: number;
  nok: number;
  punten: string[];
  schade: { plek: string; photos: Photo[] }[];
}

export interface LightboxState {
  title: string;
  sub: string;
  zoom: number;
  photo?: Photo;
}

export type { Lang };
