
import "./Login.css";

function Login({ onLogin })  {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">UniCareer<span>.</span></div>

        <h1>Welcome Back!</h1>
        <p className="login-subtitle">
          Login to continue your career journey.
        </p>

        <form>
          <label>User ID</label>
          <input
            type="text"
            placeholder="Enter your User ID"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="button" onClick={onLogin}>Login</button>     
        </form>

        <p className="signup-text">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
