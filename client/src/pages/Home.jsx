import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../component/SearchBar';
import '../css/index.css';
import RecipeSlider from '../component/RecipeSlider';

const recipe = [
  { image: '/images/recipe-1.jpg' },
  { image: '/images/recipe-3.jpg' },
  { image: '/images/recipe-4.jpg' },
];


function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/search?query=${query}`);
      if (!response.ok) throw new Error("Error fetching recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* Content Area */}
  <div className="flex-1 p-6 bg-gray-100">
        <RecipeSlider recipes={recipe} />
    </div>
        <SearchBar query={query} setQuery={setQuery} searchRecipes={searchRecipes} />
    <div className="container mx-auto py-8">
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
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.title}</h2>
            <p className="text-gray-600 mb-4">Thời gian nấu: {recipe.cookingTime}</p>
            {recipe.images && (
              <img
                src={recipe.images}
                alt={recipe.title}
                className="w-32 h-auto rounded-md"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  </div>
    </>
  );
}

export default Home;
