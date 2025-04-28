import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";
import Navbar from "../Navbar/navbar1";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Safely destructure with defaults
  const { 
    formData = {},
    paymentMethod = "N/A"
  } = location.state || {};

  // Generate a random order number
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

  const handleBackToHome = () => {
    navigate("/");
  };

  // Function to get full billing address with null checks
  const getBillingAddress = () => {
    if (formData.sameAsShipping) {
      return `${formData.address1 || ''}${formData.address2 ? ', ' + formData.address2 : ''}, ${formData.city || ''}, ${formData.state || ''}, ${formData.zipCode || ''}`;
    } else {
      return `${formData.billingAddress1 || ''}${formData.billingAddress2 ? ', ' + formData.billingAddress2 : ''}, ${formData.billingCity || ''}, ${formData.billingState || ''}, ${formData.billingZipCode || ''}`;
    }
  };

  // Function to get shipping address with null checks
  const getShippingAddress = () => {
    return `${formData.address1 || ''}${formData.address2 ? ', ' + formData.address2 : ''}, ${formData.city || ''}, ${formData.state || ''}, ${formData.zipCode || ''}`;
  };

  // Get state name from code with null check
  const getStateName = (stateCode) => {
    if (!stateCode) return '';
    const states = {
      pj: "Punjab",
      sir: "Sindh",
      kpk: "KPK",
      Bal: "Balochistan",
      GB: "Gilgit Baltistan"
    };
    return states[stateCode.toLowerCase()] || stateCode;
  };

  return (
    <div className="order-confirmation-container">
      <Navbar />
      <br />
      <div className="order-confirmation-card">
        <div className="order-confirmation-header">
          <div className="order-confirmation-checkmark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2>Order Confirmed!</h2>
          <p className="order-confirmation-thanks">Thank you for your purchase. Below are your order details:</p>
        </div>

        <div className="order-confirmation-section">
          <h3>Shipping Information</h3>
          <div className="order-confirmation-details">
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Name:</span>
              <span className="order-confirmation-value">
                {formData.firstName || 'Not provided'} {formData.lastName || ''}
              </span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Address:</span>
              <span className="order-confirmation-value">{getShippingAddress() || 'Not provided'}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">State:</span>
              <span className="order-confirmation-value">{getStateName(formData.state) || 'Not provided'}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Phone:</span>
              <span className="order-confirmation-value">{formData.phone || 'Not provided'}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Email:</span>
              <span className="order-confirmation-value">{formData.email || 'Not provided'}</span>
            </div>
          </div>
        </div>

        <div className="order-confirmation-section">
          <h3>Billing Information</h3>
          <div className="order-confirmation-details">
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Name:</span>
              <span className="order-confirmation-value">
                {formData.sameAsShipping 
                  ? `${formData.firstName || ''} ${formData.lastName || ''}`
                  : `${formData.billingFirstName || ''} ${formData.billingLastName || ''}`}
              </span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Address:</span>
              <span className="order-confirmation-value">{getBillingAddress() || 'Not provided'}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">State:</span>
              <span className="order-confirmation-value">
                {formData.sameAsShipping 
                  ? getStateName(formData.state) || 'Not provided'
                  : getStateName(formData.billingState) || 'Not provided'}
              </span>
            </div>
          </div>
        </div>

        <div className="order-confirmation-section">
          <h3>Payment Method</h3>
          <div className="order-confirmation-payment-method">
            {paymentMethod === "payFast" ? "PayFast" : "Cash on Delivery"}
          </div>
        </div>

        <div className="order-confirmation-message">
          <p>Your order is being processed and will be shipped soon.</p>
          <p className="order-confirmation-order-number">Order #: {orderNumber}</p>
        </div>

        <button className="order-confirmation-home-button" onClick={handleBackToHome}>
          Back to Home Page
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;