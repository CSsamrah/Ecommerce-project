import React, { useState } from "react";
import "./Checkout.css"
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar1";
function Checkout() {
  const [expandedSections, setExpandedSections] = useState({
    shipping: true,
    billing: false,
    payment: false
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    state: "",
    phone: "",
    email: "",
    sameAsShipping: false,
    billingFirstName: "",
    billingLastName: "",
    billingAddress1: "",
    billingAddress2: "",
    billingZipCode: "",
    billingCity: "",
    billingState: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSameAsShippingChange = (e) => {
    const isChecked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAsShipping: isChecked,
      ...(isChecked ? {
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress1: prev.address1,
        billingAddress2: prev.address2,
        billingZipCode: prev.zipCode,
        billingCity: prev.city,
        billingState: prev.state
      } : {})
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (paymentMethod === "paypro") {
      navigate("/payment");
    } else if (paymentMethod === "cod") {
      navigate("/order-confirmation", {
        state: { paymentMethod: "cod" },
      });
    }
  };

  return (
    <div className="checkout-container">
      <Navbar />
      <br></br>
      <h1 className="checkout-header">Checkout</h1>
      
      <div className="checkout-grid">
        <div className="checkout-form-column">
          <div className={`checkout-section ${expandedSections.shipping ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('shipping')}>
              <div className="section-title">
                <span className={`step-number ${expandedSections.shipping ? 'active' : ''}`}>1</span>
                <h2>Shipping Address</h2>
              </div>
              <span className="toggle-icon">
                {expandedSections.shipping ? '−' : '+'}
              </span>
            </div>
            
            {expandedSections.shipping && (
              <div className="section-content">
                <p className="address-lookup-note">
                  Address lookup powered by Google. <a href="#">View Privacy policy</a>.
                </p>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>FIRST NAME *</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>    
                  <div className="form-group">
                    <label>LAST NAME *</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>ADDRESS *</label>
                  <input 
                    type="text" 
                    value={formData.address1}
                    onChange={(e) => setFormData({...formData, address1: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>APT, SUITE, FLOOR</label>
                  <input 
                    type="text" 
                    value={formData.address2}
                    onChange={(e) => setFormData({...formData, address2: e.target.value})}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>ZIP CODE *</label>
                    <input 
                      type="text" 
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>CITY *</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>STATE *</label>
                  <select 
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="khi">Karachi</option>
                    <option value="lhr">Lahore</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>PHONE *</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>EMAIL *</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button"
                    className="continue-button"
                    onClick={() => {
                      toggleSection('shipping');
                      toggleSection('billing');
                    }}
                  >
                    Continue to billing address
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={`checkout-section ${expandedSections.billing ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('billing')}>
              <div className="section-title">
                <span className={`step-number ${expandedSections.billing ? 'active' : ''}`}>2</span>
                <h2>Billing Address</h2>
              </div>
              <span className="toggle-icon">
                {expandedSections.billing ? '−' : '+'}
              </span>
            </div>
            
            {expandedSections.billing && (
              <div className="section-content">
                <div className="form-group checkbox-group">
                  <input 
                    type="checkbox" 
                    id="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onChange={handleSameAsShippingChange}
                  />
                  <label htmlFor="sameAsShipping">Same as shipping address</label>
                </div>
                
                {!formData.sameAsShipping && (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label>FIRST NAME *</label>
                        <input 
                          type="text" 
                          value={formData.billingFirstName}
                          onChange={(e) => setFormData({...formData, billingFirstName: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>LAST NAME *</label>
                        <input 
                          type="text" 
                          value={formData.billingLastName}
                          onChange={(e) => setFormData({...formData, billingLastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>ADDRESS </label>
                      <input 
                        type="text" 
                        value={formData.billingAddress1}
                        onChange={(e) => setFormData({...formData, billingAddress1: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>APT, SUITE, FLOOR</label>
                      <input 
                        type="text" 
                        value={formData.billingAddress2}
                        onChange={(e) => setFormData({...formData, billingAddress2: e.target.value})}
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label>ZIP CODE *</label>
                        <input 
                          type="text" 
                          value={formData.billingZipCode}
                          onChange={(e) => setFormData({...formData, billingZipCode: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>CITY *</label>
                        <input 
                          type="text" 
                          value={formData.billingCity}
                          onChange={(e) => setFormData({...formData, billingCity: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>STATE *</label>
                      <select 
                        value={formData.billingState}
                        onChange={(e) => setFormData({...formData, billingState: e.target.value})}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="khi">Karachi</option>
                        <option value="lhr">Lahore</option>

                      </select>
                    </div>
                  </>
                )}
                
                <div className="form-actions">
                  <button 
                    type="button"
                    className="continue-button"
                    onClick={() => {
                      toggleSection('billing');
                      toggleSection('payment');
                    }}
                  >
                    Continue to payment
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className={`checkout-section ${expandedSections.payment ? 'expanded' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('payment')}>
              <div className="section-title">
                <span className={`step-number ${expandedSections.payment ? 'active' : ''}`}>3</span>
                <h2>Payment Method</h2>
              </div>
              <span className="toggle-icon">
                {expandedSections.payment ? '−' : '+'}
              </span>
            </div>
            
            {expandedSections.payment && (
              <div className="section-content">
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <label htmlFor="cod">

                      <span className="payment-label">Cash on Delivery</span>
                    </label>
                  </div>
                  
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="paypro"
                      name="paymentMethod"
                      value="paypro"
                      checked={paymentMethod === "paypro"}
                      onChange={() => setPaymentMethod("paypro")}
                    />
                    <label htmlFor="paypro">

                      <span className="payment-label">PayPro</span>
                    </label>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    className="place-order-button"
                    onClick={handlePlaceOrder}
                    disabled={!paymentMethod}
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="checkout-summary-column">
          <div className="order-summary">
            <h2>Summary</h2>
            
            <div className="promo-code">
              <p>Promo code 3 per order maximum</p>
              <input type="text" placeholder="Enter code" />
            </div>
            
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal</span>
                <span>$300.00</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>

              <div className="divider"></div>
              <div className="price-row total">
                <span>Total</span>
                <span>$300.00</span>
              </div>
            </div>

          </div>
          
          <div className="cart-items">
            <h2>Cart</h2>
            
            <div className="cart-item">
              <h3>Mouse</h3>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;