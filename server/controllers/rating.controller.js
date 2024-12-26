const Rating = require('../models/ratings');
const Recipe = require('../models/recipe');

exports.addRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    const existingRating = await Rating.findOne({ recipeId, userId });
    if (existingRating) {
      return res.status(400).json({ message: 'You have already rated this recipe.' });
    }

    const newRating = new Rating({ recipeId, userId, rating });
    await newRating.save();

    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { ratings: newRating._id },
    });

    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRatings = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const ratings = await Rating.find({ recipeId })
      .populate('recipes')
      .populate('users');
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

