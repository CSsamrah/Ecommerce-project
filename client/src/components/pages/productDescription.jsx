// import React, {useEffect, useState} from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { IonIcon } from '@ionic/react';
// import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
// import "./productDescription.css"; // Add styling if needed
// import Rating from "./rating"; // Import the rating component
// import ProductAuthentication from "./productAuthentication";  // Import the product authentication component

// // Import images (same as Catalog.jsx)
// import image1 from "../images/chip.png";
// import image2 from "../images/gaming.png";
// import image3 from "../images/intelcorei7.png";
// import image4 from "../images/keyboard.png";

// //Product Details
// const products = [
//   { id: "p1", title: "GlossyBox Skincare: Deep Cleansing Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "1500", image: image1 },
//   { id: "p2", title: "Glow Recipe: Blueberry Bounce Gentle Cleanser", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2200", image: image2 },
//   { id: "p3", title: "Anua: Heartleaf Pore Control Cleansing Oil", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2800", image: image3 },
//   { id: "p4", title: "COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "1800", image: image4 },
//   { id: "p5", title: "Summer Fridays: Cloud Dew Oil-Free Gel Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3000", image: image4 },
//   { id: "p6", title: "Summer Fridays: Rich Cushion Cream, Ultra-Plumping", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3500", image: image3 },
//   { id: "p7", title: "Glow Recipe: Watermelon Glow Pink Juice Moisturizer", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "2800", image: image2 },
//   { id: "p8", title: "Glow Recipe: Watermelon Glow Niacinamide Dew Drops", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation. Perfect for gamers, creators, and professionals, the XYZ-500 offers exceptional speed and efficiency.", price: "3500", image: image1 },
// ];

// //Review Details
// // const reviews = [
// //   { username: "John Doe", email: "john@example.com", rating: 5, content: "Amazing product!" },
// //   { username: "Jane Smith", email: "jane@example.com", rating: 4, content: "Pretty good, but could be better." },
// //   { username: "Mike Ross", email: "mike@example.com", rating: 3, content: "" },
// // ];

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const product = products.find((item) => item.id === id);

//   if (!product) {
//     return <h2>Product not found</h2>;
//   }


//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);

//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleAddToCart = () => {
//     if (isInCart) {
//       alert("Already in cart!");
//     } else {
//       setIsInCart(true);
//       alert("Added to cart!");
//     }
//   };

// // Helper function to generate star icons
// const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//         <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
//     ));
// };
// //Rating
//     const [reviews, setReviews] = useState([]);

//     const addReview = (newReview) => {
//         const isReviewed = reviews.some(review => review.email === newReview.email);
//         if (isReviewed) {
//             alert("Product already reviewed!");
//             return;
//         }
//         setReviews([...reviews, newReview]);
//     };

//   // Add reviews to the database ---------------->
//     // const addReview = async (newReview) => {
//     //   try {
//     //     // Send review to the backend to be stored in the database
//     //     await axios.post(`/api/reviews/${id}`, newReview);
        
//     //     // After submitting, fetch the updated reviews
//     //     const response = await axios.get(`/api/reviews/${id}`);
//     //     const updatedReviews = response.data;
        
//     //     setReviews(updatedReviews);
    
//     //     // Recalculate the average rating
//     //     const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
//     //     const avgRating = totalRating / updatedReviews.length;
//     //     setAverageRating(avgRating);
    
//     //     alert("Review added successfully!");
//     //   } catch (error) {
//     //     console.error("Error submitting review:", error);
//     //   }
//     // };
    

// //Average Rating
//     const [averageRating, setAverageRating] = useState(0);

//     // Recalculate the average rating whenever the reviews change
//   useEffect(() => {
//     if (reviews.length) {
//       const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
//       setAverageRating(avgRating);
//     }
//   }, [reviews]);

//   useEffect(() => {
//     if (product) {
//       localStorage.setItem(`rating_${product.id}`, JSON.stringify(averageRating)); // Store rating
//     }
//   }, [averageRating, product]);

//   // Fetch reviews from the database on page load ----->
//   // useEffect(() => {
//   //   const fetchReviews = async () => {
//   //     try {
//   //       // Assuming the API returns a list of reviews for the specific product
//   //       const response = await axios.get(`/api/reviews/${id}`);
//   //       const fetchedReviews = response.data; // Reviews returned from the API

//   //       setReviews(fetchedReviews);

//   //       // Calculate the average rating based on fetched reviews
//   //       if (fetchedReviews.length > 0) {
//   //         const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
//   //         const avgRating = totalRating / fetchedReviews.length;
//   //         setAverageRating(avgRating);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching reviews:", error);
//   //     }
//   //   };

//   //   fetchReviews();
//   // }, [id]); // Fetch reviews when the product ID changes



//   return (
//     <div className="product_detail_page">
//     <div className="product-detail">
//       <div className="product-container">
//         <div className="back-button" onClick={() => navigate("/catalog")}><IonIcon icon={arrowBackOutline} /></div>
//         <img src={product.image} alt={product.title} className="product-image" />
//         <div className="product-info">
//           {/* <div className="wishlist-button" onClick={handleWishlist}><IonIcon icon={isWishlisted ? heart : heartOutline} /></div> */}
//           <h2>{product.title}</h2>
//           <p className="about-product">{product.description}</p>
//           {/* Display Average Rating */}
//           <div className="average-rating">
//             <div>{renderStars(Math.round(averageRating))} ({averageRating.toFixed(1)})</div>
//           </div>
//           <h3 className="product-price">Rs. {product.price}</h3>
//           <div className="product_detail_buttons">
//             <button className="cart-button" onClick={handleAddToCart}>Add To Cart<IonIcon icon={cartOutline} /></button>
//             <div className="authentication_button">
//               <ProductAuthentication productId={product.id} />
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>

//       {/* Review Section */}
//       <div className="review_container">
//         <div className="review_heading">
//           <span>Customer Reviews</span>
//           <h1>Client Says</h1>
//         </div>

//         {/* Rating Form */}
//         <Rating addReview={addReview} />

//         <div className="review_box_container">
//             {/* Display Individual Reviews */}
//             {reviews.length ? (
//             reviews.map((review, index) => (
//               <div key={index} className="review_box">
//                 <div className="box_top">
//                   <div className="user_name">
//                     <h4>{review.username}</h4>
//                     <span>{review.email}</span>
//                   </div>
//                   <div className="reviewed_stars">{renderStars(review.rating)}</div>
//                 </div>
//                 <div className="box_body">
//                   {review.content && <p>"{review.content}"</p>}
//                 </div>
//               </div>
//                 ))
//               ) : (
//                   <p>No reviews yet.</p>
//               )}     
//         </div>

        
        
//         </div>
//     </div>
//   );
// };

// export default ProductDetail;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import axios from 'axios';
import "./productDescription.css";
import Rating from "./Rating";
import ProductAuthentication from "./ProductAuthentication";


const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        try {
          const allProductsRes = await axios.get('http://localhost:3000/api/products/getAllProducts');
          const foundProduct = allProductsRes.data.data.find(p => p.id === parseInt(id) || p.id === id);
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            const token = localStorage.getItem('token');
            if (token) {
              const productRes = await axios.get(
                `http://localhost:3000/api/products/getProduct/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              setProduct(productRes.data.data);
            } else {
              throw new Error("Product not found");
            }
          }
        } catch (apiErr) {
          const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
          const cachedProduct = cachedProducts.find(p => p.id === parseInt(id) || p.id === id);
          
          if (cachedProduct) {
            setProduct(cachedProduct);
          } else {
            throw new Error("Failed to load product data");
          }
        }
        
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
        setReviews(storedReviews);
        
      } catch (err) {
        setError("Unable to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);

  const handleWishlist = () => {
    if (!localStorage.getItem('token')) {
      alert("Please log in to add items to your wishlist");
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem('token')) {
      alert("Please log in to add items to your cart");
      return;
    }
    
    if (product) {
      addToCart({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.product_image || '/images/product-placeholder.jpg',
        quantity: 1
      });
    }
  };

  const addReview = (newReview) => {
    if (!localStorage.getItem('token')) {
      alert("Please log in to leave a review");
      return;
    }
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
  };

  const renderStars = (rating) => {
    const numericRating = Math.round(parseFloat(rating));
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < numericRating ? 'filled' : ''}`}>★</span>
    ));
  };

  if (loading) return (
    <div className="loading-state">
      <div className="spinner"></div>
      <p>Loading product details...</p>
    </div>
  );

  if (error) return (
    <div className="error-state">
      <div className="error-icon">!</div>
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="btn-primary">
        <IonIcon icon={arrowBackOutline} />
        Back to Products
      </button>
    </div>
  );

  if (!product) return (
    <div className="not-found">
      <h2>Product Not Found</h2>
      <p>We couldn't find the product you're looking for.</p>
      <button onClick={() => navigate('/')} className="btn-primary">
        Browse Products
      </button>
    </div>
  );

  return (
    <div className="product-detail-container">
      <div className="product-header">
        <button onClick={() => navigate(-1)} className="btn-back">
          <IonIcon icon={arrowBackOutline} />
          Back
        </button>
        <h1 className="product-title">{product.name}</h1>
      </div>

      <div className="product-content">
        <div className="product-gallery">
          <div className="main-image">
          <img 
  src={product.image || product.product_image || '/images/product-placeholder.jpg'} 
  alt={product.name}
  onError={(e) => e.target.src = '/images/product-placeholder.jpg'}
/>
          </div>
        </div>

        <div className="product-info">
          <div className="price-section">
            <span className="current-price">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="rating-section">
            {renderStars(averageRating)}
            <span className="rating-count">({reviews.length} reviews)</span>
            <a href="#reviews" className="review-link">See all reviews</a>
          </div>

          <div className="stock-status">
            {product.stock_quantity > 0 ? (
              <span className="in-stock">In Stock ({product.stock_quantity} available)</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {product.product_features?.length > 0 && (
            <div className="product-features">
              <h3>Features</h3>
              <ul>
                {product.product_features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="action-buttons">
            <button 
              className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
              onClick={handleAddToCart}
            >
              <IonIcon icon={cartOutline} />
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button 
              className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
              onClick={handleWishlist}
            >
              <IonIcon icon={isWishlisted ? heart : heartOutline} />
              {isWishlisted ? 'Saved' : 'Save for Later'}
            </button>
          </div>

          <ProductAuthentication productId={id} />
        </div>
      </div>

      <section id="reviews" className="reviews-section">
        <div className="section-header">
          <h2>Customer Reviews</h2>
          <div className="overall-rating">
            {renderStars(averageRating)}
            <span>{averageRating.toFixed(1)} out of 5</span>
          </div>
        </div>

        <Rating addReview={addReview} />

        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="reviewer-info">
                  <div className="avatar">{review.username.charAt(0).toUpperCase()}</div>
                  <div>
                    <h4>{review.username}</h4>
                    <time>{new Date(review.date).toLocaleDateString()}</time>
                  </div>
                </div>
                <div className="review-rating">{renderStars(review.rating)}</div>
                {review.content && <p className="review-content">"{review.content}"</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-reviews">
            <p>No reviews yet. Be the first to review this product!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;