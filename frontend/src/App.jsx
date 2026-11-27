
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./admin/AdminPanel";
import AdminSetup from "./pages/AdminSetup";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");

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
    setCurrentPage(user.role === "admin" ? "admin" : "dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("unicareerToken");
    localStorage.removeItem("unicareerUser");
    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentPage === "adminSetup") {
    return <AdminSetup onBack={() => setCurrentPage("login")} />;
  }

  if (currentPage === "register") {
    return <Register onLoginClick={() => setCurrentPage("login")} />;
  }

  if (currentPage === "admin") {
    return <AdminPanel admin={currentUser} onLogout={handleLogout} />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard currentUser={currentUser} onLogout={handleLogout} />;
  }

  return (
    <Login
      onLogin={handleLogin}
      onRegisterClick={() => setCurrentPage("register")}
      onAdminSetupClick={() => setCurrentPage("adminSetup")}
    />
  );
}

export default App;
