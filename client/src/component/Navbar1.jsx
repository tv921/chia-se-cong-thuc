import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar1 = ({ onLogout }) => {
  const [userName, setUserName] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserName(response.data.username);
          setIsUserLoggedIn(true);
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-900 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold">
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
            Chia sẻ công thức nấu ăn
          </Link>
        </div>

        {/* Menu */}
        <ul className="flex items-center space-x-6">
          {isUserLoggedIn ? (
            <li className="text-lg font-medium">Xin chào, <span className="font-bold">{userName}</span></li>
          ) : (
            <li className="text-lg italic">Chưa đăng nhập</li>
          )}
          <li>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
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




