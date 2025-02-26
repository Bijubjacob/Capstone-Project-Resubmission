import { useState } from "react";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Professional photographer",
    location: "New York, USA",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    setIsEditing(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h2>Profile Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
            />
          </div>

          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </form>
      ) : (
        <div className={styles.profileInfo}>
          <div className={styles.infoGroup}>
            <h3>Name</h3>
            <p>{profile.name}</p>
          </div>

          <div className={styles.infoGroup}>
            <h3>Email</h3>
            <p>{profile.email}</p>
          </div>

          <div className={styles.infoGroup}>
            <h3>Bio</h3>
            <p>{profile.bio}</p>
          </div>

          <div className={styles.infoGroup}>
            <h3>Location</h3>
            <p>{profile.location}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
