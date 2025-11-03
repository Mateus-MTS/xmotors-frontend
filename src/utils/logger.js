/**
 * Sistema de Logging Centralizado
 * 
 * Responsabilidades:
 * - Fornecer logs categorizados e formatados
 * - Controlar exibição baseado em ambiente
 * - Manter consistência visual nos logs
 */

const LOG_LEVELS = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4
};

class Logger {
  constructor() {
    // Configuração: mude para LOG_LEVELS.NONE em produção
    this.level = LOG_LEVELS.DEBUG;
    this.enabled = process.env.NODE_ENV !== 'production';
  }

  /**
   * Método interno para verificar se deve logar
   */
  shouldLog(level) {
    return this.enabled && this.level >= level;
  }

  /**
   * Formata a mensagem com categoria e dados
   */
  format(emoji, category, message, data) {
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    const prefix = `${emoji} [${category}] ${timestamp}`;
    
    if (data !== undefined) {
      return [prefix, message, data];
    }
    return [prefix, message];
  }

  // ============================================
  // LOGS DE BUSCA
  // ============================================

  /**
   * Log para operações de busca
   */
  search(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🔎', 'SEARCH', message, data));
  }

  /**
   * Log para resultados de busca
   */
  searchResults(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('📊', 'RESULTS', message, data));
  }

  // ============================================
  // LOGS DE GEOLOCALIZAÇÃO
  // ============================================

  /**
   * Log para operações de geolocalização
   */
  location(message, data) {
    if (!this.shouldLog(LOG_LEVELS.INFO)) return;
    console.log(...this.format('📍', 'LOCATION', message, data));
  }

  /**
   * Log para sucesso em geolocalização
   */
  locationSuccess(message, data) {
    if (!this.shouldLog(LOG_LEVELS.INFO)) return;
    console.log(...this.format('✅', 'LOCATION', message, data));
  }

  // ============================================
  // LOGS DE DDD
  // ============================================

  /**
   * Log para operações com DDD
   */
  ddd(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('📢', 'DDD', message, data));
  }

  /**
   * Log para carregamento de DDD
   */
  dddLoading(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('⏳', 'DDD', message, data));
  }

  // ============================================
  // LOGS DE DADOS
  // ============================================

  /**
   * Log para carregamento de dados
   */
  dataLoaded(message, data) {
    if (!this.shouldLog(LOG_LEVELS.INFO)) return;
    console.log(...this.format('✅', 'DATA', message, data));
  }

  /**
   * Log para atualização de dados
   */
  dataUpdate(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🔄', 'DATA', message, data));
  }

  // ============================================
  // LOGS DE ESTADO/CIDADE
  // ============================================

  /**
   * Log para busca de estados
   */
  state(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🏛️', 'STATE', message, data));
  }

  /**
   * Log para busca de cidades
   */
  city(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🏙️', 'CITY', message, data));
  }

  /**
   * Log para busca de regiões
   */
  region(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🗺️', 'REGION', message, data));
  }

  // ============================================
  // LOGS DE INPUT/INTERAÇÃO
  // ============================================

  /**
   * Log para mudanças no input
   */
  input(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('⌨️', 'INPUT', message, data));
  }

  /**
   * Log para foco no input
   */
  focus(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('👁️', 'FOCUS', message, data));
  }

  // ============================================
  // LOGS DE AVISOS E ERROS
  // ============================================

  /**
   * Log para avisos
   */
  warn(message, data) {
    if (!this.shouldLog(LOG_LEVELS.WARN)) return;
    console.warn(...this.format('⚠️', 'WARN', message, data));
  }

  /**
   * Log para erros
   */
  error(message, data) {
    if (!this.shouldLog(LOG_LEVELS.ERROR)) return;
    console.error(...this.format('❌', 'ERROR', message, data));
  }

  // ============================================
  // LOGS DE INFORMAÇÕES GERAIS
  // ============================================

  /**
   * Log para informações gerais
   */
  info(message, data) {
    if (!this.shouldLog(LOG_LEVELS.INFO)) return;
    console.log(...this.format('ℹ️', 'INFO', message, data));
  }

  /**
   * Log para debug genérico
   */
  debug(message, data) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.log(...this.format('🔍', 'DEBUG', message, data));
  }

  // ============================================
  // MÉTODOS DE CONTROLE
  // ============================================

  /**
   * Desabilita todos os logs
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Habilita logs
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Define o nível de log
   */
  setLevel(level) {
    if (LOG_LEVELS[level] !== undefined) {
      this.level = LOG_LEVELS[level];
    }
  }

  /**
   * Agrupa logs relacionados
   */
  group(label) {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.group(label);
  }

  /**
   * Fecha grupo de logs
   */
  groupEnd() {
    if (!this.shouldLog(LOG_LEVELS.DEBUG)) return;
    console.groupEnd();
  }
}

// Exporta instância única (singleton)
const logger = new Logger();

export default logger;
export { LOG_LEVELS };