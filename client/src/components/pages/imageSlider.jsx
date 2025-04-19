import { useEffect, useState } from "react";
import "./imageSlider.css"; // Import CSS file
import chip from "../images/chip.png";
import gaming from "../images/gaming.png"; 
import intel from "../images/intelcorei7.png";
import keyboard from "../images/keyboard.png";


const HomeStart = () => {
    const [imageIndex, setImageIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelector(".why-us").classList.add("show");
                    document.querySelector(".why-heading").classList.add("fade-in-top");
                    document.querySelectorAll(".why-box").forEach(box => {
                        if (box.classList.contains("box1")) box.classList.add("fade-in-left");
                        else if (box.classList.contains("box2")) box.classList.add("fade-in-top");
                        else if (box.classList.contains("box3")) box.classList.add("fade-in-left");
                        else if (box.classList.contains("box4")) box.classList.add("fade-in-bottom");
                        else box.classList.add("fade-in-right");
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer.observe(document.querySelector(".why-us"));
        return () => observer.disconnect();
    }, []);

    const images = [chip, gaming, intel, keyboard, intel];
    const backgrounds = ["#C7F6D0", "#D1E4F6", "#FFB7B2", "#d7d7d7", "#6b6b6b"];

    return (
        <div>
            <section className="slider-main">
                <div className="container">
                    <div className="logo">
                        <a href="#"><img src="../images/instagram.png" alt="logo" /></a>
                    </div>
                    <div className="slider-content-wrap">
                        <div className="slider-content">
                            <h2 className="heading-style-2">Laptop</h2>
                            <p className="image-description">Lorem ipsum dolor sit amet consectetur.</p>
                            <h3 className="heading-style-2">Rs.10000</h3>
                        </div>
                    </div>
                </div>
                <div className="slider-images">
                    {images.map((src, index) => (
                        <img 
                            key={index} 
                            className={index === imageIndex ? "active" : "inactive"} 
                            src={src} 
                            alt="product" 
                        />
                    ))}
                </div>
                <div id="backgrounds">
                    {backgrounds.map((color, index) => (
                        <div 
                            key={index} 
                            className="background" 
                            style={{ background: color, opacity: index === imageIndex ? 1 : 0 }}
                        />
                    ))}
                </div>
            </section>
            
            {/* Section to Display Company Names */}
    <section className="company-logos">
        <div className="company-content">
            <h2 className="heading-style-2">COMPANIES</h2>
            <div className="companies">
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
                <img className="company" src= {chip}/>
            </div>
        </div>
    </section>

            <section className="why-us hidden">
                <div className="why-container">
                    <div className="top_div">
                        <div className="why-box box1">40+ Qualified Experts</div>
                        <div className="why-box box2">10% More Availability</div>
                        <h2 className="why-heading">Why Us?</h2>
                    </div>
                    <div className="bottom_div">
                        <div className="why-box box3">99% Success Rate</div>
                        <div className="why-box box4">Comprehensive Consultation</div>
                        <div className="why-box box5">Our Platform's Features Lead the Way</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeStart;
