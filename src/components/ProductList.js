import React from 'react';
import productsData from './data.json';
import './Product.css';
import { useState, useEffect } from 'react';
import { Receipt } from './Receipt';


export const ProductList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalItem, setTotalItem] = useState(0);

  const [vat, setVat] = useState('');
  const [discount, setDiscount] = useState('');

  const handleCancelClick = (index) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts.splice(index, 1);
    setSelectedProducts(updatedProducts);
  };

  useEffect(() => {
    let subTotalValue = 0;
    let totalItem = 0;
    selectedProducts.forEach((product) => {
      subTotalValue += product.price * product.quantity;
      totalItem += product.quantity

    });
    setSubTotal(subTotalValue);
    setTotalItem(totalItem)

  }, [selectedProducts]);

  useEffect(() => {
    let calcTotal = subTotal;
    if (vat) {
      const vatValue = (vat / 100) * subTotal;
      calcTotal += vatValue;
    }
    if (discount) {
      const discountValue = (discount / 100) * subTotal;
      calcTotal -= discountValue;
    }
    setTotal(calcTotal);
  }, [subTotal, vat, discount]);

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

  const tableRows = selectedProducts.map((product, index) => (
    <tr key={index}>
      <td><button className='delete_product' onClick={() => handleCancelClick(index)}>X</button> {product.name}</td>
      <td>{product.price}</td>
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
          {product.quantity}
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
      <td>{product.price * product.quantity}</td>
    </tr>
  ));
  const handleCancelSale = () => {
    setSelectedProducts([]);
    setVat(0);
    setDiscount(0);
  };

  const handleProcessSale = () => {
    if (selectedProducts.length > 0) {
      setIsOpen(true)
    }
  };

  return (
    <>
      <div className="product-list-container">
        <div className="left-side">
          <table>
            <thead>
              <tr>
                <th style={{ width: "35%" }}>Product</th>
                <th style={{ width: "25%" }}>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            {selectedProducts.length !== 0 ?
              <tbody>{tableRows}</tbody> :
              <tbody><tr><td colSpan={4} style={{
                textAlign: "center"
              }}><p>There are no products</p></td></tr></tbody>}
            <tfoot>
              <tr>
                <td colSpan={1}>Sub Total</td>
                <td>{subTotal}</td>
                <td>{totalItem}</td>
              </tr>
              <tr>
                <td colSpan={1}>
                  <label htmlFor="vatTax">VAT Tax </label>
                </td>
                <td>
                  <input
                    type="number"
                    id="vatTax"
                    value={vat}
                    style={{
                      width: "50%"
                    }}
                    onChange={(e) => setVat(parseFloat(e.target.value))}
                  />
                </td>
                <td>{vat}%</td>
              </tr>
              <tr>
                <td colSpan={1}>
                  Discount
                </td>
                <td>
                  <input
                    type="number"
                    value={discount}
                    style={{
                      width: "50%"
                    }}
                    onChange={(event) => setDiscount(parseInt(event.target.value))}
                  />
                </td>
                <td>{discount}%</td>
              </tr>
              <tr>

                <td colSpan={1}>Total</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td colSpan="4"
                  style={{ textAlign: "center" }}
                  className="buttons-row">
                  <button className="cancel-button" onClick={handleCancelSale}>Cancel</button>
                  <button className="process-button" onClick={handleProcessSale} >Process Sale</button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="right-side">
          {productsData.products.map((product) => (
            <>
              <div
                key={product.id}
                className="product"
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.name} className="product-image" />
                <p>{product.name}</p>
                <p className='product-details'>Price:{product.price}<br /></p>
                {product.description !== "" ?
                  <p className='product-details'>Description: {product.description}</p>
                  : null}
              </div>
            </>
          ))}
        </div>
      </div>
      {selectedProducts.length > 0 ? <Receipt
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        selectedProducts={selectedProducts}
        discount={discount}
        total={total}
        vat={vat}
        setVat={setVat}
        setSelectedProducts={setSelectedProducts}
        setDiscount={setDiscount}
        totalItem={totalItem}
      /> : null}
    </>
  );
};