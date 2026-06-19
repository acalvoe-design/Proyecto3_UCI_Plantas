import React, { useState, useEffect } from 'react';
import './AlertasScreen.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const AlertasScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alerts`);
      if (!response.ok) throw new Error('Failed to fetch alerts');
      const data = await response.json();
      setAlerts(data.alerts || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError('Error al cargar las alertas');
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (id) => {
    console.log('Dismiss alert:', id);
  };

  return (
    <div className="alertas-screen">
      <div className="card">
        <h2 className="card-title">Alertas</h2>
        <p className="alerts-description">
          Notificaciones de condiciones que requieren atención
        </p>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando alertas...</p>
        </div>
      )}

      {!loading && alerts.length > 0 && (
        <div className="alerts-list">
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert-card alert-${alert.type}`}>
              <div className="alert-header">
                <div className="alert-icon">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="alert-title-section">
                  <p className="alert-plant">{alert.plant}</p>
                  <h3 className="alert-title">{alert.title}</h3>
                </div>
              </div>

              <p className="alert-description">{alert.description}</p>

              <div className="alert-footer">
                <div className="alert-status">
                  <span className="status-label">Estado:</span>
                  <span className={`status-value status-${alert.type}`}>{alert.status}</span>
                </div>
                <button className="btn btn-small btn-primary" onClick={() => handleDismiss(alert.id)}>
                  Entendido
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && alerts.length === 0 && (
        <div className="no-alerts">
          <p>No hay alertas en este momento</p>
        </div>
      )}
    </div>
  );
};

const getAlertIcon = (type) => {
  switch (type) {
    case 'completed':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      );
    case 'warning':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      );
    case 'error':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      );
    default:
      return null;
  }
};
