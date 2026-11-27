
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem("unicareerToken") &&
      localStorage.getItem("unicareerUser")
      ? "dashboard"
      : "login";
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unicareerUser")) || null;
    } catch {
      return null;
    }
  });

  function handleLogin(user, token) {
    localStorage.setItem("unicareerToken", token);
    localStorage.setItem("unicareerUser", JSON.stringify(user));

    setCurrentUser(user);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("unicareerToken");
    localStorage.removeItem("unicareerUser");

    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentPage === "login") {
    return (
      <Login
        onLogin={handleLogin}
        onRegisterClick={() => setCurrentPage("register")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <Register
        onLoginClick={() => setCurrentPage("login")}
      />
    );
  }

  return (
    <Dashboard
      currentUser={currentUser}
      onLogout={handleLogout}
    />
  );
}

export default App;
