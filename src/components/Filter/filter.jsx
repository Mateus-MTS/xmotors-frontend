import { useState } from 'react'

function Filter() {
    return (
        <>
            <div className="widget-search-car">
                <div className="themesflat-container">
                    <div className="search-form-widget">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                    data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                    aria-selected="true">Todos</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                    type="button" role="tab" aria-controls="profile" aria-selected="false">Usados</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                    type="button" role="tab" aria-controls="contact" aria-selected="false">novos
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <form method="post" id="search-forms">
                                    <div className="inner-group grid">
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Marcas</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Marcas</li>
                                                        <li data-value="Acura" className="option">Acura</li>
                                                        <li data-value="Audi" className="option">Audi</li>
                                                        <li data-value="Bentley" className="option">Bentley</li>
                                                        <li data-value="BMV" className="option">BMV</li>
                                                        <li data-value="Chevrolet" className="option">Chevrolet</li>
                                                        <li data-value="Ferrari" className="option">Ferrari</li>
                                                        <li data-value="Ford" className="option">Ford</li>
                                                        <li data-value="Lexus" className="option">Lexus</li>
                                                        <li data-value="Maybach" className="option">Maybach</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Modelos</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Modelos</li>
                                                        <li data-value="3 Series" className="option">3 Series</li>
                                                        <li data-value="718 Boxster T" className="option">718 Boxster T</li>
                                                        <li data-value="718 Cayman" className="option">718 Cayman</li>
                                                        <li data-value="911 Carrera 4" className="option">911 Carrera 4</li>
                                                        <li data-value="A4" className="option">A4</li>
                                                        <li data-value="Bentayga" className="option">Bentayga</li>
                                                        <li data-value="Bentayga Azure" className="option">Bentayga Azure
                                                        </li>
                                                        <li data-value="Bentayga Technology" className="option">Bentayga
                                                            Technology</li>
                                                        <li data-value="C className" className="option">C className</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="widget widget-price ">
                                                <div className="caption flex-two">
                                                    <p className="price-range">Price</p>
                                                </div>
                                                <div id="slider-range"></div>
                                                <div className="slider-labels">
                                                    <div>
                                                        <input type="hidden" name="min-value" value="" />
                                                        <input type="hidden" name="max-value" value="" />
                                                    </div>
                                                    <div className="number-range">
                                                        <span id="slider-range-value1"></span>
                                                        <span id="slider-range-value2"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- /.widget_price --> */}
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="button-search-listing">
                                                <i className="icon-search-1"></i>
                                                2351 Cars
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <form method="post" id="search-forms2">
                                    <div className="inner-group grid">
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Make</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Make</li>
                                                        <li data-value="Acura" className="option">Acura</li>
                                                        <li data-value="Audi" className="option">Audi</li>
                                                        <li data-value="Bentley" className="option">Bentley</li>
                                                        <li data-value="BMV" className="option">BMV</li>
                                                        <li data-value="Chevrolet" className="option">Chevrolet</li>
                                                        <li data-value="Ferrari" className="option">Ferrari</li>
                                                        <li data-value="Ford" className="option">Ford</li>
                                                        <li data-value="Lexus" className="option">Lexus</li>
                                                        <li data-value="Maybach" className="option">Maybach</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Models</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Models</li>
                                                        <li data-value="3 Series" className="option">3 Series</li>
                                                        <li data-value="718 Boxster T" className="option">718 Boxster T</li>
                                                        <li data-value="718 Cayman" className="option">718 Cayman</li>
                                                        <li data-value="911 Carrera 4" className="option">911 Carrera 4</li>
                                                        <li data-value="A4" className="option">A4</li>
                                                        <li data-value="Bentayga" className="option">Bentayga</li>
                                                        <li data-value="Bentayga Azure" className="option">Bentayga Azure
                                                        </li>
                                                        <li data-value="Bentayga Technology" className="option">Bentayga
                                                            Technology</li>
                                                        <li data-value="C className" className="option">C className</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="widget widget-price ">
                                                <div className="caption flex-two">
                                                    <p className="price-range">Price</p>
                                                </div>
                                                <div id="slider-range2"></div>
                                                <div className="slider-labels">
                                                    <div>
                                                        <input type="hidden" name="min-value2" value="" />
                                                        <input type="hidden" name="max-value2" value="" />
                                                    </div>
                                                    <div className="number-range">
                                                        <span id="slider-range-value01"></span>
                                                        <span id="slider-range-value02"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="button-search-listing">
                                                <i className="icon-search-1"></i>
                                                2351 Cars
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                <form method="post" id="search-forms3">
                                    <div className="inner-group grid">
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Make</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Marcas</li>
                                                        <li data-value="Acura" className="option">Acura</li>
                                                        <li data-value="Audi" className="option">Audi</li>
                                                        <li data-value="Bentley" className="option">Bentley</li>
                                                        <li data-value="BMV" className="option">BMV</li>
                                                        <li data-value="Chevrolet" className="option">Chevrolet</li>
                                                        <li data-value="Ferrari" className="option">Ferrari</li>
                                                        <li data-value="Ford" className="option">Ford</li>
                                                        <li data-value="Lexus" className="option">Lexus</li>
                                                        <li data-value="Maybach" className="option">Maybach</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="group-select">
                                                <div className="nice-select" tabIndex="0">
                                                    <span className="current">Models</span>
                                                    <ul className="list">
                                                        <li data-value className="option selected">Models</li>
                                                        <li data-value="3 Series" className="option">3 Series</li>
                                                        <li data-value="718 Boxster T" className="option">718 Boxster T</li>
                                                        <li data-value="718 Cayman" className="option">718 Cayman</li>
                                                        <li data-value="911 Carrera 4" className="option">911 Carrera 4</li>
                                                        <li data-value="A4" className="option">A4</li>
                                                        <li data-value="Bentayga" className="option">Bentayga</li>
                                                        <li data-value="Bentayga Azure" className="option">Bentayga Azure
                                                        </li>
                                                        <li data-value="Bentayga Technology" className="option">Bentayga
                                                            Technology</li>
                                                        <li data-value="C className" className="option">C className</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="widget widget-price ">
                                                <div className="caption flex-two">
                                                    <p className="price-range">Preço</p>
                                                </div>
                                                <div id="slider-range3"></div>
                                                <div className="slider-labels">
                                                    <div>
                                                        <input type="hidden" name="min-value3" value="" />
                                                        <input type="hidden" name="max-value3" value="" />
                                                    </div>
                                                    <div className="number-range">
                                                        <span id="slider-range-value03"></span>
                                                        <span id="slider-range-value04"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- /.widget_price --> */}
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="button-search-listing">
                                                <i className="icon-search-1"></i>
                                                2351 Cars
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;