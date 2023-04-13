// ProductList.js

import React from 'react';
import productsData from './data.json';
import './Product.css'; // import CSS file

export const ProductList = () => {
  const { products } = productsData;

  return (
    <div className="product-list-container" span={24}>
      <div className="left-side" span={12}>
        <p>THERE ARE NO PRODUCTS</p>

      </div>
      <div className="right-side" span={12}>
        {products.map((product) => (
          <div key={product.name} className="product">
            <img src={product.image} alt={product.name} className="product-image" />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
