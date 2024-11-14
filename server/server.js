const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/newDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


// Routes (cần tạo file routes)
const recipeRoutes = require('./routes/recipes');
app.use('/api/recipes', recipeRoutes);

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
