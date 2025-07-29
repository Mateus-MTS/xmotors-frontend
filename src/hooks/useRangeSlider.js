import { useState, useEffect, useRef } from 'react';

export default function useRangeSlider(config = {}) {
  const {
    min = 0,
    max = 100,
    initialRange = [min, max],
    step = 1,
    rangeSelector = '.range-slider',
    onChange
  } = config;

  const [values, setValues] = useState(initialRange);
  const rangeRef = useRef(null);
  const inputsRef = useRef([]);
  const slidersRef = useRef([]);

  // Função de sincronização com tratamento de erros
  const syncValues = (newValues) => {
    try {
      const [val1, val2] = newValues.map(Number);
      const sorted = [Math.min(val1, val2), Math.max(val1, val2)];
      
      setValues(sorted);
      if (onChange) onChange(sorted);

      // Atualiza os inputs
      inputsRef.current.forEach((input, idx) => {
        if (input && !isNaN(sorted[idx])) input.value = sorted[idx];
      });

      // Atualiza os sliders
      slidersRef.current.forEach((slider, idx) => {
        if (slider && !isNaN(sorted[idx])) slider.value = sorted[idx];
      });
    } catch (error) {
      console.error('Erro no useRangeSlider:', error);
    }
  };

  // Configuração dos event listeners
  useEffect(() => {
    const parent = rangeRef.current || document.querySelector(rangeSelector);
    if (!parent) return;

    const cleanup = () => {
      slidersRef.current.forEach(slider => {
        if (slider) slider.removeEventListener('input', handleSliderChange);
      });
      inputsRef.current.forEach(input => {
        if (input) input.removeEventListener('input', handleNumberChange);
      });
    };

    const handleSliderChange = (e, index) => {
      const newValues = [...values];
      newValues[index] = parseFloat(e.target.value);
      syncValues(newValues);
    };

    const handleNumberChange = (e, index) => {
      const newValues = [...values];
      newValues[index] = parseFloat(e.target.value) || min;
      syncValues(newValues);
    };

    // Inicialização
    const initSlider = () => {
      slidersRef.current = Array.from(parent.querySelectorAll('input[type="range"]'));
      inputsRef.current = Array.from(parent.querySelectorAll('input[type="number"]'));

      slidersRef.current.forEach((slider, index) => {
        if (slider) {
          slider.min = min;
          slider.max = max;
          slider.step = step;
          slider.value = values[index];
          slider.addEventListener('input', (e) => handleSliderChange(e, index));
        }
      });

      inputsRef.current.forEach((input, index) => {
        if (input) {
          input.min = min;
          input.max = max;
          input.step = step;
          input.value = values[index];
          input.addEventListener('input', (e) => handleNumberChange(e, index));
        }
      });
    };

    initSlider();
    return cleanup;
  }, [min, max, step, values]);

  return {
    values,
    setValues: syncValues,
    rangeRef
  };
}