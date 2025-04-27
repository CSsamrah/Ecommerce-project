// 

import { useState } from "react";
import axios from "axios";

const ProductAuthentication = ({ productId }) => {
    const [authStatus, setAuthStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const authenticateProduct = async () => {
        setLoading(true);
        try {
            // Using your existing authentication endpoint
            const response = await axios.post(
                `http://localhost:3000/api/product/authenticate/${productId}`, 
                {}, 
                { 
                    headers: { 
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    } 
                }
            );

            setAuthStatus(response.data.message);
        } catch (error) {
            setAuthStatus(error.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="product-authentication">
            <button
                onClick={authenticateProduct}
                disabled={loading}
                className="auth-button"
            >
                {loading ? "Authenticating..." : "Verify Authenticity"}
            </button>
            
            {authStatus && (
                <p className={`auth-status ${authStatus.includes("valid") ? "valid" : "invalid"}`}>
                    {authStatus}
                </p>
            )}
        </div>
    );
};

export default ProductAuthentication;