import React, { useEffect, useRef, useState } from 'react';
// import './GeoLocationAutocomplete.scss';

const CACHE_KEY = 'ibge:brazil:municipios';
const EXPIRY_KEY = 'ibge:brazil:expiry';
const TTL = 1000 * 60 * 60 * 24; // 24h

const GeoLocationAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const memoryCache = useRef([]);
  const debounce = useRef(null);
  const [placeholderLocation, setPlaceholderLocation] = useState('Buscando localização...');
  const [selectedValue, setSelectedValue] = useState('');


  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const now = Date.now();
    const stored = localStorage.getItem(CACHE_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);

    if (stored && expiry && now < +expiry) {
      memoryCache.current = JSON.parse(stored);
      return;
    }

    const resEstados = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const ufs = await resEstados.json();

    const todos = [];
    for (const uf of ufs) {
      const resMun = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.sigla}/municipios`);
      const municipios = await resMun.json();
      municipios.forEach(m => {
        todos.push({
          display_name: `${m.nome}, ${uf.sigla}, Brasil`,
          name: m.nome,
          state: uf.sigla
        });
      });
    }

    memoryCache.current = todos;
    localStorage.setItem(CACHE_KEY, JSON.stringify(todos));
    localStorage.setItem(EXPIRY_KEY, String(now + TTL));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const location = [
            data.address.city || data.address.town || '',
            data.address.state || '',
            data.address.country || ''
          ]
            .filter(Boolean)
            .join(', ');

          if (data.address.country === 'Brazil' || data.address.country_code === 'br') {
            const cidade = data.address.city || data.address.town || '';
            const estado = data.address.state || '';
            const pais = data.address.country || '';

            const cidadeUF = memoryCache.current.find(loc =>
              normalize(loc.name) === normalize(cidade) &&
              normalize(loc.state) === normalize(estado)
            );

            const location = cidadeUF?.display_name || [cidade, estado, pais].filter(Boolean).join(', ');

            setSelectedValue(location);
            setQuery(location);
            setPlaceholderLocation(location);
          } else {
            setPlaceholderLocation('Fora do Brasil');
          }
        } catch (err) {
          console.error('Erro ao buscar localização:', err);
          setPlaceholderLocation('Erro ao obter localização');
        }
      },
      () => {
        setPlaceholderLocation('Permissão negada');
      }
    );
  }, []);

  useEffect(() => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      const q = normalize(query);
      if (q.length < 3) return setSuggestions([]);
      const results = memoryCache.current.filter(item => normalize(item.name).includes(q));
      setSuggestions(results.slice(0, 10));
    }, 300);
  }, [query]);

  const normalize = (str) => str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const handleSelect = (item) => {
    setQuery(item.display_name);
    setSuggestions([]);
    if (onSelect) onSelect(item);
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
