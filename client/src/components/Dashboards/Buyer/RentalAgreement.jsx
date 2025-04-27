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
    <div className="rent-body">
      <br></br>
      <br></br>
    <div className="rental-container">
      <br></br>
      <br></br>
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
    </div>
  );
};

export default RentalAgreement;




// import React, { useState, useEffect } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import BuyerDashboard from "./BuyerDashboard";
// import "./RentalAgreement.css";
// import axios from "axios";

// const RentalAgreement = () => {
//   const [selectedRental, setSelectedRental] = useState(null);
//   const [rentals, setRentals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch user's rentals from backend
//   useEffect(() => {
//     const fetchRentals = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/rental/getUserRentals", {
//           withCredentials: true
//         });

//         // Transform backend data to match frontend format
//         const formattedRentals = response.data.rentalRecords.map(rental => ({
//           id: rental.rental_id,
//           item: rental.productName,
//           rentedOn: new Date(rental.rented_at).toLocaleDateString(),
//           dueDate: rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "N/A",
//           returned: rental.rental_status === "Returned",
//           status: rental.rental_status,
//           productId: rental.product_id,
//           rentalDuration: rental.rental_duration,
//           rentalPrice: rental.rental_price
//         }));

//         setRentals(formattedRentals);
//       } catch (err) {
//         console.error("Error fetching rentals:", err);
//         setError(err.response?.data?.message || "Failed to load rentals");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRentals();
//   }, []);

//   // Handle returning a rental item
//   const handleReturnItem = async (rentalId) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/rental/returnRental/${rentalId}`,
//         {},
//         { withCredentials: true }
//       );
      
//       // Update local state
//       setRentals(prev => prev.map(rental => 
//         rental.id === rentalId 
//           ? { ...rental, returned: true, status: 'Returned' } 
//           : rental
//       ));
      
//       // Update selected rental if it's the one being returned
//       if (selectedRental?.id === rentalId) {
//         setSelectedRental(prev => ({ ...prev, returned: true, status: 'Returned' }));
//       }
      
//       alert("Item successfully marked as returned!");
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert(err.response?.data?.message || "Failed to process return");
//     }
//   };

//   // View rental details
//   const viewRentalDetails = async (rentalId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/rental/getRental/${rentalId}`,
//         { withCredentials: true }
//       );
      
//       const rental = response.data.rentalRecord;
//       setSelectedRental({
//         id: rental.rental_id,
//         item: rental.productName,
//         rentedOn: new Date(rental.rented_at).toLocaleDateString(),
//         dueDate: rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "N/A",
//         returned: rental.rental_status === "Returned",
//         status: rental.rental_status,
//         productId: rental.product_id,
//         rentalDuration: rental.rental_duration,
//         rentalPrice: rental.rental_price
//       });
//     } catch (err) {
//       console.error("Error fetching rental details:", err);
//       alert(err.response?.data?.message || "Failed to load rental details");
//     }
//   };

//   return (
//     <div className="rental-container">
//       <BuyerDashboard />
//       <div className="rental-items">
//         <h2>Your Rentals</h2>
        
//         {loading ? (
//           <p>Loading your rentals...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : rentals.length === 0 ? (
//           <p>You don't have any active rentals.</p>
//         ) : (
//           <div className="rental-list">
//             {rentals.map((rental) => (
//               <div
//                 key={rental.id}
//                 className={`rental-card ${selectedRental?.id === rental.id ? "selected" : ""}`}
//                 onClick={() => viewRentalDetails(rental.id)}
//               >
//                 <div className="rental-header">
//                   <h3>{rental.item}</h3>
//                   {rental.returned ? (
//                     <FaCheckCircle className="status-icon returned" />
//                   ) : (
//                     <FaTimesCircle className="status-icon pending" />
//                   )}
//                 </div>
//                 <p><strong>Rented On:</strong> {rental.rentedOn}</p>
//                 {!rental.returned && rental.dueDate && (
//                   <p><strong>Due Date:</strong> {rental.dueDate}</p>
//                 )}
//                 <span className={`status-badge ${rental.returned ? "returned" : "pending"}`}>
//                   {rental.returned ? "Returned" : rental.status}
//                 </span>
//                 {!rental.returned && (
//                   <button 
//                     className="return-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (window.confirm("Are you sure you want to mark this item as returned?")) {
//                         handleReturnItem(rental.id);
//                       }
//                     }}
//                   >
//                     Mark as Returned
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="rental-details">
//         <h2>Rental Policy</h2>
//         <p>Late returns charges set by seller. Damages will be assessed, and charges may apply.</p>
        
//         {selectedRental && (
//           <div className="rental-info">
//             <h3>Rental Details</h3>
//             <p><strong>Item:</strong> {selectedRental.item}</p>
//             <p><strong>Rented On:</strong> {selectedRental.rentedOn}</p>
//             {selectedRental.dueDate && !selectedRental.returned && (
//               <p><strong>Due Date:</strong> {selectedRental.dueDate}</p>
//             )}
//             <p><strong>Status:</strong> 
//               <span className={`status-text ${selectedRental.returned ? "returned" : "pending"}`}>
//                 {selectedRental.returned ? "Returned" : selectedRental.status}
//               </span>
//             </p>
//             <p><strong>Duration:</strong> {selectedRental.rentalDuration} days</p>
//             <p><strong>Total Price:</strong> ${selectedRental.rentalPrice?.toFixed(2) || "N/A"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RentalAgreement;

// import React, { useState, useEffect } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import BuyerDashboard from "./BuyerDashboard";
// import "./RentalAgreement.css";
// import axios from "axios";

// const RentalAgreement = () => {
//   const [selectedRental, setSelectedRental] = useState(null);
//   const [rentals, setRentals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRentals = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/rental/getUserRentals", {
//           withCredentials: true
//         });

//         const formattedRentals = response.data.rentalRecords.map(rental => ({
//           id: rental.rental_id,
//           item: rental.productName,
//           rentedOn: new Date(rental.rented_at).toLocaleDateString(),
//           dueDate: rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "N/A",
//           returned: rental.rental_status === "Returned",
//           status: rental.rental_status,
//           productId: rental.product_id,
//           rentalDuration: rental.rental_duration,
//           rentalPrice: rental.rental_price
//         }));

//         setRentals(formattedRentals);
//       } catch (err) {
//         console.error("Error fetching rentals:", err);
//         setError(err.response?.data?.message || "Failed to load rentals");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRentals();
//   }, []);

//   const handleReturnItem = async (rentalId) => {
//     try {
//       await axios.post(
//         `http://localhost:5000/api/rental/returnRental/${rentalId}`,
//         {},
//         { withCredentials: true }
//       );

//       setRentals(prev => prev.map(rental => 
//         rental.id === rentalId 
//           ? { ...rental, returned: true, status: 'Returned' } 
//           : rental
//       ));

//       if (selectedRental?.id === rentalId) {
//         setSelectedRental(prev => ({ ...prev, returned: true, status: 'Returned' }));
//       }
      
//       alert("Item successfully marked as returned!");
//     } catch (err) {
//       console.error("Error returning item:", err);
//       alert(err.response?.data?.message || "Failed to process return");
//     }
//   };

//   const viewRentalDetails = async (rentalId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/rental/getRental/${rentalId}`,
//         { withCredentials: true }
//       );
      
//       const rental = response.data.rentalRecord;
//       setSelectedRental({
//         id: rental.rental_id,
//         item: rental.productName,
//         rentedOn: new Date(rental.rented_at).toLocaleDateString(),
//         dueDate: rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "N/A",
//         returned: rental.rental_status === "Returned",
//         status: rental.rental_status,
//         productId: rental.product_id,
//         rentalDuration: rental.rental_duration,
//         rentalPrice: rental.rental_price
//       });
//     } catch (err) {
//       console.error("Error fetching rental details:", err);
//       alert(err.response?.data?.message || "Failed to load rental details");
//     }
//   };

//   return (
//     <div className="rental-container">
//       <BuyerDashboard />
//       <div className="rental-items">
//         <h2>Your Rentals</h2>
        
//         {loading ? (
//           <p>Loading your rentals...</p>
//         ) : error ? (
//           <p className="error-message">{error}</p>
//         ) : rentals.length === 0 ? (
//           <p>You don't have any active rentals.</p>
//         ) : (
//           <div className="rental-list">
//             {rentals.map((rental) => (
//               <div
//                 key={rental.id}
//                 className={`rental-card ${selectedRental?.id === rental.id ? "selected" : ""}`}
//                 onClick={() => viewRentalDetails(rental.id)}
//               >
//                 <div className="rental-header">
//                   <h3>{rental.item}</h3>
//                   {rental.returned ? (
//                     <FaCheckCircle className="status-icon returned" />
//                   ) : (
//                     <FaTimesCircle className="status-icon pending" />
//                   )}
//                 </div>
//                 <p><strong>Rented On:</strong> {rental.rentedOn}</p>
//                 {!rental.returned && rental.dueDate && (
//                   <p><strong>Due Date:</strong> {rental.dueDate}</p>
//                 )}
//                 <span className={`status-badge ${rental.returned ? "returned" : "pending"}`}>
//                   {rental.returned ? "Returned" : rental.status}
//                 </span>
//                 {!rental.returned && (
//                   <button 
//                     className="return-btn"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (window.confirm("Are you sure you want to mark this item as returned?")) {
//                         handleReturnItem(rental.id);
//                       }
//                     }}
//                   >
//                     Mark as Returned
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="rental-details">
//         <h2>Rental Policy</h2>
//         <p>Late returns charges set by seller. Damages will be assessed, and charges may apply.</p>
        
//         {selectedRental && (
//           <div className="rental-info">
//             <h3>Rental Details</h3>
//             <p><strong>Item:</strong> {selectedRental.item}</p>
//             <p><strong>Rented On:</strong> {selectedRental.rentedOn}</p>
//             {selectedRental.dueDate && !selectedRental.returned && (
//               <p><strong>Due Date:</strong> {selectedRental.dueDate}</p>
//             )}
//             <p><strong>Status:</strong> 
//               <span className={`status-text ${selectedRental.returned ? "returned" : "pending"}`}>
//                 {selectedRental.returned ? "Returned" : selectedRental.status}
//               </span>
//             </p>
//             <p><strong>Duration:</strong> {selectedRental.rentalDuration} days</p>
//             <p><strong>Total Price:</strong> ${selectedRental.rentalPrice?.toFixed(2) || "N/A"}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RentalAgreement;