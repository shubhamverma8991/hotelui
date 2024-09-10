import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../service/AuthProvider";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    let role = "user"; // Default role is 'user'
    if (username === "admin" && password === "password") {
      role = "admin";
    }
    login(role);
    navigate("/");
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
