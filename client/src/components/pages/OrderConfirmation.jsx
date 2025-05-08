// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./OrderConfirmation.css";
// import Navbar from "../Navbar/navbar1";

// function OrderConfirmation() {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Safely destructure with defaults
//   const { 
//     formData = {},
//     paymentMethod = "N/A"
//   } = location.state || {};

//   // Generate a random order number
//   const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

//   const handleBackToHome = () => {
//     navigate("/");
//   };

//   // Function to get full billing address with null checks
//   const getBillingAddress = () => {
//     if (formData.sameAsShipping) {
//       return `${formData.address1 || ''}${formData.address2 ? ', ' + formData.address2 : ''}, ${formData.city || ''}, ${formData.state || ''}, ${formData.zipCode || ''}`;
//     } else {
//       return `${formData.billingAddress1 || ''}${formData.billingAddress2 ? ', ' + formData.billingAddress2 : ''}, ${formData.billingCity || ''}, ${formData.billingState || ''}, ${formData.billingZipCode || ''}`;
//     }
//   };

//   // Function to get shipping address with null checks
//   const getShippingAddress = () => {
//     return `${formData.address1 || ''}${formData.address2 ? ', ' + formData.address2 : ''}, ${formData.city || ''}, ${formData.state || ''}, ${formData.zipCode || ''}`;
//   };

//   // Get state name from code with null check
//   const getStateName = (stateCode) => {
//     if (!stateCode) return '';
//     const states = {
//       pj: "Punjab",
//       sir: "Sindh",
//       kpk: "KPK",
//       Bal: "Balochistan",
//       GB: "Gilgit Baltistan"
//     };
//     return states[stateCode.toLowerCase()] || stateCode;
//   };

//   return (
//     <div className="order-confirmation-container">
//       <Navbar />
//       <br />
//       <div className="order-confirmation-card">
//         <div className="order-confirmation-header">
//           <div className="order-confirmation-checkmark">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
//               <polyline points="22 4 12 14.01 9 11.01"></polyline>
//             </svg>
//           </div>
//           <h2>Order Confirmed!</h2>
//           <p className="order-confirmation-thanks">Thank you for your purchase. Below are your order details:</p>
//         </div>

//         <div className="order-confirmation-section">
//           <h3>Shipping Information</h3>
//           <div className="order-confirmation-details">
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Name:</span>
//               <span className="order-confirmation-value">
//                 {formData.firstName || 'Not provided'} {formData.lastName || ''}
//               </span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Address:</span>
//               <span className="order-confirmation-value">{getShippingAddress() || 'Not provided'}</span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">State:</span>
//               <span className="order-confirmation-value">{getStateName(formData.state) || 'Not provided'}</span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Phone:</span>
//               <span className="order-confirmation-value">{formData.phone || 'Not provided'}</span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Email:</span>
//               <span className="order-confirmation-value">{formData.email || 'Not provided'}</span>
//             </div>
//           </div>
//         </div>

//         <div className="order-confirmation-section">
//           <h3>Billing Information</h3>
//           <div className="order-confirmation-details">
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Name:</span>
//               <span className="order-confirmation-value">
//                 {formData.sameAsShipping 
//                   ? `${formData.firstName || ''} ${formData.lastName || ''}`
//                   : `${formData.billingFirstName || ''} ${formData.billingLastName || ''}`}
//               </span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">Address:</span>
//               <span className="order-confirmation-value">{getBillingAddress() || 'Not provided'}</span>
//             </div>
//             <div className="order-confirmation-detail-row">
//               <span className="order-confirmation-label">State:</span>
//               <span className="order-confirmation-value">
//                 {formData.sameAsShipping 
//                   ? getStateName(formData.state) || 'Not provided'
//                   : getStateName(formData.billingState) || 'Not provided'}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="order-confirmation-section">
//           <h3>Payment Method</h3>
//           <div className="order-confirmation-payment-method">
//             {paymentMethod === "payFast" ? "PayFast" : "Cash on Delivery"}
//           </div>
//         </div>

//         <div className="order-confirmation-message">
//           <p>Your order is being processed and will be shipped soon.</p>
//           <p className="order-confirmation-order-number">Order #: {orderNumber}</p>
//         </div>

//         <button className="order-confirmation-home-button" onClick={handleBackToHome}>
//           Back to Home Page
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OrderConfirmation;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/navbar1'; // Adjust path as needed
import './OrderConfirmation.css'; // Create this CSS file

function OrderConfirmation() {
  const location = useLocation();
  const { paymentMethod, orderId } = location.state || {};
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setError('Order ID not found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/api/orders/details/${orderId}`, {
          withCredentials: true
        });
        setOrderDetails(response.data.orderItems);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching order details:', err);
        setError('Failed to load order details. Please try again later.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const calculateTotal = () => {
    if (!orderDetails) return 0;
    return orderDetails.reduce((sum, item) => sum + parseFloat(item.total_price), 0);
  };

  if (loading) {
    return (
      <div className="order-confirmation-container">
        <Navbar />
        <div className="order-confirmation-content">
          <h2>Loading order details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-confirmation-container">
        <Navbar />
        <div className="order-confirmation-content">
          <h2>Error</h2>
          <p className="error-message">{error}</p>
          <Link to="/" className="continue-shopping-btn">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <Navbar />
      <div className="order-confirmation-content">
        <div className="confirmation-header">
          <h1>Order Confirmation</h1>
          <div className="confirmation-icon">
            <i className="fas fa-check-circle"></i>
          </div>
        </div>

        <div className="confirmation-message">
          <h2>Thank you for your order!</h2>
          <p>Your order has been received and is now being processed.</p>
          <p>Order ID: <strong>{orderId}</strong></p>
          <p>Payment Method: <strong>{paymentMethod === 'cod' ? 'Cash on Delivery' : 'PayFast'}</strong></p>
        </div>

        {orderDetails && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {orderDetails.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-name">
                    <p>{item.product_name}</p>
                    <p className="item-quantity">x{item.quantity}</p>
                  </div>
                  <div className="item-price">
                    <p>Rs. {parseFloat(item.total_price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <p>Total</p>
              <p>Rs. {calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        )}

        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <p>Your order will be shipped within 2-3 business days.</p>
          <p>You will receive an email with tracking information once your order ships.</p>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="continue-shopping-btn">Continue Shopping</Link>
          <Link to="/account/orders" className="view-orders-btn">View My Orders</Link>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;