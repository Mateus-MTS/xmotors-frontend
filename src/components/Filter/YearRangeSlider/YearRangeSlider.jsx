import React, { useEffect, useRef, useState } from 'react';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

const YearRangeSlider = () => {
  const sliderRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const [values, setValues] = useState([1900, currentYear]);

  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    noUiSlider.create(sliderRef.current, {
      start: values,
      step: 1,
      range: {
        min: 1900,
        max: currentYear,
      },
      connect: true,
      format: wNumb({ decimals: 0 }),
    });

    const slider = sliderRef.current.noUiSlider;

    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map(Number);
      setValues(parsed);
    });

    return () => {
      slider.destroy();
    };
  }, [currentYear]);

  const handleInputChange = (index, value) => {
    let newValue = parseInt(value.replace(/\D/g, '').slice(0, 4)) || 1900;
    let [min, max] = values;

    if (index === 0) {
      if (newValue > max) newValue = max;
      min = newValue;
    } else {
      if (newValue < min) newValue = min;
      if (newValue > currentYear) newValue = currentYear;
      max = newValue;
    }

    setValues([min, max]);
    sliderRef.current.noUiSlider.set([min, max]);
  };

  return (
    <div className="widget widget-year-range">
      <div className="slider-labels">
        <div className="number-range">
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={values[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <span>–</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={values[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>
      </div>

      <div id="slider-year-range" ref={sliderRef}></div>
    </div>
  );
};

export default YearRangeSlider;
