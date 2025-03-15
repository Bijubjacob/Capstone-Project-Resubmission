import { useAuth } from "../../context/auth/auth_context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Dashboard = () => {
  const nav = useNavigate();
  const { logout, user } = useAuth();  // Assuming you have 'user' in your context to store authentication status

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      nav('/auth'); // Redirect to login if not authenticated
    }
  }, [user, nav]);

  function handleLogout() {
    logout();
    nav('/auth'); // Redirect to auth page after logout
  }

  return (
    <div>
      {user ? (
        <>
          <h1>Welcome, {user.name}! Only authenticated users should see this page.</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Redirecting to login...</h1> // Message shown while redirecting
      )}
    </div>
  );
};

export default Dashboard;
