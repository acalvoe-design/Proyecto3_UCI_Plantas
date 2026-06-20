import { useContext } from 'react';
import { PlantContext } from '../context/PlantContext';

export function usePlant() {
  const context = useContext(PlantContext);
  
  if (!context) {
    throw new Error('usePlant must be used within PlantProvider');
  }
  
  return context;
}
