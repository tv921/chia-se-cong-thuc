import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../component/SearchBar';
import '../css/index.css';
import RecipeSlider from '../component/RecipeSlider';
import { useNavigate } from 'react-router-dom';
import Footer from "../component/Footer";

const recipe = [
  { image: '/img/recipe-4.jpg' },
  { image: '/img/recipe-1.jpg' },
  { image: '/img/recipe-2.jpg' },
];

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [popularRecipes, setPopularRecipes] = useState([]);

  const navigate = useNavigate();
  const searchRecipes = async () => {
    if (query.trim()) {
      navigate(`/search-results?query=${query}`);
    }
  };

  // Fetch popular recipes when the component mounts
  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/recipes');
        if (!response.ok) throw new Error("Error fetching popular recipes");
        const data = await response.json();
        setPopularRecipes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPopularRecipes();
  }, []);

  return (
    <>
      {/* Content Area */}
      <SearchBar query={query} setQuery={setQuery} searchRecipes={searchRecipes} />
      <div className="flex-1 p-6 bg-gray-100">
        <RecipeSlider recipes={recipe} />
      </div>
      
      {/* Popular Recipes Section */}
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Các Món Ăn Phổ Biến</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300 p-4"
            >
              <Link
                to={`/recipes/${recipe._id}`}
                className="block"
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{recipe.title}</h3>
                <p className="text-gray-600 mb-4">Thời gian nấu: {recipe.cookingTime}</p>
                {recipe.images && (
                  <img
                    src={recipe.images}
                    alt={recipe.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;

