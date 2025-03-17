import axios from "axios";

// API URL
const API_URL = "/api/profile";

// Fetch user profile
export const getProfile = async () => {
  const response = await axios.get(API_URL);
  return response;
};

// Update user profile
export const updateProfile = async (profileData) => {
  const response = await axios.put(API_URL, profileData);
  return response.data;
};

// Upload profile picture
export const uploadProfilePicture = async (formData) => {
  const response = await axios.post(`${API_URL}/upload-profile-picture`, formData);
  return response.data;
};
