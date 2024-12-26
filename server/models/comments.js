const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",  // Tham chiếu đến User
    required: true,
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe", // Tham chiếu đến Recipe
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);

