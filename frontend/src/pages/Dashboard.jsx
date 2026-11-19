import { useEffect, useState } from "react";
import "./Dashboard.css";
import Profile from "../sections/Profile";
import MySkills from "../sections/MySkills";
import CareerGuidance from "../sections/CareerGuidance";
import CareerChat from "../components/CareerChat";

function Dashboard({ onLogout, currentUser }) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [mySkills, setMySkills] = useState([]);

  const userId = currentUser?.userId || "unknown";
  const storageKey = `unicareerSkills_${userId}`;

  const navigation = [
    { name: "Dashboard", icon: "⌂" },
    { name: "My Profile", icon: "◉" },
    { name: "My Skills", icon: "⌘" },
    { name: "AI Career Assistant", icon: "✧" },
    { name: "Career Recommendations", icon: "◎" },
    { name: "Skill Gap Analysis", icon: "▥" },
    { name: "Learning Roadmap", icon: "⇧" },
    { name: "Chat History", icon: "▤" },
  ];

  const careers = [
    {
      title: "Frontend Developer",
      match: "Explore",
      description: "Build modern and responsive websites.",
      icon: "⌘",
    },
    {
      title: "Backend Developer",
      match: "Explore",
      description: "Develop server-side applications and APIs.",
      icon: "⌨",
    },
    {
      title: "Data Analyst",
      match: "Explore",
      description: "Analyze data and discover useful insights.",
      icon: "▥",
    },
  ];

  useEffect(() => {
    try {
      const savedSkills = localStorage.getItem(storageKey);
      const parsedSkills = savedSkills ? JSON.parse(savedSkills) : [];
      setMySkills(Array.isArray(parsedSkills) ? parsedSkills : []);
    } catch {
      setMySkills([]);
    }
  }, [storageKey, activePage]);

  const advancedSkills = mySkills.filter(
    (skill) => skill.level === "Advanced"
  ).length;

  const skillCategories = new Set(
    mySkills.map((skill) => skill.category)
  ).size;

  const levelPercentage = {
    Beginner: 30,
    Intermediate: 65,
    Advanced: 90,
  };

  function renderDashboard() {
    return (
      <div className="dashboard-content">
        <section className="welcome-banner">
          <div className="welcome-text">
            <span className="welcome-tag">
              YOUR CAREER JOURNEY STARTS HERE
            </span>

            <h1>
              Welcome Back,
              <br />
              {currentUser?.fullName || "Student"}!
            </h1>

            <p>
              Build your skills, discover career opportunities, and create
              a roadmap toward your professional future.
            </p>

            <button
              className="welcome-button"
              onClick={() => setActivePage("AI Career Assistant")}
            >
              Explore Career Assistant <span>→</span>
            </button>
          </div>

          <div className="welcome-decoration">
            <div className="decoration-circle">
              <div className="decoration-inner">✧</div>
            </div>

            <div className="floating-card floating-card-one">
              <span>✦</span> Smart Career
            </div>

            <div className="floating-card floating-card-two">
              Skill Development
            </div>
          </div>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon green-icon">⌘</div>
            <div>
              <p>Total Skills</p>
              <h2>{mySkills.length.toString().padStart(2, "0")}</h2>
              <span>Your added skills</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple-icon">✧</div>
            <div>
              <p>Advanced Skills</p>
              <h2>{advancedSkills.toString().padStart(2, "0")}</h2>
              <span>Advanced proficiency</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange-icon">◎</div>
            <div>
              <p>Skill Categories</p>
              <h2>{skillCategories.toString().padStart(2, "0")}</h2>
              <span>Different categories</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue-icon">♧</div>
            <div>
              <p>Career Paths</p>
              <h2>07</h2>
              <span>Available career paths</span>
            </div>
          </div>
        </section>

        <section className="dashboard-middle">
          <div className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <h3>My Skills Overview</h3>
                <p>Your current skill proficiency levels.</p>
              </div>

              <button onClick={() => setActivePage("My Skills")}>
                View All →
              </button>
            </div>

            {mySkills.length === 0 ? (
              <div className="empty-dashboard-skills">
                <p>You have not added any skills yet.</p>

                <button onClick={() => setActivePage("My Skills")}>
                  + Add Your Skills
                </button>
              </div>
            ) : (
              <div className="skills-list">
                {mySkills.slice(0, 5).map((skill, index) => (
                  <div className="skill-item" key={skill.id || index}>
                    <div className="skill-info">
                      <span>{skill.skillName}</span>
                      <span>
                        {levelPercentage[skill.level] || 0}%
                      </span>
                    </div>

                    <div className="skill-progress">
                      <div
                        className="skill-progress-fill"
                        style={{
                          width: `${levelPercentage[skill.level] || 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="dashboard-panel assistant-panel">
            <div className="assistant-symbol">✧</div>

            <span className="assistant-label">AI POWERED</span>

            <h3>Your Personal AI Career Assistant</h3>

            <p>
              Get personalized career guidance, discover skill gaps, and
              explore learning opportunities based on your interests.
            </p>

            <button
              className="assistant-button"
              onClick={() => setActivePage("AI Career Assistant")}
            >
              Get Career Guidance →
            </button>
          </div>
        </section>

        <section className="dashboard-panel career-panel">
          <div className="panel-heading">
            <div>
              <h3>Explore Career Paths</h3>
              <p>Discover career options for your future.</p>
            </div>

            <button
              onClick={() => setActivePage("AI Career Assistant")}
            >
              Explore All →
            </button>
          </div>

          <div className="career-grid">
            {careers.map((career) => (
              <div className="career-card" key={career.title}>
                <div className="career-icon">{career.icon}</div>

                <span className="career-match">{career.match}</span>

                <h4>{career.title}</h4>

                <p>{career.description}</p>

                <button
                  onClick={() =>
                    setActivePage("AI Career Assistant")
                  }
                >
                  Explore Career →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-panel roadmap-preview">
          <div className="roadmap-icon">⇧</div>

          <div className="roadmap-text">
            <h3>Your Learning Roadmap</h3>
            <p>
              Follow a structured learning path to improve your skills
              and achieve your career goals.
            </p>
          </div>

          <button onClick={() => setActivePage("Learning Roadmap")}>
            View Roadmap →
          </button>
        </section>

        <footer className="dashboard-footer">
          <p>© 2026 UniCareer. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="brand-icon">U</div>
          <span>
            Uni<span>Career</span>
          </span>
        </div>

        <p className="sidebar-label">MAIN MENU</p>

        <nav className="sidebar-navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`sidebar-link ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => setActivePage(item.name)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p className="sidebar-label">ACCOUNT</p>

          <button
            className="sidebar-link logout-link"
            onClick={onLogout}
          >
            <span className="sidebar-icon">↪</span>
            <span>Logout</span>
          </button>

          <div className="sidebar-profile">
            <div className="profile-avatar">
              {(currentUser?.fullName || "S").charAt(0).toUpperCase()}
            </div>

            <div>
              <h4>{currentUser?.fullName || "Student"}</h4>
              <p>University Student</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="topbar-subtitle">
              UNICAREER / STUDENT PORTAL
            </p>
            <h2>{activePage}</h2>
          </div>

          <div className="topbar-actions">
            <button className="notification-button" type="button">
              ♧
              <span />
            </button>

            <div className="topbar-avatar">
              {(currentUser?.fullName || "S").charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {activePage === "Dashboard" ? (
          renderDashboard()
        ) : activePage === "My Profile" ? (
          <Profile currentUser={currentUser} />
        ) : activePage === "My Skills" ? (
          <MySkills currentUser={currentUser} />
        ) : activePage === "AI Career Assistant" ? (
          <>
            <CareerChat currentUser={currentUser} />
            <CareerGuidance currentUser={currentUser} />
          </>
        ) : activePage === "Career Recommendations" ? (
          <CareerGuidance currentUser={currentUser} />
        ) : (
          <div className="coming-soon">
            <div className="coming-soon-icon">✧</div>

            <span>UNICAREER FEATURE</span>

            <h2>{activePage}</h2>

            <p>
              This section is currently under development. New features
              will be available soon.
            </p>

            <button onClick={() => setActivePage("Dashboard")}>
              Back to Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;