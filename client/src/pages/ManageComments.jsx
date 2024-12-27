import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageComments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/comments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const deleteComment = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa bình luận này?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((comment) => comment._id !== id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quản lý bình luận</h1>
      {comments.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded border-collapse overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 font-medium text-gray-600">Người dùng</th>
              <th className="py-3 px-4 font-medium text-gray-600">Recipe</th>
              <th className="py-3 px-4 font-medium text-gray-600">Nội dung</th>
              <th className="py-3 px-4 font-medium text-gray-600">Ngày tạo</th>
              <th className="py-3 px-4 font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id} className="hover:bg-gray-100">
                <td className="py-3 px-4">{comment.userId?.username}</td>
                <td className="py-3 px-4">{comment.recipeId?.title}</td>
                <td className="py-3 px-4">{comment.content}</td>
                <td className="py-3 px-4">{new Date(comment.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Không có bình luận nào.</p>
      )}
    </div>
  );
};

export default ManageComments;

