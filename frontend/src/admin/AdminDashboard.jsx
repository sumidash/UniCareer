
import "./AdminDashboard.css";

function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,250",
      change: "+12.5%",
      description: "Compared to last month",
      icon: "♙",
    },
    {
      title: "Total Careers",
      value: "48",
      change: "+8.2%",
      description: "Available career paths",
      icon: "◈",
    },
    {
      title: "Total Skills",
      value: "120",
      change: "+5.4%",
      description: "Registered skills",
      icon: "⌘",
    },
    {
      title: "Active Users",
      value: "864",
      change: "+10.1%",
      description: "Currently active users",
      icon: "◎",
    },
  ];

  const growthData = [
    { month: "Jan", students: 25 },
    { month: "Feb", students: 38 },
    { month: "Mar", students: 32 },
    { month: "Apr", students: 52 },
    { month: "May", students: 46 },
    { month: "Jun", students: 68 },
    { month: "Jul", students: 60 },
    { month: "Aug", students: 82 },
    { month: "Sep", students: 73 },
    { month: "Oct", students: 92 },
    { month: "Nov", students: 85 },
    { month: "Dec", students: 100 },
  ];

  const careerData = [
    { name: "Software Development", percentage: 85 },
    { name: "Web Development", percentage: 70 },
    { name: "Data Science", percentage: 55 },
    { name: "AI & Machine Learning", percentage: 45 },
  ];

  const activities = [
    {
      title: "New student registered",
      detail: "A new student joined UniCareer",
      time: "10 minutes ago",
      icon: "♙",
    },
    {
      title: "Career path updated",
      detail: "Software Developer information updated",
      time: "35 minutes ago",
      icon: "◈",
    },
    {
      title: "New skill added",
      detail: "React.js added to the skills collection",
      time: "1 hour ago",
      icon: "⌘",
    },
    {
      title: "Student profile updated",
      detail: "A student updated their profile",
      time: "2 hours ago",
      icon: "◎",
    },
  ];

  return (
    <div className="admin-dashboard-content">
      <section className="admin-welcome">
        <div>
          <span className="admin-welcome-tag">ADMINISTRATION PANEL</span>
          <h1>Welcome to Admin Dashboard</h1>
          <p>
            Monitor students, manage career paths, and oversee
            the UniCareer platform.
          </p>
        </div>
        <div className="admin-welcome-icon">✦</div>
      </section>

      <section className="admin-stats-grid">
        {stats.map((stat) => (
          <div className="admin-stat-card" key={stat.title}>
            <div className="admin-stat-top">
              <div className="admin-stat-icon">{stat.icon}</div>
              <span className="admin-stat-change">{stat.change}</span>
            </div>
            <h3>{stat.value}</h3>
            <h4>{stat.title}</h4>
            <p>{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="admin-charts-grid">
        <div className="admin-chart-card">
          <div className="admin-section-heading">
            <div>
              <h2>Student Growth</h2>
              <p>Monthly student registration overview</p>
            </div>
            <span className="admin-chart-badge">2026</span>
          </div>

          <div className="growth-chart">
            <div className="growth-y-axis">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="growth-chart-area">
              <div className="growth-grid-lines">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <svg
                className="growth-svg"
                viewBox="0 0 600 220"
                preserveAspectRatio="none"
                role="img"
                aria-label="Illustrative monthly student growth chart"
              >
                <defs>
                  <linearGradient
                    id="growthFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#25C9B1" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#25C9B1" stopOpacity="0.01" />
                  </linearGradient>
                </defs>

                <path
                  d="M 0 165 L 54 136 L 109 149 L 163 106 L 218 119 L 272 80 L 327 97 L 381 57 L 436 73 L 490 35 L 545 48 L 600 10 L 600 220 L 0 220 Z"
                  fill="url(#growthFill)"
                />

                <polyline
                  points="0,165 54,136 109,149 163,106 218,119 272,80 327,97 381,57 436,73 490,35 545,48 600,10"
                  fill="none"
                  stroke="#25C9B1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {growthData.map((item, index) => {
                  const x = index * (600 / 11);
                  const y = 220 - item.students * 2.1;

                  return (
                    <circle
                      key={item.month}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#25C9B1"
                      stroke="#1B2435"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>

              <div className="growth-months">
                {growthData.map((item) => (
                  <span key={item.month}>{item.month}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="admin-chart-card career-distribution-card">
          <div className="admin-section-heading">
            <div>
              <h2>Career Distribution</h2>
              <p>Popular career categories</p>
            </div>
          </div>

          <div className="career-distribution-list">
            {careerData.map((career) => (
              <div className="career-distribution-item" key={career.name}>
                <div className="career-distribution-info">
                  <span>{career.name}</span>
                  <strong>{career.percentage}%</strong>
                </div>

                <div className="career-distribution-track">
                  <div
                    className="career-distribution-fill"
                    style={{ width: `${career.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="career-chart-footer">
            <span className="career-chart-dot" />
            <span>Career interest overview (sample data)</span>
          </div>
        </div>
      </section>

      <section className="admin-activity-card">
        <div className="admin-section-heading">
          <div>
            <h2>Recent Activity</h2>
            <p>Latest platform activities</p>
          </div>
          <span className="activity-count">04 Activities</span>
        </div>

        <div className="admin-activity-list">
          {activities.map((activity, index) => (
            <div className="admin-activity-item" key={index}>
              <div className="admin-activity-icon">{activity.icon}</div>

              <div className="admin-activity-details">
                <h4>{activity.title}</h4>
                <p>{activity.detail}</p>
              </div>

              <span className="admin-activity-time">{activity.time}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="admin-dashboard-footer">
        © 2026 UniCareer. All rights reserved.
      </footer>
    </div>
  );
}

export default AdminDashboard;
