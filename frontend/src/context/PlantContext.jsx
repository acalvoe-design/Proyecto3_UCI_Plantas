import React, { createContext, useReducer, useCallback } from 'react';
import * as API from '../api/plantAPI';

export const PlantContext = createContext();

const initialState = {
  systemActive: false,
  currentSensorData: null,
  sensors: {},
  actuators: {},
  plantConfig: {
    name: 'Mi Planta',
    type: 'Desconocida',
    care_level: 'normal',
  },
  rulesEnabled: false,
  loading: false,
  error: null,
  lastUpdate: null,
};

function plantReducer(state, action) {
  switch (action.type) {
    case 'SET_SYSTEM_ACTIVE':
      return { ...state, systemActive: action.payload };
    
    case 'SET_SENSOR_DATA':
      return {
        ...state,
        currentSensorData: action.payload.latest_data,
        sensors: action.payload.sensors,
        lastUpdate: new Date(),
      };
    
    case 'SET_ACTUATORS':
      return {
        ...state,
        actuators: action.payload.actuators,
      };
    
    case 'SET_PLANT_CONFIG':
      return {
        ...state,
        plantConfig: action.payload,
      };
    
    case 'SET_RULES_ENABLED':
      return {
        ...state,
        rulesEnabled: action.payload,
      };
    
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'UPDATE_ACTUATOR':
      return {
        ...state,
        actuators: {
          ...state.actuators,
          [action.payload.id]: {
            ...state.actuators[action.payload.id],
            active: action.payload.active,
          },
        },
      };
    
    default:
      return state;
  }
}

export function PlantProvider({ children }) {
  const [state, dispatch] = useReducer(plantReducer, initialState);

  // Fetch system status
  const fetchSystemStatus = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const status = await API.systemAPI.getStatus();
      dispatch({ type: 'SET_SYSTEM_ACTIVE', payload: status.active });
      dispatch({
        type: 'SET_SENSOR_DATA',
        payload: {
          latest_data: status.current_data,
          sensors: status.sensors,
        },
      });
      dispatch({ type: 'SET_ACTUATORS', payload: { actuators: status.actuators } });
      dispatch({ type: 'SET_PLANT_CONFIG', payload: status.plant_config });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Initialize system
  const initializeSystem = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await API.systemAPI.initialize();
      await fetchSystemStatus();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [fetchSystemStatus]);

  // Shutdown system
  const shutdownSystem = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await API.systemAPI.shutdown();
      await fetchSystemStatus();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [fetchSystemStatus]);

  // Control actuator
  const controlActuator = useCallback(async (actuatorId, action) => {
    try {
      await API.actuatorAPI.control(actuatorId, action);
      await fetchSystemStatus();
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [fetchSystemStatus]);

  // Update plant config
  const updatePlantConfig = useCallback(async (config) => {
    try {
      const result = await API.plantAPI.updateConfig(config);
      dispatch({ type: 'SET_PLANT_CONFIG', payload: result.config });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Toggle rules
  const toggleRules = useCallback(async () => {
    try {
      const result = await API.rulesAPI.toggle();
      dispatch({ type: 'SET_RULES_ENABLED', payload: result.status === 'enabled' });
      dispatch({ type: 'SET_ERROR', payload: null });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  const value = {
    // State
    ...state,

    // Methods
    fetchSystemStatus,
    initializeSystem,
    shutdownSystem,
    controlActuator,
    updatePlantConfig,
    toggleRules,
  };

  return <PlantContext.Provider value={value}>{children}</PlantContext.Provider>;
}
