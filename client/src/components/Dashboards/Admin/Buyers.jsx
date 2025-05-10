import { useState, useEffect } from "react";
import "./Buyers.css";
import AdminDashboard from "./AdminDashboard.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Navbar/navbar1'


function Buyers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [buyers, setBuyers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBuyers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get("http://localhost:3000/api/users/buyers", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                
                if (response.data && response.data.users) {
                    setBuyers(response.data.users);
                } else {
                    throw new Error("No buyers data received");
                }
            } catch (err) {
                console.error("Error fetching buyers:", err);
                setError(err.response?.data?.message || err.message || "Failed to load buyers");
                
                // Redirect to login if unauthorized
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBuyers();
    }, [navigate]);

    const filteredBuyers = buyers.filter(buyer => 
        buyer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        buyer.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="buyer-container">
            <Navbar />
        <div className="buyer-body">
         
            <AdminDashboard />
        <div className="buyers-container">
            <br></br>
            
            <h2 className="buyers-title">Registered Buyers</h2>

            <div className="table-controls">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search buyers..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>

            {loading ? (
                <div className="loading">Loading buyers...</div>
            ) : error ? (
                <div className="error-message">
                    Error: {error}
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : filteredBuyers.length === 0 ? (
                <div className="no-results">No buyers found</div>
            ) : (
                <table className="buyers-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBuyers.map((buyer, index) => (
                            <tr key={buyer.user_id || index}>
                                <td>{index + 1}</td>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td>{buyer.phoneNo || 'N/A'}</td>
                                <td>{buyer.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        </div>
        </div>
    );
}

export default Buyers;