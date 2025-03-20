import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyerDashboard.css"


function BuyerDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="buyer-dashboard-body">
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className={`sideBar ${isOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => navigate("/orderHistory")}>Order History</li>
                    <li onClick={() => navigate("/rentalAgreements")}>Rental Agreements</li>
                </ul>
            </div>
        </div>
    );
}

export default BuyerDashboard;