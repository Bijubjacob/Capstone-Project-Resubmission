import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth/auth_context';  // Import the auth context to check authentication status
import '../../styles/navbar.css';

const Navbar = () => {
  const { cookies, logout } = useAuth();  // Access the cookies and logout function from context
  const navigate = useNavigate();  // Use navigate for redirection
  const location = useLocation();  // Get the current location to highlight the active link

  // Function to handle logout
  const handleLogout = () => {
    logout();  // Logout the user
    navigate('/auth');  // Redirect to the login page
  };

  // Check if the user is authenticated by checking the cookies
  const isAuthenticated = cookies?.token;

  // Helper function to add active class
  const getLinkClass = (path) => {
    return location.pathname === path ? 'activeLink' : '';  // Highlight active link
  };

  return (
    <nav>
      <ul className="navbar">
        {isAuthenticated ? (
          // If the user is authenticated, show the Dashboard and Logout options
          <>
            <li>
              <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          // If the user is not authenticated, show the Login link
          <li>
            <Link to="/auth" className={getLinkClass('/auth')}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
