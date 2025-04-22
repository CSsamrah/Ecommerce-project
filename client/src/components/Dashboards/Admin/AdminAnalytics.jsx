// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Pie, Bar } from "react-chartjs-2";
// import "./AdminAnalytics.css"
// import AdminDashboard from "./AdminDashboard";

// ChartJS.register(
//   ArcElement,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip, Legend
// );

// const AdminAnalytics = () => {
//   const [userData, setUserData] = useState(null);
//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     const UserData = {
//       totalUsers: 1500,
//       buyerCount: 1200,
//       sellerCount: 300,
//     };

//     setUserData(UserData);
//   };

//   const pieChartData = {
//     labels: ["Buyers", "Sellers"],
//     datasets: [
//       {
//         label: "Total Users",
//         data: [userData?.buyerCount || 0, userData?.sellerCount || 0],
//         backgroundColor: ["#BDC4D4", "#D1CFC9"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const barChartData = {
//     labels: ["Buyers", "Sellers"],
//     datasets: [
//       {
//         label: "User Count",
//         data: [userData?.buyerCount || 0, userData?.sellerCount || 0],
//         backgroundColor: ["#1C2E4A", "#52677D"],
//       },
//     ],
//   };

//   if (!userData) {
//     return <div>Loading admin analytics...</div>;
//   }

//   return (
//     <div className="admin-analytics-container">
//         <AdminDashboard />
//       <h2>Admin Analytics Dashboard</h2>

//       <div className="chart-container">
//         <div className="chart-card">
//           <h3>Total Users (Buyers vs Sellers)</h3>
//           <Pie data={pieChartData} />
//         </div>

//         <div className="chart-card">
//           <h3>Buyers vs Sellers</h3>
//           <Bar data={barChartData} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminAnalytics;



import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import "./AdminAnalytics.css";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip, 
  Legend
);

const AdminAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    userStats: null,
    orderStats: null,
    revenueStats: null,
    transactionStats: null,
    topProducts: null,
    topSellers: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [
          usersResponse, 
          ordersResponse,
          revenueResponse,
          transactionsResponse,
          topProductsResponse,
          topSellersResponse
        ] = await Promise.all([
          axios.get("http://localhost:5000/api/admin/total-users", {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }),
          axios.get("http://localhost:5000/api/admin/total-orders", {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }),
          axios.get("http://localhost:5000/api/admin/total-revenue", {
            withCredentials: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
          }),
          // axios.get("http://localhost:5000/api/admin/total-transactions", {
          //   withCredentials: true,
          //   headers: {
          //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          //   }
          // }),
          // axios.get("http://localhost:5000/api/admin/top-selling-products", {
          //   withCredentials: true,
          //   headers: {
          //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          //   }
          // }),
          // axios.get("http://localhost:5000/api/admin/top-sellers", {
          //   withCredentials: true,
          //   headers: {
          //     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          //   }
          // })
        ]);

        setAnalyticsData({
          userStats: usersResponse.data,
          orderStats: ordersResponse.data,
          revenueStats: revenueResponse.data,
          // transactionStats: transactionsResponse.data,
          // topProducts: topProductsResponse.data,
          // topSellers: topSellersResponse.data.topSellers
        });

      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError(err.response?.data?.message || err.message || "Failed to load analytics data");

        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [navigate]);

  const pieChartData = {
    labels: ["Buyers", "Sellers", "Admins"],
    datasets: [
      {
        label: "Total Users",
        data: [
          analyticsData.userStats?.find(u => u.role === 'buyer')?.count || 0,
          analyticsData.userStats?.find(u => u.role === 'seller')?.count || 0,
          analyticsData.userStats?.find(u => u.role === 'admin')?.count || 0
        ],
        backgroundColor: ["#BDC4D4", "#D1CFC9", "#A3A8B8"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Processing", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Order Status",
        data: [
          analyticsData.orderStats?.find(o => o.status === 'processing')?.count || 0,
          analyticsData.orderStats?.find(o => o.status === 'shipped')?.count || 0,
          analyticsData.orderStats?.find(o => o.status === 'delivered')?.count || 0,
          analyticsData.orderStats?.find(o => o.status === 'cancelled')?.count || 0
        ],
        backgroundColor: ["#1C2E4A", "#52677D", "#7D8FA6", "#BDC4D4"],
      },
    ],
  };

  if (loading) {
    return (
      <div className="admin-analytics-container">
        <AdminDashboard />
        <div className="loading">Loading admin analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-analytics-container">
        <AdminDashboard />
        <div className="error-message">
          Error: {error}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-analytics-container">
      
      <AdminDashboard />
      <h2>Admin Analytics Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{analyticsData.userStats?.reduce((sum, user) => sum + parseInt(user.count), 0) || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <p>${analyticsData.revenueStats?.monthly || 0}</p>
        </div>
        
        {/* <div className="stat-card">
          <h3>Total Rentals</h3>
          <p>{analyticsData.transactionStats?.rentals || 0}</p>
        </div>
        
        <div className="stat-card">
          <h3>Secondhand Sales</h3>
          <p>{analyticsData.transactionStats?.secondhandSales || 0}</p>
        </div> */}
      </div>

      <div className="chart-container">
        <div className="chart-card">
          <h3>User Distribution</h3>
          <Pie data={pieChartData} />
        </div>

        <div className="chart-card">
          <h3>Order Status</h3>
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="top-lists">
        <div className="list-card">
          <h3>Top Selling Products</h3>
          <ul>
            {analyticsData.topProducts?.map((product, index) => (
              <li key={index}>
                Product ID: {product.product_id} - Sold: {product.total_sold}
              </li>
            ))}
          </ul>
        </div>
        
        {/* <div className="list-card">
          <h3>Top Sellers</h3>
          <ul>
            {analyticsData.topSellers?.map((sellerId, index) => (
              <li key={index}>Seller ID: {sellerId}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default AdminAnalytics;