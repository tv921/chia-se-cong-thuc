const Recipe = require("../models/recipe");
const User = require("../models/users");
const Comment = require("../models/comments");
const Rating = require("../models/ratings");

const getStatistics = async (req, res) => {
  try {
    const recipeCount = await Recipe.countDocuments();
    const userCount = await User.countDocuments({ role: 'user' });
    const commentCount = await Comment.countDocuments();
    const ratingCount = await Rating.countDocuments();

    res.status(200).json({
      recipes: recipeCount,
      users: userCount,
      comments: commentCount,
      ratings: ratingCount,
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
    res.status(500).json({ message: "Failed to fetch statistics" });
  }
};

module.exports = { getStatistics };
