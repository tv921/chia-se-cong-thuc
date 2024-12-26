const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserInfo } = require('../controllers/user.controller');
const authenticateUser = require('../middlewares/authenticateUser');

// Đăng ký người dùng
router.post('/register', registerUser);

// Đăng nhập người dùng
router.post('/login', loginUser);

// Đăng xuất người dùng
router.get('/logout', logoutUser);

// Lấy thông tin người dùng
router.get('/me', authenticateUser, getUserInfo);

module.exports = router;


