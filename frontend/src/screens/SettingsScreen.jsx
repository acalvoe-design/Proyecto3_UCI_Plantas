import React from 'react';
import { PlantConfig } from '../components/PlantConfig';
import './SettingsScreen.css';

export const SettingsScreen = () => {
  return (
    <div className="settings-screen">
      <div className="settings-container">
        <PlantConfig />
      </div>
    </div>
  );
};
