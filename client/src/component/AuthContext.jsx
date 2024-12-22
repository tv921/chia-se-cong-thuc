import React, { createContext, useState, useEffect } from "react";
import jwt_decode from 'jwt-decode'; // Import mặc định

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt_decode(token); // Sử dụng jwt_decode
      setUser(decoded);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwt_decode(token); // Sử dụng jwt_decode
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



