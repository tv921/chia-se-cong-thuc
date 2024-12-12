const express = require('express');
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/recipe');
const router = express.Router();

// Route tìm kiếm món ăn theo tên và nguyên liệu
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const recipes = await Recipe.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
        { cookingStyle: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
});


// Cấu hình lưu file tạm thời vào thư mục 'client/public/images'
const upload = multer({
  dest: path.join(__dirname, '../../client/public/images/'), // Đảm bảo lưu vào thư mục 'client/public/images'
});

router.post('/', upload.any(), async (req, res) => {
  try {
    // Xử lý dữ liệu text
    const { title, cookingStyle, cookingTime, ingredients, stepsDescriptions, video } = req.body;

    // Xử lý các file upload (stepsImages và images)
    const stepsImages = req.files
      .filter((file) => file.fieldname.startsWith('stepsImages'))
      .map((file) => file.path.replace(path.join(__dirname, '../../client/public'), '').replace(/\\/g, '/')); // Loại bỏ phần 'client/public' khỏi đường dẫn

    const images = req.files.find((file) => file.fieldname === 'images')?.path.replace(path.join(__dirname, '../../client/public'), '').replace(/\\/g, '/') || ''; // Loại bỏ 'client/public' khỏi đường dẫn

    // Tạo công thức mới
    const newRecipe = new Recipe({
      title,
      images, // Lưu đường dẫn tương đối
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      cookingStyle,
      cookingTime,
      stepsDescriptions: Array.isArray(stepsDescriptions) ? stepsDescriptions : [stepsDescriptions],
      stepsImages,
      video,
    });

    // Lưu công thức mới vào cơ sở dữ liệu
    await newRecipe.save();
    res.status(201).json({ message: 'Công thức đã được thêm!', recipe: newRecipe });
  } catch (error) {
    console.error('Lỗi khi thêm công thức:', error);
    res.status(500).json({ message: 'Lỗi khi thêm công thức', error });
  }
});


module.exports = router;
