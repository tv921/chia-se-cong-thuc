import React from 'react';
import {Link} from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () =>{
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Công thức nấu ăn</Link>
            </div>
            <ul className="navbar-menu"> 
            <li><Link to="/login">Đăng Nhập</Link></li>
            <li><Link to="/register">Đăng Ký</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;