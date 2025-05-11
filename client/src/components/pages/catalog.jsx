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

// Create consistent axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

const Catalog = () => {
  const { addToCart, error: cartError, loading: cartLoading } = useCart();
  const navigate = useNavigate();
  const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null); // Track which product is being added

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await api.get("/products/getAllProducts");
        
        console.log("Products Catalog Response received:", response.data);
        // console.log("1Current products state:", products)
        
        // Check if response has data property
        if (response.data && (response.data.data || Array.isArray(response.data))) {
          // Handle both possible response formats
          const productsData = Array.isArray(response.data) ? response.data : 
                              (response.data.data ? response.data.data : []);
          
          setProducts(productsData);
          
          // Store products in localStorage for later use in product detail page
          localStorage.setItem('cachedProducts', JSON.stringify(productsData));
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

  const addProductToCart = async (product) => {
    console.log("Adding product to cart:", product);
    const productId = product.id || product.product_id;
    
    try {
      setAddingToCart(productId); // Set the product being added
      const success = await addToCart(product);
      
      if (success) {
        setSlidingCartOpen(true);
      } else {
        // Show a more user-friendly message
        alert(cartError || "Failed to add product to cart. Please try again.");
      }
    } catch (err) {
      console.error("Error in addProductToCart:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setAddingToCart(null); // Clear the adding state
    }
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
    const storedRating = localStorage.getItem(`rating_${product.id || product.product_id}`);
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
          <button className='secondhand_button' onClick={() => navigate('/secondhandCatalog')}>Second hand products</button>
          <div className="products">
            {products.map((product) => {
              const averageRating = getProductRating(product);
              const productId = product.id || product.product_id;
              const isAddingThisProduct = addingToCart === productId;

              return (
                <div className="product_card" key={productId}>
                  <div className="product_header">
                    <div className="product_title" onClick={() => navigateToProductDetail(productId)}>
                      <p>{product.title || product.name}</p>
                    </div>
                    <div className="product_price">
                      <b>Rs.{product.price}</b>
                      {/* <p>{product.condition}</p>
                      <p>{product.rental ?"TRUE": "False"}</p> */}
                    </div>
                  </div>

                  <div className="product_body">
                    <div className="pro_image" onClick={() => navigateToProductDetail(productId)}>
                      <img src={product.image} alt={product.title || product.name} />
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
                      <button 
                        className='add_to_cart_button' 
                        onClick={() => addProductToCart(product)}
                        disabled={isAddingThisProduct || cartLoading}
                      >
                        {isAddingThisProduct ? 'ADDING...' : 'BUY NOW'}
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
