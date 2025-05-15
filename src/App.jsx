import { useState } from 'react';
import Slide from './components/slide.jsx';

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
        {/* Start Header Top Bar */}
        <div className="top-bar">
          <div className="themesflat-container">
            <div className="row">
              <div className="col-md-9">
                <ul className="list-infor-topbar">
                  <li>
                    <a href="#">
                      <i className="icon-Group-11"></i>
                      <p>Linha Direta: (54) 98163-3187</p>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-Group3"></i>
                      <p>Contate-nos: mateusvilarinodoprado@outlook.com</p>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-md-3">
                <ul className="icon-topbar">
                  <li>
                    <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                      <i className="icon-6"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                      <i className="icon-4"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="Vimeo" target="_blank" rel="noopener noreferrer">
                      <i className="icon-5"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                      <i className="icon-7"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

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
      </main>
    </>
  );
}

export default App;