import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderManagement.css";
import Seller_dashboard from "./Seller_dashboard";

// Configure axios defaults for all requests
axios.defaults.withCredentials = true;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [dashboardStats, setDashboardStats] = useState({
    total_orders: 0,
    total_sales: 0,
    current_month_revenue: 0
  });
  const [orderStatusCounts, setOrderStatusCounts] = useState({
    NULL: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  });
  
  const ordersPerPage = 10;

  useEffect(() => {
    fetchDashboardStats();
    fetchOrderStatusBreakdown();
    fetchOrders();
  }, [currentPage, selectedStatus]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get("/api/seller/dashboard");
      setDashboardStats(response.data?.data || {
        total_orders: 0,
        total_sales: 0,
        current_month_revenue: 0
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setError("Failed to load dashboard statistics");
    }
  };

  const fetchOrderStatusBreakdown = async () => {
    try {
      const response = await axios.get("/api/seller/order-breakdown");
      setOrderStatusCounts(response.data?.data?.order_status_breakdown || {
        NULL: 0,
        processing: 0,
        shipped: 0,
        delivered: 0,
        cancelled: 0
      });
    } catch (error) {
      console.error("Error fetching order breakdown:", error);
      setError("Failed to load order status breakdown");
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      const response = await axios.get(`/api/seller/orderPagination`, {
        params: {
          page: currentPage,
          limit: ordersPerPage,
          status: selectedStatus === "all" ? undefined : selectedStatus
        }
      });

      if (response.data.success) {
        setOrders(response.data.data.orders);
        setTotalPages(response.data.data.pagination.total_pages);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.patch(
        `/api/seller/order/${orderId}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        setOrders(orders.map(order => 
          order.order_id === orderId ? { ...order, status: newStatus } : order
        ));
        fetchOrderStatusBreakdown();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      setError("Failed to update order status");
    }
  };

  const handleStatusFilterChange = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewDetails = (orderId) => {
    // Implement view details functionality
    console.log("View details for order:", orderId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusClass = (status) => {
    const statusMap = {
      "processing": "processing",
      "shipped": "shipped",
      "delivered": "delivered",
      "cancelled": "cancelled",
      "NULL": "pending"
    };
    return statusMap[status] || "pending";
  };

  const getStatusDisplay = (status) => {
    return status === "NULL" ? "Pending" : status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="order-management-container">
      <Seller_dashboard/>
      
      <div className="order-content">
        <div className="page-header">
          <h1>Order Management</h1>
          <div className="order-summary">
            <div className="summary-card">
              <span className="summary-title">Total Orders</span>
              <span className="summary-value">{dashboardStats.total_orders}</span>
            </div>
            <div className="summary-card">
              <span className="summary-title">Total Sales</span>
              <span className="summary-value">${parseFloat(dashboardStats.total_sales || 0).toFixed(2)}</span>
            </div>
            <div className="summary-card">
              <span className="summary-title">This Month</span>
              <span className="summary-value">${parseFloat(dashboardStats.current_month_revenue || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="order-filters">
          <div className="status-tabs">
            <button 
              className={selectedStatus === "all" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("all")}
            >
              All Orders
              <span className="count-badge">{dashboardStats.total_orders}</span>
            </button>
            <button 
              className={selectedStatus === "NULL" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("NULL")}
            >
              Pending
              <span className="count-badge">{orderStatusCounts.NULL || 0}</span>
            </button>
            <button 
              className={selectedStatus === "processing" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("processing")}
            >
              Processing
              <span className="count-badge">{orderStatusCounts.processing || 0}</span>
            </button>
            <button 
              className={selectedStatus === "shipped" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("shipped")}
            >
              Shipped
              <span className="count-badge">{orderStatusCounts.shipped || 0}</span>
            </button>
            <button 
              className={selectedStatus === "delivered" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("delivered")}
            >
              Delivered
              <span className="count-badge">{orderStatusCounts.delivered || 0}</span>
            </button>
            <button 
              className={selectedStatus === "cancelled" ? "active" : ""} 
              onClick={() => handleStatusFilterChange("cancelled")}
            >
              Cancelled
              <span className="count-badge">{orderStatusCounts.cancelled || 0}</span>
            </button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading-spinner">Loading orders...</div>
        ) : (
          <>
            <div className="orders-table-container">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.order_id}>
                        <td>#{order.order_id.substring(0, 8)}</td>
                        <td>{formatDate(order.created_at)}</td>
                        <td>{order.customer?.name || "N/A"}</td>
                        <td>${parseFloat(order.total_amount || 0).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${getStatusClass(order.status)}`}>
                            {getStatusDisplay(order.status)}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <button 
                            className="view-button"
                            onClick={() => handleViewDetails(order.order_id)}
                          >
                            View Details
                          </button>
                          <select
                            value={order.status || "NULL"}
                            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                            className="status-select"
                          >
                            <option value="NULL">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="no-orders">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="pagination-button"
                >
                  Previous
                </button>
                <span className="page-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;


