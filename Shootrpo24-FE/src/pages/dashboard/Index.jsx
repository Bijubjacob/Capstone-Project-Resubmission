import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import styles from "./Dashboard.module.css";
import UserProfile from "../../components/User_Profile/UserProfile";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onLogout={handleLogout}
      />

      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>Welcome to Your Dashboard</h1>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </header>

        <div className={styles.contentArea}>
          {activeSection === "profile" && <UserProfile />}
          {activeSection === "settings" && (
            <div className={styles.settingsSection}>
              <h2>Settings</h2>
              {/* Settings content */}
            </div>
          )}
          {activeSection === "projects" && (
            <div className={styles.projectsSection}>
              <h2>Your Projects</h2>
              {/* Projects content */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
