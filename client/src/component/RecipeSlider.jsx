// src/components/RecipeSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import '../css/RecipeSlider.css'; // Tạo file CSS riêng cho slider

const RecipeSlider = ({ recipes }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="recipe-slider"
    >
      {recipes.map((recipe, index) => (
        <SwiperSlide key={index}>
          <div className="slide-content">
            <img src={recipe.image} alt={recipe.title} className="slide-image" />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipeSlider;
