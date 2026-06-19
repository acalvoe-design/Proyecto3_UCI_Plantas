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
      [name]: value,
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
            <label>Nivel de Cuidado:</label>
            <span>{plantConfig.care_level}</span>
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
          <label htmlFor="care_level">Nivel de Cuidado:</label>
          <select
            id="care_level"
            name="care_level"
            value={formData.care_level}
            onChange={handleChange}
          >
            <option value="bajo">Bajo</option>
            <option value="normal">Normal</option>
            <option value="alto">Alto</option>
          </select>
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
