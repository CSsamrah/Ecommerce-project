import { useState } from "react";
import axios from "axios";

const ProductAuthentication = ({ productId }) => {
    const [authStatus, setAuthStatus] = useState(null);
    const [loading, setLoading] = useState(false);


    // Function to authenticate the product
    const authenticateProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:5000/api/product/authenticate/${productId}`, 
                {}, 
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setAuthStatus(response.data.message); //Set the verification message
        } catch (error) {
            setAuthStatus(error.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4 p-4 border rounded-lg shadow-md">
            <button
                onClick={authenticateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                disabled={loading}
            >
                {loading ? "Authenticating..." : "Authenticate Product"}
            </button>

            {authStatus && (
                <p className={`text-lg font-semibold ${authStatus.includes("valid") ? "text-green-500" : "text-red-500"}`}>
                    {authStatus}
                </p>
            )}
        </div>
    );
};

export default ProductAuthentication;
