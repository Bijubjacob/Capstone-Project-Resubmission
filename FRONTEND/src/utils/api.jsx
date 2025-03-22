import axios from 'axios';

// Function to get a specific cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;  // Return null if cookie is not found
}

const api = axios.create({
  baseURL: "https://shootpro24.onrender.com/api", // Your API URL
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

// Interceptor to handle 401 Unauthorized (e.g., expired token)
api.interceptors.response.use(
  (response) => response,  // If the response is successful, just return it
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle the error (e.g., redirect to login page)
      console.error("Session expired. Redirecting to login...");
      window.location.href = "/auth";  // Redirect to login page
    }
    return Promise.reject(error);  // Reject the error for further handling
  }
);

// Fetch all users for the admin dashboard
export const fetchAllUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;  // Rethrow error for further handling
  }
};

// Delete a user (for the admin dashboard)
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Create a new user (for the admin dashboard)
export const createUser = async (userData) => {
  try {
    const response = await api.post("/admin/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Update user details (for the admin dashboard)
export const updateUser = async (userId, userData) => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export default api;
