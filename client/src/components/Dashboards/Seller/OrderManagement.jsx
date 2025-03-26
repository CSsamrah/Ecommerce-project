import React, { useState } from "react";
import Seller_dashboard from "./Seller_dashboard";
import "./OrderManagement.css";

const OrderManagement = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const orders = [
        { id: "001", customer: "Areesha", product: "New Product", type: "New", quantity: 2, price: 200, status: "Pending" },
        { id: "002", customer: "Adeena", product: "Second-Hand Item", type: "Second-Hand", quantity: 1, price: 50, status: "Shipped" },
        { id: "003", customer: "Suniya", product: "Rental Item", type: "Rental", quantity: 1, price: 30, status: "Active Rental", rentalDates: { start: "2024-03-10", end: "2024-03-20" } },
    ];

    const filteredOrders = selectedCategory === "all" ? orders : orders.filter(order => order.type === selectedCategory);

    return (
        <div className="order-container">
            <Seller_dashboard />
            <h2>Order Management</h2>
            <div className="category-tabs">
                <button onClick={() => setSelectedCategory("all")}>All</button>
                <button onClick={() => setSelectedCategory("New")}>New</button>
                <button onClick={() => setSelectedCategory("Second-Hand")}>Second-Hand</button>
                <button onClick={() => setSelectedCategory("Rental")}>Rental</button>
            </div>
            <table id="order-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Product</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        {/* <th>Actions</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.product}</td>
                            <td>{order.type}</td>
                            <td>{order.quantity}</td>
                            <td>${order.price}</td>
                            <td>
                                <select defaultValue={order.status}>
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                    <option value="Returned">Returned</option>
                                </select>
                            </td>
                            {/* <td>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderManagement;


