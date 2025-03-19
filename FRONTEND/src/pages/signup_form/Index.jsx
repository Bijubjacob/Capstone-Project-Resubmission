import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/auth/auth_context";
import Header from "../public/Header";
import Footer from "../public/Footer";
import "../../Usersstyles/SignUpForm.css";

const SignUp = ({ setNewUser }) => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { signUp } = useAuth();
  const nav = useNavigate(); // Initialized useNavigate into variable
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleClick = () => {
    setNewUser(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error state on submit

    // Validate password match
    if (formData.password !== formData.password2) {
      alert("Passwords do not match");
    } else {
      try {
        // Call signUp function
        const response = await signUp(formData);

        if (response.success) {
          setSuccessMessage('Registration successful. Please check your inbox for email verification.');
          // Clear form data after success
          setFormData({
            name: "",
            email: "",
            password: "",
            password2: "",
          });
          nav('/dashboard'); // Redirect to dashboard after successful registration
        }
      } catch (err) {
        // Display error if the user already exists
        setError(err.message || "Sign up failed. Please try again.");
      }
    }
  } 

  return (
    <>
      <Header />
      <main className="container">
        <div className="forms">
          <h1 className="title">Create Account</h1>
          <form className="form" onSubmit={handleSubmit}>
            {error && <div className="errorMessage">{error}</div>}
            {successMessage && <div className="successMessage">{successMessage}</div>}

            <div className="inputGroup">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="Create a password"
                required
                minLength={6}
              />
            </div>

            <div className="inputGroup">
              <label htmlFor="password2">Confirm Password</label>
              <input
                id="password2"
                type="password"
                name="password2"
                value={formData.password2}
                onChange={handleChange}
                className="input"
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>

            <button type="submit" className="submitButton">Register</button>
          </form>

          <p className="switchText">
            Already have an account?{" "}
            <Link to="/login" className="switchLink">
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