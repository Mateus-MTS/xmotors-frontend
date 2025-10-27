/**
 * GeoLocationInput - Componente Principal
 * 
 * Responsabilidades:
 * - Orquestrar todos os subcomponentes
 * - Gerenciar estado do input
 * - Coordenar busca e seleção
 * - Interface entre props e lógica interna
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../../utils/utils';
import { useBrazilianCities } from './hooks/useBrazilianCities';
import { useGeoLocationSearch } from './hooks/useGeoLocationSearch';
import { useCurrentLocation } from './hooks/useCurrentLocation';
import LocationOptions from './components/LocationOptions';
import SuggestionsList from './components/SuggestionsList';
import logger from '../../../utils/logger';

const GeoLocationInput = ({ value, onChange }) => {
  // ============================================
  // ESTADOS
  // ============================================
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [placeholderLocation, setPlaceholderLocation] = useState('Buscando localização...');

  // ============================================
  // HOOKS CUSTOMIZADOS
  // ============================================
  const { data: cities, isLoading, isError, error } = useBrazilianCities();
  
  const {
    suggestions,
    performSearch,
    clearSearch,
    clearSuggestions
  } = useGeoLocationSearch(cities);

  const {
    getCurrentRegion,
    getCurrentState,
    setupInitialLocation,
    isLoadingLocation
  } = useCurrentLocation(cities);

  // ============================================
  // REFS
  // ============================================
  const inputRef = useRef();
  
  // Debounce criado uma vez só
  const debouncedSearch = useRef(
    debounce((query) => performSearch(query), 300)
  ).current;

  // ============================================
  // EFFECTS - Sincronização com props
  // ============================================
  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value);
      if (value === '') {
        setPlaceholderLocation('Busque por estado, região, DDD, zona, bairro ou cidade');
      }
    }
  }, [value, query]);

  // ============================================
  // EFFECTS - Carregamento de dados
  // ============================================
  useEffect(() => {
    if (cities) {
      logger.dataLoaded('Cidades carregadas', { count: cities.length });
      setupInitialLocationAsync();
    }
  }, [cities]);

  useEffect(() => {
    if (isError) {
      logger.error('Erro ao carregar cidades', error);
      setPlaceholderLocation('Erro ao carregar cidades');
    }
  }, [isError, error]);

  // ============================================
  // HANDLERS - Setup inicial
  // ============================================
  const setupInitialLocationAsync = async () => {
    const { location, placeholder } = await setupInitialLocation();
    
    if (location) {
      setQuery(location);
      setPlaceholderLocation(placeholder);
      
      if (onChange) {
        onChange(location);
      }
    } else {
      setPlaceholderLocation(placeholder);
    }
  };

  // ============================================
  // HANDLERS - Input
  // ============================================
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    logger.input('Input mudou', { newValue });
    
    setQuery(newValue);
    debouncedSearch(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    logger.focus('Input focado', { query });
    
    if (query === '') {
      setShowOptions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      clearSuggestions();
      setShowOptions(false);
    } else if (e.key === 'Escape') {
      clearSearch();
      setShowOptions(false);
    }
  };

  // ============================================
  // HANDLERS - Seleção
  // ============================================
  const handleSelect = (item) => {
    if (item.isLoading) return;
    
    logger.info('Item selecionado', { item });
    
    let displayValue;
    
    // Tratamento especial para resumo de DDD
    if (item.isDDDSummary) {
      displayValue = `${item.display_name} - DDD ${item.ddd}`;
    } else if (item.isDDD) {
      displayValue = `${item.display_name}, ${item.state}`;
    } else {
      displayValue = item.display_name;
    }
    
    setQuery(displayValue);
    clearSearch();
    setShowOptions(false);
    
    if (onChange) {
      onChange(displayValue);
    }
  };

  // ============================================
  // HANDLERS - Botões de localização
  // ============================================
  const handleMyRegion = async () => {
    logger.info('Botão "Minha região" clicado');
    setShowOptions(false);
    
    const location = await getCurrentRegion();
    if (location) {
      setQuery(location);
      if (onChange) onChange(location);
    }
  };

  const handleMyState = async () => {
    logger.info('Botão "Meu estado" clicado');
    setShowOptions(false);
    
    const location = await getCurrentState();
    if (location) {
      setQuery(location);
      if (onChange) onChange(location);
    }
  };

  const handleAllBrazil = () => {
    logger.info('Botão "Todo Brasil" clicado');
    setShowOptions(false);
    setQuery('Em todo Brasil');
    if (onChange) onChange('Em todo Brasil');
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="geo-autocomplete">
      <input
        ref={inputRef}
        type="text"
        placeholder={isLoading ? 'Carregando cidades...' : placeholderLocation}
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        aria-label="Localização"
        aria-autocomplete="list"
        aria-expanded={suggestions.length > 0 || showOptions}
      />
      
      <LocationOptions
        visible={showOptions}
        onMyRegion={handleMyRegion}
        onMyState={handleMyState}
        onAllBrazil={handleAllBrazil}
        isLoading={isLoading}
      />
      
      <SuggestionsList
        suggestions={suggestions}
        onSelect={handleSelect}
        visible={!showOptions}
      />
      
      {isError && (
        <div className="error-message">
          Erro ao carregar cidades. Tente novamente.
        </div>
      )}
    </div>
  );
};

GeoLocationInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
};

GeoLocationInput.defaultProps = {
  value: undefined,
  onChange: null
};

export default GeoLocationInput;