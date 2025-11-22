/**
 * YearRangeSlider - Componente de Seleção de Intervalo de Anos
 * 
 * Responsabilidades:
 * - Permitir seleção de intervalo de anos via slider e inputs
 * - Sincronizar valores entre slider e campos de texto
 * - Validar limites e garantir consistência entre ano mínimo e máximo
 * - Suporte touch para dispositivos móveis
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import { useTouchInputPair } from '../../../hooks/useTouchInput';

// ============================================
// CONSTANTES
// ============================================
const MIN_YEAR = 1900;

// ============================================
// FUNÇÕES UTILITÁRIAS
// ============================================

/**
 * Remove todos os caracteres não-numéricos de uma string
 * @param {string} s - String de entrada
 * @returns {string} String contendo apenas dígitos
 */
const onlyDigits = (s) => String(s || '').replace(/\D/g, '');

/**
 * Converte string para número inteiro (ano)
 * @param {string} s - String de entrada
 * @returns {number} Número inteiro ou NaN se inválido
 */
const toNumberOrNaN = (s) => {
  const n = parseInt(onlyDigits(s).slice(0, 4), 10);
  return Number.isNaN(n) ? NaN : n;
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const YearRangeSlider = ({ value, onChange }) => {
  // ============================================
  // REFS
  // ============================================
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  // ============================================
  // ESTADOS E MEMOS
  // ============================================
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const [localValues, setLocalValues] = useState([1990, currentYear]);
  const [texts, setTexts] = useState([String(1990), String(currentYear)]);

  // ============================================
  // HOOKS CUSTOMIZADOS
  // ============================================
  
  // ⭐ Hook de touch input para pares min/max
  // Posicionado após refs e estados, antes dos effects
  useTouchInputPair(minInputRef, maxInputRef, {
    doubleTapMs: 350 // Tempo para detectar double tap
  });

  // ============================================
  // EFFECTS - Sincronização com props externas
  // ============================================

  /**
   * useEffect - Sincroniza valores externos com estado local
   * Atualiza o slider quando o valor externo muda
   */
  useEffect(() => {
    if (value) {
      setLocalValues(value);
      setTexts([String(value[0]), String(value[1])]);
      
      if (sliderRef.current?.noUiSlider) {
        sliderRef.current.noUiSlider.set(value, false);
      }
    }
  }, [value]);

  /**
   * useEffect - Inicialização do slider noUiSlider
   * Configura o slider e seus event listeners
   */
  useEffect(() => {
    // Previne reinicialização se slider já existe
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    const initialValues = value || [1990, currentYear];

    // Cria instância do slider
    noUiSlider.create(sliderRef.current, {
      start: initialValues,
      step: 1,
      range: { min: MIN_YEAR, max: currentYear },
      connect: true,
      format: wNumb({ decimals: 0 }),
    });

    const slider = sliderRef.current.noUiSlider;

    // Handler: Atualização contínua enquanto arrasta
    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map((v) => {
        const n = parseInt(String(v).replace(/\D/g, ''), 10);
        return Number.isNaN(n) ? MIN_YEAR : n;
      });

      setLocalValues(parsed);
      setTexts([String(parsed[0]), String(parsed[1])]);
    });

    // Handler: Mudança final (quando solta o slider)
    slider.on('change', (formattedValues) => {
      const parsed = formattedValues.map((v) => {
        const n = parseInt(String(v).replace(/\D/g, ''), 10);
        return Number.isNaN(n) ? MIN_YEAR : n;
      });

      if (onChange) {
        onChange(parsed);
      }
    });

    // Cleanup: Destroi o slider ao desmontar
    return () => {
      if (slider && typeof slider.destroy === 'function') {
        slider.destroy();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ============================================
  // HANDLERS - Manipulação de inputs de texto
  // ============================================

  /**
   * handleTextChange - Processa mudanças nos campos de texto
   * @param {number} index - Índice do input (0 = min, 1 = max)
   * @param {string} raw - Valor digitado pelo usuário
   */
  const handleTextChange = (index, raw) => {
    // Filtra apenas dígitos (máx 4 caracteres)
    const digits = onlyDigits(raw).slice(0, 4);
    
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });

    // Se digitou 4 dígitos (ano completo), aplica automaticamente
    if (digits.length === 4) {
      const parsed = toNumberOrNaN(digits);
      commitValue(index, parsed);
    }
  };

  /**
   * commitValue - Valida e aplica o valor final
   * Garante que os valores estão dentro dos limites e são consistentes
   * @param {number} index - Índice do input (0 = min, 1 = max)
   * @param {number} parsedValue - Valor parseado do input
   */
  const commitValue = (index, parsedValue) => {
    let [min, max] = localValues;

    // Define valor padrão se inválido
    const v = Number.isNaN(parsedValue)
      ? (index === 0 ? MIN_YEAR : currentYear)
      : parsedValue;

    // Garante que está dentro dos limites globais (MIN_YEAR até currentYear)
    const clampedVal = Math.max(MIN_YEAR, Math.min(currentYear, v));

    if (index === 0) {
      // Ajusta ano inicial
      min = clampedVal;
      // Se inicial ficou maior que final, ajusta final também
      if (min > max) {
        max = min;
      }
    } else {
      // Ajusta ano final
      max = clampedVal;
      // Se final ficou menor que inicial, ajusta inicial também
      if (max < min) {
        min = max;
      }
    }

    const next = [min, max];
    
    // Atualiza estados locais
    setLocalValues(next);
    setTexts([String(min), String(max)]);
    
    // Sincroniza com o slider
    if (sliderRef.current?.noUiSlider) {
      sliderRef.current.noUiSlider.set(next);
    }
    
    // Notifica componente pai
    if (onChange) {
      onChange(next);
    }
  };

  /**
   * handleBlur - Processa quando o usuário sai do campo
   * @param {number} index - Índice do input que perdeu foco
   */
  const handleBlur = (index) => {
    const parsed = toNumberOrNaN(texts[index]);
    commitValue(index, parsed);
  };

  /**
   * handlePaste - Processa colagem de texto nos campos
   * @param {ClipboardEvent} e - Evento de paste
   * @param {number} index - Índice do input
   */
  const handlePaste = (e, index) => {
    // Obtém texto colado (compatibilidade cross-browser)
    const text = (e.clipboardData && e.clipboardData.getData('text')) || 
                  window.clipboardData?.getData('Text');
    
    const digits = onlyDigits(text).slice(0, 4);
    e.preventDefault();
    
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });
    
    // Se colou 4 dígitos, aplica automaticamente
    if (digits.length === 4) {
      commitValue(index, toNumberOrNaN(digits));
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="widget widget-year-range">
      {/* Campos de input numérico */}
      <div className="slider-labels">
        <div className="number-range">
          {/* Input: Ano inicial */}
          <input
            ref={minInputRef}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            value={texts[0]}
            onChange={(e) => handleTextChange(0, e.target.value)}
            onBlur={() => handleBlur(0)}
            onFocus={(e) => { try { e.target.select(); } catch { /* ignore */ } }}
            onPaste={(e) => handlePaste(e, 0)}
            aria-label="Ano inicial"
          />
          
          {/* Separador visual */}
          <span>–</span>
          
          {/* Input: Ano final */}
          <input
            ref={maxInputRef}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            value={texts[1]}
            onChange={(e) => handleTextChange(1, e.target.value)}
            onBlur={() => handleBlur(1)}
            onFocus={(e) => { try { e.target.select(); } catch { /* ignore */ } }}
            onPaste={(e) => handlePaste(e, 1)}
            aria-label="Ano final"
          />
        </div>
      </div>

      {/* Slider visual (noUiSlider) */}
      <div id="slider-year-range" ref={sliderRef}></div>
    </div>
  );
};

// ============================================
// PROP TYPES E DEFAULTS
// ============================================

YearRangeSlider.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func
};

YearRangeSlider.defaultProps = {
  value: null,
  onChange: null
};

export default YearRangeSlider;