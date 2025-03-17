import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Seller_dashboard.css";

function Seller_dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="seller-dashboard-body">
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className={`sideBar ${isOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => navigate("/inventory")}>Inventory Management</li>
                    <li onClick={() => navigate("/order")}>Order Management</li>
                    <li>Rental Management</li>
                    <li onClick={() => navigate("/analytics")}>Analytics & Insights</li>
                </ul>
            </div>
        </div>
    );
}

export default Seller_dashboard;

