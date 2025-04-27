import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import axios from "axios";
import ProductAuthentication from "./productAuthentication";
import "./productDescription.css";

// Import images
import image1 from "../images/chip.png";
import image2 from "../images/gaming.png";
import image3 from "../images/intelcorei7.png";
import image4 from "../images/keyboard.png";

// Fallback product data
const fallbackProducts = [
  { id: "p1", title: "GlossyBox Skincare: Deep Cleansing Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: 1500, image: image1 },
  { id: "p2", title: "Glow Recipe: Blueberry Bounce Gentle Cleanser", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: 2200, image: image2 },
  { id: "p3", title: "Anua: Heartleaf Pore Control Cleansing Oil", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: 2800, image: image3 },
  { id: "p4", title: "COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: 1800, image: image4 },
];

const Rating = ({ addReview, closePopup }) => {
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [opinion, setOpinion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = { 
            username, 
            email, 
            rating, 
            content: opinion,
            date: new Date().toISOString()
        };
        addReview(newReview);
        alert("Thank you for your feedback!");
        setUsername("");
        setEmail("");
        setRating(0);
        setOpinion("");
        closePopup();
    };

    return (
        <div className="rating_popup_overlay">
            <div className="rating_popup_content">
                <div className="wrapper">
                    <button className="close_button" onClick={closePopup}>×</button>
                    <h3>RATE US</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="star" onClick={() => setRating(num)}>
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill={num <= rating ? "#FFD700" : "none"}
                                        stroke="#FFD700"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="12 2 15 9 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 9" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <textarea
                            name="opinion"
                            cols={30}
                            rows={5}
                            placeholder="Your opinion..."
                            value={opinion}
                            onChange={(e) => setOpinion(e.target.value)}
                        ></textarea>

                        <div className="btn-group">
                            <button type="submit" className="btn-submit">SUBMIT</button>
                            <button type="button" className="btn-cancel" onClick={closePopup}>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        try {
          const allProductsRes = await axios.get('http://localhost:3000/api/products/getAllProducts');
          const foundProduct = allProductsRes.data.data.find(p => p.id === parseInt(id)) || 
                              allProductsRes.data.data.find(p => p.id === id);
          
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
          const cachedProduct = cachedProducts.find(p => p.id === parseInt(id) || p.id === id) ||
                              fallbackProducts.find(p => p.id === id);
          
          if (cachedProduct) {
            setProduct(cachedProduct);
          } else {
            throw new Error("Failed to load product data");
          }
        }
        
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
        setReviews(storedReviews);
        
      } catch (err) {
        setError(err.message || "Unable to load product details. Please try again later.");
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
      // Here you would typically call an API to add to cart
      setIsInCart(true);
      // For demo purposes, we'll just show the alert
      alert(`${product.title || product.name} added to cart`);
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
      <span key={i} style={{ color: i < numericRating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
  };

  const toggleRatingPopup = () => {
    setShowRatingPopup(!showRatingPopup);
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
    <div className="product_detail_page">
      <div className="product-detail">
        <div className="product-container">
          <div className="back-button" onClick={() => navigate("/catalog")}>
            <IonIcon icon={arrowBackOutline} />
          </div>
          
          <div className="product-image-container">
            <img 
              src={product.image || product.product_image || '/images/product-placeholder.jpg'} 
              alt={product.title || product.name} 
              className="product-image"
              onError={(e) => e.target.src = '/images/product-placeholder.jpg'}
            />
          </div>
          
          <div className="product-info">
            <h2>{product.title || product.name}</h2>
            <p className="about-product">{product.description}</p>
            
            <div className="product-meta">
              <div className="average-rating">
                {renderStars(averageRating)} ({averageRating.toFixed(1)})
              </div>
              
              {product.stock_quantity !== undefined && (
                <div className="stock-status">
                  {product.stock_quantity > 0 ? (
                    <span className="in-stock">In Stock ({product.stock_quantity} available)</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              )}
            </div>
            
            <h3 className="product-price">Rs. {product.price.toLocaleString()}</h3>
            
            <div className="product_detail_buttons">
              <button 
                className={`cart-button ${isInCart ? 'in-cart' : ''}`} 
                onClick={handleAddToCart}
              >
                {isInCart ? 'Added to Cart' : 'Add To Cart'}
              </button>
              
              <div className="authentication_button">
                <ProductAuthentication productId={product.id} />
              </div>
              
              <button className="review-button" onClick={toggleRatingPopup}>
                Review Product
              </button>
              
              <button 
                className={`wishlist-button ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlist}
              >
                <IonIcon icon={isWishlisted ? heart : heartOutline} />
                {isWishlisted ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        <div className="review_container">
          <div className="review_heading">
            <span>Customer Reviews</span>
            <h1>Client Says</h1>
            <div className="overall-rating">
              {renderStars(averageRating)}
              <span>{averageRating.toFixed(1)} out of 5 ({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="review_box_container">
            {reviews.length ? (
              reviews.map((review, index) => (
                <div key={index} className="review_box">
                  <div className="box_top">
                    <div className="user_name">
                      <h4>{review.username}</h4>
                      <time>{new Date(review.date).toLocaleDateString()}</time>
                    </div>
                    <div className="review-stars">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  {review.content && <p className="review-content">"{review.content}"</p>}
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews yet. Be the first to review this product!</p>
            )}     
          </div>
        </div>

        {showRatingPopup && (
          <Rating addReview={addReview} closePopup={toggleRatingPopup} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;