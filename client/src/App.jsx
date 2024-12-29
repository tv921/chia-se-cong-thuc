import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import './css/index.css';


import Navbar1 from "./component/Navbar1";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import RecipeDetail from "./pages/RecipeDetail";
import Sidebar from "./component/Sidebar";
import Sidebar1 from "./component/Sidebar1";
import EditRecipe from "./pages/EditRecipe";
import ManageRecipes from "./pages/ManageRecipes";
import PrivateRoute from "./component/PrivateRoute";
import SearchResults from './pages/SearchResults';
import UpdateUser from "./pages/UpdateUser";
import ManageUsers from "./pages/ManageUsers";
import ManageComments from "./pages/ManageComments";
import Warning from "./component/warning";
import Statistics from "./pages/Statistics";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Kiểm tra trạng thái đăng nhập từ localStorage và cập nhật userRole
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const decoded = jwtDecode(token); // Giải mã token
        console.log("Decoded token:", decoded); // In ra token đã giải mã để kiểm tra
        setUserRole(decoded.role); // Lấy vai trò từ token
        console.log("User Role:", decoded.role); // In ra vai trò
      } catch (error) {
        console.error("Invalid token", error);
        setIsLoggedIn(false);
      }
    }

    // Ghi nhận lượt truy cập
  axios.post("http://localhost:5000/api/visits/record").catch((err) => console.error("Failed to record visit:", err));
  }, []); // Chạy khi component mount hoặc khi token thay đổi.

  const handleLogin = () => {
    setIsLoggedIn(true);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role); // Cập nhật ngay vai trò
      } catch (error) {
        console.error("Invalid token during login", error);
      }
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null); // Reset userRole khi đăng xuất
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        {userRole === "admin" ? (
          <Sidebar key="admin-sidebar" />
        ) : (
          <Sidebar1 key="user-sidebar" />
        )}

      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        {isLoggedIn ? (
          <Navbar1 onLogout={handleLogout} />
        ) : (
          <Navbar />
        )}

          {/* Content Area */}
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/warning" element={<Warning />} />

              <Route
                path="/update-user"
                element={
                  <PrivateRoute roles={["user", "admin"]}>
                    <UpdateUser />
                  </PrivateRoute>
                }
              />

              {/* User Routes */}
              <Route
                path="/add-recipe"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <AddRecipe />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit-recipe/:id"
                element={
                  <PrivateRoute roles={["user", "admin"]}>
                    <EditRecipe />
                  </PrivateRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/manage-recipes"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageRecipes />
                  </PrivateRoute>
                }
              />

              <Route
                path="/manage-users"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageUsers />
                  </PrivateRoute>
                }
              />

              <Route
                path="/manage-comments"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <ManageComments />
                  </PrivateRoute>
                }
              />

              <Route
                path="/statistics"
                element={
                  <PrivateRoute roles={["admin"]}>
                    <Statistics />
                  </PrivateRoute>
                }
              />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;



