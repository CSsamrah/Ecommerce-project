import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "./AdminDashboard.css";

function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // Track window resize and update state
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 768) {
                setIsSidebarOpen(true);
            } else {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initialize on mount
        
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isActive = (path) => {
        return location.pathname === path;
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button - Fixed position outside the sidebar */}
            <button 
                className="sidebar-toggle-btn"
                onClick={toggleSidebar}
                aria-label={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
            >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="admin-logo">
                    <br></br>
                    {/* <h3>TechWare</h3> */}
                </div>
                <ul className="admin-menu">
                    <li 
                        className={isActive("/adminAnalytics") ? "active" : ""} 
                        onClick={() => {
                            navigate("/adminAnalytics");
                            if (windowWidth <= 768) setIsSidebarOpen(false);
                        }}
                    >
                        Analytics and Insights
                    </li>
                    <li 
                        className={isActive("/regBuyers") ? "active" : ""} 
                        onClick={() => {
                            navigate("/regBuyers");
                            if (windowWidth <= 768) setIsSidebarOpen(false);
                        }}
                    >
                        Registered Buyers
                    </li>
                    <li 
                        className={isActive("/regSellers") ? "active" : ""} 
                        onClick={() => {
                            navigate("/regSellers");
                            if (windowWidth <= 768) setIsSidebarOpen(false);
                        }}
                    >
                        Registered Sellers
                    </li>
                </ul>
                
                {windowWidth <= 768 && (
                    <div className="sidebar-overlay" onClick={toggleSidebar} />
                )}
            </div>
        </>
    );
}

export default AdminDashboard;