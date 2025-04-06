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
import "./AdminAnalytics.css"
import AdminDashboard from "./AdminDashboard";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip, Legend
);

const AdminAnalytics = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const UserData = {
      totalUsers: 1500,
      buyerCount: 1200,
      sellerCount: 300,
    };

    setUserData(UserData);
  };

  const pieChartData = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "Total Users",
        data: [userData?.buyerCount || 0, userData?.sellerCount || 0],
        backgroundColor: ["#BDC4D4", "#D1CFC9"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Buyers", "Sellers"],
    datasets: [
      {
        label: "User Count",
        data: [userData?.buyerCount || 0, userData?.sellerCount || 0],
        backgroundColor: ["#1C2E4A", "#52677D"],
      },
    ],
  };

  if (!userData) {
    return <div>Loading admin analytics...</div>;
  }

  return (
    <div className="admin-analytics-container">
        <AdminDashboard />
      <h2>Admin Analytics Dashboard</h2>

      <div className="chart-container">
        <div className="chart-card">
          <h3>Total Users (Buyers vs Sellers)</h3>
          <Pie data={pieChartData} />
        </div>

        <div className="chart-card">
          <h3>Buyers vs Sellers</h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
