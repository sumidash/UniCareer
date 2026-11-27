
import { useState } from "react";
import "./Login.css";

function Login({ onLogin, onRegisterClick }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/student/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid User ID or Password.");
        return;
      }

      onLogin(data.user, data.token);
    } catch (error) {
      setError("Unable to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
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
