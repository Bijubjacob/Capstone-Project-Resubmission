import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'; // Importing useCookies from react-cookie
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies] = useCookies(['token']); // Use useCookies hook to get the 'token' cookie

  useEffect(() => {
    // Fetch all users from the backend to display in the admin dashboard
    const token = cookies.token; // Access token from cookies

    if (token) {
      axios
        .get('http://localhost:3000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load users');
          setLoading(false);
        });
    } else {
      setError('You are not authenticated');
      setLoading(false);
    }
  }, [cookies.token]); // Add cookies.token to dependency array

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>User Management</h2>

      {loading && <p>Loading users...</p>}  {/* Loading state */}
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Error state */}

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
