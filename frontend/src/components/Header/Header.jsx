import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";

import logo from "../../images/Header/LogoHeader.svg";
import closeIcon from "../../images/Popup/Close_Icon.svg";

function Header({ loggedIn, onLogout, userEmail }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {loggedIn && isMenuOpen && (
        <div className="header__nav_mobile header__nav_open">
          <span className="header__email">{userEmail}</span>

          <button type="button" onClick={onLogout} className="header__logout">
            Cerrar sesión
          </button>
        </div>
      )}

      <header className="header">
        <img src={logo} alt="Around The U.S." className="header__logo" />

        {/* Menú hamburguesa (solo visible en móvil mediante CSS) */}
        {loggedIn && (
          <button type="button" className="header__burger" onClick={toggleMenu}>
            {isMenuOpen ? (
              <img
                src={closeIcon}
                alt="Cerrar menú"
                className="header__burger-close"
              />
            ) : (
              <>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
                <span className="header__burger-line"></span>
              </>
            )}
          </button>
        )}

        {/* Navegación escritorio */}
        <div className="header__nav_desktop">
          {loggedIn ? (
            <>
              <span className="header__email">{userEmail}</span>

              <button
                type="button"
                onClick={onLogout}
                className="header__logout"
              >
                Cerrar sesión
              </button>
            </>
          ) : location.pathname === "/signin" ? (
            <Link to="/signup" className="header__link">
              Regístrate
            </Link>
          ) : location.pathname === "/signup" ? (
            <Link to="/signin" className="header__link">
              Iniciar sesión
            </Link>
          ) : null}
        </div>
      </header>

      <div className="header__line"></div>
    </>
  );
}

export default Header;
