// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { IonIcon } from '@ionic/react';
// import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
// import axios from 'axios';
// import "./productDescription.css";
// import Rating from "./Rating";
// import ProductAuthentication from "./ProductAuthentication";
// import { useCart } from "./cartContext";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { addToCart } = useCart();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);



//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         setLoading(true);
        
//         // Try to get from getAllProducts first
//         const allProductsRes = await axios.get('http://localhost:3000/api/products/getAllProducts');
//         const foundProduct = allProductsRes.data.data.find(p => 
//           p.id === parseInt(id) || p.id === id || p.product_id === parseInt(id)
//         );
        
//         if (foundProduct) {
//           setProduct(formatProductData(foundProduct));
//         } else {
//           // Fallback to getProduct if available
//           try {
//             const token = localStorage.getItem('token');
//             const headers = token ? { Authorization: `Bearer ${token}` } : {};
//             const response = await axios.get(`http://localhost:3000/api/products/getProduct/${id}`);
//               { headers }
//             );
//             setProduct(formatProductData(productRes.data.data));
//           } catch (apiErr) {
//             // Final fallback to localStorage cache
//             const cachedProducts = JSON.parse(localStorage.getItem('cachedProducts') || '[]');
//             const cachedProduct = cachedProducts.find(p => 
//               p.id === parseInt(id) || p.id === id || p.product_id === parseInt(id)
//             );
            
//             if (cachedProduct) {
//               setProduct(formatProductData(cachedProduct));
//             } else {
//               throw new Error("Product not found in any available source");
//             }
//           }
//         }
        
//         // Load reviews from localStorage
//         const storedReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
//         setReviews(storedReviews);
        
//       } catch (err) {
//         setError(err.message || "Unable to load product details. Please try again later.");
//         setError(err.message || "Unable to load product details. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   const formatProductData = (product) => {
//     return {
//       id: product.id || product.product_id || product._id,
//       name: product.name || product.title || product.productName,
//       description: product.description || product.desc || product.productDescription || "No description available",
//       price: product.price || product.productPrice || 0,
//       originalPrice: product.originalPrice || product.original_price || product.oldPrice || null,
//       stock_quantity: product.stock_quantity || product.stock || product.quantity || product.inventory || 0,
//       product_image: product.product_image || product.image || product.imgUrl || product.thumbnail || '/images/product-placeholder.jpg',
//       product_features: Array.isArray(product.product_features) 
//         ? product.product_features 
//         : (product.features ? JSON.parse(product.features) : [])
//     };
//   };

//   useEffect(() => {
//     if (reviews.length > 0) {
//       const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
//       setAverageRating(avg);
//     }
//   }, [reviews]);

//   const handleWishlist = () => {
//     if (!localStorage.getItem('token')) {
//       alert("Please log in to add items to your wishlist");
//       navigate('/login');
//       return;
//     }
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleAddToCart = () => {
//     if (!product) return;
    
//     if (!localStorage.getItem('token')) {
//       alert("Please log in to add items to your cart");
//       navigate('/login');
//       return;
//     }

//     const cartItem = {
//       title: product.name,
//       price: product.price,
//       image: product.product_image || '/images/product-placeholder.jpg',
//       quantity: 1
//     };

//     const added = addToCart(cartItem);
//     setIsInCart(added !== false);
    
//     if (added === false) {
//       alert("This item is already in your cart!");
//     } else {
//       alert(`${product.name} added to cart!`);
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
//       <span key={i} className={`star ${i < numericRating ? 'filled' : ''}`}>★</span>
//     ));
//   };

//   if (loading) return (
//     <div className="loading-state">
//       <div className="spinner"></div>
//       <p>Loading product details...</p>
//     </div>
//   );

//   if (error) return (
//     <div className="error-state">
//       <div className="error-icon">!</div>
//       <p>{error}</p>
//       <button onClick={() => navigate(-1)} className="btn-primary">
//         <IonIcon icon={arrowBackOutline} />
//         Back to Products
//       </button>
//     </div>
//   );

//   if (!product) return (
//     <div className="not-found">
//       <h2>Product Not Found</h2>
//       <p>We couldn't find the product you're looking for.</p>
//       <button onClick={() => navigate('/')} className="btn-primary">
//         Browse Products
//       </button>
//     </div>
//   );

//   return (
//     <div className="product-detail-container">
//       <div className="product-header">
//         <button onClick={() => navigate(-1)} className="btn-back">
//           <IonIcon icon={arrowBackOutline} />
//           Back
//         </button>
//         <h1 className="product-title">{product.name}</h1>
//       </div>

//       <div className="product-content">
//         <div className="product-gallery">
//           <div className="main-image">
//             <img 
//               src={product.product_image || '/images/product-placeholder.jpg'} 
//               alt={product.name}
//               onError={(e) => e.target.src = '/images/product-placeholder.jpg'}
//             />
//           </div>
//         </div>

//         <div className="product-info">
//           <div className="price-section">
//             <span className="current-price">Rs. {product.price?.toLocaleString()}</span>
//             {product.originalPrice && (
//               <span className="original-price">Rs. {product.originalPrice.toLocaleString()}</span>
//             )}
//           </div>

//           <div className="rating-section">
//             {renderStars(averageRating)}
//             <span className="rating-count">({reviews.length} reviews)</span>
//             <a href="#reviews" className="review-link">See all reviews</a>
//           </div>

//           <div className="stock-status">
//             {product.stock_quantity > 0 ? (
//               <span className="in-stock">In Stock ({product.stock_quantity} available)</span>
//             ) : (
//               <span className="out-of-stock">Out of Stock</span>
//             )}
//           </div>

//           <div className="product-description">
//             <h3>Description</h3>
//             <p>{product.description || "No description available"}</p>
//           </div>

//           {product.product_features?.length > 0 && (
//             <div className="product-features">
//               <h3>Features</h3>
//               <ul>
//                 {product.product_features.map((feature, index) => (
//                   <li key={index}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           <div className="action-buttons">
//             <button 
//               className={`btn-cart ${isInCart ? 'in-cart' : ''}`}
//               onClick={handleAddToCart}
//               disabled={product.stock_quantity <= 0}
//             >
//               <IonIcon icon={cartOutline} />
//               {product.stock_quantity <= 0 ? 'Out of Stock' : isInCart ? 'Added to Cart' : 'Add to Cart'}
//             </button>
//             <button 
//               className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
//               onClick={handleWishlist}
//             >
//               <IonIcon icon={isWishlisted ? heart : heartOutline} />
//               {isWishlisted ? 'Saved' : 'Save for Later'}
//             </button>
//           </div>

//           <ProductAuthentication productId={id} />
//         </div>
//       </div>

//       <section id="reviews" className="reviews-section">
//         <div className="section-header">
//           <h2>Customer Reviews</h2>
//           <div className="overall-rating">
//             {renderStars(averageRating)}
//             <span>{averageRating.toFixed(1)} out of 5</span>
//           </div>
//         </div>

//         <Rating addReview={addReview} />

//         {reviews.length > 0 ? (
//           <div className="reviews-list">
//             {reviews.map((review, index) => (
//               <div key={index} className="review-card">
//                 <div className="reviewer-info">
//                   <div className="avatar">{review.username.charAt(0).toUpperCase()}</div>
//                   <div>
//                     <h4>{review.username}</h4>
//                     <time>{new Date(review.date).toLocaleDateString()}</time>
//                   </div>
//                 </div>
//                 <div className="review-rating">{renderStars(review.rating)}</div>
//                 {review.content && <p className="review-content">"{review.content}"</p>}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="no-reviews">
//             <p>No reviews yet. Be the first to review this product!</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import axios from 'axios';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import axios from 'axios';
import "./productDescription.css";
import Rating from "./Rating";
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
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/products/getProduct/${id}`);
                
                console.log("API Response:", response.data); // Debug log
                
                if (response.data) {
                    const productData = response.data.data || response.data;
                    setProduct({
                        id: productData.id || productData.product_id,
                        name: productData.title || productData.name,
                        description: productData.description,
                        price: productData.price,
                        condition: productData.condition,
                        stock_quantity: productData.stock_quantity,
                        product_image: productData.image || productData.product_image,
                        product_features: Array.isArray(productData.product_features) 
                            ? productData.product_features 
                            : (productData.features ? JSON.parse(productData.features) : []),
                        category_name: productData.category_name,
                        seller_name: productData.seller_name
                    });
                } else {
                    throw new Error("Invalid product data format");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.response?.data?.message || "Failed to load product details");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (reviews.length > 0) {
            const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
            setAverageRating(avg);
        }
    }, [reviews]);

    const handleAddToCart = () => {
        if (!product) return;
        
        const cartItem = {
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.product_image || '/images/product-placeholder.jpg',
            quantity: 1
        };
        
        addToCart(cartItem);
        setIsInCart(true);
        alert(`${product.name} added to cart!`);
    };

    const handleWishlist = () => {
        if (!localStorage.getItem('token')) {
            alert("Please log in to add items to your wishlist");
            navigate('/login');
            return;
        }
        setIsWishlisted(!isWishlisted);
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
                {product.category_name && (
                    <span className="product-category">{product.category_name}</span>
                )}
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

                    {product.seller_name && (
                        <div className="seller-info">
                            <span>Sold by: {product.seller_name}</span>
                        </div>
                    )}

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