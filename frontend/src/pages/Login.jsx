import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = () => {
    if (username === "vignesh" && password === "admin@123") {
      nav("/chat");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="center-box">
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
