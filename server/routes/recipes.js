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

module.exports = router;
