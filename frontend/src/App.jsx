import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { PlantProvider } from './context/PlantContext';
import { usePlant } from './hooks/usePlant';
import { Dashboard } from './screens/Dashboard';
import { ControlPanel } from './screens/ControlPanel';
import { ConfigurationScreen } from './screens/ConfigurationScreen';
import './App.css';

function AppContent() {
  const { initializeSystem, systemActive, error } = usePlant();
  const [initialized, setInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    initializeSystem().finally(() => {
      setInitialized(true);
    });
  }, [initializeSystem]);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-container">
          <h1 className="app-title">UCI para Plantas</h1>
          <div className="header-icons">
            <button className="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"></circle>
                <path d="M12 1v6m0 6v6"></path>
              </svg>
            </button>
            <button className="header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <div className="notification-badge">1</div>
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {error && (
          <div className="error-banner">
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {!initialized && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Cargando datos del sistema...</p>
          </div>
        )}
        
        {initialized && (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/control" element={<ControlPanel />} />
            <Route path="/config" element={<ConfigurationScreen />} />
          </Routes>
        )}
      </main>

      <nav className="bottom-nav">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Planta</span>
        </Link>
        <Link to="/control" className={`nav-item ${location.pathname === '/control' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 1v6m0 6v6m-9-9h6m0 12h6"></path>
          </svg>
          <span>Ambiente</span>
        </Link>
        <Link to="/config" className={`nav-item ${location.pathname === '/config' ? 'active' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1"></circle>
            <path d="M12 1v6m0 6v6"></path>
            <path d="M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24"></path>
          </svg>
          <span>Alertas</span>
        </Link>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <PlantProvider>
      <Router>
        <AppContent />
      </Router>
    </PlantProvider>
  );
}
