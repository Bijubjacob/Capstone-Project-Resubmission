import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../../context/auth/auth_context';
import { Header } from "../../components/Header";
import Footer from "../Footer";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.forms}>
          <h1 className={styles.title}>Welcome Back</h1>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {error && (
              <div role="alert" className={styles.errorMessage}>
                {error}
              </div>
            )}
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
              />
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
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
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
