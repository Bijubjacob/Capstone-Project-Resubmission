import React, { useState } from "react";
import styles from "../../Usersstyles/ProfileUpdateForm.module.css";
import api from "../../utils/api";

const ProfileUpdateForm = ({ profile, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",
    email: profile.email || "",
    phoneNumber: profile.phoneNumber || "",
    bio: profile.bio || "",
    location: profile.location || "",
    profilePicture: profile.profilePicture || "",
  });

  const [file, setFile] = useState(null);  // For storing file selected for upload

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input change for profile picture
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFormData((prev) => ({ ...prev, profilePicture: selectedFile.name }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data for submission
      const form = new FormData();
      form.append("firstName", formData.firstName);
      form.append("lastName", formData.lastName);
      form.append("email", formData.email);
      form.append("phoneNumber", formData.phoneNumber);
      form.append("bio", formData.bio);
      form.append("location", formData.location);

      // If a new profile picture is selected, append it
      if (file) {
        form.append("profilePicture", file);
      }

      // Send the form data (including the file if selected) to the backend
      const response = await api.put("/profile", form, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure the correct content type for file upload
        },
      });

      if (response.status === 200) {
        console.log("Profile updated successfully!");
        // Trigger UI update or further actions
        onUpdateSuccess(response.data); // Assuming this updates the profile state in the parent component
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error message to the user if something goes wrong
      alert("An error occurred while updating your profile.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.profileForm}>
      <div className={styles.formGroup}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Bio</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Profile Picture</label>
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
        />
        {file && (
          <p>Selected file: {file.name}</p>  // Showing file name when selected
        )}
      </div>

      <button type="submit" className={styles.submitButton}>Update Profile</button>
    </form>
  );
};

export default ProfileUpdateForm;
