import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noUiSlider from 'nouislider';
import wNumb from 'wnumb';
import 'nouislider/dist/nouislider.css';
import useMobileSelectionToggle from '../../../hooks/useMobileSelectionToggle';


ValueInitialInput.propTypes = {
  idField: PropTypes.string,
};

function ValueInitialInput({ idField }) {
  if (idField === 'price') {
    return 1000;
  } else if (idField === 'km') {
    return 0;
  }
};

ValueFinalInput.propTypes = {
  idField: PropTypes.string,
};

function ValueFinalInput({ idField }) {
  if (idField === 'price') {
    return 500000;
  } else if (idField === 'km') {
    return 300000;
  }
};


const RangeSlider = ({ idField }) => {
  const sliderRef = useRef(null);
  const initialValue = ValueInitialInput({ idField });
  const finalValue = ValueFinalInput({ idField });
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  const [values, setValues] = useState([initialValue, finalValue]);

  useMobileSelectionToggle(minInputRef, maxInputRef);

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
            ref={minInputRef}
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
            ref={maxInputRef}
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

RangeSlider.defaultProps = {
  idField: PropTypes.string,
};

export default RangeSlider;
