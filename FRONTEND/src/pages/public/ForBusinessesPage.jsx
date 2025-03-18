import React from 'react';
import styles from '../public/Styles/ForBusinessPage.module.css';
import Header from "./Header";
import Footer from "./Footer";

const ForBusinessesPage = () => {
  return (
    <>
    <Header />
    <section className={styles.pageContainer}>
      <h1>For Businesses</h1>
      <p>
        Learn how our platform can help your business streamline its processes, improve workflows, and increase productivity.
      </p>

      {/* Image */}
      <div className={styles.mediaContainer}>
        <img 
          src="https://images.pexels.com/photos/1061597/pexels-photo-1061597.jpeg"
          alt="Business Solutions"
          className={styles.pageImage} 
        />
      </div>

      <p>
        Our tools cater to businesses of all sizes, offering solutions that enhance collaboration and efficiency.
      </p>
    </section>
    <Footer/>
    </>
  );
};

export default ForBusinessesPage;
