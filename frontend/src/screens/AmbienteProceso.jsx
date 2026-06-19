import React, { useEffect, useState } from 'react';
import { usePlant } from '../hooks/usePlant';
import './AmbienteProceso.css';

export const AmbienteProceso = () => {
  const { systemActive, actuators, fetchSystemStatus, controlActuator } = usePlant();
  const [loading, setLoading] = useState({});

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
      description: getDescription(id),
    }));
  };

  const getDescription = (actuatorId) => {
    const descriptions = {
      'fan': 'Control manual del ventilador',
      'humidifier': 'Control manual del humidificador',
      'led': 'Control manual de la luz LED',
    };
    return descriptions[actuatorId] || 'Control del actuador';
  };

  const handleActuatorToggle = async (actuatorId) => {
    setLoading({ ...loading, [actuatorId]: true });
    try {
      await controlActuator(actuatorId, 'toggle');
      await fetchSystemStatus();
    } catch (err) {
      console.error('Error controlling actuator:', err);
    }
    setLoading({ ...loading, [actuatorId]: false });
  };

  const actuatorList = mapActuatorData();

  return (
    <div className="ambiente-proceso">
      <div className="card">
        <h2 className="card-title">Funciones de Cuidado</h2>
        <p className="description">
          El sistema controla automáticamente según los parámetros configurados. También puede gestionarlos manualmente cuando lo desee.
        </p>
      </div>

      <div className="actuators-list">
        {actuatorList.map((actuator) => (
          <div key={actuator.id} className="actuator-card">
            <div className="actuator-icon">
              {getActuatorIcon(actuator.id)}
            </div>
            <div className="actuator-info">
              <h3 className="actuator-name">{actuator.name}</h3>
              <p className="actuator-description">{actuator.description}</p>
            </div>
            <div className="actuator-controls">
              <span className={`status-badge ${actuator.active ? 'active' : 'inactive'}`}>
                {actuator.active ? 'Activa' : 'Inactiva'}
              </span>
              <button
                className={`control-btn ${actuator.active ? 'active' : 'inactive'}`}
                onClick={() => handleActuatorToggle(actuator.id)}
                disabled={loading[actuator.id]}
                title={actuator.active ? 'Desactivar' : 'Activar'}
              >
                {loading[actuator.id] ? '...' : (actuator.active ? 'APAGAR' : 'ENCENDER')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getActuatorIcon = (actuatorId) => {
  switch (actuatorId) {
    case 'fan':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6m-9-9h6m6 0h6"></path>
        </svg>
      );
    case 'humidifier':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2v6m0 6v6"></path>
          <path d="M8 9h8M8 15h8"></path>
        </svg>
      );
    case 'led':
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8"></circle>
          <path d="M12 6v12"></path>
        </svg>
      );
    default:
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
        </svg>
      );
  }
};
