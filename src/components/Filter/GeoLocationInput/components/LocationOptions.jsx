/**
 * Componente de Opções de Localização Automática
 * 
 * Responsabilidades:
 * - Renderizar botões de localização automática
 * - Gerenciar ações dos botões
 * - Controlar visibilidade
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Botão individual de opção
 */
const OptionButton = ({ label, onClick, isActive }) => {
  return (
    <button 
      type="button"
      className={`option-btn ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

OptionButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
};

OptionButton.defaultProps = {
  isActive: false
};

/**
 * Painel de opções de localização automática
 */
const LocationOptions = ({ 
  visible, 
  onMyRegion, 
  onMyState, 
  onAllBrazil,
  isLoading 
}) => {
  if (!visible || isLoading) {
    return null;
  }

  return (
    <div className="location-options">
      <span className="options-title">Localização automática</span>
      <div className="options-buttons">
        <OptionButton
          label="Na minha região"
          onClick={onMyRegion}
          isActive={true}
        />
        <OptionButton
          label="No meu estado"
          onClick={onMyState}
        />
        <OptionButton
          label="Em todo Brasil"
          onClick={onAllBrazil}
        />
      </div>
    </div>
  );
};

LocationOptions.propTypes = {
  visible: PropTypes.bool.isRequired,
  onMyRegion: PropTypes.func.isRequired,
  onMyState: PropTypes.func.isRequired,
  onAllBrazil: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

LocationOptions.defaultProps = {
  isLoading: false
};

export default LocationOptions;