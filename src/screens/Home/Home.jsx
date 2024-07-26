import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Header from '../../components/Header/Header';
import { products } from './../../DATOS_FAKE/products';
import './Home.css';

const Home = () => {
  return (
    <>
      <Header />
      <div className='product-grid'>
        {products.map((product, key) => 
          <ProductCard key={key} data={product}/>
        )}
      </div>
    </>
  )
}

export default Home
