import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";
import Navbar from "../Navbar/navbar1";

function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData = {}, paymentMethod = "N/A", paymentDetails = {} } = location.state || {};

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="order-confirmation-container">
      <Navbar />
      <br></br>
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
          <h3>Billing Information</h3>
          <div className="order-confirmation-details">
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Name:</span>
              <span className="order-confirmation-value">{formData.firstName} {formData.lastName}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Address:</span>
              <span className="order-confirmation-value">{formData.address}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Phone:</span>
              <span className="order-confirmation-value">{formData.phone}</span>
            </div>
            <div className="order-confirmation-detail-row">
              <span className="order-confirmation-label">Email:</span>
              <span className="order-confirmation-value">{formData.email}</span>
            </div>
          </div>
        </div>

        <div className="order-confirmation-section">
          <h3>Payment Method</h3>
          <div className="order-confirmation-payment-method">
            {paymentMethod === "paypro" ? "PayPro" : "Cash on Delivery"}
          </div>
        </div>

        {paymentMethod === "paypro" && (
          <div className="order-confirmation-section">
            <h3>Payment Details</h3>
            <div className="order-confirmation-details">
              <div className="order-confirmation-detail-row">
                <span className="order-confirmation-label">Card:</span>
                <span className="order-confirmation-value">**** **** **** {paymentDetails.cardNumber?.slice(-4)}</span>
              </div>
              <div className="order-confirmation-detail-row">
                <span className="order-confirmation-label">Country:</span>
                <span className="order-confirmation-value">{paymentDetails.country}</span>
              </div>
              <div className="order-confirmation-detail-row">
                <span className="order-confirmation-label">Phone:</span>
                <span className="order-confirmation-value">{paymentDetails.phone}</span>
              </div>
            </div>
          </div>
        )}

        <div className="order-confirmation-message">
          <p>Your order is being processed and will be shipped soon.</p>
          <p className="order-confirmation-order-number">Order #: {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
        </div>

        <button className="order-confirmation-home-button" onClick={handleBackToHome}>
          Back to Home Page
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;