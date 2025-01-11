
const express = require('express');
const multer = require('multer');
const path = require('path');
const { searchRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe} = require('../controllers/recipe.controller');
const { getRecipes } = require('../controllers/recipe.controller');

const router = express.Router();


const upload = multer({
  dest: path.join(__dirname, '../uploads'), 
});


router.get('/search', searchRecipes);


router.get('/:id', getRecipeById);


router.post('/', upload.any(), createRecipe);


router.put('/:id', upload.any(), updateRecipe);


router.delete('/:id', deleteRecipe);

router.get('/', getRecipes);

module.exports = router;

