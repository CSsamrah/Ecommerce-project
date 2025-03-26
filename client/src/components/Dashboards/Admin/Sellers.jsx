import { useState } from "react";
import "./Buyers.css"; 
import "./AdminDashboard.jsx"
import AdminDashboard from "./AdminDashboard.jsx";

function Sellers() {
    const [searchTerm, setSearchTerm] = useState("");
    const [buyers, setBuyers] = useState([
        {
            name: "Areesha",
            email: "areesha@gmail.com",
            phone: "021-123456",
            role: "Seller",
            address: "ABC road",

        },
        {
            name: "Adeena",
            email: "adeena@gmail.com",
            phone: "021-789101",
            role: "Seller",
            address: "DEF road",

        },
    ]);

    const filteredBuyers = buyers.filter((buyer) =>
        buyer.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="buyers-container">
            <AdminDashboard />
            <h2 className="buyers-title">Registered Sellers</h2>

            <div className="table-controls">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search buyers..."
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />

            </div>

            <table className="buyers-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBuyers.map((buyer, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            <td>{buyer.phone}</td>
                            <td>{buyer.role}</td>
                            <td>{buyer.address}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Sellers;