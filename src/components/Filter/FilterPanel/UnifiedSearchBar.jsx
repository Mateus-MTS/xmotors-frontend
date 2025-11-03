/**
 * UnifiedSearchBar - Barra de Busca Unificada
 * 
 * Responsabilidades:
 * - Integrar todos os campos de busca em uma barra
 * - Gerenciar estado dos filtros
 * - Controlar dropdown de combustível
 * - Exibir carrossel de marcas
 * - Registrar ações do usuário via logger
 */

import { useState } from "react";
import PropTypes from "prop-types";
import GeoLocation from "../GeoLocationInput/GeoLocationInput";
import BrandCarousel from "./BrandCarousel";
import logger from "../../../utils/logger";

// ============================================
// COMPONENTE: UnifiedSearchBar
// ============================================
function UnifiedSearchBar({ filters, updateFilter, onSubmit, fuelTypes }) {
  // ============================================
  // ESTADOS
  // ============================================
  const [showFuelOptions, setShowFuelOptions] = useState(false);

  // ============================================
  // HANDLERS - Seleção de combustível
  // ============================================
  function handleSelectFuel(fuel) {
    logger.info('Combustível selecionado', { fuel });
    updateFilter("fuel", fuel);
    setShowFuelOptions(false);
  }

  // ============================================
  // HANDLERS - Mudança nos campos
  // ============================================
  function handleLocationChange(value) {
    logger.input('Localização alterada na barra unificada', { location: value });
    updateFilter("location", value);
  }

  function handleModelChange(e) {
    const value = e.target.value;
    logger.input('Modelo alterado', { model: value });
    updateFilter("model", value);
  }

  // ============================================
  // HANDLERS - Foco e blur
  // ============================================
  function handleFuelFocus() {
    logger.focus('Campo de combustível focado');
    setShowFuelOptions(true);
  }

  function handleFuelBlur() {
    logger.debug('Campo de combustível perdeu foco');
    setTimeout(() => setShowFuelOptions(false), 150);
  }

  // ============================================
  // HANDLERS - Submit
  // ============================================
  function handleSubmit(e) {
    e.preventDefault();
    logger.search('Busca submetida via UnifiedSearchBar', { filters });
    onSubmit(e);
  }

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="unified-search">
      {/* Barra unificada */}
      <form onSubmit={handleSubmit} className="unified-bar">
        <div className="field">
          <GeoLocation
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>

        <div className="field">
          <input
            type="text"
            value={filters.model || ''}
            onChange={handleModelChange}
            placeholder="Modelo"
          />
        </div>

        <div className="field fuel">
          <input
            type="text"
            value={filters.fuel || ''}
            readOnly
            placeholder="Combustível"
            onFocus={handleFuelFocus}
            onBlur={handleFuelBlur}
          />
          {showFuelOptions && (
            <ul className="fuel-options">
              {fuelTypes.map((item, i) => (
                <li 
                  key={i} 
                  onClick={() => handleSelectFuel(item.display_name)}
                  onMouseEnter={() => logger.debug('Hover em opção de combustível', { fuel: item.display_name })}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button type="submit" className="btn-search">
          Buscar
        </button>
      </form>

      {/* Carrossel de marcas */}
      <BrandCarousel 
        selectedBrand={filters.brand}
        onSelectBrand={(brand) => {
          logger.info('Marca selecionada via UnifiedSearchBar', { brand });
          updateFilter("brand", brand);
        }}
      />
    </div>
  );
}

// ============================================
// PROP TYPES
// ============================================
UnifiedSearchBar.propTypes = {
  filters: PropTypes.object.isRequired,
  updateFilter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  fuelTypes: PropTypes.array.isRequired,
};

export default UnifiedSearchBar;