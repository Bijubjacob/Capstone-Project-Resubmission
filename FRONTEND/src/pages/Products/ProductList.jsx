import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoppingCart from './ShoppingCart';  // Import the ShoppingCart component
import ProductModal from './ProductModal';  // Import the modal component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);  // State to manage selected product for modal
  const [showModal, setShowModal] = useState(false);  // State to toggle modal visibility

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);  // Set selected product for modal
    setShowModal(true);  // Open the modal
  };

  const closeModal = () => {
    setShowModal(false);  // Close the modal
    setSelectedProduct(null);  // Clear the selected product
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Our Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.title}
              onClick={() => handleProductClick(product)}  // Open modal on click
              className="product-image"
            />
            <h3>{product.title}</h3>
            <p><strong>${product.price}</strong></p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* ShoppingCart component to display added items */}
      <ShoppingCart cartItems={cart} />

      {/* Modal to display product details */}
      {showModal && <ProductModal product={selectedProduct} onClose={closeModal} />}
    </div>
  );
};

export default ProductList;
