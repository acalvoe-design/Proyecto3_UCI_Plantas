import React from 'react';
import { usePlant } from '../hooks/usePlant';
import './ActuatorControl.css';

export const ActuatorControl = ({ actuator }) => {
  const { controlActuator } = usePlant();

  const handleToggle = async () => {
    await controlActuator(actuator.id, 'toggle');
  };

  const getButtonColor = () => {
    if (actuator.active) {
      return 'active';
    }
    return 'inactive';
  };

  return (
    <div className="actuator-control">
      <div className="actuator-label">{actuator.name}</div>
      <div className="actuator-type">({actuator.type})</div>
      <button
        className={`actuator-button ${getButtonColor()}`}
        onClick={handleToggle}
      >
        {actuator.active ? 'ENCENDIDO' : 'APAGADO'}
      </button>
    </div>
  );
};
