/**
 * CarBrandFilter - Componente de Filtro e Busca de Veículos
 * 
 * Responsabilidades:
 * - Exibir interface de busca unificada (localização, modelo)
 * - Gerenciar carrossel de marcas de veículos com navegação infinita
 * - Coordenar filtros de busca
 * - Processar solicitações de pesquisa
 */

import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import GeoLocation from "../GeoLocationInput/GeoLocationInput";

// ============================================
// COMPONENTE: BrandCarousel - Carrossel de Marcas
// ============================================

/**
 * BrandCarousel - Componente de carrossel para exibição de marcas de veículos
 * com navegação infinita e arrastável
 * 
 * @param {string} selectedBrand - Marca atualmente selecionada
 * @param {function} onSelectBrand - Callback quando uma marca é selecionada
 */
function BrandCarousel({ selectedBrand, onSelectBrand }) {
  // ============================================
  // DADOS - Lista de marcas de veículos
  // ============================================
  const brands = [
    { name: "volkswagen", logo: "../../../../public/assets/images/brands/volkswagen-logo.svg", color: "#0071bc" },
    { name: "Fiat", logo: "../../../../public/assets/images/brands/fiat-logo.svg", color: "#e50914" },
    { name: "Toyota", logo: "../../../../public/assets/images/brands/toyota-logo.svg", color: "#eb0a1e" },
    { name: "Chevrolet", logo: "../../../../public/assets/images/brands/chevrolet-logo.png", color: "#ffb700" },
    { name: "BYD", logo: "../../../../public/assets/images/brands/byd-logo.svg", color: "#e60012" },
    { name: "Honda", logo: "../../../../public/assets/images/brands/honda-logo.svg", color: "#e60012" },
    { name: "Hyundai", logo: "../../../../public/assets/images/brands/hyundai-logo.svg", color: "#003865" },
    { name: "Volvo", logo: "../../../../public/assets/images/brands/volvo-logo.svg", color: "#003580" },
    { name: "Nissan", logo: "../../../../public/assets/images/brands/nissan-logo.svg", color: "#b00000" },
    { name: "Tesla", logo: "../../../../public/assets/images/brands/tesla-logo.svg", color: "#cc0000" },
    { name: "Peugeot", logo: "../../../../public/assets/images/brands/peugeot-logo2.png", color: "#0055a4" },
    { name: "Renault", logo: "../../../../public/assets/images/brands/renault-logo.svg", color: "#ffed00" },
    { name: "Citroen", logo: "../../../../public/assets/images/brands/citroen-logo.svg", color: "#ffffff" },
    { name: "Porsche", logo: "../../../../public/assets/images/brands/porsche-logo.svg", color: "#000000" },
    { name: "Ford", logo: "../../../../public/assets/images/brands/ford-logo.svg", color: "#003399" },
    { name: "Jeep", logo: "../../../../public/assets/images/brands/jeep-logo.svg", color: "#042b19ff" },
    { name: "Mitsubishi", logo: "../../../../public/assets/images/brands/mitsubishi-logo.svg", color: "#e60012" },
    { name: "BMW", logo: "../../../../public/assets/images/brands/bmw-logo.svg", color: "#000000" },
    { name: "Audi", logo: "../../../../public/assets/images/brands/audi-logo.svg", color: "#000000" },
    { name: "Mercedes", logo: "../../../../public/assets/images/brands/mercedes-logo.svg", color: "#000000" },
    { name: "KIA", logo: "../../../../public/assets/images/brands/kia-logo.svg", color: "#e60012" },
  ];

  // ============================================
  // REFS - Referências do DOM e estados
  // ============================================
  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // ============================================
  // EFFECTS - Inicialização do carrossel
  // ============================================

  /**
   * useEffect - Configura o carrossel na posição inicial
   */
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Posiciona no início (primeira marca)
    container.scrollLeft = 0;
  }, []);

  // ============================================
  // HANDLERS - Navegação do carrossel
  // ============================================

  /**
   * scroll - Controla a navegação horizontal do carrossel com loop infinito
   * @param {string} direction - Direção do scroll ('left' ou 'right')
   */
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 120; // Largura mínima do card
    const gap = 24; // Espaçamento entre cards (1.5rem)
    const scrollAmount = cardWidth + gap;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (direction === 'left') {
      // Se está no início, vai para o final (loop infinito)
      if (currentScroll <= 0) {
        container.scrollLeft = maxScroll;
      } else {
        container.scrollLeft -= scrollAmount;
      }
    } else {
      // Se está no final, vai para o início (loop infinito)
      if (currentScroll >= maxScroll - 10) { // -10 para tolerância
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  // ============================================
  // HANDLERS - Drag and Drop
  // ============================================

  /**
   * handleMouseDown - Inicia o arraste do carrossel
   * @param {Event} e - Evento de mouse
   */
  const handleMouseDown = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    isDraggingRef.current = true;
    startXRef.current = e.pageX - container.offsetLeft;
    scrollLeftRef.current = container.scrollLeft;
    container.style.cursor = 'grabbing';
    container.style.userSelect = 'none';
  };

  /**
   * handleMouseMove - Controla o movimento durante o arraste
   * @param {Event} e - Evento de mouse
   */
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;

    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - startXRef.current) * 2; // Multiplicador para sensibilidade
    container.scrollLeft = scrollLeftRef.current - walk;
  };

  /**
   * handleMouseUp - Finaliza o arraste do carrossel
   */
  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;

    const container = scrollRef.current;
    if (container) {
      container.style.cursor = 'grab';
      container.style.userSelect = 'auto';
    }

    isDraggingRef.current = false;
  };

  /**
   * handleMouseLeave - Limpa estado se mouse sair do container
   */
  const handleMouseLeave = () => {
    if (!isDraggingRef.current) return;
    handleMouseUp();
  };

  // ============================================
  // HANDLERS - Seleção de marca
  // ============================================

  /**
   * handleBrandClick - Gerencia clique na marca (seleção/desseleção)
   * @param {string} brandName - Nome da marca clicada
   */
  const handleBrandClick = (brandName) => {
    if (isDraggingRef.current) return; // Não seleciona se estiver arrastando

    // Alterna seleção: se já está selecionada, desseleciona
    const newSelection = selectedBrand === brandName ? null : brandName;
    onSelectBrand(newSelection);
  };

  // ============================================
  // RENDER - Estrutura do carrossel
  // ============================================
  return (
    <div className="brand-carousel-container">
      {/* Botão de navegação esquerda */}
      <button
        className="carousel-nav left"
        onClick={() => scroll('left')}
        aria-label="Rolar para esquerda"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>

      {/* Container scrollável das marcas com suporte a arraste */}
      <div
        className="brands-scroll"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: 'grab' }}
      >
        {brands.map((brand, index) => (
          <button
            key={index}
            className={`brand-card ${selectedBrand === brand.name ? 'selected' : ''}`}
            onClick={() => handleBrandClick(brand.name)}
            style={{
              '--brand-color': brand.color, // CSS custom property para cor da marca
            }}
          >
            <div className="brand-icon">
              <img src={brand.logo} alt={brand.name} title={brand.name} />
            </div>
            <span className="brand-name">{brand.name}</span>
          </button>
        ))}
      </div>

      {/* Botão de navegação direita */}
      <button
        className="carousel-nav right"
        onClick={() => scroll('right')}
        aria-label="Rolar para direita"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL: CarBrandFilter
// ============================================

/**
 * CarBrandFilter - Componente principal de filtro de veículos
 * 
 * @param {Object} filters - Objeto contendo filtros atuais
 * @param {function} filters.updateFilter - Função para atualizar filtros
 * @param {string} filters.location - Localização atual do filtro
 */
export default function CarBrandFilter(filters) {
  // ============================================
  // ESTADOS - Gerenciamento do estado do componente
  // ============================================
  const [selectedBrand, setSelectedBrand] = useState(null); // Inicia sem seleção
  const [location, setLocation] = useState('');
  const [model, setModel] = useState('');

  // ============================================
  // HANDLERS - Processamento de ações do usuário
  // ============================================

  /**
   * handleSearch - Processa a solicitação de busca com os filtros atuais
   */
  const handleSearch = () => {
    // Estrutura dados para envio/processamento
    const searchData = {
      brand: selectedBrand,
      location,
      model,
      fuel
    };

    // Log para debugging e analytics
    console.log('Busca realizada:', searchData);
  };

  // ============================================
  // RENDER - Interface do usuário
  // ============================================
  return (
    <div className="filter-container">
      {/* Seção de Busca Unificada */}
      <div className="search-section">
        <div className="search-bar">
          {/* Campo de Localização */}
          <div className="search-field location-field">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="field-icon" />
            <GeoLocation
              value={filters.location}
              onChange={(v) => filters.updateFilter?.("location", v)}
            />
          </div>

          {/* Campo de Modelo */}
          <div className="search-field">
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Modelo do veículo"
            />
          </div>

          {/* Botão de Ação - Buscar */}
          <button type="button" onClick={handleSearch} className="search-button">
            <FontAwesomeIcon icon={faSearch} />
            Buscar
          </button>
        </div>
      </div>

      {/* Carrossel de Marcas de Veículos */}
      <BrandCarousel
        selectedBrand={selectedBrand}
        onSelectBrand={setSelectedBrand}
      />

      {/* Estilos CSS-in-JS */}
      <style>{`
        .filter-container {
          max-width: 1350px;
          margin: 0 auto;
          padding: 2rem 1rem;
          background: linear-gradient(180deg, #0a0a0a 0%, #1a0a0a 50%, #000 100%);
          min-height: 400px;
          border-radius: 20px;
        }

        .search-section {
          margin-bottom: 3rem;
        }

        .search-bar {
          display: grid;
          grid-template-columns: 1.5fr 1.2fr 1fr auto;
          gap: 1rem;
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
        }

        .search-field {
          position: relative;
          display: flex;
          align-items: center;
        }

        .location-field {
          border-right: 1px solid #e5e7eb;
          padding-right: 1rem;
        }

        .field-icon {
          color: #dc2626;
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }

        .search-field input {
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          outline: none;
        }

        .search-field input::placeholder {
          color: #9ca3af;
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
          color: white;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
          font-size: 0.95rem;
        }

        .search-button:hover {
          background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        }

        .brand-carousel-container {
          position: relative;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .carousel-nav {
          flex-shrink: 1;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          backdrop-filter: blur(10px);
          z-index: 2;
          font-size: 1.25rem;
        }

        .carousel-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .brands-scroll {
          display: flex;
          gap: 1.5rem;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 1rem 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }

        .brands-scroll:active {
          cursor: grabbing;
        }

        .brands-scroll::-webkit-scrollbar {
          display: none;
        }

        .brand-card {
          flex-shrink: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          min-width: 120px;
          backdrop-filter: blur(10px);
        }

        .brand-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-4px) scale(1.02);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .brand-card.selected {
          background: linear-gradient(135deg, var(--brand-color) 0%, #000 100%);
          border-color: var(--brand-color);
          transform: translateY(-8px) scale(1.1);
          box-shadow: 
            0 0 30px var(--brand-color),
            0 0 60px rgba(255, 255, 255, 0.3),
            0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .brand-icon {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          transition: all 0.4s;
        }

        .brand-icon img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .brand-card.selected .brand-icon {
          transform: scale(1.1);
        }

        .brand-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.7);
          transition: all 0.3s;
          text-align: center;
        }

        .brand-card.selected .brand-name {
          color: var(--brand-color);
          font-weight: 700;
        }

        /* Responsividade */
        @media (max-width: 1024px) {
          .search-bar {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }

          .location-field {
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
            padding-right: 0;
            padding-bottom: 0.75rem;
          }

          .search-button {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .filter-container {
            padding: 1rem 0.5rem;
          }

          .carousel-nav {
            width: 40px;
            height: 40px;
          }

          .brand-card {
            min-width: 100px;
            padding: 1rem 0.75rem;
          }

          .brand-icon {
            width: 64px;
            height: 64px;
            font-size: 2rem;
          }

          .brand-name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .search-bar {
            padding: 0.75rem;
          }

          .brand-card {
            min-width: 85px;
          }

          .brand-icon {
            width: 56px;
            height: 56px;
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
}