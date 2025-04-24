import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
          navigate("/"); // Homepage
        }, 5000);
    
        return () => clearTimeout(timer);
      }, [navigate]);
    
      return (
        <>
          <h2>Payment Successful!</h2>
          <p>Redirecting you back to the homepage in 5 seconds...</p>
        </>
      );
}

export default Success