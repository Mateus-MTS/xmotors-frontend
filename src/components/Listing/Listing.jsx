import React, { useEffect, useRef, useState } from 'react';
import CarItem from './CarItem';
import carData from './../../data/carData.json'; // ou vir de API/filtro

function GetListing() {
    const [cars, setCars] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Cálculo de índice
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = carData.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        // Carrega os primeiros 12 carros
        setCars(carData.slice(0, 12));
    }, []);

    return (
        <>
            <div className="widget-car-service">
                <div className="themesflat-container">
                    <div className="header-section tab-car-service">
                        <div className="heading-section">
                            <span className="sub-title mb-6 wow fadeInUp">Explore todos os veículos</span>
                            <h2 className="title wow fadeInUp">Ver listagem</h2>
                        </div>
                        <ul className="nav nav-pills justify-content-end" id="pills-tab-service" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="pills-home-tab-service" data-bs-toggle="pill"
                                    data-bs-target="#pills-home-service" type="button" role="tab"
                                    aria-selected="true">Todos</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-profile-tab-service" data-bs-toggle="pill"
                                    data-bs-target="#pills-profile-service" type="button" role="tab"
                                    aria-selected="false">Novos</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="pills-contact-tab-service" data-bs-toggle="pill"
                                    data-bs-target="#pills-contact-service" type="button" role="tab"
                                    aria-selected="false">Usados</button>
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
                            {renderPagination(carData.length, itemsPerPage, currentPage, setCurrentPage)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const renderPagination = (totalItems, itemsPerPage, currentPage, onPageChange) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <ul className="pagination">
            {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={currentPage === i + 1 ? 'active' : ''}>
                    <button onClick={() => onPageChange(i + 1)}>
                        {i + 1}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default GetListing;