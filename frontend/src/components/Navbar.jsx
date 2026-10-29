
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <a href="#home" className="navbar-logo">
        Uni<span>Career</span>
        <span className="logo-dot">.</span>
      </a>

      <div className="navbar-links">
        <a href="#home" className="active">Home</a>
        <a href="#career">Career Guidance</a>
        <a href="#skills">Skill Gap</a>
        <a href="#roadmap">Learning Roadmap</a>
      </div>

      <a href="#profile" className="navbar-button">
        Get Started <span>↗</span>
      </a>
    </nav>
  );
}

export default Navbar;
