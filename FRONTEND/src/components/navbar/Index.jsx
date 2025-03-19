import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import "../../styles/navbar.css";

const Navbar = () => {
  const { cookies, logout } = useAuth();
  const [role, setRole] = useState(null); // State to store role
  const navigate = useNavigate();
  const location = useLocation();

  // Check if the user is authenticated by checking the cookies
  const isAuthenticated = cookies?.token;

  // Check the role of the authenticated user and redirect accordingly
  useEffect(() => {
    if (isAuthenticated) {
      // Decode the token or fetch user details to check the role
      const token = cookies.token;
      const decoded = jwtDecode(token); // You might have this logic in context already
      setRole(decoded.role); // Set role based on the decoded token

      // Redirect based on role
      if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, cookies.token, navigate]);

  // Function to handle logout
  const handleLogout = () => {
    logout(); // Logout the user
    navigate("/auth"); // Redirect to the login page
  };

  // Helper function to add active class
  const getLinkClass = (path) => {
    return location.pathname === path ? "activeLink" : "";
  };

  return (
    <nav>
      <ul className="navbar">
        {isAuthenticated ? (
          <>
            {/* Based on role, either show Dashboard or Admin Dashboard */}
            <li>
              {role === "admin" ? (
                <Link to="/admin/dashboard" className={getLinkClass("/admin/dashboard")}>
                  Admin Dashboard
                </Link>
              ) : (
                <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                  User Dashboard
                </Link>
              )}
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth" className={getLinkClass("/auth")}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
