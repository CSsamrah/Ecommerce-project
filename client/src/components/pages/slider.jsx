import React from "react";
// import { useNavigate } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
// Import images
import sliderImage1 from '../images/chip.png';
import sliderImage2 from '../images/gaming.png';
import sliderImage3 from '../images/intelcorei7.png';
import sliderImage4 from '../images/keyboard.png';

import "./slider.css"; 

const Slider = () => {
  return (
    <div className="slider-container">
      <h1 className="slider-heading">AVAILABLE CATEGORIES</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // loopAdditionalSlides={2}
        slidesPerView={'auto'}
        // spaceBetween={10}
        // initialSlide={2}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{el:'.swiper-pagination', clickable: true }}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            clickable: true,
        }}
        modules={[Navigation, Pagination, EffectCoverflow]}
        className="swiper-container"
      >
        <div className="swiper-slides">
        <SwiperSlide className="swiper-slide">
          <img src={sliderImage1} alt="chip" />
          <p>Power & Electrical</p>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <img src={sliderImage2} alt="gaming" />
          <p>Peripherals & Accessories</p>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <img src={sliderImage3} alt="intelCore" />
          <p>Computer Hardware</p>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <img src={sliderImage4} alt="keyboard" />
          <p>Networking Components</p>
        </SwiperSlide>

        <SwiperSlide className="swiper-slide">
          <img src={sliderImage4} alt="ssd" />
          <p>Storage & Backup</p>
        </SwiperSlide>

        {/* <SwiperSlide className="slide">
          <img src={sliderImage2} alt="ssd" />
          <p>StartUp systems</p>
        </SwiperSlide>

        <SwiperSlide className="slide">
          <img src={sliderImage3} alt="ssd" />
          <p>Components</p>
        </SwiperSlide> */}

        </div>
        {/* <div className="slider-controller">
            <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
        </div> */}
        
      </Swiper>
      
    </div>
  );
};

export default Slider;
