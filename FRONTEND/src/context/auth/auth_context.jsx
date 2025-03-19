import React, { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../utils/api";  // Import the api instance from api.jsx
import { jwtDecode } from 'jwt-decode';  // Decode JWT (corrected import)

const AuthContext = createContext();

function AuthProvider({ children }) {  // Default export without curly braces
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();  // Use useNavigate hook for navigation

  // Login function using the api instance
  async function login(formData) {
    try {
      let res = await api.post("/auth/login", formData);
      const decodedToken = jwtDecode(res.data.token);
      const role = decodedToken.role;

      document.cookie = `token=${res.data.token}; path=/`;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + (err.response ? err.response.data.message : "Network error"));
    }
  }

  const signUp = async (formData) => {
    try {
      const response = await api.post("/users/register", formData);

      if (response.data.success) {
        return response.data;
      } else {
        throw new Error("Sign up failed.");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      throw new Error(error.response?.data?.errors?.[0]?.msg || "Something went wrong.");
    }
  };

  async function logout() {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/login");
  }

  const value = useMemo(() => ({
    cookies,
    setCookies,
    removeCookie,
    login,
    signUp,
    logout,
  }), [cookies]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider; // Default export here
export function useAuth() {
  return useContext(AuthContext);
}
