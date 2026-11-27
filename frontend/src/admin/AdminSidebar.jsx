
function AdminSidebar({ activePage, setActivePage, onLogout, admin }) {
  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Students", icon: "♙" },
    { name: "Careers", icon: "◈" },
    { name: "Skills", icon: "⌘" },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">U</div>
        <h2>Uni<span>Career</span></h2>
      </div>

      <p className="admin-menu-label">ADMIN MENU</p>

      <nav className="admin-navigation">
        {navigation.map((item) => (
          <button
            key={item.name}
            className={`admin-nav-link ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span>{item.name}</span>
            {activePage === item.name && (
              <span className="admin-active-indicator" />
            )}
          </button>
        ))}
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-profile">
          <div className="admin-avatar">
            {(admin?.fullName || "A").charAt(0).toUpperCase()}
          </div>
          <div className="admin-profile-info">
            <h4>{admin?.fullName || "Administrator"}</h4>
            <p>System Admin</p>
          </div>
        </div>

        <button className="admin-logout-button" onClick={onLogout}>
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
