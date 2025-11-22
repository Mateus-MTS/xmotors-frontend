/**
 * GeoLocationInput - Componente Principal (Otimizado)
 * 
 * Agora consome dados do Provider ao invés de carregá-los
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from '../../../utils/utils';
import { useGeoLocationContext } from './GeoLocationContext';
import { useGeoLocationSearch } from './hooks/useGeoLocationSearch';
import LocationOptions from './components/LocationOptions';
import SuggestionsList from './components/SuggestionsList';
import logger from '../../../utils/logger';
import useTouchInput from '../../../hooks/useTouchInput';

const GeoLocationInput = ({ value, onChange }) => {
  // ============================================
  // CONTEXTO - Dados compartilhados
  // ============================================
  const {
    cities,
    isLoading,
    isError,
    initialLocation,
    getCurrentRegion,
    getCurrentState
  } = useGeoLocationContext();

  // ============================================
  // ESTADOS
  // ============================================
  const [query, setQuery] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [pendingSelectByDDD, setPendingSelectByDDD] = useState(null);

  // ============================================
  // REFS
  // ============================================
  const inputRef = useRef();

  // ============================================
  // HOOKS CUSTOMIZADOS
  // ============================================
  const {
    suggestions,
    performSearch,
    clearSearch,
    clearSuggestions
  } = useGeoLocationSearch(cities);

  // ⭐ HOOK DE TOUCH INPUT - Chamado após refs e antes dos effects
  // Posição ideal: depois de todas as refs estarem criadas
  useTouchInput(inputRef, { doubleTapMs: 350 });

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
    }
  }, [value, query]);

  // ============================================
  // HANDLERS - Input
  // ============================================
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    logger.input('Input mudou', { newValue });

    if (!hasInitialized) {
      setHasInitialized(true);
    }

    setQuery(newValue);
    // Se o usuário começar a digitar, garantir que o dropdown de botões feche
    // e que as sugestões sejam exibidas.
    if (showOptions) {
      setShowOptions(false);
    }
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

  // Mostrar o dropdown de botões quando o usuário faz mousedown (botão esquerdo)
  // mesmo que exista texto no input. Digitar no input fechará o dropdown de
  // botões e exibirá as sugestões.
  const handleMouseDown = (e) => {
    if (e && e.button === 0) {
      setShowOptions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ukey === 'Enter') {
      e.preventDefault();
      clearSuggestions();
      setShowOptions(false);
    } else if (e.key === 'Escape') {
      clearSearch();
      setShowOptions(false);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
      clearSuggestions();
    }, 150);
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
      displayValue = `${item.display_subtitle}`;
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
    // Mostrar sugestões (esconder opções de botão). Se encontrarmos DDD,
    // vamos disparar a busca por DDD e automaticamente selecionar quando o
    // resultado do DDD estiver disponível.
    setShowOptions(false);

    // Buscar o DDD da localização atual
    if (initialLocation && cities) {
      // Extrair cidade da localização (formato: "Cidade, Estado")
      const cityName = initialLocation.split(',')[0].trim();

      // Buscar a cidade nos dados
      const city = cities.find(c => c.name === cityName);

      if (city && city.ddd) {
        const dddQuery = city.ddd;
        setQuery(dddQuery);
        // Marcar que estamos aguardando seleção automática por esse DDD
        setPendingSelectByDDD(dddQuery);
        performSearch(dddQuery);
        if (onChange) onChange(dddQuery);
        logger.info('Busca por DDD da região', { ddd: city.ddd });
        return;
      }
    }

    // Fallback: usar a localização completa
    const location = await getCurrentRegion();
    if (location) {
      setQuery(location);
      if (onChange) onChange(location);
    }
  };

  // Quando as sugestões mudam e temos uma seleção pendente por DDD,
  // auto-selecionar o item DDD (resumo) assim que aparecer.
  useEffect(() => {
    if (!pendingSelectByDDD) return;
    if (!suggestions || suggestions.length === 0) return;

    const match = suggestions.find(s => s.isDDDSummary || s.isDDD || (s.display_subtitle && s.display_subtitle === pendingSelectByDDD));
    if (match) {
      handleSelect(match);
      setPendingSelectByDDD(null);
    }
  }, [suggestions, pendingSelectByDDD]);

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
        placeholder={isLoading ? 'Carregando cidades...' : 'Busque por DDD, Cidade ou Estado'}
        value={query}
        onChange={handleInputChange}
        onMouseDown={handleMouseDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
        // Mostrar sugestões sempre que houver resultados; se o usuário
        // tiver o dropdown de botões aberto e começar a digitar, o
        // `handleInputChange` fecha esse dropdown e as sugestões aparecem.
        visible={suggestions && suggestions.length > 0}
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