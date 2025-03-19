import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'; 
import { fetchAllUsers, deleteUser, updateUser, createUser } from '../../utils/api'; // Ensure createUser is included
import "../AdminDashboard/AdminStyle/AdminDashboard.css";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { useNavigate } from 'react-router-dom'; // For navigation after logout

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cookies, setCookies, removeCookie] = useCookies(['token']); // Access the cookies
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate(); // Hook for navigating after logout

  // Fetch users on component mount
  useEffect(() => {
    const token = cookies.token;

    if (token) {
      fetchAllUsers()
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load users');
          setLoading(false);
        });
    } else {
      setError('You are not authenticated');
      setLoading(false);
    }
  }, [cookies.token]);

  // Handle user creation
  const handleCreateUser = (e) => {
    e.preventDefault();

    const newUser = { ...userForm };

    // Call the createUser API to create the new user
    createUser(newUser)
      .then((response) => {
        // Successfully created the user, update the state
        setUsers([...users, response.data]);
        setUserForm({
          name: '',
          email: '',
          password: '',
          role: 'user',
        }); // Reset the form
        setError(null);  // Clear any previous errors
      })
      .catch((err) => {
        // Handle errors if any
        setError('Failed to create user');
      });
  };

  // Handle user editing (open the edit form)
  const handleEditUser = (user) => {
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',  // Do not pre-fill password for security reasons
      role: user.role,
    });
    setIsEditing(true);
    setEditingUserId(user._id);
  };

  // Handle user update
  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUser = { ...userForm };

    // Make API call to update user
    updateUser(editingUserId, updatedUser)
      .then((updatedUserData) => {
        setUsers(users.map((user) => user._id === editingUserId ? updatedUserData.data : user));
        setIsEditing(false);  // Close edit form
        setEditingUserId(null);
        setUserForm({
          name: '',
          email: '',
          password: '',
          role: 'user',
        });  // Reset the form
      })
      .catch((err) => {
        setError('Failed to update user');
      });
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      deleteUser(userId)
        .then(() => {
          setUsers(users.filter((user) => user._id !== userId));  // Update the user list after deletion
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to delete user');
        });
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Remove the 'token' cookie to logout the user
    removeCookie('token');
    
    // Redirect user to the login page after logout
    navigate('/login'); // Replace '/login' with your actual login page route
  };

  return (
    <div className="admin-dashboard">
      {/* Include Header */}
      <AdminHeader />

      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <h2>User Management</h2>

        {loading && <p>Loading users...</p>}
        {error && <p className="error">{error}</p>}

        {/* User Creation or Edit Form */}
        <div className="user-form">
          <h3>{isEditing ? 'Edit User' : 'Create a New User'}</h3>
          <form onSubmit={isEditing ? handleUpdateUser : handleCreateUser}>
            <input
              type="text"
              placeholder="Name"
              value={userForm.name}
              onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userForm.email}
              onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={userForm.password}
              onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
              required={!isEditing} // Don't require password field when editing
            />
            <select
              value={userForm.role}
              onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button type="submit">{isEditing ? 'Update User' : 'Create User'}</button>
          </form>
        </div>

        {/* User List */}
        <div className="user-list">
          <ul>
            {users.map((user) => (
              <li key={user._id}>  {/* Use _id as the key here */}
                <span>{user.name} - {user.email} - {user.role}</span>
                <div className="button-box">
                  {/* Edit Button */}
                  <button className="edit-button" onClick={() => handleEditUser(user)}>Edit</button>
                  {/* Delete Button */}
                  <button className="delete-button" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Logout Button */}
      <div className="logout-button">
        <button className="Logout" onClick={handleLogout}>Logout</button>
      </div>

      {/* Include Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboard;
