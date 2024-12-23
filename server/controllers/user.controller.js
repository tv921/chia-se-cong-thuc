const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware để xác thực token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Lấy token từ header Authorization
  if (!token) {
    return res.status(401).json({ message: 'Token không tồn tại' });
  }

  jwt.verify(token, 'secretkey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ' });
    }
    req.user = user;
    next();
  });
};

// API để lấy thông tin người dùng (sử dụng token để xác thực)
const getUserInfo = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ token
    const userId = req.user.id;

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findById(userId).select('username email'); // Chỉ lấy username và email

    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    // Trả về thông tin người dùng
    res.status(200).json({
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error('Error while getting user info:', error);
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Email không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token chứa thông tin vai trò (role)
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Thêm role
      'secretkey',
      { expiresIn: '1h' }
    );

    // Trả về token
    res.status(200).json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    console.error("Error during login:", error); // Log lỗi để kiểm tra
    res.status(500).json({ message: 'Lỗi hệ thống' });
  }
};

// Đăng xuất người dùng
const logoutUser = (req, res) => {
  res.status(200).json({ message: 'Đăng xuất thành công' });
};

module.exports = { registerUser, loginUser, logoutUser, getUserInfo, authenticateToken};

