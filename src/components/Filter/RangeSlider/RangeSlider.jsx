import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import useMobileSelectionToggle from '../../../hooks/useMobileSelectionToggle';

// Configurações por tipo de campo
const FIELD_CONFIG = {
  price: { min: 0, max: 1000000, initial: 1000, final: 500000 },
  km: { min: 0, max: 300000, initial: 0, final: 300000 }
};

const RangeSlider = ({ idField, value, onChange }) => {
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  // Busca configuração do campo ou usa padrão
  const config = FIELD_CONFIG[idField] || FIELD_CONFIG.price;
  
  // Estado local
  const [localValues, setLocalValues] = useState([config.initial, config.final]);

  useMobileSelectionToggle(minInputRef, maxInputRef);

  // ⭐ Sincroniza quando valor externo mudar (reset!)
  useEffect(() => {
    if (value) {
      setLocalValues(value);
      if (sliderRef.current?.noUiSlider) {
        sliderRef.current.noUiSlider.set(value, false); // false = não dispara eventos
      }
    }
  }, [value]);

  // Inicializa o noUiSlider
  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    const initialValues = value || [config.initial, config.final];

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

    // ⭐ 'update' apenas para atualizar estado local (visual)
    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map((val) => Number(val.replace(/,/g, '')));
      setLocalValues(parsed);
    });

    // ⭐ 'change' só dispara quando usuário SOLTA (muito mais performático!)
    slider.on('change', (formattedValues) => {
      const parsed = formattedValues.map((val) => Number(val.replace(/,/g, '')));
      
      // Notifica componente pai só quando terminar de arrastar
      if (onChange) {
        onChange(parsed);
      }
    });

    return () => {
      if (slider && typeof slider.destroy === 'function') {
        slider.destroy();
      }
    };
  }, []); // Só cria uma vez

  // Handler para input manual
  const handleInputChange = (index, rawValue) => {
    const val = parseInt(rawValue.replace(/\D/g, '')) || 0;
    
    // Garante que está dentro dos limites
    const clampedVal = Math.max(config.min, Math.min(config.max, val));
    
    const newValues = [...localValues];
    newValues[index] = clampedVal;
    
    // Garante que min <= max
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[1] = newValues[0];
    } else if (index === 1 && newValues[1] < newValues[0]) {
      newValues[0] = newValues[1];
    }
    
    setLocalValues(newValues);
    
    // Atualiza slider
    if (sliderRef.current?.noUiSlider) {
      sliderRef.current.noUiSlider.set(newValues);
    }
    
    // Notifica componente pai
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div className="widget widget-price">
      <div className="slider-labels">
        <div className="number-range">
          <input
            ref={minInputRef}
            type="text"
            value={Number(localValues[0]).toLocaleString('pt-BR')}
            onChange={(e) => handleInputChange(0, e.target.value)}
            aria-label={`Valor mínimo de ${idField}`}
          />
          <span>–</span>
          <input
            ref={maxInputRef}
            type="text"
            value={Number(localValues[1]).toLocaleString('pt-BR')}
            onChange={(e) => handleInputChange(1, e.target.value)}
            aria-label={`Valor máximo de ${idField}`}
          />
        </div>
      </div>

      <div id="slider-range" ref={sliderRef}></div>
    </div>
  );
};

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