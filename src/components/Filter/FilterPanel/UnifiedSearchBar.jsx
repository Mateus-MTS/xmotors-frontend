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
      <div className="themesflat-container">
        <BrandCarousel
          selectedBrand={filters.brand}
          onSelectBrand={(brand) => {
            logger.info('Marca selecionada via UnifiedSearchBar', { brand });
            updateFilter("brand", brand);
          }}
        />
      </div>
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