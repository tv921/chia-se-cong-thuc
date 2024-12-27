import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
    }
  };

  const deleteUser = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
      {users.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded border-collapse overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 font-medium text-gray-600">Username</th>
              <th className="py-3 px-4 font-medium text-gray-600">Email</th>
              <th className="py-3 px-4 font-medium text-gray-600">Vai trò</th>
              <th className="py-3 px-4 font-medium text-gray-600">Ngày tạo</th>
              <th className="py-3 px-4 font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => deleteUser(user._id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">Không có người dùng nào.</p>
      )}
    </div>
  );
};

export default ManageUsers;

