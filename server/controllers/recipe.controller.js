const Recipe = require('../models/recipe');
const path = require('path');

// Tìm kiếm món ăn theo tên và nguyên liệu
const searchRecipes = async (req, res) => {
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
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Lấy tất cả công thức
    res.status(200).json(recipes); // Trả về JSON
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes', error }); // Trả về lỗi
  }
};


const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate({
        path: 'ratings',
        populate: {
          path: 'userId', // Nạp thông tin người dùng trong đánh giá
          select: 'username email', // Chỉ lấy trường username và email
        },
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'userId', // Nạp thông tin người dùng trong bình luận
          select: 'username email', // Chỉ lấy trường username và email
        },
      });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json(recipe); // Trả về thông tin đầy đủ của recipe
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching recipe details' });
  }
};


// Thêm công thức mới
const createRecipe = async (req, res) => {
  try {
    const { title, cookingStyle, cookingTime, ingredients, stepsDescriptions, video } = req.body;

    
    const stepsImages = req.files
      .filter((file) => file.fieldname.startsWith('stepsImages'))
      .map((file) => file.path.replace(path.join(__dirname, '../uploads'), '').replace(/\\/g, '/'));

    const images = req.files.find((file) => file.fieldname === 'images')?.path.replace(path.join(__dirname, '../uploads'), '').replace(/\\/g, '/') || '';

 
    const newRecipe = new Recipe({
      title,
      images, 
      ingredients: Array.isArray(ingredients) ? ingredients : [ingredients],
      cookingStyle,
      cookingTime,
      stepsDescriptions: Array.isArray(stepsDescriptions) ? stepsDescriptions : [stepsDescriptions],
      stepsImages,
      video,
    });

   
    await newRecipe.save();
    res.status(201).json({ message: 'Công thức đã được thêm!', recipe: newRecipe });
  } catch (error) {
    console.error('Lỗi khi thêm công thức:', error);
    res.status(500).json({ message: 'Lỗi khi thêm công thức', error });
  }
};

// Sửa công thức
const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, ingredients, cookingStyle, cookingTime, stepsDescriptions, video } = req.body;

    const updatedData = {
      title,
      ingredients,
      cookingStyle,
      cookingTime,
      stepsDescriptions,
      video,
    };

    // Xử lý hình ảnh nếu có file mới
    if (req.files) {
      const stepsImages = req.files
        .filter((file) => file.fieldname.startsWith('stepsImages'))
        .map((file) => file.path.replace(path.join(__dirname, '../uploads'), '').replace(/\\/g, '/'));
      
      const images = req.files.find((file) => file.fieldname === 'images')?.path.replace(path.join(__dirname, '../uploads'), '').replace(/\\/g, '/') || '';

      if (stepsImages.length) updatedData.stepsImages = stepsImages;
      if (images) updatedData.images = images;
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ message: 'Error updating recipe', error });
  }
};


// Xóa công thức
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ message: 'Error deleting recipe', error });
  }
};

module.exports = {
  searchRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
};