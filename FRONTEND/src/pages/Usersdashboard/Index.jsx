import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import api from "../../utils/api"; // Import the API instance
import styles from "./Dashboard.module.css";
import DashboardNav from "./DashboardNav";
import UserProfile from "../Usersprofile/UserProfile";
import ProfileUpdateForm from "../Usersprofile/ProfileUpdateForm";
import profilePicture from "../public/Images/765-default-avatar.png";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("userDashboard");
  const [userDetails, setUserDetails] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileError, setProfileError] = useState(null); // Track profile-related errors
  const { cookies, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (!cookies.token) {
        navigate("/auth");
        return;
      }

      setLoading(true);
      try {
        // Fetch user data
        const userRes = await api.get("/auth/user"); // Use the API instance to fetch user data
        if (isMounted) {
          setUserDetails(userRes.data);

          // Check if the user is an admin and redirect accordingly
          if (userRes.data.role === "admin") {
            navigate("/admin/dashboard");  // Redirect admin users to the Admin Dashboard
          }
        }

        // Fetch user profile
        try {
          const profileRes = await api.get("/profile"); // Use the API instance to fetch profile data
          if (isMounted) {
            setProfile(profileRes.data);
          }
        } catch (profileError) {
          if (isMounted) {
            setProfileError("Profile not found, please create one."); // Set error message if profile is not found
            setProfile(null); // Clear profile if not found
          }
        }
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    return () => { isMounted = false; };
  }, [cookies.token, navigate]);

  const handleUpdateSuccess = (updatedProfile) => {
    setProfile(updatedProfile);
    setActiveSection("userDashboard"); // Redirect back to user dashboard after successful update
  };

  const handleCreateProfile = () => {
    // Function to handle profile creation redirection
    navigate("/create-profile"); // Make sure you have a route set up for profile creation
  };

  return (
    <div className={styles.dashboardContainer}>
      <DashboardNav activeSection={activeSection} setActiveSection={setActiveSection} logout={logout} />
      <div className={styles.dashboardLayout}>
        <div className={styles.centerSection}>
          <h1>Welcome, {userDetails?.name}</h1>
          <div className={styles.userDetails}>
            <h2>User Details</h2>
            <p>Name: {userDetails?.name}</p>
            <p>Email: {userDetails?.email}</p>
          </div>

          {profileError && (
            <div className={styles.profileError}>
              <p>{profileError}</p>
              <button onClick={handleCreateProfile}>Create Profile</button>
            </div>
          )}

          {activeSection === "userDashboard" && profile && (
            <UserProfile profile={profile} onEditProfile={() => setActiveSection("settings")} />
          )}
          {activeSection === "settings" && profile && (
            <ProfileUpdateForm profile={profile} onUpdateSuccess={handleUpdateSuccess} />
          )}
        </div>

        <div className={styles.rightSection}>
          <img className={styles.profileAvatar}  // New class for the avatar
            src={profile?.profilePicture || "765-default-avatar.png"}  // Default image if no profile picture
            alt="Profile"
            
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
