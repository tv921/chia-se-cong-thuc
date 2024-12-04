const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();

// Route tìm kiếm món ăn theo tên và nguyên liệu
router.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const recipes = await Recipe.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },        // Tìm theo tên món ăn
                { ingredients: { $regex: query, $options: 'i' } },   // Tìm theo nguyên liệu
                {cookingStyle: { $regex: query, $options: 'i'} }    // Tìm  theo kiểu nấu ăn
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
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipe details" });
    }
});
//Router thêm công thức
router.post('/add-recipe', async (req, res) => {
  try {
    const {
      title,
      images,
      ingredients,
      cookingStyle,
      cookingTime,
      servingSize,
      steps,
      video,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!title) {
      return res.status(400).json({ message: 'Thiếu thông tin cần thiết.' });
    }

    // Tạo công thức mới
    const newRecipe = new Recipe({
      title,
      images: images || [],  // Nếu không có images, sử dụng mảng trống
      ingredients,
      cookingStyle,
      cookingTime,
      servingSize,
      steps,
      video: video || '', // Nếu không có video, sử dụng chuỗi rỗng
    });

    // Lưu vào cơ sở dữ liệu
    const savedRecipe = await newRecipe.save();

    if (!savedRecipe) {
      return res.status(500).json({ message: 'Lỗi khi lưu công thức vào cơ sở dữ liệu.' });
    }

    res.status(201).json({
      message: 'Công thức đã được thêm thành công!',
      recipe: savedRecipe,
    });
  } catch (error) {
    console.error('Lỗi khi thêm công thức:', error);
    res.status(500).json({ message: 'Lỗi server, vui lòng thử lại sau.' });
  }
});

// API trả về đường dẫn chia sẻ công thức
router.get('/recipes/:id/share', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ error: 'Không tìm thấy công thức' });
    }

    const shareLink = `http://localhost:3000/recipes/${recipeId}`;
    res.status(200).json({ shareLink });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server', details: err.message });
  }
});

module.exports = router;



module.exports = router;
