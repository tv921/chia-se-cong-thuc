import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    images: null, // File ảnh
    ingredients: [''],
    cookingStyle: '',
    cookingTime: '',
    stepsDescriptions: [''], // Mảng mô tả các bước
    stepsImages: [], // Mảng file ảnh các bước
    video: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleStepDescriptionChange = (index, value) => {
    const updatedDescriptions = [...formData.stepsDescriptions];
    updatedDescriptions[index] = value;
    setFormData({ ...formData, stepsDescriptions: updatedDescriptions });
  };

  const handleStepImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedStepsImages = [...formData.stepsImages];
      updatedStepsImages[index] = file;
      setFormData({ ...formData, stepsImages: updatedStepsImages });
    }
  };

  const addIngredient = () =>
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });

  const addStep = () => {
    setFormData({
      ...formData,
      stepsDescriptions: [...formData.stepsDescriptions, ''],
      stepsImages: [...formData.stepsImages, null],
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('images', formData.images); // File ảnh
    formDataToSend.append('cookingStyle', formData.cookingStyle);
    formDataToSend.append('cookingTime', formData.cookingTime);
    formDataToSend.append('video', formData.video);

    formData.ingredients.forEach((ingredient, index) => {
      formDataToSend.append(`ingredients[${index}]`, ingredient);
    });

    formData.stepsDescriptions.forEach((description, index) => {
      formDataToSend.append(`stepsDescriptions[${index}]`, description);
    });

    formData.stepsImages.forEach((image, index) => {
      if (image) {
        formDataToSend.append(`stepsImages[${index}]`, image);
      }
    });

    try {
      await axios.post('http://localhost:5000/api/recipes', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Công thức đã được thêm!');
    } catch (error) {
      console.error('Lỗi khi thêm công thức:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Thêm Công Thức Nấu Ăn</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Tên món ăn</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Image upload */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Ảnh món ăn</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            accept="image/*"
            required
          />
        </div>

        {/* Ingredients */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nguyên liệu</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="flex-1 p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 text-blue-500 hover:underline"
          >
            + Thêm nguyên liệu
          </button>
        </div>

        {/* Cooking Style */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phong cách nấu ăn</label>
          <input
            type="text"
            name="cookingStyle"
            value={formData.cookingStyle}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Cooking Time */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Thời gian nấu</label>
          <input
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Các bước thực hiện</label>
          {formData.stepsDescriptions.map((description, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Mô tả bước"
                value={description}
                onChange={(e) => handleStepDescriptionChange(index, e.target.value)}
                className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="file"
                onChange={(e) => handleStepImageChange(index, e)}
                className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                accept="image/*"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addStep}
            className="mt-2 text-blue-500 hover:underline"
          >
            + Thêm bước
          </button>
        </div>

        {/* Video URL */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">URL video</label>
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Thêm công thức
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
