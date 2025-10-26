import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { normalize, debounce } from '../../../utils/utils';
import { useBrazilianCities } from '../../../hooks/useBrazilianCities';
import { useDDDSearch } from '../../../hooks/useDDDSearch';
import * as LocationService from '../../../services/locationService';

const GeoLocationInput = ({ value, onChange }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [placeholderLocation, setPlaceholderLocation] = useState('Buscando localização...');
  const [dddQuery, setDddQuery] = useState(null);

  const { data: cities, isLoading, isError, error } = useBrazilianCities();
  const { data: dddData, isLoading: isDDDLoading, isFetched: isDDDFetched } = useDDDSearch(dddQuery);
  
  const inputRef = useRef();
  
  // ⭐ Usar ref para manter valor atualizado de cities
  const citiesRef = useRef(cities);
  const dddDataRef = useRef(dddData);
  const isDDDLoadingRef = useRef(isDDDLoading);
  const isDDDFetchedRef = useRef(isDDDFetched);
  const dddQueryRef = useRef(dddQuery);

  // Atualiza refs quando dados mudarem
  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  useEffect(() => {
    dddDataRef.current = dddData;
  }, [dddData]);

  useEffect(() => {
    isDDDLoadingRef.current = isDDDLoading;
  }, [isDDDLoading]);

  useEffect(() => {
    isDDDFetchedRef.current = isDDDFetched;
  }, [isDDDFetched]);

  useEffect(() => {
    dddQueryRef.current = dddQuery;
  }, [dddQuery]);

  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value);
      if (value === '') {
        setPlaceholderLocation('Busque por estado, região, DDD, zona, bairro ou cidade');
      }
    }
  }, [value]);

  useEffect(() => {
    if (cities) {
      console.log('✅ Cidades carregadas:', cities.length);
      setupCurrentLocation();
    }
  }, [cities]);

  useEffect(() => {
    if (isError) {
      console.error('❌ Erro ao carregar cidades:', error);
      setPlaceholderLocation('Erro ao carregar cidades');
    }
  }, [isError, error]);

  useEffect(() => {
    if (dddQuery && query === dddQuery && isDDDFetched) {
      console.log('🔄 Atualizando busca após DDD carregar');
      performSearch(query);
    }
  }, [dddData, isDDDFetched]);

  const setupCurrentLocation = async () => {
    if (!cities) return;

    try {
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      const data = await LocationService.reverseGeocode(latitude, longitude);

      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        handleBrazilianLocation(data);
      } else {
        setPlaceholderLocation('Fora do Brasil');
      }
    } catch (err) {
      console.error('Erro ao buscar localização:', err);
      setPlaceholderLocation('Busque por estado, região, DDD, zona, bairro ou cidade');
    }
  };

  const handleBrazilianLocation = (data) => {
    const cidade = data.address.city || data.address.town || '';
    const estado = data.address.state || '';

    const cidadeUF = LocationService.findLocationInCache(cities, cidade, estado);
    const location = cidadeUF?.display_name || `${cidade}, ${estado}`;

    setQuery(location);
    setPlaceholderLocation(location);
    
    if (onChange) {
      onChange(location);
    }
  };

  const performSearch = useCallback((searchQuery) => {
    console.log('🔎 performSearch chamado:', searchQuery);

    const currentCities = citiesRef.current;
    const currentDddData = dddDataRef.current;
    const currentIsDDDLoading = isDDDLoadingRef.current;
    const currentDddQuery = dddQueryRef.current;

    if (!searchQuery || searchQuery === '') {
      console.log('⚠️ Query vazia, limpando sugestões');
      setSuggestions([]);
      setShowOptions(false);
      setDddQuery(null);
      return;
    }

    if (!currentCities || currentCities.length === 0) {
      console.log('⚠️ Cidades ainda não carregadas');
      return;
    }

    console.log('✅ Cidades disponíveis:', currentCities.length);

    const q = normalize(searchQuery);
    const queryLength = q.length;

    let results = [];

    // ⭐ 1. Busca DDD - APENAS RESUMO DA REGIÃO
    if (/^\d{2}$/.test(searchQuery)) {
      console.log('🔢 Detectou DDD:', searchQuery);
      
      if (currentDddQuery !== searchQuery) {
        console.log('🚀 Disparando busca de DDD');
        setDddQuery(searchQuery);
      }
      
      if (currentIsDDDLoading) {
        console.log('⏳ DDD carregando...');
        results.push({
          display_name: `🔍 Buscando DDD ${searchQuery}...`,
          isLoading: true,
          priority: 0
        });
      }
      
      // ⭐ MUDANÇA: Mostra apenas UM resultado resumido da região
      if (currentDddData && currentDddData.state && currentDddData.region) {
        console.log('✅ Dados do DDD disponíveis');
        
        // Busca nome completo do estado
        const stateInfo = LocationService.States.find(s => s.code === currentDddData.state);
        const stateName = stateInfo ? stateInfo.name : currentDddData.state;
        
        results = [
          {
            display_name: stateName,
            display_subtitle: `DDD ${searchQuery} - ${currentDddData.region}`,
            name: stateName,
            state: currentDddData.state,
            ddd: searchQuery,
            region: currentDddData.region,
            isDDD: true,
            isDDDSummary: true, // ⭐ Flag para identificar que é resumo
            priority: 1
          }
        ];
      }
    } else {
      if (currentDddQuery !== null) {
        setDddQuery(null);
      }
    }

    // ⭐ 2. Busca por código de estado
    if (queryLength === 2 && /^[A-Za-z]{2}$/.test(searchQuery) && !(/^\d{2}$/.test(searchQuery))) {
      const stateCode = searchQuery.toUpperCase();
      const exactState = LocationService.States.find(s => s.code === stateCode);
      
      if (exactState) {
        console.log('🏛️ Estado encontrado:', exactState.name);
        results.push({
          display_name: `${exactState.name} - ${exactState.code}`,
          name: exactState.name,
          state: exactState.code,
          region: exactState.region,
          isState: true,
          priority: 2
        });
      }
    }

    // ⭐ 3. Busca por nome de estado
    if (queryLength >= 1 && !/^\d+$/.test(searchQuery)) {
      const stateResults = LocationService.States.filter(state => {
        const stateName = normalize(state.name);
        const stateCode = normalize(state.code);
        
        if (queryLength <= 2) {
          return stateName.startsWith(q) || stateCode.startsWith(q);
        } else {
          return stateName.includes(q);
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      .map(state => ({
        display_name: `${state.name} - ${state.code}`,
        name: state.name,
        state: state.code,
        region: state.region,
        isState: true,
        priority: 3
      }));

      if (stateResults.length > 0) {
        console.log('🏛️ Estados encontrados:', stateResults.length);
      }

      results = [...results, ...stateResults];
    }

    // ⭐ 4. Busca por região
    if (queryLength >= 3 && !/^\d+$/.test(searchQuery)) {
      const regionResults = LocationService.Regions.filter(region =>
        normalize(region.name).includes(q)
      ).map(region => ({
        display_name: `Região ${region.name}`,
        name: region.name,
        isRegion: true,
        states: region.states,
        priority: 4
      }));

      if (regionResults.length > 0) {
        console.log('🗺️ Regiões encontradas:', regionResults.length);
      }

      results = [...results, ...regionResults];
    }

    // ⭐ 5. Busca por cidades
    if (queryLength >= 3 && !/^\d+$/.test(searchQuery)) {
      const cityResults = currentCities
        .filter(item => normalize(item.name).includes(q))
        .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
        .slice(0, 20)
        .map(city => ({
          ...city,
          priority: 5
        }));

      if (cityResults.length > 0) {
        console.log('🏙️ Cidades encontradas:', cityResults.length);
      }

      results = [...results, ...cityResults];
    }

    // Remove duplicatas
    const uniqueResults = results.reduce((acc, current) => {
      const key = current.display_name + (current.display_subtitle || '');
      const exists = acc.find(item => 
        (item.display_name + (item.display_subtitle || '')) === key
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    uniqueResults.sort((a, b) => (a.priority || 999) - (b.priority || 999));
    
    const finalResults = uniqueResults.slice(0, 15);
    
    console.log('📊 Resultados finais:', finalResults.length, finalResults);
    
    setSuggestions(finalResults);
    setShowOptions(false);
  }, []);

  // ⭐ Debounce criado uma vez só
  const debouncedSearch = useRef(
    debounce((query) => performSearch(query), 300)
  ).current;

  const handleSelect = (item) => {
    if (item.isLoading) return;
    
    let displayValue;
    
    // ⭐ MUDANÇA: Tratamento especial para resumo de DDD
    if (item.isDDDSummary) {
      // Para resumo de DDD, mostra: "Rio Grande do Sul - DDD 54"
      displayValue = `${item.display_name} - DDD ${item.ddd}`;
    } else if (item.isDDD) {
      // Para cidade específica de DDD (caso use no futuro)
      displayValue = `${item.display_name}, ${item.state}`;
    } else {
      displayValue = item.display_name;
    }
    
    setQuery(displayValue);
    setSuggestions([]);
    setShowOptions(false);
    setDddQuery(null);
    
    if (onChange) {
      onChange(displayValue);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    console.log('⌨️ Input mudou:', newValue);
    setQuery(newValue);
    
    debouncedSearch(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    console.log('👁️ Input focado, query:', query);
    if (query === '') {
      setShowOptions(true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setSuggestions([]);
      setShowOptions(false);
      setDddQuery(null);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setShowOptions(false);
      setDddQuery(null);
    }
  };

  const handleMyRegion = async () => {
    setShowOptions(false);
    try {
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      const data = await LocationService.reverseGeocode(latitude, longitude);
      
      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        const cidade = data.address.city || data.address.town || '';
        const estado = data.address.state || '';
        
        const cidadeUF = LocationService.findLocationInCache(cities, cidade, estado);
        const location = cidadeUF?.display_name || `${cidade}, ${estado}`;
        
        setQuery(location);
        if (onChange) onChange(location);
      }
    } catch (err) {
      console.error('Erro ao obter localização:', err);
    }
  };

  const handleMyState = async () => {
    setShowOptions(false);
    try {
      const position = await LocationService.getCurrentLocation();
      const { coords: { latitude, longitude } } = position;
      const data = await LocationService.reverseGeocode(latitude, longitude);
      
      if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
        const estado = data.address.state || '';
        const stateInfo = LocationService.States.find(s => 
          normalize(s.name) === normalize(estado)
        );
        
        const location = stateInfo ? `${stateInfo.name} - ${stateInfo.code}` : estado;
        
        setQuery(location);
        if (onChange) onChange(location);
      }
    } catch (err) {
      console.error('Erro ao obter localização:', err);
    }
  };

  const handleAllBrazil = () => {
    setShowOptions(false);
    setQuery('Em todo Brasil');
    if (onChange) onChange('Em todo Brasil');
  };

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
      
      {showOptions && !isLoading && (
        <div className="location-options">
          <span className="options-title">Localização automática</span>
          <div className="options-buttons">
            <button 
              type="button"
              className="option-btn active"
              onClick={handleMyRegion}
            >
              Na minha região
            </button>
            <button 
              type="button"
              className="option-btn"
              onClick={handleMyState}
            >
              No meu estado
            </button>
            <button 
              type="button"
              className="option-btn"
              onClick={handleAllBrazil}
            >
              Em todo Brasil
            </button>
          </div>
        </div>
      )}
      
      {suggestions.length > 0 && !showOptions && (
        <ul 
          className="suggestions"
          role="listbox"
          aria-label="Sugestões de localização"
        >
          {suggestions.map((item, i) => (
            <li 
              key={`${item.state || item.ddd || 'item'}-${item.name || i}-${i}`}
              onClick={() => handleSelect(item)}
              role="option"
              aria-selected={false}
              className={
                item.isLoading ? 'suggestion-loading' :
                item.isDDD ? 'suggestion-ddd' :
                item.isState ? 'suggestion-state' :
                item.isRegion ? 'suggestion-region' :
                'suggestion-city'
              }
              style={item.isLoading ? { cursor: 'default', opacity: 0.7 } : {}}
            >
              {item.isDDD ? (
                <div className="suggestion-ddd-content">
                  <div className="city-name">{item.display_name}</div>
                  <div className="ddd-region">{item.display_subtitle}</div>
                </div>
              ) : (
                item.display_name
              )}
            </li>
          ))}
        </ul>
      )}
      
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