import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Lấy thông tin người dùng hiện tại
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        'http://localhost:5000/api/users/update',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("User updated successfully!");
    } catch (error) {
      setMessage("Failed to update user information.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-sky-200 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-700">Cập nhật thông tin</h2>
      {message && <p className="mb-4 text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-lg font-medium text-black">
            Tên người dùng
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-violet-500 text-white text-lg font-bold rounded-lg hover:bg-violet-700 transition"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
