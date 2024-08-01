import React, { useState, useEffect } from 'react';
import { calculateCartTotal } from '../../services/ProductService';
import './CartSidebar.css';

const CartSidebar = ({ cartItems, onClose, onClearCart, onOpenEmailModal }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const cartTotal = await calculateCartTotal(cartItems);
        setTotal(cartTotal);
      } catch (error) {
        console.error('Error fetching cart total:', error);
      }
    };

    fetchTotal();
  }, [cartItems]);

  const handleDeleteItemsCart = () => {
    onClearCart();
  };

  return (
    <div className="cart-sidebar open">
      <button className="close-btn" onClick={onClose}>×</button>
      <h2>Carrito de Compras</h2>
      <button className="clear-cart-button" onClick={handleDeleteItemsCart}>
        Vaciar carrito
      </button>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.productId}>
              <strong>{item.name}</strong>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio: {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(item.price * item.quantity)}</p>
            </li>
          ))
        ) : (
          <p className="empty-message">El carrito está vacío.</p>
        )}
      </ul>
      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total:</h3>
          <p>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(total)}</p>
          <button className="pay-button" onClick={onOpenEmailModal}>
            Ir a pagar con tarjeta de crédito
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
