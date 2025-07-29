import { useState } from 'react'
import useStickySidebar from '../../../hooks/useStickySidebar';

function Slide() {
    const [showContentPrice, setShowContentPrice] = useState(false);
    const { sidebarRef, isSticky } = useStickySidebar({
        topSpacing: 20, // Ajuste conforme necessário
        bottomSpacing: 20,
        containerSelector: '.widget-tf-slider',
        innerWrapperSelector: '.slide-item-content'
    });

    const handleIconClick = (event) => {
        setShowContentPrice(!showContentPrice);
    };
    return (
        <>
            {/* Slide */}
            <div className="widget-tf-slider" ref={sidebarRef}>
                <div className="slider-wrap swiper-wrapper">
                    <div className="tf-slide-item swiper-slide">
                        <div className="slide-item-image">
                            <img src="/assets/images/slide/bg.jpg" alt="" />
                            <div className="overlay"></div>
                        </div>
                        <div className={`slide-item-content ${isSticky ? 'is-sticky' : ''}`}>
                            <div className="slide-content">
                                <span className="wow fadeInUp sub-title" data-wow-delay="100ms"
                                    data-wow-duration="2000ms">Venda e anúncie aqui</span>
                                <h1 className=" title-slide wow slideInUp" data-wow-delay="50ms" data-wow-duration="200ms">
                                    seu veículo...</h1>
                                <p className="description wow fadeInUp" data-wow-delay="300ms" data-wow-duration="2000ms">
                                    Carros novos, seminovos, usados. </p>
                                <div className="box">
                                    {/* Button */}
                                    <div className="btn-main wow fadeInUp" data-wow-delay="400ms"
                                        data-wow-duration="2000ms">
                                        <a href="#" className="button_main_inner ">
                                            <span>
                                                Ir para a listagem
                                            </span>
                                        </a>
                                    </div>
                                    {/* Button */}
                                    <div className="video-wrap wow fadeInUp" data-wow-delay="500ms"
                                        data-wow-duration="2000ms">
                                        <a href="https://www.youtube.com/watch?v=ThMXH5MrlZI"
                                            className="popup-youtube btn-video ml-28"
                                            aria-label="Assistir vídeo no YouTube">
                                            <i className="icon-Polygon-6" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="slide-image">
                                <img
                                    src="/assets/images/slide/icon.png"
                                    className="icon-shape wow swing"
                                    alt="Ícone decorativo" />

                                <BoxOffer />
                                <BoxCar showContentPrice={showContentPrice} onIconClick={handleIconClick} /> {/* Passa o estado para BoxCar */}
                            </div>
                            {/* <div className="box">
                                <span>(54) 98122-3491</span>
                                <span>contato@gmail.com</span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

function BoxOffer() {
    return (
        <div className="box-offer">
            <p>40 <span>%</span></p>
            <span>off</span>
        </div>
    );
}

function BoxCar({ showContentPrice, onIconClick }) {
    return (
        <div className="box-car">
            <img src="/assets/images/slide/car.png" alt="Imagem de um carro de luxo" />
            <div className="dot-car">
                <div className="dot">
                    <i
                        className={`icon-Vector-5 ${showContentPrice ? 'active' : ''}`}
                        onClick={onIconClick} // Adiciona o manipulador de clique ao ícone
                        style={{ cursor: 'pointer' }}
                    ></i>
                    <div className={`content-price ${showContentPrice ? 'active' : ''}`}>
                        <div className="proflile">
                            <span>Luxury Ford Car</span>
                            <span className="price">R$13000</span>
                        </div>
                        <p>1421 Av.Ruben Bento Alves, Caxias do Sul, RS</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Slide;