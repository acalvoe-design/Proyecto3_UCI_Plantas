import React, { useEffect } from 'react';
import { usePlant } from '../hooks/usePlant';
import { ActuatorControl } from '../components/ActuatorControl';
import './ControlPanel.css';

export const ControlPanel = () => {
  const { systemActive, actuators, fetchSystemStatus, rulesEnabled, toggleRules } = usePlant();

  useEffect(() => {
    fetchSystemStatus();
  }, [fetchSystemStatus]);

  const mapActuatorData = () => {
    if (!actuators) return [];

    return Object.entries(actuators).map(([id, actuatorInfo]) => ({
      id,
      name: id.replace(/_/g, ' ').toUpperCase(),
      type: actuatorInfo.type || 'Desconocido',
      active: actuatorInfo.active || false,
    }));
  };

  const actuatorList = mapActuatorData();

  return (
    <div className="control-panel">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Panel de Control</h2>
          <div className={`status-badge ${systemActive ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            <span>{systemActive ? 'Sistema Activo' : 'Sistema Inactivo'}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Automatizacion</h3>
        <div className="automation-control">
          <label className="form-label">Reglas Automaticas</label>
          <button
            className={`btn btn-full ${rulesEnabled ? 'automation-enabled' : 'automation-disabled'}`}
            onClick={toggleRules}
          >
            {rulesEnabled ? 'Habilitadas' : 'Deshabilitadas'}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Actuadores</h3>
        {actuatorList.length > 0 ? (
          <div className="actuators-container">
            {actuatorList.map((actuator) => (
              <ActuatorControl key={actuator.id} actuator={actuator} />
            ))}
          </div>
        ) : (
          <p className="no-data">No hay actuadores disponibles</p>
        )}
      </div>
    </div>
  );
};
