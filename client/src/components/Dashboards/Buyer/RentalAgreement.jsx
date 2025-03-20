import React, { useState } from "react";
import "./RentalAgreement.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BuyerDashboard from "./BuyerDashboard";

const RentalAgreement = () => {
  const [selectedRental, setSelectedRental] = useState(null);

  const rentals = [
    { id: 1, item: "Scanner", rentedOn: "2025-03-10", returned: false },
    { id: 2, item: "Laptop", rentedOn: "2025-02-15", returned: true },
    { id: 3, item: "Projector", rentedOn: "2025-01-20", returned: false },
  ];

  return (
    <div className="rental-container">
        <BuyerDashboard />
      <div className="rental-items">
        <h2> Your Rentals</h2>
        <div className="rental-list">
          {rentals.map((rental) => (
            <div
              key={rental.id}
              className={`rental-card ${selectedRental?.id === rental.id ? "selected" : ""}`}
              onClick={() => setSelectedRental(rental)}
            >
              <div className="rental-header">
                <h3>{rental.item}</h3>
                {rental.returned ? (
                  <FaCheckCircle className="status-icon returned" />
                ) : (
                  <FaTimesCircle className="status-icon pending" />
                )}
              </div>
              <p><strong>Rented On:</strong> {rental.rentedOn}</p>
              <span className={`status-badge ${rental.returned ? "returned" : "pending"}`}>
                {rental.returned ? "Returned" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rental-details">
        <h2> Rental Policy</h2>
        <p>Late returns charges set by seller. Damages will be assessed, and charges may apply.</p>
        {selectedRental && (
          <div className="rental-info">
            <h3> Rental Details</h3>
            <p><strong>Item:</strong> {selectedRental.item}</p>
            <p><strong>Rented On:</strong> {selectedRental.rentedOn}</p>
            <p><strong>Status:</strong> {selectedRental.returned ? "Returned" : "Pending"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalAgreement;




