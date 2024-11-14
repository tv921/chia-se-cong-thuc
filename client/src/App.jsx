import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './component/Navbar';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import AddRecipe from './pages/AddRecipe';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetail from './pages/RecipeDetail';
import Sidebar from './component/Sidebar';


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
                            <Route path="/" element={<Home />} />
                            <Route path="/recipes/:id" element={<RecipeDetail />} />
                            <Route path="/recipes" element={<Recipes />} />
                            <Route path="/add-recipe" element={<AddRecipe />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>         
                </div>
            </div>
        </Router>
    );
}

export default App;

