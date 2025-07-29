import React, { useState, useEffect } from 'react';
import CarItem from './CarItem/CarItem.jsx';
import carData from '../../data/carData.json';
import ListingView from './ListingView/ListingView.jsx';

// Constantes para configuração
const ITEMS_PER_PAGE = 12;
const PAGINATION_GROUP_SIZE = 5;

// Objeto para tipos de filtro
const FILTER_TYPES = {
    ALL: 'todos',
    NEW: 'novos',
    USED: 'usados'
};

/**
 * Componente para botão de filtro
 */
const FilterButton = ({ active, label, onClick }) => (
    <li className="nav-item" role="presentation">
        <button className={`nav-link ${active ? 'active' : ''}`} onClick={onClick}>
            {label}
        </button>
    </li>
);

/**
 * Componente de Paginação
 */
const Pagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    pageGroupStart,
    onPageGroupChange
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageGroupEnd = Math.min(pageGroupStart + PAGINATION_GROUP_SIZE - 1, totalPages);

    const currentPageGroup = Array.from(
        { length: pageGroupEnd - pageGroupStart + 1 },
        (_, i) => pageGroupStart + i
    );

    const canGoBack = pageGroupStart > 1;
    const canGoForward = pageGroupEnd < totalPages;

    return (
        <ul className="pagination">
            <li>
                <button
                    onClick={() => {
                        if (canGoBack) {
                            const newStart = pageGroupStart - PAGINATION_GROUP_SIZE;
                            onPageGroupChange(newStart);
                            onPageChange(newStart);
                        }
                    }}
                    disabled={!canGoBack}
                    title="Anterior"
                >
                    ◀
                </button>
            </li>

            {currentPageGroup.map((page) => (
                <li key={page} className={currentPage === page ? 'active' : ''}>
                    <button onClick={() => onPageChange(page)}>{page}</button>
                </li>
            ))}

            <li>
                <button
                    onClick={() => {
                        if (canGoForward) {
                            const newStart = pageGroupStart + PAGINATION_GROUP_SIZE;
                            const nextPage = newStart <= totalPages ? newStart : totalPages;
                            onPageGroupChange(newStart);
                            onPageChange(nextPage);
                        }
                    }}
                    disabled={!canGoForward}
                    title="Próximo"
                >
                    ▶
                </button>
            </li>
        </ul>
    );
};

/**
 * Função para filtrar carros
 */
const filterCars = (cars, filterType) => {
    switch (filterType) {
        case FILTER_TYPES.NEW:
            return cars.filter(car => car.condition === 'novo');
        case FILTER_TYPES.USED:
            return cars.filter(car => car.condition === 'usado');
        default:
            return cars;
    }
};

/**
 * Componente principal Listing
 */
const Listing = () => {
    const [filterType, setFilterType] = useState(FILTER_TYPES.ALL);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageGroupStart, setPageGroupStart] = useState(1);
    const [viewType, setViewType] = useState('grid');

    // Resetar paginação quando o filtro mudar
    useEffect(() => {
        setCurrentPage(1);
        setPageGroupStart(1);
    }, [filterType]);

    // Aplicar filtros
    const filteredCars = filterCars(carData, filterType);

    // Calcular itens da página atual
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="widget-car-service">
            {/* <ListingView viewType={viewType} onViewTypeChange={setViewType} /> */}

            <div className="themesflat-container">
                <div className="header-section tab-car-service">
                    <div className="heading-section">
                        <span className="sub-title mb-6 wow fadeInUp">Explore todos os veículos</span>
                        <h2 className="title wow fadeInUp">Ver listagem</h2>
                    </div>
                    <ul className="nav nav-pills justify-content-end" role="tablist">
                        <FilterButton
                            active={filterType === FILTER_TYPES.ALL}
                            label="Todos"
                            onClick={() => setFilterType(FILTER_TYPES.ALL)}
                        />
                        <FilterButton
                            active={filterType === FILTER_TYPES.NEW}
                            label="Novos"
                            onClick={() => setFilterType(FILTER_TYPES.NEW)}
                        />
                        <FilterButton
                            active={filterType === FILTER_TYPES.USED}
                            label="Usados"
                            onClick={() => setFilterType(FILTER_TYPES.USED)}
                        />
                    </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="pills-home-service" role="tabpanel">
                        {/* <div className={`car-list-item ${viewType === 'list' ? 'list-view' : ''}`}> */}
                        <div className="car-list-item">
                            {currentCars.map(car => (
                                <CarItem key={car.id} {...car} />
                            ))}
                        </div>
                        <Pagination
                            totalItems={filteredCars.length}
                            itemsPerPage={ITEMS_PER_PAGE}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            pageGroupStart={pageGroupStart}
                            onPageGroupChange={setPageGroupStart}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;