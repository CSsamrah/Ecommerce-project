import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import {searchOutline, cartOutline, personCircleOutline} from 'ionicons/icons';
import "./navbar1.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Profile functionality
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); //  Now we store user, not just isLoggedIn

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userdata"));
    if (storedUser) {
      setUser(storedUser); 
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata"); 
    setUser(null); 
    setIsDropdownOpen(false);
    navigate("/"); 
    console.log("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="nav_logo">PC Parts Picker</div>

      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className="nav-links">
        <li><Link className="text_links" to="/">Home</Link></li>
        <li><Link className="text_links" to="/catalog">Shop</Link></li>

        <li className="dropdown">
          <span className="text_links">Categories</span>
          <ul className="dropdown-content">
            <li><Link to="/category/skincare">Selling</Link></li>
            <li><Link to="/category/haircare">Rental</Link></li>
            <li><Link to="/category/makeup">Makeup</Link></li>
            <li><Link to="/category/fragrance">Fragrance</Link></li>
            <li><Link to="/category/tools">Tools & Accessories</Link></li>
          </ul>
        </li>

        <li><Link className="text_links" to="/rating">Contact</Link></li>

        <li>
          <form onSubmit={handleSearch} className="search_form">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search_input"
            />
            <button type="submit" className="search_button">
              <IonIcon icon={searchOutline} />
            </button>
          </form>
          <ul className="search_results">
            {results.length > 0 ? (
              results.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))
            ) : (
              <li>No results found</li>
            )}
          </ul>
        </li>

        <li className="nav_cart_button">
          <Link to="/cart"><IonIcon icon={cartOutline} className="cart_icon" /></Link>
        </li>

        {/* Profile Dropdown */}
        <li className="profile_menu" onClick={toggleDropdown}>
          {user ? (
            <div className="profile_icon_letter">
              {user.name.charAt(0).toUpperCase()}
            </div>
          ) : (
            <IonIcon icon={personCircleOutline} className="profile_icon" />
          )}

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {!user ? (
                <>
                  <li className="profile_dropdown" onClick={() => { setIsDropdownOpen(false); navigate("/sign"); }}>Sign Up</li>
                  <li className="profile_dropdown" onClick={() => { setIsDropdownOpen(false); navigate("/sign"); }}>Sign In</li>
                </>
              ) : (
                <>
                  <li onClick={() => navigate("/profile")}>View Profile</li>
                  <li onClick={handleLogout}>Log Out</li>
                </>
              )}
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
