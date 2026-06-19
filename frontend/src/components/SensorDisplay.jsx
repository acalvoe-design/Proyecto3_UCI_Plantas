import React from 'react';
import './SensorDisplay.css';

export const SensorDisplay = ({ sensor }) => {
  return (
    <div className="sensor-display">
      <div className="sensor-label">{sensor.name}</div>
      <div className="sensor-value">
        {sensor.value?.toFixed(2)} {sensor.unit}
      </div>
      <div className={`sensor-status ${sensor.status}`}>
        {sensor.status}
      </div>
    </div>
  );
};
