import React, { useState } from 'react';
import axios from 'axios';

function ShareButton({ recipeId }) {
  const [shareLink, setShareLink] = useState('');

  const handleShare = async () => {
    try {
      // Sử dụng đúng recipeId trong URL
      const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}/share`);
      setShareLink(response.data.shareLink);

      // Sao chép đường dẫn vào clipboard
      navigator.clipboard.writeText(response.data.shareLink);
      alert('Đường dẫn đã được sao chép vào clipboard!');
    } catch (err) {
      console.error(err);
      alert('Có lỗi xảy ra khi lấy đường dẫn chia sẻ.');
    }
  };

  return (
    <div>
      <button onClick={handleShare}>Chia Sẻ Công Thức</button>
      {shareLink && (
        <p>
          Đường dẫn: <a href={shareLink} target="_blank" rel="noopener noreferrer">{shareLink}</a>
        </p>
      )}
    </div>
  );
}

export default ShareButton;

