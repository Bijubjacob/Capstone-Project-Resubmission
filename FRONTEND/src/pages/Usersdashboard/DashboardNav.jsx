import React from "react";
import styles from "./DashboardNav.module.css";

const DashboardNav = ({ activeSection, setActiveSection, logout }) => {
  const navItems = [
    { id: "userDashboard", label: "Dashboard", icon: "📊" },
    { id: "projects", label: "Projects", icon: "📁" },
    { id: "settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <nav className={styles.dashboardNav}>
      <div className={styles.logo}>
        <h2>ShootPro24</h2>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`${styles.navButton} ${activeSection === item.id ? styles.active : ""}`}
              onClick={() => setActiveSection(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Add Logout button under settings */}
        <button
          className={styles.navButton}
          onClick={logout}  // Call logout function when button is clicked
        >
          <span className={styles.icon}>🚪</span>
          Logout
        </button>
    </nav>
  );
};

export default DashboardNav;
