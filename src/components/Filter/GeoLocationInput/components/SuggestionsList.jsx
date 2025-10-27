/**
 * Componente de Lista de Sugestões
 * 
 * Responsabilidades:
 * - Renderizar lista de sugestões
 * - Aplicar estilos específicos por tipo
 * - Gerenciar interação/seleção
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Renderiza uma sugestão individual
 */
const SuggestionItem = ({ item, onSelect }) => {
  const getClassName = () => {
    if (item.isLoading) return 'suggestion-loading';
    if (item.isDDD) return 'suggestion-ddd';
    if (item.isState) return 'suggestion-state';
    if (item.isRegion) return 'suggestion-region';
    return 'suggestion-city';
  };

  const getStyle = () => {
    if (item.isLoading) {
      return { cursor: 'default', opacity: 0.7 };
    }
    return {};
  };

  const handleClick = () => {
    if (item.isLoading) return;
    onSelect(item);
  };

  return (
    <li 
      onClick={handleClick}
      role="option"
      aria-selected={false}
      className={getClassName()}
      style={getStyle()}
    >
      {item.isDDD ? (
        <div className="suggestion-ddd-content">
          <div className="city-name">{item.display_name}</div>
          <div className="ddd-region">{item.display_subtitle}</div>
        </div>
      ) : (
        item.display_name
      )}
    </li>
  );
};

SuggestionItem.propTypes = {
  item: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    display_subtitle: PropTypes.string,
    isLoading: PropTypes.bool,
    isDDD: PropTypes.bool,
    isState: PropTypes.bool,
    isRegion: PropTypes.bool
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

/**
 * Lista de sugestões completa
 */
const SuggestionsList = ({ suggestions, onSelect, visible }) => {
  if (!visible || suggestions.length === 0) {
    return null;
  }

  return (
    <ul 
      className="suggestions"
      role="listbox"
      aria-label="Sugestões de localização"
    >
      {suggestions.map((item, i) => (
        <SuggestionItem
          key={`${item.state || item.ddd || 'item'}-${item.name || i}-${i}`}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
};

SuggestionsList.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelect: PropTypes.func.isRequired,
  visible: PropTypes.bool
};

SuggestionsList.defaultProps = {
  visible: true
};

export default SuggestionsList;