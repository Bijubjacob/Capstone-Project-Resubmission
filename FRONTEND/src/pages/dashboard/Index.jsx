import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import axios from "axios";
import styles from "./Dashboard.module.css";
import DashboardNav from "./DashboardNav";
import ProfileUpdateForm from "../Profile/ProfileUpdateForm"; // Assuming you have this component for updating profile
import UserProfile from "../Profile/UserProfile"; // Assuming you have this component to display profile

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("userDashboard");
  const [userDetails, setUserDetails] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state for requests
  const { cookies, logout, removeCookie } = useAuth();
  const navigate = useNavigate();

  // State to handle dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  // Fetch user and profile data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Start loading
      const token = cookies.token;
      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // Fetch user details
        const response = await axios.get("http://localhost:3000/api/auth/user", {
          headers: {
            "x-auth-token": cookies.token,
          },
        });
        setUserDetails(response.data);

        // Fetch user profile
        const profileResponse = await axios.get("http://localhost:3000/api/profile", {
          headers: {
            "x-auth-token": cookies.token,
          },
        });
        setProfile(profileResponse.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("Profile not found. Please create one.");
          setProfile(null); // Ensure no profile data is set
        } else if (err.response && err.response.status === 401) {
          setError("Token expired or invalid. Please log in again.");
          removeCookie("token");
          navigate("/auth");
        } else {
          setError("Failed to fetch user data");
        }
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchUserData();
  }, [cookies.token, removeCookie, navigate]);

  const handleLogout = async () => {
    setLoading(true); // Start loading
    try {
      await logout();
      navigate("/auth");
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Consolidated profile save function (handles both create and update)
  const handleProfileSave = async (profileData) => {
    setLoading(true); // Start loading
    const url = profile ? "http://localhost:3000/api/profile" : "http://localhost:3000/api/profile";
    const method = profile ? "put" : "post"; // Determine if it's an update or creation

    try {
      const response = await axios[method](url, profileData, {
        headers: {
          "x-auth-token": cookies.token,
        },
      });
      setProfile(response.data);
      setActiveSection("userDashboard");
    } catch (err) {
      setError("Failed to save profile.");
      console.error("Profile save failed:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  // Delete profile
  const handleDeleteProfile = async () => {
    setLoading(true); // Start loading
    try {
      await axios.delete("http://localhost:3000/api/profile", {
        headers: {
          "x-auth-token": cookies.token,
        },
      });
      setProfile(null);
      setActiveSection("userDashboard");
    } catch (err) {
      setError("Failed to delete profile.");
      console.error("Delete profile failed:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardNav activeSection={activeSection} setActiveSection={setActiveSection} />

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

        {loading && <div className={styles.loadingIndicator}>Loading...</div>} {/* Show loading spinner */}

        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.contentArea}>
          {userDetails && !error && (
            <div className={styles.userDetailsSection}>
              <h2>User Details</h2>
              <p>Name: {userDetails.name}</p>
              <p>Email: {userDetails.email}</p>
            </div>
          )}

          {profile ? (
            // Display Profile if exists
            <UserProfile profile={profile} />
          ) : (
            // Display Create Profile form if no profile exists
            activeSection === "userDashboard" && (
              <div className={styles.createProfileSection}>
                <h2>Create Your Profile</h2>
                <ProfileUpdateForm onProfileUpdated={handleProfileSave} />
              </div>
            )
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

          {/* Edit Profile */}
          {activeSection === "editProfile" && (
            <div className={styles.editProfileSection}>
              <h2>Edit Your Profile</h2>
              <ProfileUpdateForm
                profile={profile}
                onProfileUpdated={handleProfileSave}
              />
            </div>
          )}

          {/* Delete Profile */}
          {profile && (
            <div className={styles.deleteProfileSection}>
              <button onClick={handleDeleteProfile}>Delete Profile</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
