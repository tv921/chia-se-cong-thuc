const express = require('express');
const multer = require('multer');
const path = require('path');
const { searchRecipes, getRecipeById, createRecipe } = require('../controllers/controllerRecipe');
const router = express.Router();

// Cấu hình lưu file tạm thời vào thư mục 'client/public/images'
const upload = multer({
  dest: path.join(__dirname, '../../client/public/images/'), // Đảm bảo lưu vào thư mục 'client/public/images'
});

// Route tìm kiếm món ăn theo tên và nguyên liệu
router.get('/search', searchRecipes);

// Route lấy công thức theo ID
router.get('/:id', getRecipeById);

// Route thêm công thức mới
router.post('/', upload.any(), createRecipe);

module.exports = router;
