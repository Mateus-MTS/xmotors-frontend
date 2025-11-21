import { useState } from 'react';
import MobileMenu from '../../layout/MobileMenu/MobileMenu';
import useStickyHeader from '../../../hooks/useStickyHeader';

export default function Header({ menuItems }) {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { headerRef } = useStickyHeader();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  return (
    <header 
    id="header3" 
    className={`main-header header header-fixed ${mobileMenuVisible ? 'mobile-menu-visible' : ''}`}
     ref={headerRef}>
      <div className="header-lower">
        <div className="themesflat-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-style2 flex justify-space align-center">
                {/* Logo */}
                <div className="logo-box flex">
                  <div className="logo">
                    <a href="index.html">
                      <img src="assets/images/logo/logo2@.png" alt="Logo" />
                    </a>
                  </div>
                </div>

                {/* Menu Principal */}
                <div className="nav-outer flex align-center">
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
                </div>

                {/* Conta e Botões */}
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

                {/* Botão Mobile */}
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

      {/* Espaçador para quando o header ficar fixo */}
      {/* <div
        ref={spacerRef}
        style={{
          display: 'none',
          height: headerRef.current?.offsetHeight
        }}
      /> */}

      {/* Menu Mobile */}
      <MobileMenu
        isVisible={mobileMenuVisible}
        onClose={() => setMobileMenuVisible(false)}
        menuItems={menuItems}
      />
    </header>
  );
}