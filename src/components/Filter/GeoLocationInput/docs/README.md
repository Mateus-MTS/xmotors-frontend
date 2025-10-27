# GeoLocationInput - Documentação

## 📁 Estrutura de Arquivos

```
src/
└── components/
    └── Filter/
        └── GeoLocationInput/
            ├── index.js
            ├── GeoLocationInput.jsx
            ├── hooks/
            │   ├── useBrazilianCities.js      
            │   ├── useDDDSearch.js            
            │   ├── useGeoLocationSearch.js
            │   └── useCurrentLocation.js
            ├── components/
            │   ├── LocationOptions.jsx
            │   └── SuggestionsList.jsx
            ├── utils/
            │   ├── searchHelpers.js
            └── docs/
                ├── README.md
                ├── MIGRATION_GUIDE.md
                └── USAGE_EXAMPLES.md
```

---

## 🎯 Responsabilidades de Cada Arquivo

### **1. GeoLocationInput.jsx** (Componente Principal)
**Responsabilidade:** Orquestrador

- Gerencia estado do input (query, showOptions, placeholder)
- Coordena hooks customizados
- Sincroniza com props externas (value, onChange)
- Delega lógica de busca e localização para hooks
- Delega renderização para subcomponentes
- Mantém código limpo e legível

**Não faz:**
- Lógica de busca complexa
- Manipulação direta de geolocalização
- Formatação de resultados

---

### **2. useGeoLocationSearch.js** (Hook de Busca)
**Responsabilidade:** Lógica de busca

- Gerencia estado de sugestões
- Orquestra diferentes tipos de busca (DDD, Estado, Cidade, Região)
- Integra com useDDDSearch para busca de DDD
- Processa e formata resultados finais
- Usa refs para sincronizar com debounce

**Não faz:**
- Implementação específica de cada busca
- Geolocalização do usuário
- Renderização de UI

---

### **3. useCurrentLocation.js** (Hook de Geolocalização)
**Responsabilidade:** Geolocalização

- Obtém localização atual do navegador
- Faz geocoding reverso (lat/lng → endereço)
- Formata localizações brasileiras
- Gerencia estados de loading/erro
- Fornece métodos: getCurrentRegion, getCurrentState, setupInitialLocation

**Não faz:**
- Busca de sugestões
- Manipulação de input
- Processamento de resultados de busca

---

---

### **4. useBrazilianCities.js** (Hook Movido)
**Responsabilidade:** Carregar dados de cidades

- Faz requisição para buscar todas as cidades brasileiras
- Gerencia cache dos dados
- Fornece estados de loading/error
- Retorna lista completa de cidades

**Não faz:**
- Buscar ou filtrar cidades
- Geolocalização
- Manipulação de UI

---

### **5. useDDDSearch.js** (Hook Movido)
**Responsabilidade:** Buscar informações de DDD

- Busca dados de região e estado por DDD
- Gerencia cache de DDDs consultados
- Fornece estados de loading/fetched
- Retorna dados estruturados do DDD

**Não faz:**
- Validar se é DDD
- Formatar resultados para exibição
- Geolocalização

### **6. searchHelpers.js** (Funções Auxiliares)
**Responsabilidade:** Implementação das buscas

- Valida patterns (DDD, código de estado, numérico)
- Implementa busca por DDD
- Implementa busca por estado (código e nome)
- Implementa busca por região
- Implementa busca por cidades
- Processa resultados (remove duplicatas, ordena, limita)

**Não faz:**
- Gerenciar estado
- Fazer chamadas assíncronas
- Renderizar UI

---

### **7. LocationOptions.jsx** (Subcomponente)
**Responsabilidade:** UI de opções automáticas

- Renderiza botões de localização automática
- Gerencia clicks nos botões
- Controla visibilidade baseado em props

**Não faz:**
- Lógica de geolocalização
- Gerenciar estado global
- Buscar dados

---

### **8. SuggestionsList.jsx** (Subcomponente)
**Responsabilidade:** UI de sugestões

- Renderiza lista de sugestões
- Aplica estilos específicos por tipo (DDD, Estado, Cidade, Região)
- Gerencia seleção de item
- Controla visibilidade

**Não faz:**
- Buscar dados
- Processar resultados
- Geolocalização

---

### **9. logger.js** (Utilitário)
**Responsabilidade:** Sistema de logging

- Fornece logs categorizados (search, location, ddd, error, etc)
- Controla nível de log (dev/production)
- Formata logs com emojis e timestamps
- Centraliza toda saída de debug
- Fácil desabilitar em produção

**Não faz:**
- Lógica de negócio
- Manipulação de dados
- Renderização

---

## 🔄 Fluxo de Dados

### **Inicialização**
```
GeoLocationInput
  → useBrazilianCities (carrega cidades)
  → useCurrentLocation.setupInitialLocation()
    → LocationService.getCurrentLocation()
    → LocationService.reverseGeocode()
    → Atualiza placeholder e query
```

### **Busca por texto**
```
GeoLocationInput.handleInputChange()
  → debounce (300ms)
  → useGeoLocationSearch.performSearch()
    → searchHelpers (valida e busca)
      → isDDDPattern? → createDDDSummaryResult()
      → isStateCodePattern? → searchByStateCode()
      → searchStatesByName()
      → searchRegions()
      → searchCities()
    → processResults()
  → Atualiza suggestions
  → SuggestionsList renderiza
```

### **Seleção de sugestão**
```
SuggestionsList.onSelect()
  → GeoLocationInput.handleSelect()
  → Formata displayValue
  → Atualiza query
  → Chama onChange (prop)
  → Limpa suggestions
```

### **Localização automática**
```
LocationOptions.onClick()
  → GeoLocationInput.handleMyRegion() / handleMyState()
  → useCurrentLocation.getCurrentRegion() / getCurrentState()
    → LocationService.getCurrentLocation()
    → LocationService.reverseGeocode()
  → Atualiza query
  → Chama onChange (prop)
```

---

## 🔧 Como Usar o Logger

### **Importação**
```javascript
import logger from '../../../utils/logger';
```

### **Exemplos de Uso**

```javascript
// Logs de busca
logger.search('Iniciando busca', { query: 'Rio' });
logger.searchResults('Resultados encontrados', { count: 15 });

// Logs de geolocalização
logger.location('Obtendo posição');
logger.locationSuccess('Localização detectada', { lat, lng });

// Logs de DDD
logger.ddd('Detectou DDD', { ddd: '51' });
logger.dddLoading('Carregando dados do DDD');

// Logs de dados
logger.dataLoaded('Cidades carregadas', { count: 5570 });
logger.dataUpdate('Dados atualizados');

// Logs específicos
logger.state('Estado encontrado', { name: 'Rio Grande do Sul' });
logger.city('Cidade encontrada', { name: 'Porto Alegre' });
logger.region('Região encontrada', { name: 'Sul' });

// Logs de interação
logger.input('Input mudou', { value: 'Porto' });
logger.focus('Input focado');

// Logs de avisos e erros
logger.warn('Cidades não carregadas');
logger.error('Erro ao buscar localização', error);

// Agrupamento de logs
logger.group('🔍 Processo de Busca');
logger.search('Passo 1');
logger.search('Passo 2');
logger.groupEnd();
```

### **Controle do Logger**

```javascript
// Desabilitar todos os logs
logger.disable();

// Habilitar logs
logger.enable();

// Mudar nível de log
logger.setLevel('ERROR'); // Só mostra erros
logger.setLevel('INFO');  // Mostra info e erros
logger.setLevel('DEBUG'); // Mostra tudo
logger.setLevel('NONE');  // Não mostra nada
```

### **Configuração em Produção**

No arquivo `logger.js`, a linha:
```javascript
this.enabled = process.env.NODE_ENV !== 'production';
```

Desabilita automaticamente logs em produção. Para forçar desabilitar:
```javascript
this.enabled = false;
```

---

## ✅ Vantagens da Refatoração

### **Antes (Código Original)**
- ❌ 500+ linhas em um arquivo
- ❌ Múltiplas responsabilidades misturadas
- ❌ Difícil de testar partes isoladas
- ❌ Logs espalhados com console.log
- ❌ Lógica de busca dentro do componente
- ❌ Hard to debug

### **Depois (Código Refatorado)**
- ✅ Arquivos pequenos e focados (< 200 linhas)
- ✅ Responsabilidade única por arquivo
- ✅ Fácil de testar cada hook/função
- ✅ Logger centralizado e controlável
- ✅ Lógica separada da UI
- ✅ Easy to debug e manter

---

## 🧪 Testabilidade

Cada parte pode ser testada isoladamente:

```javascript
// Testar hooks
const { result } = renderHook(() => useGeoLocationSearch(mockCities));

// Testar helpers
const results = searchCities('Porto', mockCities);
expect(results).toHaveLength(5);

// Testar componentes
render(<SuggestionsList suggestions={mockSuggestions} onSelect={mockFn} />);

// Testar logger
logger.disable();
logger.search('test'); // Não loga nada
```

---

## 📝 Próximos Passos Sugeridos

1. ✅ **Implementar testes unitários** para cada hook e helper
2. ✅ **Adicionar TypeScript** para melhor type safety
3. ✅ **Implementar retry logic** em caso de erro de geolocalização
4. ✅ **Adicionar cache** para resultados de busca
5. ✅ **Métricas de performance** usando logger
6. ✅ **Storybook** para documentar componentes visuais

---

## 🤝 Contribuindo

Ao adicionar novas funcionalidades:
1. Identifique a responsabilidade
2. Coloque no arquivo correto
3. Use logger apropriado
4. Mantenha funções pequenas e focadas
5. Documente com comentários claros