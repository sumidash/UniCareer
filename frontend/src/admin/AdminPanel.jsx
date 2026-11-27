
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminDashboard from "./AdminDashboard";
import StudentManagement from "./StudentManagement";
import CareerManagement from "./CareerManagement";
import SkillsManagement from "./SkillsManagement";

function AdminPanel({ admin, onLogout }) {
  const [activePage, setActivePage] = useState("Dashboard");

  function renderPage() {
    switch (activePage) {
      case "Dashboard":
        return <AdminDashboard />;

      case "Students":
        return <StudentManagement />;

      case "Careers":
        return <CareerManagement />;

      case "Skills":
        return <SkillsManagement />;

      default:
        return <AdminDashboard />;
    }
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#111827",
      }}
    >
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
        admin={admin}
      />

      <main style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            minHeight: "85px",
            padding: "20px 28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#1B2435",
            borderBottom: "1px solid rgba(132,145,165,0.15)",
          }}
        >
          <div>
            <p
              style={{
                color: "#8491A5",
                fontSize: "11px",
                margin: "0 0 7px",
              }}
            >
              UNICAREER / ADMIN PORTAL
            </p>

            <h2
              style={{
                color: "#F1F5F9",
                fontSize: "21px",
                margin: 0,
              }}
            >
              {activePage}
            </h2>
          </div>

          <div
            style={{
              color: "#25C9B1",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            Administrator
          </div>
        </header>

        {renderPage()}
      </main>
    </div>
  );
}

export default AdminPanel;
