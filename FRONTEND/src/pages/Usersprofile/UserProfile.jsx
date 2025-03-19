import styles from '../../Usersstyles/UserProfile.module.css';
import React from "react";

const UserProfile = ({ profile, onEditProfile }) => {
  return (
      <div className={styles.profileContainer}>

        <div className={styles.profileDetails}>
          <div className={styles.profileHeader}>
            <h2>Your Profile</h2>
            <div className={styles.profileInfo}>
              <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phoneNumber}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              <p><strong>Location:</strong> {profile.location}</p>


              <button onClick={onEditProfile} className={styles.editButton}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfile;

