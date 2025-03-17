import React from "react";
import "./AnalyticsDashboard.css";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from "recharts";
import Seller_dashboard from "./Seller_dashboard";

const sampleSalesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 600 },
  { month: "May", sales: 700 },
];

const productPerformance = [
  { name: "Monitor", sales: 100 },
  { name: "Mouse", sales: 80 },
  { name: "Keyboard", sales: 60 },
];

const customerDemographics = [
  { name: "18-25", value: 40 },
  { name: "26-35", value: 35 },
  { name: "36-45", value: 15 },
  { name: "46+", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsDashboard = () => {
  return (
    <div className="analytics-container">
        <Seller_dashboard />
      <h2 className="title">Analytics & Insights</h2>

      <div className="chart-container">
        <div className="chart-card">
          <h3>Sales Overview</h3>
          <LineChart width={300} height={200} data={sampleSalesData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Line type="monotone" dataKey="sales" stroke="#0088FE" />
          </LineChart>
        </div>
        <div className="chart-card">
          <h3>Product Performance</h3>
          <BarChart width={300} height={200} data={productPerformance}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#ccc" />
            <Bar dataKey="sales" fill="#00C49F" />
          </BarChart>
        </div>
        <div className="chart-card transparent-bg">
          <h3>Customer Demographics</h3>
          <PieChart width={300} height={200}>
            <Pie data={customerDemographics} cx="50%" cy="50%" outerRadius={60} fill="#FFBB28" dataKey="value">
              {customerDemographics.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

