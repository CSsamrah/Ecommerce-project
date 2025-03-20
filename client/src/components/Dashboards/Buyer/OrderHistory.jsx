import { useState } from "react";
import BuyerDashboard from "./BuyerDashboard";
import "./OrderHistory.css"; // Ensure to create this CSS file

function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([
        {
            id: "ORD12345",
            date: "2024-03-15",
            type: ["Second-hand", "Rental"],
            total: 120,
            status: "Delivered",
            items: [
                { name: "Laptop", quantity: 1, price: 100 },
                { name: "Mouse", quantity: 1, price: 20 }
            ]
        },
        {
            id: "ORD67890",
            date: "2024-03-12",
            type: ["Product", "Rental"],
            total: 45,
            status: "Processing",
            items: [
                { name: "Mouse", quantity: 1, price: 45 }
            ]
        },
        {
            id: "ORD101112",
            date: "2024-02-20",
            type: ["Rental"],
            total: 75,
            status: "Pending",
            items: [
                { name: "Monitor", quantity: 1, price: 75 }
            ]
        },
    ]);

    const cancelOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId && order.status === "Pending"
                ? { ...order, status: "Cancelled" }
                : order
        ));
    };

    return (
        <div className="order-history-container">
            <BuyerDashboard />
            <h2 className="order-history-title">Order History</h2>

            {/* Search Bar */}
            <input
                type="text"
                className="search-bar"
                placeholder="Search orders..."
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />

            {/* Order Cards */}
            <div className="order-list">
                {orders
                    .filter(order =>
                        order.id.toLowerCase().includes(searchTerm) ||
                        order.items.some(item => item.name.toLowerCase().includes(searchTerm))
                    )
                    .map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <span className="order-date">{order.date}</span>
                                <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                            </div>
                            <h3 className="order-id">Order #{order.id}</h3>

                            <table className="order-items-table">
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity} pcs</td>
                                            <td>${item.price.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="order-footer">
                                <span className="order-total">Total: ${order.total.toFixed(2)}</span>
                                {order.status === "Pending" && (
                                    <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default OrderHistory;


