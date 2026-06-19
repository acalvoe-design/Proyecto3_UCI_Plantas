import React, { useEffect } from 'react';
import { usePlant } from '../hooks/usePlant';
import { SensorDisplay } from '../components/SensorDisplay';
import './Dashboard.css';

export const Dashboard = () => {
  const { systemActive, currentSensorData, sensors, lastUpdate, fetchSystemStatus } = usePlant();

  useEffect(() => {
    fetchSystemStatus();
    const interval = setInterval(fetchSystemStatus, 5000);
    return () => clearInterval(interval);
  }, [fetchSystemStatus]);

  const mapSensorData = () => {
    if (!sensors) return [];

    return Object.entries(sensors).map(([id, sensorInfo]) => ({
      id,
      name: id.replace(/_/g, ' ').toUpperCase(),
      value: sensorInfo.value,
      unit: sensorInfo.unit || '',
      status: sensorInfo.status || 'OK',
    }));
  };

  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Estado del Sistema</h2>
          <div className={`status-badge ${systemActive ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            <span>{systemActive ? 'Activo' : 'Inactivo'}</span>
          </div>
        </div>
        {lastUpdate && (
          <p className="last-update">
            Última actualización: {lastUpdate.toLocaleTimeString()}
          </p>
        )}
      </div>

      <div className="sensors-section">
        <h3 className="section-title">Sensores</h3>
        <div className="sensors-grid">
          {mapSensorData().map((sensor) => (
            <SensorDisplay key={sensor.id} sensor={sensor} />
          ))}
        </div>
      </div>

      {currentSensorData && (
        <div className="card data-card">
          <h3 className="card-title">Datos Actuales</h3>
          <pre className="data-json">{JSON.stringify(currentSensorData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
