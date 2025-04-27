import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import axios from 'axios';
import "./productDescription.css";
import Rating from "./Rating";
import ProductAuthentication from "./ProductAuthentication";
import { useCart } from "./cartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);



  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        
        // Try to get from getAllProducts first
        const allProductsRes = await axios.get('http://localhost:3000/api/products/getAllProducts');
        const foundProduct = allProductsRes.data.data.find(p => 
          p.id === parseInt(id) || p.id === id || p.product_id === parseInt(id)
        );
        
        if (foundProduct) {
          setProduct(formatProductData(foundProduct));
        } else {
          // Fallback to getProduct if available
          try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.get(`http://localhost:3000/api/products/getProduct/${id}`);
              { headers }
            );
            setProduct(formatProductData(productRes.data.data));
          } catch (apiErr) {
            // Final fallback to localStorage cache
            const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
            const cachedProduct = cachedProducts.find(p => 
              p.id === parseInt(id) || p.id === id || p.product_id === parseInt(id)
            );
            
            if (cachedProduct) {
              setProduct(formatProductData(cachedProduct));
            } else {
              throw new Error("Product not found in any available source");
            }
          }
        }
        
        // Load reviews from localStorage
        const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
        setReviews(storedReviews);
        
      } catch (err) {
        setError(err.message || "Unable to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const formatProductData = (product) => {
    return {
      id: product.id || product.product_id || product._id,
      name: product.name || product.title || product.productName,
      description: product.description || product.desc || product.productDescription || "No description available",
      price: product.price || product.productPrice || 0,
      originalPrice: product.originalPrice || product.original_price || product.oldPrice || null,
      stock_quantity: product.stock_quantity || product.stock || product.quantity || product.inventory || 0,
      product_image: product.product_image || product.image || product.imgUrl || product.thumbnail || '/images/product-placeholder.jpg',
      product_features: Array.isArray(product.product_features) 
        ? product.product_features 
        : (product.features ? JSON.parse(product.features) : [])
    };
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
      setAverageRating(avg);
    }
  }, [reviews]);

  const handleWishlist = () => {
    if (!localStorage.getItem('token')) {
      alert("Please log in to add items to your wishlist");
      navigate('/login');
      return;
    }
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (!localStorage.getItem('token')) {
      alert("Please log in to add items to your cart");
      navigate('/login');
      return;
    }

    const cartItem = {
      title: product.name,
      price: product.price,
      image: product.product_image || '/images/product-placeholder.jpg',
      quantity: 1
    };

    const added = addToCart(cartItem);
    setIsInCart(added !== false);
    
    if (added === false) {
      alert("This item is already in your cart!");
    } else {
      alert(`${product.name} added to cart!`);
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
              src={product.product_image || '/images/product-placeholder.jpg'} 
              alt={product.name}
              onError={(e) => e.target.src = '/images/product-placeholder.jpg'}
            />
          </div>
        </div>

        <div className="product-info">
          <div className="price-section">
            <span className="current-price">Rs. {product.price?.toLocaleString()}</span>
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
            <p>{product.description || "No description available"}</p>
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
              disabled={product.stock_quantity <= 0}
            >
              <IonIcon icon={cartOutline} />
              {product.stock_quantity <= 0 ? 'Out of Stock' : isInCart ? 'Added to Cart' : 'Add to Cart'}
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


// import React, { useEffect, useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { IonIcon } from '@ionic/react';
// import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
// import axios from 'axios';
// import "./productDescription.css";
// import Rating from "./Rating";
// import ProductAuthentication from "./ProductAuthentication";
// import CartContext from './cartContext'

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useContext(CartContext);
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`http://localhost:3000/api/products/getProduct/${id}`);
        
//         if (response.data && response.data.data) {
//           setProduct({
//             ...response.data.data,
//             id: response.data.data.product_id,
//             name: response.data.data.title || response.data.data.name,
//             price: response.data.data.price,
//             description: response.data.data.description,
//             stock_quantity: response.data.data.stock_quantity,
//             condition: response.data.data.condition,
//             product_image: response.data.data.image || response.data.data.product_image,
//             product_features: Array.isArray(response.data.data.product_features) 
//               ? response.data.data.product_features 
//               : JSON.parse(response.data.data.product_features || '[]'),
//             category_name: response.data.data.category_name,
//             added_by: response.data.data.product_added_by
//           });

//           // Check if product is in cart
//           if (localStorage.getItem('token')) {
//             const cartResponse = await axios.get('http://localhost:3000/api/cart', {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//               }
//             });
//             const inCart = cartResponse.data.data.some(item => item.product_id === response.data.data.product_id);
//             setIsInCart(inCart);
//           }
//         } else {
//           throw new Error("Product not found");
//         }

//         const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
//         setReviews(storedReviews);
        
//       } catch (err) {
//         setError(err.response?.data?.message || "Unable to load product details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   useEffect(() => {
//     if (reviews.length > 0) {
//       const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//       setAverageRating(avg);
//     }
//   }, [reviews]);

//   const handleWishlist = async () => {
//     if (!localStorage.getItem('token')) {
//       alert("Please log in to add items to your wishlist");
//       navigate('/login');
//       return;
//     }

//     try {
//       if (isWishlisted) {
//         await axios.delete(`http://localhost:3000/api/wishlist/${product.id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//       } else {
//         await axios.post('http://localhost:3000/api/wishlist', {
//           product_id: product.id
//         }, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//       }
//       setIsWishlisted(!isWishlisted);
//     } catch (error) {
//       console.error("Wishlist error:", error);
//       alert(error.response?.data?.message || "Failed to update wishlist");
//     }
//   };

//   const handleAddToCart = async () => {
//     if (!localStorage.getItem('token')) {
//       alert("Please log in to add items to your cart");
//       navigate('/login');
//       return;
//     }
    
//     if (!product || isAddingToCart) return;

//     setIsAddingToCart(true);
//     try {
//       await addToCart({
//         id: product.id,
//         title: product.name,
//         price: product.price,
//         image: product.product_image,
//         quantity: 1
//       });
//       setIsInCart(true);
//     } catch (error) {
//       console.error("Add to cart error:", error);
//       alert(error.response?.data?.message || "Failed to add to cart");
//     } finally {
//       setIsAddingToCart(false);
//     }
//   };

//   const addReview = (newReview) => {
//     if (!localStorage.getItem('token')) {
//       alert("Please log in to leave a review");
//       return;
//     }
//     const updatedReviews = [...reviews, newReview];
//     setReviews(updatedReviews);
//     localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
//   };

//   const renderStars = (rating) => {
//     const numericRating = Math.round(parseFloat(rating));
//     return [...Array(5)].map((_, i) => (
//       <span key={i} className={`star ${i < numericRating ? 'filled' : ''}`}>
//         {i < numericRating ? '★' : '☆'}
//       </span>
//     ));
//   };

//   if (loading) return (
//     <div className="loading-state">
//       <div className="spinner">
//         <div className="spinner-inner"></div>
//       </div>
//       <p className="loading-text">Loading product details...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="error-state">
//       <div className="error-icon">⚠️</div>
//       <h3 className="error-title">Oops!</h3>
//       <p className="error-message">{error}</p>
//       <button onClick={() => navigate(-1)} className="btn-primary back-button">
//         <IonIcon icon={arrowBackOutline} className="button-icon" />
//         Back to Products
//       </button>
//     </div>
//   );

//   if (!product) return (
//     <div className="not-found">
//       <div className="not-found-illustration">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//           <path d="M12 2L3 7l9 5 9-5-9-5zM3 7l9 5 9-5M3 7v10l9 5 9-5V7" />
//           <path d="M12 22l9-5-9-5-9 5 9 5z" />
//         </svg>
//       </div>
//       <h2 className="not-found-title">Product Not Found</h2>
//       <p className="not-found-message">We couldn't find the product you're looking for.</p>
//       <button onClick={() => navigate('/')} className="btn-primary browse-button">
//         Browse Products
//       </button>
//     </div>
//   );

//   return (
//     <div className="product-detail-container">
//       <div className="product-header">
//         <button onClick={() => navigate(-1)} className="btn-back">
//           <IonIcon icon={arrowBackOutline} className="back-icon" />
//           <span className="back-text">Back</span>
//         </button>
//         <h1 className="product-title">{product.name}</h1>
//         <div className="product-category">
//           <span className="category-badge">{product.category_name}</span>
//           {product.added_by && (
//             <span className="seller-badge">Sold by {product.added_by}</span>
//           )}
//         </div>
//       </div>

//       <div className="product-content">
//         <div className="product-gallery">
//           <div className="main-image-container">
//             <img 
//               src={product.product_image || '/images/product-placeholder.jpg'} 
//               alt={product.name}
//               className="main-image"
//               onError={(e) => e.target.src = '/images/product-placeholder.jpg'}
//             />
//           </div>
//         </div>

//         <div className="product-info">
//           <div className="price-section">
//             <span className="current-price">Rs. {product.price.toLocaleString()}</span>
//           </div>

//           <div className={`stock-status ${product.stock_quantity > 0 ? 'in-stock' : 'out-of-stock'}`}>
//             {product.stock_quantity > 0 ? (
//               <>
//                 <span className="status-indicator"></span>
//                 <span>In Stock ({product.stock_quantity} available)</span>
//               </>
//             ) : (
//               <>
//                 <span className="status-indicator"></span>
//                 <span>Out of Stock</span>
//               </>
//             )}
//           </div>

//           <div className="product-condition">
//             <h4 className="condition-title">Condition</h4>
//             <p className="condition-value">{product.condition}</p>
//           </div>

//           <div className="product-description">
//             <h3 className="section-title">Description</h3>
//             <p className="description-text">{product.description}</p>
//           </div>

//           {product.product_features?.length > 0 && (
//             <div className="product-features">
//               <h3 className="section-title">Features</h3>
//               <ul className="features-list">
//                 {product.product_features.map((feature, index) => (
//                   <li key={index} className="feature-item">
//                     <span className="feature-bullet">•</span>
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="action-buttons">
//             <button 
//               className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
//               onClick={handleAddToCart}
//               disabled={product.stock_quantity <= 0 || isInCart || isAddingToCart}
//             >
//               <IonIcon icon={cartOutline} className="button-icon" />
//               <span className="button-text">
//                 {product.stock_quantity <= 0 
//                   ? 'Out of Stock' 
//                   : isAddingToCart 
//                     ? 'Adding...' 
//                     : isInCart 
//                       ? 'Added to Cart' 
//                       : 'Add to Cart'
//                 }
//               </span>
//             </button>
//             <button 
//               className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
//               onClick={handleWishlist}
//             >
//               <IonIcon icon={isWishlisted ? heart : heartOutline} className="button-icon" />
//               <span className="button-text">
//                 {isWishlisted ? 'Saved' : 'Save for Later'}
//               </span>
//             </button>
//           </div>

//           <ProductAuthentication productId={id} />
//         </div>
//       </div>

//       <section id="reviews" className="reviews-section">
//         <div className="section-header">
//           <h2 className="section-title">Customer Reviews</h2>
//           <div className="overall-rating">
//             {renderStars(averageRating)}
//             <span className="average-rating">{averageRating.toFixed(1)} out of 5</span>
//           </div>
//         </div>

//         <Rating addReview={addReview} />

//         {reviews.length > 0 ? (
//           <div className="reviews-list">
//             {reviews.map((review, index) => (
//               <div key={index} className="review-card">
//                 <div className="reviewer-info">
//                   <div className="avatar" style={{ backgroundColor: `hsl(${index * 137.5 % 360}, 70%, 75%)` }}>
//                     {review.username.charAt(0).toUpperCase()}
//                   </div>
//                   <div className="reviewer-details">
//                     <h4 className="reviewer-name">{review.username}</h4>
//                     <time className="review-date">{new Date(review.date).toLocaleDateString()}</time>
//                   </div>
//                 </div>
//                 <div className="review-rating">{renderStars(review.rating)}</div>
//                 {review.content && (
//                   <p className="review-content">
//                     <span className="quote-icon">"</span>
//                     {review.content}
//                     <span className="quote-icon">"</span>
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="no-reviews">
//             <div className="empty-reviews-illustration">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//                 <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
//               </svg>
//             </div>
//             <p className="empty-reviews-text">No reviews yet. Be the first to review this product!</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProductDetail;