// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const reviewController = require('../controllers/reviewController');

// Đăng ký và đăng nhập
router.post('/register', authController.register);
router.post('/login', authController.login);

// Tìm kiếm sản phẩm
router.get('/products', productController.searchProducts);

// Đánh giá sản phẩm
router.post('/reviews', authenticate, reviewController.addReview);

module.exports = router;
