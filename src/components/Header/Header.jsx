import React from 'react';
import './Header.css';

const Header = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">WOMPI</span>
      </div>
      <div className="header-right">
        <button onClick={scrollToTop} className="nav-link">
          Inicio
        </button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cart-icon"
        >
          <path d="M6 9L4 4H1M6 9L10 20H22L20 9H6ZM6 9L1 4H4M10 20H20L22 9" />
        </svg>
      </div>
    </header>
  )
}

export default Header;
