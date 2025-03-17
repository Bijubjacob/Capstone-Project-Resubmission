import React from "react";
import styles from "../../styles/UserProfile.module.css";

const UserProfile = ({ profile }) => {
  if (!profile) {
    return <div>Loading profile...</div>;  // Show loading state or a placeholder
  }

  return (
    <div className={styles.userProfile}>
      <h2>Your Profile</h2>
      <div className={styles.profileHeader}>
        {profile.profilePicture ? (
          <img src={profile.profilePicture} alt="Profile" className={styles.profilePic} />
        ) : (
          <div className={styles.profilePicPlaceholder}>No Profile Picture</div>
        )}
        <div className={styles.profileInfo}>
          <h3>{profile.firstName} {profile.lastName}</h3>
          <p>{profile.bio || "No bio provided."}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phoneNumber}</p>
          <p>Location: {profile.location || "Not available"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
