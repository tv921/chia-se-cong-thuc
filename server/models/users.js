const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  recipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
