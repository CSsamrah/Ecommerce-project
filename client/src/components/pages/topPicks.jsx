import React, { useEffect, useRef } from "react";


// Import images
import productImage1 from '../images/chip.png';
import productImage2 from '../images/gaming.png';
import productImage3 from '../images/intelcorei7.png';
import productImage4 from '../images/keyboard.png';

import "./topPicks.css"; 

const TopPicks = () => {
  const productRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelector(".product_name")?.classList.add("visible");
          entry.target.querySelector(".image")?.classList.add("visible");
        }
      });
    }, { threshold: 0.3 });

    productRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      productRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);


  return (
    <div className="top-pick-container">
      <h1 className="top-pick-heading">OUR TOP PICKS</h1>

      <div className="product" ref={(el) => productRefs.current[0] = el}>
        <div className="product_name fade-in-left">
            <p>Intel Core Processor i7</p> {/* fade-in-left  */}
            <p>Rs. <span>40000</span></p>  {/* fade-in-left  */}
        </div>
        <div className="image fade-in-right">
            <img src={productImage3} alt=""/>  {/* fade-in-right  */}
        </div>
      </div>

      <div className="product" ref={(el) => productRefs.current[1] = el}>
        <div className="image fade-in-left">
            <img src={productImage1} alt=""/>  {/* fade-in-left  */}
        </div>
        <div className="product_name fade-in-right">
            <p>Intel Chip</p>  {/* fade-in-right  */}
            <p>Rs. <span>10000</span></p>  {/* fade-in-right  */}
        </div>
        </div>

        <div className="product" ref={(el) => productRefs.current[2] = el}>
        <div className="product_name fade-in-left">
            <p>Gaming Keyboard</p> {/* fade-in-left  */}
            <p>Rs. <span>5000</span></p> {/* fade-in-left  */}
        </div>
        <div className="image fade-in-right">
            <img src={productImage4} alt=""/> {/* fade-in-right  */}
        </div>
      </div>

      <div className="product" ref={(el) => productRefs.current[3] = el}>
        <div className="image fade-in-left">
            <img src={productImage2} alt=""/> {/* fade-in-left  */}
        </div>
        <div className="product_name fade-in-right">
            <p>Gaming Processor</p> {/* fade-in-right  */}
            <p>Rs. <span>70000</span></p> {/* fade-in-right  */}
        </div>
        </div>

    </div>
  );
};

export default TopPicks;