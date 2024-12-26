// src/components/RecipeSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const RecipeSlider = ({ recipes }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop
      className="max-w-7xl mx-auto my-8 px-4"
    >
      {recipes.map((recipe, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden w-full mx-auto">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{recipe.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{recipe.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecipeSlider;
