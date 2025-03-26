import React, { useState } from "react";
import "./Checkout.css"; // Importing the CSS file

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="checkout-body">
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        
        <div className="checkout-grid">
          {/* Left: Billing & Shipping Information */}
          <div className="checkout-form">
            {/* Billing Information */}
            <div className="section">
              <h3>Billing Information</h3>
              <div className="input-group">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
              </div>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="full-width"/>
              <div className="input-group">
                <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </div>
            </div>

            {/* Shipping Information */}
            <div className="section">
              <h3>Shipping Information</h3>
              <div className="input-group">
                <input type="text" name="firstName" placeholder="First Name" />
                <input type="text" name="lastName" placeholder="Last Name" />
              </div>
              <input type="text" name="address" placeholder="Address" className="full-width" />
              <div className="input-group">
                <input type="tel" name="phone" placeholder="Phone No" />
                <input type="email" name="email" placeholder="Email" />
              </div>
            </div>

            {/* Payment Method */}
            <div className="section">
              <h3>Payment Method</h3>
              <label><input type="radio" name="paymentMethod" value="cod" /> Cash on Delivery</label>
              <label><input type="radio" name="paymentMethod" value="paypro" /> PayPro</label>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              <li><span>Leather Sofa Chair x1</span> <span>$145.00</span></li>
              <li><span>Leather Sofa Chair x1</span> <span>$145.00</span></li>
              <li><span>Leather Sofa Chair x1</span> <span>$145.00</span></li>
              <hr />
              <li><span>Subtotal</span> <span>$435.00</span></li>
              <li><span>Shipping</span> <span>Free</span></li>
              <hr />
              <li className="total"><span>Total</span> <span>$435.00</span></li>
            </ul>
            <button className="place-order-btn">Place Order →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

