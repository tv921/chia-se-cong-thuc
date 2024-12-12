const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  images: { type: String }, 
  ingredients: [{ type: String, required: true }],
  cookingStyle: { type: String, required: true },
  cookingTime: { type: String, required: true }, 
  stepsDescriptions: [{ type: String, required: true }],
  stepsImages: [{ type: String, default: '' }],
  video: { type: String, default: '' }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
