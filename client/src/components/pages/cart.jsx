// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from './cartContext'; // Adjust path as per your project structure
// import './cart.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// const Cart = () => {
//   const { cartItems, removeFromCart, updateQuantity } = useCart();
//   const navigate = useNavigate();

//   const removeCartItem = (title) => {
//     removeFromCart(title);
//   };

//   const handleQuantityChange = (title, quantity) => {
//     updateQuantity(title, quantity);
//   };

//   const handleCheckout = () => {
//     // Navigate to checkout form page
//     navigate('/checkout');
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       return total + parseFloat(item.price.replace('Rs.', '')) * item.quantity;
//     }, 0).toFixed(2);
//   };

//   const navigateToCatalog = () => {
//     navigate(`/catalog`);
//   };

//   return (
//     <div className="cart_page">
//       <h1 className='shopping_cart_heading'>Shopping Cart</h1>
//       <div className="cart_box">
//         <div className="cart_header">
//           <div className="header_product">Product</div>
//           <div className="header_quantity">Quantity</div>
//           <div className="header_subtotal">Subtotal</div>
//           <div className="header_action">Action</div>
//         </div>
//         <div className="cart_info">
//           {cartItems.map((item) => (
//             <div className="product_box" key={item.title}>
//               <div className="detail_box">
//                 <div className="cart_product_title">{item.title}</div>
//                 <div className="cart_product_price"><p>Rs.{item.price}</p></div>
//               </div>

//               <div className="cart_item_quantity">
//                 <button
//                   className="quantity-btn"
//                   onClick={() => handleQuantityChange(item.title, Math.max(1, item.quantity - 1))}
//                 >
//                   <FontAwesomeIcon icon={faMinus} />
//                 </button>
//                 <span className="quantity-value">{item.quantity}</span>
//                 <button
//                   className="quantity-btn"
//                   onClick={() => handleQuantityChange(item.title, item.quantity + 1)}
//                 >
//                   <FontAwesomeIcon icon={faPlus} />
//                 </button>
//               </div>
//               <div className="subtotal">
//                 <div className="sub_price">
//                   Rs.{(parseFloat(item.price.replace('Rs.', '')) * item.quantity).toFixed(2)}
//                 </div>
//               </div>
//               <div className="remove_item">
//                 <button
//                     className="cart_remove"
//                     onClick={() => removeCartItem(item.title)}
//                   >
//                     <FontAwesomeIcon icon={faTrash} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="order_summary">
//         <div className="subtotal_section">
//             <div className="subtotal_label">Total:</div>
//             <div className="subtotal_price">Rs.{calculateTotal()}</div>
//           </div>
//           <div className="shipping_section">
//             <div className="shipping_label">Total:</div>
//             <div className="shipping_price">Rs.100</div>
//           </div>
//           <div className="total_section">
//             <div className="total_label">Total:</div>
//             <div className="total_price">Rs.{calculateTotal()}</div>
//           </div>

//           <div className="checkout_section">
//             <button className="checkout_button" onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </div>

//         <div className="update_cart_section">
//             <button className="update_cart_button" onClick={() => navigateToCatalog()}>
//               Update Cart
//             </button>
//           </div>
        
//     </div>
//   );
// };

// export default Cart;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';
import './cart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const removeCartItem = (title) => {
    removeFromCart(title);
  };

  const handleQuantityChange = (title, quantity) => {
    updateQuantity(title, quantity);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.price.replace('Rs.', '')) * item.quantity;
    }, 0);
  };

  // const discount = calculateSubtotal() * 0.1;
  const deliveryFee = 50;
  const total = calculateSubtotal() + deliveryFee;

  return (
    <div className="main_cart_page">
      <div className="cart_page">
        <h1 className="shopping_cart_heading">Shopping Cart</h1>
        <div className="cart_container">
          {/* Left Side: Cart Items */}
          <div className="cart_items_section">
            <div className="cart_header">
              <div className="header_product">Product Code</div>
              <div className="header_quantity column_header">Quantity</div>
              <div className="header_total column_header">Total</div>
              <div className="header_action column_header">Action</div>
            </div>
            
            {cartItems.length === 0 ? (
              <div className="empty_cart_message">
                {/* <ShoppingCart size={64} className="text-l text-gray-300 mb-4" /> */}
                <p className="text-xl text-gray-600 mb-9">You haven't added any products yet</p>
                <button 
                  onClick={() => navigate('/catalog')} 
                  className="start_shopping_button"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="cart_info">
                {cartItems.map((item) => (
                  <div className="product_box" key={item.title}>
                    {/* Product Details */}
                    <div className="product_details">
                      <img src={item.image} alt={item.title} className="cart_product_image" />
                      <div className="cart_product_info">
                        <div className="cart_product_title">{item.title}</div>
                        <div className="cart_product_price">Rs. {item.price}</div>
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="cart_item_quantity">
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

                    {/* Total Price */}
                    <div className="total_price">
                      ${parseFloat(item.price.replace('Rs.', '')) * item.quantity}
                    </div>

                    {/* Remove Button */}
                    <div className="remove_item">
                      <button className="cart_remove" onClick={() => removeCartItem(item.title)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Update Cart Button - only show if there are items */}
            {cartItems.length > 0 && (
              <div className="update_cart_section">
                <button className="update_cart_button" onClick={() => navigate('/catalog')}>
                  Update Cart
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Order Summary - only show if there are items */}
          {cartItems.length > 0 && (
            <div className="order_summary">
              <h2>Order Summary</h2>
              <div className="summary_details">
                <div className="summary_row">
                  <span>Sub Total:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary_row">
                  <span>Delivery Fee:</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary_total">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="checkout_button" onClick={handleCheckout}>
                Checkout Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
