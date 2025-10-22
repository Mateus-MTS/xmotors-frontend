import React, { useEffect, useRef, useState } from 'react';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import useMobileSelectionToggle from '../../../hooks/useMobileSelectionToggle';

const MIN_YEAR = 1900;

const onlyDigits = (s) => String(s || '').replace(/\D/g, '');
const toNumberOrNaN = (s) => {
  const n = parseInt(onlyDigits(s).slice(0, 4), 10);
  return Number.isNaN(n) ? NaN : n;
};

const YearRangeSlider = () => {
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const currentYear = new Date().getFullYear();

  // valores efetivos
  const [values, setValues] = useState([1990, currentYear]);
  // estados de texto para inputs (permite digitação parcial)
  const [texts, setTexts] = useState([String(1990), String(currentYear)]);

  // aplica somente em mobile/tablet; hook adiciona listeners touchend
  useMobileSelectionToggle(minInputRef, maxInputRef);

  // cria slider
  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    noUiSlider.create(sliderRef.current, {
      start: values,
      step: 1,
      range: { min: MIN_YEAR, max: currentYear },
      connect: true,
      format: wNumb({ decimals: 0 }),
    });

    const slider = sliderRef.current.noUiSlider;

    const onUpdate = (formattedValues) => {
      const parsed = formattedValues.map((v) => {
        const n = parseInt(String(v).replace(/\D/g, ''), 10);
        return Number.isNaN(n) ? MIN_YEAR : n;
      });

      setValues((prev) => {
        if (prev[0] === parsed[0] && prev[1] === parsed[1]) return prev;
        // atualiza também os textos para refletir estado do slider
        setTexts([String(parsed[0]), String(parsed[1])]);
        return parsed;
      });
    };

    slider.on('update', onUpdate);

    return () => {
      slider.off('update', onUpdate);
      if (slider && typeof slider.destroy === 'function') slider.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentYear]);

  // sincroniza slider quando values mudam por inputs (evita loop)
  useEffect(() => {
    if (sliderRef.current && sliderRef.current.noUiSlider) {
      const slider = sliderRef.current.noUiSlider;
      const current = slider.get().map((v) => parseInt(String(v).replace(/\D/g, ''), 10));
      if (current[0] !== values[0] || current[1] !== values[1]) {
        slider.set(values);
      }
    }
  }, [values]);

  // atualiza texto enquanto digita; commita automaticamente se digitar 4 dígitos
  const handleTextChange = (index, raw) => {
    // permite apenas dígitos e no máximo 4 caracteres
    const digits = onlyDigits(raw).slice(0, 4);
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });

    // se completou 4 dígitos, commita
    if (digits.length === 4) {
      const parsed = toNumberOrNaN(digits);
      commitValue(index, parsed);
    }
  };

  // valida/normaliza e salva (executado em onBlur ou quando completar 4 dígitos)
  const commitValue = (index, parsedValue) => {
    let [min, max] = values;

    const v = Number.isNaN(parsedValue)
      ? (index === 0 ? MIN_YEAR : currentYear)
      : parsedValue;

    if (index === 0) {
      // initial não pode ser maior que final
      const newMin = Math.max(MIN_YEAR, Math.min(v, max));
      min = newMin;
    } else {
      // final não pode ser menor que initial
      const newMax = Math.min(currentYear, Math.max(v, min));
      max = newMax;
    }

    const next = [min, max];
    setValues(next);
    setTexts([String(min), String(max)]);
    if (sliderRef.current && sliderRef.current.noUiSlider) {
      sliderRef.current.noUiSlider.set(next);
    }
  };

  const handleBlur = (index) => {
    // se campo vazio, considera NaN e commitValue aplicará MIN_YEAR/currentYear
    const parsed = toNumberOrNaN(texts[index]);
    commitValue(index, parsed);
  };

  const handlePaste = (e, index) => {
    const text = (e.clipboardData && e.clipboardData.getData('text')) || window.clipboardData.getData('Text');
    const digits = onlyDigits(text).slice(0, 4);
    e.preventDefault();
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });
    if (digits.length === 4) commitValue(index, toNumberOrNaN(digits));
  };

  return (
    <div className="widget widget-year-range">
      <div className="slider-labels">
        <div className="number-range">
          <input
            ref={minInputRef}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            value={texts[0]}
            onChange={(e) => handleTextChange(0, e.target.value)}
            onBlur={() => handleBlur(0)}
            onFocus={(e) => { try { e.target.select(); } catch {} }}
            onPaste={(e) => handlePaste(e, 0)}
            aria-label="Ano inicial"
          />
          <span>–</span>
          <input
            ref={maxInputRef}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={4}
            value={texts[1]}
            onChange={(e) => handleTextChange(1, e.target.value)}
            onBlur={() => handleBlur(1)}
            onFocus={(e) => { try { e.target.select(); } catch {} }}
            onPaste={(e) => handlePaste(e, 1)}
            aria-label="Ano final"
          />
        </div>
      </div>

      <div id="slider-year-range" ref={sliderRef}></div>
    </div>
  );
};

export default YearRangeSlider;