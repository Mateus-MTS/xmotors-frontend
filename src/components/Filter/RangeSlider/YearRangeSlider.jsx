import React, { useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
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

const YearRangeSlider = ({ value, onChange }) => {
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const [localValues, setLocalValues] = useState([1990, currentYear]);
  const [texts, setTexts] = useState([String(1990), String(currentYear)]);

  useMobileSelectionToggle(minInputRef, maxInputRef);

  useEffect(() => {
    if (value) {
      setLocalValues(value);
      setTexts([String(value[0]), String(value[1])]);
      
      if (sliderRef.current?.noUiSlider) {
        sliderRef.current.noUiSlider.set(value, false);
      }
    }
  }, [value]);

  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    const initialValues = value || [1990, currentYear];

    noUiSlider.create(sliderRef.current, {
      start: initialValues,
      step: 1,
      range: { min: MIN_YEAR, max: currentYear },
      connect: true,
      format: wNumb({ decimals: 0 }),
    });

    const slider = sliderRef.current.noUiSlider;

    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map((v) => {
        const n = parseInt(String(v).replace(/\D/g, ''), 10);
        return Number.isNaN(n) ? MIN_YEAR : n;
      });

      setLocalValues(parsed);
      setTexts([String(parsed[0]), String(parsed[1])]);
    });

    slider.on('change', (formattedValues) => {
      const parsed = formattedValues.map((v) => {
        const n = parseInt(String(v).replace(/\D/g, ''), 10);
        return Number.isNaN(n) ? MIN_YEAR : n;
      });

      if (onChange) {
        onChange(parsed);
      }
    });

    return () => {
      if (slider && typeof slider.destroy === 'function') {
        slider.destroy();
      }
    };
  }, []);

  const handleTextChange = (index, raw) => {
    const digits = onlyDigits(raw).slice(0, 4);
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });

    if (digits.length === 4) {
      const parsed = toNumberOrNaN(digits);
      commitValue(index, parsed);
    }
  };

  const commitValue = (index, parsedValue) => {
    let [min, max] = localValues;

    const v = Number.isNaN(parsedValue)
      ? (index === 0 ? MIN_YEAR : currentYear)
      : parsedValue;

    // ⭐ Garante que está dentro dos limites globais primeiro
    const clampedVal = Math.max(MIN_YEAR, Math.min(currentYear, v));

    if (index === 0) {
      // Inicial não pode ser maior que final
      min = clampedVal;
      // ⭐ Se inicial ficou maior que final, ajusta final também
      if (min > max) {
        max = min;
      }
    } else {
      // Final não pode ser menor que inicial
      max = clampedVal;
      // ⭐ Se final ficou menor que inicial, ajusta inicial também
      if (max < min) {
        min = max;
      }
    }

    const next = [min, max];
    
    setLocalValues(next);
    setTexts([String(min), String(max)]);
    
    if (sliderRef.current?.noUiSlider) {
      sliderRef.current.noUiSlider.set(next);
    }
    
    if (onChange) {
      onChange(next);
    }
  };

  const handleBlur = (index) => {
    const parsed = toNumberOrNaN(texts[index]);
    commitValue(index, parsed);
  };

  const handlePaste = (e, index) => {
    const text = (e.clipboardData && e.clipboardData.getData('text')) || 
                  window.clipboardData?.getData('Text');
    const digits = onlyDigits(text).slice(0, 4);
    e.preventDefault();
    
    setTexts((prev) => {
      const next = [...prev];
      next[index] = digits;
      return next;
    });
    
    if (digits.length === 4) {
      commitValue(index, toNumberOrNaN(digits));
    }
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

YearRangeSlider.propTypes = {
  value: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func
};

YearRangeSlider.defaultProps = {
  value: null,
  onChange: null
};

export default YearRangeSlider;