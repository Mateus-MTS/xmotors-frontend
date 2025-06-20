import React, { useEffect, useRef, useState } from 'react';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';

const RangeSlider = () => {
  const sliderRef = useRef(null);
  const [values, setValues] = useState([1000, 500000]);

  useEffect(() => {
    if (!sliderRef.current || sliderRef.current.noUiSlider) return;

    noUiSlider.create(sliderRef.current, {
      start: values,
      step: 1,
      range: {
        min: 0,
        max: 1000000
      },
      connect: true,
      format: wNumb({ decimals: 0, thousand: ',' })
    });

    const slider = sliderRef.current.noUiSlider;

    slider.on('update', (formattedValues) => {
      const parsed = formattedValues.map((val) => Number(val.replace(/,/g, '')));
      setValues(parsed);
    });

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <div className="widget widget-price">
      <div className="caption flex-two">
      </div>

      <div className="slider-labels">
        <div className="number-range">
          <input
            type="text"
            value={Number(values[0]).toLocaleString('pt-BR')}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
              setValues([val, values[1]]);
              sliderRef.current.noUiSlider.set([val, null]);
            }}
          />
          <span>–</span>
          <input
            type="text"
            value={Number(values[1]).toLocaleString('pt-BR')}
            onChange={(e) => {
              const val = parseInt(e.target.value.replace(/\D/g, '')) || 0;
              setValues([values[0], val]);
              sliderRef.current.noUiSlider.set([null, val]);
            }}
          />
        </div>
      </div>

      <div id="slider-range" ref={sliderRef}></div>
    </div>
    
  );
};

export default RangeSlider;
