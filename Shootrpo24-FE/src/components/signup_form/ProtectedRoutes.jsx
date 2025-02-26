import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import { useState, useEffect } from "react";

export default function ProtectedRoutes() {
    const { cookies } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking auth state
        const checkAuth = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(checkAuth);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return cookies.token ? <Outlet /> : <Navigate to="/auth" replace />;
}