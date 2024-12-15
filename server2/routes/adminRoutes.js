// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const userController = require('../controllers/userController');

// Thêm sản phẩm
router.post('/products', authenticate, authorizeAdmin, productController.createProduct);

// Sửa sản phẩm
router.put('/products/:id', authenticate, authorizeAdmin, productController.updateProduct);

// Xóa sản phẩm
router.delete('/products/:id', authenticate, authorizeAdmin, productController.deleteProduct);

// Xóa tài khoản người dùng
router.delete('/users/:id', authenticate, authorizeAdmin, userController.deleteUser);

module.exports = router;
