// import React, {useEffect, useState} from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { IonIcon } from '@ionic/react';
// import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
// import "./productDescription.css"; // Add styling if needed
// import Rating from "./rating"; // Import the rating component
// import ProductAuthentication from "./productAuthentication";  // Import the product authentication component

// // Import images (same as Catalog.jsx)
// import image1 from "../images/chip.png";
// import image2 from "../images/gaming.png";
// import image3 from "../images/intelcorei7.png";
// import image4 from "../images/keyboard.png";

// //Product Details
// const products = [
//   { id: "p1", title: "GlossyBox Skincare: Deep Cleansing Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "1500", image: image1 },
//   { id: "p2", title: "Glow Recipe: Blueberry Bounce Gentle Cleanser", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2200", image: image2 },
//   { id: "p3", title: "Anua: Heartleaf Pore Control Cleansing Oil", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2800", image: image3 },
//   { id: "p4", title: "COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "1800", image: image4 },
//   { id: "p5", title: "Summer Fridays: Cloud Dew Oil-Free Gel Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3000", image: image4 },
//   { id: "p6", title: "Summer Fridays: Rich Cushion Cream, Ultra-Plumping", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3500", image: image3 },
//   { id: "p7", title: "Glow Recipe: Watermelon Glow Pink Juice Moisturizer", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2800", image: image2 },
//   { id: "p8", title: "Glow Recipe: Watermelon Glow Niacinamide Dew Drops", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3500", image: image1 },
// ];

// //Review Details
// // const reviews = [
// //   { username: "John Doe", email: "john@example.com", rating: 5, content: "Amazing product!" },
// //   { username: "Jane Smith", email: "jane@example.com", rating: 4, content: "Pretty good, but could be better." },
// //   { username: "Mike Ross", email: "mike@example.com", rating: 3, content: "" },
// // ];

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const product = products.find((item) => item.id === id);

//   if (!product) {
//     return <h2>Product not found</h2>;
//   }


//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);

//   const handleWishlist = () => {
//     setIsWishlisted(!isWishlisted);
//   };

//   const handleAddToCart = () => {
//     if (isInCart) {
//       alert("Already in cart!");
//     } else {
//       setIsInCart(true);
//       alert("Added to cart!");
//     }
//   };

// // Helper function to generate star icons
// const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//         <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
//     ));
// };
// //Rating
//     const [reviews, setReviews] = useState([]);

//     const addReview = (newReview) => {
//         const isReviewed = reviews.some(review => review.email === newReview.email);
//         if (isReviewed) {
//             alert("Product already reviewed!");
//             return;
//         }
//         setReviews([...reviews, newReview]);
//     };

//   // Add reviews to the database ---------------->
//     // const addReview = async (newReview) => {
//     //   try {
//     //     // Send review to the backend to be stored in the database
//     //     await axios.post(`/api/reviews/${id}`, newReview);
        
//     //     // After submitting, fetch the updated reviews
//     //     const response = await axios.get(`/api/reviews/${id}`);
//     //     const updatedReviews = response.data;
        
//     //     setReviews(updatedReviews);
    
//     //     // Recalculate the average rating
//     //     const totalRating = updatedReviews.reduce((acc, review) => acc + review.rating, 0);
//     //     const avgRating = totalRating / updatedReviews.length;
//     //     setAverageRating(avgRating);
    
//     //     alert("Review added successfully!");
//     //   } catch (error) {
//     //     console.error("Error submitting review:", error);
//     //   }
//     // };
    

// //Average Rating
//     const [averageRating, setAverageRating] = useState(0);

//     // Recalculate the average rating whenever the reviews change
//   useEffect(() => {
//     if (reviews.length) {
//       const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
//       setAverageRating(avgRating);
//     }
//   }, [reviews]);

//   useEffect(() => {
//     if (product) {
//       localStorage.setItem(`rating_${product.id}`, JSON.stringify(averageRating)); // Store rating
//     }
//   }, [averageRating, product]);

//   // Fetch reviews from the database on page load ----->
//   // useEffect(() => {
//   //   const fetchReviews = async () => {
//   //     try {
//   //       // Assuming the API returns a list of reviews for the specific product
//   //       const response = await axios.get(`/api/reviews/${id}`);
//   //       const fetchedReviews = response.data; // Reviews returned from the API

//   //       setReviews(fetchedReviews);

//   //       // Calculate the average rating based on fetched reviews
//   //       if (fetchedReviews.length > 0) {
//   //         const totalRating = fetchedReviews.reduce((acc, review) => acc + review.rating, 0);
//   //         const avgRating = totalRating / fetchedReviews.length;
//   //         setAverageRating(avgRating);
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching reviews:", error);
//   //     }
//   //   };

//   //   fetchReviews();
//   // }, [id]); // Fetch reviews when the product ID changes



//   return (
//     <div className="product_detail_page">
//     <div className="product-detail">
//       <div className="product-container">
//         <div className="back-button" onClick={() => navigate("/catalog")}><IonIcon icon={arrowBackOutline} /></div>
//         <img src={product.image} alt={product.title} className="product-image" />
//         <div className="product-info">
//           {/* <div className="wishlist-button" onClick={handleWishlist}><IonIcon icon={isWishlisted ? heart : heartOutline} /></div> */}
//           <h2>{product.title}</h2>
//           <p className="about-product">{product.description}</p>
//           {/* Display Average Rating */}
//           <div className="average-rating">
//             <div>{renderStars(Math.round(averageRating))} ({averageRating.toFixed(1)})</div>
//           </div>
//           <h3 className="product-price">Rs. {product.price}</h3>
//           <div className="product_detail_buttons">
//             <button className="cart-button" onClick={handleAddToCart}>Add To Cart {/* <IonIcon icon={cartOutline} /> */}</button>
//             <div className="authentication_button">
//               <ProductAuthentication productId={product.id} />
//             </div>
//             <button className="cart-button" onClick={() => navigate("/rating")}>Review Product</button>
//           </div>
//         </div>
//       </div>
//       </div>

//       {/* Review Section */}
//       <div className="review_container">
//         <div className="review_heading">
//           <span>Customer Reviews</span>
//           <h1>Client Says</h1>
//         </div>

//         {/* Rating Form */}
//         <Rating addReview={addReview} />

//         <div className="review_box_container">
//             {/* Display Individual Reviews */}
//             {reviews.length ? (
//             reviews.map((review, index) => (
//               <div key={index} className="review_box">
//                 <div className="box_top">
//                   <div className="user_name">
//                     <h4>{review.username}</h4>
//                     <span>{review.email}</span>
//                   </div>
//                   <div className="reviewed_stars">{renderStars(review.rating)}</div>
//                 </div>
//                 <div className="box_body">
//                   {review.content && <p>"{review.content}"</p>}
//                 </div>
//               </div>
//                 ))
//               ) : (
//                   <p>No reviews yet.</p>
//               )}     
//         </div>

        
        
//         </div>
//     </div>
//   );
// };

// export default ProductDetail;


import React, {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IonIcon } from '@ionic/react';
import { heartOutline, heart, cartOutline, arrowBackOutline } from 'ionicons/icons';
import ProductAuthentication from "./productAuthentication";  // Import the product authentication component
import "./productDescription.css"; // Add styling if needed

// Import images (same as Catalog.jsx)
import image1 from "../images/chip.png";
import image2 from "../images/gaming.png";
import image3 from "../images/intelcorei7.png";
import image4 from "../images/keyboard.png";

//Product Details
const products = [
  { id: "p1", title: "GlossyBox Skincare: Deep Cleansing Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "1500", image: image1 },
  { id: "p2", title: "Glow Recipe: Blueberry Bounce Gentle Cleanser", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2200", image: image2 },
  { id: "p3", title: "Anua: Heartleaf Pore Control Cleansing Oil", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2800", image: image3 },
  { id: "p4", title: "COSRX: Oil-Free Ultra-Moisturizing Lotion (with Birch Sap)", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "1800", image: image4 },
  { id: "p5", title: "Summer Fridays: Cloud Dew Oil-Free Gel Cream", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3000", image: image4 },
  { id: "p6", title: "Summer Fridays: Rich Cushion Cream, Ultra-Plumping", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3500", image: image3 },
  { id: "p7", title: "Glow Recipe: Watermelon Glow Pink Juice Moisturizer", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "2800", image: image2 },
  { id: "p8", title: "Glow Recipe: Watermelon Glow Niacinamide Dew Drops", description: "The XYZ-500 Graphics Card delivers high-performance gaming and seamless multitasking. With 8GB of GDDR6 memory and a powerful cooling system, it ensures smooth graphics rendering even under heavy workloads. Its advanced architecture supports ray tracing for realistic lighting and shadows. The dual-fan design keeps temperatures low while maintaining quiet operation.", price: "3500", image: image1 },
];

// Rating Component Integrated Directly
const Rating = ({ addReview, closePopup }) => {
    const [rating, setRating] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [opinion, setOpinion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newReview = { username, email, rating, content: opinion };
        addReview(newReview); // Pass review to parent state
        // Handle form submission logic
        console.log({ username, email, rating, opinion });
        alert("Thank you for your feedback!");
        // Reset fields after submission
        setUsername("");
        setEmail("");
        setRating(0);
        setOpinion("");
        closePopup(); // Close the popup after submission
    };

    return (
        <div className="rating_popup_overlay">
            <div className="rating_popup_content">
                <div className="wrapper">
                    <button className="close_button" onClick={closePopup}>×</button>
                    <h3>RATE US</h3>
                    <form onSubmit={handleSubmit}>
                        {/* Username and Email Fields */}
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        {/* Star Rating */}
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <div key={num} className="star" onClick={() => setRating(num)}>
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill={num <= rating ? "#FFD700" : "none"}
                                        stroke="#FFD700"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="12 2 15 9 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 9" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        {/* Opinion Text Area */}
                        <textarea
                            name="opinion"
                            cols={30}
                            rows={5}
                            placeholder="Your opinion..."
                            value={opinion}
                            onChange={(e) => setOpinion(e.target.value)}
                        ></textarea>

                        {/* Buttons */}
                        <div className="btn-group">
                            <button type="submit" className="btn-submit">SUBMIT</button>
                            <button type="button" className="btn-cancel" onClick={closePopup}>CANCEL</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = () => {
    if (isInCart) {
      alert("Already in cart!");
    } else {
      setIsInCart(true);
      alert("Added to cart!");
    }
  };

  const toggleRatingPopup = () => {
    setShowRatingPopup(!showRatingPopup);
  };

  // Helper function to generate star icons
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc", fontSize: "23px" }}>★</span>
    ));
  };

  const addReview = (newReview) => {
    const isReviewed = reviews.some(review => review.email === newReview.email);
    if (isReviewed) {
      alert("Product already reviewed!");
      return;
    }
    setReviews([...reviews, newReview]);
  };

  // Recalculate the average rating whenever the reviews change
  useEffect(() => {
    if (reviews.length) {
      const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
      setAverageRating(avgRating);
    }
  }, [reviews]);

  useEffect(() => {
    if (product) {
      localStorage.setItem(`rating_${product.id}`, JSON.stringify(averageRating)); // Store rating
    }
  }, [averageRating, product]);

  return (
    <div className="product_detail_page">
      <div className="product-detail">
        <div className="product-container">
          <div className="back-button" onClick={() => navigate("/catalog")}><IonIcon icon={arrowBackOutline} /></div>
          <img src={product.image} alt={product.title} className="product-image" />
          <div className="product-info">
            <h2>{product.title}</h2>
            <p className="about-product">{product.description}</p>
            {/* Display Average Rating */}
            <div className="average-rating">
              <div>{renderStars(Math.round(averageRating))} ({averageRating.toFixed(1)})</div>
            </div>
            <h3 className="product-price">Rs. {product.price}</h3>
            <div className="product_detail_buttons">
              <button className="cart-button" onClick={handleAddToCart}>Add To Cart</button>
              <div className="authentication_button">
                <ProductAuthentication productId={product.id} />
              </div>
              <button className="cart-button" onClick={toggleRatingPopup}>Review Product</button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="review_container">
        <div className="review_heading">
          <span>Customer Reviews</span>
          <h1>Client Says</h1>
        </div>

        {/* Display Individual Reviews */}
        <div className="review_box_container">
          {reviews.length ? (
            reviews.map((review, index) => (
              <div key={index} className="review_box">
                <div className="box_top">
                  <div className="user_name">
                    <h4>{review.username}</h4>
                    <span>{review.email}</span>
                  </div>
                  <div className="reviewed_stars">{renderStars(review.rating)}</div>
                </div>
                <div className="box_body">
                  {review.content && <p>"{review.content}"</p>}
                </div>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}     
        </div>
      </div>

      {/* Rating Popup */}
      {showRatingPopup && (
        <Rating addReview={addReview} closePopup={toggleRatingPopup} />
      )}
    </div>
  );
};

export default ProductDetail;