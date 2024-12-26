const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const { addRating, getRatings } = require('../controllers/rating.controller');

router.post('/:recipeId', authenticateUser, addRating); // Thêm đánh giá
router.get('/:recipeId', getRatings); // Lấy danh sách đánh giá

module.exports = router;

