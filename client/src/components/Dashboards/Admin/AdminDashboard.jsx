import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"


function AdminDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="admin-dashboard-body">
            <button className="hamburger" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className={`sideBar ${isOpen ? "open" : ""}`}>
                <ul>
                    <li onClick={() => navigate("/regBuyers")}>Registered Buyers</li>
                    <li onClick={() => navigate("/regSellers")}>Registered Sellers</li>
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;