
import { useState } from "react";
import BuyerDashboard from "./BuyerDashboard";
import "./OrderHistory.css"; 

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
            status: "Shipped",
            items: [
                { name: "Monitor", quantity: 1, price: 75 }
            ]
        },
    ]);

    const cancelOrder = (orderId) => {
        setOrders(orders.map(order =>
            order.id === orderId && order.status === "Processing"
                ? { ...order, status: "Cancelled" }
                : order
        ));
    };

    return (
        <div className="order-history-container">
            <BuyerDashboard />
            <h2 className="order-history-title">Order History</h2>
            <input type="text" className="search-bar"  placeholder="Search orders..." onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
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
                                {order.status === "Processing" && (
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

// import { useState } from "react";
// import BuyerDashboard from "./BuyerDashboard";
// import "./OrderHistory.css";

// function OrderHistory() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [orders, setOrders] = useState([
//         {
//             id: "1001",
//             date: "2023-05-15",
//             total: 125.99,
//             status: "Processing",
//             items: [
//                 { name: "Wireless Headphones", quantity: 1, price: 99.99 },
//                 { name: "Screen Protector", quantity: 2, price: 13.00 }
//             ]
//         },
//         {
//             id: "1002",
//             date: "2023-04-22",
//             total: 59.97,
//             status: "Completed",
//             items: [
//                 { name: "USB-C Cable", quantity: 3, price: 19.99 }
//             ]
//         },
//         {
//             id: "1003",
//             date: "2023-03-10",
//             total: 249.50,
//             status: "Cancelled",
//             items: [
//                 { name: "Smart Watch", quantity: 1, price: 199.99 },
//                 { name: "Charging Dock", quantity: 1, price: 49.51 }
//             ]
//         }
//     ]);
//     const [orders, setOrders] = useState([
//         {
//             id: "1001",
//             date: "2023-05-15",
//             total: 125.99,
//             status: "Processing",
//             items: [
//                 { name: "Wireless Headphones", quantity: 1, price: 99.99 },
//                 { name: "Screen Protector", quantity: 2, price: 13.00 }
//             ]
//         },
//         {
//             id: "1002",
//             date: "2023-04-22",
//             total: 59.97,
//             status: "Completed",
//             items: [
//                 { name: "USB-C Cable", quantity: 3, price: 19.99 }
//             ]
//         },
//         {
//             id: "1003",
//             date: "2023-03-10",
//             total: 249.50,
//             status: "Cancelled",
//             items: [
//                 { name: "Smart Watch", quantity: 1, price: 199.99 },
//                 { name: "Charging Dock", quantity: 1, price: 49.51 }
//             ]
//         }
//     ]);

//     const cancelOrder = (orderId) => {
//         setOrders(prevOrders => 
//             prevOrders.map(order =>
//                 order.id === orderId ? { ...order, status: "Cancelled" } : order
//             )
//         );
//         alert(`Order #${orderId} has been cancelled.`);
//     const cancelOrder = (orderId) => {
//         setOrders(prevOrders => 
//             prevOrders.map(order =>
//                 order.id === orderId ? { ...order, status: "Cancelled" } : order
//             )
//         );
//         alert(`Order #${orderId} has been cancelled.`);
//     };

//     const filteredOrders = orders.filter(order =>
//         order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.items.some(item => 
//             item.name.toLowerCase().includes(searchTerm.toLowerCase())
//         order.id.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.items.some(item => 
//             item.name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//     );

//     return (
//         <div className="order-body">
//             <br></br>
//             <br></br>
//             <div className="order-history-container">
//                 <br></br>
//                 <BuyerDashboard />
//                 <h2 className="order-history-title">Order History</h2>
//                 <input 
//                     type="text" 
//                     className="search-bar" 
//                     placeholder="Search orders..." 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                 />
                
//                 {filteredOrders.length === 0 ? (
//                     <div className="empty-order-list">
//                         <table className="order-items-table">
//                             <thead>
//                                 <tr>
//                                     <th>Item</th>
//                                     <th>Quantity</th>
//                                     <th>Price</th>
//                                 </tr>
//                             </thead>
//                         </table>
//                         <p className="no-orders-message">
//                             {searchTerm ? 
//                                 "No orders match your search." : 
//                                 "You don't have any orders yet."}
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="order-list">
//                         {filteredOrders.map((order) => (
//                             <div key={order.id} className="order-card">
//                                 <div className="order-header">
//                                     <span className="order-date">{order.date}</span>
//                                     <span className={`order-status ${order.status.toLowerCase()}`}>
//                                         {order.status}
//                                     </span>
//                                 </div>
//                                 <h3 className="order-id">Order #{order.id}</h3>
//             <div className="order-history-container">
//                 <br></br>
//                 <BuyerDashboard />
//                 <h2 className="order-history-title">Order History</h2>
//                 <input 
//                     type="text" 
//                     className="search-bar" 
//                     placeholder="Search orders..." 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                 />
                
//                 {filteredOrders.length === 0 ? (
//                     <div className="empty-order-list">
//                         <table className="order-items-table">
//                             <thead>
//                                 <tr>
//                                     <th>Item</th>
//                                     <th>Quantity</th>
//                                     <th>Price</th>
//                                 </tr>
//                             </thead>
//                         </table>
//                         <p className="no-orders-message">
//                             {searchTerm ? 
//                                 "No orders match your search." : 
//                                 "You don't have any orders yet."}
//                         </p>
//                     </div>
//                 ) : (
//                     <div className="order-list">
//                         {filteredOrders.map((order) => (
//                             <div key={order.id} className="order-card">
//                                 <div className="order-header">
//                                     <span className="order-date">{order.date}</span>
//                                     <span className={`order-status ${order.status.toLowerCase()}`}>
//                                         {order.status}
//                                     </span>
//                                 </div>
//                                 <h3 className="order-id">Order #{order.id}</h3>

//                                 <table className="order-items-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Item</th>
//                                             <th>Quantity</th>
//                                             <th>Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {order.items.map((item, index) => (
//                                             <tr key={index}>
//                                                 <td>{item.name}</td>
//                                                 <td>{item.quantity} pcs</td>
//                                                 <td>${item.price.toFixed(2)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 <div className="order-footer">
//                                     <span className="order-total">
//                                         Total: ${order.total.toFixed(2)}
//                                     </span>
//                                     {order.status === "Processing" && (
//                                         <button 
//                                             className="cancel-btn" 
//                                             onClick={() => cancelOrder(order.id)}
//                                         >
//                                             Cancel Order
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//                                 <table className="order-items-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Item</th>
//                                             <th>Quantity</th>
//                                             <th>Price</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {order.items.map((item, index) => (
//                                             <tr key={index}>
//                                                 <td>{item.name}</td>
//                                                 <td>{item.quantity} pcs</td>
//                                                 <td>${item.price.toFixed(2)}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                                 <div className="order-footer">
//                                     <span className="order-total">
//                                         Total: ${order.total.toFixed(2)}
//                                     </span>
//                                     {order.status === "Processing" && (
//                                         <button 
//                                             className="cancel-btn" 
//                                             onClick={() => cancelOrder(order.id)}
//                                         >
//                                             Cancel Order
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default OrderHistory;