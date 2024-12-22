import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar></Navbar>

          {/* Content Area */}
          <div className="flex-1 p-6 bg-gray-100">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:id" element={<RecipeDetail />} />

              {/* User Routes */}
              <Route
                path="/add-recipe"
                element={
                  <PrivateRoute roles={["user", "admin"]}>
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

