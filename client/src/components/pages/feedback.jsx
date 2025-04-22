import React, { useState } from "react";
import "./feedback.css"; // Import CSS file

const cardsData = [
  { id: 1, name: "Haiqa Fatima", email:"Haiqa@gmail.com", content: "Not satisfied. The product didn’t match the description. Hoping for better quality next time." },
  { id: 2, name: "Samrah Fatima", email:"Samrah@gmail.com", content: "Loved it! The product works perfectly and met all my expectations." },
  { id: 3, name: "Areesha Rehan", email:"Areesha@gmail.com", content: "Decent but could improve. Good overall, but the packaging needs improvement." },
  { id: 4, name: "Ali Arsalan", email:"Ali@gmail.com", content: "Great quality! Really impressed with the material and durability." },
];

const Cards = () => {
  const [activeCard, setActiveCard] = useState(null);

  return (
    <div className="feedback-container">
        <h1 className="feedback-heading">FEEDBACKS</h1>
        <div className="cards-container">
        {cardsData.map((card) => (
            <div
            key={card.id}
            className={`card ${activeCard === card.id ? "active" : ""} ${
                activeCard !== null && activeCard !== card.id ? "blurred" : ""
            }`}
            onClick={() => setActiveCard(card.id)}
            >
            {activeCard === card.id && (
                <button className="close-btn" onClick={(e) => {
                e.stopPropagation();
                setActiveCard(null);
                }}>
                ✖
                </button>
            )}
            <h3>{card.name}</h3><br/>
            <h4>{card.email}</h4>
            <div className="card-content">
              <p>{card.content}</p>
            </div>
            </div>
        ))}
        </div>
    </div>
  );
};

export default Cards;
