import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function SearchResults() {
  const location = useLocation();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSearchedRecipes = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('query');

        const response = await fetch(`http://localhost:5000/api/recipes/search?query=${query}`);
        if (!response.ok) throw new Error("Error fetching recipes");

        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSearchedRecipes();
  }, [location.search]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Kết Quả Tìm Kiếm</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-600">Không tìm thấy công thức nào phù hợp với từ khóa của bạn.</p>
      ) : (
        <ul className="space-y-6">
          {recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <Link
                to={`/recipes/${recipe._id}`}
                className="block"
              >
                <h3 className="text-3xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-xl text-gray-600 mb-4">Thời gian nấu: {recipe.cookingTime}</p>
                {recipe.images && (
                  <img
                    src={recipe.images}
                    alt={recipe.title}
                    className="w-48 h-auto rounded-md"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
