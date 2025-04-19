// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React from 'react'
import { Box } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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
import Catalog from "./components/pages/catalog"
import { CartProvider } from './components/pages/cartContext';
import "./components/pages/catalog.css";
import ProductDetail from "./components/pages/productDescription";
import "./components/pages/productDescription.css"
// import ProductAuthentication from "./components/pages/productAuthentication";
// import "./components/pages/productAuthentication.css"
import Rating from "./components/pages/rating"
import "./components/pages/rating.css";
import Cart from "./components/pages/cart"
import "./components/pages/cart.css";
// import Footer from "./components/Footer/footer";
// import "./components/pages/footer.css"
// import Navbar from "./components/Navbar/navbar1";
// import "./components/Navbar/navbar1.css"


const HomePage = () => (
  <>
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
    <CartProvider>
    <Box>
    <div className='content'>
      <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign" element={<SignIn />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            {/* <Route path="/authentication" element={<ProductAuthentication />} /> */}
          </Routes>
          {/* <Footer /> */}
      </Router>    
    </div>
    </Box>
    </CartProvider>
  );
}

export default App;
