// import React, { useEffect, useState } from 'react';
// import { useParams, useSearchParams } from 'react-router-dom';
// import axios from 'axios';
// import Navbar from '../Navbar/navbar1';

// const CategoryCatalog = ({ isRental = false }) => {
//     const { slug } = useParams();
//     const [searchParams] = useSearchParams();
//     const [products, setProducts] = useState([]);
//     const [category, setCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCategoryProducts = async () => {
//             try {
//                 setLoading(true);
//                 const condition = searchParams.get('condition');
                
//                 // Determine the correct API endpoint based on isRental prop
//                 const baseUrl = isRental ? '/api/rental-category' : '/api/category';
//                 const url = `${baseUrl}/${slug}${condition ? `?condition=${condition}` : ''}`;
//                 const response = await axios.get(
//                     `http://localhost:3000/api/categories/<span class="math-inline">\{slug\}?condition\=</span>{condition}` // Your backend endpoint
//                   );
                
//                 // const response = await axios.get(url);
//                 console.log(response.data);
//                 setCategory(response.data.category);
//                 setProducts(response.data.products);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message || "Failed to fetch products");
//                 setLoading(false);
//             }
//         };

//         fetchCategoryProducts();
//     }, [slug, searchParams, isRental]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error}</div>;
//     if (!category) return <div>Category not found</div>;

//     return (
//         <div>
//             <h1>{category.category_name} {isRental ? 'Rental' : ''} Products</h1>
//             {searchParams.get('condition') && (
//                 <h2>Condition: {searchParams.get('condition')}</h2>
//             )}
//             <div className="products-grid">
//                 {products.map(product => (
//                     <div key={product.product_id} className="product-card">
//                         <img src={product.product_image} alt={product.name} />
//                         <h3>{product.name}</h3>
//                         <p>Rs. {product.price}</p>
//                         <p>Condition: {product.condition}</p>
//                         {isRental && (
//                             <p>Rental Available: {product.rental_available ? 'Yes' : 'No'}</p>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default CategoryCatalog;

// import React, { useEffect, useState } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import { useCart } from './cartContext';
// import './catalog.css'; // Reuse the same CSS
// import SlidingCart from './slidingCart';
// import Navbar from '../Navbar/navbar1';
// import axios from 'axios';

// const CategoryCatalog = () => {
//   const { addToCart } = useCart();
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const condition = searchParams.get('condition') || 'new';
  
//   const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categoryName, setCategoryName] = useState('');
//   const [isRental, setIsRental] = useState(false);

//   // Determine if we're in rental mode based on URL path
//   useEffect(() => {
//     setIsRental(location.pathname.includes('rental-category'));
//   }, [location.pathname]);

//   // Fetch category products from database
//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       try {
//         setLoading(true);
//         console.log(`Fetching ${isRental ? 'rental' : ''} products for category: ${slug}, condition: ${condition}`);
        
//         // Determine which API endpoint to use based on rental mode
//         const endpoint = isRental 
//           ? `http://localhost:3000/api/categories/${slug}/rental?condition=${condition}`
//           : `http://localhost:3000/api/categories/${slug}?condition=${condition}`;
        
//         const response = await axios.get(endpoint);
        
//         console.log("Response received:", response.data);
        
//         if (response.data && response.data.data) {
//           const data = response.data.data;
//           setProducts(data.products || []);
//           setCategoryName(data.category?.category_name || slug);
//         } else {
//           console.error("Unexpected response format:", response.data);
//           setError("Invalid data format received from server");
//         }
        
//         setLoading(false);
//       } catch (err) {
//         console.error(`Error fetching ${isRental ? 'rental' : ''} category products:`, err);
//         setError(err.message || "Failed to fetch products");
//         setLoading(false);
//       }
//     };

//     if (slug && condition) {
//       fetchCategoryProducts();
//     }
//   }, [slug, condition, isRental]);

//   // Store products in localStorage for product detail page
//   useEffect(() => {
//     if (products.length > 0) {
//       localStorage.setItem('cachedProducts', JSON.stringify(products));
//     }
//   }, [products]);

//   const addProductToCart = (product) => {
//     addToCart(product);
//     setSlidingCartOpen(true);
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
//     // First try to get rating from local storage
//     const storedRating = localStorage.getItem(`rating_${product.id}`);
//     if (storedRating) return JSON.parse(storedRating);
    
//     // Otherwise use the rating from the API response
//     return product.avg_rating ? parseFloat(product.avg_rating) : 0;
//   };

//   // Loading, error, and empty states
//   if (loading) return <div className="loading">Loading products...</div>;
//   if (error) return <div className="error">Error: {error}</div>;
//   if (!products || products.length === 0) return (
//     <main>
//       <Navbar />
//       <div className="catalog">
//         <div className="catalog_container">
//           <h2 className="category-title">
//             {categoryName} - {condition === 'new' ? 'New' : 'Second Hand'} 
//             {isRental ? ' Rental' : ''} Products
//           </h2>
//           <div className="no-products">No products available in this category</div>
//         </div>
//       </div>
//     </main>
//   );

//   return (
//     <main>
//       <Navbar />
//       <div className="catalog">
//         <div className="catalog_container">
//           <h2 className="category-title">
//             {categoryName} - {condition === 'new' ? 'New' : 'Second Hand'} 
//             {isRental ? ' Rental' : ''} Products
//           </h2>
          
//           {/* Toggle button for second hand / new products */}
//           <button 
//             className='secondhand_button' 
//             onClick={() => {
//               const newCondition = condition === 'new' ? 'second-hand' : 'new';
//               navigate(`${location.pathname}?condition=${newCondition}`);
//             }}
//           >
//             Switch to {condition === 'new' ? 'Second Hand' : 'New'} Products
//           </button>
          
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
//                       {isRental && <p>/{product.rental_period || 'day'}</p>}
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
//                       <button className='add_to_cart_button' onClick={() => addProductToCart(product)}>
//                         {isRental ? 'RENT NOW' : 'BUY NOW'}
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

// export default CategoryCatalog;

import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Rating, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';
import Navbar from '../Navbar/navbar1';
import { useNavigate } from 'react-router-dom';
import { useCart } from './cartContext';
import './catalog.css';
import SlidingCart from './slidingCart';


const CategoryCatalog = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
    const { slug } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);  
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categoryData, setCategoryData] = useState([]);



//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const response = await axios.get(`http://localhost:3000/api/categories/getCategory/${slug}`);
//         console.log(response.data);
//         setCategoryData(response.data.data);
//       } catch (err) {
//         console.error('Error fetching category products:', err);
//         setError(err.response?.data?.message || 'Failed to fetch products. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategoryProducts();
//   }, [slug]);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching category...");
        // Simplified request - no authentication headers
        console.log(`Fetching products for category: ${slug}`);
        const response = await axios.get(`http://localhost:3000/api/categories/getCategory/${slug}`);
        
        console.log("Category Catalog Response received:", response.data);
        console.log("1Current products state:", categoryData)
        
        // Check if response has data property
        if (response.data && (response.data.data || Array.isArray(response.data))) {
          // Handle both possible response formats
          const categoriesData = Array.isArray(response.data) ? response.data : 
                              (response.data.data ? response.data.data : []);
          
            setCategoryData(categoriesData);
          console.log("2Current products state:", categoryData)
          // console.log("The products are:", products);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Invalid data format received from server");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category:", err);
        setError(err.message || "Failed to fetch the category");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  useEffect(() => {
          console.log("3Current products state:", categoryData);
        }, [categoryData]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/categories/getCategory/${slug}`);
//         const categoryData = response.data.data;
        
//         // Store products in localStorage for later use in product detail page
//         localStorage.setItem('cachedProducts', JSON.stringify(categoryData));
        
//         setCategoryData(categoryData); // Your existing state update
//       } catch (error) {
//         console.error('Error fetching category:', error);
//       }
//     };
    
//     fetchProducts();
//   }, [slug]);


const addProductToCart = (product) => {
    addToCart(product);
    setSlidingCartOpen(true);
  };

  const navigateToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  // const navigateToSecondHand = () => {
  //   navigate(`/product/${productId}`);
  // }

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

  return (
    <main>
    <Navbar />
    <div className="catalog">
      <div className="catalog_container">
        <button className='secondhand_button' onClick={() => navigate('/secondhandCatalog')}>Second hand products</button>
        <div className="products">
          {categoryData.map((product) => {
            const averageRating = getProductRating(product);

            return (
              <div className="product_card" key={product.id}>
                <div className="product_header">
                  <div className="product_title" onClick={() => navigateToProductDetail(product.id)}>
                    <p>{product.title}</p>
                  </div>
                  <div className="product_price">
                    <b>Rs.{product.price}</b>
                    {/* <p>{product.condition}</p> */}
                    {/* <p>{product.rental?"TRUE": "False"}</p> */}
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

export default CategoryCatalog;