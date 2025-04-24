import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/navbar1.jsx";
import "./AdminDashboard.css";
import AdminDashboard from "./AdminDashboard.jsx";

function AdminOverview() {
    

    return (
        <div className="admin-dashboard-root-container">
            <Navbar />
            <br></br>
            <br></br>
            <AdminDashboard />

            <h1>Welcome to Admin Dashboard!</h1>
        </div>
    );
}

export default AdminOverview;