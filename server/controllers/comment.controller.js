const Comment = require('../models/comments');
const Recipe = require('../models/recipe');

const addComment = async (req, res) => {
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

const getComments = async (req, res) => {
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

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("userId", "username email")
      .populate("recipeId", "title");
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ message: "Bình luận không tồn tại" });
    }

    res.status(200).json({ message: "Xóa bình luận thành công" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

module.exports = {
  addComment,
  getComments,
  getAllComments,
  deleteComment,
};



