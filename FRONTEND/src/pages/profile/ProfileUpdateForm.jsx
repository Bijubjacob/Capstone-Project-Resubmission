import { useState, useEffect } from "react";
import styles from "../../styles/ProfileUpdateForm.module.css";
import api from "../../utils/api"; // Axios instance to handle requests
import React from "react";

const ProfileUpdateForm = ({ profile, onProfileUpdated }) => {
  // Initializing the form data (For Update or Create)
  const [formData, setFormData] = useState({
    firstName: profile?.firstName || "",
    lastName: profile?.lastName || "",
    email: profile?.email || "",
    phoneNumber: profile?.phoneNumber || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      let response;
      if (profile) {
        // Update profile (PUT)
        response = await api.put("/profile", formData);
      } else {
        // Create profile (POST)
        response = await api.post("/profile", formData);
      }
      onProfileUpdated(response.data); // Callback to parent
    } catch (err) {
      setError("Failed to save profile.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{profile ? "Update Profile" : "Create Profile"}</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* First Name */}
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

      {/* Last Name */}
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

      {/* Email */}
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

      {/* Phone Number */}
      <div className={styles.inputGroup}>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      {/* Bio */}
      <div className={styles.inputGroup}>
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      {/* Location */}
      <div className={styles.inputGroup}>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : profile ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
