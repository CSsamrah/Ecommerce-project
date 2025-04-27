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


// import React from 'react';
// import { useCart } from './cartContext';
// import './slidingCart.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// const SlidingCart = ({ isOpen, onClose, onViewFullCart }) => {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + (parseFloat(item.price) * item.quantity);
//     }, 0);
//   };

//   return (
//     <div className={`sliding_cart ${isOpen ? 'open' : ''}`}>
//       <div className="sliding_cart_header">
//         <h2>Cart ({cartItems.length})</h2>
//         <button className="close_sliding_cart" onClick={onClose}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </div>
      
//       <div className="sliding_cart_items">
//         {cartItems.length === 0 ? (
//           <div className="empty-cart-message">Your cart is empty</div>
//         ) : (
//           cartItems.map((item) => (
//             <div className="sliding_cart_item" key={item.cart_id}>
//               <div className="sliding_cart_item_image">
//                 <img src={item.image} alt={item.title} />
//               </div>
//               <div className="sliding_cart_item_description">
//                 <div className="sliding_cart_item_title_and_remove">
//                   <div className="sliding_cart_item_title">{item.title}</div>
//                   <button 
//                     className="sliding_cart_remove" 
//                     onClick={() => removeFromCart(item.cart_id)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </div>
//                 <div className="sliding_cart_item_price_and_quantity">
//                   <div className="sliding_cart_item_price">Rs.{item.price}</div>
//                   <div className="sliding_cart_item_quantity">
//                     <button
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(item.cart_id, Math.max(1, item.quantity - 1))}
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <span className="quantity-value">{item.quantity}</span>
//                     <button
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="sliding_cart_summary">
//           <div className="sliding_cart_total">
//             <span>Total:</span>
//             <span>Rs.{calculateTotal().toFixed(2)}</span>
//           </div>
//         </div>
//       )}

//       <div className="sliding_cart_footer">
//         <button className="view_full_cart_button" onClick={onViewFullCart}>
//           View Full Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SlidingCart;

// import React from 'react';
// import { useCart } from './cartContext';
// import './slidingCart.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// const SlidingCart = ({ onViewFullCart }) => {
//   const { 
//     cartItems, 
//     removeFromCart, 
//     updateQuantity, 
//     isSlidingCartOpen, 
//     closeSlidingCart 
//   } = useCart();

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + (parseFloat(item.price) * item.quantity);
//     }, 0);
//   };

//   return (
//     <div className={`sliding_cart ${isSlidingCartOpen ? 'open' : ''}`}>
//       <div className="sliding_cart_header">
//         <h2>Cart ({cartItems.length})</h2>
//         <button className="close_sliding_cart" onClick={closeSlidingCart}>
//           <FontAwesomeIcon icon={faTimes} />
//         </button>
//       </div>
      
//       <div className="sliding_cart_items">
//         {cartItems.length === 0 ? (
//           <div className="empty-cart-message">Your cart is empty</div>
//         ) : (
//           cartItems.map((item) => (
//             <div className="sliding_cart_item" key={item.cart_id}>
//               <div className="sliding_cart_item_image">
//                 <img src={item.image} alt={item.title} />
//               </div>
//               <div className="sliding_cart_item_description">
//                 <div className="sliding_cart_item_title_and_remove">
//                   <div className="sliding_cart_item_title">{item.title}</div>
//                   <button 
//                     className="sliding_cart_remove" 
//                     onClick={() => removeFromCart(item.cart_id)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                   </button>
//                 </div>
//                 <div className="sliding_cart_item_price_and_quantity">
//                   <div className="sliding_cart_item_price">Rs.{item.price}</div>
//                   <div className="sliding_cart_item_quantity">
//                     <button
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(item.cart_id, Math.max(1, item.quantity - 1))}
//                     >
//                       <FontAwesomeIcon icon={faMinus} />
//                     </button>
//                     <span className="quantity-value">{item.quantity}</span>
//                     <button
//                       className="quantity-btn"
//                       onClick={() => updateQuantity(item.cart_id, item.quantity + 1)}
//                     >
//                       <FontAwesomeIcon icon={faPlus} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {cartItems.length > 0 && (
//         <div className="sliding_cart_summary">
//           <div className="sliding_cart_total">
//             <span>Total:</span>
//             <span>Rs.{calculateTotal().toFixed(2)}</span>
//           </div>
//         </div>
//       )}

//       <div className="sliding_cart_footer">
//         <button 
//           className="view_full_cart_button" 
//           onClick={onViewFullCart}
//           disabled={cartItems.length === 0}
//         >
//           View Full Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SlidingCart;