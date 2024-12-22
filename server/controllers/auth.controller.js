const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const SECRET_KEY = process.env.SECRET_KEY || "defaultSecretKey";

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: "Something went wrong" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Lưu token trong cookie
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const logout = async (req, res) => {
  try {
    // Giả sử bạn lưu refresh token trong cơ sở dữ liệu
    const user = await User.findById(req.user.id); // Lấy người dùng từ cơ sở dữ liệu
    user.refreshToken = null; // Xóa refresh token
    await user.save(); // Lưu lại

    // Xóa cookie refresh token
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};


module.exports = {
  register,
  login,
  logout,
};
