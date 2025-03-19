import axios from 'axios';

// Function to get a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;  // Return null if cookie is not found
}

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API URL
});

// Interceptor to add the token from cookies to the request headers
api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");  // Get token from cookies

    if (token) {
      config.headers["x-auth-token"] = token;  // Add token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch all users for the admin dashboard
export const fetchAllUsers = () => {
  return api.get("/admin/users");
};

// Delete a user (for the admin dashboard)
export const deleteUser = (userId) => {
  return api.delete(`/admin/users/${userId}`);
};

// Create a new user (for the admin dashboard)
export const createUser = (userData) => {
  return api.post("/admin/users", userData);  // Sending a POST request to create a new user
};

// Update user details (for the admin dashboard)
export const updateUser = (userId, userData) => {
  return api.put(`/admin/users/${userId}`, userData);  // Sending a PUT request to update user data
};

export default api;
