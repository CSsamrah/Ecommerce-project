import { useState } from "react";
//import "./OrderHistory.css";
import BuyerDashboard from "./BuyerDashboard";

function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([
        {
            id: "ORD12345",date: "2024-03-15", type: ["Second-hand", "Rental"],total: 120.50,status: "Delivered",items: ["Laptop", "Mouse"]
        },
        {
            id: "ORD67890",
            date: "2024-03-12",type: ["Second-hand", "Rental"],
            total: 45.99,
            status: "Processing",
            items: ["Bluetooth Headphones"]
        },
        {
            id: "ORD54321",
            date: "2024-02-20", type: ["Second-hand", "Rental"],
            total: 75.00,
            status: "Pending",
            items: ["Smart Watch"]
        },
        
    ]);

    // Function to cancel an order
    const cancelOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId && order.status === "Pending"
                ? { ...order, status: "Cancelled" }
                : order
        ));
    };

    return (
        <div className="order-history-container">
            <BuyerDashboard/>
            <h2>Order History</h2>
            
            {/* Search Bar */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search orders..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />

            {/* Order Table */}
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders
                        .filter(order => 
                            order.id.toLowerCase().includes(searchTerm) || 
                            order.items.some(item => item.toLowerCase().includes(searchTerm))
                        )
                        .map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.type.join(", ")}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                                <td>{order.items.join(", ")}</td>
                                <td>
                                    {/* Show Cancel button only if order is Pending */}
                                    {order.status === "Pending" && (
                                        <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>Cancel</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderHistory;

