import React, { useState } from "react";
import axios from "axios";
import { ThankYouModal } from "./ThankYouModal";
import styles from "./Styles/ExamplesWaitlist.module.css";

export const Hero = () => {
  const [email, setEmail] = useState(""); // State to store the email input
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the email to the backend API
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL + "/subscribe", { email });

      // Show the "Thank You" modal on success
      setIsModalOpen(true);

      // Clear the email input field
      setEmail("");

      console.log(response.data.message);  // Optional: you can log the success message
    } catch (error) {
      setError("Error submitting email: " + error.message);
    }
  };

  return (
    <section className={styles.heroNewsletter}>
      <div className={styles.heroNewsletter2}>
        <h1 className={styles.title}></h1>
        <p className={styles.subtitle}></p>

        {/* Background Video */}
        <div className={styles.backgroundVideoWrapper}>
          <video className={styles.backgroundVideo} autoPlay loop muted>
            <source src="https://res.cloudinary.com/doixz4sgs/video/upload/v1742602582/SHOOTPRO2024PROMO-ezgif.com-video-cutter_ea3xnt.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>


        <form onSubmit={handleSubmit} className={styles.formNewsletter}>
          <div className={styles.inputField}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              placeholder="you@example.com"
              className={styles.input}
              aria-label="Email address"
            />
          </div>
          <button type="submit" className={styles.button3}>
            Submit
          </button>
        </form>
      </div>

      {/* Display Thank You modal */}
      <ThankYouModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Error message display */}
      {error && <p>{error}</p>}
    </section>
  );
};

export default Hero;