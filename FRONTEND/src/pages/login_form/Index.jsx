import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import Header from "../../pages/public/Header";
import Footer from "../../pages/public/Footer";
import styles from "../../styles/LoginForm.module.css"; // Import CSS Module correctly

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(""); // Define message state
  const [error, setError] = useState(""); // Define error state
  const { login, loading } = useAuth(); // Use the loading state from context
  const nav = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await login(formData); // Attempt to login the user
      setMessage("Login successful!"); // Display success message
      nav("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      setError(err.message || "Login failed. Please try again."); // Set error message if login fails
    }
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.forms}>
          <h1 className={styles.title}>Welcome Back</h1>

          {/* Show the message about email verification */}
          {message && (
            <div className={styles.successMessage} role="alert" aria-live="assertive">
              <p>{message}</p>
            </div>
          )}

          {/* Display the error message */}
          {error && (
            <div role="alert" className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your email"
                required
                aria-required="true"
                aria-describedby="email-help"
              />
              <small id="email-help" className={styles.inputHelp}>
                We'll never share your email with anyone else.
              </small>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your password"
                required
                aria-required="true"
                minLength={6}
                aria-describedby="password-help"
              />
              <small id="password-help" className={styles.inputHelp}>
                Password must be at least 6 characters.
              </small>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading} // Disable button if loading
            >
              {loading ? (
                <span
                  className={styles.loadingSpinner}
                  aria-label="Loading..."
                />
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className={styles.switchText}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.switchLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginForm;
