const Comment = require('../models/comments');
const Recipe = require('../models/recipe');

exports.addComment = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    const comment = new Comment({ userId, recipeId, content });
    await comment.save();

    await Recipe.findByIdAndUpdate(recipeId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const comments = await Comment.find({ recipeId })
      .populate('userId', 'username')  // Populate chỉ lấy trường `username` từ `User`
      .populate('recipeId');  // Populate `recipeId` nếu cần

    console.log(comments); // In ra để kiểm tra dữ liệu
    res.json(comments); // Trả về dữ liệu bình luận đã được populate
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



