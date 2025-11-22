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

import React from "react";
import PropTypes from "prop-types";
import BrandCarousel from "./BrandCarousel";
import logger from "../../../utils/logger";

// ============================================
// COMPONENTE: UnifiedSearchBar
// ============================================
function UnifiedSearchBar({ filters, updateFilter }) {

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
};

export default UnifiedSearchBar;