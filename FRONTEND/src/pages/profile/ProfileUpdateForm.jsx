import { useState } from "react";
import styles from "./ProfileUpdateForm.module.css";
import api from "../../utils/api"; // Axios instance to handle requests

const ProfileUpdateForm = ({ profile, onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    phoneNumber: profile.phoneNumber || "",
    bio: profile.bio || "",
    location: profile.location || "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await api.put("/profile", formData);  // API request to update profile
      onProfileUpdated(response.data);  // Callback to update profile in parent component
    } catch (err) {
      setError("Failed to update profile.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Update Profile</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}  {/* Display error */}

      <div className={styles.inputGroup}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      <div className={styles.inputGroup}>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
