import React, { useState } from 'react';
import axios from 'axios';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    images: '',
    ingredients: [''],
    cookingStyle: '',
    cookingTime: '',
    servingSize: '',
    steps: [{ description: '', imageUrl: '' }],
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

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  const addStep = () => setFormData({ ...formData, steps: [...formData.steps, { description: '', imageUrl: '' }] });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Gửi formData vào body của request
      const response = await axios.post('http://localhost:5000/api/recipes/add-recipe', formData);

      alert('Thêm công thức thành công!');
      console.log('Response:', response.data);

      // Reset form sau khi thành công
      setFormData({
        title: '',
        images: '',
        ingredients: [''],
        cookingStyle: '',
        cookingTime: '',
        servingSize: '',
        steps: [{ description: '', imageUrl: '' }],
        video: '',
      });
    } catch (error) {
      // Log lỗi chi tiết
      console.error('Lỗi khi thêm công thức:', error.response ? error.response.data : error.message);
      alert(error.response ? error.response.data.message : 'Có lỗi xảy ra, vui lòng thử lại.');
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
        {/* Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">URL ảnh</label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
        {/* Serving Size */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phần ăn</label>
          <input
            type="number"
            name="servingSize"
            value={formData.servingSize}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        {/* Steps */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Các bước thực hiện</label>
          {formData.steps.map((step, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Mô tả bước"
                value={step.description}
                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                className="w-full p-3 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="URL ảnh minh họa"
                value={step.imageUrl}
                onChange={(e) => handleStepChange(index, 'imageUrl', e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
        {/* Video */}
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
