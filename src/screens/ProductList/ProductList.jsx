import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../services/ProductService';
import './ProductList.css';

const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className='product-grid'>
      {products.map(product => (
        <ProductCard key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductList;
