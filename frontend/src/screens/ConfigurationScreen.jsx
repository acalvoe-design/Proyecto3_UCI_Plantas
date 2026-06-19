import React from 'react';
import { PlantConfig } from '../components/PlantConfig';
import './ConfigurationScreen.css';

export const ConfigurationScreen = () => {
  return (
    <div className="configuration-screen">
      <div className="card">
        <h1 className="card-title">Configuracion del Sistema</h1>
      </div>

      <div className="card">
        <PlantConfig />
      </div>

      <div className="card info-card">
        <h3 className="info-title">Informacion</h3>
        <p className="info-text">
          Aqui puedes configurar los parametros de tu planta. El sistema ajustara 
          automaticamente los actuadores segun el tipo y nivel de cuidado especificado.
        </p>
      </div>
    </div>
  );
};
