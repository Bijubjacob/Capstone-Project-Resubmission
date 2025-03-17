import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import React from 'react';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [cookies, setcookies, removeCookie] = useCookies();  // Correct use of useCookies hook

    // Login function
    async function login(formData) {
        try {
            let res = await axios.post('http://localhost:3000/api/auth/login', formData );
            setcookies('token', res.data.token);  // Set token in cookies
        } catch (err) {
            console.error("Login failed", err);
            if (err.response) {
                // Handle error based on server response
                alert("Login failed: " + err.response.data.message);
            } else {
                alert("Network error");
            }
        }
    }


    const signUp = async (formData) => {
        try {
          const response = await axios.post('http://localhost:3000/api/users/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password2: formData.password2,
          });
      
          // Check for success in the response data
          if (response.data.success) {
            return response.data; // Return the successful response
          } else {
            throw new Error("Sign up failed.");
          }
        } catch (error) {
          if (error.response && error.response.data) {
            // Check for specific error message
            if (error.response.data.errors) {
              const errorMessage = error.response.data.errors[0].msg; // Capture the error message
              console.error("Error response from API:", errorMessage);
              throw new Error(errorMessage); // Throw error to be handled in the UI
            } else {
              console.error("Unknown error:", error.response.data);
              throw new Error("Something went wrong. Please try again later.");
            }
          }
          throw new Error("Something went wrong. Please try again later.");
        }
      };
      

    // Logout function
    async function logout() {
        removeCookie('token');  // Remove the token from cookies
    }

    const value = useMemo(() => ({
        cookies,
        setcookies,
        removeCookie,
        login,
        signUp,
        logout,
      }), [cookies]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
