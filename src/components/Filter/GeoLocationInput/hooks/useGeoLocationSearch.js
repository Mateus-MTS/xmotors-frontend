/**
 * Hook para Busca de Localização
 * 
 * Responsabilidades:
 * - Gerenciar estado da busca
 * - Orquestrar diferentes tipos de busca (DDD, Estado, Cidade, Região)
 * - Integrar com hook de DDD
 * - Processar e retornar resultados
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { useDDDSearch } from '../hooks/useDDDSearch';
import {
  isDDDPattern,
  isStateCodePattern,
  isNumericOnly,
  createDDDLoadingResult,
  createDDDSummaryResult,
  searchByStateCode,
  searchStatesByName,
  searchRegions,
  searchCities,
  processResults
} from '../utils/searchHelpers';
import logger from '../../../../utils/logger';

/**
 * Hook principal para busca de localização
 */
export const useGeoLocationSearch = (cities) => {
  const [suggestions, setSuggestions] = useState([]);
  const [dddQuery, setDddQuery] = useState(null);

  // Hook para busca de DDD
  const { data: dddData, isLoading: isDDDLoading, isFetched: isDDDFetched } = useDDDSearch(dddQuery);
  
  // Refs para manter valores atualizados no debounce
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

  /**
   * Realiza a busca principal
   */
  const performSearch = useCallback((searchQuery) => {
    logger.search('Iniciando busca', { searchQuery });

    // Usa refs para ter valores mais recentes
    const currentCities = citiesRef.current;
    const currentDddData = dddDataRef.current;
    const currentIsDDDLoading = isDDDLoadingRef.current;
    const currentDddQuery = dddQueryRef.current;

    // Validações iniciais
    if (!searchQuery || searchQuery === '') {
      logger.warn('Query vazia, limpando sugestões');
      setSuggestions([]);
      setDddQuery(null);
      return;
    }

    if (!currentCities || currentCities.length === 0) {
      logger.warn('Cidades ainda não carregadas');
      return;
    }

    logger.dataLoaded('Cidades disponíveis', { count: currentCities.length });

    const queryLength = searchQuery.length;
    let results = [];

    // ============================================
    // 1. BUSCA POR DDD
    // ============================================
    if (isDDDPattern(searchQuery)) {
      logger.ddd('Detectou padrão de DDD', { ddd: searchQuery });
      
      // Dispara busca se necessário
      if (currentDddQuery !== searchQuery) {
        logger.ddd('Disparando busca de DDD', { ddd: searchQuery });
        setDddQuery(searchQuery);
      }
      
      // Mostra loading
      if (currentIsDDDLoading) {
        results.push(createDDDLoadingResult(searchQuery));
      }
      
      // Mostra resultado resumido quando dados carregarem
      if (currentDddData && currentDddData.state && currentDddData.region) {
        logger.ddd('Dados do DDD disponíveis', { dddData: currentDddData });
        results = [createDDDSummaryResult(searchQuery, currentDddData)];
      }
    } else {
      // Limpa DDD query se não for mais DDD
      if (currentDddQuery !== null) {
        setDddQuery(null);
      }
    }

    // ============================================
    // 2. BUSCA POR CÓDIGO DE ESTADO (ex: RS, SP)
    // ============================================
    if (isStateCodePattern(searchQuery)) {
      const stateResult = searchByStateCode(searchQuery);
      if (stateResult) {
        results.push(stateResult);
      }
    }

    // ============================================
    // 3. BUSCA POR NOME DE ESTADO
    // ============================================
    if (queryLength >= 1 && !isNumericOnly(searchQuery)) {
      const stateResults = searchStatesByName(searchQuery);
      results = [...results, ...stateResults];
    }

    // ============================================
    // 4. BUSCA POR REGIÃO
    // ============================================
    if (queryLength >= 3 && !isNumericOnly(searchQuery)) {
      const regionResults = searchRegions(searchQuery);
      results = [...results, ...regionResults];
    }

    // ============================================
    // 5. BUSCA POR CIDADES
    // ============================================
    if (queryLength >= 3 && !isNumericOnly(searchQuery)) {
      const cityResults = searchCities(searchQuery, currentCities);
      results = [...results, ...cityResults];
    }

    // ============================================
    // PROCESSAMENTO FINAL
    // ============================================
    const finalResults = processResults(results, 15);
    
    logger.searchResults('Busca finalizada', { 
      total: results.length,
      final: finalResults.length,
      results: finalResults 
    });
    
    setSuggestions(finalResults);
  }, []);

  // Re-executa busca quando dados do DDD carregarem
  useEffect(() => {
    if (dddQuery && dddData && isDDDFetched) {
      logger.ddd('DDD carregou, re-executando busca', { dddQuery, dddData });
      performSearch(dddQuery);
    }
  }, [dddData, isDDDFetched, dddQuery, performSearch]);

  /**
   * Limpa sugestões e estado de busca
   */
  const clearSearch = useCallback(() => {
    logger.search('Limpando busca');
    setSuggestions([]);
    setDddQuery(null);
  }, []);

  /**
   * Reseta apenas as sugestões
   */
  const clearSuggestions = useCallback(() => {
    logger.search('Limpando sugestões');
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    performSearch,
    clearSearch,
    clearSuggestions,
    isDDDLoading,
    dddData
  };
};

export default useGeoLocationSearch;