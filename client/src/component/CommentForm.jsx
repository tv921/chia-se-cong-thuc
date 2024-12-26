import React, { useState } from 'react';

function CommentForm({ recipeId, onCommentAdded }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${recipeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error('Failed to add comment');
      const newComment = await response.json();
      onCommentAdded(newComment);
      setContent('');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        required
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Bình luận
      </button>
    </form>
  );
}

export default CommentForm;
