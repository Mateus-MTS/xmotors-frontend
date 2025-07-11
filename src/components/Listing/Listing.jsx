import React, { useEffect, useRef, useState } from 'react';
import CarItem from './CarItem';
import carData from './../../data/carData.json'; // ou vir de API/filtro

function Listing() {
    // Estado para filtro
    const [filterType, setFilterType] = useState('todos');

    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [pageGroupStart, setPageGroupStart] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
        setPageGroupStart(1);
    }, [filterType]);


    // Cálculo de índice
    const filteredCars = carData.filter(car => {
        if (filterType === 'novos') return car.condition === 'novo';
        if (filterType === 'usados') return car.condition === 'usado';
        return true; // todos
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = filteredCars.slice(indexOfFirstItem, indexOfLastItem);


    return (
        <>
            <div className="widget-car-service">
                <div className="themesflat-container">
                    <div className="header-section tab-car-service">
                        <div className="heading-section">
                            <span className="sub-title mb-6 wow fadeInUp">Explore todos os veículos</span>
                            <h2 className="title wow fadeInUp">Ver listagem</h2>
                        </div>
                        <ul className="nav nav-pills justify-content-end" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${filterType === 'todos' ? 'active' : ''}`}
                                    onClick={() => setFilterType('todos')}
                                >
                                    Todos
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${filterType === 'novos' ? 'active' : ''}`}
                                    onClick={() => setFilterType('novos')}
                                >
                                    Novos
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link ${filterType === 'usados' ? 'active' : ''}`}
                                    onClick={() => setFilterType('usados')}
                                >
                                    Usados
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home-service" role="tabpanel">
                            <div className="car-list-item">
                                {currentCars.map(car => (
                                    <CarItem key={car.id} {...car} />
                                ))}
                            </div>
                            {renderPagination({
                                totalItems: filteredCars.length,
                                itemsPerPage,
                                currentPage,
                                onPageChange: setCurrentPage,
                                pageGroupStart,
                                onPageGroupChange: setPageGroupStart,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const renderPagination = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
    pageGroupStart,
    onPageGroupChange,
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pageGroupSize = 5;
    const pageGroupEnd = Math.min(pageGroupStart + pageGroupSize - 1, totalPages);

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
                            const newStart = pageGroupStart - pageGroupSize;
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
                    <button onClick={() => onPageChange(page)}>{page} </button>
                </li>
            ))}

            <li>
                <button
                    onClick={() => {
                        if (canGoForward) {
                            const newStart = pageGroupStart + pageGroupSize;
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

export default Listing;