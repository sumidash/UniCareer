
import "./Home.css";

function Home() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          YOUR FUTURE, REIMAGINED
        </div>

        <h1>
          Discover Your
          <br />
          <span>Perfect Career</span>
          <br />
          Path.
        </h1>

        <p className="hero-description">
          Your potential is unique. Find the right career,
          discover your skill gaps, and build a personalized
          roadmap to achieve your professional goals.
        </p>

        <div className="hero-actions">
          <a href="#career" className="hero-primary-btn">
            Explore Careers <span>↗</span>
          </a>

          <a href="#skills" className="hero-secondary-btn">
            Analyze My Skills
          </a>
        </div>

        <div className="hero-trust">
          <div className="trust-avatars">
            <span>S</span>
            <span>C</span>
            <span>U</span>
          </div>
          <p>
            <strong>Built for students</strong>
            <br />
            Your journey. Your future.
          </p>
        </div>
      </div>

      <div className="hero-visual">
        <div className="visual-glow"></div>

        <div className="career-card">
          <div className="card-top">
            <div>
              <span className="card-label">YOUR CAREER PROFILE</span>
              <h3>Career Discovery</h3>
            </div>
            <span className="card-icon">✦</span>
          </div>

          <div className="career-highlight">
            <div className="career-symbol">⌘</div>
            <div>
              <span className="card-label">RECOMMENDED PATH</span>
              <h2>Software Developer</h2>
              <p>Technology &amp; Innovation</p>
            </div>
          </div>

          <div className="match-header">
            <span>Skills Development</span>
            <span className="match-number">Your roadmap</span>
          </div>

          <div className="skill-item">
            <div className="skill-info">
              <span>Programming</span>
              <span>Core skill</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill fill-one"></div>
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-info">
              <span>Problem Solving</span>
              <span>Core skill</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill fill-two"></div>
            </div>
          </div>

          <div className="skill-item">
            <div className="skill-info">
              <span>Web Development</span>
              <span>Core skill</span>
            </div>
            <div className="skill-track">
              <div className="skill-fill fill-three"></div>
            </div>
          </div>

          <div className="card-footer">
            <span className="footer-star">✦</span>
            Personalized career guidance
          </div>
        </div>

        <div className="floating-note">
          <span className="floating-icon">↗</span>
          <div>
            <strong>Grow with purpose</strong>
            <p>One step at a time</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
