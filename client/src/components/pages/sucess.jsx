import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "20px"
    }}>
      <h2 style={{
        fontSize: "2.5rem",
        color: "#2e8b57",
        marginBottom: "10px"
      }}>
        🎉 Payment Successful!
      </h2>
      <p style={{
        fontSize: "1.2rem",
        color: "#333",
        marginTop: "0"
      }}>
        Redirecting you back to the homepage in 5 seconds...
      </p>
    </div>
  );
};

export default Success;
