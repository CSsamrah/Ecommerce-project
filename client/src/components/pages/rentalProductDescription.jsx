import React, { useState } from "react";
import { IonIcon } from '@ionic/react';
import { calendarOutline } from 'ionicons/icons';
import "./productDescription.css";

const RentalProductDetail = ({ product }) => {
  const [rentalDates, setRentalDates] = useState({
    startDate: '',
    endDate: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setRentalDates(prev => ({
      ...prev,
      [name]: value
    }));

    // Calculate price when both dates are selected
    if (name === 'endDate' && rentalDates.startDate) {
      calculateTotalPrice(rentalDates.startDate, value);
    }
  };

  const calculateTotalPrice = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const calculatedPrice = diffDays * product.dailyPrice;
    setTotalPrice(calculatedPrice);
  };

  return (
    <div className="rental-detail-container">
      {/* Product image and basic info */}
      <div className="product-header">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-basic-info">
          <h2>{product.title}</h2>
          <p className="daily-rate">Rs. {product.dailyPrice} / day</p>
          <div className="quick-specs">
            {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">{key}:</span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rental period selection */}
      <div className="rental-period-section">
        <h3>
          <IonIcon icon={calendarOutline} className="calendar-icon" />
          Select Rental Period
        </h3>
        
        <div className="date-range-selector">
          <div className="date-input">
            <label>From</label>
            <input
              type="date"
              name="startDate"
              value={rentalDates.startDate}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="date-separator">
            <div className="line"></div>
            <div className="days-count">
              {rentalDates.startDate && rentalDates.endDate ? (
                <>
                  <span className="number">
                    {Math.ceil((new Date(rentalDates.endDate) - new Date(rentalDates.startDate)) / (1000 * 60 * 60 * 24))}
                  </span>
                  <span className="text">days</span>
                </>
              ) : (
                <span className="text">Select dates</span>
              )}
            </div>
          </div>
          
          <div className="date-input">
            <label>To</label>
            <input
              type="date"
              name="endDate"
              value={rentalDates.endDate}
              onChange={handleDateChange}
              min={rentalDates.startDate || new Date().toISOString().split('T')[0]}
              disabled={!rentalDates.startDate}
            />
          </div>
        </div>

        {/* Price summary */}
        {totalPrice > 0 && (
          <div className="price-summary">
            <div className="price-line">
              <span>Rs. {product.dailyPrice} × {Math.ceil((new Date(rentalDates.endDate) - new Date(rentalDates.startDate)) / (1000 * 60 * 60 * 24))} days</span>
              <span>Rs. {totalPrice}</span>
            </div>
            <div className="price-line deposit">
              <span>Refundable deposit</span>
              <span>Rs. {product.deposit}</span>
            </div>
            <div className="price-line total">
              <span>Total amount</span>
              <span>Rs. {totalPrice + parseInt(product.deposit)}</span>
            </div>
          </div>
        )}

        <button 
          className="rent-now-btn"
          disabled={!rentalDates.startDate || !rentalDates.endDate}
        >
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default RentalProductDetail;