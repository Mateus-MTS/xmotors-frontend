import { useState, useEffect, useRef, useCallback } from 'react';

export default function useRangeSlider(config = {}) {
  const {
    min = 0,
    max = 100,
    initialRange = [min, max],
    step = 1,
    rangeSelector = '.range-slider',
    onChange,
    value
  } = config;

  // ⭐ Usa valor externo se fornecido, senão usa initialRange
  const [values, setValues] = useState(value || initialRange);
  const rangeRef = useRef(null);
  const inputsRef = useRef([]);
  const slidersRef = useRef([]);
  const valuesRef = useRef(values);

  // ⭐ NOVO: Sincroniza com valor externo quando ele mudar (reset!)
  // Usa um ref para comparar com o último valor aplicado e evitar incluir `values`
  // nas dependências (o que causaria re-render/desdobramentos indesejados).
  const prevValuesRef = useRef(values);

  useEffect(() => {
    const prev = prevValuesRef.current;
    if (value && (value[0] !== prev[0] || value[1] !== prev[1])) {
      setValues(value);

      // Atualiza também os inputs visualmente
      inputsRef.current.forEach((input, idx) => {
        if (input && !isNaN(value[idx])) {
          input.value = value[idx];
        }
      });

      // Atualiza sliders visualmente
      slidersRef.current.forEach((slider, idx) => {
        if (slider && !isNaN(value[idx])) {
          slider.value = value[idx];
        }
      });

      prevValuesRef.current = value;
      valuesRef.current = value;
    }
  }, [value]); // Executa quando value externo mudar

  // Função de sincronização com tratamento de erros
  const syncValues = useCallback((newValues) => {
    try {
      const [val1, val2] = newValues.map(Number);
      const sorted = [Math.min(val1, val2), Math.max(val1, val2)];
      
  setValues(sorted);
  valuesRef.current = sorted;
      if (onChange) onChange(sorted); // ⭐ Notifica componente pai

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
  }, [onChange]);

  // Configuração dos event listeners
  // Intencional: os listeners são inicializados apenas quando min/max/step mudam.
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
      const current = Array.from(valuesRef.current);
      current[index] = parseFloat(e.target.value);
      syncValues(current);
    };

    const handleNumberChange = (e, index) => {
      const current = Array.from(valuesRef.current);
      current[index] = parseFloat(e.target.value) || min;
      syncValues(current);
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
          slider.value = valuesRef.current[index];
          slider.addEventListener('input', (e) => handleSliderChange(e, index));
        }
      });

      inputsRef.current.forEach((input, index) => {
        if (input) {
          input.min = min;
          input.max = max;
          input.step = step;
          input.value = valuesRef.current[index];
          input.addEventListener('input', (e) => handleNumberChange(e, index));
        }
      });
    };

    initSlider();
    return cleanup;
  }, [min, max, step, rangeSelector, syncValues]); // Recria listeners quando estes mudam

  return {
    values,
    setValues: syncValues,
    rangeRef
  };
}