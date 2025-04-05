import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import "./AnalyticsDashboard.css"
import Seller_dashboard from "./Seller_dashboard";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [soldData, setSoldData] = useState(null);
  const [breakdownData, setBreakdownData] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [topSellingProducts, setTopSellingProducts] = useState([]);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    // Sample mock data to simulate API responses
    const mockSoldData = {
      new_products: 120,
      secondhand_products: 85,
      rental_products: 60,
    };

    const mockBreakdownData = {
      newProducts: [
        { name: "Laptop", items_sold: 40, items_left: 10 },
        { name: "Headphones", items_sold: 30, items_left: 5 },
        { name: "Monitor", items_sold: 50, items_left: 15 },
      ],
      secondhandProducts: [
        { name: "Used Phone", items_sold: 20, items_left: 3 },
      ],
    };

    const mockMonthlyData = [
      { month: "2024-01-01", product_sales: 5000, rental_income: 1500 },
      { month: "2024-02-01", product_sales: 4500, rental_income: 1800 },
      { month: "2024-03-01", product_sales: 6000, rental_income: 2000 },
    ];

    const mockTopSellingProducts = [
      { name: "Laptop", items_sold: 40 },
      { name: "Headphones", items_sold: 30 },
      { name: "Monitor", items_sold: 50 },
      { name: "Used Phone", items_sold: 20 },
    ];

    setSoldData(mockSoldData);
    setBreakdownData(mockBreakdownData);
    setMonthlyData(mockMonthlyData);
    setTopSellingProducts(mockTopSellingProducts);
  };

  // Chart for Total Revenue of Current Month (using Line Chart)
  const totalRevenueCurrentMonth = {
    labels: monthlyData.map((m) =>
      new Date(m.month).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    ),
    datasets: [
      {
        label: "Product Sales",
        data: monthlyData.map((m) => m.product_sales),
        borderColor: "#673ab7",
        backgroundColor: "rgba(103, 58, 183, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Rental Income",
        data: monthlyData.map((m) => m.rental_income),
        borderColor: "#ff5722",
        backgroundColor: "rgba(255, 87, 34, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Chart for Total Sales (Pie Chart)
  const pieChartData = {
    labels: ["New Products", "Second-Hand", "Rental"],
    datasets: [
      {
        label: "Products Sold",
        data: [
          soldData?.new_products || 0,
          soldData?.secondhand_products || 0,
          soldData?.rental_products || 0,
        ],
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  // Chart for Top Selling Products (Bar Chart)
  const topSellingData = {
    labels: topSellingProducts.map((product) => product.name),
    datasets: [
      {
        label: "Items Sold",
        data: topSellingProducts.map((product) => product.items_sold),
        backgroundColor: "#03a9f4",
      },
    ],
  };

  // Loader if data is not available
  if (!soldData || !breakdownData || monthlyData.length === 0 || topSellingProducts.length === 0) {
    return <div>Loading seller analytics...</div>;
  }

  return (
    <div className="analytics-container">
      <Seller_dashboard />
      <h2>Seller Analytics Dashboard</h2>

      <div className="chart-section">
        {/* Total Revenue of Current Month (Line Chart) */}
        <div className="chart-card">
          <h3>Total Revenue of Current Month</h3>
          <Line data={totalRevenueCurrentMonth} />
        </div>

        {/* Total Sales (Pie Chart) */}
        <div className="chart-card">
          <h3>Total Sales Breakdown</h3>
          <Pie data={pieChartData} />
        </div>

        {/* Top Selling Products (Bar Chart) */}
        <div className="chart-card">
          <h3>Top Selling Products</h3>
          <Bar data={topSellingData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;



