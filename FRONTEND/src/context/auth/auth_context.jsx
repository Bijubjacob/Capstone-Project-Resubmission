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
            let res = await axios.post('http://localhost:3000/api/auth/login', formData);
            setcookies('token', res.data.token);
        } catch (err) {
            console.error(err);
        }
    }

    // Register function
    async function signUp(formData) {
        try {
            let res = await axios.post('http://localhost:3000/api/users/register', formData);
            setcookies('token', res.data.token);
        } catch (err) {
            console.error(err);
        }
    }

    // Logout function
    async function logout() {
        removeCookie('token');
    }

    const value = useMemo(() => ({
        cookies,
        login,
        signUp,
        logout
    }), [cookies]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}
