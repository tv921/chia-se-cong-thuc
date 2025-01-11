import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Lấy danh sách công thức từ API
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        console.log('Response:', response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách công thức:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa công thức này?')) {
      try {
        await axios.delete(`http://localhost:5000/api/recipes/${id}`);
        setRecipes(recipes.filter((recipe) => recipe._id !== id));
        alert('Công thức đã được xóa!');
      } catch (error) {
        console.error('Lỗi khi xóa công thức:', error);
        alert('Đã xảy ra lỗi khi xóa công thức.');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Danh Sách Công Thức</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000/uploads/${recipe.images}`}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
            <div className="flex justify-between">
              <Link
                to={`/edit-recipe/${recipe._id}`}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
              >
                Chỉnh sửa
              </Link>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-600 hover:shadow-lg transition duration-300"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRecipes;


