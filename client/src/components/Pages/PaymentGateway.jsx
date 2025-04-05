import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import "./PaymentPage.css";

function PaymentPage() {
  const navigate = useNavigate();
  const formData =  {};
  const [paymentInfo, setPaymentInfo] = useState({
    email: "", fullName: "",
    country: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });


  const handleChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/order-confirmation", {
      state: {
        formData,
        paymentMethod: "paypro", paymentDetails: paymentInfo,
      },
    });
  };
  return (
    <div className="paypro-container">
      <form className="paypro-form" onSubmit={handleSubmit}>
        <h2>PayPro Payment</h2>
        <label>Email</label>
        <input type="email" name="email" placeholder="email@mail.com" value={paymentInfo.email} onChange={handleChange} required />
        <label>Full name</label>
        <div className="split-input">
          <input type="text" name="fullName" placeholder="Enter Full Name" value={paymentInfo.fullName} onChange={handleChange} required/>
        </div>

        <label>Country</label>
        <select
          name="country"
          value={paymentInfo.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="Pakistan">Pakistan</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
        </select>

        <label>Phone number </label>
        <input type="tel" name="phone" placeholder="+92" value={paymentInfo.phone}  onChange={handleChange} required />

        <label>Card details</label>
        <div className="card-group">
          <input type="text" name="cardNumber" placeholder="Card number" value={paymentInfo.cardNumber} onChange={handleChange}  required />
          <input type="text" name="expiry" placeholder="MM/YY" value={paymentInfo.expiry} onChange={handleChange} required />
          <input type="text" name="cvc" placeholder="CVC" value={paymentInfo.cvc} onChange={handleChange} required/>
        </div>


        <button type="submit" className="buy-now-btn">Buy Now </button>
        <p className="note">By submitting your Order, you acknowledge that you are purchasing through PayPro Global.</p>
      </form>
    </div>
  );
}

export default PaymentPage;



