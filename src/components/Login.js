import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../service/AuthProvider";
import "../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    console.log(trimmedUsername, trimmedPassword);
    if (trimmedUsername === "admin" && trimmedPassword === "password") {
      login("admin");
      navigate("/");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid login credentials.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
          </label>
        </div>
        <div className="input-group">
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
          </label>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
