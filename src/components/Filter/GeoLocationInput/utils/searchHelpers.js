/**
 * Funções Auxiliares para Busca de Localização
 * 
 * Responsabilidades:
 * - Implementar lógica específica de cada tipo de busca
 * - Processar e formatar resultados
 * - Validar patterns de busca
 */

import { normalize } from '../../../../utils/utils';
import * as LocationService from '../../../../services/locationService';
import logger from '../../../../utils//logger';

/**
 * Verifica se a query é um DDD válido (2 dígitos)
 */
export const isDDDPattern = (query) => {
  return /^\d{2}$/.test(query);
};

/**
 * Verifica se a query é um código de estado válido (2 letras)
 */
export const isStateCodePattern = (query) => {
  return query.length === 2 && /^[A-Za-z]{2}$/.test(query) && !isDDDPattern(query);
};

/**
 * Verifica se a query contém apenas números
 */
export const isNumericOnly = (query) => {
  return /^\d+$/.test(query);
};

// ============================================
// BUSCA POR DDD
// ============================================

/**
 * Cria resultado de loading para DDD
 */
export const createDDDLoadingResult = (ddd) => {
  logger.dddLoading('Criando resultado de loading', { ddd });
  return {
    display_name: `🔍 Buscando DDD ${ddd}...`,
    isLoading: true,
    priority: 0
  };
};

/**
 * Cria resultado resumido de DDD
 */
export const createDDDSummaryResult = (ddd, dddData) => {
  logger.ddd('Criando resultado resumido de DDD', { ddd, dddData });
  
  // Busca nome completo do estado
  const stateInfo = LocationService.States.find(s => s.code === dddData.state);
  const stateName = stateInfo ? stateInfo.name : dddData.state;
  
  return {
    display_name: stateName,
    display_subtitle: `DDD ${ddd} - ${dddData.region}`,
    name: stateName,
    state: dddData.state,
    ddd: ddd,
    region: dddData.region,
    isDDD: true,
    isDDDSummary: true,
    priority: 1
  };
};

// ============================================
// BUSCA POR CÓDIGO DE ESTADO
// ============================================

/**
 * Busca estado pelo código (ex: RS, SP)
 */
export const searchByStateCode = (query) => {
  const stateCode = query.toUpperCase();
  const exactState = LocationService.States.find(s => s.code === stateCode);
  
  if (exactState) {
    logger.state('Estado encontrado por código', { stateCode, state: exactState.name });
    return {
      display_name: `${exactState.name} - ${exactState.code}`,
      name: exactState.name,
      state: exactState.code,
      region: exactState.region,
      isState: true,
      priority: 2
    };
  }
  
  return null;
};

// ============================================
// BUSCA POR NOME DE ESTADO
// ============================================

/**
 * Busca estados pelo nome
 */
export const searchStatesByName = (query) => {
  const q = normalize(query);
  const queryLength = q.length;
  
  const results = LocationService.States.filter(state => {
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

  if (results.length > 0) {
    logger.state('Estados encontrados por nome', { 
      query, 
      count: results.length 
    });
  }

  return results;
};

// ============================================
// BUSCA POR REGIÃO
// ============================================

/**
 * Busca regiões pelo nome
 */
export const searchRegions = (query) => {
  const q = normalize(query);
  
  const results = LocationService.Regions.filter(region =>
    normalize(region.name).includes(q)
  ).map(region => ({
    display_name: `Região ${region.name}`,
    name: region.name,
    isRegion: true,
    states: region.states,
    priority: 4
  }));

  if (results.length > 0) {
    logger.region('Regiões encontradas', { 
      query, 
      count: results.length 
    });
  }

  return results;
};

// ============================================
// BUSCA POR CIDADES
// ============================================

/**
 * Busca cidades pelo nome
 */
export const searchCities = (query, cities) => {
  const q = normalize(query);
  
  const results = cities
    .filter(item => normalize(item.name).includes(q))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .slice(0, 20)
    .map(city => ({
      ...city,
      priority: 5
    }));

  if (results.length > 0) {
    logger.city('Cidades encontradas', { 
      query, 
      count: results.length 
    });
  }

  return results;
};

// ============================================
// PROCESSAMENTO DE RESULTADOS
// ============================================

/**
 * Remove resultados duplicados
 */
export const removeDuplicates = (results) => {
  return results.reduce((acc, current) => {
    const key = current.display_name + (current.display_subtitle || '');
    const exists = acc.find(item => 
      (item.display_name + (item.display_subtitle || '')) === key
    );
    if (!exists) {
      acc.push(current);
    }
    return acc;
  }, []);
};

/**
 * Ordena resultados por prioridade
 */
export const sortByPriority = (results) => {
  return results.sort((a, b) => (a.priority || 999) - (b.priority || 999));
};

/**
 * Limita número de resultados
 */
export const limitResults = (results, max = 15) => {
  return results.slice(0, max);
};

/**
 * Pipeline completo de processamento de resultados
 */
export const processResults = (results, maxResults = 15) => {
  const unique = removeDuplicates(results);
  const sorted = sortByPriority(unique);
  const limited = limitResults(sorted, maxResults);
  
  logger.searchResults('Resultados processados', {
    total: results.length,
    unique: unique.length,
    final: limited.length
  });
  
  return limited;
};