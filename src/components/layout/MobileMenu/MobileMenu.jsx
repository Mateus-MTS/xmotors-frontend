import { useState } from 'react';

export default function MobileMenu({ isVisible, onClose, menuItems }) {
  const [openSubmenus, setOpenSubmenus] = useState({});

  const toggleSubmenu = (index) => (e) => {
    e.preventDefault();
    setOpenSubmenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className={`mobile-menu ${isVisible ? 'visible' : ''}`}>
      <div className="menu-backdrop" onClick={onClose}></div>

      <div className="menu-box">
        <div className="close-btn" onClick={onClose}>
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
  );
}