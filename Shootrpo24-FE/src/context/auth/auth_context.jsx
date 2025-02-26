//Imports
import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";


const AuthContext = createContext();


export default function AuthProvider({ children }) {
    //use cookies to keep track and manage cookies
    const [cookies, setCookies, removeCookie] = useCookies();

    //  Login Function
    async function login(formData) {
        try {
            //Make post request to backend with formData
            let res = await axios.post('http://localhost:3000/api/auth', formData)

            //Take token from response and set to cookies
            setCookies('token', res.data.token)
        } catch (err) {
            console.error(err);
        }
    }

    // register Function
    async function signUp(formData) {
        try {
            //Make post request to backend with formData
            let res = await axios.post('http://localhost:3000/api/users', formData)

            //Take token from response and set to cookies
            setCookies('token', res.data.token)
        } catch (err) {
            console.error(err);
        }
    }

    //logout Function
    function logout() {
        ['token'].forEach((obj) => removeCookie(obj));
    }

    const value = useMemo(() => ({
        cookies,
        login,
        logout,
        signUp
    }), [cookies]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Cheeky function so I don't have to import useContext everytime I want to use Auth
export function useAuth() {
    return useContext(AuthContext);
}