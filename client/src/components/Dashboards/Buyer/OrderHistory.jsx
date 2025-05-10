// import { useState, useEffect } from "react";
// import BuyerDashboard from "./BuyerDashboard";
// import { useAuth } from "../../pages/AuthProvider";
// import "./OrderHistory.css";

// function OrderHistory() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cancelling, setCancelling] = useState(null);
//     const { user } = useAuth();

//     useEffect(() => {
//         fetchOrders();
//     }, [user]);

//     const fetchOrders = async () => {
//         if (!user) {
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch('http://localhost:3000/api/orders/user', {
//                 credentials: 'include'
//             });
            
//             const data = await response.json();
            
//             if (data && data.orders) {
//                 setOrders(data.orders);
//             } else {
//                 setOrders([]);
//             }
//         } catch (err) {
//             setError(err.message || "Failed to fetch orders");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const cancelOrder = async (orderId) => {
//         setCancelling(orderId);
        
//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/orders/${orderId}/cancel`,
//                 {
//                     method: 'PATCH',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             const data = await response.json();
            
//             if (!response.ok) {
//                 throw new Error(data.message || data.error || "Failed to cancel order");
//             }
            
//             setOrders(orders.map(order =>
//                 order.order_id === orderId
//                     ? { ...order, status: "Cancelled" }
//                     : order
//             ));
//             setError(null);
//         } catch (err) {
//             setError(`Error cancelling order #${orderId}: ${err.message}`);
//         } finally {
//             setCancelling(null);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="order-history-container">
//                 <BuyerDashboard />
//                 <div className="loading-container">
//                     <div className="loading-spinner"></div>
//                     <p className="loading-text">Loading orders...</p>
//                 </div>
//             </div>
//         );
//     }

//     // Safety check for orders
//     if (!orders || !Array.isArray(orders)) {
//         return (
//             <div className="order-history-container">
//                 <div className="content-wrapper">
//                     <BuyerDashboard />
//                     <h2 className="section-title">Order History</h2>
//                     <p className="empty-message">No valid orders data available.</p>
//                     {error && (
//                         <div className="error-message">
//                             <p>{error}</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="order-history-container">
//             <div className="content-wrapper">
//                 <BuyerDashboard />
//                 <div className="order-panel">
//                     <div className="panel-header">
//                         <h2 className="section-title">Order History</h2>
//                         <div className="search-container">
//                             <input 
//                                 type="text" 
//                                 className="search-input"
//                                 placeholder="Search orders..." 
//                                 onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} 
//                             />
//                             <div className="search-icon">
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
                    
//                     {error && (
//                         <div className="error-container">
//                             <p>{error}</p>
//                             <button 
//                                 onClick={() => setError(null)} 
//                                 className="dismiss-button"
//                                 aria-label="Dismiss error"
//                             >
//                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                     <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                                 </svg>
//                             </button>
//                         </div>
//                     )}
                    
//                     <div className="orders-list">
//                         {orders.length === 0 ? (
//                             <div className="empty-orders">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                                 </svg>
//                                 <p className="empty-text">No orders found.</p>
//                             </div>
//                         ) : (
//                             orders
//                                 .filter(order => {
//                                     try {
//                                         return (
//                                             (order.order_id && String(order.order_id).toLowerCase().includes(searchTerm)) ||
//                                             (order.items && order.items.some(item => 
//                                                 item.product_name && String(item.product_name).toLowerCase().includes(searchTerm)
//                                             ))
//                                         );
//                                     } catch (err) {
//                                         return false;
//                                     }
//                                 })
//                                 .map((order) => (
//                                     <div key={order.order_id} className="order-card">
//                                         <div className="order-content">
//                                             <div className="order-header">
//                                                 <div className="order-info">
//                                                     <h3 className="order-id">Order #{order.order_id || 'Unknown'}</h3>
//                                                     <p className="order-date">
//                                                         {new Date(order.created_at).toLocaleDateString(undefined, {
//                                                             year: 'numeric',
//                                                             month: 'long',
//                                                             day: 'numeric'
//                                                         })}
//                                                     </p>
//                                                 </div>
//                                                 <span className={`order-status ${order.status?.toLowerCase() || 'unknown'}`}>
//                                                     {order.status}
//                                                 </span>
//                                             </div>

//                                             {order.items && Array.isArray(order.items) && (
//                                                 <div className="table-container">
//                                                     <table className="items-table">
//                                                         <thead>
//                                                             <tr>
//                                                                 <th>Product</th>
//                                                                 <th>Quantity</th>
//                                                                 <th>Price</th>
//                                                                 <th>Details</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {order.items.map((item, index) => (
//                                                                 <tr key={index}>
//                                                                     <td className="product-name">{item.product_name}</td>
//                                                                     <td>{item.quantity} pcs</td>
//                                                                     <td>${item.price}</td>
//                                                                     <td>
//                                                                         {item.is_rental && (
//                                                                             <span className="rental-info">
//                                                                                 Rental for {item.rental_days} days
//                                                                             </span>
//                                                                         )}
//                                                                     </td>
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                             )}

//                                             <div className="order-footer">
//                                                 <span className="order-total">
//                                                     Total: <span className="total-amount">${order.total_amount}</span>
//                                                 </span>
                                                
//                                                 {order.status && order.status.toLowerCase() === "processing" && (
//                                                     <button 
//                                                         className={`cancel-button ${cancelling === order.order_id ? 'cancelling' : ''}`}
//                                                         onClick={() => cancelOrder(order.order_id)}
//                                                         disabled={cancelling === order.order_id}
//                                                     >
//                                                         {cancelling === order.order_id ? (
//                                                             <>
//                                                                 <span className="spinner"></span>
//                                                                 Cancelling...
//                                                             </>
//                                                         ) : 'Cancel Order'}
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default OrderHistory;


// import React, { useState, useEffect } from "react";
// import BuyerDashboard from "./BuyerDashboard";
// import { useAuth } from "../../pages/AuthProvider";
// import "./OrderHistory.css";
// import { FaSearch, FaTimes, FaBoxOpen, FaSpinner } from 'react-icons/fa';
// import { MdCheckCircleOutline, MdLocalShipping, MdCancel } from 'react-icons/md';

// const OrderHistory = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [cancelling, setCancelling] = useState(null);
//     const { user } = useAuth();

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!user) {
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch('http://localhost:3000/api/orders/user', {
//                     credentials: 'include'
//                 });

//                 const data = await response.json();

//                 if (data && data.orders) {
//                     setOrders(data.orders);
//                 } else {
//                     setOrders([]);
//                 }
//             } catch (err) {
//                 setError(err.message || "Failed to fetch orders");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, [user]);

//     const cancelOrder = async (orderId) => {
//         setCancelling(orderId);

//         try {
//             const response = await fetch(
//                 `http://localhost:3000/api/orders/${orderId}/cancel`,
//                 {
//                     method: 'PATCH',
//                     credentials: 'include',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || data.error || "Failed to cancel order");
//             }

//             setOrders(orders.map(order =>
//                 order.order_id === orderId
//                     ? { ...order, status: "Cancelled" }
//                     : order
//             ));
//             setError(null);
//         } catch (err) {
//             setError(`Error cancelling order #${orderId}: ${err.message}`);
//         } finally {
//             setCancelling(null);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="order-history-container loading-view">
//                 <BuyerDashboard />
//                 <div className="loader-container">
//                     <FaSpinner className="loader-icon" />
//                     <p className="loading-text calm">Fetching orders...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (!orders || !Array.isArray(orders)) {
//         return (
//             <div className="order-history-container empty-view">
//                 <div className="content-wrapper">
//                     <BuyerDashboard />
//                     <div className="empty-panel">
//                         <h2 className="section-title subtle">Order History</h2>
//                         <p className="empty-message calm">No order data available.</p>
//                         {error && (
//                             <div className="error-box">
//                                 <p>{error}</p>
//                                 <button onClick={() => setError(null)} aria-label="Dismiss error">
//                                     <FaTimes className="dismiss-icon" />
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="order-history-container">
//             <div className="content-wrapper">
//                 <BuyerDashboard />
//                 <div className="order-panel understated">
//                     <div className="panel-header balanced">
//                         <h2 className="section-title subtle">Order History</h2>
//                         <div className="search-bar restrained">
//                             <input
//                                 type="text"
//                                 className="search-input clean"
//                                 placeholder="Search orders..."
//                                 onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
//                             />
//                             <FaSearch className="search-icon muted" />
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="error-box">
//                             <p>{error}</p>
//                             <button onClick={() => setError(null)} aria-label="Dismiss error">
//                                 <FaTimes className="dismiss-icon" />
//                             </button>
//                         </div>
//                     )}

//                     <div className="orders-list orderly">
//                         {orders.length === 0 ? (
//                             <div className="empty-orders simple-box">
//                                 <FaBoxOpen className="empty-icon gentle" />
//                                 <p className="empty-text calm">No orders found.</p>
//                             </div>
//                         ) : (
//                             orders
//                                 .filter(order => {
//                                     try {
//                                         return (
//                                             (order.order_id && String(order.order_id).toLowerCase().includes(searchTerm)) ||
//                                             (order.items && order.items.some(item =>
//                                                 item.product_name && String(item.product_name).toLowerCase().includes(searchTerm)
//                                             ))
//                                         );
//                                     } catch (err) {
//                                         return false;
//                                     }
//                                 })
//                                 .map((order) => (
//                                     <div key={order.order_id} className="order-card neat">
//                                         <div className="order-content structured">
//                                             <div className="order-header concise">
//                                                 <div className="order-info flowing">
//                                                     <h3 className="order-id primary-text">Order #{order.order_id || 'N/A'}</h3>
//                                                     <p className="order-date secondary-text">
//                                                         {new Date(order.created_at).toLocaleDateString(undefined, {
//                                                             year: 'numeric',
//                                                             month: 'long',
//                                                             day: 'numeric'
//                                                         })}
//                                                     </p>
//                                                 </div>
//                                                 <span className={`order-status tag ${order.status?.toLowerCase() || 'pending'}`}>
//                                                     {order.status === 'Delivered' && <MdCheckCircleOutline className="status-icon success" />}
//                                                     {order.status === 'Processing' && <MdLocalShipping className="status-icon info" />}
//                                                     {order.status === 'Shipped' && <MdLocalShipping className="status-icon info" />}
//                                                     {order.status === 'Cancelled' && <MdCancel className="status-icon warning" />}
//                                                     {order.status !== 'Delivered' && order.status !== 'Processing' && order.status !== 'Shipped' && order.status !== 'Cancelled' && <FaBoxOpen className="status-icon muted" />}
//                                                     {order.status}
//                                                 </span>
//                                             </div>

//                                             {order.items && Array.isArray(order.items) && (
//                                                 <div className="table-container plain">
//                                                     <table className="items-table stripped">
//                                                         <thead className="table-head">
//                                                             <tr>
//                                                                 <th>Product</th>
//                                                                 <th className="centered">Quantity</th>
//                                                                 {/* <th className="centered">Price</th>
//                                                                 <th>Details</th> */}
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {order.items.map((item, index) => (
//                                                                 <tr key={index} className="table-row light-border">
//                                                                     <td className="product-name strong-text">{item.product_name}</td>
//                                                                     <td className="centered">{item.quantity} pcs</td>
//                                                                     {/* <td className="centered">${item.price}</td> */}
//                                                                     {/* <td>
//                                                                         {item.is_rental && (
//                                                                             <span className="rental-info badge">
//                                                                                 Rental for {item.rental_days} days
//                                                                             </span>
//                                                                         )}
//                                                                     </td> */}
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                             )}

//                                             <div className="order-footer aligned">
//                                                 <span className="order-total emphasis">
//                                                     Total: <span className="total-amount primary-text">${order.total_amount}</span>
//                                                 </span>

//                                                 {order.status && order.status.toLowerCase() === "processing" && (
//                                                     <button
//                                                         className={`cancel-button action-button ${cancelling === order.order_id ? 'is-cancelling' : ''}`}
//                                                         onClick={() => cancelOrder(order.order_id)}
//                                                         disabled={cancelling === order.order_id}
//                                                     >
//                                                         {cancelling === order.order_id ? (
//                                                             <>
//                                                                 <FaSpinner className="spinner-icon subtle-spin" />
//                                                                 Cancelling...
//                                                             </>
//                                                         ) : 'Cancel Order'}
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default OrderHistory;

import React, { useState, useEffect } from "react";
import BuyerDashboard from "./BuyerDashboard";
import { useAuth } from "../../pages/AuthProvider";
import "./OrderHistory.css";
import { FaSearch, FaTimes, FaBoxOpen, FaSpinner } from 'react-icons/fa';
import { MdCheckCircleOutline, MdLocalShipping, MdCancel } from 'react-icons/md';
import Navbar from '../../Navbar/navbar1'

const OrderHistory = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelling, setCancelling] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/orders/user', {
                    credentials: 'include'
                });

                const data = await response.json();

                if (data && data.orders) {
                    setOrders(data.orders);
                } else {
                    setOrders([]);
                }
            } catch (err) {
                setError(err.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const cancelOrder = async (orderId) => {
        setCancelling(orderId);

        try {
            const response = await fetch(
                `http://localhost:3000/api/orders/${orderId}/cancel`,
                {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || data.error || "Failed to cancel order");
            }

            setOrders(orders.map(order =>
                order.order_id === orderId
                    ? { ...order, status: "Cancelled" }
                    : order
            ));
            setError(null);
        } catch (err) {
            setError(`Error cancelling order #${orderId}: ${err.message}`);
        } finally {
            setCancelling(null);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="loader-container">
                    <FaSpinner className="loader-icon" />
                    <p className="loading-text">Fetching orders...</p>
                </div>
            );
        }

        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            return (
                <div className="empty-panel">
                    <div className="empty-orders">
                        <FaBoxOpen className="empty-icon" />
                        <p className="empty-text">No orders found.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="orders-list">
                {orders
                    .filter(order => {
                        try {
                            return (
                                (order.order_id && String(order.order_id).toLowerCase().includes(searchTerm)) ||
                                (order.items && order.items.some(item =>
                                    item.product_name && String(item.product_name).toLowerCase().includes(searchTerm)
                                ))
                            );
                        } catch (err) {
                            return false;
                        }
                    })
                    .map((order) => (
                        <div key={order.order_id} className="order-card">
                            <div className="order-content">
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3 className="order-id">Order #{order.order_id || 'N/A'}</h3>
                                        <p className="order-date">
                                            {new Date(order.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                    <span className={`order-status ${order.status?.toLowerCase() || 'pending'}`}>
                                        {order.status === 'Delivered' && <MdCheckCircleOutline className="status-icon" />}
                                        {order.status === 'Processing' && <MdLocalShipping className="status-icon" />}
                                        {order.status === 'Shipped' && <MdLocalShipping className="status-icon" />}
                                        {order.status === 'Cancelled' && <MdCancel className="status-icon" />}
                                        {order.status !== 'Delivered' && order.status !== 'Processing' && order.status !== 'Shipped' && order.status !== 'Cancelled' && <FaBoxOpen className="status-icon" />}
                                        {order.status}
                                    </span>
                                </div>

                                {order.items && Array.isArray(order.items) && (
                                    <div className="table-container">
                                        <table className="items-table">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th className="centered">Quantity</th>
                                                    <th className="centered">Image</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.items.map((item, index) => (
                                                    <tr key={index} className="table-row">
                                                        <td className="product-name">{item.product_name}</td>
                                                        <td className="centered">{item.quantity} pcs</td>
                                                        <td className="centered">
                                                                    {item.product_image ? (
                                                                    <img 
                                                                        src={item.product_image} 
                                                                        alt={item.product_name} 
                                                                        style={{
                                                                        width: '70px',
                                                                        height: '60px',
                                                                        objectFit: 'cover',
                                                                        borderRadius: '0px'
                                                                        }}
                                                                        onError={(e) => {
                                                                        e.target.src = '/placeholder-product.png';
                                                                        }}
                                                                    />
                                                                    ) : (
                                                                    <span>No image</span>
                                                                    )}
                                                                </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                <div className="order-footer">
                                    <span className="order-total">
                                        Total: <span className="total-amount">${order.total_amount}</span>
                                    </span>

                                    {order.status && order.status.toLowerCase() === "processing" && (
                                        <button
                                            className={`cancel-button ${cancelling === order.order_id ? 'is-cancelling' : ''}`}
                                            onClick={() => cancelOrder(order.order_id)}
                                            disabled={cancelling === order.order_id}
                                        >
                                            {cancelling === order.order_id ? (
                                                <>
                                                    <FaSpinner className="spinner-icon" />
                                                    Cancelling...
                                                </>
                                            ) : 'Cancel Order'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    };

    return (
        <div className="OrderHistory-body">
        <div className="app-layout">
            <div className="app-sidebar">
                <BuyerDashboard />
            </div>

            <div className="app-main">
                <Navbar />
               
                <div className="order-panel">
                    <div className="panel-header">
                        <h2 className="section-title">Order History</h2>
                        <div className="search-bar">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search orders..."
                                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                            />
                            <FaSearch className="search-icon" />
                        </div>
                    </div>

                    {error && (
                        <div className="error-box">
                            <p>{error}</p>
                            <button onClick={() => setError(null)} aria-label="Dismiss error">
                                <FaTimes className="dismiss-icon" />
                            </button>
                        </div>
                    )}

                    {renderContent()}
                </div>
            </div>
        </div>
        </div>
    );
};

export default OrderHistory;