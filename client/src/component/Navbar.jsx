import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-cyan-950 text-slate-200 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold">
          <Link to="/" className="hover:opacity-80 transition-opacity duration-300">
            Chia sẻ công thức nấu ăn
          </Link>
        </div>

        {/* Menu */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/login">
              <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                Đăng nhập
              </button>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300">
                Đăng ký
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
