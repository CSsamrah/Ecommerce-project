// import { useState } from "react";
// import BuyerDashboard from "./BuyerDashboard";
// import "./OrderHistory.css"; 

// function OrderHistory() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [orders, setOrders] = useState([
//         {
//             id: "ORD12345",
//             date: "2024-03-15",
//             type: ["Second-hand", "Rental"],
//             total: 120,
//             status: "Delivered",
//             items: [
//                 { name: "Laptop", quantity: 1, price: 100 },
//                 { name: "Mouse", quantity: 1, price: 20 }
//             ]
//         },
//         {
//             id: "ORD67890",
//             date: "2024-03-12",
//             type: ["Product", "Rental"],
//             total: 45,
//             status: "Processing",
//             items: [
//                 { name: "Mouse", quantity: 1, price: 45 }
//             ]
//         },
//         {
//             id: "ORD101112",
//             date: "2024-02-20",
//             type: ["Rental"],
//             total: 75,
//             status: "Shipped",
//             items: [
//                 { name: "Monitor", quantity: 1, price: 75 }
//             ]
//         },
//     ]);

//     const cancelOrder = (orderId) => {
//         setOrders(orders.map(order =>
//             order.id === orderId && order.status === "Processing"
//                 ? { ...order, status: "Cancelled" }
//                 : order
//         ));
//     };

//     return (
//         <div className="order-history-container">
//             <BuyerDashboard />
//             <h2 className="order-history-title">Order History</h2>
//             <input type="text" className="search-bar"  placeholder="Search orders..." onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
//             <div className="order-list">
//                 {orders
//                     .filter(order =>
//                         order.id.toLowerCase().includes(searchTerm) ||
//                         order.items.some(item => item.name.toLowerCase().includes(searchTerm))
//                     )
//                     .map((order) => (
//                         <div key={order.id} className="order-card">
//                             <div className="order-header">
//                                 <span className="order-date">{order.date}</span>
//                                 <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
//                             </div>
//                             <h3 className="order-id">Order #{order.id}</h3>

//                             <table className="order-items-table">
//                                 <tbody>
//                                     {order.items.map((item, index) => (
//                                         <tr key={index}>
//                                             <td>{item.name}</td>
//                                             <td>{item.quantity} pcs</td>
//                                             <td>${item.price.toFixed(2)}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                             <div className="order-footer">
//                                 <span className="order-total">Total: ${order.total.toFixed(2)}</span>
//                                 {order.status === "Processing" && (
//                                     <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// }

// export default OrderHistory;

import { useState, useEffect } from "react";
import axios from "axios";
import BuyerDashboard from "./BuyerDashboard";

// import "./OrderHistory.css"; 

// function OrderHistory() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [orders, setOrders] = useState([
//         {
//             id: "ORD12345",
//             date: "2024-03-15",
//             type: ["Second-hand", "Rental"],
//             total: 120,
//             status: "Delivered",
//             items: [
//                 { name: "Laptop", quantity: 1, price: 100 },
//                 { name: "Mouse", quantity: 1, price: 20 }
//             ]
//         },
//         {
//             id: "ORD67890",
//             date: "2024-03-12",
//             type: ["Product", "Rental"],
//             total: 45,
//             status: "Processing",
//             items: [
//                 { name: "Mouse", quantity: 1, price: 45 }
//             ]
//         },
//         {
//             id: "ORD101112",
//             date: "2024-02-20",
//             type: ["Rental"],
//             total: 75,
//             status: "Shipped",
//             items: [
//                 { name: "Monitor", quantity: 1, price: 75 }
//             ]
//         },
//     ]);

//     const cancelOrder = (orderId) => {
//         setOrders(orders.map(order =>
//             order.id === orderId && order.status === "Processing"
//                 ? { ...order, status: "Cancelled" }
//                 : order
//         ));

import "./OrderHistory.css";

function OrderHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get("http://localhost:5000/order/getUserOrders", {
                    withCredentials: true
                });
                
                // Handle empty orders case
                if (response.data.orders && response.data.orders.length === 0) {
                    setOrders([]);
                    setLoading(false);
                    return;
                }

                const formattedOrders = response.data.orders.map(order => ({
                    id: order.order_id,
                    date: new Date(order.created_at).toISOString().split('T')[0],
                    total: order.total_price,
                    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
                    items: [] 
                }));
                
                setOrders(formattedOrders);

                await Promise.all(formattedOrders.map(async (order) => {
                    const detailsResponse = await axios.get(
                        `http://localhost:5000/order/details/${order.id}`, 
                        { withCredentials: true }
                    );
                    
                    const orderWithItems = {
                        ...order,
                        items: detailsResponse.data.orderItems.map(item => ({
                            name: item.product_name,
                            quantity: item.quantity,
                            price: item.price_per_unit
                        }))
                    };
                    
                    setOrders(prev => prev.map(o => o.id === order.id ? orderWithItems : o));
                }));
                
                setLoading(false);
            } catch (err) {
                console.error("Error details:", {
                    status: err.response?.status,
                    data: err.response?.data
                });
                
                if (err.response?.status === 404) {
                    setOrders([]); 
                } else {
                    setError(err.response?.data?.message || "Failed to load orders");
                }
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        try {
            await axios.post(
                `http://localhost:5000/order/cancel/${orderId}`, 
                {}, 
                { withCredentials: true }
            );

            setOrders(prevOrders => 
                prevOrders.map(order =>
                    order.id === orderId ? { ...order, status: "Cancelled" } : order
                )
            );
        } catch (err) {
            console.error("Error cancelling order:", err);
            alert("Failed to cancel order. " + 
                 (err.response?.data?.message || "Please try again."));
        }
    };

    const filteredOrders = orders.filter(order =>
        order.id?.toString().toLowerCase().includes(searchTerm) ||
        order.items?.some(item => 
            item.name?.toLowerCase().includes(searchTerm)
        )
    );

    return (
        <div className="order-history-container">
            <br></br>
            <BuyerDashboard />
            <h2 className="order-history-title">Order History</h2>

            <input 
                type="text" 
                className="search-bar" 
                placeholder="Search orders..." 
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
            />
            
            {loading ? (
                <div className="loading-message">Loading your orders...</div>
            ) : error ? (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()}>Try Again</button>
                </div>
            ) : filteredOrders.length === 0 ? (
                <p className="no-orders-message">
                    {searchTerm ? 
                        "No orders match your search." : 
                        "You don't have any orders yet."}
                </p>
            ) : (
                <div className="order-list">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <span className="order-date">{order.date}</span>
                                <span className={`order-status ${order.status?.toLowerCase()}`}>
                                    {order.status}
                                </span>
                            </div>
                            <h3 className="order-id">Order #{order.id}</h3>

                            <table className="order-items-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.quantity} pcs</td>
                                            <td>${parseFloat(item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="order-footer">

                                <span className="order-total">
                                    Total: ${parseFloat(order.total).toFixed(2)}
                                </span>
                                {order.status === "Processing" && (
                                    <button 
                                        className="cancel-btn" 
                                        onClick={() => cancelOrder(order.id)}
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrderHistory;