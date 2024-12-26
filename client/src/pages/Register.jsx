import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  return (
    <div className="max-w-md mx-auto w-full bg-sky-200 rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-violet-600">Đăng ký</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-lg font-medium text-black">
            Tên người dùng
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-lg font-medium text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-lg font-medium text-black">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block text-lg font-medium text-black">
            Xác nhận mật khẩu
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-violet-500 text-white text-lg font-bold rounded-lg hover:bg-violet-700 transition">
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
