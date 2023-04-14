import React from "react";
import Modal from "react-modal";

export const Receipt = ({ setIsOpen, totalItem, isOpen, vat, total, discount, selectedProducts, setSelectedProducts, setDiscount, setVat }) => {
    console.log("Ssss", isOpen, selectedProducts)

    const closeModal = () => {
        setIsOpen(false);
        setSelectedProducts([]);
        setVat(0);
        setDiscount(0);
    };
    const receiptItems = selectedProducts.map((product) => (
        <tr key={product.name}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
            <td>{(product.price * product.quantity)}</td>
        </tr>

    ));

    return (
        <>
            <Modal isOpen={isOpen} className="receipt_modal">
                <div className="Receipt-heading"><h2>Receipt</h2></div>
                <div className="sale_no"><h3>Sale No : 102</h3></div>
                <div>Date : {new Date().toLocaleString()}</div>
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptItems}
                        <tr class="horizontal-line">
                            <td colspan="2"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2"><strong>Total:</strong></td>
                            <td><strong>{total}</strong></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2">Total Item:</td>
                            <td>{totalItem}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2">VAT:</td>
                            <td>{vat}%</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2">Discount:</td>
                            <td>-{discount}%</td>
                        </tr>
                        <tr class="horizontal-line">
                            <td colspan="2"></td>
                        </tr>

                    </tbody>
                </table>
                <button className="close-modal" onClick={closeModal}>Close</button>
            </Modal>
        </>
    );
};

