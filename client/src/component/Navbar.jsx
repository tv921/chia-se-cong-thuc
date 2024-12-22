import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-sky-900 text-white">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo or Brand */}
                <div className="text-3xl font-bold">
                    <Link to="/">Công thức nấu ăn</Link>
                </div>
                
                {/* Menu */}
                <ul className="flex space-x-6">
                    <li>
                        <Link 
                            to="/login" 
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <button className="bg-white text-black border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">Đăng nhập</button>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/register" 
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <button className="bg-white text-black border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">Đăng ký</button>
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/logout" 
                            className="hover:text-gray-300 transition-colors duration-300"
                        >
                            <button className="bg-white text-black border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100">Đăng ký</button>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
