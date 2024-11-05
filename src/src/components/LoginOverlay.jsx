import { useState } from "react";
import { login, signUp } from "../api"

function LoginOverlay({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await login(username, password);
      onLogin(username);  // Assume successful login if no error
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Invalid username or password. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const result = await signUp(username, password);
      onLogin(username);  // Log in user after successful sign-up
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Unable to sign up. Please try a different username.");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={formStyle}>
        <h2>Login</h2>
        <div>
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const formStyle = {
  background: "#242",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  display: "grid",
  gap: "10px",
};

const inputStyle = {
  fontSize: "26px",
}

export default LoginOverlay;

