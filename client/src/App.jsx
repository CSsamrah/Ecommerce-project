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
import RentalManagement from './components/Dashboards/Seller/RentalManagement';
import BuyerDashboard from './components/Dashboards/Buyer/BuyerDashboard';
import OrderHistory from './components/Dashboards/Buyer/OrderHistory';
import RentalAgreement from './components/Dashboards/Buyer/RentalAgreement';
import AdminDashboard from './components/Dashboards/Admin/AdminDashboard';
import Buyers from './components/Dashboards/Admin/Buyers';
import Sellers from './components/Dashboards/Admin/Sellers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/seller-dashboard" element={<Seller_dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/" element={<Seller_dashboard />} />
        <Route path="/order" element={<OrderManagement />} />
        <Route path="/rental" element={<RentalManagement />} />
        <Route path="/analytics" element={<AnalyticsDashboard />} />
      </Routes>
      <Routes>
      <Route path="/buyer" element={<BuyerDashboard />} />
      <Route path='/orderHistory' element={<OrderHistory />}/>
      <Route path='/rentalAgreements' element={<RentalAgreement />}/>
      </Routes>
      <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
       <Route path='/regBuyers' element={<Buyers />}/>
       <Route path='/regSellers' element={<Sellers />}/>  
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
