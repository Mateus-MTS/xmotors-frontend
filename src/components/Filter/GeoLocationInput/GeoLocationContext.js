import { createContext, useContext } from 'react';

// Contexto compartilhado para GeoLocation
const GeoLocationContext = createContext(null);

export const useGeoLocationContext = () => {
  const context = useContext(GeoLocationContext);
  if (!context) {
    throw new Error('useGeoLocationContext must be used within GeoLocationProvider');
  }
  return context;
};

export default GeoLocationContext;
