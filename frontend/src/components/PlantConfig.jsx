import React, { useState } from 'react';
import { usePlant } from '../hooks/usePlant';
import './PlantConfig.css';

export const PlantConfig = () => {
  const { plantConfig, updatePlantConfig } = usePlant();
  const [formData, setFormData] = useState(plantConfig);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: isNaN(value) ? value : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePlantConfig(formData);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="plant-config">
        <div className="config-header">
          <h2>Configuración de Planta</h2>
          <button onClick={() => setIsEditing(true)} className="edit-btn">
            Editar
          </button>
        </div>
        <div className="config-display">
          <div className="config-item">
            <label>Nombre:</label>
            <span>{plantConfig.name}</span>
          </div>
          <div className="config-item">
            <label>Tipo:</label>
            <span>{plantConfig.type}</span>
          </div>
          <div className="config-item">
            <label>Temperatura Máxima:</label>
            <span>{plantConfig.temp_max || 28}°C</span>
          </div>
          <div className="config-item">
            <label>Humedad Mínima:</label>
            <span>{plantConfig.humidity_min || 40}%</span>
          </div>
          <div className="config-item">
            <label>Humedad Máxima:</label>
            <span>{plantConfig.humidity_max || 85}%</span>
          </div>
          <div className="config-item">
            <label>Luz Mínima:</label>
            <span>{plantConfig.light_min || 1000} lux</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="plant-config">
      <div className="config-header">
        <h2>Editar Configuración</h2>
      </div>
      <form onSubmit={handleSubmit} className="config-form">
        <div className="form-group">
          <label htmlFor="name">Nombre de la Planta:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo de Planta:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="temp_max">Temperatura Máxima para Activar Ventilador (°C):</label>
          <input
            type="number"
            id="temp_max"
            name="temp_max"
            value={formData.temp_max || 28}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="50"
          />
        </div>
        <div className="form-group">
          <label htmlFor="humidity_min">Humedad Mínima del Aire (%):</label>
          <input
            type="number"
            id="humidity_min"
            name="humidity_min"
            value={formData.humidity_min || 40}
            onChange={handleChange}
            step="1"
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="humidity_max">Humedad Máxima del Aire (%):</label>
          <input
            type="number"
            id="humidity_max"
            name="humidity_max"
            value={formData.humidity_max || 85}
            onChange={handleChange}
            step="1"
            min="0"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="light_min">Luz Mínima Requerida (lux):</label>
          <input
            type="number"
            id="light_min"
            name="light_min"
            value={formData.light_min || 1000}
            onChange={handleChange}
            step="100"
            min="0"
            max="10000"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Guardar
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setFormData(plantConfig);
              setIsEditing(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};
