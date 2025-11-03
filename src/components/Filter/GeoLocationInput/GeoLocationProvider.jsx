/**
 * GeoLocationProvider - Provider para compartilhar dados de geolocalização
 * 
 * Responsabilidades:
 * - Carregar cidades UMA ÚNICA VEZ
 * - Configurar localização inicial UMA ÚNICA VEZ
 * - Fornecer dados para todos os componentes GeoLocationInput
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBrazilianCities } from './hooks/useBrazilianCities';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import logger from '../../../utils/logger';

// Criar o contexto
const GeoLocationContext = createContext(null);

// Hook para usar o contexto
export const useGeoLocationContext = () => {
    const context = useContext(GeoLocationContext);
    if (!context) {
        throw new Error('useGeoLocationContext must be used within GeoLocationProvider');
    }
    return context;
};

// Provider
export const GeoLocationProvider = ({ children }) => {
    const [placeholderLocation, setPlaceholderLocation] = useState('Buscando localização...');
    const [initialLocation, setInitialLocation] = useState('');
    const [isInitialized, setIsInitialized] = useState(false);

    // Carregar cidades UMA ÚNICA VEZ
    const { data: cities, isLoading, isError, error } = useBrazilianCities();

    // Hook de localização atual
    const {
        getCurrentRegion,
        getCurrentState,
        setupInitialLocation,
        isLoadingLocation
    } = useCurrentLocation(cities);

    // Configurar localização inicial UMA ÚNICA VEZ
    useEffect(() => {
        if (cities && !isInitialized) {
            logger.dataLoaded('Cidades carregadas no Provider', { count: cities.length });
            setupInitialLocationAsync();
        }
    }, [cities, isInitialized]);

    useEffect(() => {
        if (isError) {
            logger.error('Erro ao carregar cidades no Provider', error);
            setPlaceholderLocation('Erro ao carregar cidades');
        }
    }, [isError, error]);

    // REMOVER o setState de initialLocation
    const setupInitialLocationAsync = async () => {
        const { location, placeholder } = await setupInitialLocation();

        // Apenas guardar a localização, não aplicar
        if (location) {
            setInitialLocation(location);
            // REMOVER: setPlaceholderLocation(placeholder);
            logger.info('Localização inicial salva no Provider (não aplicada)', { location });
        }

        setIsInitialized(true);
    };

    const value = {
        // Dados compartilhados
        cities,
        isLoading,
        isError,
        error,
        placeholderLocation,
        initialLocation,
        isInitialized,

        // Funções de localização
        getCurrentRegion,
        getCurrentState
    };

    return (
        <GeoLocationContext.Provider value={value}>
            {children}
        </GeoLocationContext.Provider>
    );
};

GeoLocationProvider.propTypes = {
    children: PropTypes.node.isRequired
};