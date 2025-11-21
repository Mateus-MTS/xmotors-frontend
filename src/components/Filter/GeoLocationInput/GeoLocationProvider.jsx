/**
 * GeoLocationProvider - Provider para compartilhar dados de geolocalização
 *
 * Responsabilidades:
 * - Carregar cidades UMA ÚNICA VEZ
 * - Configurar localização inicial UMA ÚNICA VEZ
 * - Fornecer dados para todos os componentes GeoLocationInput
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useBrazilianCities } from './hooks/useBrazilianCities';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import logger from '../../../utils/logger';
import GeoLocationContext from './GeoLocationContext';

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
        setupInitialLocation
        } = useCurrentLocation(cities);

    // Configurar localização inicial UMA ÚNICA VEZ
    useEffect(() => {
        if (cities && !isInitialized) {
                logger.dataLoaded('Cidades carregadas no Provider', { count: cities.length });
                // Chamar setupInitialLocation do hook de localização, definido em useCurrentLocation.
                // Colocar a função async dentro do effect e incluir setupInitialLocation nas deps para
                // satisfazer o linter sem criar loops indesejados.
                (async () => {
                    const { location } = await setupInitialLocation();
                    if (location) {
                        setInitialLocation(location);
                        logger.info('Localização inicial salva no Provider (não aplicada)', { location });
                    }
                    setIsInitialized(true);
                })();
            }
        }, [cities, isInitialized, setupInitialLocation]);

    useEffect(() => {
        if (isError) {
            logger.error('Erro ao carregar cidades no Provider', error);
            setPlaceholderLocation('Erro ao carregar cidades');
        }
    }, [isError, error]);

    // Nota: a configuração inicial é feita no useEffect acima (setupInitialLocation é chamado lá)

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