import { useAppStore } from '../../store/useAppStore';
import styles from './AdminLoginScreen.module.css';

export function AdminLoginScreen() {
  const goToForm = useAppStore((s) => s.goToForm);
  const adminUser = useAppStore((s) => s.adminUser);
  const adminPass = useAppStore((s) => s.adminPass);
  const setAdminUser = useAppStore((s) => s.setAdminUser);
  const setAdminPass = useAppStore((s) => s.setAdminPass);
  const adminLogin = useAppStore((s) => s.adminLogin);

  return (
    <div className={`scroll-area ${styles.wrap}`}>
      <div className={styles.top}>
        <button type="button" className={styles.back} onClick={goToForm} aria-label="Terug">
          ‹
        </button>
        <div className={styles.topTitle}>Beheerder inloggen</div>
      </div>
      <div className={styles.body}>
        <div className={styles.icon}>⚿</div>
        <div className={styles.h1}>Meldingenbeheer</div>
        <div className={styles.sub}>Log in om openstaande meldingen te bekijken en door te sturen naar de backend.</div>
        <label className={styles.label} htmlFor="adminUser">
          Gebruikersnaam
        </label>
        <input
          id="adminUser"
          className={styles.input}
          value={adminUser}
          onChange={(e) => setAdminUser(e.target.value)}
          placeholder="beheerder@wagenpark"
        />
        <label className={styles.label} htmlFor="adminPass">
          Wachtwoord
        </label>
        <input
          id="adminPass"
          type="password"
          className={styles.input}
          value={adminPass}
          onChange={(e) => setAdminPass(e.target.value)}
          placeholder="••••••••"
        />
        <button type="button" className={styles.loginBtn} onClick={adminLogin}>
          Inloggen →
        </button>
      </div>
    </div>
  );
}
