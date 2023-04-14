// ProductList.js

import React from 'react';
import productsData from './data.json';
import './Product.css'; // import CSS file
import { useState } from 'react';

export const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductClick = (product) => {
    const index = selectedProducts.findIndex((p) => p.name === product.name);
    if (index !== -1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index].quantity += 1;
      setSelectedProducts(updatedProducts);
    } else {
      const newProduct = {
        name: product.name,
        price: product.price,
        quantity: 1,
      };
      setSelectedProducts([...selectedProducts, newProduct]);
    }
  };

  const handleQuantityChange = (event, index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[index].quantity = parseInt(event.target.value);
    setSelectedProducts(updatedProducts);
  };

  const tableRows = selectedProducts.map((product, index) => (
    <tr key={index}>
      <td>{product.name}</td>
      <td>${product.price}</td>
      <td>
        <div className="quantity">
          <button
            onClick={() => {
              const updatedProducts = [...selectedProducts];
              updatedProducts[index].quantity -= 1;
              setSelectedProducts(updatedProducts);
            }}
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            value={product.quantity}
            onChange={(event) => handleQuantityChange(event, index)}
          />
          <button
            onClick={() => {
              const updatedProducts = [...selectedProducts];
              updatedProducts[index].quantity += 1;
              setSelectedProducts(updatedProducts);
            }}
          >
            +
          </button>
        </div>
      </td>
      <td>${product.price * product.quantity}</td>
    </tr>
  ));

  return (
    <div className="product-list-container">
      <div className="left-side">      
        {selectedProducts.length === 0 ? (
          <p>There are no products</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        )}
      </div>
      <div className="right-side">
        {productsData.products.map((product) => (
          <div
            key={product.id}
            className="product"
            onClick={() => handleProductClick(product)}
          >
            <img src={product.image} alt={product.name} className="product-image"/>
            <p>{product.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};