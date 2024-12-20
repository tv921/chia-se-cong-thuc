import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) throw new Error("Error fetching recipe details");
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">{recipe.title}</h1>

      {/* Recipe Image(s) */}
      {recipe.images && (
        <div className="mb-6">
          <img src={recipe.images} alt={recipe.title} className="w-full h-auto rounded-lg shadow-md" />
        </div>
      )}

      {/* Cooking Time */}
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thời gian nấu: <span className="text-gray-600">{recipe.cookingTime}</span>
      </p>

      {/* Ingredients */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Nguyên liệu:</h3>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      {/* Steps */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Các bước thực hiện:</h3>
      <ol className="list-decimal list-inside space-y-4 mb-6">
        {recipe.stepsDescriptions.map((stepDescription, index) => (
          <li key={index} className="pl-4">
            <p className="text-gray-700">{stepDescription}</p>
            {recipe.stepsImages[index] && (
              <div className="mt-2">
                <img
                  src={recipe.stepsImages[index]}
                  alt={`Step ${index + 1}`}
                  className="w-56 h-48 rounded-lg shadow-md"
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Video */}
      {recipe.video && (
        <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Video hướng dẫn:</h3>
        <a
          href={recipe.video}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
        {recipe.video}
        </a>
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;
