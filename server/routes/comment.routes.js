const express = require('express');
const router = express.Router();
const authenticateUser = require('../middlewares/authenticateUser');
const { addComment, getComments } = require('../controllers/comment.controller');

router.post('/:recipeId', authenticateUser, addComment); // Thêm bình luận
router.get('/:recipeId', getComments); // Lấy danh sách bình luận

module.exports = router;


