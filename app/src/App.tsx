import { useAppStore } from './store/useAppStore';
import { DriverFormScreen } from './components/driver/DriverFormScreen';
import { DoneScreen } from './components/driver/DoneScreen';
import { AdminLoginScreen } from './components/admin/AdminLoginScreen';
import { AdminBackendScreen } from './components/admin/AdminBackendScreen';
import { Lightbox } from './components/shared/Lightbox';

function App() {
  const view = useAppStore((s) => s.view);

  return (
    <div className="app-shell">
      {view === 'form' && <DriverFormScreen />}
      {view === 'done' && <DoneScreen />}
      {view === 'admin-login' && <AdminLoginScreen />}
      {view === 'admin-backend' && <AdminBackendScreen />}
      <Lightbox />
    </div>
  );
}

export default App;
