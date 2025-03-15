import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/auth_context";

export default function ProtectedRoutes() {
    const { cookies } = useAuth();  // Assuming useAuth provides cookies
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); // Track loading state while checking the token

    useEffect(() => {
        // Simulate async check for token
        const token = cookies.token;

        // If no token, navigate to login page and stop further processing
        if (!token) {
            navigate('/auth');
        } else {
            setLoading(false); // If token exists, stop loading and show the protected content
        }
    }, [cookies, navigate]); // Dependency on cookies and navigate

    if (loading) {
        return <h1>Loading...</h1>; // Show loading while we check for the token
    }

    // Once loading is done and token exists, render the protected content
    return <Outlet />;
}
