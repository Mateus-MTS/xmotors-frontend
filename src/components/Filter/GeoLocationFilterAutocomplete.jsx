import React, { useEffect, useRef, useState } from 'react';
import { normalize, debounce } from './Utils/utils';
import { getCachedData, saveToCache } from './Utils/cacheService';
import * as LocationService from './Services/locationService';

const GeoLocationAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [placeholderLocation, setPlaceholderLocation] = useState('Buscando localização...');
  const [selectedValue, setSelectedValue] = useState('');
  const memoryCache = useRef([]);
  useEffect(() => {
    init();
    setupCurrentLocation();
  }, []);

  const init = async () => {
    const cachedData = getCachedData();
    if (cachedData) {
      memoryCache.current = cachedData;
      return;
    }

    const cities = await LocationService.fetchBrazilianCities();
    memoryCache.current = cities;
    saveToCache(cities);
  };

  const setupCurrentLocation = async () => {
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
      setPlaceholderLocation(err.message === 'User denied Geolocation'
        ? 'Permissão negada'
        : 'Erro ao obter localização');
    }
  };

  const handleBrazilianLocation = (data) => {
    const cidade = data.address.city || data.address.town || '';
    const estado = data.address.state || '';
    const country = data.address.country || '';

    const cidadeUF = LocationService.findLocationInCache(memoryCache.current, cidade, estado);
    const location = cidadeUF?.display_name || [cidade, estado, country].filter(Boolean).join(', ');

    setSelectedValue(location);
    setQuery(location);
    setPlaceholderLocation(location);
  };

  const handleSearch = (query) => {
    if (query === '') { return setPlaceholderLocation('Localização'); }

    const q = normalize(query);
    if (q.length < 1) return setSuggestions([]);

    // 🔍 Buscar nas cidades
    const cityResults = memoryCache.current.filter(item =>
      normalize(item.name).includes(q)
    );

    // 🔍 Buscar nos estados (code ou name)
    const stateResults = LocationService.States.filter(state =>
      normalize(state.name).includes(q) || normalize(state.code).startsWith(q)
    ).map(state => ({
      display_name: `${state.name} - UF`,
      name: state.name,
      state: state.code
    }));

    // Combinar tudo (evita duplicados)
    const combinedResults = [...stateResults, ...cityResults];

    setSuggestions(combinedResults.slice(0, 10));
  };

  const debouncedSearch = debounce(handleSearch, 300);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSuggestions([]);
    onSelect?.(item);
  };


  return (
    <div className="geo-autocomplete">
      <input
        type="text"
        placeholder={placeholderLocation}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedValue('');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            setSuggestions([]);
          }
        }}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((item, i) => (
            <li key={i} onClick={() => handleSelect(item)}>
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GeoLocationAutocomplete;