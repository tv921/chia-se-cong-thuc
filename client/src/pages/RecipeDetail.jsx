import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentForm from '../component/CommentForm';
import RatingForm from '../component/RatingForm';
import PrivateRoute from "../component/PrivateRoute";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        if (!response.ok) throw new Error('Error fetching recipe details');
        const data = await response.json();
        console.log(data); // In ra để kiểm tra dữ liệu bình luận
        setRecipe(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchRecipe();
  }, [id]);
  

  const handleCommentAdded = (newComment) => {
    setRecipe((prev) => ({
      ...prev,
      comments: [...prev.comments, newComment],
    }));
  };

  const handleRatingAdded = (newRating) => {
    setRecipe((prev) => {
      const updatedRatings = [...prev.ratings, newRating]; // Cập nhật mảng ratings
      const average = (
        updatedRatings.reduce((sum, r) => sum + r.rating, 0) /
        updatedRatings.length
      ).toFixed(1); // Tính lại điểm trung bình
  
      return {
        ...prev,
        ratings: updatedRatings, // Cập nhật lại mảng ratings
        averageRating: average, // Cập nhật lại điểm trung bình
      };
    });
  };
  

  if (!recipe) return <p>Loading...</p>;

  // Tính điểm trung bình, nếu không có đánh giá thì sẽ hiển thị là 'Chưa có đánh giá'
const averageRating =
recipe.ratings && recipe.ratings.length > 0
  ? (
      recipe.ratings.reduce((sum, r) => sum + r.rating, 0) /
      recipe.ratings.length
    ).toFixed(1)
  : 'Chưa có đánh giá';

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        {recipe.title}
      </h1>

      {/* Recipe Image(s) */}
      {recipe.images && (
        <div className="mb-6 flex justify-center">
          <img
            src={`http://localhost:5000/uploads/${recipe.images}`}
            alt={recipe.title}
            className="w-8/12 h-auto rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Cooking Time */}
      <p className="text-lg font-semibold text-gray-700 mb-2">
        Thời gian nấu: <span className="text-gray-600">{recipe.cookingTime}</span>
      </p>

      {/* Ingredients */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Nguyên liệu:</h3>
      <ul className="list-disc list-inside mb-6">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>

       {/* Steps */}
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Các bước thực hiện:</h3>
      <ol className="list-inside space-y-4 mb-6">
        {recipe.stepsDescriptions.map((stepDescription, index) => (
          <li key={index} className="flex items-start space-x-4 pl-4 text-lg">
            <span className="font-semibold text-gray-700">{index + 1}.</span>
            <div className="flex-1">
              <p className="text-gray-700">{stepDescription}</p>
              {recipe.stepsImages[index] && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:5000/uploads/${recipe.stepsImages[index]}`}
                    alt={`Step ${index + 1}`}
                    className="w-56 h-48 rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
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

      {/* Ratings */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Đánh giá:</h3>
        <p className="mb-4 text-lg font-semibold text-gray-700">
          Điểm trung bình: <span className="text-yellow-500">{averageRating} ⭐</span>
        </p>

        {recipe.ratings && recipe.ratings.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700 mb-6 text-xl space-y-2">
            {recipe.ratings.map((rating, index) => (
              <li key={index} className="flex items-center space-x-3">
                {/* Icon người dùng */}
                <span className="text-blue-500">
                  <i className="fas fa-user-circle text-2xl"></i>
                </span>
                {/* Tên người dùng và đánh giá */}
                <strong className="text-gray-800">
                   {rating.userId?.username}
                </strong>
                <span className="text-yellow-500">{rating.rating} ⭐</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Chưa có đánh giá nào.</p>
        )}

        {/* Form for adding rating */}
        <PrivateRoute roles={["admin", "user"]}>
          <div>
            <RatingForm recipeId={id} onRatingAdded={handleRatingAdded} />
          </div>
        </PrivateRoute>
      </div>


      {/* Comments */}
      <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Bình luận:</h3>
      {recipe.comments && recipe.comments.length > 0 ? (
        <div className="space-y-4">
          {recipe.comments.map((comment, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center space-x-3 mb-2">
                {/* Icon người dùng */}
                <span className="text-blue-500">
                  <i className="fas fa-user-circle text-2xl"></i>
                </span>
                {/* Tên người dùng */}
                <p className="font-semibold text-gray-800">
                  <strong>{comment.userId?.username}</strong>
                </p>
              </div>
              {/* Nội dung bình luận */}
              <p className="text-gray-700">{comment.content}</p>
              {/* Thời gian bình luận */}
              <p className="text-gray-500 text-sm">
                Vào lúc: {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Ngày không hợp lệ'}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Chưa có bình luận nào.</p>
      )}
    </div>

      {/* Form for adding comment */}
      <PrivateRoute roles={["admin", "user"]}>
        <div>
          <CommentForm recipeId={id} onCommentAdded={handleCommentAdded} />
        </div>
      </PrivateRoute>
    </div>
  );
}

export default RecipeDetail;
