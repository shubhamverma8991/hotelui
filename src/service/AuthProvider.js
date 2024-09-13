import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Add userRole state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const auth = localStorage.getItem("auth") === "true";
    const role = localStorage.getItem("role");
    console.log(auth, role);
    if (auth) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const login = (role) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("role", role); // Save role to localStorage
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/"); // Navigate to home
  };

  return <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
