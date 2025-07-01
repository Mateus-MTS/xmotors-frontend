import { useState } from 'react';
import './_index.scss';
import Slide from './Slide/slide.jsx';
import Filter from './Filter/filter.jsx';

function App() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Toggle menu mobile
  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  // Fechar menu mobile
  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
    setOpenSubmenus({});
  };

  // Toggle submenus
  const toggleSubmenu = (index) => (e) => {
    e.preventDefault();
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Dados do menu
  const menuItems = [
    {
      title: "Home",
      submenu: [
        { text: "Home Page 01", href: "index.html" },
        { text: "Home Page 02", href: "home02.html" },
        { text: "Home Page 03", href: "home03.html" },
        { text: "Home Page 04", href: "home04.html" },
        { text: "Home Page 05", href: "home05.html" },
        { text: "Home Page 06", href: "home06.html" }
      ]
    },
    {
      title: "Veículos",
      submenu: [
        { text: "Listagem", href: "car-list.html" },
        { text: "Listagem Detalhes", href: "listing-details.html" }
      ]
    },
    {
      title: "Página",
      submenu: [
        { text: "Dashboard", href: "dashboard.html" },
        { text: "Meu Inventário", href: "my-inventory.html" },
        { text: "Adicionar Veículo", href: "addcart.html" },
        { text: "Perfil do Vendedor", href: "seller-profile.html" },
        { text: "Detalhes do Revendedor", href: "dealer-details.html" },
        { text: "404", href: "404.html" }
      ]
    },
    {
      title: "Notícias",
      submenu: [
        { text: "Lista de Blogs", href: "blog.html" },
        { text: "Detalhes do Blog", href: "blog-single.html" }
      ]
    },
    {
      title: "Contate-nos",
      href: "contact-us.html"
    }
  ];

  return (
    <>
      <header id="header3" className={`main-header header header-fixed ${mobileMenuVisible ? 'mobile-menu-visible' : ''}`}>
        <div className="header-lower">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-lg-12">
                <div className="header-style2 flex justify-space align-center">
                  {/* Logo Start */}
                  <div className="logo-box flex">
                    <div className="logo">
                      <a href="index.html">
                        <img src="assets/images/logo/logo2@.png" alt="Logo" />
                      </a>
                    </div>
                  </div>

                  <div className="nav-outer flex align-center">
                    {/* Main Menu Start */}
                    <nav className="main-menu show navbar-expand-md">
                      <div className="navbar-collapse collapse clearfix">
                        <ul className="navigation clearfix">
                          {menuItems.map((item, index) => (
                            <li
                              key={index}
                              className={`${item.submenu ? 'dropdown2' : ''} ${index === 0 ? 'current' : ''}`}
                            >
                              <a href={item.href || '#'}>{item.title}</a>
                              {item.submenu && (
                                <ul>
                                  {item.submenu.map((subItem, subIndex) => (
                                    <li key={subIndex} className={subIndex === 0 ? 'current' : ''}>
                                      <a href={subItem.href}>{subItem.text}</a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </nav>
                    {/* Main Menu End */}
                  </div>

                  <div className="header-account flex align-center">
                    <div className="register ml--18">
                      <div className="flex align-center">
                        <a data-bs-toggle="modal" href="#exampleModalToggle" role="button">Registre-se</a>
                        <a data-bs-toggle="modal" href="#exampleModalToggle2" role="button">Login</a>
                      </div>
                    </div>
                    <div className="flat-bt-top sc-btn-top ml--20">
                      <a className="btn-icon-list" href="car-list.html">
                        <span>Adicionar</span>
                        <i className="icon-add-button-1"></i>
                      </a>
                    </div>
                  </div>

                  {/* Mobile Menu Toggler */}
                  <div
                    className={`mobile-nav-toggler mobile-button ${mobileMenuVisible ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                  >
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuVisible ? 'visible' : ''}`}>
          <div className="menu-backdrop" onClick={closeMobileMenu}></div>

          <div className="menu-box">
            <div className="close-btn" onClick={closeMobileMenu}>
              <span className="icon flaticon-cancel-1"></span>
            </div>

            <div className="nav-logo">
              <a href="index.html">
                <img src="assets/images/logo/logo2@.png" alt="Logo Motorx" />
              </a>
            </div>

            <div className="menu-outer">
              <ul className="navigation clearfix">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className={`${item.submenu ? 'dropdown2' : ''} ${openSubmenus[index] ? 'open' : ''}`}
                  >
                    <a href={item.href || '#'}>{item.title}</a>

                    {item.submenu && (
                      <>
                        <div
                          className="dropdown2-btn"
                          onClick={toggleSubmenu(index)}
                        ></div>

                        <ul style={{
                          display: openSubmenus[index] ? 'block' : 'none'
                        }}>
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <a href={subItem.href}>{subItem.text}</a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bottom-canvas">
              <div className="help-bar-mobie login-box">
                <a data-bs-toggle="modal" href="#exampleModalToggle" role="button" className="fw-7 category">
                  <i className="icon-user"></i>Login
                </a>
              </div>
              <div className="help-bar-mobie search">
                <a href="#" className="fw-7 font-2">
                  <i className="icon-loupe-1"></i>Search
                </a>
              </div>
              <div className="help-bar-mobie compare">
                <a href="#" className="fw-7 font-2">
                  <i className="icon-shuffle-2-1"></i>Compare
                </a>
              </div>
              <div className="help-bar-mobie cart">
                <a href="#" className="fw-7 font-2">
                  <i className="icon-Vector"></i>Cart
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End Mobile Menu */}
      </header>

      <main>
        <Slide />
        <Filter />


        <div class="widget-car-service">
          <div class="themesflat-container">
            <div class="header-section tab-car-service">
              <div class="heading-section">
                <span class="sub-title mb-6 wow fadeInUp">Explore todos os veículos</span>
                <h2 class="title wow fadeInUp">Ver listagem</h2>
              </div>
              <ul class="nav nav-pills justify-content-end" id="pills-tab-service" role="tablist">
                <li class="nav-item" role="presentation">
                  <button class="nav-link active" id="pills-home-tab-service" data-bs-toggle="pill"
                    data-bs-target="#pills-home-service" type="button" role="tab"
                    aria-selected="true">Todos</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-profile-tab-service" data-bs-toggle="pill"
                    data-bs-target="#pills-profile-service" type="button" role="tab"
                    aria-selected="false">Novos</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="pills-contact-tab-service" data-bs-toggle="pill"
                    data-bs-target="#pills-contact-service" type="button" role="tab"
                    aria-selected="false">Usados</button>
                </li>
              </ul>
            </div>
            <div class="tab-content" id="pills-tabContent">
              <div class="tab-pane fade show active" id="pills-home-service" role="tabpanel">
                <div class="car-list-item">
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car1.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title">
                        <a href="listing-details.html" title="Detalhes do Chevrolet Suburban 2021">
                          Chevrolet Suburban 2021 mo
                        </a>
                      </h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car2.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car3.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car4.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car5.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Apresentação</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car6.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>Mais 2 fotos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Chevrolet Corvette Stingray</span>
                      <h6 class="title"><a href="listing-details.html">Corvette 2023</a></h6>
                      <span class="price">R$ 27000.00</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Combustível</span>
                              <p>Gasolina</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Km</span>
                              <p>80000 km</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmissão</span>
                              <p>Automático</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>Ver detalhes</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="pills-profile-service" role="tabpanel">
                <div class="car-list-item">
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car1.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car2.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car3.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car4.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car5.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car6.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane fade" id="pills-contact-service" role="tabpanel">
                <div class="car-list-item">
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car1.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car2.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car3.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car4.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car5.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div class="tf-car-service">
                    <a href="listing-details.html" class="image">
                      <div class="stm-badge-top">
                        <div class="feature">
                          <span>Featured</span>
                          <div class="cut">
                            <svg width="24" height="22" viewBox="0 0 24 22" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M12.296 14.0939C13.9707 14.0939 15.3284 12.8164 15.3284 11.2406C15.3284 9.66468 13.9707 8.38718 12.296 8.38718C10.6213 8.38718 9.26367 9.66468 9.26367 11.2406C9.26367 12.8164 10.6213 14.0939 12.296 14.0939Z"
                                fill="white"></path>
                              <path
                                d="M9.45163 2.32436L7.71751 4.10772H4.71358C3.67121 4.10772 2.81836 4.91023 2.81836 5.89108V16.5913C2.81836 17.5721 3.67121 18.3746 4.71358 18.3746H19.8754C20.9177 18.3746 21.7706 17.5721 21.7706 16.5913V5.89108C21.7706 4.91023 20.9177 4.10772 19.8754 4.10772H16.8714L15.1373 2.32436H9.45163ZM12.2945 15.6996C9.67906 15.6996 7.55641 13.7022 7.55641 11.2412C7.55641 8.78013 9.67906 6.78276 12.2945 6.78276C14.9099 6.78276 17.0325 8.78013 17.0325 11.2412C17.0325 13.7022 14.9099 15.6996 12.2945 15.6996Z"
                                fill="white"></path>
                            </svg>
                            <p>5</p>
                          </div>
                        </div>
                        <span>2023</span>

                      </div>
                      <div class="listing-images">
                        <div class="hover-listing-image">
                          <div class="wrap-hover-listing">
                            <div class="listing-item active" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car6.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car11.jpg"
                                  class="swiper-image lazy tfcl-light-gallery"
                                  alt="images"></img>
                              </div>
                            </div>
                            <div class="listing-item view-gallery" title="Lexus LC Hybrid 2024">
                              <div class="images">
                                <img src="./assets/images/car-list/car12.jpg"
                                  class="swiper-image tfcl-light-gallery" alt="images"></img>
                                <div class="overlay-limit">
                                  <img src="./assets/images/car-list/img.png"
                                    class="icon-img" alt="icon-map"></img>
                                  <p>2 more photos</p>
                                </div>
                              </div>
                            </div>
                            <div class="bullet-hover-listing">
                              <div class="bl-item active"></div>
                              <div class="bl-item"></div>
                              <div class="bl-item"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="content">
                      <span class="sub-title">Mini Cooper 3 Similar</span>
                      <h6 class="title"><a href="listing-details.html">Chevrolet Suburban 2021 mo</a></h6>
                      <span class="price">$27,000</span>
                      <div class="description">
                        <ul>
                          <li class="listing-information fuel">
                            <i class="icon-gasoline-pump-1"></i>
                            <div class="inner">
                              <span>Fuel type</span>
                              <p>Petrol</p>
                            </div>
                          </li>
                          <li class="listing-information size-engine">
                            <i class="icon-Group1"></i>
                            <div class="inner">
                              <span>Mileage</span>
                              <p>90 k.m</p>
                            </div>
                          </li>
                          <li class="listing-information transmission">
                            <i class="icon-gearbox-1"></i>
                            <div class="inner">
                              <span>Transmission</span>
                              <p>Auto</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div class="bottom-btn-wrap">
                        <div class="btn-read-more">
                          <a class="more-link" href="listing-details.html">
                            <span>View details</span>
                            <i class="icon-arrow-right2"></i>
                          </a>
                        </div>
                        <div class="btn-group">
                          <a href="#" class="icon-service">
                            <i class="icon-shuffle-2-11"></i>
                          </a>
                          <a href="#" class="icon-service">
                            <i class="icon-heart-1-1"></i>
                          </a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}

export default App;