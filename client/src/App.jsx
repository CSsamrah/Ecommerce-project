import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Checkout from './components/Pages/Checkout';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Seller_dashboard from './components/Dashboards/Seller/Seller_dashboard';
import InventoryManagement from './components/Dashboards/Seller/InventoryManagement';
import OrderManagement from './components/Dashboards/Seller/OrderManagement';
import AnalyticsDashboard from './components/Dashboards/Seller/AnalyticsDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Seller_dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/" element={<Seller_dashboard />} />
        <Route path="/order" element={<OrderManagement />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
    </Router>
    // <div>
    //   <Seller_dashboard />
    // </div>
    // <div>
    //   <Checkout />
    // </div>
  )
}

export default App;
