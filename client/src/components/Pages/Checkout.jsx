import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import "./Checkout.css";

function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", address: "",
    phone: "",
    email: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(""); 
  const navigate = useNavigate();  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentChange = (event) => {
setPaymentMethod(event.target.value); 
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "paypro") {
      navigate("/payment"); // <-- In case of Paypro
    } else if (paymentMethod === "cod") {
      navigate("/order-confirmation", {
        state: { paymentMethod: "cod" },
      });
    }
  };
  return (
    <div className="checkout-body">
      <div className="checkout-container">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-form1">
          <div className="checkout-form2">
            <div className="section">
              <h3>Billing Information</h3>
              <div className="input-group">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required/>
<input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required/>
              </div>
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="full-width" required/>
              <div className="input-group">
                <input type="tel" name="phone" placeholder="Phone No" value={formData.phone} onChange={handleChange} required/>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
              </div>
            </div>

            <div className="section">
              <h3>Shipping Information</h3>
              <div className="input-group">
                <input type="text" name="firstName" placeholder="First Name" required/>
                <input type="text" name="lastName" placeholder="Last Name" required/>
              </div>
              <input type="text" name="address" placeholder="Address" className="full-width" required/>
              <div className="input-group">
                <input type="tel" name="phone" placeholder="Phone No" required/>
                <input type="email" name="email" placeholder="Email" required/>
              </div>
            </div>

            <div className="section">
              <h3>Payment Method</h3>
              <label>
                <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === "cod"} onChange={handlePaymentChange} /> Cash on Delivery
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="paypro"  checked={paymentMethod === "paypro"} onChange={handlePaymentChange} />PayPro
              </label>
            </div>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              <li><span>Mouse x1</span> <span>$145.00</span></li>
              <li><span>Mouse x1</span> <span>$145.00</span></li>
              <li><span>Mouse x1</span> <span>$145.00</span></li>
              <hr />
              <li><span>Subtotal</span> <span>Rs. 12000</span></li>
              <li><span>Shipping</span> <span>250</span></li>
              <hr />
              <li className="total"><span>Total</span> <span>$435.00</span></li>
            </ul>
            <button className="place-order-btn" onClick={handlePlaceOrder}>  Place Order </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;



