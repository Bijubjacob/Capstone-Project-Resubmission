import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import { Header } from "../Header";
import Footer from "../Footer";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const { signUp, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      await signUp(formData);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Sign up failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.container}>
        <div className={styles.forms}>
          <h1 className={styles.title}>Create Account</h1>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {error && (
              <div role="alert" className={styles.errorMessage}>
                {error}
              </div>
            )}
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter your full name"
                required
                aria-required="true"
              />
            </div>

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
                placeholder="Create a password"
                required
                aria-required="true"
                minLength={6}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password2">Confirm Password</label>
              <input
                id="password2"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className={styles.input}
                placeholder="Confirm your password"
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
                "Create Account"
              )}
            </button>
          </form>

          <p className={styles.switchText}>
            Already have an account?{" "}
            <Link to="/login" className={styles.switchLink}>
              Sign In
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;
