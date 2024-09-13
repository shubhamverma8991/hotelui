import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../service/AuthProvider";
import "../styles/Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [focusedField, setFocusedField] = useState("");
  useEffect(() => {
    const emailInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    emailInput.addEventListener("focus", () => handleFocus("email"));
    passwordInput.addEventListener("focus", () => handleFocus("password"));
    emailInput.addEventListener("blur", handleBlur);
    passwordInput.addEventListener("blur", handleBlur);
    return () => {
      emailInput.removeEventListener("focus", handleFocus);
      passwordInput.removeEventListener("focus", handleFocus);
      emailInput.removeEventListener("blur", handleBlur);
      passwordInput.removeEventListener("blur", handleBlur);
    };
  }, []);

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();
    if (trimmedUsername === "admin" && trimmedPassword === "password") {
      login("admin");
      navigate("/");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid login credentials.");
    }
  };

  return (
    <div className="login_container">
      <div className="logincard">
        <div className="cartoon">
          <img src="https://i.ibb.co.com/98gpLCQ/l1.png" alt="" style={{ display: focusedField === "" ? "block" : "none" }} />
          <img src="https://i.ibb.co.com/Vq5j4Vg/l2.png" alt="" style={{ display: focusedField === "password" ? "block" : "none" }} />
          <img src="https://i.ibb.co.com/Y0jsj90/l3.png" alt="" style={{ display: focusedField === "email" ? "block" : "none" }} />
        </div>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button className="loginbutton" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
