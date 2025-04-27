import React from 'react';
import { useCart } from './cartContext'; // Adjust path as per your project structure
import './slidingCart.css'; // Assuming you'll have separate styles for sliding cart
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const SlidingCart = ({ isOpen, onClose, onViewFullCart }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const removeCartItem = (title) => {
    removeFromCart(title);
  };

  const handleQuantityChange = (title, quantity) => {
    updateQuantity(title, quantity);
  };

  return (
    <div className={`sliding_cart ${isOpen ? 'open' : ''}`}>
      <div className="sliding_cart_header">
        <h2>Cart</h2>
        <button className="close_sliding_cart" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="sliding_cart_items">
        {cartItems.map((item) => (
          <div className="sliding_cart_item" key={item.title}>
            <div className="sliding_cart_item_image">
              <img src={item.image} alt={item.title} />
            </div>
            <div className="sliding_cart_item_description">
              <div className="sliding_cart_item_title_and_remove">
                <div className="sliding_cart_item_title">{item.title}</div>
                <button className="sliding_cart_remove" onClick={() => removeCartItem(item.title)}><FontAwesomeIcon icon={faTrash} /></button>
              </div>
              <div className="sliding_cart_item_price_and_quantity">
                <div className="sliding_cart_item_price"><p>Rs.{item.price}</p></div>
                {/* <div className="sliding_cart_item_quantity"><input type="number" min={1} value={item.quantity} className="sliding_cart_item_quantity" onChange={(e) => handleQuantityChange(item.title, parseInt(e.target.value))}/></div> */}
                <div className="sliding_cart_item_quantity">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.title, Math.max(1, item.quantity - 1))}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.title, item.quantity + 1)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sliding_cart_footer">
        <button className="view_full_cart_button" onClick={onViewFullCart}>
          View Full Cart
        </button>
      </div>
    </div>
  );
};

export default SlidingCart;
