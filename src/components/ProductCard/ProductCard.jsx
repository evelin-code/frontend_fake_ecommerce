import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ data }) => {
  const { id, name, description, stock, url_img, price } = data;
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: id, quantity, stock, name, price }));
    toast.success(`¡${name} ha sido añadido al carrito!`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
  };

  return (
    <div className='product-card'>
      <img src={url_img} alt={name} className='product-image' />
      <div className='product-info'>
        <h2 className='product-name'>{name}</h2>
        <p className='product-description'>{description}</p>
        <div className='product-details'>
          <span className='product-price'>{formatPrice(price)}</span>
          <span className='product-stock'>{stock} en stock</span>
        </div>
        <div className='product-actions'>
          <div className='quantity-control'>
            <button onClick={handleDecrement} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement} disabled={quantity >= stock}>+</button>
          </div>
          <button className='add-to-cart' onClick={handleAddToCart}>Añadir al Carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
