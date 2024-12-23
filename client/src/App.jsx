import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar1 from "./component/Navbar1";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import RecipeDetail from "./pages/RecipeDetail";
import Sidebar from "./component/Sidebar";
import EditRecipe from "./pages/EditRecipe";
import ManageRecipes from "./pages/ManageRecipes";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Kiểm tra trạng thái đăng nhập từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

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
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;


