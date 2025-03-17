import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import axios from "axios"; 
import styles from "./Dashboard.module.css";
import DashboardNav from "./DashboardNav";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("userDashboard");
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState("");
  const { cookies, logout, removeCookie } = useAuth(); 
  const navigate = useNavigate();

  // State to handle dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = cookies.token;
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: {
            'x-auth-token': cookies.token,
          },
        });
        setUserDetails(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError("Token expired or invalid. Please log in again.");
          removeCookie("token");
          navigate("/auth");
        } else {
          setError("Failed to fetch user data");
        }
      }
    };

    fetchUserData();
  }, [cookies.token, removeCookie, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardNav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>Welcome to Your Dashboard</h1>

          {/* Dropdown Menu Button */}
          <div className={styles.dropdown}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>
              <span>Profile</span>
              <i className={`fa fa-chevron-down ${styles.dropdownIcon}`}></i>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => navigate("/settings")}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </header>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.contentArea}>
          {userDetails && !error && (
            <div className={styles.userDetailsSection}>
              <h2>User Details</h2>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
            </div>
          )}

          {activeSection === "projects" && (
            <div className={styles.projectsSection}>
              <h2>Your Projects</h2>
            </div>
          )}
          {activeSection === "settings" && (
            <div className={styles.settingsSection}>
              <h2>Settings</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
