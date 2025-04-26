// import React, { useState } from "react";
// import "./Checkout.css"
// import { useNavigate } from "react-router-dom";
// import Navbar from "../Navbar/navbar1";
// function Checkout() {
//   const [expandedSections, setExpandedSections] = useState({
//     shipping: true,
//     billing: false,
//     payment: false
//   });
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     address1: "",
//     address2: "",
//     zipCode: "",
//     city: "",
//     state: "",
//     phone: "",
//     email: "",
//     sameAsShipping: false,
//     billingFirstName: "",
//     billingLastName: "",
//     billingAddress1: "",
//     billingAddress2: "",
//     billingZipCode: "",
//     billingCity: "",
//     billingState: ""
//   });
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const navigate = useNavigate();

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const handleSameAsShippingChange = (e) => {
//     const isChecked = e.target.checked;
//     setFormData(prev => ({
//       ...prev,
//       sameAsShipping: isChecked,
//       ...(isChecked ? {
//         billingFirstName: prev.firstName,
//         billingLastName: prev.lastName,
//         billingAddress1: prev.address1,
//         billingAddress2: prev.address2,
//         billingZipCode: prev.zipCode,
//         billingCity: prev.city,
//         billingState: prev.state
//       } : {})
//     }));
//   };

//   const handlePlaceOrder = (e) => {
//     e.preventDefault();
//     if (paymentMethod === "payFast") {
//       navigate("/payment");
//     } else if (paymentMethod === "cod") {
//       navigate("/order-confirmation", {
//         state: { paymentMethod: "cod" },
//       });
//     }
//   };

//   return (
//     <div className="checkout-container">
//       <Navbar />
//       <br></br>
//       <h1 className="checkout-header">Checkout</h1>

//       <div className="checkout-grid">
        // <div className="checkout-form-column">
        //   <div className={`checkout-section ${expandedSections.shipping ? 'expanded' : ''}`}>
        //     <div className="section-header" onClick={() => toggleSection('shipping')}>
        //       <div className="section-title">
        //         <span className={`step-number ${expandedSections.shipping ? 'active' : ''}`}>1</span>
        //         <h2>Shipping Address</h2>
        //       </div>
        //       <span className="toggle-icon">
        //         {expandedSections.shipping ? '−' : '+'}
        //       </span>
        //     </div>

        //     {expandedSections.shipping && (
        //       <div className="section-content">
        //         <p className="address-lookup-note">
        //           Address lookup powered by Google. <a href="#">View Privacy policy</a>.
        //         </p>

        //         <div className="form-row">
        //           <div className="form-group">
        //             <label>FIRST NAME *</label>
        //             <input
        //               type="text"
        //               value={formData.firstName}
        //               onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
        //               required
        //             />
        //           </div>
        //           <div className="form-group">
        //             <label>LAST NAME *</label>
        //             <input
        //               type="text"
        //               value={formData.lastName}
        //               onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
        //               required
        //             />
        //           </div>
        //         </div>
        //         <div className="form-group">
        //           <label>ADDRESS *</label>
        //           <input
        //             type="text"
        //             value={formData.address1}
        //             onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
        //             required
        //           />
        //         </div>

        //         <div className="form-group">
        //           <label>APT, SUITE, FLOOR</label>
        //           <input
        //             type="text"
        //             value={formData.address2}
        //             onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
        //           />
        //         </div>

        //         <div className="form-row">
        //           <div className="form-group">
        //             <label>ZIP CODE *</label>
        //             <input
        //               type="text"
        //               value={formData.zipCode}
        //               onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
        //               required
        //             />
        //           </div>

        //           <div className="form-group">
        //             <label>CITY *</label>
        //             <input
        //               type="text"
        //               value={formData.city}
        //               onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        //               required
        //             />
        //           </div>
        //         </div>

        //         <div className="form-group">
        //           <label>STATE *</label>
        //           <select
        //             value={formData.state}
        //             onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        //             required
        //           >
        //             <option value="">Select...</option>
        //             <option value="pj">Punjab</option>
        //             <option value="sir">Sindh</option>
        //             <option value='kpk'>KPK</option>
        //             <option value='Bal'>Balochistan</option>
        //             <option value='GB'>Gilgit Baltistan</option>
        //           </select>
        //         </div>

        //         <div className="form-group">
        //           <label>PHONE *</label>
        //           <input
        //             type="tel"
        //             value={formData.phone}
        //             onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        //             required
        //           />
        //         </div>

        //         <div className="form-group">
        //           <label>EMAIL *</label>
        //           <input
        //             type="email"
        //             value={formData.email}
        //             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        //             required
        //           />
        //         </div>

        //         <div className="form-actions">
        //           <button
        //             type="button"
        //             className="continue-button"
        //             onClick={() => {
        //               toggleSection('shipping');
        //               toggleSection('billing');
        //             }}
        //           >
        //             Continue to billing address
        //           </button>
        //         </div>
        //       </div>
        //     )}
        //   </div>

        //   <div className={`checkout-section ${expandedSections.billing ? 'expanded' : ''}`}>
        //     <div className="section-header" onClick={() => toggleSection('billing')}>
        //       <div className="section-title">
        //         <span className={`step-number ${expandedSections.billing ? 'active' : ''}`}>2</span>
        //         <h2>Billing Address</h2>
        //       </div>
        //       <span className="toggle-icon">
        //         {expandedSections.billing ? '−' : '+'}
        //       </span>
        //     </div>

        //     {expandedSections.billing && (
        //       <div className="section-content">
        //         <div className="form-group checkbox-group">
        //           <input
        //             type="checkbox"
        //             id="sameAsShipping"
        //             checked={formData.sameAsShipping}
        //             onChange={handleSameAsShippingChange}
        //           />
        //           <label htmlFor="sameAsShipping">Same as shipping address</label>
        //         </div>

        //         {!formData.sameAsShipping && (
        //           <>
        //             <div className="form-row">
        //               <div className="form-group">
        //                 <label>FIRST NAME *</label>
        //                 <input
        //                   type="text"
        //                   value={formData.billingFirstName}
        //                   onChange={(e) => setFormData({ ...formData, billingFirstName: e.target.value })}
        //                   required
        //                 />
        //               </div>

        //               <div className="form-group">
        //                 <label>LAST NAME *</label>
        //                 <input
        //                   type="text"
        //                   value={formData.billingLastName}
        //                   onChange={(e) => setFormData({ ...formData, billingLastName: e.target.value })}
        //                   required
        //                 />
        //               </div>
        //             </div>

        //             <div className="form-group">
        //               <label>ADDRESS </label>
        //               <input
        //                 type="text"
        //                 value={formData.billingAddress1}
        //                 onChange={(e) => setFormData({ ...formData, billingAddress1: e.target.value })}
        //                 required
        //               />
        //             </div>

        //             <div className="form-group">
        //               <label>APT, SUITE, FLOOR</label>
        //               <input
        //                 type="text"
        //                 value={formData.billingAddress2}
        //                 onChange={(e) => setFormData({ ...formData, billingAddress2: e.target.value })}
        //               />
        //             </div>

        //             <div className="form-row">
        //               <div className="form-group">
        //                 <label>ZIP CODE *</label>
        //                 <input
        //                   type="text"
        //                   value={formData.billingZipCode}
        //                   onChange={(e) => setFormData({ ...formData, billingZipCode: e.target.value })}
        //                   required
        //                 />
        //               </div>

        //               <div className="form-group">
        //                 <label>CITY *</label>
        //                 <input
        //                   type="text"
        //                   value={formData.billingCity}
        //                   onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
        //                   required
        //                 />
        //               </div>
        //             </div>

        //             <div className="form-group">
        //               <label>STATE *</label>
        //               <select
        //                 value={formData.billingState}
        //                 onChange={(e) => setFormData({ ...formData, billingState: e.target.value })}
        //                 required
        //               >
        //                 <option value="">Select...</option>
        //                 <option value="pj">Punjab</option>
        //                 <option value="sir">Sindh</option>
        //                 <option value='kpk'>KPK</option>
        //                 <option value='Bal'>Balochistan</option>
        //                 <option value='GB'>Gilgit Baltistan</option>

        //               </select>
        //             </div>
        //           </>
        //         )}

        //         <div className="form-actions">
        //           <button
        //             type="button"
        //             className="continue-button"
        //             onClick={() => {
        //               toggleSection('billing');
        //               toggleSection('payment');
        //             }}
        //           >
        //             Continue to payment
        //           </button>
        //         </div>
        //       </div>
        //     )}
        //   </div>

        //   <div className={`checkout-section ${expandedSections.payment ? 'expanded' : ''}`}>
        //     <div className="section-header" onClick={() => toggleSection('payment')}>
        //       <div className="section-title">
        //         <span className={`step-number ${expandedSections.payment ? 'active' : ''}`}>3</span>
        //         <h2>Payment Method</h2>
        //       </div>
        //       <span className="toggle-icon">
        //         {expandedSections.payment ? '−' : '+'}
        //       </span>
        //     </div>

        //     {expandedSections.payment && (
        //       <div className="section-content">
        //         <div className="payment-options">
        //           <div className="payment-option">
        //             <input
        //               type="radio"
        //               id="cod"
        //               name="paymentMethod"
        //               value="cod"
        //               checked={paymentMethod === "cod"}
        //               onChange={() => setPaymentMethod("cod")}
        //             />
        //             <label htmlFor="cod">

        //               <span className="payment-label">Cash on Delivery</span>
        //             </label>
        //           </div>

        //           <div className="payment-option">
        //             <input
        //               type="radio"
        //               id="payFast"
        //               name="paymentMethod"
        //               value="payFast"
        //               checked={paymentMethod === "payFast"}
        //               onChange={() => setPaymentMethod("payFast")}
        //             />
        //             <label htmlFor="payFast">

        //               <span className="payment-label">PayFast</span>
        //             </label>
        //           </div>
        //         </div>

        //         <div className="form-actions">
        //           <button
        //             className="place-order-button"
        //             onClick={handlePlaceOrder}
        //             disabled={!paymentMethod}
        //           >
        //             Place Order
        //           </button>
        //         </div>
        //       </div>
        //     )}
        //   </div>
        // </div>

//         <div className="checkout-summary-column">
//           <div className="order-summary">
//             <h2>Summary</h2>

//             <div className="promo-code">
//               <p>Promo code 3 per order maximum</p>
//               <input type="text" placeholder="Enter code" />
//             </div>

//             <div className="price-breakdown">
//               <div className="price-row">
//                 <span>Subtotal</span>
//                 <span>$300.00</span>
//               </div>
//               <div className="price-row">
//                 <span>Shipping</span>
//                 <span>FREE</span>
//               </div>

//               <div className="divider"></div>
//               <div className="price-row total">
//                 <span>Total</span>
//                 <span>$300.00</span>
//               </div>
//             </div>

//           </div>

//           <div className="cart-items">
//             <h2>Cart</h2>

//             <div className="cart-item">
//               <h3>Mouse</h3>

//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;


import React, { useState } from "react";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/navbar1";
import { useCart } from "./cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Checkout() {
  const { cartItems, removeFromCart } = useCart();
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
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + parseFloat(item.price.replace('Rs.', '')) * item.quantity;
    }, 0);
  };

  const deliveryFee = 50;
  const total = calculateSubtotal() + deliveryFee;

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

  const validateForm = () => {
    const newErrors = {};
    
    // Shipping address validation
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.address1.trim()) newErrors.address1 = "Address is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Billing address validation (only if not same as shipping)
    if (!formData.sameAsShipping) {
      if (!formData.billingFirstName.trim()) newErrors.billingFirstName = "First name is required";
      if (!formData.billingLastName.trim()) newErrors.billingLastName = "Last name is required";
      if (!formData.billingAddress1.trim()) newErrors.billingAddress1 = "Address is required";
      if (!formData.billingZipCode.trim()) newErrors.billingZipCode = "Zip code is required";
      if (!formData.billingCity.trim()) newErrors.billingCity = "City is required";
      if (!formData.billingState) newErrors.billingState = "State is required";
    }

    // Payment method validation
    if (!paymentMethod) newErrors.paymentMethod = "Payment method is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (paymentMethod === "payFast") {
        navigate("/payment");
      } else if (paymentMethod === "cod") {
        navigate("/order-confirmation", {
          state: { paymentMethod: "cod" },
        });
      }
    }
  };

  const removeCartItem = (title) => {
    removeFromCart(title);
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
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>LAST NAME *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label>ADDRESS *</label>
                  <input
                    type="text"
                    value={formData.address1}
                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                    required
                  />
                  {errors.address1 && <span className="error-message">{errors.address1}</span>}
                </div>

                <div className="form-group">
                  <label>APT, SUITE, FLOOR</label>
                  <input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>ZIP CODE *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      required
                    />
                    {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                  </div>

                  <div className="form-group">
                    <label>CITY *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                    {errors.city && <span className="error-message">{errors.city}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label>STATE *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  >
                    <option value="">Select...</option>
                    <option value="pj">Punjab</option>
                    <option value="sir">Sindh</option>
                    <option value='kpk'>KPK</option>
                    <option value='Bal'>Balochistan</option>
                    <option value='GB'>Gilgit Baltistan</option>
                  </select>
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label>PHONE *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <label>EMAIL *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
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
                          onChange={(e) => setFormData({ ...formData, billingFirstName: e.target.value })}
                          required
                        />
                        {errors.billingFirstName && <span className="error-message">{errors.billingFirstName}</span>}
                      </div>

                      <div className="form-group">
                        <label>LAST NAME *</label>
                        <input
                          type="text"
                          value={formData.billingLastName}
                          onChange={(e) => setFormData({ ...formData, billingLastName: e.target.value })}
                          required
                        />
                        {errors.billingLastName && <span className="error-message">{errors.billingLastName}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>ADDRESS *</label>
                      <input
                        type="text"
                        value={formData.billingAddress1}
                        onChange={(e) => setFormData({ ...formData, billingAddress1: e.target.value })}
                        required
                      />
                      {errors.billingAddress1 && <span className="error-message">{errors.billingAddress1}</span>}
                    </div>

                    <div className="form-group">
                      <label>APT, SUITE, FLOOR</label>
                      <input
                        type="text"
                        value={formData.billingAddress2}
                        onChange={(e) => setFormData({ ...formData, billingAddress2: e.target.value })}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>ZIP CODE *</label>
                        <input
                          type="text"
                          value={formData.billingZipCode}
                          onChange={(e) => setFormData({ ...formData, billingZipCode: e.target.value })}
                          required
                        />
                        {errors.billingZipCode && <span className="error-message">{errors.billingZipCode}</span>}
                      </div>

                      <div className="form-group">
                        <label>CITY *</label>
                        <input
                          type="text"
                          value={formData.billingCity}
                          onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                          required
                        />
                        {errors.billingCity && <span className="error-message">{errors.billingCity}</span>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>STATE *</label>
                      <select
                        value={formData.billingState}
                        onChange={(e) => setFormData({ ...formData, billingState: e.target.value })}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="pj">Punjab</option>
                        <option value="sir">Sindh</option>
                        <option value='kpk'>KPK</option>
                        <option value='Bal'>Balochistan</option>
                        <option value='GB'>Gilgit Baltistan</option>
                      </select>
                      {errors.billingState && <span className="error-message">{errors.billingState}</span>}
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
                      required
                    />
                    <label htmlFor="cod">
                      <span className="payment-label">Cash on Delivery</span>
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="payFast"
                      name="paymentMethod"
                      value="payFast"
                      checked={paymentMethod === "payFast"}
                      onChange={() => setPaymentMethod("payFast")}
                      required
                    />
                    <label htmlFor="payFast">
                      <span className="payment-label">PayFast</span>
                    </label>
                  </div>
                </div>
                {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}

                <div className="form-actions">
                  <button
                    className="place-order-button"
                    onClick={handlePlaceOrder}
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
                <span>Rs. {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping</span>
                <span>Rs. {deliveryFee.toFixed(2)}</span>
              </div>

              <div className="divider"></div>
              <div className="price-row total">
                <span>Total</span>
                <span>Rs. {total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="cart-items">
            <h2>Cart ({cartItems.length} items)</h2>
            
            {cartItems.map((item) => (
              <div className="cart-item" key={item.title}>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-item-details">
                  <h3>{item.title}</h3>
                  <p>Rs. {item.price} × {item.quantity}</p>
                  <p>Rs. {(parseFloat(item.price.replace('Rs.', '')) * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeCartItem(item.title)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;