import React, { useState } from 'react';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import CartSidebar from './../CartSidebar/CartSidebar';
import Modal from './../Modal/Modal';
import { clearCart } from '../../redux/cartSlice';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOpenModal = () => {
    setIsCartOpen(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitEmail = (email) => {
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">Eve's Products</span>
      </div>
      <div className="header-right">
        <button onClick={scrollToTop} className="nav-link">
          Inicio
        </button>
        <div className="cart-icon-container">
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
            className={`cart-icon ${cartItems.length > 0 ? 'pulsing' : ''}`}
            onClick={toggleCart}
          >
            <path d="M6 9L4 4H1M6 9L10 20H22L20 9H6ZM6 9L1 4H4M10 20H20L22 9" />
          </svg>
          {cartItems.length > 0 && <span className="notification-dot"></span>}
          {isCartOpen && (
            <CartSidebar 
              cartItems={cartItems} 
              onClose={closeCart} 
              onClearCart={handleClearCart}
              onOpenEmailModal={handleOpenModal}
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmitEmail={handleSubmitEmail}
      />
    </header>
  );
};

export default Header;
