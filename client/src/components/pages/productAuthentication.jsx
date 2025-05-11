// ProductAuthentication.jsx
import { useState } from "react";
import axios from "axios";

const ProductAuthentication = ({ productId, onAuthComplete }) => {
    const [loading, setLoading] = useState(false);

    // const authenticateProduct = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await axios.post(
    //             `http://localhost:3000/api/validate/validate-product/${productId}`);
    //         onAuthComplete(response.data.message || "Product is valid");
    //     } catch (error) {
    //         onAuthComplete(error.response?.data?.message || "Authentication failed");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

//     const authenticateProduct = async () => {
//   setLoading(true);
//   try {
//     const token = localStorage.getItem('accessToken'); // or 'token' based on your auth system
//     const response = await axios.post(
//       `http://localhost:3000/api/validate/validate-product/${productId}`,
//       {},
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );
//     onAuthComplete(response.data.message || "Product is valid");
//   } catch (error) {
//     console.error("Auth error:", error);
//     onAuthComplete(
//       error.response?.data?.message || 
//       "Please login to verify product authenticity"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

const authenticateProduct = async () => {
  setLoading(true);
  try {
    // 1. Get token from localStorage (check both common storage keys)
    const token = localStorage.getItem('accessToken') || 
                 localStorage.getItem('token');

    console.log('Current token:', token); // Add this line
  console.log('All localStorage:', JSON.stringify(localStorage));
    
    // 2. Verify token exists before making request
    if (!token) {
      onAuthComplete("Please login to verify product authenticity");
      return;
    }

    // 3. Make request with proper headers
    const response = await axios.post(
      `http://localhost:3000/api/validate/validate-product/${productId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true // For cookie-based auth if needed
      }
    );
    
    onAuthComplete(response.data.message || "Product is valid");
  } catch (error) {
    console.error("Verification error:", error);
    onAuthComplete(
      error.response?.data?.message || 
      "Authentication failed. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

    const authButtonStyle = {
    flex: '1',
    minWidth: '150px',
    width: '400px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    color: '#d0d0d0',
    fontSize: '16px',
    fontWeight: '500',
    border: '1px solid #d0d0d0',
    borderRadius: '25px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',

  };

    return (
        <div className="product-authentication">
            <button
                onClick={authenticateProduct}
                disabled={loading}
                className="auth-button"
                style = {authButtonStyle}
            >
                {loading ? "Authenticating..." : "Verify Authenticity"}
            </button>
        </div>
    );
};

export default ProductAuthentication;