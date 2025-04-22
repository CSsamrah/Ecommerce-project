import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import "./productDescription.css"; // Add styling if needed
import Rating from "./rating"; // Import the rating component
import ProductAuthentication from "./productAuthentication";  // Import the product authentication component

// Import images (same as Catalog.jsx)
import image1 from "../images/chip.png";
import image2 from "../images/gaming.png";
import image3 from "../images/intelcorei7.png";
import image4 from "../images/keyboard.png";

//Product Details
const products = [
  { id: "p1", title: "GlossyBox Skincare: Deep Cleansing Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "1500", image: image1 },
  { id: "p2", title: "Glow Recipe: Blueberry Bounce Gentle Cleanser", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2200", image: image2 },
  { id: "p3", title: "Anua: Heartleaf Pore Control Cleansing Oil", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2800", image: image3 },
  { id: "p4", title: "COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "1800", image: image4 },
  { id: "p5", title: "Summer Fridays: Cloud Dew Oil-Free Gel Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3000", image: image4 },
  { id: "p6", title: "Summer Fridays: Rich Cushion Cream, Ultra-Plumping", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3500", image: image3 },
  { id: "p7", title: "Glow Recipe: Watermelon Glow Pink Juice Moisturizer", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2800", image: image2 },
  { id: "p8", title: "Glow Recipe: Watermelon Glow Niacinamide Dew Drops", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3500", image: image1 },
];

//Review Details
// const reviews = [
//   { username: "John Doe", email: "john@example.com", rating: 5, content: "Amazing product!" },
//   { username: "Jane Smith", email: "jane@example.com", rating: 4, content: "Pretty good, but could be better." },
//   { username: "Mike Ross", email: "mike@example.com", rating: 3, content: "" },
// ];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }


  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (isInCart) {
      alert("Already in cart!");
    } else {
      setIsInCart(true);
      alert("Added to cart!");
    }
  };

// Helper function to generate star icons
const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
};
//Rating
    const [reviews, setReviews] = useState([]);

    const addReview = (newReview) => {
        const isReviewed = reviews.some(review => review.email === newReview.email);
        if (isReviewed) {
            alert("Product already reviewed!");
            return;
        }
        setReviews([...reviews, newReview]);
    };

  // Add reviews to the database ---------------->
    // const addReview = async (newReview) => {
    //   try {
    //     // Send review to the backend to be stored in the database
    //     await axios.post(`/api/reviews/${id}`, newReview);
        
    //     // After submitting, fetch the updated reviews
    //     const response = await axios.get(`/api/reviews/${id}`);
    //     const updatedReviews = response.data;
        
    //     setReviews(updatedReviews);
    
    //     // Recalculate the average rating
    //     const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
    //     const avgRating = totalRating / updatedReviews.length;
    //     setAverageRating(avgRating);
    
    //     alert("Review added successfully!");
    //   } catch (error) {
    //     console.error("Error submitting review:", error);
    //   }
    // };
    

//Average Rating
    const [averageRating, setAverageRating] = useState(0);

    // Recalculate the average rating whenever the reviews change
  useEffect(() => {
    if (reviews.length) {
      const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setAverageRating(avgRating);
    }
  }, [reviews]);

  useEffect(() => {
    if (product) {
      localStorage.setItem(`rating_${product.id}`, JSON.stringify(averageRating)); // Store rating
    }
  }, [averageRating, product]);

  // Fetch reviews from the database on page load ----->
  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       // Assuming the API returns a list of reviews for the specific product
  //       const response = await axios.get(`/api/reviews/${id}`);
  //       const fetchedReviews = response.data; // Reviews returned from the API

  //       setReviews(fetchedReviews);

  //       // Calculate the average rating based on fetched reviews
  //       if (fetchedReviews.length > 0) {
  //         const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
  //         const avgRating = totalRating / fetchedReviews.length;
  //         setAverageRating(avgRating);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   };

  //   fetchReviews();
  // }, [id]); // Fetch reviews when the product ID changes



  return (
    <div className="product_detail_page">
    <div className="product-detail">
      <div className="product-container">
        <div className="back-button" onClick={() => navigate("/catalog")}><IonIcon icon={arrowBackOutline} /></div>
        <img src={product.image} alt={product.title} className="product-image" />
        <div className="product-info">
          {/* <div className="wishlist-button" onClick={handleWishlist}><IonIcon icon={isWishlisted ? heart : heartOutline} /></div> */}
          <h2>{product.title}</h2>
          <p className="about-product">{product.description}</p>
          {/* Display Average Rating */}
          <div className="average-rating">
            <div>{renderStars(Math.round(averageRating))} ({averageRating.toFixed(1)})</div>
          </div>
          <h3 className="product-price">Rs. {product.price}</h3>
          <div className="product_detail_buttons">
            <button className="cart-button" onClick={handleAddToCart}>Add To Cart<IonIcon icon={cartOutline} /></button>
            <div className="authentication_button">
              <ProductAuthentication productId={product.id} />
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Review Section */}
      <div className="review_container">
        <div className="review_heading">
          <span>Customer Reviews</span>
          <h1>Client Says</h1>
        </div>

        {/* Rating Form */}
        <Rating addReview={addReview} />

        <div className="review_box_container">
            {/* Display Individual Reviews */}
            {reviews.length ? (
            reviews.map((review, index) => (
              <div key={index} className="review_box">
                <div className="box_top">
                  <div className="user_name">
                    <h4>{review.username}</h4>
                    <span>{review.email}</span>
                  </div>
                  <div className="reviewed_stars">{renderStars(review.rating)}</div>
                </div>
                <div className="box_body">
                  {review.content && <p>"{review.content}"</p>}
                </div>
              </div>
                ))
              ) : (
                  <p>No reviews yet.</p>
              )}     
        </div>

        
        
        </div>
    </div>
  );
};

export default ProductDetail;
