/**
 * Hook para Geolocalização do Usuário
 * 
 * Responsabilidades:
 * - Obter localização atual do usuário
 * - Fazer geocoding reverso
 * - Gerenciar estados de loading/error
 * - Formatar localização brasileira
 */

import { useState, useCallback } from 'react';
import { normalize } from '../../../../utils/utils';
import * as LocationService from '../../../../services/locationService';
import logger from '../../../../utils/logger';

/**
 * Hook para gerenciar a localização atual do usuário
 */
export const useCurrentLocation = (cities) => {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  /**
   * Formata uma localização brasileira
   */
  const formatBrazilianLocation = useCallback((data) => {
    const cidade = data.address.city || data.address.town || '';
    const estado = data.address.state || '';

    const cidadeUF = LocationService.findLocationInCache(cities, cidade, estado);
    return cidadeUF?.display_name || `${cidade}, ${estado}`;
  }, [cities]);

  /**
   * Busca nome completo do estado
   */
  const getStateName = useCallback((estadoNome) => {
    const stateInfo = LocationService.States.find(s => 
      normalize(s.name) === normalize(estadoNome)
    );
    
    return stateInfo ? `${stateInfo.name} - ${stateInfo.code}` : estadoNome;
  }, []);

  /**
   * Obtém a localização atual (cidade/região)
   */
  const getCurrentRegion = useCallback(async () => {
    if (!cities || cities.length === 0) {
      logger.warn('Cidades não carregadas para getCurrentRegion');
      return null;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      logger.location('Iniciando busca de região atual');
      
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      
      logger.locationSuccess('Posição obtida', { latitude, longitude });
      
      const data = await LocationService.reverseGeocode(latitude, longitude);
      
      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        const location = formatBrazilianLocation(data);
        logger.locationSuccess('Região brasileira identificada', { location });
        return location;
      } else {
        logger.warn('Localização fora do Brasil', { country: data.address.country });
        return null;
      }
    } catch (err) {
      logger.error('Erro ao obter região atual', err);
      setLocationError(err);
      return null;
    } finally {
      setIsLoadingLocation(false);
    }
  }, [cities, formatBrazilianLocation]);

  /**
   * Obtém o estado atual
   */
  const getCurrentState = useCallback(async () => {
    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      logger.location('Iniciando busca de estado atual');
      
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      
      logger.locationSuccess('Posição obtida', { latitude, longitude });
      
      const data = await LocationService.reverseGeocode(latitude, longitude);
      
      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        const estado = data.address.state || '';
        const location = getStateName(estado);
        logger.locationSuccess('Estado brasileiro identificado', { location });
        return location;
      } else {
        logger.warn('Localização fora do Brasil', { country: data.address.country });
        return null;
      }
    } catch (err) {
      logger.error('Erro ao obter estado atual', err);
      setLocationError(err);
      return null;
    } finally {
      setIsLoadingLocation(false);
    }
  }, [getStateName]);

  /**
   * Configura localização inicial ao carregar o componente
   */
  const setupInitialLocation = useCallback(async () => {
    if (!cities || cities.length === 0) {
      logger.warn('Cidades não disponíveis para setup inicial');
      return {
        location: null,
        placeholder: 'Busque por estado, região, DDD, zona, bairro ou cidade'
      };
    }

    try {
      logger.location('Configurando localização inicial');
      
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      
      const data = await LocationService.reverseGeocode(latitude, longitude);

      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        const location = formatBrazilianLocation(data);
        logger.locationSuccess('Localização inicial configurada', { location });
        
        return {
          location,
          placeholder: location
        };
      } else {
        logger.info('Usuário fora do Brasil');
        return {
          location: null,
          placeholder: 'Fora do Brasil'
        };
      }
    } catch (err) {
      logger.error('Erro no setup inicial', err);
      return {
        location: null,
        placeholder: 'Busque por estado, região, DDD, zona, bairro ou cidade'
      };
    }
  }, [cities, formatBrazilianLocation]);

  return {
    getCurrentRegion,
    getCurrentState,
    setupInitialLocation,
    isLoadingLocation,
    locationError
  };
};

export default useCurrentLocation;