import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar1 = ({ onLogout }) => {
  const [userName, setUserName] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    if (token) {
      // Gửi yêu cầu để lấy thông tin người dùng từ API
      axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(response => {
          // Lưu tên người dùng vào state
          setUserName(response.data.username);
          setIsUserLoggedIn(true); // Cập nhật trạng thái đăng nhập
        })
        .catch(error => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  return (
    <nav className="bg-sky-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo or Brand */}
        <div className="text-3xl font-bold">
          <Link to="/">Công thức nấu ăn</Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-6 items-center">
          {/* Hiển thị tên người dùng nếu đã đăng nhập */}
          {isUserLoggedIn ? (
            <li className="text-lg">Xin chào, {userName}</li>
          ) : (
            <li className="text-lg">Chưa đăng nhập</li>
          )}
          <li>
            <button
              onClick={onLogout}
              className="bg-white text-black border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar1;




