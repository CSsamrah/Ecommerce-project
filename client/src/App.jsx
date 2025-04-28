// import React from 'react'
// import { Box } from '@mui/material';
// import  { useEffect, useState } from "react";
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import HomeStart from "./components/pages/imageSlider"
// import "./components/pages/imageSlider.css"
// import Slider from "./components/pages/slider"
// import "./components/pages/slider.css"
// import TopPicks from "./components/pages/topPicks"
// import "./components/pages/topPicks.css"
// import Cards from "./components/pages/feedback"
// import "./components/pages/feedback.css"
// import SignIn from "./components/pages/signUp"
// import "./components/pages/signUp.css";
// import Catalog from "./components/pages/catalog"
// import { CartProvider } from './components/pages/cartContext';
// import "./components/pages/catalog.css";
// import ProductDetail from "./components/pages/productDescription";
// import "./components/pages/productDescription.css"
// // import ProductAuthentication from "./components/pages/productAuthentication";
// // import "./components/pages/productAuthentication.css"
// // import Rating from "./components/pages/rating"
// import "./components/pages/rating.css";
// import Cart from "./components/pages/cart"
// import "./components/pages/cart.css";
// // import Footer from "./components/Footer/footer";
// // import "./components/pages/footer.css"
// import Navbar from "./components/Navbar/navbar1";
// // import "./components/Navbar/navbar1.css"
// import BuyerDashboard from './components/Dashboards/Buyer/BuyerDashboard';
// import OrderHistory from './components/Dashboards/Buyer/OrderHistory';
// import RentalAgreement from './components/Dashboards/Buyer/RentalAgreement';
// import AdminDashboard from './components/Dashboards/Admin/AdminDashboard';
// import AdminAnalytics from './components/Dashboards/Admin/AdminAnalytics';
// import Buyers from './components/Dashboards/Admin/Buyers';
// import Sellers from './components/Dashboards/Admin/Sellers';
// import Seller_dashboard from './components/Dashboards/Seller/Seller_dashboard';
// import AnalyticsDashboard from './components/Dashboards/Seller/AnalyticsDashboard';
// import OrderManagement from './components/Dashboards/Seller/OrderManagement';
// import InventoryManagement from './components/Dashboards/Seller/InventoryManagement';
// import RentalManagement from './components/Dashboards/Seller/RentalManagement';
// import ForgotPassword from './components/pages/forgotPassword';
// import Checkout from './components/pages/Checkout';

// import OrderConfirmation from './components/pages/OrderConfirmation';
// import AdminOverview from './components/Dashboards/Admin/AdminOverview'
// import PayFast from './components/pages/PayFast.jsx'
// import Success from './components/pages/sucess.jsx'
// import Failure from "./components/pages/cancel.jsx"


// import { useNavigate, Link } from 'react-router-dom';

// const HomePage = () => (
//   <>
//     <Box>
//       <Navbar />
//     </Box>
//     <Box>
//       <HomeStart />
//     </Box>
//     <Box>
//       <Slider />
//     </Box>
//     <Box>
//       <TopPicks />
//     </Box>
//     <Box>
//       <Cards />
//     </Box>
//   </>
// );

// function App() {



//   return (

//     <CartProvider>
//     <Box>
//     <div className='content'>
//       <Router>
//           {/* <Navbar /> */}
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/navbar" element={<Navbar />} />
//             <Route path="/sign" element={<SignIn />} />
//             <Route path="/catalog" element={<Catalog />} />
//             {/* <Route path="/rating" element={<Rating />} /> */}
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/product/:id" element={<ProductDetail />} />
//             <Route path='/forgot-password' element={<ForgotPassword />} />
//             <Route path='/checkout' element={<Checkout /> } />

//             <Route path='/order-confirmation' element={<OrderConfirmation /> } />
//             {/* <Route path="/authentication" element={<ProductAuthentication />} /> */}

//             {/* Seller Routes */}
//         // <Route path="/" element={<Seller_dashboard />} />
//         <Route path="/seller-dashboard" element={<Seller_dashboard />} />
//         <Route path="/inventory" element={<InventoryManagement />} />
//         <Route path="/order" element={<OrderManagement />} />
//         <Route path="/rental" element={<RentalManagement />} />
//         <Route path="/analytics" element={<AnalyticsDashboard />} />

//         {/* Buyer Routes */}
//         <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
//         <Route path="/orderHistory" element={<OrderHistory />} />
//         <Route path="/rentalAgreements" element={<RentalAgreement />} />

//         {/* Admin Routes */}
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path='/admin' element={<AdminOverview /> } />
//         <Route path="/regBuyers" element={<Buyers />} />
//         <Route path="/regSellers" element={<Sellers />} />
//         <Route path="/adminAnalytics" element={<AdminAnalytics />} />
//         <Route path='/payment' element={<PayFast />}/>
//         <Route path='payment/success' element={<Success />} />
//         <Route path='payment/failure' element={<Failure />} />
//           </Routes>
//           {/* <Footer /> */}
//       </Router>    
//     </div>
//     </Box>
//     </CartProvider>

//   );
// }

// export default App;


import React from 'react'
import { Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeStart from "./components/pages/imageSlider"
import "./components/pages/imageSlider.css"
import Slider from "./components/pages/slider"
import "./components/pages/slider.css"
import TopPicks from "./components/pages/topPicks"
import "./components/pages/topPicks.css"
import Cards from "./components/pages/feedback"
import "./components/pages/feedback.css"
import SignIn from "./components/pages/signUp"
import "./components/pages/signUp.css";
import Catalog from "./components/pages/catalog";
import { CartProvider } from './components/pages/cartContext';
import "./components/pages/catalog.css";
import ProductDetail from "./components/pages/productDescription";
import "./components/pages/productDescription.css"
import Cart from "./components/pages/cart"
import "./components/pages/cart.css";
import Navbar from "./components/Navbar/navbar1";
import BuyerDashboard from './components/Dashboards/Buyer/BuyerDashboard';
import OrderHistory from './components/Dashboards/Buyer/OrderHistory';
import RentalAgreement from './components/Dashboards/Buyer/RentalAgreement';
import AdminDashboard from './components/Dashboards/Admin/AdminDashboard';
import AdminAnalytics from './components/Dashboards/Admin/AdminAnalytics';
import Buyers from './components/Dashboards/Admin/Buyers';
import Sellers from './components/Dashboards/Admin/Sellers';
import Seller_dashboard from './components/Dashboards/Seller/Seller_dashboard';
import AnalyticsDashboard from './components/Dashboards/Seller/AnalyticsDashboard';
import OrderManagement from './components/Dashboards/Seller/OrderManagement';
import InventoryManagement from './components/Dashboards/Seller/InventoryManagement';
import RentalManagement from './components/Dashboards/Seller/RentalManagement';
import ForgotPassword from './components/pages/forgotPassword';
import Checkout from './components/pages/Checkout';
import OrderConfirmation from './components/pages/OrderConfirmation';
import AdminOverview from './components/Dashboards/Admin/AdminOverview'
import PayFast from './components/pages/PayFast.jsx'
import Success from './components/pages/sucess.jsx'
import Failure from "./components/pages/cancel.jsx"
import { SocketProvider } from './components/Dashboards/Seller/SocketContext.jsx';


const HomePage = () => (
  <>
    <Box>
      <Navbar />
    </Box>
    <Box>
      <HomeStart />
    </Box>
    <Box>
      <Slider />
    </Box>
    <Box>
      <TopPicks />
    </Box>
    <Box>
      <Cards />
    </Box>
  </>
);

function App() {
  return (
    <Router>
      <CartProvider>
        <Box>
          <div className='content'>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/sign" element={<SignIn />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/order-confirmation' element={<OrderConfirmation />} />

              {/* Seller Routes */}
              <Route path="/seller-dashboard" element={<Seller_dashboard />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/order" element={<OrderManagement />} />
              <Route path="/rental" element={<RentalManagement />} />
              <Route
                path="/analytics"
                element={
                  <SocketProvider>
                    <AnalyticsDashboard />
                  </SocketProvider>
                }
              />
              {/* Buyer Routes */}
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/rentalAgreements" element={<RentalAgreement />} />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path='/admin' element={<AdminOverview />} />
              <Route path="/regBuyers" element={<Buyers />} />
              <Route path="/regSellers" element={<Sellers />} />
              <Route path="/adminAnalytics" element={<AdminAnalytics />} />
              <Route path='/payment' element={<PayFast />} />
              <Route path='payment/success' element={<Success />} />
              <Route path='payment/failure' element={<Failure />} />
            </Routes>
          </div>
        </Box>
      </CartProvider>
    </Router>
  );
}

export default App;