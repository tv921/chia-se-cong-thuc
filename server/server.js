
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const recipeRoutes = require('./routes/recipe.routes'); // Import routes từ file recipeRoutes.js
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Kích hoạt CORS để hỗ trợ giao tiếp giữa server và client
app.use(express.json()); // Xử lý dữ liệu JSON trong request body
app.use('/images', express.static(path.join(__dirname, '../client/public/images'))); // Đảm bảo file ảnh có thể được truy cập công khai


mongoose.connect('mongodb://localhost:27017/recipeDB') 
 .then(() => console.log('MongoDB connected successfully')) 
 .catch(err => console.error('Failed to connect MongoDB:', err));

// Đăng ký các routes
app.use('/api/recipes', recipeRoutes); 

app.use('/api/auth', authRoutes);

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

