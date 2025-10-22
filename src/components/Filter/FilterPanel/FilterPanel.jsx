import { useState } from 'react';
import RangeSlider from '../RangeSlider/RangeSlider';
import GeoLocation from '../GeoLocationInput/GeoLocationInput';
import YearRangeSlider from '../RangeSlider/YearRangeSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faBus } from '@fortawesome/free-solid-svg-icons';

function Filter() {
    const [activeType, setActiveType] = useState("car");

    return (
        <>
            <div className="widget-search-car">
                <div className="themesflat-container">
                    <div className="search-form-widget">
                        <RenderVehicleTypeIcon 
                            activeType={activeType} 
                            onChange={setActiveType} 
                        />
                        <div className="tab-content" id="myTabContent">
                            <RenderCarTab activeType={activeType} />
                            <RenderMotoTab activeType={activeType} />
                            <RenderTruckTab activeType={activeType} />
                            <RenderBusTab activeType={activeType} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function RenderVehicleTypeIcon({ activeType, onChange }) {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">

            {/* Carro */}
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeType === "car" ? "active" : ""}`}
                    id="car-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#car"
                    type="button"
                    role="tab"
                    aria-controls="car"
                    aria-selected={activeType === "car"}
                    onClick={() => onChange("car")}
                >
                    <i><FontAwesomeIcon icon={faCar} /></i>
                </button>
            </li>

            {/* Moto */}
            <li className="nav-item" role="presentation">
                <button 
                    className={`nav-link ${activeType === "moto" ? "active" : ""}`}
                    id="moto-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#moto"
                    type="button"
                    role="tab"
                    aria-controls="moto"
                    aria-selected={activeType === "moto"}
                    onClick={() => onChange("moto")}
                >
                    <i>
                        <svg className="mopped-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="26" 
                            height="16"
                            viewBox="0 0 66 32"
                            fill="currentColor"
                            style={{ display: 'block' }}
                        >
                            <path d="M0 0 C1.65 0 3.3 0 5 0 C9 6.75 9 6.75 9 9 C9.58007812 8.83242187 10.16015625 8.66484375 10.7578125 8.4921875 C15.8492308 7.164722 19.03561901 6.70874724 24 9 C24 9.99 24 10.98 24 12 C20.04 12 16.08 12 12 12 C12.66 13.32 13.32 14.64 14 16 C16.27905376 16.7337355 16.27905376 16.7337355 18.875 16.9375 C22.35681968 17.5312207 23.78781727 17.833285 26.625 20.0625 C28.52657379 24.1249531 28.81464673 27.5913236 28 32 C26.20606332 34.87029869 25.01736724 36.49131638 22 38 C18.94098826 38.42068924 16.05241674 38.49028455 13 38 C10 35.5625 10 35.5625 8 33 C7.67 32.67 7.34 32.34 7 32 C6.39228372 26.34356387 6.84515588 22.80084974 10 18 C9.79356801 15.74671588 9.79356801 15.74671588 9 14 C6.97069776 14.64080358 6.97069776 14.64080358 5 16 C4.19333565 18.34282483 4.19333565 18.34282483 3.9375 21 C3.58984375 23.6875 3.58984375 23.6875 3 26 C-0.122002 28.08133467 -0.93266989 28.2737822 -4.5 28.25 C-5.66015625 28.25773437 -5.66015625 28.25773437 -6.84375 28.265625 C-9 28 -9 28 -12 26 C-12.66 26 -13.32 26 -14 26 C-14.061875 27.051875 -14.12375 28.10375 -14.1875 29.1875 C-15.17253924 33.80960722 -16.11292026 35.32763268 -20 38 C-23.85067103 38.87225145 -27.25547311 38.79065875 -30.87890625 37.1484375 C-33.97840984 34.95264459 -35.39975461 32.69713525 -36.0625 29.0625 C-36.28289412 25.04220722 -35.24917155 22.37375732 -33 19 C-28.76524009 16.17682673 -24.97396771 16.20570748 -20 17 C-17.48470533 18.41825063 -16.01671041 19.87714693 -14 22 C-15.0975223 19.00675737 -15.67682892 18.15389099 -18.625 16.75 C-19.40875 16.5025 -20.1925 16.255 -21 16 C-21 15.34 -21 14.68 -21 14 C-22.65 14 -24.3 14 -26 14 C-26.33 13.01 -26.66 12.02 -27 11 C-27.928125 11.639375 -28.85625 12.27875 -29.8125 12.9375 C-33 15 -33 15 -36 16 C-35.9375 13.75 -35.9375 13.75 -35 11 C-27.42554523 5.19828997 -19.32711826 5.73907361 -10.25390625 6.875 C-7.18036838 7.04545617 -4.83494847 6.12079358 -2 5 C0.875 4.875 0.875 4.875 3 5 C3 4.34 3 3.68 3 3 C2.01 2.67 1.02 2.34 0 2 C0 1.34 0 0.68 0 0 Z M-4.8203125 9.484375 C-9.43304566 10.57555919 -14.28901345 10.13924098 -19 10 C-17.9694173 12.90661347 -17.21181728 13.87806462 -14.49609375 15.44140625 C-8.48654807 17.75060878 -8.48654807 17.75060878 -2.2421875 17.2421875 C2.57052468 14.68500273 2.57052468 14.68500273 5 10 C1.14712382 7.89843117 -0.75115646 8.07373424 -4.8203125 9.484375 Z M-26 10 C-22 11 -22 11 -22 11 Z M-4 21 C-3 25 -3 25 -3 25 Z M-27 23 C-29.2491908 24.82703227 -29.2491908 24.82703227 -29.25 27.5 C-29.2491908 30.17296773 -29.2491908 30.17296773 -27 32 C-24.39719432 31.67958603 -24.39719432 31.67958603 -22 31 C-21.67 30.01 -21.34 29.02 -21 28 C-22.65 28.33 -24.3 28.66 -26 29 C-26 28.01 -26 27.02 -26 26 C-24.68 25.34 -23.36 24.68 -22 24 C-24.39719432 23.32041397 -24.39719432 23.32041397 -27 23 Z M17 23 C17.66 24.98 18.32 26.96 19 29 C17.35 27.68 15.7 26.36 14 25 C13.22757731 26.83700789 13.22757731 26.83700789 13 29 C14.01970318 30.93654948 14.01970318 30.93654948 16 32 C18.65466049 31.76956136 18.65466049 31.76956136 21 31 C21.6878236 28.64632287 21.6878236 28.64632287 22 26 C21.34 25.01 20.68 24.02 20 23 C19.01 23 18.02 23 17 23 Z" transform="translate(36,0)" />
                        </svg>
                    </i>
                </button>
            </li>

            {/* Caminhão */}
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeType === "truck" ? "active" : ""}`}
                    id="truck-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#truck"
                    type="button"
                    role="tab"
                    aria-controls="truck"
                    aria-selected={activeType === "truck"}
                    onClick={() => onChange("truck")}
                >
                    <i><FontAwesomeIcon icon={faTruck} /></i>
                </button>
            </li>

            {/* Ônibus */}
            <li className="nav-item" role="presentation">
                <button
                    className={`nav-link ${activeType === "bus" ? "active" : ""}`}
                    id="bus-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#bus"
                    type="button"
                    role="tab"
                    aria-controls="bus"
                    aria-selected={activeType === "bus"}
                    onClick={() => onChange("bus")}
                >
                    <i><FontAwesomeIcon icon={faBus} /></i>
                </button>
            </li>
        </ul>
    );
}

// Tab para Carros
function RenderCarTab({ activeType }) {
    const isActive = activeType === "car";
    
    return (
        <div 
            className={`tab-pane fade ${isActive ? "show active" : ""}`} 
            id="car" 
            role="tabpanel" 
            aria-labelledby="car-tab"
        >
            <SearchForm id="search-forms" />
        </div>
    );
}

// Tab para Motos
function RenderMotoTab({ activeType }) {
    const isActive = activeType === "moto";
    
    return (
        <div 
            className={`tab-pane fade ${isActive ? "show active" : ""}`} 
            id="moto" 
            role="tabpanel" 
            aria-labelledby="moto-tab"
        >
            <SearchForm id="search-forms2" />
        </div>
    );
}

// Tab para Caminhões
function RenderTruckTab({ activeType }) {
    const isActive = activeType === "truck";
    
    return (
        <div 
            className={`tab-pane fade ${isActive ? "show active" : ""}`} 
            id="truck" 
            role="tabpanel" 
            aria-labelledby="truck-tab"
        >
            <SearchForm id="search-forms3" />
        </div>
    );
}

// Tab para Ônibus
function RenderBusTab({ activeType }) {
    const isActive = activeType === "bus";
    
    return (
        <div 
            className={`tab-pane fade ${isActive ? "show active" : ""}`} 
            id="bus" 
            role="tabpanel" 
            aria-labelledby="bus-tab"
        >
            <SearchForm id="search-forms4" />
        </div>
    );
}

function SearchForm({ id }) {
    return (
        <form method="post" id={id}>
            <div className="inner-group grid">
                <div className="form-group">
                    <div>
                        <p className="price-range">Localização</p>
                        <GeoLocation />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <p className="price-range">Preço</p>
                        <RangeSlider idField={"price"} />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <p className="price-range">Km</p>
                        <RangeSlider idField={"km"} />
                    </div>
                </div>
                <div className="form-group">
                    <div>
                        <p className="price-range">Ano</p>
                        <YearRangeSlider />
                    </div>
                </div>
                <div className="form-group">
                    <div className="geo-autocomplete">
                        <p className="price-range">Combustível</p>
                        <input type="text" placeholder="Todos" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="geo-autocomplete">
                        <p className="price-range">Cor</p>
                        <input type="text" placeholder="Todas" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="geo-autocomplete">
                        <p className="price-range">Modelo</p>
                        <input type="text" placeholder="Todos" />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="button-search-listing">
                        <i className="icon-search-1"></i>
                        Pesquisar
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Filter;