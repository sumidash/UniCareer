import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onRegisterClick, users }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const matchedUser = users.find(
      (user) =>
        user.userId.toLowerCase() === userId.trim().toLowerCase() &&
        user.password === password
    );

    if (!matchedUser) {
      setError("Invalid User ID or Password.");
      return;
    }

    // Send the logged-in user's information to App.jsx
    onLogin(matchedUser);
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          UniCareer<span>.</span>
        </div>

        <h1>Welcome Back!</h1>

        <p className="login-subtitle">
          Login to continue your career journey.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label>User ID</label>
          <input
            type="text"
            name="login-user-id"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            autoComplete="off"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="login-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            required
          />

          <div className="forgot-password">
            <a href="#" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>

          {error && <p className="form-message">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onRegisterClick();
            }}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;