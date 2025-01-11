

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const recipeRoutes = require('./routes/recipe.routes'); 
const userRoutes = require('./routes/user.routes');
const commentRoutes = require('./routes/comment.routes');
const ratingRoutes = require('./routes/rating.routes');
const visitRoutes = require('./routes/visit.routes');
const statisticsRoutes = require("./routes/statistics.routes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('Failed to connect MongoDB:', err));

// Đăng ký các routes
app.use('/api/recipes', recipeRoutes); 

app.use('/api/users', userRoutes);

app.use('/api/comments', commentRoutes);

app.use('/api/ratings', ratingRoutes);

app.use('/api/visits', visitRoutes);

app.use("/api/statistics", statisticsRoutes);

// Route kiểm tra server
app.get('/', (req, res) => {
  res.send('Recipe API is running!');
});

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});