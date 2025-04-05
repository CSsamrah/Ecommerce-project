import React from "react";
import { useLocation } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const location = useLocation();
  const { formData = {}, paymentMethod = "N/A", paymentDetails = {} } = location.state || {};

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>Order Confirmed!</h2>
        <p className="thanks-msg">Thank you for your purchase. Below are your order details:</p>

        <div className="section">
          <h3>Billing Information</h3>
          <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Email:</strong> {formData.email}</p>
        </div>

        <div className="section">
          <h3>Payment Method</h3>
          <p>{paymentMethod === "paypro" ? "PayPro" : "Cash on Delivery"}</p>
        </div>

        {paymentMethod === "paypro" && (
          <div className="section">
            <h3>Payment Details</h3>
            <p><strong>Card:</strong> **** **** **** {paymentDetails.cardNumber?.slice(-4)}</p>
            <p><strong>Country:</strong> {paymentDetails.country}</p>
            <p><strong>Phone:</strong> {paymentDetails.phone}</p>
          </div>
        )}

        <div className="confirmation-message">
          <p>Your order is being processed and will be shipped soon.</p>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;


