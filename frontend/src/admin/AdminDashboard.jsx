
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCareers: 0,
    totalSkills: 0,
    careerDistribution: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("unicareerToken")}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load dashboard.");
        }

        setStats(data.stats);
      } catch (err) {
        setError(err.message || "Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  const totalDistributedCareers = stats.careerDistribution.reduce(
    (total, item) => total + item.count,
    0
  );

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      description: "Registered students",
      icon: "♙",
    },
    {
      title: "Total Careers",
      value: stats.totalCareers,
      description: "Available career paths",
      icon: "◈",
    },
    {
      title: "Total Skills",
      value: stats.totalSkills,
      description: "Registered skills",
      icon: "⌘",
    },
    {
      title: "Active Users",
      value: "N/A",
      description: "Activity tracking not available",
      icon: "◎",
    },
  ];

  return (
    <div className="admin-dashboard-content">
      <section className="admin-welcome">
        <div>
          <span className="admin-welcome-tag">
            ADMINISTRATION PANEL
          </span>
          <h1>Welcome to Admin Dashboard</h1>
          <p>
            Monitor students, manage career paths, and oversee
            the UniCareer platform.
          </p>
        </div>

        <div className="admin-welcome-icon">✦</div>
      </section>

      {error && <p className="form-message">{error}</p>}

      <section className="admin-stats-grid">
        {statCards.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <div className="admin-stat-top">
              <div className="admin-stat-icon">{stat.icon}</div>
            </div>

            <h3>
              {loading ? "..." : stat.value}
            </h3>

            <h4>{stat.title}</h4>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="admin-charts-grid">
        <div className="admin-chart-card">
          <div className="admin-section-heading">
            <div>
              <h2>Platform Overview</h2>
              <p>Current registered platform data</p>
            </div>

            <span className="admin-chart-badge">Live Data</span>
          </div>

          <div className="career-distribution-list">
            <div className="career-distribution-item">
              <div className="career-distribution-info">
                <span>Total Students</span>
                <strong>
                  {loading ? "..." : stats.totalStudents}
                </strong>
              </div>

              <div className="career-distribution-track">
                <div
                  className="career-distribution-fill"
                  style={{
                    width: stats.totalStudents > 0 ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            <div className="career-distribution-item">
              <div className="career-distribution-info">
                <span>Total Careers</span>
                <strong>
                  {loading ? "..." : stats.totalCareers}
                </strong>
              </div>

              <div className="career-distribution-track">
                <div
                  className="career-distribution-fill"
                  style={{
                    width: stats.totalCareers > 0 ? "100%" : "0%",
                  }}
                />
              </div>
            </div>

            <div className="career-distribution-item">
              <div className="career-distribution-info">
                <span>Total Skills</span>
                <strong>
                  {loading ? "..." : stats.totalSkills}
                </strong>
              </div>

              <div className="career-distribution-track">
                <div
                  className="career-distribution-fill"
                  style={{
                    width: stats.totalSkills > 0 ? "100%" : "0%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-chart-card career-distribution-card">
          <div className="admin-section-heading">
            <div>
              <h2>Career Distribution</h2>
              <p>Careers grouped by category</p>
            </div>
          </div>

          <div className="career-distribution-list">
            {loading ? (
              <p>Loading career distribution...</p>
            ) : stats.careerDistribution.length > 0 ? (
              stats.careerDistribution.map((career) => {
                const percentage =
                  totalDistributedCareers > 0
                    ? Math.round(
                        (career.count / totalDistributedCareers) * 100
                      )
                    : 0;

                return (
                  <div
                    className="career-distribution-item"
                    key={career._id}
                  >
                    <div className="career-distribution-info">
                      <span>{career._id}</span>
                      <strong>{percentage}%</strong>
                    </div>

                    <div className="career-distribution-track">
                      <div
                        className="career-distribution-fill"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p>{career.count} careers</p>
                  </div>
                );
              })
            ) : (
              <p>No career data available.</p>
            )}
          </div>

          <div className="career-chart-footer">
            <span className="career-chart-dot" />
            <span>Based on MongoDB career records</span>
          </div>
        </div>
      </section>

      <section className="admin-activity-card">
        <div className="admin-section-heading">
          <div>
            <h2>Platform Information</h2>
            <p>Current system status</p>
          </div>
        </div>

        <div className="admin-activity-list">
          <div className="admin-activity-item">
            <div className="admin-activity-icon">✓</div>
            <div className="admin-activity-details">
              <h4>Student Management</h4>
              <p>Student records are connected to MongoDB.</p>
            </div>
          </div>

          <div className="admin-activity-item">
            <div className="admin-activity-icon">✓</div>
            <div className="admin-activity-details">
              <h4>Skills Management</h4>
              <p>Skill records are connected to MongoDB.</p>
            </div>
          </div>

          <div className="admin-activity-item">
            <div className="admin-activity-icon">✓</div>
            <div className="admin-activity-details">
              <h4>Career Management</h4>
              <p>Career records are connected to MongoDB.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="admin-dashboard-footer">
        © 2026 UniCareer. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminDashboard;
