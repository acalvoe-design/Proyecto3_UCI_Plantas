/**
 * API Service Layer
 * Handles all communication with the Python backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Make an API request
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

/**
 * System endpoints
 */
export const systemAPI = {
  getStatus: () => apiRequest('/api/system/status'),
  initialize: () => apiRequest('/api/system/initialize', { method: 'POST' }),
  shutdown: () => apiRequest('/api/system/shutdown', { method: 'POST' }),
};

/**
 * Sensor endpoints
 */
export const sensorAPI = {
  getCurrentReadings: () => apiRequest('/api/sensors/current'),
  getHistory: (limit = 100) => apiRequest(`/api/sensors/history?limit=${limit}`),
};

/**
 * Actuator endpoints
 */
export const actuatorAPI = {
  getStatus: () => apiRequest('/api/actuators/status'),
  control: (actuatorId, action) =>
    apiRequest('/api/actuators/control', {
      method: 'POST',
      body: JSON.stringify({
        actuator_id: actuatorId,
        action: action, // 'activate', 'deactivate', 'toggle'
      }),
    }),
  activate: (actuatorId) => actuatorAPI.control(actuatorId, 'activate'),
  deactivate: (actuatorId) => actuatorAPI.control(actuatorId, 'deactivate'),
  toggle: (actuatorId) => actuatorAPI.control(actuatorId, 'toggle'),
};

/**
 * Plant configuration endpoints
 */
export const plantAPI = {
  getConfig: () => apiRequest('/api/plant/config'),
  updateConfig: (config) =>
    apiRequest('/api/plant/config', {
      method: 'POST',
      body: JSON.stringify(config),
    }),
};

/**
 * Automation rules endpoints
 */
export const rulesAPI = {
  getStatus: () => apiRequest('/api/rules/status'),
  toggle: () => apiRequest('/api/rules/toggle', { method: 'POST' }),
};

/**
 * Health check
 */
export const healthCheck = () => apiRequest('/health');
