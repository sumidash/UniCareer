import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unicareerUsers")) || [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState(null);

  function updateUsers(newUsers) {
    setUsers(newUsers);
    localStorage.setItem("unicareerUsers", JSON.stringify(newUsers));
  }

  function handleLogin(user) {
    setCurrentUser(user);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    setCurrentUser(null);
    setCurrentPage("login");
  }

  if (currentPage === "login") {
    return (
      <Login
        users={users}
        onLogin={handleLogin}
        onRegisterClick={() => setCurrentPage("register")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <Register
        users={users}
        setUsers={updateUsers}
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