import React, { useState } from "react";

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
        <section id="billing-section">
            <h1>Billing Information</h1>
          <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} required />
          <br />
          <input type="text" id="address" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />
          <br />
          <input type="integer" id="phone" name="phone" placeholder="Enter Phone No" value={formData.phone} onChange={handleChange} required />
          <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        </section>
        <section id="shipping-section">
            <h1>Shipping Information </h1>
          <input type="text" id="firstName" name="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" id="lastName" name="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange} required />
          <br />
          <input type="text" id="address" name="address" placeholder="Enter Address" value={formData.address} onChange={handleChange} required />
          <br />
          <input type="integer" id="phone" name="phone" placeholder="Enter Phone No" value={formData.phone} onChange={handleChange} required />
          <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
        </section>
        <section id="Payment-method">
            <h1>Payment Method</h1>
            <input type="radio" name="paymentMethod" value="cod" /> Cash on Delivery
            <br />
            <input type="radio" name="paymentMethod" value="paypro" /> PayPro

        </section>
      </div>
    </div>
  );
}

export default Checkout;
