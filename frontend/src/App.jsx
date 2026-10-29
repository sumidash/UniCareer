
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main id="home" className="home-placeholder">
        <p>YOUR FUTURE STARTS HERE</p>
        <h1>Welcome to UniCareer</h1>
        <span>Your career journey begins here.</span>
      </main>
    </div>
  );
}

export default App;
