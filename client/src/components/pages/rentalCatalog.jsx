import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';
import './rentalCatalog.css';
import SlidingCart from './slidingCart';
import Navbar from '../Navbar/navbar1';
import axios from 'axios';
import { Padding } from '@mui/icons-material';

const RentalCatalog = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental products from database
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        console.log("Fetching rental products...");
        const response = await axios.get("http://localhost:3000/api/rental/getAllRentals");
        
        console.log("Rental response received:", response.data);
        
        // Handle response data
        if (response.data && (response.data.data || Array.isArray(response.data))) {
          const rentalsData = Array.isArray(response.data) ? response.data : 
                            (response.data.data ? response.data.data : []);
          
            const availableRentals = rentalsData.filter(rental => 
                rental && rental.rental_available !== false
                  );
                  
            setRentals(availableRentals);
                            // setRentals(rentalsData);
          
          // Cache rentals for later use
          localStorage.setItem('cachedRentals', JSON.stringify(availableRentals));
        } else {
          console.error("Unexpected rental response format:", response.data);
          setError("Invalid data format received from server");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rental products:", err);
        setError(err.message || "Failed to fetch rental products");
        setLoading(false);
      }
    };

    fetchRentals();
  }, []);

  // Add this CSS-in-JS object for the title
  // const titleStyle = {
  //   display: '-webkit-box',
  //   WebkitLineClamp: 2,
  //   WebkitBoxOrient: 'vertical',
  //   overflow: 'hidden',
  //   textOverflow: 'ellipsis',
  //   lineHeight: '1.3em',
  //   maxHeight: '5.5em', // 2 lines * 1.2em line height
  //   padding: '15px 0 0 10px',
  //   fontWeight: '500'
  //   // margin: '5px 0 0 0'
  // };


  const addRentalToCart = (rental) => {
    if (!rental.rental_available) {
      alert("This product is no longer available for rent");
      return;
    }
    
    addToCart({
      ...rental,
      isRental: true // Add flag to distinguish rental products
    });
    setSlidingCartOpen(true);
  };

  const navigateToRentalDetail = (rentalId) => {
    navigate(`/rental-product/${rentalId}`);
  };

  const renderStars = (rating) => {
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating || 0;
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < numericRating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
  };

  const getRentalRating = (rental) => {
    // First try to get rating from local storage
    const storedRating = localStorage.getItem(`rating_${rental.id}`);
    if (storedRating) return JSON.parse(storedRating);
    
    // Otherwise use the rating from the API response
    return rental.avg_rating ? parseFloat(rental.avg_rating) : 0;
  };

  if (loading) return <div className="loading">Loading rental products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!rentals || rentals.length === 0) return (<div className="no-products">No rental products available</div>);

  return (
    <main>
      <Navbar />
      <div className="catalog">
        <div className="catalog_container">
        <button className='secondhand_button' onClick={() => navigate('/rentalsecondhandCatalog')}>Second hand products</button>
          <div className="products">
            {rentals.map((rent) => {
              const averageRating = getRentalRating(rent);

              return (
                <div className="product_card" key={rent.id}>
                  {/* Product availability badge */}
                  {/* {rental.rental_available && (
                    <div className="availability-badge">Available for Rent</div>
                  )} */}
                  <div className="product_header">
                    <div className="product_title" title={rent.title} onClick={() => navigateToRentalDetail(rent.id)}>
                      {rent.title}
                    </div>
                    <div className="product_price">
                      <b>Rs.{rent.price}</b>
                      {/* <p>{rent.condition}</p>
                      <p>{rent.rentalavailable ?"TRUE": "False"}</p> */}
                      {/* <p>{rent.rental_status}</p> */}
                    </div>
                  </div>

                  <div className="product_body">
                    <div className="pro_image" onClick={() => navigateToRentalDetail(rent.id)}>
                      <img src={rent.image} alt={rent.title} />
                    </div>
                  </div>

                  <div className="button">
                    <div className="show_rating">
                      <div className="catalog_review_stars">
                        {renderStars(averageRating)}
                      </div>
                      <p>({typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'})</p>
                    </div>
                    <div className="add_to_cart">
                      <button className='add_to_cart_button' onClick={() => addRentalToCart(rent)}>
                        RENT NOW
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <SlidingCart
        isOpen={isSlidingCartOpen}
        onClose={() => setSlidingCartOpen(false)}
        onViewFullCart={() => navigate('/cart')}
      />
    </main>
  );
};

export default RentalCatalog;