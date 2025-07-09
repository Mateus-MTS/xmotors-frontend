import React from 'react';

const CarItem = ({
    title,
    subtitle,
    price,
    year,
    featured,
    mileage,
    fuel,
    transmission,
    acceptsExchange,
    images
}) => {
    return (
        <>
            <div className="tf-car-service">
                <a href="listing-details.html" className="image">
                    <div className="stm-badge-top">
                        {featured && (
                            <div className="feature">
                                <span>Destaque</span>
                                <div className="cut">
                                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                            fill="white"></path>
                                        <path
                                            d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                            fill="white"></path>
                                    </svg>
                                    <p>{images.length}</p>
                                </div>
                            </div>
                        )}
                        <span>{year}</span>
                    </div>

                    <div className="listing-images">
                        <div className="hover-listing-image">
                            <div className="wrap-hover-listing">
                                {images.map((img, i) => (
                                    <div key={i} className={`listing-item ${i === 0 ? 'active' : ''}`}>
                                        <div className="images">
                                            <img src={img} alt={`car-${i}`} />
                                        </div>
                                    </div>
                                ))}
                                {images.length > 2 && (
                                    <div className="listing-item view-gallery">
                                        <div className="images">
                                            <img src={images[2]} alt="more" />
                                            <div className="overlay-limit">
                                                <img src="/assets/images/car-list/img.png" alt="icon" />
                                                <p>Mais {images.length - 4} fotos</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </a>

                <div className="content">
                    <span className="sub-title">{subtitle}</span>
                    <h6 className="title">
                        <a href="listing-details.html">{title}</a>
                    </h6>
                    <span className="price">R$ {price.toLocaleString()}</span>


                    <p className="exchange-info">
                        {acceptsExchange ? 'Aceita trocas' : ''}
                    </p>

                    <div className="description">
                        <ul>
                            <li className="listing-information fuel">
                                <i className="icon-gasoline-pump-1"></i>
                                <div className="inner">
                                    <span>Combustível</span>
                                    <p>{fuel}</p>
                                </div>
                            </li>
                            <li className="listing-information size-engine">
                                <i className="icon-Group1"></i>
                                <div className="inner">
                                    <span>Km</span>
                                    <p>{mileage}</p>
                                </div>
                            </li>
                            <li className="listing-information transmission">
                                <i className="icon-gearbox-1"></i>
                                <div className="inner">
                                    <span>Câmbio</span>
                                    <p>{transmission}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-btn-wrap">
                        <div className="btn-read-more">
                            <a className="more-link" href="listing-details.html">
                                <span>Ver detalhes</span>
                                <i className="icon-arrow-right2"></i>
                            </a>
                        </div>
                        <div className="btn-group">
                            <a href="#" className="icon-service">
                                <i className="icon-shuffle-2-11"></i>
                            </a>
                            <a href="#" className="icon-service">
                                <i className="icon-heart-1-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>



    );
};

export default CarItem;
