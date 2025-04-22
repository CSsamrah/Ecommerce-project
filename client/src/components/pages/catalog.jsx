import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext'; // Adjust path as per your project structure
import './catalog.css';
import SlidingCart from './slidingCart'; // Import SlidingCart component

// Import images
import image1 from '../images/chip.png';
import image2 from '../images/gaming.png';
import image3 from '../images/intelcorei7.png';
import image4 from '../images/keyboard.png';

const Catalog = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);

  const products = [
    {
      id: 'p1',
      title: 'GlossyBox Skincare: Deep Cleansing Cream',
      price: '1500',
      image: image1,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p2',
      title: 'Glow Recipe: Blueberry Bounce Gentle Cleanser',
      price: '2200',
      image: image2,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p3',
      title: 'Anua: Heartleaf Pore Control Cleansing Oil',
      price: '2800',
      image: image3,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p4',
      title: 'COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)',
      price: '1800',
      image: image4,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p5',
      title: 'Summer Fridays: Cloud Dew Oil-Free Gel Cream',
      price: '3000',
      image: image4,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p6',
      title: 'Summer Fridays: Rich Cushion Cream, Ultra-Plumping ',
      price: '3500',
      image: image3,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p7',
      title: 'Glow Recipe: Watermelon Glow Pink Juice Moisturizer',
      price: '2800',
      image: image2,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k Sold'
    },
    {
      id: 'p8',
      title: 'Glow Recipe: Watermelon Glow Niacinamide Dew Drops',
      price: '3500',
      image: image1,
      avg_rating: '4 star',
      people_rated: '452',
      avg_sale: '2k'
    },
  ]

  const addProductToCart = (product) => {
    addToCart(product);
    setSlidingCartOpen(true); // Open sliding cart after adding product
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Helper function to generate star icons
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
  };

  // Fetch ratings from localStorage
  const getProductRating = (productId) => {
    const storedRating = localStorage.getItem(`rating_${productId}`);
    return storedRating ? JSON.parse(storedRating) : 0; 
  };

  return (
    <main>
      <div className="catalog">
        <div className="catalog_container">
          <div className="products">
            {products.map((product) => {
              const averageRating = getProductRating(product.id);

              return (
              <div className="product_card" key={product.id}>

                <div className="product_header">
                <div className="product_title" onClick={() => navigateToProductDetail(product.id)}>
                  <p>{product.title}</p>
                </div>
                <div className="product_price">
                  <b>Rs.{product.price}</b>
                </div>
                </div>

                <div className="product_body">
                <div className="pro_image" onClick={() => navigateToProductDetail(product.id)}>
                  <img src={product.image} alt={product.title} />
                </div>
                </div>

                <div className="button">
                  <div className="show_rating">
                      <div className="catalog_review_stars">{renderStars(Math.round(averageRating))}</div>
                      <p>({averageRating.toFixed(1)})</p>
                  </div>
                  {/* <button className="add_to_cart_button" onClick={() => addProductToCart(product)}> <img src={image1} alt={product.title} /> </button> */}
                  <div className="add_to_cart">
                    <button className='add_to_cart_button' onClick={() => addProductToCart(product)}>BUY NOW</button>
                  </div>
                </div>
              </div>
              );
              })}
          </div>
        </div>
      </div>
      {/* Sliding Cart Component */}
      <SlidingCart
        isOpen={isSlidingCartOpen}
        onClose={() => setSlidingCartOpen(false)}
        onViewFullCart={() => navigate('/cart')}
      />
    </main>
  );
};

export default Catalog;
