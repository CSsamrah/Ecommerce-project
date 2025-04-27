// import { useState } from "react";
// import "./sellers.css"; 
// import "./AdminDashboard.jsx"
// import AdminDashboard from "./AdminDashboard.jsx";

// function Sellers() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [sellers, setsellers] = useState([
//         {
//             name: "Areesha",
//             email: "areesha@gmail.com",
//             phone: "021-123456",
//             role: "Seller",
//             address: "ABC road",

//         },
//         {
//             name: "Adeena",
//             email: "adeena@gmail.com",
//             phone: "021-789101",
//             role: "Seller",
//             address: "DEF road",

//         },
//     ]);

//     const filteredsellers = sellers.filter((seller) =>
//         seller.name.toLowerCase().includes(searchTerm)
//     );

//     return (
//         <div className="sellers-container">
//             <AdminDashboard />
//             <h2 className="sellers-title">Registered Sellers</h2>

//             <div className="table-controls">
//                 <input
//                     type="text"
//                     className="search-bar"
//                     placeholder="Search sellers..."
//                     onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//                 />

//             </div>

//             <table className="sellers-table">
//                 <thead>
//                     <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Phone</th>
//                         <th>Role</th>
//                         <th>Address</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {filteredsellers.map((seller, index) => (
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{seller.name}</td>
//                             <td>{seller.email}</td>
//                             <td>{seller.phone}</td>
//                             <td>{seller.role}</td>
//                             <td>{seller.address}</td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default Sellers;


import { useState, useEffect } from "react";
import "./Buyers.css";
import AdminDashboard from "./AdminDashboard.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Sellers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSellers = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get("http://localhost:3000/api/users/sellers", {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                
                if (response.data && response.data.users) {
                    setSellers(response.data.users);
                } else {
                    throw new Error("No sellers data received");
                }
            } catch (err) {
                console.error("Error fetching sellers:", err);
                setError(err.response?.data?.message || err.message || "Failed to load sellers");
                
                // Redirect to login if unauthorized
                if (err.response?.status === 401) {
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSellers();
    }, [navigate]);

    const filteredSellers = sellers.filter(seller => 
        seller.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seller.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        
        <div className="buyers-container">
            <br></br>
            <br></br>
            <AdminDashboard />
            <h2 className="buyers-title">Registered sellers</h2>

            <div className="table-controls">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search sellers..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />
            </div>

            {loading ? (
                <div className="loading">Loading sellers...</div>
            ) : error ? (
                <div className="error-message">
                    Error: {error}
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            ) : filteredSellers.length === 0 ? (
                <div className="no-results">No sellers found</div>
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
                        {filteredSellers.map((seller, index) => (
                            <tr key={seller.user_id || index}>
                                <td>{index + 1}</td>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>{seller.phoneNo || 'N/A'}</td>
                                <td>{seller.address || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Sellers;