import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie'; // Import cookies hook for handling token

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cookies] = useCookies(['token']); // Use the useCookies hook to get the token

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state
    setError(null); // Reset error state

    axios
      .put('http://localhost:3000/api/users/profile', profile, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then(() => {
        alert('Profile updated');
      })
      .catch((err) => {
        setError('Failed to update profile'); // Show error message if failed
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  useEffect(() => {
    setLoading(true); // Show loading state when fetching data
    axios
      .get('http://localhost:3000/api/users/profile', {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        setError('Failed to fetch profile'); // Show error message if failed
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  }, [cookies.token]); // Fetch profile when the token changes

  return (
    <div>
      <h1>Edit Profile</h1>
      {loading && <p>Loading...</p>} {/* Show loading text or spinner */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save'} {/* Change button text when loading */}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
