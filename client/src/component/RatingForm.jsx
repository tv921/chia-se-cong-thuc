import React, { useState } from 'react';

function RatingForm({ recipeId, onRatingAdded }) {
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/ratings/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ rating }),
      });
      if (!response.ok) throw new Error('Failed to add rating');
      const newRating = await response.json();
      onRatingAdded(newRating);
      setRating(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Đánh giá
      </button>
    </form>
  );
}

export default RatingForm;


