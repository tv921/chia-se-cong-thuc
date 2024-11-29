const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: { type: String }, // URL ảnh của món ăn
    ingredients: [{ type: String }], // Mảng chuỗi cho từng nguyên liệu
    cookingStyle: { type: String },
    cookingTime: { type: String },
    servingSize: { type: Number }, // Nấu cho bao nhiêu người ăn
    steps: [
        {
            description: { type: String }, // Mô tả từng bước
            imageUrl: { type: String }     // URL ảnh minh họa cho bước đó
        }
    ],
    video: { type: String }, // URL video hướng dẫn (nếu có)
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },   
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            rating: { type: Number, min: 1, max: 5 }
        }
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
module.exports = Recipe;
