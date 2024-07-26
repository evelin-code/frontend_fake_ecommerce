import React from 'react';
import './ProductCard.css';

const ProductCard = ({ data }) => {
  const { name, price, image, description, stock } = data;

  return (
    <div className='product-card'>
      <img src={image} alt={name} className='product-image' />
      <div className='product-info'>
        <h2 className='product-name'>{name}</h2>
        <p className='product-description'>{description}</p>
        <div className='product-details'>
          <span className='product-price'>${price.toLocaleString()}</span>
          <span className='product-stock'>{stock} in stock</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
