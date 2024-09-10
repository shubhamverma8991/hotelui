import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import AuthContext from "../service/AuthProvider";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          Hotel Search Engine
        </Link>
      </div>
      <div className="navbar-menu">
        {isAuthenticated ? (
          <>
            <Link to="/add" className="navbar-item">
              Add Hotel
            </Link>
            <Link to="/delete" className="navbar-item">
              Delete Hotel
            </Link>
            <Link to="/update" className="navbar-item">
              Update Hotel
            </Link>
            <button className="navbar-item" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="navbar-item">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
