"use client";
import React from "react";
import styles from "../../pages/public/Styles/AboutUs.module.css";  // Import CSS Module
import Header from "./Header";
import Footer from "./Footer";
import videoSrc from "../public/Images/1575e814-53c6-4e9c-8c48-224b1675795f.mp4";  // Adjust the path accordingly


const AboutUs = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>About Shootpro24</h1>
          <p className={styles.subtitle}>
            Your trusted partner in professional photo editing
          </p>
        </section>

        <section className={styles.story}>
          <div className={styles.storyContent}>
            <h2>Our Story</h2>
            <p>
              Founded in 2023, Shootpro24 has been at the forefront of
              revolutionizing photo editing services. We believe in making
              professional editing accessible to photographers worldwide.
            </p>
          </div>
          <div className={styles.storyImage}>
            <video width="800" height="600" controls autoPlay loop>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        <section className={styles.values}>
          <h2>Our Values</h2>
          <div className={styles.valueGrid}>
            <div className={styles.valueCard}>
              <h3>Quality First</h3>
              <p>We never compromise on the quality of our work</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Innovation</h3>
              <p>Constantly evolving with the latest technology</p>
            </div>
            <div className={styles.valueCard}>
              <h3>Customer Focus</h3>
              <p>Your success is our success</p>
            </div>
          </div>
        </section>

        <section className={styles.team}>
          <h2>Our Team</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img src="URL_team1" alt="Team member" />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className={styles.teamMember}>
              <img src="URL_team2" alt="Team member" />
              <h3>Jane Smith</h3>
              <p>Lead Editor</p>
            </div>
            <div className={styles.teamMember}>
              <img src="URL_team3" alt="Team member" />
              <h3>Mike Johnson</h3>
              <p>Technical Director</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
