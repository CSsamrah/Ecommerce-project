import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.title === product.title);
    if (existingItem) {
      return false;
    }
    setCartItems([...cartItems, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (title) => {
    const updatedCart = cartItems.filter(item => item.title !== title);
    setCartItems(updatedCart);
  };

  const updateQuantity = (title, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.title === title ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const CartContext = createContext();

// // Check if user is logged in by looking for a token or session
// const isUserLoggedIn = () => {
//   // Replace with your actual authentication check
//   const token = localStorage.getItem('token') || sessionStorage.getItem('token');
//   return !!token;
// };

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isSlidingCartOpen, setSlidingCartOpen] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(isUserLoggedIn());

//   // Update API endpoint base URL - check if this matches your backend setup
//   const API_BASE_URL = 'http://localhost:3000';
  
//   // Verify this path matches your backend API
//   const CART_API = {
//     GET_ITEMS: `${API_BASE_URL}/api/cart/getUserCartItems`,
//     ADD_ITEM: `${API_BASE_URL}/api/cart/add`,
//     UPDATE_ITEM: `${API_BASE_URL}/api/cart/update`,
//     REMOVE_ITEM: `${API_BASE_URL}/api/cart/delete`
//   };

//   const fetchCartItems = async () => {
//     // Don't try to fetch if user is not logged in
//     if (!isAuthenticated) {
//       console.log('User not authenticated, skipping cart fetch');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       console.log('Fetching cart items from:', CART_API.GET_ITEMS);
//       const response = await axios.get(CART_API.GET_ITEMS, {
//         withCredentials: true
//       });
      
//       console.log('Cart API response:', response.data);
      
//       // Ensure we're extracting cart items correctly based on API response structure
//       const items = response.data.cartItems || response.data || [];
      
//       // Format cart items to ensure consistency
//       const formattedItems = items.map(item => ({
//         ...item,
//         price: parseFloat(item.price),
//         quantity: item.quantity || 1
//       }));
      
//       setCartItems(formattedItems);
//       console.log('Cart items fetched successfully:', formattedItems);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
      
//       // For 404 errors, your endpoint might be incorrect
//       if (error.response?.status === 404) {
//         console.error('Cart API endpoint not found. Please check your API URL:', CART_API.GET_ITEMS);
//       }
      
//       // For auth errors, clear cart and mark as unauthenticated
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         setCartItems([]);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Temporary local cart for non-authenticated users
//   const addToLocalCart = (product) => {
//     const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    
//     // Check if product already exists
//     const existingIndex = localCart.findIndex(item => 
//       item.id === product.id || item.product_id === product.id
//     );
    
//     if (existingIndex >= 0) {
//       // Update quantity
//       localCart[existingIndex].quantity += 1;
//     } else {
//       // Add new item with cart_id for local operations
//       localCart.push({
//         ...product,
//         cart_id: 'local_' + Date.now(), // Generate temporary ID
//         quantity: 1,
//         price: parseFloat(product.price)
//       });
//     }
    
//     localStorage.setItem('localCart', JSON.stringify(localCart));
//     return localCart;
//   };

//   const addToCart = async (product) => {
//     // If not authenticated, add to local cart and show sliding cart
//     if (!isAuthenticated) {
//       console.log('User not authenticated, adding to local cart');
//       const updatedLocalCart = addToLocalCart(product);
//       setCartItems(updatedLocalCart);
//       setSlidingCartOpen(true);
      
//       // Return false to indicate auth needed for real cart
//       return false;
//     }
    
//     try {
//       setLoading(true);
      
//       // Ensure we have the correct product ID format
//       const productId = product.id || product.product_id;
      
//       console.log('Adding product to cart:', { productId, product });
//       console.log('Using API endpoint:', CART_API.ADD_ITEM);
      
//       const response = await axios.post(
//         CART_API.ADD_ITEM,
//         {
//           product_id: productId,
//           quantity: 1
//         },
//         { 
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'application/json'
//           }
//         }
//       );
      
//       console.log('Add to cart response:', response.data);
      
//       // Make sure we're using the correct structure based on API response
//       const newCartItem = {
//         ...product,
//         cart_id: response.data.cart_id || response.data.id,
//         quantity: 1,
//         // Ensure price is available as a number for calculations
//         price: parseFloat(product.price)
//       };
      
//       // Update cart state with the new item
//       setCartItems(prev => {
//         // Check if item already exists in cart
//         const existingItemIndex = prev.findIndex(item => 
//           (item.id === productId || item.product_id === productId)
//         );
        
//         if (existingItemIndex >= 0) {
//           // Update quantity if item exists
//           const updatedItems = [...prev];
//           updatedItems[existingItemIndex].quantity += 1;
//           return updatedItems;
//         } else {
//           // Add new item if it doesn't exist
//           return [...prev, newCartItem];
//         }
//       });
      
//       // Open sliding cart after successful addition
//       setSlidingCartOpen(true);
      
//       setLoading(false);
//       return true;
//     } catch (error) {
//       setLoading(false);
//       console.error('Error adding to cart:', error);
      
//       // For 404 errors, your endpoint might be incorrect
//       if (error.response?.status === 404) {
//         console.error('Cart API endpoint not found. Please check your API URL:', CART_API.ADD_ITEM);
//       }
      
//       if (error.response?.status === 401) {
//         setIsAuthenticated(false);
//         return false;
//       }
//       return false;
//     }
//   };

//   const removeFromCart = async (cart_id) => {
//     // Handle local cart items
//     if (cart_id.toString().startsWith('local_')) {
//       const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
//       const updatedCart = localCart.filter(item => item.cart_id !== cart_id);
//       localStorage.setItem('localCart', JSON.stringify(updatedCart));
//       setCartItems(updatedCart);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Removing item from cart:', cart_id);
      
//       await axios.delete(`${CART_API.REMOVE_ITEM}/${cart_id}`, {
//         withCredentials: true
//       });
      
//       setCartItems(prev => prev.filter(item => item.cart_id !== cart_id));
//       console.log('Item removed successfully');
//     } catch (error) {
//       console.error('Error removing from cart:', error);
      
//       // For 404 errors, update UI anyway
//       if (error.response?.status === 404) {
//         setCartItems(prev => prev.filter(item => item.cart_id !== cart_id));
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = async (cart_id, quantity) => {
//     if (quantity < 1) return;
    
//     // Handle local cart items
//     if (cart_id.toString().startsWith('local_')) {
//       const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
//       const updatedCart = localCart.map(item => 
//         item.cart_id === cart_id ? { ...item, quantity } : item
//       );
//       localStorage.setItem('localCart', JSON.stringify(updatedCart));
//       setCartItems(updatedCart);
//       return;
//     }
    
//     try {
//       setLoading(true);
//       console.log('Updating quantity:', { cart_id, quantity });
      
//       const response = await axios.put(
//         `${CART_API.UPDATE_ITEM}/${cart_id}`,
//         { quantity },
//         { withCredentials: true }
//       );
      
//       console.log('Update quantity response:', response.data);
      
//       setCartItems(prev => 
//         prev.map(item => 
//           item.cart_id === cart_id 
//             ? { 
//                 ...item, 
//                 quantity, 
//                 total_price: response.data.cartItem?.total_price || (parseFloat(item.price) * quantity)
//               } 
//             : item
//         )
//       );
//     } catch (error) {
//       console.error('Error updating quantity:', error);
      
//       // Update UI anyway for better UX
//       if (error.response?.status === 404 || error.response?.status === 401) {
//         setCartItems(prev => 
//           prev.map(item => 
//             item.cart_id === cart_id 
//               ? { ...item, quantity } 
//               : item
//           )
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Check auth status on mount and whenever token changes
//   useEffect(() => {
//     const checkAuth = () => {
//       setIsAuthenticated(isUserLoggedIn());
//     };
    
//     checkAuth();
    
//     // Listen for storage events (token changes)
//     window.addEventListener('storage', checkAuth);
    
//     return () => {
//       window.removeEventListener('storage', checkAuth);
//     };
//   }, []);

//   // Load cart items from local storage if not authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
//       setCartItems(localCart);
//     } else {
//       fetchCartItems();
//     }
//   }, [isAuthenticated]);

//   return (
//     <CartContext.Provider value={{ 
//       cartItems, 
//       addToCart, 
//       removeFromCart, 
//       updateQuantity,
//       loading,
//       fetchCartItems,
//       isSlidingCartOpen,
//       openSlidingCart: () => setSlidingCartOpen(true),
//       closeSlidingCart: () => setSlidingCartOpen(false),
//       isAuthenticated
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };