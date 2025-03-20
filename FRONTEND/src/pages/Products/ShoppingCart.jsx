import React from 'react';

const ShoppingCart = ({ cartItems }) => {
  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
                <p>${item.price} x {item.quantity}</p>
              </li>
            ))}
          </ul>
          <h3>Total: ${getTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
