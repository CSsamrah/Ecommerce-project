import React, { useState } from "react";
import "./signUp.css";
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();


const SignIn = () => {
  const [rightPanelActive, setRightPanelActive] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("");
  
  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "",
  });

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    role: "",
  });
  
  // Handle Sign Up Input Changes
  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // Handle Sign In Input Changes
  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };
  
  // Handle Sign Up Submission
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
  
    if (!signUpData.name || !signUpData.email || !signUpData.password || !signUpData.confirmPassword || !signUpData.phone || !signUpData.address || !signUpData.role) {
      alert("All fields are required!");
      return;
    }
  
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(signUpData.email)) {
      alert("Invalid email format!");
      return;
    }
  
    console.log("Form submitted:", signUpData);
    sendDataToBackend(signUpData);
  };

  // Handle Sign In Submission
  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    if (!signInData.email || !signInData.password || !signInData.role) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.text();

      if (response.status === 200) {
        alert("Login successful!");
        if (signInData.role === "Admin") navigate("/admin-dashboard");
        else if (signInData.role === "Seller") navigate("/seller-dashboard");
        else navigate("/buyer-dashboard");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className={`sign_container ${rightPanelActive ? "right-panel-active" : ""}`} id="container">

      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Create Account</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          {/* <span>or use your email for registration</span> */}
          <input type="text" name="name" value={signUpData.name} onChange={handleSignUpChange} placeholder="Name" />
          <input type="email" name="email" value={signUpData.email} onChange={handleSignUpChange} placeholder="Email" />
          <input type="password" name="password" value={signUpData.password} onChange={handleSignUpChange} placeholder="Password" />
          <input type="password" name="confirmPassword" value={signUpData.confirmPassword} onChange={handleSignUpChange} placeholder="Confirm Password" />
          <input type= "tel" name="phone" value={signUpData.phone} onChange={handleSignUpChange} placeholder="Phone Number" />
          <input type="text" name="address" value={signUpData.address} onChange={handleSignUpChange} placeholder="Address" /><br/>
          <select className="styled-dropdown" name="role" value={signUpData.role} onChange={handleSignUpChange} >
            <option value="">Select Your Role</option>
            <option value="Admin">Admin</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>

          <button type="submit" id="mainSignUp" className="sign_button">Sign Up</button>
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <h1>Sign In</h1>
          {/* <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div> */}
          {/* <span>or use your account</span> */}
          <input type="email" name="email" value={signInData.email} onChange={handleSignInChange} placeholder="Email" />
          <input type="password" name="password" value={signInData.password} onChange={handleSignInChange} placeholder="Password" />
          {/* <a href="#">Forgot your password?</a> */}
          <select className="styled-dropdown" name="role" value={signInData.role} onChange={handleSignInChange} >
            <option value="">Select Your Role</option>
            <option value="Admin">Admin</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
          </select>
          <button type="submit" id="mainSignIn" className="sign_button">Sign In</button>
        </form>
      </div>

      {/* Overlay Panel */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Hello, Friend!</h1>
            <h4>Enter your personal details and start your journey with us</h4>
            <p>Already have an account?</p>
            <button className="ghost" onClick={() => setRightPanelActive(false)}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <h4>To keep connected with us, please login with your personal info</h4>
            <p>New around here?</p>
            <button className="ghost" onClick={() => setRightPanelActive(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
