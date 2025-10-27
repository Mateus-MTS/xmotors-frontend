# Exemplos de Uso - GeoLocationInput Refatorado

## 📚 Índice
1. [Usar o Componente Principal](#usar-o-componente-principal)
2. [Usar Hooks Isoladamente](#usar-hooks-isoladamente)
3. [Usar Helpers de Busca](#usar-helpers-de-busca)
4. [Usar o Logger](#usar-o-logger)
5. [Customizar Componentes](#customizar-componentes)
6. [Debugging](#debugging)

---

## 1. Usar o Componente Principal

### Uso Básico (Controlado)

```javascript
import React, { useState } from 'react';
import GeoLocationInput from './components/Filter/GeoLocationInput';

function MyForm() {
  const [location, setLocation] = useState('');

  return (
    <form>
      <GeoLocationInput
        value={location}
        onChange={setLocation}
      />
      <p>Localização selecionada: {location}</p>
    </form>
  );
}
```

### Uso Não-Controlado

```javascript
import React from 'react';
import GeoLocationInput from './components/Filter/GeoLocationInput';

function MyForm() {
  const handleLocationChange = (newLocation) => {
    console.log('Nova localização:', newLocation);
    // Enviar para API, atualizar filtros, etc
  };

  return (
    <GeoLocationInput onChange={handleLocationChange} />
  );
}
```

### Uso com Formulário Complexo

```javascript
import React, { useState } from 'react';
import GeoLocationInput from './components/Filter/GeoLocationInput';

function FilterForm() {
  const [filters, setFilters] = useState({
    location: '',
    price: [0, 1000],
    category: ''
  });

  const handleLocationChange = (location) => {
    setFilters(prev => ({
      ...prev,
      location
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Filtros aplicados:', filters);
    // Buscar resultados com filtros
  };

  return (
    <form onSubmit={handleSubmit}>
      <GeoLocationInput
        value={filters.location}
        onChange={handleLocationChange}
      />
      {/* Outros filtros... */}
      <button type="submit">Buscar</button>
    </form>
  );
}
```

---

## 2. Usar Hooks Isoladamente

### useGeoLocationSearch

Útil se quiser criar sua própria UI:

```javascript
import React, { useState, useRef } from 'react';
import { useGeoLocationSearch } from './components/Filter/GeoLocationInput/hooks/useGeoLocationSearch';
import { useBrazilianCities } from './hooks/useBrazilianCities';
import { debounce } from './utils/utils';

function CustomLocationSearch() {
  const [query, setQuery] = useState('');
  const { data: cities } = useBrazilianCities();
  
  const {
    suggestions,
    performSearch,
    clearSearch
  } = useGeoLocationSearch(cities);

  const debouncedSearch = useRef(
    debounce((q) => performSearch(q), 300)
  ).current;

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleChange}
        placeholder="Buscar localização..."
      />
      <ul>
        {suggestions.map((item, i) => (
          <li key={i}>{item.display_name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### useCurrentLocation

Útil para obter localização sem UI de busca:

```javascript
import React, { useEffect, useState } from 'react';
import { useCurrentLocation } from './components/Filter/GeoLocationInput/hooks/useCurrentLocation';
import { useBrazilianCities } from './hooks/useBrazilianCities';

function LocationDetector() {
  const { data: cities } = useBrazilianCities();
  const [location, setLocation] = useState(null);
  
  const {
    getCurrentRegion,
    getCurrentState,
    isLoadingLocation
  } = useCurrentLocation(cities);

  useEffect(() => {
    if (cities) {
      detectLocation();
    }
  }, [cities]);

  const detectLocation = async () => {
    const region = await getCurrentRegion();
    setLocation(region);
  };

  const detectState = async () => {
    const state = await getCurrentState();
    setLocation(state);
  };

  if (isLoadingLocation) {
    return <p>Detectando localização...</p>;
  }

  return (
    <div>
      <p>Sua localização: {location || 'Não detectada'}</p>
      <button onClick={detectLocation}>Detectar Região</button>
      <button onClick={detectState}>Detectar Estado</button>
    </div>
  );
}
```

---

## 3. Usar Helpers de Busca

### Buscar Cidades Programaticamente

```javascript
import { searchCities } from './components/Filter/GeoLocationInput/utils/searchHelpers';
import { useBrazilianCities } from './hooks/useBrazilianCities';

function FindCities() {
  const { data: cities } = useBrazilianCities();

  const handleSearch = () => {
    const results = searchCities('Porto', cities);
    console.log('Cidades encontradas:', results);
    // results = [
    //   { name: 'Porto Alegre', state: 'RS', ... },
    //   { name: 'Porto Feliz', state: 'SP', ... },
    //   ...
    // ]
  };

  return <button onClick={handleSearch}>Buscar "Porto"</button>;
}
```

### Validar Padrões

```javascript
import {
  isDDDPattern,
  isStateCodePattern,
  isNumericOnly
} from './components/Filter/GeoLocationInput/utils/searchHelpers';

function validateInput(input) {
  if (isDDDPattern(input)) {
    console.log('É um DDD válido:', input);
    // input = "51", "11", "21", etc
  }
  
  if (isStateCodePattern(input)) {
    console.log('É um código de estado:', input);
    // input = "RS", "SP", "RJ", etc
  }
  
  if (isNumericOnly(input)) {
    console.log('Contém apenas números:', input);
  }
}

// Exemplos
validateInput('51');    // DDD válido + numérico
validateInput('RS');    // Código de estado
validateInput('Porto'); // Nenhum padrão especial
```

### Processar Resultados Manualmente

```javascript
import {
  removeDuplicates,
  sortByPriority,
  limitResults,
  processResults
} from './components/Filter/GeoLocationInput/utils/searchHelpers';

function processSearchResults(rawResults) {
  // Opção 1: Pipeline completo
  const finalResults = processResults(rawResults, 10);
  
  // Opção 2: Passo a passo
  let results = removeDuplicates(rawResults);
  results = sortByPriority(results);
  results = limitResults(results, 10);
  
  return results;
}
```

---

## 4. Usar o Logger

### Setup Básico

```javascript
import logger from './utils/logger';

// No início da aplicação (ex: App.js ou index.js)
if (process.env.NODE_ENV === 'production') {
  logger.disable();
} else {
  logger.setLevel('DEBUG');
}
```

### Em Componentes

```javascript
import React, { useEffect } from 'react';
import logger from './utils/logger';

function MyComponent() {
  useEffect(() => {
    logger.info('Componente montado');
    
    return () => {
      logger.info('Componente desmontado');
    };
  }, []);

  const handleClick = () => {
    logger.debug('Botão clicado');
    // lógica...
  };

  return <button onClick={handleClick}>Clique</button>;
}
```

### Em Funções Assíncronas

```javascript
import logger from './utils/logger';

async function fetchData() {
  logger.info('Iniciando busca de dados');
  
  try {
    logger.debug('Fazendo requisição...');
    const response = await fetch('/api/data');
    const data = await response.json();
    
    logger.dataLoaded('Dados carregados', { count: data.length });
    return data;
    
  } catch (error) {
    logger.error('Erro ao buscar dados', error);
    throw error;
  }
}
```

### Logs Agrupados

```javascript
import logger from './utils/logger';

function complexOperation() {
  logger.group('🔄 Operação Complexa');
  
  logger.info('Passo 1: Validação');
  // validação...
  
  logger.info('Passo 2: Processamento');
  // processamento...
  
  logger.info('Passo 3: Finalização');
  // finalização...
  
  logger.groupEnd();
}
```

### Logger Customizado por Contexto

```javascript
import logger from './utils/logger';

class SearchService {
  constructor() {
    this.name = 'SearchService';
  }

  search(query) {
    logger.search(`[${this.name}] Buscando:`, { query });
    // lógica de busca...
    logger.searchResults(`[${this.name}] Resultados:`, { count: 10 });
  }
}
```

---

## 5. Customizar Componentes

### Criar Variação do LocationOptions

```javascript
import React from 'react';

function CustomLocationOptions({ onMyCity, onMyNeighborhood, onAllBrazil }) {
  return (
    <div className="custom-location-options">
      <button onClick={onMyCity}>Na minha cidade</button>
      <button onClick={onMyNeighborhood}>No meu bairro</button>
      <button onClick={onAllBrazil}>Em todo Brasil</button>
    </div>
  );
}

export default CustomLocationOptions;
```

### Customizar Renderização de Sugestões

```javascript
import React from 'react';

function CustomSuggestionItem({ item, onSelect }) {
  return (
    <div 
      className="custom-suggestion"
      onClick={() => onSelect(item)}
    >
      <span className="icon">{item.isState ? '🏛️' : '🏙️'}</span>
      <span className="name">{item.display_name}</span>
      {item.display_subtitle && (
        <span className="subtitle">{item.display_subtitle}</span>
      )}
    </div>
  );
}

export default CustomSuggestionItem;
```

---

## 6. Debugging

### Ver Todos os Logs de uma Busca

```javascript
import logger from './utils/logger';

// No console do navegador
logger.setLevel('DEBUG');

// Digite algo no input e veja:
// 🔎 [SEARCH] Iniciando busca
// ✅ [DATA] Cidades disponíveis
// 📢 [DDD] Detectou padrão de DDD
// 🏛️ [STATE] Estado encontrado
// 🏙️ [CITY] Cidades encontradas
// 📊 [RESULTS] Busca finalizada
```

### Debug de Geolocalização

```javascript
import logger from './utils/logger';

// Habilite apenas logs de localização
logger.disable();
// Depois reabilite só o que precisa manualmente:
console.log = logger.location.bind(logger);
console.error = logger.error.bind(logger);
```

### Testar Helpers Isoladamente no Console

```javascript
// No console do navegador
import { searchCities } from './path/to/searchHelpers';

// Simular cidades
const mockCities = [
  { name: 'Porto Alegre', state: 'RS', display_name: 'Porto Alegre, RS' },
  { name: 'Porto Feliz', state: 'SP', display_name: 'Porto Feliz, SP' }
];

// Testar
const results = searchCities('Porto', mockCities);
console.table(results);
```

### Performance Profiling

```javascript
import logger from './utils/logger';

function performanceTest() {
  const start = performance.now();
  
  logger.debug('Iniciando teste de performance');
  
  // operação...
  
  const end = performance.now();
  const duration = end - start;
  
  logger.debug('Teste finalizado', { 
    duration: `${duration.toFixed(2)}ms` 
  });
}
```

---

## 🎓 Padrões Recomendados

### 1. Sempre use logger ao invés de console.log

```javascript
// ❌ Evite
console.log('Busca iniciada');

// ✅ Prefira
logger.search('Busca iniciada');
```

### 2. Categorize seus logs corretamente

```javascript
logger.search()   // Para buscas
logger.location() // Para geolocalização
logger.ddd()      // Para DDD
logger.error()    // Para erros
logger.info()     // Para info geral
```

### 3. Inclua contexto útil

```javascript
// ❌ Pouco contexto
logger.search('Busca');

// ✅ Contexto rico
logger.search('Busca iniciada', { 
  query: 'Porto', 
  queryLength: 5,
  timestamp: new Date()
});
```

### 4. Use try-catch com logs

```javascript
try {
  logger.info('Tentando operação');
  // operação...
  logger.info('Operação bem-sucedida');
} catch (error) {
  logger.error('Operação falhou', error);
  throw error;
}
```

---

## 🚀 Casos de Uso Avançados

### Integração com Redux

```javascript
import logger from './utils/logger';

// Action
const searchLocation = (query) => async (dispatch) => {
  logger.search('Redux action: searchLocation', { query });
  
  dispatch({ type: 'SEARCH_START' });
  
  try {
    const results = await api.search(query);
    logger.searchResults('Redux: resultados obtidos', { count: results.length });
    dispatch({ type: 'SEARCH_SUCCESS', payload: results });
  } catch (error) {
    logger.error('Redux: erro na busca', error);
    dispatch({ type: 'SEARCH_ERROR', payload: error });
  }
};
```

### Integração com Analytics

```javascript
import logger from './utils/logger';

function trackSearch(query, results) {
  logger.search('Tracking busca', { query, resultsCount: results.length });
  
  // Google Analytics
  gtag('event', 'search', {
    search_term: query,
    results_count: results.length
  });
  
  // Ou qualquer outro serviço de analytics
}
```

Esses exemplos cobrem praticamente todos os cenários de uso! 🎉