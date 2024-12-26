
const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
  title: { type: String, required: true }, // Tên món ăn
  images: { type: String, required: true }, // URL ảnh của món ăn
  cookingStyle: { type: String, required: true }, // Kiểu chế biến (ví dụ: chiên, luộc, hấp,...)
  cookingTime: { type: String, required: true }, // Thời gian chế biến (ví dụ: 30p, 1 tiếng,...)
  ingredients: [{ type: String, required: true }],
  stepsDescriptions: [{ type: String, required: true }], // Các bước thực hiện chế biến món ăn
  stepsImages: [{ type: String, default: '' }], // URL ảnh minh họa cho bước đó
  video: { type: String, default: '' }, // URL video hướng dẫn (nếu có)
  createdAt: { type: Date, default: Date.now }, // Ngày đăng công thức
  updatedAt: { type: Date, default: Date.now }, // Ngày chỉnh sửa công thức
  ratings: [{
    type: Schema.Types.ObjectId,
    ref: 'Rating', // Liên kết đến collection "ratings"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment', // Liên kết đến collection "comments"
  }],
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;

