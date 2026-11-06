
import { useState } from "react";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import CareerGuidance from "./sections/CareerGuidance";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Navbar />

      <main>
        <Home />
        <CareerGuidance />
      </main>
    </div>
  );
}

export default App;

