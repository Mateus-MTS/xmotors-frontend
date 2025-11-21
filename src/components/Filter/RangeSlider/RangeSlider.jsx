/**
 * RangeSlider - Componente de Seleção de Intervalo Numérico
 * 
 * Responsabilidades:
 * - Permitir seleção de intervalos via slider e inputs (preço ou quilometragem)
 * - Sincronizar valores entre slider e campos de texto
 * - Validar limites e garantir consistência entre valor mínimo e máximo
 * - Suporte touch para dispositivos móveis
 * - Formatação de valores com separadores de milhar
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import { useTouchInputPair } from '../../../hooks/useTouchInput';

// ============================================
// CONFIGURAÇÕES POR TIPO DE CAMPO
// ============================================

/**
 * Configurações de limites e valores iniciais por tipo de campo
 */
const FIELD_CONFIG = {
  price: { 
    min: 0, 
    max: 1000000, 
    initial: 1000, 
    final: 500000 
  },
  km: { 
    min: 0, 
    max: 300000, 
    initial: 0, 
    final: 300000 
  }
};

// ============================================
// COMPONENTE PRINCIPAL
// ============================================

const RangeSlider = ({ idField, value, onChange }) => {
  // ============================================
  // REFS
  // ============================================
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  // ============================================
  // CONFIGURAÇÃO E ESTADOS
  // ============================================
  
  // Busca configuração do campo ou usa padrão (price)
  const config = FIELD_CONFIG[idField] || FIELD_CONFIG.price;
  
  // Estado local para valores atuais
  const [localValues, setLocalValues] = useState([config.initial, config.final]);

  // ============================================
  // HOOKS CUSTOMIZADOS
  // ============================================
  
  // ⭐ Hook de touch input para pares min/max
  // Posicionado após refs e estados, antes dos effects
  useTouchInputPair(minInputRef, maxInputRef, {
    doubleTapMs: 350 // Tempo para detectar double tap
  });

  // ============================================
  // EFFECTS - Sincronização e Inicialização
  // ============================================

  /**
   * useEffect - Sincroniza valores externos com estado local
   * Atualiza o slider quando o valor externo muda (ex: reset de filtros)
   */
  useEffect(() => {
    if (value) {
      setLocalValues(value);
      
      // Atualiza slider sem disparar eventos
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

    const initialValues = value || [config.initial, config.final];

    // Cria instância do slider
    noUiSlider.create(sliderRef.current, {
      start: initialValues,
      step: 1,
      range: {
        min: config.min,
        max: config.max
      },
      connect: true,
      format: wNumb({ decimals: 0, thousand: ',' })
    });

    const slider = sliderRef.current.noUiSlider;

    // Handler: Atualização contínua enquanto arrasta (apenas visual)
    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map((val) => Number(val.replace(/,/g, '')));
      setLocalValues(parsed);
    });

    // Handler: Mudança final quando solta o slider (dispara onChange)
    // Muito mais performático que disparar a cada movimento
    slider.on('change', (formattedValues) => {
      const parsed = formattedValues.map((val) => Number(val.replace(/,/g, '')));
      
      // Notifica componente pai apenas quando terminar de arrastar
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
  // HANDLERS - Manipulação de inputs manuais
  // ============================================

  /**
   * handleInputChange - Processa mudanças nos campos de texto
   * @param {number} index - Índice do input (0 = min, 1 = max)
   * @param {string} rawValue - Valor digitado pelo usuário (pode conter formatação)
   */
  const handleInputChange = (index, rawValue) => {
    // Remove formatação e converte para número
    const val = parseInt(rawValue.replace(/\D/g, ''), 10) || 0;
    
    // Garante que está dentro dos limites globais
    const clampedVal = Math.max(config.min, Math.min(config.max, val));
    
    const newValues = [...localValues];
    newValues[index] = clampedVal;
    
    // Garante consistência: min não pode ser maior que max
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[1] = newValues[0];
    } else if (index === 1 && newValues[1] < newValues[0]) {
      newValues[0] = newValues[1];
    }
    
    // Atualiza estado local
    setLocalValues(newValues);
    
    // Sincroniza com o slider
    if (sliderRef.current?.noUiSlider) {
      sliderRef.current.noUiSlider.set(newValues);
    }
    
    // Notifica componente pai
    if (onChange) {
      onChange(newValues);
    }
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="widget widget-price">
      {/* Campos de input numérico */}
      <div className="slider-labels">
        <div className="number-range">
          {/* Input: Valor mínimo */}
          <input
            ref={minInputRef}
            type="text"
            value={Number(localValues[0]).toLocaleString('pt-BR')}
            onChange={(e) => handleInputChange(0, e.target.value)}
            aria-label={`Valor mínimo de ${idField}`}
          />
          
          {/* Separador visual */}
          <span>–</span>
          
          {/* Input: Valor máximo */}
          <input
            ref={maxInputRef}
            type="text"
            value={Number(localValues[1]).toLocaleString('pt-BR')}
            onChange={(e) => handleInputChange(1, e.target.value)}
            aria-label={`Valor máximo de ${idField}`}
          />
        </div>
      </div>

      {/* Slider visual (noUiSlider) */}
      <div id="slider-range" ref={sliderRef}></div>
    </div>
  );
};

// ============================================
// PROP TYPES E DEFAULTS
// ============================================

RangeSlider.propTypes = {
  idField: PropTypes.oneOf(['price', 'km']).isRequired,
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func
};

RangeSlider.defaultProps = {
  value: null,
  onChange: null
};

export default RangeSlider;