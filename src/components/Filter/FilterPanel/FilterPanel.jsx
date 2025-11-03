/**
 * FilterPanel - Painel Principal de Filtros
 * 
 * Responsabilidades:
 * - Gerenciar tabs de tipos de veículos (carro, moto, caminhão, ônibus)
 * - Coordenar estado global dos filtros
 * - Exibir filtros avançados (preço, km, ano)
 * - Integrar barra de busca unificada
 * - Resetar filtros ao trocar de tipo de veículo
 * - Registrar navegação e ações do usuário
 */

import { useState, useEffect } from "react";
import useFilterState from "../../../hooks/useFilterState";
import RangeSlider from "../RangeSlider/RangeSlider";
import YearRangeSlider from "../RangeSlider/YearRangeSlider";
import { GeoLocationProvider } from "../GeoLocationInput/GeoLocationProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faTruck, faBus, faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import UnifiedSearchBar from "./UnifiedSearchBar";
import logger from "../../../utils/logger";

// ============================================
// COMPONENTE: FilterPanel
// ============================================
function FilterPanel() {
  // ============================================
  // ESTADOS
  // ============================================
  const [activeType, setActiveType] = useState("car");
  const { filters, updateFilter, resetFilters } = useFilterState();

  // ============================================
  // DADOS - Tipos de combustível
  // ============================================
  const fuelTypes = [
    { display_name: "Gasolina" },
    { display_name: "Álcool" },
    { display_name: "Diesel" },
    { display_name: "Flex" },
    { display_name: "Elétrico" },
    { display_name: "Híbrido" },
    { display_name: "GNV" },
  ];

  // ============================================
  // DADOS - Tipos de veículos
  // ============================================
  const vehicles = [
    { type: "car", icon: faCar, label: "Carro" },
    { type: "moto", icon: faMotorcycle, label: "Moto", customSvg: true },
    { type: "truck", icon: faTruck, label: "Caminhão" },
    { type: "bus", icon: faBus, label: "Ônibus" },
  ];

  // ============================================
  // EFFECTS - Reset ao trocar tipo de veículo
  // ============================================
  useEffect(() => {
    logger.info('Tipo de veículo alterado, resetando filtros', { 
      previousType: activeType, 
      newType: activeType 
    });
    resetFilters();
  }, [activeType]);

  // ============================================
  // HANDLERS - Mudança de tipo de veículo
  // ============================================
  function handleVehicleTypeChange(type) {
    logger.info('Usuário trocou tipo de veículo', { 
      from: activeType, 
      to: type 
    });
    setActiveType(type);
  }

  // ============================================
  // HANDLERS - Atualização de filtros
  // ============================================
  function handleUpdateFilter(field, value) {
    logger.debug('Filtro atualizado', { field, value });
    updateFilter(field, value);
  }

  // ============================================
  // HANDLERS - Submit do formulário
  // ============================================
  function handleSubmit(e) {
    e.preventDefault();
    
    logger.group('📋 BUSCA REALIZADA');
    logger.info('Tipo de veículo', { type: activeType });
    logger.info('Filtros aplicados', filters);
    logger.searchResults('Total de filtros ativos', { 
      count: Object.keys(filters).filter(key => filters[key]).length 
    });
    logger.groupEnd();

    console.log("Filtros atuais:", filters);
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <GeoLocationProvider>
      <div className="widget-search-car">
        <div className="themesflat-container">
          <div className="search-form-widget">
            {/* Tabs de navegação */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {vehicles.map((vehicle) => (
                <li key={vehicle.type} className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeType === vehicle.type ? "active" : ""}`}
                    id={`${vehicle.type}-tab`}
                    data-bs-toggle="tab"
                    data-bs-target={`#${vehicle.type}`}
                    type="button"
                    role="tab"
                    onClick={() => handleVehicleTypeChange(vehicle.type)}
                    aria-label={`Selecionar ${vehicle.label}`}
                  >
                    <FontAwesomeIcon icon={vehicle.icon} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Conteúdo das tabs */}
            <div className="tab-content" id="myTabContent">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.type}
                  className={`tab-pane fade ${activeType === vehicle.type ? "show active" : ""}`}
                  id={vehicle.type}
                  role="tabpanel"
                >
                  {/* Filtros avançados */}
                  <form onSubmit={handleSubmit}>
                    <div className="inner-group grid">
                      {/* Filtro de Preço */}
                      <div className="form-group">
                        <p>Preço</p>
                        <RangeSlider
                          idField="price"
                          value={filters.price}
                          onChange={(v) => {
                            logger.debug('Range de preço alterado', { price: v });
                            handleUpdateFilter("price", v);
                          }}
                        />
                      </div>

                      {/* Filtro de Quilometragem */}
                      <div className="form-group">
                        <p>Km</p>
                        <RangeSlider
                          idField="km"
                          value={filters.km}
                          onChange={(v) => {
                            logger.debug('Range de KM alterado', { km: v });
                            handleUpdateFilter("km", v);
                          }}
                        />
                      </div>

                      {/* Filtro de Ano */}
                      <div className="form-group">
                        <p>Ano</p>
                        <YearRangeSlider
                          value={filters.year}
                          onChange={(v) => {
                            logger.debug('Range de ano alterado', { year: v });
                            handleUpdateFilter("year", v);
                          }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Barra de busca unificada */}
        <UnifiedSearchBar
          filters={filters}
          updateFilter={handleUpdateFilter}
          onSubmit={handleSubmit}
          fuelTypes={fuelTypes}
        />
      </div>
    </GeoLocationProvider>
  );
}

export default FilterPanel;