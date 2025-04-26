// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from './cartContext'; // Adjust path as per your project structure
// import './catalog.css';
// import SlidingCart from './slidingCart'; // Import SlidingCart component
// import Navbar from '../Navbar/navbar1';

// // Import images
// import image1 from '../images/chip.png';
// import image2 from '../images/gaming.png';
// import image3 from '../images/intelcorei7.png';
// import image4 from '../images/keyboard.png';

// const Catalog = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);

//   const products = [
//     {
//       id: 'p1',
//       title: 'GlossyBox Skincare: Deep Cleansing Cream',
//       price: '1500',
//       image: image1,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p2',
//       title: 'Glow Recipe: Blueberry Bounce Gentle Cleanser',
//       price: '2200',
//       image: image2,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p3',
//       title: 'Anua: Heartleaf Pore Control Cleansing Oil',
//       price: '2800',
//       image: image3,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p4',
//       title: 'COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)',
//       price: '1800',
//       image: image4,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p5',
//       title: 'Summer Fridays: Cloud Dew Oil-Free Gel Cream',
//       price: '3000',
//       image: image4,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p6',
//       title: 'Summer Fridays: Rich Cushion Cream, Ultra-Plumping ',
//       price: '3500',
//       image: image3,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p7',
//       title: 'Glow Recipe: Watermelon Glow Pink Juice Moisturizer',
//       price: '2800',
//       image: image2,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k Sold'
//     },
//     {
//       id: 'p8',
//       title: 'Glow Recipe: Watermelon Glow Niacinamide Dew Drops',
//       price: '3500',
//       image: image1,
//       avg_rating: '4 star',
//       people_rated: '452',
//       avg_sale: '2k'
//     },
//   ]

//   const addProductToCart = (product) => {
//     addToCart(product);
//     setSlidingCartOpen(true); // Open sliding cart after adding product
//   };

//   const navigateToProductDetail = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   // Helper function to generate star icons
//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//         <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
//     ));
//   };

//   // Fetch ratings from localStorage
//   const getProductRating = (productId) => {
//     const storedRating = localStorage.getItem(`rating_${productId}`);
//     return storedRating ? JSON.parse(storedRating) : 0; 
//   };

//   return (
//     <main>
//       <Navbar />
//       <div className="catalog">
//         <div className="catalog_container">
//           <div className="products">
//             {products.map((product) => {
//               const averageRating = getProductRating(product.id);

//               return (
//               <div className="product_card" key={product.id}>

//                 <div className="product_header">
//                 <div className="product_title" onClick={() => navigateToProductDetail(product.id)}>
//                   <p>{product.title}</p>
//                 </div>
//                 <div className="product_price">
//                   <b>Rs.{product.price}</b>
//                 </div>
//                 </div>

//                 <div className="product_body">
//                 <div className="pro_image" onClick={() => navigateToProductDetail(product.id)}>
//                   <img src={product.image} alt={product.title} />
//                 </div>
//                 </div>

//                 <div className="button">
//                   <div className="show_rating">
//                       <div className="catalog_review_stars">{renderStars(Math.round(averageRating))}</div>
//                       <p>({averageRating.toFixed(1)})</p>
//                   </div>
//                   {/* <button className="add_to_cart_button" onClick={() => addProductToCart(product)}> <img src={image1} alt={product.title} /> </button> */}
//                   <div className="add_to_cart">
//                     <button className='add_to_cart_button' onClick={() => addProductToCart(product)}>BUY NOW</button>
//                   </div>
//                 </div>
//               </div>
//               );
//               })}
//           </div>
//         </div>
//       </div>
//       {/* Sliding Cart Component */}
//       <SlidingCart
//         isOpen={isSlidingCartOpen}
//         onClose={() => setSlidingCartOpen(false)}
//         onViewFullCart={() => navigate('/cart')}
//       />
//     </main>
//   );
// };

// export default Catalog;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';
import './catalog.css';
import SlidingCart from './slidingCart';
import Navbar from '../Navbar/navbar1';
import axios from 'axios';

const Catalog = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        // Simplified request - no authentication headers
        const response = await axios.get("http://localhost:3000/api/products/getAllProducts");
        
        console.log("Response received:", response.data);
        
        // Check if response has data property
        if (response.data && (response.data.data || Array.isArray(response.data))) {
          // Handle both possible response formats
          const productsData = Array.isArray(response.data) ? response.data : 
                              (response.data.data ? response.data.data : []);
          
          setProducts(productsData);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Invalid data format received from server");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add this to your product listing page where you get all products
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products/getAllProducts');
      const products = response.data.data;
      
      // Store products in localStorage for later use in product detail page
      localStorage.setItem('cachedProducts', JSON.stringify(products));
      
      setProducts(products); // Your existing state update
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  fetchProducts();
}, []);

  const addProductToCart = (product) => {
    addToCart(product);
    setSlidingCartOpen(true);
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const renderStars = (rating) => {
    const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating || 0;
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < numericRating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
  };

  const getProductRating = (product) => {
    // First try to get rating from local storage
    const storedRating = localStorage.getItem(`rating_${product.id}`);
    if (storedRating) return JSON.parse(storedRating);
    
    // Otherwise use the rating from the API response
    return product.avg_rating ? parseFloat(product.avg_rating) : 0;
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!products || products.length === 0) return <div className="no-products">No products available</div>;

  return (
    <main>
      <Navbar />
      <div className="catalog">
        <div className="catalog_container">
          <div className="products">
            {products.map((product) => {
              const averageRating = getProductRating(product);

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
                      <div className="catalog_review_stars">
                        {renderStars(averageRating)}
                      </div>
                      <p>({typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'})</p>
                    </div>
                    <div className="add_to_cart">
                      <button className='add_to_cart_button' onClick={() => addProductToCart(product)}>
                        BUY NOW
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

export default Catalog;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from './cartContext';
// import './catalog.css';
// import SlidingCart from './slidingCart';
// import Navbar from '../Navbar/navbar1';
// import axios from 'axios';

// const Catalog = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:3000/api/products/getAllProducts", {
//           withCredentials: true // Include for any authenticated endpoints
//         });
        
//         const productsData = Array.isArray(response.data) 
//           ? response.data 
//           : (response.data.data || []);
        
//         setProducts(productsData);
//         localStorage.setItem('cachedProducts', JSON.stringify(productsData));
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError(err.message || "Failed to fetch products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const addProductToCart = async (product) => {
//     try {
//       const success = await addToCart(product);
//       if (success) {
//         setSlidingCartOpen(true);
//         // Optional: Show success message
//         alert('Product added to cart!');
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert('Failed to add item to cart. Please try again.');
//     }
//   };

//   const navigateToProductDetail = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const renderStars = (rating) => {
//     const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating || 0;
//     return [...Array(5)].map((_, i) => (
//       <span key={i} style={{ color: i < numericRating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
//     ));
//   };

//   const getProductRating = (product) => {
//     const storedRating = localStorage.getItem(`rating_${product.id}`);
//     if (storedRating) return JSON.parse(storedRating);
//     return product.avg_rating ? parseFloat(product.avg_rating) : 0;
//   };

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;
//   if (!products || products.length === 0) return <div className="no-products">No products available</div>;

//   return (
//     <main>
//       <Navbar />
//       <div className="catalog">
//         <div className="catalog_container">
//           <div className="products">
//             {products.map((product) => {
//               const averageRating = getProductRating(product);

//               return (
//                 <div className="product_card" key={product.id}>
//                   <div className="product_header">
//                     <div className="product_title" onClick={() => navigateToProductDetail(product.id)}>
//                       <p>{product.title}</p>
//                     </div>
//                     <div className="product_price">
//                       <b>Rs.{product.price}</b>
//                     </div>
//                   </div>

//                   <div className="product_body">
//                     <div className="pro_image" onClick={() => navigateToProductDetail(product.id)}>
//                       <img src={product.image} alt={product.title} />
//                     </div>
//                   </div>

//                   <div className="button">
//                     <div className="show_rating">
//                       <div className="catalog_review_stars">
//                         {renderStars(averageRating)}
//                       </div>
//                       <p>({typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'})</p>
//                     </div>
//                     <div className="add_to_cart">
//                       <button 
//                         className='add_to_cart_button' 
//                         onClick={() => addProductToCart(product)}
//                       >
//                         BUY NOW
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <SlidingCart
//         isOpen={isSlidingCartOpen}
//         onClose={() => setSlidingCartOpen(false)}
//         onViewFullCart={() => navigate('/cart')}
//       />
//     </main>
//   );
// };

// export default Catalog;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from './cartContext';
// import './catalog.css';
// import SlidingCart from './slidingCart';
// import Navbar from '../Navbar/navbar1';
// import axios from 'axios';

// const Catalog = () => {
//   const { addToCart, fetchCartItems, isAuthenticated } = useCart();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(null);
//   const [addingToCart, setAddingToCart] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         setAuthError(null);
        
//         const response = await axios.get("http://localhost:3000/api/products/getAllProducts", {
//           withCredentials: true
//         });
        
//         const productsData = Array.isArray(response.data) 
//           ? response.data 
//           : (response.data.data || []);
        
//         // Ensure each product has consistent properties
//         const formattedProducts = productsData.map(product => ({
//           ...product,
//           price: parseFloat(product.price),
//           id: product.id || product.product_id,
//           product_id: product.id || product.product_id,
//         }));
        
//         setProducts(formattedProducts);
//         console.log('Products fetched successfully:', formattedProducts);
        
//         // Cache products for offline use
//         localStorage.setItem('cachedProducts', JSON.stringify(formattedProducts));
//       } catch (err) {
//         console.error("Error fetching products:", err);
        
//         // Try to load from cache if fetch fails
//         const cachedProducts = localStorage.getItem('cachedProducts');
//         if (cachedProducts) {
//           setProducts(JSON.parse(cachedProducts));
//         } else {
//           if (err.response?.status === 401) {
//             setAuthError('Please login to view products');
//           } else {
//             setError(err.message || "Failed to fetch products");
//           }
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
    
//     // Make sure cart is refreshed when component mounts
//     fetchCartItems();
//   }, [fetchCartItems]);

//   const addProductToCart = async (product) => {
//     try {
//       setAuthError(null);
//       setAddingToCart(prev => ({ ...prev, [product.id]: true }));
      
//       // Enhanced product object to ensure it has all necessary properties
//       const enhancedProduct = {
//         ...product,
//         id: product.id,
//         product_id: product.id,
//         price: parseFloat(product.price),
//         image: product.image || '',
//         title: product.title || 'Product'
//       };
      
//       console.log('Adding product to cart:', enhancedProduct);
      
//       const success = await addToCart(enhancedProduct);
      
//       if (!success && !isAuthenticated) {
//         // If local cart was used, don't redirect automatically
//         // Instead, just show the cart or a message
//         console.log('Added to local cart');
//       }
      
//       // We don't redirect here - the addToCart in CartContext will handle opening the sliding cart
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     } finally {
//       setAddingToCart(prev => ({ ...prev, [product.id]: false }));
//     }
//   };

//   const navigateToProductDetail = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const renderStars = (rating) => {
//     const numericRating = typeof rating === 'string' ? parseFloat(rating) : rating || 0;
//     return [...Array(5)].map((_, i) => (
//       <span key={i} style={{ color: i < numericRating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
//     ));
//   };

//   const getProductRating = (product) => {
//     const storedRating = localStorage.getItem(`rating_${product.id}`);
//     if (storedRating) return JSON.parse(storedRating);
//     return product.avg_rating ? parseFloat(product.avg_rating) : 0;
//   };

//   const handleViewFullCart = () => {
//     navigate('/cart');
//   };

//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;
//   if (authError && products.length === 0) return (
//     <div className="auth-error">
//       {authError}
//       <button onClick={() => navigate('/sign')} className="login-redirect-button">
//         Go to Sign In
//       </button>
//     </div>
//   );
//   if (!products || products.length === 0) return <div className="no-products">No products available</div>;

//   return (
//     <main>
//       <Navbar />
//       <div className="catalog">
//         <div className="catalog_container">
//           {!isAuthenticated && (
//             <div className="guest-mode-notice">
//               <p>You're browsing as a guest. Items added to cart will be stored locally.</p>
//               <button onClick={() => navigate('/sign')} className="sign-in-button">
//                 Sign in for a better experience
//               </button>
//             </div>
//           )}
//           <div className="products">
//             {products.map((product) => {
//               const averageRating = getProductRating(product);
//               const isAddingToCart = addingToCart[product.id];

//               return (
//                 <div className="product_card" key={product.id}>
//                   <div className="product_header">
//                     <div className="product_title" onClick={() => navigateToProductDetail(product.id)}>
//                       <p>{product.title}</p>
//                     </div>
//                     <div className="product_price">
//                       <b>Rs.{product.price}</b>
//                     </div>
//                   </div>

//                   <div className="product_body">
//                     <div className="pro_image" onClick={() => navigateToProductDetail(product.id)}>
//                       <img src={product.image} alt={product.title} />
//                     </div>
//                   </div>

//                   <div className="button">
//                     <div className="show_rating">
//                       <div className="catalog_review_stars">
//                         {renderStars(averageRating)}
//                       </div>
//                       <p>({typeof averageRating === 'number' ? averageRating.toFixed(1) : '0.0'})</p>
//                     </div>
//                     <div className="add_to_cart">
//                       <button 
//                         className='add_to_cart_button' 
//                         onClick={() => addProductToCart(product)}
//                         disabled={isAddingToCart}
//                       >
//                         {isAddingToCart ? 'ADDING...' : 'BUY NOW'}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       <SlidingCart onViewFullCart={handleViewFullCart} />
//     </main>
//   );
// };

// export default Catalog;