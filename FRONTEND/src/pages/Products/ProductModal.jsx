import React from 'react';
import './ProductStyle/ProductModal.css';  // Ensure you have the CSS file for modal styles

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{product.title}</h2>
        <img src={product.image} alt={product.title} className="modal-image" />
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductModal;
