import { useState, useEffect } from 'react';

// TODO: Implementar paginação e filtros
// Vai ser o componente que envolve toda a listagem de carros
// Inclui botões de troca de visualização (grid/lista)
// e mantém o estado da visualização no localStorage
// Também pode incluir filtros e paginação no futuro
// Exemplo de uso:
export default function ListingView() {
  const [viewType, setViewType] = useState(localStorage.getItem('VIEW_LISTING_TYPE') || 'grid');

  useEffect(() => {
    localStorage.setItem('VIEW_LISTING_TYPE', viewType);
  }, [viewType]);

  return (
    <div className="tf-my-listing-search">
      <div className="view-options">
        <button
          className={`btn-display-listing-grid ${viewType === 'grid' ? 'active' : ''}`}
          onClick={() => setViewType('grid')}
        >
          Grid
        </button>
        <button
          className={`btn-display-listing-list ${viewType === 'list' ? 'active' : ''}`}
          onClick={() => setViewType('list')}
        >
          List
        </button>
      </div>
      
      <div className={`listing-list-car-wrap ${viewType === 'list' ? 'listing-list-car-list' : ''}`}>

        {/* Itens da lista */}
      </div>
    </div>
  );
}