// server/controllers/reviewController.js
const Review = require('../models/Review'); // Tạo model Review nếu cần
const Product = require('../models/Product');

exports.addReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  const review = new Review({ userId: req.user.userId, productId, rating, comment });
  await review.save();

  // Cập nhật đánh giá vào sản phẩm
  const product = await Product.findById(productId);
  product.reviews.push(review._id);
  await product.save();

  res.status(201).json(review);
};
